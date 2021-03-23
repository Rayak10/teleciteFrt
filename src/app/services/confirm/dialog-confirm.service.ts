import { Injectable } from '@angular/core';
import { MatDialog} from '@angular/material'
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class DialogConfirmService {

  constructor( private dialog:MatDialog) { }

  openConfirmDialog(msg){
    return this.dialog.open(ConfirmDialogComponent,{
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data:{
        message: msg
      }

    });
  }
}
