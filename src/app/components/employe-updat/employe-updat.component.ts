import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/models/employe';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import { Bureau } from 'src/app/models/bureau';
import { Equipe } from 'src/app/models/equipe';
import { Departement } from 'src/app/models/departement';
import { DepartementService } from 'src/app/services/departement/departement.service';
import { EquipeService } from 'src/app/services/equipe/equipe.service';
import { BureauService } from 'src/app/services/bureau/bureau.service';

@Component({
  selector: 'app-employe-updat',
  templateUrl: './employe-updat.component.html',
  styleUrls: ['./employe-updat.component.css']
})
export class EmployeUpdatComponent implements OnInit {
  bureau:Bureau;
  equipe:Equipe;
  departement:Departement;
  bureauArray = [];
  departementArray = [];
  equipeArray= [];
  id:number;
  modifedBureau:number;
  modifedDepartement:number;
  modifedEquipe:number;
  employe:Employe;
  employes: Observable<Employe[]>;
  selectedDepartementId:number;
  selectedEquipeId:number;
  selectedBureauId: number;
  
  constructor(private employeservice:EmployeService,private route: ActivatedRoute, private router: Router,private departementservice:DepartementService,private equipeservice:EquipeService,private bureauservice:BureauService) { }
  
  ngOnInit() {
    
    this.employe=new Employe();
    
    this.id=this.route.snapshot.params['id'];
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
    this.employeservice.findEmployeById(this.id)
    .subscribe(data=>{
      console.log(data)
      this.employe=data;
      
      if (this.employe.bureau== null){
        this.employe.bureau=new Bureau();
        this.employe.bureau.idBureau = null;
      }
 
      if (this.employe.departement== null){
        this.employe.departement=new Departement();
        this.employe.departement.idDepartement= null;
      }
 
      if (this.employe.equipe== null){
        this.employe.equipe=new Equipe();
        this.employe.equipe.idEquipe  = null;
      }

      console.log("employe: "+JSON.stringify(this.employe))
    }, error=>console.log(error));
    
  }
  

updateEmploye(){


  //this.employe=new Employe();
 // this.employe.bureau.idBureau=this.modifedBureau;
  //console.log(JSON.stringify(this.modifedBureau));

  //this.employe.departement.idDepartement=this.modifedDepartement;
  //console.log(JSON.stringify(this.modifedDepartement));

 // this.employe.equipe.idEquipe=this.modifedEquipe;
 // console.log(JSON.stringify(this.modifedEquipe));

  this.employeservice.updateEmploye(this.id , this.employe )
  .subscribe(data=> console.log(data),error=>console.log(error)),
  
   

    this.gotoList();
    this.reloadData();
   
}
onSubmit(){
  this.updateEmploye();
}
gotoList(){
  this.router.navigate(['gestionComptes']);
}
reloadData(){
  this.employes= this.employeservice.findAllEmployes();
  
}
/*onChange(event){
   
  this.employe.bureau = {idBureau:this.selectedBureauId,nomBureau:''};
  this.employe.departement = {idDepartement:this.selectedDepartementId,nomDepartement:''};
  this.employe.equipe = {idEquipe:this.selectedEquipeId,nomEquipe:'',specialite:''};

  console.log(JSON.stringify(this.employe.equipe.idEquipe));
  console.log(JSON.stringify(this.employe.bureau.idBureau));
  console.log(JSON.stringify(this.employe.departement.idDepartement));

}*/
onBureauSelected(val:any){
this.customFunction1(val)
}
ondepartementSelected(val:any){
  this.customFunction2(val)
  }
  onEquipeSelected(val:any){
    this.customFunction3(val)
    }
customFunction1(val:any){
  this.employe.bureau.idBureau=val;


}
customFunction2(val:any){

  this.employe.departement.idDepartement=val;


  

}
customFunction3(val:any){

  this.employe.equipe.idEquipe=val;

  

}

}
