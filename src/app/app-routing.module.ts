import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ProfilePageComponent } from './Components/profile-page/profile-page.component';


const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'profile', component: ProfilePageComponent },

  { path: '**', component:  LoginComponent},//Replace with 404 Page maybe?
  { path: '', component:  LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
