import React from 'react';
import Image from 'next/image';

interface OrderProcessingEmailTemplateProps {
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
}

export function OrderProcessingEmailTemplate({
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
}: OrderProcessingEmailTemplateProps) {
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
          backgroundColor: '#228B22',
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
          Your Order is Being Prepared!
        </h1>
        <p style={{ color: '#FFD700', margin: '8px 0 0', fontSize: '16px' }}>
          Hi {customerName}, we're getting your order ready
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
          <h2 style={{ margin: '0 0 8px', fontSize: '20px', color: '#228B22' }}>
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

        {/* Processing Status */}
        <div
          style={{
            marginBottom: '24px',
            padding: '20px',
            backgroundColor: '#e8f5e8',
            border: '2px solid #228B22',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ margin: '0 0 8px', fontSize: '18px', color: '#228B22' }}>
            🚀 Processing Status
          </h3>
          <p style={{ margin: '0', color: '#333', fontSize: '16px' }}>
            Our team is carefully preparing your order for shipment. This usually takes 1-2 business days.
          </p>
        </div>

        {/* Order Items */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{ margin: '0 0 16px', fontSize: '18px', color: '#228B22' }}
          >
            What You Ordered
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
            style={{ margin: '0 0 16px', fontSize: '18px', color: '#228B22' }}
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
              borderTop: '2px solid #228B22',
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
            <span style={{ color: '#228B22' }}>₹{total.toLocaleString()}</span>
          </div>
        </div>

        {/* What Happens Next */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{ margin: '0 0 16px', fontSize: '18px', color: '#228B22' }}
          >
            What Happens Next?
          </h3>
          <div style={{ padding: '16px', backgroundColor: '#f0f8f0', borderRadius: '8px' }}>
            <ol style={{ margin: '0', paddingLeft: '20px', color: '#333' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>Processing:</strong> We're preparing your items with care
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Quality Check:</strong> Each item is inspected before packaging
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Packaging:</strong> Your order is securely packaged for shipping
              </li>
              <li>
                <strong>Shipping:</strong> You'll receive a tracking number when shipped
              </li>
            </ol>
          </div>
        </div>

        {/* Shipping Address */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{ margin: '0 0 16px', fontSize: '18px', color: '#228B22' }}
          >
            Delivery Address
          </h3>
          <div
            style={{
              padding: '16px',
              border: '1px solid #eee',
              borderRadius: '8px',
            }}
          >
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

        {/* Call to Action */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <a
            href={`${process.env.NEXT_PUBLIC_APP_URL}/orders/${orderNumber}`}
            style={{
              display: 'inline-block',
              backgroundColor: '#228B22',
              color: 'white',
              padding: '12px 24px',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '16px',
            }}
          >
            Track Your Order
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
              style={{ color: '#228B22' }}
            >
              {process.env.EMAIL_FROM}
            </a>
          </p>
          <p style={{ margin: '0', color: '#666', fontSize: '12px' }}>
            This email was sent from SumnSubstance. We'll keep you updated on your order status.
          </p>
        </div>
      </div>
    </div>
  );
}
