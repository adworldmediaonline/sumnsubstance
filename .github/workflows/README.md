# GitHub Actions for Vercel Deployment

This directory contains GitHub Actions workflows for deploying your Next.js application to Vercel.

## Workflows

### Preview Deployment (`preview.yaml`)

- Triggers on pushes to any branch except `main`
- Also triggers on pull requests to `main`
- Creates preview deployments for testing

### Production Deployment (`production.yaml`)

- Triggers on pushes to `main` branch
- Creates production deployments

## Setup Instructions

### 1. Get Vercel Credentials

First, you need to get your Vercel project credentials:

1. Install Vercel CLI: `npm install -g vercel`
2. Login to Vercel: `vercel login`
3. Link your project: `vercel link`
4. Check the `.vercel/project.json` file for your `projectId` and `orgId`

### 2. Create Vercel Access Token

1. Go to [Vercel Dashboard](https://vercel.com/account/tokens)
2. Create a new token with appropriate permissions
3. Copy the token (you'll need it for GitHub secrets)

### 3. Add GitHub Secrets

In your GitHub repository, go to Settings → Secrets and variables → Actions, and add these secrets:

- `VERCEL_TOKEN`: Your Vercel access token
- `VERCEL_ORG_ID`: Your Vercel organization ID (from `.vercel/project.json`)
- `VERCEL_PROJECT_ID`: Your Vercel project ID (from `.vercel/project.json`)

### 4. Environment Variables

Make sure to set up your environment variables in Vercel Dashboard:

- Go to your project settings
- Add environment variables for both Preview and Production environments
- Include variables for database connections, API keys, etc.

## How It Works

1. **Code Quality**: Biome runs linting and formatting checks before deployment
2. **Preview Deployments**: Every push to a non-main branch or PR creates a preview deployment
3. **Production Deployments**: Every push to main creates a production deployment
4. **Build Process**: The workflow uses `vercel build` to create build artifacts locally
5. **Deployment**: Uses `vercel deploy --prebuilt` to upload only the build artifacts

## Biome Integration

This workflow includes [Biome](https://biomejs.dev/) for fast code formatting and linting:

- **Formatting**: Automatically formats TypeScript, JavaScript, JSX, TSX, JSON, and CSS files
- **Linting**: 355 rules covering complexity, correctness, style, suspicious patterns, and performance
- **Speed**: 35x faster than Prettier for large codebases
- **Compatibility**: 97% compatibility with Prettier formatting

The `biome check --write .` command will:
- Format your code according to the configuration in `biome.json`
- Run all enabled linting rules
- Automatically fix issues where possible
- Fail the build if unfixable issues are found

## Features

- ✅ Uses pnpm for package management (matching your project setup)
- ✅ Includes Prisma generation in build process
- ✅ Caches Node.js dependencies for faster builds
- ✅ Uses latest stable Node.js (v20)
- ✅ Uses latest Vercel CLI
- ✅ Optimized for Next.js with Turbopack
- ✅ **Biome integration** for fast linting and formatting (35x faster than Prettier)

## Troubleshooting

### Common Issues

1. **Build failures**: Check that all environment variables are set in Vercel
2. **Prisma issues**: Ensure database connection strings are correct
3. **Missing dependencies**: Verify `pnpm install --frozen-lockfile` works locally

### Debugging

- Check the Actions tab in your GitHub repository for detailed logs
- Verify all secrets are correctly set
- Ensure your Vercel project is properly linked
