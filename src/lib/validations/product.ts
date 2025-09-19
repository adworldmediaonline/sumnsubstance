import { z } from 'zod';

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, 'Product name is required')
    .max(200, 'Product name must be less than 200 characters')
    .trim(),
  description: z.string().optional(),
  price: z
    .number()
    .min(0.01, 'Price must be greater than 0')
    .max(999999.99, 'Price is too high'),
  categoryId: z.string().min(1, 'Category is required'),
});

export const updateProductSchema = z.object({
  id: z.string().min(1, 'Product ID is required'),
  name: z
    .string()
    .min(1, 'Product name is required')
    .max(200, 'Product name must be less than 200 characters')
    .trim(),
  description: z.string().optional(),
  price: z
    .number()
    .min(0.01, 'Price must be greater than 0')
    .max(999999.99, 'Price is too high'),
  categoryId: z.string().min(1, 'Category is required'),
});

export const deleteProductSchema = z.object({
  id: z.string().min(1, 'Product ID is required'),
});
