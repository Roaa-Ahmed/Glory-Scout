document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    const createMobileMenu = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        if (!document.querySelector('.mobile-menu-btn')) {
            const mobileMenuBtn = document.createElement('div');
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
            
            header.insertBefore(mobileMenuBtn, nav);
            
            mobileMenuBtn.addEventListener('click', function() {
                nav.classList.toggle('active');
                this.classList.toggle('active');
            });
        }
    };
    
    if (window.innerWidth < 768) {
        createMobileMenu();
    }
    
    window.addEventListener('resize', function() {
        if (window.innerWidth < 768 && !document.querySelector('.mobile-menu-btn')) {
            createMobileMenu();
        }
    });
});