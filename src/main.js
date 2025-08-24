// VFIED v4 Main App Logic - Connected + Demo Social + Local Lists

const MCP_CONFIG = {
  baseUrl: 'http://localhost:3001',
  timeout: 5000
};

async function fetchRecommendation(moodText = "hungry") {
  try {
    const prefs = loadPreferences();

    const response = await fetch(`${MCP_CONFIG.baseUrl}/v1/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mood_text: moodText,
        dietary: prefs.dietary || [],
        budget: prefs.budget || 'medium',
        location: prefs.location || {
          city: 'London',
          country: 'United Kingdom',
          country_code: 'GB'
        },
        menu_source: 'global_database'
      })
    });

    const data = await response.json();
    renderSuggestion(data);
  } catch (err) {
    console.error("Recommendation failed", err);
    document.getElementById("suggestion-name").textContent = "⚠️ Error loading suggestion";
    document.getElementById("suggestion-tagline").textContent = "Try again shortly";
  }
}

// === UI RENDER ===
function renderSuggestion(data) {
  const food = data.food || {};
  document.getElementById("suggestion-emoji").textContent = food.emoji || "🍽️";
  document.getElementById("suggestion-name").textContent = food.name || "Surprise Dish";
  document.getElementById("suggestion-tagline").textContent =
    data.friendMessage || data.reasoning || "Perfect match for your vibe";

  // Add fake social proof
  const social = document.getElementById("social-proof");
  social.innerHTML = `
    👩 Sarah says: "Always get sushi when stressed!" <br>
    👨 James recommends: "Burger hits every time."
  `;
}

// === LOCAL GEMS ===
async function loadLocalGems() {
  try {
    const response = await fetch('/data/local_lists.json');
    const gems = await response.json();

    const grid = document.getElementById("local-gems-grid");
    grid.innerHTML = gems.map(g => `
      <div class="food-card">
        <div class="food-card-emoji">${g.emoji}</div>
        <div class="food-card-name">${g.name}</div>
        <div class="food-card-time">${g.neighborhood}</div>
      </div>
    `).join('');
  } catch (err) {
    console.error("Failed loading local gems", err);
  }
}

// === PREFERENCES ===
function savePreferences() {
  const prefs = {
    dietary: Array.from(document.querySelectorAll("input[name='dietary']:checked")).map(i => i.value),
    budget: document.querySelector("select[name='budget']").value
  };
  localStorage.setItem("vfied_prefs", JSON.stringify(prefs));
  alert("✅ Preferences saved!");
}

function loadPreferences() {
  try {
    return JSON.parse(localStorage.getItem("vfied_prefs")) || {};
  } catch {
    return {};
  }
}

// === NAVIGATION ===
function showInstant() {
  document.getElementById("instant-mode").style.display = 'block';
  document.getElementById("browse-mode").style.display = 'none';
}

function showBrowse() {
  document.getElementById("instant-mode").style.display = 'none';
  document.getElementById("browse-mode").style.display = 'block';
}

// === INIT ===
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 VFIED App Ready");

  // Default suggestion
  fetchRecommendation("hungry");

  // Load local gems
  loadLocalGems();

  // Hook buttons
  document.getElementById("refresh-btn").addEventListener("click", () => fetchRecommendation("hungry"));
  document.getElementById("save-prefs-btn").addEventListener("click", savePreferences);
});
