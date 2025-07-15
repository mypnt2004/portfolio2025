console.log('Main.js loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    // Get all icons
    const phoneIcon = document.querySelector('img[alt="Phone"]');
    const locationIcon = document.querySelector('img[alt="Location"]');
    const linkedinIcon = document.querySelector('img[alt="Linkedin"]');
    const gmailIcon = document.querySelector('img[alt="Gmail"]');
    
    console.log('Phone icon:', phoneIcon);
    console.log('Location icon:', locationIcon);
    console.log('LinkedIn icon:', linkedinIcon);
    console.log('Gmail icon:', gmailIcon);
    
    // Function to show popup
    function showPopup(text, icon) {
        // Remove existing popup if any
        const existingPopup = document.querySelector('.icon-popup');
        if (existingPopup) {
            existingPopup.remove();
        }
        
        // Create new popup
        const popup = document.createElement('div');
        popup.className = 'icon-popup';
        popup.textContent = text;
        
        // Get icon position
        const rect = icon.getBoundingClientRect();
        
        // Set popup styles
        popup.style.position = 'fixed';
        popup.style.top = (rect.top - 58) + 'px';
        popup.style.left = (rect.left + rect.width/2) + 'px';
        popup.style.transform = 'translateX(-50%)';
        popup.style.zIndex = '9999';
        popup.style.opacity = '0';
        popup.style.transition = 'all 0.3s ease';
        
        document.body.appendChild(popup);
        
        // Show with animation
        setTimeout(() => {
            popup.style.opacity = '1';
            popup.style.transform = 'translateX(-50%) translateY(-5px)';
        }, 10);
        
        return popup;
    }
    
    // Function to hide popup
    function hidePopup() {
        const popup = document.querySelector('.icon-popup');
        if (popup) {
            popup.style.opacity = '0';
            popup.style.transform = 'translateX(-50%) translateY(0)';
            setTimeout(() => {
                popup.remove();
            }, 300);
        }
    }
    
    // Add hover events to phone icon
    if (phoneIcon) {
        console.log('Adding events to phone icon');
        
        phoneIcon.addEventListener('mouseenter', function() {
            console.log('Phone icon hovered');
            showPopup('(+84) 886 694 225', phoneIcon);
        });
        
        phoneIcon.addEventListener('mouseleave', function() {
            console.log('Phone icon mouse leave');
            hidePopup();
        });
        
        // Add click event to copy phone number
        phoneIcon.addEventListener('click', function() {
            console.log('Phone icon clicked');
            navigator.clipboard.writeText('(+84) 886 694 225').then(() => {
                showNotification('Copied!', phoneIcon);
            }).catch(() => {
                console.log('Copy failed');
            });
        });
        
        // Add cursor pointer
        phoneIcon.style.cursor = 'pointer';
    }
    
    // Add hover events to location icon
    if (locationIcon) {
        console.log('Adding events to location icon');
        
        locationIcon.addEventListener('mouseenter', function() {
            console.log('Location icon hovered');
            showPopup('Thu Duc, TP.HCM', locationIcon);
        });
        
        locationIcon.addEventListener('mouseleave', function() {
            console.log('Location icon mouse leave');
            hidePopup();
        });
        
        // Add click event to copy location
        locationIcon.addEventListener('click', function() {
            console.log('Location icon clicked');
            navigator.clipboard.writeText('Thu Duc, TP.HCM').then(() => {
                showNotification('Copied!', locationIcon);
            }).catch(() => {
                console.log('Copy failed');
            });
        });
        
        // Add cursor pointer
        locationIcon.style.cursor = 'pointer';
    }
    
    // Add hover events to linkedin icon
    if (linkedinIcon) {
        console.log('Adding events to linkedin icon');
        
        linkedinIcon.addEventListener('mouseenter', function() {
            console.log('LinkedIn icon hovered');
            showPopup('linkedin.com/in/mypnt2004', linkedinIcon);
        });
        
        linkedinIcon.addEventListener('mouseleave', function() {
            console.log('LinkedIn icon mouse leave');
            hidePopup();
        });
        
        // Add cursor pointer
        linkedinIcon.style.cursor = 'pointer';
    }
    
    // Add hover events to gmail icon
    if (gmailIcon) {
        console.log('Adding events to gmail icon');
        
        gmailIcon.addEventListener('mouseenter', function() {
            console.log('Gmail icon hovered');
            showPopup('my.pnt2004@gmail.com', gmailIcon);
        });
        
        gmailIcon.addEventListener('mouseleave', function() {
            console.log('Gmail icon mouse leave');
            hidePopup();
        });
        
        // Add cursor pointer
        gmailIcon.style.cursor = 'pointer';
    }
    
    if (!phoneIcon && !locationIcon && !linkedinIcon && !gmailIcon) {
        console.log('No icons found! Check the alt attributes in HTML.');
    }

    // Milestone bar animation trigger
    const milestoneBar = document.querySelector('.milestone-bar');
    
    if (milestoneBar) {
        console.log('Milestone bar found, setting up observer');
        
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('Milestone bar in view, triggering animation');
                    entry.target.classList.add('animate');
                    // Unobserve after animation starts to prevent re-triggering
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        observer.observe(milestoneBar);
        
        // Add milestone tooltips
        setTimeout(() => {
            addMilestoneTooltips();
        }, 3000); // Wait for animation to complete
    }
    
    function addMilestoneTooltips() {
        const milestoneBar = document.querySelector('.milestone-bar');
        if (!milestoneBar) return;
        
        const svg = milestoneBar.querySelector('svg');
        if (!svg) return;
        
        // Create invisible hover areas for milestones
        const milestone1Area = document.createElement('div');
        const milestone2Area = document.createElement('div');
        
        // Style hover areas
        const areaStyle = {
            position: 'absolute',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            cursor: 'pointer',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: '10'
        };
        
        Object.assign(milestone1Area.style, areaStyle);
        Object.assign(milestone2Area.style, areaStyle);
        
        milestone1Area.style.left = 'calc(24.2% - 30px)'; // Position over first circle
        milestone2Area.style.left = 'calc(74.4% - 30px)'; // Position over second circle
        
        milestoneBar.style.position = 'relative';
        milestoneBar.appendChild(milestone1Area);
        milestoneBar.appendChild(milestone2Area);
        
        // Add tooltip events
        milestone1Area.addEventListener('mouseenter', () => {
            showMilestoneTooltip('June 2024 - BingBing Shop', milestone1Area);
            svg.classList.add('milestone-hover-active');
        });
        
        milestone1Area.addEventListener('mouseleave', () => {
            hideMilestoneTooltip();
            svg.classList.remove('milestone-hover-active');
        });
        
        milestone2Area.addEventListener('mouseenter', () => {
            showMilestoneTooltip('Sep 2024 - Sillage Garden', milestone2Area);
            svg.classList.add('milestone-hover-active');
        });
        
        milestone2Area.addEventListener('mouseleave', () => {
            hideMilestoneTooltip();
            svg.classList.remove('milestone-hover-active');
        });
    }
    
    function showMilestoneTooltip(text, element) {
        hideMilestoneTooltip(); // Remove existing tooltip
        
        const tooltip = document.createElement('div');
        tooltip.className = 'milestone-tooltip';
        tooltip.textContent = text;
        
        const rect = element.getBoundingClientRect();
        
        tooltip.style.position = 'fixed';
        tooltip.style.top = (rect.top - 45) + 'px';
        tooltip.style.left = (rect.left + rect.width/2) + 'px';
        tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.background = 'var(--global-primary-500, #2D4F2B)';
        tooltip.style.color = 'var(--global-secondary-200, #FFE3A7)';
        tooltip.style.padding = '8px 16px';
        tooltip.style.borderRadius = '8px';
        tooltip.style.fontFamily = 'Quicksand';
        tooltip.style.fontWeight = '500';
        tooltip.style.fontSize = '14px';
        tooltip.style.zIndex = '10001';
        tooltip.style.opacity = '0';
        tooltip.style.transition = 'all 0.3s ease';
        tooltip.style.boxShadow = '0 4px 12px rgba(45, 79, 43, 0.3)';
        tooltip.style.whiteSpace = 'nowrap';
        tooltip.style.pointerEvents = 'none';
        
        document.body.appendChild(tooltip);
        
        setTimeout(() => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateX(-50%) translateY(-5px)';
        }, 10);
    }
    
    function hideMilestoneTooltip() {
        const tooltip = document.querySelector('.milestone-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateX(-50%) translateY(0)';
            setTimeout(() => {
                tooltip.remove();
            }, 300);
        }
    }
});

