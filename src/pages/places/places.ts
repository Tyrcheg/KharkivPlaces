import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import * as _ from 'lodash';
// import * as $ from 'jquery';

@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})
export class PlacesPage {
  selectedTypes = ["all"];
  placeTypes = [];

  sortedPlaces = [];
  places = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getPlaceTypes();

    firebase.database().ref('/places').orderByChild('rating')
      .on('value', snap => {
        this.places = [];
        snap.forEach(dataSnap => {
          this.places.push(dataSnap.val());
          return false;
        });
        this.selectListChanged();
      });


  }

  onChange(value){
    if(value == "all")
      this.selectedTypes = ["all"];
    else if(this.selectedTypes.indexOf("all") >= 0)
      this.selectedTypes.slice(this.selectedTypes.indexOf("all"), 1);      
  }
  ionViewDidLoad(){
    // var thisObj = this;
    // $("#list").change( function() {
    //   var val = $(this).val();
    //   if(val === "all"){
    //     thisObj.selectedTypes = ["all"];
    //   }
    // });

  }


  getPlaceTypes(){
    firebase.database().ref('/placesTypes').on('value', snap => {
      console.log(snap.val());
      snap.forEach(type => {
        this.placeTypes.push({
          name: type.val().name,
          key: type.key,
          placesCount: type.val().placesCount
        });
        return false;
      })
    })
  }

  selectListChanged(){
    this.sortedPlaces = [];
    if(this.selectedTypes.indexOf("all") >= 0){
      this.sortedPlaces = this.places;
      return;
    }

    _.forEach(this.places, element => {
      if(this.selectedTypes.indexOf(element.type) >= 0)
        this.sortedPlaces.push(element);
    });
  }

  goToPlace(place){
    // this.navCtrl.push(PlacePage, place);
  }
}
