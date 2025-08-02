"use client";

import React from "react";
import { useDarkMode, useContactNavigation } from "../../../hooks/index";

const Services = () => {
  const { isDark } = useDarkMode();
  const { navigateToContactWithChofer, navigateToContactSinChofer } =
    useContactNavigation();

  return (
    <section className={`py-20 ${isDark ? "bg-slate-900" : "bg-white"}`}>
      <div className="container mx-auto px-6">
        {/*
          Título de la sección
          Centrado con espaciado consistente y colores adaptativos
        */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Nuestros Servicios
          </h2>
          <p
            className={`text-xl max-w-2xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Elige la opción que mejor se adapte a tus necesidades
          </p>
        </div>

        {/*
          Grid de servicios
          Dos columnas responsivas con espaciado optimizado
        */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/*
            Servicio: Arriendo con chofer
            Tarjeta con bordes y efectos hover consistentes con el diseño
          */}
          <div
            className={`border-2 rounded-xl p-8 transition-all duration-300 hover:shadow-xl transform hover:scale-105 ${
              isDark
                ? "bg-slate-900 border-blue-500/20 hover:border-blue-500/40 shadow-slate-800"
                : "bg-white border-blue-500/20 hover:border-blue-500/40 shadow-md"
            }`}
          >
            <div className="text-center pb-4">
              {/* Icono del servicio */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isDark ? "bg-blue-500/20" : "bg-blue-500/10"
                }`}
              >
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>

              {/* Título del servicio */}
              <h3
                className={`text-2xl font-semibold mb-3 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Arrienda tu camión con chofer
              </h3>

              {/* Descripción */}
              <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                Servicio completo con conductor profesional incluido
              </p>
            </div>

            {/* Características del servicio */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span
                  className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
                >
                  Disponible 24/7
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span
                  className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
                >
                  Conductor certificado
                </span>
              </div>
            </div>

            {/* Botón CTA */}
            <button
              onClick={navigateToContactWithChofer}
              className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                isDark
                  ? "bg-slate-700 text-white hover:bg-slate-600"
                  : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:opacity-90"
              }`}
            >
              Solicitar con chofer
            </button>
          </div>

          {/*
            Servicio: Arriendo sin chofer
            Tarjeta con colores alternativos pero manteniendo consistencia
          */}
          <div
            className={`border-2 rounded-xl p-8 transition-all duration-300 hover:shadow-xl transform hover:scale-105 ${
              isDark
                ? "bg-slate-900 border-amber-500/20 hover:border-amber-500/40 shadow-slate-800"
                : "bg-white border-amber-500/20 hover:border-amber-500/40 shadow-md"
            }`}
          >
            <div className="text-center pb-4">
              {/* Icono del servicio */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isDark ? "bg-amber-500/20" : "bg-amber-500/10"
                }`}
              >
                <svg
                  className="w-8 h-8 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
              </div>

              {/* Título del servicio */}
              <h3
                className={`text-2xl font-semibold mb-3 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Arrienda tu camión para ti
              </h3>

              {/* Descripción */}
              <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                Maneja tú mismo con total libertad y flexibilidad
              </p>
            </div>

            {/* Características del servicio */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="w-4 h-4 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span
                  className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
                >
                  Entrega inmediata
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="w-4 h-4 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span
                  className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
                >
                  Seguro incluido
                </span>
              </div>
            </div>

            {/* Botón CTA */}
            <button
              onClick={navigateToContactSinChofer}
              className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                isDark
                  ? "bg-slate-700 text-white hover:bg-slate-600"
                  : "bg-gradient-to-r from-amber-600 to-amber-500 text-white hover:opacity-90"
              }`}
            >
              Solicitar para mí
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
