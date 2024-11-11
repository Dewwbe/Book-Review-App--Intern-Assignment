import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditReview = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/reviews/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setRating(response.data.rating);
        setReviewText(response.data.reviewText);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console.');
        console.log(error);
      });
  }, [id]);

  const handleEditReview = () => {
    const data = {
      title,
      author,
      rating,
      reviewText,
    };
    setLoading(true);
    axios.put(`http://localhost:5555/reviews/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Review updated successfully!', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error updating review.', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Review</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
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
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditReview}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditReview;
