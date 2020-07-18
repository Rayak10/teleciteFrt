import { Component, OnInit } from '@angular/core';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { FormBuilder } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { Employe } from 'src/app/models/employe';
import { Observable } from 'rxjs';

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
  
  constructor(private employeservice:EmployeService,private formBuilder: FormBuilder, private router: Router) {
  this.employeservice.listen().subscribe((m:any)=>{
    console.log(m);
    this.reloadData();
    
  })
   }

  ngOnInit() {
    this.reloadData();
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
  save() {
    this.employeservice.createEmploye(this.employe)
      .subscribe(data => console.log(data), error => console.log(error));
    this.employe= new Employe();
this.gotoList();
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
}
