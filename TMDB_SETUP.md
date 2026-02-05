# TMDB API Setup Guide

This application now integrates with The Movie Database (TMDB) API to fetch Marvel and DC movies dynamically.

## Getting Your TMDB API Key

1. **Create a TMDB Account**
   - Go to [https://www.themoviedb.org/](https://www.themoviedb.org/)
   - Sign up for a free account

2. **Get Your API Key**
   - Go to [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
   - Click "Request an API Key"
   - Select "Developer" as the type
   - Fill out the application form
   - Accept the terms of use
   - Copy your API key

3. **Configure the API Key**
   - Open `tmdb-api.js`
   - Find the line: `const TMDB_API_KEY = 'YOUR_TMDB_API_KEY';`
   - Replace `'YOUR_TMDB_API_KEY'` with your actual API key
   - Example: `const TMDB_API_KEY = 'abc123def456ghi789';`

## How It Works

### Movie Fetching
- The app fetches movies from TMDB using the Discover API
- Filters specifically for:
  - **Marvel Studios** (Company ID: 420)
  - **DC Entertainment** (Company ID: 128064)
- Fetches at least 100+ movies with pagination support
- Movies are sorted by release date (newest first) and popularity

### Features
- **Automatic Pagination**: Fetches multiple pages until reaching the target count (100+ movies)
- **Caching**: Results are cached for 24 hours to reduce API calls
- **Fallback**: If TMDB API is unavailable, the app falls back to static movie data
- **Rate Limiting**: Includes delays between requests to respect TMDB rate limits

### Data Format
Movies from TMDB are automatically converted to match the app's internal format:
- Titles support multiple languages (English, Russian, Uzbek)
- Genres are mapped from TMDB genre IDs
- Ratings are calculated from TMDB vote averages
- Posters use TMDB's image CDN

## API Limits

TMDB API has rate limits:
- **40 requests per 10 seconds** for each API key
- The app includes automatic delays to stay within limits

## Troubleshooting

### Movies Not Loading
1. Check that your API key is correctly set in `tmdb-api.js`
2. Verify your API key is active in your TMDB account
3. Check the browser console for error messages
4. Ensure you have an internet connection

### Rate Limit Errors
- The app automatically handles rate limits with delays
- If you see rate limit errors, wait a few minutes and try again
- Consider implementing a longer cache duration

### CORS Errors
- TMDB API supports CORS for browser requests
- If you encounter CORS errors, check your API key permissions

## Testing Without API Key

If you don't want to use the TMDB API:
- Leave `TMDB_API_KEY` as `'YOUR_TMDB_API_KEY'`
- The app will automatically fall back to static movie data
- All existing functionality will continue to work

## Production Considerations

For production use:
1. **Never commit your API key to version control**
2. Consider using environment variables or a backend proxy
3. Implement proper error handling and user feedback
4. Monitor API usage to stay within rate limits

## Additional Resources

- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [TMDB API Key Management](https://www.themoviedb.org/settings/api)
- [TMDB Rate Limits](https://developers.themoviedb.org/3/getting-started/request-rate-limiting)
