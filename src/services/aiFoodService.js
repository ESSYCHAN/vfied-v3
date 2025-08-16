// VFIED Complete AI Food Service - OpenAI + Cultural + Personal + MCPs
// ALL PHASES IMPLEMENTATION

import { db, COLLECTIONS } from '../firebase.js';
import { collection, addDoc, query, where, orderBy, limit, getDocs, updateDoc, doc } from 'firebase/firestore';

class AIFoodService {
  constructor() {
    this.openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;
    this.weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
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

  // ==================== PHASE 1: LOCATION + CULTURAL INTELLIGENCE ====================
  
  async detectLocation() {
    try {
      console.log('📍 Detecting location...');
      
      // Get precise location
      const position = await this.getCurrentPosition();
      this.userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: new Date().toISOString()
      };

      // Reverse geocode for cultural context
      const locationData = await this.reverseGeocode(this.userLocation);
      this.userLocation = { ...this.userLocation, ...locationData };
      
      console.log('📍 Location detected:', this.userLocation.city, this.userLocation.country);
      
    } catch (error) {
      console.log('📍 Using fallback location context');
      this.userLocation = { 
        city: 'Unknown', 
        country: 'Unknown',
        countryCode: 'US' // Default fallback
      };
    }
  }

  async getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes cache
      });
    });
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
      'KE': { // Kenya
        mainCuisine: 'East African',
        popularFoods: ['ugali', 'nyama choma', 'sukuma wiki', 'pilau', 'chapati'],
        comfortFoods: ['ugali with stew', 'mandazi', 'chai'],
        streetFoods: ['roasted maize', 'samosa', 'mutura']
      },
      'NG': { // Nigeria
        mainCuisine: 'West African',
        popularFoods: ['jollof rice', 'pounded yam', 'egusi soup', 'suya', 'plantain'],
        comfortFoods: ['jollof rice', 'pepper soup', 'puff puff'],
        streetFoods: ['suya', 'boli', 'akara']
      },
      'IN': { // India
        mainCuisine: 'Indian',
        popularFoods: ['dal rice', 'roti', 'biryani', 'curry', 'chapati'],
        comfortFoods: ['dal rice', 'khichdi', 'chai'],
        streetFoods: ['samosa', 'chaat', 'vada pav']
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

  // ==================== PHASE 2: ADVANCED AI PERSONALIZATION ====================

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
      this.interactionId = await this.recordInteraction(mood, suggestion, fullContext);
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
      // Existing context...
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
      patterns: await this.getPersonalPatterns(mood),
      preferences: this.getUserPreferences(mood),
      
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
    const recentChoicesText = this.formatPersonalHistory(context.personalHistory);
    const patternsText = this.formatPersonalPatterns(context.patterns);
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
  
  PERSONAL LEARNING:
  Recent choices: ${recentChoicesText}
  Learned patterns: ${patternsText}
  
  WEATHER CONTEXT:
  ${this.getWeatherFoodAdvice(context.weather)}
  
  CURRENT CONTEXT:
  ${situationText}
  
  TASK: Suggest 1 perfect food option considering:
  1. Their exact location and what's actually available there
  2. Current weather conditions and temperature
  3. Their personal preferences and patterns
  4. Current mood, time, and weather
  5. Local cultural context and authentic options
  6. What they can realistically get right now
  
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
    
    if (weather.isSnowing) {
      advice.push('Snowy weather - hearty, warming foods are ideal');
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
      return {
        food: {
          id: 'ai-suggestion',
          name: 'AI Suggestion',
          emoji: '🤖',
          category: 'comfort'
        },
        description: "Here's what I think would work for you right now!",
        friendResponse: "Here's what I think would work for you right now!",
        confidence: 70,
        source: 'ai-fallback'
      };
    }
  }

  // ==================== PHASE 3: MCP INTEGRATION ====================

  async initializeContextSources() {
    // Initialize external context sources
    await this.setupWeatherService();
    await this.setupCalendarIntegration();
    await this.setupHealthIntegration();
    
    console.log('🔗 Context sources initialized');
  }

  async getWeatherContext() {
    if (!this.weatherApiKey) {
      return this.getSimulatedWeather();
    }
  
    try {
      if (!this.userLocation?.lat) {
        return this.getSimulatedWeather();
      }
  
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${this.userLocation.lat}&lon=${this.userLocation.lng}&appid=${this.weatherApiKey}&units=metric`
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
    } catch (error) {
      console.error('Weather fetch error:', error);
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

  async setupWeatherService() {
    // Weather service setup
    console.log('🌤️ Weather service configured');
  }

  async setupCalendarIntegration() {
    // Calendar integration would go here
    // For now, simulate based on time patterns
    console.log('📅 Calendar integration simulated');
  }

  async setupHealthIntegration() {
    // Health data integration would go here
    // For now, simulate basic health context
    console.log('💪 Health integration simulated');
  }

  async getCalendarContext() {
    // Simulated calendar context
    const hour = new Date().getHours();
    const isWorkDay = new Date().getDay() >= 1 && new Date().getDay() <= 5;
    
    return {
      nextMeeting: isWorkDay && hour < 17 ? 'work meeting' : 'free time',
      isWorkHours: isWorkDay && hour >= 9 && hour <= 17,
      stressLevel: isWorkDay && hour >= 14 && hour <= 16 ? 'high' : 'medium',
      hasTimeToEat: true,
      socialPlans: hour >= 18 ? 'possible dinner plans' : 'solo time'
    };
  }

  async getHealthContext() {
    // Simulated health context
    return {
      lastWorkout: this.getLastWorkoutTime(),
      energyLevel: this.getEnergyLevel(),
      hydrationLevel: 'medium',
      sleepQuality: 'good',
      stepsToday: Math.floor(Math.random() * 8000) + 2000
    };
  }

  // ==================== PERSONAL LEARNING & PATTERNS ====================

  async loadPersonalHistory() {
    try {
      const q = query(
        collection(db, COLLECTIONS.DECISIONS),
        orderBy('timestamp', 'desc'),
        limit(50)
      );
      
      const querySnapshot = await getDocs(q);
      this.personalHistory = [];
      
      querySnapshot.forEach(doc => {
        this.personalHistory.push({ id: doc.id, ...doc.data() });
      });
      
      console.log(`📚 Loaded ${this.personalHistory.length} previous choices`);
    } catch (error) {
      console.error('Error loading personal history:', error);
      this.personalHistory = [];
    }
  }

  async getPersonalPatterns(mood) {
    try {
      const q = query(
        collection(db, COLLECTIONS.DECISIONS),
        where('mood', '==', mood),
        where('rating', '>=', 4),
        orderBy('timestamp', 'desc'),
        limit(20)
      );
      
      const querySnapshot = await getDocs(q);
      const goodChoices = [];
      
      querySnapshot.forEach(doc => {
        goodChoices.push(doc.data());
      });
      
      return this.analyzePatterns(goodChoices);
    } catch (error) {
      console.error('Error getting patterns:', error);
      return { confidence: 'low', patterns: [] };
    }
  }

  analyzePatterns(choices) {
    if (choices.length === 0) {
      return { confidence: 'new', patterns: [] };
    }
    
    const patterns = {
      preferredCuisines: this.getTopItems(choices, 'cuisineType'),
      timePreferences: this.getTimePatterns(choices),
      weatherPreferences: this.getWeatherPatterns(choices),
      locationPreferences: this.getLocationPatterns(choices),
      confidence: choices.length >= 5 ? 'high' : choices.length >= 2 ? 'medium' : 'low'
    };
    
    return patterns;
  }

  async recordInteraction(mood, suggestion, context) {
    try {
      const interaction = {
        mood,
        foodId: suggestion.food.id,
        foodName: suggestion.food.name,
        source: 'ai',
        context: {
          location: context.location.city,
          weather: context.weather?.condition,
          time: context.time,
          cultural: context.culture?.mainCuisine
        },
        suggestion: {
          reasoning: suggestion.reason,
          culturalNote: suggestion.culturalNote,
          confidence: suggestion.confidence
        },
        timestamp: new Date().toISOString(),
        rating: null, // Will be updated when user provides feedback
        userLocation: context.location
      };

      const docRef = await addDoc(collection(db, COLLECTIONS.DECISIONS), interaction);
      return docRef.id;
    } catch (error) {
      console.error('Error recording interaction:', error);
      return null;
    }
  }

  async updateRating(interactionId, rating) {
    if (!interactionId) return;
    
    try {
      await updateDoc(doc(db, COLLECTIONS.DECISIONS, interactionId), {
        rating,
        ratedAt: new Date().toISOString()
      });
      
      // Trigger pattern relearning for positive ratings
      if (rating >= 4) {
        this.schedulePatternUpdate();
      }
      
      console.log(`✅ Rating updated: ${rating}/5`);
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  }

  // ==================== FALLBACK FUNCTIONS ====================

  getFallbackSuggestion(mood) {
    const fallbackFoods = {
      'tired': { name: 'Order Something Good', emoji: '🍕' },
      'stressed': { name: 'Comfort Food', emoji: '🍜' },
      'celebrating': { name: 'Treat Yourself', emoji: '🎂' },
      'healthy': { name: 'Something Nutritious', emoji: '🥗' },
      'hungover': { name: 'Recovery Food', emoji: '🍔' },
      'default': { name: 'Good Food', emoji: '🍽️' }
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
      reason: 'Fallback suggestion - AI service unavailable',
      confidence: 60,
      source: 'fallback'
    };
  }

  // ==================== UTILITY FUNCTIONS ====================

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

  getLastWorkoutTime() {
    const hours = Math.floor(Math.random() * 48);
    return hours < 24 ? `${hours} hours ago` : `${Math.floor(hours/24)} days ago`;
  }

  getEnergyLevel() {
    const hour = new Date().getHours();
    if (hour < 8) return 'low';
    if (hour < 12) return 'high';
    if (hour < 15) return 'medium';
    if (hour < 18) return 'medium';
    return 'low';
  }

  formatPersonalHistory(history) {
    if (!history || history.length === 0) return 'No previous choices recorded';
    
    return history.slice(0, 5).map(choice => 
      `${choice.mood}: ${choice.foodName} (${choice.rating ? choice.rating + '/5' : 'unrated'})`
    ).join(', ');
  }

  formatPersonalPatterns(patterns) {
    if (!patterns || patterns.confidence === 'new') return 'Still learning your preferences';
    
    let formatted = [];
    if (patterns.preferredCuisines?.length > 0) {
      formatted.push(`Prefers: ${patterns.preferredCuisines.slice(0, 2).join(', ')}`);
    }
    if (patterns.confidence) {
      formatted.push(`Confidence: ${patterns.confidence}`);
    }
    
    return formatted.join(', ') || 'Building your preference profile';
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

  getUserPreferences(mood) {
    // Extract preferences from history
    const moodChoices = this.personalHistory.filter(choice => 
      choice.mood === mood && choice.rating >= 4
    );
    
    return {
      favoriteChoices: moodChoices.slice(0, 3),
      hasPreferences: moodChoices.length > 0
    };
  }

  getTopItems(choices, field) {
    const counts = {};
    choices.forEach(choice => {
      if (choice[field]) {
        counts[choice[field]] = (counts[choice[field]] || 0) + 1;
      }
    });
    
    return Object.entries(counts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([item]) => item);
  }

  getTimePatterns(choices) {
    const patterns = {};
    choices.forEach(choice => {
      if (choice.context?.time?.timeOfDay) {
        const time = choice.context.time.timeOfDay;
        patterns[time] = (patterns[time] || 0) + 1;
      }
    });
    return patterns;
  }

  getWeatherPatterns(choices) {
    const patterns = {};
    choices.forEach(choice => {
      if (choice.context?.weather) {
        const weather = choice.context.weather;
        patterns[weather] = (patterns[weather] || 0) + 1;
      }
    });
    return patterns;
  }

  getLocationPatterns(choices) {
    const patterns = {};
    choices.forEach(choice => {
      if (choice.context?.location) {
        const location = choice.context.location;
        patterns[location] = (patterns[location] || 0) + 1;
      }
    });
    return patterns;
  }

  schedulePatternUpdate() {
    clearTimeout(this.patternUpdateTimeout);
    this.patternUpdateTimeout = setTimeout(() => {
      this.loadPersonalHistory();
      this.analyzePersonalPatterns();
    }, 5000);
  }

  analyzePersonalPatterns() {
    console.log('🧠 Analyzing personal patterns...');
    // Additional pattern analysis logic here
  }
}

// Create singleton instance
export const aiFoodService = new AIFoodService();

// Export main functions for the app
export const getAIFoodSuggestion = async (mood, context = {}) => {
  console.log(`🤖 Getting AI suggestion for mood: ${mood} via MCP`);
  
  try {
    const response = await fetch('https://vfied-mcp-server.onrender.com/mcp/get_food_suggestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mood,
        location: {
          city: aiFoodService.userLocation?.city || 'Unknown',
          country: aiFoodService.userLocation?.country || 'Unknown',
          countryCode: aiFoodService.userLocation?.countryCode || 'US'
        },
        context: {
          budget: context.budget || 'medium',
          socialSituation: context.socialSituation || 'solo',
          timeConstraint: context.quick ? 'quick' : 'normal'
        },
        userId: context.userId || 'anonymous'
      })
    });

    if (!response.ok) {
      throw new Error(`MCP server error: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ MCP mood suggestion received:', data);
    
    return {
      ...data,
      source: 'mcp'
    };

  } catch (error) {
    console.error('❌ MCP mood call failed, using fallback:', error);
    return await aiFoodService.getPersonalizedFoodSuggestion(mood, context);
  }
};

