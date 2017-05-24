import { Injectable } from '@angular/core';

import * as db  from 'firebase';

@Injectable()
export class PlacesNewsService { 
    placesFeedsRef = db.database().ref('placesNews');

    constructor() {}

    createFeed(placeId, title, text){

        this.placesFeedsRef.child(placeId)
    }
}