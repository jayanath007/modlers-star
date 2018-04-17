import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryViewComponent } from './gallery-view/gallery-view.component';
import { ClickOutsideDirective } from './gallery-view/directives/click-outside.directive';
import { CommentBoxDesktopModule } from '../comment/comment-desktop/comment-box-desktop.module';
import { ImageGalleryMobileComponent } from './image-gallery-mobile.component';
import { MouseWheelDirective } from './gallery-view/directives/mousewheel.directive';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    CommentBoxDesktopModule,
    FlexLayoutModule,
  ],
  exports: [
    ImageGalleryMobileComponent,
    ClickOutsideDirective
  ],
  declarations: [
    ImageGalleryMobileComponent,
    GalleryViewComponent,
    ClickOutsideDirective,
    MouseWheelDirective,
    ]
  ,
  entryComponents: [ImageGalleryMobileComponent],
})
export class ImageGalleryMobileModule { }


