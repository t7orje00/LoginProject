import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginUiComponent } from './login-ui/login-ui.component';
import { RegisterUiComponent } from './register-ui/register-ui.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginUiComponent,
    RegisterUiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
