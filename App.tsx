
import React, { useState, useMemo } from 'react';

import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import AdminRequests from './components/AdminRequests';
import UserRequest from './components/UserRequest';
import UserSelector from './components/UserSelector';
import { translations, Language } from './translations';
import { useEffect } from 'react';
import { getMediaItems } from './services/api';
import BookCard from './components/BookCard';
import UserProfile from './components/UserProfile';
import BookListMenu from './components/BookListMenu';

const CATEGORIES = {
  es: [
    { name: 'Romance', icon: '📔' },
    { name: 'Misterio', icon: '🕵️' },
    { name: 'Thriller', icon: '🔵' },
    { name: 'Utopía', icon: '🔵' },
    { name: 'Ciencia Ficción', icon: '🚀' },
    { name: 'Terror', icon: '🔵' },
    { name: 'Histórico', icon: '🔵' },
    { name: 'Bélico', icon: '🔵' },
    { name: 'Fantasía', icon: '🧚' },
    { name: 'Aventura', icon: '🔵' },
    { name: 'Distopía', icon: '🔵' },
    { name: 'Policiaco', icon: '🔵' },
    { name: 'Erótico', icon: '💋' },
    { name: 'New Adult', icon: '🔵' },
    { name: 'Romántico Paranormal', icon: '🔵' },
    { name: 'Realismo Mágico', icon: '📖' },
    { name: 'Literatura Juvenil', icon: '🔵' },
    { name: 'Post-Apocalíptico', icon: '🔵' },
    { name: 'Western', icon: '🌵' },
    { name: 'Literatura Infantil', icon: '🔵' },
    { name: 'No ficción', icon: '🔵' }
  ],
  en: [
    { name: 'Romance', icon: '📔' },
    { name: 'Mystery', icon: '🕵️' },
    { name: 'Thriller', icon: '🔵' },
    { name: 'Utopia', icon: '🔵' },
    { name: 'Sci-Fi', icon: '🚀' },
    { name: 'Horror', icon: '🔵' },
    { name: 'Historical', icon: '🔵' },
    { name: 'War', icon: '🔵' },
    { name: 'Fantasy', icon: '🧚' },
    { name: 'Adventure', icon: '🔵' },
    { name: 'Dystopia', icon: '🔵' },
    { name: 'Detective', icon: '🔵' },
    { name: 'Erotic', icon: '💋' },
    { name: 'New Adult', icon: '🔵' },
    { name: 'Paranormal Romance', icon: '🔵' },
    { name: 'Magical Realism', icon: '📖' },
    { name: 'YA Literature', icon: '🔵' },
    { name: 'Post-Apocalyptic', icon: '🔵' },
    { name: 'Western', icon: '🌵' },
    { name: 'Children\'s Lit', icon: '🔵' },
    { name: 'Non-fiction', icon: '🔵' }
  ]
};

const BOOK_TYPES = {
  es: [
    { name: 'Manga', icon: '🖼️' },
    { name: 'Cómic', icon: '💥' },
    { name: 'Novela Gráfica', icon: '📘' },
    { name: 'Novelas', icon: '📚' }
  ],
  en: [
    { name: 'Manga', icon: '🖼️' },
    { name: 'Comic', icon: '💥' },
    { name: 'Graphic Novel', icon: '📘' },
    { name: 'Novels', icon: '📚' }
  ]
};

const MEDIA_TYPES = {
  es: [
    { name: 'Anime', icon: '👤' },
    { name: 'Películas', icon: '🍿' }
  ],
  en: [
    { name: 'Anime', icon: '👤' },
    { name: 'Movies', icon: '🍿' }
  ]
};


