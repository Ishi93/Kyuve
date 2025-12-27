import express from 'express';
import Review from '../models/Review.js';

const router = express.Router();

// Obtener todas las reseñas
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear reseña
router.post('/', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener reseña por ID
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Reseña no encontrada' });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar reseña
router.put('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!review) return res.status(404).json({ error: 'Reseña no encontrada' });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar reseña
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ error: 'Reseña no encontrada' });
    res.json({ message: 'Reseña eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
