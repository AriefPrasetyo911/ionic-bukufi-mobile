import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BukufiRestProvider } from '../../providers/bukufi-rest/bukufi-rest';
import { BookPage } from './../book/book';
import { LoginPage } from '../login/login';
import { SearchPage } from '../search/search';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';

@IonicPage()
@Component({
    selector: 'page-book-detail',
    templateUrl: 'book-detail.html',
})
export class BookDetailPage {
  
    book: any;

    //for detail book
        book_detail: any;
        bookAuthor: any;
        bookPublisher: any;
        bookRelease: number;
    
    //for book review
        bookReveiew: any;
        checkAvailableReview: number = 0;
    
    //for book rating
        dataRating: any;
        bookRating: any;
        bookRating_totalView: number;
    
    //bookmark book
        isHaveBookmark: boolean;
        FBData: any;
        bookmarkBookTitle: string;
        bookmarkBookImage: any;    
        bookmarkConfirm: number = 0;
    
    //favourite book
        isHaveFavourite: boolean;
    
    //for facebook and google plus check
        userProfile: any = null;
        loggedin: boolean = false;
        isFacebookLogin: boolean = false;
        providerIDs: any;
        emailIDs: any;
        userIDs: any;
    
    //for google plus check
        isGoogleLogin: boolean = false;

    //book
        BookmarkBook: AngularFireList<any>;
        myBookmark: Array<any> = [];
        bookmarkRef: firebase.database.Reference = firebase.database().ref(`/Bookmark-book`);
    
        FavouriteBook: AngularFireList<any>;
        myFav: Array<any> = [];
        favoRef: firebase.database.Reference = firebase.database().ref(`/Favourite-book`);
    
    constructor(public navCtrl: NavController, 
        public navParams: NavParams, 
        public platform: Platform,
        public bukufiRest: BukufiRestProvider, 
        public fb: Facebook, 
        public gPlus: GooglePlus,
        public afDatabase: AngularFireDatabase, 
        public alertCtrl: AlertController) {

            this.book = this.navParams.get('book');
            // console.log('==> Parameter from HomePage: ',this.book);
        
            //firebase db
            this.BookmarkBook   = afDatabase.list('/Bookmark-book');
            this.FavouriteBook  = afDatabase.list('/Favourite-book');

            this.getDetail();
            this.getBookReview();
            this.getBookRating();
    }

    ionViewDidLoad() {
        console.clear();
        console.log('%c=====================', 'color: violet; font-weight: bold;');
        console.log('%c BookDetailPage loaded', 'color: green; font-weight: bold;');
        console.log('%c=====================', 'color: violet; font-weight: bold;');
        console.log("%c Platform Ready", 'color: green; font-weight: bold;')
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
    }
    
    /*===- GET DETAIL BOOK -===*/
    getDetail(){
        this.bukufiRest.getDetailBook(this.book)
            .then(data => {
                this.book_detail = data;
                // console.log('==> Detail Book :', this.book_detail);
                
                //for bookmark and favourite
                for(let favTemp of this.book_detail){
                  this.bookAuthor     = favTemp.book_author;
                  this.bookPublisher  = favTemp.book_publisher;
                  this.bookRelease    = favTemp.book_release;
                }
            });
    }
    /*===- END GET DETAIL BOOK -===*/

    /*===- GET BOOK REVIEW -===*/
    getBookReview(){
        this.bukufiRest.getReviewBook(this.book).then(data => {
            this.bookReveiew = data;
            // console.log('book review data', this.bookReveiew);
            if(this.bookReveiew.status_code != 404){
                this.checkAvailableReview = 1;
                console.log('---------------------');
                console.log('%c Book Review EXIST ', 'background: green; color: white; font-weight: bold; display: block;');
            }
            else{
                this.checkAvailableReview = 0;
                console.log('---------------------');
                console.log("%c Book Review DOESN't EXIST ", 'background: red; color: white; font-weight: bold; display: block;');
            }
        }).catch(reject => {
            console.log('%c Error Occured ', 'background: red; color: white; font-weight: bold; display: block;', reject);
        });
    }
    /*===- END GET BOOK REVIEW -===*/

