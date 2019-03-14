
import { NgModule } from '@angular/core';
import { ImageGalleryModule } from '../shared/image-gallery/image-gallery.module';
import { CommonModule } from '@angular/common';
import { ImageGalleryMobileComponent } from './image-gallery-mobile.component';
import { GalleryViewMobileComponent } from './gallery-view-mobile/gallery-view-mobile.component';
import { CommentModule } from '../comment/comment.module';
import { LikeModule } from '../like/like.module';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ImageGalleryModule,
    CommentModule,
    LikeModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    ImageGalleryMobileComponent,
  ],
  declarations: [
    ImageGalleryMobileComponent,
    GalleryViewMobileComponent,
  ]
  ,
  entryComponents: [ImageGalleryMobileComponent],
})
export class ImageGalleryMobileModule { }


