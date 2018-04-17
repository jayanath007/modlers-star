import { Component, OnInit, ViewChild } from '@angular/core';
import { GalleryViewComponent } from './gallery-view/gallery-view.component';
import { DEMO_GALLERY_CONF, DEMO_GALLERY_IMAGE, GalleryConf, GalleryImage } from './config';

@Component({
  selector: 'app-image-gallery-mobile',
  templateUrl: './image-gallery-mobile.component.html',
  styleUrls: ['./image-gallery-mobile.component.css']
})
export class ImageGalleryMobileComponent implements OnInit {

  // get reference to gallery component
  @ViewChild(GalleryViewComponent) ngxImageGallery: GalleryViewComponent;

  // gallery configuration
  conf: GalleryConf = DEMO_GALLERY_CONF;
  images: GalleryImage[] = DEMO_GALLERY_IMAGE;

  constructor( ) { }

  ngOnInit() { }

  // METHODS
  // open gallery
  openGallery(index: number = 0, galleryImage: GalleryImage[]) {
    this.images = galleryImage;
    this.ngxImageGallery.open(index);
  }

  // close gallery
  closeGallery() {
    this.ngxImageGallery.close();
  }

  // set new active(visible) image in gallery
  newImage(index: number = 0) {
    this.ngxImageGallery.setActiveImage(index);
  }

  // next image in gallery
  nextImage(index: number = 0) {
    // this.ngxImageGallery.next(index);
  }

  // prev image in gallery
  prevImage(index: number = 0) {
    // this.ngxImageGallery.prev(index);
  }

  /**************************************************/

  // EVENTS
  // callback on gallery opened
  galleryOpened(index) {
    // console.info('Gallery opened at index ', index);
  }

  // callback on gallery closed
  galleryClosed() {
    // console.info('Gallery closed.');
  }

  // callback on gallery image clicked
  galleryImageClicked(index) {
    // console.info('Gallery image clicked with index ', index);
  }

  // callback on gallery image changed
  galleryImageChanged(index) {
    /// console.info('Gallery image changed to index ', index);
  }

  // callback on user clicked delete button
  deleteImage(index) {
    // console.info('Delete image at index ', index);
  }
}
