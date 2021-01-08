import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Projet } from 'src/app/models/projet';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { EquipeService } from 'src/app/services/equipe/equipe.service';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { Userstory } from 'src/app/models/userStory';
import { UserstoryService } from 'src/app/services/userstory/userstory.service';
import { MatDialogModule, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserstoriesProjets } from './elementData';
import { MatDialog, MatDialogConfig} from '@angular/material';
import { GestionTacheComponent } from '../gestion-tache/gestion-tache.component';
import { GestionComptesComponent } from '../gestion-comptes/gestion-comptes.component';
import { AffectationTachesComponent } from '../affectation-taches/affectation-taches.component';
import { Equipe } from 'src/app/models/equipe';


@Component({
  selector: 'app-affectation-ressources',
  templateUrl: './affectation-ressources.component.html',
  styleUrls: ['./affectation-ressources.component.css']
})
export class AffectationRessourcesComponent implements OnInit {
  selectedRow;
  projets: Observable<Projet[]>;
  projetArray:Projet[]=[];
  id:number;
  idEquipe:number;
  userStory:Observable<Userstory>;
  equipe:Equipe=new Equipe();
  selectedValue:number;
  userstoriesProjet:Observable<Userstory[]>;
  userstoriesProjetArray:Userstory[]=[];
  ELEMENT_DATA:UserstoriesProjets[]=[];
  displayedColumns: string[] = ['libelleUserStory', 'priorite', 'complexite','actions'];
  @ViewChild(MatSort ,{ static: true } ) sort:MatSort;
  @ViewChild(MatPaginator ,{ static: true } ) paginator:MatPaginator;
  
  dataSource = new MatTableDataSource<UserstoriesProjets>(this.ELEMENT_DATA);
  test:boolean=false;
  searchKey:string;
  constructor(private dialog:MatDialog,private userstoryservice:UserstoryService,private projetservice:ProjetService,private employeservice:EmployeService,private equipeservice:EquipeService,private formBuilder: FormBuilder, private router: Router,private httpClient:HttpClient,private route: ActivatedRoute) { }
showDataOfChildComponent;
  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
    this.equipeservice.findEmployeEquipe(this.id).subscribe(
      data => { this.equipe= data});
      
    this.projets= this.projetservice.findAllprojetByEmploye(this.id);  
    this.projetservice.findAllprojetByEmploye(this.id).subscribe(
      data => { this.projetArray.push(...data);
      }
    );
  }
  onChangeProjet(event){
    let resp=this.userstoryservice.findAllUserstoryByProjet(this.selectedValue);
    resp.subscribe(x  =>this.dataSource.data = x as UserstoriesProjets[]);
    
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;

    this.test=true;

      }
onRowCliked(row){
  this.selectedRow=row;
  console.log("hhhhh"+this.selectedRow)
}

      onSearchClear (){

        this.searchKey="";
        this.applyFilter();
      }
      applyFilter(){

        this.dataSource.filter=this.searchKey.trim().toLowerCase();
      }
      onAffect(row){
        console.log(JSON.stringify(this.equipe)+'lllllolo');
        const dialogRef=this.dialog.open(AffectationTachesComponent,{
        
          autoFocus:true,
        width:"75%",
         data:{
           equipeProjer:this.equipe,
           selectedUserStory:row


         }
        }
        );
       
        
        dialogRef.afterClosed().subscribe(result=> {
          this.showDataOfChildComponent=result;
          console.log("alooo resultat" +result ) 
        })


      }
}      
       

   

  