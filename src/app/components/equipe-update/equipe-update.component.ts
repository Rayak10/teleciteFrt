import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Equipe } from 'src/app/models/equipe';
import { Tache } from 'src/app/models/tache';
import { EquipeService } from 'src/app/services/equipe/equipe.service';

@Component({
  selector: 'app-equipe-update',
  templateUrl: './equipe-update.component.html',
  styleUrls: ['./equipe-update.component.css']
})
export class EquipeUpdateComponent implements OnInit {
  id:number;
  equipe:Equipe;
  exform:FormGroup;
  messageS:String="Equipe modifiée avec succèes";
  messageE:String="Modification d'équipe est échouée";
  constructor(private equipeservice:EquipeService,private route: ActivatedRoute, private router: Router, private _service: NotificationsService) { }

  ngOnInit() {
    this.exform = new FormGroup({
      'specialite' : new FormControl(null,Validators.required),
      'nom' : new FormControl(null,Validators.required),
    }) 

    this.equipe=new Equipe();
    
    this.id=this.route.snapshot.params['id'];

    this.equipeservice.findEquipeById(this.id)
    .subscribe(data=>{
      console.log(data)
      this.equipe=data;
    }, error=>console.log(error));
    } 
  
    updateEquipe(){
  this.equipeservice.updateEquipe(this.id , this.equipe)
  .subscribe(data => this.onSuccess(this.messageS));
  console.log("aaaaaaaaaaaaaa"+this.equipe)
   }
onSubmit(){
  this.updateEquipe();
}
list(){
  this.updateEquipe();
  this.router.navigate(['gestionEquipes']);
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


