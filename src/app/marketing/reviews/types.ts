export interface AddReviewFormData {
  name: string;
  role: string;
  comment: string;
  rating: number;
  email: string;
}

export interface ReviewFormErrors {
  name?: string;
  role?: string;
  comment?: string;
  rating?: string;
  email?: string;
}

export interface Review {
  id: number;
  name: string;
  role: string;
  comment: string;
  rating: number;
  createdAt: string;
}
