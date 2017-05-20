import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NewsPage, AccountPage, LoginPage, PlacesPage, RegistrationPage } from "../pages/pages";

import { UserSettings, AccountService } from "../providers/providers";
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    NewsPage,
    AccountPage, 
    LoginPage,
    PlacesPage,
    RegistrationPage

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
    RegistrationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler},
    UserSettings,
    AccountService
  ]
})
export class AppModule {}
