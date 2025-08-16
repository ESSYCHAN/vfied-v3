// VFIED MCP Server - Complete with Weather + Dietary Intelligence
import express from 'express';
import cors from 'cors';
import { aiFoodService, getAIFoodSuggestion, getAIQuickDecision, updateAIFeedback } from './src/services/aiFoodService.js';

const app = express();
const PORT = process.env.MCP_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Dietary Intelligence Service
class DietaryService {
  constructor() {
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
      'nut-free': {
        allowed: ['seeds', 'legumes'],
        forbidden: ['almonds', 'walnuts', 'pecans', 'cashews', 'pistachios', 'hazelnuts', 'brazil nuts', 'pine nuts'],
        description: 'No tree nuts'
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

  validateCompliance(foodName, dietaryRestrictions) {
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

      // Simple keyword-based compliance check
      const isCompliant = this.checkFoodCompliance(foodName, rule);
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
      alternatives: overallCompliant ? [] : this.suggestAlternatives(foodName, dietaryRestrictions)
    };
  }

  checkFoodCompliance(foodName, rule) {
    const foodLower = foodName.toLowerCase();
    
    // Check if food contains forbidden ingredients
    for (const forbidden of rule.forbidden) {
      if (foodLower.includes(forbidden.toLowerCase())) {
        return false;
      }
    }
    
    // Additional specific checks
    if (rule.description.includes('No animal products') && 
        (foodLower.includes('meat') || foodLower.includes('chicken') || 
         foodLower.includes('beef') || foodLower.includes('cheese'))) {
      return false;
    }

    return true;
  }

  suggestAlternatives(foodName, dietaryRestrictions) {
    const alternatives = [];
    const foodLower = foodName.toLowerCase();

    // Generate alternatives based on dietary restrictions
    if (dietaryRestrictions.includes('vegan')) {
      if (foodLower.includes('burger')) alternatives.push('Beyond Burger', 'Black Bean Burger');
      if (foodLower.includes('pizza')) alternatives.push('Vegan Pizza with Cashew Cheese');
      if (foodLower.includes('pasta')) alternatives.push('Pasta with Marinara Sauce');
    }

    if (dietaryRestrictions.includes('gluten-free')) {
      if (foodLower.includes('bread')) alternatives.push('Gluten-Free Bread');
      if (foodLower.includes('pasta')) alternatives.push('Rice Noodles', 'Quinoa Pasta');
      if (foodLower.includes('pizza')) alternatives.push('Cauliflower Crust Pizza');
    }

    return alternatives.slice(0, 3); // Limit to 3 alternatives
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
CRITICAL DIETARY REQUIREMENTS:
User follows: ${restrictions}

MANDATORY RULES:
1. ONLY suggest foods that are 100% compatible with ALL listed dietary restrictions
2. If suggesting a dish that could be modified, specify the dietary-compliant version
3. Never suggest foods containing forbidden ingredients
4. When in doubt, choose clearly compliant options
5. Mention dietary compliance in your reasoning

FORBIDDEN for this user: ${this.getForbiddenIngredients(dietaryRestrictions).join(', ')}
SAFE options: ${this.getSafeIngredients(dietaryRestrictions).join(', ')}
`;
  }

  getForbiddenIngredients(dietaryRestrictions) {
    const forbidden = new Set();
    
    for (const restriction of dietaryRestrictions) {
      const rule = this.dietaryRules[restriction.toLowerCase()];
      if (rule) {
        rule.forbidden.forEach(item => forbidden.add(item));
      }
    }
    
    return Array.from(forbidden);
  }

  getSafeIngredients(dietaryRestrictions) {
    const safe = new Set();
    
    for (const restriction of dietaryRestrictions) {
      const rule = this.dietaryRules[restriction.toLowerCase()];
      if (rule) {
        rule.allowed.forEach(item => safe.add(item));
      }
    }
    
    return Array.from(safe);
  }
}

// Weather Service Class (keeping your existing weather service)
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
    // Your existing weather simulation code
    const temp = this.getSimulatedTemp(location);
    const condition = this.getSimulatedCondition();
    
    return {
      temperature: temp,
      feelsLike: temp + Math.floor(Math.random() * 6) - 3,
      humidity: 40 + Math.floor(Math.random() * 40),
      condition,
      description: this.getWeatherDescription(condition),
      windSpeed: Math.floor(Math.random() * 15),
      cityName: location.city || 'Unknown',
      country: location.country || 'Unknown',
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
    const country = location.country || location.countryCode || 'US';
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

// Initialize services
const weatherService = new WeatherService();
const dietaryService = new DietaryService();

// Enhanced AI suggestion with weather + dietary intelligence
async function getWeatherAndDietaryAwareSuggestion(location, mood, context = {}) {
  try {
    // Get current weather
    const weather = location ? await weatherService.getCurrentWeather(location) : null;
    
    // Analyze weather impact
    const weatherImpact = weather ? weatherService.analyzeWeatherFoodImpact(weather) : null;
    
    // Build dietary prompt
    const dietaryPrompt = dietaryService.buildDietaryPrompt(context.dietary);
    
    // Enhanced context with weather and dietary
    const enhancedContext = {
      ...context,
      weather,
      weatherImpact,
      dietaryPrompt,
      includeRestaurants: context.includeRestaurants || false
    };
    
    // Get AI suggestion with full context
    const suggestion = await getAIFoodSuggestion(mood, enhancedContext);
    
    // Validate dietary compliance
    if (context.dietary && context.dietary.length > 0 && suggestion.food) {
      const compliance = dietaryService.validateCompliance(suggestion.food.name, context.dietary);
      suggestion.dietaryCompliance = compliance;
      suggestion.dietaryNote = compliance.compliant 
        ? `✅ This food meets all your dietary requirements: ${context.dietary.join(', ')}`
        : `⚠️ This suggestion may not meet your dietary requirements. ${compliance.warnings.join(' ')}`;
    }
    
    // Add weather reasoning
    if (suggestion && weather) {
      suggestion.weather = weather;
      suggestion.weatherReasoning = buildWeatherReasoning(weather, suggestion);
    }
    
    return suggestion;
    
  } catch (error) {
    console.error('Enhanced suggestion failed:', error);
    // Fallback to regular AI suggestion
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

// ==================== MCP ENDPOINTS ====================

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: "healthy",
    service: "VFIED Weather + Dietary Enhanced MCP Server",
    version: "1.2.0",
    timestamp: new Date().toISOString(),
    features: [
      "Weather intelligence",
      "Dietary restrictions support",
      "Cultural food awareness", 
      "Personal pattern learning"
    ],
    services: {
      ai: !!aiFoodService.openaiApiKey,
      weather: !!weatherService.openWeatherKey,
      dietary: true,
      location: !!aiFoodService.userLocation?.city,
      culture: !!aiFoodService.userCulture?.mainCuisine
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

    // Add dietary restrictions to context
    const enhancedContext = {
      ...context,
      dietary
    };

    // Use enhanced suggestion with weather and dietary awareness
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

    // Determine mood based on time of day
    const hour = new Date().getHours();
    let autoMood = 'random';
    
    if (hour >= 6 && hour <= 10) autoMood = 'tired';
    else if (hour >= 11 && hour <= 15) autoMood = 'hungry';
    else if (hour >= 17 && hour <= 22) autoMood = 'tired';
    else autoMood = 'lazy';

    // Enhanced context with dietary
    const enhancedContext = {
      ...context,
      dietary,
      quick: true
    };

    // Get enhanced suggestion
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
app.post('/mcp/validate_dietary_compliance', (req, res) => {
  try {
    const { foodName, dietary } = req.body;

    if (!foodName || !dietary) {
      return res.status(400).json({
        error: "Missing required parameters: foodName, dietary"
      });
    }

    const validation = dietaryService.validateCompliance(foodName, dietary);

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

// Cultural Context with Dietary Filtering
app.post('/mcp/get_cultural_food_context', async (req, res) => {
  try {
    const { location, dietary = [] } = req.body;

    if (!location?.country) {
      return res.status(400).json({
        error: "Missing required parameter: location.country"
      });
    }

    // Get cultural context (your existing logic)
    // This would need to be implemented in your aiFoodService
    const culturalContext = {
      mainCuisine: "Local",
      popularFoods: ["Local Food 1", "Local Food 2"],
      comfortFoods: ["Comfort 1", "Comfort 2"],
      culturalNotes: "Rich food culture"
    };

    // Filter foods by dietary restrictions if provided
    if (dietary.length > 0) {
      culturalContext.dietaryFriendlyOptions = {};
      for (const restriction of dietary) {
        culturalContext.dietaryFriendlyOptions[restriction] = 
          culturalContext.popularFoods.filter(food => 
            dietaryService.validateCompliance(food, [restriction]).compliant
          );
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

// Feedback endpoint (existing)
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

// Start server
app.listen(PORT, () => {
  console.log(`🌦️ VFIED Weather + Dietary Enhanced MCP Server running on port ${PORT}`);
  console.log(`🤖 AI Status: ${aiFoodService.openaiApiKey ? 'Connected' : 'Local Mode'}`);
  console.log(`🌤️ Weather API: ${weatherService.openWeatherKey ? 'Connected' : 'Simulated'}`);
  console.log(`🌱 Dietary Intelligence: Active`);
  console.log(`🔗 Health: http://localhost:${PORT}/health`);
});

export default app;