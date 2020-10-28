import { Component, OnInit } from '@angular/core';
import { FirebaseConnectionService } from 'src/app/Firebase/firebase-connection.service';
import { Router } from "@angular/router";

import { school, Student, User } from 'src/app/models/Users/user.model';
import { NumberFormatStyle } from '@angular/common';

 
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  public student = false;
  

  //For DisplayPurposes
  public ViewAccountSettings  = true;
  public ViewChildrenSettings = false;
  public ViewTCs              = false;
  public ViewHelp             = false;

  
  public lstSchools: school[] = [];
  public schoolSelectedId = "0";
  public lstGrades = [];
  public GradeSelected = "0";

  strErr: string;
  blnValid: boolean = true;
  uAuto: string;
  clsUser;

  constructor(private clsFirebaseConnectionService: FirebaseConnectionService,private router: Router) {
    let schoolTemp: school= {id: "0",Name:"none"};
    this.lstSchools.push(schoolTemp);

    this.AccountSettingsOnLoad();//Calling method as it is async 
    this.getSchools();

    for (let index = 0; index < 10; index++) {
      this.lstGrades.push(index);
    }
  }

  ngOnInit(): void {
    this.SetUsersValues();
  }

  async SetUsersValues(){
    console.log(this.clsUser);
    if(this.clsUser.email == null){
      this.router.navigate(['login']); //Something went wrong so make them login again
    } else {
      console.log(this.clsUser);
      console.log(this.clsUser.firstname);
      (<HTMLInputElement>document.getElementById("edtMainusername")).value = this.clsUser.firstname;
      (<HTMLInputElement>document.getElementById("edtMainusersurname")).value = this.clsUser.surname;
      (<HTMLInputElement>document.getElementById("edtMainmobile")).value = this.clsUser.cell;
      (<HTMLInputElement>document.getElementById("edtMainDOB")).value = this.clsUser.id;

      (<HTMLLabelElement>document.getElementById("edtNameDisp")).innerHTML = this.clsUser.firstname + " " + this.clsUser.surname;

      this.uAuto = this.clsUser.autoid;
      if (this.clsUser.type == "student") {
        this.student = true;

        (<HTMLInputElement>document.getElementById("edtMainusername")).disabled = true;
        (<HTMLInputElement>document.getElementById("edtMainusersurname")).disabled = true;
        (<HTMLInputElement>document.getElementById("edtMainmobile")).disabled = true;
        (<HTMLInputElement>document.getElementById("edtMainDOB")).disabled = true;
        
        (<HTMLInputElement>document.getElementById("btnLinkAccount")).hidden = true;

        (<HTMLInputElement>document.getElementById("studGradeDisp")).innerHTML = "Grade: " + this.clsUser.Grade;

        

      }else if (this.clsUser.type == "parent") {
        this.student = false;
        //Get children's values
        console.log("Getting children ID's");
        var clsnewUsers = await this.clsFirebaseConnectionService.getParentChildDetails();
        if(clsnewUsers == null){//something went wrong
          window.alert("Something went wrong");
          this.router.navigate(['login']); //Something went wrong so make them login again
        }

        await this.getSchools();
        if(clsnewUsers.SchoolID !== null){
          this.schoolSelectedId = clsnewUsers.SchoolID;
        }

        (<HTMLInputElement>document.getElementById("Childsusername")).value = clsnewUsers.firstname;
        (<HTMLInputElement>document.getElementById("Childsusersurname")).value = clsnewUsers.surname;
        (<HTMLInputElement>document.getElementById("Childsmobile")).value = clsnewUsers.cell;
        (<HTMLInputElement>document.getElementById("ChildsDOB")).value = clsnewUsers.id;

        (<HTMLInputElement>document.getElementById("btnGenerateLinkCode")).hidden = true;
        (<HTMLLabelElement>document.getElementById("GenCodeDisplay")).hidden = true;
      }      
    }
  }


  async AccountSettingsOnLoad(){
    this.clsUser = await this.clsFirebaseConnectionService.GetUsersDetails();
    if(this.clsUser.email == ""){//if it is empty then need to try and get it
      this.clsUser = await this.clsFirebaseConnectionService.SetUsersDetails();
    }
  }

