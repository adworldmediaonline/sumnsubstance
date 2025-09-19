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
      <HeroBannerV2 cartItemCount={0} />

      <FeaturedProductsV3 />

      {/* <TestimonialsSection /> */}

      <TrustBadges />

      <NewsletterSection />

      <Footer />
    </div>
  );
}
