import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Student } from 'src/app/models/Users/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseConnectionService {

  constructor(private firestore: AngularFirestore) { }

  //Example, Waiting for DB to be setup
  getUsers(){
    return this.firestore.collection('Users').snapshotChanges();
  }

  CreateUser(clsStudent: Student){
    return this.firestore.collection('Users').add(clsStudent);
  }

}
