import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, LoadingController, Loading } from 'ionic-angular';
import { AccountService } from "../../providers/providers";
import { RegistrationPage } from "../pages";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string = "";
  password: string  = "";
  loader : Loading;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private accountService: AccountService,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() { }

  login(){
    // let data = { 'name': this.username, 'password' : this.password };
    this.presentLoading();

    if(!this.accountService.login(this.email, this.password)){
      this.alertCtrl.create({
        title: 'Ошибка',
        subTitle: "Проверьте правильность ввода",
        buttons: ['Закрыть']
      }).present();
      this.email = "";
      this.password = "";

      this.loader.dismiss();
      return;
    }

    this.loader.dismiss();
    //this.viewCtrl.dismiss(true);
    this.navCtrl.pop();
  }

  register(){
    this.navCtrl.push(RegistrationPage);

  }

  presentLoading(){
    this.loader = this.loadingCtrl.create({
      content: "Авторизация..."
    });
    this.loader.present();
  }

  closePage(){
    this.navCtrl.pop();
  }



}
