"use client";

import React from "react";
import { useDarkMode } from "../../../hooks/useDarkMode";

const Hero = () => {
  const { isDark } = useDarkMode();

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${
        isDark ? "bg-slate-900" : "bg-white"
      }`}
    >
      {/*
        Background decorative elements
        Elementos decorativos simples con colores de la paleta global
      */}
      <div
        className={`absolute top-20 left-10 w-20 h-20 rounded-full animate-pulse ${
          isDark ? "bg-blue-500/30" : "bg-blue-500/20"
        }`}
      ></div>
      <div
        className={`absolute top-40 right-20 w-16 h-16 rounded-full animate-pulse delay-300 ${
          isDark ? "bg-amber-500/30" : "bg-amber-500/20"
        }`}
      ></div>
      <div
        className={`absolute bottom-40 left-1/4 w-12 h-12 rounded-full animate-pulse delay-700 ${
          isDark ? "bg-blue-500/30" : "bg-blue-500/20"
        }`}
      ></div>

      {/* Espacio superior para compensar el navbar fijo */}
      <div className="h-16 md:h-20"></div>

      {/*
        Main content
        Contenido principal con diseño responsivo y soporte para dark mode
      */}
      <div className="container mx-auto px-6 pt-10 md:pt-20 pb-32 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/*
            Main heading with SVG underline
            Título principal con subrayado SVG animado
          */}
          <h1
            className={`text-7xl md:text-9xl font-extrabold mb-8 leading-tight relative tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            <span className="relative inline-block">
              Arrienda tu
              <svg
                className="absolute -bottom-4 left-0 w-full h-6"
                viewBox="0 0 400 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 15C100 5, 200 25, 300 8C350 18, 380 12, 395 15"
                  stroke="var(--primary)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
                <circle
                  cx="50"
                  cy="12"
                  r="3"
                  fill="var(--primary)"
                  className="animate-bounce"
                />
                <circle
                  cx="150"
                  cy="20"
                  r="2"
                  fill="var(--primary)"
                  className="animate-bounce delay-300"
                />
                <circle
                  cx="250"
                  cy="8"
                  r="2.5"
                  fill="var(--primary)"
                  className="animate-bounce delay-700"
                />
              </svg>
            </span>
            <br />
            <span className="relative inline-block mt-4">
              camión en un
              <svg
                className="absolute -bottom-4 left-0 w-full h-6"
                viewBox="0 0 400 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12C80 20, 160 5, 240 15C300 8, 350 18, 395 12"
                  stroke="var(--primary)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="animate-pulse delay-500"
                />
                <rect
                  x="70"
                  y="10"
                  width="4"
                  height="8"
                  fill="var(--primary)"
                  rx="2"
                  className="animate-pulse delay-200"
                />
                <rect
                  x="180"
                  y="5"
                  width="3"
                  height="12"
                  fill="var(--primary)"
                  rx="1.5"
                  className="animate-pulse delay-600"
                />
              </svg>
            </span>
            <br />
            <span className="relative inline-block mt-4 bg-gradient-hero bg-clip-text text-transparent">
              click aquí
              <svg
                className="absolute -bottom-4 left-0 w-full h-8"
                viewBox="0 0 300 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 20C60 10, 120 28, 180 15C220 25, 260 12, 295 18"
                  stroke="var(--primary)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  className="animate-pulse delay-1000"
                />
                <path
                  d="M280 15L295 18L285 25"
                  stroke="var(--primary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  className="animate-pulse delay-1200"
                />
                <circle
                  cx="100"
                  cy="18"
                  r="4"
                  fill="var(--primary)"
                  className="animate-bounce delay-800"
                />
              </svg>
            </span>
          </h1>

          <br />

          {/*
            Subtitle
            Subtítulo descriptivo con colores adaptados a modo claro/oscuro
          */}
          <p
            className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            Alquiler de camiones efectivo y rápido.
            <br />
            Encuentra el vehículo perfecto en{" "}
            <span className="text-primary font-bold">15 minutos</span>.
          </p>

          <br />
          <br />
          {/*
            CTA Button
            Botón de llamada a la acción con gradiente y efectos al pasar el ratón
          */}
          <button
            className={`hover:opacity-90 text-white px-12 py-6 text-xl rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-in ${
              isDark
                ? "bg-slate-700 shadow-slate-800"
                : "bg-gradient-to-r from-blue-600 to-blue-500 shadow-md"
            }`}
          >
            Comenzar ahora
          </button>

          {/*
            Trust indicator
            Indicador de confianza con estilo mejorado y soporte dark mode
          */}
          <div className="mt-16 flex justify-center">
            <div
              className={`border rounded-full px-8 py-4 ${
                isDark
                  ? "bg-slate-800 border-slate-700 shadow-slate-800"
                  : "bg-white border-gray-200 shadow-md"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-4 h-4 rounded-full animate-pulse ${
                    isDark ? "bg-slate-400" : "bg-blue-600"
                  }`}
                ></div>
                <span
                  className={`text-base font-medium ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  +20 camiones 3/4 disponibles
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*
        Categories section
        Sección de categorías en la parte inferior con adaptación dark mode
      */}
      <div
        className={`absolute bottom-0 left-0 right-0 border-t shadow-sm ${
          isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
        }`}
      ></div>
    </div>
  );
};

export default Hero;
