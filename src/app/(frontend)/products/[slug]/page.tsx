import { getProductBySlug } from '@/server/queries/product';
import { notFound } from 'next/navigation';
import ProductDetailsClient from './product-details-client';

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}
