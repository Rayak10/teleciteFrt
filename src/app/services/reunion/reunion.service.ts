import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Reunion } from 'src/app/models/Reunion';
import { Tache } from 'src/app/models/tache';
import { TypeReunion } from 'src/app/models/typeReunion';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class ReunionService {
  constructor(private http: HttpClient) { }
  private _refresh = new Subject<void>();

  get refresh(){
   return this._refresh;
 } 
  findAllReunion(){
    return this.http.get<Reunion[]>(AppSettings.APP_URL+"/reunions/")
  }
  findAllReunionEquipe(nomEquipe:string){
    return this.http.get<Reunion[]>(AppSettings.APP_URL+"/reunions/all/"+nomEquipe)
  }
  findReunionById(idReunion:number){
    return this.http.get<Reunion>(AppSettings.APP_URL+"/reunions/"+idReunion)

  }
  findReunionDtoById(idReunion:number){
    return this.http.get<Reunion>(AppSettings.APP_URL+"/reunions/dto/"+idReunion)

  }
  
  findReunionByType(type:TypeReunion){
    return this.http.get<Reunion[]>(AppSettings.APP_URL+"/reunions/reunionsType/"+type)

  }
   
  createReunion(reunion:Reunion){
    return this.http.post<Reunion>(AppSettings.APP_URL+"/reunions/",reunion)
    .pipe(
      tap(() =>  {
        this._refresh.next();
      })
    );
  }
  
  updateRieunion(idReunion:number,value:any){
   
   return this.http.put<Reunion>(AppSettings.APP_URL+"/reunions/updateReunion/"+idReunion,value)
   .pipe(
    tap(() =>  {
      this._refresh.next();
    })
  );

  }
  deleteReunion(idReunion:number){
    return this.http.delete(AppSettings.APP_URL+"/reunions/"+idReunion)
    
  }

}
