import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ProfilePageComponent } from './Components/profile-page/profile-page.component';
import { TestPageComponent } from './Components/test-page/test-page.component';
import { ErrorPageComponent } from './Components/error-page/error-page.component';
import { ClassPageComponent } from './Components/class-page/class-page.component';
import { HomeComponent } from './Components/home/home.component';
import {CleanUpComponent} from './Components/clean-up/clean-up.component';
import { ViewMarkComponent } from './Components/view-mark/view-mark.component';
import { DecisionComponent } from './Components/decision/decision.component';
import { LearnAlphabetComponent } from './Components/learn-alphabet/learn-alphabet.component';
import { LearnFamilyMembersComponent } from './Components/learn-family-members/learn-family-members.component';
import { LearnNumbersComponent } from './Components/learn-numbers/learn-numbers.component';
import { LearnHomeComponent } from './Components/learn-home/learn-home.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'error-404', component: ErrorPageComponent },
  //{ path: 'class', component: ClassPageComponent },
  { path: 'class/:subject', component: ClassPageComponent },
  { path: 'class/:subject/test/:difficulty', component: TestPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'Clean-up', component: CleanUpComponent },
  { path: 'ViewMarks', component: ViewMarkComponent },
  { path: 'decision', component: DecisionComponent },
  { path: 'learn-alphabet', component: LearnAlphabetComponent },
  { path: 'learn-family-members', component: LearnFamilyMembersComponent },
  { path: 'learn-numbers', component: LearnNumbersComponent },
  { path: 'learn-home', component: LearnHomeComponent },



  //Working with this for design purposes - Jon Pallatte
  // { path: 'awards', component: AwardsComponent },

  { path: '**', redirectTo:  'login', pathMatch: 'full'},//Replace with 404 Page maybe?
  { path: '', redirectTo:  'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  LodaingPageComponent
 }
