import { getProducts } from '@/server/queries/product';
import {
  FeaturedProductsV3,
  NewsletterSection,
  TrustBadges,
} from '../../components/home';
import HeroContent from '../../components/home/hero-content';

export default async function Home() {
  // Fetch real products from database
  const allProducts = await getProducts();

  // Take first 4 products for featured section
  const featuredProducts = allProducts.slice(0, 4).map(product => ({
    ...product,
    isWishlisted: false, // Default values for frontend-only fields
    inStock: true,
    featured: true,
  }));

  return (
    <>
      <HeroContent />
      <FeaturedProductsV3 products={featuredProducts} />
      <TrustBadges />
      <NewsletterSection />
    </>
  );
}
