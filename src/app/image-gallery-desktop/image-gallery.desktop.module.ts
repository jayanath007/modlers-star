import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageGalleryDesktopComponent } from './image-gallery-desktop.component';
import { ImageGalleryModule } from '../shared/image-gallery/image-gallery.module';
import { GalleryViewComponent } from './gallery-view/gallery-view.component';
import { CommentModule } from '../comment/comment.module';
import { LikeModule } from '../like/like.module';

@NgModule({
  imports: [
    CommonModule,
    ImageGalleryModule,
    CommentModule,
    LikeModule,
  ],
  exports: [
    ImageGalleryDesktopComponent,
  ],
  declarations: [
    ImageGalleryDesktopComponent,
    GalleryViewComponent,
    ]
  ,
  entryComponents: [ImageGalleryDesktopComponent],
})
export class ImageGalleryDesktopModule { }

