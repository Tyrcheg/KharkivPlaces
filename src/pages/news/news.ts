import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, ModalController } from 'ionic-angular';
import { LoginPage } from "../pages";
import * as db from 'firebase';

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  isGotNewFeeds: boolean = false;
  isFirstLoad: boolean = true;
  newsSelector = "all";
  newsRef = db.database().ref('placesNews/');
  
  user = null;
  news = [];
  newFeedsArray = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
    ) {
      db.auth().onAuthStateChanged(user => {
        if(!user){
          this.user = null;
          return;
        }
        this.user = db.auth().currentUser;
        this.newsSelector = "my";
      })   
      this.updateFeeds();
      this.onNewFeedComesEventSubscribe()
  }

  updateFeeds() {
    this.news = [];
    return this.newsRef.orderByChild('date').limitToLast(30).once("value", snap => {
      snap.forEach(feed => {
        this.news.push(feed.val());
        return false;
      });
    });
  }

  selectedMyNews(){
    if(!this.user){
      let alert = this.alertCtrl.create({
        title: "Нужно авторизизоваться",
        message: "Чтобы просматривать новости заведений, на которые Вы подписаны, нужно зайти на свой аккаунт",
        buttons: [{
          text: "Закрыть",
          role: "cancel",
          handler: () => { this.newsSelector = "all" }
        },
          {
            text: "Войти",
            handler: () => {
              let navTransition = alert.dismiss();
              let loginModal = this.modalCtrl.create(LoginPage);
              loginModal.present();
              loginModal.onDidDismiss( data => {
                if(!data)
                   this.newsSelector = "all";
                else
                  this.user = data;
                navTransition.then( () => {
                });
              });
              return false;
            }
          }]
      });
      alert.present();
    }

  }

  doRefresh(e){
    this.updateFeeds().then( () => e.complete());
  }

  selectedAllNews(){
    console.log("selected option AllNews")
  }

  onNewFeedComesEventSubscribe(){
    this.newsRef.limitToLast(1).on('child_added', snap => {
      if(this.isFirstLoad){
        this.isFirstLoad = false;
        return;
      }
      this.isGotNewFeeds = true;
      this.newFeedsArray.push(snap.val());
    })
  }

  showNewFeeds(){
    this.news = this.news.concat(this.newFeedsArray);
    this.newFeedsArray = [];
  }

}
