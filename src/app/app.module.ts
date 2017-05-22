import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from "@angular/http";

import { UserSettings, AuthorizationService, DbService } from "../providers/providers";
import { AccountService } from "../providers/account-service";

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NewsPage, AccountPage, LoginPage, PlacesPage, SignupPage, ResetPasswordPage } from "../pages/pages";

@NgModule({
  declarations: [
    MyApp,
    NewsPage,
    AccountPage, 
    LoginPage,
    PlacesPage,
    SignupPage,
    ResetPasswordPage,
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
    AuthorizationService,
    AccountService,
    DbService
  ]
})
export class AppModule {}
