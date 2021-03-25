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
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DialogConfirmService } from 'src/app/services/confirm/dialog-confirm.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-gestion-userstory',
  templateUrl: './gestion-userstory.component.html',
  styleUrls: ['./gestion-userstory.component.css']
})
export class GestionUserstoryComponent implements OnInit {
  exform:FormGroup;
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
  roleE:String;
  messageS:String="User storie ajoutée avec succèes";
  messageE:String="Ajout du user storie est échouée";
  constructor(private userstoryservice:UserstoryService,private projetservice:ProjetService,
    private sprintservice:SprintService,private formBuilder:FormBuilder,private router:Router,
    private dialogService:DialogConfirmService, private _service: NotificationsService) { 
    this.val=this.selectedProjetId;

  }

  ngOnInit() {
    this.exform = new FormGroup({
      'projet' : new FormControl(null,Validators.required),
      'userStory' : new FormControl(null,Validators.required),
      'priorite' : new FormControl(null,Validators.required),
      'complexite' : new FormControl(null,Validators.required),
    
    })
    this.roleE=localStorage.getItem('role')
    this.prioriteArray=[
      {Id:1,name:"Must have"},
      {Id:2,name:"Should have"},
      {Id:3,name:"Could have"},
      {Id:4,name:"Won't have"}];

this.complexiteArray=[1,2,3,5,8,13,20,40,100]
this.projetservice.findAllProjets().subscribe(
  data => {console.log("data from find all projets:"+JSON.stringify(data));   
              this.projetArray.push(...data);}
);}
    
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
    .subscribe(data =>this.onSuccess(this.messageS), error => this.onErorr(this.messageE));
    
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


  this.dialogService.openConfirmDialog('êtes-vous sûr de supprimer cette user storie?')
  .afterClosed().subscribe(res =>{
  if(res) {
    this.userstoryservice.deleteUserStory(id)
    .subscribe(
    data=>{
      console.log(data);
     
  
     this.reloadData();
     this.gotoList();
    },
    error=>console.log(error));
    
  
    
  }
})}


  


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


