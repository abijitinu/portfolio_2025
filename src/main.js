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

    // Slider Element
    const slider = document.createElement('div');
    slider.className = 'toggle-slider';
    toggleDiv.appendChild(slider);

    const designerBtn = document.createElement('a');
    designerBtn.className = isArtist ? 'toggle-btn' : 'toggle-btn active';
    designerBtn.innerHTML = '<span class="desktop-text">Designer</span><span class="mobile-text">D</span>';
    designerBtn.href = '/';
    // Prevent default and animate before navigation
    designerBtn.addEventListener('click', (e) => {
      if (isArtist) {
        e.preventDefault();
        updateSlider(designerBtn);
        setTimeout(() => window.location.href = '/', 300);
      }
    });

    const artistBtn = document.createElement('a');
    artistBtn.className = isArtist ? 'toggle-btn active' : 'toggle-btn';
    artistBtn.innerHTML = '<span class="desktop-text">Artist</span><span class="mobile-text">A</span>';
    artistBtn.href = '/artist.html';
    // Prevent default and animate before navigation
    artistBtn.addEventListener('click', (e) => {
      if (!isArtist) {
        e.preventDefault();
        updateSlider(artistBtn);
        setTimeout(() => window.location.href = '/artist.html', 300);
      }
    });

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

    const textSpan = document.createElement('span');
    textSpan.className = 'status-text';
    textSpan.textContent = isWorkHours ? 'Online' : 'Offline';

    statusDiv.appendChild(dot);
    statusDiv.appendChild(textSpan);

    // Append to nav-tools: Status, Toggle
    navTools.appendChild(statusDiv);
    navTools.appendChild(toggleDiv);

    // Add margin to status
    statusDiv.style.marginRight = '20px';

    // Function to update slider position
    function updateSlider(activeBtn) {
      if (!activeBtn) return;

      // We need to wait for layout if it's not yet attached or rendered
      requestAnimationFrame(() => {
        const paddingLeft = 4; // matches CSS .mode-toggle padding
        const left = activeBtn.offsetLeft;
        const width = activeBtn.offsetWidth;

        slider.style.transform = `translateX(${left}px)`;
        slider.style.width = `${width}px`;
        slider.style.opacity = '1'; // Show slider after positioning
      });
    }

    // Initial update
    const activeBtn = isArtist ? artistBtn : designerBtn;
    // Use RAF to ensure DOM is ready
    requestAnimationFrame(() => updateSlider(activeBtn));

    // Update on resize
    window.addEventListener('resize', () => {
      const currentActive = toggleDiv.querySelector('.toggle-btn.active');
      updateSlider(currentActive);
    });
  }

  // Scroll Animation Observer
  const scrollObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, scrollObserverOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    scrollObserver.observe(el);
  });

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

  // Custom Cursor Logic
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  // Move cursor
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Hover effect for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .card, .toggle-btn, input, textarea, select');

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });

  // Re-apply listeners for dynamically added elements (like the toggle buttons) if needed, 
  // or use event delegation. For now, since toggle buttons are added via JS, we might need to target them specifically or use delegation.
  // Using delegation for robustness:
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, .card, .toggle-btn, input, textarea, select')) {
      cursor.classList.add('hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, .card, .toggle-btn, input, textarea, select')) {
      cursor.classList.remove('hover');
    }
  });

  // Hamburger Menu Logic
  const navTop = document.querySelector('.nav-top');
  const navBottom = document.querySelector('.nav-bottom');

  if (navTop && navBottom) {
    // Check if hamburger already exists to avoid duplicates
    if (!document.querySelector('.hamburger')) {
      const hamburger = document.createElement('div');
      hamburger.className = 'hamburger';
      hamburger.innerHTML = '<span></span><span></span><span></span>';

      // Append to nav-top
      navTop.appendChild(hamburger);

      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navBottom.classList.toggle('active');

        // Prevent scrolling when menu is open
        if (navBottom.classList.contains('active')) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      });

      // Close menu when clicking a link
      const navLinks = navBottom.querySelectorAll('a');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navBottom.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }
  }

  // Handle Resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      const hamburger = document.querySelector('.hamburger');
      if (hamburger) hamburger.classList.remove('active');
      if (navBottom) navBottom.classList.remove('active');
      document.body.style.overflow = '';
    }
  });



});
