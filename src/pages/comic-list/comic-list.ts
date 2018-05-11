import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BukufiRestProvider } from '../../providers/bukufi-rest/bukufi-rest';
import { ComicDetailPage } from '../comic-detail/comic-detail';
import { Facebook } from '@ionic-native/facebook';
import { LoginPage } from '../login/login';
import { UserAccountPage } from '../user-account/user-account';
import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage()
@Component({
    selector: 'page-comic-list',
    templateUrl: 'comic-list.html',
})
export class ComicListPage {
    comicList: any;
    countComic:number;
    
    FBData: any;
    loggedin: boolean = false;
    userProfile: any = null;
    isGoogleLogin: boolean = false;
    isFacebookLogin: boolean = false;
    userIDs: any;
    
    constructor(public navCtrl: NavController, 
        public navParams: NavParams, 
        public bukufiRest: BukufiRestProvider, 
        public fb: Facebook,
        public gPlus: GooglePlus) {
        this.getComicList();
        this.checkLoginStatus();
        this.checkGoogleLoginStatus();
    }

    ionViewDidLoad() {
        console.clear();
        console.log('===> ComicListPage Loaded');
    }

    getComicList(){
        this.bukufiRest.getAllComic().then(data => {
            this.comicList = data;
            this.countComic = this.comicList.length;
            console.log('==> Count comic', this.countComic);
            console.log('==> Comic list', data);
        })
    }

    //===- SEARCH -===//
    initializeItems() {
        this.comicList = this.comicList;
        console.log('init item', this.comicList);
    }
    
    getItems(ev: any) {
        // Reset items back to all of the items
        this.initializeItems();
        
        // set val to the value of the searchbar
        let val = ev.target.value;
        
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.comicList = this.comicList.filter((item) => {
            return (item.comic_title_nodash.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }
    //===- END SEARCH -===//
  
    doRefresh(refresher) {
        console.log('Begin async operation', refresher);
        //check login status
        this.checkLoginStatus();
        this.checkGoogleLoginStatus();
        this.getComicList();
        setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
        }, 1500);
    }

    showDetailComic(comic){
        console.log('=> show detail comic', comic);
        this.navCtrl.push(ComicDetailPage, {
            comic: comic
        })
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

    loginFirst(){
        this.navCtrl.push(LoginPage);
    }

    userInformation(){
        this.navCtrl.push(UserAccountPage);
    }
}
