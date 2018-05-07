import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BukufiRestProvider } from '../../providers/bukufi-rest/bukufi-rest';
import { ComicDetailPage } from '../comic-detail/comic-detail';
import { ComicListPage } from '../comic-list/comic-list';
import { LoginPage } from '../login/login';
import { SearchPage } from '../search/search';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';
import { UserAccountPage } from '../user-account/user-account';

@IonicPage()
@Component({
  selector: 'page-comic-front',
  templateUrl: 'comic-front.html',
})
export class ComicFrontPage {
    popularComic: any;
    newComic: any;
    comic: string;
    
    FBData: any;
    loggedin: boolean = false;
    
    isGoogleLogin: boolean = false;
    isFacebookLogin: boolean = false;
    userProfile: any = null;
    
    providerIDs: any;
    emailIDs: any;
    userIDs: any;
    regex = /\-/gi;

    constructor(public navCtrl: NavController, 
        public navParams: NavParams, 
        public bukufiRest: BukufiRestProvider, 
        public fb: Facebook, 
        public gPlus: GooglePlus) {
            this.getNewComic();
            this.getPopularComic();
            this.comic = "popular-comic";

            this.checkFacebookLoginStatus();
            this.checkGoogleLoginStatus();
    }

    ionViewDidLoad() {
        console.clear();
        console.log('=====================');
        console.log('ComicFrontPage Loaded');
        console.log('=====================');
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
    }

    getPopularComic(){
        this.bukufiRest.getPopComic().then(data => {
            this.popularComic = data;
            console.log('==> popular comic', data);
        })
    }

    getNewComic(){
        this.bukufiRest.getNewComic().then(data => {
            this.newComic = data;
            console.log('==> new comic', data);
        })
    }

    doRefresh(refresher) {
        console.log('Begin async operation', refresher);
        //check login status
        this.getPopularComic();
        this.getNewComic();
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
        setTimeout(() => {
            this.checkFacebookLoginStatus();
            this.checkGoogleLoginStatus();
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    }

    showDetailComic(comic){
        console.log('=> show detail comic', comic);
        this.navCtrl.push(ComicDetailPage, {
            comic: comic
        })
    }

    comicList(){
        this.navCtrl.push(ComicListPage);
    }

    userInformation(){
        this.navCtrl.push(UserAccountPage);
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
            } else{
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
            //   console.log('==> Hmmm, waiting data for  (Google Plus) Login .....', this.userProfile);
        
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
                console.log('=>%c Google Plus Login Not Detected, Please Login', 'color: red; font-weight: bold;');
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