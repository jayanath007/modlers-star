import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StarService } from './star.service';

@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.scss']
})
export class StarReviewComponent implements OnInit {


  @Input() userId;
  @Input() albumId;

  stars: Observable<any>;
  avgRating: Observable<any>;

  constructor(private starService: StarService) { }

  ngOnInit() {
      this.stars = this.starService.getMovieStars(this.albumId);
    // this.avgRating = this.stars.map(arr => {
    //   const ratings = arr.map(v => v.value);
    //   return ratings.length ?
    //    ratings.reduce((total, val) => total + val)
    //    / arr.length : 'not reviewed';
    // });
  }

  starHandler(value) {
     this.starService.setStar(this.userId, this.albumId, value);
  }


}