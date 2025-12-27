import express from 'express';
import ReadingGroup from '../models/ReadingGroup.js';

const router = express.Router();

// Obtener todos los grupos de lectura
router.get('/', async (req, res) => {
  try {
    const groups = await ReadingGroup.find();
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear grupo de lectura
router.post('/', async (req, res) => {
  try {
    const group = new ReadingGroup(req.body);
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener grupo por ID
router.get('/:id', async (req, res) => {
  try {
    const group = await ReadingGroup.findById(req.params.id);
    if (!group) return res.status(404).json({ error: 'Grupo no encontrado' });
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar grupo
router.put('/:id', async (req, res) => {
  try {
    const group = await ReadingGroup.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!group) return res.status(404).json({ error: 'Grupo no encontrado' });
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar grupo
router.delete('/:id', async (req, res) => {
  try {
    const group = await ReadingGroup.findByIdAndDelete(req.params.id);
    if (!group) return res.status(404).json({ error: 'Grupo no encontrado' });
    res.json({ message: 'Grupo eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
