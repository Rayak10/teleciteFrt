import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs';
import { Equipe } from 'src/app/models/equipe';
import { Projet } from 'src/app/models/projet';
import { DialogConfirmService } from 'src/app/services/confirm/dialog-confirm.service';
import { EquipeService } from 'src/app/services/equipe/equipe.service';

@Component({
  selector: 'app-gestion-equipe',
  templateUrl: './gestion-equipe.component.html',
  styleUrls: ['./gestion-equipe.component.css']
})
export class GestionEquipeComponent implements OnInit {
  equipe:Equipe=new Equipe();
  submitted = false;
  errorMessage: string;
  successMessage: string;
  equipes: Observable<Equipe[]>;
  exform:FormGroup;
  equipeArray= [];
  messageS:String="Equipe ajoutée avec succèes";
  messageE:String="Ajout d'équipe est échouée";

  constructor(private equipeservice:EquipeService,private formBuilder:FormBuilder,
    private router:Router,private dialogService:DialogConfirmService, private _service: NotificationsService) { }

  ngOnInit() {

    this.exform = new FormGroup({
     
      'specialite' : new FormControl(null,Validators.required),
      'nom' : new FormControl(null,Validators.required),
      
    })
    this.equipeservice.findAllEquipe().subscribe(
      data => {console.log("data from find all Equipe:"+JSON.stringify(data));   
      
                  this.equipeArray.push(...data);}
    );
    this.reloadData();
  }
  newEquipe(): void {
    this.submitted = false;
    this.equipe= new Equipe();
  }
  onSubmit(gestEquipe:NgForm) {
    this.submitted = true;
    this.save(); 
    gestEquipe.reset();

       this.reloadData();
       this.gotoList();
  }
  save() {
    console.log("equipe: "+JSON.stringify(this.equipe));
    this.equipeservice.createEquipe(this.equipe)
    .subscribe(data => this.onSuccess(this.messageS))
    this.equipe= new Equipe();
    
   
this.gotoList();
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
reloadData(){
    this.equipes= this.equipeservice.findAllEquipe();
    console.log("projetsssssssssssssssssssssssssssssss: "+JSON.stringify(this.equipes));

  }
  EquipeDetails(id:number){
    this.router.navigate(['equipes/details',id]);
  }
  updateEquipe(id:number){
    this.router.navigate(['equipes/update',id]);
  }
  gotoList(){
    this.router.navigate(['gestionEquipes']);
  }
  deleteEquipe(id:number){
    this.dialogService.openConfirmDialog('êtes-vous sûr de supprimer cette équipe?')
    .afterClosed().subscribe(res =>{
    if(res) {
      this.equipeservice.deleteEquipe(id)
      .subscribe(
      data=>{
        console.log(data);
       
  
       this.reloadData();
       this.gotoList();
      },
      error=>console.log(error));
      
    }
})}
}