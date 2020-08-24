import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';

//For Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth"; //For Authentication
import { AngularFirestoreModule } from '@angular/fire/firestore'; //For Firestore
import { environment } from '../environments/environment';
import { ProfilePageComponent } from './Components/profile-page/profile-page.component';
import { TestPageComponent } from './Components/test-page/test-page.component';
import { AwardsComponent } from './Components/awards/awards.component';
import { TestCompletionPageComponent } from './Components/test-completion-page/test-completion-page.component';
import { ErrorPageComponent } from './Components/error-page/error-page.component';
import { ClassPageComponent } from './Components/class-page/class-page.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProfilePageComponent,
    TestPageComponent,
    AwardsComponent,
    TestCompletionPageComponent,
    ErrorPageComponent,
    ClassPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
