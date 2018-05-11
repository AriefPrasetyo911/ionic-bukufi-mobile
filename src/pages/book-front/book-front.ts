import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BukufiRestProvider } from '../../providers/bukufi-rest/bukufi-rest';
import { BookDetailPage } from '../book-detail/book-detail';
import { BookListPage } from '../book-list/book-list';
import { LoginPage } from '../login/login';
import { SearchPage } from '../search/search';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';
import { UserAccountPage } from '../user-account/user-account';

@IonicPage()
@Component({
  selector: 'page-book-front',
  templateUrl: 'book-front.html',
})
export class BookFrontPage {
    popularBooks: any;
    newBooks: any;
    book:string;
    
    FBData: any;
    loggedin: boolean = false;
    
    isGoogleLogin: boolean = false;
    isFacebookLogin: boolean = false;
    userProfile: any = null;
    
    providerIDs: any;
    emailIDs: any;
    userIDs: any;
    regex = /\-/gi;

    constructor(public navCtrl: NavController, public navParams: NavParams, public bukufiRest: BukufiRestProvider, public fb: Facebook, public gPlus: GooglePlus) {
        this.getPopularBooks();
        this.getNewBooks();
        
        //segment
        this.book = 'popular-book';

        this.checkGoogleLoginStatus();
        this.checkFacebookLoginStatus();
    }

    ionViewDidLoad() {
        console.clear();
        console.log('====================');
        console.log('%c BookFrontPage Loaded', 'color: green; font-weight: bold;');
        console.log('====================');
        this.checkGoogleLoginStatus();
        this.checkFacebookLoginStatus();
    }

    getPopularBooks() {
        this.bukufiRest.getPopBooks()
        .then(data => {
            this.popularBooks = data;
            console.log('==> Popular Book :', this.popularBooks);
        });
    }

    getNewBooks(){
        this.bukufiRest.getNewBook()
        .then(data => {
            this.newBooks = data;
            console.log('==> New Books :', data);
        })
    }

    showDetailBook(book) {
        console.log('=> show detail book', book);
        this.navCtrl.push(BookDetailPage, {
            book: book
        });
    }

    //BOOK LISTS
    bookList(){
        this.navCtrl.push(BookListPage);
    }
  
    doRefresh(refresher) {
        console.log('Begin async operation', refresher);
        this.getPopularBooks();
        this.getNewBooks();
        this.checkGoogleLoginStatus();
        this.checkFacebookLoginStatus();
        setTimeout(() => {
            this.checkGoogleLoginStatus();
            this.checkFacebookLoginStatus();
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    }
    
    userInformation(){
        this.navCtrl.push(UserAccountPage)
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
                    console.log("=>%c Facebook User ID", 'color: green; font-weight: bold;', this.userIDs);
                    console.log("==========================");
                } else {
                    this.isFacebookLogin  = false;
                    console.log("==========================");
                    console.log("   FACEBOOK LOGIN CHECK   ");
                    console.log("--------------------------");
                    this.isFacebookLogin  = false;
                    this.userProfile = null;
                    console.log('==>%c Facebook Login Status :: DISCONNECTED ', 'background: red; color: white; font-weight: bold; display: block;');
                    console.log("=>%c isFacebookLogin status", 'color: red; font-weight: bold;', this.isFacebookLogin);
                    console.log("==========================");
                }
            })
        } else {
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
                console.log('=>%c isGoogleLogin status', 'color: green; font-weight: bold;', this.isGoogleLogin);
        
                this.providerIDs = "Google Plus";
                this.userIDs     = this.userProfile.userId;
                this.emailIDs    = this.userProfile.email;
                console.log("=>%c Google Plus User ID", 'color: green; font-weight: bold;', this.userIDs);
                console.log("==========================");
            } else {
                console.log('==>%c Google Plus Login Not Detected. Please Login', 'color: red; font-weight: bold;');
                this.isGoogleLogin  = false;
                this.loggedin  = false;
                console.log('=>%c isGoogleLogin status', 'color: red; font-weight: bold;', this.isGoogleLogin);
            }
        }).catch(error => {
            // this.userProfile = null;
            // this.loggedin    = false;
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
}