'use client';

import { ArrowRight, Star, Shield, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroBanner() {
  return (
    <section className="relative min-h-[700px] bg-gradient-to-br from-[#ffd469]/15 via-white to-[#233f1c]/10 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-20 w-96 h-96 bg-gradient-to-l from-[#ffd469]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -left-20 w-80 h-80 bg-gradient-to-r from-[#233f1c]/15 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-[#ffd469]/10 to-[#233f1c]/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[700px] py-20">
          {/* Enhanced Left Content */}
          <div className="space-y-10">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#233f1c]/10 to-[#ffd469]/10 backdrop-blur-sm px-6 py-3 rounded-full text-[#233f1c] font-semibold shadow-lg border border-[#233f1c]/20">
              <Shield className="w-5 h-5" />
              <span>Dermatologist Approved • Science-Backed</span>
              <Sparkles className="w-5 h-5 text-[#ffd469]" />
            </div>

            {/* Enhanced Hero Title */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-[#233f1c] via-[#2b3e1a] to-[#233f1c] bg-clip-text text-transparent">
                  Transform
                </span>
                <span className="block bg-gradient-to-r from-[#2b3e1a] to-[#233f1c] bg-clip-text text-transparent">
                  Your Skin
                </span>
                <span className="block text-2xl lg:text-4xl xl:text-5xl bg-gradient-to-r from-[#ffd469] to-[#fff2d4] bg-clip-text text-transparent font-medium">
                  Naturally & Scientifically
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed max-w-2xl">
                Experience the perfect blend of
                <span className="text-[#233f1c] font-bold">
                  {' '}
                  nature's wisdom
                </span>{' '}
                and
                <span className="text-[#233f1c] font-bold">
                  {' '}
                  scientific innovation
                </span>
                for radiant, healthy skin that glows from within.
              </p>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-[#ffd469] fill-current"
                    />
                  ))}
                </div>
                <div className="text-gray-700">
                  <span className="text-2xl font-bold text-[#233f1c]">4.9</span>
                  <span className="text-lg font-medium ml-2">
                    from 10,000+ reviews
                  </span>
                </div>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Clinically Tested',
                  'Natural Ingredients',
                  'Cruelty-Free',
                  'Dermatologist Approved',
                ].map(benefit => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-full border border-[#233f1c]/10"
                  >
                    <CheckCircle className="w-5 h-5 text-[#233f1c]" />
                    <span className="text-[#233f1c] font-medium">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#233f1c] via-[#2b3e1a] to-[#233f1c] hover:from-[#ffd469] hover:via-[#fff2d4] hover:to-[#ffd469] text-white hover:text-[#233f1c] px-10 py-6 text-xl font-bold rounded-full shadow-lg hover:shadow-2xl hover:shadow-[#ffd469]/40 border-2 border-transparent hover:border-[#233f1c]/20"
              >
                Shop Now
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#233f1c] text-[#233f1c] hover:bg-gradient-to-r hover:from-[#233f1c] hover:to-[#2b3e1a] hover:text-white px-10 py-6 text-xl font-semibold rounded-full bg-white/80 backdrop-blur-sm shadow-lg"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Enhanced Right Product Display */}
          <div className="relative flex justify-center items-center">
            <div className="relative">
              {/* Main Product Showcase */}
              <div className="relative bg-gradient-to-br from-white via-white to-gray-50/50 rounded-3xl p-10 shadow-2xl border border-white/50">
                <div className="w-80 h-80 bg-gradient-to-br from-[#ffd469]/15 via-[#fff2d4]/10 to-[#233f1c]/10 rounded-2xl overflow-hidden shadow-inner border border-[#ffd469]/20">
                  <img
                    src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop&crop=center"
                    alt="Premium Skincare Product"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Premium Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#ffd469] to-[#fff2d4] text-[#233f1c] px-6 py-3 rounded-full text-lg font-bold shadow-xl border-2 border-white">
                  ✨ Best Seller
                </div>

                {/* Price Tag */}
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-[#233f1c] to-[#2b3e1a] text-white px-6 py-3 rounded-full shadow-xl">
                  <span className="text-lg font-bold">₹1,299</span>
                  <span className="text-sm ml-2 line-through opacity-70">
                    ₹1,599
                  </span>
                </div>
              </div>

              {/* Floating Product Cards */}
              <div className="absolute -bottom-8 -right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
                <div className="w-24 h-24 bg-gradient-to-br from-[#233f1c]/10 to-[#ffd469]/10 rounded-xl overflow-hidden border border-[#233f1c]/10">
                  <img
                    src="https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=300&h=300&fit=crop&crop=center"
                    alt="Vitamin C Serum"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="text-sm font-semibold text-[#233f1c]">
                    Vitamin C
                  </p>
                  <p className="text-xs text-gray-600">Serum</p>
                </div>
              </div>

              <div className="absolute -top-8 -left-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
                <div className="w-24 h-24 bg-gradient-to-br from-[#ffd469]/15 to-[#233f1c]/10 rounded-xl overflow-hidden border border-[#ffd469]/20">
                  <img
                    src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=300&fit=crop&crop=center"
                    alt="Moisturizer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="text-sm font-semibold text-[#233f1c]">
                    Hydrating
                  </p>
                  <p className="text-xs text-gray-600">Moisturizer</p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-16 right-16 w-16 h-16 bg-gradient-to-br from-[#ffd469]/30 to-transparent rounded-full blur-xl"></div>
              <div className="absolute bottom-16 left-16 w-20 h-20 bg-gradient-to-br from-[#233f1c]/20 to-transparent rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-20 fill-white">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,69.3C960,85,1056,107,1152,112C1248,117,1344,107,1392,101.3L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
}
