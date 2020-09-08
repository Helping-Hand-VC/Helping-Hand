import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
//firebase imports
import { FirebaseConnectionService } from 'src/app/Firebase/firebase-connection.service';
import { Student } from 'src/app/models/Users/user.model'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //email: string;
  //psw: string;
  blnValid: boolean = true;
  clsStudent: Student;
  userT: string = "";
  strErr: string;

  
  constructor(private clsFirebaseConnectionService: FirebaseConnectionService,
    public router: Router
  ) { }
  
  ngOnInit(): void {

    document.getElementById("btnRegister").addEventListener("click", function (event) {
      event.preventDefault();
      
    });
  
  }

  studClick() {
    this.userT = "student"
    console.log(this.userT)
  }
  parentClick() {
    this.userT = "parent"
    console.log(this.userT)
  }
  teacherClick() {
    this.userT = "teacher"
    console.log(this.userT)
  }
  hmClick() {
    this.userT = "headmaster"
    console.log(this.userT)
  }
  

  async RegisterUser() {
    
    var email = (<HTMLInputElement>document.getElementById("RegUserEmail")).value;
    var psw = (<HTMLInputElement>document.getElementById("RegPsw")).value;
    var cnf = (<HTMLInputElement>document.getElementById("cnfpsw")).value;
    var utype = this.userT;
    var chkPolicy = (<HTMLInputElement>document.getElementById("checkpolicy")).checked;


    //console.log(email, utype, psw, cnf);
    this.ValidateUserInfo(email, utype, psw, cnf, chkPolicy);
    if (this.blnValid) {

      //window.alert(this.clsFirebaseConnectionService.CreateNewUser(email, psw, utype));
      this.router.navigate(['profile']); 
      console.log("Worked")
      console.log(await this.clsFirebaseConnectionService.CreateNewUser(email, psw, utype));
      
      //console.log(email, psw, utype)
      //window.location.href = 'profile';
    } else {
      window.alert(this.strErr);
      console.log("Invalid Data");
      console.log(this.strErr);
    }
    //"test@gmaisl.com", "123123"
  }



  async ValidateUserInfo(uemail: string, utype: string, pwd: string, cnfps: string, chkPol:boolean) {
    
    var iError = 0;
    this.strErr = "";

    //console.log(uemail, utype, pwd, cnfps);
    this.blnValid = true;

    let regexHMPass = new RegExp('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$');
    let regexTeacherPass = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Zaz\\d@$!%*?&]{10,20}');
    let regexParentPass = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Zaz\\d@$!%*?&]{8,20}');
    let regexStudPass = new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$');
    let regexEmail = new RegExp('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$');


    if (!chkPol) {
      this.blnValid = false;
      iError++;
      this.strErr = this.strErr + "Error " + iError + ": Please accept our privacy policy. \n";
      //display message 
      //window.alert("Please accept privacy policy.");
    }

    if ((uemail == "") || (pwd == "")) {
      this.blnValid = false;
      //display message - insert username
      iError++;
      this.strErr = this.strErr + "Error " + iError + ": Please insert both your email and password. \n";
      //window.alert("Please can you insert your email and password.");
    }
   

    //Validate Email
    if (!regexEmail.test(uemail)) {
      this.blnValid = false;
      iError++;
      this.strErr = this.strErr + "Error " + iError + ": Please insert a valid email address. \n";
      //window.alert("Please insert a valid email address");
    }

    if (pwd != cnfps) {
      this.blnValid = false;
      iError++;
      this.strErr = this.strErr + "Error " + iError + ": Passwords do not match. \n";
      //window.alert("Passwords do not match.");
    }


    //Password Validation for specific user types
    if (utype == "") {
      this.blnValid = false;
      iError++;
      this.strErr = this.strErr + "Error " + iError + ": Please select a Role. \n";
      //window.alert("Please select a Role.");
    } else if (utype == "headmaster") {

      if (!regexHMPass.test(pwd)) {
        this.blnValid = false;
        iError++;
        this.strErr = this.strErr + "Error " + iError + ": Password too weak. Please make sure your password contains min. 2 numbers, 2 capitals, 2 special characters, and is at least 13 characters long. \n";
        //window.alert("Password too weak. Please make sure your password contains min. 2 numbers, 2 capitals, 2 special characters, and is at least 13 characters long");

      }
    } else if (utype == "teacher") {
      if (!regexTeacherPass.test(pwd)) {
        this.blnValid = false;
        iError++;
        this.strErr = this.strErr + "Error " + iError + ": Password too weak. Please make sure your password contains a number, a capital letter, a special characters, and is at least 10 characters long. \n";
        //window.alert("Password too weak. Please make sure your password contains a number, a capital letter, a special characters, and is at least 10 characters long");
      }
    } else if (utype == "parent") {
      if (!regexParentPass.test(pwd)) {
        this.blnValid = false;
        iError++;
        this.strErr = this.strErr + "Error " + iError + ": Password too weak. Please make sure your password contains a number, a capital letter, a special characters, and is at least 8 characters long. \n";
        //window.alert("Password too weak. Please make sure your password contains a number, a capital letter, a special characters, and is at least 8 characters long");
      }
    } else if (utype == "student") {
      if (!regexStudPass.test(pwd)) {
        this.blnValid = false;
        iError++;
        this.strErr = this.strErr + "Error " + iError + ": Password too weak. Please make sure your password contains a number, a capital letter, and is at least 6 characters long. \n";
        //window.alert("Password too weak. Please make sure your password contains a number, a capital letter, and is at least 6 characters long");
      }
    }


  }
}
