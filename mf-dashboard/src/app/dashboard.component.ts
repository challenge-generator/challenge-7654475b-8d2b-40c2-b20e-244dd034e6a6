import { Component, OnInit, OnDestroy, inject, signal, computed, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject, takeUntil, filter } from 'rxjs';
import { AccountService } from './services/account.service';
import { AnalyticsService } from './services/analytics.service';
import { NotificationService } from './services/notification.service';
import { Account, Transaction } from '@shared/models/account.model';
import { AccountCardComponent } from './components/account-card/account-card.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { BalanceChartComponent } from './components/balance-chart/balance-chart.component';
import { QuickActionsComponent } from './components/quick-actions/quick-actions.component';

interface DashboardState {
  accounts: Account[];
  recentTransactions: Transaction[];
  totalBalance: number;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatBadgeModule,
    MatTooltipModule,
    AccountCardComponent,
    TransactionListComponent,
    BalanceChartComponent,
    QuickActionsComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly accountService = inject(AccountService);
  private readonly analyticsService = inject(AnalyticsService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);
  private readonly destroy$ = new Subject<void>();
  
  readonly state = signal<DashboardState>({
    accounts: [],
    recentTransactions: [],
    totalBalance: 0,
    loading: true,
    error: null,
    lastUpdated: null,
  });
  
  readonly accounts = computed(() => this.state().accounts);
  readonly recentTransactions = computed(() => this.state().recentTransactions);
  readonly totalBalance = computed(() => this.state().totalBalance);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);
  
  readonly accountCount = computed(() => this.accounts().length);
  readonly activeAccounts = computed(() => 
    this.accounts().filter(a => a.status === 'ACTIVE').length
  );
  readonly hasAccounts = computed(() => this.accounts().length > 0);
  
  readonly formattedBalance = computed(() => {
    const balance = this.totalBalance();
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(balance);
  });
  
  readonly chartData = computed(() => {
    const accounts = this.accounts();
    return accounts.map(account => ({
      name: account.name,
      balance: account.balance,
      type: account.type,
      color: this.getAccountColor(account.type),
    }));
  });

  constructor() {
    effect(() => {
      const accounts = this.accounts();
      const total = this.totalBalance();
      
      console.log('[dashboard] Balance updated:', total, 'Accounts:', accounts.length);
      
      this.analyticsService.trackBalanceChange(total).pipe(
        takeUntil(this.destroy$)
      ).subscribe();
    });
  }

  ngOnInit(): void {
    console.log('[dashboard] Initializing dashboard component');
    this.loadDashboardData();
    this.setupEventListeners();
    this.trackPageView();
  }

  ngOnDestroy(): void {
    console.log('[dashboard] Destroying dashboard component');
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadDashboardData(): void {
    this.updateState({ loading: true, error: null });
    
    const customerId = this.accountService.getCurrentCustomerId();
    console.log('[dashboard] Loading data for customer:', customerId);

    this.accountService.getAccounts(customerId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (accounts) => {
        console.log('[dashboard] Accounts loaded:', accounts.length);
        
        const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
        
        this.updateState({
          accounts,
          totalBalance,
          loading: false,
          lastUpdated: new Date(),
        });
        
        this.loadRecentTransactions();
        this.analyticsService.trackDashboardLoad(accounts.length, totalBalance);
      },
      error: (err) => {
        console.error('[dashboard] Failed to load accounts:', err);
        this.updateState({
          loading: false,
          error: 'Error al cargar las cuentas. Por favor, inténtelo de nuevo.',
        });
        this.showErrorNotification('Error al cargar las cuentas');
      },
    });
  }

  private loadRecentTransactions(): void {
    const accounts = this.accounts();
    if (accounts.length === 0) {
      this.updateState({ recentTransactions: [] });
      return;
    }

    const accountIds = accounts.slice(0, 3).map(a => a.id);
    const transactionRequests = accountIds.map(id => 
      this.accountService.getTransactions(id, 5)
    );

    this.accountService.getTransactions(accountIds[0], 10).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (transactions) => {
        console.log('[dashboard] Transactions loaded:', transactions.length);
        this.updateState({ recentTransactions: transactions.slice(0, 10) });
      },
      error: (err) => {
        console.warn('[dashboard] Failed to load transactions:', err);
      },
    });
  }

  private setupEventListeners(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((event) => {
      const navEvent = event as NavigationEnd;
      console.log('[dashboard] Navigation:', navEvent.urlAfterRedirects);
      this.trackPageView();
    });

    window.addEventListener('storage', (event) => {
      if (event.key === 'auth_token') {
        console.log('[dashboard] Auth token changed, reloading data');
        this.loadDashboardData();
      }
    });
  }

  private trackPageView(): void {
    this.analyticsService.trackPageView('Dashboard').pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => console.log('[dashboard] Page view tracked'),
      error: (err) => console.warn('[dashboard] Failed to track page view:', err),
    });
  }

  refreshData(): void {
    console.log('[dashboard] Refreshing dashboard data');
    this.loadDashboardData();
    this.showSuccessNotification('Datos actualizados');
  }

  onAccountSelected(account: Account): void {
    console.log('[dashboard] Account selected:', account.id);
    this.router.navigate(['/dashboard/accounts', account.id]);
    this.analyticsService.trackAccountSelection(account.id, account.type);
  }

  onTransactionSelected(transaction: Transaction): void {
    console.log('[dashboard] Transaction selected:', transaction.id);
    this.analyticsService.trackTransactionView(transaction.id, transaction.amount);
  }

  onQuickAction(action: string): void {
    console.log('[dashboard] Quick action triggered:', action);
    this.analyticsService.trackQuickAction(action);
    
    switch (action) {
      case 'transfer':
        this.router.navigate(['/dashboard/transfer']);
        break;
      case 'new-account':
        this.router.navigate(['/dashboard/accounts/new']);
        break;
      case 'statements':
        this.router.navigate(['/dashboard/statements']);
        break;
      case 'support':
        this.router.navigate(['/dashboard/support']);
        break;
      default:
        console.warn('[dashboard] Unknown quick action:', action);
    }
  }

  createNewAccount(): void {
    console.log('[dashboard] Creating new account');
    this.router.navigate(['/dashboard/accounts/new']);
    this.analyticsService.trackEvent('create_account_clicked');
  }

  viewAllAccounts(): void {
    console.log('[dashboard] Viewing all accounts');
    this.router.navigate(['/dashboard/accounts']);
    this.analyticsService.trackEvent('view_all_accounts');
  }

  viewAllTransactions(): void {
    console.log('[dashboard] Viewing all transactions');
    this.router.navigate(['/dashboard/transactions']);
    this.analyticsService.trackEvent('view_all_transactions');
  }

  private updateState(partial: Partial<DashboardState>): void {
    this.state.update(current => ({ ...current, ...partial }));
  }

  private showSuccessNotification(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }

  private showErrorNotification(message: string): void {
    this.snackBar.open(message, 'Reintentar', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    }).onAction().subscribe(() => {
      this.refreshData();
    });
  }

  private getAccountColor(type: string): string {
    const colors: Record<string, string> = {
      'CHECKING': '#1976d2',
      'SAVINGS': '#388e3c',
      'CREDIT': '#f57c00',
      'INVESTMENT': '#7b1fa2',
    };
    return colors[type] || '#757575';
  }

  trackByAccountId(index: number, account: Account): string {
    return account.id;
  }

  trackByTransactionId(index: number, transaction: Transaction): string {
    return transaction.id;
  }
}