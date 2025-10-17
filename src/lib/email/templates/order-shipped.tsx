import React from 'react';
import Image from 'next/image';

interface OrderShippedEmailTemplateProps {
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
  trackingNumber?: string;
}

export function OrderShippedEmailTemplate({
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
  trackingNumber,
}: OrderShippedEmailTemplateProps) {
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
          backgroundColor: '#1e40af',
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
          Your Order is on the Way! 🚚
        </h1>
        <p style={{ color: '#93c5fd', margin: '8px 0 0', fontSize: '16px' }}>
          Hi {customerName}, your order has been shipped
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
          <h2 style={{ margin: '0 0 8px', fontSize: '20px', color: '#1e40af' }}>
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
            Estimated Delivery: {estimatedDelivery}
          </p>
        </div>

        {/* Tracking Information */}
        {trackingNumber && (
          <div
            style={{
              marginBottom: '24px',
              padding: '20px',
              backgroundColor: '#eff6ff',
              border: '2px solid #1e40af',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', color: '#1e40af' }}>
              📦 Tracking Information
            </h3>
            <p style={{ margin: '0 0 12px', color: '#333', fontSize: '16px' }}>
              <strong>Tracking Number:</strong> {trackingNumber}
            </p>
            <a
              href={`${process.env.NEXT_PUBLIC_APP_URL}/track-order?tracking=${trackingNumber}`}
              style={{
                display: 'inline-block',
                backgroundColor: '#1e40af',
                color: 'white',
                padding: '10px 20px',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '14px',
              }}
            >
              Track Your Package
            </a>
          </div>
        )}

        {/* Order Items */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{ margin: '0 0 16px', fontSize: '18px', color: '#1e40af' }}
          >
            What's in Your Package
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
            style={{ margin: '0 0 16px', fontSize: '18px', color: '#1e40af' }}
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
              borderTop: '2px solid #1e40af',
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
            <span style={{ color: '#1e40af' }}>₹{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Delivery Information */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{ margin: '0 0 16px', fontSize: '18px', color: '#1e40af' }}
          >
            Delivery Information
          </h3>
          <div style={{ padding: '16px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
            <p style={{ margin: '0 0 8px', color: '#333', fontSize: '16px' }}>
              <strong>Delivery Address:</strong>
            </p>
            <p style={{ margin: '0 0 4px', fontWeight: '600' }}>
              {shippingAddress.fullName}
            </p>
            <p style={{ margin: '0 0 4px' }}>{shippingAddress.addressLine1}</p>
            {shippingAddress.addressLine2 && (
              <p style={{ margin: '0 0 4px' }}>
                {shippingAddress.addressLine2}
              </p>
            )}
            <p style={{ margin: '0 0 4px' }}>
              {shippingAddress.city}, {shippingAddress.state}{' '}
              {shippingAddress.postalCode}
            </p>
            <p style={{ margin: '0 0 4px' }}>{shippingAddress.country}</p>
            <p style={{ margin: '0', color: '#666' }}>
              Phone: {shippingAddress.phone}
            </p>
          </div>
        </div>

        {/* What to Expect */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{ margin: '0 0 16px', fontSize: '18px', color: '#1e40af' }}
          >
            What to Expect
          </h3>
          <div style={{ padding: '16px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#333' }}>
              <li style={{ marginBottom: '8px' }}>
                Your package will arrive within 3-5 business days
              </li>
              <li style={{ marginBottom: '8px' }}>
                You'll receive SMS updates on delivery status
              </li>
              <li style={{ marginBottom: '8px' }}>
                Someone must be available to receive the package
              </li>
              <li>
                If you're not available, the delivery partner will attempt again
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <a
            href={`${process.env.NEXT_PUBLIC_APP_URL}/orders/${orderNumber}`}
            style={{
              display: 'inline-block',
              backgroundColor: '#1e40af',
              color: 'white',
              padding: '12px 24px',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '16px',
              marginRight: '12px',
            }}
          >
            View Order Details
          </a>
          {trackingNumber && (
            <a
              href={`${process.env.NEXT_PUBLIC_APP_URL}/track-order?tracking=${trackingNumber}`}
              style={{
                display: 'inline-block',
                backgroundColor: 'transparent',
                color: '#1e40af',
                padding: '12px 24px',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '16px',
                border: '2px solid #1e40af',
              }}
            >
              Track Package
            </a>
          )}
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
            Questions about your shipment? Contact us at{' '}
            <a
              href={`mailto:${process.env.EMAIL_FROM}`}
              style={{ color: '#1e40af' }}
            >
              {process.env.EMAIL_FROM}
            </a>
          </p>
          <p style={{ margin: '0', color: '#666', fontSize: '12px' }}>
            This email was sent from SumnSubstance. We'll notify you when your order is delivered.
          </p>
        </div>
      </div>
    </div>
  );
}
