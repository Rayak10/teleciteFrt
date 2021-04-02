import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs';
import { Employe } from 'src/app/models/employe';
import { EmployeService } from 'src/app/services/employe/employe.service';

@Component({
  selector: 'app-update-pwd',
  templateUrl: './update-pwd.component.html',
  styleUrls: ['./update-pwd.component.css']
})
export class UpdatePWDComponent implements OnInit {
  exform:FormGroup;
  employe:Employe;
  roleE:String;
  messageS:String="Employe modifié avec succès";
  messageE:String="Modification d'employe est échoué";
  id:number;
  employes: Observable<Employe[]>;

  constructor( private employeservice:EmployeService,private route: ActivatedRoute,
    private router: Router,private formBuilder:FormBuilder, private _service: NotificationsService) { }

  ngOnInit() {
    this.exform = new FormGroup({
      'password' : new FormControl('', [Validators.required,Validators.minLength(8)]),
      'confirme' : new FormControl(null,Validators.required),
    })
    this.roleE=localStorage.getItem('role')
    this.employe=new Employe();
    this.id=this.route.snapshot.params['id'];
    this.employeservice.findEmployeById(this.id)
    .subscribe(data=>{
      this.employe=data;
      if(localStorage.getItem('role')=='ROLE_DRH'){
      this.employe.password='';
      }});
  }
  updateEmploye(getpwdForm:NgForm){
    
      this.employeservice.updatepwd(this.id , this.employe )
    .subscribe(data=> this.onSuccess(this.messageS),error=>this.onErorr(this.messageE));
   
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
}
