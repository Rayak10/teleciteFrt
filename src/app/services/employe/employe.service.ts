import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppSettings } from 'src/app/settings/app.settings';
import { Employe } from 'src/app/models/employe';
import { Bureau } from 'src/app/models/bureau';

import { Observable ,Subject} from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Authentification } from 'src/app/models/authentification';
import { createAuthorizationHeader } from 'src/app/settings/util';
import { HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  public dataForm:  FormGroup; 

  constructor(private http: HttpClient) { }
  private _refresh = new Subject<void>();

 get refresh(){
  return this._refresh;
}
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
  updateProfil(formData: FormData): Observable<any> {
  
    return this.http.put(AppSettings.APP_URL+"/employes/updateProfil", formData);
  }
  saveEmployeProfile(formData: FormData): Observable<any> {
    let headers= new HttpHeaders({
    'Authorization': "Bearer "+localStorage.getItem('token')
  });
      return this.http.post(AppSettings.APP_URL+"/employes/"+localStorage.getItem('role')+"/saveEmployeProfile", formData, {headers: headers});
    }
  createEmploye(employe:Employe):Observable<Employe>{
    let headers = createAuthorizationHeader();
    return this.http.post<Employe>(AppSettings.APP_URL+"/employes/"+localStorage.getItem('role')+"/createEmploye",employe, {headers: headers})
  .pipe(
    tap(() =>  {
      this._refresh.next();
    })
  );
}

updateProfilRoleScrummaster (idEmploye:number,value:any){
   
  return this.http.put<Employe>(AppSettings.APP_URL+"/employes/updateProfilRoleScrummaster/"+idEmploye,value)
  .pipe(
   tap(() =>  {
     this._refresh.next();
   })
 );
}
  updateEmploye (idEmploye:number,value:any){
   return this.http.put<Employe>(AppSettings.APP_URL+"/employes/update/"+idEmploye,value)
   .pipe(
    tap(() =>  {
      this._refresh.next();
    })
  );
}
updatepwd (idEmploye:number,value:any){
   
  return this.http.put<Employe>(AppSettings.APP_URL+"/employes/updatepwd/"+idEmploye,value)
  .pipe(
   tap(() =>  {
     this._refresh.next();
   })
 );
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

  employeActif(idEmploye:number,isActive:boolean){
return this.http.get<Employe>(AppSettings.APP_URL+"/employes/active/"+idEmploye+"/"+isActive)
  }

}
