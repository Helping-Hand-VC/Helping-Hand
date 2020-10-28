import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseConnectionService } from 'src/app/Firebase/firebase-connection.service';

import { takenTests } from 'src/app/models/Users/user.model';

@Component({
  selector: 'app-view-mark',
  templateUrl: './view-mark.component.html',
  styleUrls: ['./view-mark.component.css']
})
export class ViewMarkComponent implements OnInit {

  public lstMarks:takenTests[] = [];


  constructor(private clsFirebaseConnectionService: FirebaseConnectionService,private router: Router) {
    this.getMarks();
   }

   async getMarks(){
    this.lstMarks = await this.clsFirebaseConnectionService.getUsersPastTests();
   }

  ngOnInit(): void {
  }

}
