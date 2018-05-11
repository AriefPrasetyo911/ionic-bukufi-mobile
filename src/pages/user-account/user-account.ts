import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { BukufiRestProvider } from '../../providers/bukufi-rest/bukufi-rest';
import { BookDetailPage } from '../book-detail/book-detail';
import { ComicDetailPage } from '../comic-detail/comic-detail';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-user-account',
  templateUrl: 'user-account.html',
})
export class UserAccountPage {
    loggedin: boolean = false;
    result: any;
    objResult: any;
    gResult: any;
    gObjectRes: any;
    isGoogleLogin: boolean = false;
    isFacebookLogin: boolean = false;
    userProfile: any = null;
    providerIDs: string;
    loginSegment: string;
    FBData: any;
    userIDs: any;
    result2: any;
    objResult2: any;
    regex: any = /\-/gi;
    isHaveBookmark: boolean;
    dataFavourite: any;
    dataFavourite2: Array<any> = [];
    bookmarkBookTitle: string;
    bookmarkBookImage: any;

    //====== for favourite book =======//
    isHaveFavourite: boolean;
    
    //book
    BookmarkBook: AngularFireList<any>;
    myBookmark: Array<any> = [];
    bookmarkRef: firebase.database.Reference = firebase.database().ref(`/Bookmark-book`);

    FavouriteBook: AngularFireList<any>;
    myFav: Array<any> = [];
    favoRef: firebase.database.Reference = firebase.database().ref(`/Favourite-book`);
    
    //comic
    BookmarkComic: AngularFireList<any>;
	myBookmarkComic: Array<any> = [];
    bookmarkComicRef: firebase.database.Reference = firebase.database().ref(`/Bookmark-Comic`);
      
    FavouriteComic: AngularFireList<any>;
	myComicFav: Array<any> = [];
    favoComicRef: firebase.database.Reference = firebase.database().ref(`/Favourite-Comic`);
      
    constructor(public navCtrl: NavController, 
        public navParams: NavParams, 
        public fb: Facebook, 
        public gPlus: GooglePlus,
        public fire: AngularFireAuth, 
        public afDatabase: AngularFireDatabase,
        public platform: Platform,
        public bukufiRest: BukufiRestProvider) {

            //firebase db
            this.BookmarkBook   = afDatabase.list('/Bookmark-book');
            this.FavouriteBook  = afDatabase.list('/Favourite-book');
            this.BookmarkComic  = afDatabase.list('/Bookmark-Comic');
            this.FavouriteComic = afDatabase.list('/Favourite-Comic');

            this.loginSegment = "BookmarkBook";
    }

    ionViewDidLoad() {
        console.clear();
        console.log("============================");
        console.log('Welcome to User Account Page');
        console.log("============================");
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
    }
    
