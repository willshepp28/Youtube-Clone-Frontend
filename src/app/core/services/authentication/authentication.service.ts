import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userLoggedIn = new BehaviorSubject(this.hasToken());

  constructor(private http: HttpClient) { }

  private API_URL: any = environment.baseUrl + "/authentication";


  getToken(): string {
    return localStorage.getItem("token");
  }

  hasToken() {
    return !!localStorage.getItem("token");
  }

  isLoggedIn() {
    return this.userLoggedIn.asObservable();
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
          this.userLoggedIn.next(true);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem("has_channel")
    this.userLoggedIn.next(false);
  }
}
