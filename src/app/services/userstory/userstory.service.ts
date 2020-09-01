import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sprint } from 'src/app/models/sprint';
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
  findUserstoryById(idUserStory:number){
    return this.http.get<Userstory>(AppSettings.APP_URL+"/userStorys/"+idUserStory)

  }
  findAllStoriessprint(idSprint:number){
    return this.http.get<Userstory>(AppSettings.APP_URL+"/userStorys/all/"+idSprint)

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
