import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Sprint } from 'src/app/models/sprint';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import * as $ from 'jquery' ;
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { DialogvalidationService } from 'src/app/services/validation/dialogvalidation.service';

@Component({
  selector: 'app-ajout-sprint',
  templateUrl: './ajout-sprint.component.html',
  styleUrls: ['./ajout-sprint.component.css']
})
export class AjoutSprintComponent implements OnInit {
  exform:FormGroup;
  sprint:Sprint=new Sprint();
  submitted = false;
  sprints: Observable<Sprint[]>;
  errorMessage: string;
  successMessage: string;
  projetArray= [];
  etatArray= [];
  nomSprint="Backlog produit";
  offset: number =new Date().getTimezoneOffset() * 60 * 1000;
  selectedProjetId:number;
  sprintsProjet:Observable<Sprint[]>;
  sprintsProjetArray: Sprint[] = [];
  selectedProjetSprintsId:number;
  showBPList: boolean = false;
  messageS:String="Sprint ajouté avec succès";
  messageE:String="Ajout du projet est échoué";
  constructor(private sprintservice:SprintService,private projetservice:ProjetService,private formBuilder:FormBuilder,
    private router:Router, private _service: NotificationsService ,private dialogValidation:DialogvalidationService) { }

  ngOnInit()  { 
    
    this.exform = new FormGroup({
      'nom' : new FormControl(null,Validators.required),
      'dateDebut' : new FormControl(null,Validators.required),
      'dateFin' : new FormControl(null,Validators.required),
      'description' : new FormControl(null,Validators.required),
      'projet' : new FormControl(null,Validators.required)
    
    })
   
      $("#leg2").click(function(){
        $("#tab1").toggle("slide");
      });
      $("#leg3").click(function(){
        $("#tab2").toggle("slide");
      });
    
    
  
this.etatArray=["Non terminé","Terminé"];
this.projetservice.findAllProjets().subscribe(
  data => {console.log("data from find all projet:"+JSON.stringify(data));   
  
              this.projetArray.push(...data);}
);
this.reloadData();
}
    
newSprint(): void {
  this.submitted = false;
  this.sprint= new Sprint();
}
onSubmit(getSprintForm:NgForm) {
  this.submitted = true;
  this.save(); 
  getSprintForm.reset();
     this.reloadData();
}
onSuccess(messageS){
  this._service.success('Success',messageS, {
    position: ['bottom','right'],
    timeOut: 2000,
    animate: 'fade',
    showProgressBar: true
  })}
  onErorr(messageE){
    this._service.error('Erreur',messageE, {
      position: ['bottom','right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    })}
save() {
  console.log("sprint: "+JSON.stringify(this.sprint));
  this.sprint.dateDebut = new Date(new Date(this.sprint.dateDebut).getTime() - this.offset);
  this.sprint.dateFin = new Date(new Date(this.sprint.dateFin).getTime() - this.offset);
  this.sprint.etatSprint='Non terminé';
  this.sprintservice.createSprint(this.sprint)
    .subscribe(data =>this.onSuccess(this.messageS), error => this.onErorr(this.messageE));
  this.sprint= new Sprint();
  
 
}  
reloadData(){
  this.sprints= this.sprintservice.findAllSprintOrderByProjet();
 
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
onChange(projet){
 
  this.sprint.projet = this.projetArray.find(projet=> projet.idProjet ==this.selectedProjetId);//^ {idProjet:,dateDebut:null,dateFin:null,descriptionTechnique:'',equipe:null,description:'',nomProjet:'',theme:'',sprints:[]};
  console.log(JSON.stringify(this.sprint.projet.idProjet));  
}
onChange1(event){
 
  this.sprintsProjet =this.sprintservice.findSprintsByProjet(this.selectedProjetSprintsId);
  this.sprintservice.findSprintsByProjet(this.selectedProjetSprintsId).subscribe(
    resp  =>{ this.sprintsProjetArray = resp;
     this.sprintsProjetArray = this.sprintsProjetArray.filter(x=>x.nomSprint!='Backlog produit');
    console.log("*****"+(this.sprintsProjetArray));
    }
  );
}

onChangeEtat(event){
  if(this.sprint.etatSprint=='Terminé'){
  this.dialogValidation.openConfirmDialog()
}
}
}