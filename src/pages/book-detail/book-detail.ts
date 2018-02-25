import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  
  book_detail: any;
  book: any;
  book_counter: any;
  book_counter_exist: any;
  isHaveCounter: boolean = false;
  book_statictic: any;
  book_statistic_exist: any;
  isHaveStatistic: boolean;
  loggedin: boolean = false;
  isFacebookLogin: boolean = false;
  isGoogleLogin: boolean = false;
  FBData: any;

  bookAuthor: any;
  bookPublisher: any;
  bookRelease: number;
  providerIDs: any;
  emailIDs: any;

  result: any;
  objResult: any;
  gResult: any;
  gObjRes: any;
  userIDs: any;
  userProfile: any = null;
  userProfileLength: number;

  //book review
  bookReveiew: any;
  checkAvailableReview: number = 0;

  //checking data favourite
  book_title_: any;
  isHavefavourite: boolean;
  isHaveBookmark: boolean;

  public myFav: Array<any> = [];
  public favoRef: firebase.database.Reference = firebase.database().ref(`/Favourite-book`);

  favBook: AngularFireList<any>;
  BookmarkBook: AngularFireList<any>;
  
  public myBookmark: Array<any> = [];
  public bookmarkRef: firebase.database.Reference = firebase.database().ref(`/Bookmark-book`);

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public bukufiRest: BukufiRestProvider, 
    public fb: Facebook, 
    public gPlus: GooglePlus,
    public afDatabase: AngularFireDatabase, 
    public alertCtrl: AlertController) {
      this.book = this.navParams.get('book');
      console.log('==> Parameter from HomePage: ',this.book);

    this.getDetail();
    this.getCounter();
    this.getBookReview();
    this.getBookProsenStatistic();
    
    this.checkFacebookLoginStatus();
    this.checkGoogleLoginStatus();

    //create database reference
    this.favBook       = afDatabase.list('/Favourite-book');
    this.BookmarkBook  = afDatabase.list('/Bookmark-book');
  }

  ionViewDidLoad() {
    console.log('===> BookDetailPage loaded');
  }

  getDetail(){
    this.bukufiRest.getDetailBook(this.book)
      .then(data => {
        this.book_detail = data;
        console.log('==> Detail Book :', this.book_detail);
        
        //for bookmark and favourite
        for(let favTemp of this.book_detail){
          this.bookAuthor     = favTemp.book_author;
          this.bookPublisher  = favTemp.book_publisher;
          this.bookRelease    = favTemp.book_release;
        }
      });
  }

  //===- GET COUNTER -===//
  getCounter(){
    this.bukufiRest.getCounterBook(this.book).then(data => {
      this.book_counter = data;
      console.log('==> Book Counter :',data);
      if(this.book_counter){
        this.isHaveCounter = true;
        this.book_counter_exist = this.book_counter;
        console.log('==> Book counter EXIST');
      }
      else{
        console.log('==> Book counter NOT EXIST');
        this.isHaveCounter = false;
      }
    });
  }
  //===- END GET COUNTER -===//

  /*===- GET BOOK REVIEW -===*/
  getBookReview(){
   this.bukufiRest.getReviewBook(this.book).then(data => {
      this.bookReveiew = data;

      if(this.bookReveiew.length > 0){
        this.checkAvailableReview = 1;
        console.log('=-> Ada Review Buku :', this.checkAvailableReview);
      }
      else{
        this.checkAvailableReview = 0;
        console.log('=-> Tidak Ada Review Buku :', this.checkAvailableReview);
      }
    });
  }
  /*===- END GET BOOK REVIEW -===*/

  /*===- GET BOOK STATISTIC -===*/
  getBookProsenStatistic(){
    this.bukufiRest.getBookStatisticonProsen(this.book).then(data => {
      this.book_statictic  = data;
      console.log('==> Book statistic :',data);
      if(this.book_statictic){
        this.isHaveStatistic = true;
        this.book_statistic_exist = this.book_statictic;
        console.log('=> Book Statistic EXIST', this.book_statistic_exist);
      }
      else{
        this.isHaveStatistic = false;
        console.log("=> Book Statistic DOESN'T EXIST");
      }
    }, err => {
      console.log(err);
    })
  }
  /*===- END BOK STATISTIC -===*/

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
            const newFavBookRef = this.favBook.push({});
   
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
