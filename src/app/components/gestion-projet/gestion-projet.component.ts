import { Component, OnInit } from '@angular/core';
import { Projet } from 'src/app/models/projet';
import { Observable } from 'rxjs';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EquipeService } from 'src/app/services/equipe/equipe.service';
import { Equipe } from 'src/app/models/equipe';

@Component({
  selector: 'app-gestion-projet',
  templateUrl: './gestion-projet.component.html',
  styleUrls: ['./gestion-projet.component.css']
})
export class GestionProjetComponent implements OnInit {
  projet:Projet=new Projet();
  submitted = false;
  projets: Observable<Projet[]>;
  errorMessage: string;
  successMessage: string;
  equipeArray= [];
  selectedEquipeId:number;
equipe:Equipe;
offset: number =new Date().getTimezoneOffset() * 60 * 1000;

  constructor(private projetservice:ProjetService,private equipeservice:EquipeService,private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit() {
    this.equipeservice.findAllEquipe().subscribe(
      data => {console.log("data from find all Equipe:"+JSON.stringify(data));   
      
                  this.equipeArray.push(...data);}
    );
    this.reloadData();
  }
  newProjet(): void {
    this.submitted = false;
    this.projet= new Projet();
  }
  onSubmit() {
    this.submitted = true;
    this.save(); 
       this.reloadData();
       this.gotoList();
  }
  save() {
    console.log("projet: "+JSON.stringify(this.projet));
    this.projet.dateDebut = new Date(new Date(this.projet.dateDebut).getTime() - this.offset);
    this.projet.dateFin = new Date(new Date(this.projet.dateFin).getTime() - this.offset);
    this.projetservice.createProjet(this.projet)
      .subscribe(data => console.log(data), error => console.log(error));
    this.projet= new Projet();
    
   
this.gotoList();
  }  
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
