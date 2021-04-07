import { Component, OnInit } from '@angular/core';
import { Tache } from 'src/app/models/tache';
import { Observable } from 'rxjs';
import { Projet } from 'src/app/models/projet';
import { Sprint } from 'src/app/models/sprint';
import { UserstoryService } from 'src/app/services/userstory/userstory.service';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
import { Userstory } from 'src/app/models/userStory';
import { TacheService } from 'src/app/services/tache/tache.service';
import { switchMap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { DialogConfirmService } from 'src/app/services/confirm/dialog-confirm.service';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-gestion-tache',
  templateUrl: './gestion-tache.component.html',
  styleUrls: ['./gestion-tache.component.css']
})
export class GestionTacheComponent implements OnInit {
  submitted = false;
  taches: Observable<Tache[]>;
  errorMessage: string;
  successMessage: string;
  etatArray= [];
  tache:Tache=new Tache();
  userstorie:Userstory=new Userstory();
  userstory:Userstory=new Userstory();
  id:number;
  tacheArray= [];
  exform:FormGroup;
  messageS:String="Tâche ajoutée avec succèes";
  messageE:String="Ajout du tâche est échouée";
  constructor(private userstoryservice:UserstoryService,private tacheservice:TacheService,
    private sprintservice:SprintService,private route: ActivatedRoute,private formBuilder:FormBuilder,
    private router:Router,private dialogService:DialogConfirmService, private _service: NotificationsService) { }

  ngOnInit() {
    this.exform = new FormGroup({
      'description' : new FormControl(null,Validators.required),
      'dure' : new FormControl(null,[Validators.required, Validators.pattern(/^(1|10|[1-9]\d*)$/)]),
      'etat' : new FormControl(),
         })
      this.id=this.route.snapshot.params['id'];
      this.userstoryservice.findUserstoryById(this.id).subscribe(
        resp=>{this.userstorie = resp},
        error => alert('problem!!!')

      )
    this.etatArray=["","To do","Doing","Done"]
    this.userstoryservice.findUserstoryById(this.id).subscribe(
      response =>{
        this.tache.userStory = response;
      },
      error => alert('problem!!!')
    );
  
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
    
newTache(): void {
  this.submitted = false;
  this.tache= new Tache();
}
onSubmit(tacheForm:NgForm) {
  this.submitted = true;
  this.save(); 
  tacheForm.reset();
     this.reloadData();
}
save() {
  
  this.tacheservice.createTache(this.tache)
  .subscribe(data => console.log(data), error => console.log(error)); 
    if(this.tache.idEmploye==null){
      this.onSuccess(this.messageS)
    }
    else
    this.onErorr(this.messageE)
    

}  
reloadData(){
  this.taches= this.tacheservice.findAllTacheByUserstory(this.id);  
}
tacheDetails(id:number){
  this.router.navigate(['taches/details',id]);
}
updateTache(id:number){
  this.router.navigate(['taches/update',id]);
}
gotoList(){
  this.router.navigate(['gestionUserstory']);
}
deleteTache(id:number){

  this.dialogService.openConfirmDialog('êtes-vous sûr de supprimer cette tâche ?')
    .afterClosed().subscribe(res =>{
    if(res) {
      this.tacheservice.deleteTache(id)
  .subscribe(
  data=>{
    console.log(data);
   

   this.reloadData();
   //this.gotoList();
  },
  error=>console.log(error));
  


      
    
      
    }
  })}


 


}


