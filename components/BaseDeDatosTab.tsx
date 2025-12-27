import React, { useEffect, useState, useRef } from 'react';
import { getMediaItems, createMediaItem, uploadMediaImages } from '../services/api';

const BaseDeDatosTab: React.FC = () => {

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Formulario
  const [form, setForm] = useState({
    type: 'book',
    title: '',
    author: '',
    genres: [] as string[],
    studio: '',
    description: '',
    coverUrl: '',
    backCoverUrl: '',
    extraNotas: ''
  });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [backCoverFile, setBackCoverFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (name === 'genres') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm(prev => {
        let genres = prev.genres.slice();
        if (checked) {
          genres.push(value);
        } else {
          genres = genres.filter(g => g !== value);
        }
        return { ...prev, genres };
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;
    if (name === 'coverFile') setCoverFile(files[0]);
    if (name === 'backCoverFile') setBackCoverFile(files[0]);
  };

  const handleUploadImages = async () => {
    setUploading(true);
    setError('');
    try {
      const result = await uploadMediaImages(coverFile, backCoverFile);
      setForm(f => ({ ...f, coverUrl: result.coverUrl || '', backCoverUrl: result.backCoverUrl || '' }));
      setSuccess('¡Imágenes subidas!');
    } catch {
      setError('Error al subir imágenes');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess('');
    setError('');
    try {
      // Si hay archivos, subir primero
      if (coverFile || backCoverFile) {
        await handleUploadImages();
      }
      const payload: any = {
        type: form.type,
        title: form.title,
        author: form.author,
        genres: form.genres,
        studio: form.studio,
        description: form.description,
        coverUrl: form.coverUrl,
        backCoverUrl: form.backCoverUrl,
        extra: { notas: form.extraNotas }
      };
      await createMediaItem(payload);
      setSuccess('¡Item añadido!');
      setForm({ type: 'book', title: '', author: '', genres: [], studio: '', description: '', coverUrl: '', backCoverUrl: '', extraNotas: '' });
      setCoverFile(null);
      setBackCoverFile(null);
      // Refrescar tabla
      const data = await getMediaItems();
      setItems(data);
    } catch {
      setError('Error al subir el item');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getMediaItems()
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar items');
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start p-8 bg-cyan-100">
      <h2 className="text-3xl font-bold mb-8 text-sky-900">Base de datos</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white rounded-[2rem] shadow-xl border border-cyan-200 p-8 mb-12 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-cyan-700 mb-2">Tipo</label>
            <select name="type" value={form.type} onChange={handleChange} className="w-full px-5 py-3 rounded-xl border border-cyan-100 bg-cyan-50 text-cyan-900 focus:ring-2 focus:ring-cyan-200">
              <option value="book">Libro</option>
              <option value="novel">Novela</option>
              <option value="movie">Película</option>
              <option value="series">Serie</option>
              <option value="ebook">Ebook</option>
              <option value="manga">Manga</option>
              <option value="comic">Cómic</option>
              <option value="anime">Anime</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-cyan-700 mb-2">Título</label>
            <input name="title" value={form.title} onChange={handleChange} required className="w-full px-5 py-3 rounded-xl border border-cyan-100 bg-cyan-50 text-cyan-900 focus:ring-2 focus:ring-cyan-200" />
          </div>
          <div>
            <label className="block text-xs font-bold text-cyan-700 mb-2">Autor</label>
            <input name="author" value={form.author} onChange={handleChange} className="w-full px-5 py-3 rounded-xl border border-cyan-100 bg-cyan-50 text-cyan-900 focus:ring-2 focus:ring-cyan-200" />
          </div>
          <div className="relative">
            <label className="block text-xs font-bold text-cyan-700 mb-2">Géneros</label>
            <GenreMultiSelect selected={form.genres} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-xs font-bold text-cyan-700 mb-2">Estudio</label>
            <input name="studio" value={form.studio} onChange={handleChange} className="w-full px-5 py-3 rounded-xl border border-cyan-100 bg-cyan-50 text-cyan-900 focus:ring-2 focus:ring-cyan-200" />
          </div>
          <div>
            <label className="block text-xs font-bold text-cyan-700 mb-2">Portada (URL o archivo)</label>
            <input name="coverUrl" value={form.coverUrl} onChange={handleChange} className="w-full px-5 py-3 rounded-xl border border-cyan-100 bg-cyan-50 text-cyan-900 focus:ring-2 focus:ring-cyan-200 mb-2" placeholder="https://..." />
            <input type="file" name="coverFile" accept="image/*" onChange={handleFileChange} className="w-full text-xs" />
            {form.coverUrl && <img src={form.coverUrl} alt="portada" className="w-16 h-24 object-cover rounded shadow mt-2" />}
          </div>
          <div>
            <label className="block text-xs font-bold text-cyan-700 mb-2">Contraportada (archivo opcional)</label>
            <input type="file" name="backCoverFile" accept="image/*" onChange={handleFileChange} className="w-full text-xs" />
            {form.backCoverUrl && <img src={form.backCoverUrl} alt="contraportada" className="w-16 h-24 object-cover rounded shadow mt-2" />}
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-cyan-700 mb-2">Descripción</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full px-5 py-3 rounded-xl border border-cyan-100 bg-cyan-50 text-cyan-900 focus:ring-2 focus:ring-cyan-200 min-h-[80px]" />
        </div>
        <div>
          <label className="block text-xs font-bold text-cyan-700 mb-2">Notas</label>
          <textarea name="extraNotas" value={form.extraNotas} onChange={handleChange} className="w-full px-5 py-3 rounded-xl border border-cyan-100 bg-cyan-50 text-cyan-900 focus:ring-2 focus:ring-cyan-200 min-h-[40px]" />
        </div>
        <button type="submit" disabled={submitting || uploading} className="w-full py-4 rounded-2xl bg-cyan-400 hover:bg-cyan-500 text-white font-black text-lg shadow-lg shadow-cyan-200 transition-all disabled:opacity-60">
          {submitting || uploading ? 'Subiendo...' : 'Añadir a la base de datos'}
        </button>
        {success && <div className="text-green-600 font-bold text-center mt-2">{success}</div>}
        {error && <div className="text-red-500 font-bold text-center mt-2">{error}</div>}
      </form>

      {/* Tabla */}
      <div className="bg-slate-800 rounded-lg shadow-lg p-6 w-full max-w-6xl min-h-[300px] flex flex-col items-center justify-center">
        {loading ? (
          <div className="text-slate-300">Cargando items...</div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white text-slate-900 rounded-lg">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Tipo</th>
                  <th className="border px-4 py-2">Título</th>
                  <th className="border px-4 py-2">Autor</th>
                  <th className="border px-4 py-2">Géneros</th>
                  <th className="border px-4 py-2">Portada</th>
                  <th className="border px-4 py-2">Descripción</th>
                  <th className="border px-4 py-2">Notas</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td className="border px-4 py-2">{item.type}</td>
                    <td className="border px-4 py-2 font-bold">{item.title}</td>
                    <td className="border px-4 py-2">{item.author || '-'}</td>
                    <td className="border px-4 py-2">{Array.isArray(item.genres) ? item.genres.join(', ') : (item.genres || '-')}</td>
                    <td className="border px-4 py-2">
                      {item.coverUrl ? (
                        <img src={item.coverUrl} alt="portada" className="w-16 h-24 object-cover rounded shadow" />
                      ) : (
                        <span className="text-xs text-slate-400">Sin portada</span>
                      )}
                    </td>
                    <td className="border px-4 py-2 max-w-xs truncate">{item.description}</td>
                    <td className="border px-4 py-2 text-xs">{item.extra?.notas || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};


// Selector de géneros con checkboxes y desplegable (declarado fuera del componente principal)
const GENRES = [
  "Romance", "Misterio", "Thriller", "Utopía", "Ciencia Ficción", "Terror", "Histórico", "Bélico", "Fantasía", "Aventura", "Distopía", "Policiaco", "Erótico", "New Adult", "Romántico Paranormal", "Realismo Mágico", "Juvenil", "Post-Apocalíptico", "Western", "Infantil", "No ficción"
];

type GenreMultiSelectProps = {
  selected: string[];
  onChange: (e: any) => void;
};

const GenreMultiSelect: React.FC<GenreMultiSelectProps> = ({ selected, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen(o => !o)} className="w-full px-5 py-3 rounded-xl border border-cyan-100 bg-cyan-50 text-cyan-900 text-left focus:ring-2 focus:ring-cyan-200">
        {selected.length === 0 ? 'Selecciona géneros...' : selected.join(', ')}
        <span className="float-right">▼</span>
      </button>
      {open && (
        <div className="absolute z-10 bg-white border border-cyan-200 rounded-xl shadow-xl mt-2 w-full p-4 grid grid-cols-2 gap-2 max-h-56 overflow-y-auto">
          {GENRES.map(g => (
            <label key={g} className="flex items-center gap-2 cursor-pointer text-cyan-800 text-xs">
              <input
                type="checkbox"
                name="genres"
                value={g}
                checked={selected.includes(g)}
                onChange={onChange}
                className="accent-cyan-500"
              />
              {g}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default BaseDeDatosTab;
