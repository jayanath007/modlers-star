import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Comment } from '../../models/comment';


@Injectable()
export class CommentService {

    comments$: AngularFireList<Comment>;

    constructor(private db: AngularFireDatabase) {
        this.comments$ = this.db.list('comments');
    }

    getComments() {
        return this.comments$.valueChanges();
    }
    getComment(albumKey: string) {
        return this.db.object(`comments/${albumKey}`).valueChanges();
    }

    private errorHandler(error) {
        console.log(error);
        return Observable.throw(error.message);
    }


    saveComment(album: Comment) {
        return this.comments$.push(album)
          .then(_ => console.log('Comment success'));
      }

}
