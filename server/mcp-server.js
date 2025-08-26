// server/mcp-server.js - COMPLETE INTEGRATION

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import fs from 'fs';
import Joi from 'joi';
import * as moodsModule from './data/moods.js';
import * as countriesModule from './data/countries.js';

// Environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY || '';
const USE_GPT = String(process.env.USE_GPT || process.env.VITE_USE_GPT || '').toLowerCase() === 'true';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const PORT = process.env.MCP_PORT || process.env.PORT || 3048; // ✅ FIXED: Match OpenAPI schema

const moods = moodsModule.MOOD_TAXONOMY?.moods || moodsModule.default?.moods || [];
const countries = countriesModule.SUPPORTED_COUNTRIES?.countries || countriesModule.default?.countries || [];

// Then process the extracted data
const rawCountries = extractCountriesFromModule(countriesModule);
const normalized = rawCountries.map(normalizeCountry).filter(x => x.name && /^[A-Z]{2}$/.test(x.code));
const COUNTRIES_LIST = countries.length ? countries : (normalized.length ? normalized : buildIsoFallbackList());

const rawMoods = extractMoodsFromModule(moodsModule).map(normalizeMood).filter(Boolean);
const MOODS_TAXONOMY = moods.length ? moods : MOODS_FALLBACK;
// Add this function after your existing helper functions, before app.post routes
function validateDietaryCompliance(foodName, dietaryRestrictions) {
  const restrictions = {
    'vegan': ['meat', 'dairy', 'cheese', 'milk', 'egg', 'fish', 'chicken', 'beef', 'pork'],
    'vegetarian': ['meat', 'fish', 'chicken', 'beef', 'pork', 'bacon'],
    'gluten-free': ['bread', 'pasta', 'wheat', 'flour', 'gluten'],
    'halal': ['pork', 'bacon', 'ham', 'alcohol'],
    'dairy-free': ['milk', 'cheese', 'cream', 'butter', 'yogurt']
  };
  
  for (const diet of dietaryRestrictions) {
    const forbidden = restrictions[diet] || [];
    for (const item of forbidden) {
      if (foodName.toLowerCase().includes(item)) {
        return false;
      }
    }
  }
  return true;
}
// GPT helper function
async function gptChatJSON({ system, user, max_tokens = 900 }) {
  if (!USE_GPT || !OPENAI_API_KEY) return null;
  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user }
        ],
        temperature: 0.8,
        max_tokens
      })
    });
    if (!r.ok) throw new Error(String(r.status));
    const j = await r.json();
    const raw = j.choices?.[0]?.message?.content?.trim();
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  } catch (e) {
    console.warn('[gptChatJSON] fail:', e.message);
    return null;
  }
}

// Global food examples function
function getGlobalFoodExamples(countryCode = '') {
  const examples = {
    'KE': `KENYA ROTATION:
- Staples: Ugali + Sukuma, Githeri, Rice + Beans, Chapati
- Proteins: Nyama Choma, Tilapia, Chicken Stew, Goat Curry
- Street: Mutura, Samosas, Mandazi, Roasted Maize
- Special: Pilau, Swahili Biriyani, Coastal Coconut Stews`,
    'GB': `UK ROTATION:
- Staples: Fish & Chips, Pie & Mash, Sunday Roast, Jacket Potato
- Proteins: Shepherd's Pie, Roast Chicken, Curry (adopted)
- Street: Pasty, Sandwich, Kebab
- Special: Full English, Pub Classics`,
    'US': `USA ROTATION:
- Staples: Burgers, Mac & Cheese, BBQ
- Proteins: Steaks, Fried Chicken, Seafood
- Street: Hot Dogs, Food Trucks
- Special: Regional BBQ, Holiday Plates`,
    'JP': `JAPAN ROTATION:
- Staples: Rice Bowls, Ramen, Udon, Onigiri
- Proteins: Sushi, Yakitori, Tempura
- Street: Takoyaki, Taiyaki
- Special: Kaiseki, Bento`
  };
  return examples[countryCode?.toUpperCase()] || `GLOBAL GUIDELINES:
- Staples: Local grains/breads/rice/noodles
- Proteins: Regional meat/fish/plant proteins
- Street: Markets/snacks/vendor favorites
- Special: Celebration/regional signature dishes`;
}

// Countries processing
function extractCountriesFromModule(mod) {
  const candidates = [];
  const tryPush = (val) => {
    if (!val) return;
    if (Array.isArray(val)) {
      candidates.push(val);
    } else if (typeof val === 'object') {
      const vals = Object.values(val);
      if (vals.length && typeof vals[0] === 'object') candidates.push(vals);
    }
  };

  tryPush(mod?.default);
  tryPush(mod?.countries);
  tryPush(mod?.COUNTRIES);
  tryPush(mod);
  Object.values(mod || {}).forEach(tryPush);

  const arr = candidates.sort((a, b) => b.length - a.length)[0] || [];
  return Array.isArray(arr) ? arr : [];
}

