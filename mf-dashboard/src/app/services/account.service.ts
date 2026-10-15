import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, catchError, retry, finalize, map, tap } from 'rxjs';
import { Account, Transaction, CreateAccountRequest, CreateAccountResponse, AccountService, AccountError } from '@shared/models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceImpl implements AccountService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/v1/accounts';
  private readonly maxRetries = 3;
  private readonly retryDelay = 1000;
  
  private accountsCache$ = new BehaviorSubject<Account[] | null>(null);
  private loadingState$ = new BehaviorSubject<boolean>(false);

  getAccounts(customerId: string): Observable<Account[]> {
    if (this.accountsCache$.value && this.accountsCache$.value.length > 0) {
      return new Observable(subscriber => {
        subscriber.next([...this.accountsCache$.value]);
        subscriber.complete();
      });
    }

    this.loadingState$.next(true);
    
    const params = new HttpParams()
      .set('customerId', customerId)
      .set('includeDetails', 'true')
      .set('sortBy', 'createdAt')
      .set('sortOrder', 'desc');

    return this.http.get<Account[]>(`${this.apiUrl}`, { params }).pipe(
      tap(accounts => {
        this.accountsCache$.next(accounts);
        this.loadingState$.next(false);
        console.log(`[AccountService] Loaded ${accounts.length} accounts for customer ${customerId}`);
      }),
      retry({
        count: this.maxRetries,
        delay: (error, retryCount) => {
          console.warn(`[AccountService] Retry attempt ${retryCount} after error`);
          return new Observable(observer => {
            setTimeout(() => observer.next(), this.retryDelay * retryCount);
          });
        }
      }),
      catchError(this.handleError.bind(this)),
      finalize(() => this.loadingState$.next(false))
    );
  }

  getAccountById(accountId: string): Observable<Account | null> {
    const cached = this.accountsCache$.value?.find(a => a.id === accountId);
    if (cached) {
      return new Observable(subscriber => {
        subscriber.next({ ...cached });
        subscriber.complete();
      });
    }

    return this.http.get<Account>(`${this.apiUrl}/${accountId}`).pipe(
      tap(account => console.log(`[AccountService] Retrieved account ${accountId}: ${account.accountNumber}`)),
      retry({
        count: this.maxRetries,
        delay: (error, retryCount) => {
          console.warn(`[AccountService] Retry attempt ${retryCount} for account ${accountId}`);
          return new Observable(observer => {
            setTimeout(() => observer.next(), this.retryDelay * retryCount);
          });
        }
      }),
      catchError(this.handleError.bind(this))
    );
  }

  createAccount(request: CreateAccountRequest): Observable<CreateAccountResponse> {
    this.loadingState$.next(true);
    
    const payload = {
      ...request,
      requestedAt: new Date().toISOString(),
      channel: 'DIGITAL_MF_DASHBOARD'
    };

    return this.http.post<CreateAccountResponse>(`${this.apiUrl}`, payload).pipe(
      tap(response => {
        console.log(`[AccountService] Account created: ${response.accountId}`);
        this.invalidateCache();
        this.loadingState$.next(false);
      }),
      retry({
        count: this.maxRetries,
        delay: (error, retryCount) => {
          console.warn(`[AccountService] Retry attempt ${retryCount} for account creation`);
          return new Observable(observer => {
            setTimeout(() => observer.next(), this.retryDelay * retryCount);
          });
        }
      }),
      catchError(this.handleError.bind(this)),
      finalize(() => this.loadingState$.next(false))
    );
  }

  updateAccountStatus(accountId: string, status: 'ACTIVE' | 'FROZEN' | 'CLOSED'): Observable<boolean> {
    this.loadingState$.next(true);
    
    const payload = {
      status,
      updatedAt: new Date().toISOString(),
      source: 'MF_DASHBOARD'
    };

    return this.http.patch<{ success: boolean }>(`${this.apiUrl}/${accountId}/status`, payload).pipe(
      map(response => response.success),
      tap(success => {
        console.log(`[AccountService] Account ${accountId} status updated to ${status}: ${success}`);
        if (success) {
          this.invalidateCache();
        }
        this.loadingState$.next(false);
      }),
      retry({
        count: this.maxRetries,
        delay: (error, retryCount) => {
          console.warn(`[AccountService] Retry attempt ${retryCount} for status update`);
          return new Observable(observer => {
            setTimeout(() => observer.next(), this.retryDelay * retryCount);
          });
        }
      }),
      catchError(this.handleError.bind(this)),
      finalize(() => this.loadingState$.next(false))
    );
  }

  getTransactions(accountId: string, limit?: number): Observable<Transaction[]> {
    let params = new HttpParams().set('accountId', accountId);
    
    if (limit && limit > 0) {
      params = params.set('limit', limit.toString());
    } else {
      params = params.set('limit', '50');
    }

    return this.http.get<Transaction[]>(`${this.apiUrl}/${accountId}/transactions`, { params }).pipe(
      tap(transactions => 
        console.log(`[AccountService] Loaded ${transactions.length} transactions for account ${accountId}`)
      ),
      retry({
        count: this.maxRetries,
        delay: (error, retryCount) => {
          console.warn(`[AccountService] Retry attempt ${retryCount} for transactions`);
          return new Observable(observer => {
            setTimeout(() => observer.next(), this.retryDelay * retryCount);
          });
        }
      }),
      catchError(this.handleError.bind(this))
    );
  }

  isLoading(): Observable<boolean> {
    return this.loadingState$.asObservable();
  }

  clearCache(): void {
    this.invalidateCache();
  }

  private invalidateCache(): void {
    this.accountsCache$.next(null);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    let errorCode: string;

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error de red: ${error.error.message}`;
      errorCode = 'NETWORK_ERROR';
    } else {
      switch (error.status) {
        case 0:
          errorMessage = 'El servicio de cuentas no está disponible';
          errorCode = 'SERVICE_UNAVAILABLE';
          break;
        case 400:
          errorMessage = error.error?.message || 'Solicitud inválida';
          errorCode = 'BAD_REQUEST';
          break;
        case 401:
          errorMessage = 'No autorizado. Por favor, inicie sesión nuevamente';
          errorCode = 'UNAUTHORIZED';
          break;
        case 403:
          errorMessage = 'No tiene permisos para acceder a este recurso';
          errorCode = 'FORBIDDEN';
          break;
        case 404:
          errorMessage = error.error?.message || 'Recurso no encontrado';
          errorCode = 'NOT_FOUND';
          break;
        case 429:
          errorMessage = 'Demasiadas solicitudes. Por favor, espere un momento';
          errorCode = 'RATE_LIMITED';
          break;
        case 500:
          errorMessage = 'Error interno del servidor. Intente más tarde';
          errorCode = 'INTERNAL_ERROR';
          break;
        case 503:
          errorMessage = 'Servicio temporalmente no disponible';
          errorCode = 'MAINTENANCE';
          break;
        default:
          errorMessage = error.error?.message || `Error desconocido: ${error.status}`;
          errorCode = 'UNKNOWN_ERROR';
      }
    }

    console.error(`[AccountService] Error ${errorCode}:`, errorMessage, error);
    
    const accountError = new AccountError(errorMessage, errorCode, error.status);
    return throwError(() => accountError);
  }
}