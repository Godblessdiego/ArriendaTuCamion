"use client";

import { useState, useEffect } from "react";

/**
 * Hook personalizado para manejar el estado del menú móvil
 * Controla la apertura/cierre del menú y maneja efectos secundarios
 * como prevenir scroll del body cuando el menú está abierto
 */
export const useMobileMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Efecto para manejar el scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Prevenir scroll del body cuando el menú está abierto
      document.body.style.overflow = "hidden";
    } else {
      // Restaurar scroll del body cuando el menú se cierra
      document.body.style.overflow = "unset";
    }

    // Limpiar al desmontar el componente
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Cerrar menú cuando se presiona Escape
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isMobileMenuOpen]);

  /**
   * Alterna el estado del menú móvil
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  /**
   * Abre el menú móvil
   */
  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  /**
   * Cierra el menú móvil
   */
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  /**
   * Cierra el menú cuando se hace click en un enlace
   * Útil para navegación en SPA
   */
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return {
    isMobileMenuOpen,
    toggleMobileMenu,
    openMobileMenu,
    closeMobileMenu,
    handleLinkClick,
  };
};

export default useMobileMenu;
