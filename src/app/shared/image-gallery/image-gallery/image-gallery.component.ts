import { ImageGallery } from '../ImageGallery';
import { Component } from '@angular/core';
import { UtilsService } from '../../Utils.service';


@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent extends ImageGallery {

  // constructor(public page: PaginationService, public auth: AuthService, public route: ActivatedRoute) {
  //  oute);
  // }

  constructor(public utilsService: UtilsService) {
    super(utilsService);
  }

}
