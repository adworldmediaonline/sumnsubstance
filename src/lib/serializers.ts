import { Prisma } from '@prisma/client';

// Product serialization utilities
export type ProductWithCategory = Prisma.ProductGetPayload<{
  include: { category: true };
}>;

export type SerializedProduct = Omit<Prisma.ProductGetPayload<{}>, 'price'> & {
  price: number;
};

export type SerializedProductWithCategory = Omit<
  ProductWithCategory,
  'price'
> & {
  price: number;
  description?: string;
};

// Category serialization utilities
export type CategoryWithProducts = Prisma.CategoryGetPayload<{
  include: {
    products: true;
    _count: { select: { products: true } };
  };
}>;

export type SerializedCategoryWithProducts = Omit<
  CategoryWithProducts,
  'products'
> & {
  products: SerializedProduct[];
};

// Serialization functions
export function serializeProduct<T extends { price: Prisma.Decimal }>(
  product: T
): Omit<T, 'price'> & { price: number } {
  return {
    ...product,
    price: product.price.toNumber(),
  };
}

export function serializeProducts<T extends { price: Prisma.Decimal }>(
  products: T[]
): (Omit<T, 'price'> & { price: number })[] {
  return products.map(serializeProduct);
}

export function serializeCategoryWithProducts(
  category: CategoryWithProducts
): SerializedCategoryWithProducts {
  return {
    ...category,
    products: serializeProducts(category.products),
  };
}