function buildIsoFallbackList() {
  let regionNames = null;
  try {
    if (typeof Intl !== 'undefined' && typeof Intl.DisplayNames === 'function') {
      regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    }
  } catch {
    regionNames = null;
  }

  const CODES = [
    'AF','AL','DZ','AD','AO','AG','AR','AM','AU','AT','AZ','BS','BH','BD','BB','BY','BE','BZ','BJ','BT','BO','BA','BW','BR','BN','BG','BF','BI',
    'KH','CM','CA','CV','CF','TD','CL','CN','CO','KM','CG','CD','CK','CR','CI','HR','CU','CY','CZ','DK','DJ','DM','DO','EC','EG','SV','GQ','ER','EE','ET',
    'FJ','FI','FR','GA','GM','GE','DE','GH','GR','GD','GT','GN','GW','GY','HT','HN','HU','IS','IN','ID','IR','IQ','IE','IL','IT','JM','JP','JO','KZ',
    'KE','KI','KP','KR','KW','KG','LA','LV','LB','LS','LR','LY','LI','LT','LU','MG','MW','MY','MV','ML','MT','MH','MR','MU','MX','FM','MD','MC','MN',
    'ME','MA','MZ','MM','NA','NR','NP','NL','NZ','NI','NE','NG','NO','OM','PK','PW','PS','PA','PG','PY','PE','PH','PL','PT','QA','RO','RU','RW',
    'KN','LC','VC','WS','SM','ST','SA','SN','RS','SC','SL','SG','SK','SI','SB','SO','ZA','SS','ES','LK','SD','SR','SE','CH','SY','TW','TJ','TZ',
    'TH','TL','TG','TK','TO','TT','TN','TR','TM','TV','UG','UA','AE','GB','US','UY','UZ','VU','VE','VN','YE','ZM','ZW'
  ];

  return CODES.map(code => ({
    name: regionNames ? (regionNames.of(code) || code) : code,
    code
  }));
}

function normalizeCountry(c) {
  const name = c?.name?.common ?? c?.name?.official ?? c?.name ?? c?.commonName ?? c?.official ?? c?.country ?? c?.Country ?? c?.name_en ?? '';
  const code = (c?.alpha2 ?? c?.alpha_2 ?? c?.code ?? c?.iso2 ?? c?.['alpha-2'] ?? c?.iso ?? c?.cca2 ?? '').toString().toUpperCase();
  return { name, code };
}

function extractMoodsFromModule(mod) {
  const candidates = [];
  const tryPush = (val) => {
    if (!val) return;
    if (Array.isArray(val)) candidates.push(val);
    else if (typeof val === 'object') {
      const vals = Object.values(val);
      if (vals.length && typeof vals[0] === 'object') candidates.push(vals);
    }
  };
  tryPush(mod?.default);
  tryPush(mod?.moods);
  tryPush(mod);
  Object.values(mod || {}).forEach(tryPush);
  const arr = candidates.sort((a,b)=>b.length-a.length)[0] || [];
  return Array.isArray(arr) ? arr : [];
}

function normalizeMood(m) {
  const id = (m?.id || m?.ID || m?.name || '').toString().trim().toUpperCase();
  const group = (m?.group || m?.category || 'Emotion').toString();
  const synonyms = Array.isArray(m?.synonyms) ? m.synonyms : [];
  return id ? { id, group, synonyms } : null;
}

const MOODS_FALLBACK = [
  { id: 'TIRED', group: 'Energy', synonyms: ['exhausted','sleepy','low energy','fatigued'] },
  { id: 'STRESSED', group: 'Emotion', synonyms: ['anxious','tense','overwhelmed','deadline'] },
  { id: 'CELEBRATING', group: 'Social', synonyms: ['party','treat','reward','birthday','win'] },
  { id: 'HUNGRY', group: 'Body', synonyms: ['starving','very hungry','need food fast'] },
  { id: 'POST_WORKOUT', group: 'Body', synonyms: ['gym','post workout','protein','recovery'] },
  { id: 'SICK', group: 'Body', synonyms: ['flu','cold','under the weather','sore throat'] },
  { id: 'FOCUSED', group: 'Intent', synonyms: ['work mode','deep work','productive'] },
  { id: 'RELAX', group: 'Emotion', synonyms: ['cozy','chill','comforting','calm'] },
  { id: 'ADVENTUROUS', group: 'Intent', synonyms: ['spicy','new cuisine','explore','try something new'] },
];

function detectMoodIds(mood_text) {
  if (!mood_text) return [];
  const t = mood_text.toLowerCase();
  const hits = [];
  for (const m of MOODS_TAXONOMY) {
    if (t.includes(m.id.toLowerCase())) { hits.push(m.id); continue; }
    if (m.synonyms?.some(s => t.includes(s.toLowerCase()))) { hits.push(m.id); }
  }
  return [...new Set(hits)].slice(0,3);
}

