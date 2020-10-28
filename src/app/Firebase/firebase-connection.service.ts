import { Injectable, NgZone  } from '@angular/core';

import { school, Student, User,test, takenTests } from 'src/app/models/Users/user.model';
import { Router } from "@angular/router";

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase} from '@angular/fire/database';//Realtime DB
import { firestore } from 'firebase';

import { promise } from 'protractor';
import { variable } from '@angular/compiler/src/output/output_ast';
import { VariableAst } from '@angular/compiler';
import { Variable } from '@angular/compiler/src/render3/r3_ast';



@Injectable({
  providedIn: 'root'
})
export class FirebaseConnectionService {
  userData: any;// Save logged in user data
  public clsUsers:User= {
    email : "",
    type      : "",
    id        : "",
    firstname : "",
    surname   : "",
    cell      : "",
    autoid    : "",
    ChildsID  : [],//For parents
    SchoolID  : ""
  };

  strGrades:string;

  constructor(private firestore: AngularFirestore, // Inject Firestore service
              private afAuth: AngularFireAuth,        // Inject Firebase auth service
              public router: Router,  
              public ngZone: NgZone, // NgZone service to remove outside scope warning
              private db: AngularFireDatabase
            ) { 

               /* Saving user data in localstorage when 
              logged in and setting up null when logged out */
              //localStorage.removeItem('user');
              if("user" in localStorage){
                this.userData = JSON.parse(localStorage.getItem('user'));
              }

              this.afAuth.authState.subscribe(async user => {
                if (user) {
                  this.userData = user;
                  localStorage.setItem('user', JSON.stringify(this.userData));
                  JSON.parse(localStorage.getItem('user'));
                  await this.SetUsersDetails();
                } else {
                  localStorage.removeItem('user');
                  this.userData = null;
                  this.clsUsers = {
                    email : "",
                    type      : "",
                    id        : "",
                    firstname : "",
                    surname   : "",
                    cell      : "",
                    autoid    : "",
                    ChildsID  : [],
                    SchoolID  : ""
                  };
                  this.router.navigate(["login"]);
                }
              })
            }


  async SignInUser(email, password) : Promise<string> {
    var ReturnResult: string = "error";

    await this.afAuth.signInWithEmailAndPassword(email, password)
      .then(async (result) => {
        //console.log(result);
        this.userData = result.user;
        ReturnResult = "Logged in";
        await this.SetUsersDetails();
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
        localStorage.setItem('user', JSON.stringify(this.userData));
        await this.SetUsersDetails();
        ReturnResult = "New user created";
        //this.SetUserData(result.user);
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
      }).catch((error) => {
        ReturnResult = "error," + error;
      })

    return ReturnResult;
  }

  async SetUsersDetails(): Promise<User>{

    

    if(this.userData.email == ""){//Check to see if the user is Logged in or not
      this.router.navigate(['login']); //Something went wrong so make them login again
      return null;
    }
    
    const email = this.userData.email;
    await this.firestore.collection("Users").doc(this.userData.uid).get().toPromise().then((docs) =>{
      console.log(docs.data());
      this.clsUsers = {
        email     : email,
        type      : docs.data()?.Role.Type,
        id        : docs.data()?.ID,
        firstname : docs.data()?.FirstName,
        surname   : docs.data()?.Surname,
        cell      : docs.data()?.ContactDetails.Cell,
        autoid    : docs.id,
        SchoolID  : docs.data()?.SchoolID,
        Grade     : docs.data()?.Grade
      }

      if(this.clsUsers.type == "parent"){
        this.clsUsers.ChildsID =  docs.data()?.Role.Children
      }


      return this.clsUsers;
      
    }).catch(function (error) {
      console.log(error);
      return null;
    });

    
  }


