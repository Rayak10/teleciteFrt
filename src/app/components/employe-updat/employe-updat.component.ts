import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/models/employe';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import { Bureau } from 'src/app/models/bureau';
import { Equipe } from 'src/app/models/equipe';
import { Departement } from 'src/app/models/departement';
import { DepartementService } from 'src/app/services/departement/departement.service';
import { EquipeService } from 'src/app/services/equipe/equipe.service';
import { BureauService } from 'src/app/services/bureau/bureau.service';
import {TIME_ZONE_OFFSET} from '../../settings/app.settings';

@Component({
  selector: 'app-employe-updat',
  templateUrl: './employe-updat.component.html',
  styleUrls: ['./employe-updat.component.css']
})
export class EmployeUpdatComponent implements OnInit {
  bureau:Bureau;
  equipe:Equipe;
  departement:Departement;
  bureauArray = [];
  departementArray = [];
  equipeArray= [];
  id:number;
  modifedBureau:number;
  modifedDepartement:number;
  modifedEquipe:number;
  employe:Employe;
  employes: Observable<Employe[]>;
  selectedDepartementId:number;
  selectedEquipeId:number;
  selectedBureauId: number;
  urllink:any="";  
  selectedFile: File;
  retrievedImage: any;
  public userFile : any =File;
  message:string;
    public imagePath;

  offset: number =new Date().getTimezoneOffset() * 60 * 1000;
  
  constructor(private employeservice:EmployeService,private route: ActivatedRoute, private router: Router,private departementservice:DepartementService,private equipeservice:EquipeService,private bureauservice:BureauService) { }
  
  ngOnInit() {
    
    this.employe=new Employe();
    
    this.id=this.route.snapshot.params['id'];
    this.employeservice.findEmployeById(this.id)
    .subscribe(data=>{
      //console.log(data)
      this.employe=data;
      console.log("employeUpdate: "+JSON.stringify(this.employe.photo))
 this.bureauservice.findAllBureaux().subscribe(
      data => {console.log("data from find all bureau:"+JSON.stringify(data));   
      
                  this.bureauArray.push(...data);}
    );
    this.equipeservice.findAllEquipe().subscribe(
      data => {console.log("data from find all Equipe:"+JSON.stringify(data));   
      
                  this.equipeArray.push(...data);}
    );
    this.departementservice.findAllDepartements().subscribe(
      data => {console.log("data from find all dep:"+JSON.stringify(data));  
      
                  this.departementArray.push(...data);}
    );
 
      
      if (this.employe.bureau== null){
        this.employe.bureau=new Bureau();
        this.employe.bureau.idBureau = null;
      }
 
      if (this.employe.departement== null){
        this.employe.departement=new Departement();
        this.employe.departement.idDepartement= null;
      }
 
      if (this.employe.equipe== null){
        this.employe.equipe=new Equipe();
        this.employe.equipe.idEquipe  = null;
      }

      this.employe.dateEmbauche = new Date(new Date(this.employe.dateEmbauche))
      this.employe.dateNaissance = new Date(new Date(this.employe.dateNaissance));


      console.log("employeUpdate: "+JSON.stringify(this.employe))
    }, error=>console.log(error));
    
  }
  

updateEmploye(){


  this.employeservice.updateEmploye(this.id , this.employe )
  .subscribe(data=> console.log(data),error=>console.log(error)),
  
   

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
OnSelectFile(event){
  if (event.target.files.length > 0)
  {
    const file = event.target.files[0];
 console.log(file);

    this.userFile=file;
    console.log(this.userFile);
    var mineType = event.target.files[0].type;
    if( mineType.match(/image\/*/) == null){
      this.message="on supporte que les images";
      return;
    }
  
  
    var reader = new FileReader();
    this.imagePath=file;
    reader.readAsDataURL(file);

    reader.onload=(event:any)=>{
      this.urllink=event.target.result;
    }
  }
}


}
