// ===== CONFIG =====
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxDvIXhBFEMzj2WVX0pCIbk2wzMWr0RIbopJggl7iWD6g4itpUKIsw6XVq-xAIWjtZo/exec";


function showSkeletons(containerId, count = 6) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = ""; // clear previous

  for (let i = 0; i < count; i++) {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4 achievement-col";

    col.innerHTML = `
      <div class="achievement-card skeleton">
        <img src="https://placehold.co/300x200?text=Loading" />
        <h5>Loading</h5>
        <small>...</small>
        <p>Loading description...</p>
      </div>
    `;
    container.appendChild(col);
  }
}

function showSliderSkeletons(containerId, count = 3) {
  const track = document.getElementById(containerId);
  if (!track) return;

  track.innerHTML = ""; // clear previous

  for (let i = 0; i < count; i++) {
    const slide = document.createElement("div");
    slide.className = "achievement-slide skeleton";

    // Set min-width so flex layout works
    slide.style.minWidth = "250px"; // or whatever your slide width is
    slide.style.flex = "0 0 auto";  // ensure slides sit next to each other

    slide.innerHTML = `
      <div class="achievement-card skeleton">
        <img src="https://placehold.co/300x200?text=Loading" />
        <h5>Loading</h5>
        <small>...</small>
        <p>Loading description...</p>
      </div>
    `;

    // Stagger fade-in
    slide.style.animation = `skeletonFadeIn 0.5s forwards`;
    slide.style.animationDelay = `${i * 0.2}s`;

    track.appendChild(slide);
  }
}



// ===== FETCH ACHIEVEMENTS =====
async function fetchAchievements() {
  try {
    const res = await fetch(WEB_APP_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("Network response failed");
    const data = await res.json();
    if (!Array.isArray(data)) {
      console.error("Invalid data:", data);
      return null; // ❌ return null on invalid data
    }
    return data;
  } catch (err) {
    console.error("Failed to fetch achievements:", err);
    return null; // ❌ return null if network fails
  }
}


function openFromURL(achievements) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("ach");
  if (!id) return;

  const ach = achievements.find(a => String(a.id) === id);
  if (ach) {
    window.openAchievementModal(ach);
  }
}

