import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes, Router, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { filter } from 'rxjs/operators';
import { AppComponent } from './app.component';
import { MicrofrontendLoaderService } from './core/load-microfrontend.guard';

export interface MicrofrontendRouteConfig {
  path: string;
  name: string;
  remoteEntry: string;
  remoteModule: string;
  icon?: string;
  description?: string;
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot([], {
      useHash: false,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  providers: [
    MicrofrontendLoaderService,
    {
      provide: 'MICROFRONTEND_ROUTES',
      useValue: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          remoteEntry: 'http://localhost:4201/remoteEntry.js',
          remoteModule: './Dashboard',
          icon: 'dashboard',
          description: 'Panel de control y métricas en tiempo real'
        },
        {
          path: 'accounts',
          name: 'Cuentas',
          remoteEntry: 'http://localhost:4202/remoteEntry.js',
          remoteModule: './Accounts',
          icon: 'account_balance',
          description: 'Gestión de cuentas bancarias'
        },
        {
          path: 'transactions',
          name: 'Transacciones',
          remoteEntry: 'http://localhost:4203/remoteEntry.js',
          remoteModule: './Transactions',
          icon: 'swap_horiz',
          description: 'Historial y gestión de transacciones'
        }
      ] as MicrofrontendRouteConfig[]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  private microfrontendLoader: MicrofrontendLoaderService;
  private router: Router;

  constructor(loader: MicrofrontendLoaderService, router: Router) {
    this.microfrontendLoader = loader;
    this.router = router;
    this.configureMicrofrontendRouting();
  }

  private configureMicrofrontendRouting(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      const microfrontendRoutes = this.getMicrofrontendRoutes();
      
      for (const route of microfrontendRoutes) {
        if (url.startsWith(`/${route.path}`)) {
          console.log(`[AppModule] Navegando a micro-frontend: ${route.name} (${route.path})`);
          this.preloadMicrofrontend(route.remoteEntry);
          break;
        }
      }
    });
  }

  private getMicrofrontendRoutes(): MicrofrontendRouteConfig[] {
    return [
      {
        path: 'dashboard',
        name: 'Dashboard',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        remoteModule: './Dashboard',
        icon: 'dashboard',
        description: 'Panel de control y métricas en tiempo real'
      },
      {
        path: 'accounts',
        name: 'Cuentas',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        remoteModule: './Accounts',
        icon: 'account_balance',
        description: 'Gestión de cuentas bancarias'
      },
      {
        path: 'transactions',
        name: 'Transacciones',
        remoteEntry: 'http://localhost:4203/remoteEntry.js',
        remoteModule: './Transactions',
        icon: 'swap_horiz',
        description: 'Historial y gestión de transacciones'
      }
    ];
  }

  private preloadMicrofrontend(remoteEntry: string): void {
    console.log(`[AppModule] Pre-cargando micro-frontend desde: ${remoteEntry}`);
  }

  public getRouteForPath(path: string): MicrofrontendRouteConfig | undefined {
    return this.getMicrofrontendRoutes().find(route => route.path === path);
  }

  public getAllRoutes(): MicrofrontendRouteConfig[] {
    return this.getMicrofrontendRoutes();
  }

  public isMicrofrontendPath(path: string): boolean {
    const routes = this.getMicrofrontendRoutes();
    return routes.some(route => path.startsWith(`/${route.path}`));
  }

  public getDefaultRoute(): string {
    return '/dashboard';
  }

  public getHomeRoute(): string {
    return '/';
  }

  public isRootPath(path: string): boolean {
    return path === '/' || path === '';
  }

  public getRouteDescription(path: string): string {
    const route = this.getRouteForPath(path.replace('/', ''));
    return route?.description || 'Sección de la aplicación';
  }

  public getRouteIcon(path: string): string {
    const route = this.getRouteForPath(path.replace('/', ''));
    return route?.icon || 'home';
  }

  public validateRouteExists(path: string): boolean {
    if (this.isRootPath(path)) {
      return true;
    }
    return this.getMicrofrontendRoutes().some(
      route => path.startsWith(`/${route.path}`)
    );
  }

  public getActiveMicrofrontends(): string[] {
    return this.getMicrofrontendRoutes().map(route => route.name);
  }

  public getMicrofrontendCount(): number {
    return this.getMicrofrontendRoutes().length;
  }

  public getMicrofrontendByName(name: string): MicrofrontendRouteConfig | undefined {
    return this.getMicrofrontendRoutes().find(
      route => route.name.toLowerCase() === name.toLowerCase()
    );
  }

  public getMicrofrontendByPath(path: string): MicrofrontendRouteConfig | undefined {
    return this.getMicrofrontendRoutes().find(
      route => `/${route.path}` === path || path.startsWith(`/${route.path}/`)
    );
  }

  public isDevelopmentMode(): boolean {
    return typeof window !== 'undefined' && 
           window.location.hostname === 'localhost';
  }

  public getEnvironment(): 'development' | 'production' {
    return this.isDevelopmentMode() ? 'development' : 'production';
  }

  public getRemoteEntryUrl(microfrontendName: string): string | undefined {
    const route = this.getMicrofrontendByName(microfrontendName);
    return route?.remoteEntry;
  }

  public getRemoteModule(microfrontendName: string): string | undefined {
    const route = this.getMicrofrontendByName(microfrontendName);
    return route?.remoteModule;
  }

  public getMicrofrontendPaths(): string[] {
    return this.getMicrofrontendRoutes().map(route => `/${route.path}`);
  }

  public getMicrofrontendNames(): string[] {
    return this.getMicrofrontendRoutes().map(route => route.name);
  }

  public getMicrofrontendByIndex(index: number): MicrofrontendRouteConfig | undefined {
    const routes = this.getMicrofrontendRoutes();
    return routes[index >= 0 && index < routes.length ? index : 0];
  }
}