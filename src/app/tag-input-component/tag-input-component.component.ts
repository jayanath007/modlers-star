import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { startWith, switchMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { TagService } from './tag.service';


@Component({
  selector: 'app-tag-input-component',
  templateUrl: './tag-input-component.component.html',
  styleUrls: ['./tag-input-component.component.scss']
})
export class TagInputComponentComponent implements OnInit {


  @Output() tagListUpdated = new EventEmitter<string[]>();
  @Input() tags: string[];
  @Input() maxTags = 5;
  @Input() disabalePlaceholder = 'You can add only 5 tags';
  @Input() enabalePlaceholder = 'Add Tag your album';
  @Input() addTag = true;

  visible = true;
  selectable = true;
  addOnBlur = false;
  placeholder = '';
  separatorKeysCodes = [ENTER, COMMA];

  tagCtrl: FormControl = new FormControl();

  filteredtags: Observable<string[]>;




  @ViewChild('tagInput') tagInput: ElementRef;


  constructor(private tagService: TagService) {

    this.filteredtags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      switchMap(val => this.tagService.getTagByStartValue(val).map((item) => {
        return item.map(data => data['name']);
      })));

  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.addNewTag(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  remove(tag: any): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.tagListUpdated.emit(this.tags);
    }
    if (this.tags.length < this.maxTags) {
      this.tagCtrl.enable();
      this.placeholder = this.enabalePlaceholder;
    }
  }


  selected(event: MatAutocompleteSelectedEvent): void {
    this.addNewTag(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }


  addNewTag(value) {
    if ((this.tags.filter((item) => item === value).length === 0)
      || this.tags.length < this.maxTags) {
      const tagValue = value.toLowerCase().trim();
      if (this.addTag) {
        this.tagService.saveTag({ name: tagValue });
      }
      this.tags.push(value.trim());
      this.tagListUpdated.emit(this.tags);
    }
    if (this.tags.length === this.maxTags) {
      this.tagCtrl.disable();
      this.placeholder = this.disabalePlaceholder;
    }
  }


  ngOnInit() {
    this.placeholder = this.enabalePlaceholder;
  }

}
