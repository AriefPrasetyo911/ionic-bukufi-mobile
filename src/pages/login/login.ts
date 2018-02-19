import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';

import { AngularFireAuth } from 'angularfire2/auth';
import { BookBookmarkPage } from '../book-bookmark/book-bookmark';
import { BookFavouritePage } from '../book-favourite/book-favourite';
import { HomePage } from '../home/home';
import { ComicBookmarkPage } from '../comic-bookmark/comic-bookmark';
import { ComicFavouritePage } from '../comic-favourite/comic-favourite';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [GooglePlus]
})
export class LoginPage {
  loggedin: boolean = false;
  result: any;
  objResult: any;
  gResult: any;
  gObjectRes: any;
  // FBData: any;
  // googleData: any = null;
  isGoogleLogin: boolean = false;
  isFacebookLogin: boolean = false;

  userProfile: any = null;

  providerIDs: string;
  loginSegment: string;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public fb: Facebook, 
    public gPlus: GooglePlus,
    public fire: AngularFireAuth, 
    public platform: Platform) {
      
      this.checkGoogleLoginStatus();
      this.checkFacebookLoginStatus();

      this.loginSegment = "Book";
  }

  ionViewDidLoad() {
    console.log('===> LoginPage Loaded');
  }

  /*==- FACEBOOK -==*/
    loginFacebook(): Promise<any>{
      return this.fb.login(['email', 'public_profile']).then(response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential).then(success => {
          this.result  = JSON.stringify(success);
          this.objResult  = JSON.parse(this.result);
          
          this.loggedin  = true;
          console.log('==> Login Facebook Success', this.result);

          this.navCtrl.setRoot(HomePage);
        })
      });
    }

    checkFacebookLoginStatus(){
      this.fb.getLoginStatus().then(res => {
        
        if(res.status == 'connect' || res.status == 'connected'){
          
          firebase.auth().onAuthStateChanged(user => {
            if(user){
              this.userProfile  = user;
              this.loggedin     = true;
              this.isFacebookLogin  = true;
              console.log('==> Facebook Login Status :: CONNECTED');
              console.log('=> User Facebook Login Data', this.userProfile);
              
            }
            else{
              this.userProfile = null;
              this.loggedin    = false;
              this.isFacebookLogin  = false;
              console.log('==> Facebook Login Status :: DISCONNECTED');
            }
          })
        }

        else{
          console.log('==> Facebook Login Status :: DISCONECTED');
          this.loggedin  = false;
          //this.loggedin  = res.status;
          console.log('=> logggedin status', this.loggedin);
        }
      }).catch(err => {
        console.log(err);
      });
    }

    logoutFacebook(){
      this.fb.logout().then(res => {
        console.log("==> Facebook Logout Success", res);
        this.userProfile = null;
        this.isFacebookLogin = false;
        this.loggedin    = false;
      })
    }
  /*==- END FACEBOOK -==*/

  //== GOOGLE ==//
    loginGoogle(): void {
      this.gPlus.login({
        'webClientId': '447326809905-3q4ogrru30sncvsqua93bovt8qd5ihhc.apps.googleusercontent.com',
        'offline': true
      }).then( res => {
          const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);

          firebase.auth().signInWithCredential(googleCredential).then( response => {
            this.gResult   = JSON.stringify(response);
            this.gObjectRes = JSON.parse(this.gResult);

            this.loggedin = true;
            console.log("==> Login Google Plus Success: " + this.gResult);

            this.navCtrl.setRoot(HomePage);
        });
      }, err => {
          console.error("Error: ", err)
      });
    }

    async checkGoogleLoginStatus(){
      try{
        this.userProfile = await this.gPlus.trySilentLogin({});
        console.log('==> Google Plus Login Data', this.userProfile);
        // this.userProfile  = user;
        this.loggedin     = true;
        this.isGoogleLogin= true;
        console.log('=> Google Plus Login Status :: CONNECTED');
        console.log('=> logggedin status', this.loggedin);
      }
      catch(error){
        // this.userProfile = null;
        this.loggedin    = false;
        this.isGoogleLogin  = false;
        console.log('==> Google Plus Login Status :: DISCONNECTED');
        console.log('=> logggedin status', this.loggedin);
      }
    }

    logoutGooglePlus(){
      this.gPlus.logout().then(res => {
        console.log("==> Google Plus Logout Success", res);
        this.userProfile = null;
        this.isGoogleLogin   = false;
        this.loggedin    = false;
      })
    }
  //== END GOOGLE ==//

  //== for bookmark ==//
    gotoBookmarkBook(){
      console.log('==> go to bookmark book now');
      this.navCtrl.push(BookBookmarkPage);
    }

    gotoBookmarkComic(){
      console.log("==> go to bookmark comic now");
      this.navCtrl.push(ComicBookmarkPage);
    }
  //== end bookmark ==//

  //== for favourite ==//
    gotoFavouriteBook(isFacebookLogin){
      console.log('==> go to favourite book now');
      this.navCtrl.push(BookFavouritePage, {isFacebookLogin: isFacebookLogin});
    }

    gotoFavouriteComic(){
      console.log("go to favourite comic now");
      this.navCtrl.push(ComicFavouritePage);
    }
  //== end favourite ==//

  //== for refresh ==//
    doRefresh(refresher) {
      console.log('Begin async operation', refresher);
      this.checkFacebookLoginStatus();
      this.checkGoogleLoginStatus();
      setTimeout(() => {
        console.log('Async operation has ended');
        refresher.complete();
      }, 2000);
    }
  //== end refresh ==//
}