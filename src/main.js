import { getCountries, getFoodSuggestion } from "./services/foodService.js";
import { countryCodeToEmoji } from "./utils/helpers.js";

// ------------------ CONFIG ------------------
const SERVER = import.meta.env.VITE_MCP_SERVER_URL || 'https://vfied-v3.onrender.com';
const API_KEY = 'demo_growth_key_456'; // demo vendor key for upload endpoints

// ------------------ ELEMENTS ------------------
const moodInput = document.getElementById('moodInput');
const decideBtn = document.getElementById('decideBtn');
const detectMoodBtn = document.getElementById('detectMoodBtn');
const countrySelect = document.getElementById('countrySelect');
const citySelect = document.getElementById('citySelect'); // optional city select
const latInput = document.getElementById('latInput');
const lngInput = document.getElementById('lngInput');
const budgetSelect = document.getElementById('budgetSelect');

const resultCard = document.getElementById('resultCard');
const foodEmoji = document.getElementById('foodEmoji');
const foodName = document.getElementById('foodName');
const foodType = document.getElementById('foodType');
const friendMessage = document.getElementById('friendMessage');
const reasoning = document.getElementById('reasoning');
const culturalNote = document.getElementById('culturalNote');
const dietaryNote = document.getElementById('dietaryNote');
const weatherNote = document.getElementById('weatherNote');
const countryCode = document.getElementById('countryCode');
const confidence = document.getElementById('confidence');
const weatherBadge = document.getElementById('weatherBadge');

const menuTextarea = document.getElementById('menuTextarea');
const uploadMenuBtn = document.getElementById('uploadMenuBtn');
const viewMenuBtn = document.getElementById('viewMenuBtn');
const menuResponse = document.getElementById('menuResponse');
const chipsWrap = document.getElementById('dietaryChips');
const selectedFlag = document.getElementById('selectedFlag');

const DIETARY = [
  'vegetarian','vegan','gluten-free','dairy-free','keto','halal',
  'kosher','nut-free','paleo','pescatarian'
];
function activateTab(name) {
  document.querySelectorAll('.tab').forEach(btn => {
    const isActive = btn.dataset.tab === name;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
  document.querySelectorAll('.tabpanel').forEach(panel => {
    panel.classList.toggle('hidden', panel.id !== `tab-${name}`);
  });
}
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.tab');
  if (!btn) return;
  activateTab(btn.dataset.tab);
});
document.addEventListener('DOMContentLoaded', () => activateTab('food'));
// ------------------ RENDER ------------------
function renderChips() {
  chipsWrap.innerHTML = '';
  DIETARY.forEach(tag => {
    const id = `diet_${tag}`;
    const chip = document.createElement('label');
    chip.className = 'chip';
    chip.innerHTML = `<input type="checkbox" id="${id}" value="${tag}"><span>${tag}</span>`;
    chipsWrap.appendChild(chip);
  });
}
renderChips();

function getSelectedDietary() {
  return Array.from(chipsWrap.querySelectorAll('input[type="checkbox"]:checked')).map(c => c.value);
}

function getLocation() {
  const countrySel = document.getElementById('countrySelect'); // optional
  const citySel = document.getElementById('citySelect');       // you have this
  let base = { city: 'London', country: 'United Kingdom', country_code: 'GB' }; // safe default

  try {
    if (countrySel && countrySel.value) {
      // expects {"name":"Kenya","code":"KE"} or similar
      const c = JSON.parse(countrySel.value);
      base = {
        city: '',
        country: c.name || c.country || '',
        country_code: c.code || c.country_code || ''
      };
    } else if (citySel && citySel.value) {
      // your #citySelect options already contain full JSON
      base = JSON.parse(citySel.value);
    }
  } catch (e) {
    console.warn("getLocation() parse failed, using default:", e);
  }

  const lat = parseFloat(document.getElementById('latInput')?.value ?? "");
  const lng = parseFloat(document.getElementById('lngInput')?.value ?? "");
  if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
    base.latitude = lat;
    base.longitude = lng;
  }
  return base;
}


// ------------------ COUNTRY DROPDOWN ------------------
// Safe country loader (only runs if #countrySelect exists)
async function loadCountriesIfPresent() {
  const sel = document.getElementById('countrySelect');
  if (!sel) return; // This page uses #citySelect instead. Skip.
  try {
    const res = await fetch(`${SERVER}/v1/countries`);
    const data = await res.json();
    if (!data?.countries?.length) return;
    sel.innerHTML =
      `<option value="" disabled selected>Select your country</option>` +
      data.countries.map(c => `<option value='${JSON.stringify(c)}'>${c.name}</option>`).join("");
  } catch (e) {
    console.warn("Countries failed", e);
  }
}
document.addEventListener("DOMContentLoaded", loadCountriesIfPresent);


countrySelect?.addEventListener("change", () => {
  try {
    const selected = JSON.parse(countrySelect.value);
    if (selectedFlag) {
      // You already import countryCodeToEmoji from helpers
      selectedFlag.textContent = countryCodeToEmoji(selected.code || selected.country_code);
    }
  } catch {}
});

// ------------------ QUICK MOODS ------------------
document.querySelectorAll('[data-quick]').forEach(btn => {
  btn.addEventListener('click', () => {
    const map = {
      tired: 'tired and need something comforting',
      stressed: 'stressed but want something light',
      celebrating: 'celebrating a small win',
      hungry: 'very hungry and need food fast'
    };
    moodInput.value = map[btn.dataset.quick] || btn.dataset.quick;
  });
});

