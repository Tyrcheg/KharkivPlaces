import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,
  AlertController, 
  ToastController,
    Events} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { EmailValidator } from '../../validators/email';
import { AuthData } from '../../providers/auth-data';

import { SignupPage, ResetPasswordPage, NewsPage } from "../pages";

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    public loginForm;
    loading: any;

    constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      public formBuilder: FormBuilder,
      public alertCtrl: AlertController,
      public loadingCtrl: LoadingController,
      public authData: AuthData, 
      public nav: NavController,
      private toastCtrl: ToastController,
      private events: Events) {

        this.loginForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });

    }

    loginUser(): void {
        if (!this.loginForm.valid) {
            console.log(this.loginForm.value);
        } else {
            this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(authData => {
                this.loading.dismiss().then(() => {
                    this.toastCtrl.create({
                      message: "Вы зашли на свой профиль",
                      duration: 2000
                    });
                    this.events.publish("user:loging", true);
                    this.nav.setRoot(NewsPage);
                });
            }, error => {
                this.loading.dismiss().then(() => {
                    let alert = this.alertCtrl.create({
                        message: error.message,
                        buttons: [
                            {
                                text: "Ок",
                                role: 'calncel'
                            }
                        ]
                    });
                    alert.present();
                });
            });

            this.loading = this.loadingCtrl.create({
              content: "Авторизация..."
            });
            this.loading.present();
        }
    }

    goToSignup(): void {
        this.nav.push(SignupPage);
    }

    goToResetPassword(): void {
        this.nav.push(ResetPasswordPage);
    }
}
