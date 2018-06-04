import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarReviewComponent } from './star-review.component';
import { StarService } from './star.service';
import { StarRatingModule } from 'angular-star-rating';



@NgModule({
  imports: [
    CommonModule,
    StarRatingModule.forRoot()
  ],
  exports: [StarReviewComponent],
  declarations: [StarReviewComponent],
  providers: [StarService]
})
export class StarReviewModule { }
