// ===== CONFIG =====
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyn7b1U_W_BdnbkxvXSOychIrxbrZidnUi_XXs6KEn27GqO_c7IjcktmsIJf-MDy3BD/exec";

// ===== FETCH ACHIEVEMENTS =====
async function fetchAchievements() {
  try {
    const res = await fetch(WEB_APP_URL);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("Data is not an array.");
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
  const sorted = achievements.sort((a, b) => new Date(b.date) - new Date(a.date));

  sorted.forEach(ach => {
    const imgSrc = ach.image || "https://via.placeholder.com/300x200?text=No+Image";
    const year = new Date(ach.date).getFullYear();

    const col = document.createElement("div");
    col.className = "col-md-4 mb-4 achievement-col";
    col.dataset.year = year;
    col.innerHTML = `
      <div class="achievement-card">
        <img data-src="${imgSrc}" src="https://via.placeholder.com/300x200?text=Loading..." loading="lazy" draggable="false" alt="${ach.title}">
        <h5>${ach.title}</h5>
        <small>${new Date(ach.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</small>
        <p>${ach.description}</p>
      </div>`;
    container.appendChild(col);
  });

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
  document.querySelectorAll(".achievement-col").forEach(card => {
    card.style.display = (year === "all" || card.dataset.year === year) ? "block" : "none";
  });
}

// ===== YEAR PILLS =====
async function populateYearPills(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const achievements = await fetchAchievements();
  const years = [...new Set(achievements.map(a => new Date(a.date).getFullYear()))].sort((a, b) => b - a);

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

  container.addEventListener("click", e => {
    const pill = e.target.closest(".year-pill");
    if (!pill) return;
    container.querySelectorAll(".year-pill").forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
    filterAchievementsByYear(pill.dataset.year);
  });
}

// ===== RESPONSIVE SLIDER (FINAL FIX) =====
async function autoHorizontalSlider(containerId) {
  const track = document.getElementById(containerId);
  if (!track) return;

  const slider = track.parentElement;
  track.className = "achievements-track";
  track.innerHTML = "";

  const achievements = await fetchAchievements();
  if (!achievements.length) return;

  const sorted = achievements.sort((a, b) => new Date(b.date) - new Date(a.date));
  const latest = sorted.slice(0, 5);

  function getVisible() {
    if (window.innerWidth < 576) return 1;
    if (window.innerWidth < 992) return 2;
    return 3;
  }

  let visible = getVisible();
  let index = 0;

  const dotsContainer = document.getElementById("achievement-dots");
if (dotsContainer) dotsContainer.innerHTML = "";

// Create dots
latest.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.className = "achievement-dot" + (i === 0 ? " active" : "");
  dot.addEventListener("click", () => {
    index = i;
    move();
    updateDots();
  });
  dotsContainer.appendChild(dot);
});

function updateDots() {
  if (!dotsContainer) return;
  dotsContainer.querySelectorAll(".achievement-dot").forEach((d, i) => {
    d.classList.toggle("active", i === index % latest.length);
  });
}


  // Build slides (clone for loop)
  function buildSlides() {
    track.innerHTML = "";
    visible = getVisible();

    const data = [...latest, ...latest.slice(0, visible)];

    data.forEach(ach => {
      const imgSrc = ach.image || "https://via.placeholder.com/300x200?text=No+Image";

      const slide = document.createElement("div");
      slide.className = "achievement-slide";
      slide.innerHTML = `
        <div class="achievement-card">
          <img src="${imgSrc}" draggable="false">
          <h6>${ach.title}</h6>
          <small>${new Date(ach.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</small>
          <p class="small mt-2">${ach.description}</p>
        </div>`;
      track.appendChild(slide);
    });

    resizeSlides();
    index = 0;
    move(false);
  }

  function resizeSlides() {
    const slideWidth = slider.offsetWidth / visible;

    document.querySelectorAll(".achievement-slide").forEach(s => {
      s.style.minWidth = slideWidth + "px";
    });
  }

function move(anim = true) {
  const slideWidth = slider.offsetWidth / visible;

  track.style.transition = anim ? "transform .5s ease" : "none";
  track.style.transform = `translateX(-${index * slideWidth}px)`;

  updateDots();

  if (index >= latest.length) {
    setTimeout(() => {
      track.style.transition = "none";
      index = 0;
      track.style.transform = "translateX(0)";
      updateDots();
    }, 500);
  }
}


  buildSlides();

  // Auto slide
  let timer = setInterval(() => {
  index++;
  move();
  updateDots();
}, 3000);


  let startX = 0;
let currentX = 0;
let dragging = false;

function dragStart(x) {
  clearInterval(timer);
  dragging = true;
  startX = x;
  currentX = x;
  track.style.transition = "none";
}

function dragMove(x) {
  if (!dragging) return;
  currentX = x;

  const slideWidth = slider.offsetWidth / visible;
  track.style.transform =
    `translateX(${-(index * slideWidth) + (currentX - startX)}px)`;
}

function dragEnd() {
  if (!dragging) return;
  dragging = false;

  const diff = currentX - startX;
  const slideWidth = slider.offsetWidth / visible;

  if (Math.abs(diff) > slideWidth / 4) {
    index += diff < 0 ? 1 : -1;
  }

  if (index < 0) index = 0;

  move();
  
  timer = setInterval(() => { index++; move(); }, 3000);
}

// Mouse
slider.addEventListener("mousedown", e => dragStart(e.pageX));
window.addEventListener("mousemove", e => dragMove(e.pageX));
window.addEventListener("mouseup", dragEnd);

// Touch
slider.addEventListener("touchstart", e => dragStart(e.touches[0].pageX), { passive:true });
slider.addEventListener("touchmove", e => dragMove(e.touches[0].pageX), { passive:true });
slider.addEventListener("touchend", dragEnd);


  // Resize rebuild
  window.addEventListener("resize", () => {
    buildSlides();
  });
}


// ===== INIT =====
document.addEventListener("DOMContentLoaded", async () => {
  await loadAllAchievements("all-achievements");
  populateYearPills("achievement-year-pills");
  autoHorizontalSlider("latest-achievements-home", 3);
});
