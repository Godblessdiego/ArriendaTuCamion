"use client";

import React from "react";
import Image from "next/image";
import { useDarkMode } from "../../../hooks/index";

const Trucks = () => {
  const { isDark } = useDarkMode();

  return (
    /* Nuestros Camiones Section */
    <section className={`py-20 ${isDark ? "bg-slate-900" : "bg-card"}`} id="camiones">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-foreground"
            }`}
          >
            Nuestros Camiones
          </h2>
          <p
            className={`text-xl max-w-2xl mx-auto ${
              isDark ? "text-gray-300" : "text-muted-foreground"
            }`}
          >
            Camiones modernos y confiables listos para ser usados
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Chevrolet NPR 816 */}
          <div
            className={`border-2 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg overflow-hidden rounded-lg ${
              isDark ? "bg-slate-800" : "bg-background"
            }`}
          >
            <div
              className={`aspect-video flex items-center justify-center ${
                isDark ? "bg-slate-700/50" : "bg-gray-100"
              }`}
            >
              <Image
                src="/npr-816.png"
                alt="Chevrolet NPR 816"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center p-5">
              <h3
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-foreground"
                }`}
              >
                Chevrolet NPR 816
              </h3>
              <p className={`mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Ideal para cargas medianas y mudanzas
              </p>
            </div>
            <div className="text-center p-5 pt-0">
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500"
                  >
                    <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11c0 .6-.4 1-1 1h-2"></path>
                    <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"></path>
                    <circle cx="7" cy="18" r="2"></circle>
                    <circle cx="17" cy="18" r="2"></circle>
                  </svg>
                  <span
                    className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Capacidad de carga: 8.16 toneladas
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <span
                    className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Motor confiable y eficiente
                  </span>
                </div>
              </div>
              <button
                className={`w-full py-2 px-4 text-white font-medium rounded-md transition-colors duration-300 ${
                  isDark
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Arrendar NPR 816
              </button>
            </div>
          </div>

          {/* Chevrolet NPR 715 */}
          <div
            className={`border-2 border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg overflow-hidden rounded-lg ${
              isDark ? "bg-slate-800" : "bg-background"
            }`}
          >
            <div
              className={`aspect-video flex items-center justify-center ${
                isDark ? "bg-slate-700/50" : "bg-gray-100"
              }`}
            >
              <Image
                src="/npr-715.png"
                alt="Chevrolet NPR 715"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center p-5">
              <h3
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-foreground"
                }`}
              >
                Chevrolet NPR 715
              </h3>
              <p className={`mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Perfecto para entregas urbanas y cargas ligeras
              </p>
            </div>
            <div className="text-center p-5 pt-0">
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-amber-500"
                  >
                    <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11c0 .6-.4 1-1 1h-2"></path>
                    <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"></path>
                    <circle cx="7" cy="18" r="2"></circle>
                    <circle cx="17" cy="18" r="2"></circle>
                  </svg>
                  <span
                    className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Capacidad de carga: 7.15 toneladas
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-amber-500"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <span
                    className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Económico y maniobrable
                  </span>
                </div>
              </div>
              <button
                className={`w-full py-2 px-4 text-white font-medium rounded-md transition-colors duration-300 ${
                  isDark
                    ? "bg-amber-600 hover:bg-amber-500"
                    : "bg-amber-500 hover:bg-amber-600"
                }`}
              >
                Arrendar NPR 715
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trucks;
