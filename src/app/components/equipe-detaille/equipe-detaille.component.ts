import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employe } from 'src/app/models/employe';
import { Equipe } from 'src/app/models/equipe';
import { Reunion } from 'src/app/models/Reunion';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { EquipeService } from 'src/app/services/equipe/equipe.service';

@Component({
  selector: 'app-equipe-detaille',
  templateUrl: './equipe-detaille.component.html',
  styleUrls: ['./equipe-detaille.component.css']
})
export class EquipeDetailleComponent implements OnInit {

  id:number;
equipe:Equipe;
equipemps: Observable<Employe[]>;

  constructor(private equipeservice:EquipeService,private employeservice:EmployeService,private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.equipe=new Equipe();
    
    this.id=this.route.snapshot.params['id'];
    this.equipeservice.findEquipeById(this.id)
    .subscribe(data=>{
      console.log(data)

      this.equipe=data;

      
    }, error=>console.log(error));

    this.reloadData();

  }
  detailsEquipe(){
    this.equipeservice.findEquipeById(this.id)
    .subscribe(data=> console.log(data),error=>console.log(error)),
    
      this.equipe=new Equipe();
    
  }
  
  list(){
    this.router.navigate(['gestionEquipes']);
  }
  reloadData(){
    this.equipemps=this.employeservice.findAllEmployesEquipe(this.id);

}
employeDetails(id:number){
  this.router.navigate(['details',id]);
}
}





