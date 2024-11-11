import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import reviewRoute from './routes/reviewRoute.js';
import bookRoute from './routes/bookRoute.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to the MERN Stack tutorial');
});

// Ensure you're using the correct route paths
app.use('/reviews', reviewRoute);
app.use('/books', bookRoute);  // Note: Use 'bookRoute' directly, no need for '.js'

// MongoDB connection setup
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
