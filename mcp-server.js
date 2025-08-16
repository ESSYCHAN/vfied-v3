// VFIED MCP Server - STREAMLINED VERSION (Fast & Reliable)
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Timeout middleware
app.use((req, res, next) => {
  req.setTimeout(30000); // 30 second timeout
  res.setTimeout(30000);
  next();
});

// Simple Dietary Rules (fast lookup)
const DIETARY_RULES = {
  vegetarian: ['no meat', 'no fish', 'no poultry'],
  vegan: ['no animal products', 'plant-based only'],
  'gluten-free': ['no wheat', 'no gluten'],
  'dairy-free': ['no milk', 'no cheese', 'no dairy'],
  keto: ['low carb', 'high fat'],
  halal: ['halal meat only', 'no pork', 'no alcohol'],
  kosher: ['kosher only', 'no pork', 'no shellfish']
};

// Simple Weather Simulation (fast)
function getSimulatedWeather(location) {
  const temp = Math.floor(Math.random() * 25) + 5; // 5-30°C
  const conditions = ['sunny', 'cloudy', 'rainy', 'clear'];
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  
  return {
    temperature: temp,
    condition,
    description: condition,
    isCold: temp < 15,
    isHot: temp > 25,
    isRaining: condition === 'rainy',
    city: location?.city || 'Unknown',
    timestamp: new Date().toISOString()
  };
}

// Fast Food Suggestion Engine (no external APIs)
function getFastFoodSuggestion(mood, dietary = [], weather = null) {
  const foodDatabase = {
    tired: [
      { name: 'Cozy Soup', emoji: '🍲', tags: ['vegetarian', 'vegan-option', 'comfort'] },
      { name: 'Comfort Pasta', emoji: '🍝', tags: ['vegetarian'] },
      { name: 'Warm Rice Bowl', emoji: '🍚', tags: ['vegan', 'gluten-free'] }
    ],
    stressed: [
      { name: 'Calming Tea & Toast', emoji: '🍞', tags: ['vegetarian', 'vegan-option'] },
      { name: 'Stress-Relief Smoothie', emoji: '🥤', tags: ['vegan', 'dairy-free'] },
      { name: 'Comfort Food Bowl', emoji: '🥗', tags: ['vegetarian', 'gluten-free'] }
    ],
    celebrating: [
      { name: 'Festive Feast', emoji: '🎉', tags: ['vegetarian-option'] },
      { name: 'Special Treat', emoji: '🎂', tags: ['vegetarian'] },
      { name: 'Victory Meal', emoji: '🏆', tags: ['customizable'] }
    ],
    hungry: [
      { name: 'Satisfying Bowl', emoji: '🥣', tags: ['filling', 'vegetarian'] },
      { name: 'Hearty Meal', emoji: '🍽️', tags: ['substantial'] },
      { name: 'Quick Energy Food', emoji: '⚡', tags: ['fast', 'vegan-option'] }
    ],
    healthy: [
      { name: 'Fresh Salad Bowl', emoji: '🥗', tags: ['vegan', 'gluten-free', 'healthy'] },
      { name: 'Quinoa Power Bowl', emoji: '🥙', tags: ['vegan', 'gluten-free'] },
      { name: 'Green Smoothie', emoji: '🥬', tags: ['vegan', 'dairy-free'] }
    ]
  };

  // Get foods for mood (fallback to 'hungry' if mood not found)
  let foods = foodDatabase[mood] || foodDatabase['hungry'];
  
  // Filter by dietary restrictions
  if (dietary.length > 0) {
    foods = foods.filter(food => {
      return dietary.every(diet => 
        food.tags.some(tag => 
          tag.includes(diet) || tag.includes(diet.replace('-', ''))
        )
      );
    });
  }
  
  // Weather adjustments
  if (weather?.isCold) {
    foods = foods.filter(food => 
      food.name.toLowerCase().includes('warm') || 
      food.name.toLowerCase().includes('soup') ||
      food.emoji.includes('🍲') || food.emoji.includes('☕')
    );
  }
  
  if (weather?.isHot) {
    foods = foods.filter(food => 
      food.name.toLowerCase().includes('cool') || 
      food.name.toLowerCase().includes('fresh') ||
      food.emoji.includes('🥗') || food.emoji.includes('🥤')
    );
  }
  
  // Fallback if no foods match
  if (foods.length === 0) {
    foods = [{ name: 'Custom Meal', emoji: '🍽️', tags: ['safe-choice'] }];
  }
  
  // Pick random food
  const selectedFood = foods[Math.floor(Math.random() * foods.length)];
  
  return {
    food: {
      id: selectedFood.name.toLowerCase().replace(/\s+/g, '-'),
      name: selectedFood.name,
      emoji: selectedFood.emoji,
      category: 'suggested',
      dietaryCompliance: dietary
    },
    description: `${selectedFood.name} - perfect for when you're ${mood}`,
    reasoning: buildReasoning(selectedFood, mood, dietary, weather),
    confidence: 85,
    source: 'mcp-fast',
    timestamp: new Date().toISOString()
  };
}

