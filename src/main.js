// VFIED Unified Main (Food + Social + Travel + Events) — with Toasts, Skeletons, Fallback & Stats
// API base: prefers window.__API__ if present (Render/Prod), else local dev.
const API_BASE = (typeof window !== 'undefined' && window.__API__) || 'https://vfied-v3.onrender.com';

// ---------------- Demo / Fallback Data ----------------
const demoFriends = [
  { name: 'Sarah', comment: '🔥 Best ramen spot ever!', emoji: '🍜', avatar: 'https://i.pravatar.cc/80?img=32' },
  { name: 'James', comment: '💯 Always go for the sushi here', emoji: '🍣', avatar: 'https://i.pravatar.cc/80?img=12' },
  { name: 'Aisha', comment: '👌 Perfect comfort food when tired', emoji: '🍲', avatar: 'https://i.pravatar.cc/80?img=58' },
];

// If /v1/recommend fails, we’ll pick one of these locally:
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
    culturalNote: 'London’s Middle Eastern scene is strong — Borough & Edgware Road.',
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

async function handleDecision() {
  const decideBtn = byId('decide-button');
  setThinking(decideBtn, true);
  showSuggestionSkeleton();
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

    // track stats (success)
    incrementStats({ timeSavedMin: 3 }); // optimistic: ~3 min saved per quick decision
  } catch (err) {
    console.error(err);
    // Fallback to local suggestion so the app always “does something”
    const fallback = addSocialSignals(
      fallbackSuggestions[Math.floor(Math.random() * fallbackSuggestions.length)]
    );
    showSuggestion(fallback);
    toast('⚠️ Using offline suggestion (server unavailable).', 'warn');
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
  toast(`💬 Asking ${f.name}: “${f.comment}”`, 'info');
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
    message: `${friend.name}: “${friend.comment}”`,
  };

  if (localGems.length) {
    const g = localGems[Math.floor(Math.random() * localGems.length)];
    suggestion.localSignal = { type: 'local_list', list: g, message: `Popular in “${g.name}” (${g.area})` };
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
    const res = await fetch('/data/local_lists.json', { cache: 'no-store' });
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

// ---------------- Travel ----------------
async function loadTravelLists() {
  try {
    const res = await fetch('/data/travel_lists.json', { cache: 'no-store' });
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

// ---------------- Events Near Me ----------------
async function loadEvents() {
  try {
    const res = await fetch('/data/events.json', { cache: 'no-store' });
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
  const sect = byId('suggestion-result');
  if (!sect) return;
  sect.classList.remove('hidden');
  sect.innerHTML = `
    <div class="skeleton-card">
      <div class="sk-line sk-emoji"></div>
      <div class="sk-line sk-title"></div>
      <div class="sk-line sk-sub"></div>
      <div class="sk-line sk-sub short"></div>
    </div>
  `;
}
function hideSuggestionSkeleton() {
  // no-op; replaced by real content in showSuggestion()
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
