import * as firebase from 'firebase/app'; // typings only
import { Component, OnInit } from '@angular/core';

import { AlbumService } from '../../album-core/service/album.service';
import { Album } from '../../models/models';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css']
})
export class AddAlbumComponent implements OnInit {

  album = { name: '', modler: 'lushan', likes: 0, rating: 0, commentTotal: 0, rank: 0, imageUrls: [] } as Album;
  constructor(private albumService: AlbumService) {

  }

  ngOnInit() {
  }
  saveAlbum(album: Album) {
    album.rating = Math.random() * 100;
    this.albumService.saveAlbum(album);
  }

  uploadFile(event: any) {
    const key = Math.random() * 10;
    const file = event.srcElement.files[0];
    const storageRef = firebase.storage().ref(`images/${key}`);
    storageRef.put(file)
      .then((uploadTask) => {
        this.album.imageUrls.push(uploadTask.downloadURL);
      });
  }

}
