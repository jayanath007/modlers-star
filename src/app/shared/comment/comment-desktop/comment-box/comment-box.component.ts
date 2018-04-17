import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { CommentService } from '../../comment-core/service/comment.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit {

  comment$: Observable<any[]>;

  @Input()
  commentMaxHieght;

  constructor(private commentService: CommentService) {

  }

  ngOnInit() {

  }

  openGallery(index, imageUrls: string[]) {

  }

}
