webpackJsonp([1],{

/***/ 525:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComicBookmarkPageModule", function() { return ComicBookmarkPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__comic_bookmark__ = __webpack_require__(537);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ComicBookmarkPageModule = (function () {
    function ComicBookmarkPageModule() {
    }
    return ComicBookmarkPageModule;
}());
ComicBookmarkPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__comic_bookmark__["a" /* ComicBookmarkPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__comic_bookmark__["a" /* ComicBookmarkPage */]),
        ],
    })
], ComicBookmarkPageModule);

//# sourceMappingURL=comic-bookmark.module.js.map

/***/ }),

/***/ 537:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComicBookmarkPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__comic_detail_comic_detail__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_plus__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ComicBookmarkPage = (function () {
    function ComicBookmarkPage(navCtrl, navParams, afDatabase, fb, gPlus) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afDatabase = afDatabase;
        this.fb = fb;
        this.gPlus = gPlus;
        this.loggedin = false;
        this.isGoogleLogin = false;
        this.isFacebookLogin = false;
        this.userProfile = null;
        this.regex = /\-/gi;
        this.myBookmarkComic = [];
        this.bookmarkComicRef = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref("/Bookmark-Comic");
        this.BookmarkComic = afDatabase.list('/Bookmark-Comic');
    }
    ComicBookmarkPage.prototype.ionViewDidLoad = function () {
        console.log('===> ComicBookmarkPage loaded');
        this.getMyBookmark();
        this.getMyBookmarkGooglePlus();
    };
    ComicBookmarkPage.prototype.getMyBookmark = function () {
        var _this = this;
        this.fb.getLoginStatus().then(function (res) {
            if (res.status == 'connect' || res.status == 'connected') {
                __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth().onAuthStateChanged(function (user) {
                    console.log("==========================");
                    console.log(" FACEBOOK BOOKMARK CHECK  ");
                    console.log("--------------------------");
                    _this.FBData = user;
                    console.log("User Detected. Data facebook Login for this user:", _this.FBData);
                    _this.loggedin = true;
                    _this.isFacebookLogin = true;
                    _this.userIDs = _this.FBData.uid;
                    console.log('=> User ID Facebook:', _this.userIDs);
                    _this.bookmarkComicRef.orderByChild("userID").equalTo(_this.userIDs).on('value', function (dataFavourite) {
                        _this.myBookmarkComic = [];
                        dataFavourite.forEach(function (dataFv) {
                            _this.myBookmarkComic.push(dataFv.val());
                            return false;
                        });
                        if (_this.myBookmarkComic) {
                            console.log('=> Bookmark Found. Count the Data :', _this.myBookmarkComic.length);
                            console.log('=> The Data is :', _this.myBookmarkComic);
                            _this.isHaveBookmark = true;
                        }
                        else {
                            console.log("=> No Bookmark Data for this user", _this.myBookmarkComic.length);
                            _this.isHaveBookmark = false;
                        }
                    });
                    console.log("==========================");
                });
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    ComicBookmarkPage.prototype.getMyBookmarkGooglePlus = function () {
        var _this = this;
        this.gPlus.trySilentLogin({}).then(function (stats) {
            if (stats) {
                console.log("============================");
                console.log(" GOOGLE PLUS BOOKMARK CHECK ");
                console.log("----------------------------");
                _this.loggedin = true;
                _this.isGoogleLogin = true;
                _this.userProfile = stats;
                console.log('==> Waiting data for (Google Plus) login user .....', _this.userProfile);
                _this.userIDs = _this.userProfile.userId;
                console.log("==> User ID Google Plus", _this.userIDs);
                _this.bookmarkComicRef.orderByChild("userID").equalTo(_this.userIDs).on('value', function (dataFavourite) {
                    _this.myBookmarkComic = [];
                    dataFavourite.forEach(function (dataFv) {
                        _this.myBookmarkComic.push(dataFv.val());
                        return false;
                    });
                    if (_this.myBookmarkComic) {
                        console.log('=> Bookmark Found. Count the Data :', _this.myBookmarkComic.length);
                        console.log('=> The Data is :', _this.myBookmarkComic);
                        _this.isHaveBookmark = true;
                    }
                    else {
                        console.log("=> No Bookmark Data for this user", _this.myBookmarkComic.length);
                        _this.isHaveBookmark = false;
                    }
                });
                console.log("============================");
            }
            else {
                console.log("============================");
                console.log(" GOOGLE PLUS BOOKMARK CHECK ");
                console.log("----------------------------");
                console.log('==> Hmmm, data for  (Google Plus) Login Not Found .....');
                _this.isGoogleLogin = false;
                _this.loggedin = false;
                console.log('=> isGoogleLogin status', _this.isGoogleLogin);
                console.log("============================");
            }
        }).catch(function (error) {
            // this.userProfile = null;
            // this.loggedin    = false;
            console.log("============================");
            console.log(" GOOGLE PLUS BOOKMARK CHECK ");
            console.log("----------------------------");
            console.log('==> Google Plus Login Status :: DISCONNECTED');
            _this.isGoogleLogin = false;
            console.log('=> isGoogleLogin status', _this.isGoogleLogin);
            console.log("============================");
        });
    };
    ComicBookmarkPage.prototype.showDetailcomic = function (comic) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__comic_detail_comic_detail__["a" /* ComicDetailPage */], { comic: comic });
    };
    ComicBookmarkPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        console.log('Begin async operation', refresher);
        this.getMyBookmark();
        this.getMyBookmarkGooglePlus();
        setTimeout(function () {
            _this.getMyBookmark();
            _this.getMyBookmarkGooglePlus();
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    return ComicBookmarkPage;
}());
ComicBookmarkPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-comic-bookmark',template:/*ion-inline-start:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\comic-bookmark\comic-bookmark.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Your Bookmark Comic</ion-title>\n\n    <ion-buttons end>\n\n      <div *ngIf="loggedin == false; else loginTrue">\n\n        <button ion-button class="login-indicator-false">\n\n          <ion-icon name="sunny" end></ion-icon>\n\n        </button>\n\n      </div>\n\n      <ng-template #loginTrue>\n\n          <div *ngIf="isFacebookLogin == true">\n\n            <button ion-button class="login-indicator-true">\n\n              <ion-icon name="logo-facebook"></ion-icon>\n\n            </button>\n\n          </div>\n\n          <div *ngIf="isGoogleLogin == true">\n\n            <button ion-button class="login-indicator-true">\n\n              <ion-icon name="logo-googleplus"></ion-icon>\n\n            </button>\n\n          </div>\n\n      </ng-template>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n	<ion-list inset>\n\n	    <div *ngIf="myBookmarkComic.length > 0; else notExist">\n\n	      <button ion-item *ngFor="let bookmark of myBookmarkComic" (tap)="showDetailcomic(bookmark.comic_title)">\n\n	        <h2>{{bookmark.comic_title.replace(regex, \' \')}}</h2>\n\n	        <h3>{{bookmark.comic_author.replace(regex, \' \')}}</h3>\n\n	        <h3>{{bookmark.comic_genre}}</h3>\n\n	        <h3>{{bookmark.comic_release}}</h3>\n\n	      </button> \n\n	    </div>\n\n	    <ng-template #notExist>\n\n	      <button ion-item text-center class="takAda">\n\n	        <h2>You not have bookmark for any comic</h2>\n\n	      </button>\n\n	    </ng-template>\n\n	</ion-list>\n\n\n\n	<ion-refresher (ionRefresh)="doRefresh($event)">\n\n	    <ion-refresher-content \n\n	      pullingText="Pull to refresh"\n\n	      pullingIcon="arrow-dropdown"\n\n	      refreshingSpinner="circles"\n\n	      refreshingText="fetching data ...">\n\n	    </ion-refresher-content>\n\n	</ion-refresher>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\comic-bookmark\comic-bookmark.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_plus__["a" /* GooglePlus */]])
], ComicBookmarkPage);

//# sourceMappingURL=comic-bookmark.js.map

/***/ })

});
//# sourceMappingURL=1.js.map