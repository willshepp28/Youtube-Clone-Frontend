import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'youtube-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
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
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required, Validators.minLength(3)],
      lastName: ['', Validators.required, Validators.minLength(3)],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  get formValues() { return this.signupForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.signupForm.invalid) { console.log("invalid"); return; }


    return this.authenticationService.registerUser(this.signupForm.value).subscribe(
      res => {
        this.errorHasOccurred = false;
        this.authenticated = true;
        this.message = "User has successfully signed up"
        setTimeout (() => {
          this.router.navigate(['/login']);
          this.authenticated = false;
       }, 2000);
      },
      error => {
        this.message = error.error.message;
        console.log(error);
        this.errorHasOccurred = true;
      }
    );
  }

}
