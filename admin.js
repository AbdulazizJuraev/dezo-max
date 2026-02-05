// Admin Dashboard JavaScript

// ==================== State Management ====================
let adminMovies = [];
let editingMovieId = null;

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
    loadAdminMovies();
    initializeNavigation();
    initializeModals();
    initializeForm();
    initializeTable();
    initializeSettings();
    updateStatistics();
});

// ==================== Navigation ====================
function initializeNavigation() {
    const navItems = document.querySelectorAll('.admin-nav-item');
    const sections = document.querySelectorAll('.admin-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = item.dataset.section;

            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Show target section
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetSection).classList.add('active');
        });
    });
}

// ==================== Movie Management ====================
function loadAdminMovies() {
    // Try to get movies from the main movies data
    let moviesData = [];
    
    if (typeof getMoviesData === 'function') {
        moviesData = getMoviesData();
    } else if (typeof allMoviesData !== 'undefined' && Array.isArray(allMoviesData)) {
        moviesData = allMoviesData;
    } else if (typeof moviesData !== 'undefined' && Array.isArray(moviesData)) {
        moviesData = moviesData;
    }
    
    // Filter for Marvel and DC only
    adminMovies = moviesData.filter(movie => 
        movie && (movie.studio === 'Marvel' || movie.studio === 'DC')
    );
    
    // Load from localStorage if available (this takes precedence)
    const savedMovies = localStorage.getItem('adminMovies');
    if (savedMovies) {
        try {
            const parsed = JSON.parse(savedMovies);
            if (Array.isArray(parsed) && parsed.length > 0) {
                adminMovies = parsed;
            }
        } catch (e) {
            console.error('Error loading saved movies:', e);
        }
    }
    
    // If no movies found, initialize with empty array
    if (!Array.isArray(adminMovies)) {
        adminMovies = [];
    }
    
    renderMoviesTable();
}

function saveAdminMovies() {
    localStorage.setItem('adminMovies', JSON.stringify(adminMovies));
    updateStatistics();
}

function addMovie(movieData) {
    // Generate new ID if not provided
    if (!movieData.id) {
        const maxId = adminMovies.length > 0 
            ? Math.max(...adminMovies.map(m => m.id || 0))
            : 0;
        movieData.id = maxId + 1;
    }
    
    // Format movie data
    const newMovie = formatMovieData(movieData);
    adminMovies.push(newMovie);
    saveAdminMovies();
    renderMoviesTable();
    showToast('Movie added successfully!', 'success');
}

function updateMovie(id, movieData) {
    const index = adminMovies.findIndex(m => m.id === id);
    if (index !== -1) {
        const updatedMovie = formatMovieData(movieData, id);
        adminMovies[index] = updatedMovie;
        saveAdminMovies();
        renderMoviesTable();
        showToast('Movie updated successfully!', 'success');
    }
}

function deleteMovie(id) {
    if (confirm('Are you sure you want to delete this movie?')) {
        adminMovies = adminMovies.filter(m => m.id !== id);
        saveAdminMovies();
        renderMoviesTable();
        showToast('Movie deleted successfully!', 'success');
    }
}

function formatMovieData(data, id = null) {
    // Parse genres
    const genres = data.genre 
        ? data.genre.split(',').map(g => g.trim().toLowerCase())
        : ['action', 'adventure'];
    
    // Format title (support multilingual)
    const title = typeof data.title === 'string' 
        ? { en: data.title, ru: data.title, uz: data.title }
        : data.title || { en: 'Untitled', ru: 'Без названия', uz: 'Nomsiz' };
    
    // Format description (support multilingual)
    const description = typeof data.description === 'string'
        ? { en: data.description, ru: data.description, uz: data.description }
        : data.description || { en: 'No description', ru: 'Нет описания', uz: 'Tavsif yo\'q' };
    
    // Calculate ratings
    const imdbRating = parseFloat(data.rating) || 7.0;
    const ratings = {
        imdb: imdbRating,
        rottenTomatoes: Math.round(imdbRating * 10),
        dezo: parseFloat((imdbRating * 1.2).toFixed(1))
    };
    
    return {
        id: id || data.id || Date.now(),
        title: title,
        description: description,
        genre: genres,
        year: parseInt(data.year) || new Date().getFullYear(),
        duration: data.duration || '2h 0min',
        quality: '4K',
        poster: data.poster || 'https://via.placeholder.com/300x450/1a1a2e/ffffff?text=No+Poster',
        studio: data.universe || 'Marvel',
        trailer: data.trailer || null,
        cast: data.cast || [],
        ratings: ratings
    };
}

