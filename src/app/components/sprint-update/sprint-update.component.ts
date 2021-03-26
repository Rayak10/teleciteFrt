import { Component, OnInit } from '@angular/core';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { Sprint } from 'src/app/models/sprint';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Projet } from 'src/app/models/projet';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-sprint-update',
  templateUrl: './sprint-update.component.html',
  styleUrls: ['./sprint-update.component.css']
})
export class SprintUpdateComponent implements OnInit {
  id:number;
  sprint:Sprint;
  sprints: Observable<Sprint[]>;
  projetArray= [];
  etatArray= [];
  exform:FormGroup;
  offset: number =new Date().getTimezoneOffset() * 60 * 1000;
  messageS:String="Sprint modifié avec succès";
  messageE:String="Modification du sprint est échoué";
  constructor(private sprintservice:SprintService,private route: ActivatedRoute, private router: Router,
    private projetservice:ProjetService,private _service: NotificationsService) { }
  
  ngOnInit() {
    this.exform = new FormGroup({
      'nom' : new FormControl(null,Validators.required),
      'etat' : new FormControl(null,Validators.required),
      'dateDebut' : new FormControl(null,Validators.required),
      'dateFin' : new FormControl(null,Validators.required),
      'description' : new FormControl(null,Validators.required),
      'projet' : new FormControl(null,Validators.required)
    
    })
    this.etatArray=["","Non terminé","Terminé"]
    this.sprint=new Sprint();
    
    this.id=this.route.snapshot.params['id'];

    this.sprintservice.findSprintById(this.id)
    .subscribe(data=>{
      console.log(data)
      this.sprint=data;
    this.projetservice.findAllProjets().subscribe(
      data => {console.log("data from find all projets:"+JSON.stringify(data));   
                  this.projetArray.push(...data);}
                  );
                  this.sprint.dateDebut = new Date(new Date(this.sprint.dateDebut));
                  this.sprint.dateFin = new Date(new Date(this.sprint.dateFin));
    }, error=>console.log(error));
    } 
    
updateSprint(){
  this.sprintservice.updateSprint(this.id , this.sprint )
  .subscribe(data=> this.onSuccess(this.messageS)
  ,error=>this.onErorr(this.messageE));
}

onSubmit(){
  this.updateSprint();
}
gotoList(){
  this.router.navigate(['gestionSprints']);
}
projetDetails(id:number){
  this.updateSprint();

  this.router.navigate(['projets/details',id]);
}
reloadData(){
  this.sprints=this.sprintservice.findAllSprint();
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


}