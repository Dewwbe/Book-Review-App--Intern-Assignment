import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner'; // Spinner component for loading state
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        console.log(response.data); // Add this line to inspect the response data
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  

  // Function to handle deleting a book
  const handleDelete = (bookId) => {
    axios
      .delete(`http://localhost:5555/books/${bookId}`) // Adjusted endpoint for deletion
      .then(() => {
        // Filter out the deleted book from the state
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
})
      .catch((error) => {
        console.log(error);
      });
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
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <table className='min-w-full bg-white'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b'>Image</th>
              <th className='py-2 px-4 border-b'>Title</th>
              <th className='py-2 px-4 border-b'>Author</th>
              <th className='py-2 px-4 border-b'>Description</th>
              <th className='py-2 px-4 border-b'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id} className='text-center border-b'>
                <td className='py-2 px-4'>
  <img src={`http://localhost:5555/${book.image}`} alt={book.title} className='w-16 h-16' />
</td>

                <td className='py-2 px-4'>{book.title}</td>
                <td className='py-2 px-4'>{book.author}</td>
                <td className='py-2 px-4'>{book.description}</td>
                <td className='py-2 px-4'>
                  <div className='flex justify-center gap-2'>
                    <Link to={`/books/${book._id}`} className='text-blue-500'>
                      <BsInfoCircle /> 
                    </Link>
                    <Link to={`/books/edit/${book._id}`} className='text-green-500'>
                      <AiOutlineEdit /> 
                    </Link>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className='text-red-500'
                    >
                      <MdOutlineDelete /> 
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // Implement a "card" view if required
        <div>Card view not yet implemented</div>
      )}
    </div>
    </div>
  );
};

export default AllBooks;
