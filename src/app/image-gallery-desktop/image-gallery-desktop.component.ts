import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../shared/Utils.service';
import { ImageGallery } from '../shared/image-gallery/ImageGallery';

@Component({
  selector: 'app-image-gallery-desktop',
  templateUrl: './image-gallery-desktop.component.html',
  styleUrls: ['./image-gallery-desktop.component.scss']
})
export class ImageGalleryDesktopComponent  extends ImageGallery {

  constructor(public utilsService: UtilsService) {
    super(utilsService);
  }

}