const App: React.FC = () => {
      const [readBooks, setReadBooks] = useState<string[]>([]);
      const [pendingBooks, setPendingBooks] = useState<string[]>([]);

      const addReadBook = (book: string) => setReadBooks(prev => [...prev, book]);
      const removeReadBook = (book: string) => setReadBooks(prev => prev.filter(b => b !== book));
      const addPendingBook = (book: string) => setPendingBooks(prev => [...prev, book]);
      const removePendingBook = (book: string) => setPendingBooks(prev => prev.filter(b => b !== book));
    const [user, setUser] = useState({
      nick: 'Reader One',
      avatar: 'https://i.pravatar.cc/150?u=reader1',
    });
    const handleUpdateProfile = (data: { nick: string; avatar: string }) => {
      setUser(u => ({ ...u, ...data }));
    };
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('discover');
  const [language, setLanguage] = useState<Language>('es');
  const [viewMode, setViewMode] = useState<'Novelas' | 'Libros' | 'Peliculas' | 'Series' | 'Ebooks'>('Novelas');

  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaError, setMediaError] = useState('');

  useEffect(() => {
    setMediaLoading(true);
    getMediaItems().then(data => {
      setMediaItems(data);
      setMediaLoading(false);
    }).catch(() => {
      setMediaError('Error al cargar contenido');
      setMediaLoading(false);
    });
  }, []);

  const t = translations[language];

  if (!isAuthenticated) {
    return (
      <div>
        <UserSelector onSelect={(user) => {
          setUserId(user._id);
          setIsAdmin(user.role === 'admin');
          setIsAuthenticated(true);
        }} />
        <LoginPage onLogin={() => setIsAuthenticated(true)} language={language} setLanguage={setLanguage} />
      </div>
    );
  }

  const CategoryButton = ({ name, icon }: { name: string, icon: string }) => (
    <div className="relative flex items-center group cursor-pointer transition-all hover:scale-105 active:scale-95">
      <div className="z-10 w-20 h-20 rounded-full bg-cyan-400 border-2 border-white shadow-lg flex items-center justify-center text-3xl shrink-0">
        {icon === '🔵' ? '' : icon}
      </div>
      <div className="category-parallelogram h-12 -ml-8 pr-12 pl-12 flex items-center justify-center min-w-[200px]">
        <span className="category-text nav-font text-3xl text-sky-400 group-hover:text-cyan-500 transition-colors glow-text">
          {name}
        </span>
      </div>
    </div>
  );

  const renderExplore = () => {
    // Relación entre viewMode y type de MediaItem
    const typeMap: any = {
      'Libros': 'book',
      'Novelas': 'novel',
      'Peliculas': 'movie',
      'Series': 'series',
      'Ebooks': 'ebook'
    };
    const currentType = typeMap[viewMode];
    const filteredItems = mediaItems.filter(item => item.type === currentType);
    let headerIcon = '📚';
    if (viewMode === 'Peliculas') headerIcon = '🍿';
    if (viewMode === 'Series') headerIcon = '📺';

    const modes = ['Libros', 'Novelas', 'Peliculas', 'Series', 'Ebooks'] as const;

    return (
      <div className="flex flex-col items-center py-4">
        <div className="w-full border-b border-gray-200 mb-8 flex justify-center gap-12 py-2">
           {modes.map(m => (
             <button 
              key={m}
              onClick={() => setViewMode(m)}
              className={`nav-font text-3xl transition-all ${viewMode === m ? 'glow-text scale-110' : 'text-gray-300 hover:text-cyan-200'}`}
             >
               {t.modes[m as keyof typeof t.modes]}
             </button>
           ))}
        </div>

        <div className="flex items-center gap-4 mb-12">
          <div className="text-5xl">{headerIcon}</div>
          <h1 className="nav-font text-6xl glow-text">{t.modes[viewMode as keyof typeof t.modes]}</h1>
        </div>

        <div className="w-full h-px bg-gray-200 mb-16"></div>

        {mediaLoading ? (
          <div>Cargando contenido...</div>
        ) : mediaError ? (
          <div>{mediaError}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-16 px-12">
            {filteredItems.length === 0 ? (
              <div className="col-span-full text-center text-sky-400">No hay contenido aún.</div>
            ) : (
              filteredItems.map((item, idx) => (
                <BookCard key={item._id || idx} book={{
                  id: item._id,
                  title: item.title,
                  author: item.author || item.director || item.studio || '',
                  coverUrl: item.coverUrl,
                  description: item.description,
                  status: item.status || '',
                  rating: item.rating,
                  tags: item.tags || []
                }} language={language} />
              ))
            )}
          </div>
        )}
      </div>
    );
  };


  // (Eliminado: duplicado, ya está arriba)

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': 
        return (
          <div className="p-12">
            <h1 className="nav-font text-6xl glow-text mb-8 text-center">{t.welcome}</h1>
            <p className="text-center text-cyan-600 font-medium max-w-2xl mx-auto">
              {t.dashboardDesc}
            </p>
          </div>
        );
      case 'discover': return renderExplore();
      case 'studio': return <Studio language={language} />;
      case 'groups': 
        return (
          <div className="p-12 text-center">
            <h1 className="nav-font text-6xl glow-text mb-8">{t.groups}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-cyan-50 p-12 rounded-[3rem] border-2 border-cyan-100 nav-font text-4xl text-cyan-600 cursor-pointer hover:bg-cyan-100 transition-all">Sci-Fi Explorers</div>
              <div className="bg-cyan-50 p-12 rounded-[3rem] border-2 border-cyan-100 nav-font text-4xl text-cyan-600 cursor-pointer hover:bg-cyan-100 transition-all">Clásicos Españoles</div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="p-12 flex flex-col items-center">
            <UserProfile user={user} onUpdate={handleUpdateProfile} language={language} />
            <div className="flex flex-col md:flex-row gap-8 mt-8 w-full max-w-4xl justify-center">
              <BookListMenu
                title={t.read}
                books={readBooks}
                onAdd={addReadBook}
                onRemove={removeReadBook}
                language={language}
              />
              <BookListMenu
                title={t.pending}
                books={pendingBooks}
                onAdd={addPendingBook}
                onRemove={removePendingBook}
                language={language}
              />
            </div>
          </div>
        );
      default: return renderExplore();
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      onLogout={() => setIsAuthenticated(false)}
      language={language}
      setLanguage={setLanguage}
      userAvatar={user.avatar}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
