// data/countries.js - Supported Countries with Cultural Context
export const SUPPORTED_COUNTRIES = {
    countries: [
      // Africa
      { name: 'Kenya', country_code: 'KE', region: 'East Africa', cuisine: 'East African' },
      { name: 'Nigeria', country_code: 'NG', region: 'West Africa', cuisine: 'West African' },
      { name: 'Ghana', country_code: 'GH', region: 'West Africa', cuisine: 'West African' },
      { name: 'South Africa', country_code: 'ZA', region: 'Southern Africa', cuisine: 'South African' },
      { name: 'Ethiopia', country_code: 'ET', region: 'East Africa', cuisine: 'Ethiopian' },
      { name: 'Uganda', country_code: 'UG', region: 'East Africa', cuisine: 'East African' },
      { name: 'Tanzania', country_code: 'TZ', region: 'East Africa', cuisine: 'East African' },
      { name: 'Morocco', country_code: 'MA', region: 'North Africa', cuisine: 'Moroccan' },
      { name: 'Egypt', country_code: 'EG', region: 'North Africa', cuisine: 'Middle Eastern' },
  
      // Europe
      { name: 'United Kingdom', country_code: 'GB', region: 'Western Europe', cuisine: 'British' },
      { name: 'Germany', country_code: 'DE', region: 'Central Europe', cuisine: 'German' },
      { name: 'France', country_code: 'FR', region: 'Western Europe', cuisine: 'French' },
      { name: 'Italy', country_code: 'IT', region: 'Southern Europe', cuisine: 'Italian' },
      { name: 'Spain', country_code: 'ES', region: 'Southern Europe', cuisine: 'Spanish' },
      { name: 'Netherlands', country_code: 'NL', region: 'Western Europe', cuisine: 'Dutch' },
      { name: 'Sweden', country_code: 'SE', region: 'Northern Europe', cuisine: 'Scandinavian' },
      { name: 'Poland', country_code: 'PL', region: 'Central Europe', cuisine: 'Polish' },
  
      // Americas
      { name: 'United States', country_code: 'US', region: 'North America', cuisine: 'American' },
      { name: 'Canada', country_code: 'CA', region: 'North America', cuisine: 'Canadian' },
      { name: 'Mexico', country_code: 'MX', region: 'North America', cuisine: 'Mexican' },
      { name: 'Brazil', country_code: 'BR', region: 'South America', cuisine: 'Brazilian' },
      { name: 'Argentina', country_code: 'AR', region: 'South America', cuisine: 'Argentinian' },
      { name: 'Colombia', country_code: 'CO', region: 'South America', cuisine: 'Colombian' },
      { name: 'Peru', country_code: 'PE', region: 'South America', cuisine: 'Peruvian' },
  
      // Asia
      { name: 'India', country_code: 'IN', region: 'South Asia', cuisine: 'Indian' },
      { name: 'Japan', country_code: 'JP', region: 'East Asia', cuisine: 'Japanese' },
      { name: 'China', country_code: 'CN', region: 'East Asia', cuisine: 'Chinese' },
      { name: 'Thailand', country_code: 'TH', region: 'Southeast Asia', cuisine: 'Thai' },
      { name: 'Vietnam', country_code: 'VN', region: 'Southeast Asia', cuisine: 'Vietnamese' },
      { name: 'South Korea', country_code: 'KR', region: 'East Asia', cuisine: 'Korean' },
      { name: 'Singapore', country_code: 'SG', region: 'Southeast Asia', cuisine: 'Singaporean' },
      { name: 'Malaysia', country_code: 'MY', region: 'Southeast Asia', cuisine: 'Malaysian' },
      { name: 'Indonesia', country_code: 'ID', region: 'Southeast Asia', cuisine: 'Indonesian' },
      { name: 'Philippines', country_code: 'PH', region: 'Southeast Asia', cuisine: 'Filipino' },
  
      // Oceania
      { name: 'Australia', country_code: 'AU', region: 'Oceania', cuisine: 'Australian' },
      { name: 'New Zealand', country_code: 'NZ', region: 'Oceania', cuisine: 'New Zealand' },
  
      // Middle East
      { name: 'Turkey', country_code: 'TR', region: 'Middle East', cuisine: 'Turkish' },
      { name: 'Lebanon', country_code: 'LB', region: 'Middle East', cuisine: 'Lebanese' },
      { name: 'Israel', country_code: 'IL', region: 'Middle East', cuisine: 'Israeli' },
      { name: 'United Arab Emirates', country_code: 'AE', region: 'Middle East', cuisine: 'Emirati' }
    ]
  };
  
  // Helper functions
  export function getCountryByCode(countryCode) {
    return SUPPORTED_COUNTRIES.countries.find(
      country => country.country_code === countryCode?.toUpperCase()
    );
  }
  
  export function getCountriesByRegion(region) {
    return SUPPORTED_COUNTRIES.countries.filter(
      country => country.region === region
    );
  }
  
  export function getCountriesByCuisine(cuisine) {
    return SUPPORTED_COUNTRIES.countries.filter(
      country => country.cuisine.toLowerCase().includes(cuisine.toLowerCase())
    );
  }
  
  export function searchCountries(searchTerm) {
    const term = searchTerm.toLowerCase();
    return SUPPORTED_COUNTRIES.countries.filter(country =>
      country.name.toLowerCase().includes(term) ||
      country.country_code.toLowerCase().includes(term) ||
      country.cuisine.toLowerCase().includes(term) ||
      country.region.toLowerCase().includes(term)
    );
  }
  
  export function isCountrySupported(countryCode) {
    return SUPPORTED_COUNTRIES.countries.some(
      country => country.country_code === countryCode?.toUpperCase()
    );
  }
  
  export function getAllCountryCodes() {
    return SUPPORTED_COUNTRIES.countries.map(country => country.country_code);
  }
  
  export function getRegions() {
    return [...new Set(SUPPORTED_COUNTRIES.countries.map(country => country.region))];
  }
  
  export function getCuisineTypes() {
    return [...new Set(SUPPORTED_COUNTRIES.countries.map(country => country.cuisine))];
  }
  
  // Get country suggestions based on user input
  export function getCountrySuggestions(input) {
    if (!input || input.length < 2) {
      return SUPPORTED_COUNTRIES.countries.slice(0, 10); // Return first 10
    }
    
    const matches = searchCountries(input);
    return matches.slice(0, 10); // Limit to 10 suggestions
  }
  
  // Validate and normalize country input
  export function normalizeCountryInput(countryInput) {
    if (!countryInput) return null;
    
    // If it's already a country code
    if (countryInput.length === 2) {
      const country = getCountryByCode(countryInput);
      return country || null;
    }
    
    // Search by name
    const matches = searchCountries(countryInput);
    return matches.length > 0 ? matches[0] : null;
  }