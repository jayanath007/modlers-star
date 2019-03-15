import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlbumService } from '../../album-core/service/album.service';
import { Album } from '../../models/models';
import 'rxjs/add/observable/forkJoin';
import { AuthService } from '../../core/auth.service';
import { Subject } from 'rxjs';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '../../../../node_modules/angularfire2/firestore';


@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css']
})

export class AddAlbumComponent implements OnDestroy, OnInit {

  albumFrom: any;
  album = {
    name: '',
    description: '',
    modler: 'lushan', likes: 0, rating: 0, commentCount: 0, rank: 0,
    imageUrls: [], id: ''
  } as Album;

  clickSave = false;
  selectedFiles: FileList;
  fileUploading = false;
  uploadFile: File[] = [];
  tags = ['sri lanka'];
  saved = false;

  private unsubscribe: Subject<void> = new Subject();

  albumNameControl = new FormControl('', [
    Validators.required,
  ]);
  albumDescriptionControl = new FormControl('', [
    Validators.required,
  ]);
  matcher = new MyErrorStateMatcher();
  album$: any;
  isEditMode = false;


  constructor(private albumService: AlbumService,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router, protected route: ActivatedRoute, private afs: AngularFirestore) {
    this.isEditMode = false;
    if (window.location.href.indexOf('editAlbum') > 0) {
      this.isEditMode = true;
      this.route.params.switchMap((album) => {
        return this.afs.collection('albums', ref => {
          return ref.where('id', '==', album.albumId);
        }).valueChanges();
      }).subscribe((data: any) => {
        this.album = data[0];
        const tags = [];
        // this.album.tags.forEach((item) => {
        //   tags[item] = true;
        // });

      });
    }

  }





  checkValue(event: KeyboardEvent) {
    if (event.key === '.' || event.key === '-') {
      event.preventDefault();
    }
  }

  saveAlbum(album: Album, event: any) {
    this.clickSave = true;

    if ( !(event && event.keyCode === 13) && (this.uploadFile.length >= 3 || this.isEditMode)
      && this.albumNameControl.valid && this.albumDescriptionControl.valid) {

        
      this.fileUploading = true;
      this.auth.user.takeUntil(this.unsubscribe).subscribe((user) => {
        album.userName = user.displayName;
        album.userId = user.uid;
        album.userPhotoURL = user.photoURL;

        const tags = {};
        this.tags.forEach((item) => {
          tags[item] = true;
        });

        album.tags = tags;

        album.searchUserName = album.userName.trim().replace(' ', '.').toLowerCase();
        album.searchName = album.name.trim().replace(' ', '.').toLowerCase();
        album.date = new Date();

        this.albumService.saveAlbum(this.uploadFile, album)
          .takeUntil(this.unsubscribe)
          .subscribe(() => {
            this.fileUploading = false;

            this.openSnackBar();
            this.saved = true;
          });


      });
    }
  }

  openSnackBar() {
    const snackBarRef = this.snackBar.open('your album is upload please go to immage galery ', 'go', {
      duration: 6000,
      verticalPosition: 'top'
    });
    snackBarRef.onAction().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }


  onUploadFileChange($event) {
    for (const item of $event) {
      this.uploadFile.push(item);
    }
  }

  onTagListUpdated($event) {
    this.tags = $event;
  }

  onRemovedFile($event) {
    this.uploadFile = this.uploadFile
      .filter((item) => item.name !== $event.file.name);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
