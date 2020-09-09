import { Injectable, NgZone  } from '@angular/core';

import { Student } from 'src/app/models/Users/user.model';
import { Router } from "@angular/router";

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseConnectionService {
  userData: any;// Save logged in user data


  constructor(private firestore: AngularFirestore, // Inject Firestore service
              private afAuth: AngularFireAuth,        // Inject Firebase auth service
              public router: Router,  
              public ngZone: NgZone // NgZone service to remove outside scope warning
            ) { 

               /* Saving user data in localstorage when 
              logged in and setting up null when logged out */
              this.afAuth.authState.subscribe(user => {
                if (user) {
                  this.userData = user;
                  localStorage.setItem('user', JSON.stringify(this.userData));
                  JSON.parse(localStorage.getItem('user'));
                } else {
                  localStorage.setItem('user', null);
                  JSON.parse(localStorage.getItem('user'));
                }
              })
            }

  async SignInUser(email, password) : Promise<string> {
    var ReturnResult: string = "error";

    await this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        ReturnResult = "Logged in";
        //this.SetUserData(result.user);
      }).catch((error) => {
        ReturnResult = "error," + error;
    })

    return ReturnResult;
  }

   // Sign up with email/password
   async CreateNewUser(email, password, UserType) : Promise<string>{
    var ReturnResult: string = "error";

    //Depending on UserType depends where the extra user data will be stored

    await this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        await this.CreateUserTable(result.user.uid);
        this.SendVerificationMail();

        ReturnResult = "New user created";
        //this.SetUserData(result.user);
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
      }).catch((error) => {
        ReturnResult = "error," + error;
      })

    return ReturnResult;
  }

  CreateUserTable(UsersID){
    this.firestore.collection("Users").doc(UsersID).set({
      FirstName: ""
    })
    .then(function() {
        console.log("Document successfully written!");
        return true;
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
        return false;
    });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    this.afAuth.currentUser.then((user)=>{
      user.sendEmailVerification();
      //window.alert("Please confirm your account email, you will recieve an OTP via your email.");
    })
    .catch((err) => {
      //window.alert("Sorry somethign went wrong");
    })    
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }


  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    })
  }


}