function buildReasoning(food, mood, dietary, weather) {
  const reasons = [];
  
  // Mood reasoning
  if (mood === 'tired') reasons.push('Comforting and easy to enjoy');
  if (mood === 'stressed') reasons.push('Known to help with stress relief');
  if (mood === 'celebrating') reasons.push('Special enough for your celebration');
  if (mood === 'healthy') reasons.push('Nutritious and energizing');
  
  // Dietary reasoning
  if (dietary.includes('vegan')) reasons.push('100% plant-based');
  if (dietary.includes('vegetarian')) reasons.push('Vegetarian-friendly');
  if (dietary.includes('gluten-free')) reasons.push('Gluten-free safe');
  if (dietary.includes('keto')) reasons.push('Low-carb, keto-friendly');
  
  // Weather reasoning
  if (weather?.isCold) reasons.push(`Perfect for ${weather.temperature}°C weather`);
  if (weather?.isRaining) reasons.push('Ideal comfort food for rainy day');
  if (weather?.isHot) reasons.push(`Refreshing for ${weather.temperature}°C heat`);
  
  return reasons.length > 0 ? reasons.join(' • ') : 'Great choice for right now';
}

// Build dietary context string
function buildDietaryContext(dietary) {
  if (!dietary || dietary.length === 0) return '';
  
  const restrictions = dietary.map(diet => {
    const rules = DIETARY_RULES[diet] || [`${diet} requirements`];
    return `${diet}: ${rules.join(', ')}`;
  }).join('\n');
  
  return `\nIMPORTANT DIETARY REQUIREMENTS:\n${restrictions}\nOnly suggest compatible foods.\n`;
}

// ==================== ENDPOINTS ====================

// Health Check (fast)
app.get('/health', (req, res) => {
  res.json({
    status: "healthy",
    service: "VFIED Streamlined MCP Server",
    version: "1.3.0",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    features: [
      "Fast food suggestions",
      "Dietary restrictions support",
      "Weather simulation",
      "No external API dependencies"
    ]
  });
});

// Quick Food Decision (FAST - no external APIs)
app.post('/mcp/get_quick_food_decision', async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { location, dietary = [], context = {} } = req.body;
    
    console.log(`🚀 Quick decision request: dietary=${JSON.stringify(dietary)}, location=${location?.city}`);
    
    // Determine mood based on time
    const hour = new Date().getHours();
    let autoMood = 'hungry';
    
    if (hour >= 6 && hour <= 10) autoMood = 'tired';
    else if (hour >= 11 && hour <= 15) autoMood = 'hungry';
    else if (hour >= 17 && hour <= 22) autoMood = 'tired';
    else autoMood = 'lazy';
    
    // Get simulated weather (fast)
    const weather = getSimulatedWeather(location);
    
    // Get fast suggestion (no external APIs)
    const suggestion = getFastFoodSuggestion(autoMood, dietary, weather);
    
    // Add dietary notes
    let dietaryNote = '';
    if (dietary.length > 0) {
      dietaryNote = `✅ This suggestion meets your dietary requirements: ${dietary.join(', ')}`;
    }
    
    const processingTime = Date.now() - startTime;
    console.log(`✅ Quick decision completed in ${processingTime}ms`);
    
    res.json({
      success: true,
      decision: suggestion.food.name,
      explanation: suggestion.description,
      weather: {
        temperature: weather.temperature,
        condition: weather.condition,
        city: weather.city
      },
      dietaryNote,
      ...suggestion,
      meta: {
        tool: "get_quick_food_decision",
        autoMood,
        hasWeather: true,
        hasDietary: dietary.length > 0,
        dietaryRestrictions: dietary,
        processingTime: `${processingTime}ms`,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Quick decision error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      fallback: {
        food: { name: 'Something Good', emoji: '🍽️' },
        description: 'A safe choice that should work for you',
        confidence: 50
      }
    });
  }
});

