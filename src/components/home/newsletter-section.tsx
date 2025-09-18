'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-[#ffd469] via-[#fff2d4] to-[#ffd469]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl font-bold text-[#233f1c] mb-6">
          Get Glowing Skin Tips
        </h2>
        <p className="text-xl text-[#233f1c]/70 mb-8">
          Join our skincare community for exclusive tips, launches & offers
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8"
        >
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-6 py-4 rounded-2xl border-0 focus:ring-2 focus:ring-[#233f1c] outline-none text-lg"
            required
          />
          <Button
            type="submit"
            size="lg"
            className="bg-[#233f1c] hover:bg-[#2b3e1a] text-white px-8 py-4 rounded-2xl font-semibold text-lg"
          >
            Subscribe
          </Button>
        </form>

        <p className="text-[#233f1c]/60 text-sm">
          ✨ Join 50,000+ skincare enthusiasts • No spam • Unsubscribe anytime
        </p>
      </div>
    </section>
  );
}
