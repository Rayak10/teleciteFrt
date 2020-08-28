import { Component, OnInit } from '@angular/core';
import { Projet } from 'src/app/models/projet';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EquipeService } from 'src/app/services/equipe/equipe.service';
import {TIME_ZONE_OFFSET} from '../../settings/app.settings';

@Component({
  selector: 'app-projet-update',
  templateUrl: './projet-update.component.html',
  styleUrls: ['./projet-update.component.css']
})
export class ProjetUpdateComponent implements OnInit {
  id:number;
  projet:Projet;
  projets: Observable<Projet[]>;
  equipeArray= [];
 
  offset: number =new Date().getTimezoneOffset() * 60 * 1000;
  constructor(private projetservice:ProjetService,private route: ActivatedRoute, private router: Router,private equipeservice:EquipeService) { }
  
  
  ngOnInit() {
    
    this.projet=new Projet();
    
    this.id=this.route.snapshot.params['id'];

    this.projetservice.findProjetById(this.id)
    .subscribe(data=>{
      console.log(data)
      this.projet=data;
   

    this.equipeservice.findAllEquipe().subscribe(
      data => {console.log("data from find all Equipe:"+JSON.stringify(data));   
      
                  this.equipeArray.push(...data);}
                  );

                  this.projet.dateDebut = new Date(new Date(this.projet.dateDebut));
                  this.projet.dateFin = new Date(new Date(this.projet.dateFin));
            
      console.log("projetUpdate: "+JSON.stringify(this.projet))
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