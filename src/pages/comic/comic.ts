import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BukufiRestProvider } from '../../providers/bukufi-rest/bukufi-rest';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';
import { Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-comic',
  templateUrl: 'comic.html',
})
export class ComicPage {
    @ViewChild('slides') slides: Slides;

    comic_title: any;
    comic_chapter: any;
    comic: any;
    regex: any = /\-/gi;
    countPages: number;
    countPagesNonLogin: number;
    
    loggedin:boolean = false;
    comics:any = [];
    comicsNonLogin: any = [];
    FBData: any;
    
    isGoogleLogin: boolean = false;
    isFacebookLogin: boolean = false;
    userProfile: any = null;
    userIDs: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public bukufiRest: BukufiRestProvider, public fb: Facebook,  public gPlus: GooglePlus) {
        this.comic_title = this.navParams.get('comic_title');
        console.log('==> comic title', this.comic_title);
        
        this.comic_chapter = this.navParams.get('comic_chapter');
        console.log('==> comic chapter', this.comic_chapter);
        
        console.log('==> Initialize first time Loggedin status', this.loggedin);
    }

    ionViewDidLoad() {
        console.clear();
        console.log('===> ComicPage Loaded');
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
    }

    showComic(){
        this.bukufiRest.readComic(this.comic_title, this.comic_chapter).then(data => {
            this.comics = data;
            this.countPages = this.comics.length;
            console.log('==>%c Load Full Comic ', 'background: green; color: white; font-weight: bold; display: block;');
            console.log("Count Pages", this.countPages);
        })
    }

    ShowComicForNonloginUser(){
        this.bukufiRest.readComicNonloginUser(this.comic_title, this.comic_chapter).then(data => {
            this.comicsNonLogin = data;
            this.countPagesNonLogin = this.comicsNonLogin.length;
            console.log('==>%c Load Comic for Non Login User ', 'background: red; color: white; font-weight: bold; display: block;');
            console.log("Count Pages", this.countPagesNonLogin);
        })
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

                    this.userIDs     = this.userProfile.uid;
                    console.log("=>%c Facebook User ID", 'color: green; font-weight: bold;', this.userIDs);
                    console.log("==========================");
    
                    this.showComic();
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
    
                    this.ShowComicForNonloginUser();
                }
            })
        }

        else{
            console.log('==>%c Facebook Login Status :: DISCONECTED ', 'background: red; color: white; font-weight: bold; display: block;');
            this.loggedin  = false;
            this.isFacebookLogin  = false;
            console.log('=>%c isFacebookLogin status', 'color: red; font-weight: bold;', this.isFacebookLogin);

            this.ShowComicForNonloginUser();
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
                this.loggedin  = true;
                this.isGoogleLogin = true;
                console.log('==>%c Google Plus Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
                console.log('==>%c isGoogleLogin status', 'color: green; font-weight: bold;', this.isGoogleLogin);
                this.userProfile = stats;
                // console.log('==> Waiting data for  (Google Plus) Login .....', this.userProfile);
                console.log("==========================");
    
                this.showComic();
            } else {
                console.log("==========================");
                console.log(" GOOGLE PLUS LOGIN CHECK ");
                console.log("--------------------------");
                console.log('==>%c Google Plus Login Not Detected ', 'background: red; color: white; font-weight: bold; display: block;');
                this.isGoogleLogin  = false;
                this.loggedin  = false;
                console.log('=>%c isGoogleLogin status', 'color: red; font-weight: bold;', this.isGoogleLogin);
                console.log("==========================");
    
                this.ShowComicForNonloginUser();
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
    
            this.ShowComicForNonloginUser();
        });
    }
    //===- END -===//

    doRefresh(refresher) {
        console.log('Begin async operation', refresher);
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
        setTimeout(() => {
            this.checkFacebookLoginStatus();
            this.checkGoogleLoginStatus();
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    }

    next() {
        this.slides.slideNext();
    }
    
    prev() {
        this.slides.slidePrev();
    }

}
