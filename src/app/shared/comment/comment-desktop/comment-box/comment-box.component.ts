import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { CommentService } from '../../comment-core/service/comment.service';



@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit {


  comment$: Observable<any[]>;

  constructor(private commentService: CommentService) {
    this.comment$ = this.commentService.getComments();
  }

  ngOnInit() {

  }

  openGallery(index, imageUrls: string[]) {

  }

}
