import {
    Component,
    OnInit,
    HostBinding,
    Input,
    HostListener,
    ElementRef,
    Renderer2,
    EventEmitter,
    Output,
    OnChanges,
    SimpleChanges,
    ViewChild
} from '@angular/core';

import { assign, findIndex, debounce } from 'lodash';
import { GalleryConf, GalleryImage } from '../config';


// key codes to react
const KEY_CODES = {
    37: 'LEFT',
    39: 'RIGHT',
    27: 'ESC'
};

// default gallery configuration
const DEFAULT_CONF: GalleryConf = {
    imageBorderRadius: '3px',
    imageOffset: '20px',
    imagePointer: false,
    showDeleteControl: false,
    showCloseControl: true,
    showExtUrlControl: true,
    showImageTitle: true,
    showThumbnails: true,
    closeOnEsc: true,
    reactToKeyboard: true,
    reactToMouseWheel: true,
    reactToRightClick: false,
    thumbnailSize: 30,
    backdropColor: 'rgba(13,13,14,0.85)',
    inline: false,
    showArrows: true
};

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'gallery-view',
    templateUrl: './gallery-view.component.html',
    styleUrls: ['./gallery-view.component.scss']
})
export class GalleryViewComponent implements OnInit, OnChanges {

    // gallery opened memory
    @HostBinding('class.active') opened = false;

    // gallery configuration
    @Input() conf: GalleryConf = {};

    // gallery images
    @Input() images: GalleryImage[] = [];

    // event emmiters
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onOpen = new EventEmitter();
        // tslint:disable-next-line:no-output-on-prefix
    @Output() onClose = new EventEmitter();
        // tslint:disable-next-line:no-output-on-prefix
    @Output() onDelete = new EventEmitter();
        // tslint:disable-next-line:no-output-on-prefix
    @Output() onImageChange = new EventEmitter();
        // tslint:disable-next-line:no-output-on-prefix
    @Output() onImageClicked = new EventEmitter();



    // debounced prev
    private debouncedPrev = debounce(() => this.prev(), 100, { 'leading': true, 'trailing': false });

    // debounced next
    private debouncedNext = debounce(() => this.next(), 100, { 'leading': true, 'trailing': false });


    // adjust thumbnail margin to perfectly fit viewport
    private fitThumbnails = debounce(() => {
        // if thumbnails not visible, return false
        if (this.conf.showThumbnails === false) {
            return false;
        }

        const thumbnailParams = this.thumbnailsRenderParams;
        this.thumbnailMargin = '0 ' + (thumbnailParams.newThumbnailMargin / 2) + 'px';
    }, 300);


    // thumbnails container
    @ViewChild('thumbnails') thumbnailsElem: ElementRef;

    /***************************************************/

    // loading animation memory
    loading = false;

    // current active image index
    activeImageIndex: number = null;

    // thumbnail margin and scroll position
    thumbnailMargin = '0px 8px';
    thumbnailsScrollerLeftMargin = '0px';

    // active image
    get activeImage(): GalleryImage {
        return this.images[this.activeImageIndex];
    }

    // if gallery is on : first image
    get onFirstImage(): boolean {
        return this.activeImageIndex === 0;
    }

    // if gallery is on : last image
    get onLastImage(): boolean {
        return this.activeImageIndex === (this.images.length - 1);
    }

    // get thumbnails viewport rendering parameters
    get thumbnailsRenderParams(): {
        thumbnailsInView: number,
        newThumbnailMargin: number, newThumbnailSize: number, thumbnailsScrollerLeftMargin: any
    } {
        const thumbnailsContainerWidth = this.thumbnailsElem.nativeElement.offsetWidth;

        const thumbnailMargin = 16;
        const thumbnailSize = thumbnailMargin + this.conf.thumbnailSize;
        const thumbnailsInView = Math.floor(thumbnailsContainerWidth / thumbnailSize);
        const extraSpaceInThumbnailsContainer = thumbnailsContainerWidth - (thumbnailsInView * thumbnailSize);
        const extraMargin = extraSpaceInThumbnailsContainer / thumbnailsInView;

        const newThumbnailMargin = thumbnailMargin + extraMargin;
        const newThumbnailSize = newThumbnailMargin + this.conf.thumbnailSize;

        const relativePositionOfActiveImageThumbnailToScroller = thumbnailsInView - (thumbnailsInView - this.activeImageIndex);
        let thumbnailsScrollerLeftMargin: any;

        if (relativePositionOfActiveImageThumbnailToScroller > thumbnailsInView - 2) {
            const outThumbnails = ((this.activeImageIndex + 1) - thumbnailsInView) + 1;

            if (this.activeImageIndex !== (this.images.length - 1)) {
                thumbnailsScrollerLeftMargin = '-' + (newThumbnailSize * outThumbnails) + 'px';
            } else {
                thumbnailsScrollerLeftMargin = '-' + (newThumbnailSize * (outThumbnails - 1)) + 'px';
            }
        } else {
            thumbnailsScrollerLeftMargin = '0px';
        }

        return {
            thumbnailsInView,
            newThumbnailMargin,
            newThumbnailSize,
            thumbnailsScrollerLeftMargin
        };
    }

