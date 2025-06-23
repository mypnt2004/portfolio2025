// Mouse Parallax Effect for Hero Banner
document.addEventListener('DOMContentLoaded', function() {
    const heroBanner = document.querySelector('.hero img[src*="Herobanner"]');
    
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
        const flowerTimeline = gsap.timeline({ delay: 0.5 });
        
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
}); 