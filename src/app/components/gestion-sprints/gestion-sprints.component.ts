import { Component, OnInit } from '@angular/core';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Sprint } from 'src/app/models/sprint';
import { Observable } from 'rxjs';
import { ProjetService } from 'src/app/services/projet/projet.service';
import * as $ from 'jquery' ;
import { AffectationTachesComponent } from '../affectation-taches/affectation-taches.component';
import { AjoutcommentaireComponent } from '../ajoutcommentaire/ajoutcommentaire.component';
import { MatDialog } from '@angular/material';
import { DialogConfirmService } from 'src/app/services/confirm/dialog-confirm.service';

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
  nomSprint="Backlog produit";
  offset: number =new Date().getTimezoneOffset() * 60 * 1000;
  selectedProjetId:number;
  sprintsProjet:Observable<Sprint[]>;
  sprintsProjetArray: Sprint[] = [];
  selectedProjetSprintsId:number;
  showBPList: boolean = false;
  idEmploye:number;
  showDataOfChildComponent;
  roleE:string;

  constructor(private dialog:MatDialog, private sprintservice:SprintService,private projetservice:ProjetService,
    private formBuilder:FormBuilder,private router:Router,private dialogService:DialogConfirmService) {}

  ngOnInit()  {
    this.roleE=localStorage.getItem('role')

   this.idEmploye=parseInt(localStorage.getItem('id'));
   
      $("#leg2").click(function(){
        $("#tab1").toggle("slide");
      });
      $("#leg3").click(function(){
        $("#tab2").toggle("slide");
      });
    
    
  
this.etatArray=["Non terminé","Terminé"]
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
  this.sprints= this.sprintservice.findAllSprintOrderByProjet();
  this.sprintsProjet =this.sprintservice.findSprintsByProjet(this.selectedProjetSprintsId);
  this.sprintservice.findSprintsByProjet(this.selectedProjetSprintsId).subscribe(
    resp  =>{ this.sprintsProjetArray = resp;
     this.sprintsProjetArray = this.sprintsProjetArray.filter(x=>x.nomSprint!='Backlog produit');
    console.log("*****"+(this.sprintsProjetArray));
    }
  );
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
  this.dialogService.openConfirmDialog('êtes-vous sûr de supprimer cette sprint ?')
  .afterClosed().subscribe(res =>{
  if(res) {
    this.sprintservice.deleteSprint(id)
    .subscribe(
    data=>{
      console.log(data);
     
  
     this.reloadData();
     this.gotoList();
    },
    error=>console.log(error));
    
  }
})}

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

ajoutSprint(){
  this.router.navigate(['ajoutSprint']);
}
onAffect(id){

  const dialogRef=this.dialog.open(AjoutcommentaireComponent,{
  autoFocus:true,
  width:"70%",
  data:{
     idUser:this.idEmploye,
     idSprint:id
   }});
  dialogRef.afterClosed().subscribe(result=> {
    this.showDataOfChildComponent=result;
    console.log("alooo resultat" +result ) 
  })
}
}
