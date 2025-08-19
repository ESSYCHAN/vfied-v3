// VFIED One-Button Experience - COMPLETE WITH MOOD DETECTION INTEGRATION

// Keep AI intelligence but make it optional
import { 
  getAIFoodSuggestion, 
  getAIQuickDecision,
  updateAIFeedback,
  getAILocationContext,
  getAIServiceStatus,
  aiFoodService 
} from './services/aiFoodService.js';

// Fallback service
import { 
  getQuickFoodDecision, 
  recordFoodDecision,
  getUserFoodStats 
} from './services/foodService.js';

// 🚀 FAST MCP SERVER CONFIGURATION
const MCP_CONFIG = {
  baseUrl: import.meta.env.VITE_MCP_SERVER_URL || 'http://localhost:3001',
  timeout: 5000, // 5 second timeout for fast responses
  retries: 2,
  cache: new Map(), // Response caching
  cacheTimeout: 5 * 60 * 1000 // 5 minutes
};

// 🧠 MOOD DETECTION GLOBAL VARIABLES
let currentMood = null;
let moodHistory = [];

// 🚀 OPTIMIZED API CALLER WITH CACHING
class FastMCPClient {
  constructor() {
    this.cache = new Map();
    this.pendingRequests = new Map();
  }

  async call(endpoint, data, options = {}) {
    const cacheKey = this.getCacheKey(endpoint, data);
    
    // Check cache first
    if (!options.skipCache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < MCP_CONFIG.cacheTimeout) {
        console.log(`🚀 Cache hit for ${endpoint}`);
        return cached.data;
      }
      this.cache.delete(cacheKey);
    }

    // Prevent duplicate requests
    if (this.pendingRequests.has(cacheKey)) {
      console.log(`⏳ Waiting for pending ${endpoint}`);
      return await this.pendingRequests.get(cacheKey);
    }

    // Make the request
    const requestPromise = this.makeRequest(endpoint, data, options);
    this.pendingRequests.set(cacheKey, requestPromise);

    try {
      const result = await requestPromise;
      
      // Cache successful responses
      if (result && !options.skipCache) {
        this.cache.set(cacheKey, {
          data: result,
          timestamp: Date.now()
        });
      }
      
      return result;
    } finally {
      this.pendingRequests.delete(cacheKey);
    }
  }

  async makeRequest(endpoint, data, options) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), MCP_CONFIG.timeout);

    try {
      const response = await fetch(`${MCP_CONFIG.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        body: JSON.stringify(data),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`MCP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('MCP request timeout - server too slow');
      }
      throw error;
    }
  }

  getCacheKey(endpoint, data) {
    return `${endpoint}_${JSON.stringify(data)}`;
  }

  clearCache() {
    this.cache.clear();
    console.log('🧹 MCP cache cleared');
  }
}

// 🚀 FAST MCP CLIENT INSTANCE
const mcpClient = new FastMCPClient();

// 🧠 MOOD DETECTION FUNCTIONS

// QUICK MOOD SELECTION
function quickMood(mood) {
    const moodInput = document.getElementById('mood-input');
    const moodMap = {
        'tired': '😴 feeling exhausted and need energy',
        'stressed': '😰 feeling overwhelmed and need comfort',
        'celebrating': '🎉 celebrating something special',
        'post-workout': '💪 just finished working out',
        'hungry': '🤤 really hungry and need to eat'
    };
    
    if (moodInput) {
        moodInput.value = moodMap[mood] || mood;
        moodInput.style.background = 'rgba(255, 255, 255, 0.25)';
        
        // Auto-detect after setting
        setTimeout(() => {
            detectMoodFromText();
        }, 300);
    }
}

// 🧠 MOOD DETECTION FUNCTION
async function detectMoodFromText(text = null) {
    const moodInput = document.getElementById('mood-input');
    const detectedMoodsDiv = document.getElementById('detected-moods');
    
    const moodText = text || moodInput?.value?.trim();
    
    if (!moodText) {
        showMoodError('Please enter how you\'re feeling first');
        return;
    }

    try {
        // Show loading state
        if (detectedMoodsDiv) {
            detectedMoodsDiv.classList.remove('hidden');
            detectedMoodsDiv.innerHTML = '<div class="mood-loading">🧠 AI analyzing your mood...</div>';
        }

        console.log('🧠 Detecting mood for:', moodText);

        // 🚀 CALL YOUR MCP SERVER FOR MOOD DETECTION
        const moodResult = await callMoodDetection(moodText);
        
        // Display detected moods
        displayDetectedMoods(moodResult);
        
        // Store current mood for decision making
        currentMood = {
            text: moodText,
            detected: moodResult.moods,
            timestamp: Date.now(),
            suggestion: moodResult.suggestion // Bonus: we already have a suggestion!
        };
        
        // Add to mood history
        moodHistory.unshift(currentMood);
        if (moodHistory.length > 10) moodHistory.pop();
        
        console.log('🧠 Mood detected:', currentMood);
        
    } catch (error) {
        console.error('Mood detection failed:', error);
        showMoodError('Mood detection failed. Using fallback...');
        
        // Fallback to simple mood detection
        currentMood = {
            text: moodText,
            detected: simpleMoodFallback(moodText),
            timestamp: Date.now()
        };
        
        displayDetectedMoods({ moods: currentMood.detected, confidence: 70 });
    }
}

// 🚀 CALL MCP SERVER FOR MOOD DETECTION
async function callMoodDetection(moodText) {
    try {
        const userPrefs = getCurrentSettings();
        
        const response = await fetch(`${MCP_CONFIG.baseUrl}/v1/recommend`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                location: userPrefs.location || {
                    city: 'London',
                    country: 'United Kingdom',
                    country_code: 'GB'
                },
                mood_text: moodText, // 🎯 This triggers OpenAI mood detection on server
                dietary: userPrefs.dietary || [],
                budget: 'medium',
                menu_source: 'global_database'
            })
        });

        if (!response.ok) {
            throw new Error(`Mood API error: ${response.status}`);
        }

        const result = await response.json();
        
        return {
            moods: result.context?.resolved_moods || ['HUNGRY'],
            suggestion: result, // Bonus: we get the food suggestion too!
            confidence: result.confidence || 85
        };

    } catch (error) {
        console.error('MCP mood detection failed:', error);
        throw error;
    }
}