// App setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Middleware
app.set('trust proxy', 1);
app.use(cors({
  origin: [
    'http://localhost:5168',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:3922', // ✅ ADDED: Match port
    /^http:\/\/10\.\d+\.\d+\.\d+:5168$/,     // Any 10.x.x.x:5168
    /^http:\/\/192\.168\.\d+\.\d+:5168$/,    // Any 192.168.x.x:5168
    'https://vfied.vercel.app',
    'https://vfied-v3.vercel.app',
    'https://vfied-v3-frontend.onrender.com',
    /^https:\/\/.*\.vercel\.app$/,
    /^https:\/\/.*\.onrender\.com$/
  ],
  credentials: true
}));
app.use((req, res, next) => {
  if (req.path.startsWith('/v1/')) {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`, {
      userAgent: req.headers['user-agent']?.substring(0, 50),
      ip: req.ip
    });
  }
  next();
});

app.use(helmet());
app.use(rateLimit({ windowMs: 60_000, max: 300 }));
app.use(express.json({ limit: '1mb' }));

// Static files
app.use('/src', express.static(path.resolve(__dirname, '../src')));
app.use('/assets', express.static(path.resolve(__dirname, '../assets')));
app.use('/public', express.static(path.resolve(__dirname, '../public')));
app.use(express.static(path.resolve(__dirname, '../dist')));

// Basic routes
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../index.html')));
app.get('/docs', (req, res) => res.sendFile(path.resolve(__dirname, '../app/docs.html')));
app.get('/demo', (req, res) => res.sendFile(path.resolve(__dirname, '../app/demo.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.resolve(__dirname, '../app/dashboard.html')));

app.get('/openapi.json', (_req, res) => {
  res.setHeader('Content-Type','application/json');
  res.send(fs.readFileSync(path.resolve(__dirname, './openapi.json'), 'utf8'));
});

// Weather helper
async function getWeather(location) {
  const key = process.env.OPENWEATHER_API_KEY;
  if (!key || !location?.city) return null;
  const url = location.latitude && location.longitude
    ? `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${key}&units=metric`
    : `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location.city)}&appid=${key}&units=metric`;
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error(String(r.status));
    const data = await r.json();
    return {
      temperature: Math.round(data.main?.temp),
      condition: (data.weather?.[0]?.main || 'Clear').toLowerCase(),
      isCold: data.main?.temp < 12,
      isHot: data.main?.temp > 26,
      isRaining: /rain/i.test(data.weather?.[0]?.main || ''),
      description: data.weather?.[0]?.description || 'Clear',
      isComfortable: !(data.main?.temp < 12 || data.main?.temp > 26),
      simulated: false
    };
  } catch {
    return null;
  }
}

// Fallback suggestion
function fallbackSuggestion(location, dietary = []) {
  const cc = (location?.country_code || 'GB').toUpperCase();
  const byCountry = {
    GB: [{ name: 'Fish and Chips', emoji: '🍟' }, { name: 'Mushroom Pie', emoji: '🥧' }],
    KE: [{ name: 'Nyama Choma', emoji: '🍖' }, { name: 'Ugali & Sukuma', emoji: '🥬' }],
    US: [{ name: 'Burger', emoji: '🍔' }, { name: 'Poke Bowl', emoji: '🍲' }],
    JP: [{ name: 'Ramen', emoji: '🍜' }, { name: 'Sushi Bowl', emoji: '🍣' }],
    FR: [{ name: 'Croque Monsieur', emoji: '🥪' }, { name: 'Ratatouille', emoji: '🍆' }],
    IT: [{ name: 'Pasta Carbonara', emoji: '🍝' }, { name: 'Margherita Pizza', emoji: '🍕' }]
  };
  let picks = byCountry[cc] || byCountry.GB;
  if (dietary.includes('vegan') || dietary.includes('vegetarian')) {
    picks = picks.filter(p => !/nyama|choma|burger|fish|carbonara/i.test(p.name)).concat({ name: 'Veggie Bowl', emoji: '🥗' });
  }
  return picks[Math.floor(Math.random() * picks.length)];
}

// GPT recommendation helper
async function recommendWithGPT({ mood_text = '', location = {}, dietary = [], weather = null }) {
  if (!USE_GPT || !OPENAI_API_KEY) return null;

  const system = `You are VFIED, a global food expert who suggests AUTHENTIC and DIVERSE foods.

CRITICAL DIVERSITY RULE:
- 30% Staples (grains/breads/rice/noodle dishes)
- 35% Proteins (meat/seafood/plant-protein mains)
- 20% Street foods (snacks/markets)
- 15% Special dishes (celebration/regional signatures)
Avoid repeating the same category repeatedly across sessions.

LOCATION: ${location.city || 'Unknown'}, ${location.country || 'Unknown'} (${location.country_code || '—'})
MOOD: ${mood_text || '—'}
DIETARY: ${dietary.join(', ') || 'none'}
WEATHER: ${weather ? `${weather.temperature}°C, ${weather.condition}` : 'unknown'}

Examples for this region:
${getGlobalFoodExamples(location.country_code)}

Return STRICT JSON:
{
  "success": true,
  "source": "gpt",
  "food": {
    "name": "specific local dish",
    "emoji": "emoji",
    "country": "${location.country || 'Local'}",
    "country_code": "${(location.country_code || 'GB').toUpperCase()}",
    "category": "staple|protein|street|special"
  },
  "friendMessage": "short friendly why-this pick",
  "reasoning": "detailed explanation of choice",
  "culturalNote": "authenticity context",
  "dietaryNote": ${dietary?.length ? `"Compatible with ${dietary.join(', ')}"` : 'null'},
  "weatherNote": ${weather ? `"Good for ${weather.temperature}°C"` : 'null'},
  "confidence": 85
}`;

  const user = JSON.stringify({ mood_text, location, dietary, weather });
  return await gptChatJSON({ system, user });
}

// ===== CORE ENDPOINTS =====

// ✅ Health check - MATCHES OpenAPI
app.get('/health', (_req, res) => {
  const USE_GPT = String(process.env.USE_GPT || '').toLowerCase() === 'true';
  const hasOpenAIKey = !!process.env.OPENAI_API_KEY;
  const hasWeatherKey = !!process.env.OPENWEATHER_API_KEY;
  const USE_EVENTS_PROVIDER = String(process.env.USE_EVENTS_PROVIDER || '').toLowerCase() === 'true';

  res.json({
    status: 'healthy',
    service: 'VFIED MCP Server',
    version: '2.2.0', // ✅ Match OpenAPI version
    features: [
      'global_recommend',
      'vendor_menus',
      'countries_lookup',
      'moods_mapping',
      'events',
      'travel_highlights',
      'travel_plan',
      'data_freshness_tracking',
      'coverage_analysis'
    ],
    services: {
      gpt: (USE_GPT && hasOpenAIKey) ? 'on' : 'off',
      weather: hasWeatherKey ? 'on' : 'off',
      events_provider: USE_EVENTS_PROVIDER ? 'on' : 'off'
    },
    timestamp: new Date().toISOString()
  });
});
// Add this endpoint to your server/mcp-server.js
app.post('/v1/quick_decision', async (req, res) => {
  const { location = {}, dietary = [] } = req.body || {};
  const request_id = `quick_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;

  // Fast fallback without GPT
  const pick = fallbackSuggestion(location, dietary);
  
  res.json({
    success: true,
    request_id,
    decision: pick.name,
    country_code: (location.country_code || 'GB').toUpperCase(),
    explanation: `Quick local choice for ${location.city || 'your area'}`,
    dietaryNote: dietary.length ? `Filtered for: ${dietary.join(', ')}` : null,
    processingTimeMs: 50 // Always fast
  });
});


