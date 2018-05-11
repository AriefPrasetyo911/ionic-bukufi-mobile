import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BukufiRestProvider } from '../../providers/bukufi-rest/bukufi-rest';
import { BookDetailPage } from '../book-detail/book-detail';
import { LoginPage } from '../login/login';
import { Facebook } from '@ionic-native/facebook';
import { UserAccountPage } from '../user-account/user-account';
import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage()
@Component({
    selector: 'page-book-list',
    templateUrl: 'book-list.html',
})
export class BookListPage {
    allBooks: any;
    FBData: any;
    loggedin: boolean = false;
    countBook: number;
    userProfile: any = null;
    isGoogleLogin: boolean = false;
    isFacebookLogin: boolean = false;
    userIDs: any;
    
    constructor(public navCtrl: NavController, 
        public navParams: NavParams, 
        public bukufiRest: BukufiRestProvider, 
        public fb: Facebook,
        public gPlus: GooglePlus) {
        this.getAllBooks();
        this.checkLoginStatus();
        this.checkGoogleLoginStatus();
    }

    ionViewDidLoad() {
        console.clear();
        console.log('===> BookListPage Loaded');
    }

    getAllBooks(){
        this.bukufiRest.getAllBook().then(data => {
            this.allBooks = data;
            this.countBook = this.allBooks.length;
            console.log("==> Count Book :", this.countBook);
            console.log('==> List all book :', data);
        });
    }

    //===- SEARCH -===//
    initializeItems() {
        this.allBooks = this.allBooks;
        console.log('==> Re-init item', this.allBooks);
    }
    
    getItems(ev: any) {
        // Reset items back to all of the items
        this.initializeItems();
        
        // set val to the value of the searchbar
        let val = ev.target.value;
        
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.allBooks = this.allBooks.filter((item) => {
            return (item.book_title_nodash.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }
    //===- END SEARCH -===//
  
    doRefresh(refresher) {
        console.log('Begin async operation', refresher);
        //check login status
        this.getAllBooks();
        setTimeout(() => {
            //check login status
            console.log('Async operation has ended');
            refresher.complete();
        }, 1500);
    }

    showDetailBook(book) {
        console.log('==> show detail book', book);
        this.navCtrl.push(BookDetailPage, {
            book: book
        });
    }

    userInformation(){
        this.navCtrl.push(UserAccountPage);
    }

    loginFirst(){
        this.navCtrl.push(LoginPage);
    }

    //===- FACEBOOK -===//
    checkLoginStatus(){
        this.fb.getLoginStatus().then(res => {
            if(res.status == 'connect' || res.status == 'connected'){
                this.FBData = res;
                console.log('data', this.FBData);
                this.loggedin  = true;
                this.isFacebookLogin = true;
                console.log('==>%c Facebook Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
                console.log('=>%c isFacebookLogin status', 'color: green; font-weight: bold;', this.isFacebookLogin);

                this.userIDs = this.FBData.authResponse.userID;
                console.log("=>%c Facebook User ID", 'color: green; font-weight: bold;', this.userIDs);
            } else {
                console.log('==>%c Facebook Login Status :: DISCONECTED ', 'background: red; color: white; font-weight: bold; display: block;');
                this.loggedin  = false;
                this.isFacebookLogin = false;
                //this.loggedin  = res.status;
                console.log('=>%c isFacebookLogin status value', 'color: red; font-weight: bold;', this.isFacebookLogin);
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
                // console.log(" GOOGLE PLUS LOGIN CHECK ");
                // console.log("--------------------------");
                this.userProfile = stats;
                this.loggedin  = true;
                this.isGoogleLogin = true;
                console.log('==>%c Google Plus Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
                console.log('=>%c isGoogleLogin status', 'color: green; font-weight: bold;', this.isGoogleLogin);
        
                this.userIDs     = this.userProfile.userId;
                console.log("=>%c Google Plus User ID", 'color: green; font-weight: bold;', this.userIDs);
                console.log("==========================");
            } else {
                console.log('==>%c Google Plus Login Not Found, Please Login', 'color: red; font-weight: bold;');
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