// OPTIONAL demo mood detection
if (detectMoodBtn) {
  detectMoodBtn.addEventListener('click', () => {
    if (!moodInput.value.trim()) {
      moodInput.value = 'stressed but want something light';
    }
    detectMoodBtn.textContent = '🧠 Mood understood!';
    setTimeout(() => (detectMoodBtn.textContent = '✨ Detect Mood (AI)'), 1200);
  });
}

// ------------------ MAIN RECOMMEND CALL ------------------
decideBtn?.addEventListener('click', async () => {
  decideBtn.disabled = true;
  decideBtn.textContent = '🤖 Thinking...';
  
  const mood_text = (document.getElementById('moodInput')?.value || '').trim() || 'hungry';
  const location  = getLocation();
  const chipsWrap = document.getElementById('dietaryChips');
  const dietary   = chipsWrap ? Array.from(chipsWrap.querySelectorAll('input[type="checkbox"]:checked')).map(c => c.value) : [];
  const budget    = document.getElementById('budgetSelect')?.value || 'medium';
  
  try {
    console.log("[VFIED] sending", { url: `${SERVER}/v1/recommend`, mood_text, location, dietary, budget });
  
    const res  = await fetch(`${SERVER}/v1/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // public endpoint; no key needed
      body: JSON.stringify({ location, mood_text, dietary, budget, menu_source: 'global_database' })
    });
  
    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { throw new Error(`Bad JSON: ${text.slice(0,140)}…`); }
  
    console.log("[VFIED] response", res.status, data);
  
    if (!res.ok || !data?.success) throw new Error(data?.error || `HTTP ${res.status}`);
  
    // --- Resilient rendering (works even if some elements are missing) ---
    const rc = document.getElementById('resultCard');
    if (rc?.style) rc.style.display = 'block';
  
    const food = data.food || {};
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  
    set('foodEmoji',     food.emoji || '🍽️');
    set('foodName',      food.name  || 'Great Choice');
    set('friendMessage', data.friendMessage || data.description || '');
    set('reasoning',     data.reasoning || data.reason || '');
    set('culturalNote',  data.culturalNote || '');
    set('dietaryNote',   data.dietaryNote || '');
    set('weatherNote',   data.weatherNote || data.weatherReasoning || '');
    set('countryCode',   food.country_code ? (typeof countryCodeToEmoji === 'function' ? countryCodeToEmoji(food.country_code) : food.country_code) : '—');
    set('confidence',    typeof data.confidence === 'number' ? `Confidence: ${data.confidence}%` : 'Confidence: —');
    set('weatherBadge',  data?.weather?.description ? `Weather: ${data.weather.temperature}°C • ${data.weather.description}` : 'Weather: —');
  
  } catch (e) {
    console.error("[VFIED] decide error", e);
    alert(`Error: ${e.message}`);
  } finally {
    decideBtn.disabled = false;
    decideBtn.textContent = '🎯 Decide For Me';
  }
});
//------------------- EVENTS  ------------------
document.getElementById('loadEventsBtn')?.addEventListener('click', async () => {
  const loc = getLocation();
  const url = `${SERVER}/v1/events?city=${encodeURIComponent(loc.city||'')}&country_code=${encodeURIComponent(loc.country_code||'')}`;
  const list = document.getElementById('eventsList');
  list.innerHTML = '<li>Loading…</li>';
  try {
    const r = await fetch(url);
    const data = await r.json();
    const events = data?.events || [];
    list.innerHTML = events.length
      ? events.map(e => `<li><strong>${e.title}</strong><br><span class="small muted">${e.when} — ${e.city} ${e.country_code}</span></li>`).join('')
      : '<li>No events found.</li>';
  } catch (e) {
    list.innerHTML = '<li>Failed to load events.</li>';
  }
});

// ------------------ ACCEPT / RETRY ------------------
document.getElementById('acceptBtn').addEventListener('click', () => {
  alert('✅ Saved! Enjoy your meal.');
  resultCard.style.display = 'none';
});
document.getElementById('tryAgainBtn').addEventListener('click', () => {
  decideBtn.click();
});

// ------------------ VENDOR UPLOAD ------------------
uploadMenuBtn.addEventListener('click', async () => {
  try {
    const menu = JSON.parse(menuTextarea.value);
    const res = await fetch(`${SERVER}/v1/menus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({ mode: 'snapshot', menu })
    });
    const data = await res.json();
    menuResponse.textContent = JSON.stringify(data, null, 2);

    // Trigger a recommend after upload
    const recRes = await fetch(`${SERVER}/v1/recommend`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${API_KEY}` },
      body: JSON.stringify({ menu_source: "vendor", vendor_id: "demo_vendor" })
    });
    const recData = await recRes.json();
    menuResponse.textContent += "\n\nSuggestion:\n" + JSON.stringify(recData, null, 2);

  } catch (e) {
    menuResponse.textContent = `Error: ${e.message}`;
  }
});

viewMenuBtn.addEventListener('click', async () => {
  try {
    const res = await fetch(`${SERVER}/v1/menus`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    });
    const data = await res.json();
    menuResponse.textContent = JSON.stringify(data, null, 2);
  } catch (e) {
    menuResponse.textContent = `Error: ${e.message}`;
  }
});
