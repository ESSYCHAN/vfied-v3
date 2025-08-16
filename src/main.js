// VFIED One-Button Experience - FIXED VERSION

// Comment out problematic imports temporarily
// import { Capacitor } from '@capacitor/core';
// import { App } from '@capacitor/app';
// import { StatusBar } from '@capacitor/status-bar';
// import { Haptics, ImpactStyle } from '@capacitor/haptics';

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

class VFIEDOneButtonApp {
  constructor() {
    this.currentSuggestion = null;
    this.currentInteractionId = null;
    this.isThinking = false;
    this.useAI = import.meta.env.VITE_ENABLE_AI_SUGGESTIONS !== 'false';
    this.stats = { totalDecisions: 0, timeSaved: 0 };
    this.includeRestaurants = true;
    this.culturalPriority = true;
    
    this.init();
  }

  async init() {
    console.log('🚀 VFIED One-Button App initializing...');
    
    // Skip Capacitor setup if not available
    // await this.setupCapacitor();
    
    this.setupEventListeners();
    this.initializeUI();
    await this.initializeAI();
    await this.startApp();
    
    console.log('✅ One-Button Experience Ready!');
  }

  async initializeAI() {
    if (this.useAI) {
      try {
        this.updateContextInfo('🤖 Waking up AI intelligence...');
        
        // Wait for AI to initialize with location and culture
        await this.waitForAIReady();
        
        // Update context with intelligent info
        this.updateContextWithAI();
        
        console.log('🌟 AI fully ready with cultural awareness');
      } catch (error) {
        console.warn('⚠️ AI in hybrid mode:', error);
        this.updateContextInfo('🤖 AI ready (hybrid mode)');
        this.useAI = 'hybrid';
      }
    } else {
      this.updateContextInfo('🎯 Ready to decide what you should eat');
    }
  }

  async waitForAIReady() {
    let attempts = 0;
    const maxAttempts = 20; // 10 seconds max
    
    while (attempts < maxAttempts) {
      try {
        const status = getAIServiceStatus();
        
        if (status && status.hasLocation) {
          this.updateContextInfo('📍 Location detected, learning local culture...');
        }
        
        if (status && status.hasCulture && status.hasLocation) {
          this.updateContextInfo('🌍 Cultural intelligence ready!');
          return; // Ready!
        }
      } catch (error) {
        console.log('AI service not ready yet...');
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      attempts++;
    }
    
    console.log('⏰ AI initialization timeout, proceeding with available services');
  }

  updateContextWithAI() {
    try {
      const { location, culture } = getAILocationContext();
      
      if (location && location.city && location.city !== 'Unknown') {
        let message = `📍 ${location.city}`;
        
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

    // Keyboard shortcut - spacebar
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !this.isThinking) {
        e.preventDefault();
        this.handleDecideClick();
      }
    });

    console.log('🎯 Event listeners ready');
  }

  async setupCapacitor() {
    // Skip if Capacitor not available
    try {
      if (window.Capacitor && window.Capacitor.isNativePlatform()) {
        await StatusBar.setStyle({ style: 'DARK' });
        await StatusBar.setBackgroundColor({ color: '#2C3E50' });
        
        App.addListener('appStateChange', ({ isActive }) => {
          if (isActive) {
            this.refreshContext();
          }
        });

        console.log('📱 Capacitor ready');
      }
    } catch (error) {
      console.log('📱 Capacitor not available, continuing without it');
    }
  }