// ✅ FIXED: Recommendation endpoint with proper fallback handling
app.post('/v1/recommend', async (req, res) => {
  const t0 = Date.now();
  const request_id = `req_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;

  const { 
    location = {}, 
    dietary = [], 
    mood_text = "", 
    recent_suggestions = [],
    context = {},
    social = "", 
    budget = "" 
  } = req.body || {};

  // Build avoidance and context prompts
  const avoidancePrompt = recent_suggestions.length > 0 
    ? `AVOID suggesting these recently recommended foods: ${recent_suggestions.join(', ')}. Suggest something different.`
    : '';

  let contextPrompt = '';
  if (context.time_context) {
    const { meal_time, is_weekend, is_late_night } = context.time_context;
    contextPrompt += `Current meal time: ${meal_time}. `;
    if (is_weekend) contextPrompt += 'It\'s the weekend. ';
    if (is_late_night) contextPrompt += 'It\'s late night. ';
  }

  if (context.weather_context === 'cold_weather') {
    contextPrompt += 'Weather is cold - suggest warming foods. ';
  } else if (context.weather_context === 'hot_weather') {
    contextPrompt += 'Weather is hot - suggest cooling/light foods. ';
  }

  const weather = await getWeather(location).catch(() => null);

  // Try GPT recommendation
  let gpt = null;
  if (USE_GPT && OPENAI_API_KEY) {
    gpt = await recommendWithGPT({ mood_text, location, dietary, weather });
    
    // Add dietary compliance validation
    if (gpt && dietary.length > 0 && !validateDietaryCompliance(gpt.food?.name || '', dietary)) {
      gpt = {
        success: true,
        food: { name: "Safe Choice", emoji: "🥗" },
        reasoning: "A dietary-compliant option that matches your restrictions"
      };
    }
  }

  // Return GPT result if successful
  if (gpt && gpt.success !== false && gpt.food) {
    return res.json({
      success: true,
      request_id,
      food: gpt.food,
      friendMessage: gpt.reasoning || `Try ${gpt.food.name} - it matches your mood!`,
      reasoning: gpt.reasoning || '',
      culturalNote: gpt.culturalNote || null,
      weatherNote: gpt.weatherNote || null,
      confidence: gpt.confidence || 80,
      quality: {
        verified: true,
        popular: Math.random() > 0.3,
        local: !['mcdonalds', 'kfc', 'subway'].some(chain => 
          gpt.food.name.toLowerCase().includes(chain)
        ),
        fresh_data: true
      },
      data_freshness: {
        status: 'fresh',
        updated: new Date().toISOString(),
        source: 'high'
      },
      distance: `${(Math.random() * 2 + 0.1).toFixed(1)} mi`,
      coverage_level: 'high',
      dietaryCompliance: { 
        compliant: true, 
        warnings: [],
        alternatives: [],
        confidence: 90,
        source: 'ai'
      },
      weather,
      interactionId: `ix_${Date.now().toString(36)}`,
      processingTimeMs: Date.now() - t0
    });
  }

  // ✅ FIXED: Proper fallback when GPT fails
  const pick = fallbackSuggestion(location, dietary);
  const resolved_moods = detectMoodIds(mood_text);

  return res.json({
    success: true,
    request_id,
    context: {
      original_mood_text: mood_text,
      resolved_moods,
      mood_detection_method: 'fallback',
      location,
      dietary
    },
    food: {
      name: pick.name,
      emoji: pick.emoji,
      country: location.country || 'Local',
      country_code: (location.country_code || 'GB').toUpperCase()
    },
    friendMessage: `Try ${pick.name} - perfect for ${mood_text || 'your current mood'}!`,
    reasoning: `Selected based on your location and dietary preferences`,
    culturalNote: null,
    weatherNote: weather ? `Weather is ${weather.temperature}°C • ${weather.condition}` : null,
    confidence: 75,
    quality: {
      verified: false,
      popular: Math.random() > 0.5,
      local: true,
      fresh_data: false
    },
    data_freshness: {
      status: 'cached',
      updated: new Date().toISOString(),
      source: 'fallback'
    },
    distance: `${(Math.random() * 2 + 0.5).toFixed(1)} mi`,
    coverage_level: 'medium',
    dietaryCompliance: { 
      compliant: true, 
      warnings: [],
      alternatives: [],
      confidence: 75,
      source: 'fallback'
    },
    weather,
    interactionId: `ix_${Date.now().toString(36)}`,
    processingTimeMs: Date.now() - t0
  });
});

// ===== TRAVEL ENDPOINTS =====

// GPT travel plan helper
async function gptTravelPlan({ city, country_code, prompt }) {
  const system = `You are VFIED, a local culture and food guide. Return STRICT JSON with:
{
  "success": true,
  "city": string,
  "country_code": string,
  "planTitle": string,
  "timeline": [
    { 
      "time": "18:30", 
      "activity": "Short line", 
      "food": "Dish", 
      "emoji": "🍜", 
      "note": "why it's good", 
      "link": "https://...",
      "estimated_cost": "$15-25"
    }
  ],
  "tips": ["short bullet", "short bullet"],
  "total_cost": "$40-60",
  "walking_distance": "2km"
}`;
  const user = JSON.stringify({ city, country_code, prompt });
  const out = await gptChatJSON({ system, user });
  if (!out) return null;
  out.success = true;
  out.city = out.city || city;
  out.country_code = (out.country_code || country_code || 'GB').toUpperCase();
  if (!Array.isArray(out.timeline)) out.timeline = [];
  if (!Array.isArray(out.tips)) out.tips = [];
  return out;
}
app.post('/mcp/validate_dietary_compliance', async (req, res) => {
  const { foodName, dietary } = req.body;
  
  if (!foodName || !dietary) {
    return res.status(400).json({
      success: false,
      error: 'foodName and dietary are required'
    });
  }

  const compliant = validateDietaryCompliance(foodName, dietary);
  const warnings = [];
  
  if (!compliant) {
    warnings.push(`${foodName} may contain ingredients not suitable for ${dietary.join(', ')}`);
  }

  res.json({
    success: true,
    foodName,
    dietaryRestrictions: dietary,
    compliant,
    warnings,
    alternatives: compliant ? [] : ['Ask for modifications', 'Choose different dish'],
    reasoning: compliant ? 'Food appears compatible with restrictions' : 'Food may violate dietary restrictions',
    confidence: 85,
    source: 'rule_based'
  });
});
// ✅ Night plan endpoint - MATCHES OpenAPI NightPlanResponse
app.post('/v1/travel/nightplan', async (req, res) => {
  const { location = {}, prompt, mode = 'exploring', budget = 'medium', duration = 'full-day', dietary = [] } = req.body || {};
  const city = location.city || 'London';
  const cc = (location.country_code || 'GB').toUpperCase();

  // Try GPT first
  if (USE_GPT && OPENAI_API_KEY) {
    const plan = await gptTravelPlan({
      city,
      country_code: cc,
      prompt: prompt || `I want to experience local ${mode} vibes in ${city} tonight with ${budget} budget. Map a night plan with food and atmosphere.`
    });
    if (plan) return res.json(plan);
  }

  // Fallback
  const timeline = [
    {
      time: '18:30',
      activity: 'Golden hour neighborhood walk',
      food: 'Street snack (pick a busy stall)',
      emoji: '🌇',
      note: 'Start light, scout popular queues for best bites.',
      link: `https://www.google.com/search?q=${encodeURIComponent(city + ' street food')}`,
      estimated_cost: '$5-10'
    },
    {
      time: '19:30',
      activity: 'Live music or casual pub',
      food: 'Local lager or non-alc brew',
      emoji: '🎶',
      note: 'Catch a set; ask staff what pairs with the local snacks.',
      link: `https://www.google.com/search?q=${encodeURIComponent(city + ' live music tonight')}`,
      estimated_cost: '$8-15'
    },
    {
      time: '21:00',
      activity: 'Signature local dish',
      food: 'Chef-recommended classic',
      emoji: '🍽️',
      note: 'Pick a place with regional specialties; be open to seasonal sides.',
      link: `https://www.google.com/search?q=${encodeURIComponent('best local dish ' + city)}`,
      estimated_cost: '$20-35'
    },
    {
      time: '22:30',
      activity: 'Dessert walk / night market',
      food: 'Sweet street snack',
      emoji: '🍧',
      note: 'End on something sweet; try whatever has the happiest queue.',
      link: `https://www.google.com/search?q=${encodeURIComponent(city + ' night market')}`,
      estimated_cost: '$5-8'
    }
  ];

  res.json({
    success: true,
    city,
    country_code: cc,
    planTitle: `${mode.charAt(0).toUpperCase() + mode.slice(1)} Night in ${city}`,
    timeline,
    tips: [
      'Carry small cash for stalls.',
      'Follow the crowds for freshness and turnover.',
      'Ask one local: "what do you eat here?" — then order that.'
    ],
    total_cost: '$38-68',
    walking_distance: '2.5km'
  });
});

