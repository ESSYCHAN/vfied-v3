// server/menu_manager.js
// Handles restaurant menu storage and retrieval

import fs from 'fs/promises';
import path from 'path';

class MenuManager {
  constructor() {
    this.menuDataPath = './data/restaurant_menus.json';
    this.menus = new Map();
    this.loadMenus();
  }

  async loadMenus() {
    try {
      const data = await fs.readFile(this.menuDataPath, 'utf8');
      const parsed = JSON.parse(data);
      
      // Store by restaurant and location
      Object.entries(parsed).forEach(([key, menu]) => {
        this.menus.set(key, menu);
      });
    } catch (error) {
      console.log('No existing menus, starting fresh');
      this.menus = new Map();
    }
  }

  async saveMenus() {
    const data = Object.fromEntries(this.menus);
    await fs.writeFile(this.menuDataPath, JSON.stringify(data, null, 2));
  }

  // Add a restaurant's menu
  async addRestaurantMenu(restaurantData) {
    const {
      restaurant_id,
      restaurant_name,
      location,
      menu_items,
      delivery_platforms = {},
      opening_hours = {}
    } = restaurantData;

    const key = `${location.country_code}_${location.city}_${restaurant_id}`;
    
    const menuEntry = {
      restaurant_id,
      restaurant_name,
      location,
      menu_items: menu_items.map(item => ({
        ...item,
        // Ensure each item has required fields
        available: item.available !== false,
        meal_period: this.detectMealPeriod(item),
        search_tags: this.generateSearchTags(item)
      })),
      delivery_platforms, // {deliveroo_id: "xxx", ubereats_id: "yyy"}
      opening_hours,
      updated_at: new Date().toISOString()
    };

    this.menus.set(key, menuEntry);
    await this.saveMenus();
    
    return { success: true, restaurant_id, items_added: menu_items.length };
  }

  // Detect what meal period a dish belongs to
  detectMealPeriod(item) {
    const name = item.name.toLowerCase();
    const tags = (item.tags || []).join(' ').toLowerCase();
    
    // Breakfast indicators
    if (/breakfast|pancake|waffle|omelette|eggs|bacon|cereal|croissant|porridge/.test(name + tags)) {
      return 'breakfast';
    }
    
    // Use existing meal_period if provided
    if (item.meal_period) return item.meal_period;
    
    // Default to all-day
    return 'all_day';
  }

  // Generate search tags for better matching
  generateSearchTags(item) {
    const tags = [...(item.tags || [])];
    const name = item.name.toLowerCase();
    
    // Add cuisine type tags
    if (/curry|tikka|masala|biryani/.test(name)) tags.push('indian');
    if (/sushi|ramen|tempura|teriyaki/.test(name)) tags.push('japanese');
    if (/pasta|pizza|risotto/.test(name)) tags.push('italian');
    if (/burger|fries|wings/.test(name)) tags.push('american');
    
    // Add dietary tags
    if (item.dietary?.vegetarian) tags.push('vegetarian');
    if (item.dietary?.vegan) tags.push('vegan');
    if (item.dietary?.gluten_free) tags.push('gluten-free');
    
    return [...new Set(tags)];
  }

  // Search menus for matching dishes
  async searchMenus({ 
    location, 
    mood_text = '', 
    dietary = [], 
    meal_period = 'all_day',
    attributes = [] // From craving parser: ['spicy', 'comfort', etc]
  }) {
    const results = [];
    const locationKey = `${location.country_code}_${location.city}`;
    
    // Search all menus in this location
    for (const [key, menu] of this.menus) {
      if (!key.startsWith(locationKey)) continue;
      
      // Filter menu items
      const matchingItems = menu.menu_items.filter(item => {
        // Check availability
        if (!item.available) return false;
        
        // Check meal period
        if (meal_period !== 'all_day' && 
            item.meal_period !== 'all_day' && 
            item.meal_period !== meal_period) {
          return false;
        }
        
        // Check dietary restrictions
        if (dietary.length > 0) {
          const itemDietary = item.dietary || {};
          for (const restriction of dietary) {
            if (!itemDietary[restriction.replace('-', '_')]) {
              return false;
            }
          }
        }
        
        // Score based on mood/craving matching
        let score = 0;
        const itemText = `${item.name} ${item.description || ''} ${item.search_tags.join(' ')}`.toLowerCase();
        
        // Check if item matches craving attributes
        for (const attr of attributes) {
          if (itemText.includes(attr)) score += 10;
        }
        
        // Check mood text matching
        const moodWords = mood_text.toLowerCase().split(' ');
        for (const word of moodWords) {
          if (itemText.includes(word)) score += 5;
        }
        
        item.match_score = score;
        return score > 0 || attributes.length === 0; // Include if matches or no specific requirements
      });
      
      // Add restaurant info to each item
      matchingItems.forEach(item => {
        results.push({
          ...item,
          restaurant_name: menu.restaurant_name,
          restaurant_id: menu.restaurant_id,
          delivery_platforms: menu.delivery_platforms,
          location: menu.location
        });
      });
    }
    
    // Sort by match score
    results.sort((a, b) => (b.match_score || 0) - (a.match_score || 0));
    
    return results.slice(0, 10); // Return top 10 matches
  }

