import { Component, OnInit } from '@angular/core';
import { Userstory } from 'src/app/models/userStory';
import { Observable } from 'rxjs';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { Sprint } from 'src/app/models/sprint';
import { UserstoryService } from 'src/app/services/userstory/userstory.service';

@Component({
  selector: 'app-userstory-update',
  templateUrl: './userstory-update.component.html',
  styleUrls: ['./userstory-update.component.css']
})
export class UserstoryUpdateComponent implements OnInit {
  id:number;
  userstory:Userstory;
  userstorys: Observable<Userstory[]>;
  sprintArray= [];
  etatArray= [];

  constructor(private sprintservice:SprintService,private route: ActivatedRoute, private router: Router,private userstoryservice:UserstoryService) { }
  
  
  ngOnInit() {
    this.userstory=new Userstory();
    
    this.id=this.route.snapshot.params['id'];

    this.userstoryservice.findUserstoryById(this.id)
    .subscribe(data=>{
      console.log(data)
      this.userstory=data;

    this.sprintservice.findAllSprint().subscribe(
      data => {console.log("data from find all sprints:"+JSON.stringify(data));   
      
                  this.sprintArray.push(...data);}
                  );

                 
      console.log("userStoryUpdate: "+JSON.stringify(this.userstory))
    }, error=>console.log(error));
    } 
  
    updateUserStory(){
  this.userstoryservice.updateUserStory(this.id , this.userstory )
  .subscribe(data=> console.log(data),error=>console.log(error)),
  
    this.userstory=new Userstory();
    console.log("aaaaaaaaaaaaaa"+this.userstory)
    this.gotoList();
    this.reloadData();
}
onSubmit(){
  this.updateUserStory();
}
gotoList(){
  this.router.navigate(['gestionUserstory']);
}
reloadData(){
  this.userstorys=this.userstoryservice.findAllUserstory();
}


}