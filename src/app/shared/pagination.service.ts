import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { QueryConfig } from './models/queryConfig';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/take';

@Injectable()
export class PaginationService {

  // Source data
  private _done = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(false);
  private _data = new BehaviorSubject([]);

  private query: QueryConfig;
  private opts?: any;

  // Observable data
  data: Observable<any>;
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._loading.asObservable();


  constructor(private afs: AngularFirestore) {

  }

  // Initial query sets options and defines the Observable
  // passing opts will override the defaults
  init(path: string, field: string, opts?: any) {

    this.opts = opts;
    this._data.next([]);
    this._done.next(false);
    this.query = {
      path,
      field,
      limit: 5,
      reverse: false,
      prepend: false,
      ...opts
    };

    const first = this.afs.collection(this.query.path, ref => {
      return this.getQuery(ref);
    });


    this.mapAndUpdate(first);

    // Create the observable array for consumption in components
    this.data = this._data.asObservable()
      .scan((acc, val) => {
        return this.query.prepend ? val.concat(acc) : acc.concat(val);
      });
  }

  // Retrieves additional data from firestore
  more() {
    const cursor = this.getCursor();

    const more = this.afs.collection(this.query.path, ref => {
      return this.getQuery(ref).startAfter(cursor);
    });
    this.mapAndUpdate(more);
  }




  // Determines the doc snapshot to paginate query
  private getCursor() {
    const current = this._data.value;
    if (current.length) {
      return this.query.prepend ? current[0].doc : current[current.length - 1].doc;
    }
    return null;
  }


  // Maps the snapshot to usable format the updates source
  private mapAndUpdate(col: AngularFirestoreCollection<any>) {

    if (this._done.value || this._loading.value) {
      return undefined;
    }

    // loading
    this._loading.next(true);

    // Map snapshot with doc ref (needed for cursor)
    return col.snapshotChanges()
      .do(arr => {
        let values = arr.map(snap => {
          const data = snap.payload.doc.data();
          const doc = snap.payload.doc;
          return { ...data, doc, id: snap.payload.doc.id };
        });

        // If prepending, reverse the batch order
        values = this.query.prepend ? values.reverse() : values;

        // update source with new values, done loading
        this._data.next(values);
        this._loading.next(false);

        // no more values, mark done
        if (!values.length) {
          this._done.next(true);
        }
      })
      .take(1)
      .subscribe();

  }

  private getQuery(ref) {

    if (this.opts.params.user === 'category') {
      return ref.where('tags.' + this.opts.params.album, '>', 0)
        .orderBy('tags.' + this.opts.params.album, 'desc')
        .limit(this.query.limit);
    }
    if (this.opts.params.album && this.opts.params.user) {
      return ref.where('searchUserName', '==', this.opts.params.user)
        .where('searchName', '==', this.opts.params.album)
        .limit(this.query.limit);
    }
    if (this.opts.params.user) {
      return ref.where('searchUserName', '==', this.opts.params.user)
        .orderBy(this.query.field, 'desc')
        .limit(this.query.limit);
    }
    return ref.orderBy(this.query.field, 'desc')
      .limit(this.query.limit);
  }

}
