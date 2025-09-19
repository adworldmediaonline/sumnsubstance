import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    return categories;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw new Error('Failed to fetch categories');
  }
}

export async function getCategoryById(id: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    return category;
  } catch (error) {
    console.error('Failed to fetch category:', error);
    throw new Error('Failed to fetch category');
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    return category;
  } catch (error) {
    console.error('Failed to fetch category by slug:', error);
    throw new Error('Failed to fetch category by slug');
  }
}

export async function checkCategoryNameExists(
  name: string,
  excludeId?: string
) {
  try {
    const category = await prisma.category.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
        ...(excludeId && { id: { not: excludeId } }),
      },
    });

    return !!category;
  } catch (error) {
    console.error('Failed to check category name:', error);
    throw new Error('Failed to check category name');
  }
}

export async function checkCategorySlugExists(
  slug: string,
  excludeId?: string
) {
  try {
    const category = await prisma.category.findFirst({
      where: {
        slug,
        ...(excludeId && { id: { not: excludeId } }),
      },
    });

    return !!category;
  } catch (error) {
    console.error('Failed to check category slug:', error);
    throw new Error('Failed to check category slug');
  }
}

// Type exports for use in components
export type CategoryWithCount = Prisma.CategoryGetPayload<{
  include: {
    _count: {
      select: {
        products: true;
      };
    };
  };
}>;

export type CategoryWithProducts = Prisma.CategoryGetPayload<{
  include: {
    products: true;
    _count: {
      select: {
        products: true;
      };
    };
  };
}>;
