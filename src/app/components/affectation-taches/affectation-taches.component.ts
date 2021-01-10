import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSort, MatPaginator, MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Employe } from 'src/app/models/employe';
import { Tache } from 'src/app/models/tache';
import { Userstory } from 'src/app/models/userStory';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { EquipeService } from 'src/app/services/equipe/equipe.service';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { TacheService } from 'src/app/services/tache/tache.service';
import { UserstoryService } from 'src/app/services/userstory/userstory.service';
import { AffectationRessourcesComponent } from '../affectation-ressources/affectation-ressources.component';
import { UserstoriesProjets } from '../affectation-ressources/elementData';
import { TachesUserStory } from './elementTache';
   

@Component({
  selector: 'app-affectation-taches',
  templateUrl: './affectation-taches.component.html',
  styleUrls: ['./affectation-taches.component.css']
})
export class AffectationTachesComponent implements OnInit {
 recivedRow;
 employeArray:Employe[]=[];
tache:Tache=new Tache();
  id:number;
  userstory:Userstory=new Userstory();

  displayedColumns: string[] = ['descriptionTache', 'dureeTache', 'etatTache','actions'];
  @ViewChild(MatSort ,{ static: true } ) sort:MatSort;
  @ViewChild(MatPaginator ,{ static: true } ) paginator:MatPaginator;


  ELEMENT_DATA:TachesUserStory[]=[];

  dataSource = new MatTableDataSource<TachesUserStory>(this.ELEMENT_DATA);

  constructor(private tacheservice:TacheService ,private userstoryservice:UserstoryService,private projetservice:ProjetService,private employeservice:EmployeService,private equipeservice:EquipeService,private formBuilder: FormBuilder, private router: Router,private httpClient:HttpClient,private route: ActivatedRoute,
  public dialogRef:MatDialogRef<AffectationRessourcesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.recivedRow=data;
    }


  ngOnInit() {


    this.userstoryservice.findUserstoryById(this.recivedRow.selectedUserStory.idUserStory)
    .subscribe(data=>{
      this.userstory=data;})
      console.log(JSON.stringify(this.recivedRow.equipeProjer)+'lllllolo');
      this.employeservice.findAllEmployesEquipe(this.recivedRow.equipeProjer.idEquipe).subscribe(
        data => { this.employeArray.push(...data);
        }
      );

    let resp=this.tacheservice.findAllTacheByUserstory(this.recivedRow.selectedUserStory.idUserStory);
   
   
  resp.subscribe(x  =>{
    this.dataSource.data =[];
    this.dataSource.data = x.map(tache => {return {
      idTache:tache.idTache,
      descriptionTache : tache.descriptionTache,
      etatTache: tache.etatTache,
      dureeTache:tache.dureeTache,
      dateDebut:tache.dateDebut,
      dateFin :tache.dateFin,
      idEmploye: (tache.employe == null) ? null : tache.employe.idEmploye,
    }  }) as TachesUserStory[];
      

  });


    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  
  }
  onChangeProjet(event, idTache){
    this.tacheservice.findTacheById(idTache)
    .subscribe(data=>{
      this.tache=data;                 
      console.log("tache : "+JSON.stringify(this.tache))
    }, error=>console.log(error));  
    this.tacheservice.updateTacheEmploye(idTache,event.value).subscribe(
      data=> console.log(data),error=>console.log(error))
 
  }
  }



