import { Component, OnInit } from '@angular/core';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EquipeService } from 'src/app/services/equipe/equipe.service';
import { Equipe } from 'src/app/models/equipe';
import { Observable } from 'rxjs';
import { Projet } from 'src/app/models/projet';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-ajout-projet',
  templateUrl: './ajout-projet.component.html',
  styleUrls: ['./ajout-projet.component.css']
})
export class AjoutProjetComponent implements OnInit {
  projet:Projet=new Projet();
  submitted = false;
  projets: Observable<Projet[]>;
  errorMessage: string;
  successMessage: string;
  equipeArray= [];
  selectedEquipeId:number;
  equipe:Equipe;
  offset: number =new Date().getTimezoneOffset() * 60 * 1000;
  exform:FormGroup;
  messageS:String="Projet ajouté avec succès";
  messageE:String="Ajout du projet est échoué";

  constructor(private projetservice:ProjetService,private equipeservice:EquipeService,
    private formBuilder:FormBuilder,private router:Router, private _service: NotificationsService) { }


  ngOnInit() {
this.exform = new FormGroup({
  'nom' : new FormControl(null,Validators.required),
  'theme' : new FormControl(null,Validators.required),
  'descriptionG' : new FormControl(null,Validators.required),
  'descriptionT' : new FormControl(null,Validators.required),
  'dateDebut' : new FormControl(null,Validators.required),
  'dateFin' : new FormControl(null,Validators.required)
})

 

    this.equipeservice.findEquipeByNom("Équipe non affectée").subscribe(
      data=>{
        this.equipe=data
      }
          );
    this.equipeservice.findAllEquipe().subscribe(
      data => {  
                  this.equipeArray.push(...data);}
    );
    this.reloadData();
  }
  newProjet(): void {
    this.submitted = false;
    this.projet= new Projet();
  }
  onSubmit(gestProjet:NgForm) {
    this.submitted = true;
    this.save(); 
    gestProjet.reset();

       this.reloadData();
  }
  save() { 
    this.projet.dateDebut = new Date(new Date(this.projet.dateDebut).getTime() - this.offset);
    this.projet.dateFin = new Date(new Date(this.projet.dateFin).getTime() - this.offset);
    this.projet.equipe=this.equipe;
    this.projetservice.createProjet(this.projet)
      .subscribe(data => this.onSuccess(this.messageS)
      , error => this.onErorr(this.messageE));
    this.projet= new Projet();
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
    this.projets= this.projetservice.findAllProjets();
    console.log("projetsssssssssssssssssssssssssssssss: "+JSON.stringify(this.projets));

  }
  projetDetails(id:number){
    this.router.navigate(['projets/details',id]);
  }
  updateProjet(id:number){
    this.router.navigate(['projets/update',id]);
  }
  gotoList(){
    this.router.navigate(['gestionProjets']);
  }
  deleteProjet(id:number){
    this.projetservice.deleteProjet(id)
    .subscribe(
    data=>{
      console.log(data);
     

     this.reloadData();
     this.gotoList();
    },
    error=>console.log(error));
    
  }
  onChangeEquipe(event){
   
    this.projet.equipe = {idEquipe:this.selectedEquipeId,nomEquipe:'',specialite:''};
    console.log(JSON.stringify(this.projet.equipe.idEquipe));  
  }
}
