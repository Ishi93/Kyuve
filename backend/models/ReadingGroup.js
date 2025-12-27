import mongoose from 'mongoose';

const ReadingGroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  memberCount: Number,
  description: String,
  currentBook: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }
});

export default mongoose.model('ReadingGroup', ReadingGroupSchema);