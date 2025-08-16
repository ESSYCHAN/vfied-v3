// VFIED MCP Server - Food Intelligence as a Service
// Exposes VFIED's AI food intelligence as MCP tools

import express from 'express';
import cors from 'cors';
import { aiFoodService, getAIFoodSuggestion, getAIQuickDecision, updateAIFeedback } from '../services/aiFoodService.js';

const app = express();
const PORT = process.env.MCP_PORT || 3001;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// MCP Tool Registry
const MCP_TOOLS = {
  get_food_suggestion: {
    name: "get_food_suggestion",
    description: "Get a culturally-aware, personalized food suggestion based on mood, location, and personal patterns",
    parameters: {
      type: "object",
      properties: {
        mood: {
          type: "string",
          enum: ["tired", "stressed", "lazy", "post-workout", "celebrating", "hungover", "healthy", "homesick", "random"],
          description: "User's current mood or situation"
        },
        location: {
          type: "object",
          properties: {
            city: { type: "string" },
            country: { type: "string" },
            countryCode: { type: "string" }
          },
          description: "User's location (optional - will detect if not provided)"
        },
        context: {
          type: "object",
          properties: {
            budget: { type: "string", enum: ["low", "medium", "high"] },
            socialSituation: { type: "string", enum: ["solo", "family", "friends", "date"] },
            timeConstraint: { type: "string", enum: ["quick", "normal", "leisurely"] },
            dietaryRestrictions: { type: "array", items: { type: "string" } },
            weatherOverride: { type: "string" }
          },
          description: "Additional context for better suggestions"
        },
        userId: {
          type: "string",
          description: "Optional user ID for personalized suggestions based on history"
        }
      },
      required: ["mood"]
    },
    returns: {
      type: "object",
      properties: {
        food: {
          type: "object",
          properties: {
            name: { type: "string" },
            emoji: { type: "string" },
            type: { type: "string" },
            category: { type: "string" }
          }
        },
        friendMessage: { type: "string" },
        reasoning: { type: "string" },
        culturalNote: { type: "string" },
        personalNote: { type: "string" },
        availabilityNote: { type: "string" },
        alternatives: { type: "array" },
        confidence: { type: "number" }
      }
    }
  },

  get_quick_food_decision: {
    name: "get_quick_food_decision",
    description: "Get a quick food decision without specifying mood - uses AI to analyze context and suggest something good",
    parameters: {
      type: "object",
      properties: {
        location: {
          type: "object",
          properties: {
            city: { type: "string" },
            country: { type: "string" }
          }
        },
        userId: { type: "string" }
      }
    },
    returns: {
      type: "object",
      properties: {
        food: { type: "object" },
        description: { type: "string" },
        reasoning: { type: "string" },
        confidence: { type: "number" }
      }
    }
  },

  analyze_food_patterns: {
    name: "analyze_food_patterns",
    description: "Analyze a user's food patterns and preferences based on their history",
    parameters: {
      type: "object",
      properties: {
        userId: {
          type: "string",
          required: true,
          description: "User ID to analyze patterns for"
        },
        timeframe: {
          type: "string",
          enum: ["week", "month", "quarter", "year"],
          description: "Time period to analyze"
        }
      },
      required: ["userId"]
    },
    returns: {
      type: "object",
      properties: {
        patterns: { type: "object" },
        insights: { type: "array" },
        recommendations: { type: "array" }
      }
    }
  },

  get_cultural_food_context: {
    name: "get_cultural_food_context",
    description: "Get cultural food information for a specific location",
    parameters: {
      type: "object",
      properties: {
        location: {
          type: "object",
          properties: {
            city: { type: "string" },
            country: { type: "string" },
            countryCode: { type: "string" }
          },
          required: ["country"]
        }
      },
      required: ["location"]
    },
    returns: {
      type: "object",
      properties: {
        mainCuisine: { type: "string" },
        popularFoods: { type: "array" },
        comfortFoods: { type: "array" },
        culturalNotes: { type: "string" },
        mealTiming: { type: "object" }
      }
    }
  },

  provide_feedback: {
    name: "provide_feedback",
    description: "Provide feedback on a food suggestion to improve future recommendations",
    parameters: {
      type: "object",
      properties: {
        interactionId: {
          type: "string",
          required: true,
          description: "ID of the suggestion interaction"
        },
        rating: {
          type: "number",
          minimum: 1,
          maximum: 5,
          required: true,
          description: "Rating from 1-5 (1=terrible, 5=perfect)"
        },
        feedback: {
          type: "string",
          description: "Optional text feedback"
        }
      },
      required: ["interactionId", "rating"]
    },
    returns: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" }
      }
    }
  }
};

