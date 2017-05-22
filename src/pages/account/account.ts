import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AccountService, AuthorizationService } from "../../providers/providers";

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
    private accountSrv: AccountService,
    private authService: AuthorizationService) {
      this.user = navParams.data;
  }

  loadUsersInfo(){
    // this.accountSrv.loadFullInfo().then( user => {
    //   this.user = user;
    // })
  }
  logOut() {
    this.authService.logoutUser().then( suc => {
      this.navCtrl.popToRoot();
    }, err => {
      alert("Что-то пошло не так.")
    })
  }
}
