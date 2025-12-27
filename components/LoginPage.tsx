
import React, { useState } from 'react';
import BrandLogo from './BrandLogo';
import { translations, Language } from '../translations';

interface LoginPageProps {
  onLogin: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, language, setLanguage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 watercolor-bg overflow-hidden relative">
      {/* Absolute Language Switcher */}
      <div className="absolute top-8 right-8 z-50 flex bg-white/50 backdrop-blur-md rounded-full p-1 border border-sky-100 shadow-lg">
        <button 
          onClick={() => setLanguage('es')}
          className={`px-4 py-2 rounded-full text-xs font-black transition-all ${language === 'es' ? 'bg-cyan-400 text-white shadow-md' : 'text-cyan-600 hover:bg-cyan-50'}`}
        >
          Español
        </button>
        <button 
          onClick={() => setLanguage('en')}
          className={`px-4 py-2 rounded-full text-xs font-black transition-all ${language === 'en' ? 'bg-cyan-400 text-white shadow-md' : 'text-cyan-600 hover:bg-cyan-50'}`}
        >
          English
        </button>
      </div>

      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-200/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-200/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-md space-y-8 bg-white/70 backdrop-blur-2xl p-10 rounded-[3rem] shadow-2xl shadow-sky-200/50 border border-white/50 relative z-10">
        <div className="text-center relative">
          <div className="flex justify-center mb-6">
            <BrandLogo size="xl" className="transform -rotate-3 hover:rotate-0 transition-transform duration-500" />
          </div>
          <p className="text-sky-600 font-bold tracking-widest uppercase text-[10px] mt-2">{t.universe}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-sky-800 uppercase tracking-[0.2em] ml-2">{t.email}</label>
            <input
              type="email"
              required
              className="w-full px-6 py-4 bg-white/50 border border-sky-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-cyan-400/20 transition-all text-sky-900 placeholder-sky-200 shadow-inner"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-sky-800 uppercase tracking-[0.2em] ml-2">{t.password}</label>
            <input
              type="password"
              required
              className="w-full px-6 py-4 bg-white/50 border border-sky-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-cyan-400/20 transition-all text-sky-900 placeholder-sky-200 shadow-inner"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-sky-500 to-cyan-400 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-cyan-200/50 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              </>
            ) : (
              t.enter
            )}
          </button>
        </form>

        <div className="pt-8 text-center border-t border-sky-50">
          <p className="text-sm text-sky-400">
            {t.noAccount} <span className="text-cyan-600 font-bold hover:underline cursor-pointer">{t.createLibrary}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