  GetUsersDetails(): User{
    if(this.clsUsers.autoid == ""){
      this.router.navigate(["login"]);
    }

    return this.clsUsers;
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
      Role: {
        Type: utype
      },
      ID: "-",
      FirstName: "-",
      Surname: "-",
      ContactDetails:{//ContactDetails.Cell
        Cell:"-"
      }
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
  async SignOut() {
    
    await this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.userData = null;
      this.clsUsers = {
        email : "",
        type      : "",
        id        : "",
        firstname : "",
        surname   : "",
        cell      : "",
        autoid    : "",
        ChildsID  : [],
        SchoolID  : ""
      };
      this.router.navigate(["login"]);
    })
  }


  async setLinkCode(iCode): Promise<Boolean>{
    //await this.db.list("/Codes").query.once("value");
    try{
      let test =this.db.list("/Codes").set(iCode, this.userData.uid);
      console.log(test);
      return true;
    }catch{
      return false;
    }
  }

  async LinkAccounts(iCode): Promise<Boolean>{
    //
    try{
      let test = await this.db.list("/Codes/" + iCode).query.once("value");
      await this.firestore.collection("Users").doc(this.userData.uid).set({
        Role:{//ContactDetails.Cell
          Children: firestore.FieldValue.arrayUnion(test.val())
        }
      },{merge:true});
      
      this.db.list("/Codes/" + iCode).remove();
      return true;
    }catch{
      return false;
    }
  }



  async getParentChildDetails(): Promise<User>{
    //this.userData.uid
    //this.firestore.collection("Users").doc(this.userData.uid)
    console.log(this.clsUsers.ChildsID);

    var clsUsers:User= {
      email     : "",
      type      : "student",
      id        : "",
      firstname : "",
      surname   : "",
      cell      : "",
      autoid    : "",
      ChildsID  : [],//For parents
      SchoolID  : "",
      Grade     : ""
    };


    //this.clsUsers.ChildsID.forEach(async element => {
      let message: string[] = this.clsUsers.ChildsID;
 
      await this.firestore.collection("Users").doc(message[0]).get().toPromise().then(snapvar =>{
        console.log(snapvar);
        console.log(snapvar.data());
        console.log(snapvar.data()?.FirstName);
        clsUsers = {
          email : "",
          type      : "student",
          id        : snapvar.data()?.ID,
          firstname : snapvar.data()?.FirstName,
          surname   : snapvar.data()?.Surname,
          cell      : snapvar.data()?.ContactDetails.Cell,
          autoid    : snapvar.id,
          ChildsID  : [],//For parents
          SchoolID  : snapvar.data()?.SchoolID,
          Grade     : snapvar.data()?.Grade
        };

        return clsUsers;
      }).catch((err) => {
        console.log(err);
        window.alert("Sorry something went wrong");
        return clsUsers;
      });

      return clsUsers;
    //});
    
    //return null;
    
  }


  async updateChildDetails(clsNewChildUser): Promise<string>{
    var ReturnResult:string = "Something went wrong";

    //await this.clsUsers.ChildsID.forEach(async element => {
      let message: string[] = this.clsUsers.ChildsID;
      await this.firestore.collection("Users").doc(message[0]).update({
        FirstName: clsNewChildUser.firstname,
        Surname: clsNewChildUser.surname,
        ContactDetails: {
          Cell: clsNewChildUser.cell
        },
        ID: clsNewChildUser.id      
      }).then(function () {
        ReturnResult = "true";
      }).catch(function (error) {
        ReturnResult = "error," + error;
      });
    //});

    return ReturnResult;


  }

  async getSchoolList(): Promise<school[]>{
    var SchoolList:school[] = [];


    await this.firestore.collection("School").get().toPromise().then((snapshot) =>{

      snapshot.forEach(doc => {
        let schoolTemp: school={
          Name: doc.data().Name,
          id: doc.id
        }
        SchoolList.push(schoolTemp);
      });

      return SchoolList;
      
    }).catch(function (error) {
      console.log(error);
      return SchoolList;
    });

    return SchoolList;

  }

  async LinkChildToSchool(selectedSchoolID,GradeSelected): Promise<string>{
    var ReturnResult:string = "Something went wrong";

    //await this.clsUsers.ChildsID.forEach(async element => {
      let message: string[] = this.clsUsers.ChildsID;
      await this.firestore.collection("Users").doc(message[0]).update({
        SchoolID:  selectedSchoolID,
        Grade   :  GradeSelected
      }).then(function () {
        ReturnResult = "true";
      }).catch(function (error) {
        ReturnResult = "error," + error;
      });
    //});

    return ReturnResult;
  }


  //FOR Tests
  async getUsersPastTests(): Promise<takenTests[]>{
    var SchoolList:takenTests[] = [];

   
    if(this.clsUsers.autoid == ""){
      this.router.navigate(["login"]);
    }


    await this.firestore.collection("Users").doc(this.clsUsers.autoid).collection("Tests").get().toPromise().then((snapshot) =>{

      snapshot.forEach(doc => {
        let schoolTemp: takenTests={
          Difficulty: doc.data().Difficulty,
          Grade: doc.data().Grade,
          Mark: doc.data().Mark,
          Subject: doc.data().Subject
        }
        SchoolList.push(schoolTemp);
      });

      return SchoolList;
      
    }).catch(function (error) {
      console.log(error);
      return SchoolList;
    });

    return SchoolList;

  }


  async GetTest(Subject, Difficulty): Promise<test[]>{
    var clsTests: test[] = [];


    if(this.clsUsers.Grade == null){//If user has a grade....choose that one
      this.strGrades = this.strGrades
    }else{
      this.strGrades = this.clsUsers.Grade//This is if a parent is doing a class
    }

    if(this.strGrades==null){
      this.router.navigate(['home']);
    }

    
    //Test/English/Grade 1/Maths/Easy/
    await this.firestore.collection("Test").doc("English").collection("Grade " + this.strGrades).doc(Subject).collection(Difficulty).get().toPromise().then(function (snapshot) {
      
      snapshot.forEach(element => {
        let temptest: test={
          CorrectAnswer   : element.data()?.CorrectAnswer,
          PossibleAnswer  : element.data()?.PossibleAnswer,
          Question        : element.data()?.Question,
          TotalMark       : element.data()?.TotalMark
        };

        clsTests.push(temptest);
      });

    }).catch(function (error) {
      console.log(error);
      return null;
    });

    return clsTests;

    //Will return here if there is an error and somehow misses the catch statement
    //return null;
  }


  async getSubjects(sGrade:string): Promise<string[]>{
    let lstSubjects: string[] = [];
    if(this.clsUsers.autoid == ""){
      this.router.navigate(["login"]);
    }
    
    
    if(this.clsUsers.Grade == null){
      this.strGrades = sGrade
    }else{
      this.strGrades = this.clsUsers.Grade
    }

    
    await this.firestore.collection("Test").doc("English").collection("Grade " + this.strGrades).get().toPromise().then(function (docs) {
      docs.forEach(element => {
        lstSubjects.push(element.id);
      });
    }).catch(function (error) {
      console.log(error);
      return null;
    });

    return lstSubjects;
  }

  async updateUserTest(Subject, Difficulty, UserMark): Promise<string>  {
    var ReturnResult  = "Something went wrong";
    if(this.clsUsers.Grade == null){//If user has a grade....choose that one
      this.strGrades = this.strGrades
    }else{
      this.strGrades = this.clsUsers.Grade//This is if a parent is doing a class
    }

    if(this.strGrades==null){
      this.router.navigate(['home']);
    }

    await this.firestore.collection("Users").doc(this.clsUsers.autoid).collection("Tests").add({
      Difficulty:   Difficulty,
      Grade:        this.strGrades,
      Language:     "English",
      Mark:         UserMark,
      Subject:      Subject
    }).then(function () {
      ReturnResult = "true";
    }).catch(function (error) {
      ReturnResult = "error," + error;
    });


    return ReturnResult;
  }

}
