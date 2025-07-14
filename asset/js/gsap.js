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
    
    // Floating Flowers Animation
    const floatingFlowers = document.querySelectorAll('.floating-flower');
    
    if (floatingFlowers.length > 0) {
        // Function to get random position within hero section bounds
        function getRandomPosition() {
            const hero = document.querySelector('.hero');
            const heroRect = hero.getBoundingClientRect();
            
            // Get random position with some margin from edges
            const margin = 80;
            const randomX = Math.random() * (heroRect.width - margin * 2) + margin;
            const randomY = Math.random() * (heroRect.height - margin * 2) + margin;
            
            return { x: randomX, y: randomY };
        }
        
        // Set initial positions and states for floating flowers
        floatingFlowers.forEach((flower, index) => {
            const randomPos = getRandomPosition();
            
            gsap.set(flower, {
                left: randomPos.x,
                top: randomPos.y,
                scale: 0,
                opacity: 0,
                rotation: Math.random() * 360,
                transformOrigin: "center center"
            });
        });
        
        // Create staggered animation for floating flowers
        const floatingTimeline = gsap.timeline({ delay: 1.5 });
        
        floatingFlowers.forEach((flower, index) => {
            // Zoom out effect with opacity fade in
            floatingTimeline.to(flower, {
                scale: 1,
                opacity: 0.7,
                duration: 1.8,
                ease: "back.out(1.2)",
                delay: index * 0.8
            }, 0)
            
            // Continuous slow rotation
            .to(flower, {
                rotation: "+=360",
                duration: 15 + Math.random() * 10, // Random rotation speed between 15-25 seconds
                ease: "none",
                repeat: -1,
                delay: index * 0.8
            }, 0.5)
            
            // Gentle floating movement
            .to(flower, {
                y: "+=20",
                duration: 4 + Math.random() * 2,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1,
                delay: index * 0.8
            }, 1)
            
            .to(flower, {
                x: "+=15",
                duration: 6 + Math.random() * 3,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1,
                delay: index * 0.8
            }, 1.5);
        });
        
        // Reposition flowers on window resize
        window.addEventListener('resize', () => {
            floatingFlowers.forEach(flower => {
                const randomPos = getRandomPosition();
                gsap.set(flower, {
                    left: randomPos.x,
                    top: randomPos.y
                });
            });
        });
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
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // INTRO SECTION ANIMATIONS
    const introSection = document.querySelector('.intro');
    if (introSection) {
        // Animate intro heading
        const introHeading = document.querySelector('.intro .left-info .heading');
        if (introHeading) {
            gsap.fromTo(introHeading, 
                {
                    x: -100,
                    opacity: 0,
                    scale: 0.8
                },
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: introSection,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
        
        // Animate intro heading flower with rotation
        const introFlower = document.querySelector('.intro .left-info .heading img');
        if (introFlower) {
            // Initial entrance animation
            gsap.fromTo(introFlower, 
                {
                    scale: 0,
                    rotation: -180,
                    transformOrigin: "center center"
                },
                {
                    scale: 1,
                    rotation: 0,
                    duration: 1.5,
                    ease: "back.out(1.7)",
                    delay: 0.8,
                    scrollTrigger: {
                        trigger: introSection,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
            
            // Continuous rotation animation
            gsap.to(introFlower, {
                rotation: 360,
                duration: 8,
                ease: "none",
                repeat: -1,
                delay: 2.3,
                scrollTrigger: {
                    trigger: introSection,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        }
        
        // Animate intro paragraph
        const introParagraph = document.querySelector('.intro .left-info p');
        if (introParagraph) {
            gsap.fromTo(introParagraph, 
                {
                    y: 50,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: introSection,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
        
        // Animate intro icons with stagger
        const introIcons = document.querySelectorAll('.intro .icon-list img');
        if (introIcons.length > 0) {
            gsap.fromTo(introIcons, 
                {
                    y: 40,
                    opacity: 0,
                    scale: 0.8
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out",
                    stagger: 0.15,
                    delay: 0.6,
                    scrollTrigger: {
                        trigger: introSection,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
        
        // Animate intro banner
        const introBanner = document.querySelector('.intro_banner');
        if (introBanner) {
            gsap.fromTo(introBanner, 
                {
                    x: 100,
                    opacity: 0,
                    scale: 0.8,
                    rotation: 15
                },
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 1.5,
                    ease: "power3.out",
                    delay: 0.4,
                    scrollTrigger: {
                        trigger: introSection,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    }
    
    // EDUCATION SECTION ANIMATIONS  
    const educationSection = document.querySelector('.education');
    if (educationSection) {
        // Animate education title
        const educationTitle = document.querySelector('.education h1');
        if (educationTitle) {
            gsap.fromTo(educationTitle, 
                {
                    y: -50,
                    opacity: 0,
                    scale: 0.8
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: educationSection,
                        start: "top 85%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
        
        // Animate education cards with stagger
        const educationCards = document.querySelectorAll('.card-education');
        if (educationCards.length > 0) {
            gsap.fromTo(educationCards, 
                {
                    y: 60,
                    opacity: 0,
                    scale: 0.95
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out",
                    stagger: 0.15,
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: educationSection,
                        start: "top 85%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
            
            // Add hover animation for cards
            educationCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        y: -10,
                        scale: 1.05,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
                
                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        y: 0,
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            });
        }
    }
}); 