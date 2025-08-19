// VFIED MCP Server - Complete with Weather + Dietary Intelligence + Menu Upload System + MCP Protocol
import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import 'dotenv/config';
// Add these routes to your mcp-server.js BEFORE your existing endpoints
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static HTML pages

const app = express();
const PORT = process.env.MCP_PORT || process.env.PORT || 3001;


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
    res.sendFile(path.join(__dirname, 'index.html'));
  });
  
  app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
  });
  
  app.get('/docs', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs.html'));
  });
  
  app.get('/demo', (req, res) => {
    res.sendFile(path.join(__dirname, 'demo.html'));
  });
  
  // Serve static assets (if you add any CSS/JS files later)
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
  
  // Apply usage counting only to expensive calls:
  app.post('/v1/recommend', authenticateApiKey, countUsage, async (req,res)=>{ /* unchanged body */ });

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
      const response = await fetch(
        `${this.baseUrl}/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${this.openWeatherKey}&units=metric`
      );
      
      if (!response.ok) throw new Error('Weather API failed');
      
      const data = await response.json();
      
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
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Weather fetch error:', error);
      return this.getSimulatedWeather(location);
    }
  }

  getSimulatedWeather(location) {
    const temp = this.getSimulatedTemp(location);
    const condition = this.getSimulatedCondition();
    
    return {
      temperature: temp,
      feelsLike: temp + Math.floor(Math.random() * 6) - 3,
      humidity: 40 + Math.floor(Math.random() * 40),
      condition,
      description: this.getWeatherDescription(condition),
      windSpeed: Math.floor(Math.random() * 15),
      cityName: location?.city || 'Unknown',
      country: location?.country || 'Unknown',
      isRaining: condition === 'rain',
      isSnowing: condition === 'snow',
      isCold: temp < 15,
      isHot: temp > 30,
      isComfortable: temp >= 18 && temp <= 26,
      simulated: true,
      timestamp: new Date().toISOString()
    };
  }

  getSimulatedTemp(location) {
    const country = location?.country || location?.countryCode || 'US';
    const hour = new Date().getHours();
    
    const tempMap = {
      'KE': 22, 'NG': 28, 'ET': 18, 'ZA': 20,
      'IN': 25, 'JP': 18, 'CN': 16, 'TH': 30,
      'GB': 12, 'DE': 15, 'FR': 16, 'IT': 18,
      'US': 18, 'CA': 10, 'MX': 24, 'BR': 26,
      'AU': 22, 'NZ': 16
    };
    
    const baseTemp = tempMap[country.toUpperCase()] || 20;
    const tempVariation = Math.sin((hour - 6) * Math.PI / 12) * 8;
    
    return Math.round(baseTemp + tempVariation + (Math.random() * 6 - 3));
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
  
  // Filter available items
  let availableItems = vendorMenu.items.filter(item => 
    !item.availability || item.availability === 'in_stock'
  );
  
  // Apply dietary filters
  if (context.dietary.includes('vegetarian')) {
    availableItems = availableItems.filter(item => 
      item.tags?.includes('vegetarian') || 
      !item.tags?.some(tag => ['meat', 'chicken', 'beef', 'pork'].includes(tag))
    );
  }
  
  if (context.dietary.includes('vegan')) {
    availableItems = availableItems.filter(item => 
      item.tags?.includes('vegan') ||
      item.suitability?.vegan
    );
  }
  
  // Simple mood-based scoring
  const scoredItems = availableItems.map(item => {
    let score = 50; // Base score
    
    // Mood scoring
    if (context.mood_text?.includes('tired') && item.tags?.includes('comfort')) score += 30;
    if (context.mood_text?.includes('celebrating') && item.tags?.includes('special')) score += 25;
    if (context.mood_text?.includes('workout') && item.tags?.includes('protein')) score += 35;
    
    // Random factor for variety
    score += Math.random() * 20;
    
    return { ...item, score };
  });
  
  // Sort by score and pick the best
  scoredItems.sort((a, b) => b.score - a.score);
  const selectedItem = scoredItems[0];
  
  if (!selectedItem) {
    return {
      error: 'No suitable items',
      message: 'No menu items match your preferences. Try adjusting your dietary restrictions.'
    };
  }
  
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
    friend_message: `Perfect choice from your menu! ${selectedItem.name} is exactly what you need right now.`,
    reasoning: `Selected from your uploaded menu based on your ${context.mood_text} mood and dietary preferences.`,
    cultural_note: `This ${selectedItem.country || 'local'} dish fits perfectly with your current situation.`,
    availability_note: `Available now from your menu`,
    alternatives: scoredItems.slice(1, 3).map(item => ({
      name: item.name,
      emoji: item.emoji || '🍽️',
      reason: 'Another great option from your menu'
    })),
    confidence: Math.min(95, 70 + (selectedItem.score - 50))
  };
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
app.post('/v1/menus', authenticateApiKey, async (req, res) => {
    try {
      const { menu, mode = 'snapshot', dry_run = false } = req.body || {};
      const vendorId = req.apiKey.vendorId;
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

// Enhanced recommendation with menu support
app.post('/v1/recommend', authenticateApiKey, async (req, res) => {
  try {
    const {
      location,
      mood_text,
      mood_ids = [],
      dietary = [],
      menu_source = 'global_database',
      budget = 'medium'
    } = req.body;
    
    const vendorId = req.apiKey.vendorId;
    let recommendation;
    
    if (menu_source === 'my_uploaded_menu') {
      // Use vendor's uploaded menu
      recommendation = await getPersonalizedMenuRecommendation(vendorId, {
        location,
        mood_text,
        mood_ids,
        dietary,
        budget
      });
    } else {
      // Use your existing AI service
      recommendation = await getAIFoodSuggestion(mood_text || 'hungry', {
        location,
        dietary,
        budget
      });
    }
    
    res.json({
      success: true,
      request_id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...recommendation,
      context: {
        resolved_moods: normalizeMoods(mood_text, mood_ids),
        dietary,
        location,
        source: menu_source === 'my_uploaded_menu' ? 'uploaded_menu' : 'global_database'
      },
      processing_time_ms: Date.now() - req.startTime
    });
    
  } catch (error) {
    console.error('Recommendation error:', error);
    res.status(500).json({ error: 'Recommendation failed', details: error.message });
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

    const enhancedContext = {
      ...context,
      dietary
    };

    const suggestion = await getWeatherAndDietaryAwareSuggestion(location, mood, enhancedContext);

    res.json({
      success: true,
      ...suggestion,
      meta: {
        tool: "get_food_suggestion",
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
      aiFoodService.setLocationFromRequest(location);
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
      quick: true
    };

    const suggestion = await getWeatherAndDietaryAwareSuggestion(location, autoMood, enhancedContext);

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

    const culturalContext = aiFoodService.userCulture || {
      mainCuisine: "Local",
      popularFoods: ["Local Food 1", "Local Food 2"],
      comfortFoods: ["Comfort 1", "Comfort 2"],
      culturalNotes: "Rich food culture"
    };

    if (dietary.length > 0) {
      culturalContext.dietaryFriendlyOptions = {};
      for (const restriction of dietary) {
        const friendlyFoods = [];
        for (const food of culturalContext.popularFoods) {
          const compliance = await smartDietaryService.validateCompliance(food, [restriction]);
          if (compliance.compliant) {
            friendlyFoods.push(food);
          }
        }
        culturalContext.dietaryFriendlyOptions[restriction] = friendlyFoods;
      }
    }

    res.json({
      success: true,
      ...culturalContext,
      meta: {
        tool: "get_cultural_food_context",
        location: `${location.city || location.country}`,
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

const recommendSchema = Joi.object({
  location: Joi.object({
    city: Joi.string().optional(),
    country: Joi.string().required(),
    country_code: Joi.string().length(2).uppercase().required()
  }).optional(),
  mood_text: Joi.string().optional(),
  mood_ids: Joi.array().items(
    Joi.string().valid('TIRED', 'STRESSED', 'CELEBRATING', 'HUNGRY', 'POST_WORKOUT', 'SICK', 'FOCUSED', 'RELAX', 'ADVENTUROUS')
  ).min(1).required(),
  dietary: Joi.array().items(
    Joi.string().valid('vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'keto', 'halal', 'kosher')
  ).optional(),
  budget: Joi.string().valid('low', 'medium', 'high').optional(),
  social: Joi.string().valid('solo', 'date', 'family', 'friends', 'work').optional()
});

// Validation middleware
function validateRequest(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { stripUnknown: true });
    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        details: error.details.map(d => ({ field: d.path.join('.'), message: d.message }))
      });
    }
    req.body = value;
    next();
  };
}

// Helper functions
function textToMoodIds(text) {
  if (!text) return [];
  const moodMap = {
    'tired': 'TIRED', 'exhausted': 'TIRED', 'stressed': 'STRESSED',
    'celebrating': 'CELEBRATING', 'happy': 'CELEBRATING', 'hungry': 'HUNGRY',
    'workout': 'POST_WORKOUT', 'sick': 'SICK', 'focus': 'FOCUSED', 'relax': 'RELAX'
  };
  
  const detectedMoods = [];
  const textLower = text.toLowerCase();
  
  for (const [keyword, moodId] of Object.entries(moodMap)) {
    if (textLower.includes(keyword)) {
      detectedMoods.push(moodId);
    }
  }
  
  return [...new Set(detectedMoods)];
}

function calculateConfidence(food, moodIds, context) {
  let confidence = 75;
  if (moodIds.length === 1) confidence += 10;
  if (context.dietary && context.dietary.length > 0) confidence -= 5;
  return Math.min(confidence, 95);
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
      const suggestion = await getAIFoodSuggestion(autoMood, { location, dietary, quick: true });
      
      res.json({
        success: true,
        request_id: req.requestId,
        decision: suggestion.food?.name || 'Good Food Choice',
        country_code: location?.country_code || 'US',
        explanation: suggestion.friendResponse || suggestion.description,
        dietaryNote: dietary.length > 0 ? `Filtered for: ${dietary.join(', ')}` : null,
        processingTimeMs: Date.now() - startTime
      });
      
    } catch (error) {
      console.error('Quick decision error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        request_id: req.requestId
      });
    }
  }
);

// POST /v1/recommend - Full recommendation (requires auth)
app.post('/v1/recommend',
  authenticateApiKey,
  countUsage,
  validateRequest(recommendSchema),
  async (req, res) => {
    const startTime = Date.now();
    
    try {
      const { location, mood_text, mood_ids, dietary = [], budget, social } = req.body;
      
      // Merge mood_text into mood_ids
      let resolvedMoods = [...mood_ids];
      if (mood_text) {
        const textMoods = textToMoodIds(mood_text);
        resolvedMoods = [...new Set([...resolvedMoods, ...textMoods])];
      }
      
      // Use your existing AI service
      const primaryMood = resolvedMoods[0] || 'HUNGRY';
      const suggestion = await getAIFoodSuggestion(primaryMood, { 
        location, 
        dietary, 
        budget, 
        social 
      });
      
      // Enhance the response to match vision schema
      const enhancedFood = {
        dish_id: suggestion.food?.id || `dish_${Date.now()}`,
        name: suggestion.food?.name || 'Great Choice',
        emoji: suggestion.food?.emoji || '🍽️',
        country: location?.country || 'Local',
        country_code: location?.country_code || 'US',
        category: suggestion.food?.category || 'comfort',
        tags: suggestion.food?.tags || [],
        suitability: {
          vegetarian: !suggestion.food?.name?.toLowerCase().includes('meat'),
          vegan: false,
          gluten_free: false,
          halal_friendly: true,
          kosher_friendly: true
        }
      };
      
      res.json({
        success: true,
        request_id: req.requestId,
        context: {
          resolved_moods: resolvedMoods,
          location: location,
          dietary: dietary
        },
        food: enhancedFood,
        friendMessage: suggestion.friendResponse || suggestion.description,
        reasoning: suggestion.reason || 'Perfect choice for your current situation',
        culturalNote: suggestion.culturalNote || 'Fits your cultural preferences',
        availabilityNote: suggestion.availabilityNote || 'Available in your area',
        alternatives: suggestion.alternatives || [],
        confidence: calculateConfidence(enhancedFood, resolvedMoods, { dietary }),
        processingTimeMs: Date.now() - startTime
      });
      
    } catch (error) {
      console.error('Recommendation error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        request_id: req.requestId
      });
    }
  }
);

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