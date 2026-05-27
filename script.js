/**
 * Jeevan Rekha Ortho Centre - Dr. Anshu Anand
 * Core Frontend Interactions Script (Ultra-Premium Redesign)
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     0. Ultra-Premium Doctor-Style Preloader Logic
     ========================================== */
  const preloader = document.getElementById('doctor-preloader');
  const progressFill = document.querySelector('.preloader-progress-fill');
  const percentText = document.querySelector('.status-percent');
  const statusLabel = document.querySelector('.status-label');
  
  if (preloader && progressFill && percentText && statusLabel) {
    let progress = 0;
    let windowLoaded = false;
    
    // Medical status steps to make loading highly realistic and immersive
    const steps = [
      { max: 20, text: "Sterilizing Environment..." },
      { max: 40, text: "Calibrating Joints & Implants..." },
      { max: 65, text: "Aligning Digital X-Ray Imaging..." },
      { max: 85, text: "Loading Patient Ortho Databases..." },
      { max: 98, text: "Finalizing Bone Trauma Modules..." },
      { max: 100, text: "Welcome to Jeevan Rekha!" }
    ];
    
    const updateStatusText = (prog) => {
      const step = steps.find(s => prog <= s.max);
      if (step) {
        statusLabel.innerText = step.text;
      }
    };

    // Incremental progress loop
    const loadingInterval = setInterval(() => {
      if (progress < 95) {
        // Increment faster initially, then slow down near completion to wait for actual load
        const increment = progress < 60 ? (Math.random() * 5 + 2) : (Math.random() * 1.5 + 0.3);
        progress = Math.min(95, progress + increment);
        
        progressFill.style.width = `${progress}%`;
        percentText.innerText = `${Math.floor(progress)}%`;
        updateStatusText(progress);
      }
    }, 40);

    const completePreloader = () => {
      clearInterval(loadingInterval);
      
      // Accelerate rapidly from current position to 100%
      let endProgress = progress;
      const endInterval = setInterval(() => {
        if (endProgress < 100) {
          endProgress += 4;
          if (endProgress >= 100) {
            endProgress = 100;
            clearInterval(endInterval);
            
            progressFill.style.width = '100%';
            percentText.innerText = '100%';
            statusLabel.innerText = "Welcome to Jeevan Rekha!";
            
            // Short visual feedback pause at 100%
            setTimeout(() => {
              preloader.classList.add('loaded');
              document.body.classList.remove('preloader-active');
              
              // De-render from DOM after exit animation ends (1.1s in style.css)
              setTimeout(() => {
                preloader.style.display = 'none';
              }, 1200);
            }, 450);
          } else {
            progressFill.style.width = `${endProgress}%`;
            percentText.innerText = `${Math.floor(endProgress)}%`;
            updateStatusText(endProgress);
          }
        }
      }, 20);
    };

    // Check if the window is already loaded or wait for it
    if (document.readyState === 'complete') {
      windowLoaded = true;
    } else {
      window.addEventListener('load', () => {
        windowLoaded = true;
      });
    }

    // Force animation display for a minimum of 2.2 seconds for branding absorption
    setTimeout(() => {
      const checkAndComplete = () => {
        if (windowLoaded) {
          completePreloader();
        } else {
          // Poll every 100ms until page is fully initialized
          setTimeout(checkAndComplete, 100);
        }
      };
      checkAndComplete();
    }, 2200);

    // Fail-safe backup timeout: Auto-dismiss after 6.5s to prevent soft-locks
    setTimeout(() => {
      if (!preloader.classList.contains('loaded')) {
        completePreloader();
      }
    }, 6500);
  }

  /* ==========================================
     1. Mobile Menu & Hamburger Navigation
     ========================================== */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navOverlay = document.getElementById('navOverlay');

  if (hamburger && navMenu) {
    const toggleMenu = () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      if (navOverlay) {
        navOverlay.classList.toggle('active');
      }
      document.body.classList.toggle('menu-open');
    };

    const closeMenu = () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      if (navOverlay) {
        navOverlay.classList.remove('active');
      }
      document.body.classList.remove('menu-open');
    };

    hamburger.addEventListener('click', toggleMenu);

    // Close mobile menu when nav links or CTA button is clicked
    const linksAndCtas = document.querySelectorAll('.nav-link, .mobile-nav-cta a');
    linksAndCtas.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking the backdrop overlay
    if (navOverlay) {
      navOverlay.addEventListener('click', closeMenu);
    }
  }


  /* ==========================================
     2. Sticky Header backdrop transition
     ========================================== */
  const header = document.querySelector('.main-header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });


  /* ==========================================
     3. Active Nav Links Scrollspy
     ========================================== */
  const sections = document.querySelectorAll('section, header');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120; // Nav offset padding

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (href === current) {
        link.classList.add('active');
      }
    });
  });


  /* ==========================================
     4. FAQ Accordion Toggle Logic
     ========================================== */
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = header.nextElementSibling;
      const isCurrentlyActive = item.classList.contains('active');

      // Collapse all accordion items in same group
      document.querySelectorAll('.accordion-item').forEach(accItem => {
        accItem.classList.remove('active');
        accItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
        accItem.querySelector('.accordion-body').style.maxHeight = '0';
      });

      // If clicked item wasn't active, expand it
      if (!isCurrentlyActive) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });


  /* ==========================================
     5. Intersection Observer Statistical Counters
     ========================================== */
  const statsElements = document.querySelectorAll('[data-target]');
  let countersAnimated = false;

  const animateCounters = () => {
    statsElements.forEach(el => {
      const targetVal = parseFloat(el.getAttribute('data-target'));
      const isFloat = targetVal % 1 !== 0;
      let currentVal = 0;
      const duration = 1800; // Counter sweep speed
      const increment = targetVal / (duration / 16); // ~60fps

      const updateCounter = () => {
        currentVal += increment;
        if (currentVal >= targetVal) {
          el.innerText = isFloat ? targetVal.toFixed(1) : Math.floor(targetVal);
        } else {
          el.innerText = isFloat ? currentVal.toFixed(1) : Math.floor(currentVal);
          requestAnimationFrame(updateCounter);
        }
      };

      updateCounter();
    });
  };

  const statsSection = document.querySelector('.stats-section');
  if (statsSection && statsElements.length > 0) {
    const observerOptions = {
      root: null,
      threshold: 0.15
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    statsObserver.observe(statsSection);
  }


  /* ==========================================
     6. Swipeable Testimonials Carousel Dot Logic
     ========================================== */
  const sliderContainer = document.querySelector('.testimonials-slider-container');
  const slideCards = document.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.querySelector('.carousel-dots');

  if (sliderContainer && slideCards.length > 0 && dotsContainer) {
    // Generate dot indicators dynamically
    dotsContainer.innerHTML = '';
    slideCards.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('carousel-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        const cardWidth = slideCards[0].offsetWidth + parseInt(window.getComputedStyle(slideCards[0]).marginRight || 0);
        sliderContainer.scrollTo({
          left: cardWidth * index,
          behavior: 'smooth'
        });
      });
      dotsContainer.appendChild(dot);
    });

    // Update active dot indicator on slider scroll
    let scrollTimeout;
    sliderContainer.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const cardWidth = slideCards[0].offsetWidth + parseInt(window.getComputedStyle(slideCards[0]).marginRight || 0);
        const index = Math.round(sliderContainer.scrollLeft / cardWidth);
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, idx) => {
          if (idx === index) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }, 50);
    });

    // Mobile touch drag enhancements
    let startX;
    let scrollLeft;
    let isDown = false;

    sliderContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      sliderContainer.classList.add('active-drag');
      startX = e.pageX - sliderContainer.offsetLeft;
      scrollLeft = sliderContainer.scrollLeft;
    });

    sliderContainer.addEventListener('mouseleave', () => {
      isDown = false;
      sliderContainer.classList.remove('active-drag');
    });

    sliderContainer.addEventListener('mouseup', () => {
      isDown = false;
      sliderContainer.classList.remove('active-drag');
    });

    sliderContainer.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - sliderContainer.offsetLeft;
      const walk = (x - startX) * 1.5; // Drag speed mult
      sliderContainer.scrollLeft = scrollLeft - walk;
    });

    // Testimonial arrow controls
    const testimonialsPrev = document.getElementById('testimonialsPrev');
    const testimonialsNext = document.getElementById('testimonialsNext');
    if (testimonialsPrev && testimonialsNext) {
      testimonialsPrev.addEventListener('click', () => {
        const cardWidth = slideCards[0].offsetWidth + parseInt(window.getComputedStyle(slideCards[0]).marginRight || 0);
        sliderContainer.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      });
      testimonialsNext.addEventListener('click', () => {
        const cardWidth = slideCards[0].offsetWidth + parseInt(window.getComputedStyle(slideCards[0]).marginRight || 0);
        if (sliderContainer.scrollLeft + sliderContainer.clientWidth >= sliderContainer.scrollWidth - 10) {
          sliderContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          sliderContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      });
      
      // Auto-slide on mobile
      setInterval(() => {
        if (window.innerWidth <= 991) {
          testimonialsNext.click();
        }
      }, 3500);
    }
  }


  /* ==========================================
     6.5 Services Slider Mobile Logic
     ========================================== */
  const servicesGrid = document.getElementById('servicesGrid');
  const servicesPrev = document.getElementById('servicesPrev');
  const servicesNext = document.getElementById('servicesNext');

  if (servicesGrid && servicesPrev && servicesNext) {
    servicesPrev.addEventListener('click', () => {
      const card = servicesGrid.querySelector('.service-card');
      if (card) {
        servicesGrid.scrollBy({ left: -(card.offsetWidth + 20), behavior: 'smooth' });
      }
    });
    
    servicesNext.addEventListener('click', () => {
      const card = servicesGrid.querySelector('.service-card');
      if (card) {
        if (servicesGrid.scrollLeft + servicesGrid.clientWidth >= servicesGrid.scrollWidth - 10) {
          servicesGrid.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          servicesGrid.scrollBy({ left: card.offsetWidth + 20, behavior: 'smooth' });
        }
      }
    });
    
    // Auto-slide on mobile
    setInterval(() => {
      if (window.innerWidth <= 991) {
        servicesNext.click();
      }
    }, 3000);
  }

  /* ==========================================
     7. Masonry-Style Gallery & Filter Tabs
     ========================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active states
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          item.classList.remove('hidden');
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.opacity = '1';
          }, 30);
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });


  /* ==========================================
     7.5 Gallery Slider Mobile Logic
     ========================================== */
  const galleryGrid = document.getElementById('galleryGrid');
  const galleryPrev = document.getElementById('galleryPrev');
  const galleryNext = document.getElementById('galleryNext');

  if (galleryGrid && galleryPrev && galleryNext) {
    galleryPrev.addEventListener('click', () => {
      const card = galleryGrid.querySelector('.gallery-item');
      if (card) {
        galleryGrid.scrollBy({ left: -(card.offsetWidth + 20), behavior: 'smooth' });
      }
    });
    
    galleryNext.addEventListener('click', () => {
      const card = galleryGrid.querySelector('.gallery-item');
      if (card) {
        if (galleryGrid.scrollLeft + galleryGrid.clientWidth >= galleryGrid.scrollWidth - 10) {
          galleryGrid.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          galleryGrid.scrollBy({ left: card.offsetWidth + 20, behavior: 'smooth' });
        }
      }
    });
    
    // Auto-slide on mobile
    setInterval(() => {
      if (window.innerWidth <= 991) {
        galleryNext.click();
      }
    }, 2500);
  }

  /* ==========================================
     8. Lightbox Overlay Animation
     ========================================== */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxCaption = document.getElementById('lightboxCaption');

  if (lightbox && lightboxImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', (e) => {
        // Prevent trigger if clicking visual overlays directly if needed
        const img = item.querySelector('.gallery-img');
        const captionText = item.querySelector('.gallery-item-title').innerText;
        
        lightbox.style.display = 'block';
        lightboxImg.src = img.src;
        lightboxCaption.innerText = captionText;
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    };

    lightboxClose.addEventListener('click', closeLightbox);

    // Close on clicking backdrop
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target === lightboxClose) {
        closeLightbox();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.style.display === 'block') {
        closeLightbox();
      }
    });
  }


  /* ==========================================
     9. Premium Glassmorphic Booking Form Engine
     ========================================== */
  const bookingForm = document.getElementById('appointmentForm');
  const successModal = document.getElementById('successModal');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');

  // Fields
  const bookingName = document.getElementById('bookingName');
  const bookingPhone = document.getElementById('bookingPhone');
  const bookingTreatment = document.getElementById('bookingTreatment');
  const bookingDate = document.getElementById('bookingDate');

  // Success targets
  const successName = document.getElementById('successName');
  const successTreatment = document.getElementById('successTreatment');
  const successPhone = document.getElementById('successPhone');
  const waConfirmBtn = document.getElementById('waConfirmBtn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;

      // Validate Name
      if (!bookingName.value.trim()) {
        bookingName.parentElement.classList.add('invalid');
        isValid = false;
      } else {
        bookingName.parentElement.classList.remove('invalid');
      }

      // Validate Phone (10 digits, starts with 6-9)
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(bookingPhone.value.trim())) {
        bookingPhone.parentElement.classList.add('invalid');
        isValid = false;
      } else {
        bookingPhone.parentElement.classList.remove('invalid');
      }

      // Check date
      if (!bookingDate.value) {
        bookingDate.parentElement.classList.add('invalid');
        isValid = false;
      } else {
        bookingDate.parentElement.classList.remove('invalid');
      }

      if (isValid) {
        const lead = {
          name: bookingName.value.trim(),
          phone: bookingPhone.value.trim(),
          treatment: bookingTreatment.value,
          date: bookingDate.value,
          timestamp: new Date().toISOString()
        };

        // Cache lead locally
        let leads = JSON.parse(localStorage.getItem('ortho_leads')) || [];
        leads.push(lead);
        localStorage.setItem('ortho_leads', JSON.stringify(leads));

        // Update modal values
        successName.innerText = lead.name;
        successTreatment.innerText = lead.treatment;
        successPhone.innerText = lead.phone;

        // Custom orthopaedic WhatsApp schedule message
        const waBaseUrl = 'https://wa.me/919470413484';
        const formattedDate = new Date(lead.date).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        });
        
        const rawMessage = `Hi Dr. Anshu Anand, I have successfully requested an appointment via your website.

*Jeevan Rekha Ortho Centre Booking Info:*
• *Patient Name*: ${lead.name}
• *Phone Number*: ${lead.phone}
• *Treatment/Specialty*: ${lead.treatment}
• *Preferred Date*: ${formattedDate}

Please confirm my scheduled time slot. Thank you!`;

        const encodedMessage = encodeURIComponent(rawMessage);
        waConfirmBtn.href = `${waBaseUrl}?text=${encodedMessage}`;

        // Show premium confirmation dialog
        successModal.classList.add('show');
      }
    });

    const resetAndClose = (e) => {
      if (e) e.preventDefault();
      successModal.classList.remove('show');
      bookingForm.reset();
      
      bookingName.parentElement.classList.remove('invalid');
      bookingPhone.parentElement.classList.remove('invalid');
      bookingDate.parentElement.classList.remove('invalid');
    };

    closeSuccessBtn.addEventListener('click', resetAndClose);
    
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        resetAndClose();
      }
    });
  }

  /* ==========================================
     11. Premium Collapsible Footer Accordions
     ========================================== */
  const footerHeaders = document.querySelectorAll('.footer-accordion-header');
  
  footerHeaders.forEach(header => {
    header.addEventListener('click', () => {
      // Toggle active class on header
      header.classList.toggle('active');
      
      // Toggle active class on accordion container
      const body = header.nextElementSibling;
      if (body && body.classList.contains('footer-accordion-body')) {
        body.classList.toggle('active');
        if (body.classList.contains('active')) {
          body.style.maxHeight = body.scrollHeight + 'px';
        } else {
          body.style.maxHeight = '0';
        }
      }
    });
  });

  /* ==========================================
     12. Social Icons Defensiveness Check
     ========================================== */
  const socialAnchors = document.querySelectorAll('.social-icons-premium a, .social-icons a');
  socialAnchors.forEach(anchor => {
    const hrefVal = anchor.getAttribute('href');
    if (!hrefVal || hrefVal === '#' || hrefVal === '' || hrefVal.trim() === '') {
      anchor.style.display = 'none';
      anchor.remove(); // Remove completely from the DOM for clean markup
    }
  });

});
