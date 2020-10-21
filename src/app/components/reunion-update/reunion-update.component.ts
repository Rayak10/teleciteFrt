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
    this.reunionservice.findReunionDtoById(this.id)
    .subscribe(data=>{
      console.log(data)
      this.reunion=data;
      console.log(JSON.stringify("rtrtrdggrgdrgdgrdgdrgdrgrdg"+ this.reunion.employes));

      this.employesReunion=this.employeservice.findAllEemployesReunion(this.id);
      this.employesReunion.subscribe(
       checkedEmp => { this.selectedItemsList = checkedEmp;}  
      )
      console.log("dddddddaaaaaaaaaaaad****************dddddd"+JSON.stringify( this.selectedItemsList))


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
    console.log("efsef'rttttttttttttttttttttttttttttttttt"+JSON.stringify(this.reunion.employes)); 

    this.reunionservice.updateRieunion(this.id,this.reunion)
    .subscribe(data=> console.log(data),error=>console.log(error))
    
      
    
     // this.gotoList();
     // this.reloadData();
  }

  onSubmit(){
this.updateReunion()
this.gotoList();

}
gotoList(){
  this.router.navigate(['Reunions/list']);
}
onChange1(event){
  
  this.reunion.equipe = {idEquipe:this.selectedEquipeId,nomEquipe:'',specialite:''};
  console.log(JSON.stringify(this.reunion.equipe.idEquipe)); 
}

 
  onChange2(event){
   //// this.fetchCheckedIDs()

    $("#leg1").hide(1000);
    $("#tab1").hide(1500);
this.employeservice.findAllEmployesDepartement(this.selectedDepartementId).subscribe(

  resp=>{
    this.employesdep=resp;
    let checkedEmployeesIds = this.selectedItemsList.filter(emp=> emp.departement.idDepartement == this.selectedDepartementId);
     this.employesdep.forEach(
       emp=>{ if(checkedEmployeesIds.find(empChecked=>emp.idEmploye == empChecked.idEmploye))
                 emp.isChecked = true; } );
    console.log(JSON.stringify("qqqqqqqqqqq"+checkedEmployeesIds));
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
        this.reunion.employes=this.checkedIDs;
        console.log(JSON.stringify("rtrtrdggrgdrgdgrdgdrgdrgrdg"+ this.reunion.employes));

      }
    });
  }

  isEmpInReunion(idEmploye: number): boolean {
    return this.reunion.employes.indexOf(idEmploye) >= 0;
  }

  changeSelection2(idEmploye: number, event) {
    let isChecked = event.target.checked;
    console.log('****ùù*'+ isChecked );
    isChecked? this.reunion.employes.push(idEmploye): this.reunion.employes.splice( this.reunion.employes.indexOf(idEmploye), 1);
  }
  
}