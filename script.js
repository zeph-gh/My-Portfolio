// Modern Portfolio JavaScript with Advanced Animations

document.addEventListener('DOMContentLoaded', function () {
  initializePortfolio()
})

function initializePortfolio() {
  // Initialize all components
  initCustomCursor()
  initLoadingScreen()
  initNavigation()
  initTypingAnimation()
  initScrollAnimations()
  initTabSwitching()
  initContactForm()
  initSmoothScrolling()
  initParticleBackground()
}

// Custom Cursor
function initCustomCursor() {
  if (window.innerWidth > 768) {
    const cursor = document.querySelector('.cursor')
    const cursorFollower = document.querySelector('.cursor-follower')

    if (cursor && cursorFollower) {
      document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px'
        cursor.style.top = e.clientY + 'px'

        setTimeout(() => {
          cursorFollower.style.left = e.clientX + 'px'
          cursorFollower.style.top = e.clientY + 'px'
        }, 100)
      })

      // Hover effects
      const hoverElements = document.querySelectorAll(
        'a, button, .project-card, .tech-item'
      )
      hoverElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          cursor.style.transform = 'scale(1.5)'
          cursorFollower.style.transform = 'scale(1.5)'
        })

        el.addEventListener('mouseleave', () => {
          cursor.style.transform = 'scale(1)'
          cursorFollower.style.transform = 'scale(1)'
        })
      })
    }
  }
}

// Loading Screen
function initLoadingScreen() {
  const loadingScreen = document.querySelector('.loading-screen')

  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('hidden')
      setTimeout(() => {
        loadingScreen.style.display = 'none'
      }, 500)
    }, 1500)
  })
}

// Navigation
function initNavigation() {
  const navbar = document.querySelector('.navbar')
  const navToggle = document.querySelector('.nav-toggle')
  const navMenu = document.querySelector('.nav-menu')
  const navLinks = document.querySelectorAll('.nav-link')

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled')
    } else {
      navbar.classList.remove('scrolled')
    }
  })

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active')
    navMenu.classList.toggle('active')
  })

  // Close mobile menu when clicking on links
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active')
      navMenu.classList.remove('active')
    })
  })

  // Active link highlighting
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section')
    const scrollPos = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute('id')

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active')
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active')
          }
        })
      }
    })
  })
}

// Typing Animation
function initTypingAnimation() {
  const typingElement = document.querySelector('.typing-text')
  if (!typingElement) return

  const texts = [
    'Full-Stack Developer',
    'React Specialist',
    'Problem Solver',
    'Tech Enthusiast',
  ]

  let textIndex = 0
  let charIndex = 0
  let isDeleting = false
  const typingSpeed = 100
  const deletingSpeed = 50
  const pauseTime = 2000

  function typeText() {
    const currentText = texts[textIndex]

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
    }

    let speed = isDeleting ? deletingSpeed : typingSpeed

    if (!isDeleting && charIndex === currentText.length) {
      speed = pauseTime
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
    }

    setTimeout(typeText, speed)
  }

  typeText()
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active')
      }
    })
  }, observerOptions)

  // Observe elements for scroll animations
  const animatedElements = document.querySelectorAll(`
    .section-header,
    .about-content,
    .project-card,
    .contact-content,
    .tech-item,
    .experience-item
  `)

  animatedElements.forEach((el) => {
    el.classList.add('reveal')
    observer.observe(el)
  })

  // Parallax effect for floating shapes
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset
    const shapes = document.querySelectorAll('.shape')

    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.5
      const yPos = -(scrolled * speed)
      shape.style.transform = `translateY(${yPos}px) rotate(${
        scrolled * 0.1
      }deg)`
    })
  })
}

// Tab Switching (About Section)
function initTabSwitching() {
  // For new tab structure
  const tabButtons = document.querySelectorAll('.tab-button')
  const tabContents = document.querySelectorAll('.tab-content')

  function openTab(tabName) {
    // Remove active class from all buttons and contents
    tabButtons.forEach((btn) => btn.classList.remove('active'))
    tabContents.forEach((content) => content.classList.remove('active'))

    // Add active class to clicked button and corresponding content
    const activeButton = document.querySelector(
      `[onclick="openTab('${tabName}')"]`
    )
    const activeContent = document.getElementById(tabName)

    if (activeButton) activeButton.classList.add('active')
    if (activeContent) activeContent.classList.add('active')
  }

  // Make openTab function global for onclick handlers
  window.openTab = openTab

  tabButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault()
      const tabName = button.getAttribute('onclick').match(/'([^']+)'/)[1]
      openTab(tabName)
    })
  })
}

