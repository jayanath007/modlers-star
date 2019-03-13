import { OnInit, ViewChild, ElementRef, OnDestroy, AfterContentInit, Input, Component, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import { AngularFirestore } from 'angularfire2/firestore/firestore';
import { AuthService } from '../core/auth.service';
import { CommentPaginationService } from './commentPagination.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnChanges, OnDestroy, AfterContentInit {

  // @Input() documentRef: string;
  @Input() commentMaxHieght;
  @Input() albumId: string;
  @Input() photoId: string;

  documentRef: string;
  documentPath: string;
  formValue: string;

  private unsubscribe: Subject<void> = new Subject();
  isHomePage = true;

  constructor(protected page: CommentPaginationService,
    private afs: AngularFirestore, public auth: AuthService) {

    this.page.reset();
  }
  ngOnInit() {

  }

  dateformat(createdAt) {
    if (createdAt.seconds) {
      const timestamp = createdAt.seconds;
      return new Date(timestamp * 1000);
    } else {
      return createdAt;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && this.photoId && this.albumId) {
      this.documentRef = '/albums/' + this.albumId + '/photoComments/' + this.photoId;
      this.documentPath = this.documentRef + '/comments';
      this.page.init(this.documentPath);
    }
  }

  addComment(user) {
    if (this.documentRef) {
      const item = {
        content: this.formValue, createdAt: new Date(),
        userName: user.displayName, photoURL: user.photoURL
      };
      this.afs.doc(this.documentRef).collection('comments').add(item).then((data) => {
        this.page.addItem(item);
      });
      this.formValue = '';
    }
  }


  isEmptyObject(obj) {
    for (const prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
    return true;
  }

  ngAfterContentInit() {
    const mousedown$ = Observable.fromEvent(document.querySelector('#comment-content'), 'scroll')
      .takeUntil(this.unsubscribe);

    mousedown$.subscribe(this.scrollHandler,
      e => console.log(`error: ${e}`),
      () => console.log('complete!'));

  }



  scrollHandler = (event) => {
    try {
      const height = event.target.scrollHeight;
      const offset = event.target.offsetHeight;
      if (event.target.scrollTop > height - offset - 1) {
        this.page.more();
      }
    } catch (err) {
      console.log(err);
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}




// import { User } from '../models/models';
// import { Component, OnInit, Input, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import {
//   AngularFirestore,
//   AngularFirestoreCollection,
//   AngularFirestoreDocument
// } from 'angularfire2/firestore';
// import { Album } from '../models/models';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { Subject } from 'rxjs/Subject';
// import { delay } from 'rxjs/operators/delay';
// import { AuthService } from '../core/auth.service';

// @Component({
//   selector: 'app-comment',
//   templateUrl: './comment.component.html',
//   styleUrls: ['./comment.component.scss']
// })
// export class CommentComponent implements OnInit, OnDestroy, OnChanges {


//   @Input() documentRef: string;
//   @Input() commentMaxHieght;

//   pageSiez: number;
//   totalComent: number;
//   documentRef$: AngularFirestoreDocument<any>;
//   commentsCollectionRef: AngularFirestoreCollection<any>;
//   comments$ = new BehaviorSubject([]);
//   private unsubscribe: Subject<void> = new Subject();
//   private unsubscribeAllcoment: Subject<void> = new Subject();

//   formValue: string;

//   constructor(private afs: AngularFirestore, public auth: AuthService) { }

//   ngOnInit() {

//   }


//   ngOnChanges(changes: SimpleChanges) {
//     if (changes && changes.documentRef) {
//       this.totalComent = null;
//       this.comments$.next([]);
//       this.afs.doc(this.documentRef).valueChanges().takeUntil(this.unsubscribe)
//         .subscribe((data) => {
//           if (data) {
//             this.totalComent = data['commentCount'];
//             this.comments$.next(data['recentComments']);
//           }
//         });

//     }
//   }


//   dateformat(timestamp) {
//     return new Date(timestamp * 1000);
//   }


//   addComment(user) {
//     this.afs.doc(this.documentRef).collection('comments').add({
//       content: this.formValue, createdAt: new Date(),
//       userName: user.displayName, photoURL: user.photoURL
//     });
//     this.formValue = '';
//   }

//   // Lazy Load the Firestore Collection
//   loadMore() {
//     this.afs.doc(this.documentRef).collection('comments')
//       .valueChanges().takeUntil(this.unsubscribeAllcoment)
//       .subscribe((data) => {
//         this.comments$.next(data);
//       });
//   }

//   ngOnDestroy() {
//     this.unsubscribe.next();
//     this.unsubscribe.complete();
//     this.unsubscribeAllcoment.next();
//     this.unsubscribeAllcoment.complete();
//   }

// }
