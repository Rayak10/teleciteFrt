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
  constructor(private dialog:MatDialog,private commentaireservice:CommentaireService,private sprintservice:SprintService,private route: ActivatedRoute, private router: Router,private userstoryservice:UserstoryService) {
    this.commentaireservice.listen().subscribe((m:any)=>{
    console.log(m)
    this.reloadData();
  })
  
  }

  ngOnInit() {
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
    }, error=>console.log(error));
  

  }
  updateUserstory(id:number){
  
    this.router.navigate(['userstory/update',id]);
  }
  
  userstoryDetails(id:number){
  
    this.router.navigate(['userstory/details',id]);
  }
  deleteUserstory(id:number){
    this.userstoryservice.deleteUserStory(id)
    .subscribe(
    data=>{
      console.log(data);
     
  
     this.reloadData();
    },
    error=>console.log(error));
    
  }
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
