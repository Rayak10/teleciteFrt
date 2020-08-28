import { Component, OnInit } from '@angular/core';
import { Projet } from 'src/app/models/projet';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employe } from 'src/app/models/employe';

@Component({
  selector: 'app-projet-detaille',
  templateUrl: './projet-detaille.component.html',
  styleUrls: ['./projet-detaille.component.css']
})
export class ProjetDetailleComponent implements OnInit {

  id:number;
projet:Projet;
  constructor(private projetservice:ProjetService,private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.projet=new Projet();
    
    this.id=this.route.snapshot.params['id'];
    this.projetservice.findProjetById(this.id)
    .subscribe(data=>{
      console.log(data)
      this.projet=data;
    }, error=>console.log(error));
  }
  detailsProjet(){
    this.projetservice.findProjetById(this.id)
    .subscribe(data=> console.log(data)
    ,error=>console.log(error)),

      this.projet=new Projet();
    
  }

  list(){
    this.router.navigate(['gestionSprints']);
  }

}
