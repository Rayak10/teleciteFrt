import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ValidationSprintComponent } from '../validation-sprint/validation-sprint.component';

@Component({
  selector: 'app-validation-user-story',
  templateUrl: './validation-user-story.component.html',
  styleUrls: ['./validation-user-story.component.css']
})
export class ValidationUserStoryComponent implements OnInit {
  exform:FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA)public data,
  public dialogRef: MatDialogRef<ValidationUserStoryComponent>) { }

  ngOnInit() {
    this.exform = new FormGroup({
      'q1' : new FormControl(null,Validators.requiredTrue),
      'q2' : new FormControl(null,Validators.requiredTrue),
      'q3' : new FormControl(null,Validators.requiredTrue),
      'q4' : new FormControl(null,Validators.requiredTrue),

      
    
    })
  }
  closeDialog(){
this.dialogRef.close(false);
}
}