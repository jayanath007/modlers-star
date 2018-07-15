import { User } from './../models/models';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { uuid } from '../shared/util/uid';
import { of } from 'rxjs/internal/observable/of';



@Injectable()
export class AuthService {
  user: Observable<User>;
  tempUid: string;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {

    this.user = this.afAuth.authState.map((user) => {
      if (user) {
        return user;
      } else {

        const tempUserString = localStorage.getItem('tempUser');
        if (tempUserString) {
          const tempUser = JSON.parse(tempUserString);
          this.tempUid = tempUser.uid;
          return tempUser;

        } else {

          this.tempUid = uuid();
          const newTempUser: User = {
            uid: this.tempUid,
            email: 'testuser@yahoo.com',
            photoURL: 'assets/avatars/profile.jpg',
            displayName: 'anonymous user',
          };

          localStorage.setItem('tempUser', JSON.stringify(newTempUser));
          return newTempUser;
        }
      }
    });
  }



  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider).then((item) => {
     return item;
    });
  }



  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      }).catch((credential) => {
     
      });
  }


  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    return userRef.set(data, { merge: true });

  }


  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
