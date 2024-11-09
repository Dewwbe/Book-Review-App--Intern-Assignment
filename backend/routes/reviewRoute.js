import express from 'express';
import { Book } from '../models/reviewmodel.js';

const router = express.Router();

// Route to save a new Book
router.post('/', async (request, response) => {
  try {
    const { title, author, rating, reviewText } = request.body;

    // Check for required fields
    if (!title || !author || !rating || !reviewText) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, rating, reviewText',
      });
    }

    // Create a new book document
    const newBook = {
      title,
      author,
      rating,
      reviewText,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all books from the database
router.get('/', async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get a single book by ID
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    if (!book) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to update a book
router.put('/:id', async (request, response) => {
  try {
    const { title, author, rating, reviewText } = request.body;
    const { id } = request.params;

    // Check for required fields
    if (!title || !author || !rating || !reviewText) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, rating, reviewText',
      });
    }

    const result = await Book.findByIdAndUpdate(
      id,
      { title, author, rating, reviewText },
      { new: true } // Return the updated document
    );

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book updated successfully', data: result });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to delete a book
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
