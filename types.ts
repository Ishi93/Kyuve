
interface ImportMetaEnv {
  VITE_API_URL: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}

export type BookStatus = 'Read' | 'Reading' | 'Want to Read' | 'To Buy';

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  status: BookStatus;
  rating?: number;
  tags: string[];
}

export interface Review {
  id: string;
  bookId: string;
  userName: string;
  userAvatar: string;
  content: string;
  rating: number;
  date: string;
}

export interface ReadingGroup {
  id: string;
  name: string;
  memberCount: number;
  description: string;
  currentBook?: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  following: number;
  followers: number;
  stats: {
    read: number;
    toRead: number;
    toBuy: number;
  };
}