// ==================== Table Rendering ====================
function renderMoviesTable(filteredMovies = null) {
    const tbody = document.getElementById('moviesTableBody');
    if (!tbody) return;
    
    const moviesToRender = filteredMovies || adminMovies;
    
    if (moviesToRender.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px; color: var(--off-white);">
                    No movies found. Click "Add New Movie" to get started.
                </td>
            </tr>
        `;
        updateTableInfo(0);
        return;
    }
    
    tbody.innerHTML = moviesToRender.map(movie => {
        const title = typeof movie.title === 'object' 
            ? (movie.title.en || movie.title.uz || Object.values(movie.title)[0])
            : movie.title;
        
        const rating = movie.ratings?.imdb || 0;
        
        return `
            <tr>
                <td>
                    <img src="${movie.poster}" alt="${title}" class="table-poster" 
                         onerror="this.src='https://via.placeholder.com/60x90/1a1a2e/ffffff?text=No+Image'">
                </td>
                <td><strong>${title}</strong></td>
                <td>
                    <span class="universe-badge ${movie.studio.toLowerCase()}">${movie.studio}</span>
                </td>
                <td>${movie.year}</td>
                <td>
                    <span class="rating-badge">⭐ ${rating.toFixed(1)}</span>
                </td>
                <td>
                    <div class="table-actions">
                        <button class="table-action-btn edit" onclick="editMovie(${movie.id})" 
                                title="Edit Movie">
                            <ion-icon name="create"></ion-icon>
                        </button>
                        <button class="table-action-btn delete" onclick="deleteMovie(${movie.id})" 
                                title="Delete Movie">
                            <ion-icon name="trash"></ion-icon>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
    
    updateTableInfo(moviesToRender.length);
}

function updateTableInfo(count) {
    const info = document.getElementById('tableInfo');
    if (info) {
        info.textContent = `Showing ${count} movie${count !== 1 ? 's' : ''}`;
    }
}

// Make functions globally available for onclick handlers
window.editMovie = function(id) {
    const movie = adminMovies.find(m => m.id === id);
    if (movie) {
        editingMovieId = id;
        openMovieModal(movie);
    }
};

window.deleteMovie = function(id) {
    deleteMovie(id);
};

// ==================== Table Filtering ====================
function initializeTable() {
    const searchInput = document.getElementById('movieSearch');
    const universeFilter = document.getElementById('universeFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterMovies);
    }
    
    if (universeFilter) {
        universeFilter.addEventListener('change', filterMovies);
    }
}

function filterMovies() {
    const searchTerm = document.getElementById('movieSearch')?.value.toLowerCase() || '';
    const universeFilter = document.getElementById('universeFilter')?.value || '';
    
    let filtered = adminMovies.filter(movie => {
        const title = typeof movie.title === 'object' 
            ? (movie.title.en || movie.title.uz || Object.values(movie.title)[0])
            : movie.title;
        
        const matchesSearch = !searchTerm || title.toLowerCase().includes(searchTerm);
        const matchesUniverse = !universeFilter || movie.studio === universeFilter;
        
        return matchesSearch && matchesUniverse;
    });
    
    renderMoviesTable(filtered);
}

// ==================== Modal Management ====================
function initializeModals() {
    const addBtn = document.getElementById('addMovieBtn');
    const closeBtn = document.getElementById('closeModalBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const modal = document.getElementById('movieModal');
    
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            editingMovieId = null;
            openMovieModal();
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMovieModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeMovieModal);
    }
    
    if (modal) {
        const overlay = modal.querySelector('.admin-modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', closeMovieModal);
        }
    }
    
    // Import modal
    const importModal = document.getElementById('importModal');
    const closeImportBtn = document.getElementById('closeImportModalBtn');
    const cancelImportBtn = document.getElementById('cancelImportBtn');
    
    if (closeImportBtn) {
        closeImportBtn.addEventListener('click', () => {
            importModal?.classList.remove('active');
        });
    }
    
    if (cancelImportBtn) {
        cancelImportBtn.addEventListener('click', () => {
            importModal?.classList.remove('active');
        });
    }
}

