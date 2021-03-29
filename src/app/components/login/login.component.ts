import { Component, Input, OnInit,EventEmitter,Output } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

import { EmployeService } from 'src/app/services/employe/employe.service';
import { Authentification } from 'src/app/models/authentification';
import { Employe } from 'src/app/models/employe';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/settings/app.settings';
import { DatapassService } from 'src/app/services/datapass/datapass.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../resources/bootstrap/css/bootstrap.min.css','./login.component.css']
})
export class LoginComponent implements OnInit {
  private role:string="";
  id:any;
  errorMessage: string;
  loginForm : FormGroup
employe:Employe=new Employe();
  constructor(private dataPass: DatapassService,private employeservice:EmployeService,private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
   } 

   authentification:Authentification=new Authentification();
  
 

  ngOnInit() {
    this.loginForm = new FormGroup({
      login: new FormControl(null, [
       Validators.required,
       Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl(null, Validators.required)
    });
    this.authentification.email=this.login.value;
    this.authentification.password=this.password.value;

  }

  loginUser() {
    this.errorMessage = "";
    if (this.loginForm.invalid) {
      this.errorMessage = "L'email et / ou mot de passe incorrect";
      return;
    }
    this.employeservice.login1(this.authentification)
      .pipe()
      .subscribe(data => {
        localStorage.setItem('currentEmploye', JSON.stringify(data));
        this.employe=data;
        AppSettings.userRole=data.role.nomRole;
        localStorage.setItem('token', this.employe.token);
        const role: string =this.employe.role.nomRole;
        localStorage.setItem('role', this.employe.role.nomRole);
        localStorage.setItem('id', String(this.employe.idEmploye));
        localStorage.setItem('idEquipe', String(this.employe.equipe.idEquipe));
        this.role=this.employe.role.nomRole
        this.dataPass.child1DataChanges(this.role);
      
          switch(role){
            case 'ROLE_SCRUM_MASTER':  this.router.navigate(['/details/',this.employe.idEmploye]); break; 
            case 'ROLE_DRH':  this.router.navigate(['/details/',this.employe.idEmploye]); break; 
            case 'ROLE_PRODUCT_OWNER':  this.router.navigate(['/details/',this.employe.idEmploye]); break; 
            case 'ROLE_ROLE_EMPLOYE':  this.router.navigate(['/details/',this.employe.idEmploye]); break; 
            case 'ROLE_SCRUM_TEAM_MEMBER':  this.router.navigate(['/details/',this.employe.idEmploye]); break; 
            case 'ROLE_ROLE_DEV_TEAM_MEMBER':  this.router.navigate(['/details/',this.employe.idEmploye]); break; 
            
          }
          
          
      }, error => {
        if(error.status === 500) {
          this.errorMessage = "Aucun utilisateur n'a été trouvé avec ce e-mail / mot de passe ";
        }
        if(error.status === 404) {
          this.errorMessage = "L'email et / ou mot de passe incorrect(s)";
        }
        if(error.status === 403) {
          this.errorMessage = "Utilisateur n'est pas active";
        }
      });
    
      
      
  }

  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }
  

}
