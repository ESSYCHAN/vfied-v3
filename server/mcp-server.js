// server/mcp-server.js (CLEAN REBUILD)

// --- Imports & setup ---
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import Joi from 'joi';
import * as moodsModule from './data/moods.js';
const moods = moodsModule.default || moodsModule.moods || moodsModule;
import * as countriesModule from './data/countries.js';
// Normalize whatever the data file exports (default, named, object, etc.)
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
    /^https:\/\/.*\.vercel\.app$/,
    /^https:\/\/.*\.onrender\.com$/
  ],
  credentials: true
}));
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
app.post('/mcp/get_food_suggestion', async (req, res) => {
  const { mood = 'hungry', location = {}, dietary = [] } = req.body || {};
  const weather = await getWeather(location);
  const pick = fallbackSuggestion(location, dietary);
  res.json({
    success: true,
    friendMessage: `Try ${pick.name} ${pick.emoji} — ${weather?.isCold ? 'it will warm you up' : 'it suits today'}.`,
    food: { name: pick.name, emoji: pick.emoji, country: location.country, country_code: location.country_code },
    weather,
    dietaryNote: dietary.length ? `Filtered for: ${dietary.join(', ')}` : null
  });
});

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
app.post('/v1/menus', authenticateApiKey, (req, res) => {
  const { menu = [], mode = 'snapshot' } = req.body || {};
  if (!Array.isArray(menu)) return res.status(400).json({ error: 'menu must be an array' });

  const vendorId = req.apiKey.vendorId;
  const current = vendorMenus.get(vendorId) || { items: [], version: null, updatedAt: null };
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
  vendorMenus.set(vendorId, { items: nextItems, version, updatedAt: new Date() });

  res.json({
    success: errors.length === 0,
    menu_version: version,
    summary: { accepted: accepted.length, rejected: errors.length, total: menu.length },
    errors
  });
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
app.get('/v1/menus', authenticateApiKey, (req, res) => {
  const vendorId = req.apiKey.vendorId;
  const vm = vendorMenus.get(vendorId);
  if (!vm) return res.json({ success: true, items: [], version: null, updatedAt: null });
  res.json({
    success: true,
    vendor_id: vendorId,
    version: vm.version,
    updatedAt: vm.updatedAt,
    items: vm.items
  });
});
// View current vendor menu (requires API key)
app.get('/v1/menus', authenticateApiKey, (req, res) => {
  const vendorId = req.apiKey.vendorId;
  const vm = vendorMenus.get(vendorId);
  if (!vm) return res.json({ success: true, items: [], version: null, updatedAt: null });
  res.json({ success: true, vendor_id: vendorId, version: vm.version, updatedAt: vm.updatedAt, items: vm.items });
});

app.get('/v1/analytics', authenticateApiKey, (req, res) => {
  const k = req.apiKey;
  res.json({
    success: true,
    usage: { current_period: k.usage, limit: k.limit, percentage: Math.round((k.usage / k.limit) * 100) },
    plan: k.plan,
    vendor_id: k.vendorId,
    menu_status: vendorMenus.has(k.vendorId) ? 'uploaded' : 'not_uploaded'
  });
});

// Optional vendor recommend that prefers menu if present
app.post('/v1/recommend', async (req, res) => {
  const { location = {}, dietary = [], menu_source = 'global_database', vendor_id } = req.body || {};

  // If Authorization header has a known API key, prefer that vendorId
  let resolvedVendorId = vendor_id;
  try {
    const auth = req.headers.authorization || '';
    if (auth.startsWith('Bearer ')) {
      const key = auth.slice(7);
      const meta = apiKeys.get(key);
      if (meta?.vendorId) resolvedVendorId = resolvedVendorId || meta.vendorId;
    }
  } catch {}

  let food;
  if ((menu_source === 'my_uploaded_menu' || resolvedVendorId) && resolvedVendorId && vendorMenus.has(resolvedVendorId)) {
    const items = vendorMenus.get(resolvedVendorId).items.filter(i => i.availability !== 'archived');
    food = items[Math.floor(Math.random() * items.length)] || null;
  }

  if (!food) {
    const pick = fallbackSuggestion(location, dietary);
    return res.json({
      success: true,
      source: 'global_database',
      food: { name: pick.name, emoji: pick.emoji, country: location.country, country_code: location.country_code }
    });
  }

  return res.json({
    success: true,
    source: 'uploaded_menu',
    food: {
      menu_item_id: food.menu_item_id,
      name: food.name,
      emoji: food.emoji || '🍽️',
      price: food.price,
      description: food.description,
      country_code: food.country_code
    }
  });
});

app.get('/v1/events', (req, res) => {
  const city = (req.query.city || 'Nairobi').toString();
  const cc   = (req.query.country_code || 'KE').toString().toUpperCase();
  const demo = [
    { id: 'e1', city, country_code: cc, title: 'Jazz in the Park', when: 'Tonight 7pm', tag: 'music' },
    { id: 'e2', city, country_code: cc, title: 'Street Food Festival', when: 'Sat 3pm', tag: 'food' },
    { id: 'e3', city, country_code: cc, title: 'Open-Air Cinema', when: 'Sun 8pm', tag: 'film' },
  ];
  res.json({ success: true, events: demo });
});
// --- Countries & health ---
app.get('/v1/countries', (_req, res) => {
  // Always returns something; sorted by name
  const out = [...COUNTRIES_LIST].sort((a, b) => a.name.localeCompare(b.name));
  res.json({ countries: out });
});

app.get('/health', (_req, res) => {
  res.json({
    status: 'healthy',
    service: 'VFIED MCP Server (clean)',
    timestamp: new Date().toISOString()
  });
});

// Phase-2: Travel highlights (mock data, region-aware)
app.get('/v1/travel/highlights', (req, res) => {
  const city = String(req.query.city || 'Nairobi');
  const cc   = String(req.query.country_code || 'KE').toUpperCase();

  const DB = {
    KE: {
      intro: `Essential Kenyan bites in ${city}`,
      dishes: [
        { name: 'Nyama Choma', emoji: '🍖', note: 'Grilled goat/beef, classic weekend vibe' },
        { name: 'Ugali & Sukuma', emoji: '🥬', note: 'Cornmeal with greens — true staple' },
        { name: 'Pilau', emoji: '🍚', note: 'Spiced rice with coastal aroma' },
        { name: 'Mutura', emoji: '🌭', note: 'Street sausage, late-night legend' },
        { name: 'Tilapia Fry', emoji: '🐟', note: 'Lakeside crispy fish' }
      ]
    },
    GB: {
      intro: `Must-try UK comfort in ${city}`,
      dishes: [
        { name: 'Fish and Chips', emoji: '🍟', note: 'Seaside classic, vinegar mandatory' },
        { name: 'Full English', emoji: '🍳', note: 'Hearty breakfast plate' },
        { name: 'Chicken Tikka Masala', emoji: '🍛', note: 'Brit-Indian icon' },
        { name: 'Sunday Roast', emoji: '🥩', note: 'Yorkshire puds + gravy' },
        { name: 'Sticky Toffee Pudding', emoji: '🍰', note: 'Dessert royalty' }
      ]
    },
    JP: {
      intro: `Essentials of Japan in ${city}`,
      dishes: [
        { name: 'Ramen', emoji: '🍜', note: 'Broth & noodles heaven' },
        { name: 'Sushi', emoji: '🍣', note: 'Nigiri/rolls — go fresh' },
        { name: 'Okonomiyaki', emoji: '🥞', note: 'Savory pancake' },
        { name: 'Katsu Curry', emoji: '🍛', note: 'Crispy cutlet + curry' },
        { name: 'Takoyaki', emoji: '🧆', note: 'Octopus balls street snack' }
      ]
    },
    US: {
      intro: `American hits in ${city}`,
      dishes: [
        { name: 'Burger', emoji: '🍔', note: 'Smash or stacked' },
        { name: 'BBQ Brisket', emoji: '🥩', note: 'Low & slow' },
        { name: 'New York Slice', emoji: '🍕', note: 'Fold and go' },
        { name: 'Poke Bowl', emoji: '🥗', note: 'Hawaiian fresh' },
        { name: 'Chicken & Waffles', emoji: '🧇', note: 'Sweet + savory brunch' }
      ]
    }
  };

  const pack = DB[cc] || { intro: `Local picks in ${city}`, dishes: [{ name:'Chef’s choice', emoji:'🍽️', note:'Explore nearby' }] };
  res.json({ success: true, city, country_code: cc, intro: pack.intro, dishes: pack.dishes });
});

app.post('/v1/telemetry', (req, res) => {
  const { event, payload } = req.body || {};
  // In real life, write to a DB / log drain. For now, console is fine.
  console.log('[telemetry]', event, { at: new Date().toISOString(), payload });
  res.json({ success: true });
});
// --- Error handler (last) ---
app.use((err, _req, res, _next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// --- Start ---
app.listen(PORT, () => {
  console.log(`VFIED MCP server listening on :${PORT}`);
});
