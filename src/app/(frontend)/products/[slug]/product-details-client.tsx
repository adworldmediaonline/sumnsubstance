'use client';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import ProductFAQ from '@/components/products/ProductFAQ';
import ProductReviews from '@/components/products/ProductReviews';
import RelatedProducts from '@/components/products/RelatedProducts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  mockProduct,
  mockRelatedProducts,
  mockReviews,
} from '@/constants/product-mock-data';

import {
  Award,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Heart,
  Leaf,
  Minus,
  Plus,
  Share2,
  Shield,
  ShoppingCart,
  Sparkles,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Import Swiper core and required modules
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default function ProductDetailsClient() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [showStickyCart, setShowStickyCart] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [showImageZoom, setShowImageZoom] = useState(false);

  // Add scroll listener for sticky cart
  useEffect(() => {
    const handleScroll = () => {
      const addToCartSection = document.getElementById('add-to-cart-section');
      if (addToCartSection) {
        const rect = addToCartSection.getBoundingClientRect();
        setShowStickyCart(rect.bottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle image loading
  useEffect(() => {
    setIsImageLoading(true);
    const img = new window.Image();
    img.onload = () => setIsImageLoading(false);
    img.src = mockProduct.images[selectedImageIndex]?.url || '';
  }, [selectedImageIndex]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header cartItemCount={0} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 relative overflow-visible">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4 lg:mb-8 overflow-x-auto scrollbar-hide">
          <Link href="/" className="hover:text-[#233f1c] whitespace-nowrap">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href="/products"
            className="hover:text-[#233f1c] whitespace-nowrap"
          >
            Products
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href={`/categories/${mockProduct.category.name.toLowerCase()}`}
            className="hover:text-[#233f1c] whitespace-nowrap"
          >
            {mockProduct.category.name}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#233f1c] font-medium truncate">
            {mockProduct.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-6 lg:mb-10 lg:items-start">
          {/* Product Images - Sticky on desktop */}
          <div className="space-y-3 lg:space-y-4 lg:sticky lg:top-4 lg:self-start">
            {/* Main Image */}
            <div className="relative w-full aspect-square bg-gray-50 rounded-2xl lg:rounded-3xl overflow-hidden group">
              {/* Loading skeleton */}
              {isImageLoading && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-2xl lg:rounded-3xl z-10"></div>
              )}

              <div
                className={`relative w-full h-full transition-transform duration-300 ${
                  showImageZoom ? 'scale-150' : 'group-hover:scale-105'
                }`}
                onClick={() => setShowImageZoom(!showImageZoom)}
              >
                <Image
                  src={mockProduct.images[selectedImageIndex]?.url || ''}
                  alt={mockProduct.name}
                  fill
                  className={`object-cover transition-opacity duration-300 ${
                    isImageLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  onLoad={() => setIsImageLoading(false)}
                  onError={() => setIsImageLoading(false)}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Zoom indicator - Hidden on mobile */}
              <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block">
                🔍 Click to zoom
              </div>

              {/* Image counter */}
              <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4 bg-black/60 text-white px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium z-20">
                {selectedImageIndex + 1} / {mockProduct.images.length}
              </div>

              {/* Badges */}
              <div className="absolute top-3 lg:top-4 left-3 lg:left-4 flex flex-col gap-2 z-20">
                {mockProduct.isBestSeller && (
                  <Badge className="bg-[#ffd469] text-[#233f1c] font-bold text-xs lg:text-sm">
                    <Award className="w-3 h-3 mr-1" />
                    Best Seller
                  </Badge>
                )}
                {mockProduct.isNewLaunch && (
                  <Badge className="bg-[#233f1c] text-white font-bold text-xs lg:text-sm">
                    <Sparkles className="w-3 h-3 mr-1" />
                    New Launch
                  </Badge>
                )}
              </div>

              {/* Wishlist & Share - Mobile optimized */}
              <div className="absolute top-3 lg:top-4 right-3 lg:right-4 flex flex-col gap-2 z-20">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all touch-manipulation ${
                    isWishlisted
                      ? 'bg-red-500 text-white'
                      : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-white'
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 lg:w-5 lg:h-5 ${
                      isWishlisted ? 'fill-current' : ''
                    }`}
                  />
                </button>
                <button className="w-10 h-10 lg:w-12 lg:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:bg-white transition-all touch-manipulation">
                  <Share2 className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
              </div>
            </div>

            {/* Mobile Swipe Gallery - Redesigned */}
            <div className="block lg:hidden">
              <Swiper
                modules={[]}
                spaceBetween={6}
                slidesPerView={'auto'}
                centeredSlides={false}
                className="!pb-2 w-full"
                style={{ overflow: 'visible' }}
                breakpoints={{
                  640: {
                    spaceBetween: 8,
                  },
                }}
              >
                {mockProduct.images.map((image, index) => (
                  <SwiperSlide
                    key={index}
                    className="!w-14 !h-14 sm:!w-16 sm:!h-16"
                  >
                    <button
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-full h-full rounded-lg overflow-hidden border-2 transition-all duration-300 touch-manipulation relative ${
                        selectedImageIndex === index
                          ? 'border-[#233f1c] shadow-sm scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={`${mockProduct.name} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                      {/* Selected indicator */}
                      {selectedImageIndex === index && (
                        <div className="absolute inset-0 bg-[#233f1c]/10 flex items-center justify-center">
                          <div className="w-3 h-3 bg-[#233f1c] rounded-full flex items-center justify-center">
                            <svg
                              className="w-1.5 h-1.5 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Desktop Thumbnail Gallery */}
            <div className="relative hidden lg:block">
              <Swiper
                modules={[Navigation]}
                spaceBetween={8}
                slidesPerView={6}
                navigation={{
                  prevEl: '.thumbnail-prev',
                  nextEl: '.thumbnail-next',
                }}
                breakpoints={{
                  1024: {
                    slidesPerView: 6,
                    spaceBetween: 8,
                  },
                  1280: {
                    slidesPerView: 7,
                    spaceBetween: 10,
                  },
                }}
                className="!pb-0"
              >
                {mockProduct.images.map((image, index) => (
                  <SwiperSlide key={index} className="!w-20 !h-20">
                    <button
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-full h-full rounded-lg overflow-hidden border-2 transition-all relative ${
                        selectedImageIndex === index
                          ? 'border-[#233f1c] shadow-sm'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={`${mockProduct.name} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation buttons */}
              <Button
                variant="outline"
                size="icon"
                className="thumbnail-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-7 h-7 rounded-full border border-[#233f1c] text-[#233f1c] hover:bg-[#233f1c] hover:text-white transition-all z-10"
              >
                <ChevronLeft className="w-3 h-3" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="thumbnail-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-7 h-7 rounded-full border border-[#233f1c] text-[#233f1c] hover:bg-[#233f1c] hover:text-white transition-all z-10"
              >
                <ChevronRight className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-3 lg:space-y-4">
            {/* Product Title & Rating */}
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#233f1c] mb-2 lg:mb-3 leading-tight">
                {mockProduct.name}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-500 fill-current"
                    />
                  ))}
                  <span className="text-gray-600 ml-2 text-sm">
                    (1,847 reviews)
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600 w-fit text-xs"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  In Stock
                </Badge>
              </div>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                {mockProduct.description}
              </p>
            </div>

            {/* Price - Mobile optimized */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl lg:text-3xl font-bold text-[#233f1c]">
                  ₹{mockProduct.price}
                </span>
              </div>
              <p className="text-xs text-gray-600">Inclusive of all taxes</p>
            </div>

            {/* Key Benefits - Mobile optimized */}
            <div className="bg-[#ffd469]/10 rounded-xl p-4">
              <h3 className="font-bold text-[#233f1c] mb-2 flex items-center text-sm lg:text-base">
                <Sparkles className="w-4 h-4 mr-2" />
                Key Benefits
              </h3>
              <div className="grid grid-cols-1 gap-1.5">
                {mockProduct.benefits?.split(' • ').map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start text-gray-700 text-sm"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart - Mobile optimized */}
            <div className="space-y-3 lg:space-y-4" id="add-to-cart-section">
              <div className="space-y-2">
                <span className="font-medium text-gray-700 text-sm lg:text-base">
                  Quantity:
                </span>
                <div className="flex items-center justify-center bg-gray-50 border border-gray-200 rounded-xl p-1.5 w-fit mx-auto lg:mx-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 lg:w-12 lg:h-12 bg-white hover:bg-[#233f1c] hover:text-white rounded-lg flex items-center justify-center transition-all duration-200 group touch-manipulation"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4 lg:w-5 lg:h-5 group-disabled:text-gray-400" />
                  </button>
                  <div className="w-16 lg:w-20 text-center">
                    <span className="text-xl lg:text-2xl font-bold text-[#233f1c]">
                      {quantity}
                    </span>
                  </div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 lg:w-12 lg:h-12 bg-white hover:bg-[#233f1c] hover:text-white rounded-lg flex items-center justify-center transition-all duration-200 group touch-manipulation"
                  >
                    <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                </div>
              </div>

              {/* Enhanced Action Buttons - Mobile optimized */}
              <div className="space-y-2 lg:space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3">
                  <Button
                    size="lg"
                    className="bg-[#233f1c] hover:bg-[#2b3e1a] text-white py-3 lg:py-4 text-sm lg:text-base font-bold rounded-xl group transition-all duration-300 hover:shadow-lg hover:shadow-[#233f1c]/20 touch-manipulation order-2 sm:order-1"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Add to Cart
                  </Button>
                  <Button
                    size="lg"
                    className="bg-[#ffd469] hover:bg-[#ffca28] text-[#233f1c] py-3 lg:py-4 text-sm lg:text-base font-bold rounded-xl group transition-all duration-300 hover:shadow-lg hover:shadow-[#ffd469]/20 touch-manipulation order-1 sm:order-2"
                  >
                    ⚡ Buy Now
                  </Button>
                </div>

                {/* Wishlist & Share - Mobile optimized */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-gray-300 hover:border-red-500 hover:text-red-500 py-3 lg:py-4 rounded-2xl group transition-all duration-300 touch-manipulation"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart
                      className={`w-4 h-4 lg:w-5 lg:h-5 mr-2 transition-all ${
                        isWishlisted
                          ? 'fill-red-500 text-red-500'
                          : 'group-hover:fill-red-500'
                      }`}
                    />
                    <span className="text-sm lg:text-base">
                      {isWishlisted ? 'Saved' : 'Save'}
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-gray-300 hover:border-[#233f1c] hover:text-[#233f1c] py-3 lg:py-4 rounded-2xl group transition-all duration-300 touch-manipulation"
                  >
                    <Share2 className="w-4 h-4 lg:w-5 lg:h-5 mr-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm lg:text-base">Share</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-8 lg:mb-12">
          {/* Mobile Tab Navigation */}
          <div className="border-b border-gray-200 mb-6 lg:mb-8 overflow-x-auto">
            <nav className="flex space-x-1 lg:space-x-8 min-w-max lg:min-w-0">
              {[
                { id: 'description', label: 'Description' },
                { id: 'usage', label: 'How to Use' },
                { id: 'ingredients', label: 'Ingredients' },
                { id: 'reviews', label: 'Reviews (1,847)' },
                { id: 'faq', label: 'FAQ' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 lg:py-4 px-4 lg:px-2 border-b-2 font-medium text-sm lg:text-base transition-colors whitespace-nowrap touch-manipulation ${
                    activeTab === tab.id
                      ? 'border-[#233f1c] text-[#233f1c]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="max-w-4xl">
            {activeTab === 'description' && (
              <div className="space-y-4 lg:space-y-6">
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-[#233f1c] mb-3 lg:mb-4">
                    Product Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4 lg:mb-6 text-sm lg:text-base">
                    {mockProduct.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-base lg:text-lg font-semibold text-[#233f1c] mb-3">
                    Key Benefits
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {mockProduct.benefits
                      ?.split(' • ')
                      .map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-start text-gray-700 text-sm lg:text-base"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-base lg:text-lg font-semibold text-[#233f1c] mb-3">
                    Additional Information
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                    {mockProduct.otherInformation}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'usage' && (
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-[#233f1c] mb-3 lg:mb-4">
                  How to Use
                </h3>
                <div className="bg-[#ffd469]/10 rounded-xl lg:rounded-2xl p-4 lg:p-6">
                  <p className="text-gray-700 leading-relaxed mb-4 lg:mb-6 text-sm lg:text-base">
                    {mockProduct.usageInstructions}
                  </p>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mt-4 lg:mt-6">
                    <div className="text-center">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-[#233f1c] rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold text-lg lg:text-xl">
                          1
                        </span>
                      </div>
                      <h4 className="font-semibold text-[#233f1c] mb-2 text-sm lg:text-base">
                        Cleanse
                      </h4>
                      <p className="text-xs lg:text-sm text-gray-600">
                        Start with a clean face and neck
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-[#233f1c] rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold text-lg lg:text-xl">
                          2
                        </span>
                      </div>
                      <h4 className="font-semibold text-[#233f1c] mb-2 text-sm lg:text-base">
                        Apply
                      </h4>
                      <p className="text-xs lg:text-sm text-gray-600">
                        Use 2-3 drops and gently massage
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-[#233f1c] rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold text-lg lg:text-xl">
                          3
                        </span>
                      </div>
                      <h4 className="font-semibold text-[#233f1c] mb-2 text-sm lg:text-base">
                        Protect
                      </h4>
                      <p className="text-xs lg:text-sm text-gray-600">
                        Follow with sunscreen during day
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-[#233f1c] mb-3 lg:mb-4">
                  Ingredients
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <div className="bg-white border border-gray-200 rounded-xl lg:rounded-2xl p-4 lg:p-6">
                    <h4 className="font-semibold text-[#233f1c] mb-3 flex items-center text-sm lg:text-base">
                      <Leaf className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                      Key Ingredients
                    </h4>
                    <ul className="space-y-2 text-gray-700 text-sm lg:text-base">
                      <li>• Hyaluronic Acid - 1.5%</li>
                      <li>• Ceramides Complex - 5%</li>
                      <li>• Glycerin - 8%</li>
                      <li>• Niacinamide - 3%</li>
                      <li>• Shea Butter - 10%</li>
                    </ul>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl lg:rounded-2xl p-4 lg:p-6">
                    <h4 className="font-semibold text-[#233f1c] mb-3 flex items-center text-sm lg:text-base">
                      <Shield className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                      Free From
                    </h4>
                    <ul className="space-y-2 text-gray-700 text-sm lg:text-base">
                      <li>• Parabens</li>
                      <li>• Sulfates</li>
                      <li>• Artificial Fragrances</li>
                      <li>• Mineral Oil</li>
                      <li>• Animal Testing</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <ProductReviews reviews={mockReviews} />
            )}

            {activeTab === 'faq' && <ProductFAQ faq={mockProduct.faq} />}
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts products={mockRelatedProducts} />
      </main>

      <Footer />

      {/* Enhanced Sticky Mobile Add to Cart */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 transition-all duration-300 lg:hidden ${
          showStickyCart ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Product Image */}
            <div className="flex-shrink-0 relative w-12 h-12">
              <Image
                src={mockProduct.images[0]?.url || ''}
                alt={mockProduct.name}
                fill
                className="object-cover rounded-lg shadow-sm"
                sizes="48px"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate text-sm leading-tight">
                {mockProduct.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-bold text-[#233f1c]">
                  ₹{mockProduct.price}
                </span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-gray-100 transition-colors touch-manipulation"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="px-3 py-2 font-medium text-sm min-w-[2rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-gray-100 transition-colors touch-manipulation"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <Button
              size="sm"
              className="bg-[#233f1c] hover:bg-[#2b3e1a] text-white px-4 py-2 rounded-xl font-bold shadow-lg transition-all duration-300 touch-manipulation"
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              <span className="text-sm">Add</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
