import { Injectable  } from '@angular/core';
import 'rxjs/add/operator/map';

import * as db from 'firebase';
import { User } from "../_models/models";

@Injectable()
export class AccountService {
  authRef = db.auth();
  usersRef = db.database().ref('users/');
  anonThumbnailRef = "https://firebasestorage.googleapis.com/v0/b/kharkivplaces.appspot.com/o/anonThumbnail.png?alt=media&token=e9568db4-16f4-4d7a-9313-130c32e49269";

  usersOnChangedRef: db.database.Reference; 

  constructor(){

  }

  createUserProfileWithIdAndEmail(uid, email){
      let user : User = { email: email, thumbnail: this.anonThumbnailRef, 
            firstName: null, lastName: null, pictures: null, usersFollowingsRef: null  };
      console.log("SIGNUP PARt 2", uid);
      this.usersRef.child(uid).set(user);
  }

  createUser(email, password, firstName, lastName){
    this.authRef.createUserWithEmailAndPassword(email, password).then(snap => {
        console.log(this.authRef.currentUser);
        let user : User = { email: email, thumbnail: this.anonThumbnailRef, 
            firstName: firstName, lastName: lastName, pictures: true, usersFollowingsRef: true  };
        this.usersRef.child(snap.uid).set(user);
    });
  }

  createRandomUser(){
    this.createUser("asd" + Math.round(Math.random() * 1000) + "@ml.ru", "somePassword", "First", "Last");
  }

  signupUser(email: string, password: string) {
    return db.auth().createUserWithEmailAndPassword(email, password).then(newUser => {
        this.createUserProfileWithIdAndEmail(newUser.uid, email);
    });
  }

  login(email, password) : firebase.Promise<any>{
    return db.auth().signInWithEmailAndPassword(email, password); 
  }

  logout() : firebase.Promise<any>{
    if(this.usersOnChangedRef)
      this.usersOnChangedRef.off();
    return this.authRef.signOut();
  }

  getCurrentUser(){
    return db.auth().currentUser;
  }
  
  resetPassword(email: string): firebase.Promise<any> {
    return db.auth().sendPasswordResetEmail(email);
  }

}
