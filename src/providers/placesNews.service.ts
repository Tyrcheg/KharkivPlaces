import { Injectable } from '@angular/core';

import * as db from 'firebase';
import { FullFeed, ShortFeed } from "../_models/models";

@Injectable()
export class PlacesNewsService {

    constructor() { }

    static createFeed(placeId, placeName, title, text: string) {
        var fullFeed: FullFeed = { image: null, title: title, text: text, placeName: placeName, likes: null };
        var newFeedKey = db.database().ref('/placesNews/full').child(placeId).push(fullFeed).key;

        var shortFeed: ShortFeed = { fullFeedId: newFeedKey, placeId: placeId, placeName: placeName, title: title, textPreview: text.substring(0, 40) + "..." }
        db.database().ref('/placesNews/short').push(shortFeed);


    }


}