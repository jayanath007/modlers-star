import { CommentCoreModule } from '../comment-core/comment-core.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentBoxComponent } from './comment-box/comment-box.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule, MatInputModule, MatButtonModule, MatCardModule, MatListModule } from '@angular/material';

// const routes = [
//   { path: '', pathMatch: 'full', redirectTo: 'home' },
//   { path: 'home', component: HomeComponent },
// ];

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
