// VFIED Food Database - Real foods people actually eat

export const FOOD_DATABASE = [
    // Comfort Foods
    {
      id: 'pizza',
      name: 'Pizza',
      emoji: '🍕',
      category: 'comfort',
      tags: ['delivery', 'comfort', 'easy', 'sharing'],
      contexts: ['tired', 'stressed', 'lazy', 'celebrating', 'friday'],
      descriptions: [
        "You know you want it. Stop thinking and just get it.",
        "Classic choice. Can't go wrong with pizza.",
        "Friday vibes. Pizza is the answer.",
        "Life's too short for sad dinners. Get the pizza."
      ],
      nutritionTags: ['carbs', 'protein', 'satisfying'],
      effort: 0, // 0 = no effort, 5 = high effort
      time: 30, // minutes
      cost: 3 // 1-5 scale
    },
    
    {
      id: 'burger',
      name: 'Burger',
      emoji: '🍔',
      category: 'comfort',
      tags: ['delivery', 'comfort', 'protein', 'satisfying'],
      contexts: ['tired', 'stressed', 'hungry', 'post-workout'],
      descriptions: [
        "Burger time. Comfort food that hits every time.",
        "Sometimes you need that burger satisfaction.",
        "Solid choice. Burgers fix most problems.",
        "Get the burger. Add fries. Live your life."
      ],
      nutritionTags: ['protein', 'carbs', 'filling'],
      effort: 0,
      time: 25,
      cost: 3
    },
  
    {
      id: 'chinese',
      name: 'Chinese Takeout',
      emoji: '🥡',
      category: 'comfort',
      tags: ['delivery', 'comfort', 'variety', 'leftovers'],
      contexts: ['tired', 'lazy', 'stressed', 'family'],
      descriptions: [
        "Order extra, you'll want leftovers tomorrow.",
        "Fried rice + whatever. Classic move.",
        "Chinese food is a warm hug in a container.",
        "Sweet and sour everything. Do it."
      ],
      nutritionTags: ['variety', 'vegetables', 'protein'],
      effort: 0,
      time: 20,
      cost: 3
    },
  
    {
      id: 'thai',
      name: 'Thai Food',
      emoji: '🍛',
      category: 'comfort',
      tags: ['delivery', 'spicy', 'flavorful', 'comfort'],
      contexts: ['stressed', 'craving-flavor', 'comfort', 'dinner'],
      descriptions: [
        "Spicy, satisfying, always hits the spot.",
        "Thai food = instant mood boost.",
        "Pad Thai never lets you down.",
        "Sometimes you need those flavors."
      ],
      nutritionTags: ['spicy', 'vegetables', 'protein'],
      effort: 0,
      time: 25,
      cost: 3
    },
  
    {
      id: 'ramen',
      name: 'Ramen',
      emoji: '🍜',
      category: 'comfort',
      tags: ['warm', 'comfort', 'soup', 'satisfying'],
      contexts: ['cold', 'sick', 'comfort', 'evening'],
      descriptions: [
        "Warm, comforting, perfect for right now.",
        "Ramen solves everything. Trust the process.",
        "Soul food in a bowl. Get the ramen.",
        "Hot, filling, exactly what you need."
      ],
      nutritionTags: ['warm', 'broth', 'carbs'],
      effort: 0,
      time: 30,
      cost: 3
    },
  
    // Quick & Easy
    {
      id: 'cereal',
      name: 'Cereal for Dinner',
      emoji: '🥣',
      category: 'easy',
      tags: ['instant', 'easy', 'sweet', 'nostalgic'],
      contexts: ['lazy', 'tired', 'simple', 'late-night'],
      descriptions: [
        "Sometimes cereal for dinner is exactly right.",
        "Simple pleasures. Milk, cereal, done.",
        "Who says adults can't have cereal for dinner?",
        "Zero effort, maximum satisfaction."
      ],
      nutritionTags: ['quick', 'sweet', 'milk'],
      effort: 1,
      time: 2,
      cost: 1
    },
  
    {
      id: 'toast',
      name: 'Toast & Stuff',
      emoji: '🍞',
      category: 'easy',
      tags: ['simple', 'quick', 'customizable', 'comfort'],
      contexts: ['tired', 'simple', 'breakfast-dinner', 'sick'],
      descriptions: [
        "Toast + whatever you have. Perfect.",
        "Avocado, peanut butter, jam - all good.",
        "Simple carbs, simple happiness.",
        "Sometimes simple is exactly right."
      ],
      nutritionTags: ['carbs', 'customizable', 'light'],
      effort: 2,
      time: 5,
      cost: 1
    },
  
    {
      id: 'instant-noodles',
      name: 'Instant Noodles+',
      emoji: '🍜',
      category: 'easy',
      tags: ['quick', 'cheap', 'customizable', 'filling'],
      contexts: ['broke', 'tired', 'dorm', 'late-night'],
      descriptions: [
        "Add an egg, some veggies. Actually decent.",
        "Upgrade your instant noodles game.",
        "5 minutes to something satisfying.",
        "College food that actually works."
      ],
      nutritionTags: ['carbs', 'customizable', 'cheap'],
      effort: 2,
      time: 5,
      cost: 1
    },
  
    // Healthy Options
    {
      id: 'salad-good',
      name: 'Actually Good Salad',
      emoji: '🥗',
      category: 'healthy',
      tags: ['healthy', 'fresh', 'protein', 'vegetables'],
      contexts: ['healthy-streak', 'post-workout', 'guilt', 'lunch'],
      descriptions: [
        "With protein, good dressing, not sad desk salad.",
        "Chipotle bowl, Sweetgreen, somewhere decent.",
        "Salad that doesn't make you sad.",
        "Fresh, filling, actually satisfying."
      ],
      nutritionTags: ['vegetables', 'protein', 'fresh'],
      effort: 1,
      time: 15,
      cost: 3
    },
  
    {
      id: 'protein-bowl',
      name: 'Protein Bowl',
      emoji: '🍗',
      category: 'healthy',
      tags: ['protein', 'post-workout', 'healthy', 'filling'],
      contexts: ['post-workout', 'healthy-streak', 'muscle-building', 'lunch'],
      descriptions: [
        "Rice, chicken, veggies. Hits all the recovery boxes.",
        "Your muscles will thank you.",
        "Post-workout fuel that tastes good.",
        "Protein + carbs + vegetables = perfect."
      ],
      nutritionTags: ['high-protein', 'balanced', 'post-workout'],
      effort: 2,
      time: 20,
      cost: 4
    },
  
    {
      id: 'greek-yogurt',
      name: 'Greek Yogurt + Berries',
      emoji: '🥣',
      category: 'healthy',
      tags: ['protein', 'quick', 'healthy', 'sweet'],
      contexts: ['post-workout', 'healthy', 'quick', 'breakfast'],
      descriptions: [
        "Quick protein, tastes like dessert.",
        "20g protein, 5 minutes, actually satisfying.",
        "Healthy that doesn't feel like punishment.",
        "Sweet, creamy, good for you."
      ],
      nutritionTags: ['high-protein', 'probiotics', 'antioxidants'],
      effort: 1,
      time: 3,
      cost: 2
    },
  
    {
      id: 'sushi',
      name: 'Sushi',
      emoji: '🍣',
      category: 'healthy',
      tags: ['healthy', 'fresh', 'protein', 'treat'],
      contexts: ['healthy-streak', 'celebrating', 'date', 'lunch'],
      descriptions: [
        "Feels like a treat, actually healthy.",
        "Protein + veggies + you feel fancy.",
        "Fresh, clean, makes you feel good.",
        "Healthy food that's also a celebration."
      ],
      nutritionTags: ['lean-protein', 'omega-3', 'fresh'],
      effort: 0,
      time: 30,
      cost: 4
    },
  
    // Celebration Foods
    {
      id: 'steak',
      name: 'Steak Dinner',
      emoji: '🥩',
      category: 'celebration',
      tags: ['celebration', 'expensive', 'protein', 'special'],
      contexts: ['celebrating', 'date', 'achievement', 'weekend'],
      descriptions: [
        "You earned it. Get the expensive cut.",
        "Life's short, celebrations need proper food.",
        "Steak dinner = you're doing something right.",
        "Sometimes you need the good stuff."
      ],
      nutritionTags: ['high-protein', 'iron', 'luxury'],
      effort: 3,
      time: 45,
      cost: 5
    },
  
    {
      id: 'cake',
      name: 'The Whole Dessert',
      emoji: '🍰',
      category: 'celebration',
      tags: ['sweet', 'celebration', 'dessert', 'indulgent'],
      contexts: ['celebrating', 'birthday', 'achievement', 'fuck-it'],
      descriptions: [
        "Cake, ice cream, whatever. Go wild.",
        "Celebration calories don't count (not science, but true).",
        "Life's too short for small desserts.",
        "You're celebrating! Act like it."
      ],
      nutritionTags: ['sugar', 'joy', 'celebration'],
      effort: 0,
      time: 10,
      cost: 3
    },
  
    // Recovery Foods
    {
      id: 'greasy-burger',
      name: 'Greasy Burger',
      emoji: '🍔',
      category: 'recovery',
      tags: ['hangover', 'greasy', 'salt', 'recovery'],
      contexts: ['hungover', 'recovery', 'sick', 'need-grease'],
      descriptions: [
        "Grease + salt + carbs. Science.",
        "Proven hangover cure, don't question it.",
        "Your body is asking for this specifically.",
        "Sometimes grease is medicine."
      ],
      nutritionTags: ['sodium', 'fat', 'hangover-cure'],
      effort: 0,
      time: 20,
      cost: 3
    },
  
    {
      id: 'electrolytes',
      name: 'Electrolyte Drink + Toast',
      emoji: '🥤',
      category: 'recovery',
      tags: ['hydration', 'recovery', 'gentle', 'sick'],
      contexts: ['hungover', 'sick', 'dehydrated', 'recovery'],
      descriptions: [
        "Gentle on stomach, fixes the chemistry.",
        "Coconut water, Gatorade, whatever works.",
        "Your body needs fluids and gentle carbs.",
        "Recovery mode: activated."
      ],
      nutritionTags: ['electrolytes', 'hydration', 'gentle'],
      effort: 1,
      time: 5,
      cost: 2
    },
  
    // Late Night
    {
      id: 'ice-cream',
      name: 'Ice Cream',
      emoji: '🍦',
      category: 'indulgent',
      tags: ['sweet', 'late-night', 'comfort', 'dessert'],
      contexts: ['late-night', 'stressed', 'emotional', 'treat'],
      descriptions: [
        "Life's short. Get the ice cream.",
        "Sometimes dessert is dinner. And that's okay.",
        "Ice cream fixes everything temporarily. That counts.",
        "Frozen happiness in a container."
      ],
      nutritionTags: ['sugar', 'dairy', 'comfort'],
      effort: 1,
      time: 2,
      cost: 2
    },
  
    {
      id: 'tacos',
      name: 'Tacos',
      emoji: '🌮',
      category: 'comfort',
      tags: ['variety', 'fun', 'sharing', 'flavorful'],
      contexts: ['celebrating', 'social', 'dinner', 'weekend'],
      descriptions: [
        "Tacos fix everything. Order extra.",
        "Can't be sad eating tacos. It's science.",
        "Taco Tuesday energy, any day of the week.",
        "Multiple small foods = multiple small joys."
      ],
      nutritionTags: ['variety', 'customizable', 'fun'],
      effort: 0,
      time: 20,
      cost: 3
    }
  ];
  
  // Helper functions
  export const getFoodsByCategory = (category) => {
    return FOOD_DATABASE.filter(food => food.category === category);
  };
  
  export const getFoodsByContext = (context) => {
    return FOOD_DATABASE.filter(food => food.contexts.includes(context));
  };
  
  export const getFoodsByTag = (tag) => {
    return FOOD_DATABASE.filter(food => food.tags.includes(tag));
  };
  
  export const getRandomFood = () => {
    return FOOD_DATABASE[Math.floor(Math.random() * FOOD_DATABASE.length)];
  };
  
  export const getRandomFoodDescription = (food) => {
    return food.descriptions[Math.floor(Math.random() * food.descriptions.length)];
  };
  
  export const getFoodById = (id) => {
    return FOOD_DATABASE.find(food => food.id === id);
  };
  
  // Food categories for organization
  export const FOOD_CATEGORIES = {
    COMFORT: 'comfort',
    EASY: 'easy',
    HEALTHY: 'healthy',
    CELEBRATION: 'celebration',
    RECOVERY: 'recovery',
    INDULGENT: 'indulgent'
  };
  
  // Context mappings for smart suggestions
  export const CONTEXT_FOOD_MAP = {
    'tired': ['pizza', 'chinese', 'burger', 'cereal'],
    'stressed': ['thai', 'ice-cream', 'pizza', 'ramen'],
    'lazy': ['cereal', 'toast', 'instant-noodles', 'pizza'],
    'post-workout': ['protein-bowl', 'greek-yogurt', 'burger'],
    'celebrating': ['steak', 'cake', 'sushi', 'tacos'],
    'hungover': ['greasy-burger', 'electrolytes', 'toast'],
    'healthy-streak': ['salad-good', 'protein-bowl', 'sushi', 'greek-yogurt'],
    'late-night': ['ice-cream', 'cereal', 'instant-noodles'],
    'sick': ['ramen', 'toast', 'electrolytes'],
    'broke': ['instant-noodles', 'toast', 'cereal']
  };