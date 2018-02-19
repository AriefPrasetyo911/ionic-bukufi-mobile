
import { Component, ViewChild, NgZone } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { BookFrontPage } from '../pages/book-front/book-front';
import { ComicFrontPage } from '../pages/comic-front/comic-front';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  loggedin: boolean = false;
  rootPage:any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private fb: Facebook, public googlePlus: GooglePlus, public zone: NgZone) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.zone.run(() => {
        this.checkGoogleLoginStatus();
        this.checkFacebookLoginStatus();
      });
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Book', component: BookFrontPage },
      { title: 'Comic', component: ComicFrontPage}
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  checkFacebookLoginStatus(){
    this.fb.getLoginStatus().then(res => {
      if(res.status == 'connect' || res.status == 'connected'){
        console.log("==> Facebook Login Check : USER FOUND");
        console.log('==> Facebook Login Status : CONNECTED');
        this.loggedin  = true;        
        console.log('=> Facebook Logggedin status', this.loggedin);
      }

      else{
        console.log("==> Facebook Login Check : USER NOT FOUND");
        console.log('==> Facebook Login Status : DISCONECTED');
        this.loggedin  = false;
        console.log('=> Facebook Logggedin status', this.loggedin);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  async checkGoogleLoginStatus(){
    try{
      let status = await this.googlePlus.trySilentLogin({});
      this.loggedin  = true;
      console.log("==> Google Plus Login Check : USER FOUND");
      console.log("=> Google Plus Login Status : CONNECTED");
      console.log('=> Google Plus Logggedin status', this.loggedin);
      console.log('=> Google Plus Status', status);
    }
    catch(error){
      this.loggedin  = false;
      console.log("==> Google Plus Login Check : USER NOT FOUND");
      console.log("=> Google Plus Login Status : DISCONNECTED");
      console.log('=> Google Plus Logggedin status', this.loggedin);
    }
  }
}