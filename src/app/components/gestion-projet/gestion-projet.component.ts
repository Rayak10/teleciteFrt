import { Component, OnInit } from '@angular/core';
import { Projet } from 'src/app/models/projet';
import { Observable } from 'rxjs';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

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
  constructor(private projetservice:ProjetService,private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit() {
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
    this.projetservice.createProjet(this.projet)
      .subscribe(data => console.log(data), error => console.log(error));
    this.projet= new Projet();
this.gotoList();
  }
  reloadData(){
    this.projets= this.projetservice.findAllProjets();
    
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
}
