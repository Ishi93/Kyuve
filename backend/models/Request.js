import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true }, // Puede ser book, movie, anime, etc.
  data: { type: Object, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Request', RequestSchema);