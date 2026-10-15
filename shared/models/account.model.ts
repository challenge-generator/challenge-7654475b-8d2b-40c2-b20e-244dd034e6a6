import { InjectionToken } from '@angular/core';

/**
 * Representa una cuenta bancaria con sus transacciones asociadas.
 * Se usa como modelo compartido entre el shell y todos los micro-frontends.
 */
export interface Account {
  id: string;
  accountNumber: string;
  accountType: 'CHECKING' | 'SAVINGS' | 'LOAN' | 'INVESTMENT';
  balance: number;
  currency: string;
  customerId: string;
  lastUpdated: Date;
  status: 'ACTIVE' | 'FROZEN' | 'CLOSED';
  transactions?: Transaction[];
}

export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  currency: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER' | 'FEE' | 'INTEREST';
  description: string;
  date: Date;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REVERSED';
  referenceId?: string;
  relatedAccountId?: string;
}

/**
 * DTO para la creación de una nueva cuenta bancaria.
 */
export interface CreateAccountRequest {
  accountType: 'CHECKING' | 'SAVINGS' | 'LOAN' | 'INVESTMENT';
  customerId: string;
  initialDeposit: number;
  currency: string;
}

/**
 * DTO para la respuesta de creación de cuenta.
 */
export interface CreateAccountResponse {
  accountId: string;
  accountNumber: string;
  status: 'CREATED' | 'FAILED';
  message?: string;
}

/**
 * Token de inyección para el servicio de cuentas.
 * Permite desacoplar la implementación concreta del servicio.
 */
export const ACCOUNT_SERVICE_TOKEN = new InjectionToken<AccountService>('AccountService');

/**
 * Contrato para el servicio de cuentas bancarias.
 * Define las operaciones disponibles sobre las cuentas.
 */
export interface AccountService {
  getAccounts(customerId: string): Promise<Account[]>;
  getAccountById(accountId: string): Promise<Account | null>;
  createAccount(request: CreateAccountRequest): Promise<CreateAccountResponse>;
  updateAccountStatus(accountId: string, status: 'ACTIVE' | 'FROZEN' | 'CLOSED'): Promise<boolean>;
  getTransactions(accountId: string, limit?: number): Promise<Transaction[]>;
}

/**
 * Excepción personalizada para errores relacionados con cuentas bancarias.
 */
export class AccountError extends Error {
  constructor(
    public readonly code:
      | 'ACCOUNT_NOT_FOUND'
      | 'INSUFFICIENT_FUNDS'
      | 'INVALID_ACCOUNT_TYPE'
      | 'ACCOUNT_FROZEN'
      | 'INVALID_AMOUNT'
      | 'CREATION_FAILED',
    message: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'AccountError';
  }
}