    /*==- FACEBOOK -==*/
    //check login status
    checkFacebookLoginStatus(){
        this.fb.getLoginStatus().then(res => {
          
          if(res.status == 'connect' || res.status == 'connected'){
            
            firebase.auth().onAuthStateChanged(user => {
                if(user){
                    this.userProfile  = user;
                    this.loggedin     = true;
                    this.isFacebookLogin  = true;
                    console.log('==>%c Facebook Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
                    // console.log('=> User Facebook Login Data', this.userProfile);
                    this.getMyBookmark();
                    this.getFavouriteBook();
                    this.getMyComicBookmark();
                    this.getFavouriteComic();
                }
                else{
                  this.userProfile = null;
                  this.loggedin    = false;
                  this.isFacebookLogin  = false;
                  console.log('==>%c Facebook Login Status :: DISCONNECTED ', 'background: red; color: white; font-weight: bold; display: block;');
                }
            });
          }
  
          else{
            console.log('==>%c Facebook Login Status :: DISCONECTED ', 'background: red; color: white; font-weight: bold; display: block;');
            this.loggedin  = false;
            //this.loggedin  = res.status;
          //   console.log('=> logggedin status', this.loggedin);
          }
        }).catch(err => {
          console.log(err);
        });
    }
  
    logoutFacebook(){
        this.fb.logout().then(res => {
          console.log("==>%c Facebook Logout Success ", 'background: green; color: white; font-weight: bold; display: block;' , res);
          this.userProfile = null;
          this.isFacebookLogin = false;
          this.loggedin    = false;

          this.navCtrl.setRoot(HomePage);
        })
    }
    /*==- END FACEBOOK -==*/

    //== GOOGLE ==//
    //check login status
    async checkGoogleLoginStatus(){
        try{
            this.userProfile = await this.gPlus.trySilentLogin({});
            // console.log('==> Google Plus Login Data', this.userProfile);

            this.loggedin     = true;
            this.isGoogleLogin= true;
            console.log('==>%c Google Plus Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
            // console.log('=> logggedin status', this.loggedin);
            // this.getMyBookmarkGooglePlus();

            //check bookmark and favourite for google plus user
            if(this.userProfile){
                this.userIDs = this.userProfile.userId;
                // console.log("==> User ID Google Plus", this.userIDs);

                //=========================//
                //check bookmark book for google plus user
                this.bookmarkRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
                    this.myBookmark = [];
                    dataFavourite.forEach(dataFv => {
                        this.myBookmark.push(dataFv.val());
                        return false;
                    });
        
                    if(this.myBookmark){
                        console.log("======================================================");
                        console.log('=>%c Bookmark Book (Google Plus) Found. Count the Data :', 'color: green; font-weight: bold;', this.myBookmark.length);
                        console.log('=>%c The Data is : ', 'color: green; font-weight: bold;', this.myBookmark);
                        this.isHaveBookmark = true;
                        console.log("======================================================");
                    }
                    else{
                        console.log("=>%c No Bookmark Book data (Google Plus) for this user", 'color: red; font-weight: bold;',this.myBookmark.length);
                        this.isHaveBookmark = false;
                    }
                });
                
                //=========================//
                //check favourite book for google plus user
                this.favoRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
                    this.myFav = [];
                    dataFavourite.forEach(dataFv => {
                        this.myFav.push(dataFv.val());
                        return false;
                    });
        
                    if(this.myFav){
                        console.log("======================================================");
                        console.log('=>%c Favourite Book (Google Plus) Found. Count the Data :', 'color: green; font-weight: bold;', this.myFav.length);
                        console.log('=>%c The Data is :', 'color: green; font-weight: bold;', this.myFav);
                        this.isHaveFavourite = true;
                        console.log("======================================================");
                    }
                    else{
                        console.log("=>%c Favourite Book Data (Google Plus) Not Found for this user", 'color: red; font-weight: bold;', this.myFav.length);
                        this.isHaveFavourite = false;
                    }
                });
                
                //=========================//
                //check bookmark comic
                this.bookmarkComicRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
                    this.myBookmarkComic = [];
                    dataFavourite.forEach(dataFv => {
                        this.myBookmarkComic.push(dataFv.val());
                        return false;
                    });
    
                    if(this.myBookmarkComic){
                        console.log("=======================================================");
                        console.log('=>%c Bookmark Comic (Google Plus) Found. Count the Data :', 'color: green; font-weight: bold;', this.myBookmarkComic.length);
                        console.log('=>%c The Data is :', 'color: green; font-weight: bold;',this.myBookmarkComic);
                        this.isHaveBookmark = true;
                        console.log("=======================================================");
                    }
                    else{
                        console.log("=>%c Bookmark Comic Data (Google Plus) Not Found for this user", 'color: red; font-weight: bold;',this.myBookmarkComic.length);
                        this.isHaveBookmark = false;
                    }
                });
                
                //=========================//
                //check favourite comic
                this.favoComicRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
                    this.myComicFav = [];
                    dataFavourite.forEach(dataFv => {
                        this.myComicFav.push(dataFv.val());
                        return false;
                    });
      
                    if(this.myComicFav){
                        console.log("========================================================");
                        console.log('=>%c Favourite Comic (Google Plus) Found. Count the Data :', 'color: green; font-weight: bold;', this.myComicFav.length);
                        console.log('=>%c The Data is :', 'color: green; font-weight: bold;', this.myComicFav);
                        this.isHaveFavourite = true;
                        console.log("========================================================");
                    }
                    else{
                        console.log("=>%c Favourite Comic Data (Google Plus) Not Found for this user", 'color: red; font-weight: bold;',this.myComicFav.length);
                        this.isHaveFavourite = false;
                    }
                });

            } else {
                console.log('=>%c Google Plus Login Not Detected. Login First!', 'color: red; font-weight: bold;');
                this.isGoogleLogin  = false;
                this.loggedin  = false;
            }
        }
        catch(error){
            // this.userProfile = null;
            this.loggedin    = false;
            this.isGoogleLogin  = false;
            console.log('==>%c Google Plus Login Status :: DISCONNECTED ', 'background: red; color: white; font-weight: bold; display: block;');
            // console.log('=> logggedin status', this.loggedin);
        }
    }

    logoutGooglePlus(){
      this.gPlus.logout().then(res => {
        console.log("==>%c Google Plus Logout Success ", 'background: green; color: white; font-weight: bold; display: block;', res);
        this.userProfile = null;
        this.isGoogleLogin   = false;
        this.loggedin    = false;

        this.navCtrl.setRoot(HomePage);
      })
    }
    //== END GOOGLE ==//

    // FACEBOOK BOOKMARK, FAVOURITE BOOK, BOOKMARK AND FAVOURITE COMIC, 
    // FOR GOOGLE PLUS I PLACED THEN ON GOOGLELOGINCHECK FUNCTION
    getMyBookmark(){
        this.fb.getLoginStatus().then(res => {
            if(res.status == 'connect' || res.status == 'connected'){
                firebase.auth().onAuthStateChanged(user => {
                    this.FBData = user;
                    // console.log("User Detected. Data facebook Login for this user:", this.FBData);
                    this.loggedin = true;
                    this.isFacebookLogin = true;
                    this.userIDs      = this.FBData.uid;
                    console.log('=>%c User ID Facebook:', 'color: green; font-weight: bold;', this.userIDs);
        
                    this.bookmarkRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
                        this.myBookmark = [];
                        dataFavourite.forEach(dataFv => {
                            this.myBookmark.push(dataFv.val());
                            return false;
                        });
            
                        if(this.myBookmark){
                            console.log("========================================");
                            console.log('=>%c Bookmark Book Found. Count the Data :', 'color: green; font-weight: bold;', this.myBookmark.length);
                            console.log('=>%c The Data is :', 'color: green; font-weight: bold;', this.myBookmark);
                            console.log("========================================");
                            this.isHaveBookmark = true;
                            
                            for(let data of this.myBookmark){
                                this.bookmarkBookTitle = data.book_title;
                                // console.log('data title dari firebase', this.bookmarkBookTitle);
                            }
                        }
                        else{
                            console.log("=>%c No Bookmark Book Found for this user", 'color: red; font-weight: bold;', this.myBookmark.length);
                            this.isHaveBookmark = false;
                        }
                    });
                });
            }
        }).catch(err => {
          console.log(err);
        });
    }

    getFavouriteBook(){
        this.fb.getLoginStatus().then(res => {
          if(res.status == 'connect' || res.status == 'connected'){
    
            firebase.auth().onAuthStateChanged(user => {
            //   console.log("================================");
            //   console.log(" FACEBOOK FAVOURITE BOOK CHECK  ");
            //   console.log("--------------------------------");
              this.FBData = user;
            //   console.log("User Detected. Data facebook Login for this user:", this.FBData);
              this.loggedin = true;
              this.isFacebookLogin = true;
              this.userIDs      = this.FBData.uid;
            //   console.log('=> User ID Facebook:', this.userIDs);
    
              this.favoRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
                this.myFav = [];
                dataFavourite.forEach(dataFv => {
                  this.myFav.push(dataFv.val());
                  return false;
                });
    
                if(this.myFav){
                    console.log("=============================================");
                    console.log('=>%c Favourite Book Found. Count the data now :', 'color: green; font-weight: bold;', this.myFav.length);
                    console.log('=>%c The Data is :', 'color: green; font-weight: bold;',this.myFav);
                    this.isHaveFavourite = true;
                    console.log("=============================================");
                }
                else{
                  console.log("=>% No Favourite Book Found for this user", 'color: green; font-weight: bold;', this.myFav.length);
                  this.isHaveFavourite = false;
                }
              });
            //   console.log("==========================");
            });
          }
        }).catch(err => {
          console.log(err);
        });
    }

    getMyComicBookmark(){
        this.fb.getLoginStatus().then(res => {
          if(res.status == 'connect' || res.status == 'connected'){
            firebase.auth().onAuthStateChanged(user => {
            //   console.log("==========================");
            //   console.log(" FACEBOOK BOOKMARK CHECK  ");
            //   console.log("--------------------------");
              this.FBData = user;
            //   console.log("User Detected. Data facebook Login for this user:", this.FBData);
              this.loggedin = true;
              this.isFacebookLogin = true;
              this.userIDs      = this.FBData.uid;
            //   console.log('=> User ID Facebook:', this.userIDs);

              this.bookmarkComicRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
                this.myBookmarkComic = [];
                dataFavourite.forEach(dataFv => {
                  this.myBookmarkComic.push(dataFv.val());
                  return false;
                });

                if(this.myBookmarkComic){
                    console.log("=========================================");
                    console.log('=>%c Bookmark Comic Found. Count the Data :', 'color: green; font-weight: bold;', this.myBookmarkComic.length);
                    console.log('=>%c The Data is :', 'color: green; font-weight: bold;', this.myBookmarkComic);
                    this.isHaveBookmark = true;
                    console.log("=========================================");
                }
                else{
                  console.log("=>%c No Bookmark Comic Found for this user", 'color: red; font-weight: bold;',this.myBookmarkComic.length);
                  this.isHaveBookmark = false;
                }
              });
            //   console.log("==========================");
            });
          }
        }).catch(err => {
          console.log(err);
        });
    }

    getFavouriteComic(){
        this.fb.getLoginStatus().then(res => {
          if(res.status == 'connect' || res.status == 'connected'){

            firebase.auth().onAuthStateChanged(user => {
            //   console.log("==========================");
            //   console.log(" FACEBOOK FAVOURITE CHECK  ");
            //   console.log("--------------------------");
              this.FBData = user;
            //   console.log("User Detected. Data facebook Login for this user:", this.FBData);
              this.loggedin = true;
              this.isFacebookLogin = true;
              this.userIDs      = this.FBData.uid;
            //   console.log('=> User ID Facebook:', this.userIDs);

              this.favoComicRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
                this.myComicFav = [];
                dataFavourite.forEach(dataFv => {
                  this.myComicFav.push(dataFv.val());
                  return false;
                });

                if(this.myComicFav){
                    console.log("==============================================");
                    console.log('=>%c Favourite Comic Found. Count the data now :', 'color: green; font-weight: bold;', this.myComicFav.length);
                    console.log('=>%c The Data is :', 'color: green; font-weight: bold;', this.myComicFav);
                    this.isHaveFavourite = true;
                    console.log("==============================================");
                }
                else{
                    console.log("=>%c No Favourite Comic Found for this user", 'color: red; font-weight: bold;',this.myComicFav.length);
                    this.isHaveFavourite = false;
                }
              });
            //   console.log("==========================");
            });
          }
        }).catch(err => {
          console.log(err);
        });
    }
    // FACEBOOK BOOKMARK AND FAVOURITE BOOK

    showDetailBook(book) {
        console.log('=> show detail book', book);
        this.navCtrl.push(BookDetailPage, {
          book: book
        });
    }

    showDetailcomic(comic){
        console.log('=> show detail comic', comic);
        this.navCtrl.push(ComicDetailPage, {comic: comic});
    }

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
