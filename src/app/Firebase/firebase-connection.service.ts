import { Injectable, NgZone  } from '@angular/core';

import { Student, User } from 'src/app/models/Users/user.model';
import { Router } from "@angular/router";

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { promise } from 'protractor';
import { variable } from '@angular/compiler/src/output/output_ast';
import { VariableAst } from '@angular/compiler';
import { Variable } from '@angular/compiler/src/render3/r3_ast';


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
              /*this.afAuth.authState.subscribe(user => {
                if (user) {
                  this.userData = user;
                  localStorage.setItem('user', JSON.stringify(this.userData));
                  JSON.parse(localStorage.getItem('user'));
                } else {
                  localStorage.setItem('user', null);
                  JSON.parse(localStorage.getItem('user'));
                }
              })*/
            }


  async SignInUser(email, password) : Promise<string> {
    var ReturnResult: string = "error";

    await this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        this.userData = result.user;
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
        await this.CreateUserTable(result.user.uid, UserType);
        this.SendVerificationMail();
        this.userData = result.user;
        ReturnResult = "New user created";
        //this.SetUserData(result.user);
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
      }).catch((error) => {
        ReturnResult = "error," + error;
      })

    return ReturnResult;
  }

  async GetUsersDetails(): Promise<User>{
    var clsUsers = new User();
    
    if(this.userData == null){//Check to see if the user is Logged in or not
      this.router.navigate(['login']); //Something went wrong so make them login again
      return null;
    }
    

    clsUsers.email = this.userData.email;
    await this.firestore.collection("Users").doc(this.userData.uid).get().toPromise().then(function (docs) {
      clsUsers.type = docs.data().Role;
      clsUsers.id        = docs.data().ID;
      clsUsers.firstname = docs.data().FirstName;
      clsUsers.surname   = docs.data().Surname;
      clsUsers.cell = docs.data().ContactDetails.Cell;
      clsUsers.autoid = docs.id;
    }).catch(function (error) {
      console.log(error);
      return null;
    });

    return clsUsers;

    //Will return here if there is an error and somehow misses the catch statement
    //return null;
  }


  async UpdateUser(uName, uSName, uCell, uIdNo): Promise<string> {
    var ReturnResult: string = "error, Something went wrong";
    
    await this.firestore.collection("Users").doc(this.userData.uid).update({
      FirstName: uName,
      Surname: uSName,
      ContactDetails: {
        Cell: uCell
      },
      ID: uIdNo      
    }).then(function () {
      ReturnResult = "true";
    }).catch(function (error) {
      ReturnResult = "error," + error;
    });

    return ReturnResult;
  }


  CreateUserTable(UsersID, utype) {
    console.log(utype);
    this.firestore.collection("Users").doc(UsersID).set({
      Role: utype,
      id: "-",
      firstname: "-",
      surname: "-",
      cell:"-"
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
      this.userData = null;
      this.router.navigate(["login"]);
    })
  }




  //FOR Tests
  async GetTest(Subject, Difficulty): Promise<Student>{
    var clsStudents = new Student();

    

    clsStudents.email = this.userData.email;
    //Test/English/Grade 1/Maths/Easy/
    await this.firestore.collection("Test").doc(this.userData.uid).get().toPromise().then(function (docs) {
      clsStudents.id        = docs.data().ID;
      clsStudents.firstname = docs.data().FirstName;
      clsStudents.surname   = docs.data().Surname;
      clsStudents.cell      = docs.data().ContactDetails.Cell;
    }).catch(function (error) {
      console.log(error);
      return null;
    });

    return clsStudents;

    //Will return here if there is an error and somehow misses the catch statement
    //return null;
  }


}
