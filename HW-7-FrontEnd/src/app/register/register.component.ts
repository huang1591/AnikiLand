import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ValidateService } from '../validate.service';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm = new FormGroup({
    userName: new FormControl(''),
    displayName: new FormControl(''),
    password: new FormControl(''),
    passwordConf: new FormControl(''),
    email: new FormControl(''),
    birthDate: new FormControl(''),
    zipcode: new FormControl(''),
    phoneNum: new FormControl('')
  })

  dataStatus: boolean;
  messages: string[];
  user: Object;

  validate(): void {
      this.user["username"] = this.registerForm.get('userName').value;
      this.user["password"] = this.registerForm.get('password').value;
      this.user["displayName"] = this.registerForm.get('displayName').value;
      this.user["email"] = this.registerForm.get('email').value;
      this.user["birthDate"] = this.registerForm.get('birthDate').value;
      this.user["zipcode"] = this.registerForm.get('zipcode').value;
      this.user["phoneNum"] = this.registerForm.get('phoneNum').value;

    this.validateService.clear();
    this.validateService.userName(this.user["username"]);
    this.validateService.displayName(this.user["displayName"]);
    this.validateService.email(this.user["email"]);
    this.validateService.birthDate(this.user["birthDate"]);
    this.validateService.zipcode(this.user["zipcode"]);
    this.validateService.phoneNum(this.user["phoneNum"]);
    this.validateService.password(this.user["password"],
    this.registerForm.get('passwordConf').value);

    this.dataStatus = this.validateService.status;
    this.messages = this.validateService.warnMessage;

     if (this.dataStatus) {
         this.authService.register(this.user).subscribe(res => {
             this.router.navigate(['/login']);
         }, (err: HttpErrorResponse) => {
             if ( err.status == 400 ) this.messages.push("The username has already exist")
         });
     }
  }

  constructor(
    private validateService: ValidateService,
    private dataService: DataService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
      this.user = {}
  }

}