// 📱 DISPLAY DETECTED MOODS
function displayDetectedMoods(moodResult) {
    const detectedMoodsDiv = document.getElementById('detected-moods');
    if (!detectedMoodsDiv) return;

    const moodEmojis = {
        'TIRED': '😴',
        'STRESSED': '😰', 
        'CELEBRATING': '🎉',
        'HUNGRY': '🤤',
        'POST_WORKOUT': '💪',
        'SICK': '🤒',
        'FOCUSED': '🎯',
        'RELAX': '😌',
        'ADVENTUROUS': '🌟'
    };

    const moodTags = moodResult.moods.map(mood => {
        const emoji = moodEmojis[mood] || '😊';
        return `<span class="mood-tag">${emoji} ${mood.toLowerCase()}</span>`;
    }).join('');

    detectedMoodsDiv.innerHTML = `
        <div class="mood-result">
            <strong>🧠 AI detected your mood:</strong>
            <div class="mood-tags">${moodTags}</div>
            <div style="margin: 0.5rem 0; font-size: 0.9rem; opacity: 0.8;">
                Confidence: ${moodResult.confidence}%
            </div>
            <button class="use-mood-btn" onclick="useMoodForDecision()">
                🎯 Get food suggestion for this mood
            </button>
        </div>
    `;
}

// 🎯 USE DETECTED MOOD FOR FOOD DECISION
function useMoodForDecision() {
    if (!currentMood) {
        showMoodError('No mood detected yet');
        return;
    }

    // Update button text to show we're using mood
    const buttonText = document.getElementById('button-text');
    const buttonSubtitle = document.querySelector('.button-subtitle');
    
    if (buttonText) buttonText.textContent = 'USING YOUR MOOD';
    if (buttonSubtitle) buttonSubtitle.textContent = `For: ${currentMood.text}`;

    // Clear the mood input to show we're using it
    const moodInput = document.getElementById('mood-input');
    if (moodInput) {
        moodInput.style.background = 'rgba(40, 167, 69, 0.3)';
        moodInput.style.borderColor = 'rgba(40, 167, 69, 0.6)';
    }

    // Update context info
    window.vfiedAppInstance?.updateContextInfo(`🧠 Using your mood: ${currentMood.detected.join(', ')}`);

    // If we already have a suggestion from mood detection, use it!
    if (currentMood.suggestion) {
        console.log('🎯 Using suggestion from mood detection:', currentMood.suggestion);
        showMoodAwareSuggestion(currentMood.suggestion);
    } else {
        // Trigger decision with mood context
        handleMoodDecision();
    }
}

// 🚀 HANDLE MOOD-AWARE DECISION
async function handleMoodDecision() {
    if (!currentMood) return;

    try {
        console.log('🧠 Getting mood-aware suggestion...');
        
        // Show thinking state
        const button = document.getElementById('decide-button');
        if (button) button.classList.add('thinking');
        
        const userPrefs = getCurrentSettings();
        
        const response = await fetch(`${MCP_CONFIG.baseUrl}/v1/recommend`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                location: userPrefs.location,
                mood_text: currentMood.text, // 🧠 Natural language mood
                mood_ids: currentMood.detected, // 🎯 Pre-detected mood IDs
                dietary: userPrefs.dietary || [],
                budget: 'medium',
                social: 'solo',
                menu_source: 'global_database'
            })
        });

        if (!response.ok) {
            throw new Error(`MCP suggestion failed: ${response.status}`);
        }

        const suggestion = await response.json();
        
        console.log('🧠 Mood-aware suggestion received:', suggestion);
        
        // Show the suggestion
        setTimeout(() => {
            showMoodAwareSuggestion(suggestion);
            
            // Reset button
            const button = document.getElementById('decide-button');
            if (button) button.classList.remove('thinking');
            resetButtonText();
        }, 1500);

    } catch (error) {
        console.error('Mood-aware decision failed:', error);
        showMoodError('Failed to get mood-aware suggestion');
        
        // Reset button
        const button = document.getElementById('decide-button');
        if (button) button.classList.remove('thinking');
        resetButtonText();
    }
}

// 📱 SHOW MOOD-AWARE SUGGESTION
function showMoodAwareSuggestion(suggestion) {
    // Show regular suggestion first
    if (window.vfiedAppInstance) {
        window.vfiedAppInstance.currentSuggestion = suggestion;
        window.vfiedAppInstance.showSuggestion(suggestion);
    }

    // Add mood context to the display
    if (currentMood) {
        const moodContext = document.getElementById('mood-context');
        const moodMatchText = document.getElementById('mood-match-text');
        
        if (moodContext && moodMatchText) {
            moodMatchText.innerHTML = `🧠 <strong>Mood Match:</strong> Perfect for when you're ${currentMood.text}`;
            moodContext.classList.remove('hidden');
        }
    }

    // Update context info
    window.vfiedAppInstance?.updateContextInfo('🎉 Perfect mood-aware suggestion ready!');
}

// 🔧 HELPER FUNCTIONS
function showMoodError(message) {
    const detectedMoodsDiv = document.getElementById('detected-moods');
    if (detectedMoodsDiv) {
        detectedMoodsDiv.classList.remove('hidden');
        detectedMoodsDiv.innerHTML = `<div class="mood-error">⚠️ ${message}</div>`;
        
        setTimeout(() => {
            detectedMoodsDiv.classList.add('hidden');
        }, 3000);
    }
}

function simpleMoodFallback(text) {
    const moodMap = {
        'tired': ['TIRED'],
        'stress': ['STRESSED'],
        'celebrat': ['CELEBRATING'],
        'hungry': ['HUNGRY'],
        'workout': ['POST_WORKOUT'],
        'sick': ['SICK'],
        'focus': ['FOCUSED'],
        'relax': ['RELAX'],
        'adventure': ['ADVENTUROUS']
    };

    const lowerText = text.toLowerCase();
    for (const [key, moods] of Object.entries(moodMap)) {
        if (lowerText.includes(key)) {
            return moods;
        }
    }
    return ['HUNGRY'];
}

