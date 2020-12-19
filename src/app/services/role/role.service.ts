import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleMember } from 'src/app/models/roleMember';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }
  findAllRoles(){
    return this.http.get<RoleMember[]>(AppSettings.APP_URL+"/roles/")
    
  }
  
}
