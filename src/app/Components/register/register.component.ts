import { Component, OnInit } from '@angular/core';

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
  userT: string;
  constructor(private clsFirebaseConnectionService: FirebaseConnectionService) { }

  ngOnInit(): void {
  }

  async studClick() {
    this.userT = "student"

    console.log(this.userT)
  }
  async parentClick() {
    this.userT = "parent"
    console.log(this.userT)
  }
  async teacherClick() {
    this.userT = "teacher"
    console.log(this.userT)
  }
  async hmClick() {
    this.userT = "headmaster"
    console.log(this.userT)
  }

  async RegisterUser() {
    var email = (<HTMLInputElement>document.getElementById("RegUserEmail")).value;
    var psw = (<HTMLInputElement>document.getElementById("RegPsw")).value;
    var cnf = (<HTMLInputElement>document.getElementById("cnfpsw")).value;
    var utype = this.userT;


    console.log(email, utype, psw, cnf);
    this.ValidateUserInfo(email, utype, psw, cnf);
    if (this.blnValid) {
      console.log("Worked")
      console.log(await this.clsFirebaseConnectionService.CreateNewUser(email, psw, utype));
      console.log(email, psw, utype)
    } else {
      console.log("Invalid Data");
    }
    //"test@gmaisl.com", "123123"
  }



  async ValidateUserInfo(uemail: string, utype: string, pwd: string, cnfps: string) {

    console.log(uemail, utype, pwd, cnfps);
    this.blnValid = true;

    let regexHMPass = new RegExp('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$');
    let regexTeacherPass = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Zaz\\d@$!%*?&]{10,20}');
    let regexParentPass = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Zaz\\d@$!%*?&]{8,20}');
    let regexStudPass = new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$');
    let regexEmail = new RegExp('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$');


    /* 
    let regexId = new RegExp('^(\d{13})?$');
    let regexPhone = new RegExp('^[0-9]{10}$');
    let regexFName = new RegExp('^[a-zA-Z\' -]+$');
    let regexLName = new RegExp('^[a-zA-Z\' -]+$');
    */



    if ((uemail == "") || (pwd == "")) {
      this.blnValid = false;
      //display message - insert username
      window.alert("Please can you insert your email and password.");
    }
    if (pwd != cnfps) {
      this.blnValid = false;
      window.alert("Passwords do not match.");
    }

    //Validate Email
    if (!regexEmail.test(uemail)) {
      this.blnValid = false;
      window.alert("Please insert a valid email address");
    }


    //Password Validation for specific user types
    if (utype == "") {
      this.blnValid = false;
      window.alert("Please select a Role.");
    } else if (utype == "headmaster") {

      if (!regexHMPass.test(pwd)) {
        this.blnValid = false;
        window.alert("Password too weak. Please make sure your password contains min. 2 numbers, 2 capitals, 2 special characters, and is at least 13 characters long");

      }
    } else if (utype == "teacher") {
      if (!regexTeacherPass.test(pwd)) {
        this.blnValid = false;
        window.alert("Password too weak. Please make sure your password contains a number, a capital letter, a special characters, and is at least 10 characters long");
      }
    } else if (utype == "parent") {
      if (!regexParentPass.test(pwd)) {
        this.blnValid = false;
        window.alert("Password too weak. Please make sure your password contains a number, a capital letter, a special characters, and is at least 8 characters long");
      }
    } else if (utype == "student") {
      if (!regexStudPass.test(pwd)) {
        this.blnValid = false;
        window.alert("Password too weak. Please make sure your password contains a number, a capital letter, and is at least 6 characters long");
      }
    }

    var chkPolicy = (<HTMLInputElement>document.getElementById("checkpolicy"));
    if (!chkPolicy.checked) {
      this.blnValid = false;
      //display message 
      window.alert("Please accept privacy policy.");
    }
  }
}
