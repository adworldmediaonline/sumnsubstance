'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  Star,
  ShoppingBag,
  Shield,
  CheckCircle,
  Sparkles,
  Minus,
  Plus,
  Share2,
} from 'lucide-react';
import { SessionUser } from '@/lib/auth';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: { url: string; alt?: string }[];
  category?: string;
  isWishlisted?: boolean;
  inStock?: boolean;
  featured?: boolean;
  benefits?: string[];
  description?: string;
}

interface FeaturedProductsProps {
  user?: SessionUser | null;
}

const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Advanced Vitamin C Serum',
    slug: 'advanced-vitamin-c-serum',
    price: 1299,
    originalPrice: 1599,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=500&h=500&fit=crop&crop=center',
        alt: 'Advanced Vitamin C Serum',
      },
    ],
    category: 'Serums',
    isWishlisted: false,
    inStock: true,
    featured: true,
    benefits: ['Brightens Skin', 'Anti-Aging', 'Antioxidant Rich'],
    description:
      'A powerful vitamin C serum that brightens and protects your skin with clinically proven results.',
  },
  {
    id: '2',
    name: 'Hydrating Face Moisturizer',
    slug: 'hydrating-face-moisturizer',
    price: 899,
    originalPrice: 1199,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&h=500&fit=crop&crop=center',
        alt: 'Hydrating Face Moisturizer',
      },
    ],
    category: 'Moisturizers',
    isWishlisted: true,
    inStock: true,
    featured: true,
    benefits: ['Deep Hydration', '24H Moisture', 'Plumping Effect'],
    description:
      'Luxurious moisturizer that provides intense hydration and creates a smooth, plump complexion.',
  },
  {
    id: '3',
    name: 'Gentle Cleansing Oil',
    slug: 'gentle-cleansing-oil',
    price: 649,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=500&fit=crop&crop=center',
        alt: 'Gentle Cleansing Oil',
      },
    ],
    category: 'Cleansers',
    isWishlisted: false,
    inStock: true,
    featured: true,
    benefits: ['Deep Cleansing', 'Makeup Removal', 'Nourishing'],
    description:
      'Gentle yet effective cleansing oil that melts away makeup while nourishing your skin.',
  },
  {
    id: '4',
    name: 'Nourishing Night Cream',
    slug: 'nourishing-night-cream',
    price: 1499,
    originalPrice: 1799,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop&crop=center',
        alt: 'Nourishing Night Cream',
      },
    ],
    category: 'Night Care',
    isWishlisted: false,
    inStock: true,
    featured: true,
    benefits: ['Overnight Repair', 'Anti-Aging', 'Skin Renewal'],
    description:
      "Rich night cream that works while you sleep to repair and restore your skin's natural radiance.",
  },
];

