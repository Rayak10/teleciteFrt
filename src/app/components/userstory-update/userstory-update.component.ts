import { Component, OnInit } from '@angular/core';
import { Userstory } from 'src/app/models/userStory';
import { Observable } from 'rxjs';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { Sprint } from 'src/app/models/sprint';
import { UserstoryService } from 'src/app/services/userstory/userstory.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-userstory-update',
  templateUrl: './userstory-update.component.html',
  styleUrls: ['./userstory-update.component.css']
})
export class UserstoryUpdateComponent implements OnInit {
  id:number;
  userstory:Userstory;
  userstorys: Observable<Userstory[]>;
  sprintArray= [];
  etatArray= [];
  exform:FormGroup;
  messageS:String="User storie modifiée avec succèes";
  messageE:String="Modification du user storie est échouée";
  constructor(private sprintservice:SprintService,private route: ActivatedRoute, private router: Router,
    private userstoryservice:UserstoryService, private _service: NotificationsService) { }
  
  
  ngOnInit() {
    this.userstory=new Userstory();

    this.exform = new FormGroup({
      'userStory' : new FormControl('',Validators.required),
      'priorite' : new FormControl('',[Validators.required,Validators.pattern("^(1|2|3|4)$")]),
      'complexite' : new FormControl('',[Validators.required,Validators.pattern("^(1|2|3|4|5|8|13|20|40|100)$")]),
      'nomProjet' : new FormControl('',Validators.required),

    })
    
    this.id=this.route.snapshot.params['id'];
    this.userstoryservice.findUserstoryById(this.id)
    .subscribe(data=>{
      console.log(data)
      this.userstory=data;
    this.sprintservice.findAllSprint().subscribe(
      data => {console.log("data from find all sprints:"+JSON.stringify(data));   
                  this.sprintArray.push(...data);}
                  );     
      console.log("userStoryUpdate: "+JSON.stringify(this.userstory))
    }, error=>console.log(error));
    } 

    update_UserStory(){
  this.userstoryservice.updateUserStory(this.id , this.userstory )
  .subscribe(data=> this.onSuccess(this.messageS)
  ,error=>this.onErorr(this.messageE));
}
onSuccess(messageS){
  this._service.success('Success',messageS, {
    position: ['bottom','right'],
    timeOut: 2000,
    animate: 'fade',
    showProgressBar: true
  })}
  onErorr(messageE){
    this._service.error('Erreur',messageE, {
      position: ['bottom','right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    })}
onSubmit(){
  this.update_UserStory();
}
gotoList(){
  this.router.navigate(['gestionUserstory']);
}
reloadData(){
  this.userstorys=this.userstoryservice.findAllUserstory();
}
sprintDetails(id:number){
  
  this.router.navigate(['sprints/details',id]);
}

}