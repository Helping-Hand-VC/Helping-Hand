import { Component, OnInit } from '@angular/core';
import { FirebaseConnectionService } from 'src/app/Firebase/firebase-connection.service';
import { Router } from "@angular/router";

import { Student, User } from 'src/app/models/Users/user.model';

 
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  strErr: string;
  blnValid: boolean = true;
  uAuto: string;

  constructor(private clsFirebaseConnectionService: FirebaseConnectionService,private router: Router) { }

  ngOnInit(): void {
    this.AccountSettingsOnLoad();//Calling method as it is async
  }

  async AccountSettingsOnLoad(){
    let clsUser: User  = await(this.clsFirebaseConnectionService.GetUsersDetails());
    if(clsUser.firstname == null){
      this.router.navigate(['login']); //Something went wrong so make them login again
    } else {

      (<HTMLInputElement>document.getElementById("username")).value = clsUser.firstname;
      (<HTMLInputElement>document.getElementById("usersurname")).value = clsUser.surname;
      (<HTMLInputElement>document.getElementById("mobile")).value = clsUser.cell;
      (<HTMLInputElement>document.getElementById("DOB")).value = clsUser.id;

      this.uAuto = clsUser.autoid;
      if (clsUser.type == "student") {

        (<HTMLInputElement>document.getElementById("username")).disabled = true;
        (<HTMLInputElement>document.getElementById("usersurname")).disabled = true;
        (<HTMLInputElement>document.getElementById("mobile")).disabled = true;
        (<HTMLInputElement>document.getElementById("DOB")).disabled = true;
        (<HTMLInputElement>document.getElementById("btnReset")).hidden = true;
        (<HTMLInputElement>document.getElementById("btnSave")).hidden = true;
        (<HTMLInputElement>document.getElementById("btnLinkAccount")).hidden = true;
        (<HTMLLabelElement>document.getElementById("studNameDisp")).innerHTML = clsUser.firstname + " " + clsUser.surname;

      }
      if (clsUser.type == "parent") {
        (<HTMLInputElement>document.getElementById("btnGenerateLinkCode")).hidden = true;
        (<HTMLLabelElement>document.getElementById("GenCodeDisplay")).hidden = true;
      }

      
      
      
    }
    
    
  }


  async saveProfile() {
    let userName = (<HTMLInputElement>document.getElementById("username")).value;
    let userSName = (<HTMLInputElement>document.getElementById("usersurname")).value;
    let userCell = (<HTMLInputElement>document.getElementById("mobile")).value;
    let userIdNo = (<HTMLInputElement>document.getElementById("DOB")).value;

    this.validateInfo(userName, userSName, userCell, userIdNo);
    if (this.blnValid) {
      let strResult: string = await (this.clsFirebaseConnectionService.UpdateUser(userName, userSName, userCell, userIdNo));
      if (strResult.includes("error,")) {
        window.alert(strResult.replace("error,", ""));
      } else {
        window.alert("Details updated");
      }
    } else {
      window.alert(this.strErr);
    }
    
  }

  GenerateCode() {
    let strCode = "";

    for (let i = 4; i >= 0; i--) {
      strCode = strCode + this.uAuto.charAt(this.uAuto.length - i);
    }
    
    strCode = strCode.toUpperCase();
    (<HTMLLabelElement>document.getElementById("GenCodeDisplay")).innerHTML= strCode;
  }


  validateInfo(name: string, surname: string, cell: string, uid: string) {

    var iError = 0;

    let regexID = new RegExp("^(\\d{13})?$");
    let regexCell = new RegExp("^(\\d{10})?$");
    let regexName = new RegExp("^[a-zA-Z'-]+$");
    
    if ((name == "")||(surname == "")||(cell == "") || (uid == "")) {
      this.blnValid = false;
      //display message - insert username
      iError++;
      this.strErr = this.strErr + "Error " + iError + ": Please insert all information. \n";
    }
    if (!regexName.test(name)) {
      this.blnValid = false;
      iError++;
      this.strErr = this.strErr + "Error " + iError + ": Please insert a valid Name. \n";
    }

    if (!regexName.test(surname)) {
      this.blnValid = false;
      iError++;
      this.strErr = this.strErr + "Error " + iError + ": Please insert a valid surname. \n";
    }

    if (!regexID.test(uid)) {
      this.blnValid = false;
      iError++;
      this.strErr = this.strErr + "Error " + iError + ": Please insert a valid ID. \n";

    }

    if (!regexCell.test(cell)) {
      this.blnValid = false;
      iError++;
      this.strErr = this.strErr + "Error " + iError + ": Please insert a valid cellphone number. \n";

    }
  }

}
