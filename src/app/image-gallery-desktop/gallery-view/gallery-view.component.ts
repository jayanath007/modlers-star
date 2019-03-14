import { Component, ElementRef, Renderer2 } from '@angular/core';
import { GalleryView } from '../../shared/image-gallery/gallery-view';
;

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'gallery-view',
    templateUrl: './gallery-view.component.html',
    styleUrls: ['./gallery-view.component.scss']
})

export class GalleryViewComponent extends GalleryView {
    constructor( galleryElem: ElementRef,  renderer: Renderer2) {
        super(galleryElem, renderer);
    }
}

