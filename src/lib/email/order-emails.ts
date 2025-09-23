import { Resend } from 'resend';
import { render } from '@react-email/render';
import { OrderEmailTemplate } from './templates/order-confirmation-react';

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to safely convert Decimal or number to number
function toNumber(value: { toNumber?: () => number } | number): number {
  return typeof value === 'number' ? value : value.toNumber?.() || 0;
}

interface OrderEmailData {
  order: {
    id: string;
    orderNumber: string;
    total: { toNumber?: () => number } | number;
    subtotal: { toNumber?: () => number } | number;
    tax: { toNumber?: () => number } | number;
    shipping: { toNumber?: () => number } | number;
    discount: { toNumber?: () => number } | number;
    createdAt: Date;
    items: Array<{
      name: string;
      quantity: number;
      price: { toNumber?: () => number } | number;
      total: { toNumber?: () => number } | number;
      productSnapshot?: { mainImage?: { url?: string } };
    }>;
    shippingAddress:
      | string
      | {
          fullName: string;
          addressLine1: string;
          addressLine2?: string;
          city: string;
          state: string;
          postalCode: string;
          country: string;
          phone: string;
        };
  };
  customerEmail: string;
  customerName: string;
}

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmationEmail({
  order,
  customerEmail,
  customerName,
}: OrderEmailData) {
  try {
    // Render the email template to HTML (same pattern as your existing email system)
    const emailHtml = await render(
      OrderEmailTemplate({
        customerName,
        orderNumber: order.orderNumber,
        orderDate: order.createdAt.toISOString(),
        orderItems: order.items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: toNumber(item.price),
          total: toNumber(item.total),
          image: item.productSnapshot?.mainImage?.url,
        })),
        subtotal: toNumber(order.subtotal),
        shipping: toNumber(order.shipping),
        tax: toNumber(order.tax),
        total: toNumber(order.total),
        shippingAddress:
          typeof order.shippingAddress === 'string'
            ? JSON.parse(order.shippingAddress)
            : order.shippingAddress,
        estimatedDelivery: calculateEstimatedDelivery(order.createdAt),
      })
    );

    const { data, error } = await resend.emails.send({
      from: `SumnSubstance <${process.env.EMAIL_FROM}>`,
      to: [customerEmail],
      subject: `Order Confirmation - ${order.orderNumber}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Email sending error:', error);
      throw new Error('Failed to send confirmation email');
    }

    console.log('Order confirmation email sent:', data?.id);
    return data;
  } catch (error) {
    console.error('Order confirmation email error:', error);
    throw error;
  }
}

/**
 * Send order shipped email
 * TODO: Implement when ShippedOrderTemplate is created
 */
/*
export async function sendOrderShippedEmail({
  order,
  customerEmail,
  customerName,
}: OrderEmailData & { trackingNumber?: string }) {
  // Implementation will be added when template is available
  console.log('Order shipped email would be sent for:', order.orderNumber);
  return null;
}
*/

/**
 * Send order delivered email
 * TODO: Implement when DeliveredOrderTemplate is created
 */
/*
export async function sendOrderDeliveredEmail({
  order,
  customerEmail,
  customerName,
}: OrderEmailData) {
  // Implementation will be added when template is available
  console.log('Order delivered email would be sent for:', order.orderNumber);
  return null;
}
*/

/**
 * Send admin order notification
 */
export async function sendAdminOrderNotification(order: {
  id: string;
  orderNumber: string;
  total: { toNumber?: () => number } | number;
  createdAt: Date;
  paymentMethod: string;
  user?: { name?: string; email?: string } | null;
  guestName?: string;
  guestEmail?: string;
  items: Array<{
    name: string;
    quantity: number;
    total: { toNumber?: () => number } | number;
  }>;
}) {
  try {
    const adminEmail =
      process.env.ADMIN_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL;

    if (!adminEmail) {
      console.warn('Admin email not configured, skipping notification');
      return;
    }

    const { data, error } = await resend.emails.send({
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
      to: [adminEmail],
      subject: `New Order Received - ${order.orderNumber}`,
      html: `
        <h2>New Order Alert</h2>
        <p><strong>Order Number:</strong> ${order.orderNumber}</p>
        <p><strong>Customer:</strong> ${order.user?.name || order.guestName || 'Guest'} (${order.user?.email || order.guestEmail || 'No email'})</p>
        <p><strong>Total:</strong> ₹${toNumber(order.total).toLocaleString()}</p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
        <p><strong>Items:</strong> ${order.items.length}</p>
        <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>

        <h3>Order Items:</h3>
        <ul>
          ${order.items
            .map(
              item => `
            <li>${item.name} x ${item.quantity} = ₹${toNumber(item.total).toLocaleString()}</li>
          `
            )
            .join('')}
        </ul>

        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/orders/${order.id}" target="_blank">View Order in Dashboard</a></p>
      `,
    });

    if (error) {
      console.error('Admin notification error:', error);
    }

    return data;
  } catch (error) {
    console.error('Admin order notification error:', error);
    // Don't throw error for admin notifications
  }
}

/**
 * Calculate estimated delivery date
 */
function calculateEstimatedDelivery(
  orderDate: string | Date,
  status: 'confirmed' | 'shipped' = 'confirmed'
): string {
  const date = new Date(orderDate);
  const daysToAdd = status === 'shipped' ? 2 : 7; // 2 days from shipped, 7 days from confirmed

  date.setDate(date.getDate() + daysToAdd);

  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Generate order tracking URL
 */
export function generateTrackingUrl(
  trackingNumber: string,
  carrier: string = 'default'
): string {
  // This would typically integrate with your shipping provider's tracking system
  const baseUrls = {
    default: `${process.env.NEXT_PUBLIC_APP_URL}/track-order?tracking=${trackingNumber}`,
    bluedart: `https://www.bluedart.com/tracking/${trackingNumber}`,
    delhivery: `https://www.delhivery.com/track/package/${trackingNumber}`,
    ekart: `https://ekart.flipkart.com/track?tracking_id=${trackingNumber}`,
  };

  return baseUrls[carrier as keyof typeof baseUrls] || baseUrls.default;
}

/**
 * Validate Indian postal code
 */
export function validateIndianPostalCode(postalCode: string): boolean {
  const indianPostalCodeRegex = /^[1-9][0-9]{5}$/;
  return indianPostalCodeRegex.test(postalCode);
}

/**
 * Validate Indian phone number
 */
export function validateIndianPhoneNumber(phone: string): boolean {
  const indianPhoneRegex = /^(\+91|91|0)?[6789]\d{9}$/;
  return indianPhoneRegex.test(phone.replace(/\s+/g, ''));
}

/**
 * Get order status display text
 */
export function getOrderStatusText(status: string): string {
  const statusMap = {
    PENDING: 'Order Pending',
    CONFIRMED: 'Order Confirmed',
    PROCESSING: 'Processing',
    SHIPPED: 'Shipped',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled',
    REFUNDED: 'Refunded',
  };

  return statusMap[status as keyof typeof statusMap] || status;
}

/**
 * Get payment status display text
 */
export function getPaymentStatusText(status: string): string {
  const statusMap = {
    PENDING: 'Payment Pending',
    PROCESSING: 'Processing Payment',
    COMPLETED: 'Payment Completed',
    FAILED: 'Payment Failed',
    CANCELLED: 'Payment Cancelled',
    REFUNDED: 'Payment Refunded',
  };

  return statusMap[status as keyof typeof statusMap] || status;
}
