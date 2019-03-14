
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule} from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HomeCoreModule } from '../home-core/home-core.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommentModule } from '../comment/comment.module';
import { LikeModule } from '../like/like.module';
import { StarReviewModule } from '../star-review/star-review.module';
import { ImageGalleryMobileModule } from '../image-gallery-mobile/image-gallery-mobile.module';




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
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    FormsModule,
    ImageGalleryMobileModule,
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
export class HomeMobileModule { }
