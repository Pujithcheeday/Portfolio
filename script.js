// ==================== ULTIMATE PORTFOLIO INTERACTIONS ====================

// ==================== PRELOADER ====================
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.classList.add('loaded');
  }, 2000);
});

// ==================== CUSTOM CURSOR ====================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  // Smooth cursor following
  cursorX += (mouseX - cursorX) * 0.3;
  cursorY += (mouseY - cursorY) * 0.3;
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  
  cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
  cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
  
  requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .magnetic-btn, .card, input, textarea');
hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ==================== SCROLL PROGRESS ====================
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  scrollProgress.style.width = `${scrolled}%`;
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Hide navbar on scroll down, show on scroll up
  if (currentScroll > lastScroll && currentScroll > 500) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  
  lastScroll = currentScroll;
});

// ==================== THEME TOGGLE ====================
const themeToggle = document.querySelector('.theme-btn');
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  document.body.classList.add(savedTheme);
}

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ==================== MAGNETIC BUTTON EFFECT ====================
const magneticElements = document.querySelectorAll('.magnetic-btn');

magneticElements.forEach(element => {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'translate(0, 0)';
  });
});

// ==================== CANVAS BACKGROUND ANIMATION ====================
const canvas = document.getElementById('canvas-background');
if (canvas) {
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const particleCount = 80;
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
      if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }
    
    draw() {
      ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  function init() {
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  
  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / 120)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    connectParticles();
    requestAnimationFrame(animate);
  }
  
  init();
  animate();
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ==================== PARTICLES IN HERO ====================
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 5 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 15}s`;
    particle.style.animationDuration = `${Math.random() * 10 + 15}s`;
    particle.style.position = 'absolute';
    particle.style.background = 'rgba(99, 102, 241, 0.3)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    
    particlesContainer.appendChild(particle);
  }
}

// ==================== TYPING ANIMATION ====================
const typingText = document.querySelector('.typing-text');
if (typingText) {
  const text = typingText.textContent;
  typingText.textContent = '';
  
  let charIndex = 0;
  function typeWriter() {
    if (charIndex < text.length) {
      typingText.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 100);
    }
  }
  
  setTimeout(typeWriter, 1000);
}

// ==================== SCROLL REVEAL ANIMATIONS ====================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ==================== ANIMATED STATISTICS COUNTER ====================
const statNumbers = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasAnimated) {
      hasAnimated = true;
      
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            stat.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            stat.textContent = target + '+';
          }
        };
        
        updateCounter();
      });
    }
  });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('#about');
if (aboutSection) statsObserver.observe(aboutSection);

// ==================== SKILL BAR ANIMATION ====================
const skillBars = document.querySelectorAll('.bar-fill');

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bars = entry.target.querySelectorAll('.bar-fill');
      bars.forEach((bar, index) => {
        setTimeout(() => {
          const width = bar.style.width || bar.getAttribute('data-width');
          bar.style.width = width;
        }, index * 100);
      });
      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('#skills');
if (skillsSection) skillsObserver.observe(skillsSection);

// ==================== PROJECT CARD 3D TILT EFFECT ====================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
  });
});

// ==================== PARALLAX EFFECT ====================
const parallaxElements = document.querySelectorAll('[data-depth]');

window.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX / window.innerWidth - 0.5;
  const mouseY = e.clientY / window.innerHeight - 0.5;
  
  parallaxElements.forEach(el => {
    const depth = el.getAttribute('data-depth');
    const moveX = mouseX * depth * 50;
    const moveY = mouseY * depth * 50;
    
    el.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});

// ==================== CONTACT FORM HANDLING ====================
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create mailto link
    const mailtoLink = `mailto:pujithcheeday@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    
    status.textContent = '✉️ Opening email client...';
    status.style.color = 'var(--primary-color)';
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Show success message
    setTimeout(() => {
      status.textContent = '✅ Email client opened! Complete sending in your email app.';
      status.style.color = 'var(--accent-color)';
      form.reset();
      
      setTimeout(() => {
        status.textContent = '';
      }, 5000);
    }, 1000);
  });
}

// ==================== SCROLL TO TOP BUTTON ====================
const scrollTopBtn = document.getElementById('scroll-top');

if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==================== SPLIT TEXT ANIMATION ====================
const splitTextElements = document.querySelectorAll('.split-text');

splitTextElements.forEach(element => {
  const text = element.textContent;
  element.innerHTML = '';
  
  text.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.animationDelay = `${index * 0.05}s`;
    element.appendChild(span);
  });
});

// ==================== GLITCH EFFECT ON LOGO ====================
const logo = document.querySelector('.logo.glitch');

if (logo) {
  setInterval(() => {
    logo.style.animation = 'none';
    setTimeout(() => {
      logo.style.animation = 'glitch 500ms';
    }, 10);
  }, 5000);
}

// ==================== MOBILE MENU ====================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// ==================== CONSOLE EASTER EGG ====================
console.log('%c👋 Hi there, Developer!', 'color: #6366f1; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
console.log('%c🚀 Looking at the code? I like your style!', 'color: #ec4899; font-size: 16px;');
console.log('%c💼 Let\'s connect: pujithsai@example.com', 'color: #10b981; font-size: 14px;');
console.log('%c⚡ Built with passion, powered by coffee ☕', 'color: #f59e0b; font-size: 14px;');

// Performance Optimization - Debounce function
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

// Optimized Scroll Handler
const optimizedScroll = debounce(() => {
  // Add any additional scroll-based animations here
}, 100);

window.addEventListener('scroll', optimizedScroll);

// ==================== PAGE TRANSITION EFFECT ====================
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// ==================== LAZY LOADING IMAGES ====================
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// ==================== ENHANCED HOVER EFFECTS ====================
document.querySelectorAll('.card, .stat-card, .tech-item').forEach(element => {
  element.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});

console.log('%c✨ Portfolio Loaded Successfully!', 'color: #6366f1; font-size: 18px; font-weight: bold;');


