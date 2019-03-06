import { uuid } from '../shared/util/uid';

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  rating?: number;
}

export interface Search {
  searchText: string;
  urlPath: string;
}


export interface ImageInfo {
  id: string;
  url: string;
}

export interface Album {
  key: string;
  name: string;
  description: string;
  category: Array<string>;
  imageUrls: Array<ImageInfo>;
  modler: string;
  likes: number;
  rating: number;
  rank: number;
  userId: string;
  userPhotoURL: string;
  userName: string;
  searchUserName: string;
  searchName: string;
  id: string;
  commentCount: number;
  recentComments: Comment[];
  tags: object;
  date: Date;
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

export interface Tag {
  name: string;
  rating: number;
}


export class Upload {

  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  id: string;
  createdAt: Date = new Date();
  constructor(file: File) {
    this.name = file.name;
    this.id = uuid();
    this.file = file;
  }






}



