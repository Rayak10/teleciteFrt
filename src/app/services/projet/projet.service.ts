import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Projet } from 'src/app/models/projet';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  constructor(private http: HttpClient) { }

  findAllProjets(){
    return this.http.get<Projet[]>(AppSettings.APP_URL+"/projets/")
  }
  findProjetById(idProjet:number){
    return this.http.get<Projet>(AppSettings.APP_URL+"/projets/"+idProjet)

  }

  createProjet(projet:Projet){
    return this.http.post<Projet>(AppSettings.APP_URL+"/projets/",projet)
  }
  updateProjet(idProjet:number,value:any){
   
   return this.http.put<Projet>(AppSettings.APP_URL+"/projets/update/"+idProjet,value)
  }
  deleteProjet(idProjet:number){
    return this.http.delete(AppSettings.APP_URL+"/projets/"+idProjet)
    
  }


}
