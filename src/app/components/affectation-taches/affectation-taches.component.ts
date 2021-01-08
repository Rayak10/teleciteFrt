import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSort, MatPaginator, MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Employe } from 'src/app/models/employe';
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
          console.log("ffffffffffff"+JSON.stringify(this.employeArray))
        }
      );

    let resp=this.tacheservice.findAllTacheByUserstory(this.recivedRow.selectedUserStory.idUserStory);
   
   
  resp.subscribe(x  =>this.dataSource.data = x as TachesUserStory[]);


    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  
  }
  }



