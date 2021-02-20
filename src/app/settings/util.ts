
import { HttpHeaders } from '@angular/common/http';
export function createAuthorizationHeader() : HttpHeaders {
    let headers=new HttpHeaders({ "Content-Type": "application/json",
      'Authorization': "Bearer "+localStorage.getItem('token')
    });
    return headers;
  }