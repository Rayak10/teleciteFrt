import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/settings/app.settings';
import { Userstory } from 'src/app/models/userStory';
import { Observable } from 'rxjs';

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
  userstorysSprintBaclogProjet(idProjet:number){
    return this.http.get<Userstory[]>(AppSettings.APP_URL+"/userStorys/userstorysSprintBaclogProjet/"+idProjet)
  }
  findUserstoryById(idUserStory:number){
    return this.http.get<Userstory>(AppSettings.APP_URL+"/userStorys/"+idUserStory)

  }
  findAllStoriessprint(idSprint:number){
    return this.http.get<Userstory[]>(AppSettings.APP_URL+"/userStorys/sprint/"+idSprint)

  }
  findUserStorysSprintByProjet(idProjet:number,idSprint:number){
    return this.http.get<Userstory[]>(AppSettings.APP_URL+"/userStorys/userstorysSprintProjet/"+idProjet+"/"+idSprint)
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
  
  updateSprintUserStory(idUserStory:number,idSprint:number,value:any){
   
    return this.http.put<Userstory>(AppSettings.APP_URL+"/userStorys/updateSprintUserStory/"+idUserStory+"/"+idSprint,value)
    }
    
  deleteUserStory(idUserStory:number){
    return this.http.delete(AppSettings.APP_URL+"/userStorys/"+idUserStory)
    
  }
  etatUserstoryById(idUserStory:number){
    return this.http.get<boolean>(AppSettings.APP_URL+"/userStorys/UserStoryNonTerminerBySprint/"+idUserStory);
}
tableComplexite(idProjet:number){
  return this.http.get<number[]>(AppSettings.APP_URL+"/userStorys/tablecomplexite/"+idProjet);
}


}
