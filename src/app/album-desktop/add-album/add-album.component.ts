
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlbumService } from '../../album-core/service/album.service';
import { Album, Upload } from '../../models/models';
import 'rxjs/add/observable/forkJoin';
import { AuthService } from '../../core/auth.service';
import { Subject, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css']
})

export class AddAlbumComponent implements OnDestroy , OnInit {

  album = {
    name: '',
    modler: 'lushan', likes: 0, rating: 0, commentCount: 0, rank: 0,
    imageUrls: [], id: ''
  } as Album;

  selectedFiles: FileList;
  fileUploading = false;
  uploadFile: File[] = [];

  private unsubscribe: Subject<void> = new Subject();
  myControl: FormControl = new FormControl();


  constructor(private albumService: AlbumService,
     private auth: AuthService) {

  }

  options = [
    'One',
    'Two',
    'Three'
  ];

  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }


  saveAlbum(album: Album) {
    this.fileUploading = true;

    this.auth.user.takeUntil(this.unsubscribe).subscribe((user) => {
      album.userName = user.displayName;
      album.userId = user.uid;
      this.albumService.saveAlbum(this.uploadFile, album)
      .takeUntil(this.unsubscribe)
        .subscribe(() => {
          this.fileUploading = false;
        });
    });
  }

  onUploadFileChange($event) {
    for (const item of $event) {
      this.uploadFile.push(item);
    }
  }

  onRemovedFile($event) {
    this.uploadFile = this.uploadFile.filter((item) => item.name !== $event.file.name);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }


}