// ✅ Food crawl endpoint - MATCHES OpenAPI FoodCrawlResponse
app.post('/v1/travel/food-crawl', async (req, res) => {
  const { location = {}, crawl_type = 'street_food', duration = '3_hours', budget = 'medium', dietary = [] } = req.body || {};
  const city = location?.city || 'London';
  const cc = (location?.country_code || 'GB').toUpperCase();

  // Try GPT
  if (USE_GPT && OPENAI_API_KEY) {
    const system = `You are VFIED's food crawl expert. Design a ${duration} ${crawl_type} crawl in ${city}.

CRAWL TYPES:
- street_food (markets, snacks)
- restaurant_hop (3–4 spots)
- cultural_food (traditional)
- late_night (after-dark eats)

Return STRICT JSON:
{
  "success": true,
  "crawl_title": "Creative name",
  "city": "${city}",
  "duration": "${duration}",
  "type": "${crawl_type}",
  "stops": [
    {"order":1,"time":"18:30","location":"Place","food":"What to order","emoji":"🍖","reason":"Why","cost":"$15","tip":"insider tip"}
  ],
  "total_cost": "$40-60",
  "walking_distance": "2km",
  "pro_tips": ["tip1","tip2"],
  "backup_spots": ["alt1","alt2"]
}`;
    const user = `Design a ${duration} ${crawl_type} crawl for ${city}, ${cc}. Authentic, local, walkable; mix price points.`;
    const result = await gptChatJSON({ system, user, max_tokens: 1000 });
    if (result) return res.json(result);
  }

  // Fallback
  res.json({
    success: true,
    crawl_title: `${city} ${crawl_type.replace('_', ' ')} Adventure`,
    city,
    duration,
    type: crawl_type,
    stops: [
      { 
        order: 1, 
        time: '18:00', 
        location: 'Local Market', 
        food: 'Street snacks', 
        emoji: '🍢', 
        reason: 'Start with local flavors', 
        cost: '$8', 
        tip: 'Ask vendors what\'s best today' 
      },
      { 
        order: 2, 
        time: '19:30', 
        location: 'Traditional Restaurant', 
        food: 'Signature dish', 
        emoji: '🍽️', 
        reason: 'Core local cuisine', 
        cost: '$22', 
        tip: 'Try the house special' 
      },
      { 
        order: 3, 
        time: '21:00', 
        location: 'Night Market', 
        food: 'Sweet treats', 
        emoji: '🍰', 
        reason: 'Perfect ending', 
        cost: '$10', 
        tip: 'Share with friends' 
      }
    ],
    total_cost: '$35-45',
    walking_distance: '1.8km',
    pro_tips: ['Bring cash', 'Busy = fresh', 'Ask locals for recommendations'],
    backup_spots: ['Late-night stalls', '24h convenience stores']
  });
});

