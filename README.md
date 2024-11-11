Book Review App

Description
The Book Review App is a web application that allows users to create, view, and manage book reviews. Users can select a book from a list of available books, provide a rating, and submit a review. The app fetches a list of books from a backend API and automatically populates the book title and author in the review form. Once the review is submitted, it gets stored in a backend database and can be viewed by other users.

Features
Book Selection: Users can choose a book from a dropdown list of books fetched from the backend.

Auto-Populated Fields: When a book is selected, the title and author fields are auto-filled based on the selected book.

Rating: Users can give a rating (1 to 5 stars) to the selected book.

Review Text: Users can write a review text for the book.

Submit Review: After filling in the review details, users can submit their review, which gets saved to the database.

Loading Indicator: While submitting the review, a spinner is displayed to indicate the action is in progress.

Snackbar Notifications: Success or error messages are shown via snackbars after submitting the review.


Tools and Techniques Used

React: Frontend library for building the user interface and managing component state.
Axios: Used for making HTTP requests to fetch data from the backend API and submit reviews.
React Router: Used for navigation and routing between pages in the application.
useState and useEffect Hooks: React hooks for managing state and performing side effects (e.g., fetching data).
Snackbar (from notistack): Displays notifications (success or error) after submitting the review.
TailwindCSS: Utility-first CSS framework used for styling the application.
Backend API: Express.js API server that handles requests for fetching books and saving reviews.
MongoDB: Database for storing book and review data.


Technologies

React (Frontend)
Axios (HTTP Requests)
React Router (Routing)
notistack (Snackbar Notifications)
TailwindCSS (Styling)
Node.js (Backend)
Express.js (Backend Framework)
MongoDB (Database)
