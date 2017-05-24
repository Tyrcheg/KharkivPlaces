import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, ModalController } from 'ionic-angular';
import { LoginPage } from "../pages";
import * as db from 'firebase';
import { PlacesService } from "../../providers/providers";

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {
  errors: any;
  isFirstLoad: boolean = true;
  newsSelector = "all";
  newsRef = db.database().ref('placesNews/short/');

  user = null;
  news = [];
  newFeedsArray = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private placesService: PlacesService
  ) {

    db.auth().onAuthStateChanged(user => {
      if (!user) {
        this.user = null;
        return;
      }
      this.user = user;
      this.newsSelector = "my";
    });
    this.updateFeeds();
    this.onNewFeedComesEventSubscribe()

    // setInterval(() => placesService.createRandomPlace(), 4000);
    setTimeout(() => { try { placesService.createRandomPlace(); } catch (er) { console.log('fucking names bug', er) } }, 5000);

  }

  updateFeeds() {
    var newFeeds = [];
    return this.newsRef.orderByKey().limitToLast(30).once("value", snap => {
      snap.forEach(feed => {
        newFeeds.push(feed.val());
        return false;
      });
      this.news = newFeeds;
    }).catch(err => this.errors = err);
  }

  selectedMyNews() {
    if (!this.user) {
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
            loginModal.onDidDismiss(data => {
              if (!data)
                this.newsSelector = "all";
              else
                this.user = data;
              navTransition.then(() => {
              });
            });
            return false;
          }
        }]
      });
      alert.present();
    }
  }

  doRefresh(e) {
    this.updateFeeds().then(() => { e.complete(); this.newFeedsArray = []; });
  }

  selectedAllNews() {
    console.log("selected option AllNews")
  }

  onNewFeedComesEventSubscribe() {
    this.newsRef.limitToLast(1).on('child_added', snap => {
      if (this.isFirstLoad) {
        this.isFirstLoad = false;
        return;
      }
      this.newFeedsArray.push(snap.val());
    })
  }

  showNewFeeds() {
    this.news = this.news.concat(this.newFeedsArray);
    this.newFeedsArray = [];
  }

  goToFullFeed(feed) {
    console.log(feed);
  }
  showError(err) {
    this.alertCtrl.create({
      title: "Error",
      message: JSON.parse(err)
    })
  }

}
