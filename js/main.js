// ===============================
// Smooth Scroll (Navbar Offset)
// ===============================
$('a[href^="#"]').on('click', function (e) {
  const target = $(this.getAttribute('href'));

  if (!target.length) return;

  e.preventDefault();

  $('html, body').stop().animate(
    {
      scrollTop: target.offset().top - 70
    },
    700
  );
});


// ===============================
// Parallax + Stats Counter
// ===============================
(function () {
  const parallax = document.querySelector('.parallax-bg');
  const statsSection = document.getElementById('stats');
  const counters = document.querySelectorAll('.stat-number');

  if (!parallax && !statsSection) return;

  const parallaxSpeed = 0.35;
  let countersStarted = false;

  function updateParallax() {
    if (!parallax) return;

    const scrolled = window.pageYOffset;
    const parent = parallax.parentElement;

    const sectionTop = parent.offsetTop;
    const sectionHeight = parent.offsetHeight;

    if (
      scrolled + window.innerHeight > sectionTop &&
      scrolled < sectionTop + sectionHeight
    ) {
      const yPos = (scrolled - sectionTop) * parallaxSpeed;
      parallax.style.transform = `translate3d(0, ${yPos}px, 0)`;
    }
  }

  function startCounters() {
    if (countersStarted || !counters.length) return;
    countersStarted = true;

    counters.forEach(counter => {
      const target = Number(counter.dataset.count);
      let current = 0;
      const step = target / 120;

      function update() {
        if (current < target) {
          current += step;
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
    if (rect.top < window.innerHeight - 100) {
      startCounters();
    }
  }

  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', updateParallax);
})();


// ===============================
// Page Loader
// ===============================
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});


// ===============================
// Register Form
// ===============================
const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;
    const message = document.getElementById('registerMessage');

    if (password !== confirm) {
      message.innerHTML = `<div class="alert alert-danger">Passwords do not match!</div>`;
      return;
    }

    // Backend submit goes here later

    message.innerHTML = `<div class="alert alert-success">Registered successfully!</div>`;
    this.reset();
  });
}

const folders = document.querySelectorAll(".folder");

folders.forEach(folder => {
  folder.addEventListener("click", () => {
    const details = folder.nextElementSibling;

    // Close all other details
    document.querySelectorAll(".details").forEach(d => {
      if (d !== details) d.classList.remove("open");
    });

    // Toggle current
    details.classList.toggle("open");
  });
});

  const items = document.querySelectorAll(".parallax");
  let latestScroll = 0;

  window.addEventListener("scroll", () => {
    latestScroll = window.scrollY;
  });

  function animate() {
    items.forEach(item => {
      const speed = item.dataset.speed;
      item.style.transform = `
        translate(-50%, ${latestScroll * speed}px)
      `;
    });
    requestAnimationFrame(animate);
  }

  animate();

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
const STAR_COUNT = 300; // more stars for realism

function resize() {
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
      radius: Math.random() * 1 + 0.2, // different sizes
      alpha: Math.random() * 0.8 + 0.2,  // different brightness
      twinkle: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1), // different speeds
      color: Math.random() > 0.98 ? "255,244,214" : "255,255,255", // rare warm stars
      glow: Math.random() > 0.85 ? Math.random() * 2 + 1 : 0 // optional soft glow
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    // twinkle
    star.alpha += star.twinkle;
    if (star.alpha <= 0 || star.alpha >= 1) star.twinkle *= -1;

    // draw glow if star has it
    if (star.glow) {
      const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius*3);
      gradient.addColorStop(0, `rgba(${star.color}, ${star.alpha})`);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius*3, 0, Math.PI*2);
      ctx.fill();
    }

    // draw main star
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI*2);
    ctx.fillStyle = `rgba(${star.color}, ${star.alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(drawStars);
}

window.addEventListener("resize", resize);

resize();
drawStars();

const music = document.getElementById("bgMusic");

// Play/pause toggle
function toggleMusic() {
  if (music.paused) music.play();
  else music.pause();
}

// Volume control (0.0 to 1.0)
music.volume = 0.5;

// Example: start after first user click (browsers often block autoplay)
window.addEventListener("click", () => {
  music.play();
}, { once: true });

const clickSound = document.getElementById("clickSound");

window.addEventListener("click", () => {
  // rewind to start so it plays every time
  clickSound.currentTime = 0;
  clickSound.play();
});

const hero = document.querySelector('.hero');
let revealed = false;

// lock scroll immediately
document.body.classList.add('locked');

hero.addEventListener('click', (e) => {
  // prevent accidental triggers
  if (e.target.closest('a, button')) return;
  if (revealed) return;

  revealed = true;

  // play click sound
  if (typeof clickSound !== "undefined") {
    clickSound.currentTime = 0;
    clickSound.play();
  }

  // reveal content
  hero.classList.add('revealed');

  // unlock scroll
  document.body.classList.remove('locked');
});
