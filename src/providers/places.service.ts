import { Injectable } from '@angular/core';

import { Place, PlaceType } from "../_models/models";
import * as db  from 'firebase';

@Injectable()
export class PlacesService { 
    constructor() {}

    placesRef = db.database().ref('/places');    
    placesTypesRef = db.database().ref('/placesTypes');

    placeNames = ["Misto", "MoskvichBar", "SecretPlace", "MoonRoom", "MetropolPark", 
        "Dybrovskii", "Arizona", "Bolero", "Meridian", "AltBier"]
    streetsNames = ["Сумская 23", "Данилевского 32", "Чичибабина 47", "Шевченко 192", "Самолетная 12", "Гагарина 61"];

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
}