//Side Menu---------------------------------------------------------------
  btnViewAccountSettings(){
    this.ResetAll();
    this.ViewAccountSettings = true;
  }

  btnViewChildren (){
    this.ResetAll();
    this.ViewChildrenSettings = true;
  }

  btnViewTCs(){
    this.ResetAll();
    this.ViewTCs = true;
  }

  btnViewHelp(){
    this.ResetAll();
    this.ViewHelp = true;
  }

  ResetAll(){
    this.ViewAccountSettings  = false;
    this.ViewChildrenSettings = false;
    this.ViewTCs              = false;
    this.ViewHelp             = false;
  }


//Account Setting-------------------------------------------------------
  btnMainReset(){
    //Rest the values on the main screen
    this.SetUsersValues();
  }

  async saveMainProfile() {
    let userName = (<HTMLInputElement>document.getElementById("edtMainusername")).value;
    let userSName = (<HTMLInputElement>document.getElementById("edtMainusersurname")).value;
    let userCell = (<HTMLInputElement>document.getElementById("edtMainmobile")).value;
    let userIdNo = (<HTMLInputElement>document.getElementById("edtMainDOB")).value;

    //this.validateInfo(userName, userSName, userCell, userIdNo);
    if (this.blnValid) {
      let strResult: string = await (this.clsFirebaseConnectionService.UpdateUser(userName, userSName, userCell, userIdNo));
      if (strResult.includes("error,")) {
        window.alert(strResult.replace("error,", ""));
      } else {
        this.clsUser.id = userIdNo;
        this.clsUser.firstname = userName;
        this.clsUser.surname = userSName;
        this.clsUser.cell = userCell;
        this.SetUsersValues();

        window.alert("Details updated");
      }
    } else {
      window.alert(this.strErr);
    }
    
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

//Children--------------------------------------------------------------
  async GenerateCode() {
    let strCode = "";

    for (let i = 4; i >= 0; i--) {
      strCode = strCode + this.uAuto.charAt(this.uAuto.length - i);
    }
    //uploade code to FB
    let bvalid = await this.clsFirebaseConnectionService.setLinkCode(strCode);

    if(bvalid === true){
      strCode = strCode.toUpperCase();
      (<HTMLLabelElement>document.getElementById("GenCodeDisplay")).innerHTML= strCode;
    }else{
      (<HTMLLabelElement>document.getElementById("GenCodeDisplay")).innerHTML= "Something went wrong, please try again.";
    }
    
    
  }

  async LinkToAccount(){
    //link parent to child account

    let enteredCode = (<HTMLInputElement>document.getElementById("linkCode")).value;

    let bvalid = await this.clsFirebaseConnectionService.LinkAccounts(enteredCode);
    if(bvalid == true){
      console.log("Linked accounts");
      window.alert("account linked");
    }else{
      console.log("unable to Linked accounts");
      window.alert("failed to link account's linked");
    }

  }

  btnChildReset(){
    this.SetUsersValues();
  }

  async saveChildProfile(){
    let sName = (<HTMLInputElement>document.getElementById("Childsusername")).value;
    let sSurname = (<HTMLInputElement>document.getElementById("Childsusersurname")).value;
    let sMobile = (<HTMLInputElement>document.getElementById("Childsmobile")).value;
    let sID = (<HTMLInputElement>document.getElementById("ChildsDOB")).value;

    let clsUser = {
      email : "",
      type      : "",
      id        : sID,
      firstname : sName,
      surname   : sSurname,
      cell      : sMobile,
      autoid    : "",
      ChildsID  : []
    };


    let reply = await this.clsFirebaseConnectionService.updateChildDetails(clsUser);
    if(reply == "true"){
      window.alert("Childs details have been updated");
    }else{
      window.alert(reply);
    }
  }

  async getSchools(){
    this.lstSchools = await this.clsFirebaseConnectionService.getSchoolList();
    //update the screen to show all school names
  }

  async btnLinkToSchool(){
    let schoolID = this.schoolSelectedId;

    let reply = await this.clsFirebaseConnectionService.LinkChildToSchool(schoolID,this.GradeSelected);
    if(reply == "true"){
      window.alert("Childs details have been updated");
    }else{
      window.alert(reply);
    }
  }



//View T's & C's-----------------------------------------------------------
  ViewTCPDF(){
    window.open('http://stackoverflow.com','_blank');
  }




  
  



  

}
