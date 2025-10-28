import { Suspense } from 'react';
import { getFilteredProducts } from '@/server/queries/product';
import { getCategories } from '@/server/queries/category';
import ProductsContent from './products-content';
import ProductsSkeleton from './products-skeleton';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    categories?: string | string[];
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  }>;
}) {
  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <ProductsPageWrapper searchParams={searchParams} />
    </Suspense>
  );
}

async function ProductsPageWrapper({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    categories?: string | string[];
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const categoriesData = await getCategories();

  const filters = {
    search: params.search,
    categoryIds: Array.isArray(params.categories)
      ? params.categories
      : params.categories
        ? [params.categories]
        : undefined,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    page: params.page ? Number(params.page) : 1,
    limit: 12,
  };

  const { products, totalCount, hasMore } = await getFilteredProducts(filters);

  return (
    <ProductsContent
      initialProducts={products}
      categories={categoriesData}
      totalCount={totalCount}
      hasMore={hasMore}
      initialPage={filters.page}
    />
  );
}
