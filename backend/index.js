
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();



const app = express();
app.use(express.json());
app.use(cors());
// Servir imágenes subidas
import path from 'path';
app.use('/uploads', express.static(path.join(process.cwd(), 'backend', 'uploads')));

import requestsRouter from './routes/requests.js';
import booksRouter from './routes/books.js';
import usersRouter from './routes/users.js';
import groupsRouter from './routes/groups.js';
import reviewsRouter from './routes/reviews.js';
import mediaRouter from './routes/media.js';
app.use('/api/requests', requestsRouter);
app.use('/api/books', booksRouter);
app.use('/api/users', usersRouter);
app.use('/api/groups', groupsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/media', mediaRouter);


const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((err) => console.error('Error conectando a MongoDB Atlas:', err));

app.get('/', (req, res) => {
  res.send('Backend funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});
