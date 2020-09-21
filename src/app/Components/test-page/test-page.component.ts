import { Component, OnInit } from '@angular/core';
import { FirebaseConnectionService } from 'src/app/Firebase/firebase-connection.service';

import { ActivatedRoute ,Router } from "@angular/router";

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {

  difficulty: string;
  private sub: any;

  constructor(private clsFirebaseConnectionService: FirebaseConnectionService,
              private router: ActivatedRoute,private route: Router) { }

  ngOnInit(): void {
    this.sub = this.router.params.subscribe(params => {
      this.difficulty = params['difficulty'];
      console.log(params['subject'])
      // In a real app: dispatch action to load the details here.
      this.loadQuestions();
    });
    console.log(this.difficulty);
  }

  async loadQuestions(){
    //Load questions for the difficulty
    //Test/English/Grade 1/Maths/Easy/
    //let lstQuestions  = await(this.clsFirebaseConnectionService.GetUsersDetails());


    
  }

}
