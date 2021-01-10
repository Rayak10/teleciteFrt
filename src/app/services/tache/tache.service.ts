import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Userstory } from 'src/app/models/userStory';
import { AppSettings } from 'src/app/settings/app.settings';
import { Tache } from 'src/app/models/tache';
import { Employe } from 'src/app/models/employe';

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  constructor(private http: HttpClient) { }

  findAllTache(){
    return this.http.get<Tache[]>(AppSettings.APP_URL+"/taches/")
  }
  findAllTacheByUserstory(idUserStory:number){
    return this.http.get<Tache[]>(AppSettings.APP_URL+"/taches/all/"+idUserStory)
  }
  findTacheById(idTache:number){
    return this.http.get<Tache>(AppSettings.APP_URL+"/taches/"+idTache)

  }
  findEmployeTache(idTache:number){
    return this.http.get<Employe>(AppSettings.APP_URL+"/taches/employeTache"+idTache)
  }
  
  
  createTache(tache:Tache){
    return this.http.post<Tache>(AppSettings.APP_URL+"/taches/",tache)
  }
  updateTache(idTache:number,value:any){
   
   return this.http.put<Tache>(AppSettings.APP_URL+"/taches/update/"+idTache,value)
  }
  updateTacheEmploye(idTache:number,idEmploye:number,value:any){
   
    return this.http.put<Tache>(AppSettings.APP_URL+"/taches/afectationEmployeTache/"+idTache+"/"+idEmploye,value)
   }
  deleteTache(idTache:number){
    return this.http.delete(AppSettings.APP_URL+"/taches/"+idTache)
    
  }


}
