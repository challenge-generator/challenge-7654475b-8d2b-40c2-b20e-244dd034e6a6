import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { tap, catchError, map, switchMap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  roles: string[];
  customerId?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface AuthResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

const TOKEN_KEY = 'auth_access_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';
const USER_KEY = 'auth_user';
const TOKEN_EXPIRY_KEY = 'auth_token_expiry';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  
  private readonly apiUrl = '/api/auth';
  private readonly tokenRefreshBuffer = 300000;
  
  private readonly _isAuthenticated = signal<boolean>(false);
  private readonly _currentUser = signal<AuthUser | null>(null);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);
  
  private refreshTokenTimeout: ReturnType<typeof setTimeout> | null = null;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);
  
  readonly isAuthenticated = computed(() => this._isAuthenticated());
  readonly currentUser = computed(() => this._currentUser());
  readonly isLoading = computed(() => this._isLoading());
  readonly error = computed(() => this._error());
  readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    if (this.isBrowser) {
      this.initializeAuthState();
    }
  }

  private initializeAuthState(): void {
    const token = this.getStoredToken();
    const user = this.getStoredUser();
    const expiry = this.getTokenExpiry();
    
    if (token && user && expiry && expiry > Date.now()) {
      this._isAuthenticated.set(true);
      this._currentUser.set(user);
      this.startRefreshTokenTimer();
    } else {
      this.clearAuthData();
    }
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    this._isLoading.set(true);
    this._error.set(null);
    
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => this.handleAuthSuccess(response)),
      catchError(error => this.handleAuthError(error)),
      finalize(() => this._isLoading.set(false))
    );
  }

  logout(): Observable<void> {
    const refreshToken = this.getStoredRefreshToken();
    
    if (refreshToken) {
      return this.http.post<void>(`${this.apiUrl}/logout`, { refreshToken }).pipe(
        tap(() => this.clearAuthData()),
        catchError(() => {
          this.clearAuthData();
          return of(undefined);
        })
      );
    }
    
    this.clearAuthData();
    return of(undefined);
  }

  refreshToken(): Observable<AuthTokens | null> {
    const refreshToken = this.getStoredRefreshToken();
    
    if (!refreshToken) {
      return of(null);
    }
    
    if (this.refreshTokenSubject.value) {
      return this.refreshTokenSubject.pipe(
        switchMap(token => token ? this.http.post<AuthTokens>(`${this.apiUrl}/refresh`, { refreshToken: token }) : of(null))
      );
    }
    
    this.refreshTokenSubject.next(refreshToken);
    
    return this.http.post<AuthTokens>(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      tap(tokens => this.handleTokenRefresh(tokens)),
      catchError(error => {
        this.clearAuthData();
        return of(null);
      }),
      finalize(() => this.refreshTokenSubject.next(null))
    );
  }

  getAccessToken(): string | null {
    return this.getStoredToken();
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getAccessToken();
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  hasRole(role: string): boolean {
    const user = this._currentUser();
    return user?.roles?.includes(role) ?? false;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this._currentUser();
    return user?.roles?.some(r => roles.includes(r)) ?? false;
  }

  updateUserProfile(updates: Partial<AuthUser>): Observable<AuthUser> {
    return this.http.patch<AuthUser>(`${this.apiUrl}/profile`, updates).pipe(
      tap(user => {
        this._currentUser.set(user);
        this.storeUser(user);
      })
    );
  }

  validateToken(): Observable<boolean> {
    const token = this.getAccessToken();
    if (!token) {
      return of(false);
    }
    
    return this.http.post<{ valid: boolean }>(`${this.apiUrl}/validate`, { token }).pipe(
      map(response => response.valid),
      catchError(() => of(false))
    );
  }

  private handleAuthSuccess(response: AuthResponse): void {
    this.storeTokens(response.tokens);
    this.storeUser(response.user);
    this._isAuthenticated.set(true);
    this._currentUser.set(response.user);
    this.startRefreshTokenTimer();
    this.router.navigate(['/dashboard']);
  }

  private handleAuthError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error de autenticación';
    
    if (error.status === 401) {
      errorMessage = 'Credenciales inválidas';
    } else if (error.status === 403) {
      errorMessage = 'Acceso denegado';
    } else if (error.status === 0) {
      errorMessage = 'Error de conexión';
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    }
    
    this._error.set(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  private handleTokenRefresh(tokens: AuthTokens): void {
    this.storeTokens(tokens);
    this.startRefreshTokenTimer();
  }

  private startRefreshTokenTimer(): void {
    this.stopRefreshTokenTimer();
    
    const token = this.getStoredToken();
    const expiry = this.getTokenExpiry();
    
    if (token && expiry) {
      const timeout = expiry - Date.now() - this.tokenRefreshBuffer;
      
      if (timeout > 0) {
        this.refreshTokenTimeout = setTimeout(() => {
          this.refreshToken().subscribe();
        }, timeout);
      } else {
        this.refreshToken().subscribe();
      }
    }
  }

  private stopRefreshTokenTimer(): void {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
      this.refreshTokenTimeout = null;
    }
  }

  private storeTokens(tokens: AuthTokens): void {
    if (!this.isBrowser) return;
    
    localStorage.setItem(TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    localStorage.setItem(TOKEN_EXPIRY_KEY, String(Date.now() + tokens.expiresIn * 1000));
  }

  private storeUser(user: AuthUser): void {
    if (!this.isBrowser) return;
    
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getStoredToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  private getStoredRefreshToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  private getStoredUser(): AuthUser | null {
    if (!this.isBrowser) return null;
    
    const userData = localStorage.getItem(USER_KEY);
    if (!userData) return null;
    
    try {
      return JSON.parse(userData) as AuthUser;
    } catch {
      return null;
    }
  }

  private getTokenExpiry(): number | null {
    if (!this.isBrowser) return null;
    
    const expiryStr = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiryStr) return null;
    
    const expiry = parseInt(expiryStr, 10);
    return isNaN(expiry) ? null : expiry;
  }

  private clearAuthData(): void {
    if (!this.isBrowser) return;
    
    this.stopRefreshTokenTimer();
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
    
    this._isAuthenticated.set(false);
    this._currentUser.set(null);
    this._error.set(null);
  }
}