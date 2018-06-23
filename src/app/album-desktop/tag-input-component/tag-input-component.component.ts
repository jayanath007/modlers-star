import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { TagService } from '../../album-core/service/tag.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { startWith, switchMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { Tag } from '../../models/models';

@Component({
  selector: 'app-tag-input-component',
  templateUrl: './tag-input-component.component.html',
  styleUrls: ['./tag-input-component.component.scss']
})
export class TagInputComponentComponent implements OnInit {


  @Output() tagListUpdated = new EventEmitter<string[]>();
  @Input() tags: string[];


  visible = true;
  selectable = true;
  addOnBlur = false;

  separatorKeysCodes = [ENTER, COMMA];

  tagCtrl: FormControl = new FormControl();

  filteredtags: Observable<string[]>;


  placeholder = 'tag your album';

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
    if (this.tags.length < 5) {
      this.tagCtrl.enable();
      this.placeholder = 'Tag your album';
    }
  }


  selected(event: MatAutocompleteSelectedEvent): void {
    this.addNewTag(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }


  addNewTag(value) {
    if ((this.tags.filter((item) => item === value).length === 0)
      || this.tags.length < 5) {
      const tagValue = value.toLowerCase().trim();
      this.tagService.saveTag({ name: tagValue });
      this.tags.push(value.trim());
      this.tagListUpdated.emit(this.tags);
    }
    if (this.tags.length >= 5) {
      this.tagCtrl.disable();
      this.placeholder = 'You can tagged only 5 tags';
    }
  }


  ngOnInit() {
  }

}
