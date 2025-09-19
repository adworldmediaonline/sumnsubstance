'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import slugify from 'slugify';
import {
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
} from '@/lib/validations/product';

// Server Actions
export async function createProduct(data: z.infer<typeof createProductSchema>) {
  try {
    // Validate input
    const validatedData = createProductSchema.parse(data);
    const { name, price, categoryId } = validatedData;

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return {
        success: false,
        error: 'Selected category does not exist',
      };
    }

    // Generate slug
    const baseSlug = slugify(name, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    // Ensure slug is unique
    while (await prisma.product.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        price,
        categoryId,
      },
      include: {
        category: true,
      },
    });

    revalidatePath('/dashboard/products');
    revalidatePath('/dashboard/categories');

    return {
      success: true,
      data: product,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || 'Invalid input data',
      };
    }

    console.error('Failed to create product:', error);
    return {
      success: false,
      error: 'Failed to create product. Please try again.',
    };
  }
}

export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    // Validate input
    const validatedData = updateProductSchema.parse(data);
    const { id, name, price, categoryId } = validatedData;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return {
        success: false,
        error: 'Product not found',
      };
    }

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return {
        success: false,
        error: 'Selected category does not exist',
      };
    }

    // Generate new slug if name changed
    let slug = existingProduct.slug;
    if (existingProduct.name !== name) {
      const baseSlug = slugify(name, { lower: true, strict: true });
      slug = baseSlug;
      let counter = 1;

      // Ensure slug is unique (excluding current product)
      while (
        await prisma.product.findFirst({
          where: {
            slug,
            id: { not: id },
          },
        })
      ) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        price,
        categoryId,
      },
      include: {
        category: true,
      },
    });

    revalidatePath('/dashboard/products');
    revalidatePath(`/dashboard/products/${id}/edit`);
    revalidatePath('/dashboard/categories');

    return {
      success: true,
      data: updatedProduct,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || 'Invalid input data',
      };
    }

    console.error('Failed to update product:', error);
    return {
      success: false,
      error: 'Failed to update product. Please try again.',
    };
  }
}

export async function deleteProduct(data: z.infer<typeof deleteProductSchema>) {
  try {
    // Validate input
    const validatedData = deleteProductSchema.parse(data);
    const { id } = validatedData;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!existingProduct) {
      return {
        success: false,
        error: 'Product not found',
      };
    }

    // Delete product
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath('/dashboard/products');
    revalidatePath('/dashboard/categories');

    return {
      success: true,
      message: `Product "${existingProduct.name}" has been deleted successfully.`,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || 'Invalid input data',
      };
    }

    console.error('Failed to delete product:', error);
    return {
      success: false,
      error: 'Failed to delete product. Please try again.',
    };
  }
}