function openMovieModal(movie = null) {
    const modal = document.getElementById('movieModal');
    const form = document.getElementById('movieForm');
    const modalTitle = document.getElementById('modalTitle');
    const submitBtnText = document.getElementById('submitBtnText');
    
    if (!modal || !form) return;
    
    if (movie) {
        // Edit mode
        modalTitle.textContent = 'Edit Movie';
        submitBtnText.textContent = 'Update Movie';
        
        document.getElementById('movieId').value = movie.id;
        document.getElementById('movieTitle').value = typeof movie.title === 'object' 
            ? (movie.title.en || Object.values(movie.title)[0])
            : movie.title;
        document.getElementById('movieUniverse').value = movie.studio;
        document.getElementById('movieYear').value = movie.year;
        document.getElementById('moviePoster').value = movie.poster;
        document.getElementById('movieDescription').value = typeof movie.description === 'object'
            ? (movie.description.en || Object.values(movie.description)[0])
            : movie.description;
        document.getElementById('movieDuration').value = movie.duration;
        document.getElementById('movieGenre').value = Array.isArray(movie.genre) 
            ? movie.genre.join(', ')
            : movie.genre;
        document.getElementById('movieRating').value = movie.ratings?.imdb || '';
    } else {
        // Add mode
        modalTitle.textContent = 'Add New Movie';
        submitBtnText.textContent = 'Add Movie';
        form.reset();
        document.getElementById('movieId').value = '';
    }
    
    modal.classList.add('active');
}

function closeMovieModal() {
    const modal = document.getElementById('movieModal');
    if (modal) {
        modal.classList.remove('active');
        editingMovieId = null;
    }
}

// ==================== Form Handling ====================
function initializeForm() {
    const form = document.getElementById('movieForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const movieData = {
        id: formData.get('id') || null,
        title: formData.get('title'),
        universe: formData.get('universe'),
        year: formData.get('year'),
        poster: formData.get('poster'),
        description: formData.get('description'),
        duration: formData.get('duration'),
        genre: formData.get('genre'),
        rating: formData.get('rating')
    };
    
    if (editingMovieId) {
        updateMovie(editingMovieId, movieData);
    } else {
        addMovie(movieData);
    }
    
    closeMovieModal();
}

// ==================== Statistics ====================
function updateStatistics() {
    const marvelCount = adminMovies.filter(m => m.studio === 'Marvel').length;
    const dcCount = adminMovies.filter(m => m.studio === 'DC').length;
    const totalCount = adminMovies.length;
    const goalProgress = Math.min(100, Math.round((totalCount / 100) * 100));
    
    const marvelCountEl = document.getElementById('marvelCount');
    const dcCountEl = document.getElementById('dcCount');
    const totalCountEl = document.getElementById('totalCount');
    const goalProgressEl = document.getElementById('goalProgress');
    
    if (marvelCountEl) marvelCountEl.textContent = marvelCount;
    if (dcCountEl) dcCountEl.textContent = dcCount;
    if (totalCountEl) totalCountEl.textContent = totalCount;
    if (goalProgressEl) goalProgressEl.textContent = `${goalProgress}%`;
}

