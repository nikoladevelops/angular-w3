import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Note } from '../data/Note';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  notes:Array<Note> = [];
  
  noteTitle:string = ""
  noteContent:string = ""
  noteIndex:number = -1

  hasTitleError:boolean = false
  hasContentError:boolean = false

  indexWatcher = 0;

  createNote(){
    if(this.validateInput() == false){
      return
    }

    this.indexWatcher++;

    let newNote:Note = {title:this.noteTitle, content:this.noteContent, index: this.indexWatcher}
    this.notes.push(newNote)
    this.resetState()
  }

  saveChanges(){
    if(this.validateInput() == false){
      return
    }
    
    this.notes.forEach((element,i)=>{
      if (element.index == this.noteIndex){
        element.content = this.noteContent;
        element.title = this.noteTitle
        return;
      }
    })

    this.resetState()
  }

  deleteNote(indexToDelete: number) {
    this.notes.forEach((element,i) => {
      if(element.index == indexToDelete){
        this.notes.splice(i,1)

        if(this.noteIndex == indexToDelete){
          this.resetState()
        }
        return;
      }
    });
  }

  editNote(noteToEdit: Note) {
    this.noteTitle = noteToEdit.title
    this.noteContent = noteToEdit.content
    this.noteIndex = noteToEdit.index

    this.hasContentError=false
    this.hasTitleError=false
  }

  resetState(){
    this.noteTitle = ""
    this.noteContent = ""
    this.noteIndex = -1

    this.hasTitleError = false
    this.hasContentError = false
  }

  validateInput(){
    this.hasTitleError=this.noteTitle.length < 5;
    this.hasContentError=this.noteContent.length < 7;
    
    return this.hasTitleError == false && this.hasContentError == false
  }
}
