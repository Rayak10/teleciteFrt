import { Component, OnInit } from '@angular/core';
import { Userstory } from 'src/app/models/userStory';
import { Observable } from 'rxjs';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Sprint } from 'src/app/models/sprint';
import { UserstoryService } from 'src/app/services/userstory/userstory.service';
import { SprintService } from 'src/app/services/sprint/sprint.service';

@Component({
  selector: 'app-gestion-userstory',
  templateUrl: './gestion-userstory.component.html',
  styleUrls: ['./gestion-userstory.component.css']
})
export class GestionUserstoryComponent implements OnInit {
  userstory:Userstory=new Userstory();
  submitted = false;
  userstorys: Observable<Userstory[]>;
  errorMessage: string;
  successMessage: string;
  sprintArray= [];
  selectedSprintId:number;

  constructor(private userstoryservice:UserstoryService,private sprintservice:SprintService,private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit() {

this.sprintservice.findAllSprint().subscribe(
  data => {console.log("data from find all sprints:"+JSON.stringify(data));   
  
              this.sprintArray.push(...data);}
);
this.reloadData();
}
    
newUserstory(): void {
  this.submitted = false;
  this.userstory= new Userstory();
}
onSubmit() {
  this.submitted = true;
  this.save(); 
     this.reloadData();
     this.gotoList();
}
save() {
  console.log("userStory: "+JSON.stringify(this.userstory));
 
  this.userstoryservice.createUserStory(this.userstory)
    .subscribe(data => console.log(data), error => console.log(error));
  this.userstory= new Userstory();
  
 
this.gotoList();
}  
reloadData(){
  this.userstorys= this.userstoryservice.findAllUserstory();
  
}
userstoryDetails(id:number){
  this.router.navigate(['sprints/details',id]);
}
updateUserstory(id:number){
  this.router.navigate(['sprints/update',id]);
}
gotoList(){
  this.router.navigate(['gestionUserstory']);
}
deleteUserstory(id:number){
  this.userstoryservice.deleteUserStory(id)
  .subscribe(
  data=>{
    console.log(data);
   

   this.reloadData();
   this.gotoList();
  },
  error=>console.log(error));
  
}
onChange(event){
 
  this.userstory.sprint = {idSprint:this.selectedSprintId,nomSprint:'',numeroSprint:null,dateDebut:null,dateFin:null,etatSprint:'',descriptionSprint:'',projet:null};
  console.log(JSON.stringify(this.userstory.sprint.idSprint));  
}
}
