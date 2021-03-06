import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bureau } from 'src/app/models/bureau';
import { AppSettings } from 'src/app/settings/app.settings';
import { Equipe } from 'src/app/models/equipe';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  constructor(private http: HttpClient) { }

  findAllEquipe(){
    return this.http.get<Equipe[]>(AppSettings.APP_URL+"/equipes/")
  }
  

  findEquipeById(idEquipe:number){
    return this.http.get<Equipe>(AppSettings.APP_URL+"/equipes/"+idEquipe)

  }
  
  findEquipeByNom(nomEquipe:String){
    return this.http.get<Equipe>(AppSettings.APP_URL+"/equipes/nom/"+nomEquipe)

  }
  findEmployeEquipe(idEmloye:number){
    return this.http.get<Equipe>(AppSettings.APP_URL+"/equipes/employeEquipe/"+idEmloye)

  }

  createEquipe(equipe:Equipe){
    return this.http.post<Equipe>(AppSettings.APP_URL+"/equipes/",equipe)
  }
  updateEquipe(idEquipe:number,value:any){
   
   return this.http.put<Equipe>(AppSettings.APP_URL+"/equipes/update/"+idEquipe,value)
  }

  
  deleteEquipe(idEquipe:number){
    return this.http.delete(AppSettings.APP_URL+"/equipes/"+idEquipe)
    
  }
 
}
