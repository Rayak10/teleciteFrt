import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/settings/app.settings';
import { Departement } from 'src/app/models/departement';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  constructor(private http: HttpClient) { }

  
  findAllDepartements(){ 
    return this.http.get<Departement[]>(AppSettings.APP_URL+"/departements/")
  }
  findEmployeDepartement(idEmloye:number){
    return this.http.get<Departement>(AppSettings.APP_URL+"/departements/employeDepartement/"+idEmloye)

  }

  findDepartementById(idDepartement:number){
    return this.http.get<Departement>(AppSettings.APP_URL+"/departements/"+idDepartement)

  }

  createDepartement(idDepartement:Departement){
    return this.http.post<Departement>(AppSettings.APP_URL+"/departements/",idDepartement)
  }
  updateDepartement (idDepartement:number,value:any){
   
   return this.http.put<Departement>(AppSettings.APP_URL+"/departements/update/"+idDepartement,value)
  }

  
  deleteDepartement(idDepartement:number){
    return this.http.delete(AppSettings.APP_URL+"/departements/"+idDepartement)
    
  }
 

}
