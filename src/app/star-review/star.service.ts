import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Star } from '../models/models';


@Injectable()
export class StarService {

  constructor(private afs: AngularFirestore) { }

  // Star reviews that belong to a user
  getUserStars(userId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('userId', '==', userId) );
    return starsRef.valueChanges();
  }

  // Get all stars that belog to a Movie
  getMovieStars(albumId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('albumId', '==', albumId) );
    return starsRef.valueChanges();
  }

  // Create or update star
  setStar(userId, albumId, value) {
    // Star document data
    const star: Star = { userId, albumId, value };

    // Custom doc ID for relationship
    const starPath = `stars/${star.userId}_${star.albumId}`;

    // Set the data, return the promise
    return this.afs.doc(starPath).set(star);
  }

}
