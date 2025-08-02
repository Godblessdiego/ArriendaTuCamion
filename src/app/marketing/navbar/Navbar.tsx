"use client";

import React from "react";
import { useDarkMode, useMobileMenu } from "../../../hooks/index";
import Image from "next/image";

const Navbar = () => {
  const { isDark, toggleDarkMode } = useDarkMode();
  const { isMobileMenuOpen, toggleMobileMenu, handleLinkClick } = useMobileMenu();

  return (
    <>
      {/*
        Navbar principal - sticky para que permanezca visible al hacer scroll
        z-50 asegura que aparezca por encima de otros elementos
        Aplicamos clases condicionales basadas en el estado isDark
      */}
      <nav
        className={`sticky top-0 z-50 shadow-md ${isDark ? "bg-slate-900" : "bg-white"}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/*
              Logo - Alineado a la izquierda
              Aumentado tamaño y mejorada visibilidad
            */}
            <div className="flex-shrink-0 flex items-center">
              <div className="flex items-center space-x-3">
                <Image
                  src={isDark ? "/truck_logo.svg" : "/truck_logo.svg"}
                  alt="ArriendaTuCamión Logo"
                  width={60}
                  height={60}
                />
                <span
                  className={`text-2xl font-bold md:text-3xl ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  ArriendaTuCamión
                </span>
              </div>
            </div>

            {/*
              Navegación de escritorio - Centrada
              Enlaces más espaciados y con mejor contraste
              Oculta en móvil, visible en desktop (md:)
            */}
            <div className="hidden md:flex flex-1 justify-center">
              <div className="flex items-center space-x-6">
                <a
                  href="#inicio"
                  className={`rounded-md px-4 py-2 text-base font-medium transition-all duration-200
                    ${isDark ? "text-white hover:bg-slate-800 hover:text-blue-400" : "text-gray-900 hover:bg-gray-100 hover:text-blue-600"}`}
                >
                  Inicio
                </a>
                <a
                  href="#servicios"
                  className={`rounded-md px-4 py-2 text-base font-medium transition-all duration-200
                    ${isDark ? "text-white hover:bg-slate-800 hover:text-blue-400" : "text-gray-900 hover:bg-gray-100 hover:text-blue-600"}`}
                >
                  Servicios
                </a>
                <a
                  href="#conocenos"
                  className={`rounded-md px-4 py-2 text-base font-medium transition-all duration-200
                    ${isDark ? "text-white hover:bg-slate-800 hover:text-blue-400" : "text-gray-900 hover:bg-gray-100 hover:text-blue-600"}`}
                >
                  Conócenos
                </a>
                <a
                  href="#contacto"
                  className={`rounded-md px-4 py-2 text-base font-medium transition-all duration-200
                    ${isDark ? "text-white hover:bg-slate-800 hover:text-blue-400" : "text-gray-900 hover:bg-gray-100 hover:text-blue-600"}`}
                >
                  Contacto
                </a>
              </div>
            </div>

            {/*
              Lado derecho - Controles y CTA
              Mejor espaciado y alineación
            */}
            <div className="flex items-center space-x-4 md:space-x-6">
              {/*
                Botón de cambio de tema (claro/oscuro) - Solo visible en desktop
                Animación y visuales mejorados
              */}
              <button
                onClick={toggleDarkMode}
                className={`relative hidden md:inline-flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200 shadow-sm
                  ${isDark ? "bg-slate-800 hover:bg-slate-700" : "bg-gray-100 hover:bg-gray-200"}`}
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <svg
                    className="h-5 w-5 text-amber-500 animate-pulse"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className={`h-5 w-5 ${isDark ? "text-gray-400" : "text-gray-700"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {/*
                Botón CTA principal - Oculto en móvil
                Colores de la marca, sombra y margen superior
              */}
              <button
                className={`hidden md:inline-flex items-center rounded-full mt-1 px-6 py-2.5 text-base font-medium text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md
                ${isDark ? "bg-slate-700" : "bg-gradient-to-r from-blue-600 to-blue-500"}`}
              >
                Arrienda Ahora
              </button>

              {/*
                Botón del menú móvil - Solo visible en dispositivos pequeños
                Mejor estilo y feedback visual al hacer click
              */}
              <button
                onClick={toggleMobileMenu}
                className={`inline-flex items-center justify-center rounded-md p-2 md:hidden transition-colors
                  ${isDark ? "text-white hover:bg-slate-800" : "text-gray-900 hover:bg-gray-100"}`}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/*
          Menú móvil - Aparece solo cuando está activado
          Mejor diseño y animación de entrada/salida
        */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden shadow-lg animate-in border-t
            ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}`}
          >
            <div className="space-y-2 px-4 pb-4 pt-3">
              <a
                href="#inicio"
                onClick={handleLinkClick}
                className={`block rounded-md px-3 py-2 text-base font-medium
                  ${isDark ? "text-white hover:bg-slate-800 hover:text-blue-400" : "text-gray-900 hover:bg-gray-100 hover:text-blue-600"}`}
              >
                Inicio
              </a>
              <a
                href="#servicios"
                onClick={handleLinkClick}
                className={`block rounded-md px-3 py-2 text-base font-medium
                  ${isDark ? "text-white hover:bg-slate-800 hover:text-blue-400" : "text-gray-900 hover:bg-gray-100 hover:text-blue-600"}`}
              >
                Servicios
              </a>
              <a
                href="#conocenos"
                onClick={handleLinkClick}
                className={`block rounded-md px-3 py-2 text-base font-medium
                  ${isDark ? "text-white hover:bg-slate-800 hover:text-blue-400" : "text-gray-900 hover:bg-gray-100 hover:text-blue-600"}`}
              >
                Conócenos
              </a>
              <a
                href="#contacto"
                onClick={handleLinkClick}
                className={`block rounded-md px-3 py-2 text-base font-medium
                  ${isDark ? "text-white hover:bg-slate-800 hover:text-blue-400" : "text-gray-900 hover:bg-gray-100 hover:text-blue-600"}`}
              >
                Contacto
              </a>
              <div className="mt-6 px-3">
                <button
                  className={`w-full rounded-full px-6 py-3 text-base font-medium text-white hover:opacity-90 shadow-md transition-all duration-300
                  ${isDark ? "bg-slate-700" : "bg-gradient-to-r from-blue-600 to-blue-500"}`}
                >
                  Arrienda Ahora
                </button>
              </div>

              {/* Botón de modo oscuro en menú móvil */}
              <div className="mt-4 px-3">
                <button
                  onClick={toggleDarkMode}
                  className={`w-full flex items-center justify-center space-x-2 rounded-md px-4 py-3 text-base font-medium transition-all duration-200
                  ${isDark ? "bg-slate-800 text-white" : "bg-gray-100 text-gray-900"}`}
                >
                  {isDark ? (
                    <>
                      <svg
                        className="h-5 w-5 text-amber-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Cambiar a modo claro</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-5 w-5 text-gray-700"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                      <span>Cambiar a modo oscuro</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
