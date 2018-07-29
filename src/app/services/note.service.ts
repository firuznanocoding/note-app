import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../../model/note.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private readonly notifier: NotifierService;

  constructor(private afDB: AngularFireDatabase, notifierService: NotifierService) { 
    this.notifier = notifierService;
  }

  getNotes(): Observable<Note[]>{
    return this.afDB.list('/notes').valueChanges().pipe(
      map(data => data as Note[])
    )
  }

  saveNote(value): void{
    let dateTime = Date.now();
    let d = String(new Date());
    let created_at = d.substring(0, d.indexOf(' ('));
     firebase.database().ref('notes/' +dateTime).set({
      id:dateTime,
      title: value.title,
      description: value.description,
      created_at: created_at
    }).then(() => this.notifier.notify( 'success', 'Success!. Note added'))
     .catch(() => this.notifier.notify( 'danger', 'Note not added' ));
  }

  deleteNote(id){
    return firebase.database().ref('notes/' + id).remove()
     .then(() => this.notifier.notify( 'success', 'Success!. Note deleted' ))
    .catch(() => this.notifier.notify( 'danger', 'Note not added' ));
  }
}
