import { Album } from './../../models/models';
import { ViewChild, Component } from '@angular/core';
import { ImageGalleryComponent } from '../../shared/image-gallery/image-gallery.component';
import { PaginationService } from '../../shared/pagination.service';
import { GalleryImage } from '../../shared/image-gallery/config';
import { HomeBase } from '../../home-core/home.base';
import { AuthService } from '../../core/auth.service';
import { ImageInfo } from '../../models/models';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends HomeBase {

  @ViewChild(ImageGalleryComponent) imageGalleryComponent: ImageGalleryComponent;

  constructor(public page: PaginationService, public auth: AuthService) {
    super(page);
  }


  // getUrl(item) {
  //   return item.url.replace('uploads', 'resized');
  // }

  openGallery(index, album: Album) {


    const galleryImages: GalleryImage[] = album.imageUrls.map((item) => {

      return { url: item.url, albumId: album.id, id: item.id };
    });
    this.imageGalleryComponent.openGallery(index, galleryImages);
  }

}
