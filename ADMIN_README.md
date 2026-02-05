# Admin Dashboard - Dezo Max

A comprehensive admin dashboard for managing the Dezo Max movie streaming website.

## Features

### 🎬 Movie Management

- **Table View**: View all Marvel and DC movies in a sortable, searchable table
- **Add New Movie**: Create new movies with the following fields:
  - Title (required)
  - Universe (Marvel/DC) (required)
  - Release Year (required)
  - Poster Image URL (required)
  - Description (required)
  - Duration (optional)
  - Genre (optional, comma-separated)
  - IMDb Rating (optional)
- **Edit Movies**: Update existing movie information
- **Delete Movies**: Remove movies from the collection
- **Search & Filter**: 
  - Search movies by title
  - Filter by universe (Marvel/DC)

### 📊 Statistics Dashboard

- **Real-time Counters**:
  - Marvel Movies count
  - DC Movies count
  - Total Movies count
  - Goal Progress (aiming for 100+ movies)

### ⚙️ Site Settings

- **Maintenance Mode**: Toggle to enable/disable site maintenance
- **Hero Banner Text**: Customize the main banner text
- **Site Title**: Update the site title
- **Data Management**:
  - Export movies data as JSON
  - Import movies data from JSON
  - Clear all movies data (with confirmation)

## Access

Navigate to `admin.html` in your browser to access the admin dashboard.

**Note**: For production use, you should implement proper authentication and access control.

## Usage

### Adding a New Movie

1. Click the "Add New Movie" button
2. Fill in the required fields (Title, Universe, Year, Poster URL, Description)
3. Optionally add Duration, Genre, and Rating
4. Click "Add Movie"

### Editing a Movie

1. Find the movie in the table
2. Click the edit icon (pencil) in the Actions column
3. Modify the fields as needed
4. Click "Update Movie"

### Deleting a Movie

1. Find the movie in the table
2. Click the delete icon (trash) in the Actions column
3. Confirm the deletion

### Exporting Data

1. Go to the "Site Settings" section
2. Click "Export Movies Data"
3. A JSON file will be downloaded with all current movies

### Importing Data

1. Go to the "Site Settings" section
2. Click "Import Movies Data"
3. Paste your JSON data in the modal
4. Click "Import"

**JSON Format Example**:
```json
[
  {
    "id": 1,
    "title": "Movie Title",
    "universe": "Marvel",
    "year": 2024,
    "poster": "https://example.com/poster.jpg",
    "description": "Movie description",
    "duration": "2h 15min",
    "genre": "action, adventure",
    "rating": 7.5
  }
]
```

## Data Storage

The admin dashboard uses **localStorage** to persist:
- Movie data
- Site settings (maintenance mode, banner text, site title)

### Storage Keys

- `adminMovies`: Array of all movies
- `adminSetting_maintenanceMode`: Boolean for maintenance mode
- `adminSetting_heroBannerText`: String for banner text
- `adminSetting_siteTitle`: String for site title

## Integration with Main Site

The admin dashboard integrates with the main site's movie data:

1. On load, it fetches movies from the main `movies.js` file
2. Filters for Marvel and DC movies only
3. Allows you to add, edit, or delete movies
4. Changes are saved to localStorage and can be exported/imported

## Responsive Design

The admin dashboard is fully responsive:
- **Desktop**: Full sidebar navigation and table view
- **Tablet**: Collapsible sidebar
- **Mobile**: Stacked layout with horizontal navigation

## Security Considerations

⚠️ **Important**: This admin dashboard is designed for development and demonstration purposes. For production use:

1. **Implement Authentication**: Add proper login system
2. **Access Control**: Restrict access to authorized users only
3. **Backend Integration**: Connect to a secure backend API instead of localStorage
4. **Data Validation**: Add server-side validation
5. **CSRF Protection**: Implement CSRF tokens for forms
6. **Rate Limiting**: Add rate limiting to prevent abuse

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

Potential features for future development:
- User authentication and role-based access
- Backend API integration
- Image upload functionality
- Bulk import/export
- Movie categories and tags
- Advanced filtering and sorting
- Analytics and reporting
- Activity logs
- Backup and restore functionality

## Troubleshooting

### Movies Not Loading
- Check browser console for errors
- Verify that `movies.js` is loaded correctly
- Check localStorage for saved data

### Changes Not Saving
- Check browser localStorage quota
- Verify browser supports localStorage
- Check console for JavaScript errors

### Import Not Working
- Verify JSON format is correct
- Check that JSON is valid (use a JSON validator)
- Ensure the array contains valid movie objects

## Support

For issues or questions, check the main project README or open an issue in the repository.
