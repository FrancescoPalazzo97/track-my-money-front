import type z from "zod";
import type { CategoryInputSchema, CategoryTypeSchema, CategoryUpdateSchema, CurrencySchema, GetTransactionsQuerySchema, TransactionInputSchema, TransactionUpdateSchema } from "../schemas/api.schemas";

// Common types
export type Currency = z.infer<typeof CurrencySchema>; // e.g., 'EUR', 'USD', etc.

export type CategoryType = z.infer<typeof CategoryTypeSchema>;

// Category types
export type Category = z.infer<
  typeof CategoryInputSchema
> & {
  _id: string;
  subCategories?: Category[];
  createdAt: string;
  updatedAt: string;
};

export type CategoryInput = z.infer<typeof CategoryInputSchema>;

export type CategoryUpdate = z.infer<typeof CategoryUpdateSchema>;

// Transaction types
export type Transaction = {
  title: string;
  transactionDate: string;
  amount: number;
  currency: string;
  category: {
    _id: string;
    type: 'expense' | 'income';
  };
  description?: string | undefined;
  _id: string;
  amountInEUR?: number;
  createdAt: string;
  updatedAt: string;
}

export type TransactionInput = z.infer<typeof TransactionInputSchema>;

export type TransactionUpdate = z.infer<typeof TransactionUpdateSchema>;

export type GetTransactionsQuery = z.infer<typeof GetTransactionsQuerySchema>;

// API Response types
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
}
