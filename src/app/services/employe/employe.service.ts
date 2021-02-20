import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppSettings } from 'src/app/settings/app.settings';
import { Employe } from 'src/app/models/employe';
import { Bureau } from 'src/app/models/bureau';

import { Observable ,Subject} from 'rxjs';
import { Departement } from 'src/app/models/departement';
import { FormGroup } from '@angular/forms';
import { Authentification } from 'src/app/models/authentification';
import { createAuthorizationHeader } from 'src/app/settings/util';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  public dataForm:  FormGroup; 

  constructor(private http: HttpClient) { }

  findAllEmployes(){
    return this.http.get<Employe[]>(AppSettings.APP_URL+"/employes/")
  }
  findAllEmployesDepartement(idDepartement:number){
    return this.http.get<Employe[]>(AppSettings.APP_URL+"/employes/employesdepartement/"+idDepartement)
  }
  findAllEmployesEquipe(idEquipe:number){
    return this.http.get<Employe[]>(AppSettings.APP_URL+"/employes/employesEquipe/"+idEquipe)
  }
  findAllEemployesReunion(idReunion:number){
    return this.http.get<Employe[]>(AppSettings.APP_URL+"/employes/employesReunions/"+idReunion)
  }
  findAllBureaux():Observable<any>{
    return this.http.get<Bureau[]>(AppSettings.APP_URL+"/bureaux/")
  }
  
  updateEmployeProfile(formData: FormData): Observable<any> {
    return this.http.put(AppSettings.APP_URL+"/employes/updateProfile", formData);
  }
  findEmployesActivesOrNot(active:boolean){
return this.http.get<Employe[]>(AppSettings.APP_URL+"/employes/AllActives/"+active)
  }  

  findEmployeById(idEmploye:number){
    return this.http.get<Employe>(AppSettings.APP_URL+"/employes/"+idEmploye)

  }
  findEmployeByEmail(email:String){
    return this.http.get<Employe>(AppSettings.APP_URL+"/employes/email/"+email)

  }
  saveEmployeProfile(formData: FormData): Observable<any> {
  //  let headers = createAuthorizationHeader();
  let headers= new HttpHeaders({
  'Authorization': "Bearer "+localStorage.getItem('token')
});
    return this.http.post(AppSettings.APP_URL+"/employes/"+localStorage.getItem('role')+"/saveEmployeProfile", formData, {headers: headers});
  }
  createEmploye(employe:Employe){
    let headers = createAuthorizationHeader();
    return this.http.post<Employe>(AppSettings.APP_URL+"/employes/"+localStorage.getItem('role')+"/createEmploye",employe, {headers: headers})
  }
  updateEmploye (idEmploye:number,value:any){
   
   return this.http.put<Employe>(AppSettings.APP_URL+"/employes/update/"+idEmploye,value)
  }

  login(email:string,password:string){
    return this.http.post<Employe>(AppSettings.APP_URL + "/employes/login?email=" + email + "&password=" + password, null);
  }
  login1(authentification:Authentification){
    return this.http.post<Employe>(AppSettings.APP_URL +"/employes/auth",authentification);
  }
  
  deleteEmploye(idEmploye:number){
    return this.http.delete(AppSettings.APP_URL+"/employes/"+idEmploye)
    
  }
  private listners=new Subject<any>();
   listen():Observable<any>{
     return this.listners.asObservable();
   }
   filter(filterBy: String){
     this.listners.next(filterBy);
   }
  employeActif(idEmploye:number,isActive:boolean){
return this.http.get<Employe>(AppSettings.APP_URL+"/employes/active/"+idEmploye+"/"+isActive)
  }

}
