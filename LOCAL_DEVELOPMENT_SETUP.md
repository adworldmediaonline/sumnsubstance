# 🔧 Local Development Environment Setup

This guide helps you set up your local development environment to avoid the build errors you're experiencing.

## 🚨 **Current Errors & Solutions:**

### 1. **Prisma Database URL Error**

**Error**: `the URL must start with the protocol 'prisma://' or 'prisma+postgres://'`

**Solution**: Your local `.env` file needs a proper PostgreSQL URL format.

### 2. **Missing Resend API Key**

**Error**: `Missing API key. Pass it to the constructor 'new Resend("re_123")'`

**Solution**: Add the Resend API key to your environment variables.

## 📁 **Create Your Local Environment File**

Create a `.env.local` file in your project root (this file is gitignored):

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/sumnsubstance_dev"

# Next.js Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="SumnSubstance"

# Better Auth Configuration
BETTER_AUTH_SECRET="your-super-secret-key-here-change-in-production-minimum-32-chars"
BETTER_AUTH_URL="http://localhost:3000"

# OAuth Providers (optional for development)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

# Razorpay Payment Gateway Configuration (Test Mode)
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_your_test_key_id"
RAZORPAY_KEY_SECRET="your_test_key_secret"
RAZORPAY_WEBHOOK_SECRET="your_razorpay_webhook_secret"

# Email Configuration (Resend)
RESEND_API_KEY="re_your_resend_api_key"
EMAIL_FROM="orders@sumnsubstance.com"
EMAIL_FROM_NAME="SumnSubstance Team"

# Order Configuration
NEXT_PUBLIC_MIN_ORDER_VALUE="100"
NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD="500"
NEXT_PUBLIC_GST_RATE="0.18"
NEXT_PUBLIC_SHIPPING_RATE="50"

# Admin Configuration
ADMIN_EMAIL="admin@sumnsubstance.com"
ADMIN_NOTIFICATION_EMAIL="notifications@sumnsubstance.com"

# Security & Rate Limiting
RATE_LIMIT_MAX="100"
RATE_LIMIT_WINDOW="900000"

# Order Number Configuration
ORDER_NUMBER_PREFIX="ORD"
ORDER_NUMBER_LENGTH="8"

# Currency Configuration
NEXT_PUBLIC_CURRENCY="INR"
NEXT_PUBLIC_CURRENCY_SYMBOL="₹"

# Feature Flags
NEXT_PUBLIC_ENABLE_GUEST_CHECKOUT="true"
NEXT_PUBLIC_ENABLE_COD="false"
NEXT_PUBLIC_ENABLE_WALLET="false"

# File Upload Limits
NEXT_PUBLIC_MAX_FILE_SIZE="5242880"
NEXT_PUBLIC_MAX_FILES="10"

# Session Configuration
SESSION_MAX_AGE="604800"

# API Rate Limiting
API_RATE_LIMIT="1000"
API_RATE_WINDOW="3600"

# Environment
NODE_ENV="development"
```

## 🗄️ **Database Setup Options**

### Option 1: Local PostgreSQL (Recommended)

```bash
# Install PostgreSQL (macOS)
brew install postgresql
brew services start postgresql

# Create database
createdb sumnsubstance_dev

# Update DATABASE_URL in .env.local
DATABASE_URL="postgresql://your_username@localhost:5432/sumnsubstance_dev"
```

### Option 2: Docker PostgreSQL

```bash
# Create docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: sumnsubstance_dev
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:

# Run with Docker
docker-compose up -d

# Update DATABASE_URL in .env.local
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sumnsubstance_dev"
```

### Option 3: Cloud Database (Free Tiers)

- **Neon**: [neon.tech](https://neon.tech) - Free PostgreSQL
- **Supabase**: [supabase.com](https://supabase.com) - Free PostgreSQL
- **PlanetScale**: [planetscale.com](https://planetscale.com) - Free MySQL

## 🔑 **Required Services Setup**

### 1. **Resend (Email Service)**

1. Sign up at [resend.com](https://resend.com)
2. Get your API key from dashboard
3. Add to `.env.local`:
   ```bash
   RESEND_API_KEY="re_your_actual_api_key"
   ```

### 2. **Cloudinary (Image Upload)**

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get credentials from dashboard
3. Add to `.env.local`:
   ```bash
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

### 3. **Razorpay (Payments)**

1. Sign up at [razorpay.com](https://razorpay.com)
2. Get test API keys from dashboard
3. Add to `.env.local`:
   ```bash
   NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_your_test_key"
   RAZORPAY_KEY_SECRET="your_test_secret"
   ```

## 🚀 **Quick Start Commands**

```bash
# 1. Install dependencies
pnpm install

# 2. Generate Prisma client
pnpm exec prisma generate

# 3. Push database schema
pnpm exec prisma db push

# 4. Start development server
pnpm dev
```

## 🔧 **Troubleshooting**

### Database Connection Issues

```bash
# Check if PostgreSQL is running
brew services list | grep postgresql

# Test connection
psql -h localhost -U your_username -d sumnsubstance_dev

# Reset database
pnpm exec prisma db push --force-reset
```

### Environment Variable Issues

```bash
# Check if .env.local exists
ls -la .env.local

# Verify variables are loaded
node -e "console.log(process.env.DATABASE_URL)"
```

### Build Issues

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules
pnpm install

# Regenerate Prisma client
pnpm exec prisma generate
```

## 📋 **Development Checklist**

- [ ] Created `.env.local` file with all required variables
- [ ] Set up PostgreSQL database (local or cloud)
- [ ] Configured Resend API key
- [ ] Configured Cloudinary credentials
- [ ] Configured Razorpay test keys
- [ ] Generated Prisma client
- [ ] Pushed database schema
- [ ] Started development server successfully

## 🎯 **Next Steps**

1. **Set up your local environment** using this guide
2. **Test the build locally** with `pnpm build`
3. **Push your changes** to trigger GitHub Actions
4. **Monitor the workflow** to ensure it passes

## 📞 **Need Help?**

If you're still experiencing issues:

1. Check the console output for specific error messages
2. Verify all environment variables are set correctly
3. Ensure your database is running and accessible
4. Check that all required services are configured

---

**Remember**: Never commit your `.env.local` file to version control!
