import { Injectable } from '@angular/core';

import * as db  from 'firebase';

@Injectable()
export class AuthorizationService {

  constructor() {}

  loginUser(email: string, password: string): firebase.Promise<any> {
    return db.auth().signInWithEmailAndPassword(email, password); 
  }
  
  signupUser(email: string, password: string): firebase.Promise<any> {
    return db.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
      var user = { firstName: "anonymous", email : email, picture: {
          thumbnail: "https://firebasestorage.googleapis.com/v0/b/kharkivplaces.appspot.com/o/anonThumbnail.png?alt=media&token=e9568db4-16f4-4d7a-9313-130c32e49269"
        }
      };
      db.database().ref('/users').child(newUser.uid).set(user);
    });
  }

  resetPassword(email: string): firebase.Promise<any> {
    return db.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): firebase.Promise<any> {
    return db.auth().signOut();
  }

}



