// Search function and index for CricMates
const searchItems = [
  { name: "Matches", url: "matches.html", category: "Live Scores", keywords: ["matches", "live scores", "scorecard", "results", "cricket matches", "match near me"] },
  { name: "Tournaments", url: "Tournaments.html", category: "Live Scores", keywords: ["tournaments", "browse tournaments", "leagues", "cups", "tournaments near me"] },
  { name: "Associations", url: "Associations.html", category: "Live Scores", keywords: ["associations", "cricket associations", "boards", "partners", "bcci", "tnca"] },
  { name: "Community", url: "Community.html", category: "Network", keywords: ["community", "cricket network", "players", "teams", "find players", "looking for team", "looking for players"] },
  { name: "Looking For", url: "Community.html", category: "Network", keywords: ["looking", "looking for", "find tournament", "find team", "find player"] },
  { name: "CricMates PRO", url: "#", category: "Add ons", keywords: ["pro", "cricmates pro", "premium", "subscription"] },
  { name: "Go Live ▶", url: "#", category: "Add ons", keywords: ["live stream", "go live", "streaming", "video"] },
  { name: "Yourapp", url: "#", category: "Add ons", keywords: ["yourapp", "mobile app", "white label"] },
  { name: "Yourweb", url: "#", category: "Add ons", keywords: ["yourweb", "website", "association website"] },
  { name: "Supersponser", url: "Supersponser.html", category: "Add ons", keywords: ["supersponser", "sponsor", "sponsors", "advertising"] },
  { name: "Tournaments Guide", url: "Tournamentsguide.html", category: "More", keywords: ["guide", "tournaments guide", "how to organize", "organize tournament"] },
  { name: "Cricket Tips", url: "#", category: "More", keywords: ["tips", "cricket tips", "coaching", "skills"] },
  { name: "News", url: "#", category: "More", keywords: ["news", "cricket news", "updates"] },
  { name: "FAQs", url: "#", category: "More", keywords: ["faqs", "help", "questions", "support"] },
  { name: "Blogs", url: "#", category: "More", keywords: ["blogs", "articles", "stories"] },
  { name: "Store", url: "store.html", category: "Navigation", keywords: ["store", "shopping", "cricket gear", "kits", "bat", "ball", "jersey", "cap", "gloves", "wear", "buy"] },
  { name: "Jobs", url: "Jobs.html", category: "Navigation", keywords: ["jobs", "careers", "hiring", "work with us", "recruitment"] },
  { name: "Contact Us", url: "Contactus.html", category: "Navigation", keywords: ["contact us", "contact", "support", "email", "address"] },
  { name: "Sign In", url: "signin.html", category: "Navigation", keywords: ["sign in", "login", "register", "whatsapp login", "otp login"] },
  { name: "Explore CricMates Awards", url: "Explore.html", category: "Awards", keywords: ["explore", "awards", "trophy", "recognition", "rewards"] },
  { name: "Get App", url: "Getapp.html", category: "Navigation", keywords: ["get app", "download", "google play", "app store"] }
];

const popularHTML = `
  <p>Popular searches</p>
  <div onclick="goPage('matches.html')">Matches Near Me</div>
  <div onclick="goPage('Tournaments.html')">Tournaments Near Me</div>
  <div onclick="goPage('Associations.html')">Cricket Associations</div>
  <div onclick="goPage('Community.html')">Looking For - Tournament, Team, Player</div>
`;

function toggleSearch() {
  const box = document.getElementById("searchBox");
  if (!box) return;
  if (box.style.display === "block") {
      box.style.display = "none";
  } else {
      box.style.display = "block";
      const input = document.getElementById("searchInput");
      if (input) {
        input.focus();
        showPopular();
      }
  }
}

function closeSearch() {
  const box = document.getElementById("searchBox");
  if (box) box.style.display = "none";
}

function showPopular() {
  const popularBox = document.getElementById("popularBox");
  const input = document.getElementById("searchInput");
  if (popularBox) {
    popularBox.style.display = "block";
    if (input && input.value.trim() === "") {
      popularBox.innerHTML = popularHTML;
    }
  }
}

function goPage(url) {
  if (url && url !== "#") {
    window.location.href = url;
  } else {
    alert("This page is coming soon!");
  }
}

// Perform dynamic search
function handleSearch(query) {
  const popularBox = document.getElementById("popularBox");
  if (!popularBox) return;

  const cleanQuery = query.trim().toLowerCase();
  if (cleanQuery === "") {
    popularBox.innerHTML = popularHTML;
    return;
  }

  // Filter items
  const results = searchItems.filter(item => {
    return item.name.toLowerCase().includes(cleanQuery) ||
           item.category.toLowerCase().includes(cleanQuery) ||
           item.keywords.some(keyword => keyword.toLowerCase().includes(cleanQuery));
  });

  if (results.length === 0) {
    popularBox.innerHTML = `
      <p>Search Results</p>
      <div style="cursor: default; background: transparent; border-color: transparent; color: var(--text-secondary);">
        No results found for "${query}"
      </div>
    `;
    return;
  }

  let resultsHTML = "<p>Search Results</p>";
  results.forEach(item => {
    resultsHTML += `
      <div onclick="goPage('${item.url}')">
        <span style="font-weight: 700; color: var(--accent-teal);">${item.name}</span>
        <span style="font-size: 11px; color: var(--text-muted); margin-left: 8px;">(${item.category})</span>
      </div>
    `;
  });
  popularBox.innerHTML = resultsHTML;
}

// Hook up events when script loads or DOM is ready
function initSearch() {
  const input = document.getElementById("searchInput");
  if (input) {
    input.addEventListener("input", (e) => {
      handleSearch(e.target.value);
    });
  }

  // Close search when clicking outside
  document.addEventListener("click", function(e) {
    const box = document.getElementById("searchBox");
    const btn = document.querySelector(".search-icon-btn");
    if (box && box.style.display === "block") {
      if (!box.contains(e.target) && !btn.contains(e.target)) {
        closeSearch();
      }
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSearch);
} else {
  initSearch();
}
