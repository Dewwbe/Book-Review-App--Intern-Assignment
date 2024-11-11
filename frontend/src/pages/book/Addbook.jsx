import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // To navigate after successful submission
import { useSnackbar } from 'notistack'; // To show notifications

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Prepare FormData for the image and other fields
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('description', description);
    formData.append('image', image);

    try {
      // Send a POST request to add the book
      await axios.post('http://localhost:5555/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);

      // Show success notification
      enqueueSnackbar('Book added successfully!', { variant: 'success' });

      // Navigate to the homepage or other desired page
      navigate('/');
    } catch (error) {
      setLoading(false);
      // Handle error
      console.error('Error adding book:', error.message);
      enqueueSnackbar('Error adding book. Please try again.', { variant: 'error' });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4 text-center">Add a New Book</h1>
      {loading && (
        <div className="flex justify-center">
          <div className="spinner"></div> {/* You can replace this with a Spinner component if you have one */}
        </div>
      )}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
            required
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
            required
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full h-24 resize-none"
            required
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Book Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className="p-2 bg-sky-300 text-white m-8 rounded-xl hover:bg-sky-400"
        >
          {loading ? 'Adding...' : 'Add Book'}
        </button>
      </div>
    </div>
  );
};

export default AddBook;
