import { CommentCoreModule } from '../comment-core/comment-core.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentBoxComponent } from './comment-box/comment-box.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule, MatInputModule, MatButtonModule, MatCardModule, MatListModule, MatIconModule } from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  imports: [
    CommentCoreModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    FormsModule,
    MatCheckboxModule,
    FlexLayoutModule,
    MatIconModule,
  ],
  exports: [
    CommentBoxComponent,
  ],
  declarations: [
    CommentBoxComponent,
  ],
  entryComponents: [CommentBoxComponent],
})
export class CommentBoxDesktopModule { }
