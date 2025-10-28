'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import ProductCard from '@/components/products/product-card';
import type { SerializedProductWithCategory } from '@/lib/serializers';

interface ProductsGridProps {
  products: SerializedProductWithCategory[];
  totalCount: number;
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
}

export default function ProductsGrid({
  products,
  totalCount,
  hasMore,
  loading,
  onLoadMore,
}: ProductsGridProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Products</h1>
        <p className="text-muted-foreground">{totalCount} products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              price: product.price,
              images: product.mainImage
                ? [{ url: product.mainImage.url, alt: product.mainImage.altText }]
                : [],
              category: product.category?.name,
              inStock: true,
            }}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center py-8">
          <Button
            onClick={onLoadMore}
            disabled={loading}
            variant="outline"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More Products'
            )}
          </Button>
        </div>
      )}

      {!hasMore && products.length > 0 && (
        <p className="text-center text-muted-foreground py-8">
          You've reached the end of the catalog
        </p>
      )}

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No products found</p>
          <p className="text-sm text-muted-foreground mt-2">
            Try adjusting your filters
          </p>
        </div>
      )}
    </div>
  );
}
