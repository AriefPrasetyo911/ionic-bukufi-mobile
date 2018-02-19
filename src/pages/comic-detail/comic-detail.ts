import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BukufiRestProvider } from '../../providers/bukufi-rest/bukufi-rest';
import { ComicPage } from '../comic/comic';
import { LoginPage } from '../login/login';
import { SearchPage } from '../search/search';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-comic-detail',
  templateUrl: 'comic-detail.html',
})
export class ComicDetailPage {
  comic: any;
  comic_detail: any;
  FBData: any;
  loggedin: boolean = false;

  isGoogleLogin: boolean = false;
  isFacebookLogin: boolean = false;
  userProfile: any = null;

  providerIDs: any;
  emailIDs: any;
  userIDs: any;

  comicAuthor: any;
  comicGenre: any;
  comicRelease: number;


  public myFavourite: Array<any> = [];
  public favouriteRef: firebase.database.Reference = firebase.database().ref(`/Favourite-Comic`);
  favouriteComic: AngularFireList<any>;

  public myBookmark: Array<any> = [];
  public bookmarkRef: firebase.database.Reference = firebase.database().ref(`/Bookmark-Comic`);
  BookmarkComic: AngularFireList<any>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public bukufiRest: BukufiRestProvider, 
    public fb: Facebook, 
    public gPlus: GooglePlus,
    public alertCtrl: AlertController,
    public afDatabase: AngularFireDatabase) {
      this.comic = this.navParams.get('comic');
      console.log('==> parameter from home :',this.comic);

      this.getDetail();

      //create database reference
      this.favouriteComic = afDatabase.list('/Favourite-Comic');
      this.BookmarkComic  = afDatabase.list('/Bookmark-Comic');
  }

  ionViewDidLoad() {
    console.log('===> ComicDetailPage Loaded');
    this.checkFacebookLoginStatus();
    this.checkGoogleLoginStatus();
  }

  getDetail(){
    this.bukufiRest.getDetailComic(this.comic)
      .then(data => {
        this.comic_detail = data;
        console.log('==> Detail Comic :', this.comic_detail);

        //for bookmark and favourite comic
        for (let dataCom of this.comic_detail.data1) {
          this.comicAuthor     = dataCom.comic_author;
          this.comicGenre      = dataCom.comic_genre;
          this.comicRelease    = dataCom.comic_release;

          // console.log("comic author", this.comicAuthor);
          // console.log("comic publisher", this.comicGenre);
          // console.log("comic release", this.comicRelease);
        }
      });
  }

  readComic(comic_title, comic_chapter){
    this.navCtrl.push(ComicPage, {comic_title: comic_title, comic_chapter: comic_chapter});
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

  addBookmarkComic(){
    let prompt = this.alertCtrl.create({
      title: 'Bookmark',
      message: "You want Bookmark this book?",
      inputs: [
        {
          name: 'provider',
          placeholder: 'Provider',
          value: this.providerIDs,
          type: 'hidden'
        },
        {
          name: 'userID',
          placeholder: 'User ID',
          value: this.userIDs,
          type: 'hidden'
        },
        {
          name: 'emailID',
          placeholder: 'Email',
          value: this.emailIDs,
          type: 'hidden'
        },
        {
          name: 'comicTitle',
          placeholder: 'Comic Title',
          value: this.comic,
          type: 'hidden'
        },
        {
          name: 'comicAuthor',
          placeholder: 'Comic Author',
          value: this.comicAuthor,
          type: 'hidden'
        },
        {
          name: 'comicGenre',
          placeholder: 'Comic Genre',
          value: this.comicGenre,
          type: 'hidden'
        },
        {
          name: 'comicRelease',
          placeholder: 'Comic Release',
          value: this.comicRelease,
          type: 'hidden'
        },
        {
          name: 'bookmarkStatus',
          placeholder: 'yes',
          value: 'yes',
          type: 'hidden'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('==-> Cancel Bookmark clicked');
          }
        },
        {
          text: 'Add to Bookmark',
          handler: data => {
            const newBookmarkComic = this.BookmarkComic.push({});
   
            newBookmarkComic.set({
              id: newBookmarkComic.key,
              provider: data.provider,
              userID: data.userID,
              emailID: data.emailID,
              comic_title: data.comicTitle,
              comic_author: data.comicAuthor,
              comic_genre: data.comicGenre,
              comic_release: data.comicRelease,
              fav_status: data.bookmarkStatus
            });
            
            console.log('==-> This book marked as your bookmark');
          }
        }
      ]
    });
    prompt.present();
  }

  addFavouriteComic(){
    let prompt = this.alertCtrl.create({
      title: 'Favourite',
      message: "You want mark this book as favourite?",
      inputs: [
        {
          name: 'provider',
          placeholder: 'Provider',
          value: this.providerIDs,
          type: 'hidden'
        },
        {
          name: 'userID',
          placeholder: 'User ID',
          value: this.userIDs,
          type: 'hidden'
        },
        {
          name: 'emailID',
          placeholder: 'Email',
          value: this.emailIDs,
          type: 'hidden'
        },
        {
          name: 'comicTitle',
          placeholder: 'Comic Title',
          value: this.comic,
          type: 'hidden'
        },
        {
          name: 'comicAuthor',
          placeholder: 'Comic Author',
          value: this.comicAuthor,
          type: 'hidden'
        },
        {
          name: 'comicGenre',
          placeholder: 'Comic Genre',
          value: this.comicGenre,
          type: 'hidden'
        },
        {
          name: 'comicRelease',
          placeholder: 'Comic Release',
          value: this.comicRelease,
          type: 'hidden'
        },
        {
          name: 'favStatus',
          placeholder: 'yes',
          value: 'yes',
          type: 'hidden'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('==-> Cancel Favourite clicked');
          }
        },
        {
          text: 'Add to Favourite',
          handler: data => {
            const newComicFavourite = this.favouriteComic.push({});
   
            newComicFavourite.set({
              id: newComicFavourite.key,
              provider: data.provider,
              userID: data.userID,
              emailID: data.emailID,
              comic_title: data.comicTitle,
              comic_author: data.comicAuthor,
              comic_Genre: data.comicGenre,
              comic_release: data.comicRelease,
              fav_status: data.favStatus
            });
            
            console.log('==-> This book mark as your favourite');
          }
        }
      ]
    });
    prompt.present();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.checkFacebookLoginStatus();
    this.checkGoogleLoginStatus();
    this.getDetail();
    setTimeout(() => {
      this.checkFacebookLoginStatus();
      this.checkGoogleLoginStatus();
      this.getDetail();
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
