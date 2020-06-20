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
    return this.http.get(AppSettings.APP_URL+"/telecite/emlpoyes/")
  }
  findEmployesActivesOrNot(){

  }  

  findEmployeById(idEmploye:number){
    return this.http.get(AppSettings.APP_URL+"/telecite/emlpoyes/"+idEmploye)

  }

  createEmploye(employe:Employe){
    return this.http.post(AppSettings.APP_URL+"/telecite/emlpoyes/",employe)
  }

  login(email:string,password:string){
    let param =new HttpParams();
    param.append("email",email)
    param.append("password",password)
    return this.http.post(AppSettings.APP_URL+"/telecite/emlpoyes/login",param)
  }
  
  deleteEmploye(){
    
  }

  employeActif(){

  }
}
