document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const contactForm = document.getElementById("contact-form")
    const successModal = document.getElementById("success-modal")
    const errorModal = document.getElementById("error-modal")
    const modalCloseBtns = document.querySelectorAll(".modal-close-btn")
    const faqItems = document.querySelectorAll(".faq-item")
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const mainNav = document.querySelector(".main-nav")
  
    // Form submission
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault()
  
        // Get form data
        const formData = new FormData(this)
        const formValues = {}
  
        for (const [key, value] of formData.entries()) {
          formValues[key] = value
        }
  
        // Validate form
        if (!validateForm(formValues)) {
          return
        }
  
        // Show loading state
        const submitBtn = this.querySelector(".submit-btn")
        const originalBtnText = submitBtn.innerHTML
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
        submitBtn.disabled = true
  
        // Simulate API call (in a real app, you would send data to a server)
        setTimeout(() => {
          // 90% chance of success (for demo purposes)
          const isSuccess = Math.random() < 0.9
  
          // Reset button
          submitBtn.innerHTML = originalBtnText
          submitBtn.disabled = false
  
          if (isSuccess) {
            // Show success modal
            showModal(successModal)
            // Reset form
            contactForm.reset()
          } else {
            // Show error modal
            showModal(errorModal)
          }
        }, 2000)
      })
    }
  
    // Form validation
    function validateForm(formValues) {
      // Check name
      if (!formValues.name || formValues.name.trim().length < 2) {
        showError("Please enter a valid name (at least 2 characters)")
        return false
      }
  
      // Check email
      if (!validateEmail(formValues.email)) {
        showError("Please enter a valid email address")
        return false
      }
  
      // Check subject
      if (!formValues.subject || formValues.subject.trim().length < 3) {
        showError("Please enter a subject (at least 3 characters)")
        return false
      }
  
      // Check message
      if (!formValues.message || formValues.message.trim().length < 10) {
        showError("Please enter a message (at least 10 characters)")
        return false
      }
  
      return true
    }
  
    // Email validation
    function validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }
  
    // Show error message
    function showError(message) {
      // Create error element
      const errorElement = document.createElement("div")
      errorElement.className = "form-error"
      errorElement.textContent = message
      errorElement.style.color = "var(--error-color)"
      errorElement.style.fontSize = "14px"
      errorElement.style.marginTop = "10px"
      errorElement.style.animation = "shake 0.5s"
  
      // Add error element to form
      const submitBtn = contactForm.querySelector(".submit-btn")
      submitBtn.parentNode.insertBefore(errorElement, submitBtn)
  
      // Remove error after 3 seconds
      setTimeout(() => {
        errorElement.remove()
      }, 3000)
  
      // Add shake animation style
      const style = document.createElement("style")
      style.textContent = `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `
      document.head.appendChild(style)
    }
  
    // Show modal
    function showModal(modal) {
      modal.classList.add("show")
    }
  
    // Close modal
    function closeModal(modal) {
      modal.classList.remove("show")
    }
  
    // Modal close buttons
    modalCloseBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const modal = this.closest(".modal")
        closeModal(modal)
      })
    })
  
    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        closeModal(e.target)
      }
    })
  
  
  
    // Mobile menu toggle
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", () => {
        mainNav.classList.toggle("show")
  
        // Add mobile menu styles if not already added
        if (!document.getElementById("mobile-menu-styles")) {
          const mobileStyles = document.createElement("style")
          mobileStyles.id = "mobile-menu-styles"
          mobileStyles.textContent = `
            .main-nav.show {
              display: block;
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
              background-color: var(--card-bg);
              padding: 20px;
              border-radius: 0 0 20px 20px;
              box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            }
            
            .main-nav.show ul {
              flex-direction: column;
              gap: 15px;
            }
          `
          document.head.appendChild(mobileStyles)
        }
      })
    }
  
    // Animate elements on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(
        ".hero-section, .contact-section, .map-section, .faq-section, .connect-section",
      )
  
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const screenPosition = window.innerHeight / 1.3
  
        if (elementPosition < screenPosition) {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
        }
      })
    }
  
    // Set initial styles for animation
    const setupAnimations = () => {
      const elements = document.querySelectorAll(
        ".hero-section, .contact-section, .map-section, .faq-section, .connect-section",
      )
  
      elements.forEach((element) => {
        element.style.opacity = "0"
        element.style.transform = "translateY(20px)"
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      })
    }
  
    // Initialize animations
    setupAnimations()
  
    // Listen for scroll events
    window.addEventListener("scroll", animateOnScroll)
  
    // Trigger once on load
    animateOnScroll()
  
    // Form input animations
    const formInputs = document.querySelectorAll(".contact-form input, .contact-form textarea")
  
    formInputs.forEach((input) => {
      // Focus effect
      input.addEventListener("focus", function () {
        this.parentElement.style.transition = "transform 0.3s ease"
        this.parentElement.style.transform = "scale(1.02)"
      })
  
      // Blur effect
      input.addEventListener("blur", function () {
        this.parentElement.style.transform = "scale(1)"
      })
    })
  
    // Newsletter form
    const newsletterForm = document.querySelector(".newsletter-form")
  
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", function (e) {
        e.preventDefault()
  
        const emailInput = this.querySelector("input")
        const email = emailInput.value
  
        if (!validateEmail(email)) {
          // Show error
          alert("Please enter a valid email address")
          return
        }
  
        // Show success (in a real app, you would send this to a server)
        alert("Thank you for subscribing to our newsletter!")
        emailInput.value = ""
      })
    }
  })
  