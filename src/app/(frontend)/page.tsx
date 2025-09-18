import {
  HeroBannerV2,
  FeaturedProductsV3,
  // TestimonialsSection,
  TrustBadges,
  NewsletterSection,
} from '../../components/home';
import Footer from '../../components/layout/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner with integrated header functionality */}
      <HeroBannerV2 cartItemCount={0} />

      {/* Luxury Showcase Design */}
      <FeaturedProductsV3 />

      {/* Original Design for Comparison */}
      {/* <div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Original Design (For Comparison)
          </h2>
          <p className="text-gray-600">Current featured products section</p>
        </div>
        <FeaturedProducts user={user} />
      </div> */}

      {/* <BestSellersGrid /> */}

      {/* Deal sections commented out - uncomment when deals are back */}
      {/* <PromotionalBanner /> */}

      {/* <CategoriesSection /> */}

      {/* <DealsSection /> */}

      {/* <TestimonialsSection /> */}

      <TrustBadges />

      <NewsletterSection />

      <Footer />
    </div>
  );
}
