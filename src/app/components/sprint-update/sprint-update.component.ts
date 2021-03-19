import { Component, OnInit } from '@angular/core';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { Sprint } from 'src/app/models/sprint';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Projet } from 'src/app/models/projet';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-sprint-update',
  templateUrl: './sprint-update.component.html',
  styleUrls: ['./sprint-update.component.css']
})
export class SprintUpdateComponent implements OnInit {
  id:number;
  sprint:Sprint;
  sprints: Observable<Sprint[]>;
  projetArray= [];
  etatArray= [];
  exform:FormGroup;
  offset: number =new Date().getTimezoneOffset() * 60 * 1000;
  constructor(private sprintservice:SprintService,private route: ActivatedRoute, private router: Router,private projetservice:ProjetService) { }
  
  ngOnInit() {
    this.exform = new FormGroup({
      'nom' : new FormControl(null,Validators.required),
      'etat' : new FormControl(null,Validators.required),
      'dateDebut' : new FormControl(null,Validators.required),
      'dateFin' : new FormControl(null,Validators.required),
      'description' : new FormControl(null,Validators.required),
      'projet' : new FormControl(null,Validators.required)
    
    })
    this.etatArray=["","Non terminé","Terminé"]
    this.sprint=new Sprint();
    
    this.id=this.route.snapshot.params['id'];

    this.sprintservice.findSprintById(this.id)
    .subscribe(data=>{
      console.log(data)
      this.sprint=data;
   

    this.projetservice.findAllProjets().subscribe(
      data => {console.log("data from find all projets:"+JSON.stringify(data));   
      
                  this.projetArray.push(...data);}
                  );

                  this.sprint.dateDebut = new Date(new Date(this.sprint.dateDebut));
                  this.sprint.dateFin = new Date(new Date(this.sprint.dateFin));
            
      console.log("projetUpdate: "+JSON.stringify(this.sprint))
    }, error=>console.log(error));
    } 
  
updateSprint(){
  this.sprintservice.updateSprint(this.id , this.sprint )
  .subscribe(data=> console.log(data),error=>console.log(error)),
  
    this.sprint=new Sprint();
  
    this.reloadData();
}
onSubmit(){
  this.updateSprint();
}
gotoList(){
  this.updateSprint();
  this.router.navigate(['gestionSprints']);
}
projetDetails(id:number){
  this.updateSprint();

  this.router.navigate(['projets/details',id]);
}
reloadData(){
  this.sprints=this.sprintservice.findAllSprint();
}


}