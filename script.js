// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // Skip if it's just "#" or too short, or if it doesn't start with #
    // This allows links that were dynamically updated (like the figma link) to work normally
    if (!href || href.length <= 1 || !href.startsWith('#')) return;

    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Ensure we're on the home view first
      const projectView = document.getElementById('project-view');
      const mainView = document.getElementById('main-view');

      if (!projectView.classList.contains('hidden-section')) {
        showHome();
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Close mobile menu if open
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
    }
  });
});

// Projects Data
const projectsData = {
  "realestate-app": {
    id: "realestate-app",
    title: "Minimalistic-Realestate-App",
    category: "Mobile App Design",
    description: "A modern real estate mobile app designed with a minimal, clean interface and a smooth property browsings experience.",
    longDescription: "This application simplifies the property search process with a clean, minimalistic interface. Users can easily browse listings, view high-quality images, and contact agents directly. The design prioritizes content and usability, ensuring a seamless experience for potential homebuyers.",
    images: [
      "pro1.png",
      "pro2.png",
      "pro3.png",
      "pro4.png"
    ],
    figmaLink: "https://www.figma.com/design/fH5HnMO9cYtN0Qkxkn0cGc/Real-Estate-Mobile-App?node-id=0-1&t=rWOqwb7hfiGiCMPN-1",
    technologies: ["Figma", "UI/UX Design", "Web App", "Minimalistic", "User Research"]
  },
  "ecommerce-app": {
    id: "ecommerce-app",
    title: "Minimalistic-Realestate-Web-App",
    category: "Web App Design",
    description: "A modern real estate Web app designed with a minimal, clean interface and a smooth property browsings experience.",
    longDescription: "This application simplifies the property search process with a clean, minimalistic interface. Users can easily browse listings, view high-quality images, and contact agents directly. The design prioritizes content and usability, ensuring a seamless experience for potential homebuyers.",
    images: [
      "re.png",
      "5.png",
      "6.png",
      "7.png"
    ],
    figmaLink: "https://www.figma.com/design/T7BEdUz6IJ4kjXKtItoV8s/Real-Estate-Web--Qatar?node-id=0-1&t=b4owTiO6IPCP4Ymh-1",
    technologies: ["Figma", "UI/UX Design", "User Research", "Web Design"]
  },
  "fitness-tracker": {
    id: "fitness-tracker",
    title: "Pet Groomer Web App",
    category: "Web Design",
    description: "A web app that makes pet grooming easy allowing users to schedule services, manage pet information, and track appointments effortlessly.",
    longDescription: "Pawli is a comprehensive web application designed to make pet grooming simple, convenient, and enjoyable for both pet owners and groomers. The platform allows users to easily book grooming services, manage appointments, and maintain detailed profiles for their pets, including breed, age, and care preferences.  Designed with a clean and intuitive interface, Pawli focuses on usability, accessibility, and a friendly user experience, ensuring that managing pet grooming has never been easier or more enjoyable. The app combines functionality with a visually appealing, minimalistic design, creating a professional yet approachable platform for pet care",
    images: [
      "1.png",
      "2.png",
      "3.png",
      "4.png"
    ],
    figmaLink: "https://www.figma.com/design/zQOjpVlsqR42GC555v7U1u/PAWLY-webapp?node-id=1-3&t=gVJLGZmYB8RqYiK3-1",
    technologies: ["Figma", "UI/UX", "Web Design", "Modern"]
  },
};

// DOM Elements
const mainView = document.getElementById('main-view');
const projectView = document.getElementById('project-view');
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Navigation Logic
function showProject(projectId) {
  const project = projectsData[projectId];
  if (!project) return;

  // Populate Project Details
  document.getElementById('project-category').textContent = project.category;
  document.getElementById('project-title').textContent = project.title;
  document.getElementById('project-description').textContent = project.description;
  document.getElementById('project-long-description').textContent = project.longDescription;
  document.getElementById('project-figma-link').href = project.figmaLink;

  // Populate Technologies
  const techContainer = document.getElementById('project-technologies');
  techContainer.innerHTML = project.technologies.map(tech => `
    <span class="glass-card px-4 py-2 text-sm font-medium rounded-xl hover-lift">
      ${tech}
    </span>
  `).join('');

  // Populate Gallery
  const galleryContainer = document.getElementById('project-gallery');
  galleryContainer.innerHTML = project.images.map((image, index) => `
    <div class="glass-card rounded-3xl overflow-hidden hover-lift group animate-scale-in" style="animation-delay: ${index * 0.1}s">
      <div class="relative aspect-[4/3] overflow-hidden">
        <img src="${image}" alt="${project.title} - Screen ${index + 1}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      </div>
    </div>
  `).join('');

  // Switch Views
  mainView.classList.add('hidden-section');
  projectView.classList.remove('hidden-section');
  window.scrollTo(0, 0);
}

function showHome() {
  projectView.classList.add('hidden-section');
  mainView.classList.remove('hidden-section');
  window.scrollTo(0, 0);
}

// Scroll Handling
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('glass-card', 'shadow-lg');
    navbar.classList.remove('bg-transparent');
  } else {
    navbar.classList.remove('glass-card', 'shadow-lg');
    navbar.classList.add('bg-transparent');
  }
});

// Mobile Menu
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

// Contact Form Handling with Formspree
document.getElementById('contact-form').addEventListener('submit', async (e) => {
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


// Email Copy Functionality
document.getElementById('email-icon').addEventListener('click', async (e) => {
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

// 2. Mouse Tracking for Glass Glow Effect
document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.glass-card');

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// 3. 3D Tilt Effect (Lightweight)
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 768) return; // Disable on mobile

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rotation
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
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