export default function FeaturedProductsV3({}: FeaturedProductsProps) {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handleAddToCart = (productId: string) => {
    const quantity = quantities[productId] || 1;
    console.log('Add to cart:', productId, 'Quantity:', quantity);
  };

  const handleToggleWishlist = (productId: string) => {
    console.log('Toggle wishlist:', productId);
  };

  const handleShare = (product: Product) => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: `/products/${product.slug}`,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `${window.location.origin}/products/${product.slug}`
      );
      console.log('Product link copied to clipboard');
    }
  };

  const updateQuantity = (productId: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + change),
    }));
  };

  const getQuantity = (productId: string) => quantities[productId] || 1;

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
        <div className="space-y-12">
          {featuredProducts.map((product, index) => {
            const isReversed = index % 2 === 1;
            const rating = 4.5 + index * 0.1;
            const quantity = getQuantity(product.id);

            return (
              <div key={product.id} className="group">
                <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50 hover:border-[#ffd469]/30 hover:-translate-y-2">
                  <div
                    className={`flex flex-col lg:flex-row ${
                      isReversed ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Enhanced Product Image with Symmetrical Layout */}
                    <div
                      className={`lg:w-1/2 bg-gradient-to-br ${
                        index % 4 === 0
                          ? 'from-[#ffd469]/15 via-[#fff2d4]/10 to-white'
                          : index % 4 === 1
                          ? 'from-[#233f1c]/10 via-white to-[#ffd469]/15'
                          : index % 4 === 2
                          ? 'from-white via-[#ffd469]/10 to-[#233f1c]/10'
                          : 'from-[#233f1c]/15 via-[#2b3e1a]/5 to-[#ffd469]/10'
                      } flex items-center justify-center p-8 lg:p-12 relative`}
                    >
                      {/* Subtle floating elements */}
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-[#ffd469]/20 to-transparent rounded-full blur-xl"></div>
                        <div className="absolute bottom-8 left-8 w-20 h-20 bg-gradient-to-br from-[#233f1c]/15 to-transparent rounded-full blur-2xl"></div>
                      </div>

                      {/* Symmetrical Container with Product Image Background */}
                      <div className="relative z-10 w-full max-w-[380px] h-[380px]">
                        <Link href={`/products/${product.slug}`}>
                          {/* Symmetrical Geometric Container */}
                          <div className="relative w-full h-full">
                            {/* Primary Circle - Main Product Display */}
                            <div
                              className="absolute inset-0 rounded-full bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm shadow-2xl border border-white/50 overflow-hidden group-hover:scale-105 transition-all duration-500"
                              style={{
                                backgroundImage: `url(${
                                  product.images[0]?.url ||
                                  '/placeholder-product.jpg'
                                })`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundBlendMode: 'overlay',
                              }}
                            >
                              {/* Overlay gradient for better text visibility */}
                              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-[#233f1c]/10"></div>
                            </div>

                            {/* Secondary Circles - Symmetrical Accent Elements */}
                            {/* <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br from-[#ffd469]/80 to-[#ffd469]/60 shadow-lg group-hover:rotate-12 transition-all duration-500 flex items-center justify-center">
                              <div className="w-12 h-12 rounded-full bg-white/90 shadow-inner flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-[#233f1c]" />
                              </div>
                            </div> */}

                            {/* <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-br from-[#233f1c]/80 to-[#233f1c]/60 shadow-lg group-hover:-rotate-12 transition-all duration-500 flex items-center justify-center">
                              <div className="w-10 h-10 rounded-full bg-white/90 shadow-inner flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-[#233f1c]" />
                              </div>
                            </div> */}

                            {/* Corner Accent Diamonds */}
                            <div className="absolute top-12 left-12 w-6 h-6 bg-gradient-to-br from-[#ffd469] to-[#ffd469]/70 rotate-45 shadow-lg group-hover:scale-110 transition-all duration-300"></div>
                            <div className="absolute bottom-12 right-12 w-4 h-4 bg-gradient-to-br from-[#233f1c] to-[#233f1c]/70 rotate-45 shadow-lg group-hover:scale-110 transition-all duration-300"></div>

                            {/* Symmetrical Ring Elements */}
                            <div className="absolute inset-8 rounded-full border-2 border-white/30 group-hover:border-white/50 transition-all duration-500"></div>
                            <div className="absolute inset-12 rounded-full border border-[#ffd469]/20 group-hover:border-[#ffd469]/40 transition-all duration-500"></div>
                          </div>
                        </Link>

                        {/* Enhanced Sale Badge with Gradient */}
                        {/* {product.originalPrice && (
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-20">
                            Sale
                          </div>
                        )} */}

                        {/* Enhanced Category Badge */}
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-sm text-[#233f1c] text-sm font-semibold px-4 py-2 rounded-full shadow-lg border border-[#ffd469]/20 z-20">
                          {product.category}
                        </div>

                        {/* Enhanced Action Buttons - Wishlist & Share */}
                        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                          {/* Share Button */}
                          <button
                            onClick={() => handleShare(product)}
                            className="w-12 h-12 bg-white/90 hover:bg-gradient-to-r hover:from-[#ffd469]/20 hover:to-[#233f1c]/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <Share2 className="w-5 h-5 text-gray-600 hover:text-[#233f1c]" />
                          </button>

                          {/* Wishlist Button */}
                          <button
                            onClick={() => handleToggleWishlist(product.id)}
                            className="w-12 h-12 bg-white/90 hover:bg-gradient-to-r hover:from-[#ffd469]/20 hover:to-[#233f1c]/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <Heart
                              className={`w-5 h-5 transition-all duration-300 ${
                                product.isWishlisted
                                  ? 'fill-red-500 text-red-500'
                                  : 'text-gray-400 hover:text-red-400'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Product Info */}
                    <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                      {/* Product Name & Rating */}
                      <div className="mb-6">
                        <Link href={`/products/${product.slug}`}>
                          <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3 hover:from-[#233f1c] hover:to-[#2b3e1a] transition-all duration-300">
                            {product.name}
                          </h3>
                        </Link>

                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 transition-all duration-300 ${
                                  i < Math.floor(rating)
                                    ? 'fill-[#ffd469] text-[#ffd469]'
                                    : 'text-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-gray-600 font-medium">
                            {rating.toFixed(1)} (150+ reviews)
                          </span>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-4">
                          {product.description}
                        </p>
                      </div>

                      {/* Enhanced Price with Gradient Accents */}
                      <div className="mb-6">
                        <div className="flex items-baseline gap-3 mb-2">
                          <span className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            ₹{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <>
                              <span className="text-xl text-gray-400 line-through">
                                ₹{product.originalPrice.toLocaleString()}
                              </span>
                              <span className="text-[#233f1c] font-bold bg-gradient-to-r from-[#233f1c]/10 to-[#ffd469]/10 px-3 py-1 rounded-full text-sm border border-[#233f1c]/20">
                                Save ₹
                                {(
                                  product.originalPrice - product.price
                                ).toLocaleString()}
                              </span>
                            </>
                          )}
                        </div>
                        <p className="text-gray-500 text-sm">
                          Free shipping on orders over ₹999 • 30-day guarantee
                        </p>
                      </div>

                      {/* Enhanced Benefits with Gradients */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Key Benefits:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {product.benefits?.map(benefit => (
                            <span
                              key={benefit}
                              className="inline-flex items-center gap-1 bg-gradient-to-r from-[#233f1c]/10 to-[#ffd469]/10 text-[#233f1c] text-sm font-medium px-3 py-2 rounded-full border border-[#233f1c]/20 hover:from-[#233f1c]/20 hover:to-[#ffd469]/20 transition-all duration-300"
                            >
                              <CheckCircle className="w-3 h-3" />
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Enhanced Quantity Selector */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Quantity:
                        </h4>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-full overflow-hidden">
                            <button
                              onClick={() => updateQuantity(product.id, -1)}
                              className="w-10 h-10 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#233f1c]/10 hover:to-[#ffd469]/10 transition-all duration-300"
                              disabled={quantity <= 1}
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="w-12 text-center font-semibold text-gray-900">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, 1)}
                              className="w-10 h-10 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#233f1c]/10 hover:to-[#ffd469]/10 transition-all duration-300"
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                          <span className="text-sm text-gray-500">
                            Total: ₹
                            {(product.price * quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Enhanced Action Buttons with Beautiful Gradients */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          className="flex-1 bg-gradient-to-r from-[#233f1c] via-[#2b3e1a] to-[#233f1c] hover:from-[#ffd469] hover:via-[#fff2d4] hover:to-[#ffd469] text-white hover:text-[#233f1c] font-bold py-4 px-6 rounded-full transition-all duration-500 flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl hover:shadow-[#ffd469]/40 transform hover:scale-105 relative overflow-hidden group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-[#ffd469]/20 to-[#233f1c]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <ShoppingBag className="w-5 h-5 relative z-10" />
                          <span className="relative z-10">Add to Cart</span>
                        </button>

                        <Link
                          href={`/products/${product.slug}`}
                          className="flex-1 bg-gradient-to-r from-transparent to-transparent border-2 border-[#233f1c] text-[#233f1c] hover:bg-gradient-to-r hover:from-[#233f1c] hover:to-[#2b3e1a] hover:text-white font-semibold py-4 px-6 rounded-full transition-all duration-300 text-center transform hover:scale-105"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

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
