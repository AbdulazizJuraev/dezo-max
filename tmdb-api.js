// TMDB API Integration for fetching Marvel and DC movies
// TMDB API Documentation: https://developers.themoviedb.org/3

const TMDB_API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your TMDB API key
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const TMDB_POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w780';
const TMDB_BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

// Production Company IDs from TMDB
const MARVEL_STUDIOS_ID = 420; // Marvel Studios
const DC_ENTERTAINMENT_ID = 128064; // DC Entertainment

// Cache for API responses
let moviesCache = {
    marvel: null,
    dc: null,
    lastFetch: null,
    cacheDuration: 24 * 60 * 60 * 1000 // 24 hours
};

/**
 * Fetch movies from TMDB API with pagination
 * @param {number} companyId - Production company ID (Marvel or DC)
 * @param {number} page - Page number for pagination
 * @returns {Promise} API response
 */
async function fetchMoviesFromTMDB(companyId, page = 1) {
    try {
        const url = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_companies=${companyId}&sort_by=release_date.desc&page=${page}&language=en-US`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching from TMDB:', error);
        throw error;
    }
}

/**
 * Fetch all pages of movies until we reach the target count
 * @param {number} companyId - Production company ID
 * @param {number} targetCount - Minimum number of movies to fetch
 * @returns {Promise<Array>} Array of all movies
 */
async function fetchAllMovies(companyId, targetCount = 100) {
    let allMovies = [];
    let currentPage = 1;
    let totalPages = 1;
    let hasMorePages = true;

    try {
        while (hasMorePages && allMovies.length < targetCount) {
            const data = await fetchMoviesFromTMDB(companyId, currentPage);
            
            if (data.results && data.results.length > 0) {
                allMovies = allMovies.concat(data.results);
                totalPages = data.total_pages;
                currentPage++;
                
                // Check if we've reached the last page or target count
                hasMorePages = currentPage <= totalPages && allMovies.length < targetCount;
                
                // Add a small delay to respect rate limits
                if (hasMorePages) {
                    await new Promise(resolve => setTimeout(resolve, 200));
                }
            } else {
                hasMorePages = false;
            }
        }
        
        return allMovies.slice(0, targetCount); // Return exactly targetCount movies
    } catch (error) {
        console.error(`Error fetching all movies for company ${companyId}:`, error);
        return allMovies; // Return what we have so far
    }
}

/**
 * Convert TMDB movie data to our app's movie format
 * @param {Object} tmdbMovie - Movie object from TMDB API
 * @param {string} studio - Studio name (Marvel or DC)
 * @returns {Object} Formatted movie object
 */
function formatTMDBMovie(tmdbMovie, studio) {
    // Get genre mapping
    const genreMap = {
        28: 'action',
        12: 'adventure',
        16: 'animation',
        35: 'comedy',
        80: 'crime',
        99: 'documentary',
        18: 'drama',
        10751: 'family',
        14: 'fantasy',
        36: 'history',
        27: 'horror',
        10402: 'music',
        9648: 'mystery',
        10749: 'romance',
        878: 'scifi',
        10770: 'tv',
        53: 'thriller',
        10752: 'war',
        37: 'western'
    };

    // Convert TMDB genres to our format
    const genres = tmdbMovie.genre_ids 
        ? tmdbMovie.genre_ids.map(id => genreMap[id] || 'action').slice(0, 2)
        : ['action', 'adventure'];

    // Format duration (TMDB doesn't provide runtime in discover, so we'll use a default)
    const duration = tmdbMovie.runtime 
        ? `${Math.floor(tmdbMovie.runtime / 60)}h ${tmdbMovie.runtime % 60}min`
        : '2h 0min';

    // Get poster URL
    const poster = tmdbMovie.poster_path 
        ? `${TMDB_POSTER_BASE_URL}${tmdbMovie.poster_path}`
        : 'https://via.placeholder.com/300x450/1a1a2e/ffffff?text=No+Poster';

    // Get trailer (we'll need to fetch this separately)
    const trailer = null; // Will be fetched separately if needed

    // Format release date
    const releaseDate = tmdbMovie.release_date 
        ? new Date(tmdbMovie.release_date)
        : new Date();
    const year = releaseDate.getFullYear();

    // Get ratings
    const ratings = {
        imdb: tmdbMovie.vote_average ? parseFloat((tmdbMovie.vote_average / 2).toFixed(1)) : 7.0,
        rottenTomatoes: tmdbMovie.vote_average ? Math.round(tmdbMovie.vote_average * 10) : 70,
        dezo: tmdbMovie.vote_average ? parseFloat((tmdbMovie.vote_average / 1.2).toFixed(1)) : 7.5
    };

    // Get title in multiple languages (TMDB provides original title)
    const title = {
        en: tmdbMovie.title || tmdbMovie.original_title || 'Unknown',
        ru: tmdbMovie.title || tmdbMovie.original_title || 'Неизвестно',
        uz: tmdbMovie.title || tmdbMovie.original_title || 'Noma\'lum'
    };

    // Get description
    const description = {
        en: tmdbMovie.overview || 'No description available.',
        ru: tmdbMovie.overview || 'Описание недоступно.',
        uz: tmdbMovie.overview || 'Tavsif mavjud emas.'
    };

    return {
        id: tmdbMovie.id,
        title: title,
        description: description,
        genre: genres,
        year: year,
        duration: duration,
        quality: '4K',
        poster: poster,
        studio: studio,
        trailer: trailer,
        cast: [], // Will be fetched separately if needed
        ratings: ratings,
        popularity: tmdbMovie.popularity || 0,
        releaseDate: tmdbMovie.release_date || null
    };
}

/**
 * Fetch Marvel movies from TMDB
 * @param {number} limit - Number of movies to fetch (default: 100)
 * @returns {Promise<Array>} Array of formatted Marvel movies
 */
async function fetchMarvelMovies(limit = 100) {
    try {
        // Check cache first
        const now = Date.now();
        if (moviesCache.marvel && moviesCache.lastFetch && 
            (now - moviesCache.lastFetch) < moviesCache.cacheDuration) {
            return moviesCache.marvel.slice(0, limit);
        }

        console.log('Fetching Marvel movies from TMDB...');
        const tmdbMovies = await fetchAllMovies(MARVEL_STUDIOS_ID, limit);
        
        const formattedMovies = tmdbMovies.map(movie => 
            formatTMDBMovie(movie, 'Marvel')
        );

        // Sort by release date (newest first)
        formattedMovies.sort((a, b) => {
            if (b.releaseDate && a.releaseDate) {
                return new Date(b.releaseDate) - new Date(a.releaseDate);
            }
            return b.year - a.year;
        });

        // Cache the results
        moviesCache.marvel = formattedMovies;
        moviesCache.lastFetch = now;

        return formattedMovies;
    } catch (error) {
        console.error('Error fetching Marvel movies:', error);
        return [];
    }
}

/**
 * Fetch DC movies from TMDB
 * @param {number} limit - Number of movies to fetch (default: 100)
 * @returns {Promise<Array>} Array of formatted DC movies
 */
async function fetchDCMovies(limit = 100) {
    try {
        // Check cache first
        const now = Date.now();
        if (moviesCache.dc && moviesCache.lastFetch && 
            (now - moviesCache.lastFetch) < moviesCache.cacheDuration) {
            return moviesCache.dc.slice(0, limit);
        }

        console.log('Fetching DC movies from TMDB...');
        const tmdbMovies = await fetchAllMovies(DC_ENTERTAINMENT_ID, limit);
        
        const formattedMovies = tmdbMovies.map(movie => 
            formatTMDBMovie(movie, 'DC')
        );

        // Sort by release date (newest first)
        formattedMovies.sort((a, b) => {
            if (b.releaseDate && a.releaseDate) {
                return new Date(b.releaseDate) - new Date(a.releaseDate);
            }
            return b.year - a.year;
        });

        // Cache the results
        moviesCache.dc = formattedMovies;
        moviesCache.lastFetch = now;

        return formattedMovies;
    } catch (error) {
        console.error('Error fetching DC movies:', error);
        return [];
    }
}

/**
 * Fetch both Marvel and DC movies
 * @param {number} limitPerStudio - Number of movies per studio (default: 50 each = 100 total)
 * @returns {Promise<Array>} Combined array of Marvel and DC movies
 */
async function fetchMarvelAndDCMovies(limitPerStudio = 50) {
    try {
        const [marvelMovies, dcMovies] = await Promise.all([
            fetchMarvelMovies(limitPerStudio),
            fetchDCMovies(limitPerStudio)
        ]);

        // Combine and sort by popularity or release date
        const allMovies = [...marvelMovies, ...dcMovies];
        
        // Sort by popularity (highest first), then by release date
        allMovies.sort((a, b) => {
            if (b.popularity !== a.popularity) {
                return b.popularity - a.popularity;
            }
            if (b.releaseDate && a.releaseDate) {
                return new Date(b.releaseDate) - new Date(a.releaseDate);
            }
            return b.year - a.year;
        });

        return allMovies;
    } catch (error) {
        console.error('Error fetching Marvel and DC movies:', error);
        return [];
    }
}

/**
 * Initialize and load movies from TMDB
 * This function should be called when the app loads
 * @param {number} totalLimit - Total number of movies to fetch (default: 100)
 * @returns {Promise<Array>} Array of movies
 */
async function initializeTMDBMovies(totalLimit = 100) {
    // Check if API key is set
    if (TMDB_API_KEY === 'YOUR_TMDB_API_KEY') {
        console.warn('TMDB API key not set. Please set your API key in tmdb-api.js');
        console.warn('Get your API key from: https://www.themoviedb.org/settings/api');
        return [];
    }

    try {
        const movies = await fetchMarvelAndDCMovies(Math.ceil(totalLimit / 2));
        console.log(`Successfully loaded ${movies.length} movies from TMDB`);
        return movies;
    } catch (error) {
        console.error('Error initializing TMDB movies:', error);
        return [];
    }
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchMarvelMovies,
        fetchDCMovies,
        fetchMarvelAndDCMovies,
        initializeTMDBMovies,
        TMDB_API_KEY
    };
}
