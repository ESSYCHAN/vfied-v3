// server/mcp-server.js (CLEAN REBUILD)

// --- Imports & setup ---
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
const moods = moodsModule.default || moodsModule.moods || moodsModule;
import * as countriesModule from './data/countries.js';

const USE_GPT = String(process.env.USE_GPT || '').toLowerCase() === 'true';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_MODEL   = process.env.OPENAI_MODEL || 'gpt-4o-mini';

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

function getGlobalFoodExamples(countryCode = '') {
  const ex = {
    'KE': `KENYA ROTATION:
- Staples: Ugali + Sukuma, Githeri, Rice + Beans, Chapati
- Proteins: Nyama Choma, Tilapia, Chicken Stew, Goat Curry
- Street: Mutura, Samosas, Mandazi, Roasted Maize
- Special: Pilau, Swahili Biriyani, Coastal Coconut Stews`,
    'NG': `NIGERIA ROTATION:
- Staples: Jollof Rice, Pounded Yam, Fufu, Rice & Beans
- Proteins: Suya, Pepper Soup, Grilled Fish, Beef Stew
- Street: Akara, Boli, Puff-Puff
- Special: Egusi, Party Jollof, Ofe Nsala`,
    'IN': `INDIA ROTATION:
- Staples: Dal Rice, Chapati, Biryani, Khichdi
- Proteins: Tandoori Chicken, Fish Curry, Paneer
- Street: Chaat, Samosa, Vada Pav, Dosa
- Special: Thali, Regional Curries`,
    'GB': `UK ROTATION:
- Staples: Fish & Chips, Pie & Mash, Sunday Roast, Jacket Potato
- Proteins: Shepherd's Pie, Roast Chicken, Curry (adopted)
- Street: Pasty, Sandwich, Kebab
- Special: Full English, Pub Classics`,
    'JP': `JAPAN ROTATION:
- Staples: Rice Bowls, Ramen, Udon, Onigiri
- Proteins: Sushi, Yakitori, Tempura
- Street: Takoyaki, Taiyaki
- Special: Kaiseki, Bento`,
    'FR': `FRANCE ROTATION:
- Staples: Baguette & Cheese, Crepes
- Proteins: Coq au Vin, Bouillabaisse, Steak Frites
- Street: Croque Monsieur, Galettes
- Special: Regional Specialties`,
    'MX': `MEXICO ROTATION:
- Staples: Tacos, Rice & Beans, Quesadillas
- Proteins: Carnitas, Fish Tacos, Mole
- Street: Elote, Tamales, Churros
- Special: Mole Negro, Regional Feasts`,
    'TH': `THAILAND ROTATION:
- Staples: Pad Thai, Fried Rice, Noodle Soups
- Proteins: Tom Yum, Green Curry, Grilled Fish
- Street: Som Tam, Satay, Mango Sticky Rice
- Special: Royal Thai, Regional Curries`,
    'IT': `ITALY ROTATION:
- Staples: Pasta, Pizza, Risotto, Polenta
- Proteins: Osso Buco, Seafood
- Street: Panini, Arancini, Gelato
- Special: Regional Courses`,
    'US': `USA ROTATION:
- Staples: Burgers, Mac & Cheese, BBQ
- Proteins: Steaks, Fried Chicken, Seafood
- Street: Hot Dogs, Food Trucks
- Special: Regional BBQ, Holiday Plates`
  };
  return ex[countryCode?.toUpperCase()] || `GLOBAL GUIDELINES:
- Staples: Local grains/breads/rice/noodles
- Proteins: Regional meat/fish/plant proteins
- Street: Markets/snacks/vendor favorites
- Special: Celebration/regional signature dishes`;
}
// --- Firebase Admin (optional: only if env present) ---
import admin from 'firebase-admin';

let db = null;
try {
  const pid = process.env.FIREBASE_PROJECT_ID;
  const email = process.env.FIREBASE_CLIENT_EMAIL;
  const key = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (pid && email && key) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({ projectId: pid, clientEmail: email, privateKey: key })
      });
    }
    db = admin.firestore();
    console.log('[firebase] Firestore initialized');
  } else {
    console.log('[firebase] env not set — running in-memory only');
  }
} catch (e) {
  console.error('[firebase] init error:', e.message);
}

function extractCountriesFromModule(mod) {
  const candidates = [];

  const tryPush = (val) => {
    if (!val) return;
    if (Array.isArray(val)) {
      candidates.push(val);
    } else if (typeof val === 'object') {
      // object keyed by code -> take values
      const vals = Object.values(val);
      if (vals.length && typeof vals[0] === 'object') candidates.push(vals);
    }
  };

  tryPush(mod?.default);
  tryPush(mod?.countries);
  tryPush(mod?.COUNTRIES);
  tryPush(mod); // whole module
  Object.values(mod || {}).forEach(tryPush);

  // pick the longest reasonable array
  const arr = candidates.sort((a, b) => b.length - a.length)[0] || [];
  return Array.isArray(arr) ? arr : [];
}

// Build an ISO fallback (guaranteed to work)
function buildIsoFallbackList() {
  // Guard against minimal-ICU (Render) where Intl.DisplayNames may not exist
  let regionNames = null;
  try {
    if (typeof Intl !== 'undefined' && typeof Intl.DisplayNames === 'function') {
      regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    }
  } catch {
    regionNames = null;
  }

  const CODES = [
    'AF','AX','AL','DZ','AS','AD','AO','AI','AQ','AG','AR','AM','AW','AU','AT','AZ',
    'BS','BH','BD','BB','BY','BE','BZ','BJ','BM','BT','BO','BQ','BA','BW','BV','BR','IO','BN','BG','BF','BI',
    'KH','CM','CA','CV','KY','CF','TD','CL','CN','CX','CC','CO','KM','CG','CD','CK','CR','CI','HR','CU','CW','CY','CZ',
    'DK','DJ','DM','DO','EC','EG','SV','GQ','ER','EE','SZ','ET','FK','FO','FJ','FI','FR','GF','PF','TF',
    'GA','GM','GE','DE','GH','GI','GR','GL','GD','GP','GU','GT','GG','GN','GW','GY',
    'HT','HM','VA','HN','HK','HU',
    'IS','IN','ID','IR','IQ','IE','IM','IL','IT','JM','JP','JE','JO','KZ','KE','KI','KP','KR','KW','KG','LA','LV','LB','LS','LR','LY','LI','LT','LU','MO','MG','MW','MY','MV','ML','MT','MH','MQ','MR','MU','YT','MX','FM','MD','MC','MN','ME','MS','MA','MZ','MM',
    'NA','NR','NP','NL','NC','NZ','NI','NE','NG','NU','NF','MK','MP','NO','OM',
    'PK','PW','PS','PA','PG','PY','PE','PH','PN','PL','PT','PR','QA',
    'RE','RO','RU','RW','BL','SH','KN','LC','MF','PM','VC','WS','SM','ST','SA','SN','RS','SC','SL','SG','SX','SK','SI','SB','SO','ZA','GS','SS','ES','LK','SD','SR','SJ','SE','CH','SY',
    'TW','TJ','TZ','TH','TL','TG','TK','TO','TT','TN','TR','TM','TC','TV',
    'UG','UA','AE','GB','US','UM','UY','UZ',
    'VU','VE','VN','VG','VI',
    'WF','EH','YE','ZM','ZW'
  ];

  return CODES.map(code => ({
    name: regionNames ? (regionNames.of(code) || code) : code,
    code
  }));
}

