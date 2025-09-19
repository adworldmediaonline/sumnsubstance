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
}

export function CheckoutSummary({ isProcessing }: CheckoutSummaryProps) {
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
      </CardContent>
    </Card>
  );
}
