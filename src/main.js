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
  const base = countrySelect.value ? JSON.parse(countrySelect.value) : {};
  const lat = parseFloat(latInput.value);
  const lng = parseFloat(lngInput.value);
  if (!isNaN(lat) && !isNaN(lng)) {
    base.latitude = lat;
    base.longitude = lng;
  }
  return base;
}

// ------------------ COUNTRY DROPDOWN ------------------
async function loadCountries() {
  try {
    const countries = await getCountries();
    countrySelect.innerHTML =
      `<option value="" disabled selected>Select your country</option>` +
      countries.map(c => `<option value='${JSON.stringify(c)}'>${c.name}</option>`).join("");
  } catch (e) {
    console.error("Countries failed", e);
  }
}
document.addEventListener("DOMContentLoaded", loadCountries);

countrySelect?.addEventListener("change", () => {
  try {
    const selected = JSON.parse(countrySelect.value);
    selectedFlag.textContent = countryCodeToEmoji(selected.code);
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
decideBtn.addEventListener('click', async () => {
  const mood_text = moodInput.value.trim() || 'hungry';
  const location = getLocation();
  const dietary = getSelectedDietary();
  const budget = budgetSelect.value;

  decideBtn.disabled = true;
  decideBtn.textContent = '🤖 Thinking...';

  try {
    const res = await fetch(`${SERVER}/v1/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer demo_growth_key_456' },
      body: JSON.stringify({
        location,
        mood_text,
        dietary,
        budget,
        menu_source: 'global_database'
      })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');

    console.log("Payload sent:", { mood_text, location, dietary, budget });

    // Populate result
    const food = data.food || {};
    foodEmoji.textContent = food.emoji || '🍽️';
    foodName.textContent = food.name || 'Great Choice';
    foodType.textContent = food.type ? `Cuisine: ${food.type}` : '';

    friendMessage.textContent = data.friendMessage || data.description || '';
    reasoning.textContent = data.reasoning || data.reason || '';
    culturalNote.textContent = data.culturalNote || '';
    dietaryNote.textContent = data.dietaryNote || '';
    weatherNote.textContent = data.weatherNote || data.weatherReasoning || '';

    countryCode.textContent = food.country_code ? countryCodeToEmoji(food.country_code) : '—';
    confidence.textContent = typeof data.confidence === 'number' ? `Confidence: ${data.confidence}%` : 'Confidence: —';
    weatherBadge.textContent = data?.weather?.description
      ? `Weather: ${data.weather.temperature}°C • ${data.weather.description}`
      : 'Weather: —';

    resultCard.style.display = 'block';
  } catch (e) {
    alert(`Error: ${e.message}`);
  } finally {
    decideBtn.disabled = false;
    decideBtn.textContent = '🎯 Decide For Me';
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
