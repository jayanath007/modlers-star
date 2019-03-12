import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/take';
import { DataAction } from './comment.enum';

@Injectable()
export class CommentPaginationService {

  // Source data
  private _done = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(false);
  private _data = new BehaviorSubject({ action: DataAction.Reset, data: [] });

  // Observable data
  data = new BehaviorSubject([]);
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._loading.asObservable();
  isAddItem = false;
  limit = 5;
  documentPath: string;

  constructor(private afs: AngularFirestore) {
    // Create the observable array for consumption in components
    this._data.asObservable()
      .scan((acc, val) => {
        if (val.action === DataAction.Add) {
          return { action: DataAction.Done, data: val.data.concat([]) };
        } else if (val.action === DataAction.Concat) {
          return { action: DataAction.Done, data: acc.data.concat(val.data) };
        } else if (val.action === DataAction.Reset) {
          return { action: DataAction.Done, data: [] };
        }
      }).subscribe((data) => {
        this.data.next(data.data);
      });
  }


  reset() {
    this._data.next({ action: DataAction.Reset, data: [] });
    this._done.next(false);
    this._loading.next(false);
  }
  // Initial query sets options and defines the Observable
  // passing opts will override the defaults
  init(documentPath: string) {
    // Create the observable array for consumption in components
    this.reset();
    this._data.next({ action: DataAction.Reset, data: [] });
    this.documentPath = documentPath;
    const first = this.afs.collection(this.documentPath, ref => {
      return this.getQuery(ref);
    });
    this.mapAndUpdate(first);
  }

  // Retrieves additional data from firestore
  more() {
    const cursor = this.getCursor();
    const more = this.afs.collection(this.documentPath, ref => {
      return this.getQuery(ref).startAfter(cursor);
    });
    this.mapAndUpdate(more);
  }

  addItem(item) {
    const arr = [];
    arr.push(item);
    this.isAddItem = true;
    this._data.next({ action: DataAction.Add, data: arr });
  }


  // Determines the doc snapshot to paginate query
  private getCursor() {
    const current = this._data.value;
    if (current.data.length) {
      return current[current.data.length - 1].doc;
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
        const values = arr.map(snap => {
          const data = snap.payload.doc.data();
          const doc = snap.payload.doc;
          return { ...data, doc, id: snap.payload.doc.id };
        });

        // update source with new values, done loading
        this._data.next({ action: DataAction.Concat, data: values });
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
    return ref.orderBy('createdAt', 'desc')
      .limit(this.limit);
  }

}
