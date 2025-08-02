import { useState, useEffect, useCallback } from 'react';

export interface Review {
  id: number;
  name: string;
  role: string;
  comment: string;
  rating: number;
  createdAt: string;
}

interface UseReviewsReturn {
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
  refreshReviews: () => Promise<void>;
  addReview: (reviewData: any) => Promise<boolean>;
}

const FALLBACK_REVIEWS: Review[] = [
  {
    id: 1,
    name: "Carlos Mendoza",
    role: "Empresa de Mudanzas",
    comment:
      "Excelente servicio, los camiones siempre en perfecto estado y el personal muy profesional. La puntualidad y confiabilidad son excepcionales.",
    rating: 5,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "María González",
    role: "Constructora",
    comment:
      "Llevamos años trabajando con ellos. Siempre cumplen con los tiempos y la calidad es excepcional. Nunca nos han fallado en un proyecto.",
    rating: 5,
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    name: "Roberto Silva",
    role: "Transporte Personal",
    comment:
      "Proceso muy fácil y rápido. El camión estaba impecable y el precio muy competitivo. Definitivamente los recomiendo.",
    rating: 5,
    createdAt: "2024-01-08",
  },
  {
    id: 4,
    name: "Ana Martínez",
    role: "Comercio",
    comment:
      "Perfectos para mis envíos grandes. El chofer fue muy cuidadoso con la mercancía y llegó exactamente a tiempo.",
    rating: 5,
    createdAt: "2024-01-05",
  },
  {
    id: 5,
    name: "Diego Fuentes",
    role: "Particular",
    comment:
      "Primera vez que arriendo un camión y la experiencia fue fantástica. Todo muy claro y sin sorpresas en el precio.",
    rating: 5,
    createdAt: "2024-01-03",
  },
  {
    id: 6,
    name: "Carmen López",
    role: "Importadora",
    comment:
      "Servicio profesional de primera. Los camiones están en excelente estado y el equipo es muy responsable.",
    rating: 5,
    createdAt: "2024-01-01",
  },
];

export const useReviews = (): UseReviewsReturn => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/reviews', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data) {
        setReviews(data.data);
      } else {
        console.warn('API returned no data, using fallback reviews');
        setReviews(FALLBACK_REVIEWS);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Error al cargar las reseñas');
      setReviews(FALLBACK_REVIEWS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshReviews = useCallback(async () => {
    await fetchReviews();
  }, [fetchReviews]);

  const addReview = useCallback(async (reviewData: {
    name: string;
    role: string;
    comment: string;
    rating: number;
    email?: string;
  }): Promise<boolean> => {
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();

      if (data.success) {
        // Optionally refresh reviews after adding a new one
        // await refreshReviews();
        return true;
      } else {
        throw new Error(data.error || 'Error al enviar la reseña');
      }
    } catch (err) {
      console.error('Error adding review:', err);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return {
    reviews,
    isLoading,
    error,
    refreshReviews,
    addReview,
  };
};
