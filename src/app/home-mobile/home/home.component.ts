
import { ViewChild, Component } from '@angular/core';
import { ImageGalleryComponent } from '../../shared/image-gallery/image-gallery.component';
import { PaginationService } from '../../shared/pagination.service';
import { GalleryImage } from '../../shared/image-gallery/config';
import { HomeBase } from '../../home-core/home.base';
import { Album } from '../../models/models';
import { AuthService } from '../../core/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends HomeBase {

  @ViewChild(ImageGalleryComponent) imageGalleryComponent: ImageGalleryComponent;

  constructor(public page: PaginationService , public auth: AuthService) {
    super(page);
  }

  openGallery(index, album: Album) {
    const galleryImages: GalleryImage[] = album.imageUrls.map((item) => {
      return { url: item.url , albumId : album.id , id : item.id};
    });
    this.imageGalleryComponent.openGallery(index, galleryImages);
  }

  // openGallery(index, imageUrls: string[]) {
  //   const galleryImages: GalleryImage[] = imageUrls.map((url) => {
  //     return { url: url };
  //   });
  //   this.imageGalleryComponent.openGallery(index, galleryImages);
  // }
}
