import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  private API_URL: any = environment.baseUrl + "/authentication";


  getToken(): string {
    return localStorage.getItem("token");
  }

  isLoggedIn(){
    return !!localStorage.getItem("token");
  }

  registerUser(userCredentials): any {
    return this.http.post<any>( this.API_URL + "/register", userCredentials);
  }

  logIn(userCredentials): any {
    console.log(this.API_URL);
    return this.http.post<any>( this.API_URL + "/login", userCredentials)
      .pipe(
        map(user => {
          localStorage.setItem('token', user.token);
          localStorage.setItem('has_channel', user.hasChannel);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }
}
