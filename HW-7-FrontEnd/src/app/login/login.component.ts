import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {GoogleSignInSuccess} from 'angular-google-signin';
import { NgZone } from '@angular/core'

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  msg: string;

  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  })
  
  private myClientId: string = '636279143526-ic5lk2bicj0eev22funpcv221cri3c2j.apps.googleusercontent.com';

    onGoogleSignInSuccess(event: GoogleSignInSuccess) {
      let googleUser: gapi.auth2.GoogleUser = event.googleUser;
      let id: string = googleUser.getId();
      let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
      this.authService.oauthLogin(profile.getName(), googleUser).subscribe(res => {
          console.log(res)
          this.zone.run(() => this.router.navigate(['/mainpage']))
      })
    }


  login(): void {
    let username = this.loginForm.get('userName').value
    let password = this.loginForm.get('password').value
    if ( username && password ) {
        this.authService.login(username, password)
        .subscribe( res => {
            this.router.navigate(['/mainpage'])
        }, (err: HttpErrorResponse) => {
            if ( err.status == 401 ) this.msg = 'Wrong username or password!'
        })
    }
    else this.msg = 'Please enther username and password!'
  }


  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.msg = ''
  }
}
