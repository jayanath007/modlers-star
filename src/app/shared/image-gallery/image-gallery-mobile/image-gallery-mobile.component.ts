import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../Utils.service';
import { ImageGallery } from '../ImageGallery';

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
