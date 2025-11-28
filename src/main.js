// Main JavaScript

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Adjust offset for sticky header
      const headerOffset = 100;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
});

// TOC Active State Observer
const observerOptions = {
  root: null,
  rootMargin: '-20% 0px -60% 0px', // Activate when section is in the top part of viewport
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Remove active class from all links
      document.querySelectorAll('.toc-link').forEach(link => {
        link.classList.remove('active');
      });

      // Add active class to corresponding link
      const id = entry.target.getAttribute('id');
      const activeLink = document.querySelector(`.toc-link[href="#${id}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}, observerOptions);

// Observe all sections that have an ID
document.querySelectorAll('section[id]').forEach(section => {
  observer.observe(section);
});

document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio 2025 loaded');

  // Highlight active nav link
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.style.color = 'var(--color-text)';
      link.style.opacity = '1';
    }
  });

  // Status Indicator Logic
  const navTools = document.querySelector('.nav-tools');
  if (navTools) {
    // Mode Toggle
    const toggleDiv = document.createElement('div');
    toggleDiv.className = 'mode-toggle';

    const isArtist = window.location.pathname.includes('artist');

    const designerBtn = document.createElement('a');
    designerBtn.className = isArtist ? 'toggle-btn' : 'toggle-btn active';
    designerBtn.textContent = 'Designer';
    designerBtn.href = '/';

    const artistBtn = document.createElement('a');
    artistBtn.className = isArtist ? 'toggle-btn active' : 'toggle-btn';
    artistBtn.textContent = 'Artist';
    artistBtn.href = '/artist.html';

    toggleDiv.appendChild(designerBtn);
    toggleDiv.appendChild(artistBtn);

    const statusDiv = document.createElement('div');
    statusDiv.className = 'status-indicator';

    // Calculate UK Time
    const now = new Date();
    const ukTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/London" }));
    const hours = ukTime.getHours();
    const day = ukTime.getDay(); // 0 is Sunday, 6 is Saturday

    // 9 AM to 5 PM (17:00), Mon-Fri
    const isWorkHours = hours >= 9 && hours < 17 && day !== 0 && day !== 6;

    const dot = document.createElement('span');
    dot.className = isWorkHours ? 'status-dot online' : 'status-dot';

    const text = document.createTextNode(isWorkHours ? 'Online' : 'Offline');

    statusDiv.appendChild(dot);
    statusDiv.appendChild(text);

    // Append to nav-tools: Status, Toggle
    navTools.appendChild(statusDiv);
    navTools.appendChild(toggleDiv);

    // Add margin to status
    statusDiv.style.marginRight = '20px';
  }

  // Simple scroll animation for elements
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Filter Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category');
          if (filterValue === 'all' || (categories && categories.includes(filterValue))) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

});
