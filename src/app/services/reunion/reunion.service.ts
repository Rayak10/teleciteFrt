import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reunion } from 'src/app/models/Reunion';
import { Tache } from 'src/app/models/tache';
import { TypeReunion } from 'src/app/models/typeReunion';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class ReunionService {
  constructor(private http: HttpClient) { }

  findAllReunion(){
    return this.http.get<Reunion[]>(AppSettings.APP_URL+"/reunions/")
  }
  findAllReunionEquipe(nomEquipe:string){
    return this.http.get<Reunion[]>(AppSettings.APP_URL+"/reunions/all/"+nomEquipe)
  }
  findReunionById(idReunion:number){
    return this.http.get<Reunion>(AppSettings.APP_URL+"/reunions/"+idReunion)

  }
  findReunionByType(type:TypeReunion){
    return this.http.get<Reunion[]>(AppSettings.APP_URL+"/reunions/reunionsType/"+type)

  }
  /*findAllTachesprint(idSprint:number){
    return this.http.get<Tache[]>(AppSettings.APP_URL+"/taches/sprint/"+idSprint)
  }*/
  
  
  createReunion(reunion:Reunion){
    return this.http.post<Reunion>(AppSettings.APP_URL+"/reunions/",reunion)
  }
  updateRieunion(idReunion:number,value:any){
   
   return this.http.put<Reunion>(AppSettings.APP_URL+"/reunions/updateReunion/"+idReunion,value)
  }
  deleteReunion(idReunion:number){
    return this.http.delete(AppSettings.APP_URL+"/reunions/"+idReunion)
    
  }


}
