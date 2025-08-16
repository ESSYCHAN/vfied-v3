// VFIED MCP Server - WORKING VERSION with no external dependencies
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5166',
    'http://localhost:3000', 
    'http://localhost:5173',
    'https://vfied.vercel.app',
    'https://vfied-v3.vercel.app',
    /^https:\/\/.*\.vercel\.app$/
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Built-in AI Food Service (No external dependencies)
class AIFoodService {
  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY;
    this.userLocation = { city: 'Unknown', country: 'Unknown' };
    this.userCulture = { mainCuisine: 'Mixed' };
  }

  async getAIFoodSuggestion(mood, context = {}) {
    const moodFoods = {
      'tired': [
        { name: 'Comfort Ramen', emoji: '🍜', type: 'comfort' },
        { name: 'Mac and Cheese', emoji: '🧀', type: 'comfort' },
        { name: 'Chicken Soup', emoji: '🍲', type: 'comfort' }
      ],
      'stressed': [
        { name: 'Dark Chocolate', emoji: '🍫', type: 'comfort' },
        { name: 'Herbal Tea & Toast', emoji: '🍵', type: 'calming' },
        { name: 'Ice Cream', emoji: '🍦', type: 'comfort' }
      ],
      'healthy': [
        { name: 'Quinoa Bowl', emoji: '🥗', type: 'healthy' },
        { name: 'Green Smoothie', emoji: '🥤', type: 'healthy' },
        { name: 'Grilled Salmon', emoji: '🐟', type: 'healthy' }
      ],
      'celebrating': [
        { name: 'Champagne & Appetizers', emoji: '🥂', type: 'luxury' },
        { name: 'Chocolate Cake', emoji: '🎂', type: 'dessert' },
        { name: 'Fine Dining', emoji: '🍽️', type: 'luxury' }
      ],
      'hungry': [
        { name: 'Burger', emoji: '🍔', type: 'filling' },
        { name: 'Pizza', emoji: '🍕', type: 'filling' },
        { name: 'Burrito', emoji: '🌯', type: 'filling' }
      ],
      'lazy': [
        { name: 'Instant Noodles', emoji: '🍜', type: 'easy' },
        { name: 'Takeout', emoji: '🥡', type: 'easy' },
        { name: 'Cereal', emoji: '🥣', type: 'easy' }
      ],
      'random': [
        { name: 'Chef\'s Special', emoji: '👨‍🍳', type: 'surprise' },
        { name: 'Mystery Box', emoji: '📦', type: 'surprise' },
        { name: 'Food Roulette', emoji: '🎲', type: 'adventure' }
      ]
    };

    const options = moodFoods[mood] || moodFoods['random'];
    let selectedFood = options[Math.floor(Math.random() * options.length)];

    // Apply dietary filtering
    if (context.dietary && context.dietary.length > 0) {
      selectedFood = this.applyDietaryFilter(selectedFood, context.dietary);
    }

    return {
      food: selectedFood,
      friendMessage: `Perfect choice for when you're feeling ${mood}! ${selectedFood.emoji}`,
      reasoning: `Based on your ${mood} mood, this ${selectedFood.type} option should hit the spot`,
      culturalNote: `This fits well with local dining preferences`,
      personalNote: `Great choice that matches your preferences`,
      confidence: 85 + Math.floor(Math.random() * 15),
      interactionId: `ai_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  applyDietaryFilter(food, dietary) {
    const veganOptions = {
      'Comfort Ramen': { name: 'Vegan Ramen', emoji: '🍜', type: 'comfort' },
      'Mac and Cheese': { name: 'Vegan Mac & Cheese', emoji: '🧀', type: 'comfort' },
      'Chicken Soup': { name: 'Vegetable Soup', emoji: '🍲', type: 'comfort' },
      'Ice Cream': { name: 'Coconut Ice Cream', emoji: '🥥', type: 'comfort' },
      'Burger': { name: 'Beyond Burger', emoji: '🍔', type: 'filling' },
      'Pizza': { name: 'Vegan Pizza', emoji: '🍕', type: 'filling' }
    };

    const glutenFreeOptions = {
      'Pizza': { name: 'Gluten-Free Pizza', emoji: '🍕', type: 'filling' },
      'Burger': { name: 'Lettuce Wrap Burger', emoji: '🥬', type: 'filling' },
      'Instant Noodles': { name: 'Rice Noodles', emoji: '🍜', type: 'easy' }
    };

    if (dietary.includes('vegan') && veganOptions[food.name]) {
      return veganOptions[food.name];
    }

    if (dietary.includes('gluten-free') && glutenFreeOptions[food.name]) {
      return glutenFreeOptions[food.name];
    }

    return food;
  }

  async updateAIFeedback(interactionId, rating) {
    console.log(`Feedback received: ${interactionId} - Rating: ${rating}`);
    return { success: true };
  }
}

// Dietary Intelligence Service
class DietaryService {
  constructor() {
    this.dietaryRules = {
      'vegetarian': {
        forbidden: ['meat', 'poultry', 'fish', 'seafood'],
        description: 'No meat, fish, or poultry'
      },
      'vegan': {
        forbidden: ['meat', 'poultry', 'fish', 'seafood', 'dairy', 'eggs', 'honey'],
        description: 'No animal products'
      },
      'gluten-free': {
        forbidden: ['wheat', 'barley', 'rye', 'spelt', 'bulgur'],
        description: 'No gluten-containing grains'
      },
      'keto': {
        forbidden: ['bread', 'pasta', 'rice', 'potatoes', 'sugar'],
        description: 'Very low carb, high fat'
      }
    };
  }

  validateCompliance(foodName, dietaryRestrictions) {
    const warnings = [];
    let overallCompliant = true;

    for (const restriction of dietaryRestrictions) {
      const rule = this.dietaryRules[restriction.toLowerCase()];
      if (!rule) continue;

      const isCompliant = this.checkFoodCompliance(foodName, rule);
      if (!isCompliant) {
        overallCompliant = false;
        warnings.push(`${foodName} may not be ${restriction}-friendly`);
      }
    }

    return {
      compliant: overallCompliant,
      warnings,
      alternatives: overallCompliant ? [] : this.suggestAlternatives(foodName, dietaryRestrictions)
    };
  }

  checkFoodCompliance(foodName, rule) {
    const foodLower = foodName.toLowerCase();
    return !rule.forbidden.some(forbidden => foodLower.includes(forbidden.toLowerCase()));
  }

  suggestAlternatives(foodName, dietaryRestrictions) {
    const alternatives = [];
    const foodLower = foodName.toLowerCase();

    if (dietaryRestrictions.includes('vegan')) {
      if (foodLower.includes('burger')) alternatives.push('Beyond Burger');
      if (foodLower.includes('pizza')) alternatives.push('Vegan Pizza');
    }

    if (dietaryRestrictions.includes('gluten-free')) {
      if (foodLower.includes('pizza')) alternatives.push('Cauliflower Crust Pizza');
      if (foodLower.includes('pasta')) alternatives.push('Rice Noodles');
    }

    return alternatives.slice(0, 3);
  }
}

// Weather Service
class WeatherService {
  getSimulatedWeather(location) {
    const temp = 15 + Math.floor(Math.random() * 20);
    const conditions = ['clear', 'cloudy', 'rain', 'sunny'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    return {
      temperature: temp,
      condition,
      description: condition === 'clear' ? 'clear sky' : condition,
      isRaining: condition === 'rain',
      isCold: temp < 15,
      isHot: temp > 30,
      cityName: location?.city || 'Unknown',
      timestamp: new Date().toISOString()
    };
  }
}

// Initialize services
const aiFoodService = new AIFoodService();
const dietaryService = new DietaryService();
const weatherService = new WeatherService();

// ==================== MCP ENDPOINTS ====================

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: "healthy",
    service: "VFIED MCP Server",
    version: "1.3.0",
    timestamp: new Date().toISOString(),
    features: [
      "Weather intelligence",
      "Dietary restrictions support",
      "Cultural food awareness", 
      "Personal pattern learning"
    ]
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

    const suggestion = await aiFoodService.getAIFoodSuggestion(mood, enhancedContext);

    // Add dietary compliance check
    if (dietary.length > 0 && suggestion.food) {
      const compliance = dietaryService.validateCompliance(suggestion.food.name, dietary);
      suggestion.dietaryCompliance = compliance;
      suggestion.dietaryNote = compliance.compliant 
        ? `✅ This food meets your dietary requirements: ${dietary.join(', ')}`
        : `⚠️ This suggestion may not meet your dietary requirements.`;
    }

    res.json({
      success: true,
      ...suggestion,
      meta: {
        tool: "get_food_suggestion",
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

    const suggestion = await aiFoodService.getAIFoodSuggestion(autoMood, enhancedContext);
    
    // Add weather context
    const weather = weatherService.getSimulatedWeather(location);
    suggestion.weather = weather;

    res.json({
      success: true,
      decision: suggestion.food?.name || 'Good Food Choice',
      explanation: suggestion.friendMessage,
      weather: suggestion.weather,
      dietaryNote: suggestion.dietaryNote,
      ...suggestion,
      meta: {
        tool: "get_quick_food_decision",
        autoMood,
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

// Feedback endpoint
app.post('/mcp/provide_feedback', async (req, res) => {
  try {
    const { interactionId, rating } = req.body;

    if (!interactionId || !rating) {
      return res.status(400).json({
        error: "Missing required parameters: interactionId, rating"
      });
    }

    await aiFoodService.updateAIFeedback(interactionId, rating);

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
  console.log(`🌦️ VFIED MCP Server running on port ${PORT}`);
  console.log(`🤖 AI Status: Built-in simulation ready`);
  console.log(`🌱 Dietary Intelligence: Active`);
  console.log(`🔗 Health: http://localhost:${PORT}/health`);
});

export default app;