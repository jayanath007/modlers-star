import { ImageGalleryMobileComponent } from './../../shared/image-gallery-mobile/image-gallery-mobile.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { HomeService } from '../../home-core/service/home.service';
import { ImageGalleryComponent } from '../../shared/image-gallery/image-gallery.component';
import { GalleryImage } from '../../shared/image-gallery/config';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(ImageGalleryComponent) imageGalleryComponent: ImageGalleryComponent;
  @ViewChild(ImageGalleryMobileComponent) imageGalleryMobileComponent: ImageGalleryMobileComponent;

  albums$: Observable<any[]>;
  constructor(private albumService: HomeService) {
    this.albums$ = this.albumService.getAlbums();
  }

  ngOnInit() {

  }


  openGallery(index, imageUrls: string[]) {
    const galleryImages: GalleryImage[] = imageUrls.map((url) => {
      return { url: url };
    });
    this.imageGalleryMobileComponent.openGallery(index, galleryImages);
  }
}
