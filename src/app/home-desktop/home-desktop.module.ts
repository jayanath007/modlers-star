import { LikeModule } from './../like/like.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HomeCoreModule } from '../home-core/home-core.module';
import { ImageGalleryModule } from '../shared/image-gallery/image-gallery.module';
import { CommentBoxDesktopModule } from '../shared/comment/comment-desktop/comment-box-desktop.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StarReviewModule } from '../star-review/star-review.module';
import { CommentModule } from '../comment/comment.module';

const routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [
    HomeCoreModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    ImageGalleryModule,
    CommentBoxDesktopModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    CommentModule,
    StarReviewModule,
    LikeModule,
  ],
  declarations: [
    HomeComponent,
  ]
})
export class HomeDesktopModule { }
