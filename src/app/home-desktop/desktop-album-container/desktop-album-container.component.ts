import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ImageGalleryComponent } from '../../shared/image-gallery/image-gallery.component';
import { Album } from '../../models/models';
import { GalleryImage } from '../../shared/image-gallery/config';

@Component({
  selector: 'app-desktop-album-container',
  templateUrl: './desktop-album-container.component.html',
  styleUrls: ['./desktop-album-container.component.scss']
})
export class DesktopAlbumContainerComponent implements OnInit {

  constructor() { }

  @Input() album;
  @Input() allbumCardWidth;
  @Input() imageGalleryComponent;
 

  openGallery(index, album: Album) {
    const galleryImages: GalleryImage[] = album.imageUrls.map((item) => {
      return { url: item.url, albumId: album.id, id: item.id };
    });
    this.imageGalleryComponent.openGallery(index, galleryImages);
  }

  ngOnInit() {
  }

}
