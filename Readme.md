# Blogging-Site-Backend

**A comprehensive backend for a blogging platform that handles user management, blog creation, comments, likes, and more with secure authentication and efficient APIs.**

## Features

- **User Authentication**: Secure login, registration, and session management using JWT.
- **Blog Management**: Create, update, delete, and manage blog posts with dynamic content handling.
- **Commenting System**: Add, edit, and manage comments on blogs with user authentication.
- **Like & Favourite Functionality**: Toggle likes and add blogs to favorites for personalized engagement.
- **Search and Filter**: Find blogs by title, category, or author, with advanced sorting options.

## Technologies Used

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

## Project Structure

- **controllers**: Contains logic for handling different API requests and business logic.
- **models**: Mongoose schemas defining the structure of users, blogs, comments, likes, and favorites.
- **routes**: API endpoints for user, blog, comment, like, and favorites functionalities.
- **middlewares**: Custom middleware for authentication, authorization, and error handling.
- **utils**: Helper functions, reusable classes, and utility methods for various tasks.

## Future Work

- **Frontend Development**: Integration of a user-friendly frontend interface is in progress.
- **Additional Features**: Enhanced search, notifications, and blog analytics to be added.
