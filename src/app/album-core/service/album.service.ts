import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
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



    saveAlbum(uploadFile: File[], album: Album , ) {
        const uploadPromise = [];
        const fileDataList: Upload[] = [];
        for (const item of uploadFile) {
            const fileData = new Upload(item);
            fileDataList.push(fileData);
            const observable = this.pushUpload(fileData);
            uploadPromise.push(observable);
        }

       return Observable.forkJoin(uploadPromise)
            .switchMap((snapshotList) => {
                const DownloadURLPromiseList = snapshotList.map((snapshot) => {
                    return snapshot.ref.getDownloadURL();
                });
                return Observable.forkJoin(DownloadURLPromiseList);
            }).switchMap((imageUrls) => {
                for (let _i = 0; _i < imageUrls.length; _i++) {
                    const url = imageUrls[_i];
                    const fileData = fileDataList[_i];
                    album.imageUrls.push({ url: url, id: fileData.id });
                }
                return this.albumsCol.add(album);
            });

    }




    pushUpload(upload: Upload) {
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(`${this.basePath}/${upload.id}`).put(upload.file);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot: any) => {
                upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                console.log(error);
            }
        );
        
        return uploadTask;
    }


    getAlbum() {
        return this.albums$ = this.albumsCol.valueChanges();
    }


    deleteFileStorage(id: string) {
        const storageRef = firebase.storage().ref();
        storageRef.child(`${this.basePath}/${id}`).delete();
    }

}
