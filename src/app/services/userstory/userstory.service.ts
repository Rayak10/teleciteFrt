import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/settings/app.settings';
import { Userstory } from 'src/app/models/userStory';

@Injectable({
  providedIn: 'root'
})
export class UserstoryService {
  constructor(private http: HttpClient) { }

  findAllUserstory(){
    return this.http.get<Userstory[]>(AppSettings.APP_URL+"/userStorys/")
  }
  findAllUserstoryByProjet(idProjet:number){
    return this.http.get<Userstory[]>(AppSettings.APP_URL+"/userStorys/userstorysProjet/"+idProjet)
  }
  findUserstoryById(idUserStory:number){
    return this.http.get<Userstory>(AppSettings.APP_URL+"/userStorys/"+idUserStory)

  }
  findAllStoriessprint(idSprint:number){
    return this.http.get<Userstory[]>(AppSettings.APP_URL+"/userStorys/sprint/"+idSprint)

  }
  
  findUserstoryTache(idTache:number){
    return this.http.get<Userstory>(AppSettings.APP_URL+"/userStorys/userstoryTache/"+idTache)

  }
  createUserStory(userStory:Userstory){
    return this.http.post<Userstory>(AppSettings.APP_URL+"/userStorys/",userStory)
  }
  updateUserStory(idUserStory:number,value:any){
   
   return this.http.put<Userstory>(AppSettings.APP_URL+"/userStorys/update/"+idUserStory,value)
  }
  deleteUserStory(idUserStory:number){
    return this.http.delete(AppSettings.APP_URL+"/userStorys/"+idUserStory)
    
  }


}