// ==================== Settings Management ====================
function initializeSettings() {
    // Load saved settings
    loadSettings();
    
    // Maintenance mode toggle
    const maintenanceToggle = document.getElementById('maintenanceMode');
    if (maintenanceToggle) {
        maintenanceToggle.addEventListener('change', (e) => {
            saveSetting('maintenanceMode', e.target.checked);
            showToast(
                e.target.checked 
                    ? 'Maintenance mode enabled' 
                    : 'Maintenance mode disabled',
                'success'
            );
        });
    }
    
    // Banner text
    const saveBannerBtn = document.getElementById('saveBannerTextBtn');
    if (saveBannerBtn) {
        saveBannerBtn.addEventListener('click', () => {
            const bannerText = document.getElementById('heroBannerText').value;
            saveSetting('heroBannerText', bannerText);
            showToast('Banner text saved!', 'success');
        });
    }
    
    // Site title
    const saveTitleBtn = document.getElementById('saveSiteTitleBtn');
    if (saveTitleBtn) {
        saveTitleBtn.addEventListener('click', () => {
            const siteTitle = document.getElementById('siteTitle').value;
            saveSetting('siteTitle', siteTitle);
            if (siteTitle) {
                document.title = `${siteTitle} - Admin Dashboard`;
            }
            showToast('Site title saved!', 'success');
        });
    }
    
    // Data export
    const exportBtn = document.getElementById('exportDataBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            exportMoviesData();
        });
    }
    
    // Data import
    const importBtn = document.getElementById('importDataBtn');
    if (importBtn) {
        importBtn.addEventListener('click', () => {
            document.getElementById('importModal').classList.add('active');
        });
    }
    
    const confirmImportBtn = document.getElementById('confirmImportBtn');
    if (confirmImportBtn) {
        confirmImportBtn.addEventListener('click', () => {
            importMoviesData();
        });
    }
    
    // Clear data
    const clearBtn = document.getElementById('clearDataBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all movies data? This cannot be undone!')) {
                adminMovies = [];
                saveAdminMovies();
                renderMoviesTable();
                showToast('All data cleared!', 'success');
            }
        });
    }
}

function loadSettings() {
    const maintenanceMode = getSetting('maintenanceMode', false);
    const heroBannerText = getSetting('heroBannerText', '');
    const siteTitle = getSetting('siteTitle', 'Dezo Max');
    
    const maintenanceToggle = document.getElementById('maintenanceMode');
    const heroBannerInput = document.getElementById('heroBannerText');
    const siteTitleInput = document.getElementById('siteTitle');
    
    if (maintenanceToggle) maintenanceToggle.checked = maintenanceMode;
    if (heroBannerInput) heroBannerInput.value = heroBannerText;
    if (siteTitleInput) siteTitleInput.value = siteTitle;
}

function saveSetting(key, value) {
    localStorage.setItem(`adminSetting_${key}`, JSON.stringify(value));
}

function getSetting(key, defaultValue = null) {
    const saved = localStorage.getItem(`adminSetting_${key}`);
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            return defaultValue;
        }
    }
    return defaultValue;
}

function exportMoviesData() {
    const dataStr = JSON.stringify(adminMovies, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dezo-max-movies-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Movies data exported!', 'success');
}

function importMoviesData() {
    const importData = document.getElementById('importData').value;
    if (!importData.trim()) {
        showToast('Please enter JSON data to import', 'error');
        return;
    }
    
    try {
        const parsed = JSON.parse(importData);
        if (Array.isArray(parsed)) {
            adminMovies = parsed;
            saveAdminMovies();
            renderMoviesTable();
            document.getElementById('importModal').classList.remove('active');
            document.getElementById('importData').value = '';
            showToast(`Successfully imported ${parsed.length} movies!`, 'success');
        } else {
            showToast('Invalid data format. Expected an array of movies.', 'error');
        }
    } catch (e) {
        showToast('Invalid JSON data. Please check your input.', 'error');
    }
}

// ==================== Toast Notifications ====================
function showToast(message, type = 'success') {
    const toast = document.getElementById('adminToast');
    const toastMessage = document.getElementById('adminToastMessage');
    
    if (!toast || !toastMessage) return;
    
    toastMessage.textContent = message;
    toast.className = `admin-toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==================== Logout ====================
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            // Clear admin session if needed
            window.location.href = 'index.html';
        }
    });
}

// Styles are now in admin.css
