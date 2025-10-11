// Common types
export type Currency = string; // e.g., 'EUR', 'USD', etc.

export type CategoryType = 'income' | 'expense';

// Category types
export type Category = {
  _id: string;
  name: string;
  type: CategoryType;
  description?: string;
  parentCategory?: string;
  subCategories?: Category[];
  createdAt: string;
  updatedAt: string;
}

export type CategoryInput = {
  name: string;
  type: CategoryType;
  description?: string;
  parentCategory?: string;
}

export type CategoryUpdate = {
  name?: string;
  type?: CategoryType;
  description?: string;
  parentCategory?: string;
}

// Transaction types
export type Transaction = {
  _id: string;
  title: string;
  description?: string;
  transactionDate: string;
  amount: number;
  currency: Currency;
  category: string | Category;
  amountInEUR?: number;
  createdAt: string;
  updatedAt: string;
}

export type TransactionInput = {
  title: string;
  description?: string;
  transactionDate: string;
  amount: number;
  currency: Currency;
  category: string;
}

export type TransactionUpdate = {
  title?: string;
  description?: string;
  transactionDate?: string;
  amount?: number;
  currency?: Currency;
  category?: string;
}

export type GetTransactionsQuery = {
  startDate: string;
  endDate: string;
  baseCurrency?: Currency;
}

// API Response types
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export type ApiError = {
  message: string;
  status?: number;
  code?: string;
}
