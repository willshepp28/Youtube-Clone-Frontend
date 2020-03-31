import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './core/services/authentication/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean;
  constructor(
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authenticationService.isLoggedIn();
    console.log(this.isLoggedIn);
  }

}
