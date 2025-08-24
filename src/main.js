// VFIED Social Layer - Fixed Version
const API_BASE = 
  (typeof window !== 'undefined' && window.__API__) ||
  'https://vfied-v3.onrender.com';

// --- Demo data ---
const demoFriends = [
  { name: 'Sarah', comment: '🔥 Best ramen spot ever!', emoji: '🍜' },
  { name: 'James', comment: '💯 Always go for the sushi here', emoji: '🍣' },
  { name: 'Aisha', comment: '👌 Perfect comfort food when tired', emoji: '🍲' },
];

const demoLocalGems = [
  { name: "Sunday Roasts", area: "Hackney", emoji: "🥩" },
  { name: "Hidden Ramen", area: "Soho", emoji: "🍜" },
  { name: "Late Night Eats", area: "Shoreditch", emoji: "🌙" },
  { name: "Date Spots", area: "Covent Garden", emoji: "💕" }
];

// --- Utility functions ---
function safeGetElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Element '${id}' not found`);
  }
  return element;
}

function showElement(id) {
  const el = safeGetElement(id);
  if (el) el.classList.remove('hidden');
}

function hideElement(id) {
  const el = safeGetElement(id);
  if (el) el.classList.add('hidden');
}

// --- Main app initialization ---
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 VFIED Social Layer loaded');
  
  initEventListeners();
  renderSocialElements();
  loadUserPrefs();
});

function initEventListeners() {
  // Core decision button
  const decideBtn = safeGetElement('decide-button');
  if (decideBtn) {
    decideBtn.addEventListener('click', handleDecision);
  }

  // Mood detection (if button exists)
  const detectBtn = safeGetElement('detect-mood-btn');
  if (detectBtn) {
    detectBtn.addEventListener('click', detectMood);
  }

  // Accept/Try again buttons
  const acceptBtn = safeGetElement('accept-btn');
  const tryAgainBtn = safeGetElement('try-again-btn');
  
  if (acceptBtn) acceptBtn.addEventListener('click', handleAccept);
  if (tryAgainBtn) tryAgainBtn.addEventListener('click', handleTryAgain);
}

// --- Decision handling ---
async function handleDecision() {
  const moodInput = safeGetElement('mood-input');
  const mood = moodInput?.value?.trim() || 'hungry';

  // Update UI to thinking state
  setThinkingState(true);

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

    console.log('📡 Sending request:', payload);

    const res = await fetch(`${API_BASE}/v1/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const suggestion = await res.json();
    console.log('✅ Received suggestion:', suggestion);

    // Add social context to suggestion
    const enrichedSuggestion = addSocialContext(suggestion);
    
    showSuggestion(enrichedSuggestion);

  } catch (err) {
    console.error('❌ Decision error:', err);
    showError(`Failed to get suggestion: ${err.message}`);
  } finally {
    setThinkingState(false);
  }
}

// --- Add social context to AI suggestions ---
function addSocialContext(suggestion) {
  // Find relevant friend for this food type
  const foodName = suggestion.food?.name?.toLowerCase() || '';
  let relevantFriend = null;
  
  if (foodName.includes('ramen') || foodName.includes('noodle')) {
    relevantFriend = demoFriends.find(f => f.emoji === '🍜');
  } else if (foodName.includes('sushi') || foodName.includes('japanese')) {
    relevantFriend = demoFriends.find(f => f.emoji === '🍣');
  } else {
    // Random friend for other foods
    relevantFriend = demoFriends[Math.floor(Math.random() * demoFriends.length)];
  }

  // Add social signals
  if (relevantFriend) {
    suggestion.socialSignal = {
      type: 'friend',
      friend: relevantFriend,
      message: `${relevantFriend.name}: "${relevantFriend.comment}"`
    };
  }

  // Add local gem context
  const randomGem = demoLocalGems[Math.floor(Math.random() * demoLocalGems.length)];
  suggestion.localSignal = {
    type: 'local_list',
    list: randomGem,
    message: `Popular in "${randomGem.name}" list`
  };

  return suggestion;
}

// --- Display suggestion with social context ---
function showSuggestion(suggestion) {
  showElement('suggestion-result');

  // Core suggestion
  const resultEmoji = safeGetElement('result-emoji');
  const resultName = safeGetElement('result-name');
  const resultDesc = safeGetElement('result-description');
  const restaurantInfo = safeGetElement('restaurant-info');

  if (resultEmoji) resultEmoji.textContent = suggestion.food?.emoji || '🍽️';
  if (resultName) resultName.textContent = suggestion.food?.name || 'Something delicious';
  if (resultDesc) resultDesc.textContent = suggestion.friendMessage || suggestion.reasoning || 'Perfect for your mood!';
  if (restaurantInfo) restaurantInfo.textContent = suggestion.availabilityNote || 'Available nearby';

  // Social context
  displaySocialSignals(suggestion);

  // Additional context
  const culturalNote = safeGetElement('cultural-note');
  const personalNote = safeGetElement('personal-note');
  const weatherNote = safeGetElement('weather-note');

  if (culturalNote) culturalNote.textContent = suggestion.culturalNote || '';
  if (personalNote) personalNote.textContent = suggestion.personalNote || '';
  if (weatherNote) weatherNote.textContent = suggestion.weatherNote || '';

  // Update context info
  updateContextInfo('🎉 Perfect match found! How does this sound?');
}

