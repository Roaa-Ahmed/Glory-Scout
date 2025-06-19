document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const countdownEl = document.getElementById("countdown")
    const progressBar = document.getElementById("progress-bar")
  
    // Initial countdown value
    let countdown = 30
  
    // Update countdown and progress bar
    function updateCountdown() {
      countdownEl.textContent = countdown
  
      // Update progress bar width
      const progressWidth = (countdown / 10) * 100
      progressBar.style.width = `${progressWidth}%`
  
      // Decrement countdown
      countdown--
  
      // Check if countdown is finished
      if (countdown < 0) {
        clearInterval(countdownInterval)
        window.location.href = "login.html"
      }
    }
  
    // Start countdown
    const countdownInterval = setInterval(updateCountdown, 1000)
  
    // Animate elements on load
    function animateElements() {
      const elements = [
        document.querySelector(".title"),
        document.querySelector(".subtitle"),
        document.querySelector(".redirect-message"),
        document.querySelector(".action-buttons"),
        document.querySelector(".additional-options"),
      ]
  
      elements.forEach((element, index) => {
        if (element) {
          element.style.opacity = "0"
          element.style.transform = "translateY(20px)"
          element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  
          setTimeout(
            () => {
              element.style.opacity = "1"
              element.style.transform = "translateY(0)"
            },
            100 + index * 150,
          )
        }
      })
    }
  
    // Initialize animations
    animateElements()
  
    // Add event listeners to buttons
    const loginBtn = document.querySelector(".login-btn")
    const homeBtn = document.querySelector(".home-btn")
  
    if (loginBtn) {
      loginBtn.addEventListener("click", (e) => {
        e.preventDefault()
        clearInterval(countdownInterval)
  
        // Add loading state
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...'
        loginBtn.style.pointerEvents = "none"
  
        // Redirect after a short delay
        setTimeout(() => {
          window.location.href = "login.html"
        }, 500)
      })
    }
  
    if (homeBtn) {
      homeBtn.addEventListener("click", (e) => {
        e.preventDefault()
        clearInterval(countdownInterval)
  
        // Add loading state
        homeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...'
        homeBtn.style.pointerEvents = "none"
  
        // Redirect after a short delay
        setTimeout(() => {
          window.location.href = "home.html"
        }, 500)
      })
    }
  
    // Support link
    const supportLink = document.querySelector(".additional-options a")
    if (supportLink) {
      supportLink.addEventListener("click", (e) => {
        e.preventDefault()
  
        // Show support modal or redirect to support page
        alert("Support functionality would be implemented here.")
      })
    }
  })
  