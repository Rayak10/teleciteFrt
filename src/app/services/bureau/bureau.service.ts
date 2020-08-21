import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/settings/app.settings';
import { Bureau } from 'src/app/models/bureau';

@Injectable({
  providedIn: 'root'
})
export class BureauService {
  constructor(private http: HttpClient) { }

  
  findAllBureaux(){
    return this.http.get<Bureau[]>(AppSettings.APP_URL+"/bureaux/")
  }
  

  findBureauById(idBureau:number){
    return this.http.get<Bureau>(AppSettings.APP_URL+"/bureaux/"+idBureau)

  }
  findEmployeBureau(idEmloye:number){
    return this.http.get<Bureau>(AppSettings.APP_URL+"/bureaux/employeBureau/"+idEmloye)

  }

  createBureau(bureau:Bureau){
    return this.http.post<Bureau>(AppSettings.APP_URL+"/bureaux/",bureau)
  }
  updateBureau (idBureau:number,value:any){
   
   return this.http.put<Bureau>(AppSettings.APP_URL+"/bureaux/update/"+idBureau,value)
  }

  
  deleteBureau(idBureau:number){
    return this.http.delete(AppSettings.APP_URL+"/bureaux/"+idBureau)
    
  }
 

}
