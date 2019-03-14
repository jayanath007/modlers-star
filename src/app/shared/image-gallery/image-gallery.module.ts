import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { MouseWheelDirective } from './directives/mousewheel.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentModule } from '../../comment/comment.module';



@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,

  ],
  exports: [
    MouseWheelDirective,
    ClickOutsideDirective,
  ],
  declarations: [
    MouseWheelDirective,
    ClickOutsideDirective,
    ]
  ,
})
export class ImageGalleryModule { }


