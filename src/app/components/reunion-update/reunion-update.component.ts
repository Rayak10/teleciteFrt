import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Console } from 'console';
import { Reunion } from 'src/app/models/Reunion';
import { ReunionService } from 'src/app/services/reunion/reunion.service';
import { UserstoryService } from 'src/app/services/userstory/userstory.service';
import { TypeReunion } from 'src/app/models/typeReunion';
import { FormControl, FormGroup ,FormBuilder} from '@angular/forms';
import { NgbTimepickerConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { DepartementService } from 'src/app/services/departement/departement.service';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { EquipeService } from 'src/app/services/equipe/equipe.service';
import * as $ from 'jquery' ;
import { Observable } from 'rxjs';
import { Employe } from 'src/app/models/employe';

@Component({
  selector: 'app-reunion-update',
  templateUrl: './reunion-update.component.html',
  styleUrls: ['./reunion-update.component.css']
})
export class ReunionUpdateComponent implements OnInit {
  reunion:Reunion;
  selectedEquipeId:number;
  id:number;
  TypeReunion=TypeReunion;
  employeArray:Observable<Employe[]>;
  employesReunion:Observable<Employe[]>;
  selectedDepartementId:number;
  employesdep:Employe[]=[];
  selectedItemsList:Employe[]= [];
  checkedIDs:number[];

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
  departementArray= [];
  equipeArray= [];
  typeArray= [];
  heurdeb:NgbTimeStruct;
  heurfin:NgbTimeStruct;
  intHeurD:number;
  intMntD:number;
  intHeurF:number;
  intMntF:number;
  form: FormGroup;

  constructor(private reunionservice:ReunionService,config: NgbTimepickerConfig ,private runionservice:ReunionService,private employeservice:EmployeService,private equipeservice:EquipeService,private departementservive:DepartementService,private route: ActivatedRoute, private router: Router,private formBuilder:FormBuilder) {
    config.seconds = false;
    config.spinners = true;
    config.meridian=false;
    this.form=this.formBuilder.group({
      checkArray:this.formBuilder.array([])
    })
   }

  ngOnInit() {

    this.reunion=new Reunion();
   

    this.id=this.route.snapshot.params['id'];
    this.reunionservice.findReunionById(this.id)
    .subscribe(data=>{
      console.log(data)
      this.reunion=data;
      console.log("reeeeeeeeeeunion"+JSON.stringify(this.reunion))

      this.employesReunion=this.employeservice.findAllEemployesReunion(this.id);
      this.employesReunion.subscribe(
       checkedEmp => { this.selectedItemsList = checkedEmp;}  
      )
      console.log("dddddddaaaaaaaaaaaaddddddd"+JSON.stringify( this.employesReunion))
      for (let i = 0; i < this.reunion.heurDeb.length; i++) {
        this.intHeurD=(Number(this.reunion.heurDeb.substr(0,2)));
        this.intMntD=(Number(this.reunion.heurDeb.substr(3,2)))
     
       }
       console.log("èèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèè"+JSON.stringify( this.intHeurD))
       console.log("èèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèè"+JSON.stringify( this.intMntD))

       this.reunion.heureDeb={hour:this.intHeurD,minute:this.intMntD,second:0};
 
       for (let i = 0; i < this.reunion.heurFin.length; i++) {
        this.intHeurF=(Number(this.reunion.heurFin.substr(0,2)));
        this.intMntF=(Number(this.reunion.heurFin.substr(3,2)))
      
       }
       this.reunion.heureFin={hour:this.intHeurF,minute:this.intMntF,second:0};

    }, error=>console.log(error));
    
   
 


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
    console.log("efsef'rttttttttttttttttttttttttttttttttt"+JSON.stringify(this.departementArray)); 
this.typeArray=["Réunion administratif","Reunion Scrum"]

  }



  updateReunion(){
    this.reunionservice.createReunion(this.reunion)
    .subscribe(data=> console.log(data),error=>console.log(error))
    
      
    
     // this.gotoList();
     // this.reloadData();
  }

  onSubmit(){




this.updateReunion()




  
}

onChange1(event){
  
  this.reunion.equipe = {idEquipe:this.selectedEquipeId,nomEquipe:'',specialite:''};
  console.log(JSON.stringify(this.reunion.equipe.idEquipe)); }
 
  onChange2(event){
    $("#leg1").hide(1000);
    $("#tab1").hide(1500);
  this.employeArray=this.employeservice.findAllEmployesDepartement(this.selectedDepartementId);
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