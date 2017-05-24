import { Injectable } from '@angular/core';

import { Place, PlaceType } from "../_models/models";
import * as db from 'firebase';
import { PlacesNewsService } from "./providers";

@Injectable()
export class PlacesService {

    constructor() { }

    placesRef = db.database().ref('/places');
    placesTypesRef = db.database().ref('/placesTypes');

    placeNames = ["Misto", "MoskvichBar", "SecretPlace", "MoonRoom", "MetropolPark",
        "Dybrovskii", "Arizona", "Bolero", "Meridian", "AltBier"]
    streetsNames = ["Сумская 23", "Данилевского 32", "Чичибабина 47", "Шевченко 192", "Самолетная 12", "Гагарина 61"];

    titles = ["Меню", "Новое меню", "Выступление", "Праздник", "Празднование дня студента", "Празднование Дня рождения", "Открытие сезона", "Новый интерьер"];
    texts = ["Мы приготовили для вас чото длфы нфзйл ", "Новая кухня в нашем заведение...", "Выступление известного артиста из России", "День открытых дверей одного из университетов"]

    createPlace(name, address, locationLat, locationLon, placeType: PlaceType) {
        let location = { lat: locationLat, lon: locationLon };
        let place: Place = {
            name: name, address: address,
            location: location, placeType: PlaceType[placeType], rating: 0, followersRefId: true, ratingsRefId: true
        };
        var newPlaceKey = this.placesRef.push(place).key;

        // create news feed
        var rand = Math.round(Math.random() * 120);
        PlacesNewsService.createFeed(newPlaceKey, place.name, this.titles[rand % --this.titles.length], this.texts[rand % --this.texts.length]);

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

    createRandomPlace() {
        let rand = Math.round((Math.random() * --this.placeNames.length));
        var placeType;
        for (var n in PlaceType)
            if (n.toString() == rand.toString())
            { placeType = n; break; }


        this.createPlace(this.placeNames[Math.round(Math.random() * 11) % 11],
            this.streetsNames[Math.round(Math.random() * --this.streetsNames.length - 1)],
            25 * rand * 100, 47 * rand,
            placeType);
    }
}