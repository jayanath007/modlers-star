import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LikeService } from './like.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {


  @Input() userId;
  @Input() albumId;


  likes$: Observable<any>;

  constructor(private likeService: LikeService) { }

  ngOnInit() {
    this.likes$ = this.likeService.getMovieLikes(this.albumId).map((data) => {
      return (data) ? data[0] : data;
    });
  }

  onLike(event) {
    if (event.color) {
      this.likeService.setLike(this.userId, this.albumId, 0);
    } else {
      this.likeService.setLike(this.userId, this.albumId, 2);
    }
  }

  onUnLike(event) {
    if (event.color) {
      this.likeService.setLike(this.userId, this.albumId, 0);
    } else {
      this.likeService.setLike(this.userId, this.albumId, 1);
    }
  }




}
