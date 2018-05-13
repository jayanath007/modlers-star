import { GalleryViewMobileComponent } from './gallery-view-mobile/gallery-view-mobile.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { MouseWheelDirective } from './directives/mousewheel.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageGalleryComponent } from './image-gallery.component';
import { GalleryViewComponent } from './gallery-view/gallery-view.component';
import { CommentBoxDesktopModule } from '../comment/comment-desktop/comment-box-desktop.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    CommentBoxDesktopModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    ImageGalleryComponent,
    MouseWheelDirective,
    ClickOutsideDirective
  ],
  declarations: [
    ImageGalleryComponent,
    GalleryViewMobileComponent,
    GalleryViewComponent,
    MouseWheelDirective,
    ClickOutsideDirective,
    ]
  ,
  entryComponents: [ImageGalleryComponent],
})
export class ImageGalleryModule { }