function resetButtonText() {
    const buttonText = document.getElementById('button-text');
    const buttonSubtitle = document.querySelector('.button-subtitle');
    
    if (buttonText) buttonText.textContent = 'DECIDE FOR ME';
    if (buttonSubtitle) buttonSubtitle.textContent = "I'll figure it out for you";
}

function getCurrentSettings() {
    // Get settings from the app instance or default
    return window.vfiedAppInstance?.userPreferences || {};
}

// 🚀 OPTIMIZED MCP API FUNCTIONS
async function getAIQuickDecisionFast(context = {}) {
  try {
    console.log('🚀 Fast MCP quick decision...');
    const startTime = Date.now();

    const payload = {
      location: context.location,
      dietary: context.dietary || [],
      userId: context.userId || 'anonymous',
      context: {
        includeRestaurants: context.includeRestaurants,
        quick: true,
        budget: context.budget || 'medium',
        timeConstraint: 'quick'
      }
    };

    const result = await mcpClient.call('/mcp/get_quick_food_decision', payload);
    
    const duration = Date.now() - startTime;
    console.log(`⚡ MCP response in ${duration}ms`);

    return {
      ...result,
      source: 'mcp-fast',
      responseTime: duration,
      interactionId: result.interactionId || `fast_${Date.now()}`
    };

  } catch (error) {
    console.error('❌ Fast MCP failed:', error);
    throw error; // Let caller handle fallback
  }
}

async function getAIFoodSuggestionFast(mood, context = {}) {
  try {
    console.log(`🚀 Fast MCP suggestion for mood: ${mood}`);
    const startTime = Date.now();

    const payload = {
      mood,
      location: context.location,
      context: {
        ...context,
        mcpRequest: true
      },
      userId: context.userId || 'anonymous'
    };

    const result = await mcpClient.call('/mcp/get_food_suggestion', payload);
    
    const duration = Date.now() - startTime;
    console.log(`⚡ MCP suggestion in ${duration}ms`);

    return {
      ...result,
      source: 'mcp-fast',
      responseTime: duration
    };

  } catch (error) {
    console.error('❌ Fast MCP suggestion failed:', error);
    throw error;
  }
}

async function updateAIFeedbackFast(interactionId, rating) {
  try {
    await mcpClient.call('/mcp/provide_feedback', {
      interactionId,
      rating
    }, { skipCache: true }); // Don't cache feedback
    
    return { success: true };
  } catch (error) {
    console.error('❌ Feedback failed:', error);
    return { success: false, error: error.message };
  }
}

class VFIEDOneButtonApp {
  constructor() {
    this.currentSuggestion = null;
    this.currentInteractionId = null;
    this.isThinking = false;
    this.useAI = import.meta.env.VITE_ENABLE_AI_SUGGESTIONS !== 'false';
    this.stats = { totalDecisions: 0, timeSaved: 0 };
    this.includeRestaurants = true;
    this.culturalPriority = true;
    this.userPreferences = {};
    
    // 🚀 PERFORMANCE TRACKING
    this.performanceMetrics = {
      avgResponseTime: 0,
      successRate: 0,
      totalRequests: 0,
      cacheHits: 0
    };
    
    this.init();
  }

  async init() {
    console.log('🚀 VFIED Fast MCP App with Mood Detection initializing...');
    
    // Load user preferences first
    this.loadUserPreferences();
    
    this.setupEventListeners();
    this.initializeUI();
    await this.initializeAI();
    await this.startApp();
    
    // 🚀 PRELOAD COMMON REQUESTS
    this.preloadCommonResponses();
    
    console.log('✅ Fast MCP Experience with Mood Detection Ready!');
  }

  // 🚀 PRELOAD OPTIMIZATION
  async preloadCommonResponses() {
    if (!this.useAI) return;
    
    try {
      console.log('🚀 Preloading common responses...');
      
      // Preload quick decision with current settings
      const context = {
        dietary: this.userPreferences.dietary || [],
        budget: this.userPreferences.budget || 'medium',
        location: this.getEffectiveLocation()
      };
      
      // Fire and forget - this populates the cache
      getAIQuickDecisionFast(context).catch(() => {
        // Ignore preload failures
      });
      
    } catch (error) {
      // Ignore preload errors
    }
  }

  getEffectiveLocation() {
    if (this.userPreferences.location) {
      return this.userPreferences.location;
    }
    
    // Default locations for preloading
    return {
      city: 'London',
      country: 'United Kingdom',
      countryCode: 'GB'
    };
  }

  // NEW: Load user preferences from settings
  loadUserPreferences() {
    try {
      const saved = localStorage.getItem('vfied_user_settings');
      if (saved) {
        this.userPreferences = JSON.parse(saved);
        console.log('⚙️ Loaded user preferences:', this.userPreferences);
      }
    } catch (error) {
      console.error('Error loading user preferences:', error);
      this.userPreferences = {};
    }
  }

  // NEW: Get current user preferences (called by settings system)
  getCurrentPreferences() {
    return this.userPreferences;
  }

  // NEW: Update preferences when settings change
  updatePreferences(newPreferences) {
    this.userPreferences = { ...this.userPreferences, ...newPreferences };
    console.log('⚙️ Updated app preferences:', this.userPreferences);
    
    // 🚀 CLEAR CACHE WHEN PREFERENCES CHANGE
    mcpClient.clearCache();
    
    // Trigger AI service to refresh with new settings
    if (this.useAI) {
      this.refreshAIContext();
    }
  }

  // NEW: Refresh AI context when settings change
  async refreshAIContext() {
    try {
      console.log('🔄 Refreshing AI context with new settings...');
      
      // Trigger cultural context refresh if location changed
      if (this.userPreferences.location) {
        await aiFoodService.detectCulturalContext();
      }
      
      this.updateContextWithAI();
      
      // 🚀 PRELOAD WITH NEW SETTINGS
      this.preloadCommonResponses();
      
    } catch (error) {
      console.error('Error refreshing AI context:', error);
    }
  }

