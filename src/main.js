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
const LS = {
  get(k, d=null){ try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v){ localStorage.setItem(k, JSON.stringify(v)); }
};
const cityInputFree = document.getElementById('cityInputFree');
let lastPayload = null;

const tabBtns = document.querySelectorAll('.tab-btn');
const panels  = document.querySelectorAll('.tab-panel');
tabBtns.forEach(btn => btn.addEventListener('click', () => {
  const name = btn.dataset.tab;
  tabBtns.forEach(b => b.classList.toggle('active', b === btn));
  panels.forEach(p => p.style.display = p.id === `tab-${name}` ? 'block' : 'none');
}));

function setThinking(on) {
  const btn = document.getElementById('decideBtn');
  if (!btn) return;
  btn.disabled = !!on;
  btn.textContent = on ? '🤖 Thinking...' : '🎯 Decide For Me';
  btn.setAttribute('aria-busy', on ? 'true' : 'false');
}

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
document.addEventListener('DOMContentLoaded', () => {
  activateTab('food');
  
  // Restore saved user preferences
  const last = LS.get('vfied:lastPayload');
  const mood = LS.get('vfied:mood');
  const diet = LS.get('vfied:dietary', []);
  const budg = LS.get('vfied:budget');
  const savedCity = LS.get('vfied:city'); 
  
  if(savedCity && cityInputFree) cityInputFree.value = savedCity;

  if (mood) document.getElementById('moodInput').value = mood;
  if (diet?.length) {
    diet.forEach(v => {
      const el = document.querySelector(`#dietaryChips input[value="${v}"]`);
      if (el) el.checked = true;
    });
  }
  if (budg) { budgetSelect.value = budg; }

  // If you're using #citySelect with JSON options, try to match country_code
  try {
    const code = last?.location?.country_code;
    const sel = document.getElementById('citySelect');
    if (code && sel) {
      for (const opt of sel.options) {
        const val = JSON.parse(opt.value);
        if (val.country_code === code) { sel.value = opt.value; break; }
      }
    }
  } catch {}
});
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

// Add after line 45 (after renderChips();):
// Save on change
moodInput?.addEventListener('input', e => LS.set('vfied:mood', e.target.value));
budgetSelect?.addEventListener('change', e => LS.set('vfied:budget', e.target.value));

// Save dietary on change
chipsWrap?.addEventListener('change', () => {
  const vals = Array.from(chipsWrap.querySelectorAll('input[type="checkbox"]:checked')).map(x => x.value);
  LS.set('vfied:dietary', vals);
});

// Save location (citySelect holds JSON per option)
citySelect?.addEventListener('change', e => {
  try {
    const val = JSON.parse(e.target.value);
    LS.set('vfied:location', val);
  } catch {}
});
// Add after existing save handlers:
cityInputFree?.addEventListener('input', e => LS.set('vfied:city', e.target.value));
function getSelectedDietary() {
  return Array.from(chipsWrap.querySelectorAll('input[type="checkbox"]:checked')).map(c => c.value);
}

