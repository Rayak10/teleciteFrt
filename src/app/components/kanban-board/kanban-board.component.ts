import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Projet } from 'src/app/models/projet';
import { Sprint } from 'src/app/models/sprint';
import { Tache } from 'src/app/models/tache';
import { Userstory } from 'src/app/models/userStory';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { EquipeService } from 'src/app/services/equipe/equipe.service';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { TacheService } from 'src/app/services/tache/tache.service';
import { UserstoryService } from 'src/app/services/userstory/userstory.service';
import { UserstoriesProjets } from '../affectation-ressources/elementData';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit {
  recivedRow;
  idEmploye:number;
  idProjet:number;
  projet:Observable<Projet>;
  sprints:Sprint[]=[]
  sprintBL:Sprint=new Sprint();
  userstory:Userstory=new Userstory();
  taches: Observable<Tache[]>;
  products:Userstory[]=[];
  todos:Tache[]=[];
  doing:Tache[]=[];
  done:Tache[]=[];
  sprintBacklog:Userstory[]=[];
  sprintBacklogChek:Userstory[]=[];
  displayedColumns: string[] = ['libelleUserStory'];
  searchKey:string;
  idSprintBl:number;
  sprintArray= [];
  sprintchek=[];
selectedSprintId:number;
  ELEMENT_DATA:UserstoriesProjets[]=[];
  dataSource = new MatTableDataSource<UserstoriesProjets>(this.ELEMENT_DATA);
  @ViewChild(MatSort ,{ static: true } ) sort:MatSort;
  @ViewChild(MatPaginator ,{ static: true } ) paginator:MatPaginator;
  test:boolean=false;
  check:boolean;
  
  public isShowingMessage:boolean;
  constructor(private tacheservice:TacheService ,private userstoryservice:UserstoryService,private projetservice:ProjetService,private employeservice:EmployeService,private sprintservice:SprintService,private formBuilder: FormBuilder, private router: Router,private httpClient:HttpClient,private route: ActivatedRoute,
    
     ){
       this.isShowingMessage=false;
      }

  ngOnInit() {
    this.idEmploye=this.route.snapshot.params['id1'];
    this.idProjet=this.route.snapshot.params['id2'];
    this.projet=this.projetservice.findProjetById(this.idProjet);
    
    this.sprintservice.projetSprintProgress(this.idProjet).subscribe(
      data => {   
      data.forEach((element,index)=>{
        if(element.nomSprint=='Backlog produit'){ 
          this.idSprintBl=element.idSprint;
          data.splice(index,1);
          
        }
       
      })
      this.sprintArray.push(...data);
      this.selectedSprintId= this.sprintArray[0].idSprint;

          this.userstoryservice.findUserStorysSprintByProjet(this.idProjet,this.selectedSprintId).subscribe(data=>{
          this.sprintBacklog=data;
 this.sprintBacklog.forEach(us=>this.tacheservice.findAllTachesStoriesEtat(us.idUserStory,"Todo").subscribe(
  data=>{
    this.todos.push(...data);  
  }, error=>console.log(error)))    
  this.sprintBacklog.forEach(us=>this.tacheservice.findAllTachesStoriesEtat(us.idUserStory,"Doing").subscribe(
    data=>{
      this.doing.push(...data);
  
    }, error=>console.log(error))) 
    this.sprintBacklog.forEach(us=>this.tacheservice.findAllTachesStoriesEtat(us.idUserStory,"Done").subscribe(
      data=>{
        this.done.push(...data);  

      }, error=>console.log(error))) 



      this.sprintchek.push(...this.sprintArray);
      
      this.sprintchek.splice(0,1);
console.log("rrrrryyyyyyyyyrrrrrrrryyyyyyy"+JSON.stringify(this.sprintchek))
this.sprintchek.forEach(sp=>this.userstoryservice.findUserStorysSprintByProjet(this.idProjet,sp.idSprint).subscribe(data=>{
  this.sprintBacklogChek=data;
  this.sprintBacklogChek.forEach(us=>{
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"+JSON.stringify(us.idUserStory))

    this.userstoryservice.etatUserstoryById(us.idUserStory).subscribe(
      data=>{this.check=data;
        console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvv"+JSON.stringify(this.check))
        if(this.check==true){
          this.userstoryservice.updateSprintUserStory(us.idUserStory,this.idSprintBl,null).subscribe(
            data=> console.log("zzzzzzzzzzz"+data)
            
            ,error=>console.log(error)
          )
          console.log("ggggggggggggggg"+JSON.stringify(this.idSprintBl))
          this.userstoryservice.userstorysSprintBaclogProjet(this.idProjet).subscribe(data=>{
  
            this.products=data;  
                     
          }, error=>console.log(error));  
        }
      }
    )

  
   }, error=>console.log(error))
  })
);
                  }, error=>console.log(error)); 
                  
                }
    );





      this.userstoryservice.userstorysSprintBaclogProjet(this.idProjet).subscribe(data=>{
  
        this.products=data;  
                 
      }, error=>console.log(error));  


  
                 
   }
  
  onSearchClear (){

    this.searchKey="";
    this.applyFilter();
  }
applyFilter(){

    this.dataSource.filter=this.searchKey.trim().toLowerCase();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data, 
                        event.previousIndex,
                        event.currentIndex);
                        
const todo =event.item.data;
todo.etatrow= event.container.element.nativeElement.classList[0]
if(todo.etatrow=="Todo"){
  this.tacheservice.updateEtatTacheEmploye( todo.idTache,todo.etatrow,null).subscribe(
                      data=> console.log(data),error=>console.log(error))}

  if(todo.etatrow=="Doing"){
 this.tacheservice.updateEtatTacheEmploye( todo.idTache,todo.etatrow,null).subscribe(
   data=> console.log(data),error=>console.log(error))}
                      
     if(todo.etatrow=="Done"){
      this.tacheservice.updateEtatTacheEmploye( todo.idTache,todo.etatrow,null).subscribe(
     data=> console.log(data),error=>console.log(error))}
 if(todo.etatrow=="sprintBacklog"){
      this.userstoryservice.updateSprintUserStory(todo.idUserStory,this.selectedSprintId,null) .subscribe(
           data=> console.log(data),error=>console.log(error))   

           this.tacheservice.findAllTachesStoriesEtat(todo.idUserStory,"Todo")
           .subscribe(data=>{
             this.todos.push(...data);  
           }, error=>console.log(error));  
           this.tacheservice.findAllTachesStoriesEtat(todo.idUserStory,"Doing")
           .subscribe(data=>{
             this.doing.push(...data);
             
             console.log("dooooooooooingggggggg"+JSON.stringify(this.doing));
                       
           }, error=>console.log(error)); 
           this.tacheservice.findAllTachesStoriesEtat(todo.idUserStory,"Done")
           .subscribe(data=>{
             this.done.push(...data);   
             console.log("dddddddooooooooooneeeeee"+JSON.stringify(this.done));
                     
           }, error=>console.log(error)); 
           
         this.userstoryservice.userstorysSprintBaclogProjet(this.idProjet).subscribe(data=>{
  
        this.products=data;  
                 
      }, error=>console.log(error));  



          }  
          if(todo.etatrow=="productBacklog"){
            this.sprintservice.findSprintBlByProjet(this.idProjet).subscribe(
              data=>{
          
                this.sprintBL=data;  
                console.log("eeeeeeeeeeeeeeeffffffff"+JSON.stringify(this.sprintBL)   )  
                this.userstoryservice.updateSprintUserStory(todo.idUserStory,this.sprintBL.idSprint,null) .subscribe(
                  data=> console.log(data),error=>console.log(error)) 
                  this.todos=[];
                  this.doing=[];
                  this.done=[];
                   this.userstoryservice.findUserStorysSprintByProjet(this.idProjet,this.selectedSprintId).subscribe(data=>{
              this.sprintBacklog=data;
     this.sprintBacklog.forEach(us=>this.tacheservice.findAllTachesStoriesEtat(us.idUserStory,"Todo").subscribe(
      data=>{
        this.todos.push(...data);  
        console.log("loula"+JSON.stringify(this.todos))
      }, error=>console.log(error)))    
      this.sprintBacklog.forEach(us=>this.tacheservice.findAllTachesStoriesEtat(us.idUserStory,"Doing").subscribe(
        data=>{
          this.doing.push(...data);
          console.log("thenya"+JSON.stringify(this.doing))
      
        }, error=>console.log(error))) 
        this.sprintBacklog.forEach(us=>this.tacheservice.findAllTachesStoriesEtat(us.idUserStory,"Done").subscribe(
          data=>{
            this.done.push(...data);  
            console.log("theltha"+JSON.stringify(this.done))
    
          }, error=>console.log(error))) 
    
                      }, error=>console.log(error)); 
              }, error=>console.log(error));  
             
                             
                }         

    }
  }
  onChange(event){
   
    console.log("id sprint: "+JSON.stringify(this.selectedSprintId));
 
    this.userstoryservice.findUserStorysSprintByProjet(this.idProjet,this.selectedSprintId).subscribe(data=>{
  
      this.sprintBacklog=data;  
      this.todos=[];
      this.doing=[];
      this.done=[];
       this.userstoryservice.findUserStorysSprintByProjet(this.idProjet,this.selectedSprintId).subscribe(data=>{
  this.sprintBacklog=data;
this.sprintBacklog.forEach(us=>this.tacheservice.findAllTachesStoriesEtat(us.idUserStory,"Todo").subscribe(
data=>{
this.todos.push(...data);  
console.log("loula"+JSON.stringify(this.todos))
}, error=>console.log(error)))    
this.sprintBacklog.forEach(us=>this.tacheservice.findAllTachesStoriesEtat(us.idUserStory,"Doing").subscribe(
data=>{
this.doing.push(...data);
console.log("thenya"+JSON.stringify(this.doing))

}, error=>console.log(error))) 
this.sprintBacklog.forEach(us=>this.tacheservice.findAllTachesStoriesEtat(us.idUserStory,"Done").subscribe(
data=>{
this.done.push(...data);  
console.log("theltha"+JSON.stringify(this.done))

}, error=>console.log(error))) 

          }, error=>console.log(error)); 
    }, error=>console.log(error)); 
  }

 
}

