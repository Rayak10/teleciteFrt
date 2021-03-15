import { Component, OnInit } from '@angular/core';
import { Userstory } from 'src/app/models/userStory';
import { UserstoryService } from 'src/app/services/userstory/userstory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sprint } from 'src/app/models/sprint';
import { Observable } from 'rxjs';
import { Tache } from 'src/app/models/tache';
import { TacheService } from 'src/app/services/tache/tache.service';

@Component({
  selector: 'app-userstory-detaille',
  templateUrl: './userstory-detaille.component.html',
  styleUrls: ['./userstory-detaille.component.css']
})
export class UserstoryDetailleComponent implements OnInit {

  id:number;
userstory:Userstory;
taches: Observable<Tache[]>;
roleE:String
  constructor(private userstoryservice:UserstoryService,private tacheservice:TacheService,private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.roleE=localStorage.getItem('role')
    this.userstory=new Userstory();
    this.id=this.route.snapshot.params['id'];
    this.userstoryservice.findUserstoryById(this.id)
    .subscribe(data=>{
      console.log(data)
      this.userstory=data;
    }, error=>console.log(error));
    this.taches= this.tacheservice.findAllTacheByUserstory(this.id); 
  }
  sprintDetails(id:number){
  
    this.router.navigate(['sprints/details',id]);
  }
  
  userstoryDetails(id:number){
  
    this.router.navigate(['userstory/details',id]);
  }
  list(){
    this.router.navigate(['gestionUserstory']);
  }
  tacheDetails(id:number){
    this.router.navigate(['taches/details',id]);
  }
  updateTache(id:number){
    this.router.navigate(['taches/update',id]);
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
  
  
  reloadData(){
    this.taches= this.tacheservice.findAllTacheByUserstory(this.id);  
  }
}
