import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bureau } from 'src/app/models/bureau';
import { Commentaire } from 'src/app/models/Commentaire';
import { AppSettings } from 'src/app/settings/app.settings';
import{Observable, Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  constructor(private http: HttpClient) { }

  
  findremarquesSprint(idSprint){
    return this.http.get<Commentaire[]>(AppSettings.APP_URL+"/remarques/remarquesSprint/"+idSprint)
    
  }
  findremarqueById(idCommentaire:number){
    return this.http.get<Commentaire>(AppSettings.APP_URL+"/remarques/"+idCommentaire)
    
  }
  
  createCommentaire(commentaire:Commentaire){
    return this.http.post<Commentaire>(AppSettings.APP_URL+"/remarques/",commentaire)
  }
  updateCommentaire (idCommentaire:number,value:any){
   
   return this.http.put<Commentaire>(AppSettings.APP_URL+"/remarques/update/"+idCommentaire,value)
  }

  
  deleteBureau(idCommentaire:number){
    return this.http.delete(AppSettings.APP_URL+"/remarques/"+idCommentaire)
    
  }
 private _listners= new Subject<any>();
 listen():Observable<any>{
   return this._listners.asObservable();
 }
filter(filterBy:String){
  this._listners.next(filterBy);
}
}
