import { NextRequest, NextResponse } from 'next/server';
import { getFilteredProducts } from '@/server/queries/product';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const filters = {
    search: searchParams.get('search') || undefined,
    categoryIds: searchParams.getAll('categories') || undefined,
    minPrice: searchParams.get('minPrice')
      ? Number(searchParams.get('minPrice'))
      : undefined,
    maxPrice: searchParams.get('maxPrice')
      ? Number(searchParams.get('maxPrice'))
      : undefined,
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    limit: 12,
  };

  const result = await getFilteredProducts(filters);
  return NextResponse.json(result);
}
