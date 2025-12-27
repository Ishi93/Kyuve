import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const User = require('./models/User.js').default;

async function createUsers() {
  await mongoose.connect(process.env.MONGODB_URI);


  // Crear admin jesusmoren93@gmail.com
  await User.create({
    name: 'Jesús Moren',
    email: 'jesusmoren93@gmail.com',
    username: 'jesusmoren93',
    password: 'susejjesus1993!!',
    avatar: '',
    bio: 'Administrador',
    following: 0,
    followers: 0,
    stats: { read: 0, toRead: 0, toBuy: 0 },
    role: 'admin'
  });

  // Crear admin myurane95@gmail.com
  await User.create({
    name: 'Myurane Admin',
    email: 'myurane95@gmail.com',
    username: 'myurane95',
    password: 'Myr2025!XyZ',
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
