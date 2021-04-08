import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ValidationSprintComponent } from 'src/app/components/validation-sprint/validation-sprint.component';

@Injectable({
  providedIn: 'root'
})
export class DialogvalidationService {
  constructor( private dialog:MatDialog) { }

  openConfirmDialog(){
    return this.dialog.open(ValidationSprintComponent,{
      width: '500px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data:{
        
      }

    });
  }
}
