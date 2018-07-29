import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoteService } from '../../services/note.service';
import { Note } from '../../../model/note.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  destroy$: Subject<Boolean> = new Subject<Boolean>();

  addNote: FormGroup;
  submitted = false;
  uid;
  notes: Note[] = [];
  loadingStatus = true;

  constructor(
              private fb: FormBuilder, 
              private noteService: NoteService,
            ) { }

  ngOnInit() {
    this.addNote = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(40)]],
      description: ['', [Validators.required]]
    });

    this.noteService.getNotes()
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      this.loadingStatus = false;
      this.notes = res.reverse()
    });
  }

  deleteNode(id: string){
    if(confirm("You sure?")){
      return this.noteService.deleteNote(id);
    }
  }

  get f(){
    return this.addNote.controls;
  }

  onSubmit(){
    this.submitted = true;

    if(this.addNote.invalid){
      return;
    }
    this.noteService.saveNote(this.addNote.value);
    }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
