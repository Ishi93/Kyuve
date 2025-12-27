import React, { useState } from 'react';

interface BookListMenuProps {
  title: string;
  books: string[];
  onAdd: (book: string) => void;
  onRemove: (book: string) => void;
}

const BookListMenu: React.FC<BookListMenuProps> = ({ title, books, onAdd, onRemove }) => {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim() && !books.includes(input.trim())) {
      onAdd(input.trim());
      setInput('');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mb-8">
      <h3 className="text-xl font-bold mb-4 text-cyan-700">{title}</h3>
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border rounded-xl px-3 py-2"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={`Añadir ${title.toLowerCase().slice(0, -1)}`}
          onKeyDown={e => { if (e.key === 'Enter') handleAdd(); }}
        />
        <button className="bg-cyan-400 text-white px-4 py-2 rounded-xl font-bold" onClick={handleAdd}>Añadir</button>
      </div>
      <ul className="space-y-2">
        {books.map(book => (
          <li key={book} className="flex items-center justify-between bg-cyan-50 rounded-lg px-3 py-2">
            <span>{book}</span>
            <button className="text-red-500 font-bold" onClick={() => onRemove(book)}>Quitar</button>
          </li>
        ))}
        {books.length === 0 && <li className="text-gray-400 text-sm">No hay {title.toLowerCase()}.</li>}
      </ul>
    </div>
  );
};

export default BookListMenu;
