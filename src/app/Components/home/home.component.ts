import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FirebaseConnectionService } from 'src/app/Firebase/firebase-connection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public Words    = false;
  public Maths    = false;
  public Sciences = false;
  public History  = false;
  public Arts     = false;

  public lstGrades = [];
  public GradeSelected = "2";

  public isLearner = false;

  constructor(private clsFirebaseConnectionService: FirebaseConnectionService,public router: Router) { 
    this.AccountSettingsOnLoad();

    for (let index = 0; index < 10; index++) {
      this.lstGrades.push(index);
    }
  }

  ngOnInit(): void {
    
  }

  async lstGradeChanged(){
    let lstSubjects = await this.clsFirebaseConnectionService.getSubjects(this.GradeSelected);

    this.Words = false;
    this.Maths = false;
    this.Sciences = false;
    this.History = false;
    this.Arts = false;

    if(lstSubjects.includes("English")){
      this.Words = true;
    }

    if(lstSubjects.includes("Maths")){
      this.Maths = true;
    }

    if(lstSubjects.includes("Sciences")){
      this.Sciences = true;
    }

    if(lstSubjects.includes("History")){
      this.History = true;
    }

    if(lstSubjects.includes("Arts")){
      this.Arts = true;
    }
  }


  async AccountSettingsOnLoad(){

    let clsUser = await this.clsFirebaseConnectionService.GetUsersDetails();

    if(clsUser.type == "student"){
      this.isLearner = true;
      this.GradeSelected = clsUser.Grade;
    }else{
      this.isLearner = false;
      this.GradeSelected = "2";
    }
    
    let lstSubjects = await this.clsFirebaseConnectionService.getSubjects(this.GradeSelected);

    if(lstSubjects.includes("Words")){
      this.Words = true;
    }
    if(lstSubjects.includes("Maths")){
      this.Maths = true;
    }

    if(lstSubjects.includes("Sciences")){
      this.Sciences = true;
    }

    if(lstSubjects.includes("History")){
      this.History = true;
    }

    if(lstSubjects.includes("Arts")){
      this.Arts = true;
    }


  }

}
