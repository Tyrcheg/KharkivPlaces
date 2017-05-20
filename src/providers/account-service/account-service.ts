import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Events } from "ionic-angular";


@Injectable()
export class AccountService {
  isLogedIn = false;

  constructor(
    public http: Http,
    private event: Events ) {

  }

  login(name, pass) {
    if(name == "a" && pass == "a"){
      this.event.publish("user:loging", this.isLogedIn = true);
      return true;
    }
    return false;
  }

  logout(){
    this.event.publish("user:loging", this.isLogedIn = false);
  }
}