// Function to show notification below element
function showNotification(message, element) {
    // Remove existing notification
    const existingNotification = document.querySelector('.copy-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;
    
    // Get element position
    const rect = element.getBoundingClientRect();
    
    // Style notification
    notification.style.position = 'fixed';
    notification.style.top = (rect.bottom + 10) + 'px';
    notification.style.left = (rect.left + rect.width/2) + 'px';
    notification.style.transform = 'translateX(-50%)';
    notification.style.background = 'var(--global-primary-500, #2D4F2B)';
    notification.style.color = 'var(--global-secondary-200, #FFE3A7)';
    notification.style.padding = '8px 16px';
    notification.style.borderRadius = '8px';
    notification.style.fontFamily = 'Quicksand';
    notification.style.fontWeight = '500';
    notification.style.fontSize = '14px';
    notification.style.zIndex = '10001';
    notification.style.opacity = '0';
    notification.style.transition = 'all 0.3s ease';
    notification.style.boxShadow = '0 4px 12px rgba(45, 79, 43, 0.3)';
    notification.style.whiteSpace = 'nowrap';
    
    document.body.appendChild(notification);
    
    // Show with animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(5px)';
    }, 10);
    
    // Hide after 1.5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(0)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 1500);
} 

// Skills Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Progress bar animation
    const progressBars = document.querySelectorAll('.progress');
    const skillsSection = document.querySelector('.skills');
    
    if (skillsSection && progressBars.length > 0) {
        console.log('Skills section found, setting up progress bar animations');
        
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('Skills section in view, starting animations');
                    animateSkillsSection();
                    // Unobserve after animation starts
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        skillsObserver.observe(skillsSection);
    }
    
    function animateSkillsSection() {
        // 1. Animate main skills section
        skillsSection.classList.add('animate');
        
        // 2. Show all percentage as 0% immediately
        const skillNames = document.querySelectorAll('.skill-name');
        skillNames.forEach(skillName => {
            skillName.setAttribute('data-percentage', '0%');
        });
        
        // 3. Animate skill categories with stagger
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach((category, index) => {
            setTimeout(() => {
                category.classList.add('animate');
            }, 300 + (index * 200)); // Start after section animation + stagger
        });
        
        // 4. Start progress bar animations after categories are visible
        setTimeout(() => {
            animateProgressBars();
        }, 800); // Wait for categories to animate in
    }
    
    function animateProgressBars() {
        progressBars.forEach((progressBar, index) => {
            const targetWidth = parseInt(progressBar.getAttribute('data-width'));
            
            setTimeout(() => {
                // Start progress bar animation
                progressBar.style.width = targetWidth + '%';
                progressBar.classList.add('animate');
                
                // Start percentage counter at the same time as progress bar
                const skillBar = progressBar.closest('.skill-bar');
                const skillName = skillBar.querySelector('.skill-name');
                if (skillName) {
                    // Start counter immediately with same duration as progress bar
                    animatePercentageCounter(skillName, 0, targetWidth, 1500); // 1.5 seconds to match progress bar
                }
            }, index * 200); // Stagger the animations
        });
    }
    
    function animatePercentageCounter(element, startValue, endValue, duration) {
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Easing function for smooth animation
            const easedProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            
            const currentValue = Math.round(startValue + (endValue - startValue) * easedProgress);
            element.setAttribute('data-percentage', currentValue + '%');
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Setup floating flowers for all sections
    setupFloatingFlowers();
    
    // Setup animations for project and contact sections
    setupProjectAnimation();
    setupContactAnimation();
});

