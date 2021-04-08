import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-validation-sprint',
  templateUrl: './validation-sprint.component.html',
  styleUrls: ['./validation-sprint.component.css']
})
export class ValidationSprintComponent implements OnInit {
  exform:FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA)public data,
  public dialogRef: MatDialogRef<ValidationSprintComponent>) { }

  ngOnInit() {
    this.exform = new FormGroup({
      'q1' : new FormControl(null,Validators.requiredTrue),
      'q2' : new FormControl(null,Validators.requiredTrue),
      
    
    })
  }
  closeDialog(){
this.dialogRef.close(false);
}
}