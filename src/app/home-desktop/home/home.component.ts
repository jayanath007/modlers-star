import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, HostListener, OnDestroy, AfterContentInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, Subject } from 'rxjs';
import { HomeService } from '../../home-core/service/home.service';
import { ImageGalleryComponent } from '../../shared/image-gallery/image-gallery.component';
import { GalleryImage } from '../../shared/image-gallery/config';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { PaginationService } from '../../shared/pagination.service';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterContentInit {
  @ViewChild(ImageGalleryComponent) imageGalleryComponent: ImageGalleryComponent;

  private unsubscribe: Subject<void> = new Subject();

  batch = 3;         // size of each query
  lastKey = '';      // key to offset next query from
  finished = false;  // boolean when end of database is reached
  albums$: Observable<any[]>;


  constructor(public page: PaginationService, public el: ElementRef) {
    console.log(el);
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


  @HostListener('window:scroll', ['$event'])
  onScroll2(event) {

  }

  scrollHandler = (event) =>  {
    try {
      const height = event.target.scrollHeight;
      const offset = event.target.offsetHeight;
      if (event.target.scrollTop > height - offset - 1) {

        this.page.more();
        console.log('more');
      }
    } catch (err) {
      console.log(err);
    }
  }


  private getMovies(key?) {
    if (this.finished) {
      return;
    }
  }

  openGallery(index, imageUrls: string[]) {
    const galleryImages: GalleryImage[] = imageUrls.map((url) => {
      return { url: url };
    });
    this.imageGalleryComponent.openGallery(index, galleryImages);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
