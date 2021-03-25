import { Component, OnInit } from '@angular/core';
import { TacheService } from 'src/app/services/tache/tache.service';
import { Tache } from 'src/app/models/tache';
import { ActivatedRoute, Router } from '@angular/router';
import { Userstory } from 'src/app/models/userStory';
import { UserstoryService } from 'src/app/services/userstory/userstory.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-tache-update',
  templateUrl: './tache-update.component.html',
  styleUrls: ['./tache-update.component.css']
})
export class TacheUpdateComponent implements OnInit {
  id:number;
  tache:Tache;
  userstory:Userstory;
  sprintArray= [];
  etatArray= [];
  exform:FormGroup; 
  messageS:String="Tâche modifiée avec succèes";
  messageE:String="Modification du tâche storie est échouée";
  constructor(private tacheservice:TacheService,private userstoryservice:UserstoryService,
    private route: ActivatedRoute, private router: Router,private _service: NotificationsService) { }

  ngOnInit() {
    this.exform = new FormGroup({
      'description' : new FormControl(null,Validators.required),
      'etat' : new FormControl(null,Validators.required),
      'dure' : new FormControl(null,[Validators.required, Validators.pattern(/^(1|10|[1-9]\d*)$/)]),
         })
    this.etatArray=["To do","Doing","Done"]
    this.tache=new Tache();
    
    this.id=this.route.snapshot.params['id'];

    this.tacheservice.findTacheById(this.id)
    .subscribe(data=>{
      console.log(data)
      this.tache=data;

      this.userstoryservice.findUserstoryTache(this.id)
      .subscribe(data=>{
        console.log(data)
        this.userstory=data;
      }, error=>console.log(error));
             
      console.log("tache Update: "+JSON.stringify(this.tache))
    }, error=>console.log(error));
    } 
  
    updateTache(){
  this.tacheservice.updateTache(this.id , this.tache )
  .subscribe(data=> this.onSuccess(this.messageS)
  ,error=>this.onErorr(this.messageE));
  
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
onSubmit(){
  this.updateTache();
}
list(id:number){
  this.updateTache();
  this.router.navigate(['gestionTaches/',this.userstory.idUserStory]);
}
userstoryDetails(){
  this.router.navigate(['userstory/details',this.userstory.idUserStory]);
}

}


