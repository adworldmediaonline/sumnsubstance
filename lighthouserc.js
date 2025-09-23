module.exports = {
  ci: {
    collect: {
      url: process.env.LIGHTHOUSE_URLS?.split(',') || [
        'http://localhost:3000',
        'http://localhost:3000/products',
        'http://localhost:3000/cart',
      ],
      // Only start server for local development
      ...(process.env.NODE_ENV === 'development' && {
        startServerCommand: 'pnpm dev',
        startServerReadyPattern: 'ready on',
        startServerReadyTimeout: 30000,
      }),
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:seo': ['warn', { minScore: 0.8 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
