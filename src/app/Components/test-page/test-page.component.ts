import { Component, OnInit } from '@angular/core';
import { FirebaseConnectionService } from 'src/app/Firebase/firebase-connection.service';

import { ActivatedRoute ,Router } from "@angular/router";

import { test } from 'src/app/models/Users/user.model';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {

  difficulty: string;
  subject:string;
  private sub: any;
  public awards = false;
  public clsTests: test[] = [];


  iCorrect = 0;
  iCurrent = 0;

  public iChoice = -1;

  constructor(private clsFirebaseConnectionService: FirebaseConnectionService,
              private route: ActivatedRoute,public router: Router) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.difficulty = params['difficulty'];
      this.subject = params['subject'];
      // In a real app: dispatch action to load the details here.
      this.loadQuestions();
    });
    console.log(this.difficulty);
  }

  btnFinishClicked(){
    this.router.navigate(['home']);
  }

  

  async loadQuestions(){
    //Load questions for the difficulty
    //Test/English/Grade 1/Maths/Easy/
    if(this.subject == null || this.difficulty==null){
      this.router.navigate(['home']);
    }
    
    this.clsTests  = await(this.clsFirebaseConnectionService.GetTest(this.subject, this.difficulty));

    (<HTMLLabelElement>document.getElementById("question")).innerHTML = this.clsTests[0].Question;
    (<HTMLLabelElement>document.getElementById("choice0")).innerHTML = this.clsTests[0].PossibleAnswer[0];
    (<HTMLLabelElement>document.getElementById("choice1")).innerHTML = this.clsTests[0].PossibleAnswer[1];
    (<HTMLLabelElement>document.getElementById("progress")).innerHTML = "Question " + (this.iCurrent+1) + " of " + this.clsTests.length;
  }

  async btnNextQuestion(){
    if(this.iChoice == -1){
      window.alert("Please select an answer");
    }else{
      if(((<HTMLLabelElement>document.getElementById("choice" + this.iChoice)).innerHTML) == this.clsTests[this.iCurrent].CorrectAnswer){
        //Correct
        window.alert("That is correct");
        this.clsTests[this.iCurrent].userGetCorrect = true;
        this.iCorrect++;
      }else{
        //Wrong
        window.alert("That was wrong");
        this.clsTests[this.iCurrent].userGetCorrect = false;
      }
      
      this.iCurrent++;
      if(this.iCurrent >= this.clsTests.length){
        //end of paper
        //Update FB
        let sTemp = this.iCorrect + "/" + (this.iCurrent);
        let sResult  = await(this.clsFirebaseConnectionService.updateUserTest(this.subject, this.difficulty,sTemp));

        if(sResult == "true"){
          this.awards = true;
        }else{
          window.alert("Seomthing went wrong, please try again");
        }

        //Show next screen
      }else{

       

        (<HTMLLabelElement>document.getElementById("question")).innerHTML = this.clsTests[this.iCurrent].Question;
        (<HTMLLabelElement>document.getElementById("choice0")).innerHTML = this.clsTests[this.iCurrent].PossibleAnswer[0];
        (<HTMLLabelElement>document.getElementById("choice1")).innerHTML = this.clsTests[this.iCurrent].PossibleAnswer[1];
        (<HTMLLabelElement>document.getElementById("progress")).innerHTML = "Question " + (this.iCurrent+1) + " of " + this.clsTests.length;

        this.iChoice = -1;
      }

     
    }


    
  }


  Choice0(){
    this.iChoice = 0;
  }

  Choice1(){
    this.iChoice = 1;
  }

}
