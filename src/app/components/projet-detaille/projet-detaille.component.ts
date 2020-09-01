import { Component, OnInit } from '@angular/core';
import { Projet } from 'src/app/models/projet';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sprint } from 'src/app/models/sprint';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projet-detaille',
  templateUrl: './projet-detaille.component.html',
  styleUrls: ['./projet-detaille.component.css']
})
export class ProjetDetailleComponent implements OnInit {
  sprints: Observable<Sprint[]>;
  id:number;
projet:Projet;
  constructor(private projetservice:ProjetService,private sprintservice : SprintService,private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.projet=new Projet();
    
    this.id=this.route.snapshot.params['id'];
    this.projetservice.findProjetById(this.id)
    .subscribe(data=>{
      console.log(data)
      this.projet=data;
    }, error=>console.log(error));
    this.reloadData();
  }
  detailsProjet(){
    this.projetservice.findProjetById(this.id)
    .subscribe(data=> console.log(data)
    ,error=>console.log(error)),

      this.projet=new Projet();
    
  }

  list(){
    this.router.navigate(['gestionProjets']);
  }
  reloadData(){
    this.sprints= this.sprintservice.findSprintsByProjet(this.id);

}
updateSprint(id:number){
  this.router.navigate(['sprints/update',id]);
}
deleteSprints(id:number){
  this.sprintservice.deleteSprint(id)
  .subscribe(
  data=>{
    console.log(data);
   

   this.reloadData();
  },
  error=>console.log(error));
  
}
sprintDetails(id:number){
  this.router.navigate(['sprints/details',id]);
}
}