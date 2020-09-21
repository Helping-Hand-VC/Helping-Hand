import { Component, OnInit } from '@angular/core';

import { ActivatedRoute ,Router } from "@angular/router";

@Component({
  selector: 'app-class-page',
  templateUrl: './class-page.component.html',
  styleUrls: ['./class-page.component.css']
})
export class ClassPageComponent implements OnInit {

  subject: string;
  private sub: any;

  constructor(private router: ActivatedRoute,private route: Router ) { }

  ngOnInit(): void {
    

    this.sub = this.router.params.subscribe(params => {
      this.subject = params['subject']; // (+) converts string 'id' to a number
      (<HTMLInputElement>document.getElementById("subject")).innerHTML     = this.subject;
      // In a real app: dispatch action to load the details here.
    });
  }


  ProceedToTest(difficulty: string) {
    this.route.navigate(['class/'+this.subject+'/test', difficulty]); 
  }

}
