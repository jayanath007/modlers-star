import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TagService } from '../tag-input-component/tag.service';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';

@Component({
  selector: 'app-search-from',
  templateUrl: './search-from.component.html',
  styleUrls: ['./search-from.component.scss']
})
export class SearchFromComponent implements OnInit {


  @Output() searchTextChange = new EventEmitter<string>();
  @Output() tagValueChange = new EventEmitter<string>();

  tags = [];
  disabalePlaceholder = 'You can select only one tag for search';
  enabalePlaceholder = 'Select tag';
  weekStars = false;
  mail = true;
  femail = true;
  popularTags = [];
  popularUsers = [];

  constructor(private tagService: TagService, private afs: AngularFirestore) {

    this.tagService.getPopularTags().subscribe((data) => {
      this.popularTags = data;
    });
    this.getPopularUsers().subscribe((data) => {
      this.popularUsers = data;
    });

  }

  ngOnInit() {
  }

  onTagListUpdated($event) {
    if ($event.length > 0) {
      this.tagValueChange.emit($event[0]);
    }
  }
  selectTag(value) {
    this.tagValueChange.emit(value);
  }
  selectUser(value) {
    this.searchTextChange.emit(value.trim().replace(' ', '.').toLowerCase());
  }

  searchOnChange(event) {
    this.searchTextChange.emit(event);
  }


  getPopularUsers() {
    return this.afs.collection('users', ref =>
      ref.orderBy('rating', 'desc')
        .limit(10)
    ).valueChanges();
  }

}
