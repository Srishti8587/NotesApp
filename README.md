# Notes App

The Notes App is a simple application that allows users to create, manage, and search for notes. It provides functionality for user authentication, creating, updating, archiving, and searching notes.

## Features

- **User Authentication**: Users can register, login, and manage their accounts securely by using JWT(jsonwebtoken).
- **Create Notes**: Users can create new notes with a title and content.
- **Update Notes**: Users can edit the title and content of their existing notes.
- **Archive Notes**: Users can archive and unarchive their notes.
- **Search Notes**: Users can search for notes by title or content.
- **User Management**: Admins can view and manage user accounts.

## Setup

1. **Clone the Repository**: Clone the repository to your local machine.

   ```bash
   git clone https://github.com/Srishti8587/NotesApp.git
   ```

2. **Install Dependencies**: Navigate to the project directory and install the required dependencies.  
    ```bash
   cd Backend
   npm install
   ```

3. **Set Environment Variables**: Create a '.env' file in the root directory and configure the required environment variables.
```bash
PORT=3000
MONGODB_URI=your_mongo_connection_url
SECRET_KEY=your-secret-key
```

