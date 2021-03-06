import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs';
import { Commentaire } from 'src/app/models/Commentaire';
import { Employe } from 'src/app/models/employe';
import { Sprint } from 'src/app/models/sprint';
import { CommentaireService } from 'src/app/services/commentaire/commentaire.service';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { GestionSprintsComponent } from '../gestion-sprints/gestion-sprints.component';

@Component({
  selector: 'app-ajoutcommentaire',
  templateUrl: './ajoutcommentaire.component.html',
  styleUrls: ['./ajoutcommentaire.component.css']
})
export class AjoutcommentaireComponent implements OnInit {
 commentaire:Commentaire=new Commentaire();
   id:number;
   recivedData;
   offset: number =new Date().getTimezoneOffset() * 60 * 1000;
   commantaire:Commentaire=new Commentaire();
   commantaires: Observable<Commentaire[]>;
   submitted = false;
   employe:Employe=new Employe();
   sprint:Sprint=new Sprint();
   exform:FormGroup;
   messageS:String="Commentaie ajouté avec succès";
   messageE:String="Ajout du commentaire est échoué";
   constructor(private employeservice:EmployeService,private commentaireservice:CommentaireService,
    private sprintservice:SprintService,private formBuilder: FormBuilder, private router: Router,
    private httpClient:HttpClient,private route: ActivatedRoute, private _service: NotificationsService,
   public dialogRef:MatDialogRef<GestionSprintsComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any){
       this.recivedData=data;
     }
 
 
   ngOnInit() {
    this.exform = new FormGroup({
      'commantaire' : new FormControl(null,Validators.required),
     
    })
 
    this.sprintservice.findSprintById(this.recivedData.idSprint).subscribe(
      response =>{
        this.commantaire.sprint = response;
        console.log("ssssssssssss"+JSON.stringify(this.commantaire.sprint.idSprint))

      },
      error => alert('problem!!!')
    );
    this.employeservice.findEmployeById(this.recivedData.idUser).subscribe(
      response =>{
        this.commantaire.employe = response;
        console.log("eeeeeeeeeee"+JSON.stringify( this.commantaire.employe.idEmploye))

      },
      error => alert('problem!!!')
    );
   }
   onErorr(messageE){
    this._service.error('Erreur',messageE, {
      position: ['bottom','right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    })}
  onSuccess(messageS){
    this._service.success('Success',messageS, {
      position: ['bottom','right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    })}
   onSubmit(commentaireForm:NgForm) {
    this.submitted = true;
    this.save(); 
    this.dialogRef.close();
  }
   save() {
    this.commantaire.dateCommentaire = new Date(new Date().getTime() - this.offset);
    this.commentaireservice.createCommentaire(this.commantaire)
      .subscribe(data =>this.onSuccess(this.messageS), error => this.onErorr(this.messageE));

  }  

   }
 
 
 
 