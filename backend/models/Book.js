import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  coverUrl: String,
  description: String,
  status: { type: String, enum: ['Read', 'Reading', 'Want to Read', 'To Buy'], default: 'Want to Read' },
  rating: Number,
  tags: [String]
});

export default mongoose.model('Book', BookSchema);