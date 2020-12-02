import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-questions',
  templateUrl: './teacher-questions.component.html',
  styleUrls: ['./teacher-questions.component.css']
})
export class TeacherQuestionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ResetScreen(){
    (<HTMLInputElement>document.getElementById("txtAnswer1")).value = "";
    (<HTMLInputElement>document.getElementById("txtAnswer2")).value = "";
    (<HTMLInputElement>document.getElementById("rememberMe1")).checked = false;
    (<HTMLInputElement>document.getElementById("rememberMe2")).checked = false;
  }

  SubmitQuestion(){

  }

}