function getLocation() {
  const countrySel = document.getElementById('countrySelect');
  const citySel = document.getElementById('citySelect');
  let base = { city: 'London', country: 'United Kingdom', country_code: 'GB' };

  try {
    if (countrySel && countrySel.value) {
      const c = JSON.parse(countrySel.value);
      base = {
        city: '',
        country: c.name || c.country || '',
        country_code: c.code || c.country_code || ''
      };
    } else if (citySel && citySel.value) {
      base = JSON.parse(citySel.value);
    }
  } catch (e) {
    console.warn("getLocation() parse failed, using default:", e);
  }

  // City override from free input
  const cityOverride = cityInputFree?.value?.trim();
  if (cityOverride) base.city = cityOverride;

  const lat = parseFloat(latInput?.value ?? "");
  const lng = parseFloat(lngInput?.value ?? "");
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
document.getElementById('quickMoods')?.addEventListener('click', (e) => {
  const btn = e.target.closest('.mood-chip');
  if (!btn) return;
  // visual active
  document.querySelectorAll('.mood-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const map = {
    tired: 'tired and need something comforting',
    stressed: 'stressed but want something light',
    celebrating: 'celebrating a small win',
    hungry: 'very hungry and need food fast'
  };
  const val = map[btn.dataset.quick] || btn.dataset.quick;
  document.getElementById('moodInput').value = val;
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
  const mood_text = (document.getElementById('moodInput')?.value || '').trim() || 'hungry';
  const location  = getLocation();
  const chipsWrap = document.getElementById('dietaryChips');
  const dietary   = chipsWrap ? Array.from(chipsWrap.querySelectorAll('input[type="checkbox"]:checked')).map(c => c.value) : [];
  const budget    = document.getElementById('budgetSelect')?.value || 'medium';

  lastPayload = { location, mood_text, dietary, budget, menu_source: 'global_database' };
  LS.set('vfied:lastPayload', lastPayload);
  setThinking(true);
  try {
    const res  = await fetch(`${SERVER}/v1/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lastPayload)
    });
    const text = await res.text();
    const data = JSON.parse(text);

    if (!res.ok || !data?.success) throw new Error(data?.error || `HTTP ${res.status}`);

    // show result
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };

    const food = data.food || {};
    set('foodEmoji',  food.emoji || '🍽️');
    set('foodName',   food.name  || 'Great Choice');
    set('friendMessage', data.friendMessage || data.description || '');
    set('reasoning',  data.reasoning || data.reason || '');
    set('culturalNote', data.culturalNote || '');
    set('dietaryNote', data.dietaryNote || '—');
    set('weatherNote', data.weatherNote || data.weatherReasoning || '—');

    // flag + confidence + weather
    set('countryCode', food.country_code ? countryCodeToEmoji(food.country_code) : '—');
    set('confidence', (typeof data.confidence === 'number') ? `Confidence: ${data.confidence}%` : 'Confidence: —');
    set('weatherBadge',
      (data?.weather?.description || (data?.weather && data.weather.temperature != null))
        ? `Weather: ${data.weather.temperature ?? '—'}°C • ${data.weather.description ?? data.weather.condition ?? ''}`.trim()
        : 'Weather: —'
    );

    // engine badge
    const engineEl = document.getElementById('engineBadge');
    if (engineEl) engineEl.textContent =
      (data.source === 'gpt' || data.context?.mood_detection_method === 'ai') ? 'Engine: GPT' :
      (data.source === 'uploaded_menu') ? 'Engine: Vendor Menu' : 'Engine: Fallback';

    document.getElementById('resultCard').style.display = 'block';
    
    fetch(`${SERVER}/v1/telemetry`, {
      method: 'POST', 
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ event: 'decide_success', payload: { location, dietary } })
    }).catch(()=>{});
  } catch (e) {
    console.error(e);
    alert(`Error: ${e.message}`);
  } finally {
    setThinking(false);
  }
});


//------------------- EVENTS  ------------------
document.getElementById('loadEventsBtn')?.addEventListener('click', async () => {
  const grid = document.getElementById('eventsGrid');
  if (!grid) return;
  const loc = getLocation();
  const url = `${SERVER}/v1/events?city=${encodeURIComponent(loc.city||'')}&country_code=${encodeURIComponent(loc.country_code||'')}`;
  grid.innerHTML = '<div class="muted">Loading events…</div>';
  try {
    const r = await fetch(url);
    const data = await r.json();
    const events = data?.events || [];
    if (!events.length) {
      grid.innerHTML = '<div class="muted">No events found.</div>';
      return;
    }
    grid.innerHTML = events.map(e => {
      const pairing = (loc.country_code === 'KE') ? 'Try Nyama Choma nearby.' :
                      (loc.country_code === 'GB') ? 'Pair with fish & chips.' :
                      (loc.country_code === 'JP') ? 'Grab ramen after.' : 'Find a local favorite.';
      const emoji = e.tag === 'music' ? '🎶' : e.tag === 'food' ? '🍢' : '🎬';
      return `
        <div class="event-card">
          <div class="event-badge">${emoji}</div>
          <div class="event-body">
            <div class="event-title">${e.title}</div>
            <div class="event-meta">${e.when} — ${e.city} ${e.country_code}</div>
            <div class="event-meta">${pairing}</div>
            <div class="event-cta">
              <a class="small secondary" href="${SERVER}/v1/linkout?tag=event&url=${encodeURIComponent(`https://www.google.com/search?q=${encodeURIComponent(`${e.title} ${e.city}`)}`)}" target="_blank" rel="noopener">Book (demo)</a>
              <button class="small" onclick="document.getElementById('decideBtn').scrollIntoView({behavior:'smooth'});">Suggest food</button>
            </div>
          </div>
        </div>`;
    }).join('');
    fetch(`${SERVER}/v1/telemetry`, {
      method: 'POST', 
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ event: 'events_view', payload: { city: loc.city, code: loc.country_code } })
    }).catch(()=>{});
  } catch (e) {
    grid.innerHTML = '<div class="muted">Failed to load events.</div>';
  }
});
//------------------- TRAVEL  ------------------
document.getElementById('loadTravelBtn')?.addEventListener('click', async () => {
  const grid  = document.getElementById('travelGrid');
  const intro = document.getElementById('travelIntro');
  if (!grid) return;

  const loc = getLocation();
  const url = `${SERVER}/v1/travel/highlights?city=${encodeURIComponent(loc.city||'')}&country_code=${encodeURIComponent(loc.country_code||'')}`;

  grid.innerHTML = '<div class="muted">Loading must-try…</div>';
  intro.textContent = '';

  try {
    const r = await fetch(url);
    const data = await r.json();
    intro.textContent = data?.intro || '';

    const dishes = data?.dishes || [];
    if (!dishes.length) {
      grid.innerHTML = '<div class="muted">No highlights yet.</div>';
      return;
    }

    grid.innerHTML = dishes.map(d => `
      <div class="travel-card">
        <div class="travel-emoji">${d.emoji || '🍽️'}</div>
        <div class="travel-body">
          <div class="travel-title">${d.name}</div>
          <div class="travel-note">${d.note || ''}</div>
          <div class="travel-cta">
            <button class="small" data-suggest='${encodeURIComponent(JSON.stringify(d))}'>Suggest this</button>
            <button class="small" onclick="window.open('${SERVER}/v1/linkout?tag=maps&url=${encodeURIComponent(`https://www.google.com/maps/search/${encodeURIComponent(`${d.name} ${loc.city||''}`)}`)}}','_blank','noopener')">Open in Maps</button>
          </div>
        </div>
      </div>
    `).join('');

  } catch (e) {
    grid.innerHTML = '<div class="muted">Failed to load highlights.</div>';
  }
});

// Delegate clicks on "Suggest this" to trigger your existing Decide flow
document.getElementById('tab-travel')?.addEventListener('click', async (e) => {
  const btn = e.target.closest('button[data-suggest]');
  if (!btn) return;
  try {
    const d = JSON.parse(decodeURIComponent(btn.dataset.suggest));
    // Build a payload that biases the suggestion to this dish name
    const loc = getLocation();
    const mood_text = `I want to try ${d.name}`;
    const payload = { location: loc, mood_text, dietary: [], budget: 'medium', menu_source: 'global_database' };

    // Optional: smooth scroll to result
    document.getElementById('decideBtn')?.scrollIntoView({ behavior:'smooth', block:'center' });

    // Call your existing recommend endpoint
    const res = await fetch(`${SERVER}/v1/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok || !data?.success) throw new Error(data?.error || `HTTP ${res.status}`);

    // Render result card
    document.getElementById('resultCard').style.display = 'block';
    document.getElementById('foodEmoji').textContent = data.food?.emoji || (d.emoji || '🍽️');
    document.getElementById('foodName').textContent  = data.food?.name  || d.name;
    document.getElementById('friendMessage').textContent = data.friendMessage || `Great pick for ${loc.city || 'your trip'}!`;

  } catch (err) {
    alert('Could not suggest this item.');
  }
});

// ------------------ ACCEPT / RETRY ------------------
document.getElementById('acceptBtn').addEventListener('click', () => {
  alert('✅ Saved! Enjoy your meal.');
  resultCard.style.display = 'none';
});
document.getElementById('tryAgainBtn')?.addEventListener('click', async () => {
  const btn = document.getElementById('tryAgainBtn');
  btn.disabled = true;
  setThinking(true);
  try {
    const payload = lastPayload || {
      location: getLocation(),
      mood_text: (moodInput?.value || 'hungry'),
      dietary: getSelectedDietary ? getSelectedDietary() : [],
      budget: budgetSelect?.value || 'medium',
      menu_source: 'global_database'
    };
    const res  = await fetch(`${SERVER}/v1/recommend`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok || !data?.success) throw new Error(data?.error || `HTTP ${res.status}`);

    // minimal re-render
    document.getElementById('resultCard').style.display = 'block';
    document.getElementById('foodEmoji').textContent = data.food?.emoji || '🍽️';
    document.getElementById('foodName').textContent  = data.food?.name  || 'Great Choice';
    document.getElementById('friendMessage').textContent = data.friendMessage || '';
  } catch (e) {
    alert(`Error: ${e.message}`);
  } finally {
    setThinking(false);
    btn.disabled = false;
  }
});

// ------------------ VENDOR UPLOAD ------------------
uploadMenuBtn.addEventListener('click', async () => {
  try {
    const menu = JSON.parse(menuTextarea.value);
    const res = await fetch(`${SERVER}/v1/menus`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
      body: JSON.stringify({ mode: 'snapshot', menu })
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Upload failed');

    const accepted = (data.summary?.accepted ?? 0);
    const total    = (data.summary?.total ?? menu.length);
    const names    = Array.isArray(menu) ? menu.map(m => m.name).filter(Boolean).join(', ') : '';

    menuResponse.textContent =
      `✅ Menu uploaded (accepted ${accepted}/${total})\n`+
      `version: ${data.menu_version}\n`+
      (names ? `items: ${names}\n` : '') +
      (data.errors?.length ? `errors: ${JSON.stringify(data.errors, null, 2)}` : '');

    // Optional: preview a suggestion from uploaded menu
    const recRes = await fetch(`${SERVER}/v1/recommend`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${API_KEY}` },
      body: JSON.stringify({ menu_source: "my_uploaded_menu" })
    });
    const recData = await recRes.json();
    menuResponse.textContent += `\n\nSuggestion → ${recData?.food?.name || 'n/a'} ${recData?.food?.emoji || ''}`;
  } catch (e) {
    menuResponse.textContent = `❌ ${e.message}`;
  }
});
// ------------------ SERVICE WORKER ------------------
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => console.warn('SW reg failed', err));
  });
}
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
// Add at the very end of main.js:
let deferredPrompt=null;
window.addEventListener('beforeinstallprompt', (e)=>{
  e.preventDefault(); 
  deferredPrompt=e;
  const b=document.getElementById('installBanner'); 
  if(b) b.style.display='block';
});
document.getElementById('installBtn')?.addEventListener('click', async ()=>{
  if(!deferredPrompt) return;
  deferredPrompt.prompt(); 
  await deferredPrompt.userChoice; 
  deferredPrompt=null;
  document.getElementById('installBanner').style.display='none';
});
document.getElementById('installClose')?.addEventListener('click', ()=>{
  document.getElementById('installBanner').style.display='none';
});
// ---- Events ----
const eventsGrid = document.getElementById('eventsGrid');
const loadEventsBtn = document.getElementById('loadEventsBtn');

loadEventsBtn?.addEventListener('click', async () => {
  const loc = getLocation();
  eventsGrid.innerHTML = '<div class="muted">Loading…</div>';
  try {
    const r = await fetch(`${SERVER}/v1/events?city=${encodeURIComponent(loc.city||'')}&country_code=${encodeURIComponent(loc.country_code||'')}`);
    const data = await r.json();
    const events = data?.events || [];
    if (!events.length) { eventsGrid.innerHTML = '<div class="muted">No events found.</div>'; return; }

    eventsGrid.innerHTML = events.map(e => {
      const emoji = e.tag === 'music' ? '🎶' : e.tag === 'food' ? '🍢' : '🎬';
      const mood  = e.tag === 'music' ? 'celebrating' : e.tag === 'food' ? 'adventurous' : 'relax';
      const realUrl = `https://www.google.com/search?q=${encodeURIComponent(`${e.title} ${e.city}`)}`;
      const tracked = `${SERVER}/v1/linkout?tag=event&url=${encodeURIComponent(realUrl)}`;
      return `
        <div class="event-card">
          <div class="event-badge">${emoji}</div>
          <div class="event-body">
            <div class="event-title">${e.title}</div>
            <div class="event-meta">${e.when} — ${e.city} ${e.country_code}</div>
            <div class="row" style="gap:8px; margin-top:6px">
              <button class="small" data-suggest-mood="${mood}">Suggest food for this</button>
              <a class="small secondary" href="${tracked}" target="_blank" rel="noopener">Book (demo)</a>
            </div>
          </div>
        </div>`;
    }).join('');
  } catch {
    eventsGrid.innerHTML = '<div class="muted">Failed to load events.</div>';
  }
});

// Delegate: click "Suggest food for this"
eventsGrid?.addEventListener('click', async (ev) => {
  const btn = ev.target.closest('button[data-suggest-mood]');
  if (!btn) return;
  const loc = getLocation();
  const mood_text = `I'm ${btn.dataset.suggestMood} and want something local`;
  setThinking(true);
  try {
    const res = await fetch(`${SERVER}/v1/recommend`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ location: loc, mood_text, dietary: getSelectedDietary(), budget: budgetSelect?.value || 'medium' })
    });
    const data = await res.json();
    if (data?.success) {
      resultCard.style.display = 'block';
      foodEmoji.textContent = data.food?.emoji || '🍽️';
      foodName.textContent  = data.food?.name  || 'Great Choice';
      friendMessage.textContent = data.friendMessage || '';
    }
  } finally { setThinking(false); }
});
// ---- Travel ----
const travelGrid = document.getElementById('travelGrid');
const loadTravelBtn = document.getElementById('loadTravelBtn');

