import {  OnInit, ViewChild, ElementRef, EventEmitter, Output, HostListener, OnDestroy, AfterContentInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import { PaginationService } from '../shared/pagination.service';


export class HomeBase implements OnInit, OnDestroy, AfterContentInit {


  private unsubscribe: Subject<void> = new Subject();

  constructor(public page: PaginationService) {
  }
  ngOnInit() {
    this.page.init('albums', 'rating', { reverse: true, prepend: false });
  }

  ngAfterContentInit() {
    const mousedown$ = Observable.fromEvent(document.querySelector('#mail-app-content'), 'scroll')
      .takeUntil(this.unsubscribe);

    mousedown$.subscribe(this.scrollHandler,
      e => console.log(`error: ${e}`),
      () => console.log('complete!'));
  }


  scrollHandler = (event) =>  {
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
