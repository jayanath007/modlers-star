import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { HomeService } from '../../home-core/service/home.service';
import { ImageGalleryComponent } from '../../shared/image-gallery/image-gallery.component';
import { GalleryImage } from '../../shared/image-gallery/config';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(ImageGalleryComponent) imageGalleryComponent: ImageGalleryComponent;


  movies = new BehaviorSubject([]);

  batch = 2;         // size of each query
  lastKey = '';      // key to offset next query from
  finished = false;  // boolean when end of database is reached
  albums$: Observable<any[]>;
  constructor(private albumService: HomeService) {
    this.albums$ = this.albumService.getAlbums();
  }



  ngOnInit() {
    this.getMovies();
  }

  onScroll() {
    console.log('scrolled!!');
    this.getMovies();
  }

  private getMovies(key?) {
    if (this.finished) {
      return;
    }

    this.albumService.getAlbumNew(this.batch + 1, this.lastKey)
      .do(movies => {

        /// set the lastKey in preparation for next query
        this.lastKey = _.last(movies)['$key'];
        const newMovies = _.slice(movies, 0, this.batch);

        /// Get current movies in BehaviorSubject
        const currentMovies = this.movies.getValue();

        /// If data is identical, stop making queries
        if (this.lastKey === _.last(newMovies)['$key']) {
          this.finished = true;
        }

        /// Concatenate new movies to current movies
        this.movies.next(_.concat(currentMovies, newMovies));
      })
      .take(1)
      .subscribe();
  }




  openGallery(index, imageUrls: string[]) {
    const galleryImages: GalleryImage[] = imageUrls.map((url) => {
      return { url: url };
    });
    this.imageGalleryComponent.openGallery(index, galleryImages);
  }
}
