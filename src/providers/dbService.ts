import { Injectable } from '@angular/core';

import * as db  from 'firebase';
import {  PlaceType } from "../_models/models";

//PlaceTypeObj, PlaceForPlaceType, PlaceRating, PlaceRatings, UsersFollowing, 
@Injectable()
export class DbService {

    constructor() {}

    authRef = db.auth();
    usersRef = db.database().ref('/users');    
    placesRef = db.database().ref('/places');    
    placesTypesRef = db.database().ref('/placesTypes');
    placesFeedbacks = db.database().ref('/placesFeedbacks');
    usersFollowings = db.database().ref('/usersFollowings');

    initPlaceTypes(){
        this.placesTypesRef.once('value', snap => {
          if(snap.val())
            return;
         var counter = 0;
         var counter2 = 0;
         for(var type in PlaceType)
            counter++;

         for(var type in PlaceType){
            counter2++;
            if(counter2 < counter / 2)
                this.placesTypesRef.push( { name: PlaceType[type], placesCount: 0 });
        }
    });
  }

  initDb(){
    //  this.initPlaceTypes();
    //   this.createRandomPlace();
  }
}

