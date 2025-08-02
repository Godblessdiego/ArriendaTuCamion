"use client";

import React, { useState } from "react";
import { useDarkMode } from "../../../hooks/index";
import { AddReviewFormData, ReviewFormErrors } from "./types";

interface AddReviewProps {
  onSuccess?: () => void;
}

const AddReview = ({ onSuccess }: AddReviewProps) => {
  const { isDark } = useDarkMode();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState<AddReviewFormData>({
    name: "",
    role: "",
    comment: "",
    rating: 0,
    email: "",
  });

  const [errors, setErrors] = useState<ReviewFormErrors>({});
  const [hoveredRating, setHoveredRating] = useState(0);

  const validateForm = (): boolean => {
    const newErrors: ReviewFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
    }

    if (!formData.role.trim()) {
      newErrors.role = "El rol o empresa es requerido";
    } else if (formData.role.trim().length < 2) {
      newErrors.role = "El rol debe tener al menos 2 caracteres";
    }

    if (!formData.comment.trim()) {
      newErrors.comment = "El comentario es requerido";
    } else if (formData.comment.trim().length < 10) {
      newErrors.comment = "El comentario debe tener al menos 10 caracteres";
    } else if (formData.comment.trim().length > 1000) {
      newErrors.comment = "El comentario no puede exceder 1000 caracteres";
    }

    if (formData.rating === 0) {
      newErrors.rating = "Por favor selecciona una calificación";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El email no tiene un formato válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitSuccess(true);
      setFormData({
        name: "",
        role: "",
        comment: "",
        rating: 0,
        email: "",
      });
      setErrors({});

      // Call onSuccess callback if provided
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        // Reset success message after 3 seconds if no callback
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 3000);
      }
    } catch (error) {
      setSubmitError("Error al enviar la reseña. Por favor intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof ReviewFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      const isActive = starValue <= (hoveredRating || formData.rating);

      return (
        <button
          key={i}
          type="button"
          className={`text-3xl transition-colors duration-200 ${
            isActive ? "text-amber-500" : isDark ? "text-gray-600" : "text-gray-300"
          } hover:text-amber-500`}
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => {
            setFormData((prev) => ({ ...prev, rating: starValue }));
            if (errors.rating) {
              setErrors((prev) => ({ ...prev, rating: undefined }));
            }
          }}
        >
          ★
        </button>
      );
    });
  };

  return (
    <div className="w-full">
      {submitSuccess ? (
        <div className="text-center py-8">
          <div
            className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
              isDark ? "bg-green-500/20" : "bg-green-100"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h4
            className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            ¡Reseña enviada!
          </h4>
          <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Tu reseña será revisada antes de ser publicada. ¡Gracias por tu feedback!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md border transition-colors ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : isDark
                    ? "border-gray-600 bg-slate-700 text-white focus:border-blue-500 focus:ring-blue-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              }`}
              placeholder="Tu nombre"
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Empresa/Rol <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md border transition-colors ${
                errors.role
                  ? "border-red-500 focus:ring-red-500"
                  : isDark
                    ? "border-gray-600 bg-slate-700 text-white focus:border-blue-500 focus:ring-blue-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              }`}
              placeholder="Empresa o tipo de trabajo"
            />
            {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email (opcional)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md border transition-colors ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : isDark
                    ? "border-gray-600 bg-slate-700 text-white focus:border-blue-500 focus:ring-blue-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              }`}
              placeholder="tu@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Calificación <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-1 mb-2">{renderStars()}</div>
            {errors.rating && <p className="text-sm text-red-500">{errors.rating}</p>}
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Comentario <span className="text-red-500">*</span>
            </label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows={4}
              className={`w-full px-4 py-2 rounded-md border resize-none transition-colors ${
                errors.comment
                  ? "border-red-500 focus:ring-red-500"
                  : isDark
                    ? "border-gray-600 bg-slate-700 text-white focus:border-blue-500 focus:ring-blue-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              }`}
              placeholder="Cuéntanos sobre tu experiencia..."
            />
            <div className="flex justify-between items-center mt-1">
              {errors.comment && (
                <p className="text-sm text-red-500">{errors.comment}</p>
              )}
              <p
                className={`text-xs ml-auto ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {formData.comment.length}/1000
              </p>
            </div>
          </div>

          {submitError && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{submitError}</p>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${
                isSubmitting
                  ? isDark
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gray-400 cursor-not-allowed"
                  : isDark
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Enviando...
                </span>
              ) : (
                "Enviar reseña"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddReview;
