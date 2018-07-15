import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../models/models';


@Injectable()
export class SerachUserService {

    usersCol: AngularFirestoreCollection<User>;
    users$: Observable<User[]>;

    constructor(private afs: AngularFirestore) {
        this.usersCol = this.afs.collection('users');
    }


    getUser() {
        return this.users$ = this.usersCol.valueChanges();
    }
    getUserByValue(startText): Observable<any[]> {
        const start = startText;
        const end = startText + '\uf8ff';
        return this.afs.collection('users', ref =>
            ref
                .orderBy('displayName')
                .limit(5)
                .startAt(start)
                .endAt(end)
        ).valueChanges();
    }


    saveUser(user: User) {
        const likePath = `users/${user.displayName}`;
        return this.afs.doc(likePath).set(user);
    }

}



