"use client";

import { useState, useEffect } from "react";

/**
 * Hook personalizado para detectar dispositivos móviles
 * Detecta el tamaño de pantalla y actualiza automáticamente al redimensionar
 * Útil para componentes responsivos y lógica condicional móvil
 */
const useMobile = (breakpoint: number = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Función para verificar si es móvil basado en el ancho de pantalla
    const checkIsMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < breakpoint);
      }
    };

    // Verificar al cargar
    checkIsMobile();

    // Escuchar cambios de tamaño de ventana
    const handleResize = () => {
      checkIsMobile();
    };

    window.addEventListener("resize", handleResize);

    // Limpiar el event listener al desmontar
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  /**
   * Detecta si es un dispositivo táctil
   */
  const isTouchDevice = () => {
    return (
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    );
  };

  /**
   * Detecta el tipo de dispositivo basado en user agent
   */
  const getDeviceType = () => {
    if (typeof window === "undefined") return "desktop";

    const userAgent = navigator.userAgent.toLowerCase();

    if (/tablet|ipad|playbook|silk/.test(userAgent)) {
      return "tablet";
    }

    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/.test(userAgent)) {
      return "mobile";
    }

    return "desktop";
  };

  return {
    isMobile,
    isTouchDevice: isTouchDevice(),
    deviceType: getDeviceType(),
    isTablet: getDeviceType() === "tablet",
    isDesktop: getDeviceType() === "desktop",
  };
};

export { useMobile };
