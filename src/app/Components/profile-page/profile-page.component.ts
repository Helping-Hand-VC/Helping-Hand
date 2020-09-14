import { Component, OnInit } from '@angular/core';
import { FirebaseConnectionService } from 'src/app/Firebase/firebase-connection.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(private clsFirebaseConnectionService: FirebaseConnectionService) { }

  ngOnInit(): void {
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
      //this.router.navigate(['profile']);
    }
  }

}
