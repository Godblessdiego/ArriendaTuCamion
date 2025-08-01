"use client";

import { useState, useEffect } from "react";

/**
 * Hook personalizado para manejar el modo oscuro
 * Detecta automáticamente el tema inicial y observa cambios
 * Proporciona función para alternar entre modo claro y oscuro
 */
const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  // Detectar y actualizar el modo oscuro
  useEffect(() => {
    // Detectar modo oscuro inicial del documento
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);

    // Observar cambios en la clase 'dark' del elemento html
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDarkMode = document.documentElement.classList.contains("dark");
          setIsDark(isDarkMode);
        }
      });
    });

    // Iniciar observación de cambios en el elemento html
    observer.observe(document.documentElement, { attributes: true });

    // Limpiar observer al desmontar el componente
    return () => observer.disconnect();
  }, []);

  /**
   * Función para alternar entre modo claro y oscuro
   * Actualiza el DOM y guarda la preferencia en localStorage
   */
  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return {
    isDark,
    toggleDarkMode,
  };
};

export { useDarkMode };