  initializeUI() {
    this.updateStats();
    this.updateAIStatus();
    
    // Hide loading screen after delay
    setTimeout(() => {
      this.hideLoadingScreen();
    }, 2000);
    
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
      }, 500);
    }
  }

  checkInitialContext() {
    const hour = new Date().getHours();
    
    try {
      const { location } = getAILocationContext();
      
      // Show contextual hint
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

  async handleDecideClick() {
    console.log('🤖 handleDecideClick called!');
    
    if (this.isThinking) {
      console.log('⏳ Already thinking, skipping...');
      return;
    }
    
    await this.triggerHaptic();
    
    // Start thinking animation
    this.startThinking();
    
    try {
      let suggestion;
      
      if (this.useAI) {
        console.log('🤖 Getting AI-powered suggestion...');
        this.updateButtonState('🤖 AI THINKING...', 'Analyzing your situation...');
        
        // Get comprehensive AI suggestion
        const context = {
          includeRestaurants: this.includeRestaurants,
          culturalPriority: this.culturalPriority,
          quick: true
        };
        
        suggestion = await getAIQuickDecision(context);
        this.currentInteractionId = suggestion.interactionId;
      } else {
        console.log('🎯 Using local decision engine...');
        this.updateButtonState('🎯 THINKING...', 'Deciding for you...');
        suggestion = getQuickFoodDecision();
      }
      
      this.currentSuggestion = suggestion;
      
      // Show suggestion after thinking delay
      setTimeout(() => {
        this.showSuggestion(suggestion);
        this.stopThinking();
      }, 1500 + Math.random() * 1000); // 1.5-2.5 second thinking
      
    } catch (error) {
      console.error('Decision error:', error);
      
      // Fallback to local service
      try {
        this.updateButtonState('🎯 BACKUP MODE...', 'Using local intelligence...');
        const suggestion = getQuickFoodDecision();
        this.currentSuggestion = suggestion;
        
        setTimeout(() => {
          this.showSuggestion(suggestion);
          this.stopThinking();
        }, 1000);
      } catch (fallbackError) {
        console.error('Fallback error:', fallbackError);
        this.showError('Oops! Try again in a moment.');
        this.stopThinking();
      }
    }
  }

  startThinking() {
    console.log('🧠 Starting thinking mode...');
    this.isThinking = true;
    
    // Hide any previous suggestion
    const suggestionResult = document.getElementById('suggestion-result');
    if (suggestionResult) {
      suggestionResult.classList.add('hidden');
    }
    
    // Update context
    this.updateContextInfo('🧠 Analyzing your location, weather, and preferences...');
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
      // Don't disable pointer events - just visual feedback
      // button.style.pointerEvents = 'none';
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
    if (resultDescription) resultDescription.textContent = suggestion.description || suggestion.friendResponse || 'Perfect choice for you!';
    
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
    }, 100);
    
    // Update context to show success
    try {
      const { location } = getAILocationContext();
      const contextMessage = suggestion.source === 'ai' 
        ? `🤖 AI analyzed ${location?.city || 'your location'}, weather, and preferences`
        : '🎯 Smart local suggestion ready';
      
      this.updateContextInfo(contextMessage);
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
      culturalNote.style.display = 'none';
    }
    
    if (personalNote && suggestion.personalNote) {
      personalNote.innerHTML = `<strong>🧠 Personal pattern:</strong> ${suggestion.personalNote}`;
      personalNote.style.display = 'block';
    } else if (personalNote) {
      personalNote.style.display = 'none';
    }
    
    if (weatherNote && suggestion.reason) {
      weatherNote.innerHTML = `<strong>🎯 Why this works:</strong> ${suggestion.reason}`;
      weatherNote.style.display = 'block';
    } else if (weatherNote) {
      weatherNote.style.display = 'none';
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
        await updateAIFeedback(this.currentInteractionId, 5);
        console.log('✅ Positive feedback sent to AI');
      } else {
        recordFoodDecision(
          this.currentSuggestion.food?.id || 'unknown',
          'quick-decision',
          5,
          { source: 'one-button' }
        );
      }
      
      // Update stats
      this.updateStats();
      
      // Show success animation
      this.showSuccessAnimation();
      
      // Reset after delay
      setTimeout(() => {
        this.resetToDecisionMode();
      }, 3000);
      
    } catch (error) {
      console.error('Error recording acceptance:', error);
      // Still show success to user
      this.showSuccessAnimation();
      setTimeout(() => {
        this.resetToDecisionMode();
      }, 3000);
    }
  }

  async handleTryAgain() {
    await this.triggerHaptic();
    
    // Record negative feedback for AI learning
    if (this.useAI && this.currentInteractionId) {
      try {
        await updateAIFeedback(this.currentInteractionId, 2);
        console.log('📉 Negative feedback sent for AI learning');
      } catch (error) {
        console.error('Error sending negative feedback:', error);
      }
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
        let message = '🤖 AI ready';
        
        if (status.hasCulture) {
          message += ' with cultural intelligence';
        }
        if (status.hasLocation) {
          message += ' and location awareness';
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
      }, 500);
    }
  }

  async refreshContext() {
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

  // Debug functions
  getStatus() {
    return {
      useAI: this.useAI,
      hasCurrentSuggestion: !!this.currentSuggestion,
      isThinking: this.isThinking,
      stats: this.stats
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
  console.log('🚀 DOM loaded, initializing VFIED...');
  
  // Force button to be clickable immediately
  setTimeout(() => {
    const button = document.getElementById('decide-button');
    if (button) {
      button.style.pointerEvents = 'auto';
      button.style.cursor = 'pointer';
      console.log('🔧 Forced button clickability');
    }
  }, 100);
  
  window.vfiedApp = new VFIEDOneButtonApp();
  
  // Emergency fix: Force button clickability every 3 seconds
  setInterval(forceButtonClickability, 3000);
  
  // Debug helper
  window.vfiedDebug = {
    getStatus: () => window.vfiedApp?.getStatus() || 'Not initialized',
    testDecision: () => window.vfiedApp?.handleDecideClick() || console.log('App not ready'),
    testButton: () => {
      const btn = document.getElementById('decide-button');
      console.log('Button found:', !!btn);
      console.log('Button clickable:', btn?.style.pointerEvents);
      console.log('App thinking:', window.vfiedApp?.isThinking);
      if (btn) {
        btn.style.pointerEvents = 'auto';
        btn.click();
      }
    }
  };
});

export default VFIEDOneButtonApp;