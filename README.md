# Dezo Max - Movie Streaming Web Application

A fully functional, responsive movie streaming web application built with vanilla HTML, CSS, and JavaScript.

## Features

### 🎬 Core Functionality
- **Dynamic Movie Listing**: Movies are rendered dynamically from a data structure
- **Search Functionality**: Real-time search across movie titles, descriptions, and genres
- **Advanced Filtering**: 
  - Filter by genre (Action, Comedy, Drama, Fantasy, Horror, Sci-fi, etc.)
  - Filter by year (ranges and specific years)
  - Filter by studio (Marvel, DC, Disney)
- **Movie Details Modal**: 
  - Full movie information (poster, description, rating, cast)
  - Embedded trailer playback
  - Watch movie button (placeholder for future implementation)
- **Bookmark System**: Save favorite movies to localStorage
- **Responsive Banner Carousel**: Auto-rotating featured movies

### 📱 Responsive Design
- **Mobile**: Optimized for screens 320px and above
- **Tablet**: Optimized for screens 768px and above
- **Desktop**: Full-featured experience for screens 1200px and above

### 🎨 UI/UX Enhancements
- Smooth animations and transitions
- Hover effects on movie cards
- Modal popups for movie details
- Empty state handling
- Loading states
- Smooth scrolling navigation

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── app.js              # Main application logic
├── movies.js           # Movie data structure
├── script.js           # Original script (kept for reference)
└── img/                # Image assets
    ├── logo/
    └── [movie posters]
```

## Setup & Usage

1. **Open the application**: Simply open `index.html` in a modern web browser
2. **No build process required**: This is a pure vanilla JavaScript application
3. **No dependencies**: All external libraries are loaded via CDN

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Key Features Explained

### Search
- Type in the search bar to filter movies in real-time
- Searches across movie titles, descriptions, and genres
- Works on both desktop and mobile

### Filters
- **Genre Filter**: Select from dropdown to filter by movie genre
- **Year Filter**: Filter by specific year or year ranges
- **Studio Filter**: Radio buttons to filter by Marvel, DC, or Disney

### Movie Details
- Click any movie card or banner to view full details
- Modal displays:
  - High-quality poster
  - Movie rating with star icon
  - Release year, duration, studio
  - Genre tags
  - Full description
  - Cast information
  - Trailer playback
  - Watch movie button

### Bookmarks
- Click the bookmark icon on any movie card
- Bookmarks are saved to browser localStorage
- Persist across page refreshes

### Load More
- Click "LOAD MORE" to display additional movies
- Loads 12 movies at a time

## Customization

### Adding Movies
Edit `movies.js` and add new movie objects to the `moviesData` array:

```javascript
{
    id: 21,
    title: "Movie Title",
    genre: ["action", "adventure"],
    year: 2024,
    rating: 8.5,
    duration: "2h 15min",
    quality: "4K",
    poster: "path/to/poster.jpg",
    description: "Movie description",
    studio: "Studio Name",
    trailer: "https://www.youtube.com/embed/VIDEO_ID",
    cast: ["Actor 1", "Actor 2", "Actor 3"]
}
```

### Modifying Styles
All styles are in `styles.css`. Key CSS variables for theming:

```css
--light-azure: hsl(214, 84%, 56%);  /* Primary accent color */
--oxford-blue: hsl(218, 39%, 14%);   /* Card backgrounds */
--rich-blank-fogra-29: hsl(222, 25%, 10%); /* Main background */
--yellow: hsl(45, 100%, 54%);        /* Rating/Bookmark color */
```

## Performance Optimizations

- Lazy loading images with `loading="lazy"` attribute
- Efficient DOM manipulation
- Event delegation where appropriate
- CSS transitions for smooth animations
- Minimal external dependencies

## Future Enhancements

Potential features for future development:
- User authentication
- Watchlist management
- Video playback integration
- User ratings and reviews
- Recommendations based on viewing history
- API integration for real movie data
- Progressive Web App (PWA) support

## License

This project is open source and available for personal and commercial use.

## Credits

- Icons: [Ionicons](https://ionic.io/ionicons)
- Carousel: [Bootstrap 5](https://getbootstrap.com/)
- Fonts: [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
