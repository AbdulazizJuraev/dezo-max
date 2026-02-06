// SPA Router - Single Page Application Navigation
'use strict';

class Router {
    constructor() {
        this.routes = {
            'home': { page: 'home', section: 'home-section' },
            'tv': { page: 'tv', section: 'tv-section' },
            'movies': { page: 'movies', section: 'movies-section' },
            'movies-carousel': { page: 'movies-carousel', section: 'movies-carousel-section' },
            'series': { page: 'series', section: 'series-section' },
            'cartoons': { page: 'cartoons', section: 'cartoons-section' },
            'anime': { page: 'anime', section: 'anime-section' },
            'live': { page: 'live', section: 'live-section' },
            'pricing': { page: 'pricing', section: 'pricing-section' },
            'favorites': { page: 'favorites', section: 'favorites-section' }
        };
        
        this.currentRoute = 'home';
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupEventListeners();
                this.handleRoute();
            });
        } else {
            this.setupEventListeners();
            this.handleRoute();
        }
    }
    
    setupEventListeners() {
        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.handleRoute();
        });
        
        // Handle navbar clicks - use event delegation for dynamically added elements
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-route]');
            if (link) {
                e.preventDefault();
                const route = link.getAttribute('data-route');
                this.navigate(route);
            }
        });
    }

    navigate(route) {
        if (!this.routes[route]) {
            console.warn(`Route ${route} not found`);
            return;
        }

        this.currentRoute = route;
        
        // Update URL without reload
        window.history.pushState({ route }, '', `#${route}`);
        
        // Update page
        this.handleRoute();
    }

    handleRoute() {
        // Get route from hash or default to home
        const hash = window.location.hash.slice(1) || 'home';
        const route = this.routes[hash] || this.routes['home'];
        
        this.currentRoute = hash;
        
        // Hide all sections
        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show current section
        const currentSection = document.getElementById(route.section);
        if (currentSection) {
            currentSection.classList.add('active');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Update active nav item
            this.updateActiveNav();
            
            // Trigger route-specific actions
            this.onRouteChange(hash);
        }
    }

    updateActiveNav() {
        // Remove active class from all nav items
        document.querySelectorAll('.navbar-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current route
        const activeLink = document.querySelector(`[data-route="${this.currentRoute}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    onRouteChange(route) {
        // Route-specific initialization
        switch(route) {
            case 'tv':
                if (typeof window.renderTVChannels === 'function') {
                    window.renderTVChannels();
                }
                break;
            case 'favorites':
                if (typeof window.renderFavorites === 'function') {
                    window.renderFavorites();
                }
                break;
            case 'movies':
                if (typeof filterAndRenderMovies === 'function') {
                    filterAndRenderMovies();
                }
                break;
            case 'home':
                // Re-render movies on home page
                if (typeof filterAndRenderMovies === 'function') {
                    filterAndRenderMovies();
                }
                break;
            case 'movies-carousel':
                if (typeof initMoviesCarousel === 'function') {
                    initMoviesCarousel();
                }
                break;
        }
        
        // Close mobile menu if open
        if (typeof closeNavMenu === 'function') {
            closeNavMenu();
        } else {
            // Fallback: manually close menu
            const navbarMenu = document.querySelector('.navbar-menu');
            const navbarMenuBtn = document.querySelector('.navbar-menu-btn');
            
            if (navbarMenu) {
                navbarMenu.classList.remove('active');
                if (navbarMenuBtn) navbarMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        // Re-translate page after route change
        if (typeof i18n !== 'undefined' && i18n.translatePage) {
            setTimeout(() => i18n.translatePage(), 100);
        }
    }

    getCurrentRoute() {
        return this.currentRoute;
    }
}

// Initialize router
const router = new Router();
