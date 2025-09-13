// Countdown Timer and Parallax Effects
class LandingPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupCountdown();
        this.setupParallax();
        this.checkReducedMotion();
    }

    setupCountdown() {
        const STORAGE_KEY = "countdownTarget";
        const COUNTDOWN_DAYS = 30;
        
        let targetDate = localStorage.getItem(STORAGE_KEY);
        
        if (!targetDate) {
            // First visit - set target date 30 days from now
            const now = new Date();
            const target = new Date(now.getTime() + (COUNTDOWN_DAYS * 24 * 60 * 60 * 1000));
            targetDate = target.toISOString();
            localStorage.setItem(STORAGE_KEY, targetDate);
        }

        this.updateCountdown(targetDate);
        
        // Update countdown every minute
        setInterval(() => {
            this.updateCountdown(targetDate);
        }, 60000);
    }

    updateCountdown(targetDateString) {
        const targetDate = new Date(targetDateString);
        const now = new Date();
        const timeDiff = targetDate.getTime() - now.getTime();
        const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

        const titleElement = document.getElementById("countdown-title");
        const daysElement = document.getElementById("days-left");
        const subtitleElement = document.getElementById("countdown-subtitle");
        const targetDateElement = document.getElementById("target-date");

        if (daysLeft <= 0) {
            titleElement.textContent = "It's time.";
            subtitleElement.style.display = "none";
        } else {
            titleElement.innerHTML = Come back here in <span id="days-left"></span> days;
            daysElement.textContent = daysLeft;
            
            // Format target date
            const formattedDate = targetDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });
            targetDateElement.textContent = formattedDate;
            subtitleElement.style.display = "block";
        }
    }

    setupParallax() {
        const blobs = document.querySelectorAll(".blob");
        const particles = document.querySelector(".particles");
        let mouseX = 0;
        let mouseY = 0;
        let isMobile = window.innerWidth <= 768;

        // Mouse movement handler
        const handleMouseMove = (e) => {
            if (isMobile) return;
            
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = (e.clientY / window.innerHeight) * 2 - 1;
            
            this.updateParallax(mouseX, mouseY);
        };

        // Touch movement handler for mobile
        const handleTouchMove = (e) => {
            if (!isMobile) return;
            
            const touch = e.touches[0];
            mouseX = (touch.clientX / window.innerWidth) * 2 - 1;
            mouseY = (touch.clientY / window.innerHeight) * 2 - 1;
            
            this.updateParallax(mouseX, mouseY);
        };

        // Idle animation for mobile
        const idleAnimation = () => {
            if (isMobile) {
                const time = Date.now() * 0.001;
                const idleX = Math.sin(time * 0.5) * 0.3;
                const idleY = Math.cos(time * 0.3) * 0.2;
                this.updateParallax(idleX, idleY);
            }
        };

        // Event listeners
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("touchmove", handleTouchMove, { passive: true });
        
        // Mobile idle animation
        if (isMobile) {
            setInterval(idleAnimation, 50);
        }

        // Handle resize
        window.addEventListener("resize", () => {
            isMobile = window.innerWidth <= 768;
        });
    }

    updateParallax(x, y) {
        const blobs = document.querySelectorAll(".blob");
        const particles = document.querySelector(".particles");
        
        // Parallax intensity
        const intensity = 30;
        
        blobs.forEach((blob, index) => {
            const multiplier = (index + 1) * 0.5;
            const translateX = x * intensity * multiplier;
            const translateY = y * intensity * multiplier;
            
            blob.style.transform = 	ranslate(px, px);
        });

        // Particles subtle movement
        if (particles) {
            const particleX = x * 10;
            const particleY = y * 10;
            particles.style.transform = 	ranslate(px, px);
        }
    }

    checkReducedMotion() {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        
        if (prefersReducedMotion) {
            // Disable all animations
            const style = document.createElement("style");
            style.textContent = 
                .blob, .particles {
                    animation: none !important;
                }
                .profile-card:hover,
                .social-link:hover,
                .stat:hover {
                    transform: none !important;
                }
            ;
            document.head.appendChild(style);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    new LandingPage();
});

// Add some interactive enhancements
document.addEventListener("DOMContentLoaded", () => {
    // Add subtle hover effects to stats
    const stats = document.querySelectorAll(".stat");
    stats.forEach(stat => {
        stat.addEventListener("mouseenter", () => {
            stat.style.transform = "translateY(-2px) scale(1.02)";
        });
        
        stat.addEventListener("mouseleave", () => {
            stat.style.transform = "translateY(0) scale(1)";
        });
    });

    // Add click animation to social links
    const socialLinks = document.querySelectorAll(".social-link");
    socialLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            // Create ripple effect
            const ripple = document.createElement("span");
            const rect = link.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = 
                position: absolute;
                width: px;
                height: px;
                left: px;
                top: px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            ;
            
            link.style.position = "relative";
            link.style.overflow = "hidden";
            link.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation CSS
    const rippleStyle = document.createElement("style");
    rippleStyle.textContent = 
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    ;
    document.head.appendChild(rippleStyle);
});
