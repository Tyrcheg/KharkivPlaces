import { Injectable } from '@angular/core';

import * as db  from 'firebase';
import { DateTime } from "ionic-angular";
import { User, Place, PlaceTypeObj, PlaceForPlaceType, PlaceRating, PlaceRatings, UsersFollowing, PlaceType } from "../models/models";

@Injectable()
export class InitDatabase {
    constructor() {}
    usersRef = db.database().ref('/users');
    authRef = db.auth();
    placeTypesRef = db.database().ref('/placesTypes');
    placesRef = db.database().ref('/places');
    placesFeedbacks = db.database().ref('/placesFeedbacks');
    usersFollowings = db.database().ref('/usersFollowings');

    createUser(email, first, last, password){
        this.authRef.createUserWithEmailAndPassword(email, password).then( snap => {
            let user : User = { email: email, firstName: first, lastName: last, pictures: true, usersFollowingsRef: true  };
            this.usersFollowings.push()
            this.usersRef.push(user).then( snap => { }, err => { if(err) console.log(err) });
        })
        
    }

    createPlace(name, address, locationLat, locationLon, placeType: PlaceType) {
        let location = { lat: locationLat, lon: locationLon };
        let place: Place = { name: name, address: address, 
            location : location, placeType: PlaceType[placeType], rating: 0, followersRefId: true, ratingsRefId: true };
        
        this.placesRef.push(place).then(snap => {
            // let newPlaceId = snap.key;
            // let name = place.name;
            console.log("Searched type name ", place.placeType);
            this.placeTypesRef.orderByChild('name').equalTo(place.placeType).once('value', snap => {
                console.log(snap[0].val().name)
                snap.forEach(elem => {
                    console.log("FUNCKING", elem.key, elem.val())
                    return false;
                })
            })
        })
    }

  initPlaceTypes(){
      this.placeTypesRef.once('value', snap => {
          if(snap.val())
            return;
         var counter = 0;
         var counter2 = 0;
         for(var type in PlaceType)
            counter++;

         for(var type in PlaceType){
            counter2++;
            if(counter2 < counter / 2)
                this.placeTypesRef.push( { name: PlaceType[type], placesCount: 0 });
        }
    });
  }

}



