import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BukufiRestProvider } from '../../providers/bukufi-rest/bukufi-rest';
import { BookDetailPage } from '../book-detail/book-detail';
import { ComicDetailPage } from '../comic-detail/comic-detail';
import { LoginPage } from '../login/login';
import { SearchPage } from '../search/search';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';

export class Book {
  label: string;
  file: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  popularBooks: any;
  popularComics: any;
  home: string;

  loggedin: boolean = false;
  isGoogleLogin: boolean = false;
  isFacebookLogin: boolean = false;
  userProfile: any = null;

  providerIDs: any;
  emailIDs: any;
  userIDs: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public bukufiRest: BukufiRestProvider, public fb: Facebook, public gPlus: GooglePlus) {
    this.home = 'popular-book';

    this.getPopularBooks();
    this.getPopularComics();
  }

  ionViewDidLoad() {
    console.log('===> HomePage success loaded');
    this.checkFacebookLoginStatus();
    this.checkGoogleLoginStatus();
  }

  showDetailBook(book) {
    console.log('=> show detail book', book);
    this.navCtrl.push(BookDetailPage, {
      book: book
    });
  }

  showDetailComic(comic){
    console.log('=> show detail comic', comic);
    this.navCtrl.push(ComicDetailPage, {
      comic: comic
    })
  }

  //--------------------
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getPopularBooks();
    this.getPopularComics();
    this.checkFacebookLoginStatus();
    this.checkGoogleLoginStatus();
    setTimeout(() => {
      this.checkFacebookLoginStatus();
      this.checkGoogleLoginStatus();
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  //--------------------
  
  //==================== GET BOOKS AND COMIC DATA =================================//
  getPopularBooks() {
    this.bukufiRest.getPopBooks()
    .then(data => {
      this.popularBooks = data;
      console.log('==> Popular Book Data :', this.popularBooks);
    });
  }

  getPopularComics(){
    this.bukufiRest.getPopComic()
    .then(data => {
      this.popularComics = data;
      console.log('==> Popular Comic Data :', this.popularComics);
    });
  }
  //=============================== END ===========================================//

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