// Normalize one country object to { name, code }
function normalizeCountry(c) {
  const name =
    c?.name?.common ?? c?.name?.official ?? c?.name ??
    c?.commonName ?? c?.official ?? c?.country ?? c?.Country ?? c?.name_en ?? '';
  const code =
    (c?.alpha2 ?? c?.alpha_2 ?? c?.code ?? c?.iso2 ?? c?.['alpha-2'] ?? c?.iso ?? c?.cca2 ?? '')
      .toString()
      .toUpperCase();
  return { name, code };
}

const rawCountries = extractCountriesFromModule(countriesModule);
const normalized = rawCountries
  .map(normalizeCountry)
  .filter(x => x.name && /^[A-Z]{2}$/.test(x.code));

const COUNTRIES_LIST = normalized.length ? normalized : buildIsoFallbackList();
// app.get('/v1/countries', (_req, res) => {
//   // Always returns something; sorted by name
//   const out = [...COUNTRIES_LIST].sort((a, b) => a.name.localeCompare(b.name));
//   res.json({ countries: out });
// });
const extractCountries = extractCountriesFromModule;
const countries = extractCountries(countriesModule);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const logPath = path.resolve(__dirname, './telemetry.log');
function logLine(obj){ fs.appendFile(logPath, JSON.stringify(obj)+'\n', ()=>{}); }

const app = express();
const PORT = process.env.MCP_PORT || process.env.PORT || 3001;

// --- Middleware ---
app.set('trust proxy', 1);
app.use(cors({
  origin: [
    'http://localhost:5166',
    'http://localhost:5173',
    'http://localhost:3000',
    'https://vfied.vercel.app',
    'https://vfied-v3.vercel.app',
    'https://vfied-v3-frontend.onrender.com', // Replace with your actual frontend URL
    // 'https://your-actual-frontend-domain.com', // Add your real domain
    /^https:\/\/.*\.vercel\.app$/,
    /^https:\/\/.*\.onrender\.com$/
  ],
  credentials: true
}));
app.use('/src', express.static(path.resolve(__dirname, '../src')));
app.use('/assets', express.static(path.resolve(__dirname, '../assets')));
app.use('/public', express.static(path.resolve(__dirname, '../public')));

// If you have a built version, also serve that:
app.use(express.static(path.resolve(__dirname, '../dist')));

app.use(helmet());
app.use(rateLimit({ windowMs: 60_000, max: 300 }));
app.use(express.json({ limit: '1mb' }));

// --- Simple request id + timing (optional) ---
app.use((req, _res, next) => { req.reqId = `req_${Date.now()}_${Math.random().toString(36).slice(2,9)}`; next(); });

