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