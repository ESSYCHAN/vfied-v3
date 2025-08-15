// VFIED Enhanced Main App - Complete AI + Cultural + Personal Intelligence

import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { StatusBar } from '@capacitor/status-bar';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

// Enhanced AI-powered services
import { 
  getAIFoodSuggestion, 
  getAIQuickDecision,
  updateAIFeedback,
  getAILocationContext,
  getAIServiceStatus,
  aiFoodService 
} from './services/aiFoodService.js';

// Fallback to local service if AI fails
import { 
  getQuickFoodDecision, 
  getMoodBasedFoodDecision, 
  recordFoodDecision,
  getUserFoodStats 
} from './services/foodService.js';

// Enhanced App with full AI capabilities
class VFIEDApp {
  constructor() {
    this.currentMood = null;
    this.currentDecision = null;
    this.currentInteractionId = null;
    this.isLoading = false;
    this.useAI = import.meta.env.VITE_ENABLE_AI_SUGGESTIONS !== 'false';
    this.stats = { totalDecisions: 0, timeSaved: 0, satisfactionRate: 85 };
    this.userContext = {};
    this.aiStatus = { hasOpenAI: false, hasLocation: false, hasCulture: false };
    
    this.init();
  }

  async init() {
    console.log('🚀 VFIED Enhanced App initializing...');
    
    // Setup Capacitor plugins
    await this.setupCapacitor();
    
    // Setup DOM event listeners
    this.setupEventListeners();
    
    // Initialize UI
    this.initializeUI();
    
    // Initialize AI services
    await this.initializeAIServices();
    
    // Start the app
    await this.startApp();
    
    console.log('✅ VFIED Enhanced App ready with AI intelligence!');
  }

  async initializeAIServices() {
    if (this.useAI) {
      try {
        console.log('🤖 Initializing AI services...');
        
        // Show AI initialization in context banner
        this.updateContextBanner('🤖 Awakening AI food intelligence...');
        
        // Wait for AI service to initialize
        await this.waitForAIInitialization();
        
        // Get AI service status
        this.aiStatus = getAIServiceStatus();
        
        // Update context banner with intelligent info
        this.updateContextBannerWithAI();
        
        console.log('🌟 AI services ready with full cultural awareness');
        console.log('AI Status:', this.aiStatus);
        
      } catch (error) {
        console.warn('⚠️ AI services partially unavailable, using hybrid mode:', error);
        this.useAI = 'hybrid'; // Use AI when possible, fallback otherwise
        this.updateContextBanner('🤖 AI in hybrid mode - ready to help!');
      }
    } else {
      console.log('🎲 Running in local mode');
      this.updateContextBanner('Ready to help you decide what to eat');
    }
  }

