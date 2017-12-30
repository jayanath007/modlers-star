import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService } from './service/comment.service';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    CommentService,
  ],
})
export class CommentCoreModule { }
