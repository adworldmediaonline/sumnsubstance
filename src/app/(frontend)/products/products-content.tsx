'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  useQueryStates,
  parseAsInteger,
  parseAsString,
  parseAsArrayOf,
} from 'nuqs';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import type { SerializedProductWithCategory } from '@/lib/serializers';
import type { CategoryWithCount } from '@/server/queries/category';
import ProductsFilter from './products-filter';
import ProductsGrid from './products-grid';

interface ProductsContentProps {
  initialProducts: SerializedProductWithCategory[];
  categories: CategoryWithCount[];
  totalCount: number;
  hasMore: boolean;
  initialPage: number;
}

export default function ProductsContent({
  initialProducts,
  categories,
  totalCount,
  hasMore,
  initialPage,
}: ProductsContentProps) {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [hasMoreProducts, setHasMoreProducts] = useState(hasMore);

  const [filters, setFilters] = useQueryStates({
    search: parseAsString.withDefault(''),
    categories: parseAsArrayOf(parseAsString).withDefault([]),
    minPrice: parseAsInteger,
    maxPrice: parseAsInteger,
  });

  const loadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;

    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    filters.categories.forEach((cat) => params.append('categories', cat));
    if (filters.minPrice !== null)
      params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice !== null)
      params.set('maxPrice', filters.maxPrice.toString());
    params.set('page', nextPage.toString());

    const response = await fetch(`/api/products/filter?${params.toString()}`);
    const data = await response.json();

    setProducts([...products, ...data.products]);
    setPage(nextPage);
    setHasMoreProducts(data.hasMore);
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-20">
      <Breadcrumb className="mb-6 hidden sm:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <aside className="lg:col-span-3">
          <ProductsFilter
            categories={categories}
            filters={filters}
            setFilters={setFilters}
          />
        </aside>
        <main className="lg:col-span-9">
          <ProductsGrid
            products={products}
            totalCount={totalCount}
            hasMore={hasMoreProducts}
            loading={loading}
            onLoadMore={loadMore}
          />
        </main>
      </div>
    </div>
  );
}
