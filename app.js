// Main Application JavaScript
'use strict';

// ==================== DOM Elements ====================
const header = document.querySelector('header');
const nav = document.querySelector('nav');
const navbarMenuBtn = document.querySelector('.navbar-menu-btn');
const navbarForm = document.querySelector('.navbar-form');
const navbarFormCloseBtn = document.querySelector('.navbar-form-close');
const navbarSearchBtn = document.querySelector('.navbar-search-btn');
const navbarFormSearch = document.querySelector('.navbar-form-search');
const moviesGrid = document.querySelector('.movies-grid');
const moviesPageGrid = document.getElementById('moviesPageGrid');
const genreFilter = document.querySelector('select[name="genre"]');
const yearFilter = document.querySelector('select[name="year"]');
const studioRadios = document.querySelectorAll('input[name="grade"]');
const loadMoreBtn = document.querySelector('.load-more');
const bannerCarousel = document.querySelector('.carousel-inner');

// ==================== State Management ====================
let currentMovies = [...moviesData];
let displayedCount = 12;
let currentFilters = {
    genre: 'all genres',
    year: 'all years',
    studio: 'featured',
    search: ''
};

// ==================== Navigation Functions ====================
function navIsActive() {
    header.classList.toggle('active');
    nav.classList.toggle('active');
    navbarMenuBtn.classList.toggle('active');
}

function searchBarIsActive() {
    navbarForm.classList.toggle('active');
    if (navbarForm.classList.contains('active')) {
        navbarFormSearch.focus();
    }
}

// ==================== Movie Rendering ====================
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.dataset.movieId = movie.id;
    
    const genres = Array.isArray(movie.genre) ? movie.genre.join('/') : movie.genre;
    const isFav = typeof isFavorite === 'function' ? isFavorite('movies', movie.id) : false;
    
    card.innerHTML = `
        <div class="card-head">
            <img src="${movie.poster}" alt="${movie.title}" class="card-img" loading="lazy">
            <div class="card-overlay">
                <div class="bookmark ${isFav ? 'active' : ''}" data-movie-id="${movie.id}">
                    <ion-icon name="${isFav ? 'heart' : 'heart-outline'}"></ion-icon>
                </div>
                <div class="rating">
                    <ion-icon name="star"></ion-icon>
                    <span>${movie.rating}</span>
                </div>
                <div class="play" data-movie-id="${movie.id}">
                    <ion-icon name="play-circle"></ion-icon>
                </div>
            </div>
        </div>
        <div class="card-body">
            <h3 class="card-title">${movie.title}</h3>
            <div class="card-info">
                <span class="genre">${genres}</span>
                <span class="year">${movie.year}</span>
            </div>
        </div>
    `;
    
    // Add click handlers
    const playBtn = card.querySelector('.play');
    const bookmarkBtn = card.querySelector('.bookmark');
    
    playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showMovieDetails(movie.id);
    });
    
    bookmarkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof toggleMovieFavorite === 'function') {
            toggleMovieFavorite(movie.id, bookmarkBtn);
        } else {
            toggleBookmark(movie.id, bookmarkBtn);
        }
    });
    
    card.addEventListener('click', () => showMovieDetails(movie.id));
    
    return card;
}

