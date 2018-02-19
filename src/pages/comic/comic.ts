import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BukufiRestProvider } from '../../providers/bukufi-rest/bukufi-rest';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-comic',
  templateUrl: 'comic.html',
})
export class ComicPage {
  comic_title: any;
  comic_chapter: any;
  comic: any;
  regex: any = /\-/gi;

  loggedin:boolean = false;
  comics:any = [];
  comicsNonLogin: any = [];
  FBData: any;

  isGoogleLogin: boolean = false;
  isFacebookLogin: boolean = false;
  userProfile: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public bukufiRest: BukufiRestProvider, public fb: Facebook,  public gPlus: GooglePlus) {
    this.comic_title = this.navParams.get('comic_title');
    console.log('==> comic title', this.comic_title);

    this.comic_chapter = this.navParams.get('comic_chapter');
    console.log('==> comic chapter', this.comic_chapter);

    console.log('==> Initialize first time Loggedin status', this.loggedin);
        
    this.checkFacebookLoginStatus();
    this.checkGoogleLoginStatus();
  }

  ionViewDidLoad() {
    console.log('===> ComicPage Loaded');
    this.checkFacebookLoginStatus();
    this.checkGoogleLoginStatus();
  }

  showComic(){
    this.bukufiRest.readComic(this.comic_title, this.comic_chapter).then(data => {
      this.comics = data;
      console.log('==> Load Full Comic :', this.comics);
    })
  }

  ShowComicForNonloginUser(){
    this.bukufiRest.readComicNonloginUser(this.comic_title, this.comic_chapter).then(data => {
      this.comicsNonLogin = data;
      console.log('==> Load Comic for Non Login User :', this.comicsNonLogin);
    })
  }

  //===- FACEBOOK -===//
    // checkLoginStatus(){
    //   this.fb.getLoginStatus().then(res => {
    //     if(res.status == 'connect' || res.status == 'connected'){
    //       console.log("==========================");
    //       console.log("   FACEBOOK LOGIN CHECK   ");
    //       console.log("--------------------------");
    //       this.FBData = res;
    //       this.loggedin  = true;
    //       console.log('=> Facebook Data', this.FBData);
    //       console.log('==> Comic Check Facebook Login Status :: CONNECTED');
          
    //       console.log('=> res status value', this.loggedin);

    //       this.showComic();
    //     }

    //     else{
    //       console.log('==> Comic Check Facebook Login Status :: DISCONECTED');
    //       this.loggedin  = false;
    //       //this.loggedin  = res.status;
    //       console.log('=> res status value', this.loggedin);

    //       this.ShowComicForNonloginUser();
    //     }
    //   }).catch(err => {
    //     console.log(err);
    //   });
    // }
  //===- END -===//

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
              console.log("==========================");

              this.showComic();
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

              this.ShowComicForNonloginUser();
            }
          })
        }

        else{
          console.log('==> Facebook Login Status :: DISCONECTED');
          this.loggedin  = false;
          this.isFacebookLogin  = false;
          console.log('=> isFacebookLogin status', this.isFacebookLogin);

          this.ShowComicForNonloginUser();
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
          this.loggedin  = true;
          this.isGoogleLogin = true;
          console.log('==> Google Plus Login Status :: CONNECTED');
          console.log('==> isGoogleLogin status', this.isGoogleLogin);
          this.userProfile = stats;
          console.log('==> Waiting data for  (Google Plus) Login .....', this.userProfile);
          console.log("==========================");

          this.showComic();
        } else {
          console.log("==========================");
          console.log(" GOOGLE PLUS LOGIN CHECK ");
          console.log("--------------------------");
          console.log('==> Hmmm, data for  (Google Plus) Login Not Found .....');
          this.isGoogleLogin  = false;
          this.loggedin  = false;
          console.log('=> isGoogleLogin status', this.isGoogleLogin);
          console.log("==========================");

          this.ShowComicForNonloginUser();
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

        this.ShowComicForNonloginUser();
      });
    }
  //===- END -===//

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.checkFacebookLoginStatus();
    this.checkGoogleLoginStatus();
    setTimeout(() => {
      this.checkFacebookLoginStatus();
      this.checkGoogleLoginStatus();
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
