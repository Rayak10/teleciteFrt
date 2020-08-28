import { Component, OnInit } from '@angular/core';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Sprint } from 'src/app/models/sprint';
import { Observable } from 'rxjs';
import { Projet } from 'src/app/models/projet';
import { ProjetService } from 'src/app/services/projet/projet.service';

@Component({
  selector: 'app-gestion-sprints',
  templateUrl: './gestion-sprints.component.html',
  styleUrls: ['./gestion-sprints.component.css']
})
export class GestionSprintsComponent implements OnInit {
  sprint:Sprint=new Sprint();
  submitted = false;
  sprints: Observable<Sprint[]>;
  errorMessage: string;
  successMessage: string;
  projetArray= [];
  etatArray= [];
  offset: number =new Date().getTimezoneOffset() * 60 * 1000;
  selectedProjetId:number;

  constructor(private sprintservice:SprintService,private projetservice:ProjetService,private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit() {
this.etatArray=["To do","Doing","Done"]
this.projetservice.findAllProjets().subscribe(
  data => {console.log("data from find all projet:"+JSON.stringify(data));   
  
              this.projetArray.push(...data);}
);
this.reloadData();
}
    
newProjet(): void {
  this.submitted = false;
  this.sprint= new Sprint();
}
onSubmit() {
  this.submitted = true;
  this.save(); 
     this.reloadData();
     this.gotoList();
}
save() {
  console.log("sprint: "+JSON.stringify(this.sprint));
  this.sprint.dateDebut = new Date(new Date(this.sprint.dateDebut).getTime() - this.offset);
  this.sprint.dateFin = new Date(new Date(this.sprint.dateFin).getTime() - this.offset);
  this.sprintservice.createSprint(this.sprint)
    .subscribe(data => console.log(data), error => console.log(error));
  this.sprint= new Sprint();
  
 
this.gotoList();
}  
reloadData(){
  this.sprints= this.sprintservice.findAllSprint();
  
}
sprintDetails(id:number){
  this.router.navigate(['sprints/details',id]);
}
updateSprint(id:number){
  this.router.navigate(['sprints/update',id]);
}
gotoList(){
  this.router.navigate(['gestionSprints']);
}
deleteSprints(id:number){
  this.sprintservice.deleteSprint(id)
  .subscribe(
  data=>{
    console.log(data);
   

   this.reloadData();
   this.gotoList();
  },
  error=>console.log(error));
  
}
onChange(event){
 
  this.sprint.projet = {idProjet:this.selectedProjetId,nomProjet:'',theme:'',description:'',descriptionTechnique:'',dateDebut:null,dateFin:null,equipe:null};
  console.log(JSON.stringify(this.sprint.projet.idProjet));  
}
}
