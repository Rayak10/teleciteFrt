import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs';
import { Bureau } from 'src/app/models/bureau';
import { Departement } from 'src/app/models/departement';
import { Employe } from 'src/app/models/employe';
import { Equipe } from 'src/app/models/equipe';
import { BureauService } from 'src/app/services/bureau/bureau.service';
import { DepartementService } from 'src/app/services/departement/departement.service';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { EquipeService } from 'src/app/services/equipe/equipe.service';
import { RoleService } from 'src/app/services/role/role.service';

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
  roleArray = [];
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
  urllink:any="../../assets/telecite.webp";  
  selectedFile: File;
  retrievedImage: any;
  defaultChoice:number;
  etatArray= [];
  test:boolean=true;
  public userFile : any =File;
  message:string;
    public imagePath;
  offset: number =new Date().getTimezoneOffset() * 60 * 1000;
  roleE:string;
  exform:FormGroup;
  messageS:String="Employe modifié avec succès";
  messageE:String="Modification d'employe est échoué";
  constructor(private employeservice:EmployeService,private roleservice:RoleService,private route: ActivatedRoute,
     private router: Router,private departementservice:DepartementService,private equipeservice:EquipeService,
     private bureauservice:BureauService, private _service: NotificationsService) { }
  
  ngOnInit() {
    this.employeservice.refresh.subscribe(()=>{
      this.reloadData();
          });
          
    this.exform = new FormGroup({
      'prenom' : new FormControl(null,Validators.required),
      'naissance' : new FormControl(null,Validators.required),
      'embauche' : new FormControl(null,Validators.required),
      'post' : new FormControl(null,Validators.required),
      'role' : new FormControl(null,Validators.required),
      'nom' : new FormControl(null,Validators.required),
      'matricule' : new FormControl(null,Validators.required),
      'bureau' : new FormControl(null,Validators.required),
      'departement' : new FormControl(null,Validators.required),
      'email' : new FormControl(null,[Validators.required,
                                      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      'salaire' : new FormControl(null,Validators.required),
      'status' : new FormControl(null,Validators.required),
      'equipe' : new FormControl(null,Validators.required),
      'password' : new FormControl('', [Validators.required,Validators.minLength(8)]),
      'confirme' : new FormControl(null,Validators.required),
    })
    
    this.roleE=localStorage.getItem('role')
    this.etatArray=[
      {idEtat:1,nomEtat:"Active"},
      {idEtat:2,nomEtat:"Inactive"}

    ]

    this.employe=new Employe();
    
    this.id=this.route.snapshot.params['id'];
    this.employeservice.findEmployeById(this.id)
    .subscribe(data=>{
      this.employe=data;
      if(localStorage.getItem('role')=='ROLE_DRH'){
      this.employe.password=''
      }
      console.log("userrrrrrrrrrrrrrrr"+this.employe.fileName)
      if(this.employe.active==true){
      this.defaultChoice=1;}
      
      else{
      this.defaultChoice=2;
    }
     
      console.log("employeUpdate: "+JSON.stringify(this.employe.photo))
 this.bureauservice.findAllBureaux().subscribe(
      data => {console.log("data from find all bureau:"+JSON.stringify(data));   
      
                  this.bureauArray.push(...data);}
    );
    this.roleservice.findAllRoles().subscribe(
      data => {console.log("data from find all bureau:"+JSON.stringify(data));   
      
                  this.roleArray.push(...data);}
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
  

updateEmploye(getCompteForm:NgForm){
  if(localStorage.getItem('role')=='ROLE_SCRUM_MASTER'){
    this.employeservice.updateProfilRoleScrummaster(this.id , this.employe )
  .subscribe(data=> this.onSuccess(this.messageS),error=>this.onErorr(this.messageE));
  }
if ((this.test==true) && (localStorage.getItem('role')!='ROLE_SCRUM_MASTER')){
  this.employeservice.updateEmploye(this.id , this.employe )
  .subscribe(data=> this.onSuccess(this.messageS),error=>this.onErorr(this.messageE));
}
else{
  var formData = new FormData();
  formData.append('employee',JSON.stringify(this.employe))  ;
  formData.append('file',this.userFile);
  this.employeservice.updateProfil(formData).subscribe(data=> this.onSuccess(this.messageS),
  error=>console.log(error));

}


    this.gotoList();
    this.reloadData();
  
}
onSuccess(messageS){
  this._service.success('Success',messageS, {
    position: ['bottom','right'],
    timeOut: 2000,
    animate: 'fade',
    showProgressBar: true
  })}
  onErorr(messageE){
    this._service.error('Erreur',messageE, {
      position: ['bottom','right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    })}

gotoList(){
  this.router.navigate(['gestionComptes']);
}
reloadData(){
  this.employes= this.employeservice.findAllEmployes();
  
}
onEtatSelected(event){

 if (this.defaultChoice==1){
   this.employe.active=true;

 }
  if(this.defaultChoice==2){
this.employe.active=false;
}
console.log("eeeeeeeeeeeeee"+ this.employe.active)
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
  this.test=false;
}


}
