import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import CreateReview from './pages/createReview';
import ShowReview from './pages/showReview';
import EditReview from './pages/editReview';
import Allreviews from './pages/Allreviews';
import AllBooks from './pages/book/Allbooks';
import AddBook from './pages/book/addbook';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/reviews/create' element={<CreateReview />} />
      <Route path='/reviews/details/:id' element={<ShowReview />} />
      <Route path='/reviews/edit/:id' element={<EditReview />} />
      <Route path='/reviews/all' element={<Allreviews />} />

      /** Books */
      <Route path='/books/create' element={<AddBook />} />
      <Route path='/books/all' element={<AllBooks />} />
    </Routes>
  );
};

export default App;
