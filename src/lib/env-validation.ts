// Environment validation that can be skipped during CI builds
export function validateEnvironment() {
  // Skip validation during CI builds
  if (process.env.NEXT_PUBLIC_SKIP_ENV_VALIDATION === 'true') {
    console.log('Skipping environment validation for CI build');
    return;
  }

  const requiredEnvVars = [
    'DATABASE_URL',
    'BETTER_AUTH_SECRET',
    'BETTER_AUTH_URL',
    'RESEND_API_KEY',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
    'NEXT_PUBLIC_RAZORPAY_KEY_ID',
    'RAZORPAY_KEY_SECRET',
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.warn(`Missing environment variables: ${missingVars.join(', ')}`);
    console.warn(
      'This is expected during CI builds. Set NEXT_PUBLIC_SKIP_ENV_VALIDATION=true to skip this warning.'
    );
  }
}

// Only validate in non-CI environments
if (typeof window === 'undefined' && process.env.NODE_ENV !== 'test') {
  validateEnvironment();
}
