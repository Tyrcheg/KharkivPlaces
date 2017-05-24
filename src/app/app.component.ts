import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, ToastController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as firebase from 'firebase';

import { NewsPage, LoginPage, AccountPage, PlacesPage } from "../pages/pages";
import { AccountService } from "../providers/providers";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  user = null;
  static globalUserObj = null;
  userRef: firebase.database.Reference;
  userOnChangeCallback;

  rootPage: any = NewsPage;

  pages: Array<{ title: string, component: any }> = [
    { title: 'Новости', component: NewsPage },
    { title: 'Места', component: PlacesPage }
  ];

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private events: Events,
    private accountService: AccountService
  ) {
    this.initializeApp();

    this.subscribeToAuthChangeEvent();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (!this.platform.win()) {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      }
    });
  }

  subscribeToAuthChangeEvent() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        console.log("OnAutChange: LoggedOut");
        this.user = null;
        MyApp.globalUserObj = null;
        this.unsubscribeFromUserChangedEvent();
        return;
      }
      console.log("OnAutChange: LoggedIn", user.uid);
      this.userRef = firebase.database().ref('users/' + user.uid);
      this.userRef.once('value', snap => {
        this.user = snap.val();
        console.log("After on auth changed + once ", snap.val());
        MyApp.globalUserObj = this.user;
      });
      this.subscribeOnUserChangedEvent();
    });
  }

  subscribeOnUserChangedEvent() {
    this.userOnChangeCallback = this.userRef.on('child_changed', snap => {
      snap.ref.parent.once('value', snap => {
        this.user = snap.val();
      }, err => {
        if (!err)
          console.log("UserChangedEvent fires", this.user);
      });
    });
  }

  unsubscribeFromUserChangedEvent() {
    console.log("UserUnsubscribe from change", this.user);
    if (this.userRef)
      this.userRef.off('child_changed', this.userOnChangeCallback);
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  openAccountPage() {
    if (!this.user)
      return;
    this.nav.setRoot(AccountPage, this.user);
  }

  openLoginPage() {
    this.nav.push(LoginPage, null, {
      animate: true,
      direction: 'forward' // can be back
    });
  }

  logOut() {
    firebase.auth().signOut().then(suc => {
      this.nav.setRoot(NewsPage, null);
    }, err => {
      alert("Что-то пошло не так.")
    })
  }
}