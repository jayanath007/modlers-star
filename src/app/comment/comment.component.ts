import { User } from '../models/models';
import { Component, OnInit, Input, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
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
export class CommentComponent implements OnInit, OnDestroy, OnChanges {


  @Input() documentRef: string;
  @Input() commentMaxHieght;

  pageSiez: number;
  totalComent: number;
  documentRef$: AngularFirestoreDocument<any>;
  commentsCollectionRef: AngularFirestoreCollection<any>;
  comments$ = new BehaviorSubject([]);
  private unsubscribe: Subject<void> = new Subject();
  private unsubscribeAllcoment: Subject<void> = new Subject();

  formValue: string;

  constructor(private afs: AngularFirestore, public auth: AuthService) { }

  ngOnInit() {

  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.documentRef) {
      this.totalComent = null;
      this.comments$.next([]);
      this.afs.doc(this.documentRef).valueChanges().takeUntil(this.unsubscribe)
        .subscribe((data) => {
          if (data) {
            this.totalComent = data['commentCount'];
            this.comments$.next(data['recentComments']);
          }
        });

    }
  }


  dateformat(timestamp) {
    return new Date(timestamp * 1000);
  }


  addComment(user) {
    this.afs.doc(this.documentRef).collection('comments').add({
      content: this.formValue, createdAt: new Date(),
      userName: user.displayName, photoURL: user.photoURL
    });
    this.formValue = '';
  }

  // Lazy Load the Firestore Collection
  loadMore() {

    this.unsubscribe.next();
    this.unsubscribe.complete();

    this.afs.doc(this.documentRef).collection('comments')
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
