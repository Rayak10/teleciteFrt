import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import { EmployeService } from 'src/app/services/employe/employe.service';
import { Authentification } from 'src/app/models/authentification';
import { Employe } from 'src/app/models/employe';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/settings/app.settings';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../resources/bootstrap/css/bootstrap.min.css','./login.component.css']
})
export class LoginComponent implements OnInit {
  id:any;
  errorMessage: string;
  private loginForm: FormGroup;
employe:Employe=new Employe();
  constructor(private employeservice:EmployeService,private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
   } 
   authentification:Authentification=new Authentification();
  


  ngOnInit() {
    this.authentification.email=this.login.value;
    this.authentification.password=this.password.value;

  }

  loginUser() {
    this.errorMessage = "";
    if (this.loginForm.invalid) {
      this.errorMessage = "EMail and / or password is incorrect";
      return;
    }
    this.employeservice.login1(this.authentification)
      .pipe()
      .subscribe(data => {
        localStorage.setItem('currentEmploye', JSON.stringify(data));
        this.employe=data;
        AppSettings.userRole=data.role.nomRole;
        localStorage.setItem('token', this.employe.token);
        localStorage.setItem('role', this.employe.role.nomRole);

              /*this.employeservice.findEmployeByEmail(this.authentification.email)
        .subscribe(data=>{
          console.log("g"+JSON.stringify(data))

          this.employe=data;

          AppSettings.userRole=data.role.nomRole;

        })*/

          console.log("roleeeeeeeeeeeeeeeeeeeee"+AppSettings.userRole)
          this.router.navigate(['/affectationRessources/',this.employe.idEmploye]);
          
      }, error => {
        if(error.status === 404) {
          this.errorMessage = "No user was found with the following Email/Password";
        }
        if(error.status === 400) {
          this.errorMessage = "Email et / ou mot de passe incorrect";
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
