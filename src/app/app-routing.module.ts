import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ProfilePageComponent } from './Components/profile-page/profile-page.component';
import { TestPageComponent } from './Components/test-page/test-page.component';
import { TestCompletionPageComponent } from './Components/test-completion-page/test-completion-page.component';
import { ErrorPageComponent } from './Components/error-page/error-page.component';
import { ClassPageComponent } from './Components/class-page/class-page.component';
import { HomeComponent } from './Components/home/home.component';
import { AwardsComponent } from './Components/awards/awards.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfilePageComponent }, 
  { path: 'completed', component: TestCompletionPageComponent },
  { path: 'error-404', component: ErrorPageComponent },
  //{ path: 'class', component: ClassPageComponent },
  { path: 'class/:subject', component: ClassPageComponent },
  { path: 'class/:subject/test/:difficulty', component: TestPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'awards', component: AwardsComponent }, 

  //Working with this for design purposes - Jon Pallatte
  // { path: 'awards', component: AwardsComponent },

  { path: '**', redirectTo:  'login', pathMatch: 'full'},//Replace with 404 Page maybe?
  { path: '', redirectTo:  'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
