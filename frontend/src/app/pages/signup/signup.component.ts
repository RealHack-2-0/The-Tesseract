import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm: FormGroup;

  /*public signUpForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl('')
  });*/

  error: string;
  loading: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ]
      ],
      password: [null, [Validators.required, Validators.minLength(5)]]
    });
  }

  onSignUp() {
    this.loading = true;
    this.authService
      .signUp({
        username: this.signUpForm.controls['username'].value,
        password: this.signUpForm.controls['password'].value,
        email: this.signUpForm.controls['email'].value
      })
      .subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        err => {
          this.loading = false;
          console.log(err);
          if (err.error.message) {
            this.error = err.error.message;
          }
        }
      );
  }
}
