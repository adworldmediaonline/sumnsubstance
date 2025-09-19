'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  FileText,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  minimalCheckoutFormSchema,
  type MinimalCheckoutFormData,
} from '@/lib/validations/order';
import { useCartItems, useClearCart } from '@/store/cart-store';
import { toast } from 'sonner';

interface CheckoutFormProps {
  isProcessing: boolean;
  onProcessingChange: (processing: boolean) => void;
  user?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export function CheckoutForm({
  isProcessing,
  onProcessingChange,
  user,
}: CheckoutFormProps) {
  const cartItems = useCartItems();
  const clearCart = useClearCart();

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      customerInfo: {
        email: user?.email || '',
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ').slice(1).join(' ') || '',
        phone: '',
      },
      shippingAddress: {
        fullName: user?.name || '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'India',
        isDefault: false,
      },
      shippingMethod: 'standard',
      paymentMethod: 'razorpay',
      orderNotes: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      onProcessingChange(true);

      // Process the order directly - all fields are validated by the form schema
      await processOrder(data);
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('An error occurred during checkout. Please try again.');
    } finally {
      onProcessingChange(false);
    }
  };

  const processOrder = async (data: any) => {
    try {
      // Create order payload
      const orderPayload = {
        items: cartItems.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        customerInfo: data.customerInfo,
        shippingAddress: {
          ...data.shippingAddress,
          email: data.customerInfo.email, // Use customer email for shipping
        },
        billingAddress: {
          ...data.shippingAddress,
          email: data.customerInfo.email, // Use customer email for billing
        },
        paymentMethod: 'razorpay', // Default to Razorpay since it handles all payment methods
        shippingMethod: data.shippingMethod,
        orderNotes: data.orderNotes,
        userId: user?.id,
      };

      // Create order via API
      const orderResponse = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderResult = await orderResponse.json();
      const order = orderResult.data; // Extract order data from response

      // Process payment with Razorpay (handles all payment methods)
      await processRazorpayPayment(order);
    } catch (error) {
      console.error('Order processing error:', error);
      throw error;
    }
  };

  const processRazorpayPayment = async (order: any) => {
    try {
      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: Math.round(order.total * 100), // Convert to paise
          currency: 'INR',
          name: 'SumnSubstance',
          description: `Order #${order.orderNumber}`,
          order_id: order.razorpayOrderId,
          handler: async (response: any) => {
            try {
              // Verify payment
              const verificationResponse = await fetch('/api/payments/verify', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  orderId: order.id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });

              if (verificationResponse.ok) {
                clearCart();
                window.location.href = `/checkout/success?orderId=${order.id}`;
              } else {
                throw new Error('Payment verification failed');
              }
            } catch (error) {
              console.error('Payment verification error:', error);
              toast.error(
                'Payment verification failed. Please contact support.'
              );
              window.location.href = `/checkout/failure?orderId=${order.id}`;
            }
          },
          prefill: {
            name:
              form.getValues('customerInfo.firstName') +
              ' ' +
              form.getValues('customerInfo.lastName'),
            email: form.getValues('customerInfo.email'),
            contact: form.getValues('customerInfo.phone'),
          },
          theme: {
            color: '#3B82F6',
          },
          modal: {
            ondismiss: () => {
              toast.error('Payment cancelled');
              onProcessingChange(false);
            },
          },
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      };

      script.onerror = () => {
        toast.error('Failed to load payment gateway. Please try again.');
        onProcessingChange(false);
      };
    } catch (error) {
      console.error('Razorpay payment error:', error);
      throw error;
    }
  };

  const getAllFormContent = () => {
    return (
      <div className="space-y-6">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="customerInfo.firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customerInfo.lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customerInfo.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customerInfo.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Shipping Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Shipping Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="shippingAddress.fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shippingAddress.addressLine1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 1 *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter street address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shippingAddress.addressLine2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 2</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Apartment, suite, etc. (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="shippingAddress.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shippingAddress.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter state" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shippingAddress.postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter postal code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="shippingAddress.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const onError = (errors: any) => {
    console.log('Form validation errors:', errors);
    toast.error('Please fill in all required fields correctly');
    onProcessingChange(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-6"
      >
        {getAllFormContent()}

        {/* Submit Button */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isProcessing}
                className="min-w-[200px]"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Processing Order...
                  </>
                ) : (
                  <>
                    Complete Order
                    <Check className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
