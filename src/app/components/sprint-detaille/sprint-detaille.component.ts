import { Component, OnInit } from '@angular/core';
import { Sprint } from 'src/app/models/sprint';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sprint-detaille',
  templateUrl: './sprint-detaille.component.html',
  styleUrls: ['./sprint-detaille.component.css']
})
export class SprintDetailleComponent implements OnInit {

  id:number;
sprint:Sprint;
  constructor(private sprintservice:SprintService,private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.sprint=new Sprint();
    this.id=this.route.snapshot.params['id'];
    this.sprintservice.findSprintById(this.id)
    .subscribe(data=>{
      console.log(data)
      this.sprint=data;
    }, error=>console.log(error));
  
  }
  
  

  list(){
    this.router.navigate(['gestionSprints']);
  }

}
