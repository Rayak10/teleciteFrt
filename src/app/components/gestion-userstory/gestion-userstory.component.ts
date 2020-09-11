import { Component, OnInit } from '@angular/core';
import { Userstory } from 'src/app/models/userStory';
import { Observable } from 'rxjs';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Sprint } from 'src/app/models/sprint';
import { UserstoryService } from 'src/app/services/userstory/userstory.service';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { Projet } from 'src/app/models/projet';

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
  projetArray= [];
  storysArray= [];
  prioriteArray= [];
  selectedSprintId:number;
  selectedProjetId:any;
  projet:Projet;
  sprint:Observable<Sprint>;
  selectedPriorite:number;
  complexiteArray= [];
  selectedComplexite:number;
val:any
  constructor(private userstoryservice:UserstoryService,private projetservice:ProjetService,private sprintservice:SprintService,private formBuilder:FormBuilder,private router:Router) { 
    this.val=this.selectedProjetId;

  }

  ngOnInit() {
    this.prioriteArray=[
      {Id:1,name:"Must have"},
      {Id:2,name:"Should have"},
      {Id:3,name:"Could have"},
      {Id:4,name:"Won't have"}];

this.complexiteArray=[1,2,3,5,8,13,20,40,100]
this.projetservice.findAllProjets().subscribe(
  data => {console.log("data from find all projets:"+JSON.stringify(data));   
  
              this.projetArray.push(...data);}
);

}
    
newUserstory(): void {
  this.submitted = false;
  this.userstory= new Userstory();
}
onSubmit(userstorieForm:NgForm) {
  this.submitted = true;
  this.save(); 
    this.reloadData();
     this.gotoList();
     userstorieForm.reset();

}
save() {
  console.log("userStory: "+JSON.stringify(this.userstory));
 
  this.userstoryservice.createUserStory(this.userstory)
    .subscribe(data => console.log(data), error => console.log(error));
    
  this.userstory= new Userstory();
  
 
this.gotoList();
}  
reloadData(){
  this.userstorys= this.userstoryservice.findAllUserstoryByProjet(this.selectedProjetId);
  
}
userstoryDetails(id:number){
  this.router.navigate(['userstory/details',id]);
}
updateUserstory(id:number){
  this.router.navigate(['userstory/update',id]);
}
gestionTaches(id:number){
  this.router.navigate(['gestionTaches',id]);
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
   
  console.log("id projettttttt: "+JSON.stringify(this.selectedProjetId));
  this.sprintservice.findSprintBlByProjet(this.selectedProjetId).subscribe(
    response =>{
      this.userstory.sprint = response;
    },
    error => alert('problem!!!')
  );
  console.log('traiment');
  this.userstorys=this.userstoryservice.findAllUserstoryByProjet(this.selectedProjetId) 
}

onChangePriorite(event){
   
  this.userstory.priorite = this.selectedPriorite;
  //console.log(JSON.stringify(this.employe.bureau.idBureau));
 
}
onChangeComplexite(event){
   
  this.userstory.complexite = this.selectedComplexite;
  //console.log(JSON.stringify(this.employe.bureau.idBureau));
 
}
}


