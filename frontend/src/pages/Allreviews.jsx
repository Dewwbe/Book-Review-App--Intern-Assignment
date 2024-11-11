import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';

const Allreviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/reviews') // Adjusted endpoint to fetch reviews
      .then((response) => {
        setReviews(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Function to handle deleting a review
  const handleDelete = (reviewId) => {
    axios
      .delete(`http://localhost:5555/reviews/${reviewId}`) // Adjusted endpoint for deletion
      .then(() => {
        // Filter out the deleted review from the state
        setReviews(reviews.filter((review) => review._id !== reviewId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Helper function to display stars based on rating
  const renderStars = (rating) => {
    return (
      <div className='flex'>
        {[...Array(rating)].map((_, i) => (
          <AiFillStar key={i} className='text-yellow-500' />
        ))}
      </div>
    );
  };

  return (
    <div>
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
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Reviews List</h1>
        <Link to='/reviews/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <table className='min-w-full bg-white'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b'>Title</th>
              <th className='py-2 px-4 border-b'>Author</th>
              <th className='py-2 px-4 border-b'>Rating</th>
              <th className='py-2 px-4 border-b'>Review Text</th>
              <th className='py-2 px-4 border-b'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className='text-center border-b'>
                <td className='py-2 px-4'>{review.title}</td>
                <td className='py-2 px-4'>{review.author}</td>
                <td className='py-2 px-4'>{renderStars(review.rating)}</td>
                <td className='py-2 px-4'>{review.reviewText}</td>
                <td className='py-2 px-4'>
                  <div className='flex justify-center gap-2'>
                    <Link to={`/reviews/details/${review._id}`} className='text-blue-500'>
                      <BsInfoCircle /> Details
                    </Link>
                    <Link to={`/reviews/edit/${review._id}`} className='text-green-500'>
                      <AiOutlineEdit /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className='text-red-500'
                    >
                      <MdOutlineDelete /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ReviewsCard reviews={reviews} />
      )}
    </div>
    </div>
  );
};

export default Allreviews;