  async initializeAI() {
    if (this.useAI) {
      try {
        this.updateContextInfo('🤖 Connecting to fast AI intelligence...');
        
        // 🚀 QUICK HEALTH CHECK
        const healthStart = Date.now();
        await fetch(`${MCP_CONFIG.baseUrl}/health`, { 
          method: 'GET',
          signal: AbortSignal.timeout(2000) // 2 second timeout
        });
        const healthTime = Date.now() - healthStart;
        
        console.log(`✅ MCP server responding in ${healthTime}ms`);
        
        // Wait for AI to initialize with location and culture
        await this.waitForAIReady();
        
        // Update context with intelligent info
        this.updateContextWithAI();
        
        console.log('🌟 AI fully ready with cultural awareness');
      } catch (error) {
        console.warn('⚠️ AI in hybrid mode:', error);
        this.updateContextInfo('🤖 AI ready (offline mode)');
        this.useAI = 'hybrid';
      }
    } else {
      this.updateContextInfo('🎯 Ready to decide what you should eat');
    }
  }

  async waitForAIReady() {
    let attempts = 0;
    const maxAttempts = 10; // Reduced from 20 for faster startup
    
    while (attempts < maxAttempts) {
      try {
        const status = getAIServiceStatus();
        
        if (status && status.hasLocation) {
          const locationText = status.effectiveLocation?.city || 'location';
          this.updateContextInfo(`📍 ${locationText} detected, learning local culture...`);
        }
        
        if (status && status.hasCulture && status.hasLocation) {
          const locationText = status.effectiveLocation?.city || 'location';
          this.updateContextInfo(`🌍 Cultural intelligence ready for ${locationText}!`);
          return; // Ready!
        }
      } catch (error) {
        console.log('AI service not ready yet...');
      }
      
      await new Promise(resolve => setTimeout(resolve, 300)); // Reduced from 500ms
      attempts++;
    }
    
    console.log('⏰ AI initialization timeout, proceeding with available services');
  }

  updateContextWithAI() {
    try {
      const { location, culture } = getAILocationContext();
      
      // Show effective location (could be from settings or detected)
      if (location && location.city && location.city !== 'Unknown') {
        let message = `📍 ${location.city}`;
        
        // Add dietary info if user has restrictions
        if (this.userPreferences.dietary && this.userPreferences.dietary.length > 0) {
          const dietaryEmojis = {
            'vegetarian': '🌱',
            'vegan': '🥬', 
            'gluten-free': '🌾',
            'dairy-free': '🥛',
            'keto': '🥩',
            'halal': '☪️',
            'kosher': '✡️',
            'paleo': '🦴'
          };
          const icons = this.userPreferences.dietary.map(d => dietaryEmojis[d] || '🍽️').join('');
          message += ` • ${icons} dietary aware`;
        }
        
        if (culture && culture.popularFoods) {
          const localFood = culture.popularFoods[0];
          message += ` • Ready for ${localFood} and more!`;
        }
        
        // Add weather if available
        this.addWeatherContext(message);
      } else {
        this.updateContextInfo('🤖 AI food intelligence ready');
      }
    } catch (error) {
      this.updateContextInfo('🤖 Food intelligence ready');
    }
  }

  async addWeatherContext(baseMessage) {
    try {
      const weather = await aiFoodService.getWeatherContext();
      if (weather && !weather.simulated) {
        let weatherMessage = baseMessage;
        
        if (weather.isRaining) {
          weatherMessage += ' ☔ Perfect comfort food weather';
        } else if (weather.isCold) {
          weatherMessage += ` ❄️ ${weather.temperature}°C - warm food vibes`;
        } else if (weather.isHot) {
          weatherMessage += ` ☀️ ${weather.temperature}°C - light & cool options`;
        }
        
        this.updateContextInfo(weatherMessage);
      } else {
        this.updateContextInfo(baseMessage);
      }
    } catch (error) {
      this.updateContextInfo(baseMessage);
    }
  }

