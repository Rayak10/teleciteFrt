import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Projet } from 'src/app/models/projet';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { EquipeService } from 'src/app/services/equipe/equipe.service';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { Userstory } from 'src/app/models/userStory';
import { UserstoryService } from 'src/app/services/userstory/userstory.service';
import { MatTableDataSource } from '@angular/material';
import { UserstoriesProjets } from './elementData';


@Component({
  selector: 'app-affectation-ressources',
  templateUrl: './affectation-ressources.component.html',
  styleUrls: ['./affectation-ressources.component.css']
})
export class AffectationRessourcesComponent implements OnInit {
  projets: Observable<Projet[]>;
  projetArray:Projet[]=[];
  id:number;
  selectedValue:number;
  userstoriesProjet:Observable<Userstory[]>;
  userstoriesProjetArray:Userstory[]=[];
  ELEMENT_DATA:UserstoriesProjets[]=[];
  displayedColumns: string[] = ['libelleUserStory', 'priorite', 'complexite','actions'];
  dataSource = new MatTableDataSource<UserstoriesProjets>(this.ELEMENT_DATA);
  constructor(private userstoryservice:UserstoryService,private projetservice:ProjetService,private employeservice:EmployeService,private equipeservice:EquipeService,private formBuilder: FormBuilder, private router: Router,private httpClient:HttpClient,private route: ActivatedRoute) { }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
    this.projets= this.projetservice.findAllprojetByEmploye(this.id);  
    this.projetservice.findAllprojetByEmploye(this.id).subscribe(
      data => { this.projetArray.push(...data);
      }
    );
  }
  onChangeProjet(event){
    let resp=this.userstoryservice.findAllUserstoryByProjet(this.selectedValue);
    resp.subscribe(x  =>this.dataSource.data = x as UserstoriesProjets[]);
      
    console.log("hhhhhhhhhhheeeeeeeeeeeeeuuuuuuuuuurrr1: "+JSON.stringify(this.dataSource.data ));

      }
   
}      
       

   

  