// ==================== MCP ENDPOINTS ====================

// Tool Discovery Endpoint
app.get('/mcp/tools', (req, res) => {
  res.json({
    tools: Object.values(MCP_TOOLS),
    meta: {
      name: "VFIED Food Intelligence",
      version: "1.0.0",
      description: "AI-powered, culturally-aware food suggestion service",
      author: "VFIED",
      capabilities: [
        "Cultural food awareness",
        "Personal pattern learning", 
        "Location-based suggestions",
        "Weather context integration",
        "Multi-language support"
      ]
    }
  });
});

// Main Food Suggestion Tool
app.post('/mcp/get_food_suggestion', async (req, res) => {
  try {
    const { mood, location, context = {}, userId } = req.body;

    // Validate required parameters
    if (!mood) {
      return res.status(400).json({
        error: "Missing required parameter: mood",
        validMoods: ["tired", "stressed", "lazy", "post-workout", "celebrating", "hungover", "healthy", "homesick", "random"]
      });
    }

    // Override location if provided
    if (location) {
      aiFoodService.userLocation = { ...aiFoodService.userLocation, ...location };
    }

    // Add user context if provided
    const enhancedContext = {
      ...context,
      userId,
      mcpRequest: true,
      timestamp: new Date().toISOString()
    };

    // Get AI suggestion
    const suggestion = await getAIFoodSuggestion(mood, enhancedContext);

    // Add MCP metadata
    const response = {
      ...suggestion,
      meta: {
        tool: "get_food_suggestion",
        mood,
        location: aiFoodService.userLocation?.city || "unknown",
        timestamp: new Date().toISOString(),
        processingTime: Date.now() - req.startTime
      }
    };

    res.json(response);

  } catch (error) {
    console.error('MCP Food Suggestion Error:', error);
    res.status(500).json({
      error: "Failed to get food suggestion",
      details: error.message,
      fallback: {
        food: { name: "Local Comfort Food", emoji: "🍽️" },
        friendMessage: "Something went wrong, but you should eat something good!",
        confidence: 50
      }
    });
  }
});

