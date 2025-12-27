import express from 'express';
import MediaItem from '../models/MediaItem.js';
import upload from '../middleware/upload.js';

const router = express.Router();
// Subida de imágenes (portada y contraportada)
router.post('/upload', upload.fields([
  { name: 'cover', maxCount: 1 },
  { name: 'backcover', maxCount: 1 }
]), (req, res) => {
  try {
    const files = req.files;
    const coverUrl = files?.cover ? `/uploads/${files.cover[0].filename}` : '';
    const backCoverUrl = files?.backcover ? `/uploads/${files.backcover[0].filename}` : '';
    res.json({ coverUrl, backCoverUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener todos los items
router.get('/', async (req, res) => {
  try {
    const items = await MediaItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear un item
router.post('/', async (req, res) => {
  try {
    const item = new MediaItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener un item por ID
router.get('/:id', async (req, res) => {
  try {
    const item = await MediaItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item no encontrado' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un item
router.put('/:id', async (req, res) => {
  try {
    const item = await MediaItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'Item no encontrado' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar un item
router.delete('/:id', async (req, res) => {
  try {
    const item = await MediaItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item no encontrado' });
    res.json({ message: 'Item eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