// Floating Flowers Animation System
function setupFloatingFlowers() {
    console.log('Setting up floating flowers animations');
    
    // Get all floating flower containers
    const flowerContainers = document.querySelectorAll('.floating-flowers');
    
    flowerContainers.forEach((container, containerIndex) => {
        const flowers = container.querySelectorAll('.floating-flower');
        
        flowers.forEach((flower, index) => {
            // Set random initial position
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;
            
            flower.style.left = randomX + '%';
            flower.style.top = randomY + '%';
            
            // Start animation after a delay
            setTimeout(() => {
                animateFlower(flower, container);
            }, (containerIndex * 2000) + (index * 800));
        });
    });
}

function animateFlower(flower, container) {
    // Initial fade in and scale
    flower.style.opacity = '0.6';
    flower.style.transform = 'scale(1)';
    flower.style.transition = 'all 0.8s ease-in-out';
    
    // Continuous floating animation
    function floatFlower() {
        const newX = Math.random() * 90 + 5; // Keep within bounds
        const newY = Math.random() * 90 + 5;
        const newRotation = Math.random() * 360;
        const newScale = 0.8 + Math.random() * 0.4; // Scale between 0.8 and 1.2
        const duration = 20000 + Math.random() * 15000; // 20-35 seconds (extremely slow)
        
        flower.style.left = newX + '%';
        flower.style.top = newY + '%';
        flower.style.transform = `scale(${newScale}) rotate(${newRotation}deg)`;
        flower.style.transition = `all ${duration}ms ease-in-out`;
        
        // Schedule next movement
        setTimeout(floatFlower, duration);
    }
    
    // Start floating
    setTimeout(floatFlower, 5000);
    
    // Add hover pause effect
    flower.addEventListener('mouseenter', () => {
        flower.style.animationPlayState = 'paused';
        flower.style.transform += ' scale(1.3)';
        flower.style.filter = 'brightness(1.2)';
    });
    
    flower.addEventListener('mouseleave', () => {
        flower.style.animationPlayState = 'running';
        flower.style.filter = 'brightness(1)';
    });
}

