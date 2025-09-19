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
  'price' | 'additionalImages'
> & {
  price: number;
  mainImage?: {
    url: string;
    publicId: string;
    altText?: string;
  };
  additionalImages?: {
    url: string;
    publicId: string;
    altText?: string;
  }[];
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
export function serializeProduct<T extends { 
  price: Prisma.Decimal;
  mainImageUrl?: string | null;
  mainImagePublicId?: string | null;
  mainImageAlt?: string | null;
  additionalImages?: any;
}>(
  product: T
): Omit<T, 'price' | 'mainImageUrl' | 'mainImagePublicId' | 'mainImageAlt' | 'additionalImages'> & { 
  price: number;
  mainImage?: {
    url: string;
    publicId: string;
    altText?: string;
  };
  additionalImages?: {
    url: string;
    publicId: string;
    altText?: string;
  }[];
} {
  const mainImage = product.mainImageUrl && product.mainImagePublicId 
    ? {
        url: product.mainImageUrl,
        publicId: product.mainImagePublicId,
        altText: product.mainImageAlt || undefined,
      }
    : undefined;

  const additionalImages = product.additionalImages 
    ? (Array.isArray(product.additionalImages) ? product.additionalImages : [])
    : [];

  return {
    ...product,
    price: product.price.toNumber(),
    mainImage,
    additionalImages,
  } as any;
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
