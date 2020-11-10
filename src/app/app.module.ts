import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';

//For Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth"; //For Authentication
import { AngularFirestoreModule } from '@angular/fire/firestore'; //For Firestore
//END of Firebase

import { environment } from '../environments/environment';
import { LodaingPageComponent } from './Components/lodaing-page/lodaing-page.component';
import { CleanUpComponent } from './Components/clean-up/clean-up.component';


import { CommonModule } from '@angular/common';

import {ProfilePageComponent} from '../app/Components/profile-page/profile-page.component';

import {HomeComponent} from '../app/Components/home/home.component';

import {TestPageComponent} from '../app/Components/test-page/test-page.component';
import { ViewMarkComponent } from './Components/view-mark/view-mark.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LodaingPageComponent,
    CleanUpComponent,

    //Need this for *ngFor
    ProfilePageComponent,
    HomeComponent,
    TestPageComponent,
    ViewMarkComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
