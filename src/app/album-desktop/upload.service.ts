import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Upload } from '../models/models';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class UploadService {

  constructor(private db: AngularFirestore) { }

  private basePath = '/uploads';

  pushUpload(upload: Upload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

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
        const downloadURL = uploadTask.snapshot.ref.getDownloadURL().then(url => {
          console.log(url);
          upload.url = url;
          upload.name = upload.file.name;
          this.saveFileData(upload);
        });

      }
    );
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    // this.db.list(`${this.basePath}/`).push(upload);
  }
}
