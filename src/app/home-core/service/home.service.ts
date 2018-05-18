
import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Album } from '../../shared/models/album';



@Injectable()
export class HomeService {

    albums$: AngularFireList<Album>;

    constructor(private db: AngularFireDatabase) {
        this.albums$ = this.db.list('albums');
    }

    getAlbums() {
        return this.albums$.valueChanges();
    }
    getAlbum(albumKey: string) {
        return this.db.object(`albums/${albumKey}`).valueChanges();
    }

    getAlbumNew(batch, lastKey?) {
        const query = {
            orderByKey: true,
            limitToFirst: batch,
        };

        if (lastKey) {
            query['startAt'] = lastKey;
        }
        return this.db.list('/movies', query);
    }

    private errorHandler(error) {
        console.log(error);
        return observableThrowError(error.message);
    }


    saveAlbum(album: Album) {
        return this.albums$.push(album)
            .then(_ => console.log('album success'));
    }

}
