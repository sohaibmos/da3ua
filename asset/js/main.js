// Mobile Menu Toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navMenu = document.querySelector('nav ul');

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuButton.classList.toggle('active');
    });
}

// Form Validation and Submission
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Validate form
        const isValid = validateForm(form);
        
        if (isValid) {
            try {
                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                showNotification('Success! Your message has been sent.', 'success');
                form.reset();
            } catch (error) {
                showNotification('Oops! Something went wrong. Please try again.', 'error');
            }
        }
        
        submitButton.innerHTML = originalButtonText;
    });
});

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        const value = input.value.trim();
        const errorElement = input.parentElement.querySelector('.error-message') || 
                           createErrorElement(input);
        
        if (input.required && !value) {
            showError(input, errorElement, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && !isValidEmail(value)) {
            showError(input, errorElement, 'Please enter a valid email address');
            isValid = false;
        } else {
            hideError(input, errorElement);
        }
    });
    
    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createErrorElement(input) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    input.parentElement.appendChild(errorElement);
    return errorElement;
}

function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError(input, errorElement) {
    input.classList.remove('error');
    errorElement.style.display = 'none';
}

// Notification System
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Back to Top Button
const backToTopButton = document.createElement('button');
backToTopButton.className = 'back-to-top';
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Cookie Consent
function showCookieConsent() {
    if (!localStorage.getItem('cookieConsent')) {
        const cookieConsent = document.createElement('div');
        cookieConsent.className = 'cookie-consent';
        cookieConsent.innerHTML = `
            <div class="cookie-content">
                <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
                <div class="cookie-buttons">
                    <button class="accept-cookies">Accept</button>
                    <a href="/privacy-policy.html" class="learn-more">Learn More</a>
                </div>
            </div>
        `;
        
        document.body.appendChild(cookieConsent);
        
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 1000);
        
        cookieConsent.querySelector('.accept-cookies').addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'true');
            cookieConsent.classList.remove('show');
            setTimeout(() => cookieConsent.remove(), 300);
        });
    }
}

// Initialize cookie consent
showCookieConsent();

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Loading Animation for Images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
});
