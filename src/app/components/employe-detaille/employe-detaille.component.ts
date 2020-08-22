import { Component, OnInit } from '@angular/core';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employe } from 'src/app/models/employe';
import { Bureau } from 'src/app/models/bureau';
import { BureauService } from 'src/app/services/bureau/bureau.service';
import { DepartementService } from 'src/app/services/departement/departement.service';
import { Departement } from 'src/app/models/departement';
import { EquipeService } from 'src/app/services/equipe/equipe.service';
import { Equipe } from 'src/app/models/equipe';
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
  constructor(private employeservice:EmployeService,private route: ActivatedRoute, private router: Router,private departementservice:DepartementService,private equipeservice:EquipeService,private bureauservice:BureauService) {}

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
