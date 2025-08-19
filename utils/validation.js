// utils/validation.js - Request Validation Schemas
import Joi from 'joi';

// Validation schemas
export const schemas = {
  location: Joi.object({
    city: Joi.string().min(1).max(100).optional(),
    country: Joi.string().min(2).max(100).required(),
    country_code: Joi.string().length(2).uppercase().required()
  }),

  dietary: Joi.array().items(
    Joi.string().valid('vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'keto', 'halal', 'kosher', 'nut-free', 'paleo', 'pescatarian')
  ).optional(),

  moodIds: Joi.array().items(
    Joi.string().valid(
      'TIRED', 'LOW_ENERGY', 'STRESSED', 'ANXIOUS', 'SAD', 'LOW_MOOD',
      'CELEBRATING', 'HAPPY', 'POST_WORKOUT', 'HUNGRY', 'CRAVING',
      'SICK', 'HUNGOVER', 'BLOATED', 'PMS', 'CRAMPS', 'FOCUSED', 
      'RELAX', 'COZY', 'ADVENTUROUS', 'HOMESICK'
    )
  ).min(1).required(),

  quickDecisionRequest: Joi.object({
    location: Joi.object({
      city: Joi.string().min(1).max(100).optional(),
      country: Joi.string().min(2).max(100).optional(),
      country_code: Joi.string().length(2).uppercase().optional()
    }).optional(),
    dietary: Joi.array().items(
      Joi.string().valid('vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'keto', 'halal', 'kosher', 'nut-free', 'paleo', 'pescatarian')
    ).optional()
  }),

  recommendRequest: Joi.object({
    location: Joi.object({
      city: Joi.string().min(1).max(100).optional(),
      country: Joi.string().min(2).max(100).required(),
      country_code: Joi.string().length(2).uppercase().required()
    }).optional(),
    mood_text: Joi.string().min(1).max(500).optional(),
    mood_ids: Joi.array().items(
      Joi.string().valid(
        'TIRED', 'LOW_ENERGY', 'STRESSED', 'ANXIOUS', 'SAD', 'LOW_MOOD',
        'CELEBRATING', 'HAPPY', 'POST_WORKOUT', 'HUNGRY', 'CRAVING',
        'SICK', 'HUNGOVER', 'BLOATED', 'PMS', 'CRAMPS', 'FOCUSED', 
        'RELAX', 'COZY', 'ADVENTUROUS', 'HOMESICK'
      )
    ).min(1).required(),
    dietary: Joi.array().items(
      Joi.string().valid('vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'keto', 'halal', 'kosher', 'nut-free', 'paleo', 'pescatarian')
    ).optional(),
    goal: Joi.string().max(200).optional(),
    social: Joi.string().valid('solo', 'date', 'family', 'friends', 'work').optional(),
    budget: Joi.string().valid('low', 'medium', 'high').optional(),
    include_restaurants: Joi.boolean().optional()
  })
};

// Validation middleware factory
export function validateRequest(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        value: detail.context?.value
      }));

      return res.status(400).json({
        error: 'Validation Error',
        details: 'Request body validation failed',
        validation_errors: errors
      });
    }

    // Replace req.body with validated/sanitized value
    req.body = value;
    next();
  };
}

// Mood text to ID mapper
export function normalizeMoodText(moodText) {
  if (!moodText) return [];

  const moodMap = {
    // Energy states
    'tired': 'TIRED',
    'exhausted': 'TIRED',
    'sleepy': 'TIRED',
    'low energy': 'LOW_ENERGY',
    'drained': 'LOW_ENERGY',
    
    // Stress & Anxiety
    'stressed': 'STRESSED',
    'stress': 'STRESSED',
    'anxious': 'ANXIOUS',
    'anxiety': 'ANXIOUS',
    'nervous': 'ANXIOUS',
    'worried': 'ANXIOUS',
    
    // Mood states
    'sad': 'SAD',
    'down': 'LOW_MOOD',
    'depressed': 'LOW_MOOD',
    'blue': 'SAD',
    
    // Positive states
    'celebrating': 'CELEBRATING',
    'celebration': 'CELEBRATING',
    'happy': 'HAPPY',
    'excited': 'HAPPY',
    'good': 'HAPPY',
    'great': 'HAPPY',
    
    // Physical states
    'post workout': 'POST_WORKOUT',
    'after gym': 'POST_WORKOUT',
    'exercise': 'POST_WORKOUT',
    'hungry': 'HUNGRY',
    'starving': 'HUNGRY',
    'craving': 'CRAVING',
    'want': 'CRAVING',
    
    // Health states
    'sick': 'SICK',
    'ill': 'SICK',
    'unwell': 'SICK',
    'hungover': 'HUNGOVER',
    'hangover': 'HUNGOVER',
    'bloated': 'BLOATED',
    'pms': 'PMS',
    'period': 'CRAMPS',
    'cramps': 'CRAMPS',
    
    // Intent states
    'focused': 'FOCUSED',
    'concentrate': 'FOCUSED',
    'relax': 'RELAX',
    'chill': 'RELAX',
    'cozy': 'COZY',
    'comfort': 'COZY',
    'adventurous': 'ADVENTUROUS',
    'try something new': 'ADVENTUROUS',
    'homesick': 'HOMESICK',
    'missing home': 'HOMESICK'
  };

  const text = moodText.toLowerCase();
  const detectedMoods = [];

  // Check for exact matches and partial matches
  for (const [keyword, moodId] of Object.entries(moodMap)) {
    if (text.includes(keyword)) {
      detectedMoods.push(moodId);
    }
  }

  // Remove duplicates
  return [...new Set(detectedMoods)];
}

// Country code validator
export function validateCountryCode(countryCode) {
  const supportedCountries = [
    'KE', 'NG', 'GH', 'ZA', 'ET', 'UG', 'TZ', // Africa
    'GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE', // Europe
    'US', 'CA', 'MX', 'BR', 'AR', // Americas
    'IN', 'JP', 'CN', 'TH', 'VN', 'KR', 'SG', // Asia
    'AU', 'NZ' // Oceania
  ];
  
  return supportedCountries.includes(countryCode?.toUpperCase());
}

// Request sanitization
export function sanitizeInput(input) {
  if (typeof input === 'string') {
    return input.trim().substring(0, 1000); // Prevent huge inputs
  }
  return input;
}

// Error response formatter
export function formatValidationError(error) {
  return {
    error: 'Validation Error',
    details: error.message,
    timestamp: new Date().toISOString()
  };
}