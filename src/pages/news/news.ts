import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, ModalController } from 'ionic-angular';
import { LoginPage } from "../pages";
import { MyApp } from "../../app/app.component";
import firebase from 'firebase';
import { InitDatabase } from "../../providers/initDatabase";
import { PlaceType } from "../../models/models";

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  news = "all";
  user = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private db: InitDatabase
    ) {
      firebase.auth().onAuthStateChanged(user => {
        if(!user){
          this.user = null;
          return;
        }
        firebase.database().ref('/users').child(user.uid).once('value',
          snap => this.user = snap.val());
      })

      let rand = (Math.random() * 20) + 12;
      db.createUser("arczs" + rand + "@some.ru", "Art", "Mirtk", "somePassword");
      db.createPlace("Misto", "Symska", 100, 200, PlaceType.Клуб);
      db.initPlaceTypes();
      
  }
  selectedMyNews(){
    if(!this.user){
      let alert = this.alertCtrl.create({
        title: "Нужно авторизизоваться",
        message: "Чтобы просматривать новости заведений, на которые Вы подписаны, нужно зайти на свой аккаунт",
        buttons: [{
          text: "Закрыть",
          role: "cancel",
          handler: () => { this.news = "all" }
        },
          {
            text: "Войти",
            handler: () => {
              let navTransition = alert.dismiss();
              let loginModal = this.modalCtrl.create(LoginPage);
              loginModal.present();
              loginModal.onDidDismiss( data => {
                if(!data)
                   this.news = "all";
                else
                  this.user = data;
                navTransition.then( () => {
                  // this.navCtrl.pop();
                });
              });
              return false;
            }
          }]
      });
      alert.present();
    }

  }

  selectedAllNews(){
    console.log("selected option AllNews")
  }

}
