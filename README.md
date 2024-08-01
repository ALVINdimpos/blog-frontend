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
   git clone https://github.com/ALVINdimpos/blog-frontend.git
   cd blog-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
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

### Author User
- Email: author@gmail.com
- Password: Password123
- Permissions:
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
   - Fill in the title and content, then click "Submit."

6. **Editing a Post**
   - On a blog post page, click the "Edit" button.
   - Modify the title or content, then click "Save Changes".

7. **Deleting a Post**
   - On a blog post page, click the "Delete" button.
   - Could you confirm the deletion when prompted?

## Technology Stack

- React
- TypeScript
- Vite
- Redux Toolkit Query (for state management)
- React Router (for routing)
- Tailwind CSS (for styling)
