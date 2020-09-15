import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Sprint } from 'src/app/models/sprint';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import * as $ from 'jquery' ;
import { Reunion } from 'src/app/models/Reunion';
import { ReunionService } from 'src/app/services/reunion/reunion.service';

@Component({
  selector: 'app-gestion-reunion',
  templateUrl: './gestion-reunion.component.html',
  styleUrls: ['./gestion-reunion.component.css']
})
export class GestionReunionComponent implements OnInit {
  reunion:Reunion=new Reunion();
  submitted = false;
  errorMessage: string;
  reunions: Observable<Reunion[]>;
  successMessage: string;
  typeArray= [];
  offset: number =new Date().getTimezoneOffset() * 60 * 1000;
  selectedReunionId:number;
  showBPList: boolean = false;
  constructor(private runionservice:ReunionService,private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit()  {
    
   
   
   
    
    
  
this.typeArray=["Réunion administratif","Reunion Scrum"]
/*this.projetservice.findAllProjets().subscribe(
  data => {console.log("data from find all projet:"+JSON.stringify(data));   
  
              this.projetArray.push(...data);}
);*/
this.reloadData();
}
    
newSprint(): void {
  this.submitted = false;
  this.reunion= new Reunion();
}
onSubmit(getReunionForm:NgForm) {
  this.submitted = true;
  this.save(); 
  getReunionForm.reset();
     this.reloadData();
     this.gotoList();
}
save() {
  console.log("reunion: "+JSON.stringify(this.reunion));
  this.reunion.dateDebut = new Date(new Date(this.reunion.dateDebut).getTime() - this.offset);
  this.reunion.dateFin = new Date(new Date(this.reunion.dateFin).getTime() - this.offset);
  this.runionservice.createReunion(this.reunion)
    .subscribe(data => console.log(data), error => console.log(error));
  this.reunion= new Reunion();
  
 
this.gotoList();
}  
reloadData(){
  this.reunions= this.runionservice.findAllReunion();
 
}
sprintDetails(id:number){
  this.router.navigate(['sprints/details',id]);
}
updateSprint(id:number){
  this.router.navigate(['sprints/update',id]);
}
gotoList(){
  this.router.navigate(['gestionReunions']);
}
deleteSprints(id:number){
  this.runionservice.deleteReunion(id)
  .subscribe(
  data=>{
    console.log(data);
   

   this.reloadData();
   this.gotoList();
  },
  error=>console.log(error));
  
}
/*onChange(event){
 
  this.sprint.projet = {idProjet:this.selectedProjetId,dateDebut:null,dateFin:null,descriptionTechnique:'',equipe:null,description:'',nomProjet:'',theme:'',sprints:[]};
  console.log(JSON.stringify(this.sprint.projet.idProjet));  
}
onChange1(event){
  $("#leg2").click(function(){
    $("#tab1").toggle("slide");
  });
  $("#leg3").click(function(){
    $("#tab2").toggle("slide");
  });
  this.sprintsProjet =this.sprintservice.findSprintsByProjet(this.selectedProjetSprintsId);
  this.sprintservice.findSprintsByProjet(this.selectedProjetSprintsId).subscribe(
    resp  =>{ this.sprintsProjetArray = resp;
     this.sprintsProjetArray = this.sprintsProjetArray.filter(x=>x.nomSprint!='Backlog produit');
    console.log("*****"+(this.sprintsProjetArray.length -1));
    }
  );
}

/*toggleBPList(){
  this.showBPList = ! this.showBPList;
  console.log(this.showBPList+"*****");
}*/
}
