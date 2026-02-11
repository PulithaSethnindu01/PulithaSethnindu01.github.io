// ===============================
// Smooth Scroll + Active Link + Mobile Auto-Collapse
// ===============================

// Select sections and navbar links
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
const navbarCollapse = document.querySelector(".navbar-collapse");

// Smooth scroll with offset
navLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const offset = document.querySelector(".navbar")?.offsetHeight || 70;
    const targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: targetPos,
      behavior: "smooth"
    });

    // Auto-collapse on mobile
    if (navbarCollapse.classList.contains("show")) {
      new bootstrap.Collapse(navbarCollapse).hide();
    }
  });
});

// Highlight active section on scroll
window.addEventListener("scroll", () => {
  let current = "";
  const scrollPos = window.pageYOffset + window.innerHeight / 3; // detect 1/3 from top

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});


// ===============================
// Parallax + Stats Counter
// ===============================
(function() {
  const parallax = document.querySelector('.parallax-bg');
  const statsSection = document.getElementById('stats');
  const counters = document.querySelectorAll('.stat-number');
  const parallaxSpeed = 0.35;
  let countersStarted = false;

  function updateParallax() {
    if (!parallax) return;
    const scrolled = window.pageYOffset;
    const parent = parallax.parentElement;
    const sectionTop = parent.offsetTop;
    const sectionHeight = parent.offsetHeight;

    if (scrolled + window.innerHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
      const yPos = (scrolled - sectionTop) * parallaxSpeed;
      parallax.style.transform = `translate3d(0, ${yPos}px, 0)`;
    }
  }

  function startCounters() {
    if (countersStarted || counters.length === 0) return;
    countersStarted = true;

    counters.forEach(counter => {
      const target = Number(counter.dataset.count);
      let current = 0;
      const step = target / 120;

      function update() {
        current += step;
        if (current < target) {
          counter.textContent = Math.ceil(current);
          requestAnimationFrame(update);
        } else {
          counter.textContent = target;
        }
      }
      update();
    });
  }

  function onScroll() {
    updateParallax();
    if (!statsSection) return;
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) startCounters();
  }

  window.addEventListener("scroll", onScroll);
  window.addEventListener("resize", updateParallax);
})();

// ===============================
// Page Loader
// ===============================
// Minimum loader display time (ms)
const MIN_LOADER_TIME = 1800;

document.addEventListener("DOMContentLoaded", () => {
  const loaderStart = Date.now();

  // Wait for everything to be ready
  const hideLoader = () => {
    const elapsed = Date.now() - loaderStart;
    const remaining = MIN_LOADER_TIME - elapsed;

    // Ensure loader stays visible at least MIN_LOADER_TIME
    setTimeout(() => {
      document.body.classList.add("loaded");
    }, remaining > 0 ? remaining : 0);
  };

  // If you want to wait for images too, use window.onload
  window.addEventListener("load", hideLoader);
});



// ===============================
// Register Form Validation
// ===============================
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;
    const message = document.getElementById("registerMessage");
    message.innerHTML = "";

    if (password !== confirm) {
      message.innerHTML = `<div class="alert alert-danger">Passwords do not match!</div>`;
      return;
    }

    // Backend submission goes here later
    message.innerHTML = `<div class="alert alert-success">Registered successfully!</div>`;
    this.reset();
  });
}

// ===============================
// Terminal Folder Toggle
// ===============================
document.querySelectorAll(".folder").forEach(folder => {
  folder.addEventListener("click", () => {
    const details = folder.nextElementSibling;
    document.querySelectorAll(".details").forEach(d => {
      if (d !== details) d.classList.remove("open");
    });
    details.classList.toggle("open");
  });
});

// ===============================
// Parallax Images
// ===============================
const parallaxItems = document.querySelectorAll(".parallax");
let latestScroll = 0;
window.addEventListener("scroll", () => latestScroll = window.scrollY);

