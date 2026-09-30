export interface LibraryGame {
  id: string;
  userId: string;
  externalGameId: number;
  title: string;
  coverImage: string | null;
  released: string | null;
  status: 'pending' | 'playing' | 'completed' | 'abandoned';
  addedAt: Date;
}
