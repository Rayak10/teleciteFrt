import { Component, OnInit } from '@angular/core';
import { Projet } from 'src/app/models/projet';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EquipeService } from 'src/app/services/equipe/equipe.service';
import {TIME_ZONE_OFFSET} from '../../settings/app.settings';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-projet-update',
  templateUrl: './projet-update.component.html',
  styleUrls: ['./projet-update.component.css']
})
export class ProjetUpdateComponent implements OnInit {
  id:number;
  projet:Projet=new Projet();
  projets: Observable<Projet[]>;
  equipeArray= [];
  roleE:string;
  exform:FormGroup;
  offset: number =new Date().getTimezoneOffset() * 60 * 1000;
  messageS:String="Projet modifié avec succès";
  messageE:String="Modification du projet est échoué";

  constructor(private projetservice:ProjetService,private route: ActivatedRoute, private router: Router,
    private equipeservice:EquipeService,private _service: NotificationsService) {
   }
  
  
  ngOnInit() {

    this.exform = new FormGroup({
      'nom' : new FormControl(null,Validators.required),
      'theme' : new FormControl(null,Validators.required),
      'descriptionG' : new FormControl(null,Validators.required),
      'descriptionT' : new FormControl(null,Validators.required),
      'dateDebut' : new FormControl(null,Validators.required),
      'dateFin' : new FormControl(null,Validators.required),
      'equipe' : new FormControl(null,Validators.required)

    })

    this.roleE=localStorage.getItem('role')

    this.projet=new Projet();
    
    this.id=this.route.snapshot.params['id'];

    this.projetservice.findProjetById(this.id)
    .subscribe(data=>{
      console.log(data)
      this.projet=data;
   

    this.equipeservice.findAllEquipe().subscribe(
      data => {console.log("data from find all Equipe:"+JSON.stringify(data));   
                  this.equipeArray.push(...data);
                }
                 
                  );

                  this.projet.dateDebut = new Date(new Date(this.projet.dateDebut));
                  this.projet.dateFin = new Date(new Date(this.projet.dateFin));
            
      console.log("projetUpdate: "+JSON.stringify(this.projet))
    }, error=>console.log(error));
    } 
  
updateProjet(){
  this.projetservice.updateProjet(this.id , this.projet )
  .subscribe(data=>this.onSuccess(this.messageS)
  ,error=>this.onErorr(this.messageE));
  
  
}
onSubmit(){
  this.updateProjet();
}
gotoList(){
  this.router.navigate(['gestionProjets']);
}
reloadData(){
  this.projets=this.projetservice.findAllProjets();
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