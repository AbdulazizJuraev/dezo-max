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
const bannerCarousel = document.getElementById('bannerCarousel');
const carouselIndicators = document.getElementById('carouselIndicators');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');

// ==================== State Management ====================
/**
 * Get the current movies data source (TMDB or static)
 * @returns {Array} Array of movies
 */
function getMoviesData() {
    // Use allMoviesData if available (from TMDB), otherwise fall back to moviesData
    if (typeof allMoviesData !== 'undefined' && allMoviesData.length > 0) {
        return allMoviesData;
    }
    return moviesData;
}

let currentMovies = [...getMoviesData()];
let displayedCount = 12;
let currentFilters = {
    genre: 'all genres',
    year: 'all years',
    studio: 'featured',
    search: ''
};

// ==================== Navigation Functions ====================
function closeNavMenu() {
    const navbarMenu = document.querySelector('.navbar-menu');
    const overlay = document.querySelector('.navbar-overlay');
    
    if (navbarMenu) {
        navbarMenu.classList.remove('active');
        navbarMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
        
        if (overlay) {
            overlay.style.display = 'none';
        }
    }
}

function navIsActive() {
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (navbarMenu) {
        const isActive = navbarMenu.classList.toggle('active');
        navbarMenuBtn.classList.toggle('active', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
        
        // Create or remove overlay
        let overlay = document.querySelector('.navbar-overlay');
        if (isActive) {
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'navbar-overlay';
                document.body.appendChild(overlay);
            }
            overlay.style.display = 'block';
            
            // Close menu when clicking overlay
            const closeMenu = () => {
                closeNavMenu();
                overlay.removeEventListener('click', closeMenu);
            };
            
            setTimeout(() => {
                overlay.addEventListener('click', closeMenu);
            }, 100);
        } else {
            if (overlay) {
                overlay.style.display = 'none';
            }
        }
    }
}

// Close menu button handler and link click handler
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.querySelector('.navbar-menu-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeNavMenu();
        });
    }
    
    // Close menu when clicking on navigation links (mobile)
    const navLinks = document.querySelectorAll('.navbar-nav .navbar-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Small delay to allow route navigation first
            setTimeout(() => {
                closeNavMenu();
            }, 100);
        });
    });
});

function searchBarIsActive() {
    navbarForm.classList.toggle('active');
    if (navbarForm.classList.contains('active')) {
        navbarFormSearch.focus();
    }
}

// ==================== Helper Functions ====================
function getStudioName(studio) {
    if (!i18n || !i18n.t) return studio;
    const studioKey = `studios.${studio.toLowerCase().replace(/\s+/g, '')}`;
    return i18n.t(studioKey) || studio;
}

// ==================== Image Fallback System ====================
const FALLBACK_POSTER = 'https://via.placeholder.com/300x450/1a1a2e/ffffff?text=No+Poster';
const FALLBACK_BANNER = 'https://via.placeholder.com/1920x1080/1a1a2e/ffffff?text=Movie+Banner';

function handleImageError(img, fallback = FALLBACK_POSTER) {
    if (img.src !== fallback) {
        img.src = fallback;
        img.onerror = null; // Prevent infinite loop
    }
}

function setupImageFallback(img, originalSrc, fallback = FALLBACK_POSTER) {
    img.onerror = () => handleImageError(img, fallback);
    img.src = originalSrc;
    
    // Also check if image loads successfully
    img.onload = () => {
        // Image loaded successfully
    };
}

function getMoviePoster(movie) {
    // Return the poster URL, or fallback if missing
    return movie.poster || FALLBACK_POSTER;
}

