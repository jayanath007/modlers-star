import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Album } from '../../shared/models/album';



@Injectable()
export class AlbumService {

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

    private errorHandler(error) {
        console.log(error);
        return Observable.throw(error.message);
    }


    saveAlbum(album: Album) {
        return this.albums$.push(album)
          .then(_ => console.log('album success'));
      }

}
