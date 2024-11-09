import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5, // Ensures the rating is between 1 and 5
    },
    reviewText: {
      type: String,
      required: true,
    },
    dateAdded: {
      type: Date,
      default: Date.now, // Sets default to the current date when a review is submitted
    },
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
  }
);

export const Book = mongoose.model('Book', bookSchema);
