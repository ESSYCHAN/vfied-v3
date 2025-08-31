import { CONFIG } from '../config.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, COLLECTIONS } from './firebase.js';

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
// keep last few dish names to avoid repeats
const LAST_LIMIT = 6;
let lastPicks = JSON.parse(localStorage.getItem('vfied_recent') || '[]');
function rememberPick(name) {
  if (!name) return;
  lastPicks = [name, ...lastPicks.filter(n => n.toLowerCase() !== name.toLowerCase())].slice(0, LAST_LIMIT);
  localStorage.setItem('vfied_recent', JSON.stringify(lastPicks));
}

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

  addMoodSuggestions();

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

// --- Quick Decision helpers ---
async function makeQuickDecision(payload) {
  const r = await fetch(`${API_BASE}/v1/quick_decision`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!r.ok) {
    const txt = await r.text().catch(() => '');
    throw new Error(`[quick_decision] ${r.status} ${txt}`);
  }
  return r.json();
}

function quickDecisionToSuggestion(qdJson) {
  const list = Array.isArray(qdJson?.decisions) ? qdJson.decisions : [];
  if (!list.length) return null;

  const avoid = new Set(lastPicks.map(n => n.toLowerCase()));
  const fresh = list.filter(d => d?.name && !avoid.has(d.name.toLowerCase()));
  const pick = fresh.length ? fresh[Math.floor(Math.random() * fresh.length)]
                            : list[Math.floor(Math.random() * list.length)];

  return {
    food: { name: pick.name, emoji: pick.emoji || '🍽️' },
    friendMessage: pick.explanation || 'Solid local pick.',
    source: 'quick'
  };
}
function getValidLocation() {
  return {
    city: 'London',
    country: 'United Kingdom',
    country_code: 'GB'
  };
}

function updateRecentSuggestions(suggestion) {
  const name = suggestion.food?.name;
  if (!name) return [];

  let recent = JSON.parse(localStorage.getItem('vfied_recent') || '[]');
  
  // Remove if already exists, then add to front
  recent = recent.filter(r => r.toLowerCase() !== name.toLowerCase());
  recent.unshift(name);
  recent = recent.slice(0, 8); // Keep last 8
  
  localStorage.setItem('vfied_recent', JSON.stringify(recent));
  console.log('📝 Updated recent suggestions:', recent);
  
  return recent;
}
function getMealPeriod(hour) {
  if (hour >= 6 && hour < 11) return 'breakfast';
  if (hour >= 11 && hour < 15) return 'lunch';
  if (hour >= 15 && hour < 18) return 'snack';
  if (hour >= 18 && hour < 22) return 'dinner';
  return 'late_night';
}

