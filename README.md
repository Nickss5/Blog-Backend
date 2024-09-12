# Blog Backend

## Overview
The backend of the Blog Publishing Network handles all the business logic, database operations, authentication, and API endpoints. It is built using the MERN stack (MongoDB, Express, React, and Node.js), with the backend primarily focusing on Node.js, Express.js, and MongoDB for handling requests and storing data.

## Key Technologies:
- **Node.js**: A runtime environment for running JavaScript on the server.
- **Express.js**: A web framework for Node.js used for building RESTful APIs.
- **MongoDB**: A NoSQL database to store blog posts, user data, and other application information.
- **Mongoose**: A MongoDB ODM (Object Data Modeling) library for Node.js to interact with the database.
- **JWT (JSON Web Tokens)**: For secure user authentication and session management.
- **bcryptjs**: For hashing user passwords and ensuring security.
  
## Features
- **User Authentication**: Users can register, log in, and log out securely using JWT tokens.
- **Create, Read, Update, Delete (CRUD) operations**: Users can create, edit, view, and delete blog posts.
- **Search functionality**: Users can search for blog posts using a search bar, and results will be filtered based on the query.
- **User Roles**: Separate access controls for users and admin. Only authenticated users can create or edit posts.
- **Comments**: Authenticated users can comment on blog posts.
- **Image Upload**: Blog posts support image uploads using file storage.

## Testing the Application
- Log in using any email and password (for simplicity, any credentials will work).

- Explore the Dashboard: After logging in, you'll be redirected to the dashboard, where you can see various user and post statistics.

- Navigate: Use the sidebar to navigate between the home page, user listing, and post listing pages.
