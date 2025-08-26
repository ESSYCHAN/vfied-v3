import { CONFIG } from './config.js';

export const API_BASE = CONFIG.API_BASE;
// VFIED Unified Main (Food + Social + Travel + Events) — with Toasts, Skeletons, Fallback & Stats

// ---- Robust API base resolution ----
// const qpApi = new URLSearchParams(location.search).get('api');
// if (qpApi) localStorage.setItem('vfied_api', qpApi);

// const storedApi = localStorage.getItem('vfied_api');
// const runtimeApi = (typeof window !== 'undefined' && window.__API__) || ''; // '' = same-origin
// export const API_BASE = (qpApi || storedApi || runtimeApi || '').replace(/\/$/, '');

console.log('API_BASE ->', API_BASE || '(same-origin)');

// ---------------- Demo / Fallback Data ----------------
const demoFriends = [
  { name: 'Sarah', comment: '🔥 Best ramen spot ever!', emoji: '🍜', avatar: 'https://i.pravatar.cc/80?img=32' },
  { name: 'James', comment: '💯 Always go for the sushi here', emoji: '🍣', avatar: 'https://i.pravatar.cc/80?img=12' },
  { name: 'Aisha', comment: '👌 Perfect comfort food when tired', emoji: '🍲', avatar: 'https://i.pravatar.cc/80?img=58' },
];

// If /v1/recommend fails, we'll pick one of these locally:
const fallbackSuggestions = [
  {
    food: { emoji: '🍜', name: 'Tonkotsu Ramen' },
    friendMessage: 'Warming and soothing — perfect for stressed vibes.',
    availabilityNote: 'Try Koya Soho or Tonkotsu (open now)',
    culturalNote: 'Ramen culture in London has exploded — Soho has great late-night bowls.',
    weatherNote: 'Rainy/cold? Hot broth hits just right.',
    source: 'local-fallback',
  },
  {
    food: { emoji: '🍣', name: 'Sushi Set' },
    friendMessage: 'Clean and fresh — light but satisfying.',
    availabilityNote: 'Sushi Atelier or Kanada-Ya nearby',
    culturalNote: 'Japanese spots cluster around Fitzrovia & Soho.',
    weatherNote: 'Great choice when you want something not too heavy.',
    source: 'local-fallback',
  },
  {
    food: { emoji: '🥙', name: 'Mezze Plate' },
    friendMessage: 'Shareable, bright flavors, and not heavy.',
    availabilityNote: 'Check Arabica Borough or a local Levantine spot',
    culturalNote: 'Londons Middle Eastern scene is strong — Borough & Edgware Road.',
    weatherNote: 'Good in any weather; easy on the stomach.',
    source: 'local-fallback',
  },
];

// ---------------- App State ----------------
let localGems = [];
let travelLists = {};
let eventItems = [];
let currentTab = 'tabTravel';

document.addEventListener('DOMContentLoaded', () => {
  injectRuntimeStyles();
  mountToastHost();

  wireCoreEvents();
  wireTabs();

  renderFriendChips();
  loadLocalGems();
  loadTravelLists();
  loadEvents();

  updateStatsUI(); // show stored counters if any

  console.log('🚀 VFIED unified main loaded');
});

// ---------------- Core One-Button Flow ----------------
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

// Toggle the "thinking" state of the Decide button
function setThinking(btn, on = true) {
  try {
    // accept element or lookup by id
    const el = btn || document.getElementById('decide-button');
    if (!el) return;

    // disable/enable for UX
    el.disabled = !!on;

    // update icon/text if present
    const icon = document.getElementById('button-icon');   // 🎯 span
    const text = document.getElementById('button-text');   // DECIDE FOR ME span

    if (on) {
      if (icon) icon.textContent = '⏳';
      if (text) text.textContent = 'Thinking…';
    } else {
      if (icon) icon.textContent = '🎯';
      if (text) text.textContent = 'DECIDE FOR ME';
    }
  } catch (e) {
    console.warn('setThinking failed:', e);
  }
}

