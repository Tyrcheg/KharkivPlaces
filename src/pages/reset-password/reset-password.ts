import { IonicPage, NavController,
    LoadingController,
    AlertController } from 'ionic-angular';

import { Component } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
// import { AuthorizationService } from "../../providers/providers";
// import { EmailValidator } from "../../validators/email";

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
    constructor() {}
    // public resetPasswordForm;


    // constructor(
    //     public authData: AuthorizationService, 
    //     public formBuilder: FormBuilder,
    //     public nav: NavController, 
    //     public loadingCtrl: LoadingController,
    //     public alertCtrl: AlertController) {

    //     this.resetPasswordForm = formBuilder.group({
    //         email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
    //     })
    // }

    // resetPassword() {
    //     if (!this.resetPasswordForm.valid) {
    //         console.log(this.resetPasswordForm.value);
    //         return;
    //     } 
    //     this.authData.resetPassword(this.resetPasswordForm.value.email).then((user) => {
    //         let alert = this.alertCtrl.create({
    //             message: "Письмо с инструкцией для изменения пароля было отправлено Вам на почту",
    //             buttons: [
    //                 {
    //                     text: "Ok",
    //                     role: 'cancel',
    //                     handler: () => {
    //                         this.nav.pop();
    //                     }
    //                 }
    //             ]
    //         });
    //         alert.present();

    //     }, error => {
    //         var errorMessage: string = error.message;
    //         let errorAlert = this.alertCtrl.create({
    //             message: errorMessage,
    //             buttons: [
    //                 {
    //                     text: "Ok",
    //                     role: 'cancel'
    //                 }
    //             ]
    //         });
    //         errorAlert.present();
    //     });
    // }
}
