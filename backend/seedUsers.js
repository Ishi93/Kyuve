import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const User = require('./models/User.js').default;

async function createUsers() {
  await mongoose.connect(process.env.MONGODB_URI);

  // Crear usuario admin

  await User.create({
    name: 'Admin',
    email: 'admin@demo.com',
    username: 'admin',
    password: 'admin123',
    avatar: '',
    bio: 'Administrador',
    following: 0,
    followers: 0,
    stats: { read: 0, toRead: 0, toBuy: 0 },
    role: 'admin'
  });

  // Crear usuario normal
  await User.create({
    name: 'Usuario Normal',
    email: 'user@demo.com',
    username: 'user',
    password: 'user123',
    avatar: '',
    bio: 'Usuario estándar',
    following: 0,
    followers: 0,
    stats: { read: 0, toRead: 0, toBuy: 0 },
    role: 'user'
  });

  console.log('Usuarios creados');
  process.exit();
}

createUsers();
