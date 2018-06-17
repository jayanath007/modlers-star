
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Album, Upload } from '../../models/models';
import * as firebase from 'firebase/app';

@Injectable()
export class AlbumService {


    albumsCol: AngularFirestoreCollection<Album>;
    albums$: Observable<Album[]>;
    private basePath = '/uploads';

    constructor(private afs: AngularFirestore) {
        this.albumsCol = this.afs.collection('albums');
    }




    pushUpload(upload: Upload, id) {
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(`${this.basePath}/${id}`).put(upload.file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot: any) => {
                // upload in progress
                upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                // upload failed
                console.log(error);
            },
            () => {
                // upload success
            }
        );

        return uploadTask;
    }


    getAlbum() {
        return this.albums$ = this.albumsCol.valueChanges();
    }

    saveAlbum(album: Album) {
        return this.albumsCol.add(album)
            .then(_ => console.log('album success'));
    }


    deleteFileStorage(id: string) {
        const storageRef = firebase.storage().ref();
        storageRef.child(`${this.basePath}/${id}`).delete();
    }

}
