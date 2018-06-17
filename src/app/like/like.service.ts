import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Like } from '../models/models';


@Injectable()
export class LikeService {

  constructor(private afs: AngularFirestore) { }

  // Like reviews that belong to a user
  getUserLikes(userId) {
    const likesRef = this.afs.collection('likes', ref => ref.where('userId', '==', userId));
    return likesRef.valueChanges();
  }

  // Get all likes that belog to a Movie
  getTotalLikes(key) {
    const likesRef = this.afs.collection('likes', ref => ref.where('key', '==', key).where('value', '==', 2));
    return likesRef.valueChanges();
  }

  getTotalUnLikes(key) {
    const likesRef = this.afs.collection('likes', ref => ref.where('key', '==', key).where('value', '==', 1));
    return likesRef.valueChanges();
  }

  getUserComponentLike(userId, key) {
    const likePath = `likes/${userId}_${key}`;
    const likesRef = this.afs.doc(likePath);
    return likesRef.valueChanges();
  }

  // Create or update like
  setLike(userId, key, albumId, value) {
    // Like document data
    const like: Like = { userId, key, albumId, value };

    // Custom doc ID for relationship
    const likePath = `likes/${like.userId}_${like.key}`;

    // Set the data, return the promise
    return this.afs.doc(likePath).set(like);
  }

}
