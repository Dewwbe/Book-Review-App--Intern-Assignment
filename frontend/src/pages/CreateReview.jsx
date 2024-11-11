import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateReview = () => {
  const [books, setBooks] = useState([]); // Holds the list of books
  const [selectedBook, setSelectedBook] = useState(''); // Holds the selected book ID
  const [title, setTitle] = useState(''); // Holds the book title
  const [author, setAuthor] = useState(''); // Holds the author name
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Fetch the books data from the server
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5555/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  // Handle book selection and set title and author
  const handleBookSelection = (bookId) => {
    const book = books.find((b) => b._id === bookId);
    if (book) {
      setSelectedBook(bookId);
      setTitle(book.title);
      setAuthor(book.author);
    }
  };

  const handleSaveReview = () => {
    const data = {
      title,
      author,
      rating,
      reviewText,
      dateAdded: new Date(), // Set the current date
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/reviews', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Review created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Review</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Select Book</label>
          <select
            value={selectedBook}
            onChange={(e) => handleBookSelection(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value=''>-- Select a Book --</option>
            {books.map((book) => (
              <option key={book._id} value={book._id}>
                {book.title}
              </option>
            ))}
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            readOnly
            className='border-2 border-gray-500 px-4 py-2 w-full bg-gray-100'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            readOnly
            className='border-2 border-gray-500 px-4 py-2 w-full bg-gray-100'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {'⭐'.repeat(star)}
              </option>
            ))}
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Review Text</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full h-24 resize-none'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveReview}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateReview;
