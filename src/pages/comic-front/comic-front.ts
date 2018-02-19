import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BukufiRestProvider } from '../../providers/bukufi-rest/bukufi-rest';
import { ComicDetailPage } from '../comic-detail/comic-detail';
import { ComicListPage } from '../comic-list/comic-list';
import { LoginPage } from '../login/login';
import { SearchPage } from '../search/search';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-comic-front',
  templateUrl: 'comic-front.html',
})
export class ComicFrontPage {
  popularComic: any;
  newComic: any;
  comic: string;

  FBData: any;
  loggedin: boolean = false;

  isGoogleLogin: boolean = false;
  isFacebookLogin: boolean = false;
  userProfile: any = null;

  providerIDs: any;
  emailIDs: any;
  userIDs: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public bukufiRest: BukufiRestProvider, public fb: Facebook, public gPlus: GooglePlus) {
    this.getNewComic();
    this.getPopularComic();
    this.comic = "popular-comic";
  }

  ionViewDidLoad() {
    console.log('===> ComicFrontPage Loaded');
    this.checkFacebookLoginStatus();
    this.checkGoogleLoginStatus();
  }

  getPopularComic(){
    this.bukufiRest.getPopComic().then(data => {
      this.popularComic = data;
      console.log('==> popular comic', data);
    })
  }

  getNewComic(){
    this.bukufiRest.getNewComic().then(data => {
      this.newComic = data;
      console.log('==> new comic', data);
    })
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    //check login status
    this.getPopularComic();
    this.getNewComic();
    this.checkFacebookLoginStatus();
    this.checkGoogleLoginStatus();
    setTimeout(() => {
      this.checkFacebookLoginStatus();
      this.checkGoogleLoginStatus();
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  showDetailComic(comic){
    console.log('=> show detail comic', comic);
    this.navCtrl.push(ComicDetailPage, {
      comic: comic
    })
  }

  comicList(){
    this.navCtrl.push(ComicListPage);
  }

  loginFirst(){
    this.navCtrl.push(LoginPage);
  }

  search(){
    this.navCtrl.push(SearchPage);
  }

  //===- FACEBOOK CHECK -===//
    checkFacebookLoginStatus(){
      this.fb.getLoginStatus().then(res => {
        
        if(res.status == 'connect' || res.status == 'connected'){
          firebase.auth().onAuthStateChanged(user => {
            if(user){
              console.log("==========================");
              console.log("   FACEBOOK LOGIN CHECK   ");
              console.log("--------------------------");
              this.userProfile  = user;
              console.log('==> User Facebook Login Data', this.userProfile);
              this.loggedin = true;
              this.isFacebookLogin  = true;
              console.log('==> Facebook Login Status :: CONNECTED');
              console.log("=> isFacebookLogin status", this.isFacebookLogin);
              
              
              this.providerIDs = "Facebook";
              this.userIDs     = this.userProfile.uid;
              this.emailIDs    = this.userProfile.email;
              console.log("=> Facebook User ID", this.userIDs);
              console.log("==========================");
            }
            else{
              this.isFacebookLogin  = false;
              console.log("==========================");
              console.log("   FACEBOOK LOGIN CHECK   ");
              console.log("--------------------------");
              this.isFacebookLogin  = false;
              this.userProfile = null;
              console.log('==> Facebook Login Status :: DISCONNECTED');
              console.log("=> isFacebookLogin status", this.isFacebookLogin);
              console.log("==========================");
            }
          })
        }

        else{
          console.log('==> Facebook Login Status :: DISCONECTED');
          this.loggedin  = false;
          this.isFacebookLogin  = false;
          console.log('=> isFacebookLogin status', this.isFacebookLogin);
        }
      }).catch(err => {
        console.log(err);
      });
    }
  //===- END -===//

  //===- GOOGLE CHECK -===//
    checkGoogleLoginStatus(){
      this.gPlus.trySilentLogin({}).then(stats => {
        if(stats){
          console.log("==========================");
          console.log(" GOOGLE PLUS LOGIN CHECK ");
          console.log("--------------------------");
          this.userProfile = stats;
          console.log('==> Hmmm, waiting data for  (Google Plus) Login .....', this.userProfile);

          this.loggedin  = true;
          this.isGoogleLogin = true;
          console.log('==> Google Plus Login Status :: CONNECTED');
          console.log('=> isGoogleLogin status', this.isGoogleLogin);

          this.providerIDs = "Google Plus";
          this.userIDs     = this.userProfile.userId;
          this.emailIDs    = this.userProfile.email;
          console.log("=> Google Plus User ID", this.userIDs);
          console.log("==========================");
        } else {
          console.log('==> Hmmm, data for  (Google Plus) Login Not Found .....');
          this.isGoogleLogin  = false;
          this.loggedin  = false;
          console.log('=> isGoogleLogin status', this.isGoogleLogin);
        }
      }).catch(error => {
        // this.userProfile = null;
        // this.loggedin    = false;
        console.log("==========================");
        console.log(" GOOGLE PLUS LOGIN CHECK ");
        console.log("--------------------------");
        console.log('==> Google Plus Login Status :: DISCONNECTED');
        this.isGoogleLogin  = false;
        console.log('=> isGoogleLogin status', this.isGoogleLogin);
        console.log("==========================");
      });
    }
  //===- END -===//
}