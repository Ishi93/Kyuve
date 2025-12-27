import React, { useEffect, useState } from 'react';
import { getRequests, updateRequest } from '../services/api';
import { createMediaItem } from '../services/api';

const AdminRequests: React.FC = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await getRequests();
      setRequests(data);
    } catch (err: any) {
      setError('Error al cargar requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);


  const handleAction = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await updateRequest(id, status);
      fetchRequests();
    } catch {
      setError('Error al actualizar request');
    }
  };

  const handleCreateMedia = async (req: any) => {
    try {
      await createMediaItem({ ...req.data, type: req.type });
      alert('Contenido creado en la base de datos');
    } catch {
      setError('Error al crear el contenido');
    }
  };

  if (loading) return <div>Cargando requests...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Solicitudes de usuarios</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Usuario</th>
            <th className="border px-4 py-2">Tipo</th>
            <th className="border px-4 py-2">Datos</th>
            <th className="border px-4 py-2">Estado</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req: any) => (
            <tr key={req._id}>
              <td className="border px-4 py-2">{req.userId?.name || 'Desconocido'}</td>
              <td className="border px-4 py-2">{req.type}</td>
              <td className="border px-4 py-2 text-xs max-w-xs truncate">{JSON.stringify(req.data)}</td>
              <td className="border px-4 py-2">{req.status}</td>
              <td className="border px-4 py-2">
                {req.status === 'pending' && (
                  <>
                    <button onClick={() => handleAction(req._id, 'approved')} className="bg-green-500 text-white px-3 py-1 rounded mr-2">Aprobar</button>
                    <button onClick={() => handleAction(req._id, 'rejected')} className="bg-red-500 text-white px-3 py-1 rounded">Rechazar</button>
                  </>
                )}
                {req.status === 'approved' && (
                  <button onClick={() => handleCreateMedia(req)} className="bg-cyan-500 text-white px-3 py-1 rounded">Crear en Media</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRequests;
