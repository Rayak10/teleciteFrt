import { Component, OnInit } from '@angular/core';
import { Projet } from 'src/app/models/projet';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projet-update',
  templateUrl: './projet-update.component.html',
  styleUrls: ['./projet-update.component.css']
})
export class ProjetUpdateComponent implements OnInit {
  id:number;
  projet:Projet;
  projets: Observable<Projet[]>;
  constructor(private projetservice:ProjetService,private route: ActivatedRoute, private router: Router) { }
  

  ngOnInit() {
    
    this.projet=new Projet();
    
    this.id=this.route.snapshot.params['id'];

    this.projetservice.findProjetById(this.id)
    .subscribe(data=>{
      console.log(data)
      this.projet=data;
    }, error=>console.log(error));
    
  }

updateProjet(){
  this.projetservice.updateProjet(this.id , this.projet )
  .subscribe(data=> console.log(data),error=>console.log(error)),
  
    this.projet=new Projet();
    
    this.gotoList();
    this.reloadData();
}
onSubmit(){
  this.updateProjet();
}
gotoList(){
  this.router.navigate(['gestionProjets']);
}
reloadData(){
  this.projets=this.projetservice.findAllProjets();
}

}