import { Component, OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators,NgForm } from '@angular/forms';
import {  Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import * as $ from 'jquery' ;
import { Reunion} from 'src/app/models/Reunion';
import { ReunionService } from 'src/app/services/reunion/reunion.service';
import { EquipeService } from 'src/app/services/equipe/equipe.service';
import { DepartementService } from 'src/app/services/departement/departement.service';
import { TypeReunion } from 'src/app/models/typeReunion';
import { NgbTimeStruct,NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { Employe } from 'src/app/models/employe';
import { stringify } from 'querystring';

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
  employeArray:Observable<Employe[]>;
  employesdep:Employe[]=[];
  departementArray= [];
  TypeReunion=TypeReunion;
  selectedtype:any;
  selectedEquipeId:number;
  selectedDepartementId:number;
  form: FormGroup;
  selectedItemsList:Employe[] = [];
  checkedIDs:number[];
  exform:FormGroup;
  constructor(config: NgbTimepickerConfig ,private runionservice:ReunionService,private employeservice:EmployeService,private equipeservice:EquipeService,private departementservive:DepartementService,private formBuilder:FormBuilder,private router:Router) {
    config.seconds = false;
    config.spinners = true;
    config.meridian=false;
    this.form=this.formBuilder.group({
      checkArray:this.formBuilder.array([])
    })
   }

  ngOnInit()  {
    this.exform = new FormGroup({
      'type' : new FormControl(null,Validators.required),
      'heureDebut' : new FormControl(null,Validators.required),
      'heureFin' : new FormControl(null,Validators.required),
      'departement' : new FormControl(null,Validators.required),
      'contexte' : new FormControl(null,Validators.required),
      'equipe' : new FormControl(null,Validators.required),
      'nom' : new FormControl(null,Validators.required),
      'dateDebut' : new FormControl(null,Validators.required),
      'dateFin' : new FormControl(null,Validators.required)
    })
    this.reunion.heureDeb={hour: 0, minute: 0,second:0};
   this.reunion.heureFin={hour: 0, minute: 0,second:0};
    this.fetchSelectedItems();
    this.fetchCheckedIDs();
   // this.selectedtype = Object.keys(this.typeReunions);
   


    this.ctrl2= new FormControl('', (control: FormControl) => {
      this.value2 = control.value;
      console.log("valeur heur fin:"+JSON.stringify(this.value2)); 
this.h2=(this.value2.hour);
this.mnt2=this.value2.minute;

      if ( ((this.h2)-(this.h1))==0) {
        return  {probleme: true};;
      }
      if (( this.value2.hour > 18 )||( this.value2.hour <9 )){ 
        return {tooLate: true};
      }
      
      if ( (this.h2)-(this.h1)<0) {
        return {probleme: true};
      }
      
      
      return null;

    });
    $("#leg1").hide();
    
    $("#tab1").hide();



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
    console.log("efsef'rttttttttttttttttttttttttttttttttt"+JSON.stringify(this.departementArray)); 
this.typeArray=["Réunion administratif","Reunion Scrum"]
/*this.projetservice.findAllProjets().subscribe(
  data => {console.log("data from find all projet:"+JSON.stringify(data));   
  
              this.projetArray.push(...data);}
);*/
}
    
newSprint(): void {
  this.submitted = false;
  this.reunion= new Reunion();
}
onSubmit() {
  this.submitted = true;
  this.save(); 
     this.gotoList();
}
save() {
  this.reunion.dateDebut = new Date(new Date(this.reunion.dateDebut).getTime() - this.offset);
  this.reunion.dateFin = new Date(new Date(this.reunion.dateFin).getTime() - this.offset);

console.log("5555555555AAAAAA5A5"+JSON.stringify(this.reunion)); 

  this.runionservice.createReunion(this.reunion)
  
    .subscribe(data =>{ console.log(data);
    } ,error => console.log(error));
    console.log("5555555555AAAAAA5A5"+JSON.stringify(this.reunion)); 


}  


gotoList(){
  this.router.navigate(['Reunions/list']);
}
deleteSprints(id:number){
  this.runionservice.deleteReunion(id)
  .subscribe(
  data=>{
    console.log(data);
   

   this.gotoList();
  },
  error=>console.log(error));
  
}
onChange(event){


}
onChange1(event){
  
  this.reunion.equipe = {idEquipe:this.selectedEquipeId,nomEquipe:'',specialite:''};
  console.log(JSON.stringify(this.reunion.equipe.idEquipe)); }
 
  onChange2(event){
    $("#leg1").hide(1000);
    $("#tab1").hide(1500);
  this.employeArray=this.employeservice.findAllEmployesDepartement(this.selectedDepartementId)
this.employeservice.findAllEmployesDepartement(this.selectedDepartementId).subscribe(

  resp=>{this.employesdep=resp;
   let checkedEmployeesIds = this.selectedItemsList.filter(emp=> emp.departement.idDepartement == this.selectedDepartementId);
     this.employesdep.forEach(
       emp=>{ if(checkedEmployeesIds.find(empChecked=>emp.idEmploye == empChecked.idEmploye))
                 emp.isChecked = true; } );
    console.log(JSON.stringify("qqqqqqqqqqq"+this.employeArray));
  }
  
)
  $("#field_departement").click(function(){
    $("#leg1").show(1000);
    $("#tab1").show(1500);
  });
  }
  changeSelection() {
    this.fetchSelectedItems()
  } 
  
  fetchSelectedItems() {
    this.selectedItemsList = this.selectedItemsList.filter(emp=> emp.departement.idDepartement !=  this.selectedDepartementId)
    this.selectedItemsList.push(...this.employesdep.filter((value, index) => {
      return value.isChecked
    }));
    this.fetchCheckedIDs();

  }

  fetchCheckedIDs() {
    this.checkedIDs = []
    this.selectedItemsList.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.idEmploye);
        console.log(JSON.stringify("rtrtrdggrgdrgdgrdgdrgdrgrdg"+ this.reunion.employes));
        this.reunion.employes=this.checkedIDs;

      }
    });
  }
  
}