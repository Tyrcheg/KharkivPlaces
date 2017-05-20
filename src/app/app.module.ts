import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from "@angular/http";

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NewsPage, AccountPage, LoginPage, PlacesPage, SignupPage, ResetPasswordPage } from "../pages/pages";
import { UserSettings, AccountService, AuthData } from "../providers/providers";


export const fireBaseConfig = {
    apiKey: "AIzaSyBS4m82UW1BT56bl_heTFaVQZumizKzUkA",
    authDomain: "kharkivplaces.firebaseapp.com",
    databaseURL: "https://kharkivplaces.firebaseio.com",
    projectId: "kharkivplaces",
    storageBucket: "kharkivplaces.appspot.com",
    messagingSenderId: "503102642749"
};

@NgModule({
  declarations: [
    MyApp,
    NewsPage,
    AccountPage, 
    LoginPage,
    PlacesPage,
    SignupPage,
    ResetPasswordPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp], 
  entryComponents: [
    MyApp,
    NewsPage,
    AccountPage, 
    LoginPage,
    PlacesPage,
    SignupPage,
    ResetPasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler},
    UserSettings,
    AccountService,
    AuthData
  ]
})
export class AppModule {}
