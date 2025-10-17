import prisma from '@/lib/prisma';
import type { ReviewData, ReviewAggregates } from '@/types/review';

// Helper function to parse review images
function parseReviewImages(images: unknown) {
  if (!images) return undefined;

  try {
    if (typeof images === 'string') {
      const parsed = JSON.parse(images);
      return Array.isArray(parsed) ? parsed : undefined;
    }
    return Array.isArray(images) ? images : undefined;
  } catch {
    return undefined;
  }
}

// Helper function to serialize review data
function serializeReview(review: {
  id: string;
  productId: string;
  userId: string | null;
  rating: number;
  title: string | null;
  comment: string;
  isVerifiedPurchase: boolean;
  status: string;
  helpfulCount: number;
  unhelpfulCount: number;
  images: unknown;
  createdAt: Date;
  updatedAt: Date;
  user: { id: string; name: string; image: string | null; initials: string | null } | null;
}): ReviewData {
  return {
    id: review.id,
    productId: review.productId,
    userId: review.userId || undefined,
    userName: review.user?.name || 'Anonymous',
    userImage: review.user?.image || undefined,
    userInitials: review.user?.initials || undefined,
    rating: review.rating,
    title: review.title || undefined,
    comment: review.comment,
    isVerifiedPurchase: review.isVerifiedPurchase,
    status: review.status as 'PENDING' | 'APPROVED' | 'REJECTED' | 'FLAGGED',
    helpfulCount: review.helpfulCount,
    unhelpfulCount: review.unhelpfulCount,
    images: parseReviewImages(review.images),
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
  };
}

// Get approved reviews for a product with pagination and sorting
export async function getReviewsByProduct(
  productId: string,
  options: {
    page?: number;
    limit?: number;
    sortBy?: 'recent' | 'highest' | 'lowest' | 'helpful';
  } = {}
): Promise<{ reviews: ReviewData[]; totalCount: number; hasMore: boolean }> {
  try {
    const page = options.page || 1;
    const limit = options.limit || 20;
    const skip = (page - 1) * limit;

    // Determine sort order
    const orderBy =
      options.sortBy === 'highest'
        ? { rating: 'desc' as const }
        : options.sortBy === 'lowest'
          ? { rating: 'asc' as const }
          : options.sortBy === 'helpful'
            ? { helpfulCount: 'desc' as const }
            : { createdAt: 'desc' as const };

    const [reviews, totalCount] = await Promise.all([
      prisma.review.findMany({
        where: {
          productId,
          status: 'APPROVED', // Only show approved reviews
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              initials: true,
            },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.review.count({
        where: {
          productId,
          status: 'APPROVED',
        },
      }),
    ]);

    return {
      reviews: reviews.map(serializeReview),
      totalCount,
      hasMore: skip + limit < totalCount,
    };
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    throw new Error('Failed to fetch reviews');
  }
}

// Get review aggregates for a product
export async function getReviewAggregates(
  productId: string
): Promise<ReviewAggregates> {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        productId,
        status: 'APPROVED',
      },
      select: {
        rating: true,
      },
    });

    const totalReviews = reviews.length;

    if (totalReviews === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        recommendPercentage: 0,
      };
    }

    // Calculate average rating
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = Number((totalRating / totalReviews).toFixed(1));

    // Calculate rating distribution
    const ratingDistribution = reviews.reduce(
      (acc, r) => {
        acc[r.rating as 1 | 2 | 3 | 4 | 5]++;
        return acc;
      },
      { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    );

    // Calculate recommend percentage (4+ stars)
    const recommendCount = reviews.filter(r => r.rating >= 4).length;
    const recommendPercentage = Math.round((recommendCount / totalReviews) * 100);

    return {
      averageRating,
      totalReviews,
      ratingDistribution,
      recommendPercentage,
    };
  } catch (error) {
    console.error('Failed to fetch review aggregates:', error);
    throw new Error('Failed to fetch review aggregates');
  }
}

// Check if user already reviewed a product
export async function getUserReview(
  productId: string,
  userId: string
): Promise<ReviewData | null> {
  try {
    const review = await prisma.review.findFirst({
      where: {
        productId,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            initials: true,
          },
        },
      },
    });

    return review ? serializeReview(review) : null;
  } catch (error) {
    console.error('Failed to fetch user review:', error);
    return null;
  }
}

// Check if user can review a product (must have purchased it)
export async function canUserReview(
  productId: string,
  userId: string
): Promise<{ canReview: boolean; reason?: string }> {
  try {
    // Check if user already reviewed
    const existingReview = await prisma.review.findFirst({
      where: {
        productId,
        userId,
      },
    });

    if (existingReview) {
      return {
        canReview: false,
        reason: 'You have already reviewed this product',
      };
    }

    // Check if user purchased the product
    const userOrder = await prisma.order.findFirst({
      where: {
        userId,
        status: 'DELIVERED', // Only delivered orders
        items: {
          some: {
            productId,
          },
        },
      },
    });

    if (!userOrder) {
      return {
        canReview: true, // Allow reviews even without purchase (won't be verified)
        reason: undefined,
      };
    }

    return {
      canReview: true,
    };
  } catch (error) {
    console.error('Failed to check review eligibility:', error);
    return {
      canReview: false,
      reason: 'Unable to verify review eligibility',
    };
  }
}

// Get pending reviews for admin moderation
export async function getPendingReviews(options: {
  page?: number;
  limit?: number;
} = {}): Promise<{ reviews: ReviewData[]; totalCount: number }> {
  try {
    const page = options.page || 1;
    const limit = options.limit || 20;
    const skip = (page - 1) * limit;

    const [reviews, totalCount] = await Promise.all([
      prisma.review.findMany({
        where: {
          status: 'PENDING',
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              initials: true,
            },
          },
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.review.count({
        where: {
          status: 'PENDING',
        },
      }),
    ]);

    return {
      reviews: reviews.map(serializeReview),
      totalCount,
    };
  } catch (error) {
    console.error('Failed to fetch pending reviews:', error);
    throw new Error('Failed to fetch pending reviews');
  }
}

// Get single review by ID
export async function getReviewById(id: string): Promise<ReviewData | null> {
  try {
    const review = await prisma.review.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            initials: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return review ? serializeReview(review) : null;
  } catch (error) {
    console.error('Failed to fetch review:', error);
    return null;
  }
}

// Export types for convenience
export type { ReviewData, ReviewAggregates } from '@/types/review';

