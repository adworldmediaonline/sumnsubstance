import { Resend } from 'resend';
import { OrderEmailTemplate } from './templates/order-confirmation';
import { ShippedOrderTemplate } from './templates/order-shipped';
import { DeliveredOrderTemplate } from './templates/order-delivered';

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderEmailData {
  order: any;
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
    const { data, error } = await resend.emails.send({
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
      to: [customerEmail],
      subject: `Order Confirmation - ${order.orderNumber}`,
      react: OrderEmailTemplate({
        customerName,
        orderNumber: order.orderNumber,
        orderDate: order.createdAt,
        orderItems: order.items.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price.toNumber(),
          total: item.total.toNumber(),
          image: item.productSnapshot?.mainImage?.url,
        })),
        subtotal: order.subtotal.toNumber(),
        shipping: order.shipping.toNumber(),
        tax: order.tax.toNumber(),
        total: order.total.toNumber(),
        shippingAddress: JSON.parse(order.shippingAddress),
        estimatedDelivery: calculateEstimatedDelivery(order.createdAt),
      }),
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
 */
export async function sendOrderShippedEmail({
  order,
  customerEmail,
  customerName,
}: OrderEmailData & { trackingNumber?: string }) {
  try {
    const { data, error } = await resend.emails.send({
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
      to: [customerEmail],
      subject: `Your Order is Shipped - ${order.orderNumber}`,
      react: ShippedOrderTemplate({
        customerName,
        orderNumber: order.orderNumber,
        trackingNumber: order.trackingNumber,
        estimatedDelivery: calculateEstimatedDelivery(
          order.shippedAt || order.createdAt,
          'shipped'
        ),
        shippingAddress: JSON.parse(order.shippingAddress),
      }),
    });

    if (error) {
      console.error('Shipped email error:', error);
      throw new Error('Failed to send shipped email');
    }

    return data;
  } catch (error) {
    console.error('Order shipped email error:', error);
    throw error;
  }
}

/**
 * Send order delivered email
 */
export async function sendOrderDeliveredEmail({
  order,
  customerEmail,
  customerName,
}: OrderEmailData) {
  try {
    const { data, error } = await resend.emails.send({
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
      to: [customerEmail],
      subject: `Order Delivered - ${order.orderNumber}`,
      react: DeliveredOrderTemplate({
        customerName,
        orderNumber: order.orderNumber,
        deliveryDate: order.deliveredAt,
        orderItems: order.items,
      }),
    });

    if (error) {
      console.error('Delivered email error:', error);
      throw new Error('Failed to send delivered email');
    }

    return data;
  } catch (error) {
    console.error('Order delivered email error:', error);
    throw error;
  }
}

/**
 * Send admin order notification
 */
export async function sendAdminOrderNotification(order: any) {
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
        <p><strong>Customer:</strong> ${order.user?.name || order.guestName} (${order.user?.email || order.guestEmail})</p>
        <p><strong>Total:</strong> ₹${order.total.toNumber().toLocaleString()}</p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
        <p><strong>Items:</strong> ${order.items.length}</p>
        <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>

        <h3>Order Items:</h3>
        <ul>
          ${order.items
            .map(
              (item: any) => `
            <li>${item.name} x ${item.quantity} = ₹${item.total.toNumber().toLocaleString()}</li>
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
