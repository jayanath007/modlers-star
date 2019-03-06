import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '../../../node_modules/angularfire2/firestore';
import { Observable } from '../../../node_modules/rxjs';
import { Album } from '../models/models';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {


  albumsCol: AngularFirestoreCollection<Album>;
  albums$: any;

  constructor(private router: Router, public auth: AuthService, private afs: AngularFirestore, ) {

  }


  ngOnInit() {

    this.albums$ = this.auth.user.switchMap((user) => {
      return this.afs.collection('albums', ref => {
        return ref.where('userId', '==', user.uid)
          .orderBy('date', 'desc');
      }).valueChanges();
    });

  }
  editAlbum(id) {
    this.router.navigate(['/album/editAlbum/' + id]);
  }



}


