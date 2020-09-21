import { Component, OnInit } from '@angular/core';
import { FirebaseConnectionService } from 'src/app/Firebase/firebase-connection.service';
import { Router } from "@angular/router";

import { Student } from 'src/app/models/Users/user.model';

 
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(private clsFirebaseConnectionService: FirebaseConnectionService,private router: Router) { }

  ngOnInit(): void {
    this.AccountSettingsOnLoad();//Calling method as it is async
  }

  async AccountSettingsOnLoad(){
    let clsStudent: Student  = await(this.clsFirebaseConnectionService.GetUsersDetails());
    if(clsStudent.firstname == null){
      this.router.navigate(['login']); //Something went wrong so make them login again
    }else{
      (<HTMLInputElement>document.getElementById("username")).value     = clsStudent.firstname;
      (<HTMLInputElement>document.getElementById("usersurname")).value  = clsStudent.surname;
      (<HTMLInputElement>document.getElementById("mobile")).value       = clsStudent.cell;
      (<HTMLInputElement>document.getElementById("DOB")).value          = clsStudent.id;
    }
  }


  async saveProfile() {
    let userName = (<HTMLInputElement>document.getElementById("username")).value;
    let userSName = (<HTMLInputElement>document.getElementById("usersurname")).value;
    let userCell = (<HTMLInputElement>document.getElementById("mobile")).value;
    let userIdNo = (<HTMLInputElement>document.getElementById("DOB")).value;

    let strResult: string = await(this.clsFirebaseConnectionService.UpdateUser( userName, userSName, userCell, userIdNo));
    if (strResult.includes("error,")) {
      window.alert(strResult.replace("error,", ""));
    } else {
      window.alert("Details updated");
    }
  }

}
