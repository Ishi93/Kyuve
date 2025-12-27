
import { Book, Review, ReadingGroup, User } from './types';

export const INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Shadow of the Wind',
    author: 'Carlos Ruiz Zafón',
    coverUrl: 'https://picsum.photos/seed/book1/300/450',
    description: 'A young boy is taken to the Cemetery of Forgotten Books and chooses a volume that will change his life.',
    status: 'Read',
    rating: 5,
    tags: ['Fiction', 'Historical', 'Mystery']
  },
  {
    id: '2',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    coverUrl: 'https://picsum.photos/seed/book2/300/450',
    description: 'A lone astronaut must save the earth from an extinction-level threat.',
    status: 'Reading',
    tags: ['Sci-Fi', 'Space', 'Thriller']
  },
  {
    id: '3',
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    coverUrl: 'https://picsum.photos/seed/book3/300/450',
    description: 'The multi-generational story of the Buendía family, whose patriarch, José Arcadio Buendía, founded the town of Macondo.',
    status: 'Want to Read',
    tags: ['Magic Realism', 'Classic']
  }
];

export const DUMMY_USER: User = {
  id: 'u1',
  name: 'Reader One',
  avatar: 'https://i.pravatar.cc/150?u=reader1',
  bio: 'Lover of classics and contemporary fiction. Always looking for the next page-turner.',
  following: 124,
  followers: 89,
  stats: {
    read: 45,
    toRead: 23,
    toBuy: 12
  }
};

export const DUMMY_GROUPS: ReadingGroup[] = [
  {
    id: 'g1',
    name: 'Sci-Fi Explorers',
    memberCount: 1540,
    description: 'Discussing the future of humanity through books.',
    currentBook: 'Project Hail Mary'
  },
  {
    id: 'g2',
    name: 'Spanish Classics',
    memberCount: 850,
    description: 'Reading the greatest works in the Spanish language.',
    currentBook: 'Don Quijote'
  }
];
