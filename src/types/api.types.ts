import type z from "zod";
import type { CategoryInputSchema, CategoryTypeSchema, CategoryUpdateSchema, CurrencySchema, GetTransactionsQuerySchema, TransactionInputSchema, TransactionUpdateSchema } from "../schemas/api.schemas";

// Common types
export type TCurrency = z.infer<typeof CurrencySchema>; // e.g., 'EUR', 'USD', etc.

export type TCategoryType = z.infer<typeof CategoryTypeSchema>;

// Category types
export type TCategory = z.infer<
    typeof CategoryInputSchema
> & {
    _id: string;
    subCategories?: TCategory[];
    createdAt: string;
    updatedAt: string;
};

export type TCategoryInput = z.infer<typeof CategoryInputSchema>;

export type TCategoryUpdate = z.infer<typeof CategoryUpdateSchema>;

// Transaction types
export type TTransaction = {
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
    amountInEUR: number;
    createdAt: string;
    updatedAt: string;
}

export type TTransactionInput = z.infer<typeof TransactionInputSchema>;

export type TTransactionUpdate = z.infer<typeof TransactionUpdateSchema>;

export type TGetTransactionsQuery = z.infer<typeof GetTransactionsQuerySchema>;

// API Response types
export type TApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
}