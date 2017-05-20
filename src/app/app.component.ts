import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, ToastController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NewsPage, LoginPage, AccountPage, PlacesPage } from "../pages/pages";
import { AccountService } from "../providers/providers";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  isLogedIn;
  rootPage: any = NewsPage;


  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private accountSrv: AccountService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private events: Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Новости', component: NewsPage},
      { title: 'Места', component: PlacesPage}
    ];

    this.events.subscribe("user:loging", isLogedIn => {
      this.isLogedIn = isLogedIn;
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  openAccountPage(){
    this.nav.setRoot(AccountPage);
  }

  openLoginPage() {
    this.nav.push(LoginPage);
  }
}
