import { Injectable } from '@angular/core';

import * as db  from 'firebase';
import { User, Place, PlaceType } from "../models/models";

//PlaceTypeObj, PlaceForPlaceType, PlaceRating, PlaceRatings, UsersFollowing, 
@Injectable()
export class DbService {
    constructor() {

    }

    authRef = db.auth();
    usersRef = db.database().ref('/users');    
    placesRef = db.database().ref('/places');    
    placesTypesRef = db.database().ref('/placesTypes');
    placesFeedbacks = db.database().ref('/placesFeedbacks');
    usersFollowings = db.database().ref('/usersFollowings');

    anonThumbnailRef = "https://firebasestorage.googleapis.com/v0/b/kharkivplaces.appspot.com/o/anonThumbnail.png?alt=media&token=e9568db4-16f4-4d7a-9313-130c32e49269";

    placeNames = ["Misto", "MoskvichBar", "SecretPlace", "MoonRoom", "MetropolPark", 
        "Dybrovskii", "Arizona", "Bolero", "Meridian", "AltBier"]
    streetsNames = ["Сумская 23", "Данилевского 32", "Чичибабина 47", "Шевченко 192", "Самолетная 12", "Гагарина 61"];

    createUser(email, password, firstName, lastName){
        this.authRef.createUserWithEmailAndPassword(email, password).then(snap => {
            console.log(this.authRef.currentUser);
            let user : User = { email: email, thumbnail: this.anonThumbnailRef, 
                firstName: firstName, lastName: lastName, pictures: true, usersFollowingsRef: true  };
            this.usersRef.child(snap.uid).set(user);
        });
    };

    createPlace(name, address, locationLat, locationLon, placeType: PlaceType) {
        let location = { lat: locationLat, lon: locationLon };
        let place: Place = { name: name, address: address, 
            location : location, placeType: PlaceType[placeType], rating: 0, followersRefId: true, ratingsRefId: true };
        var newPlaceKey = this.placesRef.push(place).key;

        this.placesTypesRef.orderByChild('name').equalTo(place.placeType).once('value', snap => {
            snap.forEach(elem => {
                this.placesTypesRef.child(elem.key).child('places').push({ id: newPlaceKey, name: place.name })
                this.placesTypesRef.child(elem.key).child('placesCount').transaction(typeSnap => {
                    return ++typeSnap; 
                });
                return true;
            });
        });
    }

    createRandomPlace(){
      let rand = Math.round((Math.random() * this.placeNames.length)) -1;
      var placeType;
      for(var n in PlaceType)
        if(n.toString() == rand.toString())
        { placeType = n; break; }
        
      this.createPlace(this.placeNames[Math.round(Math.random() * (this.placeNames.length - 1))], 
        this.streetsNames[Math.round(Math.random() * ( this.streetsNames.length - 1))],
        25 * rand * 100, 47 * rand, 
        placeType);
    }

    createRandomUser(){
        this.createUser("asd" + Math.round(Math.random() * 1000) + "@ml.ru", "somePassword", "First", "Last");
    }

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
      this.createUser("a" + Math.round(Math.random() * 1000) + "@some.ru", "somePassword", "Art", "Mirtk");
      this.createRandomPlace();
  }
}

