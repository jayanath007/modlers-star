import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { MouseWheelDirective } from './directives/mousewheel.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { GalleryViewComponent } from './gallery-view/gallery-view.component';
import { CommentModule } from '../../comment/comment.module';
import { LikeModule } from '../../like/like.module';


@NgModule({
  imports: [
    CommonModule,
    CommentModule,
    MatProgressSpinnerModule,
    LikeModule,
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


