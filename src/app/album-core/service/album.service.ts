
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Album } from '../../shared/models/album';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AlbumService {


    albumsCol: AngularFirestoreCollection<Album>;
    albums$: Observable<Album[]>;


    constructor(private afs: AngularFirestore) {
        this.albumsCol = this.afs.collection('albums');
    }


    getAlbum() {
        return this.albums$ = this.albumsCol.valueChanges();
    }


    saveAlbum(album: Album) {
        return this.albumsCol.add(album)
            .then(_ => console.log('album success'));
    }

}
