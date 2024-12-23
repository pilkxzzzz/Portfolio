// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll event listener for header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
    } else {
        header.style.backgroundColor = '#1a1a1a';
    }
});

// Global variables for modal
let currentScreenshotIndex = 0;
let currentScreenshots = [];

// Display projects
function displayProjects() {
    const projectGrid = document.querySelector('.project-grid');
    projectGrid.innerHTML = ''; // Clear any existing content
    
    // Display all projects
    Object.values(projectsConfig).forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-header">
                <img src="${project.icon}" alt="${project.title} icon" class="project-icon">
                <div>
                    <div class="project-title">${project.title}</div>
                    <div class="project-tech">${project.tech}</div>
                </div>
            </div>
            <div class="project-devs">
                Dev: ${project.devs.map(dev => `<a href="${dev.github}" class="dev-link" target="_blank">${dev.name}</a>`).join(' ')}
            </div>
            <div class="project-description">${project.description}</div>
            <a href="${project.github}" class="project-link" target="_blank">
                <i class="fab fa-github"></i> View on GitHub
            </a>
            ${project.title === 'Software Hub' ? `<a href="${project.website}" class="project-link" target="_blank">
                <i class="fas fa-external-link-alt"></i> Visit Website
            </a>` : ''}
        `;

        // Add click event to show screenshots
        projectCard.addEventListener('click', (e) => {
            // Prevent opening screenshots when clicking the GitHub link or dev link
            if (!e.target.closest('.project-link') && !e.target.closest('.dev-link')) {
                showScreenshots(project.screenshots);
            }
        });
        
        projectGrid.appendChild(projectCard);
    });
}

function showScreenshots(screenshots) {
    const modal = document.getElementById('screenshotsModal');
    const container = modal.querySelector('.screenshots-container');
    currentScreenshots = screenshots;
    currentScreenshotIndex = 0;
    
    updateScreenshot();
    modal.classList.add('show');
}

function updateScreenshot() {
    const container = document.querySelector('.screenshots-container');
    container.innerHTML = `
        <img src="${currentScreenshots[currentScreenshotIndex]}" 
             alt="Screenshot ${currentScreenshotIndex + 1}" 
             class="screenshot">
    `;
}

function nextScreenshot() {
    currentScreenshotIndex = (currentScreenshotIndex + 1) % currentScreenshots.length;
    updateScreenshot();
}

function prevScreenshot() {
    currentScreenshotIndex = (currentScreenshotIndex - 1 + currentScreenshots.length) % currentScreenshots.length;
    updateScreenshot();
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayProjects();
    
    // Moving background effect
    const movingBackground = document.querySelector('.moving-background');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        const moveX = mouseX * 20; // Adjust this value to control horizontal movement
        const moveY = mouseY * 20; // Adjust this value to control vertical movement
        
        movingBackground.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    // Modal controls
    const modal = document.getElementById('screenshotsModal');
    const closeBtn = document.querySelector('.close-modal');
    const nextBtn = document.querySelector('.next-button');
    const prevBtn = document.querySelector('.prev-button');
    
    if (closeBtn) {
        closeBtn.onclick = () => modal.classList.remove('show');
    }
    if (nextBtn) {
        nextBtn.onclick = nextScreenshot;
    }
    if (prevBtn) {
        prevBtn.onclick = prevScreenshot;
    }
    
    window.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    };
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('show')) {
            if (e.key === 'ArrowRight') nextScreenshot();
            if (e.key === 'ArrowLeft') prevScreenshot();
            if (e.key === 'Escape') modal.classList.remove('show');
        }
    });

    // Animate sections on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.section-title, .project-card, .contact-link').forEach(el => {
        observer.observe(el);
    });

    // Initialize particles.js
    if (window.particlesJS) {
        particlesJS.load('particles-js', 'particles.json', function() {
            console.log('particles.js loaded');
        });
    }

    // Animate logo glow
    const logoGlow = document.querySelector('.logo-glow');
    if (logoGlow) {
        setInterval(() => {
            logoGlow.style.animation = 'none';
            logoGlow.offsetHeight; // Trigger reflow
            logoGlow.style.animation = null;
        }, 3000);
    }

    // Add hover effects to nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            const icon = e.currentTarget.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });
        
        link.addEventListener('mouseleave', (e) => {
            const icon = e.currentTarget.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
});
