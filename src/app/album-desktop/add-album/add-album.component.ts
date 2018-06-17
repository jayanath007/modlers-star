import * as firebase from 'firebase/app'; // typings only
import { Component, OnInit } from '@angular/core';

import { AlbumService } from '../../album-core/service/album.service';
import { Album, Upload } from '../../models/models';
import { uuid } from '../../shared/util/uid';
import { UploadService } from '../upload.service';
import * as _ from 'lodash';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css']
})
export class AddAlbumComponent implements OnInit {

  album = {
    name: '',
    modler: 'lushan', likes: 0, rating: 0, commentCount: 0, rank: 0,
    imageUrls: [], id: ''
  } as Album;

  selectedFiles: FileList;
  currentUpload: Upload;
  removedFile: File[] = [];

  constructor(private albumService: AlbumService) {

  }

  saveAlbum(album: Album) {
    this.removefiels();
    album.rating = Math.random() * 100;
    this.albumService.saveAlbum(album);
  }

  onUploadFileChange(event) {
    const files = event;
    const filesIndex = _.range(files.length);
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(files[idx]);
      const id = uuid();
      const name = files[idx].name;
      this.albumService.pushUpload(this.currentUpload, id).then((snapshot) => {
        snapshot.ref.getDownloadURL().then(url => {
          this.album.imageUrls.push({ id: id, name: name, url: url });
        });
      });
    });
  }

  onRemovedFile($event) {
    this.removedFile.push($event.file);
  }

  // removefiels() {
  //   for (let index = 0; index < this.removedFile.length; index++) {
  //     const file = this.removedFile[index];
  //     console.log(this.album.imageUrls);
  //     console.log(file.name);
  //     this.album.imageUrls = this.album.imageUrls.filter((item) => item.name !== file.name);
  //     const image = this.album.imageUrls.filter((item) => item.name === file.name)[0];
  //     if (image) {
  //       this.albumService.deleteFileStorage(image.id);
  //     }
  //   }
  // }


}
