import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient){}

  public loginWithUsernameAndPassword(username:string, password:string) {
    const url = environment.baseUrl + "/login/";
    const body = {
      "username": username,
      "password": password
    };

    return lastValueFrom(this.http.post(url, body));
  }

  public register(userData: any): Observable<any> {
    const registerUrl = environment.baseUrl + "/register/";
    return this.http.post(registerUrl, userData);
  }
}
