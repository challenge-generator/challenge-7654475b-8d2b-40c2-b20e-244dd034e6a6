import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MicrofrontendLoaderService } from './core/load-microfrontend.guard';
import { HttpClient } from '@angular/common/http';
import { MicrofrontendConfig } from './core/load-microfrontend.guard';

interface MicrofrontendRoute {
  name: string;
  path: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  template: `
    <mat-sidenav-container class="shell-container">
      <mat-sidenav mode="side" opened class="shell-sidenav">
        <div class="sidenav-header">
          <mat-icon class="bank-icon">account_balance</mat-icon>
          <span class="bank-title">Banca Digital</span>
        </div>
        <mat-nav-list>
          @for (route of microfrontendRoutes; track route.path) {
            <a mat-list-item 
               [routerLink]="route.path" 
               routerLinkActive="active-route"
               (click)="navigateToMicrofrontend(route)">
              <mat-icon matListItemIcon>{{ route.icon }}</mat-icon>
              <span matListItemTitle>{{ route.name }}</span>
            </a>
          }
        </mat-nav-list>
        <div class="sidenav-footer">
          <div class="version-info">v1.0.0</div>
        </div>
      </mat-sidenav>

      <mat-sidenav-content class="shell-content">
        <mat-toolbar color="primary" class="shell-toolbar">
          <span class="toolbar-title">{{ currentTitle }}</span>
          <span class="toolbar-spacer"></span>
          <button mat-icon-button [matMenuTriggerFor]="userMenu">
            <mat-icon>account_circle</mat-icon>
          </button>
          <mat-menu #userMenu="matMenu">
            <button mat-menu-item>
              <mat-icon>person</mat-icon>
              <span>Perfil</span>
            </button>
            <button mat-menu-item>
              <mat-icon>settings</mat-icon>
              <span>Configuración</span>
            </button>
            <mat-divider></mat-divider>
            <button mat-menu-item>
              <mat-icon>logout</mat-icon>
              <span>Cerrar sesión</span>
            </button>
          </mat-menu>
        </mat-toolbar>

        <main class="microfrontend-outlet">
          @if (isLoading) {
            <div class="loading-overlay">
              <mat-spinner diameter="50"></mat-spinner>
              <p>Cargando {{ loadingMessage }}...</p>
            </div>
          }
          @if (loadError) {
            <div class="error-container">
              <mat-icon class="error-icon">error_outline</mat-icon>
              <h2>Error al cargar el módulo</h2>
              <p>{{ loadError }}</p>
              <button mat-raised-button color="primary" (click)="retryLoad()">
                Reintentar
              </button>
            </div>
          }
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .shell-container {
      height: 100vh;
      background: #f5f5f5;
    }

    .shell-sidenav {
      width: 260px;
      background: linear-gradient(180deg, #1a237e 0%, #283593 100%);
      border-right: none;
    }

    .sidenav-header {
      display: flex;
      align-items: center;
      padding: 24px 16px;
      color: white;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    }

    .bank-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      margin-right: 12px;
    }

    .bank-title {
      font-size: 20px;
      font-weight: 500;
      letter-spacing: 0.5px;
    }

    .sidenav-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.12);
    }

    .version-info {
      color: rgba(255, 255, 255, 0.6);
      font-size: 12px;
      text-align: center;
    }

    .shell-content {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .shell-toolbar {
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .toolbar-title {
      font-size: 18px;
      font-weight: 400;
    }

    .toolbar-spacer {
      flex: 1 1 auto;
    }

    .microfrontend-outlet {
      flex: 1;
      padding: 24px;
      overflow-y: auto;
      position: relative;
    }

    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.9);
      z-index: 10;
    }

    .loading-overlay p {
      margin-top: 16px;
      color: #666;
      font-size: 14px;
    }

    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px;
      text-align: center;
    }

    .error-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #f44336;
      margin-bottom: 16px;
    }

    .error-container h2 {
      color: #333;
      margin-bottom: 8px;
    }

    .error-container p {
      color: #666;
      margin-bottom: 24px;
    }

    .active-route {
      background: rgba(255, 255, 255, 0.12) !important;
    }

    ::ng-deep .active-route .mat-list-item-content {
      background: rgba(255, 255, 255, 0.08);
    }
  `]
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly microfrontendLoader = inject(MicrofrontendLoaderService);
  private readonly http = inject(HttpClient);

  microfrontendRoutes: MicrofrontendRoute[] = [];
  currentTitle = 'Banca Digital';
  isLoading = false;
  loadingMessage = '';
  loadError: string | null = null;
  private failedRoute: MicrofrontendRoute | null = null;

  ngOnInit(): void {
    this.loadMicrofrontendsConfig();
  }

  private loadMicrofrontendsConfig(): void {
    this.http.get<MicrofrontendConfig>('/assets/config/microfrontends.json')
      .pipe(
        catchError(error => {
          console.error('Error cargando configuración de micro-frontends:', error);
          this.microfrontendRoutes = this.getDefaultRoutes();
          return of(this.getDefaultRoutes());
        })
      )
      .subscribe(config => {
        this.microfrontendRoutes = config.routes.map(route => ({
          name: route.name,
          path: route.path,
          icon: route.icon || 'extension',
          description: route.description || ''
        }));
      });
  }

  private getDefaultRoutes(): MicrofrontendRoute[] {
    return [
      { name: 'Dashboard', path: '/dashboard', icon: 'dashboard', description: 'Vista principal del usuario' },
      { name: 'Cuentas', path: '/accounts', icon: 'account_balance', description: 'Gestión de cuentas' },
      { name: 'Transferencias', path: '/transfers', icon: 'swap_horiz', description: 'Realizar transferencias' },
      { name: 'Préstamos', path: '/loans', icon: 'payments', description: 'Gestión de préstamos' }
    ];
  }

  navigateToMicrofrontend(route: MicrofrontendRoute): void {
    this.currentTitle = route.name;
    this.loadError = null;
    
    if (route.path.startsWith('/')) {
      const microfrontendName = this.extractMicrofrontendName(route.path);
      if (microfrontendName) {
        this.isLoading = true;
        this.loadingMessage = route.name;
        
        this.microfrontendLoader.loadMicrofrontend(microfrontendName)
          .pipe(
            catchError(error => {
              console.error(`Error cargando micro-frontend ${microfrontendName}:`, error);
              this.loadError = `No se pudo cargar el módulo de ${route.name}. Por favor, intente de nuevo.`;
              return of(false);
            })
          )
          .subscribe(result => {
            this.isLoading = false;
            if (result) {
              this.router.navigate([route.path]);
            }
          });
      } else {
        this.router.navigate([route.path]);
      }
    }
  }

  private extractMicrofrontendName(path: string): string | null {
    const segments = path.split('/').filter(s => s);
    return segments.length > 0 ? segments[0] : null;
  }

  retryLoad(): void {
    if (this.failedRoute) {
      this.loadError = null;
      this.navigateToMicrofrontend(this.failedRoute);
    }
  }
}