  // Get delivery link for a restaurant
  getDeliveryLink(restaurant_id, platform = 'any') {
    for (const [, menu] of this.menus) {
      if (menu.restaurant_id === restaurant_id) {
        const platforms = menu.delivery_platforms || {};
        
        if (platform === 'any') {
          // Return first available platform
          if (platforms.deliveroo_id) {
            return `https://deliveroo.co.uk/menu/${platforms.deliveroo_id}`;
          }
          if (platforms.ubereats_id) {
            return `https://www.ubereats.com/store/${platforms.ubereats_id}`;
          }
        } else if (platforms[`${platform}_id`]) {
          return this.buildPlatformLink(platform, platforms[`${platform}_id`]);
        }
        
        // Fallback to Google search
        return `https://www.google.com/search?q=${encodeURIComponent(menu.restaurant_name + ' ' + menu.location.city + ' delivery')}`;
      }
    }
    return null;
  }

  buildPlatformLink(platform, id) {
    const templates = {
      'deliveroo': `https://deliveroo.co.uk/menu/${id}`,
      'ubereats': `https://www.ubereats.com/store/${id}`,
      'doordash': `https://www.doordash.com/store/${id}`,
      'grubhub': `https://www.grubhub.com/restaurant/${id}`
    };
    return templates[platform] || null;
  }
}

// Integration with your recommendation system
export const menuManager = new MenuManager();

// Enhanced recommendation function that checks restaurant menus
export async function recommendFromMenus(params) {
  const { location, mood_text, dietary, meal_period, cravingAttributes } = params;
  
  // Search restaurant menus
  const menuItems = await menuManager.searchMenus({
    location,
    mood_text,
    dietary,
    meal_period,
    attributes: cravingAttributes
  });
  
  if (menuItems.length === 0) {
    return null; // Fall back to general recommendations
  }
  
  // Format for GPT or direct return
  return menuItems.slice(0, 3).map(item => ({
    name: item.name,
    emoji: item.emoji || '🍽️',
    explanation: item.description || 'Available now at ' + item.restaurant_name,
    restaurant: item.restaurant_name,
    price: item.price,
    delivery_link: menuManager.getDeliveryLink(item.restaurant_id),
    source: 'restaurant_menu'
  }));
}

// Example: Adding a restaurant menu
export async function addSampleRestaurant() {
  await menuManager.addRestaurantMenu({
    restaurant_id: 'dishoom_covent_garden',
    restaurant_name: 'Dishoom Covent Garden',
    location: {
      city: 'London',
      country_code: 'GB',
      address: '12 Upper St Martin\'s Lane'
    },
    delivery_platforms: {
      deliveroo_id: 'dishoom-covent-garden',
      ubereats_id: 'dishoom-london'
    },
    opening_hours: {
      breakfast: '08:00-11:30',
      lunch: '12:00-17:00',
      dinner: '17:00-23:00'
    },
    menu_items: [
      {
        name: 'Bacon Naan Roll',
        emoji: '🥓',
        price: '£7.50',
        description: 'Crispy bacon in fresh naan with cream cheese and herbs',
        tags: ['breakfast', 'signature'],
        meal_period: 'breakfast',
        dietary: { vegetarian: false, vegan: false, gluten_free: false }
      },
      {
        name: 'House Black Daal',
        emoji: '🍛',
        price: '£8.90',
        description: '24-hour slow-cooked black lentils, rich and creamy',
        tags: ['comfort', 'vegetarian', 'signature'],
        meal_period: 'all_day',
        dietary: { vegetarian: true, vegan: false, gluten_free: true }
      },
      {
        name: 'Chicken Ruby',
        emoji: '🍗',
        price: '£15.50',
        description: 'Tender chicken in rich tomato-based curry sauce',
        tags: ['curry', 'dinner', 'popular'],
        meal_period: 'dinner',
        dietary: { vegetarian: false, vegan: false, gluten_free: true }
      }
    ]
  });
}