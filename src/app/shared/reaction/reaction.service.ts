import { Reaction } from './../../models/models';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../../core/auth.service';

@Injectable()
export class ReactionService {

  userId: string;
  emojiList = ['like', 'love', 'wow', 'haha', 'sad', 'angry'];
  reactionCollection: AngularFirestoreCollection<Reaction>;


  constructor(private afs: AngularFirestore, public auth: AuthService) {
    auth.user.subscribe((data) => {
      this.userId = data.uid;
    });

  }


  // getAlbum() {
  //     return this.albums$ = this.reactionCollection.valueChanges();
  // }


  // saveAlbum(album: Album) {
  //     return this.albumsCol.add(album)
  //         .then(_ => console.log('album success'));
  // }



  // getReactions(albumId: string) {
  //   return this.afs.collection('action')
  //   .doc(albumId).collection('UserAction').valueChanges();
  // }

  // updateReaction(albumId, reaction = 0) {
  //   // return this.afs.collection('action').doc(albumId).update();
  // }

  // removeReaction(itemId) {
  //   this.db.object(`reactions/${itemId}/${this.userId}`).remove();
  // }

  // countReactions(reactions: Array<any>) {
  //   return _.mapValues(_.groupBy(reactions), 'length');
  // }

  // userReaction(reactions: Array<any>) {
  //   return _.get(reactions, this.userId);
  // }

}