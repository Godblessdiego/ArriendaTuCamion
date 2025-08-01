/**
 * Archivo índice para exportar todos los hooks personalizados
 * Permite importar múltiples hooks desde un solo lugar
 */

// Hook para manejo del modo oscuro/claro
export { useDarkMode } from "./useDarkMode";

// Hook para detección de dispositivos móviles
export { useMobile } from "./useMobile";

// Hook para manejo del menú móvil
export { useMobileMenu } from "./useMobileMenu";

// Exportaciones por defecto
export { default as useDarkMode } from "./useDarkMode";
export { default as useMobile } from "./useMobile";
export { default as useMobileMenu } from "./useMobileMenu";
