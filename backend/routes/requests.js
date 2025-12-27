import express from 'express';
import Request from '../models/Request.js';
import User from '../models/User.js';

const router = express.Router();

// Crear una nueva solicitud (request) de usuario
router.post('/', async (req, res) => {
  try {
    const { userId, type, data } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    const request = new Request({ userId, type, data });
    await request.save();
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener todas las solicitudes (admin)
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find().populate('userId', 'name avatar');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Aprobar o rechazar una solicitud (admin)
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body; // 'approved' o 'rejected'
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!request) return res.status(404).json({ error: 'Solicitud no encontrada' });
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
