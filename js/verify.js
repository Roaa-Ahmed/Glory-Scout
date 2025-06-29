document.addEventListener("DOMContentLoaded", () => {
    // Get email from localStorage (set in reset-password.js)
    const resetEmail = localStorage.getItem("resetEmail") || "your email"
  
    // Update subtitle to include the email
    const subtitle = document.querySelector("#verification-section .subtitle")
    if (subtitle) {
      subtitle.innerHTML = `We've sent a verification code to <strong>${resetEmail}</strong>. Please enter the code below to continue.`
    }
  
    // Elements
    const verificationSection = document.getElementById("verification-section")
    const newPasswordSection = document.getElementById("new-password-section")
    const successSection = document.getElementById("success-section")
    const verifyForm = document.getElementById("verify-form")
    const passwordForm = document.getElementById("password-form")
    const codeInputs = document.querySelectorAll(".code-input")
    const resendLink = document.getElementById("resend-link")
    const countdownEl = document.getElementById("countdown")
    const timerEl = document.getElementById("timer")
    const newPassword = document.getElementById("new-password")
    const confirmPassword = document.getElementById("confirm-password")
    const strengthSegments = document.querySelectorAll(".strength-segment")
    const passwordRequirements = {
      length: document.getElementById("req-length"),
      uppercase: document.getElementById("req-uppercase"),
      lowercase: document.getElementById("req-lowercase"),
      number: document.getElementById("req-number"),
      special: document.getElementById("req-special"),
    }
    const visibilityIcons = document.querySelectorAll(".visibility-icon")
  
    // Show the verification section by default
    verificationSection.classList.add("active")
  
    // For demo purposes - the correct verification code
    const correctCode = "123456"
  
    // Handle code input
    codeInputs.forEach((input, index) => {
      // Focus on input when clicked
      input.addEventListener("click", function () {
        this.select()
      })
  
      // Handle input
      input.addEventListener("input", function (e) {
        const value = e.target.value
  
        // Only allow numbers
        if (!/^\d*$/.test(value)) {
          this.value = ""
          return
        }
  
        // Auto focus next input
        if (value && index < codeInputs.length - 1) {
          codeInputs[index + 1].focus()
        }
  
        // Remove error class if present
        this.classList.remove("error")
      })
  
      // Handle backspace
      input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && !this.value && index > 0) {
          codeInputs[index - 1].focus()
        }
      })
  
      // Handle paste
      input.addEventListener("paste", (e) => {
        e.preventDefault()
        const pasteData = e.clipboardData.getData("text")
        const numbers = pasteData.match(/\d/g)
  
        if (numbers) {
          codeInputs.forEach((input, i) => {
            if (numbers[i]) {
              input.value = numbers[i]
            }
          })
  
          // Focus on the last filled input or the next empty one
          const lastFilledIndex = Math.min(numbers.length - 1, codeInputs.length - 1)
          codeInputs[lastFilledIndex].focus()
        }
      })
    })
  
    // Countdown timer for resend code
    let countdown = 60
    let countdownInterval
  
    function startCountdown() {
      countdown = 60
      timerEl.textContent = countdown
      countdownEl.style.display = "block"
      resendLink.style.pointerEvents = "none"
      resendLink.style.opacity = "0.5"
  
      countdownInterval = setInterval(() => {
        countdown--
        timerEl.textContent = countdown
  
        if (countdown <= 0) {
          clearInterval(countdownInterval)
          countdownEl.style.display = "none"
          resendLink.style.pointerEvents = "auto"
          resendLink.style.opacity = "1"
        }
      }, 1000)
    }
  
    // Start countdown on page load
    startCountdown()
  
    // Resend code
    resendLink.addEventListener("click", (e) => {
      e.preventDefault()
      showNotification("Verification code resent to your email", "success")
      startCountdown()
    })
  
    // Verify code form submission
    verifyForm.addEventListener("submit", function (e) {
      e.preventDefault()
  
      // Get entered code
      let enteredCode = ""
      codeInputs.forEach((input) => {
        enteredCode += input.value
      })
  
      // Check if code is complete
      if (enteredCode.length !== 6) {
        showNotification("Please enter the complete 6-digit code", "error")
        return
      }
  
      // Verify code (for demo purposes)
      if (enteredCode === correctCode) {
        // Show loading state
        const verifyBtn = this.querySelector(".verify-btn")
        verifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...'
        verifyBtn.disabled = true
  
        // Simulate API verification
        setTimeout(() => {
          // Hide verification section and show new password section
          verificationSection.classList.remove("active")
          newPasswordSection.classList.add("active")
        }, 1500)
      } else {
        // Show error
        codeInputs.forEach((input) => {
          input.classList.add("error")
        })
        showNotification("Invalid verification code. Please try again.", "error")
      }
    })
  
    // Toggle password visibility
    visibilityIcons.forEach((icon) => {
      icon.addEventListener("click", function () {
        const inputId = this.getAttribute("data-for")
        const input = document.getElementById(inputId)
        const iconEl = this.querySelector("i")
  
        if (input.type === "password") {
          input.type = "text"
          iconEl.classList.remove("fa-eye")
          iconEl.classList.add("fa-eye-slash")
        } else {
          input.type = "password"
          iconEl.classList.remove("fa-eye-slash")
          iconEl.classList.add("fa-eye")
        }
      })
    })
  
    // Password strength checker
    function checkPasswordStrength(password) {
      let strength = 0
      const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
      }
  
      // Update requirement indicators
      for (const [key, isValid] of Object.entries(requirements)) {
        if (isValid) {
          passwordRequirements[key].classList.add("valid")
          strength++
        } else {
          passwordRequirements[key].classList.remove("valid")
        }
      }
  
      // Update strength meter
      strengthSegments.forEach((segment, index) => {
        segment.classList.remove("weak", "medium", "strong")
  
        if (index < strength) {
          if (strength <= 2) {
            segment.classList.add("weak")
          } else if (strength <= 4) {
            segment.classList.add("medium")
          } else {
            segment.classList.add("strong")
          }
        }
      })
  
      return strength
    }
  
    // Password input event
    if (newPassword) {
      newPassword.addEventListener("input", function () {
        checkPasswordStrength(this.value)
      })
    }
  
    // New password form submission
    passwordForm.addEventListener("submit", function (e) {
      e.preventDefault()
  
      const password = newPassword.value
      const confirmPwd = confirmPassword.value
  
      // Check password strength
      const strength = checkPasswordStrength(password)
  
      if (strength < 3) {
        showNotification("Please create a stronger password", "warning")
        return
      }
  
      // Check if passwords match
      if (password !== confirmPwd) {
        showNotification("Passwords do not match", "error")
        return
      }
  
      // Show loading state
      const resetBtn = this.querySelector(".reset-btn")
      resetBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Resetting...'
      resetBtn.disabled = true
  
      // Simulate API call
      setTimeout(() => {
        // Hide new password section and show success section
        newPasswordSection.classList.remove("active")
        successSection.classList.add("active")
      }, 1500)
    })
  
    // Show notification function
    function showNotification(message, type) {
      // Check if notification already exists and remove it
      const existingNotification = document.querySelector(".notification")
      if (existingNotification) {
        existingNotification.remove()
      }
  
      // Create notification element
      const notification = document.createElement("div")
      notification.className = `notification ${type}`
      notification.textContent = message
  
      // Add to body
      document.body.appendChild(notification)
  
      // Show notification
      setTimeout(() => {
        notification.classList.add("show")
      }, 10)
  
      // Hide and remove notification after 3 seconds
      setTimeout(() => {
        notification.classList.remove("show")
        setTimeout(() => {
          notification.remove()
        }, 300)
      }, 3000)
    }
  })
  