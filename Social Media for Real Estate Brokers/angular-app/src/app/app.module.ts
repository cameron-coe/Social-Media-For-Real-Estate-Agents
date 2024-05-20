import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Allows ng data binding

import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up.component';
import { LoginComponent } from './login.component';

import { SignupService } from '../services/sign-up.service';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, // Required for running Angular applications in a browser environment
    HttpClientModule, // Required for making HTTP requests in your application
    FormsModule
  ],
  providers: [SignupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
