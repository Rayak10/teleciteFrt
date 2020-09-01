import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/settings/app.settings';
import { Sprint } from 'src/app/models/sprint';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private http: HttpClient) { }

  findAllSprint(){
    return this.http.get<Sprint[]>(AppSettings.APP_URL+"/sprints/")
  }
  findAllSprintOrderByProjet(){
    return this.http.get<Sprint[]>(AppSettings.APP_URL+"/sprints/projets/")
  }
  findSprintById(idSprint:number){
    return this.http.get<Sprint>(AppSettings.APP_URL+"/sprints/"+idSprint)

  }
  findSprintsByProjet(idProjet:number){
    return this.http.get<Sprint[]>(AppSettings.APP_URL+"/sprints/projet/"+idProjet)

  }
  findByEtatSprint(etatSprint:String ){
    return this.http.get<Sprint>(AppSettings.APP_URL+"/sprints/etat/"+etatSprint)

  }
  createSprint(sprint:Sprint){
    return this.http.post<Sprint>(AppSettings.APP_URL+"/sprints/",sprint)
  }
  updateSprint(idSprint:number,value:any){
   
   return this.http.put<Sprint>(AppSettings.APP_URL+"/sprints/update/"+idSprint,value)
  }
  deleteSprint(idSprint:number){
    return this.http.delete(AppSettings.APP_URL+"/sprints/"+idSprint)
    
  }


}
