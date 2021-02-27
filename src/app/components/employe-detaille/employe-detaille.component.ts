import { Component, Input, OnInit } from '@angular/core';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employe } from 'src/app/models/employe';
import { Bureau } from 'src/app/models/bureau';
import { BureauService } from 'src/app/services/bureau/bureau.service';
import { DepartementService } from 'src/app/services/departement/departement.service';
import { Departement } from 'src/app/models/departement';
import { EquipeService } from 'src/app/services/equipe/equipe.service';
import { Equipe } from 'src/app/models/equipe';
import { RoleService } from 'src/app/services/role/role.service';
import { DatapassService } from 'src/app/services/datapass/datapass.service';
@Component({
  selector: 'app-employe-detaille',
  templateUrl: './employe-detaille.component.html',
  styleUrls: ['./employe-detaille.component.css']
})
export class EmployeDetailleComponent implements OnInit {
 
id:number;
employe:Employe;
bureau:Bureau;
  equipe:Equipe;
  departement:Departement;
  bureauArray = [];
  departementArray = [];
  equipeArray= [];
  defaultChoice:number;
  etatArray= [];
  roleArray = [];
  
  photo:String
  constructor(private employeservice:EmployeService,private route: ActivatedRoute,private roleservice:RoleService, private router: Router,private departementservice:DepartementService,private equipeservice:EquipeService,private bureauservice:BureauService) {}

  ngOnInit() {
    this.etatArray=[
      {idEtat:1,nomEtat:"Active"},
      {idEtat:2,nomEtat:"Inactive"}

    ]
    this.employe=new Employe();
    
    this.id=this.route.snapshot.params['id'];

    this.employeservice.findEmployeById(this.id)
    .subscribe(data=>{
      console.log(data)
      this.employe=data;
if(this.employe.photo==null){
  this.photo="http://localhost:8081/telecite/employes/photo/{{this.employe.idEmploye}}";
}else{
  this.photo=' ../../assets/telecite.webp '
}
      if(this.employe.active==true){
        this.defaultChoice=1;}
        
        else{
        this.defaultChoice=2;
      }
    }, error=>console.log(error));
    this.roleservice.findAllRoles().subscribe(
      data => {console.log("data from find all bureau:"+JSON.stringify(data));   
      
                  this.roleArray.push(...data);}
    );
    this.bureauservice.findAllBureaux().subscribe(
      data => {console.log("data from find all bureau:"+JSON.stringify(data));   
      
                  this.bureauArray.push(...data);}
    );
    this.equipeservice.findAllEquipe().subscribe(
      data => {console.log("data from find all Equipe:"+JSON.stringify(data));   
      
                  this.equipeArray.push(...data);}
    );
    this.departementservice.findAllDepartements().subscribe(
      data => {console.log("data from find all dep:"+JSON.stringify(data));  
      
                  this.departementArray.push(...data);}
    );
  }
  detailsEmploye(){
    this.employeservice.findEmployeById(this.id)
    .subscribe(data=> console.log(data),error=>console.log(error)),
    
      this.employe=new Employe();
    
  }
  onEtatSelected(event){

    if (this.defaultChoice==1){
      this.employe.active=true;
   
    }
     if(this.defaultChoice==2){
   this.employe.active=false;
   }
   console.log("eeeeeeeeeeeeee"+ this.employe.active)
   }
  
  list(){
    this.router.navigate(['gestionComptes']);
  }
  gotoList(){
    this.router.navigate(['gestionComptes']);
  }

}
