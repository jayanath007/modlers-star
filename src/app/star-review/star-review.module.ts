import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarReviewComponent } from './star-review.component';
import { StarService } from './star.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [StarReviewComponent],
  declarations: [StarReviewComponent],
  providers: [StarService]
})
export class StarReviewModule { }
