# Blogging-Site (Full Stack)

**A comprehensive blogging platform with secure authentication, efficient APIs, and a user-friendly interface for managing blogs, comments, likes, and more.**

## Features

### Backend
- **User Authentication**: Secure login, registration, and session management using JWT.
- **Blog Management**: Create, update, delete, and manage blog posts with dynamic content handling.
- **Commenting System**: Add, edit, and manage comments on blogs with user authentication.
- **Like & Favourite Functionality**: Toggle likes and add blogs to favorites for personalized engagement.
- **Search and Filter**: Find blogs by title, category, or author, with advanced sorting options.

### Frontend
- **Single Page Application (SPA)**: Seamless user experience with dynamic content loading and navigation using React.
- **Responsive Design**: Optimized for all devices with a mobile-first approach.
- **Profile Management**: Users can update their profile information, including avatars.
- **Enhanced Search**: Added searching feature on the basis of title or category
- **Comments & Likes**: Real-time interaction with the ability to like blogs and leave comments.
- **Blog Editing & Creation**: Rich-text blog editor with image upload functionality.
- **Custom Comment Section**: A custom-built comment section for engaging with blog content.
- **DaisyUI & TailwindCSS**: Modern design with eye-catching elements using DaisyUI and TailwindCSS.
- **Blog Analytics**: Added features to analyze blog performance, including views, likes, and comments for admin.

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Fast, minimalist web framework for creating robust APIs.
- **MongoDB**: NoSQL database for handling blogs, users, comments, and likes.
- **Mongoose**: ODM for MongoDB, managing data schemas and relationships.
- **JWT**: Secure token-based authentication and user verification.
- **bcryptjs**: For hashing passwords and enhancing security.
- **Multer**: Middleware for handling file uploads, such as images in blogs.
- **dotenv**: Managing environment variables for configuration.
- **cors**: Enabling cross-origin requests for frontend integration.
- **cookie-parser**: For managing cookies in session handling.

### Frontend
- **React**: For building interactive user interfaces.
- **Axios**: For making API requests to the backend.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **DaisyUI**: Tailwind CSS component library for modern UI components.
- **React Router**: For SPA-style navigation between different pages.
- **JWT**: Frontend integration for handling authentication.
- **Redux**: For state management across components.
- **Axios Interceptors**: For handling authentication token refresh mechanisms.

## Project Structure

```bash
📦 blog-SPA-io
├── 📁 backend
│   ├── 📁 controllers
│   ├── 📁 models
│   ├── 📁 routes
│   ├── 📁 middlewares
│   └── 📁 utils
├── 📁 frontend
│   ├── 📁 components
│   ├── 📁 pages
│   ├── 📁 redux
│   └── 📁 assets
├── 📄 package.json
├── 📄 .env
└── 📄 README.md
```
## Future Work
-- I can finally say that I have completed my first MERN project
