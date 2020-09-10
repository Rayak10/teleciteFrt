import { Component, OnInit } from '@angular/core';
import { Tache } from 'src/app/models/tache';
import { TacheService } from 'src/app/services/tache/tache.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserstoryService } from 'src/app/services/userstory/userstory.service';
import { Userstory } from 'src/app/models/userStory';

@Component({
  selector: 'app-tache-detaille',
  templateUrl: './tache-detaille.component.html',
  styleUrls: ['./tache-detaille.component.css']
})
export class TacheDetailleComponent implements OnInit {
  id:number;
  id2:number;
  userstory:Userstory;
  tache:Tache;

    constructor(private tacheservice:TacheService,private userstoryservice:UserstoryService,private route: ActivatedRoute, private router: Router) {}
  
    ngOnInit() {

      this.tache=new Tache();
      this.id=this.route.snapshot.params['id'];
      console.log("iiiiiidddddddddddddddd: "+JSON.stringify(this.id));

      this.tacheservice.findTacheById(this.id)
      .subscribe(data=>{
        console.log(data)
        this.tache=data;
      }, error=>console.log(error));
    
      this.userstoryservice.findUserstoryTache(this.id)
      .subscribe(data=>{
        console.log(data)
        this.userstory=data;
      }, error=>console.log(error));
    
    }
    
    
    
    list(id:number){
      this.router.navigate(['gestionTaches/',this.userstory.idUserStory]);
    }
    userstoryDetails(){
      this.router.navigate(['userstory/details',this.userstory.idUserStory]);
    }
  }
  