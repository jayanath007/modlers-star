import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AlbumService } from '../../album-core/service/album.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  albums$: Observable<any[]>;

  constructor(private albumService: AlbumService) {
    this.albums$ = this.albumService.getAlbums();
  }

  ngOnInit() {

  }

}
