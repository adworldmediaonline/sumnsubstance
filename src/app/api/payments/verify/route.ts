import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';
import { razorpayPaymentSchema } from '@/lib/validations/order';
import { sendOrderConfirmationEmail } from '@/lib/email/order-emails';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request data
    const validatedData = razorpayPaymentSchema.parse(body);
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = validatedData;

    // Verify payment signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Update order with payment details
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'COMPLETED',
        status: 'CONFIRMED',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });

    // Send order confirmation email
    try {
      const customerEmail = order.user?.email || order.guestEmail;
      const customerName = order.user?.name || order.guestName;

      if (customerEmail && customerName) {
        await sendOrderConfirmationEmail({
          order,
          customerEmail,
          customerName,
        });
      }
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
      // Don't fail the payment verification if email fails
    }

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        paymentStatus: order.paymentStatus,
      },
    });
  } catch (error) {
    console.error('Payment verification error:', error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}
