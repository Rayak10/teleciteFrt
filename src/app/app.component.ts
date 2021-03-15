import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { DatapassService } from './services/datapass/datapass.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  role:string;
  id:number
  lien:string;
  title = 'telecite';
  child1Data: any;

  logo:string =' ../../assets/telecite.webp ';
  constructor(private dataPass: DatapassService,private router:Router) {
  
    this.dataPass.child1Subject.subscribe(data=>{
    this.role = data;
    
}) }
  ngOnInit(): void {
    this.role=localStorage.getItem('role');
    this.id =parseInt(localStorage.getItem('id'));
    console.log("rrrrrrrrrrrrrrr"+this.role)
    console.log("hhhhhkkkkkkkk"+this.id)

  }

  gestionComptes(){
    this.router.navigate(['gestionComptes']);
  }
  gestionProjet(){
    this.router.navigate(['gestionProjets']);
  }
  employeDetails(){
    this.router.navigate(['details',this.id]);
  }
  ressource(){

    this.router.navigate(['affectationRessources',this.id]);
  }
  logout(){
    localStorage.removeItem('currentEmploye')
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('id')
    localStorage.removeItem('idEquipe')
  //  if (localStorage.getItem('id')===null){
//this.router.navigate(['/'])
//}
  }
  
}