// ==================== Ratings System ====================
function renderRatings(movie, container, showInteractive = false) {
    if (!movie.ratings) return;
    
    const ratings = movie.ratings;
    const lang = i18n ? i18n.currentLanguage : 'en';
    const imdbLabel = i18n && i18n.t ? i18n.t('ratings.imdb') : 'IMDb';
    const rtLabel = i18n && i18n.t ? i18n.t('ratings.rottenTomatoes') : 'Rotten Tomatoes';
    const dezoLabel = i18n && i18n.t ? i18n.t('ratings.dezo') : 'Dezo Rating';
    
    let ratingsHTML = `
        <div class="movie-ratings">
            <div class="rating-item imdb-rating">
                <span class="rating-label">${imdbLabel}</span>
                <span class="rating-value">${ratings.imdb.toFixed(1)}</span>
            </div>
            <div class="rating-item rt-rating">
                <span class="rating-label">${rtLabel}</span>
                <span class="rating-value ${ratings.rottenTomatoes >= 60 ? 'fresh' : 'rotten'}">${ratings.rottenTomatoes}%</span>
            </div>
            <div class="rating-item dezo-rating">
                <span class="rating-label">${dezoLabel}</span>
                <div class="dezo-stars" data-movie-id="${movie.id}">
                    ${renderDezoStars(ratings.dezo, movie.id, showInteractive)}
                </div>
                <span class="rating-value">${ratings.dezo.toFixed(1)} / 10</span>
            </div>
        </div>
    `;
    
    if (container) {
        container.innerHTML = ratingsHTML;
        
        // Add interactive star rating if enabled
        if (showInteractive) {
            const starContainer = container.querySelector('.dezo-stars');
            if (starContainer) {
                starContainer.addEventListener('click', (e) => {
                    if (e.target.classList.contains('star')) {
                        const rating = parseInt(e.target.dataset.rating);
                        rateMovie(movie.id, rating);
                        updateDezoStars(starContainer, rating);
                    }
                });
            }
        }
    }
    
    return ratingsHTML;
}

function renderDezoStars(rating, movieId, interactive = false) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 10 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    let currentRating = 0;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        currentRating++;
        starsHTML += `<span class="star ${interactive ? 'interactive' : ''}" data-rating="${currentRating}" data-movie-id="${movieId}">⭐</span>`;
    }
    
    // Half star
    if (hasHalfStar) {
        currentRating++;
        starsHTML += `<span class="star half ${interactive ? 'interactive' : ''}" data-rating="${currentRating}" data-movie-id="${movieId}">⭐</span>`;
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        currentRating++;
        starsHTML += `<span class="star empty ${interactive ? 'interactive' : ''}" data-rating="${currentRating}" data-movie-id="${movieId}">☆</span>`;
    }
    
    return starsHTML;
}

function updateDezoStars(container, rating) {
    const stars = container.querySelectorAll('.star');
    stars.forEach((star, index) => {
        const starRating = index + 1;
        if (starRating <= rating) {
            star.classList.remove('empty');
            star.textContent = '⭐';
        } else {
            star.classList.add('empty');
            star.textContent = '☆';
        }
    });
}

function rateMovie(movieId, rating) {
    // Get existing ratings from localStorage
    let userRatings = JSON.parse(localStorage.getItem('dezoRatings') || '{}');
    userRatings[movieId] = rating;
    localStorage.setItem('dezoRatings', JSON.stringify(userRatings));
    
    // Calculate average rating
    const movie = getMoviesData().find(m => m.id === movieId);
    if (movie && movie.ratings) {
        // In a real app, you'd calculate from all user ratings
        // For now, we'll just update the display
    }
}

function getAverageDezoRating(movieId) {
    const userRatings = JSON.parse(localStorage.getItem('dezoRatings') || '{}');
    const movie = getMoviesData().find(m => m.id === movieId);
    if (!movie || !movie.ratings) return 0;
    
    const defaultRating = movie.ratings.dezo;
    const userRating = userRatings[movieId];
    
    if (userRating) {
        // Simple average (in production, calculate from all users)
        return (defaultRating + userRating) / 2;
    }
    
    return defaultRating;
}

