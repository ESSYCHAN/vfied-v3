// VFIED Social Layer - Fixed Version
const API_BASE = 
  (typeof window !== 'undefined' && window.__API__) ||
  'https://vfied-v3.onrender.com';
// VFIED Social + Travel + Events (One-Button) — Unified Main
// Uses: /v1/recommend + static JSON (fallback)

// ---- Demo Social Data ----
const demoFriends = [
  { name: 'Sarah', comment: '🔥 Best ramen spot ever!', emoji: '🍜', avatar: 'https://i.pravatar.cc/80?img=32' },
  { name: 'James', comment: '💯 Always go for the sushi here', emoji: '🍣', avatar: 'https://i.pravatar.cc/80?img=12' },
  { name: 'Aisha', comment: '👌 Perfect comfort food when tired', emoji: '🍲', avatar: 'https://i.pravatar.cc/80?img=58' },
];

// ---- State ----
let localGems = [];
let travelLists = {};
let eventItems = [];
let currentTab = 'tabTravel';

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 VFIED unified main loaded');

  wireCoreEvents();
  wireTabs();

  renderFriendChips();
  loadLocalGems();
  loadTravelLists();
  loadEvents();

  // Preload user prefs (stored by you later)
  console.log('⚙️ Loaded user prefs:', getUserPrefs());
});

// -------------- Core One-Button Flow --------------
function wireCoreEvents() {
  const decideBtn = byId('decide-button');
  const detectBtn = byId('detect-mood-btn');
  const acceptBtn = byId('accept-btn');
  const tryAgainBtn = byId('try-again-btn');
  const insightsToggle = byId('insights-toggle');

  decideBtn && decideBtn.addEventListener('click', handleDecision);
  detectBtn && detectBtn.addEventListener('click', detectMood);
  acceptBtn && acceptBtn.addEventListener('click', handleAccept);
  tryAgainBtn && tryAgainBtn.addEventListener('click', handleTryAgain);

  insightsToggle &&
    insightsToggle.addEventListener('click', () => {
      const content = byId('insights-content');
      const hidden = content.classList.contains('hidden');
      if (hidden) {
        content.classList.remove('hidden');
        insightsToggle.textContent = '🤖 Hide insights ↑';
      } else {
        content.classList.add('hidden');
        insightsToggle.textContent = '🤖 Why this choice? ↓';
      }
    });

  // Local Gems modal
  const seeMoreBtn = byId('see-more-gems');
  const modal = byId('gems-modal');
  const closeBtn = byId('gems-modal-close');

  seeMoreBtn &&
    seeMoreBtn.addEventListener('click', () => {
      populateGemsModal();
      openModal(modal);
    });

  closeBtn && closeBtn.addEventListener('click', () => closeModal(modal));
  modal && modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });
}