async function handleDecision() {
  const decideBtn = document.getElementById('decide-button');
  setThinking(decideBtn, true);
  
  try {
    const mood = document.getElementById('mood-input')?.value?.trim() || '';
    const selectedDietary = Array.from(document.querySelectorAll('.diet-chip.active'))
      .map(chip => chip.dataset.diet);

    console.log('🎯 Making decision with:', { mood, dietary: selectedDietary });

    // Get recent suggestions for avoidance
    const recentSuggestions = JSON.parse(localStorage.getItem('vfied_recent') || '[]');

    // FIX: Use the quick_decision endpoint that has GPT integration
    const response = await fetch(`${API_BASE}/v1/quick_decision`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: getValidLocation(),
        mood_text: mood, // Pass the mood to GPT
        dietary: selectedDietary,
        recent_suggestions: recentSuggestions, // Pass avoid list
        time_context: {
          current_hour: new Date().getHours(),
          meal_period: getMealPeriod(new Date().getHours()),
          is_weekend: [0,6].includes(new Date().getDay())
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('📥 Server response:', data);
    
    if (data.success && data.decisions) {
      if (data.mood_analysis) {
        showMoodInsight(data.mood_analysis);
      }
      // Convert quick_decision format to suggestion format
      const pick = data.decisions[Math.floor(Math.random() * data.decisions.length)];
      const suggestion = {
        food: { 
          name: pick.name, 
          emoji: pick.emoji || '🍽️' 
        },
        friendMessage: pick.explanation || 'Perfect choice for you right now!',
        source: data.source || 'server',
        confidence: 85,
        moodVibe: data.mood_analysis?.vibes?.[0] // NEW: Store the vibe
      };

      const enriched = addSocialSignals(suggestion);
      showSuggestion(enriched);
      
      // Update recent suggestions
      updateRecentSuggestions(suggestion);
      incrementStats({ timeSavedMin: 3 });
    } else {
      throw new Error(data.error || 'No decisions returned');
    }

  } catch (error) {
    console.error('❌ Decision error:', error);
    
    // Fallback to local suggestions only if server completely fails
    const fallback = addSocialSignals({
      food: { name: 'Something Good', emoji: '🍽️' },
      friendMessage: 'Server unavailable - try any local favorite!',
      source: 'client_fallback'
    });
    showSuggestion(fallback);
    toast(`Connection issue: ${error.message}`, 'warn');
  } finally {
    setThinking(decideBtn, false);
  }
  console.log('🔍 Client debug:', {
    api_base: API_BASE,
    mood_input_value: document.getElementById('mood-input')?.value,
    selected_dietary: Array.from(document.querySelectorAll('.diet-chip.active')).map(c => c.dataset.diet)
  });
}
function showMoodInsight(moodAnalysis) {
  if (!moodAnalysis) return;
  
  const { vibes, message } = moodAnalysis;
  
  // Create or update mood insight element
  let moodInsight = document.getElementById('mood-insight');
  if (!moodInsight) {
    moodInsight = document.createElement('div');
    moodInsight.id = 'mood-insight';
    moodInsight.className = 'mood-insight-card';
    
    // Insert after mood input section
    const moodSection = document.querySelector('.mood-section');
    if (moodSection) {
      moodSection.appendChild(moodInsight);
    }
  }
  
  // Build vibe badges
  const vibeBadges = (vibes || []).map(vibe => 
    `<span class="vibe-badge vibe-${vibe}">${formatVibe(vibe)}</span>`
  ).join('');
  
  moodInsight.innerHTML = `
    <div class="mood-insight-content">
      ${vibeBadges ? `<div class="vibe-badges">${vibeBadges}</div>` : ''}
      ${message ? `<div class="mood-message">${message}</div>` : ''}
    </div>
  `;
  
  moodInsight.classList.add('show');
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    moodInsight.classList.remove('show');
  }, 5000);
}
function formatVibe(vibe) {
  const vibeMap = {
    'celebration': '🎉 Celebrating',
    'hangover': '🤕 Hangover',
    'pms': '🌙 PMS',
    'date': '💕 Date Night',
    'study': '📚 Study Mode',
    'chaos': '🔥 Chaos Mode',
    'main-character': '✨ Main Character',
    'goblin': '👺 Goblin Mode',
    'heartbreak': '💔 Heartbreak',
    'payday': '💰 Payday',
    'friday': '🎊 Friday Vibes',
    'anxious': '😰 Anxious',
    'tired': '😴 Tired',
    'post-workout': '💪 Post-Workout'
  };
  
  return vibeMap[vibe] || vibe;
}
function showSuggestion(s) {
  show('suggestion-result');

  setText('result-emoji', s.food?.emoji || '🍽️');
  setText('result-name', s.food?.name || 'Something delicious');
  
  // NEW: Add mood-specific messaging
  let description = s.friendMessage || s.reasoning || 'Perfect for your mood!';
  if (s.moodVibe) {
    description = `${description} (Perfect for ${formatVibe(s.moodVibe)})`;
  }
  setText('result-description', description);
  
  setText('restaurant-info', s.availabilityNote || '');

  // insights
  setHTML('cultural-note', s.culturalNote ? `<strong>🌍 Cultural insight</strong><br>${s.culturalNote}` : '');
  setHTML('personal-note', s.personalNote ? `<strong>🧠 Personal note</strong><br>${s.personalNote}` : '');
  setHTML('weather-note', s.weatherNote ? `<strong>🌤️ Weather</strong><br>${s.weatherNote}` : '');

  // social
  renderSocialSignals(s);

  updateContext('🎉 Perfect match found! How does this sound?');

  rememberPick(s.food?.name);
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
  /* Existing styles... */
  
  /* Mood Insight Card */
  .mood-insight-card {
    background: rgba(124, 58, 237, 0.1);
    border: 1px solid rgba(124, 58, 237, 0.3);
    border-radius: 12px;
    padding: 12px;
    margin-top: 12px;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    display: none;
  }
  
  .mood-insight-card.show {
    display: block;
    opacity: 1;
    transform: translateY(0);
  }
  
  .vibe-badges {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 8px;
  }
  
  .vibe-badge {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 12px;
    font-weight: 600;
  }
  
  .vibe-celebration { background: rgba(255, 215, 0, 0.2); border-color: gold; }
  .vibe-hangover { background: rgba(255, 99, 71, 0.2); border-color: tomato; }
  .vibe-date { background: rgba(255, 105, 180, 0.2); border-color: hotpink; }
  .vibe-chaos { background: rgba(255, 69, 0, 0.2); border-color: orangered; }
  .vibe-main-character { background: rgba(138, 43, 226, 0.2); border-color: blueviolet; }
  
  .mood-message {
    color: #e5ecff;
    font-size: 14px;
    font-weight: 500;
    font-style: italic;
  }
  
  /* Rest of existing styles... */
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

function addMoodSuggestions() {
  const moodInput = document.getElementById('mood-input');
  if (!moodInput) return;
  
  // Add example moods as datalist
  const datalist = document.createElement('datalist');
  datalist.id = 'mood-suggestions';
  datalist.innerHTML = `
    <option value="just got promoted">
    <option value="birthday celebration">
    <option value="small win today">
    <option value="hangover need help">
    <option value="pms cravings">
    <option value="date night">
    <option value="chaos mode">
    <option value="main character energy">
    <option value="goblin mode activated">
    <option value="heartbreak comfort">
    <option value="friday vibes">
    <option value="3am can't sleep">
    <option value="studying for finals">
    <option value="post workout hungry">
  `;
  
  moodInput.setAttribute('list', 'mood-suggestions');
  moodInput.parentNode.appendChild(datalist);
}

window.VFIED = {
  ...window.VFIED,
  setMood: function(moodText) {
    const input = document.getElementById('mood-input');
    if (input) {
      input.value = moodText;
      // Optional: auto-trigger decision
      document.getElementById('decide-button')?.click();
    }
  }
};