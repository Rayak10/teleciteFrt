import { Component, OnInit } from '@angular/core';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { FormBuilder,Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { Employe } from 'src/app/models/employe';
import { Observable } from 'rxjs';
import { Bureau } from 'src/app/models/bureau';
import { BureauService } from 'src/app/services/bureau/bureau.service';
import { DepartementService } from 'src/app/services/departement/departement.service';
import { Departement } from 'src/app/models/departement';
import { EquipeService } from 'src/app/services/equipe/equipe.service';
import { Equipe } from 'src/app/models/equipe';
import { RoleMember } from 'src/app/models/roleMember';
import { RoleService } from 'src/app/services/role/role.service';
import { DialogConfirmService } from 'src/app/services/confirm/dialog-confirm.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-gestion-comptes',
  templateUrl: './gestion-comptes.component.html',
  styleUrls: ['./gestion-comptes.component.css']
})
export class GestionComptesComponent implements OnInit {
  exform:FormGroup;
  employe:Employe=new Employe();
  submitted = false;
  employes: Observable<Employe[]>;
  errorMessage: string;
  successMessage: string;
  mySubscription: any; 
  bureau:Bureau;
  role:RoleMember;
  equipe:Equipe;
  departement:Departement;
  bureauArray = [];
  roleArray = [];
  departementArray = [];
  equipeArray= [];
  selectedDepartementId:number;
  selectedEquipeId:number;
  selectedBureauId: number;
  selectedRoleId: number;
  public imagePath;
  roleE:string;
  offset: number =new Date().getTimezoneOffset() * 60 * 1000;
  urllink:any="../../assets/telecite.webp";  
  selectedFile: File;
  retrievedImage: any;
  public userFile : any =null;
  message:string;
  messageS:String="Employe ajouté avec succès";
  messageE:String="Ajout d'employe est échoué";
  constructor(private employeservice:EmployeService,private departementservice:DepartementService,
    private roleservice:RoleService,private equipeservice:EquipeService,private bureauservice:BureauService,
     private router: Router,private formBuilder: FormBuilder,private dialogService:DialogConfirmService, private _service: NotificationsService) {}

  ngOnInit() {
  
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
      'equipe' : new FormControl(null,Validators.required),
      'password' : new FormControl('', [Validators.required,Validators.minLength(8)]),
      'confirme' : new FormControl(null,Validators.required),
    })

    this.roleE=localStorage.getItem('role')
    this.reloadData();
  
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
    this.employe.departement=null;
    this.employe.bureau=null;
    this.employe.equipe=null;
    this.employe.equipe=null;
    this.employe.role=null;

  }
  get password(){return this.exform.get('password')}

  newEmployee(): void {
    this.submitted = false;
    this.employe= new Employe();
  }
  onSubmit(getCompteForm:NgForm) {
    this.submitted = true;
    getCompteForm.reset();
     this.gotoList();
  }

  save(getCompteForm:NgForm) {
    var formData = new FormData();
    if(this.userFile==null){
      this.employe.dateNaissance = new Date(new Date(this.employe.dateNaissance).getTime() - this.offset);
    this.employe.dateEmbauche = new Date(new Date(this.employe.dateEmbauche).getTime() - this.offset);
    this.employeservice.createEmploye(this.employe)
      .subscribe(resp=> this.onSuccess(this.messageS),error=>this.onErorr(this.messageE));
    }
    else{
    formData.append('employee',JSON.stringify(this.employe))  ;
    formData.append('file',this.userFile);
    this.employeservice.saveEmployeProfile(formData).subscribe(
      resp=> this.onSuccess(this.messageS),error=>this.onErorr(this.messageE))
    }
this.gotoList();
  }
  
  
  
  checkEmploye() {
    if (localStorage.getItem('currentEmploye') === undefined || localStorage.getItem('currentEmploye') === null) {
      this.router.navigate(['/login']);
      return;
    }
    this.employe = JSON.parse(localStorage.getItem('currentEmploye'));
  }
reloadData(){
  this.urllink
  this.employes= this.employeservice.findAllEmployes();
  
}

  deleteEmploye(id:number){


    this.dialogService.openConfirmDialog('êtes-vous sûr de supprimer cet employe ?')
    .afterClosed().subscribe(res =>{
    if(res) {
      let resp=this.employeservice.deleteEmploye(id);
      resp.subscribe(
      data=>{
        console.log(data);
        
       this.reloadData();
      
      },
      error=>console.log(error));
      
      this.employeservice.filter('delete ok?')
    }
  })}
  


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

    
  

  employeDetails(id:number){
    this.router.navigate(['details',id]);
  }
  updateEmploye(id:number){
    this.router.navigate(['update',id]);
  }
  gotoList(){
    this.router.navigate(['gestionComptes']);
  }



  setDefaultValues() {
    this.employe.active = true;
   
 }
 
 onChangeBureau(event){
   
  this.employe.bureau = {idBureau:this.selectedBureauId,nomBureau:''};
  //console.log(JSON.stringify(this.employe.bureau.idBureau));
 
}
onChangeRole(event){
   
  this.employe.role = {idRole:this.selectedRoleId,nomRole:''};
  //console.log(JSON.stringify(this.employe.bureau.idBureau));
 
}
onChangeDepartement(event){
  this.employe.departement = {idDepartement:this.selectedDepartementId,nomDepartement:''};
  //console.log(JSON.stringify(this.employe.departement.idDepartement));
}
onChangeEquipe(event){
   
  this.employe.equipe = {idEquipe:this.selectedEquipeId,nomEquipe:'',specialite:''};
 // console.log(JSON.stringify(this.employe.equipe.idEquipe));

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