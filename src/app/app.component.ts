
import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  connected$: AngularFireObject<{}>;
  title = 'app';

  constructor(private db: AngularFireDatabase) {

    this.connected$ = this.db.object(`connected`);
    
  }


}