// REPLACE this function in aiFoodService.js:
export const getAIQuickDecision = async (context = {}) => {
  console.log('🎲 Getting AI quick decision from MCP...');
  
  try {
    const response = await fetch('https://vfied-mcp-server.onrender.com/mcp/get_quick_food_decision', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        location: aiFoodService.userLocation,
        userId: context.userId || 'anonymous',
        context: {
          includeRestaurants: context.includeRestaurants,
          quick: true,
          budget: context.budget || 'medium',
          timeConstraint: 'quick'
        }
      })
    });

    if (!response.ok) {
      throw new Error(`MCP server error: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ MCP response received:', data);
    
    return {
      ...data,
      source: 'mcp',
      interactionId: data.interactionId || Date.now().toString()
    };

  } catch (error) {
    console.error('❌ MCP call failed, using fallback:', error);
    
    // Fallback to your existing direct AI call
    return await aiFoodService.getPersonalizedFoodSuggestion('random', context);
  }
};

export const updateAIFeedback = async (interactionId, rating) => {
  console.log(`📊 Updating feedback: ${rating}/5`);
  return await aiFoodService.updateRating(interactionId, rating);
};

export const getAILocationContext = () => {
  return {
    location: aiFoodService.userLocation,
    culture: aiFoodService.userCulture
  };
};

export const getAIServiceStatus = () => {
  return {
    hasOpenAI: !!aiFoodService.openaiApiKey,
    hasLocation: !!aiFoodService.userLocation?.city,
    hasCulture: !!aiFoodService.userCulture?.mainCuisine,
    hasHistory: aiFoodService.personalHistory.length > 0
  };
};