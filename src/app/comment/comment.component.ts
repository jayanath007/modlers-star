import { User } from './../models/models';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Album } from '../models/models';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { delay } from 'rxjs/operators/delay';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {


  @Input() album: Album;
  @Input() commentMaxHieght;
  totalComent: number;
  pageSiez: number;

  albumRef$: AngularFirestoreDocument<any>;
  commentsRef: AngularFirestoreCollection<any>;
  comments$ = new BehaviorSubject([]);
  private unsubscribe: Subject<void> = new Subject();
  private unsubscribeAllcoment: Subject<void> = new Subject();

  formValue: string;

  constructor(private afs: AngularFirestore , public auth: AuthService) { }

  ngOnInit() {

    this.pageSiez = 5;
    this.totalComent = this.album.commentCount;
    this.comments$.next(this.album.recentComments);
    this.albumRef$ = this.afs.doc('/albums/' + this.album.id);

    this.albumRef$.valueChanges().takeUntil(this.unsubscribe)
      .subscribe((data: Album) => {
        if (this.totalComent !== data.commentCount) {
          this.totalComent = data.commentCount;
          this.comments$.next(data.recentComments);
        }
      });
    this.commentsRef = this.albumRef$.collection('comments', ref => ref.orderBy('createdAt', 'desc'));
  }

  addComment(user) {
    this.commentsRef.add({ content: this.formValue, createdAt: new Date() , userName : user.displayName , photoURL:user.photoURL });
    this.formValue = '';
  }

  // Lazy Load the Firestore Collection
  loadMore() {

    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.commentsRef
      .valueChanges().takeUntil(this.unsubscribeAllcoment)
      .subscribe((data) => {
        this.comments$.next(data);
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.unsubscribeAllcoment.next();
    this.unsubscribeAllcoment.complete();
  }

}
