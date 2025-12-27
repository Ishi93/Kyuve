import mongoose from 'mongoose';

const MediaItemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['book', 'novel', 'movie', 'series', 'ebook', 'manga', 'comic', 'anime'],
    required: true
  },
  title: { type: String, required: true },
  author: String, // Para libros, novelas, manga, comic
  genres: [String], // Géneros múltiples
  studio: String, // Para anime
  description: String,
  coverUrl: String,
  tags: [String],
  status: String, // leído, viendo, pendiente, etc.
  rating: Number,
  year: Number,
  episodes: Number, // Para series, anime
  duration: Number, // Para películas (en minutos)
  language: String,
  extra: Object // Para campos adicionales
});

export default mongoose.model('MediaItem', MediaItemSchema);