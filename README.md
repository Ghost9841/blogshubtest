# 🧪 Frontend Developer Test (ReactJS/Next.js) — BlogApp
Experience Level: 2–3 Years
Estimated Time: 2–3 hours
Focus Areas:
✅ Custom Hooks
✅ State Management
✅ Authentication
✅ CRUD UI
✅ Code Reusability & Structure

📌 Objective
Create a Blog platform with user login, post creation, editing, listing, and deletion functionality.
The UI should be responsive, clean, and follow modern frontend practices.

🛠 Tech Requirements
● Framework: React.js or Next.js
● Routing: React Router or Next.js Router
● State Management: Redux Toolkit / Zustand / Recoil
● Auth Handling: JWT-based, token stored in memory or localStorage
● Styling: TailwindCSS, MUI, or CSS Modules
● API: Use dummy APIs or mock (e.g., https://jsonplaceholder.typicode.com or mock
server)

🗂 Feature Requirements
1. ‍ Authentication
● Create login and register pages.

● On successful login, store JWT token.
● Create useAuth hook:
○ Handles login, logout, isAuthenticated, and user state.
○ Redirects unauthorized users.

2. 📝 Blog Post Management
● Show a list of posts on the dashboard.
● Allow Create, Edit, Delete of blog posts.
● Create usePosts hook:
○ Fetches posts from the API.
○ Supports add/update/delete.
● Show a loader and error message when appropriate.

3. 🔐 Protected Routes
● Dashboard and Create/Edit pages should be accessible only after login.
● Use HOC or PrivateRoute logic.

💡 Bonus Points (Optional)
● Use form validation (Yup or custom).
● Add a rich-text editor for blog content.
● Implement pagination or infinite scroll.
● Add search and filter by category/tag.
● Persist dark/light theme.