// ==================== Movie Rendering ====================
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.dataset.movieId = movie.id;
    
    const title = getMovieTitle(movie);
    const genres = Array.isArray(movie.genre) ? movie.genre.map(g => {
        const lang = i18n ? i18n.currentLanguage : 'en';
        return i18n && i18n.t ? i18n.t(`genres.${g}`) : g;
    }).join(' / ') : movie.genre;
    const isFav = typeof isFavorite === 'function' ? isFavorite('movies', movie.id) : false;
    const studioName = getStudioName(movie.studio);
    const watchMovieText = i18n && i18n.t ? i18n.t('movies.watchMovie') : 'Watch Movie';
    const watchTrailerText = i18n && i18n.t ? i18n.t('movies.watchTrailer') : 'Watch Trailer';
    
    // Get ratings
    const ratings = movie.ratings || {};
    const imdbRating = ratings.imdb ? ratings.imdb.toFixed(1) : 'N/A';
    
    const posterUrl = getMoviePoster(movie);
    
    card.innerHTML = `
        <div class="card-head">
            <img src="${posterUrl}" alt="${title}" class="card-img" loading="lazy" data-poster="${posterUrl}">
            <div class="card-overlay">
                <div class="bookmark ${isFav ? 'active' : ''}" data-movie-id="${movie.id}">
                    <ion-icon name="${isFav ? 'heart' : 'heart-outline'}"></ion-icon>
                </div>
                <div class="card-actions">
                    <button class="btn-watch-movie" data-movie-id="${movie.id}">
                        <ion-icon name="play-circle"></ion-icon>
                        <span>${watchMovieText}</span>
                    </button>
                    <button class="btn-watch-trailer" data-movie-id="${movie.id}">
                        <ion-icon name="play"></ion-icon>
                        <span>${watchTrailerText}</span>
                    </button>
                </div>
            </div>
            ${ratings.imdb ? `
                <div class="card-rating-badge">
                    <ion-icon name="star"></ion-icon>
                    <span>${imdbRating}</span>
                </div>
            ` : ''}
        </div>
        <div class="card-body">
            <div class="studio-badge">${studioName}</div>
            <h3 class="card-title">${title}</h3>
            <div class="card-info">
                <span class="genre">${genres}</span>
                <span class="year">${movie.year}</span>
            </div>
            ${ratings.imdb || ratings.rottenTomatoes || ratings.dezo ? `
                <div class="card-ratings-mini">
                    ${ratings.imdb ? `<span class="mini-rating imdb">IMDb ${imdbRating}</span>` : ''}
                    ${ratings.rottenTomatoes ? `<span class="mini-rating rt ${ratings.rottenTomatoes >= 60 ? 'fresh' : 'rotten'}">RT ${ratings.rottenTomatoes}%</span>` : ''}
                </div>
            ` : ''}
        </div>
    `;
    
    // Add click handlers
    const watchMovieBtn = card.querySelector('.btn-watch-movie');
    const watchTrailerBtn = card.querySelector('.btn-watch-trailer');
    const bookmarkBtn = card.querySelector('.bookmark');
    
    if (watchMovieBtn) {
        watchMovieBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // In production, this would start the movie
            showMovieDetails(movie.id);
        });
    }
    
    if (watchTrailerBtn) {
        watchTrailerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showTrailer(movie.id);
        });
    }
    
    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (typeof toggleMovieFavorite === 'function') {
                toggleMovieFavorite(movie.id, bookmarkBtn);
            } else {
                toggleBookmark(movie.id, bookmarkBtn);
            }
        });
    }
    
    card.addEventListener('click', () => showMovieDetails(movie.id));
    
    // Setup image fallback
    const cardImg = card.querySelector('.card-img');
    if (cardImg) {
        setupImageFallback(cardImg, posterUrl, FALLBACK_POSTER);
    }
    
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
    let filtered = [...getMoviesData()];
    
    // Filter for Marvel and DC movies only
    filtered = filtered.filter(movie => 
        movie.studio === 'Marvel' || movie.studio === 'DC'
    );
    
    // Search filter
    if (currentFilters.search) {
        const searchTerm = currentFilters.search.toLowerCase();
        filtered = filtered.filter(movie => {
            const title = getMovieTitle(movie).toLowerCase();
            const description = getMovieDescription(movie).toLowerCase();
            const genreMatch = Array.isArray(movie.genre) 
                ? movie.genre.some(g => {
                    const genreText = i18n && i18n.t ? i18n.t(`genres.${g}`) : g;
                    return genreText.toLowerCase().includes(searchTerm);
                })
                : false;
            
            return title.includes(searchTerm) || 
                   description.includes(searchTerm) || 
                   genreMatch;
        });
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
    const movie = getMoviesData().find(m => m.id === movieId);
    if (!movie) return;
    
    const title = getMovieTitle(movie);
    const description = getMovieDescription(movie);
    const studioName = getStudioName(movie.studio);
    const genres = Array.isArray(movie.genre) ? movie.genre.map(g => {
        const lang = i18n ? i18n.currentLanguage : 'en';
        const genreText = i18n && i18n.t ? i18n.t(`genres.${g}`) : g;
        return `<span class="genre-tag">${genreText}</span>`;
    }).join('') : `<span class="genre-tag">${movie.genre}</span>`;
    
    const castLabel = i18n && i18n.t ? i18n.t('movies.cast') : 'Cast';
    const watchMovieText = i18n && i18n.t ? i18n.t('movies.watchMovie') : 'Watch Movie';
    const watchTrailerText = i18n && i18n.t ? i18n.t('movies.watchTrailer') : 'Watch Trailer';
    const releaseYearLabel = i18n && i18n.t ? i18n.t('movies.releaseYear') : 'Release Year';
    const durationLabel = i18n && i18n.t ? i18n.t('movies.duration') : 'Duration';
    const studioLabel = i18n && i18n.t ? i18n.t('movies.studio') : 'Studio';
    
    const modalPoster = getMoviePoster(movie);
    
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
                    <img src="${modalPoster}" alt="${title}" data-poster="${modalPoster}">
                    <div class="modal-quality">${movie.quality}</div>
                </div>
                <div class="modal-info">
                    <h1 class="modal-title">${title}</h1>
                    <div class="modal-meta">
                        <span class="modal-year"><strong>${releaseYearLabel}:</strong> ${movie.year}</span>
                        <span class="modal-duration"><strong>${durationLabel}:</strong> ${movie.duration}</span>
                        <span class="modal-studio"><strong>${studioLabel}:</strong> ${studioName}</span>
                    </div>
                    <div class="modal-genres">
                        ${genres}
                    </div>
                    ${movie.ratings ? `
                        <div class="modal-ratings-container"></div>
                    ` : ''}
                    <p class="modal-description">${description || (i18n && i18n.t ? i18n.t('movies.noDescription') : 'No description available.')}</p>
                    ${movie.cast ? `
                        <div class="modal-cast">
                            <h3>${castLabel}</h3>
                            <p>${movie.cast.join(', ')}</p>
                        </div>
                    ` : ''}
                    <div class="modal-actions">
                        <button class="btn-watch-movie" data-movie-id="${movie.id}">
                            <ion-icon name="play-circle"></ion-icon>
                            ${watchMovieText}
                        </button>
                        <button class="btn-watch-trailer" data-movie-id="${movie.id}">
                            <ion-icon name="play"></ion-icon>
                            ${watchTrailerText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Render ratings
    if (movie.ratings) {
        const ratingsContainer = modal.querySelector('.modal-ratings-container');
        if (ratingsContainer) {
            renderRatings(movie, ratingsContainer, true);
        }
    }
    
    // Setup image fallback for modal poster
    const modalImg = modal.querySelector('.modal-poster img');
    if (modalImg) {
        setupImageFallback(modalImg, modalPoster, FALLBACK_POSTER);
    }
    
    // Close modal handlers
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    const closeModal = () => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
    };
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // Watch movie button
    const watchMovieBtn = modal.querySelector('.btn-watch-movie');
    if (watchMovieBtn) {
        watchMovieBtn.addEventListener('click', () => {
            // In production, this would start the movie
            closeModal();
        });
    }
    
    // Watch trailer button
    const watchTrailerBtn = modal.querySelector('.btn-watch-trailer');
    if (watchTrailerBtn) {
        watchTrailerBtn.addEventListener('click', () => {
            showTrailer(movie.id);
        });
    }
}

