import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RoutingModule } from './routing/routing.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import {GoogleSignInComponent} from 'angular-google-signin';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProfileComponent } from './profile/profile.component';

import { ValidateService } from './validate.service';
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { ArticleService } from './article.service'

import { SearchPipe } from './search.pipe';


@NgModule({
  declarations: [
    GoogleSignInComponent,
    AppComponent,
    RegisterComponent,
    LoginComponent,
    MainPageComponent,
    ProfileComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    CommonModule,
    FileUploadModule
  ],
  providers: [
    ValidateService,
    DataService,
    AuthService,
    ArticleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
