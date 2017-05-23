import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, 
    AlertController, ToastController, Events, ViewController, App
} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { EmailValidator } from '../../validators/email';

import { SignupPage, ResetPasswordPage } from "../pages";
import { AuthorizationService } from "../../providers/providers";

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
      private viewCtrl: ViewController,
      public loadingCtrl: LoadingController,
      public authService: AuthorizationService, 
      public nav: NavController,
      private appCtrl: App,
      private toastCtrl: ToastController,
      private events: Events) {

        this.loginForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }

    dismiss(){
        this.nav.pop();
    }

    loginUser(): void {
        if (!this.loginForm.valid) {
            console.warn("Invalid data input", this.loginForm.value);
            return;
        }

        this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password)
            .then(authData => {
                console.log("Data after authService.loginUser", authData);
                this.loading.dismiss().then(() => {
                    this.toastCtrl.create({
                        message: "Успешная авторизация",
                        duration: 2500
                    }).present();
                    this.dismiss();
                });
            }, error => {
                this.loading.dismiss().then(() => {
                    let alert = this.alertCtrl.create({
                        message: error.message,
                        buttons: [
                            {
                                text: "Ок",
                                role: 'cancel'
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

    goToSignup(): void {
        this.nav.push(SignupPage);
    }

    goToResetPassword(): void {
        this.nav.push(ResetPasswordPage);
    }
}
