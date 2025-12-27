
import React from 'react';
import BrandLogo from './BrandLogo';
import { translations, Language } from '../translations';
import BaseDeDatosTab from './BaseDeDatosTab';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  userAvatar?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, onLogout, language, setLanguage, userAvatar }) => {
  const t = translations[language];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Header */}
      <header className="header-bg px-8 py-2 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-12">
          <BrandLogo size="sm" className="cursor-pointer" onClick={() => setActiveTab('dashboard')} />
          
          <nav className="hidden md:flex items-center gap-12">
            <button 
              onClick={() => setActiveTab('discover')}
              className={`nav-font text-3xl text-sky-500 hover:text-white transition-colors ${activeTab === 'discover' ? 'glow-text brightness-150' : ''}`}
            >
              {t.explore}
            </button>
            <button 
              onClick={() => setActiveTab('groups')}
              className={`nav-font text-3xl text-sky-500 hover:text-white transition-colors ${activeTab === 'groups' ? 'glow-text brightness-150' : ''}`}
            >
              {t.groups}
            </button>
            <button 
              onClick={() => setActiveTab('database')}
              className={`nav-font text-3xl text-sky-500 hover:text-white transition-colors ${activeTab === 'database' ? 'glow-text brightness-150' : ''}`}
            >
              Base de datos
            </button>
          </nav>
        </div>

        <div className="flex-1 max-w-xl mx-8 hidden sm:flex items-center">
          <div className="relative w-full flex">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-cyan-400">🔍</span>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 bg-white/90 border-none rounded-l-lg focus:ring-0 text-sm placeholder-cyan-200 search-bar-shadow"
              placeholder=""
            />
            <button className="bg-cyan-400 hover:bg-cyan-500 text-white px-6 py-2 rounded-r-lg font-bold text-xs shadow-md transition-all">
              {t.search}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Language Toggle */}
          <div className="flex bg-white/30 backdrop-blur-md rounded-full p-1 border border-white/20 shadow-sm overflow-hidden">
            <button 
              onClick={() => setLanguage('es')}
              className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${language === 'es' ? 'bg-white text-cyan-600 shadow-sm' : 'text-cyan-100 hover:text-white'}`}
            >
              ES
            </button>
            <button 
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${language === 'en' ? 'bg-white text-cyan-600 shadow-sm' : 'text-cyan-100 hover:text-white'}`}
            >
              EN
            </button>
          </div>

          <button 
            onClick={() => setActiveTab('profile')}
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/50 shadow-md hover:scale-105 transition-transform"
          >
            <img src={userAvatar || "https://i.pravatar.cc/150?u=reader1"} alt="Profile" />
          </button>
          <button 
            onClick={onLogout}
            className="hidden lg:block text-[10px] font-bold text-cyan-600 uppercase tracking-widest hover:text-white transition-colors"
          >
            {t.logout}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 bg-white">
        {activeTab === 'database' ? <BaseDeDatosTab /> : children}
      </main>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-cyan-100 flex justify-around py-3 z-50">
        <button onClick={() => setActiveTab('dashboard')} className={`text-2xl ${activeTab === 'dashboard' ? 'text-cyan-500' : 'text-cyan-200'}`}>🏠</button>
        <button onClick={() => setActiveTab('discover')} className={`text-2xl ${activeTab === 'discover' ? 'text-cyan-500' : 'text-cyan-200'}`}>✨</button>
        <button onClick={() => setActiveTab('groups')} className={`text-2xl ${activeTab === 'groups' ? 'text-cyan-500' : 'text-cyan-200'}`}>👥</button>
        <button onClick={() => setActiveTab('database')} className={`text-2xl ${activeTab === 'database' ? 'text-cyan-500' : 'text-cyan-200'}`}>🗄️</button>
      </nav>
    </div>
  );
};

export default Layout;
