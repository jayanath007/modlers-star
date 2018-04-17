import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

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
  constructor(database: AngularFireDatabase,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {

    this.albums$ = database.list('albums').valueChanges();
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.
      bypassSecurityTrustResourceUrl
      ('assets/img/ic_thumb_up_black_24px.svg'));
  }

}
