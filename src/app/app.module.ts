import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from "@angular/http";

import { UserSettings, AuthorizationService, DbService, PlacesService, PlacesTypesService, AccountService, PlacesNewsService } from "../providers/providers";

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NewsPage, AccountPage, LoginPage, PlacesPage, SignupPage, ResetPasswordPage, PlacePage } from "../pages/pages";

import * as firebase from 'firebase';
import { CommonModule } from "@angular/common/";

firebase.initializeApp({
          apiKey: "AIzaSyBS4m82UW1BT56bl_heTFaVQZumizKzUkA",
          authDomain: "kharkivplaces.firebaseapp.com",
          databaseURL: "https://kharkivplaces.firebaseio.com",
          projectId: "kharkivplaces",
          storageBucket: "kharkivplaces.appspot.com",
          messagingSenderId: "503102642749"
      });
 
@NgModule({
  declarations: [
    MyApp,
    NewsPage,
    AccountPage, 
    LoginPage,
    PlacesPage,
    SignupPage,
    ResetPasswordPage,
    PlacePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CommonModule
  ],
  bootstrap: [IonicApp], 
  entryComponents: [
    MyApp,
    NewsPage,
    AccountPage, 
    LoginPage,
    PlacesPage,
    SignupPage,
    ResetPasswordPage,
    PlacePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler},
    UserSettings,
    AuthorizationService,
    AccountService,
    DbService,
    PlacesService,
    PlacesTypesService,
    PlacesNewsService
  ]
})
export class AppModule {}
