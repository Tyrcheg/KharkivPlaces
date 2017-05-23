import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import * as _ from 'lodash';
import { PlacePage } from "../pages";

@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})
export class PlacesPage {
  selectedTypes = ["all"];
  placeTypes = [];

  filteredPlaces = [];
  places = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loader: LoadingController) {
    this.getPlaceTypes();

    firebase.database().ref('/places').on('child_added', snap => {
      var newPlace = snap.val();
        this.places.push({ 
          typeName: newPlace.type,
          placeName: newPlace.name, 
          placeId: newPlace.id
        });
        this.selectListChanged();
      });
  }

  doRefresh(e : Event ){
    this.getPlaceTypes();
  }


  getPlaceTypes(){
    var loading = this.loader.create();
    loading.present();
    var newPlaceTypesArray = [];
    firebase.database().ref('/placesTypes').once('value', snap => {
      // pushing to placeTypes array
      snap.forEach(type => {
        newPlaceTypesArray.push({
          name: type.val().name,
          placesCount: type.val().placesCount
        });
        // pushing to places array
        console.log(type.val().places);
        if(type.val().places)
        Array.prototype.forEach.call(type.val().places, place => {
          console.log("PLACE IN FOREACH", place)
          // console.log(type.val().name, place.name, place.id);
          // this.places.push({
          //   typeName: type.val().name,
          //   placeName: place.name,
          //   placeId: place.id
          // });
        });
        return false;
      });
      this.placeTypes = newPlaceTypesArray;
    }).then( () => { 
      // updateFiltering
      console.log("must fires one time");
      loading.dismiss();
    });
  }

  selectListChanged(){
    console.log("List changed", this.selectedTypes);

    this.filteredPlaces = [];
    if(this.selectedTypes.indexOf("all") >= 0){
      this.filteredPlaces = this.places;
      return;
    }
    if(this.selectedTypes === []) {
      this.filteredPlaces = [];
      return;
    }
    //this.filteredPlaces = _.filterByValues(this.places, 'props.typeName', this.selectedTypes);
    // this.filterArrayOfPlaces();
  }

  goToPlacePage(place){
    console.log(place);
     //this.navCtrl.push(PlacePage, place);
  }

  filterArrayOfPlaces(){
    this.filteredPlaces = this.places.filter( el => {
      //return (this.selectedTypes[el.typeName] !== null);
      return (el.typeName === "PartyBar");
    })
  }
}
