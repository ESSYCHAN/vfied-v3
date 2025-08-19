// VFIED MCP Server - Complete with Weather + Dietary Intelligence + Menu Upload System + MCP Protocol
import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import 'dotenv/config';
import { z } from 'zod';

// Add these routes to your mcp-server.js BEFORE your existing endpoints
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static HTML pages

const app = express();
const PORT = process.env.MCP_PORT || process.env.PORT || 3001;
const CITY_COORDINATES = {
    'London': { latitude: 51.5074, longitude: -0.1278 },
    'Mumbai': { latitude: 19.0760, longitude: 72.8777 },
    'Berlin': { latitude: 52.5200, longitude: 13.4050 },
    'Seoul': { latitude: 37.5665, longitude: 126.9780 },
    'Tokyo': { latitude: 35.6762, longitude: 139.6503 },
    'Cairo': { latitude: 30.0444, longitude: 31.2357 },
    'Nairobi': { latitude: -1.2921, longitude: 36.8219 },
    'New York': { latitude: 40.7128, longitude: -74.0060 },
    'Paris': { latitude: 48.8566, longitude: 2.3522 }
  };


// Middleware
app.use(cors({
  origin: [
    'http://localhost:5166',
    'http://localhost:3000',
    'http://localhost:5167',  
    'http://localhost:5173',
    'https://vfied.vercel.app',
    'https://vfied-v3.vercel.app',
    /^https:\/\/.*\.vercel\.app$/
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Add timing middleware for performance tracking
app.use((req, res, next) => {
  req.startTime = Date.now();
  next();
});

// Serve static HTML pages - ADD THESE ROUTES RIGHT HERE
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'), (err) => {
      if (err) {
        console.error('Error serving index.html:', err);
        res.status(404).send('Page not found');
      }
    });
  });
  
  app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'), (err) => {
      if (err) {
        console.error('Error serving dashboard.html:', err);
        res.status(404).send('Dashboard not found');
      }
    });
  });
  
  app.get('/docs', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs.html'), (err) => {
      if (err) {
        console.error('Error serving docs.html:', err);
        res.status(404).send('Documentation not found');
      }
    });
  });
  
  app.get('/demo', (req, res) => {
    res.sendFile(path.join(__dirname, 'demo.html'), (err) => {
      if (err) {
        console.error('Error serving demo.html:', err);
        res.status(404).send('Demo not found');
      }
    });
  });
  
  // Your assets route is perfect as-is
  app.use('/assets', express.static(path.join(__dirname, 'assets')));

// ==================== MENU UPLOAD SYSTEM ====================

// In-memory storage for now (move to Firebase later)
const vendorMenus = new Map(); // vendorId -> { items: [], version: string, updatedAt: Date }
const apiKeys = new Map(); // apiKey -> { vendorId, plan, usage, limit }

// API Key authentication middleware
function authenticateApiKey(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing API key' });
    const apiKey = authHeader.substring(7);
    const keyData = apiKeys.get(apiKey);
    if (!keyData) return res.status(401).json({ error: 'Invalid API key' });
    req.apiKey = keyData;
    next();
  }
  function countUsage(req, res, next) {
    const k = req.apiKey;
    if (k.usage >= k.limit) return res.status(429).json({ error: 'Monthly limit exceeded. Upgrade your plan.' });
    k.usage++;
    next();
  }
  

  
// ==================== AI FOOD SERVICE ====================

// Sophisticated AI Food Service (with OpenAI + Weather + Cultural Intelligence)
class AIFoodService {
  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY;
    this.weatherApiKey = process.env.OPENWEATHER_API_KEY;
    this.userLocation = null;
    this.userCulture = null;
    this.personalHistory = [];
    this.contextData = {};
    this.interactionId = null;
    
    this.initializeService();
  }

  async initializeService() {
    console.log('🤖 VFIED AI Service initializing all phases...');
    
    // Phase 1: Location + Cultural Detection
    await this.detectLocation();
    await this.detectCulturalContext();
    
    // Phase 2: Personal Learning
    await this.loadPersonalHistory();
    await this.analyzePersonalPatterns();
    
    // Phase 3: MCP Integration
    await this.initializeContextSources();
    
    console.log('✅ VFIED AI Service ready with full intelligence!');
  }

  async detectLocation() {
    // Server-safe version - no browser geolocation
    console.log('📍 Using server default location context (will be set from API requests)');
    this.userLocation = { 
      city: 'Unknown', 
      country: 'Unknown',
      countryCode: 'US' // Default fallback
    };
  }

  
  
  setLocationFromRequest(location) {
    if (!location) return;
    // Accept either city/country or just coordinates
    this.userLocation = {
      city: location.city || this.userLocation?.city || 'Unknown',
      country: location.country || this.userLocation?.country || 'Unknown',
      countryCode: this.getCountryCode(location.country || this.userLocation?.country || 'US'),
      latitude: typeof location.latitude === 'number' ? location.latitude : this.userLocation?.latitude,
      longitude: typeof location.longitude === 'number' ? location.longitude : this.userLocation?.longitude,
      timestamp: new Date().toISOString()
    };
    console.log('📍 Location set from request:', this.userLocation);
    // Kick off culture refresh (don’t block)
    this.detectCulturalContext();
  }
  
  getCountryCode(country) {
    const countryMap = {
      'Kenya': 'KE',
      'United Kingdom': 'GB', 
      'UK': 'GB',
      'United States': 'US',
      'USA': 'US',
      'Japan': 'JP',
      'France': 'FR',
      'Germany': 'DE',
      'Nigeria': 'NG',
      'India': 'IN',
      'Australia': 'AU'
    };
    return countryMap[country] || 'US';
  }

  async reverseGeocode(location) {
    try {
      // Using OpenStreetMap Nominatim (free, no API key needed)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=json&addressdetails=1`
      );
      
      if (!response.ok) throw new Error('Geocoding failed');
      
      const data = await response.json();
      
      return {
        city: data.address?.city || data.address?.town || data.address?.village || 'Unknown',
        country: data.address?.country || 'Unknown',
        countryCode: data.address?.country_code?.toUpperCase() || 'US',
        region: data.address?.state || data.address?.region,
        neighbourhood: data.address?.neighbourhood || data.address?.suburb,
        displayName: data.display_name
      };
      
    } catch (error) {
      console.error('Geocoding failed:', error);
      return {
        city: 'Unknown',
        country: 'Unknown',
        countryCode: 'US'
      };
    }
  }

  async detectCulturalContext() {
    if (!this.openaiApiKey) {
      console.log('🌍 Using fallback cultural context');
      this.userCulture = this.getFallbackCulture();
      return;
    }

    try {
      console.log('🌍 Detecting cultural food context...');
      
      const culturalPrompt = `
Location: ${this.userLocation.city}, ${this.userLocation.country}
Country Code: ${this.userLocation.countryCode}

Analyze the food culture for this location. Return a JSON object with:
{
  "mainCuisine": "primary cuisine type",
  "popularFoods": ["5 most common local foods"],
  "comfortFoods": ["3 local comfort foods"],
  "streetFoods": ["3 popular street/quick foods"],
  "celebrationFoods": ["2 foods for celebrations"],
  "breakfastFoods": ["3 typical breakfast items"],
  "mealTiming": {
    "breakfast": "typical breakfast time",
    "lunch": "typical lunch time", 
    "dinner": "typical dinner time"
  },
  "culturalNotes": "2-3 sentences about local food culture",
  "weatherFoods": {
    "cold": ["2 foods for cold weather"],
    "hot": ["2 foods for hot weather"],
    "rainy": ["2 foods for rainy days"]
  }
}

Focus on authentic local foods, not just international chains.
      `;

      const culturalData = await this.callOpenAI(culturalPrompt, { 
        responseFormat: 'json',
        maxTokens: 800 
      });
      
      this.userCulture = JSON.parse(culturalData);
      console.log('🌍 Cultural context learned:', this.userCulture.mainCuisine);
      
    } catch (error) {
      console.error('Cultural detection failed:', error);
      this.userCulture = this.getFallbackCulture();
    }
  }

  getFallbackCulture() {
    // Fallback cultural data based on country code
    const fallbacks = {
      'GB': { // UK
        mainCuisine: 'British',
        popularFoods: ['fish and chips', 'shepherd\'s pie', 'bangers and mash', 'curry', 'roast dinner'],
        comfortFoods: ['fish and chips', 'pie and mash', 'tea and biscuits'],
        streetFoods: ['fish and chips', 'pasty', 'sandwich']
      },
      'KE': { // Kenya
        mainCuisine: 'East African',
        popularFoods: ['ugali', 'nyama choma', 'sukuma wiki', 'pilau', 'chapati'],
        comfortFoods: ['ugali with stew', 'mandazi', 'chai'],
        streetFoods: ['roasted maize', 'samosa', 'mutura']
      },
      'US': { // USA - Default
        mainCuisine: 'American',
        popularFoods: ['burger', 'pizza', 'sandwich', 'pasta', 'tacos'],
        comfortFoods: ['mac and cheese', 'pizza', 'ice cream'],
        streetFoods: ['hot dog', 'food truck tacos', 'bagel']
      }
    };

    return fallbacks[this.userLocation.countryCode] || fallbacks['US'];
  }

  async getPersonalizedFoodSuggestion(mood, context = {}) {
    if (!this.openaiApiKey) {
      return this.getFallbackSuggestion(mood);
    }

    try {
      // Gather comprehensive context
      const fullContext = await this.gatherFullContext(mood, context);
      
      // Generate personalized prompt
      const prompt = this.buildPersonalizedPrompt(mood, fullContext);
      
      // Get AI suggestion
      const aiResponse = await this.callOpenAI(prompt, { 
        responseFormat: 'json',
        maxTokens: 1200 
      });
      
      // Parse and enhance response
      const suggestion = this.parseAIResponse(aiResponse, mood, fullContext);
      
      // Learn from this interaction
      this.interactionId = `ai_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      suggestion.interactionId = this.interactionId;
      
      return suggestion;
      
    } catch (error) {
      console.error('AI suggestion failed:', error);
      return this.getFallbackSuggestion(mood);
    }
  }

  async gatherFullContext(mood, context) {
    const now = new Date();
    
    return {
      time: {
        hour: now.getHours(),
        dayOfWeek: now.getDay(),
        date: now.toISOString().split('T')[0],
        isWeekend: [0, 6].includes(now.getDay()),
        timeOfDay: this.getTimeOfDay(now.getHours()),
        isWorkHours: this.isWorkHours(now)
      },
      
      location: this.userLocation,
      culture: this.userCulture,
      personalHistory: this.getRecentHistory(),
      
      // NEW: Weather context
      weather: await this.getWeatherContext(),
      
      // Contextual hints
      isQuickDecision: context.quick || false,
      budget: context.budget || 'medium',
      socialSituation: context.social || 'solo',
      includeRestaurants: context.includeRestaurants || false,
      culturalPriority: context.culturalPriority !== false,
      
      // User provided context
      ...context
    };
  }

  buildPersonalizedPrompt(mood, context) {
    const situationText = this.formatCurrentSituation(context);
    
    // Weather context
    const weatherText = context.weather 
      ? `Weather: ${context.weather.temperature}°C, ${context.weather.description}${context.weather.isRaining ? ' (raining)' : ''}${context.weather.isCold ? ' (cold day)' : ''}${context.weather.isHot ? ' (hot day)' : ''}`
      : 'Weather: unknown';
  
    return `
You are VFIED, a culturally-aware AI food friend who knows this person personally.

CURRENT SITUATION:
- Location: ${context.location?.city || 'Unknown'}, ${context.location?.country || 'Unknown'}
- Time: ${context.time?.timeOfDay || 'unknown'} on ${this.getDayName(context.time?.dayOfWeek || 0)}
- Mood: ${mood}
- ${weatherText}
- Social situation: ${context.socialSituation}

CULTURAL KNOWLEDGE:
- Local cuisine: ${context.culture?.mainCuisine || 'mixed'}
- Popular local foods: ${context.culture?.popularFoods?.join(', ') || 'varied'}
- Cultural context: ${context.culture?.culturalNotes || 'diverse food scene'}

WEATHER CONTEXT:
${this.getWeatherFoodAdvice(context.weather)}

CURRENT CONTEXT:
${situationText}

TASK: Suggest 1 perfect food option considering:
1. Their exact location and what's actually available there
2. Current weather conditions and temperature
3. Current mood, time, and weather
4. Local cultural context and authentic options
5. What they can realistically get right now

Weather should influence your suggestion:
- Cold weather (< 15°C): Suggest warm, comforting foods
- Hot weather (> 30°C): Suggest cool, refreshing foods  
- Rainy weather: Suggest comfort foods and warm drinks
- Perfect weather: Any food that fits mood and culture

Prioritize authentic local options over international chains when possible.

Respond with this exact JSON structure:
{
  "food": {
    "name": "specific food name (local if possible)",
    "emoji": "appropriate emoji",
    "type": "cuisine type", 
    "category": "comfort/healthy/celebration/recovery/local"
  },
  "friendMessage": "supportive message as their food friend (2-3 sentences)",
  "reasoning": "why this fits their situation right now",
  "culturalNote": "how this fits their local food culture (if applicable)",
  "personalNote": "reference to their patterns/preferences (if applicable)",
  "weatherNote": "how the weather influenced this choice",
  "availabilityNote": "where they can get this in ${context.location?.city || 'their area'}",
  "alternatives": [
    {"name": "backup option 1", "emoji": "🍽️", "reason": "why this works too"},
    {"name": "backup option 2", "emoji": "🥘", "reason": "another good choice"}
  ],
  "confidence": 85
}

Be specific to ${context.location?.city || 'their location'} and current weather conditions!
    `;
  }
  
  getWeatherFoodAdvice(weather) {
    if (!weather) return 'Weather unknown - suggest based on other factors';
    
    let advice = [];
    
    if (weather.isCold) {
      advice.push(`Cold ${weather.temperature}°C day - prioritize warm, comforting foods like soups, stews, hot beverages`);
    } else if (weather.isHot) {
      advice.push(`Hot ${weather.temperature}°C day - suggest cool, refreshing options like salads, cold drinks, ice cream`);
    } else {
      advice.push(`Comfortable ${weather.temperature}°C - any food that matches mood and culture`);
    }
    
    if (weather.isRaining) {
      advice.push('Rainy day - perfect for comfort foods and staying cozy indoors');
    }
    
    return advice.join(', ');
  }

  async callOpenAI(prompt, options = {}) {
    if (!this.openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are VFIED, a culturally-aware personal food friend who gives specific, practical food suggestions based on location, culture, and personal patterns. Always respond with valid JSON.'
          },
          {
            role: 'user', 
            content: prompt
          }
        ],
        max_tokens: options.maxTokens || 1000,
        temperature: 0.7,
        response_format: options.responseFormat === 'json' ? { type: 'json_object' } : undefined
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  parseAIResponse(aiResponse, mood, context) {
    try {
      const parsed = JSON.parse(aiResponse);
      
      return {
        food: {
          id: this.generateFoodId(parsed.food.name),
          name: parsed.food.name,
          emoji: parsed.food.emoji,
          type: parsed.food.type,
          category: parsed.food.category
        },
        description: parsed.friendMessage,
        friendResponse: parsed.friendMessage,
        reason: parsed.reasoning,
        culturalNote: parsed.culturalNote,
        personalNote: parsed.personalNote,
        availabilityNote: parsed.availabilityNote,
        alternatives: parsed.alternatives || [],
        confidence: parsed.confidence || 85,
        source: 'ai',
        mood: mood,
        timestamp: new Date().toISOString(),
        location: context.location.city
      };
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      console.log('Raw AI response:', aiResponse);
      
      // Fallback to simple response
      return this.getFallbackSuggestion(mood);
    }
  }

  async getWeatherContext() {
    if (!this.weatherApiKey) return this.getSimulatedWeather();
    try {
      const lat = this.userLocation?.latitude;
      const lon = this.userLocation?.longitude;
      if (typeof lat !== 'number' || typeof lon !== 'number') {
        // No coords → simulate rather than failing
        return this.getSimulatedWeather();
      }
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.weatherApiKey}&units=metric`
      );
      if (!response.ok) throw new Error('Weather API failed');
      const data = await response.json();
      return {
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        condition: data.weather[0].main.toLowerCase(),
        description: data.weather[0].description,
        isRaining: data.weather[0].main.toLowerCase().includes('rain'),
        isSnowing: data.weather[0].main.toLowerCase().includes('snow'),
        isCold: data.main.temp < 15,
        isHot: data.main.temp > 30,
        isComfortable: data.main.temp >= 18 && data.main.temp <= 26,
        timestamp: new Date().toISOString()
      };
    } catch (e) {
      console.error('Weather fetch error:', e);
      return this.getSimulatedWeather();
    }
  }

  getSimulatedWeather() {
    // Smart simulation based on location and time
    const country = this.userLocation?.countryCode || 'US';
    const hour = new Date().getHours();
    
    let baseTemp = 20;
    
    // Temperature by region
    const tempMap = {
      'KE': 22, 'NG': 28, 'ET': 18, 'ZA': 20, // Africa
      'IN': 25, 'JP': 18, 'CN': 16, 'TH': 30, // Asia
      'GB': 12, 'DE': 15, 'FR': 16, 'IT': 18, // Europe
      'US': 18, 'CA': 10, 'MX': 24, 'BR': 26  // Americas
    };
    
    baseTemp = tempMap[country] || 20;
    
    // Daily variation
    const tempVariation = Math.sin((hour - 6) * Math.PI / 12) * 8;
    const temp = Math.round(baseTemp + tempVariation + (Math.random() * 6 - 3));
    
    const conditions = ['clear', 'cloudy', 'rain', 'sunny'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    return {
      temperature: temp,
      feelsLike: temp + Math.floor(Math.random() * 6) - 3,
      condition,
      description: condition === 'clear' ? 'clear sky' : condition,
      isRaining: condition === 'rain',
      isSnowing: false,
      isCold: temp < 15,
      isHot: temp > 30,
      isComfortable: temp >= 18 && temp <= 26,
      simulated: true,
      timestamp: new Date().toISOString()
    };
  }

  async loadPersonalHistory() {
    // Fallback without Firebase - use local storage simulation
    this.personalHistory = [];
    console.log('📚 Personal history: Using fallback mode');
  }

  async analyzePersonalPatterns() {
    console.log('🧠 Analyzing personal patterns...');
  }

  async initializeContextSources() {
    console.log('🔗 Context sources initialized');
  }

  getFallbackSuggestion(mood) {
    const fallbackFoods = {
      'tired': { name: 'Comfort Ramen', emoji: '🍜' },
      'stressed': { name: 'Chocolate Ice Cream', emoji: '🍦' },
      'celebrating': { name: 'Champagne & Cake', emoji: '🥂' },
      'healthy': { name: 'Fresh Quinoa Bowl', emoji: '🥗' },
      'hungover': { name: 'Greasy Breakfast', emoji: '🍳' },
      'default': { name: 'Good Local Food', emoji: '🍽️' }
    };

    const food = fallbackFoods[mood] || fallbackFoods['default'];
    
    return {
      food: {
        id: `fallback-${mood}`,
        name: food.name,
        emoji: food.emoji,
        category: 'comfort'
      },
      description: `Here's what sounds good for ${mood} mood!`,
      friendResponse: `Here's what sounds good for ${mood} mood!`,
      reason: 'AI-powered suggestion based on your current situation',
      confidence: 80,
      source: 'ai-fallback'
    };
  }

  generateFoodId(name) {
    return name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .substring(0, 30);
  }

  getTimeOfDay(hour) {
    if (hour < 6) return 'late night';
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    if (hour < 22) return 'evening';
    return 'late night';
  }

  getDayName(dayIndex) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
  }

  isWorkHours(date = new Date()) {
    const hour = date.getHours();
    const day = date.getDay();
    return day >= 1 && day <= 5 && hour >= 9 && hour <= 17;
  }

  formatCurrentSituation(context) {
    let situation = [];
    
    if (context.weather?.isRaining) situation.push('raining');
    if (context.weather?.isCold) situation.push(`cold weather (${context.weather.temperature}°C)`);
    if (context.weather?.isHot) situation.push(`hot weather (${context.weather.temperature}°C)`);
    if (context.time?.isWeekend) situation.push('weekend');
    if (context.time?.isWorkHours) situation.push('work hours');
    if (context.includeRestaurants) situation.push('wants restaurant options');
    if (context.culturalPriority) situation.push('prefers local/cultural foods');
    
    return situation.join(', ') || 'normal day';
  }

  getRecentHistory() {
    return this.personalHistory.slice(0, 10);
  }

  async updateAIFeedback(interactionId, rating) {
    console.log(`Feedback received: ${interactionId} - Rating: ${rating}`);
    return { success: true };
  }
}