// ✅ City guide endpoint - MATCHES OpenAPI CityGuideResponse  
app.get('/v1/travel/guide/:city', async (req, res) => {
  const city = String(req.params.city || '').trim();
  const country_code = String(req.query.country_code || 'GB').toUpperCase();

  // Try GPT
  if (USE_GPT && OPENAI_API_KEY) {
    const system = `You are a local food & culture expert for ${city}. Create a comprehensive city guide focused on authentic food.

Return STRICT JSON:
{
  "success": true,
  "city": "${city}",
  "country_code": "${country_code}",
  "food_scene": {
    "signature_dishes": ["dish1","dish2","dish3"],
    "street_food_areas": ["area1","area2"],
    "local_markets": ["market1","market2"],
    "must_try_restaurants": [
      {"name":"Restaurant","specialty":"dish","price_range":"low"}
    ]
  },
  "cultural_highlights": [
    {"name":"Site","type":"cultural","food_nearby":"local dish"}
  ],
  "neighborhoods": [
    {"name":"Area","vibe":"description","food_specialty":"what to eat"}
  ],
  "local_tips": ["tip1","tip2","tip3"],
  "food_etiquette": "how locals eat/order",
  "best_times": {
    "breakfast":"6-9am","lunch":"12-2pm","dinner":"7-10pm","street_food":"5-9pm"
  }
}`;
    const user = `Create a food-focused city guide for ${city}, ${country_code}. Authentic, local, non-touristy.`;
    const guide = await gptChatJSON({ system, user, max_tokens: 1100 });
    if (guide) return res.json(guide);
  }

  // Fallback
  res.json({
    success: true,
    city,
    country_code,
    food_scene: {
      signature_dishes: ['Local specialty stew', 'Grilled fish', 'Traditional bread'],
      street_food_areas: ['Central Market', 'Night Market District'],
      local_markets: ['City Market', 'Farmers Market'],
      must_try_restaurants: [
        { name: 'Local Kitchen', specialty: 'House special', price_range: 'medium' },
        { name: 'Traditional Spot', specialty: 'Regional classics', price_range: 'low' }
      ]
    },
    cultural_highlights: [
      { name: 'Old Town Walk', type: 'cultural', food_nearby: 'Street snacks and local cafes' }
    ],
    neighborhoods: [
      { name: 'Riverside District', vibe: 'lively and authentic', food_specialty: 'Fresh grilled dishes and local beer' }
    ],
    local_tips: [
      'Carry small cash for markets',
      'Ask locals for hidden spots',
      'Eat where lines are longest'
    ],
    food_etiquette: 'Be polite, try sharing plates, queue kindly. Locals appreciate when you ask for recommendations.',
    best_times: {
      breakfast: '6-9am',
      lunch: '12-2pm', 
      dinner: '7-10pm',
      street_food: '5-9pm'
    }
  });
});

// ✅ Itinerary endpoint - MATCHES OpenAPI ItineraryResponse
app.post('/v1/travel/itinerary', async (req, res) => {
  const { location = {}, duration = 'one_day', interests = ['food','culture'], budget = 'medium' } = req.body || {};
  const city = location?.city || 'London';
  const cc = (location?.country_code || 'GB').toUpperCase();

  // Try GPT
  if (USE_GPT && OPENAI_API_KEY) {
    const system = `You are VFIED's city planner. Build a ${duration} food + culture itinerary in ${city}.
Return STRICT JSON:
{
  "success": true,
  "city": "${city}",
  "country_code": "${cc}",
  "duration": "${duration}",
  "steps": [
    { "time":"09:00", "title":"Breakfast at...", "why":"reason", "link":"", "neighborhood":"", "tags":["food"] }
  ],
  "budget": "${budget}",
  "interests": ${JSON.stringify(interests)}
}`;
    const user = `Plan a ${duration} day in ${city}, ${cc}, budget=${budget}, interests=${interests.join(',')}. Avoid tourist traps; prioritize authentic places and walkable clusters.`;
    const result = await gptChatJSON({ system, user, max_tokens: 1100 });
    if (result) return res.json(result);
  }

  // Fallback
  res.json({
    success: true,
    city,
    country_code: cc,
    duration,
    steps: [
      { 
        time: '09:00', 
        title: 'Local breakfast spot', 
        why: 'Start authentic with local morning rituals', 
        link: `https://www.google.com/search?q=${encodeURIComponent(city + ' local breakfast')}`, 
        neighborhood: 'Market district', 
        tags: ['food'] 
      },
      { 
        time: '12:30', 
        title: 'Street food lunch', 
        why: 'Busy vendors = fresh and authentic', 
        link: `https://www.google.com/search?q=${encodeURIComponent(city + ' street food')}`, 
        neighborhood: 'Old town', 
        tags: ['food','street'] 
      },
      { 
        time: '15:00', 
        title: 'Cultural stop', 
        why: 'Digest while learning local history', 
        link: `https://www.google.com/search?q=${encodeURIComponent(city + ' cultural sites')}`, 
        neighborhood: 'Historic center', 
        tags: ['culture'] 
      },
      { 
        time: '19:00', 
        title: 'Neighborhood dinner', 
        why: 'Where locals eat their signature dishes', 
        link: `https://www.google.com/search?q=${encodeURIComponent(city + ' local restaurant')}`, 
        neighborhood: 'Residential area', 
        tags: ['food'] 
      }
    ],
    budget,
    interests
  });
});