    /*===- BOOK RATING -===*/
    getBookRating(){
        this.bukufiRest.getBookRating(this.book).then(data => {
            this.dataRating = data;
            
            if(this.dataRating.avg_rating || this.dataRating.total_vote){
                console.log('---------------------');
                console.log("%c Book Rating EXIST ", 'background: green; color: white; font-weight: bold; display: block;');

                this.bookRating = this.dataRating.avg_rating;
                console.log('%c book rating: ', 'color: green; font-weight: bold;', this.bookRating);
        
                this.bookRating_totalView = this.dataRating.total_vote;
                console.log('%c total data vote', 'color: green; font-weight: bold;', this.bookRating_totalView);
            } else {
                console.log('-----------------------------');
                console.log("%c Book Rating DOESN't EXIST", 'background: red; color: white; font-weight: bold; display: block;');

                this.bookRating = 0;
                // console.log('book rating: ',this.bookRating);
            }
        }).catch(reject => {
            console.log('%c Error Occured ', 'background: red; color: white; font-weight: bold; display: block;', reject);
        });
    }
    /*===- END BOOK RATING -===*/

    show(book) {
        console.log('show', book);
        this.navCtrl.push(BookPage, {
          book: book
        });
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
                //   console.log('==> User Facebook Login Data', this.userProfile);
                    this.loggedin = true;
                    this.isFacebookLogin  = true;
                    console.log('==>%c Facebook Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
                    console.log("=>%c isFacebookLogin status", 'color: green; font-weight: bold;', this.isFacebookLogin);
                    
                    this.providerIDs = "Facebook";
                    this.userIDs     = this.userProfile.uid;
                    this.emailIDs    = this.userProfile.email;
                    //   console.log("=> Facebook User ID", this.userIDs);

                    this.getMyBookmark();
                    this.getFavouriteBook();
                    console.log("==========================");
                }
                else{
                    this.isFacebookLogin  = false;
                    console.log("==========================");
                    console.log("   FACEBOOK LOGIN CHECK   ");
                    console.log("--------------------------");
                    this.isFacebookLogin  = false;
                    this.userProfile = null;
                    this.loggedin = false;
                    console.log('==>%c Facebook Login Status :: DISCONNECTED ', 'background: red; color: white; font-weight: bold; display: block;');
                    console.log("=>%c isFacebookLogin status", 'color: red; font-weight: bold;', this.isFacebookLogin);
                    console.log("==========================");
                }
            })
        }

        else{
            console.log("==========================");
            console.log("   FACEBOOK LOGIN CHECK   ");
            console.log("--------------------------");
            console.log('==>%c Facebook Login Status :: DISCONECTED ', 'background: red; color: white; font-weight: bold; display: block;');
            this.loggedin  = false;
            this.isFacebookLogin  = false;
            console.log('=>%c isFacebookLogin status', 'color: red; font-weight: bold;', this.isFacebookLogin);
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
    
                this.loggedin  = true;
                this.isGoogleLogin = true;
                console.log('==>%c Google Plus Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
            //   console.log('=> isGoogleLogin status', this.isGoogleLogin);
    
                this.providerIDs = "Google Plus";
                this.userIDs     = this.userProfile.userId;
                this.emailIDs    = this.userProfile.email;
                console.log("=>%c Google Plus User ID", 'color: green; font-weight: bold;', this.userIDs);
    
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
                    
                } else {
                    console.log('=>%c Google Plus Login Not Detected. Login First!', 'color: red; font-weight: bold;');
                    this.isGoogleLogin  = false;
                    this.loggedin  = false;
                }
                console.log("==========================");
            } else {
                console.log('==>%c Google Plus Login Not Detected. Please Login ', 'background: red; color: white; font-weight: bold; display: block;');
                this.isGoogleLogin  = false;
                this.loggedin  = false;
                console.log('=>%c isGoogleLogin status', 'color: red; font-weight: bold;', this.isGoogleLogin);
            }
        }).catch(error => {
            // this.userProfile = null;
            this.loggedin    = false;
            console.log("==========================");
            console.log(" GOOGLE PLUS LOGIN CHECK ");
            console.log("--------------------------");
            console.log('==>%c Google Plus Login Status :: DISCONNECTED ', 'background: red; color: white; font-weight: bold; display: block;');
            this.isGoogleLogin  = false;
            console.log('=>%c isGoogleLogin status', 'color: red; font-weight: bold;', this.isGoogleLogin);
            console.log("==========================");
        });
    }
    //===- END -===//

    addFavouriteBook(){
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
                  name: 'bookTitle',
                  placeholder: 'Book Title',
                  value: this.book,
                  type: 'hidden'
                },
                {
                  name: 'bookAuthor',
                  placeholder: 'Book Author',
                  value: this.bookAuthor,
                  type: 'hidden'
                },
                {
                  name: 'bookPublisher',
                  placeholder: 'Book Publisher',
                  value: this.bookPublisher,
                  type: 'hidden'
                },
                {
                  name: 'bookRelease',
                  placeholder: 'Book Release',
                  value: this.bookRelease,
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
                        const newFavBookRef = this.FavouriteBook.push({});
               
                        newFavBookRef.set({
                            id: newFavBookRef.key,
                            provider: data.provider,
                            userID: data.userID,
                            emailID: data.emailID,
                            book_title: data.bookTitle,
                            book_author: data.bookAuthor,
                            book_publisher: data.bookPublisher,
                            book_release: data.bookRelease,
                            fav_status: data.favStatus
                        });
                        console.log('==-> This book mark as your favourite');
                    }
                }
            ]
        });
        prompt.present();
    }

    addBookmarkBook(){
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
                  name: 'bookTitle',
                  placeholder: 'Book Title',
                  value: this.book,
                  type: 'hidden'
                },
                {
                  name: 'bookAuthor',
                  placeholder: 'Book Author',
                  value: this.bookAuthor,
                  type: 'hidden'
                },
                {
                  name: 'bookPublisher',
                  placeholder: 'Book Publisher',
                  value: this.bookPublisher,
                  type: 'hidden'
                },
                {
                  name: 'bookRelease',
                  placeholder: 'Book Release',
                  value: this.bookRelease,
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
                    console.log('==-> Cancel Bookmark clicked');
                  }
                },
                {
                  text: 'Add to Bookmark',
                  handler: data => {
                    const newBookmarkBook = this.BookmarkBook.push({});
           
                    newBookmarkBook.set({
                      id: newBookmarkBook.key,
                      provider: data.provider,
                      userID: data.userID,
                      emailID: data.emailID,
                      book_title: data.bookTitle,
                      book_author: data.bookAuthor,
                      book_publisher: data.bookPublisher,
                      book_release: data.bookRelease,
                      fav_status: data.favStatus
                    });
                    
                    console.log('==-> This book marked as your bookmark');
                  }
                }
            ]
        });
        prompt.present();
    }
    
    //for facebook login
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
                    console.log('%c Current Book', 'color: green; font-weight: bold;', this.book);

                    this.bookmarkRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
                        this.myBookmark = [];
                        dataFavourite.forEach(dataFv => {
                            this.myBookmark.push(dataFv.val());
                            return false;
                        });
            
                        if(this.myBookmark){
                            console.log("========================================");
                            console.log('=>%c Bookmark Book Found (Facebook). Count the Data :', 'color: green; font-weight: bold;', this.myBookmark.length);
                            console.log('=>%c The Data is (Facebook) :', 'color: green; font-weight: bold;', this.myBookmark);
                            console.log("========================================");
                            this.isHaveBookmark = true;
                            
                            for(let data of this.myBookmark){
                                console.log("Current Book :", this.book);
                                this.bookmarkBookTitle = data.book_title;
                                console.log('data title dari firebase :', this.bookmarkBookTitle);

                                if(this.book == this.bookmarkBookTitle){
                                    console.log("sama");
                                    this.bookmarkConfirm = 1;
                                } else {
                                    console.log("tidak sama");
                                    this.bookmarkConfirm = 0;
                                }
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

    doRefresh(refresher) {
        console.log('Begin async operation', refresher);
        //check login status
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
        setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    }
}
