import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/models/employe';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { error } from 'protractor';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employe-updat',
  templateUrl: './employe-updat.component.html',
  styleUrls: ['./employe-updat.component.css']
})
export class EmployeUpdatComponent implements OnInit {

  id:number;
  employe:Employe;
  employes: Observable<Employe[]>;

  constructor(private employeservice:EmployeService,private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit() {
    
    this.employe=new Employe();
    
    this.id=this.route.snapshot.params['id'];

    this.employeservice.findEmployeById(this.id)
    .subscribe(data=>{
      console.log(data)
      this.employe=data;
    }, error=>console.log(error));
    
  }

updateEmploye(){
  this.employeservice.updateEmploye(this.id , this.employe )
  .subscribe(data=> console.log(data),error=>console.log(error)),
  
    this.employe=new Employe();
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

}