function showTrailer(movieId) {
    const movie = getMoviesData().find(m => m.id === movieId);
    if (!movie || !movie.trailer) return;
    
    const title = getMovieTitle(movie);
    const trailerTitle = i18n && i18n.t ? i18n.t('trailer.title') : 'Trailer';
    
    const trailerModal = document.createElement('div');
    trailerModal.className = 'trailer-modal';
    trailerModal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="trailer-modal-content">
            <button class="modal-close">
                <ion-icon name="close"></ion-icon>
            </button>
            <h2 class="trailer-title">${trailerTitle}: ${title}</h2>
            <div class="trailer-player">
                <iframe 
                    src="${movie.trailer}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
        </div>
    `;
    
    document.body.appendChild(trailerModal);
    document.body.style.overflow = 'hidden';
    
    const closeBtn = trailerModal.querySelector('.modal-close');
    const overlay = trailerModal.querySelector('.modal-overlay');
    
    const closeTrailer = () => {
        document.body.removeChild(trailerModal);
        document.body.style.overflow = '';
    };
    
    closeBtn.addEventListener('click', closeTrailer);
    overlay.addEventListener('click', closeTrailer);
    
    // Stop video when modal closes
    const iframe = trailerModal.querySelector('iframe');
    if (iframe) {
        const originalSrc = iframe.src;
        closeBtn.addEventListener('click', () => {
            iframe.src = '';
            setTimeout(() => {
                iframe.src = originalSrc;
            }, 100);
        });
    }
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
let currentSlide = 0;
let carouselInterval = null;
let isPaused = false;

function getMovieTitle(movie) {
    if (typeof movie.title === 'object' && movie.title !== null) {
        const lang = i18n ? i18n.currentLanguage : 'en';
        return movie.title[lang] || movie.title.en || movie.title.uz || Object.values(movie.title)[0];
    }
    return movie.title;
}

function getMovieDescription(movie) {
    if (typeof movie.description === 'object' && movie.description !== null) {
        const lang = i18n ? i18n.currentLanguage : 'en';
        return movie.description[lang] || movie.description.en || movie.description.uz || Object.values(movie.description)[0];
    }
    return movie.description || '';
}

function getGenreText(genre) {
    if (Array.isArray(genre)) {
        return genre.map(g => {
            const lang = i18n ? i18n.currentLanguage : 'en';
            return i18n && i18n.t ? i18n.t(`genres.${g}`) : g;
        }).join(' / ');
    }
    const lang = i18n ? i18n.currentLanguage : 'en';
    return i18n && i18n.t ? i18n.t(`genres.${genre}`) : genre;
}

function renderBanner() {
    // Get current banner movies (may be updated from TMDB)
    const currentBannerMovies = typeof getBannerMovies === 'function' 
        ? getBannerMovies() 
        : bannerMovies;
    
    if (!bannerCarousel || !currentBannerMovies || currentBannerMovies.length === 0) return;
    
    // Update carousel indicators
    if (carouselIndicators) {
        carouselIndicators.innerHTML = currentBannerMovies.map((_, index) => `
            <button type="button" 
                    class="carousel-indicator ${index === 0 ? 'active' : ''}" 
                    data-slide="${index}"
                    aria-label="Slide ${index + 1}">
            </button>
        `).join('');
    }
    
    // Render carousel items
    bannerCarousel.innerHTML = currentBannerMovies.map((movie, index) => {
        const title = getMovieTitle(movie);
        const genre = getGenreText(movie.genre);
        
        const bannerPoster = getMoviePoster(movie);
        
        return `
            <div class="carousel-item ${index === 0 ? 'active' : ''}" data-slide="${index}">
                <section class="banner">
                    <div class="banner-card" data-movie-id="${movie.id}">
                        <img src="${bannerPoster}" alt="${title}" class="banner-img" data-poster="${bannerPoster}">
                        <div class="card-content">
                            <div class="card-info">
                                <div class="genre4">
                                    <ion-icon name="film"></ion-icon>
                                    <span class="asos">${genre}</span>
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
                            <h2 class="card-title">${title}</h2>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }).join('');
    
    // Add click handlers to banner cards and setup image fallbacks
    setTimeout(() => {
        document.querySelectorAll('.banner-card').forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                const movieId = parseInt(card.dataset.movieId);
                showMovieDetails(movieId);
            });
            
            // Setup image fallback for banner images
            const bannerImg = card.querySelector('.banner-img');
            if (bannerImg) {
                setupImageFallback(bannerImg, bannerImg.dataset.poster || bannerImg.src, FALLBACK_BANNER);
            }
        });
    }, 100);
    
    // Initialize carousel controls
    initCarouselControls();
    startCarousel();
}

