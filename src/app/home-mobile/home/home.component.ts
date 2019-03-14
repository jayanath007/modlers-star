
import { ViewChild, Component } from '@angular/core';
import { ImageGalleryComponent } from '../../shared/image-gallery/image-gallery.component';
import { PaginationService } from '../../shared/pagination.service';
import { GalleryImage } from '../../shared/image-gallery/config';
import { HomeBase } from '../../home-core/home.base';
import { Album } from '../../models/models';
import { AuthService } from '../../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ImageGalleryMobileComponent } from '../../shared/image-gallery/image-gallery-mobile/image-gallery-mobile.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends HomeBase {

  @ViewChild(ImageGalleryMobileComponent) ImageGalleryMobileComponent: ImageGalleryMobileComponent;

  constructor(public page: PaginationService, public auth: AuthService, public route: ActivatedRoute) {
    super(page, route);
  }

  openGallery(index, album: Album) {
    const galleryImages: GalleryImage[] = album.imageUrls.map((item) => {
      return { url: item.url, albumId: album.id, id: item.id };
    });
    this.ImageGalleryMobileComponent.openGallery(index, galleryImages);
  }

}