async function handleDecision() {
  const decideBtn = byId('decide-button');
  setThinking(decideBtn, true);
  updateContext('🧠 Analyzing your mood, weather, and local options...');

  try {
    const mood = (byId('mood-input')?.value || '').trim() || 'hungry';
    const prefs = getUserPrefs();

    const payload = {
      location: { city: 'London', country: 'United Kingdom', country_code: 'GB' },
      mood_text: mood,
      dietary: prefs.dietary || [],
      budget: prefs.budget || 'medium',
      menu_source: 'global_database',
    };

    const res = await fetch(`${API_BASE}/v1/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    const s = await res.json();

    // Enrich with social signals
    const enriched = addSocialSignals(s);
    showSuggestion(enriched);
  } catch (err) {
    console.error(err);
    showError('Server unavailable or failed to recommend.');
  } finally {
    setThinking(decideBtn, false);
  }
}

function showSuggestion(s) {
  show('suggestion-result');

  setText('result-emoji', s.food?.emoji || '🍽️');
  setText('result-name', s.food?.name || 'Something delicious');
  setText('result-description', s.friendMessage || s.reasoning || 'Perfect for your mood!');
  setText('restaurant-info', s.availabilityNote || '');

  // insights
  setText('cultural-note', s.culturalNote || '');
  setText('personal-note', s.personalNote || '');
  setText('weather-note', s.weatherNote || '');

  // social
  renderSocialSignals(s);

  updateContext('🎉 Perfect match found! How does this sound?');
}

function handleAccept() {
  hide('suggestion-result');
  updateContext('🎉 Decision made! Ready for your next food adventure.');
}

function handleTryAgain() {
  hide('suggestion-result');
  handleDecision();
}

// -------------- Social Layer --------------
function renderFriendChips() {
  const container = byId('friend-chips');
  if (!container) return;

  container.innerHTML = demoFriends
    .map(
      (f) => `
      <button class="friend-chip" onclick="VFIED.askFriend('${f.name}')">
        <img class="friend-avatar" src="${f.avatar}" alt="${f.name}" />
        <span>${f.emoji} <strong>${f.name}</strong></span>
      </button>
    `
    )
    .join('');
}

function askFriend(name) {
  const f = demoFriends.find((x) => x.name === name);
  if (!f) return;
  alert(`💬 Asking ${f.name}: "${f.comment}"`);
  const moodInput = byId('mood-input');
  if (moodInput) {
    if (f.emoji === '🍜') moodInput.value = 'need something warming and comforting';
    else if (f.emoji === '🍣') moodInput.value = 'feeling adventurous, want something fresh';
    else moodInput.value = 'need comfort food';
  }
}

function addSocialSignals(suggestion) {
  const foodName = (suggestion.food?.name || '').toLowerCase();
  let friend = demoFriends[Math.floor(Math.random() * demoFriends.length)];
  if (foodName.includes('ramen') || foodName.includes('noodle')) friend = demoFriends[0];
  if (foodName.includes('sushi') || foodName.includes('japanese')) friend = demoFriends[1];

  suggestion.socialSignal = {
    type: 'friend',
    friend,
    message: `${friend.name}: "${friend.comment}"`,
  };

  if (localGems.length) {
    const g = localGems[Math.floor(Math.random() * localGems.length)];
    suggestion.localSignal = { type: 'local_list', list: g, message: `Popular in "${g.name}" (${g.area})` };
  }
  return suggestion;
}

function renderSocialSignals(s) {
  const slot = byId('social-signals');
  if (!slot) return;

  let html = '';
  if (s.socialSignal) {
    html += `
      <div class="social-signal friend-signal">
        <span class="signal-icon">👥</span>
        <span class="signal-text">${s.socialSignal.message}</span>
      </div>`;
  }
  if (s.localSignal) {
    html += `
      <div class="social-signal local-signal">
        <span class="signal-icon">📍</span>
        <span class="signal-text">${s.localSignal.message}</span>
      </div>`;
  }
  slot.innerHTML = html;
}

// -------------- Local Gems --------------
async function loadLocalGems() {
  try {
    const res = await fetch('/data/local_lists.json');
    localGems = await res.json();
  } catch {
    localGems = []; // fallback
  }
  renderLocalGemsGrid();
}

function renderLocalGemsGrid() {
  const grid = byId('local-gems-grid');
  if (!grid) return;
  const first = localGems.slice(0, 8);
  grid.innerHTML = first
    .map(
      (g) => `
      <div class="gem-card" onclick="VFIED.exploreGem('${g.name}')">
        <div class="gem-emoji">${g.emoji}</div>
        <div class="gem-name">${g.name}</div>
        <div class="gem-area">${g.area}</div>
      </div>`
    )
    .join('');
}

function exploreGem(name) {
  const g = localGems.find((x) => x.name === name);
  if (!g) return;
  const moodInput = byId('mood-input');
  if (moodInput) moodInput.value = `want something from ${g.name} list in ${g.area}`;
  handleDecision();
}

function populateGemsModal() {
  const list = byId('gems-modal-list');
  if (!list) return;
  list.innerHTML = localGems
    .map(
      (g) => `
      <li>
        <span style="font-size:18px;margin-right:6px;">${g.emoji}</span>
        <strong>${g.name}</strong> <span style="opacity:.8">• ${g.area}</span>
      </li>`
    )
    .join('');
}

// -------------- Travel Layer --------------
async function loadTravelLists() {
  try {
    const res = await fetch('/data/travel_lists.json');
    travelLists = await res.json();
  } catch {
    travelLists = {};
  }
  renderTravelCities();
  renderTravelGrid();
}

function renderTravelCities() {
  const select = byId('travel-city-select');
  if (!select) return;

  const cities = Object.keys(travelLists);
  select.innerHTML = cities.map((c) => `<option value="${c}">${c}</option>`).join('');

  select.addEventListener('change', () => renderTravelGrid());
}

function renderTravelGrid() {
  const city = byId('travel-city-select')?.value || Object.keys(travelLists)[0];
  const items = (travelLists[city] || []).slice(0, 10);
  const grid = byId('travel-grid');
  if (!grid) return;

  grid.innerHTML = items
    .map(
      (t) => `
      <div class="travel-card" onclick="VFIED.tryTravel('${city}','${t.name}')">
        <div class="travel-emoji">${t.emoji}</div>
        <div class="travel-body">
          <div class="travel-title">${t.name}</div>
          <div class="travel-note">${t.note || ''}</div>
        </div>
      </div>`
    )
    .join('');
}

function tryTravel(city, itemName) {
  const moodInput = byId('mood-input');
  if (moodInput) moodInput.value = `travel mode: try ${itemName} in ${city}`;
  handleDecision();
}

// -------------- Events Near Me --------------
async function loadEvents() {
  try {
    const res = await fetch('/data/events.json');
    eventItems = await res.json();
  } catch {
    eventItems = [];
  }
  renderEvents();
}

function renderEvents() {
  const grid = byId('events-grid');
  if (!grid) return;
  grid.innerHTML = eventItems
    .map(
      (e) => `
      <div class="event-card">
        <div class="event-badge">${e.emoji}</div>
        <div class="event-body">
          <div class="event-title">${e.title}</div>
          <div class="event-meta">${e.date} • ${e.area} • ${e.price || 'Free'}</div>
          <div class="event-cta">
            <button class="insights-toggle" onclick="VFIED.goEvent('${e.title}')">Details</button>
            <button class="insights-toggle" onclick="VFIED.goMaps('${encodeURIComponent(e.map || e.title)}')">Directions</button>
          </div>
        </div>
      </div>`
    )
    .join('');
}

function goEvent(title) {
  alert(`🎪 ${title}\n(Integrate ticket link or detail view here)`);
}
function goMaps(q) {
  window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, '_blank');
}

// -------------- Tabs --------------
function wireTabs() {
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const toShow = btn.dataset.tab;
      document.querySelectorAll('.tabpanel').forEach((p) => p.classList.add('hidden'));
      byId(toShow)?.classList.remove('hidden');
      currentTab = toShow;
    });
  });
}

// -------------- Mood --------------
function detectMood() {
  const input = byId('mood-input');
  const val = input?.value?.trim();
  if (!val) return alert('🧠 Please enter your mood first!');
  // simple demo detection
  alert('🧠 Mood analyzed — using it in your next suggestion!');
  handleDecision();
}

// -------------- Utils --------------
function byId(id) {
  const el = document.getElementById(id);
  if (!el) console.warn(`Missing #${id}`);
  return el;
}
function setText(id, text) {
  const el = byId(id);
  if (el) el.textContent = text;
}
function show(id) {
  const el = byId(id);
  if (el) el.classList.remove('hidden');
}
function hide(id) {
  const el = byId(id);
  if (el) el.classList.add('hidden');
}
function updateContext(msg) {
  setText('context-info', msg);
}
function setThinking(btn, thinking) {
  if (!btn) return;
  if (thinking) {
    btn.classList.add('thinking');
    btn.querySelector('#button-text') && (btn.querySelector('#button-text').textContent = 'THINKING…');
    btn.querySelector('#button-icon') && (btn.querySelector('#button-icon').textContent = '🤖');
  } else {
    btn.classList.remove('thinking');
    btn.querySelector('#button-text') && (btn.querySelector('#button-text').textContent = 'DECIDE FOR ME');
    btn.querySelector('#button-icon') && (btn.querySelector('#button-icon').textContent = '🎯');
  }
}

// Modal helpers
function openModal(m) {
  if (!m) return;
  m.setAttribute('aria-hidden', 'false');
  m.classList.add('open');
}
function closeModal(m) {
  if (!m) return;
  m.setAttribute('aria-hidden', 'true');
  m.classList.remove('open');
}

// User prefs (stub for now)
function getUserPrefs() {
  try {
    return JSON.parse(localStorage.getItem('vfied_prefs') || '{}');
  } catch {
    return {};
  }
}

// Expose a few helpers for inline onclick
window.VFIED = {
  askFriend,
  exploreGem,
  tryTravel,
  goEvent,
  goMaps,
};
console.log('✅ VFIED unified main initialized');
