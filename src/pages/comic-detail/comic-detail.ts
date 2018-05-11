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
import { UserAccountPage } from '../user-account/user-account';

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
    comicReview: any;
    checkAvailableReview: number = 0;
    
    comicCounter: any;
    isHaveCounter: boolean = false;
    comicCounterExist: any;
    
    comicStatistic: any;
    isHaveStatistic: boolean;
    comicStatisticExist: any;

    comicRating: any;
    comicRating_totalView: any;
    
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
            this.getComicReview();
            // this.getComicCounter();
            this.getComicStatistic();
        
            //create database reference
            this.favouriteComic = afDatabase.list('/Favourite-Comic');
            this.BookmarkComic  = afDatabase.list('/Bookmark-Comic');
            console.clear();
    }

    ionViewDidLoad() {
        console.clear();
        console.log("===========================");
        console.log('===> ComicDetailPage Loaded');
        console.log("===========================");
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
        this.navCtrl.push(ComicPage, {
            comic_title: comic_title, 
            comic_chapter: comic_chapter
        });
    }

    loginFirst(){
        this.navCtrl.push(LoginPage);
    }

    userInformation(){
        this.navCtrl.push(UserAccountPage);
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
                    // console.log('==> User Facebook Login Data', this.userProfile);
                    this.loggedin = true;
                    this.isFacebookLogin  = true;
                    console.log('==>%c Facebook Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
                    console.log("=>%c isFacebookLogin status", 'color: green; font-weight: bold;', this.isFacebookLogin);
                    
                    
                    this.providerIDs = "Facebook";
                    this.userIDs     = this.userProfile.uid;
                    this.emailIDs    = this.userProfile.email;
                    console.log("=>%c Facebook User ID", 'color: green; font-weight: bold;', this.userIDs);
                    console.log("==========================");
                }
                else{
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
                // console.log('==> Hmmm, waiting data for  (Google Plus) Login .....', this.userProfile);
    
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
                console.log('==>%c Google Plus Login Status :: DISCONECTED ', 'background: red; color: white; font-weight: bold; display: block;');
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
            console.log('==>%c Google Plus Login Not Detected. Please Login ', 'background: red; color: white; font-weight: bold; display: block;');
            this.isGoogleLogin  = false;
            console.log('=>%c isGoogleLogin status', 'color: red; font-weight: bold;', this.isGoogleLogin);
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

    getComicReview(){
        this.bukufiRest.getComicReview(this.comic).then(res => {
            this.comicReview = res;
            console.log('==> Comic review :', this.comicReview);
            
            if(this.comicReview.length > 0){
            this.checkAvailableReview = 1;
            console.log('=-> Ada Review Buku :', this.checkAvailableReview);
            }
            else{
            this.checkAvailableReview = 0;
            console.log('=-> Tidak Ada Review Buku :', this.checkAvailableReview);
            }
        })
    }
  
    /*===- GET COMIC STATISTIC -===*/
    getComicStatistic(){
        this.bukufiRest.getComicStatisticonProsen(this.comic).then(data => {
            this.comicStatistic  = data;
            
            if(this.comicStatistic.avg_rating || this.comicStatistic.total_vote){
                this.isHaveStatistic = true;
                this.comicStatisticExist = this.comicStatistic;
                console.log('=>%c Comic Statistic EXIST ', 'background: green; color: white; font-weight: bold; display: block;');

                this.comicRating = this.comicStatistic.avg_rating;
                console.log('%c Comic rating: ', 'color: green; font-weight: bold;', this.comicRating);

                this.comicRating_totalView = this.comicStatistic.total_vote;
                console.log('%c Total data vote', 'color: green; font-weight: bold;', this.comicRating_totalView);
            }
            else{
                this.isHaveStatistic = false;
                this.comicRating = 0;
                console.log("=> Comic Statistic DOESN'T EXIST");
            }
        }, err => {
            console.log(err);
        })
    }
    /*===- END COMIC STATISTIC -===*/
}
