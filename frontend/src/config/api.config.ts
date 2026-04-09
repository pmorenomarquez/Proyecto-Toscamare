/**
 * Configuración dinámica de la API dependiente del entorno.
 * VITE_API_URL debe definirse en los archivos .env (.env.local, .env.production, etc.)
 */

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const ENDPOINTS = {
  CONTACT: `${API_URL}/api/contact`,
  HEALTH: `${API_URL}/health`,
};
