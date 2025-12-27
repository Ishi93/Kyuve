
import React, { useState, ChangeEvent } from 'react';
import { translations, Language } from '../translations';

interface UserProfileProps {
  user: {
    nick: string;
    avatar: string;
    email?: string;
  };
  onUpdate: (data: { nick: string; avatar: string }) => void;
  language?: Language;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdate, language = 'es' }) => {
  const t = translations[language];
  const [nick, setNick] = useState(user.nick);
  const [avatar, setAvatar] = useState(user.avatar);
  const [editing, setEditing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSave = () => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onUpdate({ nick, avatar: reader.result });
        }
      };
      reader.readAsDataURL(file);
    } else {
      onUpdate({ nick, avatar });
    }
    setEditing(false);
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      <div className="w-32 h-32 rounded-full border-4 border-cyan-400 overflow-hidden mb-4">
        <img src={preview || avatar} alt="Avatar" className="w-full h-full object-cover" />
      </div>
      {editing ? (
        <>
          <input
            className="border rounded-xl px-4 py-2 w-full mb-2"
            value={nick}
            onChange={e => setNick(e.target.value)}
            placeholder={t.newNick || 'Nuevo nick'}
          />
          <input
            className="border rounded-xl px-4 py-2 w-full mb-2"
            value={avatar}
            onChange={e => setAvatar(e.target.value)}
            placeholder={t.avatarUrl || 'URL del avatar'}
            disabled={!!file}
          />
          <input
            type="file"
            accept="image/*"
            className="w-full mb-2"
            onChange={handleFileChange}
          />
          <div className="flex gap-4">
            <button className="bg-cyan-500 text-white px-6 py-2 rounded-xl font-bold" onClick={handleSave}>{t.save || 'Guardar'}</button>
            <button className="bg-gray-300 px-6 py-2 rounded-xl font-bold" onClick={() => { setEditing(false); setFile(null); setPreview(null); }}>{t.cancel || 'Cancelar'}</button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-2">{nick}</h2>
          <button className="bg-cyan-400 text-white px-6 py-2 rounded-xl font-bold" onClick={() => setEditing(true)}>
            {t.editProfile || 'Editar perfil'}
          </button>
        </>
      )}
    </div>
  );
};

export default UserProfile;
