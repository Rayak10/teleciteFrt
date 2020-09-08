import { Component, OnInit } from '@angular/core';
import { Sprint } from 'src/app/models/sprint';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Userstory } from 'src/app/models/userStory';
import { Observable } from 'rxjs';
import { UserstoryService } from 'src/app/services/userstory/userstory.service';

@Component({
  selector: 'app-sprint-detaille',
  templateUrl: './sprint-detaille.component.html',
  styleUrls: ['./sprint-detaille.component.css']
})
export class SprintDetailleComponent implements OnInit {
  userstorys: Observable<Userstory[]>;
  id:number;
sprint:Sprint;
  constructor(private sprintservice:SprintService,private route: ActivatedRoute, private router: Router,private userstoryservice:UserstoryService) {}

  ngOnInit() {

    this.sprint=new Sprint();
    this.id=this.route.snapshot.params['id'];
    this.sprintservice.findSprintById(this.id)
    .subscribe(data=>{
      console.log(data)
      this.sprint=data;
    }, error=>console.log(error));
  
    this.reloadData();

  }
  
  
  projetDetails(id:number){
  
    this.router.navigate(['projets/details',id]);
  }
  list(){
    this.router.navigate(['gestionSprints']);
  }

  reloadData(){
    this.userstorys=this.userstoryservice.findAllStoriessprint(this.id);

}

}