// Project Section Animation
function setupProjectAnimation() {
    const projectSection = document.querySelector('.project');
    
    if (projectSection) {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('Project section in view, starting animations');
                    animateProjectSection();
                    projectObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        projectObserver.observe(projectSection);
    }
}

function animateProjectSection() {
    const projectSection = document.querySelector('.project');
    const projectItems = document.querySelectorAll('.project-item');
    
    // 1. Animate main project section
    projectSection.classList.add('animate');
    
    // 2. Animate project items with stagger
    projectItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, 400 + (index * 300)); // Start after section animation + stagger
    });
}

// Contact Section Animation
function setupContactAnimation() {
    const contactSection = document.querySelector('.contact');
    
    if (contactSection) {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('Contact section in view, starting animations');
                    animateContactSection();
                    contactObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        contactObserver.observe(contactSection);
    }
}

function animateContactSection() {
    const contactSection = document.querySelector('.contact');
    const thankYouGraphic = document.querySelector('.thank-you-graphic');
    const contactInfo = document.querySelector('.contact-info');
    const contactItems = document.querySelectorAll('.contact-item');
    
    // 1. Animate main contact section
    contactSection.classList.add('animate');
    
    // 2. Animate graphic and info with slight delay
    setTimeout(() => {
        if (thankYouGraphic) thankYouGraphic.classList.add('animate');
        if (contactInfo) contactInfo.classList.add('animate');
    }, 300);
    
    // 3. Animate contact items with stagger
    contactItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, 600 + (index * 150)); // Stagger contact items
    });
}

// ===========================
// NAVIGATION SCROLL BEHAVIOR
// ===========================

let lastScrollTop = 0;
let scrollThreshold = 10; // Minimum scroll distance to trigger hide/show
let isScrolling = false;

function handleNavScroll() {
    const nav = document.querySelector('nav');
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Prevent execution during momentum scrolling on mobile
    if (isScrolling) return;
    
    // If at the very top, hide nav
    if (currentScrollTop <= scrollThreshold) {
        nav.classList.add('nav-hidden');
        return;
    }
    
    // Check scroll direction
    if (Math.abs(currentScrollTop - lastScrollTop) < scrollThreshold) {
        return; // Not enough scroll distance
    }
    
    if (currentScrollTop > lastScrollTop) {
        // Scrolling down - show nav
        nav.classList.remove('nav-hidden');
    } else {
        // Scrolling up - hide nav
        nav.classList.add('nav-hidden');
    }
    
    lastScrollTop = currentScrollTop;
}

// Throttle scroll events for better performance
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(handleNavScroll, 10);
});

// Handle touch scroll events on mobile
let touchStartY = 0;
let touchEndY = 0;

window.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
    isScrolling = true;
});

window.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].clientY;
    isScrolling = false;
    
    // Handle navigation based on touch direction
    setTimeout(handleNavScroll, 100);
});

// Initialize navigation state - start hidden
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    nav.classList.add('nav-hidden');
});

console.log('Navigation scroll behavior initialized');