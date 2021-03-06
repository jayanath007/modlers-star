import { UtilsService } from '../Utils.service';
import {  OnInit, ViewChild } from '@angular/core';
import { DEMO_GALLERY_CONF, DEMO_GALLERY_IMAGE, GalleryConf, GalleryImage } from './config';
import { GalleryViewMobileComponent } from '../../image-gallery-mobile/gallery-view-mobile/gallery-view-mobile.component';
import { GalleryViewComponent } from '../../image-gallery-desktop/gallery-view/gallery-view.component';


export class ImageGallery implements OnInit {

    // get reference to gallery component
    @ViewChild(GalleryViewComponent) ngxImageGallery: GalleryViewComponent;
    @ViewChild(GalleryViewMobileComponent) ngxImageGalleryMobile: GalleryViewMobileComponent;


    // gallery configuration
    conf: GalleryConf = DEMO_GALLERY_CONF;
    images: GalleryImage[] = DEMO_GALLERY_IMAGE;

    constructor(public utilsService: UtilsService) { }

    ngOnInit() { }

    // METHODS
    // open gallery
    openGallery(index: number = 0, galleryImage: GalleryImage[]) {
        this.images = galleryImage;
        if (this.utilsService.isMobile.any()) {
            this.ngxImageGalleryMobile.open(index);
        } else {
            this.ngxImageGallery.open(index);
        }
    }

    // close gallery
    closeGallery() {
        if (this.utilsService.isMobile.any()) {
            this.ngxImageGalleryMobile.close();
        } else {
            this.ngxImageGallery.close();
        }
    }

    // set new active(visible) image in gallery
    newImage(index: number = 0) {
        if (this.utilsService.isMobile.any()) {
            this.ngxImageGalleryMobile.setActiveImage(index);
        } else {
            this.ngxImageGallery.setActiveImage(index);
        }
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