function initCarouselControls() {
    if (carouselPrev) {
        carouselPrev.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
            resetCarousel();
        });
    }
    
    if (carouselNext) {
        carouselNext.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
            resetCarousel();
        });
    }
    
    // Indicator clicks
    if (carouselIndicators) {
        carouselIndicators.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
                resetCarousel();
            });
        });
    }
    
    // Pause on hover
    if (bannerCarousel) {
        const container = bannerCarousel.closest('.banner-carousel-container');
        if (container) {
            container.addEventListener('mouseenter', () => {
                isPaused = true;
                stopCarousel();
            });
            container.addEventListener('mouseleave', () => {
                isPaused = false;
                startCarousel();
            });
        }
    }
    
    // Touch/swipe support for mobile
    addSwipeSupport();
}

function addSwipeSupport() {
    if (!bannerCarousel) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;
    
    bannerCarousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        isSwiping = true;
    }, { passive: true });
    
    bannerCarousel.addEventListener('touchmove', (e) => {
        if (isSwiping) {
            touchEndX = e.changedTouches[0].screenX;
        }
    }, { passive: true });
    
    bannerCarousel.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        
        const swipeDistance = touchStartX - touchEndX;
        const minSwipeDistance = 50; // Minimum distance for swipe
        
        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                // Swipe left - go to next slide
                goToSlide(currentSlide + 1);
            } else {
                // Swipe right - go to previous slide
                goToSlide(currentSlide - 1);
            }
            resetCarousel();
        }
        
        isSwiping = false;
        touchStartX = 0;
        touchEndX = 0;
    }, { passive: true });
}

