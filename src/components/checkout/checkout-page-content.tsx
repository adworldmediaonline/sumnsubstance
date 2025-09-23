'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckoutForm } from '@/components/checkout/checkout-form';
import { CheckoutSummary } from '@/components/checkout/checkout-summary';
import { EmptyCartRedirect } from '@/components/checkout/empty-cart-redirect';
import {
  useCartItems,
} from '@/store/cart-store';
import { authClient } from '@/lib/auth-client';

export function CheckoutPageContent() {
  const { data: session } = authClient.useSession();
  const items = useCartItems();

  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if cart is empty
  if (items.length === 0) {
    return <EmptyCartRedirect />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Checkout Section */}
      <div className="lg:col-span-2 space-y-6">
        {/* Checkout Form */}
        <CheckoutForm
          isProcessing={isProcessing}
          onProcessingChange={setIsProcessing}
          user={session?.user}
        />

        {/* Back to Cart */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <Link href="/cart">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Cart
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Summary Section */}
      <div className="lg:col-span-1">
        <div className="sticky top-8">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
}
