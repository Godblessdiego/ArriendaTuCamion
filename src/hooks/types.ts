// Review data types
export interface Review {
  id: number;
  name: string;
  role: string;
  comment: string;
  rating: number;
  email?: string;
  approved?: boolean;
  createdAt: string;
  updatedAt?: string;
}

// Form data for adding a new review
export interface AddReviewFormData {
  name: string;
  role: string;
  comment: string;
  rating: number;
  email: string;
}

// Form validation errors
export interface ReviewFormErrors {
  name?: string;
  role?: string;
  comment?: string;
  rating?: string;
  email?: string;
  general?: string;
}

// API response types
export interface ReviewsApiResponse {
  success: boolean;
  data?: Review[];
  error?: string;
  message?: string;
}

export interface CreateReviewApiResponse {
  success: boolean;
  data?: Review;
  error?: string;
  message?: string;
}

// Carousel configuration
export interface CarouselConfig {
  autoPlayDelay: number;
  enableAutoPlay: boolean;
  pauseOnHover: boolean;
  showDots: boolean;
  showArrows: boolean;
}

// Review statistics
export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

// Review filter and sort options
export interface ReviewFilters {
  rating?: number;
  role?: string;
  dateFrom?: string;
  dateTo?: string;
}

export type ReviewSortBy = 'newest' | 'oldest' | 'rating_high' | 'rating_low';

// Hook return types
export interface UseReviewsReturn {
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
  refreshReviews: () => Promise<void>;
  addReview: (reviewData: AddReviewFormData) => Promise<boolean>;
  stats: ReviewStats;
}

export interface UseCarouselReturn {
  currentIndex: number;
  isAutoPlaying: boolean;
  itemsPerView: number;
  maxIndex: number;
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
  pauseAutoPlay: () => void;
  resumeAutoPlay: () => void;
  setItemsPerView: (items: number) => void;
}

// Component prop types
export interface ReviewCardProps {
  review: Review;
  index: number;
  isDark: boolean;
}

export interface CarouselNavigationProps {
  currentIndex: number;
  maxIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (index: number) => void;
  isDark: boolean;
}

export interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddReviewFormData) => Promise<boolean>;
  isDark: boolean;
}

// Validation types
export type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | undefined;
};

export type ValidationRules = {
  [K in keyof AddReviewFormData]?: ValidationRule;
};

// Responsive breakpoints for carousel
export interface ResponsiveBreakpoint {
  breakpoint: number;
  itemsPerView: number;
}

export type ResponsiveSettings = ResponsiveBreakpoint[];
