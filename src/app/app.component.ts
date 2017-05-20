import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, ToastController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NewsPage, LoginPage, AccountPage, PlacesPage } from "../pages/pages";
import { AccountService, AuthData } from "../providers/providers";

import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  isLogedIn;
  rootPage: any = NewsPage;
  pages: Array<{title: string, component: any}> = [
      { title: 'Новости', component: NewsPage},
      { title: 'Места', component: PlacesPage}
    ];


  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private accountSrv: AccountService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private events: Events,
    private authData: AuthData) {
    this.initializeApp();
    this.initiliazeFirebase();

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

  initiliazeFirebase(){
      var config = {
        apiKey: "AIzaSyBS4m82UW1BT56bl_heTFaVQZumizKzUkA",
        authDomain: "kharkivplaces.firebaseapp.com",
        databaseURL: "https://kharkivplaces.firebaseio.com",
        projectId: "kharkivplaces",
        storageBucket: "kharkivplaces.appspot.com",
        messagingSenderId: "503102642749"
    };
      firebase.initializeApp(config);
      firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
              console.log("not login");
              // this.rootPage = Login;
          } else {
              console.log("login");
              // this.rootPage = HomePage;
          }
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

  logOut(){
    this.authData.logoutUser().then( suc => {
      // this.events.publish("user:logedin", false);
      this.isLogedIn = false;
    }, err => {
      alert("Что-то пошло не так.")
    })
  }
}
