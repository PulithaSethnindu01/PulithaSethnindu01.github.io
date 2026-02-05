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