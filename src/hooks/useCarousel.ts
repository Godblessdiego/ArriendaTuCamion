import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCarouselProps {
  totalItems: number;
  autoPlayDelay?: number;
  enableAutoPlay?: boolean;
}

interface UseCarouselReturn {
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

export const useCarousel = ({
  totalItems,
  autoPlayDelay = 4000,
  enableAutoPlay = true,
}: UseCarouselProps): UseCarouselReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(enableAutoPlay);
  const [itemsPerView, setItemsPerView] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Calculate max index based on items per view
  const maxIndex = Math.ceil(totalItems / itemsPerView) - 1;

  // Get items per view based on screen size
  const getItemsPerView = useCallback(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3; // lg and up
      if (window.innerWidth >= 768) return 2; // md
      return 1; // sm and down
    }
    return 1;
  }, []);

  // Update items per view on resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getItemsPerView]);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && totalItems > 0 && maxIndex > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
      }, autoPlayDelay);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, totalItems, maxIndex, autoPlayDelay]);

  // Reset current index if it exceeds max index after items per view change
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(0);
    }
  }, [currentIndex, maxIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + maxIndex + 1) % (maxIndex + 1));
  }, [maxIndex]);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index <= maxIndex) {
      setCurrentIndex(index);
    }
  }, [maxIndex]);

  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);

  const resumeAutoPlay = useCallback(() => {
    if (enableAutoPlay) {
      setIsAutoPlaying(true);
    }
  }, [enableAutoPlay]);

  return {
    currentIndex,
    isAutoPlaying,
    itemsPerView,
    maxIndex,
    nextSlide,
    prevSlide,
    goToSlide,
    pauseAutoPlay,
    resumeAutoPlay,
    setItemsPerView,
  };
};
