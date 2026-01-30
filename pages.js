// Page-specific functionality: TV Channels, Favorites, etc.
'use strict';

// ==================== TV Channels ====================
function renderTVChannels() {
    const grid = document.getElementById('tvChannelsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (!tvChannels || tvChannels.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <h3 data-i18n="tv.noChannels">Kanallar topilmadi</h3>
                <p data-i18n="tv.selectChannel">Kanalni tanlang</p>
            </div>
        `;
        if (typeof i18n !== 'undefined') i18n.translatePage();
        return;
    }
    
    tvChannels.forEach(channel => {
        const channelCard = createTVChannelCard(channel);
        grid.appendChild(channelCard);
    });
    
    if (typeof i18n !== 'undefined') i18n.translatePage();
}

function createTVChannelCard(channel) {
    const card = document.createElement('div');
    card.className = 'tv-channel-card';
    card.dataset.channelId = channel.id;
    
    const channelName = getChannelName(channel);
    const isFavorite = isChannelFavorite(channel.id);
    
    card.innerHTML = `
        <div class="tv-channel-logo-wrapper">
            <img src="${channel.logo}" alt="${channelName}" class="tv-channel-logo-img">
            ${channel.isLive ? `<div class="tv-live-indicator" data-i18n="tv.live">Jonli</div>` : ''}
        </div>
        <div class="tv-channel-info">
            <h3 class="tv-channel-name">${channelName}</h3>
            <button class="tv-channel-favorite ${isFavorite ? 'active' : ''}" data-channel-id="${channel.id}">
                <ion-icon name="${isFavorite ? 'heart' : 'heart-outline'}"></ion-icon>
            </button>
        </div>
        <button class="tv-channel-play" data-channel-id="${channel.id}">
            <ion-icon name="play-circle"></ion-icon>
            <span data-i18n="tv.watching">Ko'rish</span>
        </button>
    `;
    
    // Add event listeners
    const playBtn = card.querySelector('.tv-channel-play');
    const favoriteBtn = card.querySelector('.tv-channel-favorite');
    
    playBtn.addEventListener('click', () => openTVPlayer(channel));
    favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleChannelFavorite(channel.id, favoriteBtn);
    });
    
    return card;
}

function openTVPlayer(channel) {
    const modal = document.getElementById('tvPlayerModal');
    const playerName = document.getElementById('tvPlayerName');
    const playerLogo = document.getElementById('tvPlayerLogo');
    const playerFrame = document.getElementById('tvPlayerFrame');
    
    if (!modal || !playerName || !playerLogo || !playerFrame) return;
    
    const channelName = getChannelName(channel);
    playerName.textContent = channelName;
    playerLogo.src = channel.logo;
    playerLogo.alt = channelName;
    
    // For demo, use a placeholder. In production, use actual stream URL
    playerFrame.src = channel.streamUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Close handlers
    const closeBtn = modal.querySelector('.tv-player-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    const closePlayer = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        playerFrame.src = ''; // Stop video
    };
    
    if (closeBtn) closeBtn.addEventListener('click', closePlayer);
    if (overlay) overlay.addEventListener('click', closePlayer);
    
    // Close on Escape
    const escHandler = (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closePlayer();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}

// ==================== Favorites Management ====================
function getFavorites() {
    const favorites = localStorage.getItem('dezo_max_favorites');
    return favorites ? JSON.parse(favorites) : { movies: [], series: [], tv: [] };
}

function saveFavorites(favorites) {
    localStorage.setItem('dezo_max_favorites', JSON.stringify(favorites));
}

function addToFavorites(type, itemId) {
    const favorites = getFavorites();
    if (!favorites[type].includes(itemId)) {
        favorites[type].push(itemId);
        saveFavorites(favorites);
        return true;
    }
    return false;
}

function removeFromFavorites(type, itemId) {
    const favorites = getFavorites();
    favorites[type] = favorites[type].filter(id => id !== itemId);
    saveFavorites(favorites);
    return true;
}

function isFavorite(type, itemId) {
    const favorites = getFavorites();
    return favorites[type].includes(itemId);
}

function isChannelFavorite(channelId) {
    return isFavorite('tv', channelId);
}

function toggleChannelFavorite(channelId, button) {
    const isFav = isChannelFavorite(channelId);
    
    if (isFav) {
        removeFromFavorites('tv', channelId);
        button.classList.remove('active');
        button.querySelector('ion-icon').setAttribute('name', 'heart-outline');
        showToast('favorites.removed', 'success');
    } else {
        addToFavorites('tv', channelId);
        button.classList.add('active');
        button.querySelector('ion-icon').setAttribute('name', 'heart');
        showToast('favorites.added', 'success');
    }
    
    // Update favorites page if visible
    if (router && router.getCurrentRoute() === 'favorites') {
        renderFavorites();
    }
}

function toggleMovieFavorite(movieId, button) {
    const isFav = isFavorite('movies', movieId);
    
    if (isFav) {
        removeFromFavorites('movies', movieId);
        if (button) {
            button.classList.remove('active');
            button.querySelector('ion-icon').setAttribute('name', 'heart-outline');
        }
        showToast('favorites.removed', 'success');
    } else {
        addToFavorites('movies', movieId);
        if (button) {
            button.classList.add('active');
            button.querySelector('ion-icon').setAttribute('name', 'heart');
        }
        showToast('favorites.added', 'success');
    }
    
    // Update favorites page if visible
    if (router && router.getCurrentRoute() === 'favorites') {
        renderFavorites();
    }
}

// ==================== Render Favorites Page ====================
function renderFavorites(filterType = 'all') {
    const grid = document.getElementById('favoritesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const favorites = getFavorites();
    let allItems = [];
    
    // Collect all favorites
    if (filterType === 'all' || filterType === 'movies') {
        favorites.movies.forEach(id => {
            const movie = moviesData.find(m => m.id === id);
            if (movie) allItems.push({ type: 'movie', data: movie });
        });
    }
    
    if (filterType === 'all' || filterType === 'series') {
        // Series would come from seriesData if available
        favorites.series.forEach(id => {
            allItems.push({ type: 'series', data: { id, title: `Series ${id}` } });
        });
    }
    
    if (filterType === 'all' || filterType === 'tv') {
        favorites.tv.forEach(id => {
            const channel = tvChannels.find(c => c.id === id);
            if (channel) allItems.push({ type: 'tv', data: channel });
        });
    }
    
    if (allItems.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <h3 data-i18n="favorites.empty">Sevimlilar bo'sh</h3>
                <p data-i18n="favorites.emptyDesc">Siz hali hech narsani sevimlilar ro'yxatiga qo'shmadingiz</p>
            </div>
        `;
        if (typeof i18n !== 'undefined') i18n.translatePage();
        return;
    }
    
    allItems.forEach(item => {
        let card;
        if (item.type === 'movie') {
            card = createFavoriteMovieCard(item.data);
        } else if (item.type === 'tv') {
            card = createFavoriteTVCard(item.data);
        } else {
            card = createFavoriteSeriesCard(item.data);
        }
        grid.appendChild(card);
    });
    
    if (typeof i18n !== 'undefined') i18n.translatePage();
}

function createFavoriteMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'favorite-card movie';
    card.innerHTML = `
        <div class="favorite-card-image">
            <img src="${movie.poster}" alt="${movie.title}">
            <button class="favorite-remove" data-type="movies" data-id="${movie.id}">
                <ion-icon name="close-circle"></ion-icon>
            </button>
        </div>
        <div class="favorite-card-info">
            <h3>${movie.title}</h3>
            <p>${movie.year} • ${Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}</p>
        </div>
    `;
    
    const removeBtn = card.querySelector('.favorite-remove');
    removeBtn.addEventListener('click', () => {
        removeFromFavorites('movies', movie.id);
        renderFavorites();
        showToast('favorites.removed', 'success');
    });
    
    card.addEventListener('click', () => {
        if (typeof showMovieDetails === 'function') {
            showMovieDetails(movie.id);
        }
    });
    
    return card;
}

function createFavoriteTVCard(channel) {
    const card = document.createElement('div');
    card.className = 'favorite-card tv';
    const channelName = getChannelName(channel);
    card.innerHTML = `
        <div class="favorite-card-image">
            <img src="${channel.logo}" alt="${channelName}">
            <button class="favorite-remove" data-type="tv" data-id="${channel.id}">
                <ion-icon name="close-circle"></ion-icon>
            </button>
        </div>
        <div class="favorite-card-info">
            <h3>${channelName}</h3>
            <p data-i18n="tv.live">Jonli</p>
        </div>
    `;
    
    const removeBtn = card.querySelector('.favorite-remove');
    removeBtn.addEventListener('click', () => {
        removeFromFavorites('tv', channel.id);
        renderFavorites();
        showToast('favorites.removed', 'success');
    });
    
    card.addEventListener('click', () => {
        openTVPlayer(channel);
    });
    
    return card;
}

function createFavoriteSeriesCard(series) {
    const card = document.createElement('div');
    card.className = 'favorite-card series';
    card.innerHTML = `
        <div class="favorite-card-image">
            <img src="https://via.placeholder.com/300x450" alt="${series.title}">
            <button class="favorite-remove" data-type="series" data-id="${series.id}">
                <ion-icon name="close-circle"></ion-icon>
            </button>
        </div>
        <div class="favorite-card-info">
            <h3>${series.title}</h3>
            <p data-i18n="series.title">Serial</p>
        </div>
    `;
    
    const removeBtn = card.querySelector('.favorite-remove');
    removeBtn.addEventListener('click', () => {
        removeFromFavorites('series', series.id);
        renderFavorites();
        showToast('favorites.removed', 'success');
    });
    
    return card;
}

// Initialize favorites tabs
function initFavoritesTabs() {
    const tabs = document.querySelectorAll('.favorites-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const type = tab.dataset.type;
            renderFavorites(type);
        });
    });
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initFavoritesTabs();
    });
} else {
    initFavoritesTabs();
}

// Export functions for router
if (typeof window !== 'undefined') {
    window.renderTVChannels = renderTVChannels;
    window.renderFavorites = renderFavorites;
    window.openTVPlayer = openTVPlayer;
    window.toggleMovieFavorite = toggleMovieFavorite;
    window.toggleChannelFavorite = toggleChannelFavorite;
    window.isFavorite = isFavorite;
}
