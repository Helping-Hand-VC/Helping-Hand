import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ProfilePageComponent } from './Components/profile-page/profile-page.component';
import { TestPageComponent } from './Components/test-page/test-page.component';
//import { AwardsComponent } from './Components/awards/awards.component';
import { TestCompletionPageComponent } from './Components/test-completion-page/test-completion-page.component';


const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'test', component: TestPageComponent },
  { path: 'completed', component: TestCompletionPageComponent },

  //Working with this for design purposes - Jon Pallatte
  // { path: 'awards', component: AwardsComponent },

  { path: '**', component:  LoginComponent},//Replace with 404 Page maybe?
  { path: '', component:  LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
