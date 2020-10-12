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

export class ListReunionsComponent implements OnInit{
  reunions: Observable<Reunion[]>;
  reunionsSort:Reunion[];
  typeArray= [];
  reunionsObs: Reunion[]=[];
  TypeReunion=TypeReunion;
reunionAd:TypeReunion.Reunion_Administratif;
reunion:Reunion;
  selectedType:TypeReunion = TypeReunion.Reunion_Administratif;
  reunionstrie: Observable<Reunion[]>;
 
  constructor(private reunionservice:ReunionService,private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit() {
    this.typeArray=["Reunion_Scrum","Reunion_Administratif"]
    this.findReunionsByType();
  /*  this.runionservice.findReunionByType(this.selectedType).subscribe(
      data => {console.log("rfgsdfrsssssssfqesr:"+JSON.stringify(data));   
      
                  this.reunionsObs.push(...data);
                  console.log("--------------------------------:"+JSON.stringify(this.reunionsObs));}
    );*/
    this.reloadData()
  }
  reloadData(){
    this.reunions= this.reunionservice.findReunionByType(this.selectedType);
   
  }

  onChange1(event){

      this.findReunionsByType();
      
   
  
}
findReunionsByType(){
  this.reunionservice.findReunionByType(this.selectedType).subscribe(
    resp  =>{ this.reunionsSort = resp;
      console.log("reunionnnnnnnnnnsc"+JSON.stringify(this.reunionsSort ))

    }
  );

}

deleteReunion(id:number){
  this.reunionservice.deleteReunion(id)
  .subscribe(
  data=>{
    console.log(data);
   
    this.findReunionsByType();

  },
  error=>console.log(error));
  console.log("selectedtype"+JSON.stringify+this.selectedType)
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
