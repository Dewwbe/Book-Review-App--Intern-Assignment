import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css'; // Importing CSS file for styling
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [books, setBooks] = useState([]);
  const images = [image1, image2, image3];
  const navigate = useNavigate();

  // Fetch books data from the server
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5555/books');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  // Function to go to the next image in the carousel
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous image in the carousel
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Auto slide the images every 3 seconds
  useEffect(() => {
    const timer = setInterval(nextImage, 3000);
    return () => clearInterval(timer); // Clean up on component unmount
  }, []);

  // Navigate to add review page
  const handleAddRatingClick = () => {
    navigate('/reviews/create');
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <h1>Book Review App</h1>
        </div>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/books/all" className="nav-link">Books</Link>
          <Link to="/reviews/all" className="nav-link">Reviews</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>
      </header>

      {/* Carousel */}
      <div className="carousel">
        <img src={images[currentIndex]} alt={`Carousel Image ${currentIndex + 1}`} className="carousel-image" />
        <button className="prev-btn" onClick={prevImage}>&#10094;</button>
        <button className="next-btn" onClick={nextImage}>&#10095;</button>
      </div>

      {/* Books Section */}
      <div className="books-section">
        <h1 style={{ color: 'darkblue' }}>Explore Our Books</h1>
        <div className="book-cards">
          {books.map((book) => (
            <div key={book._id} className="book-card">
              <img src={`http://localhost:5555/${book.image}`} alt={book.title} className="book-image" />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p>{book.description}</p>
              <button className="rate-button" onClick={handleAddRatingClick}>Add Rating</button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Book Review App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
