// VFIED Food Service - The brain behind food decisions

import { 
    FOOD_DATABASE, 
    getFoodsByContext, 
    getFoodsByCategory,
    getRandomFood,
    getRandomFoodDescription,
    CONTEXT_FOOD_MAP 
  } from '../data/foods.js';
  
  import { 
    getMoodResponse, 
    getSmartResponse,
    detectContext 
  } from '../data/responses.js';
  
  // Main food decision engine
  export class FoodDecisionEngine {
    constructor() {
      this.userPreferences = this.loadUserPreferences();
      this.decisionHistory = this.loadDecisionHistory();
    }
  
    // Quick "Decide for Me" - completely random
    getQuickDecision() {
      const food = getRandomFood();
      const description = getRandomFoodDescription(food);
      
      return {
        food,
        description,
        reason: "Random pick - sometimes that's exactly what you need!",
        confidence: 100
      };
    }
  
    // Smart decision based on mood and context
    getMoodBasedDecision(mood, context = {}) {
      try {
        // Get foods that match the mood
        const moodFoods = this.getFoodsForMood(mood);
        
        // Apply context filters
        const contextualFoods = this.applyContextFilters(moodFoods, context);
        
        // Consider user history and preferences
        const personalizedFoods = this.personalizeOptions(contextualFoods, mood);
        
        // Pick the best option
        const selectedFood = this.selectBestFood(personalizedFoods);
        const description = getRandomFoodDescription(selectedFood);
        
        // Generate friend response
        const friendResponse = getSmartResponse(mood, context);
        
        return {
          food: selectedFood,
          description,
          friendResponse,
          reason: this.explainChoice(selectedFood, mood, context),
          confidence: this.calculateConfidence(selectedFood, mood),
          alternatives: personalizedFoods.slice(0, 3)
        };
      } catch (error) {
        console.error('Error in mood-based decision:', error);
        return this.getQuickDecision();
      }
    }
  
    // Get foods that match a specific mood
    getFoodsForMood(mood) {
      const moodKey = mood.toLowerCase().replace(/\s+/g, '-');
      const mappedFoods = CONTEXT_FOOD_MAP[moodKey] || [];
      
      if (mappedFoods.length === 0) {
        // Fallback to category-based selection
        switch (mood.toLowerCase()) {
          case 'tired':
          case 'exhausted':
            return getFoodsByCategory('comfort').concat(getFoodsByCategory('easy'));
          case 'stressed':
            return getFoodsByCategory('comfort');
          case 'celebrating':
            return getFoodsByCategory('celebration');
          case 'hungover':
          case 'sick':
            return getFoodsByCategory('recovery');
          case 'healthy':
          case 'post-workout':
            return getFoodsByCategory('healthy');
          default:
            return getFoodsByCategory('comfort');
        }
      }
      
      return mappedFoods.map(id => FOOD_DATABASE.find(f => f.id === id)).filter(Boolean);
    }
  
    // Apply contextual filters (time, weather, budget, etc.)
    applyContextFilters(foods, context) {
      let filteredFoods = [...foods];
      
      // Time-based filters
      if (context.time) {
        const hour = new Date().getHours();
        if (hour >= 22 || hour <= 6) {
          // Late night - prefer easy/quick options
          filteredFoods = filteredFoods.filter(f => f.effort <= 2);
        }
      }
      
      // Budget filters
      if (context.budget) {
        const maxCost = context.budget === 'low' ? 2 : context.budget === 'medium' ? 3 : 5;
        filteredFoods = filteredFoods.filter(f => f.cost <= maxCost);
      }
      
      // Effort filters
      if (context.maxEffort !== undefined) {
        filteredFoods = filteredFoods.filter(f => f.effort <= context.maxEffort);
      }
      
      // Dietary restrictions
      if (context.dietary) {
        // Add dietary filtering logic here
        // e.g., vegetarian, vegan, gluten-free, etc.
      }
      
      return filteredFoods.length > 0 ? filteredFoods : foods;
    }
  
    // Personalize options based on user history
    personalizeOptions(foods, mood) {
      const history = this.decisionHistory;
      const recentChoices = history.slice(-10); // Last 10 decisions
      
      // Score foods based on user preferences
      const scoredFoods = foods.map(food => {
        let score = 50; // Base score
        
        // Boost score for foods user has liked before
        const pastChoices = recentChoices.filter(choice => choice.foodId === food.id);
        if (pastChoices.length > 0) {
          const avgRating = pastChoices.reduce((sum, choice) => sum + (choice.rating || 3), 0) / pastChoices.length;
          score += (avgRating - 3) * 20; // -40 to +40 points
        }
        
        // Boost score for foods chosen in similar moods
        const moodMatches = recentChoices.filter(choice => 
          choice.mood === mood && choice.rating >= 4
        );
        if (moodMatches.some(choice => choice.foodId === food.id)) {
          score += 30;
        }
        
        // Reduce score for recently chosen foods (variety)
        const recentlyChosen = recentChoices.slice(-3).some(choice => choice.foodId === food.id);
        if (recentlyChosen) {
          score -= 20;
        }
        
        // Time-based preferences
        const hour = new Date().getHours();
        if (hour >= 17 && food.tags.includes('comfort')) score += 10;
        if (hour <= 10 && food.tags.includes('quick')) score += 15;
        
        return { ...food, score };
      });
      
      // Sort by score and return top options
      return scoredFoods.sort((a, b) => b.score - a.score);
    }
  
    // Select the best food from scored options
    selectBestFood(foods) {
      if (foods.length === 0) return getRandomFood();
      
      // Weighted random selection from top 3 options
      const topFoods = foods.slice(0, 3);
      const weights = [0.5, 0.3, 0.2];
      
      const random = Math.random();
      let cumulativeWeight = 0;
      
      for (let i = 0; i < topFoods.length; i++) {
        cumulativeWeight += weights[i];
        if (random <= cumulativeWeight) {
          return topFoods[i];
        }
      }
      
      return topFoods[0];
    }
  
    // Explain why this food was chosen
    explainChoice(food, mood, context) {
      const reasons = [];
      
      if (food.contexts.includes(mood.toLowerCase())) {
        reasons.push(`Perfect for when you're ${mood.toLowerCase()}`);
      }
      
      if (food.effort <= 1) {
        reasons.push("Minimal effort required");
      }
      
      if (food.time <= 10) {
        reasons.push("Quick and easy");
      }
      
      if (food.cost <= 2) {
        reasons.push("Budget-friendly");
      }
      
      const hour = new Date().getHours();
      if (hour >= 17 && food.category === 'comfort') {
        reasons.push("Perfect for evening comfort");
      }
      
      return reasons.length > 0 ? reasons.join(" • ") : "Solid choice that hits the spot";
    }
  
    // Calculate confidence score for the recommendation
    calculateConfidence(food, mood) {
      let confidence = 60; // Base confidence
      
      if (food.contexts.includes(mood.toLowerCase())) confidence += 20;
      if (food.score && food.score > 70) confidence += 15;
      if (this.userHasLikedBefore(food.id)) confidence += 10;
      
      return Math.min(confidence, 95); // Cap at 95%
    }
  
    // Check if user has liked this food before
    userHasLikedBefore(foodId) {
      return this.decisionHistory.some(choice => 
        choice.foodId === foodId && choice.rating >= 4
      );
    }
  
    // Record a food decision
    recordDecision(foodId, mood, rating = null, context = {}) {
      const decision = {
        id: Date.now().toString(),
        foodId,
        mood,
        rating,
        context,
        timestamp: new Date().toISOString(),
        dayOfWeek: new Date().getDay(),
        hour: new Date().getHours()
      };
      
      this.decisionHistory.push(decision);
      this.saveDecisionHistory();
      
      // Update user preferences based on positive ratings
      if (rating >= 4) {
        this.updateUserPreferences(foodId, mood);
      }
      
      return decision;
    }
  
    // Update user preferences
    updateUserPreferences(foodId, mood) {
      if (!this.userPreferences.moodFoodMap) {
        this.userPreferences.moodFoodMap = {};
      }
      
      if (!this.userPreferences.moodFoodMap[mood]) {
        this.userPreferences.moodFoodMap[mood] = {};
      }
      
      if (!this.userPreferences.moodFoodMap[mood][foodId]) {
        this.userPreferences.moodFoodMap[mood][foodId] = 0;
      }
      
      this.userPreferences.moodFoodMap[mood][foodId]++;
      this.saveUserPreferences();
    }
  
    // Get suggestions for a specific category/tab
    getCategorySuggestions(category, count = 4) {
      const foods = getFoodsByCategory(category);
      const personalizedFoods = this.personalizeOptions(foods, category);
      
      return personalizedFoods.slice(0, count).map(food => ({
        food,
        description: getRandomFoodDescription(food),
        reason: this.explainChoice(food, category, {})
      }));
    }
  
    // Get user stats
    getUserStats() {
      const decisions = this.decisionHistory;
      const totalDecisions = decisions.length;
      const avgTimeSaved = totalDecisions * 3.5; // Assume 3.5 minutes saved per decision
      
      const ratedDecisions = decisions.filter(d => d.rating);
      const satisfactionRate = ratedDecisions.length > 0 
        ? Math.round((ratedDecisions.filter(d => d.rating >= 4).length / ratedDecisions.length) * 100)
        : 85; // Default satisfaction rate
      
      return {
        totalDecisions,
        timeSaved: Math.round(avgTimeSaved),
        satisfactionRate,
        recentChoices: decisions.slice(-5)
      };
    }
  
    // Load user preferences from storage
    loadUserPreferences() {
      try {
        const stored = localStorage.getItem('vfied_preferences');
        return stored ? JSON.parse(stored) : {};
      } catch (error) {
        console.error('Error loading user preferences:', error);
        return {};
      }
    }
  
    // Save user preferences to storage
    saveUserPreferences() {
      try {
        localStorage.setItem('vfied_preferences', JSON.stringify(this.userPreferences));
      } catch (error) {
        console.error('Error saving user preferences:', error);
      }
    }
  
    // Load decision history from storage
    loadDecisionHistory() {
      try {
        const stored = localStorage.getItem('vfied_history');
        const history = stored ? JSON.parse(stored) : [];
        
        // Keep only last 100 decisions to prevent storage bloat
        return history.slice(-100);
      } catch (error) {
        console.error('Error loading decision history:', error);
        return [];
      }
    }
  
    // Save decision history to storage
    saveDecisionHistory() {
      try {
        // Keep only last 100 decisions
        const trimmedHistory = this.decisionHistory.slice(-100);
        localStorage.setItem('vfied_history', JSON.stringify(trimmedHistory));
      } catch (error) {
        console.error('Error saving decision history:', error);
      }
    }
  }
  
  // Create singleton instance
  export const foodDecisionEngine = new FoodDecisionEngine();
  
  // Export helper functions
  export const getQuickFoodDecision = () => {
    return foodDecisionEngine.getQuickDecision();
  };
  
  export const getMoodBasedFoodDecision = (mood, context = {}) => {
    return foodDecisionEngine.getMoodBasedDecision(mood, context);
  };
  
  export const recordFoodDecision = (foodId, mood, rating, context) => {
    return foodDecisionEngine.recordDecision(foodId, mood, rating, context);
  };
  
  export const getUserFoodStats = () => {
    return foodDecisionEngine.getUserStats();
  };
  
  export const getCategoryFoodSuggestions = (category, count) => {
    return foodDecisionEngine.getCategorySuggestions(category, count);
  };