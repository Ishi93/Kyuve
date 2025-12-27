export async function getMediaItems() {
  const res = await fetch(`${API_URL}/media`);
  if (!res.ok) throw new Error('Error al obtener media items');
  return res.json();
}
export async function createMediaItem(data) {
  const res = await fetch(`${API_URL}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear media item');
  return res.json();
}

export async function uploadMediaImages(coverFile: File | null, backCoverFile: File | null) {
  const formData = new FormData();
  if (coverFile) formData.append('cover', coverFile);
  if (backCoverFile) formData.append('backcover', backCoverFile);
  const res = await fetch(`${API_URL}/media/upload`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) throw new Error('Error al subir imágenes');
  return res.json();
}

const API_URL = 'http://localhost:4000/api';

export async function getBooks() {
  const res = await fetch(`${API_URL}/books`);
  if (!res.ok) throw new Error('Error al obtener libros');
  return res.json();
}

export async function getUsers() {
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) throw new Error('Error al obtener usuarios');
  return res.json();
}

export async function getGroups() {
  const res = await fetch(`${API_URL}/groups`);
  if (!res.ok) throw new Error('Error al obtener grupos');
  return res.json();
}

export async function getReviews() {
  const res = await fetch(`${API_URL}/reviews`);
  if (!res.ok) throw new Error('Error al obtener reseñas');
  return res.json();
}

export async function getRequests() {
  const res = await fetch(`${API_URL}/requests`);
  if (!res.ok) throw new Error('Error al obtener requests');
  return res.json();
}

export async function createRequest(data) {
  const res = await fetch(`${API_URL}/requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear request');
  return res.json();
}

export async function updateRequest(id, status) {
  const res = await fetch(`${API_URL}/requests/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error('Error al actualizar request');
  return res.json();
}
