import { NgModule } from '@angular/core';
// import { IonicModule } from 'ionic-angular';
import { SignupPage } from './signup';

@NgModule({
  declarations: [
    SignupPage,
  ],
 
  exports: [
    SignupPage
  ]
})
export class SignupModule {}
