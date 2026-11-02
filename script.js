/**
 * Chhayank Kadwe - Portfolio Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Typewriter Effect in Hero
  const roles = [
    'Embedded Systems & IoT',
    'Firmware Developer (C/C++)',
    'AI/ML & Local LLM Enthusiast',
    'Custom PCB & Hardware Designer',
    'RF & Antenna Simulation'
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typewriterEl = document.getElementById('typewriter');

  function typeEffect() {
    if (!typewriterEl) return;
    const currentRole = roles[roleIdx];
    
    if (isDeleting) {
      typewriterEl.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typewriterEl.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentRole.length) {
      typeSpeed = 1800; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400; // Pause before next word
    }

    setTimeout(typeEffect, typeSpeed);
  }
  typeEffect();

  // 3. Theme Toggle (Dark / Light)
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('chhayank-theme') || 'dark';
  document.body.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('chhayank-theme', newTheme);
    });
  }

  // 4. Mobile Menu
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => navMenu.classList.add('open'));
  }
  if (navClose && navMenu) {
    navClose.addEventListener('click', () => navMenu.classList.remove('open'));
  }
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu) navMenu.classList.remove('open');
    });
  });

  // 5. Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 6. Copy Email Button
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'chhayankkadwe@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalIcon = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = '<i class="fa-solid fa-check" style="color: #10b981;"></i>';
        setTimeout(() => {
          copyEmailBtn.innerHTML = originalIcon;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy email:', err);
      });
    });
  }

  // 7. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNav = document.querySelector(`.nav-menu a[href*='${sectionId}']`);

      if (targetNav) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNav.classList.add('active');
        } else {
          targetNav.classList.remove('active');
        }
      }
    });
  });
});

// 8. Contact Form Handling (Mailto fallback)
function handleFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  const feedback = document.getElementById('form-feedback');

  const mailtoUrl = `mailto:chhayankkadwe@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    `From: ${name} (${email})\n\nMessage:\n${message}`
  )}`;

  if (feedback) {
    feedback.innerHTML = `
      <p style="color: #10b981; font-weight: 600; margin-top: 10px;">
        <i class="fa-solid fa-circle-check"></i> Opening your email client to send message...
      </p>
    `;
  }

  // Open user mail client
  window.location.href = mailtoUrl;

  setTimeout(() => {
    if (feedback) {
      feedback.innerHTML = `
        <p style="color: #38bdf8; font-size: 0.85rem; margin-top: 10px;">
          Didn't open? You can directly mail <a href="mailto:chhayankkadwe@gmail.com" style="text-decoration: underline;">chhayankkadwe@gmail.com</a>
        </p>
      `;
    }
  }, 2500);
}
