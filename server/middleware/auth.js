// middleware/auth.js - Enhanced Authentication System
import crypto from 'crypto';

// Enhanced API key storage with usage tracking
const API_KEYS = new Map([
  // Demo keys
  ['demo_free_key_123', {
    vendorId: 'demo_restaurant_1',
    plan: 'free',
    usage: 0,
    limit: 1000,
    createdAt: '2024-01-01T00:00:00Z',
    lastUsed: null
  }],
  ['demo_growth_key_456', {
    vendorId: 'demo_restaurant_2', 
    plan: 'growth',
    usage: 0,
    limit: 50000,
    createdAt: '2024-01-01T00:00:00Z',
    lastUsed: null
  }],
  // Production keys (add real ones here)
  ['vfied_prod_key_789', {
    vendorId: 'production_client_1',
    plan: 'scale',
    usage: 0,
    limit: 500000,
    createdAt: '2024-01-01T00:00:00Z',
    lastUsed: null
  }]
]);

// Rate limiting by plan
const RATE_LIMITS = {
  free: { windowMs: 60 * 1000, max: 10 }, // 10 requests per minute
  growth: { windowMs: 60 * 1000, max: 100 }, // 100 requests per minute
  scale: { windowMs: 60 * 1000, max: 1000 } // 1000 requests per minute
};

// Authentication middleware
export function authenticateApiKey(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Unauthorized',
      details: 'Missing or invalid Authorization header. Use: Bearer YOUR_API_KEY'
    });
  }
  
  const apiKey = authHeader.substring(7);
  const keyData = API_KEYS.get(apiKey);
  
  if (!keyData) {
    return res.status(401).json({
      error: 'Unauthorized',
      details: 'Invalid API key'
    });
  }
  
  // Check monthly usage limit
  if (keyData.usage >= keyData.limit) {
    return res.status(429).json({
      error: 'Usage Limit Exceeded',
      details: `Monthly limit of ${keyData.limit} requests exceeded. Upgrade your plan.`,
      currentUsage: keyData.usage,
      limit: keyData.limit,
      plan: keyData.plan
    });
  }
  
  // Update usage
  keyData.usage++;
  keyData.lastUsed = new Date().toISOString();
  
  // Attach to request
  req.apiKey = keyData;
  req.apiKeyString = apiKey;
  
  next();
}

// Optional authentication (for public endpoints)
export function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const apiKey = authHeader.substring(7);
    const keyData = API_KEYS.get(apiKey);
    
    if (keyData && keyData.usage < keyData.limit) {
      keyData.usage++;
      keyData.lastUsed = new Date().toISOString();
      req.apiKey = keyData;
      req.apiKeyString = apiKey;
    }
  }
  
  next();
}

// Usage tracking middleware
export function trackUsage(req, res, next) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const endpoint = req.route?.path || req.path;
    const method = req.method;
    const statusCode = res.statusCode;
    
    // Log usage (in production, send to analytics service)
    console.log(`[USAGE] ${method} ${endpoint} - ${statusCode} - ${duration}ms - API Key: ${req.apiKeyString || 'none'}`);
    
    // Could save to database here
    // saveUsageMetrics({ endpoint, method, duration, statusCode, apiKey: req.apiKeyString });
  });
  
  next();
}

// Generate new API key
export function generateApiKey(plan = 'free') {
  const prefix = plan === 'free' ? 'vfied_free' : 
                 plan === 'growth' ? 'vfied_growth' : 
                 'vfied_scale';
  
  const randomString = crypto.randomBytes(16).toString('hex');
  return `${prefix}_${randomString}`;
}

// Add new API key
export function addApiKey(apiKey, config) {
  const keyConfig = {
    vendorId: config.vendorId || `vendor_${Date.now()}`,
    plan: config.plan || 'free',
    usage: 0,
    limit: config.limit || (config.plan === 'free' ? 1000 : config.plan === 'growth' ? 50000 : 500000),
    createdAt: new Date().toISOString(),
    lastUsed: null,
    ...config
  };
  
  API_KEYS.set(apiKey, keyConfig);
  return keyConfig;
}

// Get API key info
export function getApiKeyInfo(apiKey) {
  return API_KEYS.get(apiKey);
}

// Get all API keys (admin function)
export function getAllApiKeys() {
  return Array.from(API_KEYS.entries()).map(([key, data]) => ({
    apiKey: key.substring(0, 12) + '...', // Partially hidden
    ...data
  }));
}

// Reset monthly usage (run this monthly)
export function resetMonthlyUsage() {
  for (const [key, data] of API_KEYS.entries()) {
    data.usage = 0;
  }
  console.log('Monthly usage reset for all API keys');
}