  async waitForAIInitialization() {
    let attempts = 0;
    const maxAttempts = 15; // 7.5 seconds max wait
    
    while (attempts < maxAttempts) {
      const status = getAIServiceStatus();
      
      // Check if essential services are ready
      if (status.hasLocation) {
        console.log('✅ Location detected');
        this.updateContextBanner('📍 Location detected, learning local food culture...');
      }
      
      if (status.hasCulture) {
        console.log('✅ Cultural context learned');
        this.updateContextBanner('🌍 Cultural context learned, personalizing...');
        return; // Main services ready
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      attempts++;
    }
    
    console.log('⏰ AI initialization timeout, proceeding with available services');
  }

  updateContextBannerWithAI() {
    const { location, culture } = getAILocationContext();
    
    if (location && location.city && location.city !== 'Unknown') {
      let message = `📍 ${location.city}`;
      
      if (culture && culture.popularFoods) {
        const localFoods = culture.popularFoods.slice(0, 2).join(', ');
        message += ` • Local favorites: ${localFoods}`;
      }
      
      // Add weather context if available
      this.addWeatherToContextBanner(message);
    } else {
      this.updateContextBanner('🤖 AI food intelligence ready');
    }
  }

  async addWeatherToContextBanner(baseMessage) {
    try {
      // Get weather context from AI service
      const weatherContext = await aiFoodService.getWeatherContext();
      if (weatherContext && !weatherContext.simulated) {
        let weatherMessage = baseMessage;
        
        if (weatherContext.isRaining) {
          weatherMessage += ' • ☔ Comfort food weather';
        } else if (weatherContext.isCold) {
          weatherMessage += ` • ❄️ ${weatherContext.temperature}°C - warm food vibes`;
        } else if (weatherContext.isHot) {
          weatherMessage += ` • ☀️ ${weatherContext.temperature}°C - light food mood`;
        } else {
          weatherMessage += ` • 🌤️ ${weatherContext.temperature}°C`;
        }
        
        this.updateContextBanner(weatherMessage);
      } else {
        this.updateContextBanner(baseMessage);
      }
    } catch (error) {
      console.log('Weather context unavailable');
      this.updateContextBanner(baseMessage);
    }
  }

  async setupCapacitor() {
    if (Capacitor.isNativePlatform()) {
      try {
        await StatusBar.setStyle({ style: 'DARK' });
        await StatusBar.setBackgroundColor({ color: '#2C3E50' });
        
        App.addListener('appStateChange', ({ isActive }) => {
          console.log('App state changed. Is active?', isActive);
          if (isActive) {
            // Refresh context when app becomes active
            this.refreshContext();
          }
        });

        console.log('📱 Capacitor plugins initialized');
      } catch (error) {
        console.error('Capacitor setup error:', error);
      }
    }
  }

  setupEventListeners() {
    // Main decide button
    const decideBtn = document.getElementById('decide-for-me-btn');
    if (decideBtn) {
      decideBtn.addEventListener('click', () => this.handleQuickDecision());
    }

    // Tab navigation
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => this.handleTabSwitch(e));
    });

    // Modal buttons
    const acceptBtn = document.getElementById('accept-btn');
    const tryAgainBtn = document.getElementById('try-again-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');

    if (acceptBtn) acceptBtn.addEventListener('click', () => this.handleAcceptDecision());
    if (tryAgainBtn) tryAgainBtn.addEventListener('click', () => this.handleTryAgain());
    if (closeModalBtn) closeModalBtn.addEventListener('click', () => this.hideDecisionModal());

    // Enhanced mood selector
    this.setupEnhancedMoodSelector();

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !this.isModalVisible()) {
        e.preventDefault();
        this.handleQuickDecision();
      }
    });

    console.log('🎯 Enhanced event listeners setup complete');
  }

  setupEnhancedMoodSelector() {
    const moodContainer = document.getElementById('mood-selector');
    if (!moodContainer) return;

    const moods = [
      { id: 'tired', emoji: '😴', label: 'Exhausted' },
      { id: 'stressed', emoji: '😤', label: 'Stressed' },
      { id: 'lazy', emoji: '🛋️', label: 'Lazy Day' },
      { id: 'post-workout', emoji: '💪', label: 'Post-Workout' },
      { id: 'celebrating', emoji: '🎉', label: 'Celebrating' },
      { id: 'hungover', emoji: '🤮', label: 'Hungover' },
      { id: 'healthy', emoji: '🥗', label: 'Stay Healthy' },
      { id: 'homesick', emoji: '🏠', label: 'Homesick' }, // Cultural food
      { id: 'random', emoji: '🎲', label: 'Surprise Me' }
    ];

    moodContainer.innerHTML = moods.map(mood => `
      <button class="mood-btn" data-mood="${mood.id}">
        ${mood.emoji} ${mood.label}
      </button>
    `).join('');

    // Enhanced mood button listeners
    moodContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('mood-btn')) {
        this.handleMoodSelection(e);
      }
    });
  }

  initializeUI() {
    // Update time
    this.updateTime();
    setInterval(() => this.updateTime(), 60000);

    // Update stats
    this.updateStats();

    // Hide loading screen after a delay
    setTimeout(() => {
      this.hideLoadingScreen();
    }, 2000); // Longer delay for AI initialization

    // Set initial context banner
    this.updateContextBanner('🤖 Initializing your personal food intelligence...');
  }

  async startApp() {
    // Trigger initial animations
    await this.animateAppEntry();
    
    // Check for any startup conditions
    this.checkStartupConditions();
    
    // Initialize context gathering
    await this.gatherInitialContext();
  }

  async gatherInitialContext() {
    this.userContext = {
      time: {
        hour: new Date().getHours(),
        dayOfWeek: new Date().getDay(),
        isWeekend: [0, 6].includes(new Date().getDay())
      },
      device: {
        isMobile: Capacitor.isNativePlatform(),
        platform: Capacitor.getPlatform()
      },
      session: {
        startTime: new Date().toISOString(),
        interactions: 0
      }
    };
  }

  async refreshContext() {
    // Refresh context when app becomes active
    await this.gatherInitialContext();
    this.updateContextBannerWithAI();
  }

  updateTime() {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
      const now = new Date();
      const options = { 
        weekday: 'long',
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true
      };
      timeElement.textContent = now.toLocaleTimeString('en-US', options);
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
    if (timeSaved) timeSaved.textContent = `${this.stats.timeSaved} min`;
  }

  updateContextBanner(message = null) {
    const banner = document.getElementById('context-banner');
    if (!banner) return;

    if (message) {
      banner.textContent = message;
      
      // Add AI-powered class for special styling
      if (message.includes('🤖') || message.includes('📍') || message.includes('🌍')) {
        banner.classList.add('ai-powered');
      }
      return;
    }

    // Default contextual message with AI awareness
    const hour = new Date().getHours();
    let contextMessage = "🤖 Ready to help you decide what to eat";

    // Time-based messages with cultural awareness
    if (hour >= 6 && hour <= 10) {
      contextMessage = "☕ Morning! What sounds good for breakfast?";
    } else if (hour >= 11 && hour <= 14) {
      contextMessage = "🍽️ Lunch time! Let's find something satisfying";
    } else if (hour >= 17 && hour <= 21) {
      contextMessage = "🌆 Dinner vibes! Time for something good";
    } else if (hour >= 22 || hour <= 5) {
      contextMessage = "🌙 Late night cravings? I got you covered";
    }

    banner.textContent = contextMessage;
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

  async animateAppEntry() {
    const elements = document.querySelectorAll('.mood-btn');
    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'all 0.3s ease';
      
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 50);
    });
  }

  checkStartupConditions() {
    const hour = new Date().getHours();
    
    // Enhanced startup messages with AI context
    if (hour >= 12 && hour <= 14 && this.stats.totalDecisions === 0) {
      const { location } = getAILocationContext();
      const message = location?.city && location.city !== 'Unknown'
        ? `🍽️ Lunch time in ${location.city}! First decision of the day?`
        : "🍽️ Lunch time! First decision of the day?";
      
      this.updateContextBanner(message);
    }
  }

  async handleQuickDecision() {
    if (this.isLoading) return;
    
    await this.triggerHaptic();
    this.setLoading(true);
    
    // Update context to show thinking
    this.updateContextBanner('🤖 Analyzing your situation...');
    
    try {
      let decision;
      
      if (this.useAI) {
        // AI-powered quick decision with full context
        console.log('🤖 Getting AI-powered quick decision...');
        decision = await getAIQuickDecision();
        this.currentInteractionId = decision.interactionId;
        
        // Show AI thinking process
        if (decision.source === 'ai') {
          this.updateContextBanner('🧠 AI analyzed your patterns and location...');
        }
      } else {
        // Fallback to local decision engine
        console.log('🎲 Using local decision engine...');
        decision = getQuickFoodDecision();
      }
      
      this.currentDecision = decision;
      
      // Show decision with dramatic delay
      setTimeout(() => {
        this.showDecisionModal(decision);
        this.setLoading(false);
        this.updateContextBannerWithAI(); // Reset banner
      }, 1200 + Math.random() * 800); // Longer delay for AI drama
      
    } catch (error) {
      console.error('Quick decision error:', error);
      
      // Fallback to local service
      try {
        const decision = getQuickFoodDecision();
        this.currentDecision = decision;
        this.showDecisionModal(decision);
        this.updateContextBanner('Used local intelligence for this decision');
      } catch (fallbackError) {
        this.showError('Oops! Try again in a moment.');
      }
      
      this.setLoading(false);
    }
  }

  async handleMoodSelection(event) {
    const mood = event.target.dataset.mood;
    if (!mood || this.isLoading) return;

    await this.triggerHaptic();
    
    // Update active mood button
    document.querySelectorAll('.mood-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    this.currentMood = mood;
    this.setLoading(true);

    try {
      let decision;
      
      if (this.useAI) {
        // AI-powered mood-based decision with cultural context
        console.log(`🤖 Getting AI suggestion for mood: ${mood}`);
        
        // Show thinking process
        this.updateContextBanner(`🤖 Understanding your ${mood} mood...`);
        
        decision = await getAIFoodSuggestion(mood, this.userContext);
        this.currentInteractionId = decision.interactionId;
        
        // Show cultural/personal context if available
        if (decision.culturalNote) {
          console.log('🌍 Cultural insight:', decision.culturalNote);
        }
        if (decision.personalNote) {
          console.log('🧠 Personal pattern:', decision.personalNote);
        }
        
      } else {
        // Fallback to local decision engine
        console.log(`🎲 Using local suggestion for mood: ${mood}`);
        decision = getMoodBasedFoodDecision(mood, this.userContext);
      }
      
      this.currentDecision = decision;
      
      // Show friend response first
      if (decision.friendResponse) {
        this.showFriendResponse(decision.friendResponse);
      }
      
      // Then show suggestions with AI insights
      setTimeout(() => {
        this.showAIFoodSuggestions(decision);
        this.setLoading(false);
        this.updateContextBannerWithAI(); // Reset banner
      }, 1000);
      
    } catch (error) {
      console.error('Mood decision error:', error);
      
      // Fallback to local service
      try {
        const decision = getMoodBasedFoodDecision(mood, this.userContext);
        this.currentDecision = decision;
        this.showFriendResponse(decision.friendResponse);
        setTimeout(() => {
          this.showAIFoodSuggestions(decision);
          this.setLoading(false);
        }, 1000);
      } catch (fallbackError) {
        this.setLoading(false);
        this.showError('Hmm, let me think again...');
      }
    }
  }

  showFriendResponse(response) {
    const responseElement = document.getElementById('friend-response');
    if (!responseElement) return;

    responseElement.innerHTML = `<p>${response}</p>`;
    responseElement.classList.remove('hidden');
    
    // Animate in
    responseElement.style.opacity = '0';
    responseElement.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      responseElement.style.transition = 'all 0.4s ease';
      responseElement.style.opacity = '1';
      responseElement.style.transform = 'translateY(0)';
    }, 100);
  }

  showAIFoodSuggestions(decision) {
    const suggestionsElement = document.getElementById('food-suggestions');
    if (!suggestionsElement) return;

    const { 
      food, 
      description, 
      reason, 
      alternatives = [], 
      culturalNote, 
      personalNote,
      availabilityNote,
      confidence 
    } = decision;
    
    let html = `
      <div class="suggestions-title">🎯 Perfect for You</div>
      <div class="main-suggestion">
        ${this.renderAIFoodCard(food, description, reason, true, confidence)}
      </div>
    `;
    
    // Add AI insights
    if (culturalNote) {
      html += `
        <div class="cultural-note">
          🌍 <strong>Local insight:</strong> ${culturalNote}
        </div>
      `;
    }
    
    if (personalNote) {
      html += `
        <div class="personal-note">
          🧠 <strong>Personal pattern:</strong> ${personalNote}
        </div>
      `;
    }

    if (availabilityNote) {
      html += `
        <div class="availability-note">
          📍 <strong>Where to get it:</strong> ${availabilityNote}
        </div>
      `;
    }
    
    // Add alternatives if available
    if (alternatives && alternatives.length > 0) {
      html += `
        <div class="alternatives-title">🔄 Other Options</div>
        <div class="alternatives-grid">
          ${alternatives.map(alt => this.renderAlternativeCard(alt)).join('')}
        </div>
      `;
    }

    // Add confidence indicator for AI suggestions
    if (decision.source === 'ai' && confidence) {
      html += `
        <div class="ai-confidence">
          🤖 AI Confidence: ${confidence}%
        </div>
      `;
    }
    
    suggestionsElement.innerHTML = html;
    suggestionsElement.classList.remove('hidden');
    
    // Add click listeners
    suggestionsElement.addEventListener('click', (e) => {
      const foodCard = e.target.closest('.ai-food-card') || e.target.closest('.alternative-card');
      if (foodCard) {
        const foodId = foodCard.dataset.foodId;
        const foodName = foodCard.dataset.foodName;
        this.handleAIFoodSelection(foodId, foodName);
      }
    });
  }

  renderAIFoodCard(food, description, reason, isMain = false, confidence = null) {
    const confidenceIndicator = confidence ? `
      <div class="confidence-indicator" title="AI Confidence: ${confidence}%">
        <div class="confidence-bar" style="width: ${confidence}%"></div>
      </div>
    ` : '';

    return `
      <div class="ai-food-card ${isMain ? 'main' : ''}" data-food-id="${food.id}" data-food-name="${food.name}">
        <div class="ai-food-badge">${(food.category || 'PERFECT').toUpperCase()}</div>
        <div class="ai-food-header">
          <div class="ai-food-emoji">${food.emoji}</div>
          <div class="ai-food-info">
            <h3 class="ai-food-name">${food.name}</h3>
            <div class="ai-food-desc">${description}</div>
            ${reason ? `<div class="ai-food-reason">${reason}</div>` : ''}
            ${confidenceIndicator}
          </div>
        </div>
      </div>
    `;
  }

  renderAlternativeCard(alternative) {
    return `
      <div class="alternative-card" data-food-id="${alternative.id || alternative.name}" data-food-name="${alternative.name}">
        <div class="alt-emoji">${alternative.emoji}</div>
        <div class="alt-name">${alternative.name}</div>
        ${alternative.reason ? `<div class="alt-reason">${alternative.reason}</div>` : ''}
      </div>
    `;
  }

  async handleAIFoodSelection(foodId, foodName) {
    await this.triggerHaptic();
    
    // Create decision object
    const decision = { 
      food: { 
        id: foodId, 
        name: foodName,
        emoji: this.currentDecision?.food?.emoji || '🍽️'
      }, 
      description: `Perfect choice! ${foodName} it is.`,
      source: this.currentDecision?.source || 'selection'
    };
    
    this.currentDecision = decision;
    this.showDecisionModal(decision);
  }

  handleTabSwitch(event) {
    const tabName = event.target.dataset.tab;
    if (!tabName) return;

    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Hide all tab panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.remove('active');
    });

    // Show selected tab
    const targetPane = document.getElementById(`${tabName}-tab`);
    if (targetPane) {
      targetPane.classList.add('active');
    }

    // Load tab-specific content with AI
    this.loadEnhancedTabContent(tabName);
    this.updateContextBannerForTab(tabName);
  }

  async loadEnhancedTabContent(tabName) {
    // Load AI-enhanced content for each tab
    switch (tabName) {
      case 'celebrate':
        await this.loadCelebrationContent();
        break;
      case 'recover':
        await this.loadRecoveryContent();
        break;
      case 'healthy':
        await this.loadHealthyContent();
        break;
      default:
        break;
    }
  }

  async loadCelebrationContent() {
    const tab = document.getElementById('celebrate-tab');
    if (!tab || tab.dataset.loaded) return;

    try {
      if (this.useAI) {
        const decision = await getAIFoodSuggestion('celebrating', this.userContext);
        
        tab.innerHTML = `
          <div class="celebration-content">
            <div class="friend-response celebrating">
              ${decision.friendResponse}
            </div>
            ${decision.culturalNote ? `<div class="cultural-note">🌍 ${decision.culturalNote}</div>` : ''}
            <div class="suggestions-title">🎊 Celebration Foods</div>
            ${this.renderAIFoodCard(decision.food, decision.description, decision.reason, true)}
            ${decision.alternatives ? `
              <div class="alternatives-grid">
                ${decision.alternatives.map(alt => this.renderAlternativeCard(alt)).join('')}
              </div>
            ` : ''}
          </div>
        `;
      } else {
        // Fallback content
        tab.innerHTML = `
          <div class="celebration-content">
            <div class="friend-response celebrating">
              🎉 You're celebrating! Get the good stuff. Life's too short for sad celebration food.
            </div>
          </div>
        `;
      }
    } catch (error) {
      console.error('Error loading celebration content:', error);
    }
    
    tab.dataset.loaded = 'true';
  }

  async loadRecoveryContent() {
    const tab = document.getElementById('recover-tab');
    if (!tab || tab.dataset.loaded) return;

    try {
      if (this.useAI) {
        const decision = await getAIFoodSuggestion('hungover', this.userContext);
        
        tab.innerHTML = `
          <div class="recovery-content">
            <div class="friend-response recovery">
              ${decision.friendResponse}
            </div>
            <div class="suggestions-title">🔄 Recovery Foods</div>
            ${this.renderAIFoodCard(decision.food, decision.description, decision.reason, true)}
          </div>
        `;
      } else {
        tab.innerHTML = `
          <div class="recovery-content">
            <div class="friend-response recovery">
              🤮 Hungover? Been there. Your body needs grease, salt, and hydration.
            </div>
          </div>
        `;
      }
    } catch (error) {
      console.error('Error loading recovery content:', error);
    }
    
    tab.dataset.loaded = 'true';
  }

  async loadHealthyContent() {
    const tab = document.getElementById('healthy-tab');
    if (!tab || tab.dataset.loaded) return;

    try {
      if (this.useAI) {
        const decision = await getAIFoodSuggestion('healthy', this.userContext);
        
        tab.innerHTML = `
          <div class="healthy-content">
            <div class="friend-response healthy">
              ${decision.friendResponse}
            </div>
            <div class="suggestions-title">💪 Keep the Streak</div>
            ${this.renderAIFoodCard(decision.food, decision.description, decision.reason, true)}
          </div>
        `;
      } else {
        tab.innerHTML = `
          <div class="healthy-content">
            <div class="friend-response healthy">
              🥗 Let's keep this momentum going with food that doesn't suck.
            </div>
          </div>
        `;
      }
    } catch (error) {
      console.error('Error loading healthy content:', error);
    }
    
    tab.dataset.loaded = 'true';
  }

  updateContextBannerForTab(tabName) {
    const { location } = getAILocationContext();
    const locationText = location?.city && location.city !== 'Unknown' 
      ? ` in ${location.city}` 
      : '';
    
    const messages = {
      decide: `🤖 What's your vibe right now${locationText}?`,
      celebrate: `🎉 Time to celebrate${locationText}!`,
      recover: `🔄 Recovery mode${locationText}`,
      healthy: `💪 Healthy choices${locationText}`
    };
    
    this.updateContextBanner(messages[tabName]);
  }

  showDecisionModal(decision) {
    const modal = document.getElementById('decision-modal');
    const emoji = document.getElementById('result-emoji');
    const title = document.getElementById('result-title');
    const message = document.getElementById('result-message');
    
    if (!modal || !emoji || !title || !message) return;

    emoji.textContent = decision.food.emoji;
    title.textContent = decision.food.name;
    message.textContent = decision.description;
    
    // Add AI source indicator
    if (decision.source === 'ai') {
      modal.classList.add('ai-suggestion');
    }
    
    modal.classList.remove('hidden');
    modal.style.opacity = '0';
    
    setTimeout(() => {
      modal.style.transition = 'opacity 0.3s ease';
      modal.style.opacity = '1';
    }, 50);
  }

  hideDecisionModal() {
    const modal = document.getElementById('decision-modal');
    if (!modal) return;

    modal.style.opacity = '0';
    modal.classList.remove('ai-suggestion');
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 300);
  }

  async handleAcceptDecision() {
    if (!this.currentDecision) return;
    
    await this.triggerHaptic('success');
    
    try {
      // Record decision with appropriate service
      if (this.useAI && this.currentInteractionId) {
        // Update AI feedback with positive rating
        await updateAIFeedback(this.currentInteractionId, 5);
        console.log('✅ Positive feedback sent to AI');
      } else {
        // Record with local service
        recordFoodDecision(
          this.currentDecision.food.id,
          this.currentMood || 'random',
          5,
          this.userContext
        );
      }
      
      // Update stats
      this.updateStats();
      
      // Show success state with AI context
      const message = document.getElementById('result-message');
      if (message) {
        let successMessage = `Perfect! ${this.currentDecision.food.name} it is. Decision made, overthinking stopped!`;
        
        if (this.currentDecision.source === 'ai') {
          successMessage += ' 🤖 AI learns from your choice!';
        }
        
        message.textContent = successMessage;
      }
      
      // Hide modal after delay
      setTimeout(() => {
        this.hideDecisionModal();
        this.resetDecisionState();
      }, 2000);
      
    } catch (error) {
      console.error('Error recording decision:', error);
      // Still proceed with UI updates
      setTimeout(() => {
        this.hideDecisionModal();
        this.resetDecisionState();
      }, 2000);
    }
  }

  async handleTryAgain() {
    await this.triggerHaptic();
    
    // Record negative feedback for AI learning
    if (this.useAI && this.currentInteractionId) {
      try {
        await updateAIFeedback(this.currentInteractionId, 2);
        console.log('📉 Negative feedback sent to AI for learning');
      } catch (error) {
        console.error('Error sending negative feedback:', error);
      }
    }
    
    this.hideDecisionModal();
    
    // Try again with the same mood/context
    if (this.currentMood) {
      const mockEvent = { 
        target: { 
          dataset: { mood: this.currentMood }, 
          classList: { add: () => {}, remove: () => {} } 
        } 
      };
      this.handleMoodSelection(mockEvent);
    } else {
      this.handleQuickDecision();
    }
  }

  resetDecisionState() {
    this.currentDecision = null;
    this.currentMood = null;
    this.currentInteractionId = null;
    
    // Reset UI elements
    const friendResponse = document.getElementById('friend-response');
    const foodSuggestions = document.getElementById('food-suggestions');
    
    if (friendResponse) friendResponse.classList.add('hidden');
    if (foodSuggestions) foodSuggestions.classList.add('hidden');
    
    // Reset mood buttons
    document.querySelectorAll('.mood-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Reset context banner to intelligent state
    this.updateContextBannerWithAI();
  }

  setLoading(loading) {
    this.isLoading = loading;
    const decideBtn = document.getElementById('decide-for-me-btn');
    
    if (decideBtn) {
      decideBtn.style.opacity = loading ? '0.6' : '1';
      decideBtn.style.pointerEvents = loading ? 'none' : 'auto';
      
      // Show loading state
      if (loading) {
        const btnText = decideBtn.querySelector('.btn-text');
        if (btnText) {
          btnText.textContent = this.useAI ? 'AI THINKING...' : 'DECIDING...';
        }
      } else {
        const btnText = decideBtn.querySelector('.btn-text');
        if (btnText) {
          btnText.textContent = 'DECIDE FOR ME';
        }
      }
    }
  }

  async triggerHaptic(type = 'light') {
    if (Capacitor.isNativePlatform()) {
      try {
        const style = type === 'success' ? ImpactStyle.Medium : ImpactStyle.Light;
        await Haptics.impact({ style });
      } catch (error) {
        console.log('Haptic feedback not available');
      }
    }
  }

  isModalVisible() {
    const modal = document.getElementById('decision-modal');
    return modal && !modal.classList.contains('hidden');
  }

  showError(message) {
    console.error('App error:', message);
    
    // Update context banner with error
    this.updateContextBanner(`⚠️ ${message}`);
    
    // Reset after a few seconds
    setTimeout(() => {
      this.updateContextBannerWithAI();
    }, 3000);
  }

  // Debug functions for development
  getAIStatus() {
    return {
      useAI: this.useAI,
      aiStatus: this.aiStatus,
      location: getAILocationContext(),
      hasInteraction: !!this.currentInteractionId
    };
  }

  async testAI() {
    if (!this.useAI) {
      console.log('AI not enabled');
      return;
    }
    
    try {
      console.log('🧪 Testing AI service...');
      const testDecision = await getAIFoodSuggestion('tired', { test: true });
      console.log('🧪 AI test result:', testDecision);
      return testDecision;
    } catch (error) {
      console.error('🧪 AI test failed:', error);
      return null;
    }
  }
}

// Initialize the enhanced app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.vfiedApp = new VFIEDApp();
  
  // Debug helpers for development
  window.vfiedDebug = {
    getAIStatus: () => window.vfiedApp.getAIStatus(),
    testAI: () => window.vfiedApp.testAI(),
    getContext: () => window.vfiedApp.userContext
  };
});

// Export for debugging and testing
export default VFIEDApp;