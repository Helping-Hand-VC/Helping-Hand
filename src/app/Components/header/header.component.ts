import { Component, OnInit } from '@angular/core';
import { FirebaseConnectionService } from 'src/app/Firebase/firebase-connection.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private clsFirebaseConnectionService: FirebaseConnectionService) { }

  ngOnInit(): void {
  }

  LogUSerOut(){
    this.clsFirebaseConnectionService.SignOut();
  }

}
