import z from "zod";
import { it } from "zod/locales";

// Common schemas
export const CurrencySchema = z.string();

export const CategoryTypeSchema = z.enum(['income', 'expense']);

// Category schemas
export const CategoryInputSchema = z.object({
  name: z.string().min(1, "Il nome della categoria è obbligatorio"),
  type: CategoryTypeSchema,
  parentCategory: z.string().optional(),
});

export const CategoryUpdateSchema = z.object({
  name: z.string().min(1, "Il nome della categoria è obbligatorio").optional(),
  type: CategoryTypeSchema.optional(),
  parentCategory: z.string().optional(),
}).strict();

// Transaction schemas
export const TransactionInputSchema = z.object({
  title: z.string().min(1, "Il titolo della transazione è obbligatorio"),
  description: z.string().optional(),
  transactionDate: z.string(),
  amount: z.number().positive("L'importo deve essere positivo"),
  currency: CurrencySchema,
  category: z.string(),
});

export const TransactionUpdateSchema = z.object({
  title: z.string().min(1, "Il titolo della transazione è obbligatorio").optional(),
  description: z.string().optional(),
  transactionDate: z.string().optional(),
  amount: z.number().positive("L'importo deve essere positivo").optional(),
  currency: CurrencySchema.optional(),
  category: z.string().optional(),
}).strict();

export const GetTransactionsQuerySchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  baseCurrency: CurrencySchema.optional(),
});

// API Response schemas
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    message: z.string().optional(),
    error: z.string().optional(),
  });

export const ApiErrorSchema = z.object({
  message: z.string(),
  status: z.number().optional(),
  code: z.string().optional(),
});
