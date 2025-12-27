import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  userName: String,
  userAvatar: String,
  content: String,
  rating: Number,
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Review', ReviewSchema);