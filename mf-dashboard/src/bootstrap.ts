import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { AccountService } from './app/services/account.service';
import { DashboardComponent } from './app/dashboard.component';
import { DashboardModule } from './app/dashboard.module';
import { authInterceptor } from '@shell/src/app/core/interceptors/auth.interceptor';
import { errorInterceptor } from '@shell/src/app/core/interceptors/error.interceptor';
import { environment } from '../environments/environment';

if (environment.production) {
  enableProdMode();
}

export async function bootstrap(): Promise<void> {
  console.log('[mf-dashboard] Starting bootstrap process');
  
  const platformLocation = document.querySelector('base')?.getAttribute('href') || '/';
  
  console.log('[mf-dashboard] Platform base href:', platformLocation);
  console.log('[mf-dashboard] Environment config:', {
    production: environment.production,
    apiUrl: environment.apiUrl,
    enableDebug: environment.enableDebug
  });
}

export async function mount(props: unknown): Promise<void> {
  console.log('[mf-dashboard] Mounting with props:', props);
  
  const mountProps = props as {
    domElement?: HTMLElement;
    baseUrl?: string;
    customerId?: string;
    authToken?: string;
  };

  const rootElement = mountProps?.domElement || document.getElementById('mf-dashboard-root');
  
  if (!rootElement) {
    console.error('[mf-dashboard] Root element not found');
    throw new Error('MF_DASHBOARD_ROOT_NOT_FOUND');
  }

  const baseUrl = mountProps?.baseUrl || '/';
  const customerId = mountProps?.customerId || '';
  const authToken = mountProps?.authToken || '';

  console.log('[mf-dashboard] Mounting to element:', rootElement.id);
  console.log('[mf-dashboard] Base URL:', baseUrl);
  console.log('[mf-dashboard] Customer ID:', customerId);

  try {
    const { AppModule } = await import('./app/app.module');
    
    await bootstrapApplication(AppModule, {
      providers: [
        provideRouter(
          [
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
            { 
              path: 'overview', 
              loadComponent: () => import('./app/dashboard.component').then(m => m.DashboardComponent),
              data: { title: 'Dashboard Overview' }
            },
            { 
              path: 'accounts', 
              loadComponent: () => import('./app/pages/accounts-list.component').then(m => m.AccountsListComponent),
              data: { title: 'Accounts' }
            },
            { 
              path: 'accounts/:id', 
              loadComponent: () => import('./app/pages/account-detail.component').then(m => m.AccountDetailComponent),
              data: { title: 'Account Detail' }
            },
            { 
              path: 'transactions', 
              loadComponent: () => import('./app/pages/transactions.component').then(m => m.TransactionsComponent),
              data: { title: 'Transactions' }
            },
            { 
              path: 'analytics', 
              loadComponent: () => import('./app/pages/analytics.component').then(m => m.AnalyticsComponent),
              data: { title: 'Analytics' }
            },
          ],
          withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
        ),
        provideAnimations(),
        provideHttpClient(
          withInterceptors([authInterceptor, errorInterceptor])
        ),
        {
          provide: APP_BASE_HREF,
          useValue: baseUrl,
        },
        {
          provide: 'CUSTOMER_ID',
          useValue: customerId,
        },
        {
          provide: 'AUTH_TOKEN',
          useValue: authToken,
        },
        AccountService,
      ],
    });
    
    console.log('[mf-dashboard] Application mounted successfully');
  } catch (error) {
    console.error('[mf-dashboard] Failed to mount application:', error);
    throw error;
  }
}

export async function unmount(): Promise<void> {
  console.log('[mf-dashboard] Unmounting micro-frontend');
  
  const rootElement = document.getElementById('mf-dashboard-root');
  if (rootElement) {
    rootElement.innerHTML = '';
    console.log('[mf-dashboard] Root element cleared');
  }
}

export async function unload(): Promise<void> {
  console.log('[mf-dashboard] Unloading micro-frontend');
}