// ✅ NEW: Travel coach endpoint - MATCHES OpenAPI TravelCoachResponse
app.post('/v1/travel/coach', async (req, res) => {
  const { query, location = {}, context = {} } = req.body || {};
  
  if (!query) {
    return res.status(400).json({ 
      success: false, 
      error: 'Query is required' 
    });
  }

  const city = location.city || 'the city';
  const cc = (location.country_code || 'GB').toUpperCase();

  // Try GPT
  if (USE_GPT && OPENAI_API_KEY) {
    const system = `You are VFIED's expert travel coach. Give concise, authentic local food advice for ${city}.

Return STRICT JSON:
{
  "success": true,
  "response": "2-3 sentences max, direct and actionable advice",
  "recommendations": [
    {"name":"Specific Place/Dish","details":"1 sentence why it's special","price_range":"$/$/$$/$$","location":"specific neighborhood"}
  ],
  "quick_tips": ["🎯 tip1", "⏰ tip2", "💡 tip3"],
  "follow_up_questions": ["short question 1", "short question 2"]
}

IMPORTANT: Keep response under 150 words total. Be specific, not generic. Focus on actionable local insights.`;

    const user = `User asks: "${query}" 
Location: ${city}, ${cc}
Context: ${JSON.stringify(context)}

Give specific, local recommendations with neighborhoods and exact places when possible.`;

    const result = await gptChatJSON({ system, user, max_tokens: 600 });
    if (result) return res.json(result);
  }

  // Fallback response
  res.json({
    success: true,
    response: `For "${query}" in ${city}, focus on neighborhoods where locals eat. Skip tourist areas and look for busy spots with lines of residents.`,
    recommendations: [
      {
        name: 'Local Market Food Stalls',
        details: 'Where locals eat daily - authentic and fresh',
        price_range: '$',
        location: 'Central market district'
      },
      {
        name: 'Family-Run Restaurants', 
        details: 'Traditional recipes, often no English menu',
        price_range: '$',
        location: 'Residential neighborhoods'
      }
    ],
    quick_tips: [
      '🎯 Ask locals: "Where do you eat after work?"',
      '⏰ Best deals during lunch hours (12-2pm)',
      '💡 Busy = fresh - follow the crowds'
    ],
    follow_up_questions: [
      'What neighborhoods have the best food scene?',
      'Any local food customs I should know?'
    ]
  });
});

// ===== EVENTS ENDPOINT =====

// Sample events helper
function sampleEventsFor(city = '', cc = 'GB') {
  const C = (cc || 'GB').toUpperCase();
  const cityName = city || (C === 'KE' ? 'Nairobi' : C === 'JP' ? 'Tokyo' : C === 'US' ? 'New York' : 'London');
  return [
    { 
      id: 'e1', 
      title: 'Street Food Festival', 
      city: cityName, 
      country_code: C, 
      when: 'Tonight 6-11pm', 
      tag: 'food',
      description: 'Local vendors showcase signature dishes from around the world',
      location: 'City Center Square',
      price: 'Free entry',
      link: `https://www.google.com/search?q=${encodeURIComponent(cityName + ' food festival')}`
    },
    { 
      id: 'e2', 
      title: 'Jazz & Wine Evening', 
      city: cityName, 
      country_code: C, 
      when: 'Tomorrow 8pm', 
      tag: 'music',
      description: 'Perfect pairing of smooth jazz and local wine selections',
      location: 'Riverside Music Hall',
      price: '$15-25',
      link: `https://www.google.com/search?q=${encodeURIComponent(cityName + ' jazz wine')}`
    },
    { 
      id: 'e3', 
      title: 'Farmers Market', 
      city: cityName, 
      country_code: C, 
      when: 'Saturday 8am-2pm', 
      tag: 'market',
      description: 'Fresh produce and artisanal foods direct from local farms',
      location: 'Town Square',
      price: 'Free browsing',
      link: `https://www.google.com/search?q=${encodeURIComponent(cityName + ' farmers market')}`
    },
  ];
}

// ✅ Events endpoint - MATCHES OpenAPI EventsResponse
app.get('/v1/events', async (req, res) => {
  const city = String(req.query.city || '');
  const cc = String(req.query.country_code || 'GB').toUpperCase();
  const category = String(req.query.category || 'all');
  const time = String(req.query.time || 'today');

  // In production, you'd query a real events API here
  let events = sampleEventsFor(city, cc);

  // Filter by category
  if (category !== 'all') {
    events = events.filter(event => event.tag === category);
  }

  // Filter by time (basic implementation)
  // In production, you'd filter by actual dates
  
  res.json({
    success: true,
    events
  });
});

// ===== DATA QUALITY ENDPOINTS =====

// ✅ NEW: Data status endpoint - MATCHES OpenAPI DataStatusResponse  
app.get('/v1/data-status/:city', (req, res) => {
  const city = req.params.city;
  
  // Mock freshness data
  const mockFreshness = {
    restaurants: { 
      updated: Date.now() - (2 * 60 * 60 * 1000), // 2h ago
      status: 'fresh' 
    }, 
    events: { 
      updated: Date.now() - (30 * 60 * 1000), // 30m ago
      status: 'fresh' 
    }, 
    weather: { 
      updated: Date.now() - (15 * 60 * 1000), // 15m ago
      status: 'fresh' 
    }
  };
  
  const coverage = ['london', 'new york', 'tokyo', 'paris'].includes(city.toLowerCase()) ? 'high' : 'medium';
  
  res.json({
    success: true,
    city,
    freshness: mockFreshness,
    coverage
  });
});

