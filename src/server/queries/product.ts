import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
    });

    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw new Error('Failed to fetch products');
  }
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    return product;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw new Error('Failed to fetch product');
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    return product;
  } catch (error) {
    console.error('Failed to fetch product by slug:', error);
    throw new Error('Failed to fetch product by slug');
  }
}

export async function getProductsByCategory(categoryId: string) {
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

    return products;
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

// Type exports for use in components
export type ProductWithCategory = Prisma.ProductGetPayload<{
  include: {
    category: true;
  };
}>;
