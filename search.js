// Search function and index for CricMates
const searchItems = [
  { name: "Matches", url: "matches.html", category: "Live Scores", keywords: ["matches", "live scores", "scorecard", "results", "cricket matches", "match near me"] },
  { name: "Tournaments", url: "Tournaments.html", category: "Live Scores", keywords: ["tournaments", "browse tournaments", "leagues", "cups", "tournaments near me"] },
  { name: "Associations", url: "Associations.html", category: "Live Scores", keywords: ["associations", "cricket associations", "boards", "partners", "bcci", "tnca"] },
  { name: "Community", url: "Community.html", category: "Network", keywords: ["community", "cricket network", "players", "teams", "find players", "looking for team", "looking for players"] },
  { name: "Looking For", url: "Community.html", category: "Network", keywords: ["looking", "looking for", "find tournament", "find team", "find player"] },
  { name: "CricMates PRO", url: "#", category: "Add ons", keywords: ["pro", "cricmates pro", "premium", "subscription"] },
  { name: "Go Live â–¶", url: "#", category: "Add ons", keywords: ["live stream", "go live", "streaming", "video"] },
  { name: "Yourapp", url: "#", category: "Add ons", keywords: ["yourapp", "mobile app", "white label"] },
  { name: "Yourweb", url: "#", category: "Add ons", keywords: ["yourweb", "website", "association website"] },
  { name: "Supersponser", url: "Supersponser.html", category: "Add ons", keywords: ["supersponser", "sponsor", "sponsors", "advertising"] },
  { name: "Tournaments Guide", url: "Tournamentsguide.html", category: "More", keywords: ["guide", "tournaments guide", "how to organize", "organize tournament"] },
  { name: "Cricket Tips", url: "#", category: "More", keywords: ["tips", "cricket tips", "coaching", "skills"] },
  { name: "News", url: "#", category: "More", keywords: ["news", "cricket news", "updates"] },
  { name: "FAQs", url: "#", category: "More", keywords: ["faqs", "help", "questions", "support"] },
  { name: "Blogs", url: "#", category: "More", keywords: ["blogs", "articles", "stories"] },
  { name: "Store", url: "store.html", category: "Navigation", keywords: ["store", "shopping", "cricket gear", "kits", "bat", "ball", "jersey", "cap", "gloves", "wear", "buy"] },
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


// ===== Floating Action Buttons (WhatsApp & Scroll to Top) =====
document.addEventListener("DOMContentLoaded", () => {
    const style = document.createElement('style');
    style.innerHTML = `
        .fab-container {
            position: fixed;
            bottom: 30px;
            right: 30px;
            display: flex;
            flex-direction: column;
            gap: 15px;
            z-index: 9999;
        }
        .fab-btn {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-decoration: none;
            border: none;
            outline: none;
        }
        .fab-btn:hover {
            transform: translateY(-5px) scale(1.1);
        }
        .fab-whatsapp {
            background: #25D366;
            color: white;
        }
        .fab-whatsapp:hover {
            box-shadow: 0 8px 25px rgba(37, 211, 102, 0.5);
        }
        .fab-scrolltop {
            background: var(--bg-tertiary, #2b3a4a);
            color: var(--accent-teal, #00ffcc);
            opacity: 0;
            pointer-events: none;
            transform: translateY(20px);
        }
        .fab-scrolltop.visible {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0);
        }
        .fab-scrolltop:hover {
            background: var(--accent-teal, #00ffcc);
            color: var(--bg-primary, #0b0c10);
            box-shadow: 0 8px 25px rgba(0, 255, 204, 0.4);
        }
    `;
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.className = 'fab-container';

    // WhatsApp Button
    const waBtn = document.createElement('a');
    waBtn.href = "https://wa.me/919876543210"; 
    waBtn.target = "_blank";
    waBtn.className = 'fab-btn fab-whatsapp';
    waBtn.innerHTML = '<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>';
    
    // Scroll To Top Button
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'fab-btn fab-scrolltop';
    scrollBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    container.appendChild(scrollBtn);
    container.appendChild(waBtn);
    document.body.appendChild(container);
});
