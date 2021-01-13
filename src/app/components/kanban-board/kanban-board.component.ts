import { CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Tache } from 'src/app/models/tache';
import { Todo } from 'src/app/models/todo';
import { Userstory } from 'src/app/models/userStory';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { EquipeService } from 'src/app/services/equipe/equipe.service';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { TacheService } from 'src/app/services/tache/tache.service';
import { UserstoryService } from 'src/app/services/userstory/userstory.service';
import { AffectationRessourcesComponent } from '../affectation-ressources/affectation-ressources.component';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit {
  recivedRow;
  idEmploye:number;
  userstory:Userstory=new Userstory();
  taches: Observable<Tache[]>;
  todos:Tache[]=[];
  doing:Tache[]=[];
  done:Tache[]=[];
  constructor(private tacheservice:TacheService ,private userstoryservice:UserstoryService,private projetservice:ProjetService,private employeservice:EmployeService,private equipeservice:EquipeService,private formBuilder: FormBuilder, private router: Router,private httpClient:HttpClient,private route: ActivatedRoute,
    public dialogRef:MatDialogRef<AffectationRessourcesComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any){
        this.recivedRow=data;
      }

  ngOnInit() {
    
    this.userstoryservice.findUserstoryById(this.recivedRow.selectedUserStory.idUserStory)
    .subscribe(data=>{
      this.userstory=data;})

      
    //this.taches=this.tacheservice.findAllTacheByUserstory(this.recivedRow.selectedUserStory.idUserStory);
    this.tacheservice.findAllTachesStoriesEtat(this.recivedRow.selectedUserStory.idUserStory,"Todo")
    .subscribe(data=>{
      console.log("tooooooodoooooooooooooo"+JSON.stringify(this.todos));

      this.todos=data;  
      console.log("tooooooodoooooooooooooo"+JSON.stringify(this.todos));
               
    }, error=>console.log(error));  
    this.tacheservice.findAllTachesStoriesEtat(this.recivedRow.selectedUserStory.idUserStory,"Doing")
    .subscribe(data=>{
      this.doing=data;
      
      console.log("dooooooooooingggggggg"+JSON.stringify(this.doing));
                
    }, error=>console.log(error)); 
    this.tacheservice.findAllTachesStoriesEtat(this.recivedRow.selectedUserStory.idUserStory,"Done")
    .subscribe(data=>{
      this.done=data;   
      console.log("dddddddooooooooooneeeeee"+JSON.stringify(this.done));
              
    }, error=>console.log(error)); 
  }
 

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
                        console.log("previousContainer"+JSON.stringify(event.previousContainer.data))
                        console.log("container"+JSON.stringify(event.item.data))

                        console.log("previousIndex"+event.previousIndex)
                        console.log("currentIndex"+ event.currentIndex)
const todo =event.item.data;
todo.etatTache= event.container.element.nativeElement.classList[0]                        
console.log("gggggggggggggggggggggggggg"+ todo.etatTache)
console.log("gggggggggggggggggggggggggg"+ todo.idTache)
   this.tacheservice.updateEtatTacheEmploye( todo.idTache,todo.etatTache,null).subscribe(
                        data=> console.log(data),error=>console.log(error))
 
                         
                       

    }
  }

}
