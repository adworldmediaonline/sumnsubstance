import React from 'react';
import Link from 'next/link';
import { Shield, Sparkles } from 'lucide-react';
import { FeaturedProductsClient } from './featured-products-client';
import type { SerializedProductWithCategory } from '@/server/queries/product';

interface Product extends SerializedProductWithCategory {
  // Additional frontend-only fields
  isWishlisted?: boolean;
  inStock?: boolean;
  featured?: boolean;
  // Fields to be added later
  originalPrice?: number;
  benefits?: string[];
}

interface FeaturedProductsProps {
  products: Product[];
  user?: {
    id: string;
    email: string;
    name?: string;
  } | null;
}

export default function FeaturedProductsV3({
  products,
  user,
}: FeaturedProductsProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-[#ffd469]/10 via-white to-[#233f1c]/10 font-sans relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-64 h-64 bg-gradient-to-r from-[#ffd469]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-gradient-to-l from-[#233f1c]/15 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header with Gradients */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#233f1c]/10 to-[#ffd469]/10 backdrop-blur-sm text-[#233f1c] px-6 py-3 rounded-full text-sm font-medium mb-8 border border-[#233f1c]/20">
            <Shield className="w-4 h-4" />
            <span>Dermatologist Approved • Science-Backed</span>
            <Sparkles className="w-4 h-4 text-[#ffd469]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#233f1c] via-[#2b3e1a] to-[#233f1c] bg-clip-text text-transparent mb-6">
            Featured Products
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our carefully selected skincare essentials, formulated with
            <span className="text-[#233f1c] font-semibold">
              {' '}
              science-backed ingredients
            </span>{' '}
            for visible results.
          </p>
        </div>

        {/* Enhanced Product Grid with Gradients */}
        <FeaturedProductsClient products={products} user={user} />

        {/* Enhanced CTA with Beautiful Gradients */}
        <div className="text-center mt-16">
          <div className="relative bg-gradient-to-r from-[#233f1c] via-[#2b3e1a] to-[#233f1c] rounded-3xl p-12 text-center overflow-hidden shadow-2xl">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffd469]/10 to-transparent"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-[#ffd469] to-[#fff2d4] rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#233f1c]" />
                </div>
                <h3 className="text-3xl font-bold text-white">
                  Explore Our Complete Collection
                </h3>
                <div className="w-10 h-10 bg-gradient-to-r from-[#ffd469] to-[#fff2d4] rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#233f1c]" />
                </div>
              </div>

              <p className="text-[#ffd469]/90 text-lg mb-8 max-w-2xl mx-auto">
                Discover more scientifically-backed skincare solutions designed
                for your unique skin needs.
              </p>

              <Link
                href="/products"
                className="inline-block bg-gradient-to-r from-[#ffd469] to-[#fff2d4] hover:from-[#fff2d4] hover:to-[#ffd469] text-[#233f1c] font-bold px-10 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
