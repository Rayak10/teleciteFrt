import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Commentaire } from 'src/app/models/Commentaire';
import { Employe } from 'src/app/models/employe';
import { Sprint } from 'src/app/models/sprint';
import { CommentaireService } from 'src/app/services/commentaire/commentaire.service';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { GestionSprintsComponent } from '../gestion-sprints/gestion-sprints.component';

@Component({
  selector: 'app-update-commentaire',
  templateUrl: './update-commentaire.component.html',
  styleUrls: ['./update-commentaire.component.css']
})
export class UpdateCommentaireComponent implements OnInit {
  commentaire:Commentaire=new Commentaire();
   id:number;
   commentaires: Observable<Commentaire[]>;
   recivedData;
   offset: number =new Date().getTimezoneOffset() * 60 * 1000;
   commantaire:Commentaire=new Commentaire();
   submitted = false;
 employe:Employe=new Employe();
 sprint:Sprint=new Sprint();
  constructor(private employeservice:EmployeService,private commentaireservice:CommentaireService,private sprintservice:SprintService,private formBuilder: FormBuilder, private router: Router,private httpClient:HttpClient,private route: ActivatedRoute,
    public dialogRef:MatDialogRef<GestionSprintsComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any){
        this.recivedData=data;
      }
  
  
    ngOnInit() {
      this.commentaireservice.findremarqueById(this.recivedData.idCommentaire)
      .subscribe(data=>{
        console.log(data)
        this.commantaire=data;
      }),
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
    onSubmit(commentaireForm:NgForm) {
     this.submitted = true;
     this.update(); 
     this.dialogRef.close();
     this.commentaireservice.filter('Register click');
   }
   update() {
     this.commantaire.dateCommentaire = new Date(new Date().getTime() - this.offset);
 
     this.commentaireservice.updateCommentaire(this.recivedData.idCommentaire,this.commantaire)
       .subscribe(data => console.log(data), error => console.log(error));
       
   }  
  
  
  
}
  