// Quick Decision Tool
app.post('/mcp/get_quick_food_decision', async (req, res) => {
  try {
    const { location, userId } = req.body;

    // Override location if provided
    if (location) {
      aiFoodService.userLocation = { ...aiFoodService.userLocation, ...location };
    }

    const context = {
      userId,
      quick: true,
      mcpRequest: true
    };

    const decision = await getAIQuickDecision(context);

    res.json({
      ...decision,
      meta: {
        tool: "get_quick_food_decision",
        location: aiFoodService.userLocation?.city || "unknown",
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('MCP Quick Decision Error:', error);
    res.status(500).json({
      error: "Failed to get quick decision",
      details: error.message
    });
  }
});

// Pattern Analysis Tool
app.post('/mcp/analyze_food_patterns', async (req, res) => {
  try {
    const { userId, timeframe = "month" } = req.body;

    if (!userId) {
      return res.status(400).json({
        error: "Missing required parameter: userId"
      });
    }

    // This would analyze user patterns from Firebase
    const patterns = await analyzeUserPatterns(userId, timeframe);

    res.json({
      patterns,
      insights: generateInsights(patterns),
      recommendations: generateRecommendations(patterns),
      meta: {
        tool: "analyze_food_patterns",
        userId,
        timeframe,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('MCP Pattern Analysis Error:', error);
    res.status(500).json({
      error: "Failed to analyze patterns",
      details: error.message
    });
  }
});

// Cultural Context Tool
app.post('/mcp/get_cultural_food_context', async (req, res) => {
  try {
    const { location } = req.body;

    if (!location?.country) {
      return res.status(400).json({
        error: "Missing required parameter: location.country"
      });
    }

    // Set location for cultural detection
    aiFoodService.userLocation = { ...aiFoodService.userLocation, ...location };
    
    // Trigger cultural detection
    await aiFoodService.detectCulturalContext();

    const culturalContext = aiFoodService.userCulture;

    res.json({
      ...culturalContext,
      meta: {
        tool: "get_cultural_food_context",
        location: `${location.city || location.country}`,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('MCP Cultural Context Error:', error);
    res.status(500).json({
      error: "Failed to get cultural context",
      details: error.message
    });
  }
});

// Feedback Tool
app.post('/mcp/provide_feedback', async (req, res) => {
  try {
    const { interactionId, rating, feedback } = req.body;

    if (!interactionId || !rating) {
      return res.status(400).json({
        error: "Missing required parameters: interactionId, rating"
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        error: "Rating must be between 1 and 5"
      });
    }

    await updateAIFeedback(interactionId, rating);

    res.json({
      success: true,
      message: "Feedback recorded successfully",
      meta: {
        tool: "provide_feedback",
        interactionId,
        rating,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('MCP Feedback Error:', error);
    res.status(500).json({
      error: "Failed to record feedback",
      details: error.message
    });
  }
});

// ==================== HELPER FUNCTIONS ====================

async function analyzeUserPatterns(userId, timeframe) {
  // This would query Firebase for user's decision history
  // and analyze patterns
  
  return {
    totalDecisions: 45,
    favoriteTimeToEat: "evening",
    topMoods: ["stressed", "tired", "celebrating"],
    culturalPreferences: ["Italian", "Japanese", "Local"],
    satisfactionRate: 87,
    timeframe
  };
}

function generateInsights(patterns) {
  return [
    "You tend to crave comfort food when stressed",
    "Evening decisions show higher satisfaction rates",
    "You have a strong preference for Asian cuisines",
    "Weekend choices are more adventurous than weekday"
  ];
}

function generateRecommendations(patterns) {
  return [
    "Try Vietnamese pho for your next stressed mood",
    "Explore Thai cuisine based on your Asian food preferences",
    "Consider meal planning for higher evening satisfaction"
  ];
}

// ==================== MIDDLEWARE ====================

// Request timing middleware
app.use((req, res, next) => {
  req.startTime = Date.now();
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: "healthy",
    service: "VFIED MCP Server",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    aiService: {
      hasOpenAI: !!aiFoodService.openaiApiKey,
      hasLocation: !!aiFoodService.userLocation?.city,
      hasCulture: !!aiFoodService.userCulture?.mainCuisine
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('MCP Server Error:', error);
  res.status(500).json({
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
      "GET /mcp/tools",
      "POST /mcp/get_food_suggestion",
      "POST /mcp/get_quick_food_decision", 
      "POST /mcp/analyze_food_patterns",
      "POST /mcp/get_cultural_food_context",
      "POST /mcp/provide_feedback",
      "GET /health"
    ]
  });
});

// // Start server
// app.listen(PORT, () => {
//   console.log(`🍲 VFIED MCP Server running on port ${PORT}`);
//   console.log(`🔗 Health check: http://localhost:${PORT}/health`);
//   console.log(`🛠️ Tools registry: http://localhost:${PORT}/mcp/tools`);
//   console.log(`🤖 AI Status: ${aiFoodService.openaiApiKey ? 'Connected' : 'No API Key'}`);
// });

export default app;