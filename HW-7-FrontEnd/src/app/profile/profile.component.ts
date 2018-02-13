import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ValidateService } from '../validate.service';
import { AuthService } from '../auth.service'
import { FormControl, FormGroup } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {GoogleSignInSuccess} from 'angular-google-signin';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: Object;
  warnMsg: string[];
  rice: boolean;
  google: boolean;

  updaForm = new FormGroup({
    displayName: new FormControl(''),
    email: new FormControl(''),
    phoneNum: new FormControl(''),
    zipcode: new FormControl(''),
    password: new FormControl('')
  });


  updateAvatar(): void {
      let img = (<HTMLInputElement>document.getElementById("avatarChange")).files[0];
      if ( img ) {
          let reader = new FileReader()
          let dataS = this.dataService
          let current = this
          reader.addEventListener("load",function(){
              dataS.updateAvatar(reader.result).subscribe(res => {
                  current.user["avatar"] = res["newAvatar"]
              })
          },false)
          reader.readAsDataURL(img)
      }

  }

  //validate before update
  update(): void {
    this.validateService.clear();

    let displayName = this.updaForm.get('displayName').value;
    let email = this.updaForm.get('email').value;
    let phoneNum = this.updaForm.get('phoneNum').value;
    let zipcode = this.updaForm.get('zipcode').value;
    let password = this.updaForm.get('password').value;


    if ( displayName ) {
      this.user["displayName"] = displayName;
      this.dataService.updateDispName(displayName).subscribe();

    }

    if ( email ) {
      if ( this.validateService.email(email) ) {
        this.user["email"] = email;
        this.dataService.updateEmail(email).subscribe();
      }
    }

    if ( phoneNum ) {
      if ( this.validateService.phoneNum(phoneNum) ) {
        this.user["phoneNum"] = phoneNum;
        this.dataService.updatePhoneNum(phoneNum).subscribe();
      }
    }

    if ( zipcode ) {
      if ( this.validateService.zipcode(zipcode) ) {
        this.user["zipcode"] = zipcode;
        this.dataService.updateZipcode(zipcode).subscribe();
      }
    }

    if ( password ) {
      this.authService.changePw(password).subscribe();
    }

    this.warnMsg = this.validateService.warnMessage;

  }

  linkProfile(): void {
      this.authService.checkOuath().subscribe(res => {
          if ( res["oauth"] == "rice" ) this.rice = true;
          else if (res["oauth"] == "google" ) this.google = true;
      })
  }


  constructor(
    private router: Router,
    private dataService: DataService,
    private validateService: ValidateService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.dataService.getProfile().subscribe(res => {
        this.user = res["profile"]
    }, (err: HttpErrorResponse) => {
        if (err.status == 401 ) this.router.navigate(['/login'])
    });
  }

}
