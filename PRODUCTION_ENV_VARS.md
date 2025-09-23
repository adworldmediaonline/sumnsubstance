# 🔐 Production Environment Variables Reference

This document lists all environment variables required for production deployment of SumnSubstance.

## 📋 Required Variables

### 🗄️ Database Configuration

```bash
DATABASE_URL="postgresql://username:password@host:port/database"
```

**Description**: PostgreSQL connection string for production database
**Required**: ✅ Yes
**Example**: `postgresql://user:pass@db.example.com:5432/sumnsubstance_prod`

### 🌐 Application Configuration

```bash
NEXT_PUBLIC_APP_URL="https://your-domain.com"
NEXT_PUBLIC_APP_NAME="SumnSubstance"
NODE_ENV="production"
```

**Description**: Core application settings
**Required**: ✅ Yes
**Example**: `https://sumnsubstance.vercel.app`

### 🔐 Authentication Configuration

```bash
BETTER_AUTH_SECRET="your-super-secret-production-key-min-32-chars"
BETTER_AUTH_URL="https://your-domain.com"
```

**Description**: Better Auth configuration for session management
**Required**: ✅ Yes
**Security**: Use a strong, random secret (32+ characters)

### 🔑 OAuth Providers (Optional)

```bash
# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

**Description**: Social login configuration
**Required**: ❌ Optional
**Setup**: Configure in respective OAuth provider dashboards

### 📸 Image Upload (Cloudinary)

```bash
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
```

**Description**: Cloudinary configuration for image uploads
**Required**: ✅ Yes (if using image uploads)
**Setup**: Create account at [cloudinary.com](https://cloudinary.com)

### 💳 Payment Gateway (Razorpay)

```bash
# Production Keys
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_live_your_live_key_id"
RAZORPAY_KEY_SECRET="your_live_key_secret"
RAZORPAY_WEBHOOK_SECRET="your_razorpay_webhook_secret"
```

**Description**: Razorpay payment gateway configuration
**Required**: ✅ Yes (if using payments)
**Setup**: Get from [Razorpay Dashboard](https://dashboard.razorpay.com)

### 📧 Email Configuration (Resend)

```bash
RESEND_API_KEY="re_your_resend_api_key"
EMAIL_FROM="orders@yourdomain.com"
EMAIL_FROM_NAME="SumnSubstance Team"
```

**Description**: Email service for order confirmations
**Required**: ✅ Yes (if using email notifications)
**Setup**: Create account at [resend.com](https://resend.com)

### 🛒 Order Configuration

```bash
NEXT_PUBLIC_MIN_ORDER_VALUE="100"
NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD="500"
NEXT_PUBLIC_GST_RATE="0.18"
NEXT_PUBLIC_SHIPPING_RATE="50"
```

**Description**: Order and pricing configuration
**Required**: ✅ Yes
**Customize**: Adjust values based on your business requirements

### 👨‍💼 Admin Configuration

```bash
ADMIN_EMAIL="admin@yourdomain.com"
ADMIN_NOTIFICATION_EMAIL="notifications@yourdomain.com"
```

**Description**: Admin user and notification settings
**Required**: ✅ Yes
**Security**: Use secure email addresses

### 🔒 Security Configuration

```bash
RATE_LIMIT_MAX="100"
RATE_LIMIT_WINDOW="900000"
API_RATE_LIMIT="1000"
API_RATE_WINDOW="3600"
```

**Description**: Rate limiting configuration
**Required**: ✅ Yes
**Security**: Adjust based on your traffic patterns

### 📦 Order Number Configuration

```bash
ORDER_NUMBER_PREFIX="ORD"
ORDER_NUMBER_LENGTH="8"
```

**Description**: Order number generation settings
**Required**: ✅ Yes
**Customize**: Adjust prefix and length as needed

### 💰 Currency Configuration

```bash
NEXT_PUBLIC_CURRENCY="INR"
NEXT_PUBLIC_CURRENCY_SYMBOL="₹"
```

**Description**: Currency settings
**Required**: ✅ Yes
**Customize**: Change for different regions

### 🎛️ Feature Flags

```bash
NEXT_PUBLIC_ENABLE_GUEST_CHECKOUT="true"
NEXT_PUBLIC_ENABLE_COD="false"
NEXT_PUBLIC_ENABLE_WALLET="false"
```

**Description**: Feature toggles
**Required**: ✅ Yes
**Customize**: Enable/disable features as needed

### 📁 File Upload Configuration

```bash
NEXT_PUBLIC_MAX_FILE_SIZE="5242880"
NEXT_PUBLIC_MAX_FILES="10"
```

**Description**: File upload limits
**Required**: ✅ Yes
**Customize**: Adjust based on your needs

### ⏰ Session Configuration

```bash
SESSION_MAX_AGE="604800"
```

**Description**: User session duration
**Required**: ✅ Yes
**Security**: Adjust based on security requirements

## 🔧 Optional Variables

### 📊 Analytics (Optional)

```bash
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
```

**Description**: Google Analytics tracking
**Required**: ❌ Optional
**Setup**: Get from [Google Analytics](https://analytics.google.com)

### 🚨 Error Tracking (Optional)

```bash
SENTRY_DSN="your-sentry-dsn"
```

**Description**: Sentry error tracking
**Required**: ❌ Optional
**Setup**: Create project at [sentry.io](https://sentry.io)

### 📱 Notifications (Optional)

```bash
SLACK_WEBHOOK_URL="https://hooks.slack.com/services/..."
```

**Description**: Slack notifications for deployments
**Required**: ❌ Optional
**Setup**: Create webhook in Slack app settings

## 🚀 Quick Setup Checklist

### ✅ Database Setup

- [ ] Create PostgreSQL database
- [ ] Get connection string
- [ ] Set `DATABASE_URL`

### ✅ Authentication Setup

- [ ] Generate strong `BETTER_AUTH_SECRET`
- [ ] Set `BETTER_AUTH_URL` to your domain
- [ ] Configure OAuth providers (optional)

### ✅ Payment Setup

- [ ] Create Razorpay account
- [ ] Get live API keys
- [ ] Set webhook secret
- [ ] Configure webhook URL in Razorpay dashboard

### ✅ Email Setup

- [ ] Create Resend account
- [ ] Get API key
- [ ] Set sender email and name

### ✅ Image Upload Setup

- [ ] Create Cloudinary account
- [ ] Get API credentials
- [ ] Set environment variables

### ✅ Domain Setup

- [ ] Configure custom domain (optional)
- [ ] Update `NEXT_PUBLIC_APP_URL`
- [ ] Update `BETTER_AUTH_URL`

## 🔐 Security Best Practices

### 🔑 Secret Management

- Use strong, random secrets (32+ characters)
- Never commit secrets to version control
- Rotate secrets regularly
- Use different secrets for different environments

### 🌐 HTTPS Configuration

- Always use HTTPS in production
- Set secure cookies
- Use secure headers (configured in vercel.json)

### 🛡️ Rate Limiting

- Configure appropriate rate limits
- Monitor for abuse
- Adjust limits based on usage patterns

### 🔍 Monitoring

- Set up error tracking (Sentry)
- Monitor performance metrics
- Set up alerts for critical issues

## 🚨 Common Issues & Solutions

### Database Connection Issues

```bash
# Check connection string format
DATABASE_URL="postgresql://user:pass@host:port/db?sslmode=require"

# Ensure SSL is enabled for production
```

### Authentication Issues

```bash
# Ensure secret is strong enough
BETTER_AUTH_SECRET="$(openssl rand -base64 32)"

# Check URL matches your domain
BETTER_AUTH_URL="https://your-exact-domain.com"
```

### Payment Issues

```bash
# Verify you're using live keys for production
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_live_..."  # Not rzp_test_...

# Check webhook URL is correct
```

### Email Issues

```bash
# Verify sender email is verified in Resend
EMAIL_FROM="verified-email@yourdomain.com"

# Check API key permissions
```

## 📞 Support

If you encounter issues:

1. Check the deployment logs in Vercel dashboard
2. Review GitHub Actions workflow logs
3. Verify all environment variables are set correctly
4. Check the troubleshooting section in DEPLOYMENT_SETUP.md

---

**Remember**: Never share your production secrets or commit them to version control!
