import { Component, OnInit } from '@angular/core';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employe } from 'src/app/models/employe';

@Component({
  selector: 'app-employe-detaille',
  templateUrl: './employe-detaille.component.html',
  styleUrls: ['./employe-detaille.component.css']
})
export class EmployeDetailleComponent implements OnInit {
id:number;
employe:Employe;
  constructor(private employeservice:EmployeService,private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.employe=new Employe();
    
    this.id=this.route.snapshot.params['id'];

    this.employeservice.findEmployeById(this.id)
    .subscribe(data=>{
      console.log(data)
      this.employe=data;
    }, error=>console.log(error));
    
  }
  detailsEmploye(){
    this.employeservice.findEmployeById(this.id)
    .subscribe(data=> console.log(data),error=>console.log(error)),
    
      this.employe=new Employe();
    
  }

  list(){
    this.router.navigate(['gestionComptes']);
  }

}
