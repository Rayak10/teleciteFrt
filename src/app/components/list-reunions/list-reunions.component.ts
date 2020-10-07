import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Reunion } from 'src/app/models/Reunion';
import { TypeReunion } from 'src/app/models/typeReunion';
import { ReunionService } from 'src/app/services/reunion/reunion.service';

@Component({
  selector: 'app-list-reunions',
  templateUrl: './list-reunions.component.html',
  styleUrls: ['./list-reunions.component.css']
})
export class ListReunionsComponent implements OnInit {
  reunions: Observable<Reunion[]>;
  typeArray= [];
  reunionsObs: Reunion[]=[];
  TypeReunion=TypeReunion;
reunionAd:TypeReunion.Reunion_Administratif;
reunion:Reunion;
  selectedType:TypeReunion = TypeReunion.Reunion_Administratif;
  reunionstrie: Observable<Reunion[]>;
  constructor(private runionservice:ReunionService,private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit() {
    this.typeArray=["Reunion_Scrum","Reunion_Administratif"]

  /*  this.runionservice.findReunionByType(this.selectedType).subscribe(
      data => {console.log("rfgsdfrsssssssfqesr:"+JSON.stringify(data));   
      
                  this.reunionsObs.push(...data);
                  console.log("--------------------------------:"+JSON.stringify(this.reunionsObs));}
    );*/
    this.reloadData();
  }
  reloadData(){
    this.reunions= this.runionservice.findReunionByType(this.selectedType);
   
  }

  onChange1(event){

    //if(this.selectedType==TypeReunion.Reunion_Scrum){

      console.log("reunionnnnnnnnnnsc"+JSON.stringify(this.selectedType))

      this.reunions = this.runionservice.findReunionByType(this.selectedType);
   //  this.showEq=true;
   //  this.showDep=false;
   
   /* }
    if(this.selectedType==TypeReunion.Reunion_Administratif){

      console.log("reunionnnnnnnnnnnnn ad"+JSON.stringify(this.selectedType))

      this.reunionstrie=this.runionservice.findReunionByType(this.selectedType)
     // this.showDep=true;
     // this.showEq=false;*/
   
  //  }
   
  
}


deleteReunion(id:number){
  this.runionservice.deleteReunion(id)
  .subscribe(
  data=>{
    console.log(data);
   

   this.reloadData();
  },
  error=>console.log(error));
  
}



reunionDetails(id:number){
  this.router.navigate(['reunions/details/',id]);
}
updateReunion(id:number){
  this.router.navigate(['reunions/update/',id]);
}
gestionReunions(){
  this.router.navigate(['gestionReunions']);
}
}
