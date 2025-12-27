
import React from 'react';
import { Book } from '../types';
import { translations, Language } from '../translations';

  book: Book;
  onClick?: () => void;
  showStatus?: boolean;
  language?: Language;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick, showStatus = true, language = 'es' }) => {
  const t = translations[language];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Read': return 'bg-cyan-100 text-cyan-700';
      case 'Reading': return 'bg-sky-500 text-white shadow-lg shadow-sky-200';
      case 'Want to Read': return 'bg-sky-100 text-sky-700';
      case 'To Buy': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div 
      className="group cursor-pointer bg-white rounded-[1.5rem] border border-sky-50 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-sky-100 transition-all duration-500 hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={book.coverUrl} 
          alt={book.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {showStatus && (
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-sm ${getStatusColor(book.status)}`}>
              {book.status}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
           <span className="text-white text-xs font-bold uppercase tracking-widest underline decoration-sky-400 decoration-2 underline-offset-4">{t.quickView || 'Quick View'}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-sky-900 leading-tight mb-1 truncate">{book.title}</h3>
        <p className="text-xs text-sky-400 italic mb-3 truncate">{book.author}</p>
        
        {book.rating ? (
          <div className="flex items-center text-sky-400 text-[10px]">
            {'★'.repeat(book.rating)}
            <span className="ml-2 text-sky-300 font-bold">{book.rating}.0</span>
          </div>
        ) : (
          <div className="text-[10px] text-sky-200 font-bold uppercase">{t.noRating || 'No Rating'}</div>
        )}
        
        <div className="flex flex-wrap gap-1 mt-4">
          {book.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[9px] px-2 py-1 bg-sky-50 text-sky-400 rounded-lg uppercase font-bold tracking-tighter">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
