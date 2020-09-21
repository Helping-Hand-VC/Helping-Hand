import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";

//For Firebase
import { FirebaseConnectionService } from 'src/app/Firebase/firebase-connection.service';
import { Student } from 'src/app/models/Users/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  blnValid: boolean = true;
  clsStudent: Student;
  strErr: string;

  constructor(private clsFirebaseConnectionService: FirebaseConnectionService,
    public router: Router
  ) { }

  ngOnInit(): void {
    document.getElementById("btnlogin").addEventListener("click", function (event) {
      event.preventDefault();
    });
  }

  async SignInUser() {
    var username = (<HTMLInputElement>document.getElementById("userEmail")).value;
    var psw = (<HTMLInputElement>document.getElementById("psw")).value;
    //this.ValidateUserInfo(username, psw);
    if (this.blnValid) {
      
      let strResult: string = await this.clsFirebaseConnectionService.SignInUser(username, psw);


      if(strResult.includes("error,")){
        window.alert(strResult.replace("error,",""));
      }else{
        this.router.navigate(['home']); 
      }
      //"test@gmaisl.com", "123123"
    }else {
      window.alert(this.strErr);
      //console.log("Invalid Data");
      //console.log(this.strErr);
    }
  }

  ValidateUserInfo(uemail: string, pwd: string): void {
    let regexPass = new RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$');
    let regexEmail = new RegExp('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$');
    if ((uemail == "") || (pwd == "")) {
      this.blnValid = false;
      //display message - insert username
      window.alert("Please can you insert your username and password.");

    }
    
    if (!regexPass.test(pwd)) {
      this.blnValid = false;
      window.alert("Password too weak. Please make sure your passwrod contains a number, a capital letter, and is at least 6 characters long");
    }
    

    if (!regexEmail.test(uemail)) {
      this.blnValid = false;
      window.alert("Please insert a vaild email address");
    }

  }
}
