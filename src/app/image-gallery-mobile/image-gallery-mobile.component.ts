import { Component, OnInit } from '@angular/core';
import { ImageGallery } from '../shared/image-gallery/ImageGallery';
import { UtilsService } from '../shared/Utils.service';


@Component({
  selector: 'app-image-gallery-mobile',
  templateUrl: './image-gallery-mobile.component.html',
  styleUrls: ['./image-gallery-mobile.component.scss']
})
export class ImageGalleryMobileComponent extends ImageGallery {

  constructor(public utilsService: UtilsService) {
    super(utilsService);
  }

}
