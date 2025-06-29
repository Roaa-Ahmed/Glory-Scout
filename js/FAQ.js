
document.addEventListener('DOMContentLoaded', function() {
    const faqForm = document.getElementById('faq-form');
    
    if (faqForm) {
        faqForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formElements = faqForm.elements;
            const name = formElements[0].value;
            const email = formElements[1].value;
            const formType = formElements[2].value;
            const question = formElements[3].value;
            
            if (!name || !email || !question) {
                alert('Please fill in all required fields');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            alert('Thank you for your question! We will get back to you soon.');
            faqForm.reset();
            
            console.log({
                name,
                email,
                formType,
                question
            });
        });
    }
    
    const createMobileMenu = () => {
        const header = document.querySelector('.header');
        const navMenu = document.querySelector('.nav-menu');
        
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        header.insertBefore(mobileMenuBtn, navMenu);
        
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    };
    
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }
    
    window.addEventListener('resize', function() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (window.innerWidth <= 768 && !mobileMenuBtn) {
            createMobileMenu();
        } else if (window.innerWidth > 768 && mobileMenuBtn) {
            mobileMenuBtn.remove();
            document.querySelector('.nav-menu').classList.remove('active');
        }
    });
});