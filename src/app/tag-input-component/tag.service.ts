import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Tag } from '../models/models';

@Injectable()
export class TagService {

    tagsCol: AngularFirestoreCollection<Tag>;
    tags$: Observable<Tag[]>;
    private basePath = '/uploads';

    constructor(private afs: AngularFirestore) {
        this.tagsCol = this.afs.collection('tags');
    }


    getTag() {
        return this.tags$ = this.tagsCol.valueChanges();
    }
    getTagByStartValue(startText) {
        // return this.tags$ =  this.tagsCol.valueChanges();
        const start = startText;
        const end = startText + '\uf8ff';
        return this.afs.collection('tags', ref =>
            ref
                .orderBy('name')
                .limit(5)
                .startAt(start)
                .endAt(end)
        ).valueChanges();
    }


    saveTag(tag: Tag) {

        const likePath = `tags/${tag.name}`;
        return this.afs.doc(likePath).set(tag);
    }

}
