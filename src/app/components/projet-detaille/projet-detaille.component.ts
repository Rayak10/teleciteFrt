import { Component, OnInit } from '@angular/core';
import { Projet } from 'src/app/models/projet';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sprint } from 'src/app/models/sprint';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { Observable } from 'rxjs';
import { DialogConfirmService } from 'src/app/services/confirm/dialog-confirm.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-projet-detaille',
  templateUrl: './projet-detaille.component.html',
  styleUrls: ['./projet-detaille.component.css']
})
export class ProjetDetailleComponent implements OnInit {
  sprints: Observable<Sprint[]>;
  id:number;
projet:Projet;
roleE:string;

  constructor(private projetservice:ProjetService,private sprintservice : SprintService,
    private route: ActivatedRoute, private router: Router, private dialogService:DialogConfirmService) {}

  ngOnInit() {
    this.roleE=localStorage.getItem('role')

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
  this.dialogService.openConfirmDialog('êtes-vous sûr de supprimer cet projet?')
  .afterClosed().subscribe(res =>{
  if(res) {
    this.sprintservice.deleteSprint(id)
    .subscribe(
    data=>{
      console.log(data);
     
  
     this.reloadData();
    },
    error=>console.log(error));} 
  });
  
}
sprintDetails(id:number){
  this.router.navigate(['sprints/details',id]);
}
}