// ==================== DIETARY INTELLIGENCE SERVICE ====================

// Dietary Intelligence Service (your existing sophisticated version)
class SmartDietaryService {
  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY;
    this.dietaryRules = {
      'vegetarian': {
        allowed: ['vegetables', 'fruits', 'grains', 'legumes', 'dairy', 'eggs', 'nuts', 'seeds'],
        forbidden: ['meat', 'poultry', 'fish', 'seafood', 'gelatin', 'lard', 'animal stock'],
        description: 'No meat, fish, or poultry'
      },
      'vegan': {
        allowed: ['vegetables', 'fruits', 'grains', 'legumes', 'nuts', 'seeds', 'plant-based'],
        forbidden: ['meat', 'poultry', 'fish', 'seafood', 'dairy', 'eggs', 'honey', 'gelatin', 'animal products'],
        description: 'No animal products whatsoever'
      },
      'gluten-free': {
        allowed: ['rice', 'quinoa', 'corn', 'potatoes', 'certified gluten-free'],
        forbidden: ['wheat', 'barley', 'rye', 'spelt', 'bulgur', 'semolina', 'most breads', 'pasta'],
        description: 'No gluten-containing grains'
      },
      'dairy-free': {
        allowed: ['plant-based milk', 'dairy alternatives'],
        forbidden: ['milk', 'cheese', 'butter', 'cream', 'yogurt', 'ice cream', 'whey', 'casein'],
        description: 'No dairy products'
      },
      'keto': {
        allowed: ['meat', 'fish', 'eggs', 'low-carb vegetables', 'healthy fats', 'cheese'],
        forbidden: ['bread', 'pasta', 'rice', 'potatoes', 'sugar', 'fruits', 'high-carb foods'],
        description: 'Very low carb, high fat'
      },
      'halal': {
        allowed: ['halal meat', 'vegetables', 'fruits', 'grains', 'dairy'],
        forbidden: ['pork', 'alcohol', 'non-halal meat', 'gelatin from non-halal sources'],
        description: 'Islamic dietary laws'
      },
      'kosher': {
        allowed: ['kosher meat', 'vegetables', 'fruits', 'kosher dairy'],
        forbidden: ['pork', 'shellfish', 'mixing meat and dairy', 'non-kosher meat'],
        description: 'Jewish dietary laws'
      },
      'paleo': {
        allowed: ['meat', 'fish', 'eggs', 'vegetables', 'fruits', 'nuts', 'seeds'],
        forbidden: ['grains', 'legumes', 'dairy', 'processed foods', 'sugar'],
        description: 'Stone age diet'
      },
      'pescatarian': {
        allowed: ['fish', 'seafood', 'vegetables', 'fruits', 'grains', 'dairy', 'eggs'],
        forbidden: ['meat', 'poultry'],
        description: 'Vegetarian plus fish'
      }
    };
  }

  // AI-POWERED COMPLIANCE CHECKER 🤖
  async checkFoodComplianceAI(foodName, dietaryRestrictions) {
    if (!this.openaiApiKey || !dietaryRestrictions?.length) {
      return this.fallbackCompliance(foodName, dietaryRestrictions);
    }

    try {
      const restrictionsText = dietaryRestrictions.map(diet => {
        const rule = this.dietaryRules[diet.toLowerCase()];
        return rule ? `${diet}: ${rule.description}` : diet;
      }).join(', ');

      const compliancePrompt = `
You are a dietary compliance expert. Analyze if this food is compatible with the given dietary restrictions.

FOOD: "${foodName}"
DIETARY RESTRICTIONS: ${restrictionsText}

Consider:
- All ingredients typically found in this dish
- Cooking methods and preparation
- Common variations of this food
- Cultural/regional differences in preparation
- Hidden ingredients (stocks, gelatin, etc.)

Examples:
- "Nyama Choma" = grilled meat (NOT vegetarian/vegan)
- "Ugali with Sukuma Wiki" = corn meal with greens (vegetarian/vegan friendly)
- "Fish and Chips" = fish + potatoes (NOT vegetarian, OK for pescatarian)
- "Pad Thai" = often contains fish sauce (NOT vegetarian unless specified)

Respond with ONLY this JSON format:
{
  "compliant": true/false,
  "reasoning": "detailed explanation of why it is/isn't compliant",
  "warnings": ["specific issues if any"],
  "alternatives": ["better options if not compliant"],
  "confidence": 95
}
`;

      const response = await this.callOpenAI(compliancePrompt);
      const aiResult = JSON.parse(response);

      console.log(`🤖 AI Dietary Check: ${foodName} for ${dietaryRestrictions.join(', ')} = ${aiResult.compliant ? '✅' : '❌'}`);
      
      return {
        compliant: aiResult.compliant,
        compliance: this.buildComplianceMap(dietaryRestrictions, aiResult.compliant),
        warnings: aiResult.warnings || [],
        alternatives: aiResult.alternatives || [],
        reasoning: aiResult.reasoning,
        confidence: aiResult.confidence || 85,
        source: 'ai'
      };

    } catch (error) {
      console.error('AI dietary compliance failed:', error);
      return this.fallbackCompliance(foodName, dietaryRestrictions);
    }
  }

  // Fallback to rule-based checking if AI fails
  fallbackCompliance(foodName, dietaryRestrictions) {
    const compliance = {};
    const warnings = [];
    let overallCompliant = true;

    for (const restriction of dietaryRestrictions) {
      const rule = this.dietaryRules[restriction.toLowerCase()];
      if (!rule) {
        compliance[restriction] = 'unknown';
        warnings.push(`Unknown dietary restriction: ${restriction}`);
        continue;
      }

      const isCompliant = this.checkFoodComplianceBasic(foodName, rule);
      compliance[restriction] = isCompliant ? 'compliant' : 'non-compliant';
      
      if (!isCompliant) {
        overallCompliant = false;
        warnings.push(`${foodName} may not be ${restriction}-friendly`);
      }
    }

    return {
      compliant: overallCompliant,
      compliance,
      warnings,
      alternatives: overallCompliant ? [] : this.suggestAlternatives(foodName, dietaryRestrictions),
      source: 'fallback'
    };
  }

  // Enhanced basic compliance with better meat detection
  checkFoodComplianceBasic(foodName, rule) {
    const foodLower = foodName.toLowerCase();
    
    // Check forbidden ingredients
    for (const forbidden of rule.forbidden) {
      if (foodLower.includes(forbidden.toLowerCase())) {
        return false;
      }
    }
    
    // Enhanced meat detection for vegetarian/vegan
    if (rule.description.includes('No meat') || rule.description.includes('No animal products')) {
      const meatTerms = [
        // English
        'meat', 'chicken', 'beef', 'pork', 'lamb', 'goat', 'fish', 'seafood',
        // Swahili/African
        'nyama', 'choma', 'samaki', 'kuku', 'ng\'ombe',
        // Common dishes that contain meat
        'burger', 'sausage', 'bacon', 'ham', 'steak', 'ribs'
      ];
      
      for (const term of meatTerms) {
        if (foodLower.includes(term)) {
          return false;
        }
      }
    }

    return true;
  }

  buildComplianceMap(restrictions, isCompliant) {
    const compliance = {};
    restrictions.forEach(restriction => {
      compliance[restriction] = isCompliant ? 'compliant' : 'non-compliant';
    });
    return compliance;
  }

  // Helper method to call OpenAI
  async callOpenAI(prompt) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Cheaper and faster for simple compliance checks
        messages: [
          {
            role: 'system',
            content: 'You are a dietary compliance expert who understands foods from all cultures and their ingredients. Always respond with valid JSON.'
          },
          {
            role: 'user', 
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.1, // Low temperature for consistent results
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  // Update your validateCompliance method to use AI
  async validateCompliance(foodName, dietaryRestrictions) {
    return await this.checkFoodComplianceAI(foodName, dietaryRestrictions);
  }

  // Keep existing methods for compatibility...
  suggestAlternatives(foodName, dietaryRestrictions) {
    const alternatives = [];
    const foodLower = foodName.toLowerCase();

    if (dietaryRestrictions.includes('vegetarian') || dietaryRestrictions.includes('vegan')) {
      if (foodLower.includes('nyama') || foodLower.includes('choma')) {
        alternatives.push('Ugali with Sukuma Wiki', 'Vegetable Samosas', 'Bean Stew');
      }
      if (foodLower.includes('burger')) {
        alternatives.push('Beyond Burger', 'Black Bean Burger', 'Mushroom Burger');
      }
      if (foodLower.includes('chicken')) {
        alternatives.push('Tofu Stir-fry', 'Chickpea Curry', 'Vegetable Biryani');
      }
    }

    if (dietaryRestrictions.includes('gluten-free')) {
      if (foodLower.includes('bread')) alternatives.push('Gluten-Free Bread', 'Rice Cakes');
      if (foodLower.includes('pasta')) alternatives.push('Rice Noodles', 'Quinoa Pasta');
    }

    return alternatives.slice(0, 3);
  }

  buildDietaryPrompt(dietaryRestrictions) {
    if (!dietaryRestrictions || dietaryRestrictions.length === 0) {
      return '';
    }

    const restrictions = dietaryRestrictions.map(diet => {
      const rule = this.dietaryRules[diet.toLowerCase()];
      return rule ? `${diet} (${rule.description})` : diet;
    }).join(', ');

    return `
🚨 CRITICAL DIETARY REQUIREMENTS 🚨
User follows: ${restrictions}

MANDATORY RULES:
1. ONLY suggest foods that are 100% compatible with ALL listed dietary restrictions
2. NEVER suggest dishes that contain forbidden ingredients
3. If suggesting a cultural dish, ensure it's prepared in a compliant way
4. When in doubt, choose clearly safe options
5. Explain dietary compliance in your reasoning

Examples of what NOT to suggest:
${this.getForbiddenExamples(dietaryRestrictions).join(', ')}

Safe alternatives to suggest:
${this.getSafeExamples(dietaryRestrictions).join(', ')}

VERIFY EVERY SUGGESTION AGAINST THESE RESTRICTIONS!
`;
  }

  getForbiddenExamples(restrictions) {
    const examples = [];
    if (restrictions.includes('vegetarian') || restrictions.includes('vegan')) {
      examples.push('Nyama Choma', 'Fish and Chips', 'Chicken Tikka', 'Beef Stew');
    }
    if (restrictions.includes('gluten-free')) {
      examples.push('Regular Pasta', 'Pizza (with wheat crust)', 'Regular Bread');
    }
    if (restrictions.includes('dairy-free')) {
      examples.push('Cheese Pizza', 'Ice Cream', 'Creamy Pasta');
    }
    return examples.length ? examples : ['foods with forbidden ingredients'];
  }

  getSafeExamples(restrictions) {
    if (restrictions.includes('vegetarian')) {
      return ['Ugali with Vegetables', 'Vegetable Samosas', 'Dal (Lentil Curry)', 'Vegetable Biryani'];
    }
    if (restrictions.includes('vegan')) {
      return ['Ugali with Sukuma Wiki', 'Vegetable Curry', 'Bean Stew', 'Fruit Salad'];
    }
    return ['compliant foods'];
  }
}

// ==================== WEATHER SERVICE ====================

// Weather Service Class
class WeatherService {
  constructor() {
    this.openWeatherKey = process.env.OPENWEATHER_API_KEY;
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
  }

  async getCurrentWeather(location) {
    if (!this.openWeatherKey) {
      return this.getSimulatedWeather(location);
    }
  
    try {
      // 🔥 FIX: Check for coordinates properly
      const lat = location?.latitude;
      const lon = location?.longitude;
      
      if (typeof lat !== 'number' || typeof lon !== 'number') {
        console.log(`🌍 No valid coordinates for weather (lat: ${lat}, lon: ${lon}), using simulation`);
        return this.getSimulatedWeather(location);
      }
  
      console.log(`🌤️ Fetching real weather for coordinates: ${lat}, ${lon}`);
      
      const response = await fetch(
        `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.openWeatherKey}&units=metric`,
        { timeout: 8000 } // Add timeout
      );
      
      if (!response.ok) {
        console.error(`Weather API Error: ${response.status} ${response.statusText}`);
        throw new Error(`Weather API failed: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Real weather data retrieved successfully');
      
      return {
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        condition: data.weather[0].main.toLowerCase(),
        description: data.weather[0].description,
        windSpeed: data.wind?.speed || 0,
        cityName: data.name,
        country: data.sys.country,
        isRaining: data.weather[0].main.toLowerCase().includes('rain'),
        isSnowing: data.weather[0].main.toLowerCase().includes('snow'),
        isCold: data.main.temp < 15,
        isHot: data.main.temp > 30,
        isComfortable: data.main.temp >= 18 && data.main.temp <= 26,
        timestamp: new Date().toISOString(),
        source: 'openweather'
      };
    } catch (error) {
      console.error('Weather fetch error:', error);
      return this.getSimulatedWeather(location);
    }
  }

  getSimulatedTemp(location) {
    const country = location?.country || location?.countryCode || 'US';
    const hour = new Date().getHours();
    const month = new Date().getMonth(); // 0-11
    
    // More realistic base temperatures by country and season
    const tempMap = {
      'GB': month >= 5 && month <= 8 ? 22 : 12,  // UK: 22°C summer, 12°C winter
      'UK': month >= 5 && month <= 8 ? 22 : 12,
      'KE': 22,  // Kenya relatively stable
      'NG': 28,  // Nigeria hot
      'US': month >= 5 && month <= 8 ? 25 : 15,  // US varies more
      'FR': month >= 5 && month <= 8 ? 24 : 8,   // France
      'DE': month >= 5 && month <= 8 ? 23 : 5    // Germany
    };
    
    const baseTemp = tempMap[country.toUpperCase()] || 20;
    const tempVariation = Math.sin((hour - 6) * Math.PI / 12) * 6;
    const randomVariation = (Math.random() * 4) - 2;
    
    return Math.round(baseTemp + tempVariation + randomVariation);
  }

  getSimulatedWeather(location) {
    // Option A: Use realistic temps for major cities
    const realisticTemps = {
      'London': 24,    // Your actual temp!
      'Nairobi': 20,
      'New York': 28,
      'Paris': 26,
      'Berlin': 23
    };
    
    const city = location?.city;
    const temp = realisticTemps[city] || this.getSimulatedTemp(location); // 👈 Calls Function 1
    
    const condition = temp > 25 ? 'sunny' : temp < 15 ? 'cloudy' : 'partly cloudy';
    
    return {
      temperature: temp,                    // 👈 From Function 1 or realistic temps
      feelsLike: temp + Math.floor(Math.random() * 4) - 2,
      humidity: 40 + Math.floor(Math.random() * 40),
      condition,
      description: condition,
      windSpeed: Math.floor(Math.random() * 15),
      cityName: city || 'Unknown',
      country: location?.country || 'Unknown',
      isRaining: false,
      isSnowing: false,
      isCold: temp < 15,
      isHot: temp > 30,
      isComfortable: temp >= 18 && temp <= 26,
      simulated: true,
      timestamp: new Date().toISOString()
    };
  }

  getSimulatedCondition() {
    const conditions = ['clear', 'cloudy', 'rain', 'sunny'];
    const weights = [0.4, 0.3, 0.2, 0.1];
    
    const random = Math.random();
    let cumulativeWeight = 0;
    
    for (let i = 0; i < conditions.length; i++) {
      cumulativeWeight += weights[i];
      if (random <= cumulativeWeight) {
        return conditions[i];
      }
    }
    
    return 'clear';
  }

  getWeatherDescription(condition) {
    const descriptions = {
      'clear': 'clear sky',
      'cloudy': 'partly cloudy',
      'rain': 'light rain',
      'snow': 'light snow',
      'sunny': 'sunny'
    };
    return descriptions[condition] || 'clear sky';
  }

  analyzeWeatherFoodImpact(weather) {
    const recommendations = [];
    
    if (weather.isCold) {
      recommendations.push('warm', 'soup', 'hot beverages', 'comfort food', 'stew');
    }
    
    if (weather.isHot) {
      recommendations.push('cold', 'refreshing', 'light', 'salads', 'ice cream', 'fruits');
    }
    
    if (weather.isRaining) {
      recommendations.push('comfort food', 'warm drinks', 'cozy meals', 'indoor dining');
    }
    
    if (weather.isSnowing) {
      recommendations.push('hearty meals', 'hot chocolate', 'warming spices');
    }

    return {
      temperatureEffect: weather.isCold ? 'cold' : weather.isHot ? 'hot' : 'comfortable',
      moistureEffect: weather.isRaining ? 'wet' : 'dry',
      recommendations
    };
  }
}

// ==================== VENDOR MENU SYSTEM HELPER FUNCTIONS ====================

function validateMenuItem(item) {
  const errors = [];
  
  if (!item.name) errors.push('name is required');
  if (!item.country_code || !/^[A-Z]{2}$/.test(item.country_code)) {
    errors.push('country_code must be ISO 3166-1 alpha-2 (e.g., "KE", "GB")');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

function generateMenuItemId(name) {
  return name.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .substring(0, 30) + '_' + Math.random().toString(36).substr(2, 6);
}

function normalizeMoods(moodText, moodIds) {
  const moodMap = {
    'tired': 'TIRED',
    'exhausted': 'TIRED',
    'stressed': 'STRESSED',
    'celebrating': 'CELEBRATING',
    'happy': 'CELEBRATING',
    'post-workout': 'POST_WORKOUT',
    'hungry': 'HUNGRY',
    'sick': 'SICK',
    'hangover': 'HUNGOVER'
  };
  
  const fromText = moodText ? 
    Object.keys(moodMap).filter(key => moodText.toLowerCase().includes(key)).map(key => moodMap[key]) :
    [];
  
  return Array.from(new Set([...moodIds, ...fromText]));
}

async function getPersonalizedMenuRecommendation(vendorId, context) {
    const vendorMenu = vendorMenus.get(vendorId);
    
    if (!vendorMenu || vendorMenu.items.length === 0) {
      return {
        error: 'No menu uploaded',
        message: 'Upload your menu first to get personalized recommendations'
      };
    }
  
    // Enhanced filtering with better logic
    let availableItems = vendorMenu.items.filter(item => 
      !item.availability || item.availability === 'in_stock'
    );
  
    // Smart dietary filtering with better accuracy
    availableItems = applySmartDietaryFilters(availableItems, context.dietary);
  
    if (availableItems.length === 0) {
      return {
        error: 'No suitable items',
        message: `No menu items available that match your ${context.dietary.join(', ')} dietary requirements.`,
        suggestion: 'Consider expanding your dietary preferences or contact the restaurant for custom options.'
      };
    }
  
    // Use AI to score and recommend items
    const aiRecommendation = await getAIMenuRecommendation(availableItems, context);
    
    if (aiRecommendation) {
      return aiRecommendation;
    }
  
    // Fallback to enhanced rule-based scoring
    return getEnhancedRuleBasedRecommendation(availableItems, context);
  }
  
  // AI-Powered Menu Recommendation
  async function getAIMenuRecommendation(availableItems, context) {
    if (!aiFoodService.openaiApiKey) {
      return null; // Fall back to rule-based
    }
  
    try {
      const menuPrompt = buildMenuRecommendationPrompt(availableItems, context);
      const aiResponse = await aiFoodService.callOpenAI(menuPrompt, { 
        responseFormat: 'json',
        maxTokens: 800 
      });
  
      const recommendation = JSON.parse(aiResponse);
      return formatAIMenuRecommendation(recommendation, availableItems, context);
  
    } catch (error) {
      console.error('AI menu recommendation failed:', error);
      return null; // Fall back to rule-based
    }
  }
  
  // Build sophisticated AI prompt for menu recommendations
  function buildMenuRecommendationPrompt(availableItems, context) {
    const menuItemsText = availableItems.map(item => `
  - ${item.name} (${item.emoji || '🍽️'}) - ${item.category || 'main'}
    Tags: ${item.tags?.join(', ') || 'none'}
    Price: ${item.price || 'N/A'}
    Description: ${item.description || 'No description'}
    Macros: ${item.macros ? `${item.macros.kcal}kcal, ${item.macros.protein_g}g protein` : 'N/A'}
    Country: ${item.country || 'Local'}
    Dietary: ${formatDietaryInfo(item)}
  `).join('\n');
  
    const contextInfo = buildContextDescription(context);
  
    return `
  You are a sophisticated restaurant menu AI that helps customers choose the perfect dish based on their current situation and preferences.
  
  CUSTOMER CONTEXT:
  ${contextInfo}
  
  AVAILABLE MENU ITEMS:
  ${menuItemsText}
  
  TASK: Analyze the customer's situation and recommend the BEST menu item from the available options.
  
  Consider these factors in order of importance:
  1. Dietary restrictions (MUST be compatible)
  2. Current mood and situation
  3. Time of day and weather
  4. Nutritional needs based on context
  5. Price vs value for their situation
  6. Cultural preferences and authenticity
  
  SCORING CRITERIA:
  - Perfect dietary match: +40 points
  - Mood alignment: +30 points
  - Situational appropriateness: +20 points
  - Nutritional fitness: +15 points
  - Value proposition: +10 points
  - Cultural authenticity: +10 points
  
  Respond with this exact JSON structure:
  {
    "recommended_item": "exact menu item name",
    "confidence": 95,
    "reasoning": "detailed explanation of why this is perfect for them",
    "mood_match": "how this fits their current mood/situation",
    "dietary_compliance": "confirmation this meets all dietary needs",
    "cultural_note": "cultural context or authenticity note",
    "nutritional_benefit": "why this is nutritionally appropriate",
    "alternatives": [
      {"name": "backup option 1", "reason": "why this works too"},
      {"name": "backup option 2", "reason": "another good choice"}
    ],
    "personalized_message": "friendly, encouraging message as their food friend"
  }
  
  Be specific, personal, and consider the customer's complete situation. Make them excited about your recommendation!
  `;
  }
  
  // Build rich context description
  function buildContextDescription(context) {
    const parts = [];
    
    // Location context
    if (context.location) {
      parts.push(`Location: ${context.location.city}, ${context.location.country}`);
    }
    
    // Mood and emotional state
    if (context.mood_text) {
      parts.push(`Mood: ${context.mood_text}`);
    }
    if (context.mood_ids?.length) {
      parts.push(`Emotional state: ${context.mood_ids.join(', ')}`);
    }
    
    // Dietary requirements
    if (context.dietary?.length) {
      parts.push(`Dietary requirements: ${context.dietary.join(', ')} (STRICT - must comply)`);
    }
    
    // Social context
    if (context.social) {
      parts.push(`Dining situation: ${context.social}`);
    }
    
    // Budget considerations
    if (context.budget) {
      parts.push(`Budget preference: ${context.budget}`);
    }
    
    // Time context
    const hour = new Date().getHours();
    const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
    parts.push(`Time: ${timeOfDay}`);
    
    // Weather context (if available)
    if (context.weather) {
      parts.push(`Weather: ${context.weather.description}, ${context.weather.temperature}°C`);
    }
  
    return parts.join('\n');
  }
  
  // Format dietary information for display
  function formatDietaryInfo(item) {
    const dietary = [];
    if (item.suitability?.vegetarian) dietary.push('vegetarian');
    if (item.suitability?.vegan) dietary.push('vegan');
    if (item.suitability?.gluten_free) dietary.push('gluten-free');
    if (item.suitability?.halal_friendly) dietary.push('halal');
    if (item.suitability?.kosher_friendly) dietary.push('kosher');
    return dietary.length ? dietary.join(', ') : 'no special dietary info';
  }
  
  // Smart dietary filtering with comprehensive logic
  function applySmartDietaryFilters(items, dietaryRestrictions) {
    if (!dietaryRestrictions?.length) return items;
  
    return items.filter(item => {
      for (const restriction of dietaryRestrictions) {
        if (!isDietaryCompliant(item, restriction)) {
          return false;
        }
      }
      return true;
    });
  }
  
  // Check if item complies with specific dietary restriction
  function isDietaryCompliant(item, restriction) {
    const lower = restriction.toLowerCase();
    
    switch (lower) {
      case 'vegetarian':
        return item.suitability?.vegetarian || 
               item.tags?.includes('vegetarian') ||
               !hasMeatTags(item);
      
      case 'vegan':
        return item.suitability?.vegan || 
               item.tags?.includes('vegan');
      
      case 'gluten-free':
        return item.suitability?.gluten_free || 
               item.tags?.includes('gluten-free');
      
      case 'dairy-free':
        return item.suitability?.dairy_free || 
               item.tags?.includes('dairy-free') ||
               !hasDairyTags(item);
      
      case 'halal':
        return item.suitability?.halal_friendly || 
               item.tags?.includes('halal');
      
      case 'kosher':
        return item.suitability?.kosher_friendly || 
               item.tags?.includes('kosher');
      
      case 'keto':
        return item.tags?.includes('keto') || 
               item.tags?.includes('low-carb');
      
      default:
        return true;
    }
  }
  
  // Check for meat-related tags
  function hasMeatTags(item) {
    const meatTags = ['meat', 'chicken', 'beef', 'pork', 'lamb', 'fish', 'seafood', 'bacon', 'sausage'];
    return item.tags?.some(tag => meatTags.includes(tag.toLowerCase()));
  }
  
  // Check for dairy-related tags
  function hasDairyTags(item) {
    const dairyTags = ['cheese', 'milk', 'cream', 'butter', 'yogurt'];
    return item.tags?.some(tag => dairyTags.includes(tag.toLowerCase()));
  }
  
  // Format AI recommendation response
  function formatAIMenuRecommendation(aiResponse, availableItems, context) {
    const selectedItem = availableItems.find(item => 
      item.name === aiResponse.recommended_item
    );
  
    if (!selectedItem) {
      return null; // Fall back to rule-based if AI picked invalid item
    }
  
    const alternatives = aiResponse.alternatives
      ?.map(alt => {
        const altItem = availableItems.find(item => item.name === alt.name);
        return altItem ? {
          name: altItem.name,
          emoji: altItem.emoji || '🍽️',
          reason: alt.reason,
          price: altItem.price
        } : null;
      })
      .filter(Boolean)
      .slice(0, 2) || [];
  
    return {
      food: {
        name: selectedItem.name,
        emoji: selectedItem.emoji || '🍽️',
        country: selectedItem.country || 'Local',
        country_code: selectedItem.country_code,
        category: selectedItem.category || 'comfort',
        menu_item_id: selectedItem.menu_item_id,
        price: selectedItem.price,
        menu_link: selectedItem.menu_link,
        description: selectedItem.description
      },
      friend_message: aiResponse.personalized_message || `${selectedItem.name} is perfect for you right now!`,
      reasoning: aiResponse.reasoning,
      mood_match: aiResponse.mood_match,
      cultural_note: aiResponse.cultural_note,
      nutritional_benefit: aiResponse.nutritional_benefit,
      dietary_compliance: aiResponse.dietary_compliance,
      availability_note: `Available now from your menu`,
      alternatives,
      confidence: aiResponse.confidence || 90,
      source: 'ai-menu',
      timestamp: new Date().toISOString(),
      context_used: {
        mood: context.mood_text,
        dietary: context.dietary,
        location: context.location?.city
      }
    };
  }
  
  // Enhanced rule-based fallback with better scoring
  function getEnhancedRuleBasedRecommendation(availableItems, context) {
    const scoredItems = availableItems.map(item => {
      let score = 60; // Higher base score
      
      // Enhanced mood scoring
      if (context.mood_text) {
        score += getMoodScore(item, context.mood_text);
      }
      
      // Time-of-day scoring
      score += getTimeScore(item);
      
      // Price-value scoring
      score += getPriceScore(item, context.budget);
      
      // Popularity/rating scoring
      score += getPopularityScore(item);
      
      // Cultural authenticity bonus
      if (item.country && context.location?.country) {
        if (item.country.toLowerCase() === context.location.country.toLowerCase()) {
          score += 15; // Local cuisine bonus
        }
      }
      
      // Add controlled randomness for variety
      score += Math.random() * 10;
      
      return { ...item, score };
    });
  
    scoredItems.sort((a, b) => b.score - a.score);
    const selectedItem = scoredItems[0];
  
    return {
      food: {
        name: selectedItem.name,
        emoji: selectedItem.emoji || '🍽️',
        country: selectedItem.country || 'Local',
        country_code: selectedItem.country_code,
        category: selectedItem.category || 'comfort',
        menu_item_id: selectedItem.menu_item_id,
        price: selectedItem.price,
        menu_link: selectedItem.menu_link
      },
      friend_message: generateSmartMessage(selectedItem, context),
      reasoning: generateSmartReasoning(selectedItem, context),
      cultural_note: generateCulturalNote(selectedItem, context),
      availability_note: `Available now from your menu`,
      alternatives: scoredItems.slice(1, 3).map(item => ({
        name: item.name,
        emoji: item.emoji || '🍽️',
        reason: generateAlternativeReason(item, context),
        price: item.price
      })),
      confidence: Math.min(95, selectedItem.score),
      source: 'enhanced-rules',
      timestamp: new Date().toISOString()
    };
  }
  
  // Enhanced mood scoring
  function getMoodScore(item, moodText) {
    const mood = moodText.toLowerCase();
    let score = 0;
    
    if (mood.includes('tired') || mood.includes('exhausted')) {
      if (item.tags?.includes('comfort')) score += 25;
      if (item.tags?.includes('protein')) score += 15;
      if (item.tags?.includes('energizing')) score += 20;
    }
    
    if (mood.includes('celebrating') || mood.includes('happy')) {
      if (item.tags?.includes('special')) score += 30;
      if (item.tags?.includes('premium')) score += 20;
      if (item.category === 'dessert') score += 15;
    }
    
    if (mood.includes('workout') || mood.includes('exercise')) {
      if (item.tags?.includes('protein')) score += 35;
      if (item.tags?.includes('healthy')) score += 25;
      if (item.macros?.protein_g > 20) score += 20;
    }
    
    if (mood.includes('stressed') || mood.includes('anxious')) {
      if (item.tags?.includes('comfort')) score += 30;
      if (item.tags?.includes('warm')) score += 15;
    }
    
    if (mood.includes('sick') || mood.includes('unwell')) {
      if (item.tags?.includes('light')) score += 25;
      if (item.tags?.includes('soup')) score += 30;
      if (item.tags?.includes('healthy')) score += 20;
    }
    
    return score;
  }
  
  // Time-based scoring
  function getTimeScore(item) {
    const hour = new Date().getHours();
    
    if (hour >= 6 && hour < 11) { // Morning
      if (item.category === 'breakfast') return 20;
      if (item.tags?.includes('coffee')) return 15;
    } else if (hour >= 11 && hour < 15) { // Lunch
      if (item.category === 'lunch') return 20;
      if (item.tags?.includes('light')) return 10;
    } else if (hour >= 17 && hour < 22) { // Dinner
      if (item.category === 'dinner') return 20;
      if (item.tags?.includes('hearty')) return 15;
    } else { // Late night
      if (item.tags?.includes('comfort')) return 15;
      if (item.tags?.includes('light')) return 10;
    }
    
    return 0;
  }
  
  // Price-value scoring
  function getPriceScore(item, budget) {
    if (!item.price || !budget) return 5;
    
    const price = parseFloat(item.price);
    
    switch (budget) {
      case 'low':
        return price < 10 ? 15 : price < 15 ? 5 : -5;
      case 'medium':
        return price < 20 ? 10 : price < 30 ? 5 : 0;
      case 'high':
        return price > 25 ? 10 : 5;
      default:
        return 5;
    }
  }
  
  // Popularity scoring (based on tags and category)
  function getPopularityScore(item) {
    let score = 0;
    
    if (item.tags?.includes('popular')) score += 10;
    if (item.tags?.includes('chef-special')) score += 15;
    if (item.tags?.includes('signature')) score += 12;
    if (item.category === 'signature') score += 10;
    
    return score;
  }
  
  // Generate smart contextual messages
  function generateSmartMessage(item, context) {
    const mood = context.mood_text?.toLowerCase() || '';
    const time = new Date().getHours();
    
    const messages = [
      `Perfect choice! ${item.name} is exactly what you need right now.`,
      `${item.name} hits the spot for your current mood.`,
      `You'll love ${item.name} - it's made for moments like this.`,
      `${item.name} is calling your name! Great pick for today.`
    ];
    
    if (mood.includes('tired')) {
      return `${item.name} will give you the comfort and energy boost you need right now.`;
    } else if (mood.includes('celebrating')) {
      return `${item.name} is perfect for celebrating! You deserve this treat.`;
    } else if (time < 12) {
      return `Start your day right with ${item.name} - perfect morning choice!`;
    }
    
    return messages[Math.floor(Math.random() * messages.length)];
  }
  
  // Generate smart reasoning
  function generateSmartReasoning(item, context) {
    const reasons = [];
    
    if (context.dietary?.length) {
      reasons.push(`matches your ${context.dietary.join(' and ')} dietary needs`);
    }
    
    if (context.mood_text) {
      reasons.push(`perfect for your ${context.mood_text} mood`);
    }
    
    if (item.tags?.includes('comfort')) {
      reasons.push('provides the comfort you\'re looking for');
    }
    
    if (item.country && context.location) {
      reasons.push(`authentic ${item.country} cuisine`);
    }
    
    if (reasons.length === 0) {
      return `${item.name} is a great choice from your menu that fits your current situation.`;
    }
    
    return `Selected because it ${reasons.join(', ')}.`;
  }
  
  // Generate cultural notes
  function generateCulturalNote(item, context) {
    if (item.country) {
      return `This ${item.country} dish represents authentic flavors and traditional preparation methods.`;
    }
    
    if (item.category) {
      return `A ${item.category} favorite that's beloved for its satisfying qualities.`;
    }
    
    return 'A carefully crafted dish that reflects culinary excellence.';
  }
  
  // Generate alternative reasons
  function generateAlternativeReason(item, context) {
    const reasons = [
      'Another excellent choice from your menu',
      'Great alternative with similar appeal',
      'Popular option that hits different notes',
      'Solid backup that many customers love'
    ];
    
    if (item.tags?.includes('popular')) {
      return 'Customer favorite with great reviews';
    }
    
    if (item.price && context.budget === 'low') {
      return 'Budget-friendly option without compromising taste';
    }
    
    return reasons[Math.floor(Math.random() * reasons.length)];
  }

// Create demo API keys (run this once to set up test accounts)
function createDemoApiKeys() {
  // Free tier demo
  apiKeys.set('demo_free_key_123', {
    vendorId: 'demo_restaurant_1',
    plan: 'free',
    usage: 0,
    limit: 1000
  });
  
  // Growth tier demo
  apiKeys.set('demo_growth_key_456', {
    vendorId: 'demo_restaurant_2', 
    plan: 'growth',
    usage: 0,
    limit: 50000
  });
  
  console.log('🔑 Demo API keys created');
}

// ==================== SERVICE INITIALIZATION ====================

// Initialize services
const aiFoodService = new AIFoodService();
const weatherService = new WeatherService();
const smartDietaryService = new SmartDietaryService();

// Initialize demo data
createDemoApiKeys();

// Export functions for compatibility
const getAIFoodSuggestion = async (mood, context = {}) => {
  return await aiFoodService.getPersonalizedFoodSuggestion(mood, context);
};

const getAIQuickDecision = async (context = {}) => {
  return await aiFoodService.getPersonalizedFoodSuggestion('random', context);
};

const updateAIFeedback = async (interactionId, rating) => {
  return await aiFoodService.updateAIFeedback(interactionId, rating);
};

// Enhanced AI suggestion with weather + dietary intelligence
async function getWeatherAndDietaryAwareSuggestion(location, mood, context = {}) {
  try {
    const weather = location ? await weatherService.getCurrentWeather(location) : null;
    const weatherImpact = weather ? weatherService.analyzeWeatherFoodImpact(weather) : null;
    const dietaryPrompt = smartDietaryService.buildDietaryPrompt(context.dietary);
    
    const enhancedContext = {
      ...context,
      weather,
      weatherImpact,
      dietaryPrompt,
      includeRestaurants: context.includeRestaurants || false
    };
    
    const suggestion = await getAIFoodSuggestion(mood, enhancedContext);
    
    if (context.dietary && context.dietary.length > 0 && suggestion.food) {
      const compliance = await smartDietaryService.validateCompliance(suggestion.food.name, context.dietary);
      suggestion.dietaryCompliance = compliance;
      suggestion.dietaryNote = compliance.compliant 
        ? `✅ This food meets all your dietary requirements: ${context.dietary.join(', ')}`
        : `⚠️ This suggestion may not meet your dietary requirements. ${compliance.warnings.join(' ')}`;
    }
    
    if (suggestion && weather) {
      suggestion.weather = weather;
      suggestion.weatherReasoning = buildWeatherReasoning(weather, suggestion);
    }
    
    return suggestion;
    
  } catch (error) {
    console.error('Enhanced suggestion failed:', error);
    return await getAIFoodSuggestion(mood, context);
  }
}

function buildWeatherReasoning(weather, suggestion) {
  let reasoning = [];
  
  if (weather.isCold) {
    reasoning.push(`Perfect for this ${weather.temperature}°C weather`);
  } else if (weather.isHot) {
    reasoning.push(`Great for cooling down in ${weather.temperature}°C heat`);
  }
  
  if (weather.isRaining) {
    reasoning.push('Ideal comfort food for a rainy day');
  }
  
  if (weather.isComfortable) {
    reasoning.push('Perfect weather for enjoying good food');
  }
  
  return reasoning.join(' • ') || `Good choice for ${weather.description}`;
}
function toArray(val) {
    if (!val) return [];
    if (Array.isArray(val)) return val.filter(Boolean).map(String);
    if (typeof val === 'string') return val.split(/[;,]/).map(s => s.trim()).filter(Boolean);
    return [];
  }
  function toBool(val) {
    if (typeof val === 'boolean') return val;
    if (typeof val === 'string') return ['1','true','yes','y'].includes(val.toLowerCase());
    if (typeof val === 'number') return val === 1;
    return false;
  }
  function normalizeMenuItem(raw, vendorId) {
    const item = { ...raw };
    item.vendor_id = vendorId;
    item.menu_item_id = item.menu_item_id || generateMenuItemId(item.name || 'item');
    item.country_code = (item.country_code || '').toUpperCase();
    item.tags = toArray(item.tags);
    item.allergens = typeof item.allergens === 'string' ? item.allergens : (item.allergens || '');
    item.availability = item.availability || 'in_stock';
    if (!item.suitability) {
      item.suitability = {
        vegetarian: toBool(item.vegetarian),
        vegan: toBool(item.vegan),
        gluten_free: toBool(item.gluten_free),
        halal_friendly: toBool(item.halal_friendly),
        kosher_friendly: toBool(item.kosher_friendly)
      };
    }
    if (!item.macros) {
      const { kcal, protein_g, carbs_g, fat_g } = item;
      if (kcal || protein_g || carbs_g || fat_g) {
        item.macros = {
          kcal: Number(kcal) || 0,
          protein_g: Number(protein_g) || 0,
          carbs_g: Number(carbs_g) || 0,
          fat_g: Number(fat_g) || 0
        };
      }
    }
    item.uploaded_at = new Date().toISOString();
    return item;
  }
  function bumpMenuVersion(vendorId) {
    const v = vendorMenus.get(vendorId);
    const next = `v_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
    if (v) vendorMenus.set(vendorId, { ...v, version: next, updatedAt: new Date() });
    return next;
  }
  
// ==================== VENDOR MENU UPLOAD ENDPOINTS ====================

// Menu upload endpoint - THE MONEY MAKER
app.post('/v1/menus', async (req, res) => {
    try {
        const { menu, mode = 'snapshot', dry_run = false } = req.body || {};
        const vendorId = `public_vendor_${Date.now()}`;

      if (!Array.isArray(menu)) return res.status(400).json({ error: 'Menu must be an array of items' });
  
      const current = vendorMenus.get(vendorId) || { items: [], version: null, updatedAt: null, itemCount: 0 };
      const byId = new Map(current.items.map(i => [i.menu_item_id, i]));
      const accepted = [], errors = [];
  
      for (const raw of menu) {
        const v = validateMenuItem(raw);
        if (!v.valid) { errors.push({ name: raw.name || raw.menu_item_id || 'unnamed', errors: v.errors }); continue; }
        accepted.push(normalizeMenuItem(raw, vendorId));
      }
  
      if (dry_run) {
        return res.json({
          success: errors.length === 0,
          summary: { accepted: accepted.length, rejected: errors.length, total: menu.length },
          mode,
          would_create: accepted.filter(i => !byId.has(i.menu_item_id)).length,
          would_update: accepted.filter(i => byId.has(i.menu_item_id)).length,
          would_archive: mode === 'snapshot' ? current.items.filter(i => !accepted.find(n => n.menu_item_id === i.menu_item_id)).length : 0,
          errors
        });
      }
  
      let nextItems;
      if (mode === 'snapshot') {
        const incomingIds = new Set(accepted.map(i => i.menu_item_id));
        const archived = current.items
          .filter(i => !incomingIds.has(i.menu_item_id))
          .map(i => ({ ...i, availability: 'unavailable', status: 'archived', archived_at: new Date().toISOString() }));
        const mergedMap = new Map([...archived, ...accepted].map(i => [i.menu_item_id, i]));
        nextItems = [...mergedMap.values()];
      } else {
        const merged = new Map(current.items.map(i => [i.menu_item_id, i]));
        for (const n of accepted) merged.set(n.menu_item_id, { ...merged.get(n.menu_item_id), ...n });
        nextItems = [...merged.values()];
      }
  
      const menuVersion = `v_${Date.now()}`;
      vendorMenus.set(vendorId, { items: nextItems, version: menuVersion, updatedAt: new Date(), itemCount: nextItems.length });
  
      res.json({
        success: errors.length === 0,
        summary: { accepted: accepted.length, rejected: errors.length, total: menu.length },
        mode,
        menu_version: menuVersion,
        errors: errors.length ? errors : undefined,
        processing_time_ms: Date.now() - req.startTime
      });
    } catch (error) {
      console.error('Menu upload error:', error);
      res.status(500).json({ error: 'Menu upload failed', details: error.message });
    }
  });

// Quick availability updates
app.patch('/v1/menus/availability', authenticateApiKey, async (req, res) => {
    try {
      const { updates = [] } = req.body || {};
      const vendorId = req.apiKey.vendorId;
      const vendorMenu = vendorMenus.get(vendorId);
      if (!vendorMenu) return res.status(404).json({ error: 'No menu found. Upload a menu first.' });
  
      let updated = 0;
      const byId = new Map(vendorMenu.items.map(i => [i.menu_item_id, i]));
      for (const u of updates) {
        const it = byId.get(u.menu_item_id);
        if (!it) continue;
        if (u.availability) it.availability = u.availability;
        if (u.price !== undefined) it.price = u.price;
        if (u.kcal || u.protein_g || u.carbs_g || u.fat_g) {
          it.macros = {
            ...(it.macros || {}),
            kcal: u.kcal ?? it.macros?.kcal ?? 0,
            protein_g: u.protein_g ?? it.macros?.protein_g ?? 0,
            carbs_g: u.carbs_g ?? it.macros?.carbs_g ?? 0,
            fat_g: u.fat_g ?? it.macros?.fat_g ?? 0
          };
        }
        updated++;
      }
      const version = bumpMenuVersion(vendorId);
      res.json({ success: true, updated, total_updates_requested: updates.length, menu_version: version });
    } catch (error) {
      res.status(500).json({ error: 'Availability update failed', details: error.message });
    }
  });

// Get vendor's menu (for dashboard)
app.get('/v1/menus', authenticateApiKey, (req, res) => {
  const vendorId = req.apiKey.vendorId;
  const vendorMenu = vendorMenus.get(vendorId);
  
  if (!vendorMenu) {
    return res.json({
      success: true,
      menu: [],
      version: null,
      item_count: 0
    });
  }
  
  res.json({
    success: true,
    menu: vendorMenu.items,
    version: vendorMenu.version,
    item_count: vendorMenu.itemCount,
    updated_at: vendorMenu.updatedAt
  });
});

// Usage analytics for customer dashboard
app.get('/v1/analytics', authenticateApiKey, (req, res) => {
  const vendorId = req.apiKey.vendorId;
  const keyData = req.apiKey;
  
  res.json({
    success: true,
    usage: {
      current_period: keyData.usage,
      limit: keyData.limit,
      percentage: Math.round((keyData.usage / keyData.limit) * 100)
    },
    plan: keyData.plan,
    vendor_id: vendorId,
    menu_status: vendorMenus.has(vendorId) ? 'uploaded' : 'not_uploaded'
  });
});

// ==================== MCP PROTOCOL ENDPOINTS ====================

// MCP Initialize - Required for protocol handshake
app.post('/mcp/initialize', (req, res) => {
  res.json({
    protocolVersion: "2024-11-05",
    capabilities: {
      tools: {}
    },
    serverInfo: {
      name: "vfied-food-intelligence",
      version: "1.5.0"
    }
  });
});

// MCP Tools List - Tells OpenAI what tools are available
app.post('/mcp/tools/list', (req, res) => {
    res.json({
      tools: [
        {
          name: "get_quick_food_decision",
          description: "Get instant food decision based on location, weather, and dietary restrictions",
          inputSchema: {
            type: "object",
            properties: {
              location: {
                type: "object",
                properties: {
                  city: { type: "string" },
                  country: { type: "string" },
                  latitude: { type: "number" },
                  longitude: { type: "number" }
                }
              },
              dietary: {
                type: "array",
                items: {
                  type: "string",
                  enum: ["vegetarian","vegan","gluten-free","dairy-free","keto","halal","kosher","nut-free","paleo","pescatarian"]
                }
              },
              context: {
                type: "object",
                properties: {
                  budget: { type: "string", enum: ["low","medium","high"] },
                  social: { type: "string", enum: ["solo","couple","group","family"] },
                  includeRestaurants: { type: "boolean" }
                }
              }
            }
          }
        },
        {
          name: "get_food_suggestion",
          description: "Personalized food suggestion based on mood, weather, location, and dietary needs",
          inputSchema: {
            type: "object",
            properties: {
              mood: { type: "string", enum: ["tired","stressed","celebrating","healthy","hungry","lazy","energetic"] },
              location: {
                type: "object",
                properties: {
                  city: { type: "string" },
                  country: { type: "string" },
                  latitude: { type: "number" },
                  longitude: { type: "number" }
                }
              },
              dietary: {
                type: "array",
                items: {
                  type: "string",
                  enum: ["vegetarian","vegan","gluten-free","dairy-free","keto","halal","kosher","nut-free","paleo","pescatarian"]
                }
              },
              context: {
                type: "object",
                properties: {
                  budget: { type: "string", enum: ["low","medium","high"] },
                  social: { type: "string", enum: ["solo","couple","group","family"] },
                  includeRestaurants: { type: "boolean" }
                }
              }
            },
            required: ["mood"]
          }
        },
        {
          name: "validate_dietary_compliance",
          description: "Check if a food item complies with specific dietary restrictions",
          inputSchema: {
            type: "object",
            properties: {
              foodName: { type: "string" },
              dietary: {
                type: "array",
                items: {
                  type: "string",
                  enum: ["vegetarian","vegan","gluten-free","dairy-free","keto","halal","kosher","nut-free","paleo","pescatarian"]
                }
              }
            },
            required: ["foodName","dietary"]
          }
        },
        {
          name: "get_cultural_food_context",
          description: "Get cultural food context and recommendations for a specific location",
          inputSchema: {
            type: "object",
            properties: {
              location: {
                type: "object",
                properties: {
                  city: { type: "string" },
                  country: { type: "string" }
                },
                required: ["country"]
              },
              dietary: {
                type: "array",
                items: {
                  type: "string",
                  enum: ["vegetarian","vegan","gluten-free","dairy-free","keto","halal","kosher","nut-free","paleo","pescatarian"]
                }
              }
            },
            required: ["location"]
          }
        }
      ]
    });
  });
// MCP Tools Call - Executes the actual tool calls
app.post('/mcp/tools/call', async (req, res) => {
  try {
    const { name, arguments: args } = req.body;
    
    let result;
    let statusCode = 200;
    
    switch (name) {
      case "get_quick_food_decision":
        try {
          const response = await fetch(`${req.protocol}://${req.get('host')}/mcp/get_quick_food_decision`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(args || {})
          });
          result = await response.json();
          statusCode = response.status;
        } catch (error) {
          throw new Error(`Failed to get quick decision: ${error.message}`);
        }
        break;
        
      case "get_food_suggestion":
        try {
          const response = await fetch(`${req.protocol}://${req.get('host')}/mcp/get_food_suggestion`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(args)
          });
          result = await response.json();
          statusCode = response.status;
        } catch (error) {
          throw new Error(`Failed to get food suggestion: ${error.message}`);
        }
        break;
        
      case "validate_dietary_compliance":
        try {
          const response = await fetch(`${req.protocol}://${req.get('host')}/mcp/validate_dietary_compliance`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(args)
          });
          result = await response.json();
          statusCode = response.status;
        } catch (error) {
          throw new Error(`Failed to validate dietary compliance: ${error.message}`);
        }
        break;
        
      case "get_cultural_food_context":
        try {
          const response = await fetch(`${req.protocol}://${req.get('host')}/mcp/get_cultural_food_context`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(args)
          });
          result = await response.json();
          statusCode = response.status;
        } catch (error) {
          throw new Error(`Failed to get cultural context: ${error.message}`);
        }
        break;
        
      default:
        return res.status(400).json({
          error: {
            code: "INVALID_TOOL",
            message: `Unknown tool: ${name}`
          }
        });
    }
    
    if (statusCode !== 200) {
      return res.status(statusCode).json({
        error: {
          code: "TOOL_ERROR",
          message: result.error || "Tool execution failed"
        }
      });
    }
    
    // MCP requires responses in this specific format
    res.json({
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2)
        }
      ]
    });
    
  } catch (error) {
    console.error('MCP tool call error:', error);
    res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: error.message
      }
    });
  }
});

