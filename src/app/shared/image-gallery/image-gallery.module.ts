import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageGalleryComponent } from './image-gallery.component';
import { GalleryViewComponent } from './gallery-view/gallery-view.component';
import { MouseWheelDirective } from './gallery-view/directives/mousewheel.directive';
import { ClickOutsideDirective } from './gallery-view/directives/click-outside.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ImageGalleryComponent,
    MouseWheelDirective,
    ClickOutsideDirective
  ],
  declarations: [
    ImageGalleryComponent,
    GalleryViewComponent,
    MouseWheelDirective,
    ClickOutsideDirective,
    ]
  ,
  entryComponents: [ImageGalleryComponent],
})
export class ImageGalleryModule { }


