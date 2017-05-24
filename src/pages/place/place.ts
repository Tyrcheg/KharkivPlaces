import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as db from 'firebase';

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {
  place = {};
  placeRef: db.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.placeRef = db.database().ref('places/' + navParams.data);
    this.getPlaceInfo();
  }

  getPlaceInfo() {
    return this.placeRef.once("value", snap => {
      this.place = snap.val();
    }).catch(err => console.log(err));
  }

  doRefresh(e) {
    this.getPlaceInfo().then(() => e.complete());
  }

  dismiss() {
    this.navCtrl.pop();
  }
}