// ===== GRID =====
function loadAllAchievements(containerId, achievements) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // 🔥 CLEAR SKELETONS / LOADING CARDS
  container.innerHTML = "";

  // Sort achievements by date
  const sorted = [...achievements].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  sorted.forEach(ach => {
    const imgSrc = ach.image || "https://placehold.co/300x200?text=No+Image";
    const year = ach.date ? new Date(ach.date).getFullYear() : "Unknown";

    const col = document.createElement("div");
    col.className = "col-md-4 mb-4 achievement-col";
    col.dataset.year = year;

    col.innerHTML = `
      <div class="achievement-card">
        <img data-src="${imgSrc}"
             src="https://placehold.co/300x200?text=Loading"
             loading="lazy"
             draggable="false">
        <h5>${ach.title}</h5>
        <small>${ach.date ? new Date(ach.date).toLocaleDateString('en-GB', {
          day:'numeric', month:'short', year:'numeric'
        }) : "Unknown Date"}</small>
        <p>${ach.description}</p>
      </div>
    `;

    col.querySelector(".achievement-card").addEventListener("click", () => {
      openAchievementModal(ach);
      history.pushState({ id: ach.id }, "", `?ach=${ach.id}`);
    });

    container.appendChild(col);
  });

  // Lazy load images
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
function populateYearPills(containerId, achievements) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = ""; // 🔥 prevent duplicates

  if (!achievements || !achievements.length) return;

  const years = [...new Set(
    achievements.map(a => new Date(a.date).getFullYear())
  )].sort((a, b) => b - a);

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
async function autoHorizontalSlider(containerId, achievements) {

  function removeSliderSkeletons(containerId) {
  const track = document.getElementById(containerId);
  if (!track) return;

  const skeletons = track.querySelectorAll(".achievement-slide.skeleton");
  skeletons.forEach((slide, i) => {
    slide.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    slide.style.transitionDelay = `${i * 0.1}s`;
    slide.style.opacity = 0;
    slide.style.transform = "translateY(10px)";
  });

  setTimeout(() => {
    track.innerHTML = "";
  }, skeletons.length * 100 + 300);
}

  const track = document.getElementById(containerId);
  if (!track) return;

  const slider = track.parentElement;

  // Remove loading text safely
  const loadingText = slider.querySelector(".section-loading");
  if (loadingText) loadingText.remove();

  track.className = "achievements-track";
  track.innerHTML = "";

  if (!achievements || !achievements.length) return;

  const sorted = [...achievements].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

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

  const activeIndex = index >= latest.length ? 0 : index;

  dotsContainer.querySelectorAll(".achievement-dot").forEach((d, i) => {
    d.classList.toggle("active", i === activeIndex);
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
    <small>${new Date(ach.date).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</small>
    <p class="small mt-2">${ach.description}</p>
  </div>
`;

slide.querySelector(".achievement-card").addEventListener("click", e => {
  if (dragging) return; // prevent modal while dragging
  openAchievementModal(ach);
  history.pushState({ id: ach.id }, "", `?ach=${ach.id}`);
});


      track.appendChild(slide);
    });

    resizeSlides();
    index = 0;
    move(false);
  }

  function resizeSlides() {
    const slideWidth = slider.offsetWidth / visible;

    track.querySelectorAll(".achievement-slide").forEach(s => {
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
  showSkeletons("all-achievements", 6); // show 6 skeleton cards
  showSliderSkeletons("latest-achievements-home", 3); // Slider
  const achievements = await fetchAchievements();

  if (achievements && achievements.length) {
    loadAllAchievements("all-achievements", achievements);
    populateYearPills("achievement-year-pills", achievements);
    autoHorizontalSlider("latest-achievements-home", achievements);
    openFromURL(achievements); // open modal from URL if ?ach=
  } else {
    console.log("No achievements loaded");
    // ⚡ Keep skeletons, optionally show a "Retry" button
  }
  openFromURL(achievements); // ⭐ add this
});



const modal = document.getElementById("achievement-modal");

if (modal) {

  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalDate = document.getElementById("modal-date");
  const modalDesc = document.getElementById("modal-desc");

  const copyBtn = document.getElementById("copy-link-btn");
  const shareBtn = document.getElementById("share-btn");

  let currentAchievement = null;

  function openAchievementModal(ach) {
    if (!modalImg || !modalTitle || !modalDate || !modalDesc) return;

    currentAchievement = ach;

    modalImg.src = ach.image || "";
    modalTitle.textContent = ach.title;
    modalDate.textContent = new Date(ach.date).toLocaleDateString(
      'en-GB', { day:'numeric', month:'long', year:'numeric' }
    );
    modalDesc.textContent = ach.description;

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeAchievementModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "";

    history.pushState({}, "", window.location.pathname);
  }

  // Close events
  const closeBtn = modal.querySelector(".modal-close");
  const overlay = modal.querySelector(".achievement-modal-overlay");

  if (closeBtn) closeBtn.onclick = closeAchievementModal;
  if (overlay) overlay.onclick = closeAchievementModal;

  window.addEventListener("keydown", e => {
    if (e.key === "Escape") closeAchievementModal();
  });

  // ===== COPY LINK =====
// ===== COPY LINK =====
if (copyBtn) {
  copyBtn.onclick = () => {

    if (!currentAchievement) return;

    const url =
      `${window.location.origin}${window.location.pathname}?ach=${currentAchievement.id}`;

    navigator.clipboard.writeText(url).then(() => {

      const tooltip =
        copyBtn.parentElement.querySelector(".copy-tooltip");

      if (tooltip) {
        tooltip.classList.add("show");

        setTimeout(() => {
          tooltip.classList.remove("show");
        }, 1200);
      }

    });

  };
}

  // ===== SHARE =====
  if (shareBtn) {
    shareBtn.onclick = async () => {
      if (!currentAchievement) return;

      const url =
        `${window.location.origin}${window.location.pathname}?ach=${currentAchievement.id}`;

      if (navigator.share) {
        try {
          await navigator.share({
            title: currentAchievement.title,
            text: currentAchievement.description,
            url: url
          });
        } catch (err) {
          console.log("Share cancelled");
        }
      } else {
        navigator.clipboard.writeText(url);
        alert("Link copied!");
      }
    };
  }

  // 🔥 expose function globally so cards can call it
  window.openAchievementModal = openAchievementModal;
}
