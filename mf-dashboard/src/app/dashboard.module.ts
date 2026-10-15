import { NgModule, APP_INITIALIZER, inject } from '@angular/core';
import { RouterModule, Routes, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { AccountsListComponent } from './pages/accounts-list.component';
import { AccountDetailComponent } from './pages/account-detail.component';
import { TransactionsComponent } from './pages/transactions.component';
import { AnalyticsComponent } from './pages/analytics.component';
import { AccountCardComponent } from './components/account-card/account-card.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { BalanceChartComponent } from './components/balance-chart/balance-chart.component';
import { QuickActionsComponent } from './components/quick-actions/quick-actions.component';
import { AccountService } from './services/account.service';
import { AnalyticsService } from './services/analytics.service';
import { NotificationService } from './services/notification.service';
import { filter } from 'rxjs/operators';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: DashboardComponent,
        data: { 
          title: 'Dashboard Overview',
          breadcrumb: 'Overview',
          animation: 'dashboard-overview'
        }
      },
      {
        path: 'accounts',
        loadChildren: () => import('./pages/accounts.routes').then(m => m.ACCOUNTS_ROUTES),
        data: { 
          title: 'Accounts',
          breadcrumb: 'Accounts',
          animation: 'accounts'
        }
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
        data: { 
          title: 'Transactions',
          breadcrumb: 'Transactions',
          animation: 'transactions'
        }
      },
      {
        path: 'analytics',
        component: AnalyticsComponent,
        data: { 
          title: 'Analytics',
          breadcrumb: 'Analytics',
          animation: 'analytics'
        }
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'overview',
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    DashboardComponent,
    AccountsListComponent,
    AccountDetailComponent,
    TransactionsComponent,
    AnalyticsComponent,
    AccountCardComponent,
    TransactionListComponent,
    BalanceChartComponent,
    QuickActionsComponent,
  ],
  providers: [
    AccountService,
    AnalyticsService,
    NotificationService,
    {
      provide: APP_INITIALIZER,
      useFactory: (router: Router) => {
        return () => {
          console.log('[dashboard.module] Initializing dashboard module');
          
          router.events.pipe(
            filter(event => event instanceof NavigationEnd)
          ).subscribe((event) => {
            const navEvent = event as NavigationEnd;
            console.log('[dashboard.module] Navigation to:', navEvent.urlAfterRedirects);
            
            const data = router.getCurrentNavigation()?.extras?.state as Record<string, unknown> || {};
            if (data['analytics']) {
              console.log('[dashboard.module] Tracking page view:', navEvent.urlAfterRedirects);
            }
          });
          
          return Promise.resolve(true);
        };
      },
      deps: [Router],
      multi: true,
    },
    {
      provide: 'DASHBOARD_CONFIG',
      useValue: {
        refreshInterval: 30000,
        maxAccounts: 10,
        transactionPageSize: 20,
        enableNotifications: true,
        charts: {
          type: 'line',
          colors: ['#1976d2', '#388e3c', '#f57c00'],
        },
      },
    },
  ],
  exports: [
    RouterModule,
    DashboardComponent,
  ],
})
export class DashboardModule {
  private readonly router = inject(Router);
  private readonly accountService = inject(AccountService);
  private readonly notificationService = inject(NotificationService);
  
  constructor() {
    console.log('[dashboard.module] DashboardModule constructed');
    this.setupRouteGuards();
    this.setupNavigationTracking();
  }
  
  private setupRouteGuards(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        
        if (url.includes('/accounts/') && !this.accountService.hasAccountPermission()) {
          console.warn('[dashboard.module] User lacks permission to view account details');
          this.router.navigate(['/dashboard/overview']);
        }
        
        if (url.includes('/analytics') && !this.accountService.hasAnalyticsPermission()) {
          console.warn('[dashboard.module] User lacks permission to view analytics');
          this.router.navigate(['/dashboard/overview']);
        }
      }
    });
  }
  
  private setupNavigationTracking(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.router.routerState.snapshot;
      const routeData = currentRoute.root.firstChild?.data as Record<string, unknown>;
      
      if (routeData) {
        console.log('[dashboard.module] Route data:', routeData);
        this.notificationService.trackPageView(routeData['title'] as string);
      }
    });
  }
}