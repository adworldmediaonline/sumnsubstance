import React from 'react';
import Image from 'next/image';

interface OrderDeliveredEmailTemplateProps {
  customerName: string;
  orderNumber: string;
  orderDate: string;
  orderItems: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
    image?: string;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  estimatedDelivery: string;
  deliveryDate?: string;
}

export function OrderDeliveredEmailTemplate({
  customerName,
  orderNumber,
  orderDate,
  orderItems,
  subtotal,
  shipping,
  tax,
  total,
  shippingAddress,
  estimatedDelivery,
  deliveryDate,
}: OrderDeliveredEmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: '#16a34a',
          padding: '32px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            color: 'white',
            margin: '0',
            fontSize: '28px',
            fontWeight: 'bold',
          }}
        >
          Your Order Has Arrived! 🎉
        </h1>
        <p style={{ color: '#bbf7d0', margin: '8px 0 0', fontSize: '16px' }}>
          Hi {customerName}, your order has been successfully delivered
        </p>
      </div>

      {/* Order Details */}
      <div style={{ padding: '32px', backgroundColor: 'white' }}>
        <div
          style={{
            marginBottom: '24px',
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
          }}
        >
          <h2 style={{ margin: '0 0 8px', fontSize: '20px', color: '#16a34a' }}>
            Order #{orderNumber}
          </h2>
          <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
            Order Date:{' '}
            {new Date(orderDate).toLocaleDateString('en-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p style={{ margin: '4px 0 0', color: '#666', fontSize: '14px' }}>
            Delivered on:{' '}
            {deliveryDate
              ? new Date(deliveryDate).toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Today'}
          </p>
        </div>

        {/* Success Message */}
        <div
          style={{
            marginBottom: '24px',
            padding: '20px',
            backgroundColor: '#f0fdf4',
            border: '2px solid #16a34a',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ margin: '0 0 8px', fontSize: '18px', color: '#16a34a' }}>
            ✅ Delivery Successful
          </h3>
          <p style={{ margin: '0', color: '#333', fontSize: '16px' }}>
            Your order has been delivered successfully! We hope you love your new products.
          </p>
        </div>

        {/* Order Items */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{ margin: '0 0 16px', fontSize: '18px', color: '#16a34a' }}
          >
            What You Received
          </h3>

          {orderItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom:
                  index < orderItems.length - 1 ? '1px solid #eee' : 'none',
              }}
            >
              {item.image && (
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    marginRight: '16px',
                    position: 'relative',
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </div>
              )}
              <div style={{ flex: 1 }}>
                <h4
                  style={{
                    margin: '0 0 4px',
                    fontSize: '16px',
                    fontWeight: '600',
                  }}
                >
                  {item.name}
                </h4>
                <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                  Quantity: {item.quantity} × ₹{item.price.toLocaleString()}
                </p>
              </div>
              <div style={{ fontWeight: '600', fontSize: '16px' }}>
                ₹{item.total.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div
          style={{
            marginBottom: '24px',
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
          }}
        >
          <h3
            style={{ margin: '0 0 16px', fontSize: '18px', color: '#16a34a' }}
          >
            Order Summary
          </h3>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
            <span>Subtotal:</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>

          {shipping > 0 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
              }}
            >
              <span>Shipping:</span>
              <span>₹{shipping.toLocaleString()}</span>
            </div>
          )}

          {tax > 0 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <span>Tax (GST):</span>
              <span>₹{tax.toLocaleString()}</span>
            </div>
          )}

          <hr
            style={{
              margin: '16px 0',
              border: 'none',
              borderTop: '2px solid #16a34a',
            }}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '18px',
              fontWeight: 'bold',
            }}
          >
            <span>Total:</span>
            <span style={{ color: '#16a34a' }}>₹{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Review Request */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{ margin: '0 0 16px', fontSize: '18px', color: '#16a34a' }}
          >
            How Was Your Experience?
          </h3>
          <div style={{ padding: '20px', backgroundColor: '#f0fdf4', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ margin: '0 0 16px', color: '#333', fontSize: '16px' }}>
              We'd love to hear about your experience! Your feedback helps us improve and helps other customers make informed decisions.
            </p>
            <a
              href={`${process.env.NEXT_PUBLIC_APP_URL}/orders/${orderNumber}/review`}
              style={{
                display: 'inline-block',
                backgroundColor: '#16a34a',
                color: 'white',
                padding: '12px 24px',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '16px',
                marginRight: '12px',
              }}
            >
              Leave a Review
            </a>
            <a
              href={`${process.env.NEXT_PUBLIC_APP_URL}/orders/${orderNumber}`}
              style={{
                display: 'inline-block',
                backgroundColor: 'transparent',
                color: '#16a34a',
                padding: '12px 24px',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '16px',
                border: '2px solid #16a34a',
              }}
            >
              View Order Details
            </a>
          </div>
        </div>

        {/* Next Steps */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{ margin: '0 0 16px', fontSize: '18px', color: '#16a34a' }}
          >
            What's Next?
          </h3>
          <div style={{ padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#333' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>Enjoy your products!</strong> We hope you love what you ordered
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Leave a review</strong> to help other customers and earn rewards
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Share your experience</strong> on social media with #SumnSubstance
              </li>
              <li>
                <strong>Shop again</strong> - we have more amazing products waiting for you
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <a
            href={`${process.env.NEXT_PUBLIC_APP_URL}/`}
            style={{
              display: 'inline-block',
              backgroundColor: '#16a34a',
              color: 'white',
              padding: '12px 24px',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '16px',
            }}
          >
            Continue Shopping
          </a>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '24px 0',
            borderTop: '1px solid #eee',
            textAlign: 'center',
          }}
        >
          <p style={{ margin: '0 0 8px', color: '#666', fontSize: '14px' }}>
            Questions about your order? Contact us at{' '}
            <a
              href={`mailto:${process.env.EMAIL_FROM}`}
              style={{ color: '#16a34a' }}
            >
              {process.env.EMAIL_FROM}
            </a>
          </p>
          <p style={{ margin: '0', color: '#666', fontSize: '12px' }}>
            Thank you for choosing SumnSubstance! We appreciate your business.
          </p>
        </div>
      </div>
    </div>
  );
}