function goToSlide(index) {
    if (!bannerCarousel) return;
    
    const items = bannerCarousel.querySelectorAll('.carousel-item');
    if (items.length === 0) return;
    
    const prevIndex = currentSlide;
    
    // Handle wrap-around
    if (index < 0) {
        index = items.length - 1;
    } else if (index >= items.length) {
        index = 0;
    }
    
    // Update classes for slide animation (left to right)
    items.forEach((item, i) => {
        item.classList.remove('active', 'prev', 'next');
        
        if (i === index) {
            item.classList.add('active');
        } else if (i === prevIndex) {
            // Previous slide
            if (index > prevIndex || (prevIndex === items.length - 1 && index === 0)) {
                item.classList.add('prev');
            } else {
                item.classList.add('next');
            }
        } else if (i < prevIndex && i > index) {
            // Slides between prev and current
            item.classList.add('next');
        } else if (i > prevIndex && i < index) {
            item.classList.add('prev');
        }
    });
    
    if (carouselIndicators) {
        const indicators = carouselIndicators.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }
    
    currentSlide = index;
}

function startCarousel() {
    if (isPaused || !bannerCarousel) return;
    stopCarousel();
    carouselInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
}

function stopCarousel() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }
}

function resetCarousel() {
    stopCarousel();
    if (!isPaused) {
        startCarousel();
    }
}

// ==================== Event Listeners ====================
navbarMenuBtn.addEventListener('click', navIsActive);
navbarSearchBtn.addEventListener('click', searchBarIsActive);
navbarFormCloseBtn.addEventListener('click', searchBarIsActive);
navbarForm.addEventListener('submit', handleSearch);
navbarFormSearch.addEventListener('input', (e) => {
    const searchValue = e.target.value.trim();
    currentFilters.search = searchValue;
    
    // Filter and render movies in real-time
    filterAndRenderMovies();
    
    // Also update the displayed count
    displayedCount = 12;
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

// ==================== Navbar Scroll Effect ====================
function initNavbarScrollEffect() {
    if (!header) return;
    
    let ticking = false;
    
    function updateNavbar() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        ticking = false;
    }
    
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial check
    updateNavbar();
}

// ==================== Initialize ====================
function init() {
    // Initialize navbar scroll effect
    initNavbarScrollEffect();
    
    // Refresh movies data in case TMDB loaded
    currentMovies = [...getMoviesData()];
    
    renderBanner();
    renderMovies(currentMovies);
    loadBookmarks();
    
    // Re-render when TMDB movies are loaded
    if (typeof loadMoviesFromTMDB === 'function') {
        // Wait a bit for TMDB to load, then refresh
        setTimeout(() => {
            currentMovies = [...getMoviesData()];
            filterAndRenderMovies();
        }, 2000);
    }
    
    // Re-render banner on language change
    if (typeof i18n !== 'undefined' && i18n.onLanguageChange) {
        i18n.onLanguageChange(() => {
            renderBanner();
            filterAndRenderMovies();
        });
    }
    
    // Initialize authentication
    initAuth();
    
    // Initialize router (will handle initial route)
    if (typeof router !== 'undefined') {
        // Router is already initialized, just ensure it handles the current route
        router.handleRoute();
    }
    
    // Carousel is initialized in renderBanner()
    
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