function animateParallax() {
  parallaxItems.forEach(item => {
    const speed = parseFloat(item.dataset.speed) || 0;
    item.style.transform = `translate(-50%, ${latestScroll * speed}px)`;
  });
  requestAnimationFrame(animateParallax);
}
animateParallax();

// ===============================
// Starfield Canvas
// ===============================
const canvas = document.getElementById("starfield");
const ctx = canvas?.getContext("2d");
let stars = [];
const STAR_COUNT = window.innerWidth < 768 ? 120 : 300;

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createStars();
}

function createStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1 + 0.2,
      alpha: Math.random() * 0.8 + 0.2,
      twinkle: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      color: Math.random() > 0.98 ? "255,244,214" : "255,255,255",
      glow: Math.random() > 0.85 ? Math.random() * 2 + 1 : 0
    });
  }
}

function drawStars() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    star.alpha += star.twinkle;
    if (star.alpha <= 0 || star.alpha >= 1) star.twinkle *= -1;

    if (star.glow) {
      const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 3);
      gradient.addColorStop(0, `rgba(${star.color}, ${star.alpha})`);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${star.color}, ${star.alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawStars();

// ===============================
// Audio: Background Music + Click Sound
// ===============================
const music = document.getElementById("bgMusic");
const clickSound = document.getElementById("clickSound");
if (music) music.volume = 0.5;

// Persistent mute state
let isMuted = JSON.parse(localStorage.getItem("aa_mute")) || false;
[music, clickSound].forEach(sound => { if (sound) sound.muted = isMuted; });

const muteBtn = document.getElementById("mute-btn");
const muteIcon = muteBtn?.querySelector("i");

function updateMuteIcon() {
  if (!muteIcon) return;
  muteIcon.classList.toggle("fa-volume-up", !isMuted);
  muteIcon.classList.toggle("fa-volume-mute", isMuted);
}
updateMuteIcon();

muteBtn?.addEventListener("click", () => {
  isMuted = !isMuted;
  [music, clickSound].forEach(sound => { if (sound) sound.muted = isMuted; });
  localStorage.setItem("aa_mute", JSON.stringify(isMuted));
  updateMuteIcon();
});

// Play music on first user interaction
window.addEventListener("click", function playAudioOnce() {
  if (music) music.play();
  window.removeEventListener("click", playAudioOnce);
});

// Play click sound on any click
window.addEventListener("click", () => {
  if (clickSound) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Only run hero reveal on pages with 'hero-reveal-page'
  if (!document.body.classList.contains("hero-reveal-page")) return;

  const hero = document.querySelector(".hero");
  if (!hero) return; // safety check
  let revealed = false;

  function revealHero() {
    if (revealed) return;
    revealed = true;

    hero.classList.add("revealed");
    document.body.classList.add("hero-revealed");
    document.body.classList.remove("lock-scroll");

    // Optional: play click sound
    if (typeof clickSound !== "undefined" && clickSound) {
      clickSound.currentTime = 0;
      clickSound.play();
    }

    // Optional: fade stars slightly
    const starfield = document.getElementById("starfield");
    if (starfield) {
      starfield.style.transition = "opacity 1.5s ease";
      starfield.style.opacity = "0.6";
    }
  }

  // Auto reveal if page is scrolled down or has hash
  if (window.scrollY > 100 || window.location.hash) {
    revealHero();
  } else {
    document.body.classList.add("lock-scroll");
  }

  // Click to reveal (ignores links/buttons)
  hero.addEventListener("click", e => {
    if (e.target.closest("a, button")) return;
    revealHero();
  });

  // Scroll to reveal
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) revealHero();
  });
});



// ===============================
// Animate On Scroll
// ===============================
const animatedItems = document.querySelectorAll(".animate-on-scroll");
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add("animate__animated", el.dataset.anim || "animate__fadeInUp");
    el.style.opacity = 1;
    obs.unobserve(el);
  });
}, { threshold: 0.15 });

animatedItems.forEach(el => observer.observe(el));
