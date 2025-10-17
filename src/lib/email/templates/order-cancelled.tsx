import React from 'react';
import Image from 'next/image';

interface OrderCancelledEmailTemplateProps {
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
  cancellationReason?: string;
  refundAmount?: number;
}

export function OrderCancelledEmailTemplate({
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
  cancellationReason,
  refundAmount,
}: OrderCancelledEmailTemplateProps) {
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
          backgroundColor: '#dc2626',
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
          Order Cancelled
        </h1>
        <p style={{ color: '#fecaca', margin: '8px 0 0', fontSize: '16px' }}>
          Hi {customerName}, your order has been cancelled
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
          <h2 style={{ margin: '0 0 8px', fontSize: '20px', color: '#dc2626' }}>
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
            Cancelled on: {new Date().toLocaleDateString('en-IN')}
          </p>
        </div>

        {/* Cancellation Notice */}
        <div
          style={{
            marginBottom: '24px',
            padding: '20px',
            backgroundColor: '#fef2f2',
            border: '2px solid #dc2626',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ margin: '0 0 8px', fontSize: '18px', color: '#dc2626' }}>
            ❌ Order Cancelled
          </h3>
          <p style={{ margin: '0', color: '#333', fontSize: '16px' }}>
            We're sorry to inform you that your order has been cancelled.
            {cancellationReason && ` Reason: ${cancellationReason}`}
          </p>
        </div>

        {/* Refund Information */}
        {refundAmount && refundAmount > 0 && (
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
              💰 Refund Information
            </h3>
            <p style={{ margin: '0', color: '#333', fontSize: '16px' }}>
              A refund of <strong>₹{refundAmount.toLocaleString()}</strong> will be processed to your original payment method within 5-7 business days.
            </p>
          </div>
        )}

        {/* Order Items */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{ margin: '0 0 16px', fontSize: '18px', color: '#dc2626' }}
          >
            Cancelled Items
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
                opacity: '0.7',
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
            style={{ margin: '0 0 16px', fontSize: '18px', color: '#dc2626' }}
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
              borderTop: '2px solid #dc2626',
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
            <span style={{ color: '#dc2626' }}>₹{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Next Steps */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{ margin: '0 0 16px', fontSize: '18px', color: '#dc2626' }}
          >
            What Happens Next?
          </h3>
          <div style={{ padding: '16px', backgroundColor: '#fef2f2', borderRadius: '8px' }}>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#333' }}>
              {refundAmount && refundAmount > 0 && (
                <li style={{ marginBottom: '8px' }}>
                  <strong>Refund Processing:</strong> Your refund will be processed within 5-7 business days
                </li>
              )}
              <li style={{ marginBottom: '8px' }}>
                <strong>Email Confirmation:</strong> You'll receive an email when the refund is processed
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Bank Processing:</strong> It may take additional time for your bank to reflect the refund
              </li>
              <li>
                <strong>Questions?</strong> Contact our support team if you have any concerns
              </li>
            </ul>
          </div>
        </div>

        {/* Alternative Options */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{ margin: '0 0 16px', fontSize: '18px', color: '#dc2626' }}
          >
            We're Here to Help
          </h3>
          <div style={{ padding: '20px', backgroundColor: '#f0f8ff', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ margin: '0 0 16px', color: '#333', fontSize: '16px' }}>
              We're sorry this order didn't work out. We'd love to help you find the perfect products for your needs.
            </p>
            <a
              href={`${process.env.NEXT_PUBLIC_APP_URL}/`}
              style={{
                display: 'inline-block',
                backgroundColor: '#228B22',
                color: 'white',
                padding: '12px 24px',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '16px',
                marginRight: '12px',
              }}
            >
              Browse Products
            </a>
            <a
              href={`mailto:${process.env.EMAIL_FROM}`}
              style={{
                display: 'inline-block',
                backgroundColor: 'transparent',
                color: '#228B22',
                padding: '12px 24px',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '16px',
                border: '2px solid #228B22',
              }}
            >
              Contact Support
            </a>
          </div>
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
            Questions about this cancellation? Contact us at{' '}
            <a
              href={`mailto:${process.env.EMAIL_FROM}`}
              style={{ color: '#dc2626' }}
            >
              {process.env.EMAIL_FROM}
            </a>
          </p>
          <p style={{ margin: '0', color: '#666', fontSize: '12px' }}>
            This email was sent from SumnSubstance. We apologize for any inconvenience caused.
          </p>
        </div>
      </div>
    </div>
  );
}
