"use client";

import React, { useState } from "react";
import { useDarkMode } from "../../../hooks/index";
import { useCarousel } from "../../../hooks/useCarousel";
import AddReview from "./AddReview";
import { Review } from "./types";

const Reviews = () => {
  const { isDark } = useDarkMode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);

  // Hardcoded reviews data
  const reviews: Review[] = [
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

  const {
    currentIndex,
    itemsPerView,
    maxIndex,
    nextSlide,
    prevSlide,
    goToSlide,
    pauseAutoPlay,
    resumeAutoPlay,
  } = useCarousel({
    totalItems: reviews.length,
    autoPlayDelay: 4000,
    enableAutoPlay: true,
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-amber-500 fill-amber-500" : "text-gray-300 fill-gray-300"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  const renderReview = (review: Review, index: number) => (
    <div
      key={review.id}
      className={`flex-shrink-0 p-4 ${
        itemsPerView === 1 ? "w-full" : itemsPerView === 2 ? "w-1/2" : "w-1/3"
      }`}
    >
      <div
        className={`h-full rounded-xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
          isDark
            ? "bg-slate-800 border-blue-500/20 hover:border-blue-500/40"
            : "bg-white border-blue-500/20 hover:border-blue-500/40"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center mb-4">{renderStars(review.rating)}</div>
          <p
            className={`mb-6 leading-relaxed flex-grow ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            "{review.comment}"
          </p>
          <div className="mt-auto">
            <p className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
              {review.name}
            </p>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              {review.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="testimonios"
      className={`py-20 ${isDark ? "bg-slate-900" : "bg-card"}`}
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-foreground"
            }`}
          >
            Lo que dicen nuestros clientes
          </h2>
          <p
            className={`text-xl ${isDark ? "text-gray-300" : "text-muted-foreground"}`}
          >
            Testimonios reales de quienes confían en nosotros
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Desktop/Tablet Carousel */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {Array.from(
                { length: Math.ceil(reviews.length / itemsPerView) },
                (_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0 flex">
                    {reviews
                      .slice(slideIndex * itemsPerView, (slideIndex + 1) * itemsPerView)
                      .map((review, index) => renderReview(review, index))}
                  </div>
                ),
              )}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-300 ${
                isDark
                  ? "bg-slate-800 text-white hover:bg-slate-700"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-300 ${
                isDark
                  ? "bg-slate-800 text-white hover:bg-slate-700"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-blue-500 scale-125"
                    : isDark
                      ? "bg-slate-600 hover:bg-slate-500"
                      : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                  isDark ? "bg-blue-500/20" : "bg-blue-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3
                className={`text-3xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                +500
              </h3>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Clientes satisfechos
              </p>
            </div>

            <div className="text-center">
              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                  isDark ? "bg-amber-500/20" : "bg-amber-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h3
                className={`text-3xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                4.9/5
              </h3>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Calificación promedio
              </p>
            </div>

            <div className="text-center">
              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                  isDark ? "bg-blue-500/20" : "bg-blue-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3
                className={`text-3xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                10+
              </h3>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Años de experiencia
              </p>
            </div>
          </div>
        </div>

        {/* Add Review Button */}
        <div className="text-center mt-16">
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsModalClosing(false);
            }}
            className={`inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${
              isDark
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            } shadow-lg hover:shadow-xl transform hover:scale-105`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Comparte tu experiencia
          </button>
          <p className={`mt-4 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            10% de descuento en tu siguiente arriendo al dejar una reseña
          </p>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div
            className={`fixed inset-0 bg-black flex items-center justify-center p-4 z-50 transition-all duration-300 ${
              isModalClosing ? "bg-opacity-0" : "bg-opacity-50"
            }`}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsModalClosing(true);
                setTimeout(() => setIsModalOpen(false), 300);
              }
            }}
          >
            <div
              className={`relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xl transform transition-all duration-300 ${
                isDark ? "bg-slate-800" : "bg-white"
              } ${isModalClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-inherit rounded-t-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3
                      className={`text-2xl font-bold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Comparte tu experiencia
                    </h3>
                    <p
                      className={`text-sm mt-1 ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Tu opinión nos ayuda a mejorar nuestro servicio
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsModalClosing(true);
                      setTimeout(() => setIsModalOpen(false), 300);
                    }}
                    className={`p-2 rounded-full transition-colors ${
                      isDark
                        ? "hover:bg-slate-700 text-gray-400 hover:text-white"
                        : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-3 ${
                    isDark
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  🎉 10% de descuento en tu siguiente arriendo
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <AddReview
                  onSuccess={() => {
                    setIsModalClosing(true);
                    setTimeout(() => setIsModalOpen(false), 300);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
