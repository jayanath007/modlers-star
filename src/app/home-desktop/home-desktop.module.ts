import { CarouselComponent } from './carousel/carousel.component';
import { LikeModule } from '../like/like.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule, MatIconModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HomeCoreModule } from '../home-core/home-core.module';
import { ImageGalleryModule } from '../shared/image-gallery/image-gallery.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StarReviewModule } from '../star-review/star-review.module';
import { CommentModule } from '../comment/comment.module';
import { NguCarouselModule } from '@ngu/carousel';
import { CarouselModule } from 'ngx-bootstrap';
import { DesktopAlbumContainerComponent } from './desktop-album-container/desktop-album-container.component';
import { AlbumService } from '../album-core/service/album.service';

const routes = [
  { path: '', pathMatch: 'full', component: HomeComponent  },
  { path: 'modler/:user', component: HomeComponent },
  { path: 'modler/:user/:album', component: HomeComponent },
  { path: 'modler/category/:category', component: HomeComponent },
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
    FlexLayoutModule,
    MatProgressSpinnerModule,
    CommentModule,
    StarReviewModule,
    LikeModule,
    CarouselModule.forRoot(),
    MatIconModule,
    NguCarouselModule,
  ],
  declarations: [
    HomeComponent,
    CarouselComponent,
    DesktopAlbumContainerComponent,
  ],
  providers: [AlbumService],


})
export class HomeDesktopModule { }
