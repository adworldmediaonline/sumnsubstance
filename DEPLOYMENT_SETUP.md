# 🚀 GitHub Actions + Vercel Deployment Setup Guide

This guide will help you set up a complete CI/CD pipeline with GitHub Actions and Vercel deployment for your SumnSubstance project.

## 📋 Prerequisites

- GitHub repository with your code
- Vercel account (free tier available)
- Database (PostgreSQL recommended)
- Domain name (optional, Vercel provides free subdomain)

## 🔧 Step 1: Vercel Account Setup

### 1.1 Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account (recommended for seamless integration)
3. Complete the onboarding process

### 1.2 Import Your Project

1. In Vercel dashboard, click **"Add New..."** → **"Project"**
2. Import your GitHub repository
3. Vercel will auto-detect it's a Next.js project
4. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `pnpm build` (already configured in vercel.json)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `pnpm install` (already configured)

### 1.3 Get Required IDs

After importing, you'll need these values for GitHub Secrets:

1. **Vercel Token**:
   - Go to [Vercel Account Settings](https://vercel.com/account/tokens)
   - Click **"Create Token"**
   - Name it "GitHub Actions"
   - Copy the token (you won't see it again!)

2. **Organization ID**:
   - Go to [Vercel Team Settings](https://vercel.com/account/team)
   - Copy your **Team ID** (this is your org ID)

3. **Project ID**:
   - In your project dashboard, go to **Settings** → **General**
   - Copy the **Project ID**

## 🔐 Step 2: GitHub Secrets Configuration

### 2.1 Add Repository Secrets

Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**

Add these secrets:

```
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_team_id_here
VERCEL_PROJECT_ID=your_project_id_here
DATABASE_URL=your_production_database_url
```

### 2.2 Optional Secrets (for enhanced features)

```
SLACK_WEBHOOK_URL=your_slack_webhook_for_notifications
SENTRY_DSN=your_sentry_dsn_for_error_tracking
```

## 🗄️ Step 3: Database Setup

### 3.1 Production Database Options

**Option A: Vercel Postgres (Recommended)**

1. In Vercel dashboard, go to **Storage** tab
2. Click **"Create Database"** → **"Postgres"**
3. Choose your plan (Hobby plan is free)
4. Copy the connection string
5. Add it as `DATABASE_URL` secret in GitHub

**Option B: External Database Providers**

- **Neon** (Free tier available): [neon.tech](https://neon.tech)
- **Supabase** (Free tier available): [supabase.com](https://supabase.com)
- **PlanetScale** (Free tier available): [planetscale.com](https://planetscale.com)

### 3.2 Database Migration

The GitHub Actions workflow will automatically run `prisma db push` on production deployment.

## 🌐 Step 4: Environment Variables Setup

### 4.1 Vercel Environment Variables

In Vercel dashboard → **Settings** → **Environment Variables**

Add these **Production** environment variables:

```bash
# Database
DATABASE_URL=your_production_database_url

# Next.js Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_APP_NAME=SumnSubstance

# Authentication
BETTER_AUTH_SECRET=your-super-secret-production-key
BETTER_AUTH_URL=https://your-domain.vercel.app

# OAuth Providers (if using)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Razorpay Payment Gateway
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_your_live_key_id
RAZORPAY_KEY_SECRET=your_live_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret

# Email Configuration
RESEND_API_KEY=re_your_resend_api_key
EMAIL_FROM=orders@yourdomain.com
EMAIL_FROM_NAME=SumnSubstance Team

# Order Configuration
NEXT_PUBLIC_MIN_ORDER_VALUE=100
NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD=500
NEXT_PUBLIC_GST_RATE=0.18
NEXT_PUBLIC_SHIPPING_RATE=50

# Admin Configuration
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_NOTIFICATION_EMAIL=notifications@yourdomain.com

# Security
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000

# Order Number Configuration
ORDER_NUMBER_PREFIX=ORD
ORDER_NUMBER_LENGTH=8

# Currency Configuration
NEXT_PUBLIC_CURRENCY=INR
NEXT_PUBLIC_CURRENCY_SYMBOL=₹

# Feature Flags
NEXT_PUBLIC_ENABLE_GUEST_CHECKOUT=true
NEXT_PUBLIC_ENABLE_COD=false
NEXT_PUBLIC_ENABLE_WALLET=false

# File Upload Limits
NEXT_PUBLIC_MAX_FILE_SIZE=5242880
NEXT_PUBLIC_MAX_FILES=10

# Session Configuration
SESSION_MAX_AGE=604800

# API Rate Limiting
API_RATE_LIMIT=1000
API_RATE_WINDOW=3600

# Environment
NODE_ENV=production
```

### 4.2 Preview Environment Variables

Also add the same variables for **Preview** environment (use test/development values where appropriate).

## 🔄 Step 5: Workflow Features

### 5.1 What the GitHub Actions Workflow Does

**On Pull Requests:**

- ✅ Code quality checks (ESLint, TypeScript)
- ✅ Security audit (pnpm audit, Trivy scanner)
- ✅ Build verification
- ✅ Deploy preview to Vercel
- ✅ Performance audit with Lighthouse
- ✅ Comment PR with preview URL

**On Main Branch Push:**

- ✅ All quality checks
- ✅ Production deployment to Vercel
- ✅ Database migrations
- ✅ Slack notifications (if configured)

### 5.2 Security Features

- 🔒 Vulnerability scanning with Trivy
- 🔒 Dependency audit
- 🔒 Security headers in Vercel config
- 🔒 Rate limiting configuration
- 🔒 Content Security Policy ready

### 5.3 Performance Features

- ⚡ Lighthouse CI for performance monitoring
- ⚡ Build caching with pnpm
- ⚡ Optimized Vercel configuration
- ⚡ CDN-ready static assets

## 🚀 Step 6: First Deployment

### 6.1 Test the Pipeline

1. Create a new branch: `git checkout -b test-deployment`
2. Make a small change (like updating README)
3. Push the branch: `git push origin test-deployment`
4. Create a Pull Request
5. Watch the GitHub Actions workflow run
6. Check the PR comment for preview URL

### 6.2 Deploy to Production

1. Merge your PR to `main` branch
2. The workflow will automatically deploy to production
3. Check your Vercel dashboard for deployment status

## 🔧 Step 7: Customization Options

### 7.1 Slack Notifications

1. Create a Slack app and webhook
2. Add `SLACK_WEBHOOK_URL` to GitHub secrets
3. Get deployment notifications in Slack

### 7.2 Custom Domain

1. In Vercel dashboard → **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` environment variable

### 7.3 Monitoring & Analytics

- **Sentry**: Add `SENTRY_DSN` for error tracking
- **Google Analytics**: Add `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`
- **Vercel Analytics**: Enable in Vercel dashboard

## 🛠️ Step 8: Troubleshooting

### Common Issues:

**Build Failures:**

- Check environment variables are set correctly
- Verify database connection
- Check for missing dependencies

**Deployment Issues:**

- Verify Vercel tokens and IDs
- Check Vercel project settings
- Review build logs in Vercel dashboard

**Database Issues:**

- Ensure `DATABASE_URL` is correct
- Check database permissions
- Verify Prisma schema is up to date

## 📊 Step 9: Monitoring Your Deployments

### 9.1 GitHub Actions Dashboard

- Go to your repository → **Actions** tab
- Monitor workflow runs and logs
- Set up notifications for failures

### 9.2 Vercel Dashboard

- Monitor deployment status
- View build logs and performance metrics
- Check function logs and errors

### 9.3 Performance Monitoring

- Lighthouse reports in GitHub Actions
- Vercel Analytics (if enabled)
- Core Web Vitals tracking

## 🎉 You're All Set!

Your CI/CD pipeline is now configured with:

- ✅ Automated testing and quality checks
- ✅ Security scanning and vulnerability detection
- ✅ Preview deployments for PRs
- ✅ Production deployments on main branch
- ✅ Performance monitoring
- ✅ Database migrations
- ✅ Slack notifications (optional)

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

## 🔄 Next Steps

1. **Set up monitoring**: Configure Sentry or similar error tracking
2. **Add tests**: Implement unit and integration tests
3. **Performance optimization**: Monitor and optimize based on Lighthouse reports
4. **Security hardening**: Regular security audits and dependency updates
5. **Backup strategy**: Set up database backups and disaster recovery

---

**Need help?** Check the troubleshooting section or create an issue in your repository!
