import { Component, OnInit } from '@angular/core';

//For Firebase
import {FirebaseConnectionService} from 'src/app/Firebase/firebase-connection.service';
import {Student} from 'src/app/models/Users/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  clsStudent: Student;
  constructor(private clsFirebaseConnectionService: FirebaseConnectionService) { }

  ngOnInit(): void {

  }

  /*
    Check if user is logged in

    assign details to clsStudent
    pass clsStudent to clsFirebaseConnectionService.SignInUser(clsStudent)
    This will return a string
  */

}
