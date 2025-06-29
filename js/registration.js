document.addEventListener("DOMContentLoaded", () => {
    // Get player information from localStorage or URL parameters
    // In a real application, this would come from your backend
    const playerName = getPlayerName() || "Player"
    const playerEmail = getPlayerEmail() || "your email address"
  
    // Update player information in the DOM
    document.getElementById("player-name").textContent = playerName
    document.getElementById("player-email").textContent = playerEmail
  
    // Create confetti effect
    createConfetti()
  
    // Animate elements on load
    animateElements()
  
    // Add event listeners to buttons
    setupButtonListeners()
  
    // Functions
    function getPlayerName() {
      // Try to get from URL parameters
      const urlParams = new URLSearchParams(window.location.search)
      const nameFromUrl = urlParams.get("name")
  
      // Try to get from localStorage
      const nameFromStorage = localStorage.getItem("playerName")
  
      // Return the first available value
      return nameFromUrl || nameFromStorage || null
    }
  
    function getPlayerEmail() {
      // Try to get from URL parameters
      const urlParams = new URLSearchParams(window.location.search)
      const emailFromUrl = urlParams.get("email")
  
      // Try to get from localStorage
      const emailFromStorage = localStorage.getItem("playerEmail")
  
      // Return the first available value
      return emailFromUrl || emailFromStorage || null
    }
  
    function createConfetti() {
      const container = document.getElementById("confetti-container")
      const colors = ["#4ade80", "#ec4899", "#f59e0b", "#3b82f6", "#a855f7"]
  
      // Create 50 confetti pieces
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div")
        confetti.className = "confetti"
  
        // Random position
        confetti.style.left = `${Math.random() * 100}%`
  
        // Random delay
        confetti.style.animationDelay = `${Math.random() * 3}s`
  
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)]
        confetti.style.backgroundColor = color
  
        // Random size
        const size = Math.random() * 10 + 5
        confetti.style.width = `${size}px`
        confetti.style.height = `${size}px`
  
        // Random rotation
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`
  
        // Add to container
        container.appendChild(confetti)
      }
    }
  
    function animateElements() {
      const elements = [
        document.querySelector(".title"),
        document.querySelector(".subtitle"),
        document.querySelector(".welcome-message"),
        document.querySelector(".next-steps"),
        document.querySelector(".action-buttons"),
        document.querySelector(".email-notification"),
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
  
    function setupButtonListeners() {
      const dashboardBtn = document.querySelector(".dashboard-btn")
      const profileBtn = document.querySelector(".profile-btn")
  
      if (dashboardBtn) {
        dashboardBtn.addEventListener("click", (e) => {
          e.preventDefault()
  
          // Add loading state
          dashboardBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading Dashboard...'
          dashboardBtn.style.pointerEvents = "none"
  
          // Redirect after a short delay
          setTimeout(() => {
            window.location.href = "home player.html"
          }, 500)
        })
      }
  
      if (profileBtn) {
        profileBtn.addEventListener("click", (e) => {
          e.preventDefault()
  
          // Add loading state
          profileBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading Profile...'
          profileBtn.style.pointerEvents = "none"
  
          // Redirect after a short delay
          setTimeout(() => {
            window.location.href = "edit.html"
          }, 500)
        })
      }
    }
  })
  