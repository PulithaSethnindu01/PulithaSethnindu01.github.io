// ===== CONFIG =====
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyn7b1U_W_BdnbkxvXSOychIrxbrZidnUi_XXs6KEn27GqO_c7IjcktmsIJf-MDy3BD/exec";

// ===== FETCH ACHIEVEMENTS =====
async function fetchAchievements() {
  try {
    const res = await fetch(WEB_APP_URL);
    const data = await res.json();
    console.log("Fetched achievements data:", data);

    if (!Array.isArray(data)) {
      console.error("Data is not an array. Check your sheet headings and values.");
      return [];
    }

    return data;
  } catch (err) {
    console.error("Failed to fetch achievements:", err);
    return [];
  }
}

// ===== GRID =====
async function loadAllAchievements(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  const achievements = await fetchAchievements();

  // Sort by date descending (latest first)
  const sortedAchievements = achievements.sort((a, b) => new Date(b.date) - new Date(a.date));

  sortedAchievements.forEach((ach) => {
    const imgSrc = ach.image || "https://via.placeholder.com/300x200?text=No+Image";
    const year = new Date(ach.date).getFullYear();

    const col = document.createElement("div");
    col.className = "col-md-4 mb-4 achievement-col"; // class for filtering
    col.dataset.year = year;
    col.innerHTML = `
      <div class="achievement-card">
        <img data-src="${imgSrc}" src="https://via.placeholder.com/300x200?text=Loading..." loading="lazy" draggable="false" alt="${ach.title}">
        <h5>${ach.title}</h5>
        <small>${ach.date}</small>
        <p>${ach.description}</p>
      </div>`;
    container.appendChild(col);
  });

  // Lazy-load images
  const lazyImages = container.querySelectorAll("img[data-src]");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        obs.unobserve(img);
      }
    });
  }, { rootMargin: "200px" });

  lazyImages.forEach(img => observer.observe(img));
}

// ===== FILTER =====
function filterAchievementsByYear(year) {
  const allCards = document.querySelectorAll(".achievement-col");
  allCards.forEach(card => {
    card.style.display = (year === "all" || card.dataset.year === year) ? "block" : "none";
  });
}

// ===== YEAR PILLS =====
async function populateYearPills(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const achievements = await fetchAchievements();
  const years = [...new Set(achievements.map(ach => new Date(ach.date).getFullYear()))].sort((a, b) => b - a);

  // Add "All" pill first
  const allPill = document.createElement("button");
  allPill.className = "year-pill active";
  allPill.textContent = "All";
  allPill.dataset.year = "all";
  container.appendChild(allPill);

  years.forEach(year => {
    const pill = document.createElement("button");
    pill.className = "year-pill";
    pill.textContent = year;
    pill.dataset.year = year;
    container.appendChild(pill);
  });

  // Click event for filtering
  container.addEventListener("click", (e) => {
    const pill = e.target.closest(".year-pill");
    if (!pill) return;

    container.querySelectorAll(".year-pill").forEach(p => p.classList.remove("active"));
    pill.classList.add("active");

    filterAchievementsByYear(pill.dataset.year);
  });
}

// ===== SLIDER =====
async function autoHorizontalSlider(containerId, visible = 3) {
  const track = document.getElementById(containerId);
  if (!track) return;
  const slider = track.parentElement;
  track.classList.add("achievements-track");
  track.innerHTML = "";

  const achievements = await fetchAchievements();
  if (achievements.length === 0) return;

  // Sort by date descending (latest first)
  const sorted = achievements.sort((a, b) => new Date(b.date) - new Date(a.date));
  const latest = sorted.slice(0, 5);
  const data = [...latest, ...latest.slice(0, visible)];

  data.forEach(ach => {
    const imgSrc = ach.image || "https://via.placeholder.com/300x200?text=No+Image";
    const slide = document.createElement("div");
    slide.className = "achievement-slide";
    slide.innerHTML = `
      <div class="achievement-card p-3">
        <img src="${imgSrc}" class="mb-3" draggable="false" alt="${ach.title}">
        <h6>${ach.title}</h6>
        <small class="text-muted">${ach.date}</small>
        <p class="small mt-2">${ach.description}</p>
      </div>`;
    track.appendChild(slide);
  });

  let index = 0, total = latest.length, slideWidth = slider.offsetWidth / visible;
  let autoSlide = setInterval(() => { index++; move(); }, 3500);

  function move(animate = true) {
    track.style.transition = animate ? "transform 0.6s ease-in-out" : "none";
    track.style.transform = `translateX(-${index * slideWidth}px)`;
    if (index === total) setTimeout(() => { track.style.transition = "none"; track.style.transform = "translateX(0)"; index = 0; }, 600);
  }

  // Drag / swipe
  let startX = 0, currentX = 0, isDragging = false;
  function dragStart(x) { clearInterval(autoSlide); isDragging = true; startX = x; currentX = x; track.style.transition = "none"; }
  function dragMove(x) { if (!isDragging) return; currentX = x; const diff = currentX - startX; track.style.transform = `translateX(${-(index * slideWidth) + diff}px)`; }
  function dragEnd() { 
    if (!isDragging) return; 
    isDragging = false; 
    const diff = currentX - startX; 
    if (Math.abs(diff) > slideWidth / 4) index += diff < 0 ? 1 : -1; 
    if (index < 0) index = 0; 
    if (index > total) index = total; 
    move(); 
    autoSlide = setInterval(() => { index++; move(); }, 3500); 
  }
  slider.addEventListener("mousedown", e => dragStart(e.pageX));
  window.addEventListener("mousemove", e => dragMove(e.pageX));
  window.addEventListener("mouseup", dragEnd);
  slider.addEventListener("touchstart", e => dragStart(e.touches[0].pageX), { passive: true });
  slider.addEventListener("touchmove", e => dragMove(e.touches[0].pageX), { passive: true });
  slider.addEventListener("touchend", dragEnd);
  window.addEventListener("resize", () => { slideWidth = slider.offsetWidth / visible; move(false); });
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", async () => {
  await loadAllAchievements("all-achievements");
  populateYearPills("achievement-year-pills");
  autoHorizontalSlider("latest-achievements-home", 3);
});
