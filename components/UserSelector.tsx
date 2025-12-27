import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/api';

const UserSelector: React.FC<{ onSelect: (user: any) => void }> = ({ onSelect }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Cargando usuarios...</div>;

  return (
    <div className="p-4 flex gap-4">
      {users.map((u: any) => (
        <button key={u._id} onClick={() => onSelect(u)} className="px-4 py-2 bg-cyan-200 rounded shadow">
          {u.name} ({u.role})
        </button>
      ))}
    </div>
  );
};

export default UserSelector;