function renderMovies(movies, append = false, targetGrid = null) {
    const grid = targetGrid || moviesGrid;
    if (!grid) return;
    
    if (!append) {
        grid.innerHTML = '';
        displayedCount = 12;
    }
    
    // Show empty state if no movies
    if (movies.length === 0) {
        const noMoviesTitle = typeof i18n !== 'undefined' ? i18n.t('movies.noMovies') : 'No movies found';
        const noMoviesDesc = typeof i18n !== 'undefined' ? i18n.t('movies.noMoviesDesc') : 'Try adjusting your filters or search terms';
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <h3>${noMoviesTitle}</h3>
                <p>${noMoviesDesc}</p>
            </div>
        `;
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        return;
    }
    
    const moviesToShow = movies.slice(0, displayedCount);
    
    moviesToShow.forEach(movie => {
        const card = createMovieCard(movie);
        grid.appendChild(card);
    });
    
    // Show/hide load more button
    if (loadMoreBtn) {
        if (movies.length > displayedCount) {
            loadMoreBtn.style.display = 'block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
}

function loadMoreMovies() {
    displayedCount += 12;
    filterAndRenderMovies();
}

// ==================== Filter Functions ====================
function filterMovies() {
    let filtered = [...moviesData];
    
    // Search filter
    if (currentFilters.search) {
        const searchTerm = currentFilters.search.toLowerCase();
        filtered = filtered.filter(movie => 
            movie.title.toLowerCase().includes(searchTerm) ||
            (movie.description && movie.description.toLowerCase().includes(searchTerm)) ||
            (Array.isArray(movie.genre) && movie.genre.some(g => g.toLowerCase().includes(searchTerm)))
        );
    }
    
    // Genre filter
    if (currentFilters.genre !== 'all genres') {
        filtered = filtered.filter(movie => {
            if (Array.isArray(movie.genre)) {
                return movie.genre.some(g => g.toLowerCase() === currentFilters.genre.toLowerCase());
            }
            return movie.genre.toLowerCase() === currentFilters.genre.toLowerCase();
        });
    }
    
    // Year filter
    if (currentFilters.year !== 'all years') {
        if (currentFilters.year.includes('-')) {
            const [start, end] = currentFilters.year.split('-').map(Number);
            filtered = filtered.filter(movie => movie.year >= start && movie.year <= end);
        } else {
            const year = Number(currentFilters.year);
            filtered = filtered.filter(movie => movie.year === year);
        }
    }
    
    // Studio filter
    if (currentFilters.studio === 'featured') {
        filtered = filtered.filter(movie => movie.studio === 'Marvel');
    } else if (currentFilters.studio === 'popular') {
        filtered = filtered.filter(movie => movie.studio === 'DC');
    } else if (currentFilters.studio === 'newest') {
        filtered = filtered.filter(movie => movie.studio === 'Disney');
    }
    
    return filtered;
}

function filterAndRenderMovies() {
    currentMovies = filterMovies();
    // Determine which grid to use based on current route
    const currentRoute = router ? router.getCurrentRoute() : 'home';
    const targetGrid = currentRoute === 'movies' ? moviesPageGrid : moviesGrid;
    renderMovies(currentMovies, false, targetGrid);
}

// ==================== Search Function ====================
function handleSearch(e) {
    e.preventDefault();
    currentFilters.search = navbarFormSearch.value.trim();
    filterAndRenderMovies();
    
    // Close search on mobile
    if (window.innerWidth <= 1200) {
        searchBarIsActive();
    }
}

// ==================== Movie Details Modal ====================
function showMovieDetails(movieId) {
    const movie = moviesData.find(m => m.id === movieId);
    if (!movie) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'movie-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">
                <ion-icon name="close"></ion-icon>
            </button>
            <div class="modal-body">
                <div class="modal-poster">
                    <img src="${movie.poster}" alt="${movie.title}">
                    <div class="modal-quality">${movie.quality}</div>
                </div>
                <div class="modal-info">
                    <h1 class="modal-title">${movie.title}</h1>
                    <div class="modal-meta">
                        <span class="modal-rating">
                            <ion-icon name="star"></ion-icon>
                            ${movie.rating}
                        </span>
                        <span class="modal-year">${movie.year}</span>
                        <span class="modal-duration">${movie.duration}</span>
                        <span class="modal-studio">${movie.studio}</span>
                    </div>
                    <div class="modal-genres">
                        ${Array.isArray(movie.genre) ? movie.genre.map(g => `<span class="genre-tag">${g}</span>`).join('') : `<span class="genre-tag">${movie.genre}</span>`}
                    </div>
                    <p class="modal-description">${movie.description || 'No description available.'}</p>
                    ${movie.cast ? `
                        <div class="modal-cast">
                            <h3>${typeof i18n !== 'undefined' ? i18n.t('movies.cast') : 'Cast'}</h3>
                            <p>${movie.cast.join(', ')}</p>
                        </div>
                    ` : ''}
                    <div class="modal-actions">
                        <button class="btn-play" data-movie-id="${movie.id}">
                            <ion-icon name="play"></ion-icon>
                            ${typeof i18n !== 'undefined' ? i18n.t('movies.playTrailer') : 'Play Trailer'}
                        </button>
                        <button class="btn-watch" data-movie-id="${movie.id}">
                            <ion-icon name="play-circle"></ion-icon>
                            ${typeof i18n !== 'undefined' ? i18n.t('movies.watchMovie') : 'Watch Movie'}
                        </button>
                    </div>
                </div>
            </div>
            ${movie.trailer ? `
                <div class="modal-trailer" id="trailer-${movie.id}">
                    <iframe 
                        src="${movie.trailer}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            ` : ''}
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal handlers
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    const closeModal = () => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
    };
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // Play trailer
    const playBtn = modal.querySelector('.btn-play');
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            const trailer = modal.querySelector('.modal-trailer');
            if (trailer) {
                trailer.style.display = 'block';
                trailer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }
    
    // Watch movie (placeholder)
    const watchBtn = modal.querySelector('.btn-watch');
    if (watchBtn) {
        watchBtn.addEventListener('click', () => {
            if (!userManager.isLoggedIn()) {
                showToast('notifications.watchLogin', 'warning');
                closeModal();
                setTimeout(() => showAuthModal('login'), 300);
                return;
            }
            
            // Check if premium is required (example: new releases)
            const requiresPremium = movie.year >= 2023;
            
            if (requiresPremium && !userManager.isPremium()) {
                showToast('notifications.premiumRequired', 'warning');
                closeModal();
                setTimeout(() => {
                    showAuthModal();
                    const upgradeBtn = document.getElementById('upgradeBtn');
                    if (upgradeBtn) upgradeBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
                return;
            }
            
            showToast('Video o\'ynatish funksiyasi keyinroq qo\'shiladi', 'info');
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// ==================== Bookmark Function ====================
function toggleBookmark(movieId, bookmarkBtn) {
    // Check if user is logged in
    if (!userManager.isLoggedIn()) {
        showToast('notifications.loginRequired', 'warning');
        showAuthModal('login');
        return;
    }

    const isBookmarked = userManager.isBookmarked(movieId);
    
    if (isBookmarked) {
        userManager.removeBookmark(movieId);
        bookmarkBtn.querySelector('ion-icon').setAttribute('name', 'bookmark-outline');
        bookmarkBtn.style.color = '';
        showToast('notifications.bookmarkRemoved', 'success');
    } else {
        if (userManager.addBookmark(movieId)) {
            bookmarkBtn.querySelector('ion-icon').setAttribute('name', 'bookmark');
            bookmarkBtn.style.color = 'var(--yellow)';
            showToast('notifications.bookmarkAdded', 'success');
        }
    }
}

function loadBookmarks() {
    if (!userManager.isLoggedIn()) {
        // Reset all bookmarks to outline
        document.querySelectorAll('.bookmark').forEach(btn => {
            btn.querySelector('ion-icon').setAttribute('name', 'bookmark-outline');
            btn.style.color = '';
        });
        return;
    }
    
    const bookmarks = userManager.getUser().bookmarks || [];
    
    // Reset all bookmarks first
    document.querySelectorAll('.bookmark').forEach(btn => {
        btn.querySelector('ion-icon').setAttribute('name', 'bookmark-outline');
        btn.style.color = '';
    });
    
    // Mark bookmarked movies
    bookmarks.forEach(movieId => {
        const bookmarkBtn = document.querySelector(`.bookmark[data-movie-id="${movieId}"]`);
        if (bookmarkBtn) {
            bookmarkBtn.querySelector('ion-icon').setAttribute('name', 'bookmark');
            bookmarkBtn.style.color = 'var(--yellow)';
        }
    });
}

// ==================== Banner Carousel ====================
function renderBanner() {
    if (!bannerCarousel) return;
    
    // Update carousel indicators
    const indicators = document.querySelector('.carousel-indicators');
    if (indicators) {
        indicators.innerHTML = bannerMovies.map((_, index) => `
            <button type="button" 
                    data-bs-target="#carouselExampleIndicators" 
                    data-bs-slide-to="${index}" 
                    ${index === 0 ? 'class="active" aria-current="true"' : ''} 
                    aria-label="Slide ${index + 1}">
            </button>
        `).join('');
    }
    
    bannerCarousel.innerHTML = bannerMovies.map((movie, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <section class="banner">
                <div class="banner-card" data-movie-id="${movie.id}">
                    <img src="${movie.poster}" alt="${movie.title}" class="banner-img">
                    <div class="card-content">
                        <div class="card-info">
                            <div class="genre4">
                                <ion-icon name="film"></ion-icon>
                                <span class="asos">${movie.genre}</span>
                            </div>
                            <div class="genre4">
                                <ion-icon name="calendar"></ion-icon>
                                <span class="asos">${movie.year}</span>
                            </div>
                            <div class="genre4">
                                <ion-icon name="time"></ion-icon>
                                <span class="asos">${movie.duration}</span>
                            </div>
                            <div class="quality">${movie.quality}</div>
                        </div>
                        <h2 class="card-title">${movie.title}</h2>
                    </div>
                </div>
            </section>
        </div>
    `).join('');
    
    // Add click handlers to banner cards after a short delay to ensure DOM is ready
    setTimeout(() => {
        document.querySelectorAll('.banner-card').forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                const movieId = parseInt(card.dataset.movieId);
                showMovieDetails(movieId);
            });
        });
    }, 100);
}

// ==================== Event Listeners ====================
navbarMenuBtn.addEventListener('click', navIsActive);
navbarSearchBtn.addEventListener('click', searchBarIsActive);
navbarFormCloseBtn.addEventListener('click', searchBarIsActive);
navbarForm.addEventListener('submit', handleSearch);
navbarFormSearch.addEventListener('input', (e) => {
    currentFilters.search = e.target.value.trim();
    filterAndRenderMovies();
});

genreFilter.addEventListener('change', (e) => {
    currentFilters.genre = e.target.value;
    filterAndRenderMovies();
});

yearFilter.addEventListener('change', (e) => {
    currentFilters.year = e.target.value;
    filterAndRenderMovies();
});

studioRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        currentFilters.studio = e.target.id;
        filterAndRenderMovies();
    });
});

loadMoreBtn.addEventListener('click', loadMoreMovies);

// ==================== Authentication Functions ====================
function showAuthModal(form = 'login') {
    const authModal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const userMenu = document.getElementById('userMenu');
    
    if (!authModal) return;
    
    authModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    if (userManager.isLoggedIn()) {
        // Show user menu
        loginForm.style.display = 'none';
        signupForm.style.display = 'none';
        userMenu.style.display = 'block';
        updateUserMenu();
    } else {
        // Show login or signup form
        userMenu.style.display = 'none';
        if (form === 'signup') {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
        } else {
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
        }
    }
}

function closeAuthModal() {
    const authModal = document.getElementById('authModal');
    if (authModal) {
        authModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function updateUserMenu() {
    if (!userManager.isLoggedIn()) return;
    
    const user = userManager.getUser();
    const userName = document.getElementById('userName');
    const userPlan = document.getElementById('userPlan');
    const upgradeBtn = document.getElementById('upgradeBtn');
    
    if (userName) userName.textContent = user.name;
    if (userPlan) {
        userPlan.textContent = user.plan === 'premium' ? 'Premium Plan' : 'Basic Plan';
        userPlan.className = 'user-plan ' + user.plan;
    }
    if (upgradeBtn) {
        upgradeBtn.style.display = user.plan === 'premium' ? 'none' : 'flex';
    }
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!toast || !toastMessage) return;
    
    // Use i18n if message is a translation key
    const displayMessage = typeof i18n !== 'undefined' && i18n.t ? 
        (message.includes('.') ? i18n.t(message) : message) : message;
    
    toastMessage.textContent = displayMessage;
    toast.className = 'toast show ' + type;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==================== Initialize ====================
function init() {
    renderBanner();
    renderMovies(currentMovies);
    loadBookmarks();
    
    // Initialize authentication
    initAuth();
    
    // Initialize router (will handle initial route)
    if (typeof router !== 'undefined') {
        // Router is already initialized, just ensure it handles the current route
        router.handleRoute();
    }
    
    // Initialize Bootstrap carousel if available
    if (typeof bootstrap !== 'undefined') {
        const carouselElement = document.querySelector('#carouselExampleIndicators');
        if (carouselElement) {
            const carousel = new bootstrap.Carousel(carouselElement, {
                interval: 5000,
                wrap: true,
                pause: 'hover'
            });
        }
    }
    
    // Listen for language changes to re-translate
    window.addEventListener('languageChanged', () => {
        if (typeof router !== 'undefined') {
            const route = router.getCurrentRoute();
            if (route === 'tv' && typeof renderTVChannels === 'function') {
                renderTVChannels();
            } else if (route === 'favorites' && typeof renderFavorites === 'function') {
                renderFavorites();
            }
        }
    });
}

// ==================== Language Modal Functions ====================
function showLanguageModal() {
    const languageModal = document.getElementById('languageModal');
    if (!languageModal) return;
    
    languageModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Highlight current language
    const currentLang = i18n.getCurrentLanguage();
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.lang === currentLang) {
            option.classList.add('active');
        }
    });
}

function closeLanguageModal() {
    const languageModal = document.getElementById('languageModal');
    if (languageModal) {
        languageModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function initLanguageModal() {
    const languageModal = document.getElementById('languageModal');
    const languageOptions = document.querySelectorAll('.language-option');
    const languageSave = document.getElementById('languageSave');
    const languageCancel = document.getElementById('languageCancel');
    const languageModalClose = document.querySelector('.language-modal-close');
    const languageModalOverlay = document.querySelector('.language-modal .modal-overlay');
    
    let selectedLanguage = i18n.getCurrentLanguage();
    
    // Language option click
    languageOptions.forEach(option => {
        option.addEventListener('click', () => {
            languageOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            selectedLanguage = option.dataset.lang;
        });
    });
    
    // Save language
    if (languageSave) {
        languageSave.addEventListener('click', () => {
            if (selectedLanguage !== i18n.getCurrentLanguage()) {
                i18n.changeLanguage(selectedLanguage);
                showToast(i18n.t('notifications.languageChanged'), 'success');
                
                // Re-translate dynamically generated content
                if (typeof renderMovies === 'function') {
                    // Update empty state if visible
                    const emptyState = document.querySelector('.empty-state');
                    if (emptyState) {
                        const h3 = emptyState.querySelector('h3');
                        const p = emptyState.querySelector('p');
                        if (h3) h3.textContent = i18n.t('movies.noMovies');
                        if (p) p.textContent = i18n.t('movies.noMoviesDesc');
                    }
                    
                    // Update load more button
                    if (loadMoreBtn) {
                        loadMoreBtn.textContent = i18n.t('movies.loadMore');
                    }
                }
            }
            closeLanguageModal();
        });
    }
    
    // Cancel
    if (languageCancel) {
        languageCancel.addEventListener('click', closeLanguageModal);
    }
    
    // Close button
    if (languageModalClose) {
        languageModalClose.addEventListener('click', closeLanguageModal);
    }
    
    // Overlay click
    if (languageModalOverlay) {
        languageModalOverlay.addEventListener('click', closeLanguageModal);
    }
    
    // Close on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && languageModal.classList.contains('active')) {
            closeLanguageModal();
        }
    });
}

// ==================== Initialize Authentication ====================
function initAuth() {
    const loginBtn = document.getElementById('loginBtn');
    const authModal = document.getElementById('authModal');
    const loginFormElement = document.getElementById('loginFormElement');
    const signupFormElement = document.getElementById('signupFormElement');
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    const logoutBtn = document.getElementById('logoutBtn');
    const upgradeBtn = document.getElementById('upgradeBtn');
    const authModalClose = document.querySelector('.auth-modal-close');
    const authModalOverlay = document.querySelector('.auth-modal .modal-overlay');
    
    // Login button click
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (userManager.isLoggedIn()) {
                showAuthModal();
            } else {
                showAuthModal('login');
            }
        });
    }
    
    // Close modal
    if (authModalClose) {
        authModalClose.addEventListener('click', closeAuthModal);
    }
    if (authModalOverlay) {
        authModalOverlay.addEventListener('click', closeAuthModal);
    }
    
    // Switch between login and signup
    if (showSignup) {
        showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthModal('signup');
        });
    }
    if (showLogin) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthModal('login');
        });
    }
    
    // Login form submit
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const email = formData.get('email');
            const password = formData.get('password');
            
            const result = userManager.login(email, password);
            
            if (result.success) {
                showToast('notifications.loginSuccess', 'success');
                closeAuthModal();
                loadBookmarks();
                updateUserMenu();
            } else {
                const errorKey = result.message.includes('Email') || result.message.includes('email') ? 
                    'errors.wrongCredentials' : 'errors.wrongCredentials';
                showToast(errorKey, 'error');
            }
        });
    }
    
    // Signup form submit
    if (signupFormElement) {
        signupFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const name = formData.get('name');
            const email = formData.get('email');
            const password = formData.get('password');
            const confirmPassword = formData.get('confirmPassword');
            
            if (password !== confirmPassword) {
                showToast('errors.passwordMismatch', 'error');
                return;
            }
            
            const result = userManager.register(email, password, name);
            
            if (result.success) {
                showToast('notifications.signupSuccess', 'success');
                closeAuthModal();
                loadBookmarks();
                updateUserMenu();
            } else {
                let errorKey = 'errors.wrongCredentials';
                if (result.message.includes('email') && result.message.includes('ro\'yxatdan')) {
                    errorKey = 'errors.emailExists';
                } else if (result.message.includes('Parol') || result.message.includes('parol')) {
                    errorKey = 'errors.shortPassword';
                } else if (result.message.includes('email') || result.message.includes('Email')) {
                    errorKey = 'errors.invalidEmail';
                }
                showToast(errorKey, 'error');
            }
        });
    }
    
    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            userManager.logout();
            showToast('notifications.logoutSuccess', 'success');
            closeAuthModal();
            loadBookmarks();
        });
    }
    
    // Upgrade to premium
    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const confirmMsg = i18n.t('notifications.premiumUpgrade');
            if (confirm(confirmMsg + ' (Demo rejimda)')) {
                const result = userManager.upgradeToPremium();
                if (result.success) {
                    showToast(i18n.t('notifications.premiumUpgrade'), 'success');
                    updateUserMenu();
                }
            }
        });
    }
    
    // Settings button - open language modal
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showLanguageModal();
        });
    }
    
    // Initialize language modal
    initLanguageModal();
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAuthModal();
        }
    });
    
    // Update UI on load
    userManager.updateUI();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
