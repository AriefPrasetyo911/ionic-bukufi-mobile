import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage()
@Component({
  selector: 'page-book-favourite',
  templateUrl: 'book-favourite.html',
})
export class BookFavouritePage {

  FavouriteBook: AngularFireList<any>;

  public myFav: Array<any> = [];
  public favoRef: firebase.database.Reference = firebase.database().ref(`/Favourite-book`);
  
  FBData: any;
  loggedin:boolean = false;
  isGoogleLogin: boolean = false;
  isFacebookLogin: boolean = false;
  isHaveFavourite: boolean;
  userProfile: any = null;
  userIDs: any;
  regex: any = /\-/gi;

  // favBookChecker: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: Facebook, public afDatabase: AngularFireDatabase, public gPlus: GooglePlus) {
    this.FavouriteBook  = afDatabase.list('/Favourite-book');
    this.getFavouriteBook();
    this.getMyFavouriteGooglePlus();

    // this.favBookChecker = this.navParams.get('isFacebookLogin')
    // console.log("==> isFacebookLogin Parameter Value", this.favBookChecker);
  }

  ionViewDidLoad() {
    console.log('===> BookFavouritePage Loaded');
  }

  getFavouriteBook(){
    this.fb.getLoginStatus().then(res => {
      if(res.status == 'connect' || res.status == 'connected'){

        firebase.auth().onAuthStateChanged(user => {
          console.log("==========================");
          console.log(" FACEBOOK FAVOURITE CHECK  ");
          console.log("--------------------------");
          this.FBData = user;
          console.log("User Detected. Data facebook Login for this user:", this.FBData);
          this.loggedin = true;
          this.isFacebookLogin = true;
          this.userIDs      = this.FBData.uid;
          console.log('=> User ID Facebook:', this.userIDs);

          this.favoRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
            this.myFav = [];
            dataFavourite.forEach(dataFv => {
              this.myFav.push(dataFv.val());
              return false;
            });

            if(this.myFav){
              console.log('=> Favourite Found. Count the data now :', this.myFav.length);
              console.log('=> The Data is :', this.myFav);
              this.isHaveFavourite = true;
            }
            else{
              console.log("=> No Favourite Data for this user", this.myFav.length);
              this.isHaveFavourite = false;
            }
          });
          console.log("==========================");
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  getMyFavouriteGooglePlus(){
    this.gPlus.trySilentLogin({}).then(stats => {
      if(stats){
        console.log("=============================");
        console.log(" GOOGLE PLUS FAVOURITE CHECK ");
        console.log("-----------------------------");
        this.loggedin  = true;
        this.isGoogleLogin = true;
        this.userProfile = stats;
        console.log('==> Waiting data for (Google Plus) login user .....', this.userProfile);

        this.userIDs = this.userProfile.userId;
        console.log("==> User ID Google Plus", this.userIDs);

        this.favoRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
          this.myFav = [];
          dataFavourite.forEach(dataFv => {
            this.myFav.push(dataFv.val());
            return false;
          });

          if(this.myFav){
            console.log('=> Bookmark Found. Count the Data :', this.myFav.length);
            console.log('=> The Data is :', this.myFav);
            this.isHaveFavourite = true;
          }
          else{
            console.log("=> No Bookmark Data for this user", this.myFav.length);
            this.isHaveFavourite = false;
          }
        });
        console.log("=============================");
      } else {
        console.log("=============================");
        console.log(" GOOGLE PLUS FAVOURITE CHECK ");
        console.log("-----------------------------");
        console.log('==> Hmmm, data for  (Google Plus) Login Not Found .....');
        this.isGoogleLogin  = false;
        this.loggedin  = false;
        console.log('=> isGoogleLogin status', this.isGoogleLogin);
        console.log("=============================");
      }
    }).catch(error => {
      // this.userProfile = null;
      // this.loggedin    = false;
      console.log("=============================");
      console.log(" GOOGLE PLUS FAVOURITE CHECK ");
      console.log("-----------------------------");
      console.log('==> Google Plus Login Status :: DISCONNECTED');
      this.isGoogleLogin  = false;
      console.log('=> isGoogleLogin status', this.isGoogleLogin);
      console.log("=============================");
    });
  }

  doRefresh(refresher) {
      console.log('Begin async operation', refresher);
      this.getFavouriteBook();
      this.getMyFavouriteGooglePlus();
      setTimeout(() => {
        this.getFavouriteBook();
        this.getMyFavouriteGooglePlus();
        console.log('Async operation has ended');
        refresher.complete();
      }, 2000);
  }
}
