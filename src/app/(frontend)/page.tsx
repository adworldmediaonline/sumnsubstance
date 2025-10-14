import { getProducts } from '@/server/queries/product';
import {
  FeaturedProductsV3,
  HeroBannerV2,
  NewsletterSection,
  // TestimonialsSection,
  TrustBadges,
} from '../../components/home';
import Footer from '../../components/layout/footer';

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
    <div className="min-h-screen bg-white">
      <HeroBannerV2 />

      <FeaturedProductsV3 products={featuredProducts} />

      {/* <TestimonialsSection /> */}

      <TrustBadges />

      <NewsletterSection />

      <Footer />
    </div>
  );
}
