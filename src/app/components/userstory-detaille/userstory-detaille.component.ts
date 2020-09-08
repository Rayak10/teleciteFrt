import { Component, OnInit } from '@angular/core';
import { Userstory } from 'src/app/models/userStory';
import { UserstoryService } from 'src/app/services/userstory/userstory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sprint } from 'src/app/models/sprint';

@Component({
  selector: 'app-userstory-detaille',
  templateUrl: './userstory-detaille.component.html',
  styleUrls: ['./userstory-detaille.component.css']
})
export class UserstoryDetailleComponent implements OnInit {

  id:number;
userstory:Userstory;
  constructor(private userstoryservice:UserstoryService,private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.userstory=new Userstory();
    this.id=this.route.snapshot.params['id'];
    this.userstoryservice.findUserstoryById(this.id)
    .subscribe(data=>{
      console.log(data)
      this.userstory=data;
    }, error=>console.log(error));
  
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

}