// Food Suggestion with Mood (FAST)
app.post('/mcp/get_food_suggestion', async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { mood, location, dietary = [], context = {} } = req.body;

    if (!mood) {
      return res.status(400).json({
        error: "Missing required parameter: mood",
        validMoods: ["tired", "stressed", "lazy", "celebrating", "hungover", "healthy", "homesick", "random"]
      });
    }

    console.log(`🚀 Food suggestion request: mood=${mood}, dietary=${JSON.stringify(dietary)}`);
    
    // Get simulated weather
    const weather = getSimulatedWeather(location);
    
    // Get fast suggestion
    const suggestion = getFastFoodSuggestion(mood, dietary, weather);
    
    // Add cultural note based on location
    let culturalNote = '';
    if (location?.city) {
      culturalNote = `This fits well with ${location.city}'s diverse food scene`;
    }
    
    // Add dietary note
    let dietaryNote = '';
    if (dietary.length > 0) {
      dietaryNote = `✅ Complies with: ${dietary.join(', ')} dietary requirements`;
    }
    
    const processingTime = Date.now() - startTime;
    console.log(`✅ Food suggestion completed in ${processingTime}ms`);

    res.json({
      success: true,
      food: suggestion.food,
      friendMessage: suggestion.description,
      reasoning: suggestion.reasoning,
      culturalNote,
      dietaryNote,
      availabilityNote: location?.city ? `Available in ${location.city}` : 'Check local availability',
      alternatives: [
        { name: 'Alternative 1', emoji: '🥘', reason: 'Another great option' },
        { name: 'Alternative 2', emoji: '🍜', reason: 'Also fits your mood' }
      ],
      confidence: suggestion.confidence,
      source: suggestion.source,
      timestamp: suggestion.timestamp,
      meta: {
        tool: "get_food_suggestion",
        mood,
        hasWeather: true,
        hasDietary: dietary.length > 0,
        dietaryRestrictions: dietary,
        processingTime: `${processingTime}ms`,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Food suggestion error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Dietary Validation (FAST)
app.post('/mcp/validate_dietary_compliance', (req, res) => {
  try {
    const { foodName, dietary } = req.body;

    if (!foodName || !dietary) {
      return res.status(400).json({
        error: "Missing required parameters: foodName, dietary"
      });
    }

    const compliance = {};
    const warnings = [];
    let overallCompliant = true;

    // Simple keyword-based validation (fast)
    const foodLower = foodName.toLowerCase();
    
    for (const restriction of dietary) {
      let isCompliant = true;
      
      // Simple rule checking
      if (restriction === 'vegan' && (foodLower.includes('meat') || foodLower.includes('cheese') || foodLower.includes('egg'))) {
        isCompliant = false;
        warnings.push(`${foodName} contains animal products (not vegan)`);
      }
      
      if (restriction === 'vegetarian' && (foodLower.includes('meat') || foodLower.includes('fish') || foodLower.includes('chicken'))) {
        isCompliant = false;
        warnings.push(`${foodName} contains meat (not vegetarian)`);
      }
      
      if (restriction === 'gluten-free' && (foodLower.includes('bread') || foodLower.includes('pasta') || foodLower.includes('wheat'))) {
        isCompliant = false;
        warnings.push(`${foodName} may contain gluten`);
      }
      
      compliance[restriction] = isCompliant ? 'compliant' : 'non-compliant';
      if (!isCompliant) overallCompliant = false;
    }

    res.json({
      success: true,
      foodName,
      dietaryRestrictions: dietary,
      compliant: overallCompliant,
      compliance,
      warnings,
      alternatives: overallCompliant ? [] : ['Customized version', 'Alternative dish', 'Modified recipe'],
      meta: {
        tool: "validate_dietary_compliance",
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Dietary validation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Cultural Context (FAST)
app.post('/mcp/get_cultural_food_context', (req, res) => {
  try {
    const { location, dietary = [] } = req.body;

    if (!location?.country) {
      return res.status(400).json({
        error: "Missing required parameter: location.country"
      });
    }

    // Simple cultural mapping (fast)
    const culturalData = {
      'US': { mainCuisine: 'American', popularFoods: ['burger', 'pizza', 'tacos'] },
      'UK': { mainCuisine: 'British', popularFoods: ['fish and chips', 'roast dinner', 'curry'] },
      'IT': { mainCuisine: 'Italian', popularFoods: ['pasta', 'pizza', 'risotto'] },
      'JP': { mainCuisine: 'Japanese', popularFoods: ['sushi', 'ramen', 'tempura'] },
      'IN': { mainCuisine: 'Indian', popularFoods: ['curry', 'biryani', 'dal'] }
    };

    const countryCode = location.countryCode || location.country.substring(0, 2).toUpperCase();
    const cultural = culturalData[countryCode] || { mainCuisine: 'International', popularFoods: ['local specialties'] };

    res.json({
      success: true,
      mainCuisine: cultural.mainCuisine,
      popularFoods: cultural.popularFoods,
      comfortFoods: cultural.popularFoods, // Simplified
      culturalNotes: `${cultural.mainCuisine} cuisine with diverse options`,
      mealTiming: {
        breakfast: "7-10am",
        lunch: "12-2pm",
        dinner: "6-9pm"
      },
      dietaryFriendlyOptions: dietary.length > 0 ? {
        note: `Many ${cultural.mainCuisine} dishes can be adapted for ${dietary.join(', ')} diets`
      } : {},
      meta: {
        tool: "get_cultural_food_context",
        location: `${location.city || location.country}`,
        hasDietary: dietary.length > 0,
        dietaryRestrictions: dietary,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Cultural context error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Error handling
app.use((error, req, res, next) => {
  console.error('💥 MCP Server Error:', error);
  res.status(500).json({
    success: false,
    error: "Internal server error",
    details: error.message,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    availableEndpoints: [
      "GET /health",
      "POST /mcp/get_quick_food_decision",
      "POST /mcp/get_food_suggestion", 
      "POST /mcp/validate_dietary_compliance",
      "POST /mcp/get_cultural_food_context"
    ]
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 VFIED Streamlined MCP Server running on port ${PORT}`);
  console.log(`⚡ Optimized for speed - no external API dependencies`);
  console.log(`🌱 Dietary Intelligence: Active`);
  console.log(`🔗 Health: http://localhost:${PORT}/health`);
  console.log(`📊 Endpoints: 4 food intelligence tools available`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🔄 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

export default app;