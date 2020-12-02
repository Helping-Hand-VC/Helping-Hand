import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-learn-home',
  templateUrl: './learn-home.component.html',
  styleUrls: ['./learn-home.component.css']
})
export class LearnHomeComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
    
  }

}