function displaySocialSignals(suggestion) {
  // Create or update social signals container
  let socialContainer = safeGetElement('social-signals');
  if (!socialContainer) {
    // Create social signals container if it doesn't exist
    const resultCard = safeGetElement('suggestion-result');
    if (resultCard) {
      socialContainer = document.createElement('div');
      socialContainer.id = 'social-signals';
      socialContainer.className = 'social-signals';
      resultCard.insertBefore(socialContainer, resultCard.firstChild.nextSibling);
    }
  }

  if (!socialContainer) return;

  let socialHTML = '';

  // Friend signal
  if (suggestion.socialSignal) {
    socialHTML += `
      <div class="social-signal friend-signal">
        <span class="signal-icon">👥</span>
        <span class="signal-text">${suggestion.socialSignal.message}</span>
      </div>
    `;
  }

  // Local signal
  if (suggestion.localSignal) {
    socialHTML += `
      <div class="social-signal local-signal">
        <span class="signal-icon">📍</span>
        <span class="signal-text">${suggestion.localSignal.message}</span>
      </div>
    `;
  }

  socialContainer.innerHTML = socialHTML;
}

// --- Render social elements ---
function renderSocialElements() {
  renderFriendChips();
  renderLocalGems();
}

function renderFriendChips() {
  const container = safeGetElement('friend-chips');
  if (!container) return;

  container.innerHTML = demoFriends
    .map(f => `
      <span class="friend-chip" onclick="askFriend('${f.name}')">
        ${f.emoji} <strong>${f.name}</strong>
      </span>
    `).join('');
}

function renderLocalGems() {
  const grid = safeGetElement('local-gems-grid');
  if (!grid) return;

  grid.innerHTML = demoLocalGems
    .map(g => `
      <div class="gem-card" onclick="exploreGem('${g.name}')">
        <div class="gem-emoji">${g.emoji}</div>
        <div class="gem-name">${g.name}</div>
        <div class="gem-area">${g.area}</div>
      </div>
    `).join('');
}

// --- Social interactions ---
function askFriend(friendName) {
  const friend = demoFriends.find(f => f.name === friendName);
  if (friend) {
    alert(`💬 Asking ${friend.name} for a suggestion... "${friend.comment}"`);
    
    // Auto-fill mood based on friend's expertise
    const moodInput = safeGetElement('mood-input');
    if (moodInput) {
      if (friend.emoji === '🍜') moodInput.value = 'want something warming and comforting';
      else if (friend.emoji === '🍣') moodInput.value = 'feeling adventurous, want something fresh';
      else moodInput.value = 'need comfort food';
    }
  }
}

function exploreGem(gemName) {
  const gem = demoLocalGems.find(g => g.name === gemName);
  if (gem) {
    alert(`🗺️ Exploring "${gem.name}" in ${gem.area}...`);
    
    // Trigger decision based on gem
    const moodInput = safeGetElement('mood-input');
    if (moodInput) {
      moodInput.value = `want something from ${gem.name} list in ${gem.area}`;
    }
  }
}

// --- UI state management ---
function setThinkingState(thinking) {
  const decideBtn = safeGetElement('decide-button');
  if (!decideBtn) return;

  if (thinking) {
    decideBtn.disabled = true;
    decideBtn.textContent = '🤖 Thinking...';
    decideBtn.classList.add('thinking');
  } else {
    decideBtn.disabled = false;
    decideBtn.textContent = '🎯 Decide For Me';
    decideBtn.classList.remove('thinking');
  }
}

function updateContextInfo(message) {
  const contextInfo = safeGetElement('context-info');
  if (contextInfo) {
    contextInfo.textContent = message;
  }
}

// --- Action handlers ---
function handleAccept() {
  alert('✅ Great choice! Enjoy your meal!');
  hideElement('suggestion-result');
  updateContextInfo('🎉 Decision made! Ready for your next food adventure.');
}

function handleTryAgain() {
  console.log('🔄 Trying again...');
  hideElement('suggestion-result');
  handleDecision();
}

// --- User preferences ---
function getUserPrefs() {
  try {
    return JSON.parse(localStorage.getItem('vfied_prefs') || '{}');
  } catch {
    return {};
  }
}

function saveUserPrefs(prefs) {
  try {
    localStorage.setItem('vfied_prefs', JSON.stringify(prefs));
  } catch (err) {
    console.warn('Failed to save preferences:', err);
  }
}

function loadUserPrefs() {
  const prefs = getUserPrefs();
  console.log('⚙️ Loaded user preferences:', prefs);
  return prefs;
}

// --- Mood detection ---
function detectMood() {
  const moodInput = safeGetElement('mood-input');
  if (!moodInput) return;

  const mood = moodInput.value?.trim();
  if (!mood) {
    alert('🧠 Please enter your mood first!');
    return;
  }

  // Simple mood detection simulation
  const detectedMoods = [];
  const text = mood.toLowerCase();
  
  if (text.includes('tired') || text.includes('exhausted')) detectedMoods.push('tired');
  if (text.includes('stress') || text.includes('overwhelmed')) detectedMoods.push('stressed');
  if (text.includes('celebrat') || text.includes('happy')) detectedMoods.push('celebrating');
  if (text.includes('hungry') || text.includes('starving')) detectedMoods.push('hungry');

  const moodText = detectedMoods.length > 0 
    ? `Detected moods: ${detectedMoods.join(', ')}`
    : 'General mood detected';

  alert(`🧠 ${moodText}`);
  
  // Auto-trigger decision
  setTimeout(handleDecision, 500);
}

// --- Error handling ---
function showError(message) {
  console.error('VFIED Error:', message);
  updateContextInfo(`⚠️ ${message}`);
  
  // Show error for 3 seconds, then reset
  setTimeout(() => {
    updateContextInfo('🤖 Ready to help you decide what to eat!');
  }, 3000);
}

// --- Export for debugging ---
if (typeof window !== 'undefined') {
  window.VFIED = {
    handleDecision,
    renderSocialElements,
    getUserPrefs,
    saveUserPrefs,
    API_BASE
  };
}

console.log('✅ VFIED Social Layer initialized');