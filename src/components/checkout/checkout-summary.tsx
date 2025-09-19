'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingCart, Shield, Truck, CreditCard, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  useCartItems,
  useCartItemCount,
  useCartTotalPrice,
} from '@/store/cart-store';

interface CheckoutSummaryProps {
  isProcessing: boolean;
  currentStep: number;
}

export function CheckoutSummary({
  isProcessing,
  currentStep,
}: CheckoutSummaryProps) {
  const items = useCartItems();
  const count = useCartItemCount();
  const subtotal = useCartTotalPrice();

  // Calculate costs
  const shipping = subtotal > 500 ? 0 : 50; // Free shipping over ₹500
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shipping + tax;

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Order Items */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
            Items ({count})
          </h4>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {items.map(item => (
              <div key={item.product.id} className="flex items-center gap-3">
                {/* Product Image */}
                <div className="relative h-12 w-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  {item.product.mainImage ? (
                    <Image
                      src={item.product.mainImage.url}
                      alt={item.product.mainImage.altText || item.product.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}

                  {/* Quantity Badge */}
                  <Badge
                    variant="secondary"
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  >
                    {item.quantity}
                  </Badge>
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h5 className="font-medium text-sm truncate">
                    {item.product.name}
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    {item.product.category.name}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm">
                      ₹{item.product.price.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium">
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Order Totals */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1">
              Shipping
              {shipping === 0 && (
                <Badge variant="secondary" className="text-xs ml-1">
                  FREE
                </Badge>
              )}
            </span>
            <span>₹{shipping.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Tax (GST 18%)</span>
            <span>₹{tax.toLocaleString()}</span>
          </div>

          <Separator />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-primary">₹{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Order Progress Indicator */}
        <div className="space-y-3 pt-4 border-t">
          <h4 className="text-sm font-medium text-muted-foreground">
            Checkout Progress
          </h4>

          <div className="space-y-2">
            <div
              className={`flex items-center gap-3 text-sm ${currentStep >= 1 ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <div
                className={`w-2 h-2 rounded-full ${currentStep >= 1 ? 'bg-primary' : 'bg-muted'}`}
              />
              <span>Customer Information</span>
              {currentStep > 1 && (
                <Badge variant="secondary" className="text-xs">
                  ✓
                </Badge>
              )}
            </div>

            <div
              className={`flex items-center gap-3 text-sm ${currentStep >= 2 ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <div
                className={`w-2 h-2 rounded-full ${currentStep >= 2 ? 'bg-primary' : 'bg-muted'}`}
              />
              <span>Shipping Details</span>
              {currentStep > 2 && (
                <Badge variant="secondary" className="text-xs">
                  ✓
                </Badge>
              )}
            </div>

            <div
              className={`flex items-center gap-3 text-sm ${currentStep >= 3 ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <div
                className={`w-2 h-2 rounded-full ${currentStep >= 3 ? 'bg-primary' : 'bg-muted'}`}
              />
              <span>Payment & Review</span>
              {isProcessing && (
                <Badge variant="secondary" className="text-xs">
                  Processing...
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="space-y-3 pt-4 border-t">
          <h4 className="text-sm font-medium text-muted-foreground">
            Secure Checkout
          </h4>

          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span>256-bit SSL encryption</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <CreditCard className="h-4 w-4 text-blue-600 flex-shrink-0" />
              <span>PCI DSS compliant payments</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Truck className="h-4 w-4 text-purple-600 flex-shrink-0" />
              <span>Secure delivery tracking</span>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        {shipping === 0 ? (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700 font-medium">
              🎉 You qualify for FREE shipping!
            </p>
          </div>
        ) : (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              Add ₹{(500 - subtotal).toLocaleString()} more to get{' '}
              <strong>FREE shipping</strong>
            </p>
          </div>
        )}

        {/* Money Back Guarantee */}
        <div className="p-3 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              30-day money-back guarantee
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
