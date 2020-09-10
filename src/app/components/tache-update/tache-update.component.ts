import { Component, OnInit } from '@angular/core';
import { TacheService } from 'src/app/services/tache/tache.service';
import { Tache } from 'src/app/models/tache';
import { ActivatedRoute, Router } from '@angular/router';
import { Userstory } from 'src/app/models/userStory';
import { UserstoryService } from 'src/app/services/userstory/userstory.service';

@Component({
  selector: 'app-tache-update',
  templateUrl: './tache-update.component.html',
  styleUrls: ['./tache-update.component.css']
})
export class TacheUpdateComponent implements OnInit {
  id:number;
  tache:Tache;
  userstory:Userstory;
  sprintArray= [];
  etatArray= [];
  constructor(private tacheservice:TacheService,private userstoryservice:UserstoryService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.etatArray=["To do","Doing","Done"]
    this.tache=new Tache();
    
    this.id=this.route.snapshot.params['id'];

    this.tacheservice.findTacheById(this.id)
    .subscribe(data=>{
      console.log(data)
      this.tache=data;

      this.userstoryservice.findUserstoryTache(this.id)
      .subscribe(data=>{
        console.log(data)
        this.userstory=data;
      }, error=>console.log(error));
    
    /*this.sprintservice.findAllSprint().subscribe(
      data => {console.log("data from find all sprints:"+JSON.stringify(data));   
      
                  this.sprintArray.push(...data);}
                  );*/

                 
      console.log("tache Update: "+JSON.stringify(this.tache))
    }, error=>console.log(error));
    } 
  
    updateTache(){
  this.tacheservice.updateTache(this.id , this.tache )
  .subscribe(data=> console.log(data),error=>console.log(error)),
  
   // this.userstory=new Userstory();
    console.log("aaaaaaaaaaaaaa"+this.tache)
   
}
onSubmit(){
  this.updateTache();
}
list(id:number){
  this.updateTache();
  this.router.navigate(['gestionTaches/',this.userstory.idUserStory]);
}
userstoryDetails(){
  this.router.navigate(['userstory/details',this.userstory.idUserStory]);
}

}


