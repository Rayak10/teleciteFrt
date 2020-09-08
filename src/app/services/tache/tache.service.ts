import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Userstory } from 'src/app/models/userStory';
import { AppSettings } from 'src/app/settings/app.settings';
import { Tache } from 'src/app/models/tache';

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
  /*findAllTachesprint(idSprint:number){
    return this.http.get<Tache[]>(AppSettings.APP_URL+"/taches/sprint/"+idSprint)
  }*/
  
  
  createTache(tache:Tache){
    return this.http.post<Tache>(AppSettings.APP_URL+"/taches/",tache)
  }
  updateTache(idTache:number,value:any){
   
   return this.http.put<Tache>(AppSettings.APP_URL+"/taches/update/"+idTache,value)
  }
  deleteTache(idTache:number){
    return this.http.delete(AppSettings.APP_URL+"/taches/"+idTache)
    
  }


}
