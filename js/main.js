// Smooth scroll with navbar offset
$('a[href^="#"]').on('click', function (e) {
  var target = $(this.getAttribute('href'));

  if (target.length) {
    e.preventDefault();

    $('html, body').stop().animate({
      scrollTop: target.offset().top - 70
    }, 700);
  }
});

// ===== SERIOUS PARALLAX =====
(function () {
  var parallax = document.querySelector('.parallax-bg');
  if (!parallax) return;

  var speed = 0.35; // lower = slower, smoother

  function updateParallax() {
    var scrolled = window.pageYOffset;
    var sectionTop = parallax.parentElement.offsetTop;
    var sectionHeight = parallax.parentElement.offsetHeight;

    if (
      scrolled + window.innerHeight > sectionTop &&
      scrolled < sectionTop + sectionHeight
    ) {
      var yPos = (scrolled - sectionTop) * speed;
      parallax.style.transform = 'translate3d(0,' + yPos + 'px,0)';
    }
  }
	
	const counters = document.querySelectorAll('.stat-number');
let started = false;

function startCounters() {
  if (started) return;
  started = true;

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-count');
    let count = 0;
    const speed = target / 100;

    const update = () => {
      if (count < target) {
        count += speed;
        counter.innerText = Math.ceil(count);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });
}

// Trigger when section is visible
window.addEventListener('scroll', () => {
  const section = document.getElementById('stats');
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    startCounters();
  }
});

  window.addEventListener('scroll', updateParallax);
  window.addEventListener('resize', updateParallax);
})();