  setupEventListeners() {
    console.log('🎯 Setting up event listeners...');
    
    // The ONE BUTTON - Multiple ways to ensure it works
    const decideButton = document.getElementById('decide-button');
    if (decideButton) {
      console.log('✅ Found decide button, attaching listeners...');
      
      // Remove any existing listeners first
      decideButton.replaceWith(decideButton.cloneNode(true));
      const freshButton = document.getElementById('decide-button');
      
      // Attach click listener
      freshButton.addEventListener('click', (e) => {
        console.log('🎯 Button CLICKED!');
        e.preventDefault();
        e.stopPropagation();
        this.handleDecideClick();
      });
      
      // Also handle touch events for mobile
      freshButton.addEventListener('touchend', (e) => {
        console.log('🎯 Button TOUCHED!');
        e.preventDefault();
        e.stopPropagation();
        this.handleDecideClick();
      });
      
      // Force button to be clickable
      freshButton.style.pointerEvents = 'auto';
      freshButton.style.cursor = 'pointer';
      
      console.log('✅ Button listeners attached successfully');
    } else {
      console.error('❌ Could not find decide button!');
    }

    // Result actions
    const acceptBtn = document.getElementById('accept-btn');
    const tryAgainBtn = document.getElementById('try-again-btn');
    
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => this.handleAccept());
    }
    if (tryAgainBtn) {
      tryAgainBtn.addEventListener('click', () => this.handleTryAgain());
    }

    // AI insights toggle
    const insightsToggle = document.getElementById('insights-toggle');
    if (insightsToggle) {
      insightsToggle.addEventListener('click', () => this.toggleInsights());
    }

    // 🧠 MOOD DETECTION EVENT LISTENERS
    this.setupMoodEventListeners();

    // Keyboard shortcut - spacebar
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !this.isThinking) {
        e.preventDefault();
        this.handleDecideClick();
      }
    });

    // NEW: Listen for settings updates
    window.addEventListener('vfied-settings-updated', (event) => {
      console.log('⚙️ Settings updated event received:', event.detail);
      this.updatePreferences(event.detail);
    });

    console.log('🎯 Event listeners ready');
  }

  // 🧠 SETUP MOOD EVENT LISTENERS
  setupMoodEventListeners() {
    const moodInput = document.getElementById('mood-input');
    const detectBtn = document.getElementById('detect-mood-btn');
    
    if (detectBtn) {
      detectBtn.addEventListener('click', () => detectMoodFromText());
    }
    
    if (moodInput) {
      moodInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          detectMoodFromText();
        }
      });
      
      // Auto-detect on longer text
      moodInput.addEventListener('input', this.debounce((e) => {
        const text = e.target.value.trim();
        if (text.length > 15) {
          detectMoodFromText(text);
        }
      }, 1500));
    }
  }

  initializeUI() {
    this.updateStats();
    this.updateAIStatus();
    
    // Hide loading screen after delay
    setTimeout(() => {
      this.hideLoadingScreen();
    }, 1500); // Reduced from 2000ms
    
    this.updateContextInfo('🤖 Initializing your personal food intelligence...');
  }

  async startApp() {
    await this.animateButtonEntry();
    this.checkInitialContext();
  }

  async animateButtonEntry() {
    const button = document.getElementById('decide-button');
    if (button) {
      button.style.opacity = '0';
      button.style.transform = 'scale(0.8)';
      button.style.transition = 'all 0.6s ease';
      
      setTimeout(() => {
        button.style.opacity = '1';
        button.style.transform = 'scale(1)';
        // Ensure it's clickable after animation
        button.style.pointerEvents = 'auto';
      }, 300); // Reduced from 500ms
    }
  }

  checkInitialContext() {
    const hour = new Date().getHours();
    
    try {
      const { location } = getAILocationContext();
      
      // Show contextual hint with effective location
      if (hour >= 12 && hour <= 14) {
        const message = location?.city && location.city !== 'Unknown'
          ? `🍽️ Lunch time in ${location.city}! Let me help you decide.`
          : '🍽️ Lunch time! Ready to decide what to eat?';
        
        this.updateContextInfo(message);
      } else if (hour >= 18 && hour <= 21) {
        const message = location?.city && location.city !== 'Unknown'
          ? `🌆 Dinner time in ${location.city}! What sounds good?`
          : '🌆 Dinner time! What should you eat tonight?';
        
        this.updateContextInfo(message);
      }
    } catch (error) {
      // Use simple fallback
      if (hour >= 12 && hour <= 14) {
        this.updateContextInfo('🍽️ Lunch time! Ready to decide what to eat?');
      } else if (hour >= 18 && hour <= 21) {
        this.updateContextInfo('🌆 Dinner time! What should you eat tonight?');
      }
    }
  }

  // 🚀 OPTIMIZED DECISION HANDLER WITH MOOD INTEGRATION
  async handleDecideClick() {
    console.log('🤖 handleDecideClick called!');
    
    if (this.isThinking) {
      console.log('⏳ Already thinking, skipping...');
      return;
    }
    
    await this.triggerHaptic();
    
    // Start thinking animation
    this.startThinking();
    
    const startTime = Date.now();
    
    try {
      let suggestion;
      
      if (this.useAI) {
        console.log('🚀 Getting FAST MCP suggestion with user preferences...');
        
        // 🧠 CHECK IF WE HAVE MOOD CONTEXT
        if (currentMood && currentMood.suggestion) {
          console.log('🧠 Using cached mood suggestion');
          this.currentSuggestion = currentMood.suggestion;
          this.showSuggestion(currentMood.suggestion);
          this.stopThinking();
          
          // Add mood context
          if (currentMood) {
            const moodContext = document.getElementById('mood-context');
            const moodMatchText = document.getElementById('mood-match-text');
            
            if (moodContext && moodMatchText) {
              moodMatchText.innerHTML = `🧠 <strong>Mood Match:</strong> Perfect for when you're ${currentMood.text}`;
              moodContext.classList.remove('hidden');
            }
          }
          return;
        }
        
        this.updateButtonState('🚀 AI THINKING...', 'Analyzing your situation...');
        
        // OPTIMIZED: Include user preferences in context
        const context = {
          includeRestaurants: this.includeRestaurants,
          culturalPriority: this.culturalPriority,
          quick: true,
          // ADD USER PREFERENCES
          dietary: this.userPreferences.dietary || [],
          budget: this.userPreferences.budget || 'medium',
          location: this.getEffectiveLocation(),
          userId: 'user_' + Date.now(),
          // 🧠 ADD MOOD IF AVAILABLE
          mood: currentMood
        };
        
        console.log('📋 Using context with preferences:', context);
        
        // Create payload for MCP server
        const payload = {
          location: context.location || {
            city: 'London',
            country: 'United Kingdom',
            country_code: 'GB'
          },
          dietary: context.dietary || [],
          budget: context.budget || 'medium',
          menu_source: 'global_database'
        };

        // 🧠 ADD MOOD IF AVAILABLE
        if (context.mood) {
          payload.mood_text = context.mood.text;
          payload.mood_ids = context.mood.detected;
          console.log('🧠 Including mood in request:', context.mood);
        }

        try {
          // 🚀 TRY FAST MCP FIRST
          const response = await fetch(`${MCP_CONFIG.baseUrl}/v1/recommend`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });

          if (!response.ok) {
            throw new Error(`MCP server error: ${response.status}`);
          }

          suggestion = await response.json();
          this.currentInteractionId = suggestion.interactionId || Date.now().toString();
          console.log(`⚡ Fast MCP completed in ${Date.now() - startTime}ms`);
        } catch (mcpError) {
          console.warn('⚠️ Fast MCP failed, trying fallback AI:', mcpError);
          // Fallback to original AI service
          suggestion = await getAIQuickDecision(context);
          this.currentInteractionId = suggestion.interactionId;
        }
      } else {
        console.log('🎯 Using local decision engine...');
        this.updateButtonState('🎯 THINKING...', 'Deciding for you...');
        suggestion = getQuickFoodDecision();
      }
      
      this.currentSuggestion = suggestion;
      
      // Update performance metrics
      this.updatePerformanceMetrics(Date.now() - startTime, true);
      
      // Show suggestion after minimal thinking delay
      const thinkingTime = suggestion.responseTime > 500 ? 500 : 1000; // Adaptive timing
      setTimeout(() => {
        this.showSuggestion(suggestion);
        this.stopThinking();
        
        // 🧠 ADD MOOD CONTEXT IF AVAILABLE
        if (currentMood) {
          const moodContext = document.getElementById('mood-context');
          const moodMatchText = document.getElementById('mood-match-text');
          
          if (moodContext && moodMatchText) {
            moodMatchText.innerHTML = `🧠 <strong>Mood Match:</strong> Perfect for when you're ${currentMood.text}`;
            moodContext.classList.remove('hidden');
          }
        }
      }, thinkingTime);
      
    } catch (error) {
      console.error('Decision error:', error);
      
      // Update performance metrics
      this.updatePerformanceMetrics(Date.now() - startTime, false);
      
      // Fallback to local service
      try {
        this.updateButtonState('🎯 BACKUP MODE...', 'Using local intelligence...');
        const suggestion = getQuickFoodDecision();
        this.currentSuggestion = suggestion;
        
        setTimeout(() => {
          this.showSuggestion(suggestion);
          this.stopThinking();
        }, 800); // Faster fallback
      } catch (fallbackError) {
        console.error('Fallback error:', fallbackError);
        this.showError('Oops! Try again in a moment.');
        this.stopThinking();
      }
    }
  }

  // 🚀 PERFORMANCE TRACKING
  updatePerformanceMetrics(responseTime, success) {
    this.performanceMetrics.totalRequests++;
    
    if (success) {
      const prevAvg = this.performanceMetrics.avgResponseTime;
      const count = this.performanceMetrics.totalRequests;
      this.performanceMetrics.avgResponseTime = (prevAvg * (count - 1) + responseTime) / count;
      this.performanceMetrics.successRate = this.performanceMetrics.successRate + (100 - this.performanceMetrics.successRate) / count;
    } else {
      this.performanceMetrics.successRate = this.performanceMetrics.successRate * 0.9; // Decay on failure
    }
    
    console.log('📊 Performance:', this.performanceMetrics);
  }

  startThinking() {
    console.log('🧠 Starting thinking mode...');
    this.isThinking = true;
    
    // Hide any previous suggestion
    const suggestionResult = document.getElementById('suggestion-result');
    if (suggestionResult) {
      suggestionResult.classList.add('hidden');
    }
    
    // Update context with effective location
    try {
      const { location } = getAILocationContext();
      const locationText = location?.city || 'your area';
      const moodText = currentMood ? ` and your ${currentMood.text}` : '';
      this.updateContextInfo(`🧠 Analyzing ${locationText}, weather${moodText}...`);
    } catch (error) {
      this.updateContextInfo('🧠 Analyzing your location, weather, and preferences...');
    }
  }

  stopThinking() {
    console.log('🧠 Stopping thinking mode...');
    this.isThinking = false;
    this.resetButtonState();
  }

  updateButtonState(text, subtitle) {
    const buttonText = document.getElementById('button-text');
    const buttonIcon = document.getElementById('button-icon');
    const button = document.getElementById('decide-button');
    
    if (buttonText) buttonText.textContent = text;
    if (buttonIcon) buttonIcon.textContent = '🤖';
    if (button) {
      button.classList.add('thinking');
    }
  }

  resetButtonState() {
    const buttonText = document.getElementById('button-text');
    const buttonIcon = document.getElementById('button-icon');
    const button = document.getElementById('decide-button');
    
    if (buttonText) buttonText.textContent = 'DECIDE FOR ME';
    if (buttonIcon) buttonIcon.textContent = '🎯';
    if (button) {
      button.classList.remove('thinking');
      button.style.pointerEvents = 'auto';
      button.style.cursor = 'pointer';
    }
  }

  showSuggestion(suggestion) {
    console.log('🍽️ Showing suggestion:', suggestion);
    
    const suggestionResult = document.getElementById('suggestion-result');
    const resultEmoji = document.getElementById('result-emoji');
    const resultName = document.getElementById('result-name');
    const resultDescription = document.getElementById('result-description');
    const restaurantInfo = document.getElementById('restaurant-info');
    
    if (!suggestionResult) {
      console.error('❌ Suggestion result element not found!');
      return;
    }

    // Update suggestion display
    if (resultEmoji) resultEmoji.textContent = suggestion.food?.emoji || '🍽️';
    if (resultName) resultName.textContent = suggestion.food?.name || 'Great Choice!';
    if (resultDescription) resultDescription.textContent = suggestion.friendMessage || suggestion.description || 'Perfect choice for you!';
    
    // Show restaurant info if available
    if (restaurantInfo && suggestion.restaurants && suggestion.restaurants.length > 0) {
      const restaurant = suggestion.restaurants[0];
      restaurantInfo.textContent = `📍 ${restaurant.name} (${restaurant.distance?.toFixed(1)}km away)`;
      restaurantInfo.style.display = 'block';
    } else if (restaurantInfo && suggestion.availabilityNote) {
      restaurantInfo.textContent = `📍 ${suggestion.availabilityNote}`;
      restaurantInfo.style.display = 'block';
    } else if (restaurantInfo) {
      restaurantInfo.style.display = 'none';
    }
    
    // Update AI insights
    this.updateAIInsights(suggestion);
    
    // Show the result
    suggestionResult.classList.remove('hidden');
    
    // Animate in
    suggestionResult.style.opacity = '0';
    suggestionResult.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      suggestionResult.style.transition = 'all 0.5s ease';
      suggestionResult.style.opacity = '1';
      suggestionResult.style.transform = 'translateY(0)';
    }, 50); // Faster animation
    
    // Update context to show success with effective location
    try {
      const { location } = getAILocationContext();
      const locationText = location?.city || 'your location';
      const sourceText = suggestion.source === 'mcp-fast' ? '⚡ Fast AI' : 
                        suggestion.source === 'mcp' ? '🤖 AI' : 
                        suggestion.source === 'ai' ? '🤖 AI' : '🎯 Smart local';
      
      const responseTime = suggestion.responseTime ? ` (${suggestion.responseTime}ms)` : '';
      const moodText = currentMood ? ' with mood intelligence' : '';
      this.updateContextInfo(`${sourceText} analyzed ${locationText}${responseTime}${moodText}`);
    } catch (error) {
      this.updateContextInfo('🎯 Smart suggestion ready');
    }
  }

  updateAIInsights(suggestion) {
    const culturalNote = document.getElementById('cultural-note');
    const personalNote = document.getElementById('personal-note');
    const weatherNote = document.getElementById('weather-note');
    
    if (culturalNote && suggestion.culturalNote) {
      culturalNote.innerHTML = `<strong>🌍 Cultural insight:</strong> ${suggestion.culturalNote}`;
      culturalNote.style.display = 'block';
    } else if (culturalNote) {
      // Show location-aware fallback
      try {
        const { location } = getAILocationContext();
        const locationText = location?.city ? ` in ${location.city}` : '';
        culturalNote.innerHTML = `<strong>🌍 Cultural insight:</strong> This choice fits perfectly with local dining preferences${locationText}!`;
        culturalNote.style.display = 'block';
      } catch (error) {
        culturalNote.style.display = 'none';
      }
    }
    
    if (personalNote && suggestion.personalNote) {
      personalNote.innerHTML = `<strong>🧠 Personal pattern:</strong> ${suggestion.personalNote}`;
      personalNote.style.display = 'block';
    } else if (personalNote) {
      // Show dietary-aware fallback
      const dietaryText = this.userPreferences.dietary && this.userPreferences.dietary.length > 0 
        ? ` and meets your ${this.userPreferences.dietary.join(', ')} requirements` : '';
      const moodText = currentMood ? ` Perfect for your ${currentMood.text} mood.` : '';
      personalNote.innerHTML = `<strong>🧠 Personal pattern:</strong> Based on your preferences${dietaryText}.${moodText}`;
      personalNote.style.display = 'block';
    }
    
    if (weatherNote && suggestion.reason) {
      weatherNote.innerHTML = `<strong>🎯 Why this works:</strong> ${suggestion.reason}`;
      weatherNote.style.display = 'block';
    } else if (weatherNote && suggestion.reasoning) {
      weatherNote.innerHTML = `<strong>🎯 Why this works:</strong> ${suggestion.reasoning}`;
      weatherNote.style.display = 'block';
    } else if (weatherNote && suggestion.weatherNote) {
      weatherNote.innerHTML = `<strong>🌤️ Weather factor:</strong> ${suggestion.weatherNote}`;
      weatherNote.style.display = 'block';
    } else if (weatherNote) {
      weatherNote.innerHTML = '<strong>🎯 Why this works:</strong> Perfect choice for your current mood and situation.';
      weatherNote.style.display = 'block';
    }
  }

  toggleInsights() {
    const insightsContent = document.getElementById('insights-content');
    const toggle = document.getElementById('insights-toggle');
    
    if (insightsContent && toggle) {
      const isHidden = insightsContent.classList.contains('hidden');
      
      if (isHidden) {
        insightsContent.classList.remove('hidden');
        toggle.textContent = '🤖 Hide insights ↑';
      } else {
        insightsContent.classList.add('hidden');
        toggle.textContent = '🤖 Why this choice? ↓';
      }
    }
  }

  async handleAccept() {
    if (!this.currentSuggestion) return;
    
    await this.triggerHaptic('success');
    
    try {
      // Record positive feedback
      if (this.useAI && this.currentInteractionId) {
        // 🚀 USE FAST FEEDBACK
        await updateAIFeedbackFast(this.currentInteractionId, 5);
        console.log('✅ Positive feedback sent to AI');
      } else {
        recordFoodDecision(
          this.currentSuggestion.food?.id || 'unknown',
          'quick-decision',
          5,
          { source: 'one-button', preferences: this.userPreferences }
        );
      }
      
      // Update stats
      this.updateStats();
      
      // Show success animation
      this.showSuccessAnimation();
      
      // 🧠 RESET MOOD STATE
      const moodContext = document.getElementById('mood-context');
      if (moodContext) {
        moodContext.classList.add('hidden');
      }
      
      const moodInput = document.getElementById('mood-input');
      if (moodInput) {
        moodInput.value = '';
        moodInput.style.background = '';
        moodInput.style.borderColor = '';
      }
      
      // Clear current mood
      currentMood = null;
      resetButtonText();
      
      // Reset after delay
      setTimeout(() => {
        this.resetToDecisionMode();
      }, 2500); // Slightly faster
      
    } catch (error) {
      console.error('Error recording acceptance:', error);
      // Still show success to user
      this.showSuccessAnimation();
      setTimeout(() => {
        this.resetToDecisionMode();
      }, 2500);
    }
  }

  async handleTryAgain() {
    await this.triggerHaptic();
    
    // Record negative feedback for AI learning
    if (this.useAI && this.currentInteractionId) {
      try {
        // 🚀 USE FAST FEEDBACK
        await updateAIFeedbackFast(this.currentInteractionId, 2);
        console.log('📉 Negative feedback sent for AI learning');
      } catch (error) {
        console.error('Error sending negative feedback:', error);
      }
    }
    
    // Hide mood context but keep mood for retry
    const moodContext = document.getElementById('mood-context');
    if (moodContext) {
      moodContext.classList.add('hidden');
    }
    
    // Try again immediately
    this.handleDecideClick();
  }

  showSuccessAnimation() {
    const resultName = document.getElementById('result-name');
    const acceptBtn = document.getElementById('accept-btn');
    
    if (resultName && this.currentSuggestion) {
      resultName.textContent = `Perfect! ${this.currentSuggestion.food?.name || 'This choice'} it is! 🎉`;
    }
    
    if (acceptBtn) {
      acceptBtn.textContent = '✅ DECISION MADE!';
      acceptBtn.style.background = '#27AE60';
    }
    
    this.updateContextInfo('🎉 Decision made! No more overthinking, time to eat!');
  }

  resetToDecisionMode() {
    // Hide suggestion
    const suggestionResult = document.getElementById('suggestion-result');
    if (suggestionResult) {
      suggestionResult.classList.add('hidden');
    }
    
    // Reset state
    this.currentSuggestion = null;
    this.currentInteractionId = null;
    
    // Reset button
    this.resetButtonState();
    
    // Update context back to ready state
    this.updateContextWithAI();
  }

  updateContextInfo(message) {
    const contextInfo = document.getElementById('context-info');
    if (contextInfo) {
      contextInfo.textContent = message;
    }
  }

  updateStats() {
    try {
      this.stats = getUserFoodStats();
    } catch (error) {
      console.log('Using default stats');
    }
    
    const decisionsCount = document.getElementById('decisions-count');
    const timeSaved = document.getElementById('time-saved');
    
    if (decisionsCount) decisionsCount.textContent = this.stats.totalDecisions;
    if (timeSaved) timeSaved.textContent = this.stats.timeSaved;
  }

  updateAIStatus() {
    const aiStatus = document.getElementById('ai-status');
    if (!aiStatus) return;
    
    try {
      if (this.useAI) {
        const status = getAIServiceStatus();
        let message = '🚀 Fast AI ready';
        
        if (status.hasCulture) {
          message += ' with cultural intelligence';
        }
        if (status.hasLocation) {
          const locationText = status.effectiveLocation?.city || 'location';
          message += ` and ${locationText} awareness`;
        }
        
        // Add dietary awareness if user has restrictions
        if (this.userPreferences.dietary && this.userPreferences.dietary.length > 0) {
          message += ` + dietary intelligence`;
        }
        
        // Add mood awareness
        if (currentMood) {
          message += ` + mood detection`;
        }
        
        // Add performance info
        if (this.performanceMetrics.avgResponseTime > 0) {
          message += ` (${Math.round(this.performanceMetrics.avgResponseTime)}ms avg)`;
        }
        
        aiStatus.textContent = message;
      } else {
        aiStatus.textContent = '🎯 Local intelligence ready';
      }
    } catch (error) {
      aiStatus.textContent = '🎯 Ready to help you decide';
    }
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainApp = document.getElementById('main-app');
    
    if (loadingScreen && mainApp) {
      loadingScreen.style.opacity = '0';
      loadingScreen.style.transition = 'opacity 0.5s ease';
      
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        mainApp.classList.remove('hidden');
        mainApp.style.opacity = '0';
        mainApp.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
          mainApp.style.opacity = '1';
        }, 50);
      }, 300); // Faster transition
    }
  }

  async refreshContext() {
    this.loadUserPreferences(); // Reload preferences
    
    // 🚀 CLEAR CACHE ON CONTEXT REFRESH
    mcpClient.clearCache();
    
    this.updateContextWithAI();
    this.updateStats();
    this.updateAIStatus();
  }

  async triggerHaptic(type = 'light') {
    // Skip haptics if Capacitor not available
    try {
      if (window.Capacitor && window.Capacitor.isNativePlatform()) {
        const style = type === 'success' ? ImpactStyle.Medium : ImpactStyle.Light;
        await Haptics.impact({ style });
      }
    } catch (error) {
      console.log('Haptic feedback not available');
    }
  }

  showError(message) {
    console.error('App error:', message);
    this.updateContextInfo(`⚠️ ${message}`);
    
    // Reset after a few seconds
    setTimeout(() => {
      this.updateContextWithAI();
    }, 3000);
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Debug functions
  getStatus() {
    return {
      useAI: this.useAI,
      hasCurrentSuggestion: !!this.currentSuggestion,
      isThinking: this.isThinking,
      stats: this.stats,
      userPreferences: this.userPreferences,
      performance: this.performanceMetrics,
      cacheSize: mcpClient.cache.size,
      currentMood: currentMood,
      moodHistory: moodHistory
    };
  }
}

