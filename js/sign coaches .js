document.addEventListener('DOMContentLoaded', function() {
    // Password Toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });
    
    // File Upload
    const fileInput = document.getElementById('profileImage');
    const fileName = document.querySelector('.file-name');
    
    if (fileInput && fileName) {
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                fileName.textContent = this.files[0].name;
                
                // Preview image if needed
                const reader = new FileReader();
                reader.onload = function(e) {
                    // You can add image preview here if needed
                    // const preview = document.createElement('img');
                    // preview.src = e.target.result;
                    // document.querySelector('.preview-container').appendChild(preview);
                };
                reader.readAsDataURL(this.files[0]);
            } else {
                fileName.textContent = 'No File Chosen';
            }
        });
    }
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            // Create mobile menu if it doesn't exist
            if (!document.querySelector('.mobile-menu')) {
                createMobileMenu();
            }
            
            const mobileMenu = document.querySelector('.mobile-menu');
            mobileMenu.classList.add('active');
        });
    }
    
    // Testimonial Slider
    const testimonialCards = document.querySelector('.testimonial-cards');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    
    if (testimonialCards && prevBtn && nextBtn) {
        let currentIndex = 0;
        const totalSlides = document.querySelectorAll('.testimonial-card').length;
        
        // Clone the testimonial cards for infinite loop
        const cloneCards = () => {
            const cards = document.querySelectorAll('.testimonial-card');
            cards.forEach(card => {
                const clone = card.cloneNode(true);
                testimonialCards.appendChild(clone);
            });
        };
        
        // Initialize slider
        const initSlider = () => {
            // Set width for each card
            const cards = document.querySelectorAll('.testimonial-card');
            const cardWidth = 100 / cards.length;
            cards.forEach(card => {
                card.style.flex = `0 0 ${cardWidth}%`;
            });
            
            // Set width for the slider
            testimonialCards.style.width = `${cards.length * 100}%`;
        };
        
        // Move to slide
        const moveToSlide = (index) => {
            const cards = document.querySelectorAll('.testimonial-card');
            const cardWidth = 100 / cards.length;
            testimonialCards.style.transform = `translateX(-${index * cardWidth}%)`;
            currentIndex = index;
        };
        
        // Next slide
        nextBtn.addEventListener('click', () => {
            const cards = document.querySelectorAll('.testimonial-card');
            if (currentIndex === cards.length - 1) {
                // Reset to first slide instantly without animation
                testimonialCards.style.transition = 'none';
                moveToSlide(0);
                setTimeout(() => {
                    testimonialCards.style.transition = 'transform 0.5s ease';
                }, 10);
            } else {
                moveToSlide(currentIndex + 1);
            }
        });
        
        // Previous slide
        prevBtn.addEventListener('click', () => {
            const cards = document.querySelectorAll('.testimonial-card');
            if (currentIndex === 0) {
                // Go to last slide instantly without animation
                testimonialCards.style.transition = 'none';
                moveToSlide(cards.length - 1);
                setTimeout(() => {
                    testimonialCards.style.transition = 'transform 0.5s ease';
                }, 10);
            } else {
                moveToSlide(currentIndex - 1);
            }
        });
        
        // Tab buttons
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Here you would typically load different testimonials
                // For demo purposes, we'll just reset the slider
                moveToSlide(0);
            });
        });
        
        // Form validation
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const username = document.getElementById('username').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                const specialization = document.getElementById('specialization').value;
                const experience = document.getElementById('experience').value;
                const clubName = document.getElementById('clubName').value;
                const coachingSpecialty = document.getElementById('coachingSpecialty').value;
                
                // Validate form
                if (!username || !email || !password || !confirmPassword || !specialization || !experience || !clubName || !coachingSpecialty) {
                    alert('Please fill in all required fields');
                    return;
                }
                
                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address');
                    return;
                }
                
                // Validate password match
                if (password !== confirmPassword) {
                    alert('Passwords do not match');
                    return;
                }
                
                // Validate password strength
                if (password.length < 8) {
                    alert('Password must be at least 8 characters long');
                    return;
                }
                
                // Here you would typically send the form data to a server
                console.log('Signup attempt:', { 
                    username, 
                    email, 
                    password, 
                    specialization, 
                    experience, 
                    clubName, 
                    coachingSpecialty 
                });
                window.location.href="home coach.html"
            });
        }
        
        // Initialize
        cloneCards();
        initSlider();
    }
    
    // Function to create mobile menu
    function createMobileMenu() {
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        
        mobileMenu.innerHTML = `
            <div class="mobile-menu-header">
                <div class="logo">
                    <!-- ضع مسار صورة اللوجو الخاصة بك هنا -->
                    <img src="your-logo.png" alt="Glory Scout">
                </div>
                <button class="mobile-menu-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <nav class="mobile-nav-links">
                <a href="index.html">Home</a>
                <a href="#">Players</a>
                <a href="#" class="active">Coaches</a>
                <a href="#">About Us</a>
            </nav>
            
            <div class="mobile-auth-buttons">
                <a href="#" class="mobile-coach-btn">For Coaches</a>
                <a href="#" class="mobile-player-btn">For Players</a>
                <a href="index.html" class="mobile-login-btn">Login</a>
            </div>
        `;
        
        document.body.appendChild(mobileMenu);
        
        // Close mobile menu
        const closeBtn = mobileMenu.querySelector('.mobile-menu-close');
        closeBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    }
});