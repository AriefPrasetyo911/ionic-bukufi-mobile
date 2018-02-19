import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { ComicDetailPage } from '../comic-detail/comic-detail';
import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage()
@Component({
  selector: 'page-comic-bookmark',
  templateUrl: 'comic-bookmark.html',
})
export class ComicBookmarkPage {
	FBData: any;
	loggedin:boolean = false;
	isGoogleLogin: boolean = false;
  	isFacebookLogin: boolean = false;
  	isHaveBookmark: boolean;
  	userIDs: any;
  	userProfile: any = null;
  	regex: any = /\-/gi;

	BookmarkComic: AngularFireList<any>;
	myBookmarkComic: Array<any> = [];
  	bookmarkComicRef: firebase.database.Reference = firebase.database().ref(`/Bookmark-Comic`);

  	constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase, public fb: Facebook, public gPlus: GooglePlus) {
  		this.BookmarkComic  = afDatabase.list('/Bookmark-Comic');
  	}

	ionViewDidLoad() {
		console.log('===> ComicBookmarkPage loaded');
		this.getMyBookmark()
	    this.getMyBookmarkGooglePlus();
	}

  	getMyBookmark(){
	    this.fb.getLoginStatus().then(res => {
	      if(res.status == 'connect' || res.status == 'connected'){
	        firebase.auth().onAuthStateChanged(user => {
	          console.log("==========================");
	          console.log(" FACEBOOK BOOKMARK CHECK  ");
	          console.log("--------------------------");
	          this.FBData = user;
	          console.log("User Detected. Data facebook Login for this user:", this.FBData);
	          this.loggedin = true;
	          this.isFacebookLogin = true;
	          this.userIDs      = this.FBData.uid;
	          console.log('=> User ID Facebook:', this.userIDs);

	          this.bookmarkComicRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
	            this.myBookmarkComic = [];
	            dataFavourite.forEach(dataFv => {
	              this.myBookmarkComic.push(dataFv.val());
	              return false;
	            });

	            if(this.myBookmarkComic){
	              console.log('=> Bookmark Found. Count the Data :', this.myBookmarkComic.length);
	              console.log('=> The Data is :', this.myBookmarkComic);
	              this.isHaveBookmark = true;
	            }
	            else{
	              console.log("=> No Bookmark Data for this user", this.myBookmarkComic.length);
	              this.isHaveBookmark = false;
	            }
	          });
	          console.log("==========================");
	        });
	      }
	    }).catch(err => {
	      console.log(err);
	    });
  	}

  	getMyBookmarkGooglePlus(){
	    this.gPlus.trySilentLogin({}).then(stats => {
	      if(stats){
	        console.log("============================");
	        console.log(" GOOGLE PLUS BOOKMARK CHECK ");
	        console.log("----------------------------");
	        this.loggedin  = true;
	        this.isGoogleLogin = true;
	        this.userProfile = stats;
	        console.log('==> Waiting data for (Google Plus) login user .....', this.userProfile);

	        this.userIDs = this.userProfile.userId;
	        console.log("==> User ID Google Plus", this.userIDs);

	        this.bookmarkComicRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
	          this.myBookmarkComic = [];
	          dataFavourite.forEach(dataFv => {
	            this.myBookmarkComic.push(dataFv.val());
	            return false;
	          });

	          if(this.myBookmarkComic){
	            console.log('=> Bookmark Found. Count the Data :', this.myBookmarkComic.length);
	            console.log('=> The Data is :', this.myBookmarkComic);
	            this.isHaveBookmark = true;
	          }
	          else{
	            console.log("=> No Bookmark Data for this user", this.myBookmarkComic.length);
	            this.isHaveBookmark = false;
	          }
	        });
	        console.log("============================");
	      } else {
	        console.log("============================");
	        console.log(" GOOGLE PLUS BOOKMARK CHECK ");
	        console.log("----------------------------");
	        console.log('==> Hmmm, data for  (Google Plus) Login Not Found .....');
	        this.isGoogleLogin  = false;
	        this.loggedin  = false;
	        console.log('=> isGoogleLogin status', this.isGoogleLogin);
	        console.log("============================");
	      }
	    }).catch(error => {
	      // this.userProfile = null;
	      // this.loggedin    = false;
	      console.log("============================");
	      console.log(" GOOGLE PLUS BOOKMARK CHECK ");
	      console.log("----------------------------");
	      console.log('==> Google Plus Login Status :: DISCONNECTED');
	      this.isGoogleLogin  = false;
	      console.log('=> isGoogleLogin status', this.isGoogleLogin);
	      console.log("============================");
	    });
  	}

  	showDetailcomic(comic){
  		this.navCtrl.push(ComicDetailPage, {comic: comic});
  	}

  	doRefresh(refresher) {
	    console.log('Begin async operation', refresher);
	    this.getMyBookmark()
	    this.getMyBookmarkGooglePlus();
	    setTimeout(() => {
	      this.getMyBookmark()
	      this.getMyBookmarkGooglePlus();
	      console.log('Async operation has ended');
	      refresher.complete();
	    }, 2000);
	}
}