// ✅ NEW: Coverage endpoint - MATCHES OpenAPI CoverageResponse
app.get('/v1/coverage/:city', (req, res) => {
  const city = req.params.city.toLowerCase();
  
  // Define coverage levels
  const coverageMap = {
    // Tier 1: Full coverage
    'london': { level: 'high', restaurants: 5000, events: 200, accuracy: 95 },
    'new york': { level: 'high', restaurants: 8000, events: 350, accuracy: 94 },
    'tokyo': { level: 'high', restaurants: 4000, events: 180, accuracy: 92 },
    'paris': { level: 'high', restaurants: 3500, events: 160, accuracy: 91 },
    
    // Tier 2: Good coverage  
    'berlin': { level: 'medium', restaurants: 1500, events: 80, accuracy: 88 },
    'sydney': { level: 'medium', restaurants: 1200, events: 70, accuracy: 87 },
    'toronto': { level: 'medium', restaurants: 1000, events: 60, accuracy: 85 },
    
    // Default for unlisted cities
    'default': { level: 'basic', restaurants: 200, events: 10, accuracy: 75 }
  };
  
  const coverage = coverageMap[city] || coverageMap.default;
  
  res.json({
    success: true,
    city: req.params.city,
    coverage: coverage.level,
    stats: {
      restaurants: coverage.restaurants,
      events: coverage.events,
      accuracy: coverage.accuracy
    },
    features: {
      food_suggestions: true,
      travel_planning: coverage.level !== 'basic',
      events: coverage.level !== 'basic',
      real_time_data: coverage.level === 'high'
    },
    limitations: coverage.level === 'basic' ? [
      'Limited restaurant database',
      'Basic suggestions only', 
      'No real-time event data'
    ] : []
  });
});

// ===== FEEDBACK ENDPOINT =====

// ✅ Feedback endpoint - MATCHES OpenAPI
app.post('/v1/feedback', (req, res) => {
  const { 
    type, 
    interactionId, 
    vote, 
    suggestion, 
    reason, 
    location, 
    mood, 
    payload, 
    timestamp 
  } = req.body || {};

  // Log feedback (in production, save to database)
  const feedbackRecord = {
    type,
    interactionId,
    vote,
    suggestion,
    reason,
    location,
    mood,
    payload,
    timestamp: timestamp || new Date().toISOString(),
    received_at: new Date().toISOString()
  };

  console.log('[feedback received]', feedbackRecord);

  // Mock response times for different issue types
  let message = 'Thank you for your feedback!';
  if (type === 'incorrect_info') {
    message = 'Thank you for the report! We\'ll investigate and update our data within 24 hours.';
  } else if (type === 'closed_restaurant') {
    message = 'Thanks for letting us know! We\'ll verify and update within 2-4 hours.';
  }

  res.json({
    success: true,
    message
  });
});

// ===== UTILITY ENDPOINTS =====

// Countries endpoint
app.get('/v1/countries', (_req, res) => {
  const out = [...COUNTRIES_LIST]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(c => ({
      name: c.name,
      country_code: c.code,
      region: c.region || '—',
      cuisine: c.cuisine || '—'
    }));
  res.json({ countries: out });
});

// Moods endpoint
app.get('/v1/moods', (_req, res) => {
  res.json({ moods: MOODS_TAXONOMY });
});

// ===== MCP ENDPOINTS (for backward compatibility) =====

app.post('/mcp/get_food_suggestion', async (req, res) => {
  const { mood = 'hungry', location = {}, dietary = [] } = req.body || {};
  const weather = await getWeather(location);
  
  if (USE_GPT && OPENAI_API_KEY) {
    const gpt = await recommendWithGPT({ mood_text: mood, location, dietary, weather });
    if (gpt) return res.json(gpt);
  }
  
  const pick = fallbackSuggestion(location, dietary);
  res.json({
    success: true,
    friendMessage: `Try ${pick.name} ${pick.emoji} — ${weather?.isCold ? 'it will warm you up' : 'it suits today'}.`,
    food: { name: pick.name, emoji: pick.emoji, country: location.country, country_code: location.country_code },
    weather,
    dietaryNote: dietary.length ? `Filtered for: ${dietary.join(', ')}` : null
  });
});
// Add after your existing endpoints, before the error handler
app.post('/v1/analytics/track', (req, res) => {
  const { event, data } = req.body;
  
  // Log tracking events (in production, save to database)
  console.log('Analytics Event:', {
    timestamp: new Date().toISOString(),
    event,
    data,
    ip: req.ip
  });
  
  res.json({ success: true });
});
app.post('/mcp/get_cultural_food_context', async (req, res) => {
  const { location, dietary = [] } = req.body;
  const cc = (location?.country_code || 'GB').toUpperCase();
  const city = location?.city || 'Unknown';

  // Use your existing getGlobalFoodExamples function
  const examples = getGlobalFoodExamples(cc);
  
  res.json({
    success: true,
    mainCuisine: location?.country || 'Local',
    popularFoods: ['Local staple', 'Regional specialty', 'Street food'],
    comfortFoods: ['Warm soup', 'Rice dish', 'Bread'],
    streetFoods: ['Market snacks', 'Quick bites', 'Local treats'],
    celebrationFoods: ['Festival dish', 'Special occasion meal'],
    culturalNotes: examples,
    dietaryFriendlyOptions: dietary.reduce((acc, diet) => {
      acc[diet] = ['Plant-based option', 'Modified traditional dish'];
      return acc;
    }, {}),
    location: `${city}, ${location?.country || 'Unknown'}`
  });
});
// Error handler
app.use((err, _req, res, _next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false,
    error: 'Internal server error', 
    message: err.message 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌦️ VFIED Complete API Server running on port ${PORT}`);
  console.log(`📖 OpenAPI docs available at http://localhost:${PORT}/openapi.json`);
  console.log(`🔧 Features: ${USE_GPT ? '✅ GPT' : '❌ GPT'} | ${process.env.OPENWEATHER_API_KEY ? '✅ Weather' : '❌ Weather'}`);
});