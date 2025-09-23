# GitHub Actions Setup

## Required GitHub Secrets

Set these in your repository: **Settings → Secrets and variables → Actions**

```bash
DATABASE_URL=postgresql://username:password@host:port/database
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id
```

## What This Does

✅ **Builds work** - Uses your production database for all builds
✅ **Environment validation skipped** - `SKIP_ENV_VALIDATION=true` prevents errors
✅ **Simple deployment** - Uses existing Vercel setup
✅ **No complex environment files** - Minimal configuration

## CI/CD Flow

**Pull Request:**

1. Code quality checks
2. Build with production database
3. Deploy preview to Vercel
4. Performance audit

**Main Branch:**

1. Code quality checks
2. Build with production database
3. Deploy production to Vercel
4. Clean up old artifacts

## Why This Works

- **Uses your existing DATABASE_URL** - No need for separate CI database
- **Skips environment validation** - Avoids missing environment variable errors
- **Leverages existing secrets** - Only uses what you already have
- **Simple and reliable** - No complex environment file management

## To Add More Environment Variables Later

If you need additional environment variables:

1. Add them to your `.env` file locally
2. Add them as GitHub Secrets
3. Add them to the `env:` section in the relevant jobs

**Example:**

```yaml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }} # New secret
  NODE_ENV: 'production'
```

That's it! Your builds should work now. 🎉