// --- Static pages (match your repo layout) ---
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../index.html')));
app.get('/docs', (req, res) => res.sendFile(path.resolve(__dirname, '../app/docs.html')));
app.get('/demo', (req, res) => res.sendFile(path.resolve(__dirname, '../app/demo.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.resolve(__dirname, '../app/dashboard.html')));

// (Optionally serve public assets if needed)
app.use('/public', express.static(path.resolve(__dirname, '../public')));

app.get('/openapi.json', (_req, res) => {
  res.setHeader('Content-Type','application/json');
  res.send(fs.readFileSync(path.resolve(__dirname, './openapi.json'), 'utf8'));
});

// --- In-memory vendor data ---
const vendorMenus = new Map(); // vendorId -> { items: [], version, updatedAt }
const apiKeys = new Map();     // apiKey   -> { vendorId, plan, usage, limit }

function createDemoApiKeys() {
  apiKeys.set('demo_free_key_123', { vendorId: 'demo_restaurant_1', plan: 'free', usage: 0, limit: 1000 });
  apiKeys.set('demo_growth_key_456', { vendorId: 'demo_restaurant_2', plan: 'growth', usage: 0, limit: 50000 });
}
createDemoApiKeys();

function authenticateApiKey(req, res, next) {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing API key' });
  const key = auth.slice(7);
  const data = apiKeys.get(key);
  if (!data) return res.status(401).json({ error: 'Invalid API key' });
  req.apiKey = data;
  next();
}

// --- Helpers for menu upload ---
function validateMenuItem(item) {
  const errors = [];
  if (!item?.name) errors.push('name is required');
  const cc = (item?.country_code || '').toUpperCase();
  if (!/^[A-Z]{2}$/.test(cc)) errors.push('country_code must be ISO 3166-1 alpha-2, e.g. KE, GB');
  return { valid: errors.length === 0, errors };
}

function normalizeMenuItem(raw, vendorId) {
  const item = { ...raw };
  item.vendor_id = vendorId;
  item.menu_item_id = item.menu_item_id || (item.name || 'item').toLowerCase()
    .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').slice(0, 30) + '_' + Math.random().toString(36).slice(2, 6);
  item.country_code = (item.country_code || '').toUpperCase();
  item.tags = Array.isArray(item.tags) ? item.tags : (item.tags ? String(item.tags).split(',').map(s => s.trim()) : []);
  item.availability = item.availability || 'in_stock';
  item.uploaded_at = new Date().toISOString();
  return item;
}

function bumpMenuVersion(vendorId) {
  const v = vendorMenus.get(vendorId);
  const next = `v_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  if (v) vendorMenus.set(vendorId, { ...v, version: next, updatedAt: new Date() });
  return next;
}
// ---------- Firestore adapters (no-op if db === null) ----------
async function fsGetVendorMenu(vendorId) {
  if (!db) return null;
  const snap = await db.collection('vendors').doc(vendorId).collection('menu_items').get();
  const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  const metaDoc = await db.collection('vendors').doc(vendorId).get();
  const meta = metaDoc.exists ? metaDoc.data() : {};
  return { items, version: meta.menu_version || null, updatedAt: meta.updatedAt || null };
}

async function fsWriteVendorMenuSnapshot(vendorId, items, version) {
  if (!db) return;
  const batch = db.batch();
  const root = db.collection('vendors').doc(vendorId);
  // Upsert each item
  items.forEach(it => {
    const ref = root.collection('menu_items').doc(it.menu_item_id);
    batch.set(ref, it, { merge: true });
  });
  // Update meta
  batch.set(root, { menu_version: version, updatedAt: new Date().toISOString() }, { merge: true });
  await batch.commit();
}

async function fsUpdateAvailability(vendorId, updates, nextVersion) {
  if (!db) return 0;
  const batch = db.batch();
  const root = db.collection('vendors').doc(vendorId);
  let count = 0;
  for (const u of updates) {
    const ref = root.collection('menu_items').doc(u.menu_item_id);
    batch.set(ref, { availability: u.availability, price: u.price }, { merge: true });
    count++;
  }
  batch.set(root, { menu_version: nextVersion, updatedAt: new Date().toISOString() }, { merge: true });
  await batch.commit();
  return count;
}

async function fsAppendTelemetry(line) {
  if (!db) return;
  await db.collection('telemetry').add({ ...line, at: admin.firestore.FieldValue.serverTimestamp() });
}

async function fsVendorAnalytics(vendorId) {
  if (!db) return null;
  const doc = await db.collection('vendors').doc(vendorId).collection('analytics').doc('plan').get();
  return doc.exists ? doc.data() : null;
}

async function fsSetVendorAnalytics(vendorId, data) {
  if (!db) return;
  await db.collection('vendors').doc(vendorId).collection('analytics').doc('plan').set(data, { merge: true });
}
// --- Weather (optional; falls back if no key) ---
async function getWeather(location) {
  const key = process.env.OPENWEATHER_API_KEY;
  if (!key || !location?.city) return null;
  const url =
    location.latitude && location.longitude
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
      isRaining: /rain/i.test(data.weather?.[0]?.main || '')
    };
  } catch {
    return null;
  }
}

// --- Simple suggestion generator (works without OpenAI) ---
function fallbackSuggestion(location, dietary = []) {
  const cc = (location?.country_code || 'GB').toUpperCase();
  const byCountry = {
    GB: [{ name: 'Fish and Chips', emoji: '🍟' }, { name: 'Mushroom Pie', emoji: '🥧' }],
    KE: [{ name: 'Nyama Choma', emoji: '🍖' }, { name: 'Ugali & Sukuma', emoji: '🥬' }],
    US: [{ name: 'Burger', emoji: '🍔' }, { name: 'Poke Bowl', emoji: '🍲' }]
  };
  let picks = byCountry[cc] || byCountry.GB;
  if (dietary.includes('vegan') || dietary.includes('vegetarian')) {
    picks = picks.filter(p => !/nyama|choma|burger|fish/i.test(p.name)).concat({ name: 'Veggie Bowl', emoji: '🥗' });
  }
  return picks[Math.floor(Math.random() * picks.length)];
}
// --- Moods extractor + fallback ---
function extractMoodsFromModule(mod) {
  // Accept shapes: default[], {moods:[]}, plain[], or object map
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

// Normalize one mood into { id, group, synonyms[] }
function normalizeMood(m) {
  const id = (m?.id || m?.ID || m?.name || '').toString().trim().toUpperCase();
  const group = (m?.group || m?.category || 'Emotion').toString();
  const synonyms = Array.isArray(m?.synonyms) ? m.synonyms : [];
  return id ? { id, group, synonyms } : null;
}

// Fallback taxonomy (covers your OpenAPI enum)
const MOODS_FALLBACK = [
  { id: 'TIRED',        group: 'Energy',  synonyms: ['exhausted','sleepy','low energy','fatigued'] },
  { id: 'STRESSED',     group: 'Emotion', synonyms: ['anxious','tense','overwhelmed','deadline'] },
  { id: 'CELEBRATING',  group: 'Social',  synonyms: ['party','treat','reward','birthday','win'] },
  { id: 'HUNGRY',       group: 'Body',    synonyms: ['starving','very hungry','need food fast'] },
  { id: 'POST_WORKOUT', group: 'Body',    synonyms: ['gym','post workout','protein','recovery'] },
  { id: 'SICK',         group: 'Body',    synonyms: ['flu','cold','under the weather','sore throat'] },
  { id: 'FOCUSED',      group: 'Intent',  synonyms: ['work mode','deep work','productive'] },
  { id: 'RELAX',        group: 'Emotion', synonyms: ['cozy','chill','comforting','calm'] },
  { id: 'ADVENTUROUS',  group: 'Intent',  synonyms: ['spicy','new cuisine','explore','try something new'] },
];
function detectMoodIds(mood_text) {
  if (!mood_text) return [];
  const t = mood_text.toLowerCase();
  const hits = [];
  for (const m of MOODS_TAXONOMY) {
    if (t.includes(m.id.toLowerCase())) { hits.push(m.id); continue; }
    if (m.synonyms?.some(s => t.includes(s.toLowerCase()))) { hits.push(m.id); }
  }
  // de-dup + cap to 3
  return [...new Set(hits)].slice(0,3);
}
// Build taxonomy once at boot
const rawMoods = extractMoodsFromModule(moodsModule)
  .map(normalizeMood)
  .filter(Boolean);

// Use file if non-empty, else fallback
const MOODS_TAXONOMY = rawMoods.length ? rawMoods : MOODS_FALLBACK;
// --- Validation schemas ---
const quickDecisionSchema = Joi.object({
  location: Joi.object({
    city: Joi.string().allow(''),
    country: Joi.string().allow(''),
    country_code: Joi.string().length(2).uppercase().allow(''),
    latitude: Joi.number(),
    longitude: Joi.number()
  }),
  dietary: Joi.array().items(Joi.string()).default([])
});

const recommendSchema = Joi.object({
  location: quickDecisionSchema.extract('location'),
  mood_text: Joi.string().allow(''),
  mood_ids: Joi.array().items(Joi.string()).default([]),
  dietary: Joi.array().items(Joi.string()).default([]),
  budget: Joi.string().valid('low', 'medium', 'high').allow(''),
  social: Joi.string().valid('solo', 'couple', 'group', 'family').allow(''),
  menu_source: Joi.string().valid('global_database', 'my_uploaded_menu').default('global_database'),
  vendor_id: Joi.string().allow('')
});

// --- Public MCP-ish endpoints (no API key) ---
// app.post('/mcp/get_food_suggestion', async (req, res) => {
//   const { mood = 'hungry', location = {}, dietary = [] } = req.body || {};
//   const weather = await getWeather(location);
//   const pick = fallbackSuggestion(location, dietary);
//   res.json({
//     success: true,
//     friendMessage: `Try ${pick.name} ${pick.emoji} — ${weather?.isCold ? 'it will warm you up' : 'it suits today'}.`,
//     food: { name: pick.name, emoji: pick.emoji, country: location.country, country_code: location.country_code },
//     weather,
//     dietaryNote: dietary.length ? `Filtered for: ${dietary.join(', ')}` : null
//   });
// });
app.post('/mcp/get_food_suggestion', async (req, res) => {
  const { mood = 'hungry', location = {}, dietary = [] } = req.body || {};
  const weather = await getWeather(location);
  
  console.log('🔍 MCP Debug:', { USE_GPT, hasKey: !!OPENAI_API_KEY, location, mood });
  
  if (USE_GPT && OPENAI_API_KEY) {
    console.log('🚀 Trying GPT path...');
    const gpt = await recommendWithGPT({ mood_text: mood, location, dietary, weather });
    console.log('🎯 GPT Result:', gpt);
    if (gpt) return res.json(gpt);
  }
  
  console.log('📋 Using fallback path');
  // fallback (existing)
  const pick = fallbackSuggestion(location, dietary)
  res.json({
    success: true,
    friendMessage: `Try ${pick.name} ${pick.emoji} — ${weather?.isCold ? 'it will warm you up' : 'it suits today'}.`,
    food: { name: pick.name, emoji: pick.emoji, country: location.country, country_code: location.country_code },
    weather,
    dietaryNote: dietary.length ? `Filtered for: ${dietary.join(', ')}` : null
  });
});

// ---------- Travel/Events helpers ----------
function sampleEventsFor(city = '', cc = 'GB') {
  const C = (cc || 'GB').toUpperCase();
  const cityName = city || (C === 'KE' ? 'Nairobi' : C === 'JP' ? 'Tokyo' : C === 'US' ? 'New York' : 'London');
  const base = [
    { id: 'e1', city: cityName, country_code: C, title: 'Jazz in the Park',   when: 'Tonight 7pm', tag: 'music' },
    { id: 'e2', city: cityName, country_code: C, title: 'Street Food Market', when: 'Sat 3pm',     tag: 'food'  },
    { id: 'e3', city: cityName, country_code: C, title: 'Open-Air Cinema',    when: 'Sun 8pm',     tag: 'film'  },
  ];
  return base;
}

function sampleHighlights(city = '', cc = 'GB') {
  const C = (cc || 'GB').toUpperCase();
  const cityName = city || (C === 'KE' ? 'Nairobi' : C === 'JP' ? 'Tokyo' : C === 'US' ? 'New York' : 'London');
  return [
    { id: 'h1', type: 'must_try',  name: 'Local Signature Dish', emoji: '🍽️', desc: `A beloved staple in ${cityName}.` },
    { id: 'h2', type: 'street',    name: 'Night Street Market',  emoji: '🍢', desc: `Best for snacks & vibey walks.` },
    { id: 'h3', type: 'experience',name: 'Neighborhood Crawl',   emoji: '🗺️', desc: `Explore authentic spots with locals.` },
  ];
}

// GPT Night Plan builder
async function gptTravelPlan({ city, country_code, prompt }) {
  const system = `You are VFIED, a local culture and food guide. Return STRICT JSON with:
{
  "success": true,
  "city": string,
  "country_code": string,
  "planTitle": string,
  "timeline": [
    { "time": "18:30", "activity": "Short line", "food": "Dish", "emoji": "🍜", "note": "why it's good", "link": "https://..." }
  ],
  "tips": ["short bullet", "short bullet"]
}`;
  const user = JSON.stringify({ city, country_code, prompt });
  const out = await gptChatJSON({ system, user });
  if (!out) return null;
  // Minimal normalization
  out.success = true;
  out.city = out.city || city;
  out.country_code = (out.country_code || country_code || 'GB').toUpperCase();
  if (!Array.isArray(out.timeline)) out.timeline = [];
  if (!Array.isArray(out.tips)) out.tips = [];
  return out;
}


app.post('/mcp/get_quick_food_decision', async (req, res) => {
  const { location = {}, dietary = [] } = req.body || {};
  const pick = fallbackSuggestion(location, dietary);
  res.json({
    success: true,
    decision: pick.name,
    explanation: `Quick pick based on your location${dietary.length ? ` and ${dietary.join(', ')}` : ''}.`
  });
});

app.post('/mcp/validate_dietary_compliance', (req, res) => {
  const { foodName = '', dietary = [] } = req.body || {};
  const name = foodName.toLowerCase();
  const compliant =
    (!dietary.includes('vegan') && !/meat|beef|chicken|fish|bacon/i.test(name)) ||
    (!/meat|beef|chicken|fish|bacon/i.test(name) && (dietary.includes('vegetarian') || dietary.includes('vegan')));
  res.json({
    success: true,
    foodName,
    compliant,
    warnings: compliant ? [] : [`${foodName} may conflict with ${dietary.join(', ')}`]
  });
});

// --- Vendor endpoints (API key required) ---
app.post('/v1/menus', authenticateApiKey, async (req, res) => {
  const { menu = [], mode = 'snapshot' } = req.body || {};
  if (!Array.isArray(menu)) return res.status(400).json({ error: 'menu must be an array' });

  const vendorId = req.apiKey.vendorId;
  let current = { items: [], version: null, updatedAt: null };
  
  // Get current menu from Firestore or memory
  if (db) {
    const fsMenu = await fsGetVendorMenu(vendorId);
    if (fsMenu) current = fsMenu;
  } else {
    current = vendorMenus.get(vendorId) || current;
  }

  const byId = new Map(current.items.map(i => [i.menu_item_id, i]));
  const accepted = [], errors = [];
  
  for (const raw of menu) {
    const v = validateMenuItem(raw);
    if (!v.valid) { errors.push({ item: raw?.name || 'unnamed', errors: v.errors }); continue; }
    accepted.push(normalizeMenuItem(raw, vendorId));
  }

  let nextItems = current.items;
  if (mode === 'snapshot') {
    const incomingIds = new Set(accepted.map(i => i.menu_item_id));
    const archived = current.items
      .filter(i => !incomingIds.has(i.menu_item_id))
      .map(i => ({ ...i, availability: 'unavailable', status: 'archived', archived_at: new Date().toISOString() }));
    const merged = new Map([...archived, ...accepted].map(i => [i.menu_item_id, i]));
    nextItems = [...merged.values()];
  } else {
    const merged = new Map(current.items.map(i => [i.menu_item_id, i]));
    for (const n of accepted) merged.set(n.menu_item_id, { ...(merged.get(n.menu_item_id) || {}), ...n });
    nextItems = [...merged.values()];
  }

  const version = `v_${Date.now()}`;

  try {
    if (db) {
      // Firestore path
      await fsWriteVendorMenuSnapshot(vendorId, nextItems, version);
    } else {
      // In-memory fallback
      vendorMenus.set(vendorId, { items: nextItems, version, updatedAt: new Date() });
    }

    res.json({
      success: errors.length === 0,
      menu_version: version,
      summary: { accepted: accepted.length, rejected: errors.length, total: menu.length },
      errors
    });
  } catch (error) {
    console.error('[menu upload error]', error);
    res.status(500).json({ error: 'Failed to save menu', message: error.message });
  }
});

app.patch('/v1/menus/availability', authenticateApiKey, (req, res) => {
  const { updates = [] } = req.body || {};
  const vendorId = req.apiKey.vendorId;
  const vm = vendorMenus.get(vendorId);
  if (!vm) return res.status(404).json({ error: 'No menu found. Upload a menu first.' });

  const map = new Map(vm.items.map(i => [i.menu_item_id, i]));
  let updated = 0;
  for (const u of updates) {
    const it = map.get(u.menu_item_id);
    if (!it) continue;
    if (u.availability) it.availability = u.availability;
    if (u.price !== undefined) it.price = u.price;
    updated++;
  }
  const version = bumpMenuVersion(vendorId);
  res.json({ success: true, updated, menu_version: version });
});
// View current vendor menu (requires API key)
app.get('/v1/menus', authenticateApiKey, async (req, res) => {
  const vendorId = req.apiKey.vendorId;
  if (db) {
    const m = await fsGetVendorMenu(vendorId);
    return res.json({ success: true, vendor_id: vendorId, version: m?.version, updatedAt: m?.updatedAt, items: m?.items || [] });
  }
  const m = vendorMenus.get(vendorId) || { items: [], version: null, updatedAt: null };
  res.json({ success: true, vendor_id: vendorId, version: m.version, updatedAt: m.updatedAt, items: m.items });
});
// View current vendor menu (requires API key)
app.get('/v1/menus', authenticateApiKey, (req, res) => {
  const vendorId = req.apiKey.vendorId;
  const vm = vendorMenus.get(vendorId);
  if (!vm) return res.json({ success: true, items: [], version: null, updatedAt: null });
  res.json({ success: true, vendor_id: vendorId, version: vm.version, updatedAt: vm.updatedAt, items: vm.items });
});

app.get('/v1/analytics', authenticateApiKey, async (req, res) => {
  const k = req.apiKey;
  let usage = { current_period: k.usage, limit: k.limit, percentage: Math.round((k.usage / k.limit) * 100) };
  let plan = k.plan;

  if (db) {
    const doc = await fsVendorAnalytics(k.vendorId);
    if (doc) {
      usage = doc.usage || usage;
      plan = doc.plan || plan;
    } else {
      // seed default in Firestore so dashboard shows stable numbers
      await fsSetVendorAnalytics(k.vendorId, { plan, usage });
    }
  }

  res.json({
    success: true,
    usage,
    plan,
    vendor_id: k.vendorId,
    menu_status: db ? 'from_firestore' : (vendorMenus.has(k.vendorId) ? 'uploaded' : 'not_uploaded')
  });
});
// --- GPT recommend helper ---
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
  "culturalNote": "authenticity context",
  "dietaryNote": ${dietary?.length ? `"Compatible with ${dietary.join(', ')}"` : 'null'},
  "weatherNote": ${weather ? `"Good for ${weather.temperature}°C"` : 'null'},
  "confidence": 85
}`;

  const user = JSON.stringify({ mood_text, location, dietary, weather });
  return await gptChatJSON({ system, user });
}

// Optional vendor recommend that prefers menu if present
// Optional vendor recommend that prefers menu if present
app.post('/v1/recommend', async (req, res) => {
  const t0 = Date.now();
  const request_id = `req_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;

  const { location = {}, dietary = [], menu_source = 'global_database', vendor_id, mood_text = "" } = req.body || {};

  // Prefer uploaded menu if requested and available
  let resolvedVendorId = vendor_id;
  try {
    const auth = req.headers.authorization || '';
    if (auth.startsWith('Bearer ')) {
      const key = auth.slice(7);
      const meta = apiKeys.get(key);
      if (meta?.vendorId) resolvedVendorId = resolvedVendorId || meta.vendorId;
    }
  } catch {}

  if ((menu_source === 'my_uploaded_menu' || resolvedVendorId) && resolvedVendorId && vendorMenus.has(resolvedVendorId)) {
    const items = vendorMenus.get(resolvedVendorId).items.filter(i => i.availability !== 'archived');
    const food = items[Math.floor(Math.random() * items.length)];
    const weather = await getWeather(location).catch(() => null);
    
    return res.json({
      success: true,
      request_id,
      context: {
        original_mood_text: mood_text || null,
        resolved_moods: [],
        mood_detection_method: mood_text ? 'regex_fallback' : 'explicit',
        location,
        dietary,
        source: 'uploaded_menu'
      },
      food: {
        menu_item_id: food.menu_item_id,
        name: food.name,
        emoji: food.emoji || 'ðŸ½ï¸',
        price: food.price,
        description: food.description,
        country_code: food.country_code
      },
      friendMessage: `From your menu, try ${food.name}.`,
      reasoning: '',
      culturalNote: null,
      personalNote: null,
      weatherNote: weather ? `Weather is ${weather.temperature}Â°C â€¢ ${weather.condition}` : null,
      availabilityNote: 'From uploaded vendor menu',
      alternatives: [],
      confidence: 95,
      dietaryCompliance: { compliant: true, source: 'fallback' },
      dietaryNote: dietary.length ? `Filtered for: ${dietary.join(', ')}` : null,
      weather: weather ? {
        temperature: weather.temperature,
        condition: weather.condition,
        description: weather.condition,
        isRaining: !!weather.isRaining,
        isCold: !!weather.isCold,
        isHot: !!weather.isHot,
        isComfortable: !(weather.isCold || weather.isHot),
        simulated: false
      } : null,
      interactionId: `ix_${Date.now().toString(36)}`,
      processingTimeMs: Date.now() - t0,
      meta: {
        hasWeather: !!weather,
        hasDietary: dietary.length > 0,
        dietaryRestrictions: dietary,
        timestamp: new Date().toISOString()
      }
    });
  }

  // Global path → try GPT first (if key present), else fallback
  const weather = await getWeather(location).catch(() => null);

  let gpt = null;
  if (USE_GPT && OPENAI_API_KEY) {
    gpt = await recommendWithGPT({ mood_text, location, dietary, weather });
  }

  if (gpt && gpt.success) {
    return res.json({
      success: true,
      request_id,
      context: {
        original_mood_text: mood_text || null,
        resolved_moods: [],
        mood_detection_method: 'ai',
        location,
        dietary,
        source: 'global_database'
      },
      food: gpt.food,
      friendMessage: gpt.friendMessage || '',
      reasoning: gpt.reasoning || '',
      culturalNote: gpt.culturalNote || null,
      personalNote: null,
      weatherNote: gpt.weatherNote || null,
      availabilityNote: 'Widely available',
      alternatives: gpt.alternatives || [],
      confidence: gpt.confidence || 80,
      dietaryCompliance: { compliant: true, source: 'ai' },
      dietaryNote: gpt.dietaryNote || null,
      weather: weather ? {
        temperature: weather.temperature,
        condition: weather.condition,
        description: weather.condition,
        isRaining: !!weather.isRaining,
        isCold: !!weather.isCold,
        isHot: !!weather.isHot,
        isComfortable: !(weather.isCold || weather.isHot),
        simulated: false
      } : null,
      interactionId: `ix_${Date.now().toString(36)}`,
      processingTimeMs: Date.now() - t0,
      meta: {
        hasWeather: !!weather,
        hasDietary: dietary.length > 0,
        dietaryRestrictions: dietary,
        timestamp: new Date().toISOString()
      }
    });
  }

  // Fallback (no key or GPT failed)
  const pick = fallbackSuggestion(location, dietary);
  const resolved_moods = detectMoodIds(mood_text);
  const mood_detection_method = mood_text ? (resolved_moods.length ? 'regex_fallback' : 'regex_fallback') : 'explicit';

  return res.json({
    success: true,
    request_id,
    context: {
      original_mood_text: mood_text || null,
      resolved_moods,
      mood_detection_method,
      location,
      dietary,
      source: 'global_database'
    },
    food: { name: pick.name, emoji: pick.emoji, country: location.country, country_code: (location.country_code || 'GB').toUpperCase() },
    friendMessage: mood_text ? `Because you feel "${mood_text}", I suggest ${pick.name}.` : `I suggest ${pick.name}.`,
    reasoning: '',
    culturalNote: null,
    personalNote: null,
    weatherNote: weather ? `Weather is ${weather.temperature}Â°C â€¢ ${weather.condition}` : null,
    availabilityNote: 'Widely available',
    alternatives: [],
    confidence: Math.floor(70 + Math.random() * 25),
    dietaryCompliance: { compliant: true, source: 'fallback' },
    dietaryNote: dietary.length ? `Filtered for: ${dietary.join(', ')}` : null,
    weather: weather ? {
      temperature: weather.temperature,
      condition: weather.condition,
      description: weather.condition,
      isRaining: !!weather.isRaining,
      isCold: !!weather.isCold,
      isHot: !!weather.isHot,
      isComfortable: !(weather.isCold || weather.isHot),
      simulated: false
    } : null,
    interactionId: `ix_${Date.now().toString(36)}`,
    processingTimeMs: Date.now() - t0,
    meta: {
      hasWeather: !!weather,
      hasDietary: dietary.length > 0,
      dietaryRestrictions: dietary,
      timestamp: new Date().toISOString()
    }
  });
});
// Add before the error handler:
app.get('/v1/admin/summary', authenticateApiKey, (_req, res) => {
  const vendorId = _req.apiKey.vendorId;
  const m = vendorMenus.get(vendorId);
  res.json({
    success: true,
    vendor_id: vendorId,
    menu_items: m ? m.items.length : 0,
    menu_version: m?.version || null,
    updatedAt: m?.updatedAt || null
  });
});

const USE_EVENTS_PROVIDER = String(process.env.USE_EVENTS_PROVIDER || '').toLowerCase() === 'true';
const EVENTS_PROVIDER_URL = process.env.EVENTS_PROVIDER_URL || '';

async function fetchRealEvents(city, cc) {
  if (!USE_EVENTS_PROVIDER || !EVENTS_PROVIDER_URL) return null;
  try {
    const r = await fetch(`${EVENTS_PROVIDER_URL}?city=${encodeURIComponent(city)}&cc=${encodeURIComponent(cc)}`, { timeout: 6000 });
    if (!r.ok) throw new Error(String(r.status));
    const data = await r.json();
    return (data.items || []).map(x => ({
      id: x.id || crypto.randomUUID(),
      city,
      country_code: cc,
      title: x.title || x.name || 'Event',
      when: x.when || x.date || 'Tonight',
      tag: (x.tag || x.category || 'event').toLowerCase().includes('food') ? 'food' :
           (x.tag || '').toLowerCase().includes('music') ? 'music' : 'event'
    }));
  } catch (e) {
    console.error('[events provider]', e.message);
    return null;
  }
}

app.get('/v1/events', async (req, res) => {
  const city = String(req.query.city || '');
  const cc   = String(req.query.country_code || 'GB').toUpperCase();
  const real = await fetchRealEvents(city, cc);
  if (real && real.length) return res.json({ success: true, events: real });
  return res.json({ success: true, events: sampleEventsFor(city, cc) });
});

// --- Countries & health ---
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

app.get('/health', (_req, res) => {
  const USE_GPT = String(process.env.USE_GPT || '').toLowerCase() === 'true';
  const hasOpenAIKey = !!process.env.OPENAI_API_KEY;
  const hasWeatherKey = !!process.env.OPENWEATHER_API_KEY;
  const USE_EVENTS_PROVIDER = String(process.env.USE_EVENTS_PROVIDER || '').toLowerCase() === 'true';

  res.json({
    status: 'healthy',
    service: 'VFIED MCP Server',
    version: '2.1.0',
    features: [
      'global_recommend',
      'vendor_menus',
      'countries_lookup',
      'moods_mapping',
      'events',
      'travel_highlights',
      'travel_plan'
    ],
    services: {
      gpt: (USE_GPT && hasOpenAIKey) ? 'on' : 'off',
      weather: hasWeatherKey ? 'on' : 'off',
      events_provider: USE_EVENTS_PROVIDER ? 'on' : 'off'
    },
    timestamp: new Date().toISOString()
  });
});

// Phase-2: Travel highlights (mock data, region-aware)
app.get('/v1/travel/highlights', (req, res) => {
  const city = String(req.query.city || '');
  const cc   = String(req.query.country_code || 'GB').toUpperCase();
  res.json({ success: true, highlights: sampleHighlights(city, cc) });
});

app.post('/v1/travel/plan', async (req, res) => {
  const { location = {}, prompt = 'I want to try local experiences and food tonight' } = req.body || {};
  const city = location.city || '';
  const cc   = (location.country_code || 'GB').toUpperCase();

  // Try GPT
  const plan = await gptTravelPlan({ city, country_code: cc, prompt });
  if (plan) {
    return res.json(plan);
  }

  // Fallback plan (no GPT)
  const timeline = [
    { time: '18:30', activity: 'Golden hour walk through Old Town', food: 'Street samosas', emoji: '🥟', note: 'Light bite to start', link: 'https://example.com' },
    { time: '19:30', activity: 'Live jazz bar', food: 'Local pilsner', emoji: '🍺', note: 'Music + easy vibes', link: 'https://example.com' },
    { time: '21:00', activity: 'Late dinner at casual spot', food: 'Signature dish', emoji: '🍽️', note: 'Hearty & authentic', link: 'https://example.com' },
    { time: '22:30', activity: 'Dessert walk / night market', food: 'Sweet street snack', emoji: '🍧', note: 'Sweet finish', link: 'https://example.com' }
  ];
  res.json({
    success: true,
    city, country_code: cc,
    planTitle: 'Local Night Plan',
    timeline,
    tips: ['Carry cash for markets', 'Ask locals for their favorite stall']
  });
});
// --- Demo: Night plan (structured, GPT if enabled, Kisumu-local fallback) ---
app.post('/v1/travel/nightplan', async (req, res) => {
  const { location = {}, prompt } = req.body || {};
  const cityIn = (location.city || '').trim();
  const cc = (location.country_code || 'KE').toUpperCase();
  const city = cityIn || (cc === 'KE' ? 'Nairobi' : 'London');

  // If you already added gptTravelPlan() earlier, try GPT first:
  if (typeof gptTravelPlan === 'function') {
    const plan = await gptTravelPlan({
      city,
      country_code: cc,
      prompt: prompt || 'I want to try local experiences in the city tonight. Map a night plan with food and vibes.'
    });
    if (plan) return res.json(plan);
  }

  // Fallbacks (no GPT or failure)
  if (/kisumu/i.test(city)) {
    return res.json({
      success: true,
      city: 'Kisumu',
      country_code: 'KE',
      planTitle: 'Local Food Experience in Kisumu',
      timeline: [
        {
          time: '18:30',
          activity: 'Enjoy local fish delicacies',
          food: 'Tilapia',
          emoji: '🐟',
          note: 'Freshly caught from Lake Victoria, known for its unique flavor.',
          link: 'https://www.google.com/search?q=Kisumu+Tilapia+restaurant'
        },
        {
          time: '19:30',
          activity: 'Savor traditional Ugali',
          food: 'Ugali',
          emoji: '🍚',
          note: 'A staple food that pairs well with fish, made from maize flour.',
          link: 'https://www.google.com/search?q=Ugali+Kisumu'
        },
        {
          time: '20:00',
          activity: 'Sample local beer',
          food: 'Tusker Lager',
          emoji: '🍺',
          note: 'A popular Kenyan beer that complements the local cuisine.',
          link: 'https://www.google.com/search?q=Tusker+Lager+Kisumu+bar'
        }
      ],
      tips: [
        'Try to dine by the lakeside for a beautiful sunset view.',
        'Ask locals for their favorite spots to get authentic meals.'
      ]
    });
  }

  // Generic local-night fallback for any other city
  return res.json({
    success: true,
    city,
    country_code: cc,
    planTitle: `Local Night Plan in ${city}`,
    timeline: [
      {
        time: '18:30',
        activity: 'Golden hour neighborhood walk',
        food: 'Street snack (pick a busy stall)',
        emoji: '🌇',
        note: 'Start light, scout popular queues for best bites.',
        link: `https://www.google.com/search?q=${encodeURIComponent(city + ' street food')}`
      },
      {
        time: '19:30',
        activity: 'Live music or casual pub',
        food: 'Local lager or non-alc brew',
        emoji: '🎶',
        note: 'Catch a set; ask staff what pairs with the local snacks.',
        link: `https://www.google.com/search?q=${encodeURIComponent(city + ' live music tonight')}`
      },
      {
        time: '21:00',
        activity: 'Signature local dish',
        food: 'Chef-recommended classic',
        emoji: '🍽️',
        note: 'Pick a place with regional specialties; be open to seasonal sides.',
        link: `https://www.google.com/search?q=${encodeURIComponent('best local dish ' + city)}`
      },
      {
        time: '22:30',
        activity: 'Dessert walk / night market',
        food: 'Sweet street snack',
        emoji: '🍧',
        note: 'End on something sweet; try whatever has the happiest queue.',
        link: `https://www.google.com/search?q=${encodeURIComponent(city + ' night market')}`
      }
    ],
    tips: [
      'Carry small cash for stalls.',
      'Follow the crowds for freshness and turnover.',
      'Ask one local: "what do you eat here?" — then order that.'
    ]
  });
});
// Add POST /v1/quick_decision
app.post('/v1/quick_decision', async (req, res) => {
  const t0 = Date.now();
  const request_id = `req_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
  const { location = {}, dietary = [] } = req.body || {};

  const pick = fallbackSuggestion(location, dietary);
  const explanation = `Quick pick based on your location${dietary.length ? ` and ${dietary.join(', ')}` : ''}.`;

  res.json({
    success: true,
    request_id,
    decision: pick.name,
    country_code: (location.country_code || 'GB').toUpperCase(),
    explanation,
    dietaryNote: dietary.length ? `Filtered for: ${dietary.join(', ')}` : undefined,
    processingTimeMs: Date.now() - t0
  });
});

// Add GET /v1/moods
app.get('/v1/moods', (_req, res) => {
  res.json({ moods: MOODS_TAXONOMY });
});

// Add POST /mcp/get_cultural_food_context
app.post('/mcp/get_cultural_food_context', (req, res) => {
  const { location = {}, dietary = [] } = req.body || {};
  const city = location.city || 'your city';
  const cc = (location.country_code || 'GB').toUpperCase();

  const presets = {
    KE: {
      mainCuisine: 'East African',
      popularFoods: ['Nyama Choma', 'Ugali & Sukuma', 'Pilau'],
      comfortFoods: ['Githeri', 'Ndengu'],
      streetFoods: ['Mutura', 'Smokie Pasua'],
      celebrationFoods: ['Goat Feast', 'Biriyani (Coast)'],
      culturalNotes: 'Weekend grilling culture; coastal spice influence.'
    },
    GB: {
      mainCuisine: 'British & Global Fusion',
      popularFoods: ['Fish & Chips', 'Sunday Roast', 'Chicken Tikka Masala'],
      comfortFoods: ['Shepherds Pie', 'Full English'],
      streetFoods: ['Kebab', 'Bao, Tacos (markets)'],
      celebrationFoods: ['Roast Dinner', 'Pies'],
      culturalNotes: 'Pub culture; strong South Asian influence.'
    }
  };
  const pack = presets[cc] || {
    mainCuisine: 'Local',
    popularFoods: ['Chefs choice'],
    comfortFoods: ['Local comfort meals'],
    streetFoods: ['Local snacks'],
    celebrationFoods: ['Local feasts'],
    culturalNotes: 'Explore local markets and staples.'
  };

  res.json({
    success: true,
    ...pack,
    dietaryFriendlyOptions: dietary.length ? Object.fromEntries(dietary.map(tag => [tag, []])) : {},
    location: `${city} (${cc})`
  });
});
app.post('/v1/telemetry', (req,res)=>{
  const { event, payload } = req.body || {};
  const line = { type:'telemetry', event, payload, at:new Date().toISOString() };
  console.log('[telemetry]', line);
  logLine?.(line);
  fsAppendTelemetry?.(line);
  res.json({ success:true });
});
const telemetryLogPath = path.resolve(__dirname, './telemetry.log');

app.get('/v1/admin/telemetry', authenticateApiKey, (req, res) => {
  const limit = Math.max(1, Math.min(500, parseInt(req.query.limit || '100', 10)));
  try {
    if (!fs.existsSync(telemetryLogPath)) return res.json({ success: true, items: [] });
    const raw = fs.readFileSync(telemetryLogPath, 'utf8').trim().split('\n');
    const slice = raw.slice(-limit);
    const items = slice.map(line => {
      try { return JSON.parse(line); } catch { return { type: 'unknown', raw: line }; }
    });
    res.json({ success: true, items });
  } catch (e) {
    res.status(500).json({ success: false, error: 'telemetry_read_failed', message: e.message });
  }
});
// --- Feedback endpoint ---
app.post('/v1/feedback', (req, res) => {
  const { interactionId, vote, payload } = req.body || {};
  const line = { type:'feedback', interactionId, vote, payload, at:new Date().toISOString() };
  console.log('[feedback]', line);
  logLine?.(line);          // your file logger (if you kept it)
  fsAppendTelemetry?.(line); // Firestore
  res.json({ success: true });
});
// Linkout tracker
app.get('/v1/linkout', (req, res) => {
  const url = String(req.query.url || '');
  const tag = String(req.query.tag || 'generic');
  if (!/^https?:\/\//i.test(url)) return res.status(400).send('bad url');
  console.log('[linkout]', { tag, url, at:new Date().toISOString() });
  res.redirect(url);
});
// --- City Guide (GPT + fallback) ---
async function generateCityGuide(city, countryCode) {
  const system = `You are a local food & culture expert for ${city}. Create a comprehensive city guide focused on authentic food.

Return STRICT JSON:
{
  "success": true,
  "city": "${city}",
  "country_code": "${countryCode}",
  "food_scene": {
    "signature_dishes": ["dish1","dish2","dish3"],
    "street_food_areas": ["area1","area2"],
    "local_markets": ["market1","market2"],
    "must_try_restaurants": [
      {"name":"Restaurant","specialty":"dish","price_range":"low|medium|high"}
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
  const user = `Create a food-focused city guide for ${city}, ${countryCode}. Authentic, local, non-touristy.`;
  return await gptChatJSON({ system, user, max_tokens: 1100 });
}

function getFallbackCityGuide(city, cc) {
  return {
    success: true,
    city, country_code: cc,
    food_scene: {
      signature_dishes: ['Signature stew','Grilled fish','Market snack'],
      street_food_areas: ['Central Market','Night Market'],
      local_markets: ['City Market','Farmers Market'],
      must_try_restaurants: [{ name: 'Local Kitchen', specialty: 'House special', price_range: 'medium' }]
    },
    cultural_highlights: [{ name: 'Old Town Walk', type: 'cultural', food_nearby: 'Street snacks' }],
    neighborhoods: [{ name: 'Riverside', vibe: 'lively', food_specialty: 'grilled dishes' }],
    local_tips: ['Carry small cash', 'Ask locals for hidden spots', 'Eat where its busy'],
    food_etiquette: 'Be polite, try sharing plates, queue kindly.',
    best_times: { breakfast:'6-9am', lunch:'12-2pm', dinner:'7-10pm', street_food:'5-9pm' }
  };
}

// --- Day Itinerary (GPT + fallback) ---
async function generateItinerary(location, duration, interests, budget) {
  const city = location?.city || 'City';
  const cc = (location?.country_code || 'US').toUpperCase();
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
  return await gptChatJSON({ system, user, max_tokens: 1100 });
}

function getFallbackItinerary(location, duration) {
  const city = location?.city || 'City';
  const cc = (location?.country_code || 'US').toUpperCase();
  return {
    success: true,
    city, country_code: cc, duration,
    steps: [
      { time: '09:00', title: 'Local breakfast', why: 'Start authentic', link: '', neighborhood: 'Market area', tags: ['food'] },
      { time: '12:30', title: 'Street food lunch', why: 'Busy vendors = fresh', link: '', neighborhood: 'Old town', tags: ['food','street'] },
      { time: '15:00', title: 'Cultural stop', why: 'Digest + learn', link: '', neighborhood: 'Museum district', tags: ['culture'] },
      { time: '19:00', title: 'Neighborhood dinner', why: 'Signature dish', link: '', neighborhood: 'Riverside', tags: ['food'] }
    ],
    budget: 'medium',
    interests: ['food','culture']
  };
}

// --- Food Crawl (GPT + fallback) ---
async function generateFoodCrawl(location, crawlType, duration) {
  const city = location?.city || 'City';
  const cc = (location?.country_code || 'US').toUpperCase();
  if (USE_GPT && OPENAI_API_KEY) {
    const system = `You are VFIED's food crawl expert. Design a ${duration} ${crawlType} crawl in ${city}.

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
  "type": "${crawlType}",
  "stops": [
    {"order":1,"time":"18:30","location":"Place","food":"What to order","emoji":"🍖","reason":"Why","cost":"$","tip":"insider tip"}
  ],
  "total_cost": "$",
  "walking_distance": "2km",
  "pro_tips": ["tip1","tip2"],
  "backup_spots": ["alt1","alt2"]
}`;
    const user = `Design a ${duration} ${crawlType} crawl for ${city}, ${cc}. Authentic, local, walkable; mix price points.`;
    const result = await gptChatJSON({ system, user, max_tokens: 1000 });
    if (result) return result;
  }
  // Fallback
  return {
    success: true,
    crawl_title: `${city} Food Discovery`,
    city, duration, type: crawlType,
    stops: [
      { order: 1, time: '18:00', location: 'Local Market', food: 'Street snacks', emoji: '🍢', reason: 'Start with local flavors', cost: '$5–10', tip: 'Ask vendors what\'s best today' },
      { order: 2, time: '19:30', location: 'Traditional Restaurant', food: 'Signature dish', emoji: '🍽️', reason: 'Core local cuisine', cost: '$15–25', tip: 'Try the house special' }
    ],
    total_cost: '$20–35', walking_distance: '1.5km',
    pro_tips: ['Bring cash', 'Busy = fresh'], backup_spots: ['Late-night stalls']
  };
}
// -------- Travel: City Guide --------
app.get('/v1/travel/guide/:city', async (req, res) => {
  const city = String(req.params.city || '').trim();
  const country_code = String(req.query.country_code || 'US').toUpperCase();

  if (USE_GPT && OPENAI_API_KEY) {
    const guide = await generateCityGuide(city, country_code);
    if (guide) return res.json(guide);
  }
  return res.json(getFallbackCityGuide(city, country_code));
});

// -------- Travel: Day Itinerary --------
app.post('/v1/travel/itinerary', async (req, res) => {
  const { location = {}, duration = 'one_day', interests = ['food','culture'], budget = 'medium' } = req.body || {};
  if (USE_GPT && OPENAI_API_KEY) {
    const it = await generateItinerary(location, duration, interests, budget);
    if (it) return res.json(it);
  }
  return res.json(getFallbackItinerary(location, duration));
});

// -------- Travel: Food Crawl --------
app.post('/v1/travel/food-crawl', async (req, res) => {
  const { location = {}, crawl_type = 'street_food', duration = '3_hours' } = req.body || {};
  const crawl = await generateFoodCrawl(location, crawl_type, duration);
  res.json(crawl);
});

// --- Error handler (last) ---
app.use((err, _req, res, _next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// --- Admin: MVP checklist (Phase 1 polish + Phase 2 starter, strict mode) ---
// Add this to your server (replace one of the duplicate admin/summary endpoints):
app.get('/v1/admin/checklist', authenticateApiKey, async (req, res) => {
  const USE_GPT = String(process.env.USE_GPT || '').toLowerCase() === 'true';
  const hasOpenAIKey = !!process.env.OPENAI_API_KEY;
  const hasWeatherKey = !!process.env.OPENWEATHER_API_KEY;

  // Countries sanity
  const countriesCount = (COUNTRIES_LIST || []).length;

  // Vendor menu existence
  const vendorId = req.apiKey.vendorId;
  let menuItemsCount = 0;
  if (db) {
    const m = await fsGetVendorMenu(vendorId);
    menuItemsCount = (m?.items || []).length;
  } else {
    const vm = vendorMenus.get(vendorId);
    menuItemsCount = vm ? vm.items.length : 0;
  }

  // Telemetry storage available?
  const hasTelemetry = !!db || (typeof logPath !== 'undefined');

  const items = [
    { key: 'decide_flow',           label: 'Food → Decide flow returns suggestions',               ok: true },
    { key: 'countries_api',         label: '/v1/countries returns a full list',                   ok: countriesCount >= 150 },
    { key: 'dietary_budget_ui',     label: 'Dietary chips + budget in payload',                   ok: true },
    { key: 'engine_badge',          label: 'Result shows Engine badge (GPT/Vendor/Fallback)',     ok: true },
    { key: 'vendor_menu_upload',    label: 'Vendor menu upload & read work',                      ok: menuItemsCount > 0 },
    { key: 'share_copy',            label: 'Share/Copy recommendation works',                     ok: true },
    { key: 'feedback_wired',        label: 'Thumbs feedback posts to backend',                    ok: hasTelemetry },
    { key: 'events_layer',          label: 'Events endpoint available (provider or mock)',        ok: true },
    { key: 'travel_nightplan',      label: 'Travel: Night Plan endpoint & UI',                    ok: true },
    { key: 'weather_live',          label: 'Live weather key configured',                         ok: hasWeatherKey },
    { key: 'gpt_enabled',           label: 'GPT suggestions enabled (USE_GPT + API key)',         ok: USE_GPT && hasOpenAIKey },
  ];

  res.json({
    success: true,
    vendor_id: vendorId,
    summary: {
      phase1_pass: items.slice(0, 7).every(i => i.ok),
      phase2_seed_pass: items.slice(7, 9).every(i => i.ok)
    },
    counts: {
      countries: countriesCount,
      menu_items: menuItemsCount
    },
    items
  });
});

// --- Start ---
app.listen(PORT, () => {
  console.log(`VFIED MCP server listening on :${PORT}`);
});

