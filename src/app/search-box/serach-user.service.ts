import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User, Search, Album } from '../models/models';


@Injectable()
export class SerachUserService {

    searchsCol: AngularFirestoreCollection<Search>;
    searchs$: Observable<Search[]>;

    constructor(private afs: AngularFirestore) {
        this.searchsCol = this.afs.collection('searchs');
    }


    getUser() {
        return this.searchs$ = this.searchsCol.valueChanges();
    }


    getUserByValue(startText): Observable<any[]> {
        const start = startText;
        const end = startText + '\uf8ff';
        return this.afs.collection('searchs', ref =>
            ref
                .orderBy('searchText')
                .limit(5)
                .startAt(start)
                .endAt(end)
        ).valueChanges();
    }


    saveUser(user: User) {
        const search: Search = {
            searchText: user.displayName.toLowerCase(),
            urlPath: user.displayName.replace(' ', '.').toLowerCase(),
        };
        const searchPath = `searchs/${search.searchText}`;
        return this.afs.doc(searchPath).set(search);
    }

    saveSearchByAlbum(album: Album) {
        const search: Search = {
            searchText: album.name + ' - ' + album.userName.toLowerCase() ,
            urlPath: album.searchUserName + '/' + album.searchName.toLowerCase()
        };
        const searchPath = `searchs/${search.searchText}`;
        this.afs.doc(searchPath).set(search);
    }


}