// Force button clickability every few seconds (emergency fix)
function forceButtonClickability() {
  const button = document.getElementById('decide-button');
  if (button && !window.vfiedApp?.isThinking) {
    button.style.pointerEvents = 'auto';
    button.style.cursor = 'pointer';
  }
}

// Initialize the one-button app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DOM loaded, initializing FAST VFIED with Mood Detection...');
  
  // Force button to be clickable immediately
  setTimeout(() => {
    const button = document.getElementById('decide-button');
    if (button) {
      button.style.pointerEvents = 'auto';
      button.style.cursor = 'pointer';
      console.log('🔧 Forced button clickability');
    }
  }, 50); // Even faster
  
  window.vfiedApp = new VFIEDOneButtonApp();
  
  // Make app globally available for settings integration
  window.vfiedAppInstance = window.vfiedApp;
  
  // 🧠 EXPOSE MOOD FUNCTIONS GLOBALLY
  window.quickMood = quickMood;
  window.detectMoodFromText = detectMoodFromText;
  window.useMoodForDecision = useMoodForDecision;
  window.currentMood = () => currentMood;
  window.moodHistory = () => moodHistory;
  
  // Emergency fix: Force button clickability every 2 seconds (faster check)
  setInterval(forceButtonClickability, 2000);
  
  // Debug helper with performance info
  window.vfiedDebug = {
    getStatus: () => window.vfiedApp?.getStatus() || 'Not initialized',
    testDecision: () => window.vfiedApp?.handleDecideClick() || console.log('App not ready'),
    getPreferences: () => window.vfiedApp?.userPreferences || {},
    clearCache: () => mcpClient.clearCache(),
    getCache: () => mcpClient.cache,
    testMCP: async () => {
      try {
        const result = await mcpClient.call('/health', {});
        console.log('MCP Health:', result);
        return result;
      } catch (error) {
        console.error('MCP Test Failed:', error);
        return { error: error.message };
      }
    },
    testButton: () => {
      const btn = document.getElementById('decide-button');
      console.log('Button found:', !!btn);
      console.log('Button clickable:', btn?.style.pointerEvents);
      console.log('App thinking:', window.vfiedApp?.isThinking);
      if (btn) {
        btn.style.pointerEvents = 'auto';
        btn.click();
      }
    },
    // 🧠 MOOD DEBUG FUNCTIONS
    testMood: (text) => detectMoodFromText(text || 'tired and stressed'),
    getCurrentMood: () => currentMood,
    getMoodHistory: () => moodHistory,
    clearMood: () => { currentMood = null; moodHistory = []; },
    useMood: () => useMoodForDecision()
  };
  
  console.log('✅ REAL AI VFIED system with Mood Detection ready!');
  console.log('🧠 Mood functions available: quickMood(), detectMoodFromText(), useMoodForDecision()');
  console.log('🧠 Debug: window.vfiedDebug.testMood("tired and celebrating")');
});

export default VFIEDOneButtonApp;