loadTravelBtn?.addEventListener('click', async () => {
  const loc = getLocation();
  travelGrid.innerHTML = '<div class="muted">Loading…</div>';
  try {
    const r = await fetch(`${SERVER}/v1/travel/highlights?city=${encodeURIComponent(loc.city||'')}&country_code=${encodeURIComponent(loc.country_code||'')}`);
    const data = await r.json();
    const items = data?.highlights || [];
    if (!items.length) { travelGrid.innerHTML = '<div class="muted">No highlights yet.</div>'; return; }

    travelGrid.innerHTML = items.map(d => {
      const maps = `https://www.google.com/maps/search/${encodeURIComponent(`${d.name} ${loc.city||''}`)}`;
      const mapsTracked = `${SERVER}/v1/linkout?tag=maps&url=${encodeURIComponent(maps)}`;
      return `
        <div class="travel-card">
          <div class="travel-badge">${d.emoji || '🗺️'}</div>
          <div class="travel-body">
            <div class="travel-title">${d.name}</div>
            <div class="muted">${d.desc || ''}</div>
            <div class="row" style="gap:8px; margin-top:6px">
              <button class="small" data-suggest-food="${d.name}">Suggest food near here</button>
              <a class="small secondary" href="${mapsTracked}" target="_blank" rel="noopener">Open in Maps</a>
            </div>
          </div>
        </div>`;
    }).join('');
  } catch {
    travelGrid.innerHTML = '<div class="muted">Failed to load highlights.</div>';
  }
});

