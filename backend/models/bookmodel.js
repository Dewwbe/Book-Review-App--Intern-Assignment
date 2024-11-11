import mongoose from 'mongoose';

const bookEntrySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true, // Stores the URL or path of the book image
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
  }
);

export const BookEntry = mongoose.model('BookEntry', bookEntrySchema);
