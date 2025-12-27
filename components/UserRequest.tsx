import React, { useState } from 'react';
import { createRequest } from '../services/api';

const UserRequest: React.FC<{ userId: string }> = ({ userId }) => {
  const [type, setType] = useState('book');
  const contentTypes = [
    { value: 'book', label: 'Libro' },
    { value: 'novel', label: 'Novela' },
    { value: 'movie', label: 'Película' },
    { value: 'series', label: 'Serie' },
    { value: 'ebook', label: 'Ebook' },
    { value: 'manga', label: 'Manga' },
    { value: 'comic', label: 'Cómic' },
    { value: 'anime', label: 'Anime' }
  ];
  const [data, setData] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await createRequest({ userId, type, data: JSON.parse(data) });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Solicitar alta de libro/serie</h2>
      <div className="mb-4">
        <label className="block mb-1">Tipo</label>
        <select value={type} onChange={e => setType(e.target.value)} className="border p-2 rounded w-full">
          {contentTypes.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Datos (JSON)</label>
        <textarea value={data} onChange={e => setData(e.target.value)} className="border p-2 rounded w-full h-32" placeholder='{"title":"...","author":"..."}' />
      </div>
      <button type="submit" className="bg-cyan-500 text-white px-6 py-2 rounded" disabled={status==='loading'}>
        Enviar solicitud
      </button>
      {status === 'success' && <div className="text-green-600 mt-2">¡Solicitud enviada!</div>}
      {status === 'error' && <div className="text-red-600 mt-2">Error al enviar solicitud</div>}
    </form>
  );
};

export default UserRequest;
