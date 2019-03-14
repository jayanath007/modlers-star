import { Component, ElementRef, Renderer2 } from '@angular/core';
import { GalleryView } from '../../shared/image-gallery/gallery-view';



@Component({
    // tslint:disable-next-line:component-selector
    selector: 'gallery-view-mobile',
    templateUrl: './gallery-view-mobile.component.html',
    styleUrls: ['./gallery-view-mobile.component.scss']
})

export class GalleryViewMobileComponent extends GalleryView {
    constructor( galleryElem: ElementRef,  renderer: Renderer2) {
        super(galleryElem, renderer);
    }
}