// Contact Form
function initContactForm() {
  const scriptURL =
    'https://script.google.com/macros/s/AKfycbx5WGI_0fVsT7x2V43Ewep3Q5AIfpsH2XljRNZDJ6ZUPAyI1bClu2lUd9Z2S_m-JMKvIA/exec'
  const form = document.forms['submit-to-google-sheet']
  const msg = document.getElementById('msg')
  const submitBtn = form.querySelector('button[type="submit"]')

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault()

      // Show loading state
      const originalText = submitBtn.innerHTML
      submitBtn.innerHTML =
        '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>'
      submitBtn.disabled = true

      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then((response) => {
          msg.innerHTML =
            "Message sent successfully! I'll get back to you soon."
          msg.classList.add('show')
          setTimeout(() => {
            msg.classList.remove('show')
          }, 5000)
          form.reset()

          // Trigger success animation
          submitBtn.style.background = 'var(--gradient-secondary)'
          setTimeout(() => {
            submitBtn.style.background = ''
          }, 2000)
        })
        .catch((error) => {
          console.error('Error!', error.message)
          msg.innerHTML = 'Oops! Something went wrong. Please try again.'
          msg.style.background = 'rgba(244, 63, 94, 0.1)'
          msg.style.color = '#f43f5e'
          msg.style.borderColor = 'rgba(244, 63, 94, 0.2)'
          msg.classList.add('show')
        })
        .finally(() => {
          // Restore button
          submitBtn.innerHTML = originalText
          submitBtn.disabled = false
        })
    })

    // Form field animations
    const formGroups = document.querySelectorAll('.form-group')
    formGroups.forEach((group) => {
      const input = group.querySelector('input, textarea')
      const label = group.querySelector('label')

      if (input && label) {
        input.addEventListener('focus', () => {
          group.classList.add('focused')
        })

        input.addEventListener('blur', () => {
          if (!input.value) {
            group.classList.remove('focused')
          }
        })
      }
    })
  }
}

// Smooth Scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()

      const targetId = link.getAttribute('href')
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80 // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        })
      }
    })
  })
}

// Particle Background Effect
function initParticleBackground() {
  const heroSection = document.querySelector('.hero')
  if (!heroSection) return

  const particleCount = 50
  const particles = []

  // Create particle container
  const particleContainer = document.createElement('div')
  particleContainer.style.position = 'absolute'
  particleContainer.style.top = '0'
  particleContainer.style.left = '0'
  particleContainer.style.width = '100%'
  particleContainer.style.height = '100%'
  particleContainer.style.pointerEvents = 'none'
  particleContainer.style.zIndex = '-1'
  heroSection.appendChild(particleContainer)

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.style.position = 'absolute'
    particle.style.width = Math.random() * 4 + 1 + 'px'
    particle.style.height = particle.style.width
    particle.style.background = 'rgba(100, 255, 218, 0.3)'
    particle.style.borderRadius = '50%'
    particle.style.left = Math.random() * 100 + '%'
    particle.style.top = Math.random() * 100 + '%'

    particles.push({
      element: particle,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    })

    particleContainer.appendChild(particle)
  }

  // Animate particles
  function animateParticles() {
    particles.forEach((particle) => {
      particle.x += particle.vx
      particle.y += particle.vy

      // Bounce off edges
      if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1
      if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1

      particle.element.style.left = particle.x + 'px'
      particle.element.style.top = particle.y + 'px'
    })

    requestAnimationFrame(animateParticles)
  }

  animateParticles()
}

// Utility Functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Performance optimized scroll handler
const optimizedScrollHandler = debounce(() => {
  // Add any scroll-dependent animations here
}, 16)

window.addEventListener('scroll', optimizedScrollHandler)

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close mobile menu if open
    const navToggle = document.querySelector('.nav-toggle')
    const navMenu = document.querySelector('.nav-menu')

    if (navMenu.classList.contains('active')) {
      navToggle.classList.remove('active')
      navMenu.classList.remove('active')
    }
  }
})

// Prevent FOUC (Flash of Unstyled Content)
document.documentElement.style.visibility = 'visible'
