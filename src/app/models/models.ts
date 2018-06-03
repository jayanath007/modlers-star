

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

export interface Album {
  key: string;
  name: string;
  category: Array<string>;
  imageUrls: Array<string>;
  modler: string;
  likes: number;
  rating: number;
  rank: number;
  userId: string;
  id?: string;
  commentCount: number;
  recentComments: Comment[];
}
export interface Comment {
  content: string;
  createdAt: Date;
  photoURL: string;
  userName: string;
}


export interface Reaction {
  albumId: string;
  userId: string;
  action: number;
}

export interface Star {
  userId: string;
  albumId: string;
  value: number;
}

