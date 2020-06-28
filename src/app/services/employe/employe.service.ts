import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppSettings } from 'src/app/settings/app.settings';
import { Employe } from 'src/app/models/employe';



@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private http: HttpClient) { }

  findAllEmployes(){
    return this.http.get<Employe[]>(AppSettings.APP_URL+"/emlpoyes/")
  }
  findEmployesActivesOrNot(active:boolean){
return this.http.get<Employe[]>(AppSettings.APP_URL+"/emlpoyes/AllActives/"+active)
  }  

  findEmployeById(idEmploye:number){
    return this.http.get<Employe>(AppSettings.APP_URL+"/emlpoyes/"+idEmploye)

  }

  createEmploye(employe:Employe){
    return this.http.post<Employe>(AppSettings.APP_URL+"/emlpoyes/",employe)
  }

  login(email:string,password:string){
    return this.http.post<Employe>(AppSettings.APP_URL + "/emlpoyes/login?email=" + email + "&password=" + password, null);
  }
  
  deleteEmploye(idEmploye:number){
    return this.http.get<Employe>(AppSettings.APP_URL+"/emlpoyes/"+idEmploye)
    
  }

  employeActif(idEmploye:number,isActive:boolean){
return this.http.get<Employe>(AppSettings.APP_URL+"/emlpoyes/active/"+idEmploye+"/"+isActive)
  }
}
