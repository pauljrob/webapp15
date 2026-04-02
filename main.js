/* ============================================================
   REPO DATA
   ============================================================ */
const REPOS = [
  { name: "repo-alpha", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.", language: "JavaScript", stars: 0, url: "https://github.com/pauljrob/repo-alpha" },
  { name: "data-engine", description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.", language: "Python", stars: 0, url: "https://github.com/pauljrob/data-engine" },
  { name: "cli-tools", description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.", language: "Go", stars: 0, url: "https://github.com/pauljrob/cli-tools" },
  { name: "type-utils", description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.", language: "TypeScript", stars: 0, url: "https://github.com/pauljrob/type-utils" },
  { name: "shell-scripts", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut labore et dolore magna aliqua.", language: "Shell", stars: 0, url: "https://github.com/pauljrob/shell-scripts" },
  { name: "rust-experiments", description: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat laboris.", language: "Rust", stars: 0, url: "https://github.com/pauljrob/rust-experiments" }
];

/* ============================================================
   LANGUAGE BADGE COLORS
   ============================================================ */
const LANG_COLORS = {
  JavaScript: "#F7DF1E",
  TypeScript:  "#60A5FA",
  Python:      "#93C5FD",
  Go:          "#67E8F9",
  Rust:        "#DEA584",
  Shell:       "#89E051"
};

/* ============================================================
   RENDER REPO CARDS
   ============================================================ */
function renderRepos() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  REPOS.forEach((repo, index) => {
    const badgeColor = LANG_COLORS[repo.language] || "#8A8580";
    const safeUrl = /^https?:\/\//i.test(repo.url) ? repo.url : '#';
    const card = document.createElement("article");
    card.className = "repo-card reveal";

    card.innerHTML = `
      <span class="lang-badge">${escapeHtml(repo.language)}</span>
      <div>
        <h3 class="repo-name">${escapeHtml(repo.name)}</h3>
        <span class="repo-name-rule" aria-hidden="true"></span>
      </div>
      <p class="repo-description">${escapeHtml(repo.description)}</p>
      <div class="repo-footer">
        <span class="repo-stars">&#9733; ${repo.stars}</span>
        <a
          href="${escapeHtml(safeUrl)}"
          class="repo-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View repository: ${escapeHtml(repo.name)}"
        >→ View Repo</a>
      </div>
    `;

    card.querySelector('.lang-badge').style.backgroundColor = badgeColor;
    grid.appendChild(card);
  });
}

/* ============================================================
   HTML ESCAPE UTILITY
   ============================================================ */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ============================================================
   NAV: SCROLL TRANSPARENCY → OPAQUE
   ============================================================ */
function initNavScroll() {
  const nav = document.getElementById("site-nav");
  if (!nav) return;

  function updateNav() {
    if (window.scrollY > 20) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();
}

/* ============================================================
   NAV: HAMBURGER MENU
   ============================================================ */
function initHamburger() {
  const hamburger = document.getElementById("nav-hamburger");
  const navLinks  = document.getElementById("nav-links");
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", String(!isOpen));
    navLinks.classList.toggle("open", !isOpen);
    document.body.style.overflow = !isOpen ? "hidden" : "";
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("open")) {
      hamburger.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("open");
      document.body.style.overflow = "";
      hamburger.focus();
    }
  });
}

/* ============================================================
   SCROLL REVEAL: INTERSECTION OBSERVER
   ============================================================ */
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;

          // Stagger cards within the projects grid
          const parent = el.parentElement;
          if (parent && parent.id === "projects-grid") {
            const siblings = Array.from(parent.querySelectorAll(".reveal"));
            const index = siblings.indexOf(el);
            el.style.animationDelay = `${index * 50}ms`;
          }

          el.classList.add("visible");
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   SMOOTH SCROLL (fallback for browsers without CSS support)
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderRepos();
  initNavScroll();
  initHamburger();
  initSmoothScroll();
  // Defer observer until cards are in DOM
  requestAnimationFrame(initScrollReveal);
});
