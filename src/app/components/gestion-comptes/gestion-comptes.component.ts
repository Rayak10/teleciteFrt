import { Component, OnInit } from '@angular/core';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { Employe } from 'src/app/models/employe';
import { Observable } from 'rxjs';
import { Bureau } from 'src/app/models/bureau';
import { BureauService } from 'src/app/services/bureau/bureau.service';
import { DepartementService } from 'src/app/services/departement/departement.service';
import { Departement } from 'src/app/models/departement';
import { EquipeService } from 'src/app/services/equipe/equipe.service';
import { Equipe } from 'src/app/models/equipe';

@Component({
  selector: 'app-gestion-comptes',
  templateUrl: './gestion-comptes.component.html',
  styleUrls: ['./gestion-comptes.component.css']
})
export class GestionComptesComponent implements OnInit {
  employe:Employe=new Employe();
  submitted = false;
  employes: Observable<Employe[]>;
  errorMessage: string;
  successMessage: string;
  mySubscription: any; 
  bureau:Bureau;
  equipe:Equipe;
  departement:Departement;
  bureauArray = [];
  departementArray = [];
  equipeArray= [];
  selectedDepartementId:number;
  selectedEquipeId:number;
  selectedBureauId: number;
  
 
  
  constructor(private employeservice:EmployeService,private departementservice:DepartementService,private equipeservice:EquipeService,private bureauservice:BureauService,private formBuilder: FormBuilder, private router: Router) {}
  //public listBureauItems:Array<String>=[];
  //public listdepItems:Array<String>=[];
  ngOnInit() {
    this.reloadData();
    //this.dropDownBureauRefresh();
   // this.dropDownDepRefresh();
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
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
  return false;
};
this.mySubscription = this.router.events.subscribe((event) => {
  if (event instanceof NavigationEnd) {
    // Trick the Router into believing it's last link wasn't previously loaded
    this.router.navigated = false;
  }
});
  }
  

  newEmployee(): void {
    this.submitted = false;
    this.employe= new Employe();
  }
  onSubmit() {
    this.submitted = true;
    this.save(); 
      this.reloadData();
     this.gotoList();
        
     
 
  }

/*dropDownBureauRefresh(){
this.bureauservice.findAllBureaux().subscribe(data=>{
 console.log(data);
  data.forEach(element => {
    this.listBureauItems.push(element["nomBureau"]);
    
  });
})

  }; 


  dropDownDepRefresh(){
    this.departementservice.findAllDepartements().subscribe(data=>{
     console.log(data);
      data.forEach(element => {
        this.listdepItems.push(element["nomDepartement"]);
        
      });
    })
    
      }; 
    
*/

  save() {
    this.employeservice.createEmploye(this.employe)
      .subscribe(data => console.log(data), error => console.log(error));
    this.employe= new Employe();
this.employe.bureau.idBureau=this.selectedBureauId;
this.employe.departement.idDepartement=this.selectedDepartementId;
this.employe.equipe.idEquipe=this.selectedEquipeId;

//this.gotoList();
console.log(JSON.stringify(this.employe.equipe));

  }
  
  
  checkEmploye() {
    if (localStorage.getItem('currentEmploye') === undefined || localStorage.getItem('currentEmploye') === null) {
      console.log("employe is invalid, redirection");
      this.router.navigate(['/login']);
      return;
    }
    this.employe = JSON.parse(localStorage.getItem('currentEmploye'));
  }
reloadData(){
  this.employes= this.employeservice.findAllEmployes();
  
}

  deleteEmploye(id:number){
    let resp=this.employeservice.deleteEmploye(id);
    resp.subscribe(
    data=>{
      console.log(data);
      
     this.reloadData();
    
    },
    error=>console.log(error));
    
    this.employeservice.filter('delete ok?')
  }
  

  employeDetails(id:number){
    this.router.navigate(['details',id]);
  }
  updateEmploye(id:number){
    this.router.navigate(['update',id]);
  }
  gotoList(){
    this.router.navigate(['gestionComptes']);
  }



  setDefaultValues() {
    this.employe.active = true;
   
 }
 
 onChange(event){
   
  this.employe.bureau = {idBureau:this.selectedBureauId,nomBureau:''};
  this.employe.departement = {idDepartement:this.selectedDepartementId,nomDepartement:''};
  this.employe.equipe = {idEquipe:this.selectedEquipeId,nomEquipe:'',specialite:''};
  console.log(JSON.stringify(this.employe.equipe.idEquipe));

}


}
