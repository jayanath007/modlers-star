import { uuid } from "../shared/util/uid";


export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}


export interface ImageInfo {
  id: string;
  url: string;
  name: string;
}

export interface Album {
  key: string;
  name: string;
  category: Array<string>;
  imageUrls: Array<ImageInfo>;
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

export interface Like {
  key: string;
  userId: string;
  albumId: string;
  value: number;
}


export class Upload {

  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: Date = new Date();
  constructor(file: File) {
    this.file = file;
  }
}



