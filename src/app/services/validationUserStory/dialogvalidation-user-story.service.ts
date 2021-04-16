import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ValidationUserStoryComponent } from 'src/app/components/validation-user-story/validation-user-story.component';

@Injectable({
  providedIn: 'root'
})
export class DialogvalidationUserStoryService {
  constructor( private dialog:MatDialog) { }

  openConfirmDialogStory(){
    return this.dialog.open(ValidationUserStoryComponent,{
      width: '500px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data:{
        
      }

    });
  }
}