# Schedule App

Welcome to the Schedule App, a versatile application for managing contacts with a focus on simplicity and security. This app provides essential CRUD (CREATE, READ, UPDATE, DELETE) functionalities for your contacts, ensuring a seamless experience. Users can register or log in to access the full range of features.

## Features

- **Basic Contact CRUD:** Easily manage your contacts with essential CRUD operations.
- **User Authentication:** Securely register or log in to personalize and safeguard your contact data.
- **MongoDB Database:** Utilizes MongoDB, a robust and scalable NoSQL database, to store and retrieve contact information efficiently.
- **Security Modules:**
  - **SESSION:** Enhances security through session management.
  - **HELMET:** Strengthens app security by setting HTTP headers.
  - **CSURF:** Implements Cross-Site Request Forgery protection for an additional layer of defense.

## Getting Started

To set up the backend, navigate to the 'backend' folder using the following command:

```bash
cd ./backend
```

Install all dependencies:

```bash
npm install
```

Create a .env file in the 'backend' directory with the following environment variables:

```bash
# MongoDB Connection String
CONNECTION_STRING=your_mongodb_connection_string

# Session Secret
SESSION_SECRET=your_session_secret
```

Then, run the app.js file with nodemon to start the server:

```bash
npm run start
```

## Requirements

Make sure you have Node.js and npm installed on your machine. Additionally, ensure that MongoDB is set up and running to establish the database connection.

Feel free to explore and customize the Schedule App to meet your specific needs. If you encounter any issues or have suggestions for improvement, please let us know. Happy scheduling!