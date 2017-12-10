
import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  albums$: Observable<any[]>;
  constructor(database: AngularFireDatabase) {
    this.albums$ = database.list('albums').valueChanges();
  }

}
