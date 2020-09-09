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
  userstory:Userstory=new Userstory();
  id:number;
  tacheArray= [];

  constructor(private userstoryservice:UserstoryService,private tacheservice:TacheService,private sprintservice:SprintService,private route: ActivatedRoute,private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit() {

      this.id=this.route.snapshot.params['id'];

      console.log("iiiiiidddddddddddddddd: "+JSON.stringify(this.id));

    this.etatArray=["To do","Doing","Done"]
    this.userstoryservice.findUserstoryById(this.id).subscribe(
      response =>{
        this.tache.userStory = response;
      },
      error => alert('problem!!!')
    );
  //  this.tacheservice.findAllTacheByUserstory(this.id).subscribe(
    //  data => {console.log("data from find all taches:"+JSON.stringify(data));   
      //            this.tacheArray.push(...data);}
    //);
    this.reloadData();
      
//this.taches=this.userstoryservice.findUserstoryById();
//this.reloadData();
}
    
newTache(): void {
  this.submitted = false;
  this.tache= new Tache();
}
onSubmit(tacheForm:NgForm) {
  this.submitted = true;
  this.save(); 
  tacheForm.reset();
     this.reloadData();
     //this.gotoList();
}
save() {
  
  console.log("tache: "+JSON.stringify(this.tache));
 
  this.tacheservice.createTache(this.tache)
    .subscribe(data => console.log(data), error => console.log(error));
    
 // this.tache= new Tache();
  
 
//this.gotoList();
}  
reloadData(){
  this.taches= this.tacheservice.findAllTacheByUserstory(this.id);  
}
tacheDetails(id:number){
  this.router.navigate(['taches/details',id]);
}
updateUserstory(id:number){
  this.router.navigate(['userstory/update',id]);
}
gotoList(){
  this.router.navigate(['gestionUserstory']);
}
deleteTache(id:number){
  this.tacheservice.deleteTache(id)
  .subscribe(
  data=>{
    console.log(data);
   

   this.reloadData();
   //this.gotoList();
  },
  error=>console.log(error));
  
}



}


