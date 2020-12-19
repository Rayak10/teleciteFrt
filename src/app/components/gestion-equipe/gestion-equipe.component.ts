import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Equipe } from 'src/app/models/equipe';
import { Projet } from 'src/app/models/projet';
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

  equipeArray= [];


  constructor(private equipeservice:EquipeService,private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit() {
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
      .subscribe(data => console.log(data), error => console.log(error));
    this.equipe= new Equipe();
    
   
this.gotoList();
  }  
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
    this.equipeservice.deleteEquipe(id)
    .subscribe(
    data=>{
      console.log(data);
     

     this.reloadData();
     this.gotoList();
    },
    error=>console.log(error));
    
  }
 
}
