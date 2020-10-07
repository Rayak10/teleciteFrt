import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employe } from 'src/app/models/employe';
import { Projet } from 'src/app/models/projet';
import { Reunion } from 'src/app/models/Reunion';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { ReunionService } from 'src/app/services/reunion/reunion.service';

@Component({
  selector: 'app-reunion-detaille',
  templateUrl: './reunion-detaille.component.html',
  styleUrls: ['./reunion-detaille.component.css']
})
export class ReunionDetailleComponent implements OnInit {
  reunions: Observable<Reunion[]>;
  id:number;
reunion:Reunion;
employeArray:Observable<Employe[]>;
constructor(private reunionservice:ReunionService,private employeservice:EmployeService,private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.reunion=new Reunion();
    
    this.id=this.route.snapshot.params['id'];
    this.reunionservice.findReunionById(this.id)
    .subscribe(data=>{
      console.log(data)
      this.reunion=data;
    }, error=>console.log(error));
    this.reloadData();
this.employeArray=this.employeservice.findAllEemployesReunion(this.id)
console.log("@@@@@@@@@@@@"+JSON.stringify(this.employeArray))


  }

  detailsReunion(){
    this.reunionservice.findReunionById(this.id)
    .subscribe(data=> console.log(data)
    ,error=>console.log(error)),

      this.reunion=new Reunion();
    
  }

  list(){
    this.router.navigate(['reunions/list']);
  }
  reloadData(){
    this.reunions= this.reunionservice.findAllReunion();

}
updateReunion(id:number){
  this.router.navigate(['reunions/update',id]);
}
deleteReunion(id:number){
  this.reunionservice.deleteReunion(id)
  .subscribe(
  data=>{
    console.log(data);
   

   this.reloadData();
  },
  error=>console.log(error));
  
}
reunionDetails(id:number){
  this.router.navigate(['reunions/details',id]);
}
}