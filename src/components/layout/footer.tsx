'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Shield,
  Truck,
  ChevronRight,
  Globe,
  Gift,
} from 'lucide-react';
import { toast } from 'sonner';

interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  const [email, setEmail] = React.useState('');
  const [isSubscribing, setIsSubscribing] = React.useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsSubscribing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Deal message commented out - uncomment when deals are back
    // toast.success(
    //   'Thank you for subscribing! Check your email for 10% off coupon.'
    // );
    toast.success(
      'Thank you for subscribing! Welcome to SumNSubstance community.'
    );
    setEmail('');
    setIsSubscribing(false);
  };

  const trustFeatures = [
    {
      icon: Globe,
      title: 'Worldwide Shipping',
      description: 'International Shipping available Worldwide',
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free Shipping on all domestic prepaid orders above Rs. 899',
    },
    {
      icon: Gift,
      title: 'Earn Rewards',
      description: 'Unlock Rewards with each purchase you make',
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'All payments are processed securely',
    },
  ];

  const topCategories = [
    { name: 'Serums & Oils', href: '/categories/serums' },
    { name: 'Face Care', href: '/categories/face-care' },
    { name: 'Hair Care', href: '/categories/hair-care' },
    { name: 'Body Care', href: '/categories/body-care' },
    { name: 'Combos', href: '/categories/combos' },
  ];

  const policies = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms & Conditions', href: '/terms-conditions' },
    { name: 'Shipping & Cancellation', href: '/shipping-cancellation' },
    { name: 'Returns & Refund', href: '/returns-refund' },
  ];

  const bestSellers = [
    { name: 'Brightening Serum', href: '/products/brightening-serum' },
    { name: 'Under Eye Cream', href: '/products/under-eye-cream' },
    { name: 'Night Repair Combo', href: '/products/night-repair-combo' },
    { name: 'Face Wash', href: '/products/face-wash' },
    { name: 'Hair Growth Oil', href: '/products/hair-growth-oil' },
    { name: 'Body Lotion', href: '/products/body-lotion' },
  ];

  const info = [
    { name: 'Our Story', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Track Your Order', href: '/track-order' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Careers', href: '/careers' },
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'YouTube', href: '#', icon: Youtube },
  ];

  return (
    <footer className={`bg-white font-sans ${className}`}>
      {/* Trust Features Section */}
      <div className="bg-gray-50 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-[#233f1c] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Newsletter Signup */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <Link href="/" className="block">
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    <span className="text-[#ffd469]">Sum</span>NSubstance
                  </h2>
                </Link>
              </div>

              <div className="mb-6">
                {/* Deal message commented out - uncomment when deals are back */}
                {/* <h3 className="text-lg font-bold text-white mb-4">
                  Sign up to get 10% off on your first order
                </h3> */}
                <h3 className="text-lg font-bold text-white mb-4">
                  Stay updated with our latest skincare tips
                </h3>

                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="E-mail"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 rounded-lg px-4 py-3"
                      disabled={isSubscribing}
                    />
                    <Button
                      type="submit"
                      disabled={isSubscribing}
                      className="absolute right-1 top-1 bottom-1 bg-[#ffd469] hover:bg-[#fff2d4] text-[#233f1c] font-semibold px-4 rounded-md"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map(social => {
                  const IconComponent = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="w-8 h-8 bg-white/10 hover:bg-[#ffd469] rounded-lg flex items-center justify-center transition-colors group"
                    >
                      <IconComponent className="w-4 h-4 text-white group-hover:text-[#233f1c]" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Top Categories */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">
                Top Categories
              </h3>
              <ul className="space-y-3">
                {topCategories.map(category => (
                  <li key={category.name}>
                    <Link
                      href={category.href}
                      className="text-white/80 hover:text-[#ffd469] transition-colors text-sm"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">
                Policies
              </h3>
              <ul className="space-y-3">
                {policies.map(policy => (
                  <li key={policy.name}>
                    <Link
                      href={policy.href}
                      className="text-white/80 hover:text-[#ffd469] transition-colors text-sm"
                    >
                      {policy.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Best Sellers */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">
                Best Sellers
              </h3>
              <ul className="space-y-3">
                {bestSellers.map(product => (
                  <li key={product.name}>
                    <Link
                      href={product.href}
                      className="text-white/80 hover:text-[#ffd469] transition-colors text-sm"
                    >
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">
                Info
              </h3>
              <ul className="space-y-3">
                {info.map(item => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-white/80 hover:text-[#ffd469] transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#1a2e13] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Copyright */}
          <div className="text-center mb-6">
            <p className="text-white/60 text-sm">© 2025, Rev Skin Store</p>
          </div>

          {/* Brand Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white text-center">
              Natural skin care Products
            </h3>
            <p className="text-white/80 text-sm leading-relaxed max-w-4xl mx-auto text-center">
              There are lots of skincare brands online to get your hands on. But
              when you are considering to buy natural skin care products online
              then the Rev Skin store is your one-stop destination. The products
              that come from our store are made of carefully hand-picked organic
              ingredients. We have a wide range of skincare, hair care, and body
              care products for you to choose from. Use our Brightening Serum if
              you want flawless, shining skin. If you are looking for a product
              to give your hair a nice glow and shine you can choose our Hair
              Growth Oil. Check out our Under Eye Cream if you're seeking a
              solution that will help treat your dark circles or cracked heels.
            </p>

            <h4 className="text-lg font-semibold text-white text-center mt-6">
              Aspects In Natural Skin Care Products To Seek For
            </h4>
            <p className="text-white/80 text-sm leading-relaxed max-w-4xl mx-auto text-center">
              When you are planning to invest in good organic beauty products
              online, then it's important that you know what ingredients are
              used. The products you get from the Rev Skin store online have no
              artificial coloring or fragrance. If you are looking for one cult
              product that treats most of your skin and hair problems, check out
              our collection and start shopping today!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