    // set gallery configuration
    private setGalleryConf(conf: GalleryConf) {
        this.conf = assign(DEFAULT_CONF, conf);
    }

    // load image and return promise
    private loadImage(index: number): Promise<any> {
        const galleryImage: GalleryImage = this.images[index];

        // check if image is cached
        if (galleryImage._cached) {
            return Promise.resolve(index);
        } else {
            return new Promise((resolve, reject) => {
                this.loading = true;

                const image = new Image();
                image.src = galleryImage.url;

                image.onload = () => {
                    this.loading = false;
                    galleryImage._cached = true;
                    resolve(index);
                };

                image.onerror = (error) => {
                    this.loading = false;
                    reject(error);
                };
            });
        }
    }

    // activate image (set active image)
    private activateImage(imageIndex: number) {
        // prevent loading if already loading
        if (this.loading) {
            return false;
        }

        // emit event
        this.onImageChange.emit(imageIndex);

        this.loadImage(imageIndex)
            .then(_imageIndex => {
                this.activeImageIndex = _imageIndex;

                // scroll thumbnails
                setTimeout(() => {
                    // this.fitThumbnails();
                    setTimeout(() => this.scrollThumbnails(), 300);
                });
            })
            .catch(error => console.warn(error));
    }



    // scroll thumbnails to perfectly position active image thumbnail in viewport
    private scrollThumbnails() {
        // if thumbnails not visible, return false
        if (this.conf.showThumbnails === false) {
            return false;
        }

        const thumbnailParams = this.thumbnailsRenderParams;
        this.thumbnailsScrollerLeftMargin = thumbnailParams.thumbnailsScrollerLeftMargin;
    }



    // keyboard event
    @HostListener('window:keydown', ['$event'])
    private onKeyboardInput(event: KeyboardEvent) {
        if (this.conf.reactToKeyboard && this.opened && !this.loading) {
            if (KEY_CODES[event.keyCode] === 'RIGHT') {
                this.next();
            } else if (KEY_CODES[event.keyCode] === 'LEFT') {
                this.prev();
            } else if ((KEY_CODES[event.keyCode] === 'ESC') && this.conf.closeOnEsc) {
                this.close();
            }
        }
    }

    // window resize event
    @HostListener('window:resize', ['$event'])
    private onWindowResize(event: Event) {
        if (this.opened && !this.loading) {
            // this.fitThumbnails();
            setTimeout(() => this.scrollThumbnails(), 300);
        }
    }

    /***************************************************/

    constructor(private galleryElem: ElementRef,
        private renderer: Renderer2) {
    }

    ngOnInit() {
        // create final gallery configuration
        this.setGalleryConf(this.conf);

        // apply backdrop color
        this.renderer.setStyle(this.galleryElem.nativeElement, 'background-color', this.conf.backdropColor);

        // gallery inline class and auto open
        if (this.conf.inline) {
            this.renderer.addClass(this.galleryElem.nativeElement, 'inline');
            this.open(0);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        // when gallery configuration changes
        if (changes.conf && changes.conf.firstChange === false) {
            this.setGalleryConf(changes.conf.currentValue);

            // apply backdrop color
            this.renderer.setStyle(this.galleryElem.nativeElement, 'background-color', this.conf.backdropColor);

            // gallery inline class and auto open
            if ((changes.conf.previousValue.inline !== true) && this.conf.inline) {
                this.renderer.addClass(this.galleryElem.nativeElement, 'inline');
                this.open(0);
            }
        }

        // when gallery images changes
        if (changes.images && changes.images.firstChange === false) {
            this.images = changes.images.currentValue;

            if (this.images.length) {
                this.activateImage(0);
            }
        }

    }

    /***************************************************/

    // open gallery
    open(index: number = 0) {
        if (this.images.length) {
            this.opened = true;

            // emit event
            this.onOpen.emit(index);

            // activate image at given index
            this.activateImage(index);
        } else {
            console.warn('No images provided to gallery-view!');
        }
    }

    // close gallery
    close() {
        this.opened = false;
        this.activeImageIndex = 0;

        // emit event
        this.onClose.emit();
    }

    // change prev image
    prev() {
        if (this.onFirstImage === false) {
            this.activateImage(this.activeImageIndex - 1);
        }
    }

    // change next image
    next() {
        if (this.onLastImage === false) {
            this.activateImage(this.activeImageIndex + 1);
        }
    }

    // set image (activate)
    setActiveImage(index: number) {
        this.activateImage(index);
    }

    // delete image
    deleteImage(index: number) {
        this.onDelete.emit(index);
    }

    // mouse wheel up (prev image)
    mouseWheelUp() {
        if (this.conf.reactToMouseWheel) {
            this.debouncedNext();
        }
    }

    // mouse wheel down (next image)
    mouseWheelDown() {
        if (this.conf.reactToMouseWheel) {
            this.debouncedPrev();
        }
    }

    // click on image
    clickOnImage(index: number) {
        this.onImageClicked.emit(index);
    }

    // right click on image
    rightClickOnImage(event: Event) {
        event.stopPropagation();
        return this.conf.reactToRightClick;
    }

}
