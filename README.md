# Blog Frontend Application

This is a React-based frontend for a simple blog application. It allows users to view blog posts, comment on them, and for authorized users, manage blog posts.

## Features

- User authentication (login and registration)
- View list of blog posts
- Read individual blog posts and their comments
- Comment on blog posts (authenticated users only)
- Create, edit, and delete blog posts (authorized users only)

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/blog-frontend.git
   cd blog-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   VITE_API_URL=https://your-backend-api-url.com
   ```
   Replace the URL with your actual backend API URL.

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## User Types and Permissions

### Regular User
- Email: demouser@gmail.com
- Password: Password123
- Permissions:
  - Browse all blog posts
  - Read individual blog posts
  - Add comments to blog posts

### Authorized User (Admin)
- Email: auth@gmail.com
- Password: Password123
- Permissions:
  - All regular user permissions
  - Create new blog posts
  - Edit existing blog posts
  - Delete blog posts

## Usage

1. **Viewing Blog Posts**
   - The home page displays a list of all blog posts.
   - Click on a blog post title to view its full content and comments.

2. **Logging In**
   - Click the "Login" button in the navigation bar.
   - Enter your email and password.
   - Use the credentials provided above for testing.

3. **Adding Comments**
   - When viewing a blog post, scroll to the bottom to find the comment section.
   - If logged in, you can add a new comment using the comment form.

4. **Managing Blog Posts (Authorized Users Only)**
   - After logging in as an authorized user, you'll see additional options:
     - "Create Post" button in the navigation bar
     - "Edit" and "Delete" buttons on individual blog posts

5. **Creating a New Post**
   - Click "Create Post" in the navigation bar.
   - Fill in the title and content, then click "Submit".

6. **Editing a Post**
   - On a blog post page, click the "Edit" button.
   - Modify the title or content, then click "Save Changes".

7. **Deleting a Post**
   - On a blog post page, click the "Delete" button.
   - Confirm the deletion when prompted.

## Technology Stack

- React
- TypeScript
- Vite
- Redux Toolkit (for state management)
- React Router (for routing)
- Tailwind CSS (for styling)
