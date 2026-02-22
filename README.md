# Freedom Wall

A collaborative digital bulletin board application where users can post sticky notes and organize thoughts by topics. Built with Vite, Supabase, and SCSS.

## Features

- **Digital Sticky Notes**: Create, read, update, and delete notes on a shared board
- **Topic Organization**: Organize notes by different topics
- **Real-time Collaboration**: Live updates powered by Supabase
- **Admin Panel**: Dedicated administration interface for managing content
- **Responsive Design**: Built with modern SCSS styling
- **Image Support**: Compress and handle images in notes

## Technology Stack

- **Frontend**: HTML, CSS (SCSS), JavaScript (ES Modules)
- **Build Tool**: Vite 7.3.1
- **Backend**: Supabase 2.97.0 (Authentication & Real-time Database)
- **Styling**: SASS/SCSS

## Project Structure

```
freedom-wall/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── modal.js        # Modal dialog functionality
│   │   ├── posts.js        # Post display and management
│   │   ├── realtime.js     # Real-time updates
│   │   ├── topic.js        # Topic display
│   │   ├── topicV2.js      # Enhanced topic display
│   │   └── image-handler.js # Image processing
│   ├── admin/              # Admin interface modules
│   │   ├── auth.js         # Admin authentication
│   │   ├── notes.js        # Admin note management
│   │   ├── topics.js       # Admin topic management
│   │   └── ui.js           # Admin UI utilities
│   ├── styles/             # SCSS stylesheets
│   │   ├── style.scss      # Main styles
│   │   ├── admin/          # Admin-specific styles
│   │   └── components/     # Component-specific styles
│   ├── utils/              # Utility functions
│   │   ├── get-or-create-device-id.js
│   │   ├── image-compressor.js
│   │   └── random.js
│   ├── main.js             # Application entry point
│   ├── admin.js            # Admin entry point
│   └── supabaseClient.js   # Supabase configuration
├── admin.html              # Admin interface
├── index.html              # Main application
├── package.json
├── vite.config.js
└── public/                 # Static assets

```

## Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Supabase:
   - Create a `.env` file with your Supabase credentials:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:5173/css-freedom-wall/

## Building

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

## Key Components

### Main Application (`src/main.js`)
- Loads topics and posts
- Initializes modal and real-time listeners
- Sets up the main interface

### Admin Panel (`src/admin.js`)
- Authentication management
- Topic and note administration
- User interface management

### Real-time Updates
- Powered by Supabase real-time subscriptions
- Auto-syncs notes and topics across connected clients

### Modal System
- Add new notes
- Edit existing notes
- View detailed note content

## Usage

1. **Add a Note**: Click the "+" button on the sticky note area
2. **View Topics**: Browse different topics in the topic container
3. **Admin Access**: Access `admin.html` for administrative functions
4. **Real-time Sync**: Changes appear instantly for all connected users

## Dependencies

- **@supabase/supabase-js**: ^2.97.0 - Backend and real-time database
- **sass**: ^1.97.3 - CSS preprocessing
- **vite**: ^7.3.1 - Build tool and dev server

## Browser Support

Modern browsers with ES Module support (Chrome, Firefox, Safari, Edge)

## License

© 2026 Freedom Wall

## Notes

- Device IDs are generated and stored for tracking user interactions
- Images are automatically compressed before upload
- Admin panel requires authentication
- All data is stored in Supabase with real-time synchronization
