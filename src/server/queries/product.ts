import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import {
  serializeProduct,
  serializeProducts,
  SerializedProductWithCategory,
} from '@/lib/serializers';

export async function getProducts(): Promise<SerializedProductWithCategory[]> {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
    });

    return serializeProducts(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw new Error('Failed to fetch products');
  }
}

export async function getProductById(
  id: string
): Promise<SerializedProductWithCategory | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!product) {
      return null;
    }

    return serializeProduct(product);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw new Error('Failed to fetch product');
  }
}

export async function getProductBySlug(
  slug: string
): Promise<SerializedProductWithCategory | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    return product ? serializeProduct(product) : null;
  } catch (error) {
    console.error('Failed to fetch product by slug:', error);
    throw new Error('Failed to fetch product by slug');
  }
}

export async function getProductsByCategory(
  categoryId: string
): Promise<SerializedProductWithCategory[]> {
  try {
    const products = await prisma.product.findMany({
      where: { categoryId },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
    });

    return serializeProducts(products);
  } catch (error) {
    console.error('Failed to fetch products by category:', error);
    throw new Error('Failed to fetch products by category');
  }
}

export async function checkProductNameExists(name: string, excludeId?: string) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
        ...(excludeId && { id: { not: excludeId } }),
      },
    });

    return !!product;
  } catch (error) {
    console.error('Failed to check product name:', error);
    throw new Error('Failed to check product name');
  }
}

export async function checkProductSlugExists(slug: string, excludeId?: string) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        slug,
        ...(excludeId && { id: { not: excludeId } }),
      },
    });

    return !!product;
  } catch (error) {
    console.error('Failed to check product slug:', error);
    throw new Error('Failed to check product slug');
  }
}

// Re-export types from serializers for convenience
export type { SerializedProductWithCategory } from '@/lib/serializers';
