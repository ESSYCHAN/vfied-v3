import { getAIServiceStatus, getAILocationContext } from './services/aiFoodService.js';

const API_BASE = 'http://localhost:3001';

// --- Fake friends for demo ---
const demoFriends = [
  { name: 'Sarah', comment: '🔥 Best ramen spot ever!', emoji: '🍜' },
  { name: 'James', comment: '💯 Always go for the sushi here', emoji: '🍣' },
  { name: 'Aisha', comment: '👌 Perfect comfort food when tired', emoji: '🍲' },
];

// --- Init app ---
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 VFIED UI loaded');

  const decideBtn = document.getElementById('decide-button');
  const detectBtn = document.getElementById('detect-mood-btn');

  decideBtn.addEventListener('click', handleDecision);
  detectBtn.addEventListener('click', detectMood);

  renderFriendChips();
  loadLocalGems();
  loadUserPrefs();
});

// --- Decision handler ---
async function handleDecision() {
  const mood = document.getElementById('mood-input').value || 'hungry';

  try {
    const payload = {
      location: {
        city: 'London',
        country: 'United Kingdom',
        country_code: 'GB',
      },
      mood_text: mood,
      dietary: getUserPrefs().dietary || [],
      budget: getUserPrefs().budget || 'medium',
      menu_source: 'global_database',
    };

    const res = await fetch(`${API_BASE}/v1/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const suggestion = await res.json();
    console.log('✅ Suggestion:', suggestion);

    showSuggestion(suggestion);
  } catch (err) {
    console.error('❌ Error:', err);
    showError('Server unavailable');
  }
}

// --- Show suggestion ---
function showSuggestion(s) {
  const section = document.getElementById('suggestion-result');
  section.classList.remove('hidden');

  document.getElementById('result-emoji').textContent = s.food?.emoji || '🍽️';
  document.getElementById('result-name').textContent = s.food?.name || 'Something tasty';
  document.getElementById('result-description').textContent =
    s.friendMessage || s.reasoning || 'Perfect for your mood!';
  document.getElementById('restaurant-info').textContent =
    s.availabilityNote || '';

  document.getElementById('cultural-note').textContent = s.culturalNote || '';
  document.getElementById('personal-note').textContent = s.personalNote || '';
  document.getElementById('weather-note').textContent = s.weatherNote || '';
}

// --- Show friend chips ---
function renderFriendChips() {
  const container = document.getElementById('friend-chips');
  container.innerHTML = demoFriends
    .map(f => `<span class="friend-chip">${f.emoji} <strong>${f.name}</strong>: ${f.comment}</span>`)
    .join('');
}

// --- Load local gems ---
async function loadLocalGems() {
  try {
    const res = await fetch('/data/local_lists.json');
    const gems = await res.json();

    const grid = document.getElementById('local-gems-grid');
    grid.innerHTML = gems
      .map(
        g => `
      <div class="gem-card">
        <div class="gem-emoji">${g.emoji}</div>
        <div class="gem-name">${g.name}</div>
        <div class="gem-area">${g.area}</div>
      </div>`
      )
      .join('');
  } catch (err) {
    console.error('❌ Failed to load local gems', err);
  }
}

// --- User prefs (dietary/budget) ---
function saveUserPrefs(prefs) {
  localStorage.setItem('vfied_prefs', JSON.stringify(prefs));
}
function getUserPrefs() {
  return JSON.parse(localStorage.getItem('vfied_prefs') || '{}');
}
function loadUserPrefs() {
  console.log('⚙️ Loaded user prefs:', getUserPrefs());
}

// --- Mood detection placeholder ---
function detectMood() {
  const mood = document.getElementById('mood-input').value;
  alert(`🧠 Pretending to detect mood: ${mood}`);
}

// --- Error display ---
function showError(msg) {
  document.getElementById('context-info').textContent = `⚠️ ${msg}`;
}