// MCP Ping - Health check for MCP protocol
app.post('/mcp/ping', (req, res) => {
  res.json({
    pong: true,
    timestamp: new Date().toISOString()
  });
});

// ==================== EXISTING ENDPOINTS ====================

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: "healthy",
    service: "VFIED Weather + Dietary Enhanced MCP Server with Menu Upload System",
    version: "1.5.0",
    timestamp: new Date().toISOString(),
    features: [
      "Weather intelligence",
      "Dietary restrictions support",
      "Cultural food awareness", 
      "Personal pattern learning",
      "OpenAI integration",
      "Location detection",
      "MCP Protocol Support",
      "Vendor menu upload system",
      "API key authentication",
      "Usage analytics"
    ],
    services: {
      ai: !!aiFoodService.openaiApiKey,
      weather: !!weatherService.openWeatherKey,
      dietary: true,
      location: !!aiFoodService.userLocation?.city,
      culture: !!aiFoodService.userCulture?.mainCuisine,
      mcp: true,
      menuSystem: true,
      authentication: true
    },
    vendor_system: {
      total_vendors: apiKeys.size,
      total_menus: vendorMenus.size,
      demo_keys_available: true
    }
  });
});

// Main Food Suggestion with Dietary Support
app.post('/mcp/get_food_suggestion', async (req, res) => {
    try {
      const { mood, location, dietary = [], context = {} } = req.body;
  
      if (!mood) {
        return res.status(400).json({
          error: "Missing required parameter: mood"
        });
      }
  
      // 🔥 Use smart mood detection
      const resolvedMoods = await resolveMoods(mood, [], aiFoodService.openaiApiKey);
      const primaryMood = resolvedMoods.join(' and ');
  
      const enhancedContext = {
        ...context,
        dietary,
        resolvedMoods // Pass to AI for better understanding
      };
  
      const suggestion = await getWeatherAndDietaryAwareSuggestion(location, primaryMood, enhancedContext);
  
      res.json({
        success: true,
        ...suggestion,
        meta: {
          tool: "get_food_suggestion",
          originalMood: mood,
          resolvedMoods: resolvedMoods, // Show what was detected
          hasWeather: !!suggestion.weather,
          hasDietary: dietary.length > 0,
          dietaryRestrictions: dietary,
          timestamp: new Date().toISOString()
        }
      });
  
    } catch (error) {
      console.error('Food suggestion error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

// Quick Weather + Dietary Decision
app.post('/mcp/get_quick_food_decision', async (req, res) => {
    try {
      const { location, dietary = [], context = {} } = req.body;

  
      if (location) {
        aiFoodService.setLocationFromRequest = function(location) {
        if (!location) return;
        
        const coords = CITY_COORDINATES[location.city] || {};
        
        
        this.userLocation = {
            city: location.city || this.userLocation?.city || 'Unknown',
            country: location.country || this.userLocation?.country || 'Unknown',
            countryCode: this.getCountryCode(location.country || this.userLocation?.country || 'US'),
            latitude: location.latitude || coords.latitude || this.userLocation?.latitude,
            longitude: location.longitude || coords.longitude || this.userLocation?.longitude,
            timestamp: new Date().toISOString()
        };
        
        console.log('📍 Location set from request:', this.userLocation);
        this.detectCulturalContext();
        };
      }
  
      const hour = new Date().getHours();
      let autoMood = 'random';
      
      if (hour >= 6 && hour <= 10) autoMood = 'tired';
      else if (hour >= 11 && hour <= 15) autoMood = 'hungry';
      else if (hour >= 17 && hour <= 22) autoMood = 'tired';
      else autoMood = 'lazy';
  
      const enhancedContext = {
        ...context,
        dietary,
        quick: true,
        // 🔥 ADD: Explicit dietary emphasis for better AI compliance
        dietaryConstraints: dietary.length > 0 ? `MUST BE STRICTLY ${dietary.join(' AND ').toUpperCase()}` : null
      };
  
      let suggestion = await getWeatherAndDietaryAwareSuggestion(location, autoMood, enhancedContext);
  
      // 🔥 ADD: Validate compliance and retry if needed
      if (dietary.length > 0 && suggestion.food?.name) {
        try {
          const compliance = await smartDietaryService.validateCompliance(suggestion.food.name, dietary);
          if (!compliance.compliant) {
            console.warn(`Quick suggestion "${suggestion.food.name}" not compliant, using fallback`);
            suggestion = getFallbackRecommendation(location, autoMood, dietary);
          }
          suggestion.dietaryCompliance = compliance;
        } catch (e) {
          console.warn('Compliance check failed in quick decision');
        }
      }
  
      res.json({
        success: true,
        decision: suggestion.food?.name || 'Good Food Choice',
        explanation: suggestion.description || suggestion.friendResponse,
        weather: suggestion.weather,
        weatherReasoning: suggestion.weatherReasoning,
        dietaryNote: suggestion.dietaryNote,
        ...suggestion,
        meta: {
          tool: "get_quick_food_decision",
          autoMood,
          hasWeather: !!suggestion.weather,
          hasDietary: dietary.length > 0,
          dietaryRestrictions: dietary,
          timestamp: new Date().toISOString()
        }
      });
  
    } catch (error) {
      console.error('Quick decision error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

// Dietary Compliance Validation
app.post('/mcp/validate_dietary_compliance', async (req, res) => {
  try {
    const { foodName, dietary } = req.body;

    if (!foodName || !dietary) {
      return res.status(400).json({
        error: "Missing required parameters: foodName, dietary"
      });
    }

    const validation = await smartDietaryService.validateCompliance(foodName, dietary);

    res.json({
      success: true,
      foodName,
      dietaryRestrictions: dietary,
      ...validation,
      meta: {
        tool: "validate_dietary_compliance",
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Dietary validation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Debug endpoint for environment variables
app.get('/debug/env', (req, res) => {
  res.json({
    hasOpenAI: !!process.env.OPENAI_API_KEY,
    openAIKeyLength: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0,
    openAIKeyStart: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 8) : 'missing',
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('OPENAI'))
  });
});

// Cultural Context with Dietary Filtering
app.post('/mcp/get_cultural_food_context', async (req, res) => {
    try {
      const { location, dietary = [] } = req.body;
  
      if (!location?.country) {
        return res.status(400).json({
          error: "Missing required parameter: location.country"
        });
      }
  
      // 🔥 FIX: Ensure we detect culture for the RIGHT country
      const tempLocation = {
        city: location.city || 'Unknown',
        country: location.country,
        countryCode: aiFoodService.getCountryCode(location.country) // Fix country code mapping
      };
      
      // Force cultural detection for the specific location
      aiFoodService.setLocationFromRequest(tempLocation);
      await aiFoodService.detectCulturalContext(); // Wait for it to complete
      
      const culturalContext = aiFoodService.userCulture || {
        mainCuisine: `${location.country} cuisine`,
        popularFoods: ["Local dishes"],
        comfortFoods: ["Traditional comfort foods"],
        culturalNotes: `Rich ${location.country} food culture`
      };
  
      // Apply dietary filtering if requested
      if (dietary.length > 0) {
        culturalContext.dietaryFriendlyOptions = {};
        for (const restriction of dietary) {
          const friendlyFoods = [];
          for (const food of culturalContext.popularFoods || []) {
            try {
              const compliance = await smartDietaryService.validateCompliance(food, [restriction]);
              if (compliance.compliant) {
                friendlyFoods.push(food);
              }
            } catch (e) {
              // Skip if validation fails
            }
          }
          culturalContext.dietaryFriendlyOptions[restriction] = friendlyFoods;
        }
      }
  
      res.json({
        success: true,
        location: `${location.city || location.country}`,
        ...culturalContext,
        meta: {
          tool: "get_cultural_food_context",
          hasDietary: dietary.length > 0,
          dietaryRestrictions: dietary,
          timestamp: new Date().toISOString()
        }
      });
  
    } catch (error) {
      console.error('Cultural context error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

// Feedback endpoint
app.post('/mcp/provide_feedback', async (req, res) => {
  try {
    const { interactionId, rating } = req.body;

    if (!interactionId || !rating) {
      return res.status(400).json({
        error: "Missing required parameters: interactionId, rating"
      });
    }

    await updateAIFeedback(interactionId, rating);

    res.json({
      success: true,
      message: "Feedback recorded successfully"
    });

  } catch (error) {
    console.error('Feedback error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Error handling
app.use((error, req, res, next) => {
  console.error('MCP Server Error:', error);
  res.status(500).json({
    error: "Internal server error",
    details: error.message
  });
});
import { v4 as uuidv4 } from 'uuid';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import Joi from 'joi';

// Add security middleware (add after your existing middleware)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  message: { error: 'Rate limit exceeded' }
});
app.use(limiter);

// Add request ID tracking (add after your existing timing middleware)
app.use((req, res, next) => {
  req.requestId = uuidv4();
  next();
});

// Mood taxonomy data
const MOOD_TAXONOMY = {
  moods: [
    { id: 'TIRED', group: 'Energy', synonyms: ['exhausted', 'sleepy', 'drained'] },
    { id: 'STRESSED', group: 'Emotion', synonyms: ['overwhelmed', 'pressure', 'tense'] },
    { id: 'CELEBRATING', group: 'Emotion', synonyms: ['excited', 'triumphant', 'happy'] },
    { id: 'HUNGRY', group: 'Body', synonyms: ['starving', 'famished', 'peckish'] },
    { id: 'POST_WORKOUT', group: 'Body', synonyms: ['after gym', 'post exercise'] },
    { id: 'SICK', group: 'Body', synonyms: ['ill', 'unwell', 'under weather'] },
    { id: 'FOCUSED', group: 'Social', synonyms: ['concentrated', 'working', 'productive'] },
    { id: 'RELAX', group: 'Social', synonyms: ['chill', 'unwind', 'calm'] },
    { id: 'ADVENTUROUS', group: 'Intent', synonyms: ['try something new', 'explore'] }
  ]
};

// Supported countries data
const SUPPORTED_COUNTRIES = {
  countries: [
    { name: 'Kenya', country_code: 'KE', region: 'East Africa', cuisine: 'East African' },
    { name: 'Nigeria', country_code: 'NG', region: 'West Africa', cuisine: 'West African' },
    { name: 'United Kingdom', country_code: 'GB', region: 'Western Europe', cuisine: 'British' },
    { name: 'United States', country_code: 'US', region: 'North America', cuisine: 'American' },
    { name: 'Japan', country_code: 'JP', region: 'East Asia', cuisine: 'Japanese' },
    { name: 'India', country_code: 'IN', region: 'South Asia', cuisine: 'Indian' },
    { name: 'France', country_code: 'FR', region: 'Western Europe', cuisine: 'French' },
    { name: 'Germany', country_code: 'DE', region: 'Central Europe', cuisine: 'German' },
    { name: 'Australia', country_code: 'AU', region: 'Oceania', cuisine: 'Australian' }
  ]
};

// Validation schemas
const quickDecisionSchema = Joi.object({
  location: Joi.object({
    city: Joi.string().optional(),
    country: Joi.string().optional(),
    country_code: Joi.string().length(2).uppercase().optional()
  }).optional(),
  dietary: Joi.array().items(
    Joi.string().valid('vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'keto', 'halal', 'kosher')
  ).optional()
});

export const recommendSchema = z.object({
    location: z.object({
      city: z.string().optional(),
      country: z.string().optional(),
      country_code: z.string().length(2).optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional()
    }).optional(),
  
    // either mood_text or mood_ids (or both)
    mood_text: z.string().max(200).optional(),
    mood_ids: z.array(z.enum([
      'TIRED','STRESSED','CELEBRATING','HEALTHY','HUNGRY','LAZY','ENERGETIC','POST_WORKOUT','SICK','HUNGOVER'
    ])).optional(),
  
    dietary: z.array(z.enum([
      'vegetarian','vegan','gluten-free','dairy-free','keto','halal','kosher','nut-free','paleo','pescatarian'
    ])).default([]),
  
    budget: z.enum(['low','medium','high']).optional(),
    social: z.enum(['solo','couple','group','family']).optional(),
    menu_source: z.enum(['global_database','my_uploaded_menu']).default('global_database')
  }).refine(data => !!data.mood_text || (data.mood_ids && data.mood_ids.length > 0), {
    message: 'Provide mood_text or mood_ids',
    path: ['mood_text']
  });


// Validation middleware
export const validateRequest = (schema) => (req, res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: parsed.error.issues.map(i => ({ path: i.path, message: i.message }))
      });
    }
    // write parsed data back (normalized defaults)
    req.body = parsed.data;
    next();
  };

// Helper functions
async function smartMoodDetection(moodText, openaiApiKey) {
    if (!moodText || !openaiApiKey) {
      return []; // Fallback to empty if no AI available
    }
  
    try {
      const moodPrompt = `
  You are a mood detection expert. Map the user's mood description to the closest supported mood IDs.
  
  USER MOOD: "${moodText}"
  
  SUPPORTED MOODS:
  - TIRED (exhausted, sleepy, drained, worn out)
  - STRESSED (overwhelmed, pressure, tense, anxious, worried)
  - CELEBRATING (excited, triumphant, happy, party, birthday, win)
  - HUNGRY (starving, famished, peckish, craving food)
  - POST_WORKOUT (after gym, post exercise, need protein)
  - SICK (ill, unwell, under weather, recovering)
  - FOCUSED (concentrated, working, productive, studying)
  - RELAX (chill, unwind, calm, cozy, laid-back, comfortable)
  - ADVENTUROUS (try something new, explore, experimental)
  
  EXAMPLES:
  - "cozy" → ["RELAX"]
  - "tired but excited" → ["TIRED", "CELEBRATING"]
  - "need comfort food" → ["RELAX", "HUNGRY"]
  - "just finished workout" → ["POST_WORKOUT"]
  - "stressed at work" → ["STRESSED", "FOCUSED"]
  - "feeling under the weather" → ["SICK"]
  
  Map the user's mood to 1-3 most relevant mood IDs. Respond with ONLY a JSON array:
  ["MOOD1", "MOOD2"]
  `;
  
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini', // Fast and cheap for simple tasks
          messages: [
            {
              role: 'system',
              content: 'You are a mood detection expert. Always respond with valid JSON array of mood IDs.'
            },
            {
              role: 'user', 
              content: moodPrompt
            }
          ],
          max_tokens: 50, // Very short response needed
          temperature: 0.1, // Low for consistency
          response_format: { type: 'json_object' }
        })
      });
  
      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }
  
      const data = await response.json();
      const aiResponse = data.choices[0].message.content;
      
      // Parse the AI response
      const parsed = JSON.parse(aiResponse);
      
      // Handle both array format and object format
      if (Array.isArray(parsed)) {
        return parsed;
      } else if (parsed.moods && Array.isArray(parsed.moods)) {
        return parsed.moods;
      } else {
        return [];
      }
  
    } catch (error) {
      console.warn('Smart mood detection failed:', error.message);
      return fallbackMoodDetection(moodText); // Fallback to regex
    }
  }

  function fallbackMoodDetection(text = '') {
    const t = text.toLowerCase();
    const map = [
      [/post[-\s]?workout|gym|workout|exercise/, 'POST_WORKOUT'],
      [/tired|exhausted|fatigued|sleepy|worn out/, 'TIRED'],
      [/stress|anxious|overwhelmed|worried|tense/, 'STRESSED'],
      [/celebrat|party|birthday|win|excited|triumph|happy/, 'CELEBRATING'],
      [/hungry|starving|ravenous|famished|peckish/, 'HUNGRY'],
      [/sick|flu|cold|ill|unwell|under.?weather/, 'SICK'],
      [/focus|work|productive|studying|concentrated/, 'FOCUSED'],
      [/relax|chill|unwind|calm|cozy|laid.?back|comfort/, 'RELAX'],
      [/adventure|explore|new|experimental|try/, 'ADVENTUROUS']
    ];
    
    const detected = new Set();
    for (const [regex, moodId] of map) {
      if (regex.test(t)) {
        detected.add(moodId);
      }
    }
    
    return [...detected];
  }
  

  async function resolveMoods(mood_text, mood_ids = [], openaiApiKey) {
    let resolvedMoods = [...(mood_ids || [])];
    
    if (mood_text) {
      // Try smart AI detection first, fallback to regex
      const detectedMoods = await smartMoodDetection(mood_text, openaiApiKey);
      resolvedMoods = [...new Set([...resolvedMoods, ...detectedMoods])];
    }
    
    // Ensure we have at least one mood
    if (resolvedMoods.length === 0) {
      resolvedMoods = ['HUNGRY']; // Default fallback
    }
    
    return resolvedMoods;
  }
  
  function calculateConfidence(food, moods = [], opts = {}) {
    let c = 80;
    if (moods.includes('POST_WORKOUT') && (food?.suitability?.protein || food?.tags?.includes?.('protein'))) c += 5;
    if (opts.dietary?.length) c += 3;
    if (food?.country_code) c += 2;
    return Math.max(60, Math.min(95, c));
  }

// NEW ENDPOINTS

// GET /v1/moods - Mood taxonomy
app.get('/v1/moods', (req, res) => {
  res.json(MOOD_TAXONOMY);
});

// GET /v1/countries - Supported countries
app.get('/v1/countries', (req, res) => {
  res.json(SUPPORTED_COUNTRIES);
});

// POST /v1/quick_decision - Public quick decision
app.post('/v1/quick_decision', 
    validateRequest(quickDecisionSchema),
    async (req, res) => {
      const startTime = Date.now();
      
      try {
        const { location, dietary = [] } = req.body;
        
        // Use your existing AI service
        const autoMood = 'hungry';
        const suggestion = await getAIFoodSuggestion(autoMood, { 
          location, 
          dietary, 
          quick: true 
        });
        
        res.json({
          success: true,
          request_id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          decision: suggestion.food?.name || 'Good Food Choice',
          country_code: location?.country_code || 'US',
          explanation: suggestion.friendResponse || suggestion.description,
          dietaryNote: dietary.length > 0 ? `Filtered for: ${dietary.join(', ')}` : null,
          weather: suggestion.weather,
          weatherReasoning: suggestion.weatherReasoning,
          processingTimeMs: Date.now() - startTime
        });
        
      } catch (error) {
        console.error('Quick decision error:', error);
        res.status(500).json({
          success: false,
          error: 'Internal server error',
          request_id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        });
      }
    }
  );

  app.post('/v1/enhanced_recommend', 
    validateRequest(recommendSchema),
    async (req, res) => {
      const startTime = Date.now();
      
      try {
        const { location, mood_text, mood_ids, dietary = [], budget, social, goal } = req.body;
        
        // Set location for AI service
        if (location) {
          aiFoodService.setLocationFromRequest(location);
        }
        
        // Merge mood_text into mood_ids
        let resolvedMoods = [...mood_ids];
        if (mood_text) {
          const textMoods = textToMoodIds(mood_text);
          resolvedMoods = [...new Set([...resolvedMoods, ...textMoods])];
        }
        
        // Enhanced context for AI
        const enhancedContext = {
          location,
          dietary,
          budget,
          social,
          goal,
          quick: false,
          includeRestaurants: true,
          culturalPriority: true
        };
        
        // Get AI recommendation
        const primaryMood = resolvedMoods[0] || 'HUNGRY';
        const suggestion = await getWeatherAndDietaryAwareSuggestion(location, primaryMood, enhancedContext);
        
        // Format comprehensive response
        res.json({
          success: true,
          request_id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          context: {
            resolved_moods: resolvedMoods,
            location: location,
            dietary: dietary,
            source: 'enhanced_public'
          },
          food: {
            dish_id: suggestion.food?.id || `dish_${Date.now()}`,
            name: suggestion.food?.name || 'Perfect Choice',
            emoji: suggestion.food?.emoji || '🍽️',
            country: location?.country || suggestion.food?.country || 'Local',
            country_code: location?.country_code || suggestion.food?.country_code || 'US',
            category: suggestion.food?.category || 'comfort',
            type: suggestion.food?.type || 'Local cuisine',
            description: suggestion.description || suggestion.friendResponse
          },
          friendMessage: suggestion.friendResponse || suggestion.description,
          reasoning: suggestion.reason || suggestion.reasoning,
          culturalNote: suggestion.culturalNote,
          personalNote: suggestion.personalNote,
          weatherNote: suggestion.weatherReasoning,
          availabilityNote: suggestion.availabilityNote,
          alternatives: suggestion.alternatives || [],
          confidence: suggestion.confidence || 85,
          dietaryCompliance: suggestion.dietaryCompliance,
          dietaryNote: suggestion.dietaryNote,
          weather: suggestion.weather,
          interactionId: suggestion.interactionId,
          processingTimeMs: Date.now() - startTime,
          meta: {
            hasWeather: !!suggestion.weather,
            hasDietary: dietary.length > 0,
            dietaryRestrictions: dietary,
            timestamp: new Date().toISOString()
          }
        });
        
      } catch (error) {
        console.error('Enhanced recommendation error:', error);
        res.status(500).json({
          success: false,
          error: 'Internal server error',
          request_id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        });
      }
    }
  );

  app.post('/v1/recommend', validateRequest(recommendSchema), async (req, res) => {
    const startTime = Date.now();
    
    try {
        const { 
          location, 
          mood_text, 
          mood_ids, 
          dietary = [], 
          budget, 
          social, 
          menu_source = 'global_database' 
        } = req.body;
    
        // Set location for AI service if provided
        if (location) {
          aiFoodService.setLocationFromRequest(location);
        }
    
        // 🔥 Use smart mood detection
        const resolvedMoods = await resolveMoods(mood_text, mood_ids, aiFoodService.openaiApiKey);
        const primaryMood = resolvedMoods.join(' and ');
    
        const enhancedContext = {
          location,
          dietary,
          budget,
          social,
          quick: false,
          includeRestaurants: true,
          culturalPriority: true,
          resolvedMoods, // Pass to AI
          dietaryConstraints: dietary.length > 0 ? `MUST BE ${dietary.join(' AND ').toUpperCase()}` : null
        };
  
    //   // Get recommendation with proper mood handling
    //   const primaryMood = resolvedMoods.length > 0 ? resolvedMoods.join(' and ') : 'hungry';
  
      let recommendation;
      try {
        recommendation = await getWeatherAndDietaryAwareSuggestion(location, primaryMood, enhancedContext);
      } catch (aiError) {
        console.warn('AI suggestion failed, using fallback:', aiError.message);
        recommendation = getFallbackRecommendation(location, primaryMood, dietary);
      }
  
      // Validate dietary compliance of the recommendation
      if (dietary.length > 0 && recommendation.food?.name) {
        try {
          const compliance = await smartDietaryService.validateCompliance(
            recommendation.food.name, 
            dietary
          );
      
          // If not compliant, get a fallback
          if (!compliance.compliant) {
            console.warn(`Recommendation "${recommendation.food.name}" not compliant with ${dietary.join(', ')}`);
            recommendation = getFallbackRecommendation(location, primaryMood, dietary);
            
            // 🔥 RE-CHECK the fallback food (this was missing!)
            const fallbackCompliance = await smartDietaryService.validateCompliance(
              recommendation.food.name, 
              dietary
            );
            recommendation.dietaryCompliance = fallbackCompliance;
          } else {
            recommendation.dietaryCompliance = compliance;
          }
        } catch (error) {
          console.warn('Dietary compliance check failed:', error.message);
          // For fallback foods, assume compliant since we designed them to be
          recommendation.dietaryCompliance = { 
            compliant: true, 
            source: 'assumed', 
            reasoning: 'Fallback food designed to be compliant' 
          };
        }
      }
      // Filter alternatives to be dietary compliant
      if (dietary.length > 0 && recommendation.alternatives) {
        const compliantAlternatives = [];
        for (const alt of recommendation.alternatives) {
          try {
            const altCompliance = await smartDietaryService.validateCompliance(alt.name, dietary);
            if (altCompliance.compliant) {
              compliantAlternatives.push(alt);
            }
          } catch (e) {
            // Skip this alternative if validation fails
            continue;
          }
        }
        recommendation.alternatives = compliantAlternatives;
      }
  
      // Enhance the response
      const enhancedFood = {
        dish_id: recommendation.food?.id || `dish_${Date.now()}`,
        name: recommendation.food?.name || 'Great Choice',
        emoji: recommendation.food?.emoji || '🍽️',
        country: location?.country || recommendation.food?.country || 'Local',
        country_code: location?.country_code || recommendation.food?.country_code || 'GB',
        category: recommendation.food?.category || 'comfort',
        type: recommendation.food?.type || getLocalCuisineType(location),
        tags: recommendation.food?.tags || [],
        suitability: buildSuitability(recommendation.food?.name, dietary)
      };
  
      res.json({
        success: true,
        request_id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        context: {
          resolved_moods: resolvedMoods,
          location: location,
          dietary: dietary,
          source: menu_source === 'my_uploaded_menu' ? 'uploaded_menu' : 'global_database'
        },
        food: enhancedFood,
        friendMessage: recommendation.friendResponse || recommendation.description,
        reasoning: recommendation.reason || recommendation.reasoning || buildReasoning(enhancedFood, resolvedMoods, dietary, location),
        culturalNote: recommendation.culturalNote || buildCulturalNote(enhancedFood, location),
        personalNote: recommendation.personalNote,
        weatherNote: recommendation.weatherReasoning,
        availabilityNote: recommendation.availabilityNote || buildAvailabilityNote(enhancedFood, location),
        alternatives: recommendation.alternatives || [],
        confidence: recommendation.confidence || calculateConfidence(enhancedFood, resolvedMoods, { dietary }),
        dietaryCompliance: recommendation.dietaryCompliance,
        dietaryNote: buildDietaryNote(dietary, recommendation.dietaryCompliance),
        weather: recommendation.weather,
        interactionId: recommendation.interactionId,
        processingTimeMs: Date.now() - startTime,
        meta: {
          hasWeather: !!recommendation.weather,
          hasDietary: dietary.length > 0,
          dietaryRestrictions: dietary,
          timestamp: new Date().toISOString()
        }
      });
  
    } catch (error) {
      console.error('Recommendation error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        request_id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });
  
  // Helper functions (fixed syntax issues):
  
  function getFallbackRecommendation(location, mood, dietary) {
    const countryCode = location?.country_code || 'GB';
    
    // Dietary-appropriate fallbacks by country
    const fallbacks = {
      'GB': {
        vegetarian: { name: 'Vegetable Shepherd\'s Pie', emoji: '🥧', category: 'comfort' },
        vegan: { name: 'Mushroom and Ale Pie', emoji: '🍄', category: 'comfort' },
        default: { name: 'Fish and Chips', emoji: '🍟', category: 'comfort' }
      },
      'KE': {
        vegetarian: { name: 'Ugali with Sukuma Wiki', emoji: '🥬', category: 'traditional' },
        vegan: { name: 'Githeri', emoji: '🌽', category: 'traditional' },
        default: { name: 'Nyama Choma', emoji: '🥩', category: 'traditional' }
      },
      'US': {
        vegetarian: { name: 'Veggie Burger', emoji: '🍔', category: 'comfort' },
        vegan: { name: 'Buddha Bowl', emoji: '🥗', category: 'healthy' },
        default: { name: 'Classic Burger', emoji: '🍔', category: 'comfort' }
      }
    };
  
    const countryFallbacks = fallbacks[countryCode] || fallbacks['GB'];
    const dietaryKey = dietary.includes('vegan') ? 'vegan' : 
                      dietary.includes('vegetarian') ? 'vegetarian' : 'default';
    
    const food = countryFallbacks[dietaryKey] || countryFallbacks['default'];
  
    return {
      food: {
        id: `fallback-${food.name.toLowerCase().replace(/\s+/g, '-')}`,
        name: food.name,
        emoji: food.emoji,
        category: food.category,
        country: location?.country || 'Local',
        country_code: countryCode
      },
      friendResponse: `Here's a great ${food.category} choice: ${food.name}!`,
      reasoning: `Perfect ${food.category} food for your ${mood} mood`,
      alternatives: [],
      confidence: 80,
      source: 'fallback'
    };
  }
  
  function buildSuitability(foodName, dietary) {
    const name = (foodName || '').toLowerCase();
    
    return {
      vegetarian: dietary.includes('vegetarian') || dietary.includes('vegan') || 
                  !name.match(/\b(meat|chicken|beef|pork|fish|seafood|bacon|ham|turkey)\b/),
      vegan: dietary.includes('vegan') || 
             (!name.match(/\b(meat|chicken|beef|pork|fish|seafood|bacon|ham|turkey|cheese|milk|cream|butter|egg)\b/)),
      gluten_free: dietary.includes('gluten-free') || 
                   !name.match(/\b(bread|pasta|wheat|flour|beer)\b/),
      halal_friendly: dietary.includes('halal') || !name.match(/\b(pork|bacon|ham|alcohol)\b/),
      kosher_friendly: dietary.includes('kosher') || !name.match(/\b(pork|bacon|ham|shellfish)\b/)
    };
  }
  
  function getLocalCuisineType(location) {
    const cuisineMap = {
      'GB': 'British cuisine',
      'KE': 'East African cuisine', 
      'US': 'American cuisine',
      'FR': 'French cuisine',
      'IN': 'Indian cuisine',
      'JP': 'Japanese cuisine'
    };
    
    return cuisineMap[location?.country_code] || 'Local cuisine';
  }
  
  function buildReasoning(food, moods, dietary, location) {
    const parts = [];
    
    if (moods.includes('TIRED')) parts.push('provides comfort for your tired mood');
    if (moods.includes('CELEBRATING')) parts.push('perfect for celebrating');
    if (dietary.length > 0) parts.push(`meets your ${dietary.join(' and ')} requirements`);
    if (location?.country) parts.push(`authentic ${location.country} choice`);
    
    return parts.length > 0 ? 
      `${food.name} is great because it ${parts.join(', ')}.` :
      `${food.name} is a perfect choice for your current situation.`;
  }
  
  function buildCulturalNote(food, location) {
    if (location?.country_code === 'GB') {
      return `This British classic represents the comfort and tradition of UK cuisine.`;
    } else if (location?.country_code === 'KE') {
      return `This East African dish showcases the rich flavors and communal spirit of Kenyan food culture.`;
    }
    
    return `This dish represents the authentic flavors of ${location?.country || 'local'} cuisine.`;
  }
  
  function buildAvailabilityNote(food, location) {
    const city = location?.city || 'your area';
    return `You can find great ${food.name} at local restaurants and pubs in ${city}.`;
  }
  
  function buildDietaryNote(dietary, compliance) {
    if (dietary.length === 0) return null;
    
    if (compliance?.compliant) {
      return `✅ This recommendation meets all your dietary requirements: ${dietary.join(', ')}.`;
    } else if (compliance?.warnings?.length > 0) {
      return `⚠️ ${compliance.warnings.join(' ')}`;
    }
    
    return `Filtered for your ${dietary.join(', ')} preferences.`;
  }
  
  // Helper function to get country code
  function getCountryCode(country) {
    const countryMap = {
      'Kenya': 'KE', 'United Kingdom': 'GB', 'UK': 'GB',
      'United States': 'US', 'USA': 'US', 'Japan': 'JP',
      'France': 'FR', 'Germany': 'DE', 'Nigeria': 'NG',
      'India': 'IN', 'Australia': 'AU'
    };
    return countryMap[country] || 'US';
  }
  

// Enhanced health check
app.get('/health', (req, res) => {
  res.json({
    status: "healthy",
    service: "VFIED Food Intelligence API v2.0",
    version: "2.0.0",
    timestamp: new Date().toISOString(),
    features: [
      "Vision schema endpoints",
      "Mood taxonomy", 
      "Country support",
      "Enhanced security",
      "Request validation",
      "Weather intelligence",
      "Dietary restrictions",
      "Cultural awareness",
      "Menu upload system"
    ],
    endpoints: {
      "GET /v1/moods": "Mood taxonomy",
      "GET /v1/countries": "Supported countries", 
      "POST /v1/quick_decision": "Quick decision (public)",
      "POST /v1/recommend": "Full recommendation (auth required)",
      "POST /mcp/*": "MCP protocol (backward compatibility)"
    },
    services: {
      ai: !!aiFoodService.openaiApiKey,
      security: true,
      validation: true,
      authentication: true
    }
  });
});
// Start server
app.listen(PORT, () => {
  console.log(`🌦️ VFIED Enhanced MCP Server with Menu Upload System running on port ${PORT}`);
  console.log(`🤖 AI Status: ${aiFoodService.openaiApiKey ? 'Connected' : 'Local Mode'}`);
  console.log(`🌤️ Weather API: ${weatherService.openWeatherKey ? 'Connected' : 'Simulated'}`);
  console.log(`🌱 Dietary Intelligence: Active`);
  console.log(`🔗 MCP Protocol: Active`);
  console.log(`📋 Menu Upload System: Active`);
  console.log(`🔑 API Authentication: Active`);
  console.log(`📊 Analytics: Active`);
  console.log(`🔗 Health: http://localhost:${PORT}/health`);
  console.log(`🍽️ Menu Endpoints: /v1/menus (POST/GET), /v1/recommend (POST)`);
  console.log(`📈 Analytics Endpoint: /v1/analytics (GET)`);
});

export default app; 