// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Scroll Handling for Navbar
window.addEventListener('scroll', () => {
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('glass-card', 'shadow-lg');
      navbar.classList.remove('bg-transparent');
    } else {
      navbar.classList.remove('glass-card', 'shadow-lg');
      navbar.classList.add('bg-transparent');
    }
  }
});

// Mobile Menu
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
      icon.setAttribute('data-lucide', 'menu');
    } else {
      icon.setAttribute('data-lucide', 'x');
    }
    lucide.createIcons();
  });
}

// Contact Form Handling with Formspree
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending... <i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>';
    lucide.createIcons();

    try {
      const response = await fetch("https://formspree.io/f/mjkqzqwy", {
        method: "POST",
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        showNotification("Message Sent! ✨", "Thank you for reaching out. I'll get back to you soon!", 'success');
        form.reset();
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
          showNotification("Error", data["errors"].map(error => error["message"]).join(", "), 'error');
        } else {
          showNotification("Error", "Oops! There was a problem submitting your form", 'error');
        }
      }
    } catch (error) {
      showNotification("Error", "Oops! There was a problem submitting your form", 'error');
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      lucide.createIcons();
    }
  });
}


// Email Copy Functionality
const emailIcon = document.getElementById('email-icon');
if (emailIcon) {
  emailIcon.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = 'aravindofficial2023@gmail.com';

    try {
      await navigator.clipboard.writeText(email);
      showNotification("Email Copied! ✉️", "Email address copied to clipboard", 'success');
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = email;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
        showNotification("Email Copied! ✉️", "Email address copied to clipboard", 'success');
      } catch (err) {
        showNotification("Error", "Could not copy email. Please try again.", 'error');
      }

      document.body.removeChild(textArea);
    }
  });
}

// Initialize Lucide Icons
lucide.createIcons();

// --- Premium Animations ---

// 1. Scroll Reveal Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 2. Optimized Mouse Tracking for Glass Glow & 3D Tilt
document.querySelectorAll('.glass-card').forEach(card => {
  let ticking = false;

  card.addEventListener('mousemove', (e) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update CSS variables for Glow
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // 3D Tilt Calculation (Disable on mobile for performance)
        if (window.innerWidth >= 768) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rotation
          const rotateY = ((x - centerX) / centerX) * 5;

          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.02)`;
        }

        ticking = false;
      });

      ticking = true;
    }
  });

  card.addEventListener('mouseleave', () => {
    // Reset transform on leave
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    // Optional: Fade out glow manually if needed, but CSS handles opacity
  });
});

// 4. Toast Notification Helper
function showNotification(title, message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast-notification fixed bottom-8 right-8 p-6 rounded-2xl shadow-2xl transform transition-all duration-300 z-50 flex items-start gap-4 animate-toast-in`;

  // Icon based on type
  const icon = type === 'success'
    ? '<div class="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"><i data-lucide="check" class="w-5 h-5 text-green-500"></i></div>'
    : '<div class="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center"><i data-lucide="alert-circle" class="w-5 h-5 text-red-500"></i></div>';

  toast.innerHTML = `
    ${icon}
    <div>
      <h4 class="font-bold text-lg mb-1">${title}</h4>
      <p class="text-muted-foreground text-sm">${message}</p>
    </div>
  `;

  document.body.appendChild(toast);
  lucide.createIcons();

  // Remove after 5 seconds
  setTimeout(() => {
    toast.classList.remove('animate-toast-in');
    toast.classList.add('animate-toast-out');
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

// --- Theme Switcher Logic ---
const themeToggleDesktop = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  // Update Icons
  const iconName = theme === 'dark' ? 'sun' : 'moon';

  [themeToggleDesktop, themeToggleMobile].forEach(btn => {
    if (btn) {
      const icon = btn.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', iconName);
      }
    }
  });

  lucide.createIcons();
}

function getPreferredTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme;
  }
  // Default to light as requested
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function toggleTheme(e) {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  setTheme(newTheme);
}

// Initialize Theme
const initialTheme = getPreferredTheme();
setTheme(initialTheme);

// Event Listeners
if (themeToggleDesktop) themeToggleDesktop.addEventListener('click', (e) => toggleTheme(e));
if (themeToggleMobile) themeToggleMobile.addEventListener('click', (e) => toggleTheme(e));
