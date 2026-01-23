const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw-CyqNqFmasI3Z9TGNMu_upcHFmIb8V9T_PdPDt0ctvR0LBmPS2kRDUjaJyI9fs1yN/exec"; // Your Web App URL

// ===== Fetch Achievements =====
async function fetchAchievements() {
  try {
    const res = await fetch(WEB_APP_URL);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch achievements:", err);
    return [];
  }
}

// ===== Home Slider =====
async function autoHorizontalSlider(containerId, visible = 3) {
  const track = document.getElementById(containerId);
  if (!track) return;

  const slider = track.parentElement;
  track.classList.add("achievements-track");
  track.innerHTML = "";

  const achievements = await fetchAchievements();
  const latestAchievements = [...achievements]
    .sort((a,b)=> new Date(b.date) - new Date(a.date))
    .slice(0,5);

  const data = [...latestAchievements, ...latestAchievements.slice(0, visible)];

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

  // ===== Slider Logic =====
  let index = 0;
  const total = latestAchievements.length;
  let slideWidth = slider.offsetWidth / visible;
  let autoSlide = setInterval(()=>{ index++; move(); }, 3500);

  function move(animate=true){
    track.style.transition = animate ? "transform 0.6s ease-in-out":"none";
    track.style.transform = `translateX(-${index*slideWidth}px)`;
    if(index===total){
      setTimeout(()=>{ track.style.transition="none"; track.style.transform="translateX(0)"; index=0; }, 600);
    }
  }

  // ===== Drag / Swipe =====
  let startX=0, currentX=0, isDragging=false;
  function dragStart(x){ clearInterval(autoSlide); isDragging=true; startX=x; currentX=x; track.style.transition="none"; }
  function dragMove(x){ if(!isDragging) return; currentX=x; const diff=currentX-startX; track.style.transform=`translateX(${-(index*slideWidth)+diff}px)`; }
  function dragEnd(){ if(!isDragging) return; isDragging=false; const diff=currentX-startX; if(Math.abs(diff)>slideWidth/4) index+=diff<0?1:-1; if(index<0) index=0; if(index>total) index=total; move(); autoSlide=setInterval(()=>{ index++; move(); },3500); }
  slider.addEventListener("mousedown", e=>dragStart(e.pageX));
  window.addEventListener("mousemove", e=>dragMove(e.pageX));
  window.addEventListener("mouseup", dragEnd);
  slider.addEventListener("touchstart", e=>dragStart(e.touches[0].pageX),{passive:true});
  slider.addEventListener("touchmove", e=>dragMove(e.touches[0].pageX),{passive:true});
  slider.addEventListener("touchend", dragEnd);

  window.addEventListener("resize", ()=>{ slideWidth=slider.offsetWidth/visible; move(false); });
}

// ===== Achievements Page Grid =====
async function loadAllAchievements(containerId){
  const container = document.getElementById(containerId);
  if(!container) return;

  container.innerHTML = "";
  const achievements = await fetchAchievements();

  achievements
    .sort((a,b)=> new Date(b.date)-new Date(a.date))
    .forEach(ach => {
      const col = document.createElement("div");
      col.className = "col-md-4 mb-4";
      col.innerHTML = `
        <div class="achievement-card">
          <img src="${ach.image}" draggable="false">
          <h5>${ach.title}</h5>
          <small>${ach.date}</small>
          <p>${ach.description}</p>
        </div>
      `;
      container.appendChild(col);
    });
}

// ===== Initialize on DOM Load =====
document.addEventListener("DOMContentLoaded", ()=>{
  autoHorizontalSlider("latest-achievements-home", 3);
  loadAllAchievements("all-achievements");
});
