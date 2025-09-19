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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  checkoutFormSchema,
  type CheckoutFormData,
} from '@/lib/validations/order';
import { useCartItems, useClearCart } from '@/store/cart-store';
import { toast } from 'sonner';

interface CheckoutFormProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  isProcessing: boolean;
  onProcessingChange: (processing: boolean) => void;
  user?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export function CheckoutForm({
  currentStep,
  onStepChange,
  isProcessing,
  onProcessingChange,
  user,
}: CheckoutFormProps) {
  const cartItems = useCartItems();
  const clearCart = useClearCart();
  const [sameAsBilling, setSameAsBilling] = useState(true);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      customerInfo: {
        email: user?.email || '',
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ').slice(1).join(' ') || '',
        phone: '',
      },
      shippingAddress: {
        fullName: user?.name || '',
        email: user?.email || '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'India',
      },
      shippingMethod: 'standard',
      paymentMethod: 'razorpay',
      agreeToTerms: false,
      subscribeNewsletter: false,
    },
  });

  // Auto-fill billing address when same as shipping is checked
  useEffect(() => {
    if (sameAsBilling) {
      const shippingAddress = form.getValues('shippingAddress');
      form.setValue('billingAddress', {
        ...shippingAddress,
        sameAsShipping: true,
      });
    }
  }, [sameAsBilling, form]);

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      onProcessingChange(true);

      // Step 1: Customer Information
      if (currentStep === 1) {
        // Validate customer information
        const customerInfo = data.customerInfo;
        if (
          !customerInfo.email ||
          !customerInfo.firstName ||
          !customerInfo.lastName ||
          !customerInfo.phone
        ) {
          toast.error('Please fill in all required customer information');
          return;
        }
        onStepChange(2);
        return;
      }

      // Step 2: Shipping Information
      if (currentStep === 2) {
        // Validate shipping address
        const shippingAddress = data.shippingAddress;
        if (
          !shippingAddress.fullName ||
          !shippingAddress.addressLine1 ||
          !shippingAddress.city ||
          !shippingAddress.state ||
          !shippingAddress.postalCode
        ) {
          toast.error('Please fill in all required shipping information');
          return;
        }
        onStepChange(3);
        return;
      }

      // Step 3: Payment Processing
      if (currentStep === 3) {
        if (!data.agreeToTerms) {
          toast.error('You must agree to the terms and conditions');
          return;
        }

        await processOrder(data);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('An error occurred during checkout. Please try again.');
    } finally {
      onProcessingChange(false);
    }
  };

  const processOrder = async (data: CheckoutFormData) => {
    try {
      // Create order payload
      const orderPayload = {
        items: cartItems.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        customerInfo: data.customerInfo,
        shippingAddress: data.shippingAddress,
        billingAddress: data.billingAddress,
        paymentMethod: data.paymentMethod,
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

      const order = await orderResponse.json();

      // Process payment based on method
      if (data.paymentMethod === 'razorpay') {
        await processRazorpayPayment(order);
      } else if (data.paymentMethod === 'cod') {
        // For COD, redirect directly to success page
        clearCart();
        window.location.href = `/checkout/success?orderId=${order.id}`;
      }
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

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      onStepChange(currentStep - 1);
    }
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
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
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Shipping Address */}
              <div className="space-y-4">
                <h3 className="font-semibold">Shipping Address</h3>

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

              {/* Shipping Method */}
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Shipping Method
                </h3>

                <FormField
                  control={form.control}
                  name="shippingMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          <div className="flex items-center space-x-2 border rounded-lg p-4">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label htmlFor="standard" className="flex-1">
                              <div>
                                <p className="font-medium">Standard Delivery</p>
                                <p className="text-sm text-muted-foreground">
                                  5-7 business days
                                </p>
                                <p className="text-sm font-medium">₹50</p>
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 border rounded-lg p-4">
                            <RadioGroupItem value="express" id="express" />
                            <Label htmlFor="express" className="flex-1">
                              <div>
                                <p className="font-medium">Express Delivery</p>
                                <p className="text-sm text-muted-foreground">
                                  2-3 business days
                                </p>
                                <p className="text-sm font-medium">₹150</p>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment & Review
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="font-semibold">Payment Method</h3>

                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          <div className="flex items-center space-x-2 border rounded-lg p-4">
                            <RadioGroupItem value="razorpay" id="razorpay" />
                            <Label htmlFor="razorpay" className="flex-1">
                              <div>
                                <p className="font-medium">
                                  Card / UPI / Wallet
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Secure payment via Razorpay
                                </p>
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 border rounded-lg p-4">
                            <RadioGroupItem value="cod" id="cod" />
                            <Label htmlFor="cod" className="flex-1">
                              <div>
                                <p className="font-medium">Cash on Delivery</p>
                                <p className="text-sm text-muted-foreground">
                                  Pay when you receive
                                </p>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Order Notes */}
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Order Notes (Optional)
                </h3>

                <FormField
                  control={form.control}
                  name="orderNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Any special instructions for your order..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Terms and Newsletter */}
              <Separator />
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="agreeToTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to the{' '}
                          <a
                            href="/terms-conditions"
                            target="_blank"
                            className="text-primary hover:underline"
                          >
                            Terms & Conditions
                          </a>{' '}
                          and{' '}
                          <a
                            href="/privacy-policy"
                            target="_blank"
                            className="text-primary hover:underline"
                          >
                            Privacy Policy
                          </a>{' '}
                          *
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subscribeNewsletter"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Subscribe to our newsletter for updates and offers
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  const getButtonText = () => {
    switch (currentStep) {
      case 1:
        return 'Continue to Shipping';
      case 2:
        return 'Continue to Payment';
      case 3:
        return isProcessing ? 'Processing...' : 'Complete Order';
      default:
        return 'Continue';
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {getStepContent()}

        {/* Navigation Buttons */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={goToPreviousStep}
                disabled={currentStep === 1 || isProcessing}
              >
                Previous Step
              </Button>

              <Button
                type="submit"
                disabled={isProcessing}
                className="min-w-[200px]"
              >
                {isProcessing && currentStep === 3 ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    {getButtonText()}
                    {currentStep < 3 && <Check className="ml-2 h-4 w-4" />}
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
