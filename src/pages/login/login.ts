import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';

// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
// import { BookDetailPage } from '../book-detail/book-detail';
import { BukufiRestProvider } from '../../providers/bukufi-rest/bukufi-rest';
// import { BookDetailPage } from '../book-detail/book-detail';
// import { ComicDetailPage } from '../comic-detail/comic-detail';

// import { BookBookmarkPage } from '../book-bookmark/book-bookmark';
// import { BookFavouritePage } from '../book-favourite/book-favourite';

// import { ComicBookmarkPage } from '../comic-bookmark/comic-bookmark';
// import { ComicFavouritePage } from '../comic-favourite/comic-favourite';

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

    //====== for bookmark book =======//
    FBData: any;
    userIDs: any;
    result2: any;
    objResult2: any;
    regex: any = /\-/gi;
    // isHaveBookmark: boolean;
    // dataFavourite: any;
    // dataFavourite2: Array<any> = [];
    // bookmarkBookTitle: string;
    // bookmarkBookImage: any;

    //====== for favourite book =======//
    // isHaveFavourite: boolean;
    
    //book
    // BookmarkBook: AngularFireList<any>;
    // myBookmark: Array<any> = [];
    // bookmarkRef: firebase.database.Reference = firebase.database().ref(`/Bookmark-book`);

    // FavouriteBook: AngularFireList<any>;
    // myFav: Array<any> = [];
    // favoRef: firebase.database.Reference = firebase.database().ref(`/Favourite-book`);
    
    //comic
    // BookmarkComic: AngularFireList<any>;
	// myBookmarkComic: Array<any> = [];
    // bookmarkComicRef: firebase.database.Reference = firebase.database().ref(`/Bookmark-Comic`);
      
    // FavouriteComic: AngularFireList<any>;
	// myComicFav: Array<any> = [];
  	// favoComicRef: firebase.database.Reference = firebase.database().ref(`/Favourite-Comic`);
  
    constructor(public navCtrl: NavController, 
        public navParams: NavParams, 
        public fb: Facebook, 
        public gPlus: GooglePlus,
        public fire: AngularFireAuth, 
        // public afDatabase: AngularFireDatabase,
        public platform: Platform,
        public bukufiRest: BukufiRestProvider) {
            //bookmark book firebase db
            // this.BookmarkBook   = afDatabase.list('/Bookmark-book');
            // this.FavouriteBook  = afDatabase.list('/Favourite-book');
            // this.BookmarkComic  = afDatabase.list('/Bookmark-Comic');
            // this.FavouriteComic = afDatabase.list('/Favourite-Comic');

            this.checkGoogleLoginStatus();
            this.checkFacebookLoginStatus();
            
            // this.getBookImageFromAPI();
        
            this.loginSegment = "BookmarkBook";
            // this.loginSegment = "BookmarkComic";
    }

    ionViewDidLoad() {
        console.clear();
        console.log('=================');
        console.log('Login Page Loaded');
        console.log('=================');
    }

    /*==- FACEBOOK -==*/
        loginFacebook(): Promise<any>{
          return this.fb.login(['email', 'public_profile']).then(response => {
            const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
    
            firebase.auth().signInWithCredential(facebookCredential).then(success => {
              this.result  = JSON.stringify(success);
              this.objResult  = JSON.parse(this.result);
              
              this.loggedin  = true;
              console.log('==> Login Facebook Success');
    
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
                    //   console.log('=> User Facebook Login Data', this.userProfile);
                    // this.getMyBookmark();
                    // this.getFavouriteBook();
                    // this.getMyComicBookmark();
                    // this.getFavouriteComic();
                } else{
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
              this.isFacebookLogin  = false;
              //this.loggedin  = res.status;
            //   console.log('=> logggedin status', this.loggedin);
            }
          }).catch(err => {
            console.log(err);
          });
        }
    
        // logoutFacebook(){
        //   this.fb.logout().then(res => {
        //     console.log("==> Facebook Logout Success", res);
        //     this.userProfile = null;
        //     this.isFacebookLogin = false;
        //     this.loggedin    = false;
        //   })
        // }
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
                console.log("==> Login Google Plus Success");
    
                this.navCtrl.setRoot(HomePage);
            });
        }, err => {
            console.error("Error: ", err)
        });
    }
    
    //check login status
    async checkGoogleLoginStatus(){
        try{
            this.userProfile = await this.gPlus.trySilentLogin({});
            // console.log('==> Google Plus Login Data', this.userProfile);

            //check bookmark and favourite for google plus user
            // if(this.userProfile){
            //     this.userIDs = this.userProfile.userId;
            //     // console.log("==> User ID Google Plus", this.userIDs);

            //     //=========================//
            //     //check bookmark book for google plus user
            //     // this.bookmarkRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
            //     //     this.myBookmark = [];
            //     //     dataFavourite.forEach(dataFv => {
            //     //         this.myBookmark.push(dataFv.val());
            //     //         return false;
            //     //     });
        
            //     //     if(this.myBookmark){
            //     //         console.log("======================================================");
            //     //         console.log('=> Bookmark Book (Google Plus) Found. Count the Data :', this.myBookmark.length);
            //     //         console.log('=> The Data is :', this.myBookmark);
            //     //         this.isHaveBookmark = true;
            //     //         console.log("======================================================");
            //     //     }
            //     //     else{
            //     //         console.log("=> No Bookmark Book data (Google Plus) for this user", this.myBookmark.length);
            //     //         this.isHaveBookmark = false;
            //     //     }
            //     // });
                
            //     //=========================//
            //     //check favourite book for google plus user
            //     // this.favoRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
            //     //     this.myFav = [];
            //     //     dataFavourite.forEach(dataFv => {
            //     //         this.myFav.push(dataFv.val());
            //     //         return false;
            //     //     });
        
            //     //     if(this.myFav){
            //     //         console.log("======================================================");
            //     //         console.log('=> Favourite Book (Google Plus) Found. Count the Data :', this.myFav.length);
            //     //         console.log('=> The Data is :', this.myFav);
            //     //         this.isHaveFavourite = true;
            //     //         console.log("======================================================");
            //     //     }
            //     //     else{
            //     //         console.log("=> Favourite Book Data (Google Plus) Not Found for this user", this.myFav.length);
            //     //         this.isHaveFavourite = false;
            //     //     }
            //     // });
                
            //     //=========================//
            //     //check bookmark comic
            //     // this.bookmarkComicRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
            //     //     this.myBookmarkComic = [];
            //     //     dataFavourite.forEach(dataFv => {
            //     //         this.myBookmarkComic.push(dataFv.val());
            //     //         return false;
            //     //     });
    
            //     //     if(this.myBookmarkComic){
            //     //         console.log("=======================================================");
            //     //         console.log('=> Bookmark Comic (Google Plus) Found. Count the Data :', this.myBookmarkComic.length);
            //     //         console.log('=> The Data is :', this.myBookmarkComic);
            //     //         this.isHaveBookmark = true;
            //     //         console.log("=======================================================");
            //     //     }
            //     //     else{
            //     //         console.log("=> Bookmark Comic Data (Google Plus) Not Found for this user", this.myBookmarkComic.length);
            //     //         this.isHaveBookmark = false;
            //     //     }
            //     // });
                
            //     //=========================//
            //     //check favourite comic
            //     // this.favoComicRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
            //     //     this.myComicFav = [];
            //     //     dataFavourite.forEach(dataFv => {
            //     //         this.myComicFav.push(dataFv.val());
            //     //         return false;
            //     //     });
      
            //     //     if(this.myComicFav){
            //     //         console.log("========================================================");
            //     //         console.log('=> Favourite Comic (Google Plus) Found. Count the Data :', this.myComicFav.length);
            //     //         console.log('=> The Data is :', this.myComicFav);
            //     //         this.isHaveFavourite = true;
            //     //         console.log("========================================================");
            //     //     }
            //     //     else{
            //     //         console.log("=>Favourite Comic Data (Google Plus) Not Found for this user", this.myComicFav.length);
            //     //         this.isHaveFavourite = false;
            //     //     }
            //     // });

            // } else {
            //     console.log('=> Login First!');
            //     this.isGoogleLogin  = false;
            //     this.loggedin  = false;
            // }

            this.loggedin     = true;
            this.isGoogleLogin= true;
            console.log('==> Google Plus Login Status :: CONNECTED');
            // console.log('=> logggedin status', this.loggedin);
            // this.getMyBookmarkGooglePlus();
            
        } catch(error){
            // this.userProfile = null;
            this.loggedin    = false;
            this.isGoogleLogin  = false;
            console.log('==> Google Plus Login Status :: DISCONNECTED');
            // console.log('=> logggedin status', this.loggedin);
        }
    }

    // logoutGooglePlus(){
    //   this.gPlus.logout().then(res => {
    //     console.log("==> Google Plus Logout Success", res);
    //     this.userProfile = null;
    //     this.isGoogleLogin   = false;
    //     this.loggedin    = false;
    //   })
    // }
    //== END GOOGLE ==//

    // FACEBOOK BOOKMARK, FAVOURITE BOOK, BOOKMARK AND FAVOURITE COMIC, 
    // FOR GOOGLE PLUS I PLACED THEN ON GOOGLELOGINCHECK FUNCTION
        // getMyBookmark(){
        //     this.fb.getLoginStatus().then(res => {
        //         if(res.status == 'connect' || res.status == 'connected'){
        //             firebase.auth().onAuthStateChanged(user => {
        //                 this.FBData = user;
        //                 // console.log("User Detected. Data facebook Login for this user:", this.FBData);
        //                 this.loggedin = true;
        //                 this.isFacebookLogin = true;
        //                 this.userIDs      = this.FBData.uid;
        //                 // console.log('=> User ID Facebook:', this.userIDs);
            
        //                 this.bookmarkRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
        //                     this.myBookmark = [];
        //                     dataFavourite.forEach(dataFv => {
        //                         this.myBookmark.push(dataFv.val());
        //                         return false;
        //                     });
                
        //                     if(this.myBookmark){
        //                         console.log("========================================");
        //                         console.log('=> Bookmark Book Found. Count the Data :', this.myBookmark.length);
        //                         console.log('=> The Data is :', this.myBookmark);
        //                         console.log("========================================");
        //                         this.isHaveBookmark = true;
                                
        //                         for(let data of this.myBookmark){
        //                             this.bookmarkBookTitle = data.book_title;
        //                             // console.log('data title dari firebase', this.bookmarkBookTitle);
        //                         }
        //                     }
        //                     else{
        //                         console.log("=> No Bookmark Book Found for this user", this.myBookmark.length);
        //                         this.isHaveBookmark = false;
        //                     }
        //                 });
        //             });
        //         }
        //     }).catch(err => {
        //       console.log(err);
        //     });
        // }

        // getFavouriteBook(){
        //     this.fb.getLoginStatus().then(res => {
        //       if(res.status == 'connect' || res.status == 'connected'){
        
        //         firebase.auth().onAuthStateChanged(user => {
        //         //   console.log("================================");
        //         //   console.log(" FACEBOOK FAVOURITE BOOK CHECK  ");
        //         //   console.log("--------------------------------");
        //           this.FBData = user;
        //         //   console.log("User Detected. Data facebook Login for this user:", this.FBData);
        //           this.loggedin = true;
        //           this.isFacebookLogin = true;
        //           this.userIDs      = this.FBData.uid;
        //           console.log('=> User ID Facebook:', this.userIDs);
        
        //           this.favoRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
        //             this.myFav = [];
        //             dataFavourite.forEach(dataFv => {
        //               this.myFav.push(dataFv.val());
        //               return false;
        //             });
        
        //             if(this.myFav){
        //                 console.log("=============================================");
        //                 console.log('=> Favourite Book Found. Count the data now :', this.myFav.length);
        //                 console.log('=> The Data is :', this.myFav);
        //                 this.isHaveFavourite = true;
        //                 console.log("=============================================");
        //             }
        //             else{
        //               console.log("=> No Favourite Book Found for this user", this.myFav.length);
        //               this.isHaveFavourite = false;
        //             }
        //           });
        //         //   console.log("==========================");
        //         });
        //       }
        //     }).catch(err => {
        //       console.log(err);
        //     });
        // }

        // getMyComicBookmark(){
        //     this.fb.getLoginStatus().then(res => {
        //       if(res.status == 'connect' || res.status == 'connected'){
        //         firebase.auth().onAuthStateChanged(user => {
        //         //   console.log("==========================");
        //         //   console.log(" FACEBOOK BOOKMARK CHECK  ");
        //         //   console.log("--------------------------");
        //           this.FBData = user;
        //         //   console.log("User Detected. Data facebook Login for this user:", this.FBData);
        //           this.loggedin = true;
        //           this.isFacebookLogin = true;
        //           this.userIDs      = this.FBData.uid;
        //           console.log('=> User ID Facebook:', this.userIDs);
    
        //           this.bookmarkComicRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
        //             this.myBookmarkComic = [];
        //             dataFavourite.forEach(dataFv => {
        //               this.myBookmarkComic.push(dataFv.val());
        //               return false;
        //             });
    
        //             if(this.myBookmarkComic){
        //                 console.log("=========================================");
        //                 console.log('=> Bookmark Comic Found. Count the Data :', this.myBookmarkComic.length);
        //                 console.log('=> The Data is :', this.myBookmarkComic);
        //                 this.isHaveBookmark = true;
        //                 console.log("=========================================");
        //             }
        //             else{
        //               console.log("=> No Bookmark Comic Found for this user", this.myBookmarkComic.length);
        //               this.isHaveBookmark = false;
        //             }
        //           });
        //           console.log("==========================");
        //         });
        //       }
        //     }).catch(err => {
        //       console.log(err);
        //     });
        // }

        // getFavouriteComic(){
        //     this.fb.getLoginStatus().then(res => {
        //       if(res.status == 'connect' || res.status == 'connected'){
    
        //         firebase.auth().onAuthStateChanged(user => {
        //         //   console.log("==========================");
        //         //   console.log(" FACEBOOK FAVOURITE CHECK  ");
        //         //   console.log("--------------------------");
        //           this.FBData = user;
        //         //   console.log("User Detected. Data facebook Login for this user:", this.FBData);
        //           this.loggedin = true;
        //           this.isFacebookLogin = true;
        //           this.userIDs      = this.FBData.uid;
        //           console.log('=> User ID Facebook:', this.userIDs);
    
        //           this.favoComicRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
        //             this.myComicFav = [];
        //             dataFavourite.forEach(dataFv => {
        //               this.myComicFav.push(dataFv.val());
        //               return false;
        //             });
    
        //             if(this.myComicFav){
        //                 console.log("==============================================");
        //                 console.log('=> Favourite Comic Found. Count the data now :', this.myComicFav.length);
        //                 console.log('=> The Data is :', this.myComicFav);
        //                 this.isHaveFavourite = true;
        //                 console.log("==============================================");
        //             }
        //             else{
        //               console.log("=> No Favourite Comic Found for this user", this.myComicFav.length);
        //               this.isHaveFavourite = false;
        //             }
        //           });
        //           console.log("==========================");
        //         });
        //       }
        //     }).catch(err => {
        //       console.log(err);
        //     });
        // }
    // FACEBOOK BOOKMARK AND FAVOURITE BOOK

    // showDetailBook(book) {
    //     console.log('=> show detail book', book);
    //     this.navCtrl.push(BookDetailPage, {
    //       book: book
    //     });
    // }

    // showDetailcomic(comic){
    //     console.log('=> show detail comic', comic);
    //     this.navCtrl.push(ComicDetailPage, {comic: comic});
    // }

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