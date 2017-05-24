import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import * as _ from 'lodash';
import * as db from 'firebase';


@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})
export class PlacesPage {
  placesTypesRef = db.database().ref('placesTypes/');

  selectedTypes = "";
  placeTypes = [];

  filteredPlaces = [];
  places = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loader: LoadingController) {
    this.getPlaceTypes();
  }

  getPlaceTypes(){
    var loading = this.loader.create();
    loading.present();
    var typesArray = [];
    var placesArray = [];
    this.placesTypesRef.once('value', snap => {
      snap.forEach(type => {
        typesArray.push({ name: type.val().name, count: type.val().placesCount});
        // placesArray.push({ type: type.val().name, places: type.val().places});
        // type.val().places.forEach(place => {
          var places = type.val().places;
          if(type.val().placesCount > 0){
            Array.from(places).forEach(elem => {
              placesArray.push(elem);
            });
            Object.keys(places).forEach(function (key){
               placesArray.push(places[key]);
            });
          }
        return false;
      });
      console.log("Places array", placesArray);
      this.placeTypes = typesArray;
      this.places = placesArray;

      loading.dismiss();
    })
  }

  selectListChanged(){
    console.log("List changed", this.selectedTypes);

    // this.filteredPlaces = [];
    // if(this.selectedTypes.indexOf("all") >= 0){
    //   this.filteredPlaces = this.places;
    //   return;
    // }
    if(this.selectedTypes ===  "all") {
      this.filteredPlaces = this.places;
      return;
    }
    // this.filteredPlaces = _.filterByValues(this.places, 'props.typeName', this.selectedTypes);
    this.filteredPlaces = this.filterArrayOfPlaces(this.selectedTypes);
    // this.filterArrayOfPlaces();
  }

  goToPlacePage(place){
    console.log(place);
     //this.navCtrl.push(PlacePage, place);
  }

  filterArrayOfPlaces(value){
    return this.places.filter( el => {
      return (el.type === value);
    })
  }
}


