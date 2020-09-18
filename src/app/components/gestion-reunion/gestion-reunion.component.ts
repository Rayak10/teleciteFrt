import { Component, OnInit, Type } from '@angular/core';
import { FormBuilder, FormControl, NgForm } from '@angular/forms';
import { provideRoutes, Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import * as $ from 'jquery' ;
import { Reunion} from 'src/app/models/Reunion';
import { ReunionService } from 'src/app/services/reunion/reunion.service';
import { EquipeService } from 'src/app/services/equipe/equipe.service';
import { DepartementService } from 'src/app/services/departement/departement.service';
import { TypeReunion } from 'src/app/models/typeReunion';
import { NgbTimeStruct,NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbTime } from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';
import { Time } from '@angular/common';

@Component({
  selector: 'app-gestion-reunion',
  templateUrl: './gestion-reunion.component.html',
  styleUrls: ['./gestion-reunion.component.css'],
  providers: [NgbTimepickerConfig]
})
export class GestionReunionComponent implements OnInit {
  reunion:Reunion=new Reunion();
  submitted = false;
  errorMessage: string;
  reunions: Observable<Reunion[]>;
  successMessage: string;
  typeArray= [];
  offset: number =new Date().getTimezoneOffset() * 60 * 1000;
  selectedReunionId:number;
  ctrl1:any
  ctrl2:any
  h1:number;
  h2:number;
  mnt1:number;
  mnt2:number;
  sc1:number;
  sc2:number;
  value1:NgbTimeStruct;
  value2:NgbTimeStruct;
  heurdeb:NgbTimeStruct;
  heurfin:NgbTimeStruct;
  equipeArray= [];
  hd:string;
  hf:string;
  departementArray= [];
  TypeReunion=TypeReunion;
  selectedtype:any;
  selectedEquipeId:number;
  constructor(config: NgbTimepickerConfig ,private runionservice:ReunionService,private equipeservice:EquipeService,private departementservive:DepartementService,private formBuilder:FormBuilder,private router:Router) {
    config.seconds = false;
    config.spinners = true;
    config.meridian=false;
   }

  ngOnInit()  {
    
   // this.selectedtype = Object.keys(this.typeReunions);
   this.heurdeb={hour: 0, minute: 0,second:0};
   this.heurfin={hour: 0, minute: 0,second:0};


    this.ctrl2= new FormControl('', (control: FormControl) => {
      this.value2 = control.value;
      console.log("valeur heur fin:"+JSON.stringify(this.value2)); 
this.h2=(this.value2.hour);
this.mnt2=this.value2.minute;

      if ( ((this.h2)-(this.h1))==0) {
        return  {probleme: true};;
      }
      if ((this.value2.hour > 18 ) ){ 
        return {tooLate: true};
      }
     
      if ( (this.h2)-(this.h1)<0) {
        return {probleme: true};
      }
      
      
      return null;

    });
   
    this.ctrl1= new FormControl('', (control: FormControl) => {
      this.value1 = control.value;
      console.log("valeur heur debut:"+JSON.stringify(this.value1)); 
      console.log("hhhhhhhhhhheeeeeeeeeeeeeuuuuuuuuuurrr1: "+JSON.stringify(this.value1));

    this.h1=this.value1.hour
    this.mnt1=this.value1.minute



      if (this.value1.hour< 9) {
        return {tooEarly: true};
      }
      if (this.value1.hour > 17) {
        return {tooLate: true};
      }

      return null;
    });
   
    
    this.equipeservice.findAllEquipe().subscribe(
      data => {console.log("data from find all Equipe:"+JSON.stringify(data));   
      
                  this.equipeArray.push(...data);}
    );
    this.departementservive.findAllDepartements().subscribe(
      data => {console.log("data from find all departement:"+JSON.stringify(data));   
      
                  this.departementArray.push(...data);}
    );
    
  
this.typeArray=["Réunion administratif","Reunion Scrum"]
/*this.projetservice.findAllProjets().subscribe(
  data => {console.log("data from find all projet:"+JSON.stringify(data));   
  
              this.projetArray.push(...data);}
);*/
this.reloadData();
}
    
newSprint(): void {
  this.submitted = false;
  this.reunion= new Reunion();
}
onSubmit(getReunionForm:NgForm) {
  this.submitted = true;
  this.save(); 
  getReunionForm.reset();
     this.reloadData();
     this.gotoList();
}
save() {
  this.reunion.dateDebut = new Date(new Date(this.reunion.dateDebut).getTime() - this.offset);
  this.reunion.dateFin = new Date(new Date(this.reunion.dateFin).getTime() - this.offset);
this.reunion.heureDeb={hour: this.h1, minute:this.mnt1,second:0};
// console.log("hhhhhhhhhhheeeeeeeeeeeeeuuuuuuuuuurrr1: "+JSON.stringify((this.value1)));

  this.reunion.heureFin= this.heurfin;
  //console.log("re.her fin: "+JSON.stringify(this.value2));

  this.runionservice.createReunion(this.reunion)
    .subscribe(data => console.log(data), error => console.log(error));
  this.reunion= new Reunion();
  
   console.log("reunion: "+JSON.stringify(this.reunion));

this.gotoList();
}  
reloadData(){
  this.reunions= this.runionservice.findAllReunion();
 
}
sprintDetails(id:number){
  this.router.navigate(['sprints/details',id]);
}
updateSprint(id:number){
  this.router.navigate(['sprints/update',id]);
}
gotoList(){
  this.router.navigate(['gestionReunions']);
}
deleteSprints(id:number){
  this.runionservice.deleteReunion(id)
  .subscribe(
  data=>{
    console.log(data);
   

   this.reloadData();
   this.gotoList();
  },
  error=>console.log(error));
  
}
onChange(event){
 if(this.selectedtype=="Reunion_Scrum"){
   this.reunion.type=this.TypeReunion.Reunion_Scrum
 }
 if(this.selectedtype=="Reunion_Administratif"){
   this.reunion.type=this.TypeReunion.Reunion_Administratif
 }


}
onChange1(event){
  
  this.reunion.equipe = {idEquipe:this.selectedEquipeId,nomEquipe:'',specialite:''};
  console.log(JSON.stringify(this.reunion.equipe.idEquipe)); }
 
 
 }
/*
onChange1(event){
  $("#leg2").click(function(){
    $("#tab1").toggle("slide");
  });
  $("#leg3").click(function(){
    $("#tab2").toggle("slide");
  });
  this.sprintsProjet =this.sprintservice.findSprintsByProjet(this.selectedProjetSprintsId);
  this.sprintservice.findSprintsByProjet(this.selectedProjetSprintsId).subscribe(
    resp  =>{ this.sprintsProjetArray = resp;
     this.sprintsProjetArray = this.sprintsProjetArray.filter(x=>x.nomSprint!='Backlog produit');
    console.log("*****"+(this.sprintsProjetArray.length -1));
    }
  );
}

/*toggleBPList(){
  this.showBPList = ! this.showBPList;
  console.log(this.showBPList+"*****");
}*/

