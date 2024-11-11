import express from 'express';
import multer from 'multer';
import { BookEntry } from '../models/bookmodel.js'; // Import the new model name
import fs from 'fs'; // Import the fs module to create directories if they don't exist

const router = express.Router();

// Ensure the uploads directory exists
const uploadDirectory = 'uploads/';
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true }); // Create the directory and its parent directories if necessary
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Define the directory to store uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Define the filename format
  },
});

const upload = multer({ storage });

// POST: Create a new book entry
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, author, description } = req.body;

    // Check if a file was uploaded
    const imagePath = req.file ? req.file.path.replace('uploads/', '') : null;

    // Check if all required fields are provided
    if (!title || !author || !imagePath || !description) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, image, description',
      });
    }

    // Create new book entry document
    const newBookEntry = {
      title,
      author,
      image: imagePath, // Store only the relative path
      description,
    };

    // Use the BookEntry model instead of Books
    const savedBookEntry = await BookEntry.create(newBookEntry);
    return res.status(201).send(savedBookEntry);
  } catch (error) {
    console.error("Error while creating the book entry:", error);  // Log detailed error
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
});


// GET: Fetch all books
router.get('/', async (req, res) => {
  try {
    const books = await BookEntry.find(); // Fetch all book entries
    return res.status(200).send(books);
  } catch (error) {
    console.error("Error while fetching all books:", error);
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
});

// GET: Fetch a book by ID
router.get('/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await BookEntry.findById(bookId); // Find the book by its ID

    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }

    return res.status(200).send(book);
  } catch (error) {
    console.error("Error while fetching the book by ID:", error);
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
});

// PUT: Update a book by ID
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const bookId = req.params.id;
    const { title, author, description } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const updatedBookData = {
      title,
      author,
      description,
      image: imagePath || undefined, // Only update image if provided
    };

    // Find and update the book entry
    const updatedBook = await BookEntry.findByIdAndUpdate(bookId, updatedBookData, {
      new: true, // Return the updated document
    });

    if (!updatedBook) {
      return res.status(404).send({ message: 'Book not found' });
    }

    return res.status(200).send(updatedBook);
  } catch (error) {
    console.error("Error while updating the book entry:", error);
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
});

export default router;
