import { Component, OnInit } from '@angular/core';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { FormBuilder, FormGroup, FormControl, NgForm } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { Employe } from 'src/app/models/employe';
import { Observable } from 'rxjs';
import { Bureau } from 'src/app/models/bureau';
import { BureauService } from 'src/app/services/bureau/bureau.service';
import { DepartementService } from 'src/app/services/departement/departement.service';
import { Departement } from 'src/app/models/departement';
import { EquipeService } from 'src/app/services/equipe/equipe.service';
import { Equipe } from 'src/app/models/equipe';
import { assert } from 'console';
import { RoleMember } from 'src/app/models/roleMember';
import { RoleService } from 'src/app/services/role/role.service';

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
  role:RoleMember;
  equipe:Equipe;
  departement:Departement;
  bureauArray = [];
  roleArray = [];
  departementArray = [];
  equipeArray= [];
  selectedDepartementId:number;
  selectedEquipeId:number;
  selectedBureauId: number;
  selectedRoleId: number;

  offset: number =new Date().getTimezoneOffset() * 60 * 1000;
  urllink:String="assets/images/avatar.png";  
  constructor(private employeservice:EmployeService,private departementservice:DepartementService,private roleservice:RoleService,private equipeservice:EquipeService,private bureauservice:BureauService,private formBuilder: FormBuilder, private router: Router) {}
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
    this.roleservice.findAllRoles().subscribe(
      data => {console.log("data from find all bureau:"+JSON.stringify(data));   
      
                  this.roleArray.push(...data);}
    );
    this.equipeservice.findAllEquipe().subscribe(
      data => {console.log("data from find all Equipe:"+JSON.stringify(data));   
      
                  this.equipeArray.push(...data);}
    );
    this.departementservice.findAllDepartements().subscribe(
      data => {console.log("data from find all dep:"+JSON.stringify(data));  
      
                  this.departementArray.push(...data);}
    );
    this.employe.departement=null;
    this.employe.bureau=null;
    this.employe.equipe=null;
    this.employe.equipe=null;
    this.employe.roleMember=null;

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
  onSubmit(getCompteForm:NgForm) {
    this.submitted = true;
    this.save(); 
    getCompteForm.reset();
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
    console.log("employe: "+JSON.stringify(this.employe));
    this.employe.dateNaissance = new Date(new Date(this.employe.dateNaissance).getTime() - this.offset);
    this.employe.dateEmbauche = new Date(new Date(this.employe.dateEmbauche).getTime() - this.offset);
    this.employeservice.createEmploye(this.employe)
      .subscribe(data => console.log(data), error => console.log(error));
//this.gotoList();


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
  this.urllink
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
 
 onChangeBureau(event){
   
  this.employe.bureau = {idBureau:this.selectedBureauId,nomBureau:''};
  //console.log(JSON.stringify(this.employe.bureau.idBureau));
 
}
onChangeRole(event){
   
  this.employe.roleMember = {idRole:this.selectedRoleId,nomRole:''};
  //console.log(JSON.stringify(this.employe.bureau.idBureau));
 
}
onChangeDepartement(event){
  this.employe.departement = {idDepartement:this.selectedDepartementId,nomDepartement:''};
  //console.log(JSON.stringify(this.employe.departement.idDepartement));
}
onChangeEquipe(event){
   
  this.employe.equipe = {idEquipe:this.selectedEquipeId,nomEquipe:'',specialite:''};
 // console.log(JSON.stringify(this.employe.equipe.idEquipe));

}
OnSelectFile(event){
  if(event.target.files){
    var reader = new FileReader()
    reader.readAsDataURL(event.target.files[0])
    reader.onload=(event:any)=>{
      this.urllink=event.target.result
    }
  }
}

}
