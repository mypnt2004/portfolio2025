// Mouse Parallax Effect for Hero Banner
document.addEventListener('DOMContentLoaded', function() {
    const heroBanner = document.querySelector('.hero img[src*="Herobanner"]');
    
    // Hero Banner Initial Animation - Zoom out effect
    if (heroBanner) {
        // Set initial state - larger scale and slightly transparent
        gsap.set(heroBanner, {
            scale: 1.2,
            opacity: 0,
            transformOrigin: "center center"
        });
        
        // Animate to normal state
        gsap.to(heroBanner, {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.3
        });
    }
    
    // Hero Content Animation - Fade up effect
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        // Set initial state
        gsap.set(heroContent, {
            y: 50,
            opacity: 0
        });
        
        // Animate to normal state
        gsap.to(heroContent, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            delay: 0.8
        });
    }
    
    // Flower Animation - Zoom out and rotate
    const flowers = document.querySelectorAll('.heading1 img[src*="Hoa"]');
    
    if (flowers.length > 0) {
        // Set initial state for flowers (invisible and small)
        gsap.set(flowers, {
            scale: 0,
            rotation: -180,
            transformOrigin: "center center"
        });
        
        // Create timeline for flower animations
        const flowerTimeline = gsap.timeline({ delay: 1.2 });
        
        // Animate each flower with stagger
        flowerTimeline.to(flowers, {
            scale: 1,
            rotation: 0,
            duration: 1.5,
            ease: "back.out(1.7)",
            stagger: 0.2
        })
        // Add continuous rotation
        .to(flowers, {
            rotation: 360,
            duration: 8,
            ease: "none",
            repeat: -1,
            stagger: 0.1
        }, "-=0.5");
    }
    
    if (heroBanner) {
        // Set initial transform origin
        gsap.set(heroBanner, { 
            transformOrigin: "center center"
        });
        
        // Mouse move event listener
        document.addEventListener('mousemove', (e) => {
            // Get mouse position relative to viewport
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Get viewport dimensions
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
            // Calculate movement range (adjust these values for stronger/weaker effect)
            const moveX = (mouseX / windowWidth - 0.5) * 30; // 30px max movement
            const moveY = (mouseY / windowHeight - 0.5) * 20; // 20px max movement
            
            // Apply smooth animation to hero banner
            gsap.to(heroBanner, {
                x: moveX,
                y: moveY,
                duration: 0.8,
                ease: "elastic.out"
            });
        });
        
        // Reset position when mouse leaves the window
        document.addEventListener('mouseleave', () => {
            gsap.to(heroBanner, {
                x: 0,
                y: 0,
                duration: 1.5,
                ease: "power2.out"
            });
        });
    }
    
    // Scroll for more button functionality
    const scrollButton = document.querySelector('.hero-content .button');
    if (scrollButton) {
        scrollButton.addEventListener('click', () => {
            // Smooth scroll to next section or bottom of viewport
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // Navigation sliding tab functionality
    const navItems = document.querySelectorAll('.nav-item');
    const navIndicator = document.querySelector('.nav-indicator');
    
    if (navItems.length > 0 && navIndicator) {
        // Function to update indicator position
        function updateIndicator(activeItem) {
            const itemRect = activeItem.getBoundingClientRect();
            const navRect = activeItem.parentElement.getBoundingClientRect();
            
            // Calculate position relative to nav container
            const leftPosition = itemRect.left - navRect.left;
            
            // Set indicator position and size
            gsap.set(navIndicator, {
                left: leftPosition,
                top: 0,
                width: itemRect.width,
                height: itemRect.height
            });
        }
        
        // Set initial position for the active item
        const activeItem = document.querySelector('.nav-item.active');
        if (activeItem) {
            updateIndicator(activeItem);
        }
        
        // Add click event listeners to nav items
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all items
                navItems.forEach(navItem => navItem.classList.remove('active'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                // Update indicator position with smooth animation
                const itemRect = item.getBoundingClientRect();
                const navRect = item.parentElement.getBoundingClientRect();
                const leftPosition = itemRect.left - navRect.left;
                
                gsap.to(navIndicator, {
                    left: leftPosition,
                    width: itemRect.width,
                    height: itemRect.height,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
        });
        
        // Update indicator position on window resize
        window.addEventListener('resize', () => {
            const activeItem = document.querySelector('.nav-item.active');
            if (activeItem) {
                // Delay the update to ensure CSS transitions are complete
                setTimeout(() => {
                    updateIndicator(activeItem);
                }, 100);
            }
        });
    }
}); 