// Delegate: "Suggest food near here"
travelGrid?.addEventListener('click', async (ev) => {
  const btn = ev.target.closest('button[data-suggest-food]');
  if (!btn) return;
  const loc = getLocation();
  const mood_text = `I want something near ${btn.dataset.suggestFood}, authentic and local.`;
  setThinking(true);
  try {
    const res = await fetch(`${SERVER}/v1/recommend`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ location: loc, mood_text, dietary: getSelectedDietary(), budget: budgetSelect?.value || 'medium' })
    });
    const data = await res.json();
    if (data?.success) {
      resultCard.style.display = 'block';
      foodEmoji.textContent = data.food?.emoji || '🍽️';
      foodName.textContent  = data.food?.name  || 'Great Choice';
      friendMessage.textContent = data.friendMessage || '';
    }
  } finally { setThinking(false); }
});
// ---- GPT Night Plan ----
const genPlanBtn = document.getElementById('genPlanBtn');
const planPrompt = document.getElementById('planPrompt');
const planBox    = document.getElementById('planBox');

genPlanBtn?.addEventListener('click', async () => {
  const loc = getLocation();
  const prompt = (planPrompt?.value?.trim()) || 'I want to try local experiences in the city tonight. Map a night plan with food and vibes.';
  planBox.innerHTML = '<div class="muted">Planning your night…</div>';
  try {
    const r = await fetch(`${SERVER}/v1/travel/plan`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ location: loc, prompt })
    });
    const data = await r.json();
    if (!data?.success && !data?.timeline) throw new Error('No plan');

    const timeline = (data.timeline || []).map(s => {
      const url = s.link ? `${SERVER}/v1/linkout?tag=plan&url=${encodeURIComponent(s.link)}` : null;
      return `
        <div class="step">
          <span class="time">${s.time || ''}</span>
          <span class="act">${s.emoji || ''} ${s.activity || ''}</span>
          ${s.food ? `<div class="muted">Food: ${s.food}</div>` : ''}
          ${s.note ? `<div class="muted">${s.note}</div>` : ''}
          ${url ? `<div><a class="small" href="${url}" target="_blank" rel="noopener">Open link</a></div>` : ''}
        </div>`;
    }).join('');

    planBox.innerHTML = `
      <div class="big" style="margin-bottom:6px">${data.planTitle || 'Local Night Plan'}</div>
      <div class="timeline">${timeline}</div>
      ${Array.isArray(data.tips) && data.tips.length ? `
      <div style="margin-top:8px">
        <div class="event-title">Tips</div>
        <ul>${data.tips.map(t => `<li>${t}</li>`).join('')}</ul>
      </div>` : '' }
    `;
  } catch (e) {
    planBox.innerHTML = `<div class="muted">Couldn't generate a plan: ${e.message}</div>`;
  }
});