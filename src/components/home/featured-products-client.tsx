'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Star, ShoppingBag, Minus, Plus, Share2 } from 'lucide-react';
import type { SerializedProductWithCategory } from '@/lib/serializers';
import { useAddItem } from '@/store/cart-store';
import { toast } from 'sonner';

interface FeaturedProduct extends SerializedProductWithCategory {
  // Additional frontend-only fields
  isWishlisted?: boolean;
  inStock?: boolean;
  featured?: boolean;
  // Fields to be added later
  originalPrice?: number;
  benefits?: string[];
}

interface FeaturedProductsClientProps {
  products: FeaturedProduct[];
}

export function FeaturedProductsClient({
  products,
}: FeaturedProductsClientProps) {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const addItem = useAddItem();

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const quantity = quantities[productId] || 1;

    // Convert to cart product format
    const cartProduct = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      excerpt: product.excerpt || undefined,
      mainImage: product.mainImage,
      category: product.category,
    };

    addItem(cartProduct, quantity);
    toast.success(`${product.name} added to cart!`);

    // Reset quantity for this product
    setQuantities(prev => ({ ...prev, [productId]: 1 }));
  };

  const handleToggleWishlist = (productId: string) => {
    console.log('Toggle wishlist:', productId);
  };

  const handleShare = (product: FeaturedProduct) => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        // text: product.excerpt,
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
    <div className="space-y-12">
      {products.map((product, index) => {
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
                              product.mainImage?.url ||
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

                        {/* Corner Accent Diamonds */}
                        <div className="absolute top-12 left-12 w-6 h-6 bg-gradient-to-br from-[#ffd469] to-[#ffd469]/70 rotate-45 shadow-lg group-hover:scale-110 transition-all duration-300"></div>
                        <div className="absolute bottom-12 right-12 w-4 h-4 bg-gradient-to-br from-[#233f1c] to-[#233f1c]/70 rotate-45 shadow-lg group-hover:scale-110 transition-all duration-300"></div>

                        {/* Symmetrical Ring Elements */}
                        <div className="absolute inset-8 rounded-full border-2 border-white/30 group-hover:border-white/50 transition-all duration-500"></div>
                        <div className="absolute inset-12 rounded-full border border-[#ffd469]/20 group-hover:border-[#ffd469]/40 transition-all duration-500"></div>
                      </div>
                    </Link>

                    {/* Enhanced Sale Badge with Gradient - Commented out until originalPrice is added */}
                    {/* {product.originalPrice && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-20">
                        Sale
                      </div>
                    )} */}

                    {/* Enhanced Category Badge */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-sm text-[#233f1c] text-sm font-semibold px-4 py-2 rounded-full shadow-lg border border-[#ffd469]/20 z-20">
                      {product.category.name}
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
                      {product.excerpt ||
                        product.description ||
                        'Premium quality product with excellent results.'}
                    </p>
                  </div>

                  {/* Enhanced Price with Gradient Accents */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {/* Commented out until originalPrice is added */}
                      {/* {product.originalPrice && (
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
                      )} */}
                    </div>
                  </div>

                  {/* Enhanced Benefits with Gradients - Commented out until benefits are added */}
                  {/* <div className="mb-6">
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
                  </div> */}

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
                        Total: ₹{(product.price * quantity).toLocaleString()}
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
  );
}
