import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'youtube-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean;
  errorHasOccurred = false;
  authenticated = false;
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  get formValues() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) { console.log("invalid"); return; }


    return this.authenticationService.logIn(this.loginForm.value).subscribe(
      res => {
        this.errorHasOccurred = false;
        this.authenticated = true;
        this.message = "User has successfully logged in"
        setTimeout (() => {
          this.router.navigate(['/home']);
          this.authenticated = false;
       }, 2000);
      },
      error => {
        // this.message = error.error.message;
        console.log(error);
        this.errorHasOccurred = true;
      }
    );
  }

}
