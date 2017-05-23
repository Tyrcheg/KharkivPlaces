import { Component } from '@angular/core';
import { IonicPage, NavController, 
    LoadingController, AlertController, ToastController
} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthorizationService } from "../../providers/providers";

import { NewsPage } from "../pages";


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

    public signupForm;
    loading: any;


    constructor(
        public nav: NavController, 
        public authService: AuthorizationService,
        public formBuilder: FormBuilder, 
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private toastCtrl: ToastController) {

        this.signupForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        })
    }

    signupUser() {
        if (!this.signupForm.valid) {
            console.log(this.signupForm.value);
            return;
        }
        this.authService.signupUser(this.signupForm.value.email, this.signupForm.value.password)
            .then(() => {
                this.loading.dismiss().then(() => {
                    this.toastCtrl.create({ message: "Вы успешно зарегестрировались!", duration: 3000, cssClass: "text-center"}).present();
                    this.nav.setRoot(NewsPage);
                });
            }, error => {
                this.loading.dismiss().then(() => {
                    let alert = this.alertCtrl.create({
                        message: error.message,
                        buttons: [
                            {
                                text: "Ok",
                                role: 'cancel'
                            }
                        ]
                    });
                    alert.present();
                });
            });
        this.loading = this.loadingCtrl.create({
            content: "Создание нового аккаунта..."
        });
        this.loading.present();
    }

    dismiss(){
        this.nav.pop();
    }
}
