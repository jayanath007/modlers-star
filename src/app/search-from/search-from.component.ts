import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  onTagListUpdated($event) {
    if ($event.length > 0) {
      this.tagValueChange.emit($event[0]);
    }
  }

  searchOnChange(event) {
    this.searchTextChange.emit(event);
  }

}
