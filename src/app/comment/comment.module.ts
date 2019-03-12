import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment.component';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommentPaginationService } from './commentPagination.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    FlexLayoutModule,
    MatIconModule,
  ],
  declarations: [CommentComponent],
  exports: [CommentComponent],
  providers: [CommentPaginationService],
})
export class CommentModule { }
