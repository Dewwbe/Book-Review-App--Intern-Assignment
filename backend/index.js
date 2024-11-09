// index.js
import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from './models/reviewmodel.js'; // Add `.js` to the path
import reviewRoute from './routes/reviewRoute.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to MERN Stack tutorial')
});

app.use('/reviews', reviewRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
