const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwoL50mUUsY-zMd0O-Q2464TzWKYBW07CwPF9rS9Xx5zu6RLh6V4S4JTj5cKqI3ktYa/exec";

// ===== Fetch achievements from Web App =====
async function fetchAchievements() {
  try {
    const res = await fetch(WEB_APP_URL);
    const data = await res.json();
    return data;
  } catch(err) {
    console.error("Failed to fetch achievements:", err);
    return [];
  }
}

// ===== Slider =====
async function autoHorizontalSlider(containerId) {
  const track = document.getElementById(containerId);
  if(!track) return;

  const slider = track.parentElement;
  track.classList.add("achievements-track");
  track.innerHTML = "";

  const achievements = await fetchAchievements();
  const latestAchievements = [...achievements]
    .sort((a,b) => new Date(b.date) - new Date(a.date))
    .slice(0,5);

  // Determine visible count based on screen width
  function getVisibleCount() {
    if(window.innerWidth < 768) return 1;
    if(window.innerWidth < 992) return 2;
    return 3;
  }

  let visibleCount = getVisibleCount();
  let slideWidth = slider.offsetWidth / visibleCount;

  // Duplicate for infinite loop
  const data = [...latestAchievements, ...latestAchievements.slice(0, visibleCount)];

  data.forEach(ach => {
    const slide = document.createElement("div");
    slide.className = "achievement-slide";
    slide.innerHTML = `
      <div class="achievement-card p-3">
        <img src="${ach.image}" class="mb-3" draggable="false">
        <h6>${ach.title}</h6>
        <small class="text-muted">${ach.date}</small>
        <p class="small mt-2">${ach.description}</p>
      </div>
    `;
    track.appendChild(slide);
  });

  let index = 0;
  const total = latestAchievements.length;
  let autoSlide = setInterval(() => { index++; move(); }, 3500);

  function move(animate = true) {
    track.style.transition = animate ? "transform 0.6s ease-in-out" : "none";
    track.style.transform = `translateX(-${index * slideWidth}px)`;
    if(index === total) {
      setTimeout(() => { track.style.transition="none"; track.style.transform="translateX(0)"; index=0; }, 600);
    }
  }

  // ===== Drag / Swipe =====
  let startX = 0, currentX = 0, isDragging = false;
  function dragStart(x) { clearInterval(autoSlide); isDragging=true; startX=x; currentX=x; track.style.transition="none"; }
  function dragMove(x) { if(!isDragging) return; currentX=x; const diff=currentX-startX; track.style.transform=`translateX(${-(index*slideWidth)+diff}px)`; }
  function dragEnd() {
    if(!isDragging) return;
    isDragging=false;
    const diff = currentX-startX;
    if(Math.abs(diff) > slideWidth/4) index += diff<0 ? 1 : -1;
    if(index<0) index=0;
    if(index>total) index=total;
    move();
    autoSlide=setInterval(()=>{index++; move();},3500);
  }

  slider.addEventListener("mousedown", e=>dragStart(e.pageX));
  window.addEventListener("mousemove", e=>dragMove(e.pageX));
  window.addEventListener("mouseup", dragEnd);
  slider.addEventListener("touchstart", e=>dragStart(e.touches[0].pageX), {passive:true});
  slider.addEventListener("touchmove", e=>dragMove(e.touches[0].pageX), {passive:true});
  slider.addEventListener("touchend", dragEnd);

  // ===== Resize =====
  window.addEventListener("resize", () => {
    visibleCount = getVisibleCount();
    slideWidth = slider.offsetWidth / visibleCount;
    move(false);
  });
}

// ===== Grid =====
async function loadAllAchievements(containerId) {
  const container = document.getElementById(containerId);
  if(!container) return;

  container.innerHTML = "";
  const achievements = await fetchAchievements();

  achievements.forEach(ach => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";
    col.innerHTML = `
      <div class="achievement-card">
        <img src="${ach.image}" class="mb-3" draggable="false">
        <h5>${ach.title}</h5>
        <small class="text-muted">${ach.date}</small>
        <p class="small mt-2">${ach.description}</p>
      </div>
    `;
    container.appendChild(col);
  });
}

// ===== Initialize =====
document.addEventListener("DOMContentLoaded", () => {
  autoHorizontalSlider("latest-achievements-home");
  loadAllAchievements("all-achievements");
});
