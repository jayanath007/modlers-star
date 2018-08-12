import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Album } from '../../models/models';

@Injectable()
export class AlbumService {

    albumsCol: AngularFirestoreCollection<Album>;
    albums$: Observable<Album[]>;

    constructor(private afs: AngularFirestore) {
        this.albumsCol = this.afs.collection('rating');
    }

    getLastWeekPopularAlbums() {
        return this.afs.collection('albums', ref =>
            ref.orderBy('rating', 'desc')
                .limit(3)
        ).valueChanges();
    }

}
