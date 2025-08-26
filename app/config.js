// Determine API base URL
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_PORT = 3048; // Your server port

export const CONFIG = {
  API_BASE: isDevelopment 
    ? `http://localhost:${API_PORT}` 
    : 'https://your-production-domain.com', // Update this for production
  
  // Feature flags
  ENABLE_AI: true,
  ENABLE_WEATHER: true,
  
  // Fallback values
  DEFAULT_LOCATION: { city: 'London', country_code: 'GB' }
};