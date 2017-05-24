import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountSettingsPage } from "../pages";

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = navParams.data;
    console.log(this.user);
  }

  ionViewDidLoad() {

  }

  goToSettingsPage() {
    this.navCtrl.push(AccountSettingsPage, this.user);
  }

}
