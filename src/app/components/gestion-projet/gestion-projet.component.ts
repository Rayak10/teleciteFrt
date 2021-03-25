import { Component, OnInit } from '@angular/core';
import { Projet } from 'src/app/models/projet';
import { Observable } from 'rxjs';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EquipeService } from 'src/app/services/equipe/equipe.service';
import { Equipe } from 'src/app/models/equipe';
import { MatDialog, MatDialogConfig} from '@angular/material';
import { DialogConfirmService } from 'src/app/services/confirm/dialog-confirm.service';

@Component({
  selector: 'app-gestion-projet',
  templateUrl: './gestion-projet.component.html',
  styleUrls: ['./gestion-projet.component.css']
})
export class GestionProjetComponent implements OnInit {
  projet:Projet=new Projet();
  submitted = false;
  projets: Observable<Projet[]>;
  errorMessage: string;
  successMessage: string;
  equipeArray= [];
  selectedEquipeId:number;
equipe:Equipe;
offset: number =new Date().getTimezoneOffset() * 60 * 1000;
roleE:string;

  constructor(private projetservice:ProjetService,private equipeservice:EquipeService,
    private formBuilder:FormBuilder,private router:Router, private dialogService:DialogConfirmService) { }

  ngOnInit() {
    this.roleE=localStorage.getItem('role')

    this.equipeservice.findAllEquipe().subscribe(
      data => {console.log("data from find all Equipe:"+JSON.stringify(data));   
      
                  this.equipeArray.push(...data);}
    );
    this.reloadData();
  }
 
  
  
reloadData(){
    this.projets= this.projetservice.findAllProjets();

  }
  projetDetails(id:number){
    this.router.navigate(['projets/details',id]);
  }
  updateProjet(id:number){
    this.router.navigate(['projets/update',id]);
  }
  gotoList(){
    this.router.navigate(['gestionProjets']);
  }
  deleteProjet(id:number){
    this.dialogService.openConfirmDialog('êtes-vous sûr de supprimer cet projet?')
    .afterClosed().subscribe(res =>{
    if(res) {
      this.projetservice.deleteProjet(id)
      .subscribe(
      data=>{
        console.log(data);
       
  
       this.reloadData();
       this.gotoList();
      },
      error=>console.log(error));} 
    });
    
  }


  ajoutProjet(){
    this.router.navigate(['ajoutProjet']);
  }
}
