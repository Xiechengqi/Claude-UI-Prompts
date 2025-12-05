// DOM Elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const statNumbers = document.querySelectorAll('.stat-number');

// Navigation Toggle
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed nav
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Animate stat numbers
function animateStatNumbers() {
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;

    const updateNumber = () => {
      current += increment;
      if (current < target) {
        stat.textContent = Math.ceil(current);
        requestAnimationFrame(updateNumber);
      } else {
        stat.textContent = target;
      }
    };

    updateNumber();
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';

      // Trigger stat animation when stats section is visible
      if (entry.target.classList.contains('stats')) {
        animateStatNumbers();
        observer.unobserve(entry.target); // Only animate once
      }
    }
  });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
  // Animate feature cards
  document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    observer.observe(card);
  });

  // Animate distribution cards
  document.querySelectorAll('.distro-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    observer.observe(card);
  });

  // Animate community cards
  document.querySelectorAll('.community-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    observer.observe(card);
  });

  // Observe stats section
  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
});

// Terminal typing effect
function typeTerminalText() {
  const commands = [
    'ls -la',
    'sudo apt update',
    'git clone https://github.com/linux/linux.git',
    'make menuconfig',
    'make -j$(nproc)'
  ];

  const terminalLine = document.querySelector('.terminal-line');
  if (!terminalLine) return;

  let commandIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentCommand = commands[commandIndex];

    if (isDeleting) {
      terminalLine.innerHTML = `
        <span class="terminal-prompt">$</span>
        <span>${currentCommand.substring(0, charIndex - 1)}</span>
        <span class="terminal-cursor">|</span>
      `;
      charIndex--;
      typingSpeed = 50;
    } else {
      terminalLine.innerHTML = `
        <span class="terminal-prompt">$</span>
        <span>${currentCommand.substring(0, charIndex + 1)}</span>
        <span class="terminal-cursor">|</span>
      `;
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentCommand.length) {
      typingSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      commandIndex = (commandIndex + 1) % commands.length;
      typingSpeed = 500; // Pause before next command
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

// Initialize terminal typing effect
document.addEventListener('DOMContentLoaded', typeTerminalText);

// Parallax effect for hero section
function updateParallax() {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector('.hero-content');
  const heroPattern = document.querySelector('.hero-pattern');

  if (heroContent && scrolled < window.innerHeight) {
    const speed = 0.5;
    heroContent.style.transform = `translateY(${scrolled * speed}px)`;
  }

  if (heroPattern && scrolled < window.innerHeight) {
    const speed = 0.2;
    heroPattern.style.transform = `translateY(${scrolled * speed}px)`;
  }
}

// Scroll event listeners
let ticking = false;

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }
}

function updateScrollEffects() {
  updateActiveNavLink();
  updateParallax();
  ticking = false;
}

window.addEventListener('scroll', requestTick);

// Header background on scroll
function updateHeaderBackground() {
  const nav = document.querySelector('.nav');
  const scrolled = window.pageYOffset;

  if (scrolled > 50) {
    nav.style.background = 'rgba(255, 255, 255, 0.98)';
    nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    nav.style.background = 'rgba(255, 255, 255, 0.95)';
    nav.style.boxShadow = 'none';
  }
}

window.addEventListener('scroll', updateHeaderBackground);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  // Press Escape to close mobile menu
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Press '/' to focus search (if search is implemented)
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
    e.preventDefault();
    // Focus search input if it exists
    const searchInput = document.querySelector('#search-input');
    if (searchInput) {
      searchInput.focus();
    }
  }
});

// Download button click tracking
document.querySelectorAll('.distro-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const distroName = btn.closest('.distro-card').querySelector('.distro-name').textContent;

    // You can add analytics tracking here
    console.log(`Download requested for: ${distroName}`);

    // Example: Track with Google Analytics
    // gtag('event', 'download', {
    //   'event_category': 'Linux Distribution',
    //   'event_label': distroName
    // });
  });
});

// Add loading states for external links
document.querySelectorAll('a[href^="http"]').forEach(link => {
  link.addEventListener('click', () => {
    link.style.opacity = '0.6';
    setTimeout(() => {
      link.style.opacity = '1';
    }, 1000);
  });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Debounced scroll handlers
const debouncedScrollHandler = debounce(updateScrollEffects, 10);
const debouncedHeaderHandler = debounce(updateHeaderBackground, 10);

window.removeEventListener('scroll', requestTick);
window.removeEventListener('scroll', updateHeaderBackground);
window.addEventListener('scroll', debouncedScrollHandler);
window.addEventListener('scroll', debouncedHeaderHandler);

// Theme toggle (bonus feature)
function createThemeToggle() {
  const themeToggle = document.createElement('button');
  themeToggle.innerHTML = '🌙';
  themeToggle.className = 'theme-toggle';
  themeToggle.setAttribute('aria-label', 'Toggle theme');

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.innerHTML = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    themeToggle.innerHTML = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Add to navigation
  const navContainer = document.querySelector('.nav-container');
  navContainer.appendChild(themeToggle);
}

// Initialize theme toggle
document.addEventListener('DOMContentLoaded', createThemeToggle);

// Add styles for theme toggle
const themeStyles = `
  .theme-toggle {
    background: none;
    border: none;
    font-size: 1.25rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }

  .theme-toggle:hover {
    background: var(--muted);
  }

  .dark-theme {
    --background: #0F172A;
    --foreground: #FAFAFA;
    --muted: #1E293B;
    --muted-foreground: #94A3B8;
    --border: #334155;
    --card: #1E293B;
  }

  .dark-theme .nav {
    background: rgba(15, 23, 42, 0.95);
    border-bottom-color: var(--border);
  }
`;

// Inject theme styles
const styleSheet = document.createElement('style');
styleSheet.textContent = themeStyles;
document.head.appendChild(styleSheet);

// Console welcome message
console.log('%c🐧 Welcome to Linux.org!', 'font-size: 20px; font-weight: bold; color: #0052FF;');
console.log('%cExplore the world of open source operating systems', 'font-size: 14px; color: #64748B;');
console.log('%cBuilt with HTML5, CSS3, and vanilla JavaScript', 'font-size: 12px; color: #94A3B8;');