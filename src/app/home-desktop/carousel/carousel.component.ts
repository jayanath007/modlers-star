import { Component, OnInit, Input } from '@angular/core';
import { AlbumService } from '../../album-core/service/album.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() allbumCardWidth;
  @Input() imageGalleryComponent;

  carouselBanner;
  albums = [];

  constructor(private albumService: AlbumService) {
    this.albumService.getLastWeekPopularAlbums().subscribe((data) => {
      console.log(data);
      this.albums = data;
    });
  }


  ngOnInit() {
    this.carouselBanner = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 1,
      speed: 400,
      interval: 2000,
      point: {
        visible: true,
        pointStyles: `
          .ngucarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            position: absolute;
            width: 100%;
            bottom: 20px;
            left: 0;
            box-sizing: border-box;
          }
          .ngucarouselPoint li {
            display: inline-block;
            border-radius: 999px;
            background: #b0b8e4;
            padding: 5px;
            margin: 0 3px;
            transition: .4s ease all;
          }
          .ngucarouselPoint li.active {
              background: #3f51b5;
              width: 10px;
          }
        `
      },
      load: 2,
      loop: true,
      touch: true
    };
  }

  /* It will be triggered on every slide*/

}
