'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  ArrowLeft,
  Lock,
  CreditCard,
  Truck,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CheckoutForm } from '@/components/checkout/checkout-form';
import { CheckoutSummary } from '@/components/checkout/checkout-summary';
import { EmptyCartRedirect } from '@/components/checkout/empty-cart-redirect';
import {
  useCartItems,
  useCartItemCount,
  useCartTotalPrice,
} from '@/store/cart-store';
import { authClient } from '@/lib/auth-client';

export function CheckoutPageContent() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const items = useCartItems();
  const count = useCartItemCount();
  const total = useCartTotalPrice();

  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if cart is empty
  if (items.length === 0) {
    return <EmptyCartRedirect />;
  }

  const steps = [
    { id: 1, name: 'Information', icon: ShoppingBag },
    { id: 2, name: 'Shipping', icon: Truck },
    { id: 3, name: 'Payment', icon: CreditCard },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Checkout Section */}
      <div className="lg:col-span-2 space-y-6">
        {/* Progress Steps */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                      currentStep >= step.id
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'border-muted-foreground/30 text-muted-foreground'
                    }`}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <p
                      className={`text-sm font-medium ${
                        currentStep >= step.id
                          ? 'text-primary'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {step.name}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`mx-6 h-0.5 w-16 transition-all duration-300 ${
                        currentStep > step.id ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Badges */}
        <div className="flex items-center justify-center gap-6 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-green-600" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4 text-green-600" />
            <span>256-bit Encryption</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CreditCard className="h-4 w-4 text-blue-600" />
            <span>Razorpay Secured</span>
          </div>
        </div>

        {/* Checkout Form */}
        <CheckoutForm
          currentStep={currentStep}
          onStepChange={setCurrentStep}
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
          <CheckoutSummary
            isProcessing={isProcessing}
            currentStep={currentStep}
          />
        </div>
      </div>
    </div>
  );
}
