import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import * as db from 'firebase';
import { PlacePage } from "../pages";

@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})
export class PlacesPage {
  placesTypesRef = db.database().ref('placesTypes/');

  selectedTypes = [];
  placeTypes = [];

  filteredPlaces = [];
  places = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loader: LoadingController) {
      this.selectedTypes = ["Все"];
      this.getTypesAndPlaces();
  }

  getTypesAndPlaces(){
    var loading = this.loader.create();
    loading.present();
    var typesArray = [];
    var placesArray = [];

    this.placesTypesRef.once('value', snap => {
      snap.forEach(type => {
        if(type.val().placesCount == 0)
          return;
        typesArray.push({ name: type.val().name, count: type.val().placesCount});
        var snapPlaces = type.val().places;

        for (var key in snapPlaces) {
          if (snapPlaces.hasOwnProperty(key)) 
            placesArray.push({ id: snapPlaces[key].id, name: snapPlaces[key].name,  type: type.val().name })
      }
        return false;
      });
      
      this.placeTypes = typesArray;
      this.places = placesArray;
      this.selectListChanged();

      loading.dismiss();
    })
  }

  selectListChanged(){
    console.log("List changed", this.selectedTypes);

    if(this.selectedTypes.indexOf("Все") > -1) {
      this.filteredPlaces = this.places;
      return;
    }
    // this.filteredPlaces = _.filterByValues(this.places, 'props.typeName', this.selectedTypes);
    this.filteredPlaces = this.filterArrayOfPlaces(this.selectedTypes);
    // this.filterArrayOfPlaces();
  }

  goToPlacePage(place){
     this.navCtrl.push(PlacePage, place.id);
  }

  filterArrayOfPlaces(value){
    return this.places.filter( el => {
      return (el.type === value);
    })
  }
}