async function handleDecision() {
  const decideBtn = document.getElementById('decide-button');
  setThinking(decideBtn, true);
  showSuggestionSkeleton();
  updateContext('Analyzing your mood, weather, and local options...');

  try {
    const mood = document.getElementById('mood-input')?.value?.trim() || 'hungry';
    const selectedDietary = Array.from(document.querySelectorAll('.diet-chip.active'))
      .map(chip => chip.dataset.diet);

    // Use the fixed API call
    const response = await fetch(`${API_BASE}/v1/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: { 
          city: 'London', 
          country: 'United Kingdom', 
          country_code: 'GB' 
        },
        mood_text: mood,
        dietary: selectedDietary,
        budget: 'medium',
        menu_source: 'global_database'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    
    if (data.success) {
      const enriched = addSocialSignals(data);
      showSuggestion(enriched);
      incrementStats({ timeSavedMin: 3 });
    } else {
      throw new Error(data.error || 'Recommendation failed');
    }

  } catch (error) {
    console.error('Decision error:', error);
    
    // Show user-friendly error
    toast(`Server unavailable: ${error.message}`, 'warn');
    
    // Use fallback
    const fallback = addSocialSignals(sample(fallbackSuggestions));
    showSuggestion(fallback);
    updateContext('Using offline suggestion (server unavailable)');
    
  } finally {
    hideSuggestionSkeleton();
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
  setHTML('cultural-note', s.culturalNote ? `<strong>🌍 Cultural insight</strong><br>${s.culturalNote}` : '');
  setHTML('personal-note', s.personalNote ? `<strong>🧠 Personal note</strong><br>${s.personalNote}` : '');
  setHTML('weather-note', s.weatherNote ? `<strong>🌤️ Weather</strong><br>${s.weatherNote}` : '');

  // social
  renderSocialSignals(s);

  updateContext('🎉 Perfect match found! How does this sound?');
}

function handleAccept() {
  hide('suggestion-result');
  updateContext('🎉 Decision made! Ready for your next food adventure.');
  toast('✅ Enjoy your meal!', 'success');
}

function handleTryAgain() {
  hide('suggestion-result');
  handleDecision();
}

// ---------------- Social Layer ----------------
function renderFriendChips() {
  const container = byId('friend-chips');
  if (!container) return;

  container.innerHTML = '';
  demoFriends.forEach((f) => {
    const btn = document.createElement('button');
    btn.className = 'friend-chip';
    btn.innerHTML = `
      <img class="friend-avatar" src="${f.avatar}" alt="${escapeHtml(f.name)}" />
      <span>${f.emoji} <strong>${escapeHtml(f.name)}</strong></span>
    `;
    btn.addEventListener('click', () => askFriend(f.name));
    container.appendChild(btn);
  });
}

function askFriend(name) {
  const f = demoFriends.find((x) => x.name === name);
  if (!f) return;
  toast(`💬 Asking ${f.name}: "${f.comment}"`, 'info');
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

// ---------------- Local Gems ----------------
async function loadLocalGems() {
  try {
    const url = `/data/local_lists.json`;
    const res = await fetch(url, { cache: 'no-store' });
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
  grid.innerHTML = '';
  first.forEach((g) => {
    const card = document.createElement('div');
    card.className = 'gem-card';
    card.innerHTML = `
      <div class="gem-emoji">${g.emoji}</div>
      <div class="gem-name">${escapeHtml(g.name)}</div>
      <div class="gem-area">${escapeHtml(g.area)}</div>
    `;
    card.addEventListener('click', () => exploreGem(g.name));
    grid.appendChild(card);
  });
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

// ---------------- Travel ----------------
async function loadTravelLists() {
  try {
    // const url = API_BASE ? `${API_BASE}/data/travel_lists.json` : `/data/travel_lists.json`;
    const url = `/data/travel_lists.json`;
    const res = await fetch(url, { cache: 'no-store' });
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

  grid.innerHTML = '';
  items.forEach((t) => {
    const card = document.createElement('div');
    card.className = 'travel-card';
    card.innerHTML = `
      <div class="travel-emoji">${t.emoji}</div>
      <div class="travel-body">
        <div class="travel-title">${escapeHtml(t.name)}</div>
        <div class="travel-note">${escapeHtml(t.note || '')}</div>
      </div>
    `;
    card.addEventListener('click', () => tryTravel(city, t.name));
    grid.appendChild(card);
  });
}

function tryTravel(city, itemName) {
  const moodInput = byId('mood-input');
  if (moodInput) moodInput.value = `travel mode: try ${itemName} in ${city}`;
  handleDecision();
}

// ---------------- Events Near Me ----------------
async function loadEvents() {
  try {
    const url = `/data/events.json`;
    const res = await fetch(url, { cache: 'no-store' });
    eventItems = await res.json();
  } catch {
    eventItems = [];
  }
  renderEvents();
}

function renderEvents() {
  const grid = byId('events-grid');
  if (!grid) return;

  grid.innerHTML = '';
  eventItems.forEach((e) => {
    const card = document.createElement('div');
    card.className = 'event-card';

    const badge = document.createElement('div');
    badge.className = 'event-badge';
    badge.textContent = e.emoji;

    const body = document.createElement('div');
    body.className = 'event-body';

    const title = document.createElement('div');
    title.className = 'event-title';
    title.textContent = e.title;

    const meta = document.createElement('div');
    meta.className = 'event-meta';
    meta.textContent = `${e.date} • ${e.area} • ${e.price || 'Free'}`;

    const cta = document.createElement('div');
    cta.className = 'event-cta';

    const detailsBtn = document.createElement('button');
    detailsBtn.className = 'insights-toggle';
    detailsBtn.textContent = 'Details';
    detailsBtn.addEventListener('click', () => goEvent(e.title));

    const mapsBtn = document.createElement('button');
    mapsBtn.className = 'insights-toggle';
    mapsBtn.textContent = 'Directions';
    mapsBtn.addEventListener('click', () => goMaps(encodeURIComponent(e.map || e.title)));

    cta.append(detailsBtn, mapsBtn);
    body.append(title, meta, cta);
    card.append(badge, body);
    grid.appendChild(card);
  });
}

function goEvent(title) {
  toast(`🎪 ${title}\n(Integrate ticket link or detail view here)`, 'info');
}
function goMaps(q) {
  window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, '_blank');
}

// ---------------- Tabs ----------------
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

// ---------------- Mood ----------------
function detectMood() {
  const input = byId('mood-input');
  const val = input?.value?.trim();
  if (!val) return toast('🧠 Please enter your mood first!', 'warn');
  toast('🧠 Mood analyzed — using it in your next suggestion!', 'info');
  handleDecision();
}

// ---------------- Stats ----------------
function incrementStats({ timeSavedMin = 2 } = {}) {
  const raw = localStorage.getItem('vfied_stats');
  const stats = raw ? JSON.parse(raw) : { totalDecisions: 0, timeSaved: 0 };
  stats.totalDecisions += 1;
  stats.timeSaved += timeSavedMin;
  localStorage.setItem('vfied_stats', JSON.stringify(stats));
  updateStatsUI();
}

function updateStatsUI() {
  const raw = localStorage.getItem('vfied_stats');
  const stats = raw ? JSON.parse(raw) : { totalDecisions: 0, timeSaved: 0 };
  setText('decisions-count', stats.totalDecisions);
  setText('time-saved', stats.timeSaved);
}

// ---------------- Skeleton UI ----------------
function showSuggestionSkeleton() {
  // show the skeleton section and hide the real result container
  const skel = byId('suggestion-skeleton');
  const res = byId('suggestion-result');
  if (skel) skel.classList.remove('hidden');
  if (res) res.classList.add('hidden');
}

function hideSuggestionSkeleton() {
  // hide the skeleton; showSuggestion() will reveal the real result
  const skel = byId('suggestion-skeleton');
  if (skel) skel.classList.add('hidden');
}

// ---------------- Toasts ----------------
function mountToastHost() {
  if (byId('vfied-toast-host')) return;
  const host = document.createElement('div');
  host.id = 'vfied-toast-host';
  document.body.appendChild(host);
}
function toast(msg, type = 'info') {
  const host = byId('vfied-toast-host');
  if (!host) return console.log(msg);
  const el = document.createElement('div');
  el.className = `vfied-toast ${type}`;
  el.textContent = msg;
  host.appendChild(el);
  // animate in
  requestAnimationFrame(() => el.classList.add('show'));
  // auto remove
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => host.removeChild(el), 250);
  }, 2600);
}

// ---------------- Runtime Styles (toasts + skeleton) ----------------
function injectRuntimeStyles() {
  if (document.getElementById('vfied-runtime-styles')) return;
  const css = `
  #vfied-toast-host {
    position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%);
    display: flex; flex-direction: column; gap: 8px; z-index: 9999; pointer-events: none;
  }
  .vfied-toast {
    pointer-events: auto;
    min-width: 240px; max-width: 92vw;
    padding: 10px 14px; border-radius: 10px; backdrop-filter: blur(8px);
    background: rgba(0,0,0,.65); color: #fff; font-weight: 600; font-size: 14px;
    opacity: 0; transform: translateY(8px); transition: all .25s ease;
    border: 1px solid rgba(255,255,255,.15);
  }
  .vfied-toast.show { opacity: 1; transform: translateY(0); }
  .vfied-toast.success { background: rgba(34,197,94,.85); }
  .vfied-toast.warn { background: rgba(245,158,11,.9); }
  .vfied-toast.error { background: rgba(239,68,68,.9); }

  .skeleton-card {
    background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.18);
    border-radius: 16px; padding: 18px; max-width: 420px; margin: 8px auto;
  }
  .sk-line {
    height: 14px; margin: 10px 0;
    background: linear-gradient(90deg, rgba(255,255,255,.15), rgba(255,255,255,.25), rgba(255,255,255,.15));
    background-size: 200% 100%; animation: sk-shimmer 1.4s infinite;
    border-radius: 8px;
  }
  .sk-emoji { height: 46px; width: 46px; border-radius: 50%; margin: 0 auto 10px; }
  .sk-title { height: 18px; width: 70%; margin: 12px auto; }
  .sk-sub { width: 90%; margin: 10px auto; }
  .sk-sub.short { width: 60%; }
  @keyframes sk-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

  /* Friend avatar chip (if your CSS doesn't already style it) */
  .friend-chip { display:inline-flex; align-items:center; gap:8px; }
  .friend-avatar { width:22px; height:22px; border-radius:50%; object-fit:cover; }
  `;
  const style = document.createElement('style');
  style.id = 'vfied-runtime-styles';
  style.textContent = css;
  document.head.appendChild(style);
}

// ---------------- Utils ----------------
function byId(id) {
  const el = document.getElementById(id);
  // console.warn on missing but don't spam constantly
  return el;
}
function setText(id, text) {
  const el = byId(id);
  if (el) el.textContent = text;
}
function setHTML(id, html) {
  const el = byId(id);
  if (el) el.innerHTML = html;
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
function sample(a) {
  return a[Math.floor(Math.random() * a.length)];
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (m) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]
  ));
}
// User prefs (stub for now)
function getUserPrefs() {
  try {
    return JSON.parse(localStorage.getItem('vfied_prefs') || '{}');
  } catch {
    return {};
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

// Expose helpers for inline onclick
window.VFIED = {
  askFriend,
  exploreGem,
  tryTravel,
  goEvent,
  goMaps,
};