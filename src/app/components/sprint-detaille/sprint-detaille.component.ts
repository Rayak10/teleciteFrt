import { Component, OnInit } from '@angular/core';
import { Sprint } from 'src/app/models/sprint';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Userstory } from 'src/app/models/userStory';
import { Observable } from 'rxjs';
import { UserstoryService } from 'src/app/services/userstory/userstory.service';
import { Commentaire } from 'src/app/models/Commentaire';
import { CommentaireService } from 'src/app/services/commentaire/commentaire.service';
import * as $ from 'jquery' ;
import { MatDialog } from '@angular/material';
import { AjoutcommentaireComponent } from '../ajoutcommentaire/ajoutcommentaire.component';
import { UpdateCommentaireComponent } from '../update-commentaire/update-commentaire.component';
import { DialogConfirmService } from 'src/app/services/confirm/dialog-confirm.service';

@Component({
  selector: 'app-sprint-detaille',
  templateUrl: './sprint-detaille.component.html',
  styleUrls: ['./sprint-detaille.component.css']
})
export class SprintDetailleComponent implements OnInit {
  commentaires: Commentaire[];
show1:boolean=false;
show2:boolean=false;
showDataOfChildComponent;
idEmploye:number;
  id:number;
sprint:Sprint;
userstorys:Userstory[];
roleE:String;
  constructor(private dialog:MatDialog,private commentaireservice:CommentaireService,private sprintservice:SprintService,private route: ActivatedRoute,
     private router: Router,private userstoryservice:UserstoryService,private dialogService:DialogConfirmService) {
    this.commentaireservice.listen().subscribe((m:any)=>{
    console.log(m)
    this.reloadData();
  })
  
  }

  ngOnInit() {
    this.roleE=localStorage.getItem('role');
    this.id=this.route.snapshot.params['id'];
    this.reloadData();

    this.idEmploye=parseInt(localStorage.getItem('id'));
    $("#tab1").hide();
    $("#tab2").hide();

    this.sprint=new Sprint();
    this.sprintservice.findSprintById(this.id)
    .subscribe(data=>{
      console.log(data)
      this.sprint=data;
      console.log("userrrrrrrrrsss"+JSON.stringify(this.sprint.projet.idProjet))
      if(this.sprint.nomSprint=='Backlog produit'){
      this.userstoryservice.findAllUserstoryByProjet(this.sprint.projet.idProjet).subscribe(
        response =>{
          this.userstorys = response;
  console.log("userrrrrrrrrsss"+JSON.stringify(this.userstorys))
        },
        error => alert('problem!!!')
      );}
      else{
        this.userstoryservice.findAllStoriessprint(this.sprint.idSprint).subscribe(
          response =>{
            this.userstorys = response;
    console.log("userrrrrrrrrsss"+JSON.stringify(this.userstorys))
          },
          error => alert('problem!!!')
        );}

      

    }, error=>console.log(error));
    
    }
  
  updateUserstory(id:number){
  
    this.router.navigate(['userstory/update',id]);
  }
  
  userstoryDetails(id:number){
  
    this.router.navigate(['userstory/details',id]);
  }
  reloadData1(){
    this.userstoryservice.findAllStoriessprint(this.sprint.idSprint).subscribe(
      response =>{
        this.userstorys = response;
console.log("userrrrrrrrrsss"+JSON.stringify(this.userstorys))
      },
      error => alert('problem!!!')
    )

  }
  deleteUserstory(id:number){


    this.dialogService.openConfirmDialog('êtes-vous sûr de supprimer cette équipe?')
  .afterClosed().subscribe(res =>{
  if(res) {
    this.userstoryservice.deleteUserStory(id)
    .subscribe(
    data=>{
      console.log(data);
     
  
     this.reloadData1();
    },
    error=>console.log(error));
    
  }
})}

  list(){
    this.router.navigate(['gestionSprints']);
  }

  reloadData(){
    this.commentaireservice.findremarquesSprint(this.id).subscribe(
      response =>{
        this.commentaires = response;

      },
      error => alert('problem!!!')
    );
    }
projetDetails(id:number){
  
  this.router.navigate(['projets/details',id]);
}
toogletag1(){
  if (this.show1==true){
    $("#tab1").hide(1500);
    this.show1=!this.show1

  }
  else if (this.show1==false){
    $("#tab1").show(1500);
    this.show1=!this.show1
  }
}
toogletag2(){
  if (this.show2==true){
    $("#tab2").hide(1500);
    this.show2=!this.show2

  }
  else if (this.show2==false){
    $("#tab2").show(1500);
    this.show2=!this.show2
  }

}

updateCommentaire(id){

  const dialogRef=this.dialog.open(UpdateCommentaireComponent,{
  autoFocus:true,
  width:"70%",
  data:{
     idUser:this.idEmploye,
     idCommentaire:id,
     idSprint:this.sprint.idSprint
   }});
 
}
}
