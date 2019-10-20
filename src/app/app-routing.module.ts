import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LoginUiComponent } from './login-ui/login-ui.component';
import { RegisterUiComponent } from './register-ui/register-ui.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginUiComponent
  },
  {
    path:'register',
    component:RegisterUiComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
