document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const mainContent = document.getElementById('main-content');
    const notification = document.getElementById('notification');
    const addPostBtn = document.getElementById('add-post-btn');
    const postUpload = document.getElementById('post-upload');
    const postModal = document.getElementById('post-modal');
    const closeModal = document.querySelector('.close-modal');
    const postPreviewImage = document.getElementById('post-preview-image');
    const postSubmitBtn = document.querySelector('.post-submit-btn');
    const postsGrid = document.getElementById('posts-grid');
    
    // Initial state
    let sidebarOpen = false;
    
    // Debug - check if elements exist
    console.log('Menu Toggle exists:', !!menuToggle);
    console.log('Sidebar exists:', !!sidebar);
    console.log('Add Post Button exists:', !!addPostBtn);
    console.log('Post Upload exists:', !!postUpload);
    
    // Toggle sidebar - fixed with proper event handling
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            sidebarOpen = !sidebarOpen;
            console.log('Menu clicked, sidebar should be:', sidebarOpen ? 'open' : 'closed');
            
            if (sidebarOpen) {
                sidebar.classList.add('active');
                overlay.classList.add('active');
                mainContent.classList.add('sidebar-active');
            } else {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                mainContent.classList.remove('sidebar-active');
            }
        });
    }
    
    // Close sidebar when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', function() {
            sidebarOpen = false;
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            mainContent.classList.remove('sidebar-active');
        });
    }
    
    // Posts navigation
    const postsNavs = document.querySelectorAll('.posts-nav');
    postsNavs.forEach(nav => {
        nav.addEventListener('click', function() {
            postsNavs.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Add Post functionality - fixed with proper event handling
    if (addPostBtn && postUpload) {
        // Open file dialog when clicking the add post button
        addPostBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Add post button clicked');
            postUpload.click();
        });
        
        // Handle file selection
        postUpload.addEventListener('change', function(event) {
            console.log('File selected:', event.target.files);
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    console.log('File loaded');
                    postPreviewImage.src = e.target.result;
                    postModal.classList.add('active');
                };
                
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            postModal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === postModal) {
            postModal.classList.remove('active');
        }
    });
    
    // Submit post
    if (postSubmitBtn) {
        postSubmitBtn.addEventListener('click', function() {
            const caption = document.querySelector('.post-form textarea').value;
            
            // Create new post element
            const newPost = document.createElement('div');
            newPost.className = 'post-item';
            
            // Create post image
            const postImg = document.createElement('img');
            postImg.src = postPreviewImage.src;
            postImg.alt = 'New Post';
            
            // Create post overlay
            const overlay = document.createElement('div');
            overlay.className = 'post-overlay';
            
            const stats = document.createElement('div');
            stats.className = 'post-stats';
            stats.innerHTML = `
                <span><i class="fas fa-heart"></i> 0</span>
                <span><i class="fas fa-comment"></i> 0</span>
            `;
            
            overlay.appendChild(stats);
            
            // Add elements to post
            newPost.appendChild(postImg);
            newPost.appendChild(overlay);
            
            // Add post to grid (at the beginning)
            postsGrid.insertBefore(newPost, postsGrid.firstChild);
            
            // Update post count
            const postCount = document.querySelector('.stat-value');
            postCount.textContent = parseInt(postCount.textContent) + 1;
            
            // Close modal and reset form
            postModal.classList.remove('active');
            document.querySelector('.post-form textarea').value = '';
            postUpload.value = '';
            
            // Show success message
            showNotification('Post added successfully!');
        });
    }
    
    // Show notification
    function showNotification(message) {
        notification.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Simulate loading profile data
    setTimeout(() => {
        document.querySelector('.username').textContent = '@professional_user';
        document.querySelector('.full-name').textContent = 'Professional User';
    }, 500);
});