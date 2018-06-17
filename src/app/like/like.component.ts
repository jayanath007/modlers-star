import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LikeService } from './like.service';
import { AuthService } from '../core/auth.service';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/models';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})

export class LikeComponent implements OnInit, OnDestroy, OnChanges {

  @Input() albumId;
  @Input() key;

  likes$: Observable<any>;
  totalLikes$: Observable<any>;
  totalUnLikes$: Observable<any>;
  private unsubscribe: Subject<void> = new Subject();
  user: User;

  constructor(private likeService: LikeService, private auth: AuthService) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.key) {
      this.auth.user.takeUntil(this.unsubscribe).subscribe((user) => {
        this.user = user;
        this.likes$ = this.likeService.getUserComponentLike
          (user.uid, this.key).map((data) => {
            return data;
          });
      });

      this.totalLikes$ = this.likeService.getTotalLikes
        (this.key).map((data) => {
          return (data) ? data.length : undefined;
        });

      this.totalUnLikes$ = this.likeService.getTotalUnLikes
        (this.key).map((data) => {
          return (data) ? data.length : undefined;
        });
    }
  }



  onLike(event) {
    if (event.color) {
      this.likeService.setLike(this.user.uid, this.key, this.albumId, 0);
    } else {
      this.likeService.setLike(this.user.uid, this.key, this.albumId, 2);
    }
  }

  onUnLike(event) {
    if (event.color) {
      this.likeService.setLike(this.user.uid, this.key, this.albumId, 0);
    } else {
      this.likeService.setLike(this.user.uid, this.key, this.albumId, 1);
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }


}
