import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GalleryViewMobileComponent } from './gallery-view-mobile/gallery-view-mobile.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { MouseWheelDirective } from './directives/mousewheel.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentModule } from '../../comment/comment.module';
import { LikeModule } from '../../like/like.module';
import { ImageGalleryMobileComponent } from './image-gallery-mobile/image-gallery-mobile.component';


@NgModule({
  imports: [
    CommonModule,
    CommentModule,
    MatProgressSpinnerModule,
    LikeModule,
  ],
  exports: [
    ImageGalleryMobileComponent,
    MouseWheelDirective,
    ClickOutsideDirective
  ],
  declarations: [
    ImageGalleryMobileComponent,
    GalleryViewMobileComponent,
    MouseWheelDirective,
    ClickOutsideDirective,
    ]
  ,
  entryComponents: [ImageGalleryMobileComponent],
})
export class ImageGalleryMobileModule { }


