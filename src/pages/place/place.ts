import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {
  place = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.place = navParams.data;
  }
}
