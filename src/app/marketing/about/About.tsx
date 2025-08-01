"use client";

import React from "react";
import { useDarkMode } from "../../../hooks/index";

const About = () => {
  const { isDark } = useDarkMode();

  return (
    <section id="nosotros" className={`py-20 ${isDark ? "bg-slate-900" : "bg-white"}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/*
              Contenido de texto
              Información sobre la empresa con espaciado y colores adaptativos
            */}
            <div>
              <h2
                className={`text-4xl md:text-5xl font-bold mb-6 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                ¿Quiénes somos?
              </h2>

              <p
                className={`text-lg mb-6 leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Somos la empresa líder en arriendo de camiones en Chile, con más de 10
                años de experiencia brindando soluciones de transporte confiables y
                flexibles.
              </p>

              <p
                className={`text-lg mb-8 leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Nuestra flota moderna y nuestro equipo de profesionales garantizan que
                tengas la mejor experiencia de arriendo, ya sea que necesites un chofer
                o prefieras manejar tú mismo.
              </p>

              {/*
                Badges/Insignias de logros
                Elementos destacados con colores de la marca
              */}
              <div className="flex flex-wrap gap-4">
                <div
                  className={`px-4 py-2 rounded-full border text-sm font-medium ${
                    isDark
                      ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                      : "bg-blue-500/10 text-blue-600 border-blue-500/20"
                  }`}
                >
                  +500 clientes satisfechos
                </div>
                <div
                  className={`px-4 py-2 rounded-full border text-sm font-medium ${
                    isDark
                      ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                      : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                  }`}
                >
                  Flota moderna
                </div>
              </div>
            </div>

            {/*
              Elemento visual/Ilustración
              Círculo decorativo con iconos y números destacados
            */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Círculo principal con gradiente */}
                <div
                  className={`w-64 h-64 rounded-full flex items-center justify-center shadow-2xl ${
                    isDark
                      ? "bg-gradient-to-br from-blue-600 to-amber-600"
                      : "bg-gradient-to-br from-blue-500 to-amber-500"
                  }`}
                >
                  <div
                    className={`w-48 h-48 rounded-full flex items-center justify-center ${
                      isDark ? "bg-slate-900" : "bg-white"
                    }`}
                  >
                    {/* Icono de camión central */}
                    <svg
                      className={`w-24 h-24 ${
                        isDark ? "text-blue-400" : "text-blue-500"
                      }`}
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
                </div>

                {/* Badge "10+" años de experiencia */}
                <div
                  className={`absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
                    isDark
                      ? "bg-amber-600 hover:bg-amber-500"
                      : "bg-amber-500 hover:bg-amber-400"
                  } transition-colors duration-300`}
                >
                  <span className="text-white font-bold text-lg">10+</span>
                </div>

                {/* Badge "24/7" disponibilidad */}
                <div
                  className={`absolute -bottom-4 -left-4 w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
                    isDark
                      ? "bg-blue-600 hover:bg-blue-500"
                      : "bg-blue-500 hover:bg-blue-400"
                  } transition-colors duration-300`}
                >
                  <span className="text-white font-bold text-lg">24/7</span>
                </div>

                {/* Elementos decorativos adicionales */}
                <div
                  className={`absolute top-1/4 -left-8 w-4 h-4 rounded-full animate-pulse ${
                    isDark ? "bg-blue-400/60" : "bg-blue-500/40"
                  }`}
                ></div>
                <div
                  className={`absolute bottom-1/4 -right-8 w-3 h-3 rounded-full animate-pulse delay-500 ${
                    isDark ? "bg-amber-400/60" : "bg-amber-500/40"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
