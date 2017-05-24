import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AccountService } from "../../providers/providers";

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  user: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private accountSrv: AccountService) {
      this.user = navParams.data;
  }

  loadUsersFollowings(){
        
  }

  logOut() {
    this.accountSrv.logout().then( suc => {
      this.navCtrl.popToRoot();
    }, err => {
      alert("Что-то пошло не так.")
    })
  }
}
