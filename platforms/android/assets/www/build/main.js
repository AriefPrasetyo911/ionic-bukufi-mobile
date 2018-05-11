webpackJsonp([14],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComicListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__comic_detail_comic_detail__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_facebook__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__user_account_user_account__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_plus__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ComicListPage = (function () {
    function ComicListPage(navCtrl, navParams, bukufiRest, fb, gPlus) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.bukufiRest = bukufiRest;
        this.fb = fb;
        this.gPlus = gPlus;
        this.loggedin = false;
        this.userProfile = null;
        this.isGoogleLogin = false;
        this.isFacebookLogin = false;
        this.getComicList();
        this.checkLoginStatus();
        this.checkGoogleLoginStatus();
    }
    ComicListPage.prototype.ionViewDidLoad = function () {
        console.clear();
        console.log('===> ComicListPage Loaded');
    };
    ComicListPage.prototype.getComicList = function () {
        var _this = this;
        this.bukufiRest.getAllComic().then(function (data) {
            _this.comicList = data;
            _this.countComic = _this.comicList.length;
            console.log('==> Count comic', _this.countComic);
            console.log('==> Comic list', data);
        });
    };
    //===- SEARCH -===//
    ComicListPage.prototype.initializeItems = function () {
        this.comicList = this.comicList;
        console.log('init item', this.comicList);
    };
    ComicListPage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        this.initializeItems();
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.comicList = this.comicList.filter(function (item) {
                return (item.comic_title_nodash.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    //===- END SEARCH -===//
    ComicListPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        //check login status
        this.checkLoginStatus();
        this.checkGoogleLoginStatus();
        this.getComicList();
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
        }, 1500);
    };
    ComicListPage.prototype.showDetailComic = function (comic) {
        console.log('=> show detail comic', comic);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__comic_detail_comic_detail__["a" /* ComicDetailPage */], {
            comic: comic
        });
    };
    //===- FACEBOOK -===//
    ComicListPage.prototype.checkLoginStatus = function () {
        var _this = this;
        this.fb.getLoginStatus().then(function (res) {
            if (res.status == 'connect' || res.status == 'connected') {
                _this.FBData = res;
                console.log('data', _this.FBData);
                _this.loggedin = true;
                _this.isFacebookLogin = true;
                console.log('==>%c Facebook Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
                console.log('=>%c isFacebookLogin status', 'color: green; font-weight: bold;', _this.isFacebookLogin);
                _this.userIDs = _this.FBData.authResponse.userID;
                console.log("=>%c Facebook User ID", 'color: green; font-weight: bold;', _this.userIDs);
            }
            else {
                console.log('==>%c Facebook Login Status :: DISCONECTED ', 'background: red; color: white; font-weight: bold; display: block;');
                _this.loggedin = false;
                _this.isFacebookLogin = false;
                //this.loggedin  = res.status;
                console.log('=>%c isFacebookLogin status value', 'color: red; font-weight: bold;', _this.isFacebookLogin);
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    //===- END -===//
    //===- GOOGLE CHECK -===//
    ComicListPage.prototype.checkGoogleLoginStatus = function () {
        var _this = this;
        this.gPlus.trySilentLogin({}).then(function (stats) {
            if (stats) {
                console.log("==========================");
                // console.log(" GOOGLE PLUS LOGIN CHECK ");
                // console.log("--------------------------");
                _this.userProfile = stats;
                _this.loggedin = true;
                _this.isGoogleLogin = true;
                console.log('==>%c Google Plus Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
                console.log('=>%c isGoogleLogin status', 'color: green; font-weight: bold;', _this.isGoogleLogin);
                _this.userIDs = _this.userProfile.userId;
                console.log("=>%c Google Plus User ID", 'color: green; font-weight: bold;', _this.userIDs);
                console.log("==========================");
            }
            else {
                console.log('==>%c Google Plus Login Not Found, Please Login', 'color: red; font-weight: bold;');
                _this.isGoogleLogin = false;
                _this.loggedin = false;
                console.log('=>%c isGoogleLogin status', 'color: red; font-weight: bold;', _this.isGoogleLogin);
            }
        }).catch(function (error) {
            // this.userProfile = null;
            // this.loggedin    = false;
            console.log("==========================");
            console.log(" GOOGLE PLUS LOGIN CHECK ");
            console.log("--------------------------");
            console.log('==>%c Google Plus Login Status :: DISCONNECTED ', 'background: red; color: white; font-weight: bold; display: block;');
            _this.isGoogleLogin = false;
            console.log('=>%c isGoogleLogin status', 'color: red; font-weight: bold;', _this.isGoogleLogin);
            console.log("==========================");
        });
    };
    //===- END -===//
    ComicListPage.prototype.loginFirst = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
    };
    ComicListPage.prototype.userInformation = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__user_account_user_account__["a" /* UserAccountPage */]);
    };
    return ComicListPage;
}());
ComicListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-comic-list',template:/*ion-inline-start:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\comic-list\comic-list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Search</ion-title>\n\n    <ion-buttons end>\n\n        <div *ngIf="loggedin == false; else loginTrue">\n\n            <button ion-button class="login-indicator-false">\n\n            <ion-icon name="sunny" end></ion-icon>\n\n            </button>\n\n        </div>\n\n        <ng-template #loginTrue>\n\n            <div *ngIf="isFacebookLogin == true">\n\n                <button ion-button class="login-indicator-true">\n\n                <ion-icon name="logo-facebook"></ion-icon>\n\n                </button>\n\n            </div>\n\n            <div *ngIf="isGoogleLogin == true">\n\n                <button ion-button class="login-indicator-true">\n\n                <ion-icon name="logo-googleplus"></ion-icon>\n\n                </button>\n\n            </div>\n\n        </ng-template>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <ion-searchbar [(ngModel)]="keyword" (ionInput)="getItems($event)" [debounce]="500" placeholder="Enter Keyword here ..."></ion-searchbar>\n\n    <ion-card *ngFor="let comic of comicList">\n\n        <ion-card-content>\n\n            <ion-grid (tap)="showDetailComic(comic.comic_title)">\n\n                <ion-row>\n\n                    <ion-col col-4>\n\n                        <img src="http://bukufi.com/storage/comic/comic_cover/{{comic.comic_image}}">\n\n                    </ion-col>\n\n                    <ion-col col-8>\n\n                        <p id="title">{{comic.comic_title_nodash}}</p>\n\n                        <p id="author">{{comic.comic_author_nodash}}</p>\n\n                        <p id="release">{{comic.comic_release}}</p>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-grid>\n\n        </ion-card-content>  \n\n    </ion-card>\n\n\n\n  <!--FAB BOTTOM RIGHT-->\n\n  <ion-fab right bottom #fab2>\n\n    <button ion-fab mini color="primary"><ion-icon name="apps"></ion-icon></button>\n\n    <ion-fab-list side="top">\n\n      <div *ngIf="loggedin == true; else loginfirst">\n\n        <button ion-fab (click)="userInformation()">\n\n          <ion-icon name="information-circle"></ion-icon>\n\n        </button>\n\n      </div>\n\n      <ng-template #loginfirst>\n\n        <button ion-fab (click)="loginFirst()">\n\n          <ion-icon name="log-in"></ion-icon>\n\n        </button>\n\n      </ng-template>\n\n    </ion-fab-list>\n\n  </ion-fab>\n\n\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content \n\n    pullingText="Pull to refresh"\n\n    pullingIcon="arrow-dropdown"\n\n    refreshingSpinner="circles"\n\n    refreshingText="fetching data ..."></ion-refresher-content>\n\n  </ion-refresher>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\comic-list\comic-list.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__["a" /* BukufiRestProvider */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_plus__["a" /* GooglePlus */]])
], ComicListPage);

//# sourceMappingURL=comic-list.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComicPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ComicPage = (function () {
    function ComicPage(navCtrl, navParams, bukufiRest, fb, gPlus) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.bukufiRest = bukufiRest;
        this.fb = fb;
        this.gPlus = gPlus;
        this.regex = /\-/gi;
        this.loggedin = false;
        this.comics = [];
        this.comicsNonLogin = [];
        this.isGoogleLogin = false;
        this.isFacebookLogin = false;
        this.userProfile = null;
        this.comic_title = this.navParams.get('comic_title');
        console.log('==> comic title', this.comic_title);
        this.comic_chapter = this.navParams.get('comic_chapter');
        console.log('==> comic chapter', this.comic_chapter);
        console.log('==> Initialize first time Loggedin status', this.loggedin);
    }
    ComicPage.prototype.ionViewDidLoad = function () {
        console.clear();
        console.log('===> ComicPage Loaded');
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
    };
    ComicPage.prototype.showComic = function () {
        var _this = this;
        this.bukufiRest.readComic(this.comic_title, this.comic_chapter).then(function (data) {
            _this.comics = data;
            _this.countPages = _this.comics.length;
            console.log('==>%c Load Full Comic ', 'background: green; color: white; font-weight: bold; display: block;');
            console.log("Count Pages", _this.countPages);
        });
    };
    ComicPage.prototype.ShowComicForNonloginUser = function () {
        var _this = this;
        this.bukufiRest.readComicNonloginUser(this.comic_title, this.comic_chapter).then(function (data) {
            _this.comicsNonLogin = data;
            _this.countPagesNonLogin = _this.comicsNonLogin.length;
            console.log('==>%c Load Comic for Non Login User ', 'background: red; color: white; font-weight: bold; display: block;');
            console.log("Count Pages", _this.countPagesNonLogin);
        });
    };
    //===- FACEBOOK CHECK -===//
    ComicPage.prototype.checkFacebookLoginStatus = function () {
        var _this = this;
        this.fb.getLoginStatus().then(function (res) {
            if (res.status == 'connect' || res.status == 'connected') {
                __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        console.log("==========================");
                        console.log("   FACEBOOK LOGIN CHECK   ");
                        console.log("--------------------------");
                        _this.userProfile = user;
                        // console.log('==> User Facebook Login Data', this.userProfile);
                        _this.loggedin = true;
                        _this.isFacebookLogin = true;
                        console.log('==>%c Facebook Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
                        console.log("=>%c isFacebookLogin status", 'color: green; font-weight: bold;', _this.isFacebookLogin);
                        _this.userIDs = _this.userProfile.uid;
                        console.log("=>%c Facebook User ID", 'color: green; font-weight: bold;', _this.userIDs);
                        console.log("==========================");
                        _this.showComic();
                    }
                    else {
                        _this.isFacebookLogin = false;
                        console.log("==========================");
                        console.log("   FACEBOOK LOGIN CHECK   ");
                        console.log("--------------------------");
                        _this.isFacebookLogin = false;
                        _this.userProfile = null;
                        console.log('==>%c Facebook Login Status :: DISCONNECTED ', 'background: red; color: white; font-weight: bold; display: block;');
                        console.log("=>%c isFacebookLogin status", 'color: red; font-weight: bold;', _this.isFacebookLogin);
                        console.log("==========================");
                        _this.ShowComicForNonloginUser();
                    }
                });
            }
            else {
                console.log('==>%c Facebook Login Status :: DISCONECTED ', 'background: red; color: white; font-weight: bold; display: block;');
                _this.loggedin = false;
                _this.isFacebookLogin = false;
                console.log('=>%c isFacebookLogin status', 'color: red; font-weight: bold;', _this.isFacebookLogin);
                _this.ShowComicForNonloginUser();
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    //===- END -===//
    //===- GOOGLE CHECK -===//
    ComicPage.prototype.checkGoogleLoginStatus = function () {
        var _this = this;
        this.gPlus.trySilentLogin({}).then(function (stats) {
            if (stats) {
                console.log("==========================");
                console.log(" GOOGLE PLUS LOGIN CHECK ");
                console.log("--------------------------");
                _this.loggedin = true;
                _this.isGoogleLogin = true;
                console.log('==>%c Google Plus Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
                console.log('==>%c isGoogleLogin status', 'color: green; font-weight: bold;', _this.isGoogleLogin);
                _this.userProfile = stats;
                // console.log('==> Waiting data for  (Google Plus) Login .....', this.userProfile);
                console.log("==========================");
                _this.showComic();
            }
            else {
                console.log("==========================");
                console.log(" GOOGLE PLUS LOGIN CHECK ");
                console.log("--------------------------");
                console.log('==>%c Google Plus Login Not Detected ', 'background: red; color: white; font-weight: bold; display: block;');
                _this.isGoogleLogin = false;
                _this.loggedin = false;
                console.log('=>%c isGoogleLogin status', 'color: red; font-weight: bold;', _this.isGoogleLogin);
                console.log("==========================");
                _this.ShowComicForNonloginUser();
            }
        }).catch(function (error) {
            // this.userProfile = null;
            // this.loggedin    = false;
            console.log("==========================");
            console.log(" GOOGLE PLUS LOGIN CHECK ");
            console.log("--------------------------");
            console.log('==>%c Google Plus Login Status :: DISCONNECTED ', 'background: red; color: white; font-weight: bold; display: block;');
            _this.isGoogleLogin = false;
            console.log('=>%c isGoogleLogin status', 'color: red; font-weight: bold;', _this.isGoogleLogin);
            console.log("==========================");
            _this.ShowComicForNonloginUser();
        });
    };
    //===- END -===//
    ComicPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        console.log('Begin async operation', refresher);
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
        setTimeout(function () {
            _this.checkFacebookLoginStatus();
            _this.checkGoogleLoginStatus();
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    ComicPage.prototype.next = function () {
        this.slides.slideNext();
    };
    ComicPage.prototype.prev = function () {
        this.slides.slidePrev();
    };
    return ComicPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('slides'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Slides */])
], ComicPage.prototype, "slides", void 0);
ComicPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-comic',template:/*ion-inline-start:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\comic\comic.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>\n\n            <p class="biruMuda m-0">{{comic_title.replace(regex, \' \')}} - Chapter {{comic_chapter}}</p>\n\n        </ion-title>\n\n        <ion-buttons end>\n\n            <div *ngIf="loggedin == false; else loginTrue">\n\n                <button ion-button class="login-indicator-false">\n\n                <ion-icon name="sunny" end></ion-icon>\n\n                </button>\n\n            </div>\n\n            <ng-template #loginTrue>\n\n                <div *ngIf="isFacebookLogin == true">\n\n                    <button ion-button class="login-indicator-true">\n\n                    <ion-icon name="logo-facebook"></ion-icon>\n\n                    </button>\n\n                </div>\n\n                <div *ngIf="isGoogleLogin == true">\n\n                    <button ion-button class="login-indicator-true">\n\n                    <ion-icon name="logo-googleplus"></ion-icon>\n\n                    </button>\n\n                </div>\n\n            </ng-template>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <ion-slides pager *ngIf="loggedin" #slides>\n\n    <ion-slide *ngFor="let login of comics">\n\n      <img src="http://bukufi.com/storage/comic/comic_files/{{login.comic_title}}/{{login.comic_image}}" alt="{{login.comic_image}}">\n\n    </ion-slide>\n\n\n\n  </ion-slides>\n\n\n\n  <ion-slides pager *ngIf="!loggedin" #slides>\n\n    <ion-slide *ngFor="let comics of comicsNonLogin; let i=index">\n\n      <div *ngIf="i<5">\n\n        <img src="http://bukufi.com/storage/comic/comic_files/{{comics.comic_title}}/{{comics.comic_image}}" alt="{{comics.comic_image}}">\n\n      </div>\n\n      <div *ngIf="i>=5">\n\n        <div class=\'wrapper\'>\n\n          <img src="./assets/imgs/sorry-icon.png" class="sorry">\n\n          <h3 class=\'sorry-message need-margin-top\'>sorry, you must login to continue reading the comic.</h3>\n\n          <h3 class=\'sorry-message\'>You can login from the floating button.</h3>\n\n          <h3 class=\'sorry-message\'>Thank you</h3>\n\n        </div>\n\n      </div>\n\n    </ion-slide>\n\n    \n\n  </ion-slides>\n\n\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content \n\n      pullingText="Pull to refresh"\n\n      pullingIcon="arrow-dropdown"\n\n      refreshingSpinner="circles"\n\n      refreshingText="fetching data ...">\n\n    </ion-refresher-content>\n\n  </ion-refresher>\n\n</ion-content>\n\n\n\n<ion-footer>\n\n    <div *ngIf="!loggedin">\n\n        <ion-toolbar>\n\n            <ion-grid class="loginToolbarBtn">\n\n                <ion-row>\n\n                    <ion-col col-6>\n\n                        <p class="text-bold">{{countPagesNonLogin}} pages</p>\n\n                    </ion-col>\n\n                    <ion-col col-6 class="float-right">\n\n                        <button type="submit" float-left ion-button  outline small icon-left class="btnPrev" (click)="prev()">\n\n                            <ion-icon name="arrow-dropleft"></ion-icon>\n\n                            Prev\n\n                        </button>\n\n                        <button type="submit" float-right ion-button outline small icon-right class="btnNext" (click)="next()">\n\n                            Next\n\n                            <ion-icon name="arrow-dropright"></ion-icon>\n\n                        </button>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-grid>\n\n        </ion-toolbar>\n\n    </div>\n\n\n\n    <div *ngIf="loggedin">\n\n        <ion-toolbar>\n\n            <ion-grid class="loginToolbarBtn">\n\n                <ion-row>\n\n                    <ion-col col-6>\n\n                        <p class="text-bold">{{countPages}} pages</p>\n\n                    </ion-col>\n\n                    <ion-col col-6>\n\n                        <button type="submit" float-left ion-button  outline small icon-left class="btnPrev" (click)="prev()">\n\n                            <ion-icon name="arrow-dropleft"></ion-icon>\n\n                            Prev\n\n                        </button>\n\n                        <button type="submit" float-right ion-button outline small icon-right class="btnNext" (click)="next()">\n\n                            Next\n\n                            <ion-icon name="arrow-dropright"></ion-icon>\n\n                        </button>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-grid>\n\n        </ion-toolbar>\n\n    </div>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\comic\comic.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__["a" /* BukufiRestProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */]])
], ComicPage);

//# sourceMappingURL=comic.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookFrontPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__book_detail_book_detail__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__book_list_book_list__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__search_search__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__user_account_user_account__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var BookFrontPage = (function () {
    function BookFrontPage(navCtrl, navParams, bukufiRest, fb, gPlus) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.bukufiRest = bukufiRest;
        this.fb = fb;
        this.gPlus = gPlus;
        this.loggedin = false;
        this.isGoogleLogin = false;
        this.isFacebookLogin = false;
        this.userProfile = null;
        this.regex = /\-/gi;
        this.getPopularBooks();
        this.getNewBooks();
        //segment
        this.book = 'popular-book';
        this.checkGoogleLoginStatus();
        this.checkFacebookLoginStatus();
    }
    BookFrontPage.prototype.ionViewDidLoad = function () {
        console.clear();
        console.log('====================');
        console.log('%c BookFrontPage Loaded', 'color: green; font-weight: bold;');
        console.log('====================');
        this.checkGoogleLoginStatus();
        this.checkFacebookLoginStatus();
    };
    BookFrontPage.prototype.getPopularBooks = function () {
        var _this = this;
        this.bukufiRest.getPopBooks()
            .then(function (data) {
            _this.popularBooks = data;
            console.log('==> Popular Book :', _this.popularBooks);
        });
    };
    BookFrontPage.prototype.getNewBooks = function () {
        var _this = this;
        this.bukufiRest.getNewBook()
            .then(function (data) {
            _this.newBooks = data;
            console.log('==> New Books :', data);
        });
    };
    BookFrontPage.prototype.showDetailBook = function (book) {
        console.log('=> show detail book', book);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__book_detail_book_detail__["a" /* BookDetailPage */], {
            book: book
        });
    };
    //BOOK LISTS
    BookFrontPage.prototype.bookList = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__book_list_book_list__["a" /* BookListPage */]);
    };
    BookFrontPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        console.log('Begin async operation', refresher);
        this.getPopularBooks();
        this.getNewBooks();
        this.checkGoogleLoginStatus();
        this.checkFacebookLoginStatus();
        setTimeout(function () {
            _this.checkGoogleLoginStatus();
            _this.checkFacebookLoginStatus();
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    BookFrontPage.prototype.userInformation = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__user_account_user_account__["a" /* UserAccountPage */]);
    };
    BookFrontPage.prototype.loginFirst = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
    };
    BookFrontPage.prototype.search = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__search_search__["a" /* SearchPage */]);
    };
    //===- FACEBOOK CHECK -===//
    BookFrontPage.prototype.checkFacebookLoginStatus = function () {
        var _this = this;
        this.fb.getLoginStatus().then(function (res) {
            if (res.status == 'connect' || res.status == 'connected') {
                __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        console.log("==========================");
                        console.log("   FACEBOOK LOGIN CHECK   ");
                        console.log("--------------------------");
                        _this.userProfile = user;
                        //   console.log('==> User Facebook Login Data', this.userProfile);
                        _this.loggedin = true;
                        _this.isFacebookLogin = true;
                        console.log('==>%c Facebook Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
                        console.log("=>%c isFacebookLogin status", 'color: green; font-weight: bold;', _this.isFacebookLogin);
                        _this.providerIDs = "Facebook";
                        _this.userIDs = _this.userProfile.uid;
                        _this.emailIDs = _this.userProfile.email;
                        console.log("=>%c Facebook User ID", 'color: green; font-weight: bold;', _this.userIDs);
                        console.log("==========================");
                    }
                    else {
                        _this.isFacebookLogin = false;
                        console.log("==========================");
                        console.log("   FACEBOOK LOGIN CHECK   ");
                        console.log("--------------------------");
                        _this.isFacebookLogin = false;
                        _this.userProfile = null;
                        console.log('==>%c Facebook Login Status :: DISCONNECTED ', 'background: red; color: white; font-weight: bold; display: block;');
                        console.log("=>%c isFacebookLogin status", 'color: red; font-weight: bold;', _this.isFacebookLogin);
                        console.log("==========================");
                    }
                });
            }
            else {
                console.log('==>%c Facebook Login Status :: DISCONECTED ', 'background: red; color: white; font-weight: bold; display: block;');
                _this.loggedin = false;
                _this.isFacebookLogin = false;
                console.log('=>%c isFacebookLogin status', 'color: red; font-weight: bold;', _this.isFacebookLogin);
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    //===- END -===//
    //===- GOOGLE CHECK -===//
    BookFrontPage.prototype.checkGoogleLoginStatus = function () {
        var _this = this;
        this.gPlus.trySilentLogin({}).then(function (stats) {
            if (stats) {
                console.log("==========================");
                console.log(" GOOGLE PLUS LOGIN CHECK ");
                console.log("--------------------------");
                _this.userProfile = stats;
                _this.loggedin = true;
                _this.isGoogleLogin = true;
                console.log('==>%c Google Plus Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
                console.log('=>%c isGoogleLogin status', 'color: green; font-weight: bold;', _this.isGoogleLogin);
                _this.providerIDs = "Google Plus";
                _this.userIDs = _this.userProfile.userId;
                _this.emailIDs = _this.userProfile.email;
                console.log("=>%c Google Plus User ID", 'color: green; font-weight: bold;', _this.userIDs);
                console.log("==========================");
            }
            else {
                console.log('==>%c Google Plus Login Not Detected. Please Login', 'color: red; font-weight: bold;');
                _this.isGoogleLogin = false;
                _this.loggedin = false;
                console.log('=>%c isGoogleLogin status', 'color: red; font-weight: bold;', _this.isGoogleLogin);
            }
        }).catch(function (error) {
            // this.userProfile = null;
            // this.loggedin    = false;
            console.log("==========================");
            console.log(" GOOGLE PLUS LOGIN CHECK ");
            console.log("--------------------------");
            console.log('==>%c Google Plus Login Status :: DISCONNECTED ', 'background: red; color: white; font-weight: bold; display: block;');
            _this.isGoogleLogin = false;
            console.log('=>%c isGoogleLogin status', 'color: red; font-weight: bold;', _this.isGoogleLogin);
            console.log("==========================");
        });
    };
    return BookFrontPage;
}());
BookFrontPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-book-front',template:/*ion-inline-start:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\book-front\book-front.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu" class="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Bukufi</ion-title>\n\n    <ion-buttons end>\n\n      <div *ngIf="loggedin == false; else loginTrue">\n\n        <button ion-button class="login-indicator-false">\n\n          <ion-icon name="sunny" end></ion-icon>\n\n        </button>\n\n      </div>\n\n      <ng-template #loginTrue>\n\n          <div *ngIf="isFacebookLogin == true">\n\n            <button ion-button class="login-indicator-true">\n\n              <ion-icon name="logo-facebook"></ion-icon>\n\n            </button>\n\n          </div>\n\n          <div *ngIf="isGoogleLogin == true">\n\n            <button ion-button class="login-indicator-true">\n\n              <ion-icon name="logo-googleplus"></ion-icon>\n\n            </button>\n\n          </div>\n\n      </ng-template>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n    <div class="w-100 mb--4">\n\n        <img src="./assets/imgs/Books-cover.png" alt="Book Image Cover">\n\n        <p class="text-title">BOOKS</p>\n\n    </div>\n\n    <ion-segment [(ngModel)]="book">\n\n        <ion-segment-button value="popular-book">\n\n            <b>Popular Books</b>\n\n        </ion-segment-button>\n\n        <ion-segment-button value="new-book">\n\n            <b>New Books</b>\n\n        </ion-segment-button>\n\n    </ion-segment>\n\n  \n\n  <div [ngSwitch]="book">\n\n    <ion-list *ngSwitchCase="\'popular-book\'">\n\n        <!-- popular books -->\n\n        <ion-grid>\n\n            <ion-row *ngFor="let book of popularBooks" (tap)="showDetailBook(book.book_title)">\n\n                <ion-col col-4>\n\n                    <div *ngIf="book.book_sticker == \'New\'">\n\n                        <div class="cnrflash-new">\n\n                            <div class="cnrflash-inner-new">\n\n                                <span class="cnrflash-label-new">\n\n                                NEW\n\n                                </span>\n\n                            </div>\n\n                        </div>\n\n                    </div>\n\n            \n\n                    <div *ngIf="book.book_sticker == \'Popular\'">\n\n                        <div class="cnrflash-popular">\n\n                            <div class="cnrflash-inner-popular">\n\n                                <span class="cnrflash-label-popular">\n\n                                POPULAR\n\n                                </span>\n\n                            </div>\n\n                        </div>\n\n                    </div>\n\n            \n\n                    <div *ngIf="book.book_sticker == \'Recomended\'">\n\n                        <div class="cnrflash-recomended">\n\n                            <div class="cnrflash-inner-recomended">\n\n                                <span class="cnrflash-label-recomended">\n\n                                RECOMENDED\n\n                                </span>\n\n                            </div>\n\n                        </div>\n\n                    </div>\n\n            \n\n                    <div *ngIf="book.book_sticker == \'Editor Pick\'">\n\n                        <div class="cnrflash-editor-pick">\n\n                            <div class="cnrflash-inner-editor-pick">\n\n                                <span class="cnrflash-label-editor-pick">\n\n                                EDITOR <br> PICK\n\n                                </span>\n\n                            </div>\n\n                        </div>\n\n                    </div>\n\n\n\n                    <img class="img" src="http://bukufi.com/storage/book/book_cover/{{book.book_image}}" alt="{{book.book_image}}">\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <p id="title">{{book.book_title.replace(regex, \' \')}}</p>\n\n                    <p id="author">{{book.book_author.replace(regex, \' \')}}</p>\n\n                </ion-col>\n\n            </ion-row>\n\n\n\n        </ion-grid>\n\n    </ion-list>\n\n\n\n    <ion-list *ngSwitchCase="\'new-book\'">\n\n        <!-- New books -->\n\n        <ion-grid>\n\n            <ion-row *ngFor="let book of newBooks" (click)="showDetailBook(book.book_title)">\n\n                <ion-col col-4>\n\n                    <div *ngIf="book.book_stikcer == \'New\'">\n\n                        <div class="cnrflash-new">\n\n                            <div class="cnrflash-inner-new">\n\n                                <span class="cnrflash-label-new">\n\n                                NEW\n\n                                </span>\n\n                            </div>\n\n                        </div>\n\n                    </div>\n\n            \n\n                    <div *ngIf="book.book_stikcer == \'Popular\'">\n\n                        <div class="cnrflash-popular">\n\n                            <div class="cnrflash-inner-popular">\n\n                                <span class="cnrflash-label-popular">\n\n                                POPULAR\n\n                                </span>\n\n                            </div>\n\n                        </div>\n\n                    </div>\n\n            \n\n                    <div *ngIf="book.book_stikcer == \'Recomended\'">\n\n                        <div class="cnrflash-recomended">\n\n                            <div class="cnrflash-inner-recomended">\n\n                                <span class="cnrflash-label-recomended">\n\n                                RECOMENDED\n\n                                </span>\n\n                            </div>\n\n                        </div>\n\n                    </div>\n\n            \n\n                    <div *ngIf="book.book_stikcer == \'Editor Pick\'">\n\n                        <div class="cnrflash-editor-pick">\n\n                            <div class="cnrflash-inner-editor-pick">\n\n                                <span class="cnrflash-label-editor-pick">\n\n                                EDITOR <br> PICK\n\n                                </span>\n\n                            </div>\n\n                        </div>\n\n                    </div>\n\n                    <img class="img" src="http://bukufi.com/storage/book/book_cover/{{book.book_image}}" alt="{{book.book_image}}">\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <p id="title">{{book.book_title.replace(regex, \' \')}}</p>\n\n                    <p id="author">{{book.book_author.replace(regex, \' \')}}</p>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <button ion-button block class="custom" outline (tap)="bookList()">More Books</button>\n\n            </ion-row>\n\n        </ion-grid>\n\n    </ion-list>\n\n  </div>\n\n\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content \n\n      pullingText="Pull to refresh"\n\n      pullingIcon="arrow-dropdown"\n\n      refreshingSpinner="circles"\n\n      refreshingText="fetching data ...">\n\n    </ion-refresher-content>\n\n  </ion-refresher>\n\n\n\n    <!--FAB BOTTOM RIGHT-->\n\n    <ion-fab right bottom #fab2>\n\n        <button ion-fab mini color="primary"><ion-icon name="apps"></ion-icon></button>\n\n        <ion-fab-list side="top">\n\n            <div *ngIf="loggedin; else loginfirst">\n\n            <button ion-fab (click)="userInformation()">\n\n                <ion-icon name="information-circle" class="whiteBlue"></ion-icon>\n\n            </button>\n\n            </div>\n\n            <ng-template #loginfirst>\n\n                <button ion-fab (click)="loginFirst()">\n\n                    <ion-icon name="log-in" class="whiteBlue"></ion-icon>\n\n                </button>\n\n            </ng-template>\n\n            <button ion-fab (click)="search()">\n\n                <ion-icon name="search" class="whiteBlue"></ion-icon>\n\n            </button>\n\n        </ion-fab-list>\n\n    </ion-fab>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\book-front\book-front.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__["a" /* BukufiRestProvider */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__["a" /* GooglePlus */]])
], BookFrontPage);

//# sourceMappingURL=book-front.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComicFrontPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__comic_detail_comic_detail__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__comic_list_comic_list__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__search_search__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__user_account_user_account__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var ComicFrontPage = (function () {
    function ComicFrontPage(navCtrl, navParams, bukufiRest, fb, gPlus) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.bukufiRest = bukufiRest;
        this.fb = fb;
        this.gPlus = gPlus;
        this.loggedin = false;
        this.isGoogleLogin = false;
        this.isFacebookLogin = false;
        this.userProfile = null;
        this.regex = /\-/gi;
        this.getNewComic();
        this.getPopularComic();
        this.comic = "popular-comic";
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
    }
    ComicFrontPage.prototype.ionViewDidLoad = function () {
        console.clear();
        console.log('=====================');
        console.log('ComicFrontPage Loaded');
        console.log('=====================');
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
    };
    ComicFrontPage.prototype.getPopularComic = function () {
        var _this = this;
        this.bukufiRest.getPopComic().then(function (data) {
            _this.popularComic = data;
            console.log('==> popular comic', data);
        });
    };
    ComicFrontPage.prototype.getNewComic = function () {
        var _this = this;
        this.bukufiRest.getNewComic().then(function (data) {
            _this.newComic = data;
            console.log('==> new comic', data);
        });
    };
    ComicFrontPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        console.log('Begin async operation', refresher);
        //check login status
        this.getPopularComic();
        this.getNewComic();
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
        setTimeout(function () {
            _this.checkFacebookLoginStatus();
            _this.checkGoogleLoginStatus();
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    ComicFrontPage.prototype.showDetailComic = function (comic) {
        console.log('=> show detail comic', comic);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__comic_detail_comic_detail__["a" /* ComicDetailPage */], {
            comic: comic
        });
    };
    ComicFrontPage.prototype.comicList = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__comic_list_comic_list__["a" /* ComicListPage */]);
    };
    ComicFrontPage.prototype.userInformation = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__user_account_user_account__["a" /* UserAccountPage */]);
    };
    ComicFrontPage.prototype.loginFirst = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
    };
    ComicFrontPage.prototype.search = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__search_search__["a" /* SearchPage */]);
    };
    //===- FACEBOOK CHECK -===//
    ComicFrontPage.prototype.checkFacebookLoginStatus = function () {
        var _this = this;
        this.fb.getLoginStatus().then(function (res) {
            if (res.status == 'connect' || res.status == 'connected') {
                __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        console.log("==========================");
                        console.log("   FACEBOOK LOGIN CHECK   ");
                        console.log("--------------------------");
                        _this.userProfile = user;
                        //   console.log('==> User Facebook Login Data', this.userProfile);
                        _this.loggedin = true;
                        _this.isFacebookLogin = true;
                        console.log('==>%c Facebook Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
                        console.log("=>%c isFacebookLogin status", 'color: green; font-weight: bold;', _this.isFacebookLogin);
                        _this.providerIDs = "Facebook";
                        _this.userIDs = _this.userProfile.uid;
                        _this.emailIDs = _this.userProfile.email;
                        console.log("=>%c Facebook User ID", 'color: green; font-weight: bold;', _this.userIDs);
                        console.log("==========================");
                    }
                    else {
                        _this.isFacebookLogin = false;
                        console.log("==========================");
                        console.log("   FACEBOOK LOGIN CHECK   ");
                        console.log("--------------------------");
                        _this.isFacebookLogin = false;
                        _this.userProfile = null;
                        console.log('==>%c Facebook Login Status :: DISCONNECTED ', 'background: red; color: white; font-weight: bold; display: block;');
                        console.log("=>%c isFacebookLogin status", 'color: red; font-weight: bold;', _this.isFacebookLogin);
                        console.log("==========================");
                    }
                });
            }
            else {
                console.log('==>%c Facebook Login Status :: DISCONECTED ', 'background: red; color: white; font-weight: bold; display: block;');
                _this.loggedin = false;
                _this.isFacebookLogin = false;
                console.log('=>%c isFacebookLogin status', 'color: red; font-weight: bold;', _this.isFacebookLogin);
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    //===- END -===//
    //===- GOOGLE CHECK -===//
    ComicFrontPage.prototype.checkGoogleLoginStatus = function () {
        var _this = this;
        this.gPlus.trySilentLogin({}).then(function (stats) {
            if (stats) {
                console.log("==========================");
                console.log(" GOOGLE PLUS LOGIN CHECK ");
                console.log("--------------------------");
                _this.userProfile = stats;
                //   console.log('==> Hmmm, waiting data for  (Google Plus) Login .....', this.userProfile);
                _this.loggedin = true;
                _this.isGoogleLogin = true;
                console.log('==>%c Google Plus Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
                console.log('=>%c isGoogleLogin status', 'color: green; font-weight: bold;', _this.isGoogleLogin);
                _this.providerIDs = "Google Plus";
                _this.userIDs = _this.userProfile.userId;
                _this.emailIDs = _this.userProfile.email;
                console.log("=>%c Google Plus User ID", 'color: green; font-weight: bold;', _this.userIDs);
                console.log("==========================");
            }
            else {
                console.log('=>%c Google Plus Login Not Detected, Please Login', 'color: red; font-weight: bold;');
                _this.isGoogleLogin = false;
                _this.loggedin = false;
                console.log('=>%c isGoogleLogin status', 'color: red; font-weight: bold;', _this.isGoogleLogin);
            }
        }).catch(function (error) {
            // this.userProfile = null;
            // this.loggedin    = false;
            console.log("==========================");
            console.log(" GOOGLE PLUS LOGIN CHECK ");
            console.log("--------------------------");
            console.log('==>%c Google Plus Login Status :: DISCONNECTED ', 'background: red; color: white; font-weight: bold; display: block;');
            _this.isGoogleLogin = false;
            console.log('=>%c isGoogleLogin status', 'color: red; font-weight: bold;', _this.isGoogleLogin);
            console.log("==========================");
        });
    };
    return ComicFrontPage;
}());
ComicFrontPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-comic-front',template:/*ion-inline-start:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\comic-front\comic-front.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu" class="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Bukufi</ion-title>\n\n    <ion-buttons end>\n\n      <div *ngIf="loggedin == false; else loginTrue">\n\n        <button ion-button class="login-indicator-false">\n\n          <ion-icon name="sunny" end></ion-icon>\n\n        </button>\n\n      </div>\n\n      <ng-template #loginTrue>\n\n          <div *ngIf="isFacebookLogin == true">\n\n            <button ion-button class="login-indicator-true">\n\n              <ion-icon name="logo-facebook"></ion-icon>\n\n            </button>\n\n          </div>\n\n          <div *ngIf="isGoogleLogin == true">\n\n            <button ion-button class="login-indicator-true">\n\n              <ion-icon name="logo-googleplus"></ion-icon>\n\n            </button>\n\n          </div>\n\n      </ng-template>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n    <div class="w-100 mb--4">\n\n        <img src="./assets/imgs/comics-cover.png" alt="cover comic image">\n\n        <p class="text-title">COMICS</p>\n\n    </div>\n\n    \n\n    <ion-segment [(ngModel)]="comic">\n\n        <ion-segment-button value="popular-comic">\n\n            <b>Popular Comics</b>\n\n        </ion-segment-button>\n\n        <ion-segment-button value="new-comic">\n\n            <b>New Comics</b>\n\n        </ion-segment-button>\n\n    </ion-segment>\n\n\n\n  <div [ngSwitch]="comic">\n\n    <ion-list *ngSwitchCase="\'popular-comic\'">\n\n        <!-- popular books -->\n\n        <ion-grid>\n\n            <ion-row *ngFor="let comic of popularComic" (tap)="showDetailComic(comic.comic_title)">\n\n                <ion-col col-4>\n\n                    <img class="img" src="http://bukufi.com/storage/comic/comic_cover/{{comic.comic_image}}" alt="{{comic.comic_title}}">\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <p id="title">{{comic.comic_title.replace(regex, \' \')}}</p>\n\n                    <p id="author">{{comic.comic_author.replace(regex, \' \')}}</p>\n\n                    <p id="publisher">{{comic.comic_genre}}</p>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-grid>\n\n    </ion-list>\n\n\n\n    <ion-list *ngSwitchCase="\'new-comic\'">\n\n        <ion-grid>\n\n            <ion-row *ngFor="let comic of newComic" (click)="showDetailComic(comic.comic_title)">\n\n                <ion-col col-4>\n\n                        <img class="img" src="http://bukufi.com/storage/comic/comic_cover/{{comic.comic_image}}" alt="{{comic.comic_title}}">\n\n                </ion-col>\n\n                <ion-col col-8>\n\n                    <p id="title">{{comic.comic_title_nodash}}</p>\n\n                    <p id="author">{{comic.comic_author_nodash}}</p>\n\n                    <p id="publisher">{{comic.comic_genre}}</p>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <button ion-button block class="custom" outline (click)="comicList()">More Comics</button>\n\n            </ion-row>\n\n        </ion-grid>\n\n    </ion-list>\n\n  </div>\n\n\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content \n\n      pullingText="Pull to refresh"\n\n      pullingIcon="arrow-dropdown"\n\n      refreshingSpinner="circles"\n\n      refreshingText="fetching data ...">\n\n    </ion-refresher-content>\n\n  </ion-refresher>\n\n\n\n    <!--FAB BOTTOM RIGHT-->\n\n    <ion-fab right bottom #fab2>\n\n        <button ion-fab mini color="primary"><ion-icon name="apps"></ion-icon></button>\n\n        <ion-fab-list side="top">\n\n            <div *ngIf="loggedin; else loginfirst">\n\n            <button ion-fab (click)="userInformation()">\n\n                <ion-icon name="information-circle" class="whiteBlue"></ion-icon>\n\n            </button>\n\n            </div>\n\n            <ng-template #loginfirst>\n\n                <button ion-fab (click)="loginFirst()">\n\n                    <ion-icon name="log-in" class="whiteBlue"></ion-icon>\n\n                </button>\n\n            </ng-template>\n\n            <button ion-fab (click)="search()">\n\n                <ion-icon name="search" class="whiteBlue"></ion-icon>\n\n            </button>\n\n        </ion-fab-list>\n\n    </ion-fab>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\comic-front\comic-front.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__["a" /* BukufiRestProvider */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__["a" /* GooglePlus */]])
], ComicFrontPage);

//# sourceMappingURL=comic-front.js.map

/***/ }),

/***/ 177:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 177;

/***/ }),

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/book-bookmark/book-bookmark.module": [
		521,
		3
	],
	"../pages/book-detail/book-detail.module": [
		522,
		13
	],
	"../pages/book-favourite/book-favourite.module": [
		523,
		2
	],
	"../pages/book-front/book-front.module": [
		524,
		12
	],
	"../pages/book-list/book-list.module": [
		525,
		11
	],
	"../pages/comic-bookmark/comic-bookmark.module": [
		526,
		1
	],
	"../pages/comic-detail/comic-detail.module": [
		527,
		10
	],
	"../pages/comic-favourite/comic-favourite.module": [
		528,
		0
	],
	"../pages/comic-front/comic-front.module": [
		529,
		9
	],
	"../pages/comic-list/comic-list.module": [
		530,
		8
	],
	"../pages/comic/comic.module": [
		531,
		7
	],
	"../pages/login/login.module": [
		532,
		6
	],
	"../pages/search/search.module": [
		533,
		5
	],
	"../pages/user-account/user-account.module": [
		534,
		4
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 219;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BukufiRestProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the BukufiRestProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var BukufiRestProvider = (function () {
    function BukufiRestProvider(http) {
        this.http = http;
        this.popularBook = "http://bukufi.com/api/v1/trending-book";
        this.popularComic = "http://bukufi.com/api/v1/trending-comic";
        this.newBooks = "http://bukufi.com/api/v1/book";
        this.allBooks = "http://bukufi.com/api/v1/book/all";
        this.newComics = "http://bukufi.com/api/v1/comic";
        this.allComics = "http://bukufi.com/api/v1/comic/all";
        console.log('Hello BukufiRestProvider Provider');
    }
    /*==== HOME ====*/
    /*===- POPULAR BOOK -===*/
    BukufiRestProvider.prototype.getPopBooks = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.popularBook).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    /*===- END POPULAR BOOK -===*/
    /*===- POPULAR COMIC -===*/
    BukufiRestProvider.prototype.getPopComic = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.popularComic).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    /*===- END POPULAR COMIC -===*/
    /*==== END HOME ====*/
    /*==== BOOK ====*/
    /*===- NEW BOOK -===*/
    BukufiRestProvider.prototype.getNewBook = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.newBooks).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    /*===- END NEW BOOK -===*/
    /*===- ALL BOOK -===*/
    BukufiRestProvider.prototype.getAllBook = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.allBooks).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    /*===- END ALL BOOK -===*/
    /*===- DETAIL BOOK -===*/
    BukufiRestProvider.prototype.getDetailBook = function (book) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("http://bukufi.com/api/v1/book/" + book).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    /*===- END DETAIL BOOK -===*/
    /*===- BOOK COUNTER -===*/
    BukufiRestProvider.prototype.getCounterBook = function (book) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("http://bukufi.com/api/v1/book/book-counter/" + book).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    /*===- END BOOK COUNTER -===*/
    /*===- BOOK STATISTIC -===*/
    BukufiRestProvider.prototype.getBookStatisticonProsen = function (book) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("http://bukufi.com/api/v1/book/book-statistic/" + book).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    /*===- END BOOK STATISTIC -===*/
    /*===- BOOK REVIEW -===*/
    BukufiRestProvider.prototype.getReviewBook = function (book) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("http://bukufi.com/api/v1/book/book-review/" + book).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    /*===- END BOOK REVIEW -===*/
    /*===- BOOK RATING -===*/
    BukufiRestProvider.prototype.getBookRating = function (book) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("http://bukufi.com/api/v1/book/book-rating/" + book).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    /*===- END BOOK RATING -===*/
    /*===- BOOK BOOKMARK -===*/
    BukufiRestProvider.prototype.getBookBookmark = function (book) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("http://bukufi.com/api/v1/book/book-bookmark/" + book).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    /*===- END BOOK BOOKMARK -===*/
    /*==== END BOOK ====*/
    /*==== COMIC ====*/
    /*===- DETAIL COMIC -===*/
    BukufiRestProvider.prototype.getDetailComic = function (comic) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("http://bukufi.com/api/v1/comic/" + comic).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    /*===- END DETAIL COMIC -===*/
    /*===- READ COMIC -===*/
    BukufiRestProvider.prototype.readComic = function (title, chapter) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("http://bukufi.com/api/v1/comic/" + title + "/" + chapter).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    /*===- END READ COMIC -===*/
    /*===- READ COMIC NON LOGIN USER-===*/
    BukufiRestProvider.prototype.readComicNonloginUser = function (title, chapter) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("http://bukufi.com/api/v1/comic/nonogin-user/" + title + "/" + chapter).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    /*===- END READ COMIC NON LOGIN USER-===*/
    /*===- NEW COMIC -===*/
    BukufiRestProvider.prototype.getNewComic = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.newComics).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    /*===- END NEW COMIC -===*/
    /*===- ALL COMICS -===*/
    BukufiRestProvider.prototype.getAllComic = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.allComics).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    /*===- END ALL COMICS -===*/
    /*===- COMIC COUNTER -===*/
    BukufiRestProvider.prototype.getCounterComic = function (comic) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("http://bukufi.com/api/v1/comic/comic-counter/" + comic).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    /*===- END COMIC COUNTER -===*/
    /*===- COMIC REVIEW -===*/
    BukufiRestProvider.prototype.getComicReview = function (comic) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("http://bukufi.com/api/v1/comic/comic-review/" + comic).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    /*===- END COMIC REVIEW -===*/
    /*===- BOOK STATISTIC -===*/
    BukufiRestProvider.prototype.getComicStatisticonProsen = function (comic) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("http://bukufi.com/api/v1/comic/comic-statistic/" + comic).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    return BukufiRestProvider;
}());
BukufiRestProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
], BukufiRestProvider);

//# sourceMappingURL=bukufi-rest.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__toc_toc__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_settings__ = __webpack_require__(284);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BookPage = (function () {
    function BookPage(navCtrl, platform, popoverCtrl, events, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.popoverCtrl = popoverCtrl;
        this.events = events;
        this.navParams = navParams;
        this.currentPage = 1;
        this.showToolbars = true;
        this.toolbarColor = 'light';
        var book = this.navParams.get('book');
        // console.log('Param from detail book :', book);
        this.platform.ready().then(function () {
            // load book
            _this.book = _this.book = ePub("http://bukufi.com/storage/book/book_files/" + book);
            _this._updateTotalPages();
            // load toc and then update pagetitle
            _this.book.getToc().then(function (toc) {
                _this._updatePageTitle();
            });
            // if page changes
            _this.book.on('book:pageChanged', function (location) {
                console.log('on book:pageChanged', location);
                _this._updateCurrentPage();
                _this._updatePageTitle();
            });
            // subscribe to events coming from other pages
            _this._subscribeToEvents();
        });
    }
    BookPage.prototype.ionViewDidLoad = function () {
        console.clear();
        console.log('BookPage Success Load');
        // render book
        this.book.renderTo("book"); // TODO We should work with ready somehow here I think
    };
    BookPage.prototype._subscribeToEvents = function () {
        var _this = this;
        console.log('subscribe to events');
        // toc: go to selected chapter
        this.events.subscribe('select:toc', function (content) {
            _this.book.goto(content.href);
        });
        // settings: change background color
        this.events.subscribe('select:background-color', function (bgColor) {
            console.log('select:background-color', bgColor);
            _this.book.setStyle("background-color", bgColor);
            _this.bgColor = bgColor;
            // adapt toolbar color to background color
            if (bgColor == 'rgb(255, 255, 255)' || bgColor == 'rgb(249, 241, 228)') {
                _this.toolbarColor = 'light';
            }
            else {
                _this.toolbarColor = 'dark';
            }
        });
        // settings: change color
        this.events.subscribe('select:color', function (color) {
            console.log('select:color', color);
            _this.book.setStyle("color", color);
        });
        // settings: change font
        this.events.subscribe('select:font-family', function (family) {
            console.log('select:font-family', family);
            _this.book.setStyle("font-family", family);
            _this._updateTotalPages();
        });
        // settings: change font size
        this.events.subscribe('select:font-size', function (size) {
            console.log('select:font-size', size);
            _this.book.setStyle("font-size", size);
            _this._updateTotalPages();
        });
    };
    BookPage.prototype._updateCurrentPage = function () {
        console.log('_updateCurrentPage');
        // Source: https://github.com/futurepress/epub.js/wiki/Tips-and-Tricks#generating-and-getting-page-numbers (bottom)
        var currentLocation = this.book.getCurrentLocationCfi();
        var page = this.book.pagination.pageFromCfi(currentLocation);
        console.log('_updateCurrentPage location =', currentLocation, 'page =', page);
        this.currentPage = page;
    };
    BookPage.prototype._updateTotalPages = function () {
        var _this = this;
        console.log('_updateTotalPages');
        //TODO: cancel prior pagination promise
        // TODO Triggers "download" of ALL pages for unpacked books. Really needed? Alternative?
        // Source: https://github.com/futurepress/epub.js/wiki/Tips-and-Tricks#generating-and-getting-page-numbers
        this.book.generatePagination().then(function () {
            var totalPages = _this.book.pagination.totalPages;
            console.log('_updateTotalPages totalPages = ', totalPages);
            _this.totalPages = "of " + totalPages; // TODO where is this.totalPages actually used?
        }).catch(function (error) {
            console.log('_updateTotalPages error = ', error);
        });
    };
    BookPage.prototype._updatePageTitle = function () {
        var _this = this;
        console.log('_updatePageTitle');
        var bookTitle = this.book.metadata.bookTitle;
        var pageTitle = bookTitle; // default to book title
        if (this.book.toc) {
            // Use chapter name
            var chapter = this.book.toc.filter(function (obj) { return obj.href == _this.book.currentChapter.href; })[0]; // TODO What does this code do?
            pageTitle = chapter ? chapter.label : bookTitle; // fallback to book title again
        }
        console.log('_updatePageTitle title =', pageTitle);
        this.pageTitle = pageTitle;
    };
    // Navigation
    BookPage.prototype.prev = function () {
        console.log('prev');
        if (this.currentPage == 2) {
            this.book.gotoPage(1);
        }
        else {
            this.book.prevPage();
        }
    };
    BookPage.prototype.next = function () {
        console.log('next');
        this.book.nextPage();
    };
    BookPage.prototype.toc = function (ev) {
        console.log('toc');
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_2__toc_toc__["a" /* TocPage */], {
            toc: this.book.toc
        });
        popover.present({ ev: ev });
    };
    BookPage.prototype.settings = function (ev) {
        console.log('settings');
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_3__settings_settings__["a" /* SettingsPage */], {
            backgroundColor: this.book.settings.styles['background-color'],
            fontFamily: this.book.settings.styles['font-family'],
            fontSize: this.book.settings.styles['font-size'],
        });
        popover.present({ ev: ev });
    };
    // Touchlayer
    BookPage.prototype.toggleToolbars = function () {
        console.log('toggleToolbars');
        this.showToolbars = !this.showToolbars;
    };
    BookPage.prototype.changePage = function (event) {
        console.log('changePage', event);
        if (event.velocityX < 0) {
            this.next();
        }
        else {
            this.prev();
        }
    };
    return BookPage;
}());
BookPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-book',template:/*ion-inline-start:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\book\book.html"*/'<ion-header>\n\n    <ion-navbar transparent [color]="toolbarColor" [hidden]="!showToolbars">\n\n        <ion-buttons start>\n\n            <button ion-button icon-only (tap)="toc($event)">\n\n                <ion-icon class="chapterList" ios="ios-list" md="ios-list"></ion-icon>\n\n            </button>\n\n        </ion-buttons>\n\n        <ion-title>\n\n            <p class="biruMuda mb-0 mt-0">{{pageTitle}}</p>\n\n        </ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button icon-only (tap)="settings($event)">\n\n                <!-- <ion-icon name="settings"></ion-icon> -->\n\n\n\n                <img src="./assets/imgs/fonts-button.png" alt="setting" class="setting">\n\n            </button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content [ngStyle]="{\'backgroundColor\': bgColor}" no-bounce>\n\n    <div id="touchlayer" (tap)="toggleToolbars()" (swipe)="changePage($event)"></div>\n\n    <div id="book" text-justify></div>\n\n</ion-content>\n\n\n\n<ion-footer>\n\n  <ion-toolbar transparent [color]="toolbarColor" *ngIf="showToolbars">\n\n    <ion-buttons start>\n\n      <button ion-button icon-only (tap)="prev()" class="green mr-15">\n\n        <ion-icon name="arrow-dropleft-circle"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>Page {{currentPage}} {{(book && book.pagination && book.pagination.totalPages) ? \' of \' + book.pagination.totalPages : \'\'}}</ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (tap)="next()" class="green">\n\n        <ion-icon name="arrow-dropright-circle"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\book\book.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* PopoverController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], BookPage);

//# sourceMappingURL=book.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TocPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TocPage = (function () {
    function TocPage(navCtrl, navParams, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.toc = navParams.data.toc;
    }
    TocPage.prototype.selectToc = function (content) {
        this.events.publish('select:toc', content);
        this.navCtrl.pop();
    };
    return TocPage;
}());
TocPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-toc',template:/*ion-inline-start:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\toc\toc.html"*/'<ion-list>\n\n  <ion-item class="toc" *ngFor="let chapter of toc" (tap)="selectToc(chapter)">\n\n    {{chapter.label}}\n\n  </ion-item>\n\n</ion-list>\n\n'/*ion-inline-end:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\toc\toc.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
], TocPage);

//# sourceMappingURL=toc.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SettingsPage = (function () {
    function SettingsPage(navCtrl, navParams, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.colors = {
            'white': {
                'bg': 'rgb(255, 255, 255)',
                'fg': 'rgb(0, 0, 0)'
            },
            'tan': {
                'bg': 'rgb(249, 241, 228)',
                'fg': 'rgb(0, 0, 0)'
            },
            'grey': {
                'bg': 'rgb(76, 75, 80)',
                'fg': 'rgb(255, 255, 255)'
            },
            'black': {
                'bg': 'rgb(0, 0, 0)',
                'fg': 'rgb(255, 255, 255)'
            },
        };
        if (this.navParams.data) {
            var backgroundColor = this.navParams.data.backgroundColor;
            this.backgroundColor = this._getColorName(backgroundColor);
            this.fontSize = this.navParams.data.fontSize;
            if (this.navParams.data.fontFamily) {
                this.fontFamily = this.navParams.data.fontFamily.replace(/'/g, ""); // TODO Huh?
            }
            else {
                //TODO get the default font-family
            }
        }
    }
    SettingsPage.prototype._getColorName = function (color) {
        if (!color)
            return 'white';
        var colorName = 'white';
        for (var key in this.colors) {
            if (this.colors[key].bg == color) {
                colorName = key;
            }
        }
        return colorName;
    };
    SettingsPage.prototype.changeBackground = function (backgroundColor) {
        this.backgroundColor = backgroundColor;
        this.events.publish('select:background-color', this.colors[backgroundColor].bg);
        this.events.publish('select:color', this.colors[backgroundColor].fg);
    };
    SettingsPage.prototype.changeFontSize = function (direction) {
        var size = this.fontSize ? this.fontSize : '1em';
        var sizeValue = +size.replace('em', '');
        var newSizeValue = direction == 'larger' ? sizeValue += 0.1 : sizeValue -= 0.1;
        if (newSizeValue >= 0.4 && newSizeValue <= 2) {
            this.fontSize = newSizeValue + "em";
            this.events.publish('select:font-size', this.fontSize);
        }
    };
    SettingsPage.prototype.changeFontFamily = function () {
        if (this.fontFamily) {
            this.events.publish('select:font-family', this.fontFamily);
        }
    };
    return SettingsPage;
}());
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-settings',template:/*ion-inline-start:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\settings\settings.html"*/'<ion-row>\n\n  <ion-col>\n\n    <button (click)="changeFontSize(\'smaller\')" ion-item detail-none class="text-button text-smaller">A</button>\n\n  </ion-col>\n\n  <ion-col>\n\n    <button (click)="changeFontSize(\'larger\')" ion-item detail-none class="text-button text-larger">A</button>\n\n  </ion-col>\n\n</ion-row>\n\n<ion-row class="row-dots">\n\n  <ion-col>\n\n    <button ion-button="dot" (click)="changeBackground(\'white\')" class="dot-white" [class.selected]="background == \'white\'"></button>\n\n  </ion-col>\n\n  <ion-col>\n\n    <button ion-button="dot" (click)="changeBackground(\'tan\')" class="dot-tan" [class.selected]="background == \'tan\'"></button>\n\n  </ion-col>\n\n  <ion-col>\n\n    <button ion-button="dot" (click)="changeBackground(\'grey\')" class="dot-grey" [class.selected]="background == \'grey\'"></button>\n\n  </ion-col>\n\n  <ion-col>\n\n    <button ion-button="dot" (click)="changeBackground(\'black\')" class="dot-black" [class.selected]="background == \'black\'"></button>\n\n  </ion-col>\n\n</ion-row>\n\n\n\n<ion-list radio-group [(ngModel)]="fontFamily" (ionChange)="changeFontFamily()" class="settings-page">\n\n  <ion-item class="text-athelas">\n\n    <ion-label>Athelas</ion-label>\n\n    <ion-radio value="Athelas"></ion-radio>\n\n  </ion-item>\n\n  <ion-item class="text-charter">\n\n    <ion-label>Charter</ion-label>\n\n    <ion-radio value="Charter"></ion-radio>\n\n  </ion-item>\n\n  <ion-item class="text-iowan">\n\n    <ion-label>Iowan</ion-label>\n\n    <ion-radio value="Iowan"></ion-radio>\n\n  </ion-item>\n\n  <ion-item class="text-palatino">\n\n    <ion-label>Palatino</ion-label>\n\n    <ion-radio value="Palatino"></ion-radio>\n\n  </ion-item>\n\n  <ion-item class="text-san-francisco">\n\n    <ion-label>San Francisco</ion-label>\n\n    <ion-radio value="San Francisco"></ion-radio>\n\n  </ion-item>\n\n  <ion-item class="text-seravek">\n\n    <ion-label>Seravek</ion-label>\n\n    <ion-radio value="Seravek"></ion-radio>\n\n  </ion-item>\n\n  <ion-item class="text-times-new-roman">\n\n    <ion-label>Times New Roman</ion-label>\n\n    <ion-radio value="Times New Roman"></ion-radio>\n\n  </ion-item>\n\n</ion-list>\n\n'/*ion-inline-end:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\settings\settings.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(347);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_bukufi_rest_bukufi_rest__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_social_login_social_login__ = __webpack_require__(518);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_epub_epub__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_facebook__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_google_plus__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_auth__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_angularfire2__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angularfire2_database__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__app_component__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_home_home__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_book_book__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_toc_toc__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_settings_settings__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_book_detail_book_detail__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_comic_detail_comic_detail__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_comic_comic__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_book_front_book_front__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_book_list_book_list__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_comic_front_comic_front__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_comic_list_comic_list__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_login_login__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_search_search__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_user_account_user_account__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






























var config = {
    apiKey: "AIzaSyDl2k9vLUopVsu3hOfxxUTQht_Oc-kCAkw",
    authDomain: "bukufi-mobile-02.firebaseapp.com",
    databaseURL: "https://bukufi-mobile-02.firebaseio.com",
    projectId: "bukufi-mobile-02",
    storageBucket: "bukufi-mobile-02.appspot.com",
    messagingSenderId: "447326809905"
};
__WEBPACK_IMPORTED_MODULE_6_firebase___default.a.initializeApp(config);
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_16__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_book_book__["a" /* BookPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_toc_toc__["a" /* TocPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_book_detail_book_detail__["a" /* BookDetailPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_comic_detail_comic_detail__["a" /* ComicDetailPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_comic_comic__["a" /* ComicPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_book_front_book_front__["a" /* BookFrontPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_book_list_book_list__["a" /* BookListPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_comic_front_comic_front__["a" /* ComicFrontPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_comic_list_comic_list__["a" /* ComicListPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_search_search__["a" /* SearchPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_user_account_user_account__["a" /* UserAccountPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_12_angularfire2_auth__["b" /* AngularFireAuthModule */],
            __WEBPACK_IMPORTED_MODULE_13_angularfire2__["a" /* AngularFireModule */].initializeApp(config),
            __WEBPACK_IMPORTED_MODULE_14_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/book-bookmark/book-bookmark.module#BookBookmarkPageModule', name: 'BookBookmarkPage', segment: 'book-bookmark', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/book-detail/book-detail.module#BookDetailPageModule', name: 'BookDetailPage', segment: 'book-detail', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/book-favourite/book-favourite.module#BookFavouritePageModule', name: 'BookFavouritePage', segment: 'book-favourite', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/book-front/book-front.module#BookFrontPageModule', name: 'BookFrontPage', segment: 'book-front', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/book-list/book-list.module#BookListPageModule', name: 'BookListPage', segment: 'book-list', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/comic-bookmark/comic-bookmark.module#ComicBookmarkPageModule', name: 'ComicBookmarkPage', segment: 'comic-bookmark', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/comic-detail/comic-detail.module#ComicDetailPageModule', name: 'ComicDetailPage', segment: 'comic-detail', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/comic-favourite/comic-favourite.module#ComicFavouritePageModule', name: 'ComicFavouritePage', segment: 'comic-favourite', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/comic-front/comic-front.module#ComicFrontPageModule', name: 'ComicFrontPage', segment: 'comic-front', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/comic-list/comic-list.module#ComicListPageModule', name: 'ComicListPage', segment: 'comic-list', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/comic/comic.module#ComicPageModule', name: 'ComicPage', segment: 'comic', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/search/search.module#SearchPageModule', name: 'SearchPage', segment: 'search', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/user-account/user-account.module#UserAccountPageModule', name: 'UserAccountPage', segment: 'user-account', priority: 'low', defaultHistory: [] }
                ]
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_16__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_book_book__["a" /* BookPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_toc_toc__["a" /* TocPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_book_detail_book_detail__["a" /* BookDetailPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_comic_detail_comic_detail__["a" /* ComicDetailPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_comic_comic__["a" /* ComicPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_book_front_book_front__["a" /* BookFrontPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_book_list_book_list__["a" /* BookListPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_comic_front_comic_front__["a" /* ComicFrontPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_comic_list_comic_list__["a" /* ComicListPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_search_search__["a" /* SearchPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_user_account_user_account__["a" /* UserAccountPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_7__providers_bukufi_rest_bukufi_rest__["a" /* BukufiRestProvider */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_google_plus__["a" /* GooglePlus */],
            __WEBPACK_IMPORTED_MODULE_8__providers_social_login_social_login__["a" /* SocialLoginProvider */],
            __WEBPACK_IMPORTED_MODULE_9__providers_epub_epub__["a" /* EpubProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_google_plus__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_bukufi_rest_bukufi_rest__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


// import { BookDetailPage } from '../book-detail/book-detail';

// import { BookDetailPage } from '../book-detail/book-detail';
// import { ComicDetailPage } from '../comic-detail/comic-detail';
// import { BookBookmarkPage } from '../book-bookmark/book-bookmark';
// import { BookFavouritePage } from '../book-favourite/book-favourite';
// import { ComicBookmarkPage } from '../comic-bookmark/comic-bookmark';
// import { ComicFavouritePage } from '../comic-favourite/comic-favourite';
var LoginPage = (function () {
    // isHaveBookmark: boolean;
    // dataFavourite: any;
    // dataFavourite2: Array<any> = [];
    // bookmarkBookTitle: string;
    // bookmarkBookImage: any;
    //====== for favourite book =======//
    // isHaveFavourite: boolean;
    //book
    // BookmarkBook: AngularFireList<any>;
    // myBookmark: Array<any> = [];
    // bookmarkRef: firebase.database.Reference = firebase.database().ref(`/Bookmark-book`);
    // FavouriteBook: AngularFireList<any>;
    // myFav: Array<any> = [];
    // favoRef: firebase.database.Reference = firebase.database().ref(`/Favourite-book`);
    //comic
    // BookmarkComic: AngularFireList<any>;
    // myBookmarkComic: Array<any> = [];
    // bookmarkComicRef: firebase.database.Reference = firebase.database().ref(`/Bookmark-Comic`);
    // FavouriteComic: AngularFireList<any>;
    // myComicFav: Array<any> = [];
    // favoComicRef: firebase.database.Reference = firebase.database().ref(`/Favourite-Comic`);
    function LoginPage(navCtrl, navParams, fb, gPlus, fire, 
        // public afDatabase: AngularFireDatabase,
        platform, bukufiRest) {
        //bookmark book firebase db
        // this.BookmarkBook   = afDatabase.list('/Bookmark-book');
        // this.FavouriteBook  = afDatabase.list('/Favourite-book');
        // this.BookmarkComic  = afDatabase.list('/Bookmark-Comic');
        // this.FavouriteComic = afDatabase.list('/Favourite-Comic');
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.gPlus = gPlus;
        this.fire = fire;
        this.platform = platform;
        this.bukufiRest = bukufiRest;
        this.loggedin = false;
        // FBData: any;
        // googleData: any = null;
        this.isGoogleLogin = false;
        this.isFacebookLogin = false;
        this.userProfile = null;
        this.regex = /\-/gi;
        this.checkGoogleLoginStatus();
        this.checkFacebookLoginStatus();
        // this.getBookImageFromAPI();
        this.loginSegment = "BookmarkBook";
        // this.loginSegment = "BookmarkComic";
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.clear();
        console.log('=================');
        console.log('Login Page Loaded');
        console.log('=================');
    };
    /*==- FACEBOOK -==*/
    LoginPage.prototype.loginFacebook = function () {
        var _this = this;
        return this.fb.login(['email', 'public_profile']).then(function (response) {
            var facebookCredential = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
            __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth().signInWithCredential(facebookCredential).then(function (success) {
                _this.result = JSON.stringify(success);
                _this.objResult = JSON.parse(_this.result);
                _this.loggedin = true;
                console.log('==> Login Facebook Success');
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
            });
        });
    };
    LoginPage.prototype.checkFacebookLoginStatus = function () {
        var _this = this;
        this.fb.getLoginStatus().then(function (res) {
            if (res.status == 'connect' || res.status == 'connected') {
                __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        _this.userProfile = user;
                        _this.loggedin = true;
                        _this.isFacebookLogin = true;
                        console.log('==> Facebook Login Status :: CONNECTED');
                        //   console.log('=> User Facebook Login Data', this.userProfile);
                        // this.getMyBookmark();
                        // this.getFavouriteBook();
                        // this.getMyComicBookmark();
                        // this.getFavouriteComic();
                    }
                    else {
                        _this.userProfile = null;
                        _this.loggedin = false;
                        _this.isFacebookLogin = false;
                        console.log('==> Facebook Login Status :: DISCONNECTED');
                    }
                });
            }
            else {
                console.log('==> Facebook Login Status :: DISCONECTED');
                _this.loggedin = false;
                _this.isFacebookLogin = false;
                //this.loggedin  = res.status;
                //   console.log('=> logggedin status', this.loggedin);
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    // logoutFacebook(){
    //   this.fb.logout().then(res => {
    //     console.log("==> Facebook Logout Success", res);
    //     this.userProfile = null;
    //     this.isFacebookLogin = false;
    //     this.loggedin    = false;
    //   })
    // }
    /*==- END FACEBOOK -==*/
    //== GOOGLE ==//
    LoginPage.prototype.loginGoogle = function () {
        var _this = this;
        this.gPlus.login({
            'webClientId': '447326809905-3q4ogrru30sncvsqua93bovt8qd5ihhc.apps.googleusercontent.com',
            'offline': true
        }).then(function (res) {
            var googleCredential = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth.GoogleAuthProvider.credential(res.idToken);
            __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth().signInWithCredential(googleCredential).then(function (response) {
                _this.gResult = JSON.stringify(response);
                _this.gObjectRes = JSON.parse(_this.gResult);
                _this.loggedin = true;
                console.log("==> Login Google Plus Success");
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
            });
        }, function (err) {
            console.error("Error: ", err);
        });
    };
    //check login status
    LoginPage.prototype.checkGoogleLoginStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, this.gPlus.trySilentLogin({})];
                    case 1:
                        _a.userProfile = _b.sent();
                        // console.log('==> Google Plus Login Data', this.userProfile);
                        //check bookmark and favourite for google plus user
                        // if(this.userProfile){
                        //     this.userIDs = this.userProfile.userId;
                        //     // console.log("==> User ID Google Plus", this.userIDs);
                        //     //=========================//
                        //     //check bookmark book for google plus user
                        //     // this.bookmarkRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
                        //     //     this.myBookmark = [];
                        //     //     dataFavourite.forEach(dataFv => {
                        //     //         this.myBookmark.push(dataFv.val());
                        //     //         return false;
                        //     //     });
                        //     //     if(this.myBookmark){
                        //     //         console.log("======================================================");
                        //     //         console.log('=> Bookmark Book (Google Plus) Found. Count the Data :', this.myBookmark.length);
                        //     //         console.log('=> The Data is :', this.myBookmark);
                        //     //         this.isHaveBookmark = true;
                        //     //         console.log("======================================================");
                        //     //     }
                        //     //     else{
                        //     //         console.log("=> No Bookmark Book data (Google Plus) for this user", this.myBookmark.length);
                        //     //         this.isHaveBookmark = false;
                        //     //     }
                        //     // });
                        //     //=========================//
                        //     //check favourite book for google plus user
                        //     // this.favoRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
                        //     //     this.myFav = [];
                        //     //     dataFavourite.forEach(dataFv => {
                        //     //         this.myFav.push(dataFv.val());
                        //     //         return false;
                        //     //     });
                        //     //     if(this.myFav){
                        //     //         console.log("======================================================");
                        //     //         console.log('=> Favourite Book (Google Plus) Found. Count the Data :', this.myFav.length);
                        //     //         console.log('=> The Data is :', this.myFav);
                        //     //         this.isHaveFavourite = true;
                        //     //         console.log("======================================================");
                        //     //     }
                        //     //     else{
                        //     //         console.log("=> Favourite Book Data (Google Plus) Not Found for this user", this.myFav.length);
                        //     //         this.isHaveFavourite = false;
                        //     //     }
                        //     // });
                        //     //=========================//
                        //     //check bookmark comic
                        //     // this.bookmarkComicRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
                        //     //     this.myBookmarkComic = [];
                        //     //     dataFavourite.forEach(dataFv => {
                        //     //         this.myBookmarkComic.push(dataFv.val());
                        //     //         return false;
                        //     //     });
                        //     //     if(this.myBookmarkComic){
                        //     //         console.log("=======================================================");
                        //     //         console.log('=> Bookmark Comic (Google Plus) Found. Count the Data :', this.myBookmarkComic.length);
                        //     //         console.log('=> The Data is :', this.myBookmarkComic);
                        //     //         this.isHaveBookmark = true;
                        //     //         console.log("=======================================================");
                        //     //     }
                        //     //     else{
                        //     //         console.log("=> Bookmark Comic Data (Google Plus) Not Found for this user", this.myBookmarkComic.length);
                        //     //         this.isHaveBookmark = false;
                        //     //     }
                        //     // });
                        //     //=========================//
                        //     //check favourite comic
                        //     // this.favoComicRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
                        //     //     this.myComicFav = [];
                        //     //     dataFavourite.forEach(dataFv => {
                        //     //         this.myComicFav.push(dataFv.val());
                        //     //         return false;
                        //     //     });
                        //     //     if(this.myComicFav){
                        //     //         console.log("========================================================");
                        //     //         console.log('=> Favourite Comic (Google Plus) Found. Count the Data :', this.myComicFav.length);
                        //     //         console.log('=> The Data is :', this.myComicFav);
                        //     //         this.isHaveFavourite = true;
                        //     //         console.log("========================================================");
                        //     //     }
                        //     //     else{
                        //     //         console.log("=>Favourite Comic Data (Google Plus) Not Found for this user", this.myComicFav.length);
                        //     //         this.isHaveFavourite = false;
                        //     //     }
                        //     // });
                        // } else {
                        //     console.log('=> Login First!');
                        //     this.isGoogleLogin  = false;
                        //     this.loggedin  = false;
                        // }
                        this.loggedin = true;
                        this.isGoogleLogin = true;
                        console.log('==> Google Plus Login Status :: CONNECTED');
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        // this.userProfile = null;
                        this.loggedin = false;
                        this.isGoogleLogin = false;
                        console.log('==> Google Plus Login Status :: DISCONNECTED');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // logoutGooglePlus(){
    //   this.gPlus.logout().then(res => {
    //     console.log("==> Google Plus Logout Success", res);
    //     this.userProfile = null;
    //     this.isGoogleLogin   = false;
    //     this.loggedin    = false;
    //   })
    // }
    //== END GOOGLE ==//
    // FACEBOOK BOOKMARK, FAVOURITE BOOK, BOOKMARK AND FAVOURITE COMIC, 
    // FOR GOOGLE PLUS I PLACED THEN ON GOOGLELOGINCHECK FUNCTION
    // getMyBookmark(){
    //     this.fb.getLoginStatus().then(res => {
    //         if(res.status == 'connect' || res.status == 'connected'){
    //             firebase.auth().onAuthStateChanged(user => {
    //                 this.FBData = user;
    //                 // console.log("User Detected. Data facebook Login for this user:", this.FBData);
    //                 this.loggedin = true;
    //                 this.isFacebookLogin = true;
    //                 this.userIDs      = this.FBData.uid;
    //                 // console.log('=> User ID Facebook:', this.userIDs);
    //                 this.bookmarkRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
    //                     this.myBookmark = [];
    //                     dataFavourite.forEach(dataFv => {
    //                         this.myBookmark.push(dataFv.val());
    //                         return false;
    //                     });
    //                     if(this.myBookmark){
    //                         console.log("========================================");
    //                         console.log('=> Bookmark Book Found. Count the Data :', this.myBookmark.length);
    //                         console.log('=> The Data is :', this.myBookmark);
    //                         console.log("========================================");
    //                         this.isHaveBookmark = true;
    //                         for(let data of this.myBookmark){
    //                             this.bookmarkBookTitle = data.book_title;
    //                             // console.log('data title dari firebase', this.bookmarkBookTitle);
    //                         }
    //                     }
    //                     else{
    //                         console.log("=> No Bookmark Book Found for this user", this.myBookmark.length);
    //                         this.isHaveBookmark = false;
    //                     }
    //                 });
    //             });
    //         }
    //     }).catch(err => {
    //       console.log(err);
    //     });
    // }
    // getFavouriteBook(){
    //     this.fb.getLoginStatus().then(res => {
    //       if(res.status == 'connect' || res.status == 'connected'){
    //         firebase.auth().onAuthStateChanged(user => {
    //         //   console.log("================================");
    //         //   console.log(" FACEBOOK FAVOURITE BOOK CHECK  ");
    //         //   console.log("--------------------------------");
    //           this.FBData = user;
    //         //   console.log("User Detected. Data facebook Login for this user:", this.FBData);
    //           this.loggedin = true;
    //           this.isFacebookLogin = true;
    //           this.userIDs      = this.FBData.uid;
    //           console.log('=> User ID Facebook:', this.userIDs);
    //           this.favoRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
    //             this.myFav = [];
    //             dataFavourite.forEach(dataFv => {
    //               this.myFav.push(dataFv.val());
    //               return false;
    //             });
    //             if(this.myFav){
    //                 console.log("=============================================");
    //                 console.log('=> Favourite Book Found. Count the data now :', this.myFav.length);
    //                 console.log('=> The Data is :', this.myFav);
    //                 this.isHaveFavourite = true;
    //                 console.log("=============================================");
    //             }
    //             else{
    //               console.log("=> No Favourite Book Found for this user", this.myFav.length);
    //               this.isHaveFavourite = false;
    //             }
    //           });
    //         //   console.log("==========================");
    //         });
    //       }
    //     }).catch(err => {
    //       console.log(err);
    //     });
    // }
    // getMyComicBookmark(){
    //     this.fb.getLoginStatus().then(res => {
    //       if(res.status == 'connect' || res.status == 'connected'){
    //         firebase.auth().onAuthStateChanged(user => {
    //         //   console.log("==========================");
    //         //   console.log(" FACEBOOK BOOKMARK CHECK  ");
    //         //   console.log("--------------------------");
    //           this.FBData = user;
    //         //   console.log("User Detected. Data facebook Login for this user:", this.FBData);
    //           this.loggedin = true;
    //           this.isFacebookLogin = true;
    //           this.userIDs      = this.FBData.uid;
    //           console.log('=> User ID Facebook:', this.userIDs);
    //           this.bookmarkComicRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
    //             this.myBookmarkComic = [];
    //             dataFavourite.forEach(dataFv => {
    //               this.myBookmarkComic.push(dataFv.val());
    //               return false;
    //             });
    //             if(this.myBookmarkComic){
    //                 console.log("=========================================");
    //                 console.log('=> Bookmark Comic Found. Count the Data :', this.myBookmarkComic.length);
    //                 console.log('=> The Data is :', this.myBookmarkComic);
    //                 this.isHaveBookmark = true;
    //                 console.log("=========================================");
    //             }
    //             else{
    //               console.log("=> No Bookmark Comic Found for this user", this.myBookmarkComic.length);
    //               this.isHaveBookmark = false;
    //             }
    //           });
    //           console.log("==========================");
    //         });
    //       }
    //     }).catch(err => {
    //       console.log(err);
    //     });
    // }
    // getFavouriteComic(){
    //     this.fb.getLoginStatus().then(res => {
    //       if(res.status == 'connect' || res.status == 'connected'){
    //         firebase.auth().onAuthStateChanged(user => {
    //         //   console.log("==========================");
    //         //   console.log(" FACEBOOK FAVOURITE CHECK  ");
    //         //   console.log("--------------------------");
    //           this.FBData = user;
    //         //   console.log("User Detected. Data facebook Login for this user:", this.FBData);
    //           this.loggedin = true;
    //           this.isFacebookLogin = true;
    //           this.userIDs      = this.FBData.uid;
    //           console.log('=> User ID Facebook:', this.userIDs);
    //           this.favoComicRef.orderByChild("userID").equalTo(this.userIDs).on('value', dataFavourite => {
    //             this.myComicFav = [];
    //             dataFavourite.forEach(dataFv => {
    //               this.myComicFav.push(dataFv.val());
    //               return false;
    //             });
    //             if(this.myComicFav){
    //                 console.log("==============================================");
    //                 console.log('=> Favourite Comic Found. Count the data now :', this.myComicFav.length);
    //                 console.log('=> The Data is :', this.myComicFav);
    //                 this.isHaveFavourite = true;
    //                 console.log("==============================================");
    //             }
    //             else{
    //               console.log("=> No Favourite Comic Found for this user", this.myComicFav.length);
    //               this.isHaveFavourite = false;
    //             }
    //           });
    //           console.log("==========================");
    //         });
    //       }
    //     }).catch(err => {
    //       console.log(err);
    //     });
    // }
    // FACEBOOK BOOKMARK AND FAVOURITE BOOK
    // showDetailBook(book) {
    //     console.log('=> show detail book', book);
    //     this.navCtrl.push(BookDetailPage, {
    //       book: book
    //     });
    // }
    // showDetailcomic(comic){
    //     console.log('=> show detail comic', comic);
    //     this.navCtrl.push(ComicDetailPage, {comic: comic});
    // }
    //== for refresh ==//
    LoginPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\login\login.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title *ngIf="!loggedin"><p class="biruMuda mb-0">Login</p></ion-title>\n\n        <!-- <ion-title *ngIf="loggedin"><p class="biruMuda mb-0">Account</p></ion-title> -->\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<!-- if not login -->\n\n<ion-content padding class="satu" *ngIf="!loggedin">\n\n    <div>\n\n        <div class="branding">\n\n            <h2 class="animated jackInTheBox" id="login-text">HELLO!</h2>\n\n                <p class="text-center customFont">Login to use our full feature app</p>\n\n            <img src="./assets/imgs/login.png" />\n\n        </div>\n\n\n\n        <button class="facebook" ion-button icon-left outline block (click)="loginFacebook()">\n\n            <ion-icon name="logo-facebook"></ion-icon>\n\n            Login with Facebook\n\n        </button>\n\n\n\n        <div class="login">\n\n            <button class="google" ion-button icon-left outline block color="danger" (click)="loginGoogle()">\n\n                <ion-icon name="logo-googleplus"></ion-icon>\n\n                Login with Google+\n\n            </button>\n\n        </div>\n\n    </div>\n\n\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content \n\n            pullingText="Pull to refresh"\n\n            pullingIcon="arrow-dropdown"\n\n            refreshingSpinner="circles"\n\n            refreshingText="fetching data ...">\n\n        </ion-refresher-content>\n\n    </ion-refresher>\n\n</ion-content>\n\n\n\n<!-- if login -->\n\n<!--<ion-content *ngIf="loggedin" class="dua">\n\n    <img src="./assets/imgs/account-cover.png" alt="Account Cover">\n\n    \n\n    if using facebook \n\n    <ion-card *ngIf="isFacebookLogin" class="facebook"> \n\n        <div class="wrapperIMG">\n\n            <img [src]="userProfile.photoURL" class="image-rounded">\n\n        </div>\n\n        <p class="text-center text-bold mt-10 font-18">{{ userProfile.displayName }}</p>\n\n        <p class="text-center">{{ userProfile.email }}</p>\n\n        \n\n        <ion-card-content class="text-center">\n\n                <button ion-button color="danger" round outline (click)="logoutFacebook()">LOGOUT FACEBOOK</button>\n\n        </ion-card-content>\n\n\n\n        <ion-grid class="pr-0 pl-0">\n\n            bookmark and favourite book\n\n            <ion-row>\n\n                <ion-col col-12 class="pr-0 pl-0 pb-0">\n\n                    <p class="text-bold text-center bg-biruMuda pt-5 pb-5">BOOKS</p>\n\n                </ion-col>\n\n                <ion-col col-12 class="pr-0 pl-0 pt-0">\n\n                    <ion-segment [(ngModel)]="loginSegment">\n\n                        <ion-segment-button value="BookmarkBook">\n\n                            <p class="text-bold mt-10">BOOKMARKED</p>\n\n                        </ion-segment-button>\n\n                        <ion-segment-button value="FavouriteBook">\n\n                            <p class="text-bold mt-10">FAVOURITES</p>\n\n                        </ion-segment-button>\n\n                    </ion-segment>\n\n            \n\n                    <div [ngSwitch]="loginSegment">\n\n                        <ion-list *ngSwitchCase="\'BookmarkBook\'">\n\n                            <div class="w-100 contentBook">\n\n                                <div *ngIf="myBookmark.length > 0; else notExist">\n\n                                    <ion-card *ngFor="let bookmark of myBookmark" class="bookmarkBook-content" (tap)="showDetailBook(bookmark.book_title)">\n\n                                        <ion-card-content>\n\n                                            <h2 class="text-bold">{{bookmark.book_title.replace(regex, \' \')}}</h2>\n\n                                            <h3>{{bookmark.book_author.replace(regex, \' \')}}</h3>\n\n                                            <h3>{{bookmark.book_release}}</h3>\n\n                                        </ion-card-content>\n\n                                    </ion-card>\n\n                                </div>\n\n                                <ng-template #notExist>\n\n                                    <ion-card>\n\n                                        <ion-card-content text-center class="takAda p-10 bookmarkBook-content">\n\n                                                <h2 class="text-bold">You not have bookmark for any book</h2>\n\n                                        </ion-card-content>\n\n                                    </ion-card>\n\n                                </ng-template>\n\n                            </div>\n\n                        </ion-list>\n\n\n\n                        <ion-list *ngSwitchCase="\'FavouriteBook\'">\n\n                            <div class="w-100 contentBook">\n\n                                <div *ngIf="myFav.length > 0; else notExist">\n\n                                    <ion-card *ngFor="let favourite of myFav" class="bookmarkBook-content">\n\n                                        <ion-card-content>\n\n                                            <h2 class="text-bold">{{favourite.book_title.replace(regex, \' \')}}</h2>\n\n                                            <h3>{{favourite.book_author.replace(regex, \' \')}}</h3>\n\n                                            <h3>{{favourite.book_release}}</h3>\n\n                                        </ion-card-content>\n\n                                    </ion-card>\n\n                                </div>\n\n                                <ng-template #notExist>\n\n                                    <ion-card>\n\n                                        <ion-card-content text-center class="takAda p-10 bookmarkBook-content">\n\n                                                <h2 class="text-bold">You not have bookmark for any book</h2>\n\n                                        </ion-card-content>\n\n                                    </ion-card>\n\n                                </ng-template>\n\n                            </div>\n\n                        </ion-list>            \n\n                    </div>\n\n                </ion-col>\n\n            </ion-row>\n\n\n\n            favourite and favourite comic\n\n            <ion-row>\n\n                <ion-col col-12 class="pr-0 pl-0 pb-0">\n\n                    <p class="text-bold text-center bg-biruMuda pt-5 pb-5">COMICS</p>\n\n                </ion-col>\n\n                <ion-col col-12 class="pr-0 pl-0 pt-0">\n\n                    <ion-segment [(ngModel)]="loginSegment">\n\n                        <ion-segment-button value="BookmarkComic">\n\n                            <p class="text-bold mt-10">BOOKMARKED</p>\n\n                        </ion-segment-button>\n\n                        <ion-segment-button value="FavouriteComic">\n\n                            <p class="text-bold mt-10">FAVOURITES</p>\n\n                        </ion-segment-button>\n\n                    </ion-segment>\n\n            \n\n                    <div [ngSwitch]="loginSegment">\n\n                        <ion-list *ngSwitchCase="\'BookmarkComic\'">\n\n                            <div class="w-100 contentBook">\n\n                                <div *ngIf="myBookmarkComic.length > 0; else notExist">\n\n                                    <ion-card *ngFor="let bookmark of myBookmarkComic" (tap)="showDetailcomic(bookmark.comic_title)" class="bookmarkBook-content">\n\n                                        <ion-card-content>\n\n                                            <h2 class="text-bold">{{bookmark.comic_title.replace(regex, \' \')}}</h2>\n\n                                            <h3>{{bookmark.comic_author.replace(regex, \' \')}}</h3>\n\n                                            <h3>{{bookmark.comic_genre}}</h3>\n\n                                            <h3>{{bookmark.comic_release}}</h3>\n\n                                        </ion-card-content>\n\n                                    </ion-card>\n\n                                </div>\n\n                                <ng-template #notExist>\n\n                                    <ion-card>\n\n                                        <ion-card-content text-center class="takAda" class="bookmarkBook-content">\n\n                                            <h2>You not have bookmark for any comic</h2>\n\n                                        </ion-card-content>\n\n                                    </ion-card>\n\n                                </ng-template>\n\n                            </div>\n\n                        </ion-list>\n\n\n\n                        <ion-list *ngSwitchCase="\'FavouriteComic\'">\n\n                            <div class="w-100 contentBook">\n\n                                <div *ngIf="myComicFav.length > 0; else notExist">\n\n                                    <ion-card *ngFor="let favourite of myComicFav" class="bookmarkBook-content">\n\n                                        <ion-card-content>\n\n                                            <h2 class="text-bold">{{favourite.comic_title.replace(regex, \' \')}}</h2>\n\n                                            <h3>{{favourite.comic_author.replace(regex, \' \')}}</h3>\n\n                                            <h3>{{favourite.comic_Genre}}</h3>\n\n                                            <h3>{{favourite.comic_release}}</h3>\n\n                                        </ion-card-content>\n\n                                    </ion-card>\n\n                                </div>\n\n                                <ng-template #notExist>\n\n                                    <button ion-item text-center class="takAda">\n\n                                        <h2>You not have bookmark for any book</h2>\n\n                                    </button>\n\n                                </ng-template>\n\n                            </div>\n\n                        </ion-list>            \n\n                    </div>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-grid>\n\n    </ion-card>\n\n\n\n    if using google plus\n\n    <ion-card *ngIf="isGoogleLogin" class="googleplus"> \n\n        <div class="wrapperIMG">\n\n            <img [src]="userProfile.imageUrl" class="image-rounded">\n\n        </div>\n\n        <p class="text-center text-bold mt-10 font-18">{{ userProfile.displayName }}</p>\n\n        <p class="text-center">{{ userProfile.email }}</p>\n\n        \n\n        <ion-card-content class="text-center">\n\n                <button ion-button color="danger" round outline (click)="logoutGooglePlus()">LOGOUT FACEBOOK</button>\n\n        </ion-card-content>\n\n\n\n        <ion-grid class="pr-0 pl-0">\n\n            bookmark and favourite book\n\n            <ion-row>\n\n                <ion-col col-12 class="pr-0 pl-0 pb-0">\n\n                    <p class="text-bold text-center bg-biruMuda pt-5 pb-5">BOOKS</p>\n\n                </ion-col>\n\n                <ion-col col-12 class="pr-0 pl-0 pt-0">\n\n                    <ion-segment [(ngModel)]="loginSegment">\n\n                        <ion-segment-button value="BookmarkBook">\n\n                            <p class="text-bold mt-10">BOOKMARKED</p>\n\n                        </ion-segment-button>\n\n                        <ion-segment-button value="FavouriteBook">\n\n                            <p class="text-bold mt-10">FAVOURITES</p>\n\n                        </ion-segment-button>\n\n                    </ion-segment>\n\n            \n\n                    <div [ngSwitch]="loginSegment">\n\n                        <ion-list *ngSwitchCase="\'BookmarkBook\'">\n\n                            <div class="w-100 contentBook">\n\n                                <div *ngIf="myBookmark.length > 0; else notExist">\n\n                                    <ion-card *ngFor="let bookmark of myBookmark" class="bookmarkBook-content" (tap)="showDetailBook(bookmark.book_title)">\n\n                                        <ion-card-content>\n\n                                            <h2 class="text-bold">{{bookmark.book_title.replace(regex, \' \')}}</h2>\n\n                                            <h3>{{bookmark.book_author.replace(regex, \' \')}}</h3>\n\n                                            <h3>{{bookmark.book_release}}</h3>\n\n                                        </ion-card-content>\n\n                                    </ion-card>\n\n                                </div>\n\n                                <ng-template #notExist>\n\n                                    <ion-card class="p0 mt-5">\n\n                                        <ion-card-content text-center class="takAda p-10 border2">\n\n                                                <h2 class="text-bold">You not have bookmark for any book</h2>\n\n                                        </ion-card-content>\n\n                                    </ion-card>\n\n                                </ng-template>\n\n                            </div>\n\n                        </ion-list>\n\n\n\n                        <ion-list *ngSwitchCase="\'FavouriteBook\'">\n\n                            <div class="w-100 contentBook">\n\n                                <div *ngIf="myFav.length > 0; else notExist">\n\n                                    <ion-card *ngFor="let favourite of myFav" class="bookmarkBook-content">\n\n                                        <ion-card-content>\n\n                                            <h2 class="text-bold">{{favourite.book_title.replace(regex, \' \')}}</h2>\n\n                                            <h3>{{favourite.book_author.replace(regex, \' \')}}</h3>\n\n                                            <h3>{{favourite.book_release}}</h3>\n\n                                        </ion-card-content>\n\n                                    </ion-card>\n\n                                </div>\n\n                                <ng-template #notExist>\n\n                                    <ion-card class="p0 mt-5">\n\n                                        <ion-card-content text-center class="takAda p-10 border2">\n\n                                                <h2 class="text-bold">You not have favourite for any book</h2>\n\n                                        </ion-card-content>\n\n                                    </ion-card>\n\n                                </ng-template>\n\n                            </div>\n\n                        </ion-list>            \n\n                    </div>\n\n                </ion-col>\n\n            </ion-row>\n\n\n\n            favourite and favourite comic\n\n            <ion-row>\n\n                <ion-col col-12 class="pr-0 pl-0 pb-0">\n\n                    <p class="text-bold text-center bg-biruMuda pt-5 pb-5">COMICS</p>\n\n                </ion-col>\n\n                <ion-col col-12 class="pr-0 pl-0 pt-0">\n\n                    <ion-segment [(ngModel)]="loginSegment">\n\n                        <ion-segment-button value="BookmarkComic">\n\n                            <p class="text-bold mt-10">BOOKMARKED</p>\n\n                        </ion-segment-button>\n\n                        <ion-segment-button value="FavouriteComic">\n\n                            <p class="text-bold mt-10">FAVOURITES</p>\n\n                        </ion-segment-button>\n\n                    </ion-segment>\n\n            \n\n                    <div [ngSwitch]="loginSegment">\n\n                        <ion-list *ngSwitchCase="\'BookmarkComic\'">\n\n                            <div class="w-100 contentBook">\n\n                                <div *ngIf="myBookmarkComic.length > 0; else notExist">\n\n                                    <ion-card *ngFor="let bookmark of myBookmarkComic" (tap)="showDetailcomic(bookmark.comic_title)" class="bookmarkBook-content">\n\n                                        <ion-card-content>\n\n                                            <h2 class="text-bold">{{bookmark.comic_title.replace(regex, \' \')}}</h2>\n\n                                            <h3>{{bookmark.comic_author.replace(regex, \' \')}}</h3>\n\n                                            <h3>{{bookmark.comic_genre}}</h3>\n\n                                            <h3>{{bookmark.comic_release}}</h3>\n\n                                        </ion-card-content>\n\n                                    </ion-card>\n\n                                </div>\n\n                                <ng-template #notExist>\n\n                                    <ion-card class="p0 mt-5">\n\n                                        <ion-card-content text-center class="takAda p-10 border2">\n\n                                                <h2 class="text-bold">You not have bookmark for any comic</h2>\n\n                                        </ion-card-content>\n\n                                    </ion-card>\n\n                                </ng-template>\n\n                            </div>\n\n                        </ion-list>\n\n\n\n                        <ion-list *ngSwitchCase="\'FavouriteComic\'">\n\n                            <div class="w-100 contentBook">\n\n                                <div *ngIf="myComicFav.length > 0; else notExist">\n\n                                    <ion-card *ngFor="let favourite of myComicFav" class="bookmarkBook-content">\n\n                                        <ion-card-content>\n\n                                            <h2 class="text-bold">{{favourite.comic_title.replace(regex, \' \')}}</h2>\n\n                                            <h3>{{favourite.comic_author.replace(regex, \' \')}}</h3>\n\n                                            <h3>{{favourite.comic_Genre}}</h3>\n\n                                            <h3>{{favourite.comic_release}}</h3>\n\n                                        </ion-card-content>\n\n                                    </ion-card>\n\n                                </div>\n\n                                <ng-template #notExist>\n\n                                    <ion-card class="p0 mt-5">\n\n                                        <ion-card-content text-center class="takAda p-10 border2">\n\n                                                <h2 class="text-bold">You not have favourite for any comic</h2>\n\n                                        </ion-card-content>\n\n                                    </ion-card>\n\n                                </ng-template>\n\n                            </div>\n\n                        </ion-list>            \n\n                    </div>\n\n                </ion-col>\n\n            </ion-row>\n\n\n\n        </ion-grid>\n\n    </ion-card>\n\n\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content \n\n      pullingText="Pull to refresh"\n\n      pullingIcon="arrow-dropdown"\n\n      refreshingSpinner="circles"\n\n      refreshingText="fetching data ...">\n\n    </ion-refresher-content>\n\n  </ion-refresher>\n\n</ion-content> -->'/*ion-inline-end:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\login\login.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__ionic_native_google_plus__["a" /* GooglePlus */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_google_plus__["a" /* GooglePlus */],
        __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_7__providers_bukufi_rest_bukufi_rest__["a" /* BukufiRestProvider */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserAccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_google_plus__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_bukufi_rest_bukufi_rest__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__book_detail_book_detail__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__comic_detail_comic_detail__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__home_home__ = __webpack_require__(94);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};











var UserAccountPage = (function () {
    function UserAccountPage(navCtrl, navParams, fb, gPlus, fire, afDatabase, platform, bukufiRest) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.gPlus = gPlus;
        this.fire = fire;
        this.afDatabase = afDatabase;
        this.platform = platform;
        this.bukufiRest = bukufiRest;
        this.loggedin = false;
        this.isGoogleLogin = false;
        this.isFacebookLogin = false;
        this.userProfile = null;
        this.regex = /\-/gi;
        this.dataFavourite2 = [];
        this.myBookmark = [];
        this.bookmarkRef = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref("/Bookmark-book");
        this.myFav = [];
        this.favoRef = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref("/Favourite-book");
        this.myBookmarkComic = [];
        this.bookmarkComicRef = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref("/Bookmark-Comic");
        this.myComicFav = [];
        this.favoComicRef = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref("/Favourite-Comic");
        //firebase db
        this.BookmarkBook = afDatabase.list('/Bookmark-book');
        this.FavouriteBook = afDatabase.list('/Favourite-book');
        this.BookmarkComic = afDatabase.list('/Bookmark-Comic');
        this.FavouriteComic = afDatabase.list('/Favourite-Comic');
        this.loginSegment = "BookmarkBook";
    }
    UserAccountPage.prototype.ionViewDidLoad = function () {
        console.clear();
        console.log("============================");
        console.log('Welcome to User Account Page');
        console.log("============================");
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
    };
    /*==- FACEBOOK -==*/
    //check login status
    UserAccountPage.prototype.checkFacebookLoginStatus = function () {
        var _this = this;
        this.fb.getLoginStatus().then(function (res) {
            if (res.status == 'connect' || res.status == 'connected') {
                __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        _this.userProfile = user;
                        _this.loggedin = true;
                        _this.isFacebookLogin = true;
                        console.log('==>%c Facebook Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
                        // console.log('=> User Facebook Login Data', this.userProfile);
                        _this.getMyBookmark();
                        _this.getFavouriteBook();
                        _this.getMyComicBookmark();
                        _this.getFavouriteComic();
                    }
                    else {
                        _this.userProfile = null;
                        _this.loggedin = false;
                        _this.isFacebookLogin = false;
                        console.log('==>%c Facebook Login Status :: DISCONNECTED ', 'background: red; color: white; font-weight: bold; display: block;');
                    }
                });
            }
            else {
                console.log('==>%c Facebook Login Status :: DISCONECTED ', 'background: red; color: white; font-weight: bold; display: block;');
                _this.loggedin = false;
                //this.loggedin  = res.status;
                //   console.log('=> logggedin status', this.loggedin);
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    UserAccountPage.prototype.logoutFacebook = function () {
        var _this = this;
        this.fb.logout().then(function (res) {
            console.log("==>%c Facebook Logout Success ", 'background: green; color: white; font-weight: bold; display: block;', res);
            _this.userProfile = null;
            _this.isFacebookLogin = false;
            _this.loggedin = false;
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__home_home__["a" /* HomePage */]);
        });
    };
    /*==- END FACEBOOK -==*/
    //== GOOGLE ==//
    //check login status
    UserAccountPage.prototype.checkGoogleLoginStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, this.gPlus.trySilentLogin({})];
                    case 1:
                        _a.userProfile = _b.sent();
                        // console.log('==> Google Plus Login Data', this.userProfile);
                        this.loggedin = true;
                        this.isGoogleLogin = true;
                        console.log('==>%c Google Plus Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
                        // console.log('=> logggedin status', this.loggedin);
                        // this.getMyBookmarkGooglePlus();
                        //check bookmark and favourite for google plus user
                        if (this.userProfile) {
                            this.userIDs = this.userProfile.userId;
                            // console.log("==> User ID Google Plus", this.userIDs);
                            //=========================//
                            //check bookmark book for google plus user
                            this.bookmarkRef.orderByChild("userID").equalTo(this.userIDs).on('value', function (dataFavourite) {
                                _this.myBookmark = [];
                                dataFavourite.forEach(function (dataFv) {
                                    _this.myBookmark.push(dataFv.val());
                                    return false;
                                });
                                if (_this.myBookmark) {
                                    console.log("======================================================");
                                    console.log('=>%c Bookmark Book (Google Plus) Found. Count the Data :', 'color: green; font-weight: bold;', _this.myBookmark.length);
                                    console.log('=>%c The Data is : ', 'color: green; font-weight: bold;', _this.myBookmark);
                                    _this.isHaveBookmark = true;
                                    console.log("======================================================");
                                }
                                else {
                                    console.log("=>%c No Bookmark Book data (Google Plus) for this user", 'color: red; font-weight: bold;', _this.myBookmark.length);
                                    _this.isHaveBookmark = false;
                                }
                            });
                            //=========================//
                            //check favourite book for google plus user
                            this.favoRef.orderByChild("userID").equalTo(this.userIDs).on('value', function (dataFavourite) {
                                _this.myFav = [];
                                dataFavourite.forEach(function (dataFv) {
                                    _this.myFav.push(dataFv.val());
                                    return false;
                                });
                                if (_this.myFav) {
                                    console.log("======================================================");
                                    console.log('=>%c Favourite Book (Google Plus) Found. Count the Data :', 'color: green; font-weight: bold;', _this.myFav.length);
                                    console.log('=>%c The Data is :', 'color: green; font-weight: bold;', _this.myFav);
                                    _this.isHaveFavourite = true;
                                    console.log("======================================================");
                                }
                                else {
                                    console.log("=>%c Favourite Book Data (Google Plus) Not Found for this user", 'color: red; font-weight: bold;', _this.myFav.length);
                                    _this.isHaveFavourite = false;
                                }
                            });
                            //=========================//
                            //check bookmark comic
                            this.bookmarkComicRef.orderByChild("userID").equalTo(this.userIDs).on('value', function (dataFavourite) {
                                _this.myBookmarkComic = [];
                                dataFavourite.forEach(function (dataFv) {
                                    _this.myBookmarkComic.push(dataFv.val());
                                    return false;
                                });
                                if (_this.myBookmarkComic) {
                                    console.log("=======================================================");
                                    console.log('=>%c Bookmark Comic (Google Plus) Found. Count the Data :', 'color: green; font-weight: bold;', _this.myBookmarkComic.length);
                                    console.log('=>%c The Data is :', 'color: green; font-weight: bold;', _this.myBookmarkComic);
                                    _this.isHaveBookmark = true;
                                    console.log("=======================================================");
                                }
                                else {
                                    console.log("=>%c Bookmark Comic Data (Google Plus) Not Found for this user", 'color: red; font-weight: bold;', _this.myBookmarkComic.length);
                                    _this.isHaveBookmark = false;
                                }
                            });
                            //=========================//
                            //check favourite comic
                            this.favoComicRef.orderByChild("userID").equalTo(this.userIDs).on('value', function (dataFavourite) {
                                _this.myComicFav = [];
                                dataFavourite.forEach(function (dataFv) {
                                    _this.myComicFav.push(dataFv.val());
                                    return false;
                                });
                                if (_this.myComicFav) {
                                    console.log("========================================================");
                                    console.log('=>%c Favourite Comic (Google Plus) Found. Count the Data :', 'color: green; font-weight: bold;', _this.myComicFav.length);
                                    console.log('=>%c The Data is :', 'color: green; font-weight: bold;', _this.myComicFav);
                                    _this.isHaveFavourite = true;
                                    console.log("========================================================");
                                }
                                else {
                                    console.log("=>%c Favourite Comic Data (Google Plus) Not Found for this user", 'color: red; font-weight: bold;', _this.myComicFav.length);
                                    _this.isHaveFavourite = false;
                                }
                            });
                        }
                        else {
                            console.log('=>%c Google Plus Login Not Detected. Login First!', 'color: red; font-weight: bold;');
                            this.isGoogleLogin = false;
                            this.loggedin = false;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        // this.userProfile = null;
                        this.loggedin = false;
                        this.isGoogleLogin = false;
                        console.log('==>%c Google Plus Login Status :: DISCONNECTED ', 'background: red; color: white; font-weight: bold; display: block;');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserAccountPage.prototype.logoutGooglePlus = function () {
        var _this = this;
        this.gPlus.logout().then(function (res) {
            console.log("==>%c Google Plus Logout Success ", 'background: green; color: white; font-weight: bold; display: block;', res);
            _this.userProfile = null;
            _this.isGoogleLogin = false;
            _this.loggedin = false;
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__home_home__["a" /* HomePage */]);
        });
    };
    //== END GOOGLE ==//
    // FACEBOOK BOOKMARK, FAVOURITE BOOK, BOOKMARK AND FAVOURITE COMIC, 
    // FOR GOOGLE PLUS I PLACED THEN ON GOOGLELOGINCHECK FUNCTION
    UserAccountPage.prototype.getMyBookmark = function () {
        var _this = this;
        this.fb.getLoginStatus().then(function (res) {
            if (res.status == 'connect' || res.status == 'connected') {
                __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth().onAuthStateChanged(function (user) {
                    _this.FBData = user;
                    // console.log("User Detected. Data facebook Login for this user:", this.FBData);
                    _this.loggedin = true;
                    _this.isFacebookLogin = true;
                    _this.userIDs = _this.FBData.uid;
                    console.log('=>%c User ID Facebook:', 'color: green; font-weight: bold;', _this.userIDs);
                    _this.bookmarkRef.orderByChild("userID").equalTo(_this.userIDs).on('value', function (dataFavourite) {
                        _this.myBookmark = [];
                        dataFavourite.forEach(function (dataFv) {
                            _this.myBookmark.push(dataFv.val());
                            return false;
                        });
                        if (_this.myBookmark) {
                            console.log("========================================");
                            console.log('=>%c Bookmark Book Found. Count the Data :', 'color: green; font-weight: bold;', _this.myBookmark.length);
                            console.log('=>%c The Data is :', 'color: green; font-weight: bold;', _this.myBookmark);
                            console.log("========================================");
                            _this.isHaveBookmark = true;
                            for (var _i = 0, _a = _this.myBookmark; _i < _a.length; _i++) {
                                var data = _a[_i];
                                _this.bookmarkBookTitle = data.book_title;
                                // console.log('data title dari firebase', this.bookmarkBookTitle);
                            }
                        }
                        else {
                            console.log("=>%c No Bookmark Book Found for this user", 'color: red; font-weight: bold;', _this.myBookmark.length);
                            _this.isHaveBookmark = false;
                        }
                    });
                });
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    UserAccountPage.prototype.getFavouriteBook = function () {
        var _this = this;
        this.fb.getLoginStatus().then(function (res) {
            if (res.status == 'connect' || res.status == 'connected') {
                __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth().onAuthStateChanged(function (user) {
                    //   console.log("================================");
                    //   console.log(" FACEBOOK FAVOURITE BOOK CHECK  ");
                    //   console.log("--------------------------------");
                    _this.FBData = user;
                    //   console.log("User Detected. Data facebook Login for this user:", this.FBData);
                    _this.loggedin = true;
                    _this.isFacebookLogin = true;
                    _this.userIDs = _this.FBData.uid;
                    //   console.log('=> User ID Facebook:', this.userIDs);
                    _this.favoRef.orderByChild("userID").equalTo(_this.userIDs).on('value', function (dataFavourite) {
                        _this.myFav = [];
                        dataFavourite.forEach(function (dataFv) {
                            _this.myFav.push(dataFv.val());
                            return false;
                        });
                        if (_this.myFav) {
                            console.log("=============================================");
                            console.log('=>%c Favourite Book Found. Count the data now :', 'color: green; font-weight: bold;', _this.myFav.length);
                            console.log('=>%c The Data is :', 'color: green; font-weight: bold;', _this.myFav);
                            _this.isHaveFavourite = true;
                            console.log("=============================================");
                        }
                        else {
                            console.log("=>% No Favourite Book Found for this user", 'color: green; font-weight: bold;', _this.myFav.length);
                            _this.isHaveFavourite = false;
                        }
                    });
                    //   console.log("==========================");
                });
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    UserAccountPage.prototype.getMyComicBookmark = function () {
        var _this = this;
        this.fb.getLoginStatus().then(function (res) {
            if (res.status == 'connect' || res.status == 'connected') {
                __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth().onAuthStateChanged(function (user) {
                    //   console.log("==========================");
                    //   console.log(" FACEBOOK BOOKMARK CHECK  ");
                    //   console.log("--------------------------");
                    _this.FBData = user;
                    //   console.log("User Detected. Data facebook Login for this user:", this.FBData);
                    _this.loggedin = true;
                    _this.isFacebookLogin = true;
                    _this.userIDs = _this.FBData.uid;
                    //   console.log('=> User ID Facebook:', this.userIDs);
                    _this.bookmarkComicRef.orderByChild("userID").equalTo(_this.userIDs).on('value', function (dataFavourite) {
                        _this.myBookmarkComic = [];
                        dataFavourite.forEach(function (dataFv) {
                            _this.myBookmarkComic.push(dataFv.val());
                            return false;
                        });
                        if (_this.myBookmarkComic) {
                            console.log("=========================================");
                            console.log('=>%c Bookmark Comic Found. Count the Data :', 'color: green; font-weight: bold;', _this.myBookmarkComic.length);
                            console.log('=>%c The Data is :', 'color: green; font-weight: bold;', _this.myBookmarkComic);
                            _this.isHaveBookmark = true;
                            console.log("=========================================");
                        }
                        else {
                            console.log("=>%c No Bookmark Comic Found for this user", 'color: red; font-weight: bold;', _this.myBookmarkComic.length);
                            _this.isHaveBookmark = false;
                        }
                    });
                    //   console.log("==========================");
                });
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    UserAccountPage.prototype.getFavouriteComic = function () {
        var _this = this;
        this.fb.getLoginStatus().then(function (res) {
            if (res.status == 'connect' || res.status == 'connected') {
                __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth().onAuthStateChanged(function (user) {
                    //   console.log("==========================");
                    //   console.log(" FACEBOOK FAVOURITE CHECK  ");
                    //   console.log("--------------------------");
                    _this.FBData = user;
                    //   console.log("User Detected. Data facebook Login for this user:", this.FBData);
                    _this.loggedin = true;
                    _this.isFacebookLogin = true;
                    _this.userIDs = _this.FBData.uid;
                    //   console.log('=> User ID Facebook:', this.userIDs);
                    _this.favoComicRef.orderByChild("userID").equalTo(_this.userIDs).on('value', function (dataFavourite) {
                        _this.myComicFav = [];
                        dataFavourite.forEach(function (dataFv) {
                            _this.myComicFav.push(dataFv.val());
                            return false;
                        });
                        if (_this.myComicFav) {
                            console.log("==============================================");
                            console.log('=>%c Favourite Comic Found. Count the data now :', 'color: green; font-weight: bold;', _this.myComicFav.length);
                            console.log('=>%c The Data is :', 'color: green; font-weight: bold;', _this.myComicFav);
                            _this.isHaveFavourite = true;
                            console.log("==============================================");
                        }
                        else {
                            console.log("=>%c No Favourite Comic Found for this user", 'color: red; font-weight: bold;', _this.myComicFav.length);
                            _this.isHaveFavourite = false;
                        }
                    });
                    //   console.log("==========================");
                });
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    // FACEBOOK BOOKMARK AND FAVOURITE BOOK
    UserAccountPage.prototype.showDetailBook = function (book) {
        console.log('=> show detail book', book);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__book_detail_book_detail__["a" /* BookDetailPage */], {
            book: book
        });
    };
    UserAccountPage.prototype.showDetailcomic = function (comic) {
        console.log('=> show detail comic', comic);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__comic_detail_comic_detail__["a" /* ComicDetailPage */], { comic: comic });
    };
    //== for refresh ==//
    UserAccountPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    return UserAccountPage;
}());
UserAccountPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-user-account',template:/*ion-inline-start:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\user-account\user-account.html"*/'<ion-header>\n  <ion-navbar>\n        <ion-title *ngIf="loggedin"><p class="biruMuda mb-0">Account</p></ion-title>\n  </ion-navbar>\n</ion-header>\n\n<!-- if login -->\n<ion-content *ngIf="loggedin">\n    <div id="coverImage">\n        <img src="./assets/imgs/account-cover.png" alt="Account Cover" class="accountCover">\n    </div>\n    \n    <!-- if using facebook -->\n    <ion-card *ngIf="isFacebookLogin" class="facebook"> \n        <div class="wrapperIMG">\n            <img [src]="userProfile.photoURL" class="image-rounded">\n        </div>\n        <p class="text-center text-bold mt-10 font-18">{{ userProfile.displayName }}</p>\n        <p class="text-center">{{ userProfile.email }}</p>\n        \n        <ion-card-content class="text-center">\n                <button ion-button color="danger" round outline (click)="logoutFacebook()">LOGOUT FACEBOOK</button>\n        </ion-card-content>\n\n        <ion-grid class="pr-0 pl-0">\n            <!-- bookmark and favourite book -->\n            <ion-row>\n                <ion-col col-12 class="pr-0 pl-0 pb-0">\n                    <p class="text-bold text-center bg-biruMuda pt-5 pb-5">BOOKS</p>\n                </ion-col>\n                <ion-col col-12 class="pr-0 pl-0 pt-0">\n                    <ion-segment [(ngModel)]="loginSegment">\n                        <ion-segment-button value="BookmarkBook">\n                            <p class="text-bold mt-10">BOOKMARKED</p>\n                        </ion-segment-button>\n                        <ion-segment-button value="FavouriteBook">\n                            <p class="text-bold mt-10">FAVOURITES</p>\n                        </ion-segment-button>\n                    </ion-segment>\n            \n                    <div [ngSwitch]="loginSegment">\n                        <ion-list *ngSwitchCase="\'BookmarkBook\'">\n                            <div class="w-100 contentBook">\n                                <div *ngIf="myBookmark.length > 0; else notExist">\n                                    <ion-grid>\n                                        <ion-row>\n                                            <ion-card *ngFor="let bookmark of myBookmark" class="bookmarkBook-content" (tap)="showDetailBook(bookmark.book_title)">\n                                                <ion-card-content>\n                                                    <h2 class="text-bold">{{bookmark.book_title.replace(regex, \' \')}}</h2>\n                                                    <h3>{{bookmark.book_author.replace(regex, \' \')}}</h3>\n                                                    <h3>{{bookmark.book_release}}</h3>\n                                                </ion-card-content>\n                                            </ion-card>\n                                        </ion-row>\n                                    </ion-grid>\n                                </div>\n                                <ng-template #notExist>\n                                    <ion-grid>\n                                        <ion-row>\n                                            <ion-card>\n                                                <ion-card-content text-center class="takAda p-10 bookmarkBook-content">\n                                                        <h2 class="text-bold">You not have bookmark for any book</h2>\n                                                </ion-card-content>\n                                            </ion-card>\n                                        </ion-row>\n                                    </ion-grid>\n                                </ng-template>\n                            </div>\n                        </ion-list>\n\n                        <ion-list *ngSwitchCase="\'FavouriteBook\'">\n                            <div class="w-100 contentBook">\n                                <div *ngIf="myFav.length > 0; else notExist">\n                                    <ion-grid>\n                                        <ion-row>\n                                            <ion-card *ngFor="let favourite of myFav" class="bookmarkBook-content">\n                                                <ion-card-content>\n                                                    <h2 class="text-bold">{{favourite.book_title.replace(regex, \' \')}}</h2>\n                                                    <h3>{{favourite.book_author.replace(regex, \' \')}}</h3>\n                                                    <h3>{{favourite.book_release}}</h3>\n                                                </ion-card-content>\n                                            </ion-card>\n                                        </ion-row>\n                                    </ion-grid>\n                                </div>\n                                <ng-template #notExist>\n                                    <ion-grid>\n                                        <ion-row>\n                                            <ion-card>\n                                                <ion-card-content text-center class="takAda p-10 bookmarkBook-content">\n                                                        <h2 class="text-bold">You not have bookmark for any book</h2>\n                                                </ion-card-content>\n                                            </ion-card>\n                                        </ion-row>\n                                    </ion-grid>\n                                </ng-template>\n                            </div>\n                        </ion-list>            \n                    </div>\n                </ion-col>\n            </ion-row>\n\n            <!-- favourite and favourite comic -->\n            <ion-row>\n                <ion-col col-12 class="pr-0 pl-0 pb-0">\n                    <p class="text-bold text-center bg-biruMuda pt-5 pb-5">COMICS</p>\n                </ion-col>\n                <ion-col col-12 class="pr-0 pl-0 pt-0">\n                    <ion-segment [(ngModel)]="loginSegment">\n                        <ion-segment-button value="BookmarkComic">\n                            <p class="text-bold mt-10">BOOKMARKED</p>\n                        </ion-segment-button>\n                        <ion-segment-button value="FavouriteComic">\n                            <p class="text-bold mt-10">FAVOURITES</p>\n                        </ion-segment-button>\n                    </ion-segment>\n            \n                    <div [ngSwitch]="loginSegment">\n                        <ion-list *ngSwitchCase="\'BookmarkComic\'">\n                            <div class="w-100 contentBook">\n                                <div *ngIf="myBookmarkComic.length > 0; else notExist">\n                                    <ion-grid>\n                                        <ion-row>\n                                            <ion-card *ngFor="let bookmark of myBookmarkComic" (tap)="showDetailcomic(bookmark.comic_title)" class="bookmarkBook-content">\n                                                <ion-card-content>\n                                                    <h2 class="text-bold">{{bookmark.comic_title.replace(regex, \' \')}}</h2>\n                                                    <h3>{{bookmark.comic_author.replace(regex, \' \')}}</h3>\n                                                    <h3>{{bookmark.comic_genre}}</h3>\n                                                    <h3>{{bookmark.comic_release}}</h3>\n                                                </ion-card-content>\n                                            </ion-card>\n                                        </ion-row>\n                                    </ion-grid>\n                                </div>\n                                <ng-template #notExist>\n                                    <ion-grid>\n                                        <ion-row>\n                                            <ion-card>\n                                                <ion-card-content text-center class="takAda" class="bookmarkBook-content">\n                                                    <h2>You not have bookmark for any comic</h2>\n                                                </ion-card-content>\n                                            </ion-card>\n                                        </ion-row>\n                                    </ion-grid>\n                                </ng-template>\n                            </div>\n                        </ion-list>\n\n                        <ion-list *ngSwitchCase="\'FavouriteComic\'">\n                            <div class="w-100 contentBook">\n                                <div *ngIf="myComicFav.length > 0; else notExist">\n                                    <ion-grid>\n                                        <ion-row>\n                                            <ion-card *ngFor="let favourite of myComicFav" class="bookmarkBook-content">\n                                                <ion-card-content>\n                                                    <h2 class="text-bold">{{favourite.comic_title.replace(regex, \' \')}}</h2>\n                                                    <h3>{{favourite.comic_author.replace(regex, \' \')}}</h3>\n                                                    <h3>{{favourite.comic_Genre}}</h3>\n                                                    <h3>{{favourite.comic_release}}</h3>\n                                                </ion-card-content>\n                                            </ion-card>\n                                        </ion-row>\n                                    </ion-grid>\n                                </div>\n                                <ng-template #notExist>\n                                    <ion-grid>\n                                        <ion-row>\n                                            <button ion-item text-center class="takAda">\n                                                <h2>You not have bookmark for any book</h2>\n                                            </button>\n                                        </ion-row>\n                                    </ion-grid>\n                                </ng-template>\n                            </div>\n                        </ion-list>            \n                    </div>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n    </ion-card>\n\n    <!-- if using google plus -->\n    <ion-card *ngIf="isGoogleLogin" class="googleplus"> \n        <div class="wrapperIMG">\n            <img [src]="userProfile.imageUrl" class="image-rounded">\n        </div>\n        <p class="text-center text-bold mt-10 font-18">{{ userProfile.displayName }}</p>\n        <p class="text-center">{{ userProfile.email }}</p>\n        \n        <ion-card-content class="text-center">\n                <button ion-button color="danger" round outline (click)="logoutGooglePlus()">LOGOUT GOOGLE PLUS</button>\n        </ion-card-content>\n\n        <ion-grid class="pr-0 pl-0">\n            <!-- bookmark and favourite book -->\n            <ion-row>\n                <ion-col col-12 class="pr-0 pl-0 pb-0">\n                    <p class="text-bold text-center bg-biruMuda pt-5 pb-5">BOOKS</p>\n                </ion-col>\n                <ion-col col-12 class="pr-0 pl-0 pt-0">\n                    <ion-segment [(ngModel)]="loginSegment">\n                        <ion-segment-button value="BookmarkBook">\n                            <p class="text-bold mt-10">BOOKMARKED</p>\n                        </ion-segment-button>\n                        <ion-segment-button value="FavouriteBook">\n                            <p class="text-bold mt-10">FAVOURITES</p>\n                        </ion-segment-button>\n                    </ion-segment>\n            \n                    <div [ngSwitch]="loginSegment">\n                        <ion-list *ngSwitchCase="\'BookmarkBook\'">\n                            <div class="w-100 contentBook">\n                                <div *ngIf="myBookmark.length > 0; else notExist">\n                                    <ion-grid>\n                                        <ion-row>\n                                            <ion-card *ngFor="let bookmark of myBookmark" class="bookmarkBook-content" (tap)="showDetailBook(bookmark.book_title)">\n                                                <ion-card-content>\n                                                    <h2 class="text-bold">{{bookmark.book_title.replace(regex, \' \')}}</h2>\n                                                    <h3>{{bookmark.book_author.replace(regex, \' \')}}</h3>\n                                                    <h3>{{bookmark.book_release}}</h3>\n                                                </ion-card-content>\n                                            </ion-card>\n                                        </ion-row>\n                                    </ion-grid>\n                                </div>\n                                <ng-template #notExist>\n                                    <ion-grid>\n                                        <ion-row>\n                                            <ion-card class="p0 mt-5">\n                                                <ion-card-content text-center class="takAda p-10 border2">\n                                                    <h2 class="text-bold">You not have bookmark for any book</h2>\n                                                </ion-card-content>\n                                            </ion-card>\n                                        </ion-row>\n                                    </ion-grid>\n                                </ng-template>\n                            </div>\n                        </ion-list>\n\n                        <ion-list *ngSwitchCase="\'FavouriteBook\'">\n                            <div class="w-100 contentBook">\n                                <div *ngIf="myFav.length > 0; else notExist">\n                                    <ion-grid>\n                                        <ion-row>\n                                            <ion-card *ngFor="let favourite of myFav" class="bookmarkBook-content">\n                                                <ion-card-content>\n                                                    <h2 class="text-bold">{{favourite.book_title.replace(regex, \' \')}}</h2>\n                                                    <h3>{{favourite.book_author.replace(regex, \' \')}}</h3>\n                                                    <h3>{{favourite.book_release}}</h3>\n                                                </ion-card-content>\n                                            </ion-card>\n                                        </ion-row>\n                                    </ion-grid>\n                                </div>\n                                <ng-template #notExist>\n                                    <ion-grid>\n                                        <ion-row>\n                                            <ion-card class="p0 mt-5">\n                                                <ion-card-content text-center class="takAda p-10 border2">\n                                                    <h2 class="text-bold">You not have favourite for any book</h2>\n                                                </ion-card-content>\n                                            </ion-card>\n                                        </ion-row>\n                                    </ion-grid>\n                                </ng-template>\n                            </div>\n                        </ion-list>            \n                    </div>\n                </ion-col>\n            </ion-row>\n\n            <!-- favourite and favourite comic -->\n            <ion-row>\n                <ion-col col-12 class="pr-0 pl-0 pb-0">\n                    <p class="text-bold text-center bg-biruMuda pt-5 pb-5">COMICS</p>\n                </ion-col>\n                <ion-col col-12 class="pr-0 pl-0 pt-0">\n                    <ion-segment [(ngModel)]="loginSegment">\n                        <ion-segment-button value="BookmarkComic">\n                            <p class="text-bold mt-10">BOOKMARKED</p>\n                        </ion-segment-button>\n                        <ion-segment-button value="FavouriteComic">\n                            <p class="text-bold mt-10">FAVOURITES</p>\n                        </ion-segment-button>\n                    </ion-segment>\n            \n                    <div [ngSwitch]="loginSegment">\n                        <ion-list *ngSwitchCase="\'BookmarkComic\'">\n                            <div class="w-100 contentBook">\n                                <div *ngIf="myBookmarkComic.length > 0; else notExist">\n                                    <ion-grid>\n                                        <ion-row>\n                                            <ion-card *ngFor="let bookmark of myBookmarkComic" (tap)="showDetailcomic(bookmark.comic_title)" class="bookmarkBook-content">\n                                                <ion-card-content>\n                                                    <h2 class="text-bold">{{bookmark.comic_title.replace(regex, \' \')}}</h2>\n                                                    <h3>{{bookmark.comic_author.replace(regex, \' \')}}</h3>\n                                                    <h3>{{bookmark.comic_genre}}</h3>\n                                                    <h3>{{bookmark.comic_release}}</h3>\n                                                </ion-card-content>\n                                            </ion-card>\n                                        </ion-row>\n                                    </ion-grid>\n                                </div>\n                                <ng-template #notExist>\n                                    <ion-grid>\n                                        <ion-row>\n                                            <ion-card class="p0 mt-5">\n                                                <ion-card-content text-center class="takAda p-10 border2">\n                                                    <h2 class="text-bold">You not have bookmark for any comic</h2>\n                                                </ion-card-content>\n                                            </ion-card>\n                                        </ion-row>\n                                    </ion-grid>\n                                </ng-template>\n                            </div>\n                        </ion-list>\n\n                        <ion-list *ngSwitchCase="\'FavouriteComic\'">\n                            <div class="w-100 contentBook">\n                                <div *ngIf="myComicFav.length > 0; else notExist">\n                                    <ion-grid>\n                                        <ion-row>\n                                            <ion-card *ngFor="let favourite of myComicFav" class="bookmarkBook-content">\n                                                <ion-card-content>\n                                                    <h2 class="text-bold">{{favourite.comic_title.replace(regex, \' \')}}</h2>\n                                                    <h3>{{favourite.comic_author.replace(regex, \' \')}}</h3>\n                                                    <h3>{{favourite.comic_Genre}}</h3>\n                                                    <h3>{{favourite.comic_release}}</h3>\n                                                </ion-card-content>\n                                            </ion-card>\n                                        </ion-row>\n                                    </ion-grid>\n                                </div>\n                                <ng-template #notExist>\n                                    <ion-grid>\n                                        <ion-row>\n                                            <ion-card class="p0 mt-5">\n                                                <ion-card-content text-center class="takAda p-10 border2">\n                                                    <h2 class="text-bold">You not have favourite for any comic</h2>\n                                                </ion-card-content>\n                                            </ion-card>\n                                        </ion-row>\n                                    </ion-grid>\n                                </ng-template>\n                            </div>\n                        </ion-list>            \n                    </div>\n                </ion-col>\n            </ion-row>\n\n        </ion-grid>\n    </ion-card>\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content \n            pullingText="Pull to refresh"\n            pullingIcon="arrow-dropdown"\n            refreshingSpinner="circles"\n            refreshingText="fetching data ...">\n        </ion-refresher-content>\n    </ion-refresher>\n</ion-content>'/*ion-inline-end:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\user-account\user-account.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_google_plus__["a" /* GooglePlus */],
        __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_7__providers_bukufi_rest_bukufi_rest__["a" /* BukufiRestProvider */]])
], UserAccountPage);

//# sourceMappingURL=user-account.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__book_list_book_list__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__comic_list_comic_list__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SearchPage = (function () {
    function SearchPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        console.clear();
    }
    SearchPage.prototype.ionViewDidLoad = function () {
        console.clear();
        console.log('===> SearchPage Loaded');
    };
    SearchPage.prototype.bookSearch = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__book_list_book_list__["a" /* BookListPage */]);
    };
    SearchPage.prototype.comicSearch = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__comic_list_comic_list__["a" /* ComicListPage */]);
    };
    return SearchPage;
}());
SearchPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-search',template:/*ion-inline-start:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\search\search.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n        <p class="biruMuda">Search</p>\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <img src="assets/imgs/search.png">\n\n  <ion-grid>\n\n    <ion-row>\n\n        <ion-col col-12 text-center>\n\n            <h4 class="biruTua">Choose what you want to search</h4>\n\n        </ion-col>\n\n      \n\n        <button ion-button outline icon-left block round (tap)="bookSearch()">\n\n          <ion-icon name="book"></ion-icon> Search Book\n\n        </button>\n\n      \n\n        <button ion-button color="secondary" outline icon-left block round (tap)="comicSearch()">\n\n            <ion-icon name="images"></ion-icon> Search Comic\n\n        </button>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\search\search.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], SearchPage);

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 518:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocialLoginProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SocialLoginProvider = (function () {
    function SocialLoginProvider(http, googlePlus) {
        this.http = http;
        this.googlePlus = googlePlus;
        console.log('Hello SocialLoginProvider Provider');
    }
    /*==- GOOGLE -==*/
    SocialLoginProvider.prototype.loginGoogle = function () {
        // this.googlePlus.login({})
        //   .then(res => {
        //     console.log(res);
        var _this = this;
        //     // this.displayName = res.displayName;
        //     // this.email = res.email;
        //     // this.familyName = res.familyName;
        //     // this.givenName = res.givenName;
        //     // this.userId = res.userId;
        //     // this.imageUrl = res.imageUrl;
        //     this.loggedin = true;
        //     console.log("==> Google Login Success", res);
        //     this.checkGoogleLogin();
        //   })
        //   .catch(err => console.error(err));
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            return _this.googlePlus.login({
                'webClientId': '285660351645-glnirpugp8kbjtoqrpie5k0q6knpvgeq.apps.googleusercontent.com',
                'offline': true
            })
                .then(function (res) {
                var firecreds = __WEBPACK_IMPORTED_MODULE_3_firebase_app___default.a.auth.GoogleAuthProvider.credential(res.idToken);
                __WEBPACK_IMPORTED_MODULE_3_firebase_app___default.a.auth().signInWithCredential(firecreds)
                    .then(function (success) { observer.next(success); })
                    .catch(function (error) {
                    observer.error(error);
                });
            });
        });
    };
    SocialLoginProvider.prototype.checkGoogleLogin = function () {
        this.googlePlus.getSigningCertificateFingerprint().then(function (res) {
            console.log('==> Google Login Status Now', res.length);
            if (res.length > 0) {
                __WEBPACK_IMPORTED_MODULE_3_firebase_app___default.a.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        console.log("=> Google Login Status : CONNECTED", user);
                    }
                    else {
                        console.log("=> Google Login Status : DISCONNECTED", user);
                    }
                });
            }
            // this.googleData = res;
            // console.log("==> Google Data", this.googleData);
        });
    };
    return SocialLoginProvider;
}());
SocialLoginProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */]])
], SocialLoginProvider);

//# sourceMappingURL=social-login.js.map

/***/ }),

/***/ 519:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EpubProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the EpubProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var EpubProvider = (function () {
    function EpubProvider(http) {
        this.http = http;
        console.log('Hello EpubProvider Provider');
    }
    return EpubProvider;
}());
EpubProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
], EpubProvider);

//# sourceMappingURL=epub.js.map

/***/ }),

/***/ 520:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_book_front_book_front__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_comic_front_comic_front__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, fb, googlePlus, zone) {
        var _this = this;
        this.fb = fb;
        this.googlePlus = googlePlus;
        this.zone = zone;
        this.loggedin = false;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            _this.zone.run(function () {
                _this.checkGoogleLoginStatus();
                _this.checkFacebookLoginStatus();
            });
        });
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Book', component: __WEBPACK_IMPORTED_MODULE_5__pages_book_front_book_front__["a" /* BookFrontPage */] },
            { title: 'Comic', component: __WEBPACK_IMPORTED_MODULE_6__pages_comic_front_comic_front__["a" /* ComicFrontPage */] }
        ];
    }
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.checkFacebookLoginStatus = function () {
        var _this = this;
        this.fb.getLoginStatus().then(function (res) {
            if (res.status == 'connect' || res.status == 'connected') {
                console.log("==> Facebook Login Check : USER FOUND");
                console.log('==> Facebook Login Status : CONNECTED');
                _this.loggedin = true;
                console.log('=> Facebook Logggedin status', _this.loggedin);
            }
            else {
                console.log("==> Facebook Login Check : USER NOT FOUND");
                console.log('==> Facebook Login Status : DISCONECTED');
                _this.loggedin = false;
                console.log('=> Facebook Logggedin status', _this.loggedin);
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    MyApp.prototype.checkGoogleLoginStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var status_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.googlePlus.trySilentLogin({})];
                    case 1:
                        status_1 = _a.sent();
                        this.loggedin = true;
                        console.log("==> Google Plus Login Check : USER FOUND");
                        console.log("=> Google Plus Login Status : CONNECTED");
                        console.log('=> Google Plus Logggedin status', this.loggedin);
                        console.log('=> Google Plus Status', status_1);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        this.loggedin = false;
                        console.log("==> Google Plus Login Check : USER NOT FOUND");
                        console.log("=> Google Plus Login Status : DISCONNECTED");
                        console.log('=> Google Plus Logggedin status', this.loggedin);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\app\app.html"*/'<ion-menu [content]="content">\n\n    <ion-header>\n\n        <ion-toolbar>\n\n        <ion-title>Menu</ion-title>\n\n        </ion-toolbar>\n\n    </ion-header>\n\n\n\n    <ion-content>\n\n        <ion-list>\n\n        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n            {{p.title}}\n\n        </button>\n\n        </ion-list>\n\n    </ion-content>\n\n</ion-menu>\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__["a" /* GooglePlus */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__book_book__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__search_search__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var BookDetailPage = (function () {
    function BookDetailPage(navCtrl, navParams, platform, bukufiRest, fb, gPlus, afDatabase, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.bukufiRest = bukufiRest;
        this.fb = fb;
        this.gPlus = gPlus;
        this.afDatabase = afDatabase;
        this.alertCtrl = alertCtrl;
        this.checkAvailableReview = 0;
        this.bookmarkConfirm = 0;
        //for facebook and google plus check
        this.userProfile = null;
        this.loggedin = false;
        this.isFacebookLogin = false;
        //for google plus check
        this.isGoogleLogin = false;
        this.myBookmark = [];
        this.bookmarkRef = __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.database().ref("/Bookmark-book");
        this.myFav = [];
        this.favoRef = __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.database().ref("/Favourite-book");
        this.book = this.navParams.get('book');
        // console.log('==> Parameter from HomePage: ',this.book);
        //firebase db
        this.BookmarkBook = afDatabase.list('/Bookmark-book');
        this.FavouriteBook = afDatabase.list('/Favourite-book');
        this.getDetail();
        this.getBookReview();
        this.getBookRating();
    }
    BookDetailPage.prototype.ionViewDidLoad = function () {
        console.clear();
        console.log('%c=====================', 'color: violet; font-weight: bold;');
        console.log('%c BookDetailPage loaded', 'color: green; font-weight: bold;');
        console.log('%c=====================', 'color: violet; font-weight: bold;');
        console.log("%c Platform Ready", 'color: green; font-weight: bold;');
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
    };
    /*===- GET DETAIL BOOK -===*/
    BookDetailPage.prototype.getDetail = function () {
        var _this = this;
        this.bukufiRest.getDetailBook(this.book)
            .then(function (data) {
            _this.book_detail = data;
            // console.log('==> Detail Book :', this.book_detail);
            //for bookmark and favourite
            for (var _i = 0, _a = _this.book_detail; _i < _a.length; _i++) {
                var favTemp = _a[_i];
                _this.bookAuthor = favTemp.book_author;
                _this.bookPublisher = favTemp.book_publisher;
                _this.bookRelease = favTemp.book_release;
            }
        });
    };
    /*===- END GET DETAIL BOOK -===*/
    /*===- GET BOOK REVIEW -===*/
    BookDetailPage.prototype.getBookReview = function () {
        var _this = this;
        this.bukufiRest.getReviewBook(this.book).then(function (data) {
            _this.bookReveiew = data;
            // console.log('book review data', this.bookReveiew);
            if (_this.bookReveiew.status_code != 404) {
                _this.checkAvailableReview = 1;
                console.log('---------------------');
                console.log('%c Book Review EXIST ', 'background: green; color: white; font-weight: bold; display: block;');
            }
            else {
                _this.checkAvailableReview = 0;
                console.log('---------------------');
                console.log("%c Book Review DOESN't EXIST ", 'background: red; color: white; font-weight: bold; display: block;');
            }
        }).catch(function (reject) {
            console.log('%c Error Occured ', 'background: red; color: white; font-weight: bold; display: block;', reject);
        });
    };
    /*===- END GET BOOK REVIEW -===*/
    /*===- BOOK RATING -===*/
    BookDetailPage.prototype.getBookRating = function () {
        var _this = this;
        this.bukufiRest.getBookRating(this.book).then(function (data) {
            _this.dataRating = data;
            if (_this.dataRating.avg_rating || _this.dataRating.total_vote) {
                console.log('---------------------');
                console.log("%c Book Rating EXIST ", 'background: green; color: white; font-weight: bold; display: block;');
                _this.bookRating = _this.dataRating.avg_rating;
                console.log('%c book rating: ', 'color: green; font-weight: bold;', _this.bookRating);
                _this.bookRating_totalView = _this.dataRating.total_vote;
                console.log('%c total data vote', 'color: green; font-weight: bold;', _this.bookRating_totalView);
            }
            else {
                console.log('-----------------------------');
                console.log("%c Book Rating DOESN't EXIST", 'background: red; color: white; font-weight: bold; display: block;');
                _this.bookRating = 0;
                // console.log('book rating: ',this.bookRating);
            }
        }).catch(function (reject) {
            console.log('%c Error Occured ', 'background: red; color: white; font-weight: bold; display: block;', reject);
        });
    };
    /*===- END BOOK RATING -===*/
    BookDetailPage.prototype.show = function (book) {
        console.log('show', book);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__book_book__["a" /* BookPage */], {
            book: book
        });
    };
    BookDetailPage.prototype.loginFirst = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
    };
    BookDetailPage.prototype.search = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__search_search__["a" /* SearchPage */]);
    };
    //===- FACEBOOK CHECK -===//
    BookDetailPage.prototype.checkFacebookLoginStatus = function () {
        var _this = this;
        this.fb.getLoginStatus().then(function (res) {
            if (res.status == 'connect' || res.status == 'connected') {
                __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        console.log("==========================");
                        console.log("   FACEBOOK LOGIN CHECK   ");
                        console.log("--------------------------");
                        _this.userProfile = user;
                        //   console.log('==> User Facebook Login Data', this.userProfile);
                        _this.loggedin = true;
                        _this.isFacebookLogin = true;
                        console.log('==>%c Facebook Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
                        console.log("=>%c isFacebookLogin status", 'color: green; font-weight: bold;', _this.isFacebookLogin);
                        _this.providerIDs = "Facebook";
                        _this.userIDs = _this.userProfile.uid;
                        _this.emailIDs = _this.userProfile.email;
                        //   console.log("=> Facebook User ID", this.userIDs);
                        _this.getMyBookmark();
                        // this.getFavouriteBook();
                        console.log("==========================");
                    }
                    else {
                        _this.isFacebookLogin = false;
                        console.log("==========================");
                        console.log("   FACEBOOK LOGIN CHECK   ");
                        console.log("--------------------------");
                        _this.isFacebookLogin = false;
                        _this.userProfile = null;
                        _this.loggedin = false;
                        console.log('==>%c Facebook Login Status :: DISCONNECTED ', 'background: red; color: white; font-weight: bold; display: block;');
                        console.log("=>%c isFacebookLogin status", 'color: red; font-weight: bold;', _this.isFacebookLogin);
                        console.log("==========================");
                    }
                });
            }
            else {
                console.log("==========================");
                console.log("   FACEBOOK LOGIN CHECK   ");
                console.log("--------------------------");
                console.log('==>%c Facebook Login Status :: DISCONECTED ', 'background: red; color: white; font-weight: bold; display: block;');
                _this.loggedin = false;
                _this.isFacebookLogin = false;
                console.log('=>%c isFacebookLogin status', 'color: red; font-weight: bold;', _this.isFacebookLogin);
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    //===- END -===//
    //===- GOOGLE CHECK -===//
    BookDetailPage.prototype.checkGoogleLoginStatus = function () {
        var _this = this;
        this.gPlus.trySilentLogin({}).then(function (stats) {
            if (stats) {
                console.log("==========================");
                console.log(" GOOGLE PLUS LOGIN CHECK ");
                console.log("--------------------------");
                _this.userProfile = stats;
                console.log('data login google plus', _this.userProfile);
                _this.loggedin = true;
                _this.isGoogleLogin = true;
                console.log('==>%c Google Plus Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
                //   console.log('=> isGoogleLogin status', this.isGoogleLogin);
                _this.providerIDs = "Google Plus";
                _this.userIDs = _this.userProfile.userId;
                _this.emailIDs = _this.userProfile.email;
                console.log("=>%c Google Plus User ID", 'color: green; font-weight: bold;', _this.userIDs);
                //check bookmark and favourite for google plus user
                if (_this.userProfile) {
                    _this.userIDs = _this.userProfile.userId;
                    // console.log("==> User ID Google Plus", this.userIDs);
                    //=========================//
                    //check bookmark book for google plus user
                    _this.bookmarkRef.orderByChild("userID").equalTo(_this.userIDs).on('value', function (dataFavourite) {
                        _this.myBookmark = [];
                        dataFavourite.forEach(function (dataFv) {
                            _this.myBookmark.push(dataFv.val());
                            return false;
                        });
                        if (_this.myBookmark) {
                            console.log("======================================================");
                            console.log('=>%c Bookmark Book (Google Plus) Found. Count the Data :', 'color: green; font-weight: bold;', _this.myBookmark.length);
                            console.log('=>%c The Data is : ', 'color: green; font-weight: bold;', _this.myBookmark);
                            _this.isHaveBookmark = true;
                            console.log("======================================================");
                        }
                        else {
                            console.log("=>%c No Bookmark Book data (Google Plus) for this user", 'color: red; font-weight: bold;', _this.myBookmark.length);
                            _this.isHaveBookmark = false;
                        }
                    });
                    //=========================//
                    //check favourite book for google plus user
                    _this.favoRef.orderByChild("userID").equalTo(_this.userIDs).on('value', function (dataFavourite) {
                        _this.myFav = [];
                        dataFavourite.forEach(function (dataFv) {
                            _this.myFav.push(dataFv.val());
                            return false;
                        });
                        if (_this.myFav) {
                            console.log("======================================================");
                            console.log('=>%c Favourite Book (Google Plus) Found. Count the Data :', 'color: green; font-weight: bold;', _this.myFav.length);
                            console.log('=>%c The Data is :', 'color: green; font-weight: bold;', _this.myFav);
                            _this.isHaveFavourite = true;
                            console.log("======================================================");
                        }
                        else {
                            console.log("=>%c Favourite Book Data (Google Plus) Not Found for this user", 'color: red; font-weight: bold;', _this.myFav.length);
                            _this.isHaveFavourite = false;
                        }
                    });
                }
                else {
                    console.log('=>%c Google Plus Login Not Detected. Login First!', 'color: red; font-weight: bold;');
                    _this.isGoogleLogin = false;
                    _this.loggedin = false;
                }
                console.log("==========================");
            }
            else {
                console.log('==>%c Google Plus Login Not Detected. Please Login ', 'background: red; color: white; font-weight: bold; display: block;');
                _this.isGoogleLogin = false;
                _this.loggedin = false;
                console.log('=>%c isGoogleLogin status', 'color: red; font-weight: bold;', _this.isGoogleLogin);
            }
        }).catch(function (error) {
            // this.userProfile = null;
            _this.loggedin = false;
            console.log("==========================");
            console.log(" GOOGLE PLUS LOGIN CHECK ");
            console.log("--------------------------");
            console.log('==>%c Google Plus Login Status :: DISCONNECTED ', 'background: red; color: white; font-weight: bold; display: block;');
            _this.isGoogleLogin = false;
            console.log('=>%c isGoogleLogin status', 'color: red; font-weight: bold;', _this.isGoogleLogin);
            console.log("==========================");
        });
    };
    //===- END -===//
    BookDetailPage.prototype.addFavouriteBook = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        console.log('==-> Cancel Favourite clicked');
                    }
                },
                {
                    text: 'Add to Favourite',
                    handler: function (data) {
                        var newFavBookRef = _this.FavouriteBook.push({});
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
    };
    BookDetailPage.prototype.addBookmarkBook = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        console.log('==-> Cancel Bookmark clicked');
                    }
                },
                {
                    text: 'Add to Bookmark',
                    handler: function (data) {
                        var newBookmarkBook = _this.BookmarkBook.push({});
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
    };
    //for facebook login
    BookDetailPage.prototype.getMyBookmark = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.auth().onAuthStateChanged(function (user) {
            _this.FBData = user;
            // console.log("User Detected. Data facebook Login for this user:", this.FBData);
            _this.loggedin = true;
            _this.isFacebookLogin = true;
            _this.userIDs = _this.FBData.uid;
            console.log('=>%c User ID Facebook:', 'color: green; font-weight: bold;', _this.userIDs);
            console.log('%c Current Book', 'color: green; font-weight: bold;', _this.book);
            // pilih data dari user yang masuk dulu
            _this.bookmarkRef.orderByChild("userID").startAt(_this.userIDs).on("child_added", function (snapshot) {
                // kemudiann saring berdasarkan page sekarang
                // this.book = this.navParams.get('book');
                this.bookmarkBookTitle = snapshot.val();
                // console.log("data buku judul", this.book);
                console.log("dataku", this.bookmarkBookTitle.book_title);
                if (this.bookmarkBookTitle.book_title == this.book) {
                    console.log("ada");
                }
                else {
                    console.log("tak ada");
                }
            });
            // this.bookmarkRef.orderby("book_title").equalTo(this.book).on('value', dataFavourite => {
            //     this.myBookmark = [];
            //     dataFavourite.forEach(dataFv => {
            //         this.myBookmark.push(dataFv.toJSON());
            //         // for(let data of this.myBookmark){
            //         //     this.bookmarkBookTitle = data.book_title;
            //         //     if(this.book == this.bookmarkBookTitle){
            //         //         console.log("You Already Bookmarked this Book");
            //         //         this.bookmarkConfirm = 0;
            //         //     } else {
            //         //         console.log("You Not Yet Bookmarked this Book Before");
            //         //         this.bookmarkConfirm = 1;
            //         //     }
            //         // }
            //         return false;
            //     });
            //     console.log('ttt', this.myBookmark);
            // });
        });
    };
    BookDetailPage.prototype.getFavouriteBook = function () {
        var _this = this;
        this.fb.getLoginStatus().then(function (res) {
            if (res.status == 'connect' || res.status == 'connected') {
                __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.auth().onAuthStateChanged(function (user) {
                    //   console.log("================================");
                    //   console.log(" FACEBOOK FAVOURITE BOOK CHECK  ");
                    //   console.log("--------------------------------");
                    _this.FBData = user;
                    //   console.log("User Detected. Data facebook Login for this user:", this.FBData);
                    _this.loggedin = true;
                    _this.isFacebookLogin = true;
                    _this.userIDs = _this.FBData.uid;
                    //   console.log('=> User ID Facebook:', this.userIDs);
                    _this.favoRef.orderByChild("userID").equalTo(_this.userIDs).on('value', function (dataFavourite) {
                        _this.myFav = [];
                        dataFavourite.forEach(function (dataFv) {
                            _this.myFav.push(dataFv.val());
                            return false;
                        });
                        if (_this.myFav) {
                            console.log("=============================================");
                            console.log('=>%c Favourite Book Found. Count the data now :', 'color: green; font-weight: bold;', _this.myFav.length);
                            console.log('=>%c The Data is :', 'color: green; font-weight: bold;', _this.myFav);
                            _this.isHaveFavourite = true;
                            console.log("=============================================");
                        }
                        else {
                            console.log("=>% No Favourite Book Found for this user", 'color: green; font-weight: bold;', _this.myFav.length);
                            _this.isHaveFavourite = false;
                        }
                    });
                    //   console.log("==========================");
                });
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    BookDetailPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        //check login status
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    return BookDetailPage;
}());
BookDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-book-detail',template:/*ion-inline-start:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\book-detail\book-detail.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title *ngFor="let book of book_detail">\n\n            <p class="biruMuda mb-0 mt-0">{{book.book_title_nodash}}</p>\n\n        </ion-title>\n\n        <ion-buttons end>\n\n            <div *ngIf="loggedin == false; else loginTrue">\n\n                <button ion-button class="login-indicator-false">\n\n                <ion-icon name="sunny" end></ion-icon>\n\n                </button>\n\n            </div>\n\n            <ng-template #loginTrue>\n\n                <div *ngIf="isFacebookLogin == true">\n\n                    <button ion-button class="login-indicator-true">\n\n                    <ion-icon name="logo-facebook"></ion-icon>\n\n                    </button>\n\n                </div>\n\n                <div *ngIf="isGoogleLogin == true">\n\n                    <button ion-button class="login-indicator-true">\n\n                    <ion-icon name="logo-googleplus"></ion-icon>\n\n                    </button>\n\n                </div>\n\n            </ng-template>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-card *ngFor="let book of book_detail">\n\n    <ion-grid>\n\n      <ion-row>\n\n        <!-- left side -->\n\n        <ion-col col-6 class="pl-10 pt-10">\n\n            <div *ngIf="book.book_stikcer == \'New\'">\n\n              <div class="cnrflash-new">\n\n                <div class="cnrflash-inner-new">\n\n                    <span class="cnrflash-label-new">\n\n                      NEW\n\n                    </span>\n\n                </div>\n\n              </div>\n\n            </div>\n\n  \n\n            <div *ngIf="book.book_stikcer == \'Popular\'">\n\n              <div class="cnrflash-popular">\n\n                <div class="cnrflash-inner-popular">\n\n                    <span class="cnrflash-label-popular">\n\n                      POPULAR\n\n                    </span>\n\n                </div>\n\n              </div>\n\n            </div>\n\n  \n\n            <div *ngIf="book.book_stikcer == \'Recomended\'">\n\n              <div class="cnrflash-recomended">\n\n                <div class="cnrflash-inner-recomended">\n\n                    <span class="cnrflash-label-recomended">\n\n                      RECOMENDED\n\n                    </span>\n\n                </div>\n\n              </div>\n\n            </div>\n\n  \n\n            <div *ngIf="book.book_stikcer == \'Editor Pick\'">\n\n              <div class="cnrflash-editor-pick">\n\n                <div class="cnrflash-inner-editor-pick">\n\n                    <span class="cnrflash-label-editor-pick">\n\n                      EDITOR <br> PICK\n\n                    </span>\n\n                </div>\n\n              </div>\n\n            </div>\n\n\n\n            <img src="http://bukufi.com/storage/book/book_cover/{{book.book_image}}" class="bookCover"/>\n\n        </ion-col>\n\n\n\n        <!-- right side -->\n\n        <ion-col col-6 class="pr-10 pt-10">\n\n            <p class="text-bold biruTua">{{book.book_title_nodash}}</p>\n\n            <p class="biruTua justify">{{book.book_author_nodash}}</p>\n\n            <p class="biruTua">1xx Pages</p>\n\n\n\n            <ion-row>\n\n                <ion-col col-8 class="pl-0">\n\n                    <!-- no star  -->\n\n                    <div id="rating" *ngIf="bookRating == 0 || bookRating == 0.0">\n\n                        <ion-icon name="star-outline" class="starReview"></ion-icon>\n\n                    </div>\n\n\n\n                    <!-- star 1 -->\n\n                    <div id="rating" *ngIf="bookRating == 1 || bookRating == 1.0 || bookRating == 1.1 || bookRating == 1.2 || bookRating == 1.3 || bookRating == 1.4">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                    </div>\n\n    \n\n                    <div id="rating" *ngIf="bookRating == 1.5 || bookRating == 1.6 || bookRating == 1.7 || bookRating == 1.8 || bookRating == 1.9">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star-half" class="starColor"></ion-icon>\n\n                    </div>\n\n\n\n                    <!-- star 2 -->\n\n                    <div id="rating" *ngIf="bookRating == 2 || bookRating == 2.0 || bookRating == 2.1 || bookRating == 2.2 || bookRating == 2.3 || bookRating == 2.4">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                    </div>\n\n    \n\n                    <div id="rating" *ngIf="bookRating == 2.5 || bookRating == 2.6 || bookRating == 2.7 || bookRating == 2.8 || bookRating == 2.9">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star-half" class="starColor"></ion-icon>\n\n                    </div>\n\n\n\n                    <!-- star 3 -->\n\n                    <div id="rating" *ngIf="bookRating == 3 || bookRating == 3.0 || bookRating == 3.1 || bookRating == 3.2 || bookRating == 3.3 || bookRating == 3.4">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                    </div>\n\n    \n\n                    <div id="rating" *ngIf="bookRating == 3.5 || bookRating == 3.6 || bookRating == 3.7 || bookRating == 3.8 || bookRating == 3.9">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star-half" class="starColor"></ion-icon>\n\n                    </div>\n\n\n\n                    <!-- 4 star -->\n\n                    <div id="rating" *ngIf="bookRating == 4.0 || bookRating == 4.1 || bookRating == 4.2 || bookRating == 4.3 || bookRating == 4.4">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                    </div>\n\n                    <div id="rating" *ngIf="bookRating == 4.5 || bookRating == 4.6 || bookRating == 4.7 || bookRating == 4.8 || bookRating == 4.9">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star-half" class="starColor"></ion-icon>\n\n                    </div>\n\n\n\n                    <!-- 5 star -->\n\n                    <div id="rating" *ngIf="bookRating == 5 || bookRating == 5.0">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                    </div>\n\n                </ion-col>\n\n                <ion-col col-4 class="pl-0">\n\n                    <div *ngIf="bookRating_totalView">\n\n                        <p class="biruTua">({{bookRating_totalView}})</p>\n\n                    </div>\n\n                    <div *ngIf="!bookRating_totalView">\n\n                        <p class="biruTua mb-0">(0)</p>\n\n                    </div>\n\n                </ion-col>\n\n            </ion-row>\n\n\n\n            <ion-row class="btn-action w-100">\n\n                <div *ngIf="loggedin" class="w-100">\n\n                    <!-- <button *ngIf="bookmarkConfirm == 1" ion-button round outline block icon-left class="buttonColor mt-15" disabled>\n\n                        <ion-icon name="ios-bookmark-outline"></ion-icon>\n\n                        BOOKMARK dis\n\n                    </button>\n\n\n\n                    <button *ngIf="bookmarkConfirm == 0" ion-button round outline block icon-left class="buttonColor mt-15" (click)="addBookmarkBook()">\n\n                        <ion-icon name="ios-bookmark-outline"></ion-icon>\n\n                        BOOKMARK nondis\n\n                    </button> -->\n\n                    {{bookmarkConfirm}}\n\n                </div>\n\n    \n\n                <div *ngIf="!loggedin" class="w-100">\n\n                    <button ion-button round outline block icon-left class="buttonColor mt-15" disabled>\n\n                        <ion-icon name="ios-bookmark-outline"></ion-icon>\n\n                        BOOKMARK\n\n                    </button>\n\n                </div>\n\n    \n\n                <div *ngIf="loggedin" class="w-100">\n\n                    <button ion-button round outline block icon-left class="buttonColor mt-0" (click)="addFavouriteBook()">\n\n                        <ion-icon name="ios-heart-outline"></ion-icon>\n\n                        FAVOURITE\n\n                    </button>\n\n                </div>\n\n    \n\n                <div *ngIf="!loggedin" class="w-100">\n\n                    <button ion-button round outline block icon-left class="buttonColor mt-0" disabled>\n\n                        <ion-icon name="ios-heart-outline"></ion-icon>\n\n                        FAVOURITE\n\n                    </button>\n\n                </div>\n\n            </ion-row>\n\n        </ion-col>\n\n\n\n        <!-- button -->\n\n        <ion-col col-12 class="pl-10 pr-10">\n\n            <!-- <button ion-button block class="readBook">READ BOOK</button> -->\n\n            <div *ngIf="loggedin; else nologin">\n\n                <!-- for login user -->\n\n                <div *ngIf="isFacebookLogin == true; else googlelogin">\n\n                    <button ion-button block class="readBook" (tap)="show(book.book_file)">\n\n                        READ BOOK\n\n                    </button>\n\n                </div>\n\n\n\n                <ng-template #googlelogin>\n\n                    <button ion-button block (tap)="show(book.book_file)" class="readBook">\n\n                        READ BOOK\n\n                    </button>\n\n                </ng-template>\n\n            </div>\n\n\n\n            <ng-template #nologin>\n\n                <button ion-button block icon-left (tap)="show(book.book_file)" class="readBook" disabled>\n\n                        READ BOOK\n\n                </button>\n\n            </ng-template>\n\n        </ion-col>\n\n\n\n        <hr id="hr1">\n\n\n\n        <!-- description area -->\n\n        <ion-col col-12 class="pl-10 pr-10">\n\n            <ion-row>\n\n                <ion-col class="pt-0">\n\n                    <p class="text-bold text-center starColor">DETAILS</p>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row class="desc">\n\n                <ion-col col-4 class="no-padding-left-right">\n\n                    <p class="text-bold text-black">Author</p>\n\n                </ion-col>\n\n                <ion-col col-1 id="colon">:</ion-col>\n\n                <ion-col col-7 class="no-padding-left-right no-padding-btm">\n\n                <p class="text-bold text-black">{{book.book_author_nodash}}</p>\n\n                </ion-col>\n\n                <hr>\n\n            </ion-row>\n\n            <ion-row class="desc">\n\n                <ion-col col-4 class="no-padding-left-right">\n\n                    <p class="text-bold text-black">\n\n                        Publisher\n\n                    </p>\n\n                </ion-col>\n\n                <ion-col col-1 id="colon">:</ion-col>\n\n                <ion-col col-7 class="no-padding-left-right no-padding-btm">\n\n                <p class="text-bold text-black">{{book.book_publisher_nodash}}</p>\n\n                </ion-col>\n\n                <hr>\n\n            </ion-row>\n\n            <ion-row class="desc">\n\n                <ion-col col-4 class="no-padding-left-right">\n\n                    <p class="text-bold text-black">\n\n                        Release\n\n                    </p>\n\n                </ion-col>\n\n                <ion-col col-1 id="colon">:</ion-col>\n\n                <ion-col col-7 class="no-padding-left-right no-padding-btm">\n\n                <p class="text-bold text-black">{{book.book_release}}</p>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-col>\n\n        <hr id="hr1">\n\n        <!-- reviews -->\n\n        <ion-col col-12>\n\n                <p class="text-bold text-center starColor">REVIEWS</p>\n\n        </ion-col>\n\n\n\n        <hr id="hr2">\n\n        \n\n        <div *ngIf="checkAvailableReview == 1" class="w-100">\n\n            <ion-row class="w-100" *ngFor="let review of bookReveiew">\n\n                <ion-col col-7>\n\n                    <p class="text-bold">{{review.user_name}}</p>\n\n                </ion-col>\n\n\n\n                <ion-col col-5 class="text-right">\n\n                    <!-- no star  -->\n\n                    <div id="rating" *ngIf="review.user_book_rating == 0 || review.user_book_rating == 0.0">\n\n                        <ion-icon name="star-outline" class="starReview"></ion-icon>\n\n                    </div> \n\n    \n\n                    <!-- star 1 -->\n\n                    <div id="rating" *ngIf="review.user_book_rating == 1 || review.user_book_rating == 1.0 || review.user_book_rating == 1.1 || review.user_book_rating == 1.2 || review.user_book_rating == 1.3 || review.user_book_rating == 1.4">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                    </div>\n\n    \n\n                    <div id="rating" *ngIf="review.user_book_rating == 1.5 || review.user_book_rating == 1.6 || review.user_book_rating == 1.7 || review.user_book_rating == 1.8 || review.user_book_rating == 1.9">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star-half" class="starColor"></ion-icon>\n\n                    </div>\n\n    \n\n                    <!-- star 2 -->\n\n                    <div id="rating" *ngIf="review.user_book_rating == 2 || review.user_book_rating == 2.0 || review.user_book_rating == 2.1 || review.user_book_rating == 2.2 || review.user_book_rating == 2.3 || review.user_book_rating == 2.4">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                    </div>\n\n    \n\n                    <div id="rating" *ngIf="review.user_book_rating == 2.5 || review.user_book_rating == 2.6 || review.user_book_rating == 2.7 || review.user_book_rating == 2.8 || review.user_book_rating == 2.9">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star-half" class="starColor"></ion-icon>\n\n                    </div>\n\n    \n\n                    <!-- star 3 -->\n\n                    <div id="rating" *ngIf="review.user_book_rating == 3 || review.user_book_rating == 3.0 || review.user_book_rating == 3.1 || review.user_book_rating == 3.2 || review.user_book_rating == 3.3 || review.user_book_rating == 3.4">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                    </div>\n\n    \n\n                    <div id="rating" *ngIf="review.user_book_rating == 3.5 || review.user_book_rating == 3.6 || review.user_book_rating == 3.7 || review.user_book_rating == 3.8 || review.user_book_rating == 3.9">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star-half" class="starColor"></ion-icon>\n\n                    </div>\n\n    \n\n                    <!-- 4 star -->\n\n                    <div id="rating" *ngIf="review.user_book_rating == 4.0 || review.user_book_rating == 4.1 || review.user_book_rating == 4.2 || review.user_book_rating == 4.3 || review.user_book_rating == 4.4">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                    </div>\n\n                    <div id="rating" *ngIf="review.user_book_rating == 4.5 || review.user_book_rating == 4.6 || review.user_book_rating == 4.7 || review.user_book_rating == 4.8 || review.user_book_rating == 4.9">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star-half" class="starColor"></ion-icon>\n\n                    </div>\n\n    \n\n                    <!-- 5 star -->\n\n                    <div id="rating" *ngIf="review.user_book_rating == 5 || review.user_book_rating == 5.0">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                    </div>\n\n                </ion-col>\n\n                <ion-col class="pt-7">\n\n                    {{review.user_book_review}}\n\n                </ion-col>\n\n                <hr id="hr2">\n\n            </ion-row>\n\n        </div>\n\n        <div *ngIf="checkAvailableReview == 0" class="w-100">\n\n            <ion-row>\n\n                <ion-col col-12>\n\n                    <p class="text-bold text-center biruTua">This book has not had a review</p>\n\n                </ion-col>\n\n            </ion-row>\n\n        </div>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-card>\n\n\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content \n\n      pullingText="Pull to refresh"\n\n      pullingIcon="arrow-dropdown"\n\n      refreshingSpinner="circles"\n\n      refreshingText="fetching data ...">\n\n    </ion-refresher-content>\n\n  </ion-refresher>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\book-detail\book-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__["a" /* BukufiRestProvider */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__["a" /* GooglePlus */],
        __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], BookDetailPage);

//# sourceMappingURL=book-detail.js.map

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComicDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__comic_comic__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__search_search__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_plus__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__user_account_user_account__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var ComicDetailPage = (function () {
    function ComicDetailPage(navCtrl, navParams, bukufiRest, fb, gPlus, alertCtrl, afDatabase) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.bukufiRest = bukufiRest;
        this.fb = fb;
        this.gPlus = gPlus;
        this.alertCtrl = alertCtrl;
        this.afDatabase = afDatabase;
        this.loggedin = false;
        this.isGoogleLogin = false;
        this.isFacebookLogin = false;
        this.userProfile = null;
        this.checkAvailableReview = 0;
        this.isHaveCounter = false;
        this.myFavourite = [];
        this.favouriteRef = __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.database().ref("/Favourite-Comic");
        this.myBookmark = [];
        this.bookmarkRef = __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.database().ref("/Bookmark-Comic");
        this.comic = this.navParams.get('comic');
        console.log('==> parameter from home :', this.comic);
        this.getDetail();
        this.getComicReview();
        // this.getComicCounter();
        this.getComicStatistic();
        //create database reference
        this.favouriteComic = afDatabase.list('/Favourite-Comic');
        this.BookmarkComic = afDatabase.list('/Bookmark-Comic');
        console.clear();
    }
    ComicDetailPage.prototype.ionViewDidLoad = function () {
        console.clear();
        console.log("===========================");
        console.log('===> ComicDetailPage Loaded');
        console.log("===========================");
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
    };
    ComicDetailPage.prototype.getDetail = function () {
        var _this = this;
        this.bukufiRest.getDetailComic(this.comic)
            .then(function (data) {
            _this.comic_detail = data;
            console.log('==> Detail Comic :', _this.comic_detail);
            //for bookmark and favourite comic
            for (var _i = 0, _a = _this.comic_detail.data1; _i < _a.length; _i++) {
                var dataCom = _a[_i];
                _this.comicAuthor = dataCom.comic_author;
                _this.comicGenre = dataCom.comic_genre;
                _this.comicRelease = dataCom.comic_release;
                // console.log("comic author", this.comicAuthor);
                // console.log("comic publisher", this.comicGenre);
                // console.log("comic release", this.comicRelease);
            }
        });
    };
    ComicDetailPage.prototype.readComic = function (comic_title, comic_chapter) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__comic_comic__["a" /* ComicPage */], {
            comic_title: comic_title,
            comic_chapter: comic_chapter
        });
    };
    ComicDetailPage.prototype.loginFirst = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
    };
    ComicDetailPage.prototype.userInformation = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__user_account_user_account__["a" /* UserAccountPage */]);
    };
    ComicDetailPage.prototype.search = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__search_search__["a" /* SearchPage */]);
    };
    //===- FACEBOOK CHECK -===//
    ComicDetailPage.prototype.checkFacebookLoginStatus = function () {
        var _this = this;
        this.fb.getLoginStatus().then(function (res) {
            if (res.status == 'connect' || res.status == 'connected') {
                __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        console.log("==========================");
                        console.log("   FACEBOOK LOGIN CHECK   ");
                        console.log("--------------------------");
                        _this.userProfile = user;
                        // console.log('==> User Facebook Login Data', this.userProfile);
                        _this.loggedin = true;
                        _this.isFacebookLogin = true;
                        console.log('==>%c Facebook Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
                        console.log("=>%c isFacebookLogin status", 'color: green; font-weight: bold;', _this.isFacebookLogin);
                        _this.providerIDs = "Facebook";
                        _this.userIDs = _this.userProfile.uid;
                        _this.emailIDs = _this.userProfile.email;
                        console.log("=>%c Facebook User ID", 'color: green; font-weight: bold;', _this.userIDs);
                        console.log("==========================");
                    }
                    else {
                        _this.isFacebookLogin = false;
                        console.log("==========================");
                        console.log("   FACEBOOK LOGIN CHECK   ");
                        console.log("--------------------------");
                        _this.isFacebookLogin = false;
                        _this.userProfile = null;
                        console.log('==>%c Facebook Login Status :: DISCONNECTED ', 'background: red; color: white; font-weight: bold; display: block;');
                        console.log("=>%c isFacebookLogin status", 'color: red; font-weight: bold;', _this.isFacebookLogin);
                        console.log("==========================");
                    }
                });
            }
            else {
                console.log('==>%c Facebook Login Status :: DISCONECTED ', 'background: red; color: white; font-weight: bold; display: block;');
                _this.loggedin = false;
                _this.isFacebookLogin = false;
                console.log('=>%c isFacebookLogin status', 'color: red; font-weight: bold;', _this.isFacebookLogin);
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    //===- END -===//
    //===- GOOGLE CHECK -===//
    ComicDetailPage.prototype.checkGoogleLoginStatus = function () {
        var _this = this;
        this.gPlus.trySilentLogin({}).then(function (stats) {
            if (stats) {
                console.log("==========================");
                console.log(" GOOGLE PLUS LOGIN CHECK ");
                console.log("--------------------------");
                _this.userProfile = stats;
                // console.log('==> Hmmm, waiting data for  (Google Plus) Login .....', this.userProfile);
                _this.loggedin = true;
                _this.isGoogleLogin = true;
                console.log('==>%c Google Plus Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
                console.log('=>%c isGoogleLogin status', 'color: green; font-weight: bold;', _this.isGoogleLogin);
                _this.providerIDs = "Google Plus";
                _this.userIDs = _this.userProfile.userId;
                _this.emailIDs = _this.userProfile.email;
                console.log("=>%c Google Plus User ID", 'color: green; font-weight: bold;', _this.userIDs);
                console.log("==========================");
            }
            else {
                console.log('==>%c Google Plus Login Status :: DISCONECTED ', 'background: red; color: white; font-weight: bold; display: block;');
                _this.isGoogleLogin = false;
                _this.loggedin = false;
                console.log('=>%c isGoogleLogin status', 'color: red; font-weight: bold;', _this.isGoogleLogin);
            }
        }).catch(function (error) {
            // this.userProfile = null;
            // this.loggedin    = false;
            console.log("==========================");
            console.log(" GOOGLE PLUS LOGIN CHECK ");
            console.log("--------------------------");
            console.log('==>%c Google Plus Login Not Detected. Please Login ', 'background: red; color: white; font-weight: bold; display: block;');
            _this.isGoogleLogin = false;
            console.log('=>%c isGoogleLogin status', 'color: red; font-weight: bold;', _this.isGoogleLogin);
            console.log("==========================");
        });
    };
    //===- END -===//
    ComicDetailPage.prototype.addBookmarkComic = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        console.log('==-> Cancel Bookmark clicked');
                    }
                },
                {
                    text: 'Add to Bookmark',
                    handler: function (data) {
                        var newBookmarkComic = _this.BookmarkComic.push({});
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
    };
    ComicDetailPage.prototype.addFavouriteComic = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        console.log('==-> Cancel Favourite clicked');
                    }
                },
                {
                    text: 'Add to Favourite',
                    handler: function (data) {
                        var newComicFavourite = _this.favouriteComic.push({});
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
    };
    ComicDetailPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        console.log('Begin async operation', refresher);
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
        this.getDetail();
        setTimeout(function () {
            _this.checkFacebookLoginStatus();
            _this.checkGoogleLoginStatus();
            _this.getDetail();
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    ComicDetailPage.prototype.getComicReview = function () {
        var _this = this;
        this.bukufiRest.getComicReview(this.comic).then(function (res) {
            _this.comicReview = res;
            console.log('==> Comic review :', _this.comicReview);
            if (_this.comicReview.length > 0) {
                _this.checkAvailableReview = 1;
                console.log('=-> Ada Review Buku :', _this.checkAvailableReview);
            }
            else {
                _this.checkAvailableReview = 0;
                console.log('=-> Tidak Ada Review Buku :', _this.checkAvailableReview);
            }
        });
    };
    /*===- GET COMIC STATISTIC -===*/
    ComicDetailPage.prototype.getComicStatistic = function () {
        var _this = this;
        this.bukufiRest.getComicStatisticonProsen(this.comic).then(function (data) {
            _this.comicStatistic = data;
            if (_this.comicStatistic.avg_rating || _this.comicStatistic.total_vote) {
                _this.isHaveStatistic = true;
                _this.comicStatisticExist = _this.comicStatistic;
                console.log('=>%c Comic Statistic EXIST ', 'background: green; color: white; font-weight: bold; display: block;');
                _this.comicRating = _this.comicStatistic.avg_rating;
                console.log('%c Comic rating: ', 'color: green; font-weight: bold;', _this.comicRating);
                _this.comicRating_totalView = _this.comicStatistic.total_vote;
                console.log('%c Total data vote', 'color: green; font-weight: bold;', _this.comicRating_totalView);
            }
            else {
                _this.isHaveStatistic = false;
                _this.comicRating = 0;
                console.log("=> Comic Statistic DOESN'T EXIST");
            }
        }, function (err) {
            console.log(err);
        });
    };
    return ComicDetailPage;
}());
ComicDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-comic-detail',template:/*ion-inline-start:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\comic-detail\comic-detail.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title *ngFor="let comic of comic_detail?.data1">\n\n        <p class="biruMuda mb-0 mt-0">{{comic.comic_title_nodash}}</p>\n\n    </ion-title>\n\n    <ion-buttons end>\n\n      <div *ngIf="loggedin == false; else loginTrue">\n\n        <button ion-button class="login-indicator-false">\n\n          <ion-icon name="sunny" end></ion-icon>\n\n        </button>\n\n      </div>\n\n      <ng-template #loginTrue>\n\n          <div *ngIf="isFacebookLogin == true">\n\n            <button ion-button class="login-indicator-true">\n\n              <ion-icon name="logo-facebook"></ion-icon>\n\n            </button>\n\n          </div>\n\n          <div *ngIf="isGoogleLogin == true">\n\n            <button ion-button class="login-indicator-true">\n\n              <ion-icon name="logo-googleplus"></ion-icon>\n\n            </button>\n\n          </div>\n\n      </ng-template>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <ion-card *ngFor="let comic of comic_detail?.data1">\n\n        <ion-grid>\n\n            <ion-row>\n\n                <ion-col col-6>\n\n                <img src="http://bukufi.com/storage/comic/comic_cover/{{comic.comic_image}}" class="comicCover"/>\n\n                </ion-col>\n\n                <ion-col col-6>\n\n\n\n                    <p class="text-bold biruTua">{{comic.comic_title_nodash}}</p>\n\n                    <p class="biruTua justify">{{comic.comic_author_nodash}}</p>\n\n\n\n                    <ion-row>\n\n                        <ion-col col-8 class="p-0">\n\n                            <!-- no star  -->\n\n                            <div id="rating" *ngIf="comicRating == 0 || comicRating == 0.0">\n\n                                <ion-icon name="star-outline" class="starReview"></ion-icon>\n\n                            </div>\n\n\n\n                            <!-- star 1 -->\n\n                            <div id="rating" *ngIf="comicRating == 1 || comicRating == 1.0 || comicRating == 1.1 || comicRating == 1.2 || comicRating == 1.3 || comicRating == 1.4">\n\n                                <ion-icon name="star" class="starColor"></ion-icon>\n\n                            </div>\n\n            \n\n                            <div id="rating" *ngIf="comicRating == 1.5 || comicRating == 1.6 || comicRating == 1.7 || comicRating == 1.8 || comicRating == 1.9">\n\n                                <ion-icon name="star" class="starColor"></ion-icon>\n\n                                <ion-icon name="star-half" class="starColor"></ion-icon>\n\n                            </div>\n\n\n\n                            <!-- star 2 -->\n\n                            <div id="rating" *ngIf="comicRating == 2 || comicRating == 2.0 || comicRating == 2.1 || comicRating == 2.2 || comicRating == 2.3 || comicRating == 2.4">\n\n                                <ion-icon name="star" class="starColor"></ion-icon>\n\n                                <ion-icon name="star" class="starColor"></ion-icon>\n\n                            </div>\n\n            \n\n                            <div id="rating" *ngIf="comicRating == 2.5 || comicRating == 2.6 || comicRating == 2.7 || comicRating == 2.8 || comicRating == 2.9">\n\n                                <ion-icon name="star" class="starColor"></ion-icon>\n\n                                <ion-icon name="star" class="starColor"></ion-icon>\n\n                                <ion-icon name="star-half" class="starColor"></ion-icon>\n\n                            </div>\n\n\n\n                            <!-- star 3 -->\n\n                            <div id="rating" *ngIf="comicRating == 3 || comicRating == 3.0 || comicRating == 3.1 || comicRating == 3.2 || comicRating == 3.3 || comicRating == 3.4">\n\n                                <ion-icon name="star" class="starColor"></ion-icon>\n\n                                <ion-icon name="star" class="starColor"></ion-icon>\n\n                                <ion-icon name="star" class="starColor"></ion-icon>\n\n                            </div>\n\n            \n\n                            <div id="rating" *ngIf="comicRating == 3.5 || comicRating == 3.6 || comicRating == 3.7 || comicRating == 3.8 || comicRating == 3.9">\n\n                                <ion-icon name="star" class="starColor"></ion-icon>\n\n                                <ion-icon name="star" class="starColor"></ion-icon>\n\n                                <ion-icon name="star" class="starColor"></ion-icon>\n\n                                <ion-icon name="star-half" class="starColor"></ion-icon>\n\n                            </div>\n\n\n\n                            <!-- 4 star -->\n\n                            <div id="rating" *ngIf="comicRating == 4.0 || comicRating == 4.1 || comicRating == 4.2 || comicRating == 4.3 || comicRating == 4.4">\n\n                                <ion-icon name="star" class="starColor"></ion-icon>\n\n                                <ion-icon name="star" class="starColor"></ion-icon>\n\n                                <ion-icon name="star" class="starColor"></ion-icon>\n\n                                <ion-icon name="star" class="starColor"></ion-icon>\n\n                            </div>\n\n                            <div id="rating" *ngIf="comicRating == 4.5 || comicRating == 4.6 || comicRating == 4.7 || comicRating == 4.8 || comicRating == 4.9">\n\n                                <ion-icon name="star" class="starColor"></ion-icon>\n\n                                <ion-icon name="star" class="starColor"></ion-icon>\n\n                                <ion-icon name="star" class="starColor"></ion-icon>\n\n                                <ion-icon name="star" class="starColor"></ion-icon>\n\n                                <ion-icon name="star-half" class="starColor"></ion-icon>\n\n                            </div>\n\n\n\n                            <!-- 5 star -->\n\n                            <div id="rating" *ngIf="comicRating == 5 || comicRating == 5.0">\n\n                                <ion-icon name="star" class="starColor"></ion-icon>\n\n                                <ion-icon name="star" class="starColor"></ion-icon>\n\n                                <ion-icon name="star" class="starColor"></ion-icon>\n\n                                <ion-icon name="star" class="starColor"></ion-icon>\n\n                                <ion-icon name="star" class="starColor"></ion-icon>\n\n                            </div>\n\n                        </ion-col>\n\n                        <ion-col col-4 class="p-0">\n\n                            <div *ngIf="comicRating_totalView">\n\n                                <p class="biruTua mt-2">({{comicRating_totalView}})</p>\n\n                            </div>\n\n                            <div *ngIf="!comicRating_totalView">\n\n                                <p class="biruTua mt-2">(0)</p>\n\n                            </div>\n\n                        </ion-col>\n\n                    </ion-row>\n\n\n\n                    <ion-row class="btn-action w-100">\n\n                        <div *ngIf="loggedin" class="w-100">\n\n                            <button ion-button round outline block icon-left class="buttonColor mt-15" (click)="addBookmarkComic()">\n\n                                <ion-icon name="ios-bookmark-outline"></ion-icon>\n\n                                BOOKMARK\n\n                            </button>\n\n                        </div>\n\n            \n\n                        <div *ngIf="!loggedin" class="w-100">\n\n                            <button ion-button round outline block icon-left class="buttonColor mt-15" disabled>\n\n                                <ion-icon name="ios-bookmark-outline"></ion-icon>\n\n                                BOOKMARK\n\n                            </button>\n\n                        </div>\n\n            \n\n                        <div *ngIf="loggedin" class="w-100">\n\n                            <button ion-button round outline block icon-left class="buttonColor mt-0" (click)="addFavouriteComic()">\n\n                                <ion-icon name="ios-heart-outline"></ion-icon>\n\n                                FAVOURITE\n\n                            </button>\n\n                        </div>\n\n            \n\n                        <div *ngIf="!loggedin" class="w-100">\n\n                            <button ion-button round outline block icon-left class="buttonColor mt-0" disabled>\n\n                                <ion-icon name="ios-heart-outline"></ion-icon>\n\n                                FAVOURITE\n\n                            </button>\n\n                        </div>\n\n                    </ion-row>\n\n                </ion-col>\n\n                <hr id="hr1">\n\n                <!-- description area -->\n\n                <ion-col col-12>\n\n                    <ion-row>\n\n                        <ion-col class="pt-0">\n\n                            <p class="text-bold text-center starColor">DETAILS</p>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                    <ion-row>\n\n                        <ion-col col-4><strong>Author</strong></ion-col>\n\n                        <ion-col col-1 id="colon">:</ion-col>\n\n                        <ion-col col-7>\n\n                            <p class="text-bold text-black">{{comic.comic_author_nodash}}</p>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                    <ion-row>\n\n                        <ion-col col-4><strong>Genre</strong></ion-col>\n\n                        <ion-col col-1 id="colon">:</ion-col>\n\n                        <ion-col col-7>\n\n                            <p class="text-bold text-black">{{comic.comic_genre}}</p>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                    <ion-row>\n\n                        <ion-col col-4><strong>Release</strong></ion-col>\n\n                        <ion-col col-1 id="colon">:</ion-col>\n\n                        <ion-col col-7>\n\n                            <p class="text-bold text-black">{{comic.comic_release}}</p>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                    <ion-row>\n\n                        <ion-col col-4><strong>Status</strong></ion-col>\n\n                        <ion-col col-1 id="colon">:</ion-col>\n\n                        <ion-col col-7>\n\n                            <p class="text-bold text-black">{{comic.comic_status}}</p>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                    <ion-row>\n\n                        <ion-col col-4><strong>Description</strong></ion-col>\n\n                        <ion-col col-1 id="colon">:</ion-col>\n\n                        <ion-col col-7>\n\n                            <p class="text-bold text-black">{{comic.comic_description}}</p>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-grid>\n\n    </ion-card>\n\n    <hr id="hr1">\n\n    <ion-card>\n\n        <ion-card-header class="bold">\n\n            <p class="text-center">COMIC CHAPTER</p>\n\n        </ion-card-header>\n\n        <hr id="hr2">\n\n        <ion-card-content class="scroll">\n\n            <ion-list *ngFor="let comic of comic_detail?.data2">\n\n                <button ion-button clear full (click)="readComic(comic.comic_title, comic.comic_chapter)">\n\n                    <i class="fa fa-caret-right" aria-hidden="true"></i> Chapter {{comic.comic_chapter}} : {{comic.chapter_title}}\n\n                </button>\n\n            </ion-list>\n\n        </ion-card-content>\n\n    </ion-card>\n\n    <hr id="hr1">\n\n    <!--for review-->\n\n    <ion-card class="review mt-0">\n\n        <ion-card-header class="user-review-hdr">\n\n            REVIEWS\n\n        </ion-card-header>\n\n        <hr id="hr2">\n\n        <div *ngIf="checkAvailableReview == 1" class="w-100">\n\n            <ion-row class="w-100" *ngFor="let review of comicReview">\n\n                <ion-col col-7>\n\n                    <p class="text-bold">{{review.user_name}}</p>\n\n                </ion-col>\n\n\n\n                <ion-col col-5 class="text-right">\n\n                    <!-- no star  -->\n\n                    <div id="rating" *ngIf="review.user_comic_rating == 0 || review.user_comic_rating == 0.0">\n\n                        <ion-icon name="star-outline" class="starReview"></ion-icon>\n\n                    </div> \n\n    \n\n                    <!-- star 1 -->\n\n                    <div id="rating" *ngIf="review.user_comic_rating == 1 || review.user_comic_rating == 1.0 || review.user_comic_rating == 1.1 || review.user_comic_rating == 1.2 || review.user_comic_rating == 1.3 || review.user_comic_rating == 1.4">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                    </div>\n\n    \n\n                    <div id="rating" *ngIf="review.user_comic_rating == 1.5 || review.user_comic_rating == 1.6 || review.user_comic_rating == 1.7 || review.user_comic_rating == 1.8 || review.user_comic_rating == 1.9">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star-half" class="starColor"></ion-icon>\n\n                    </div>\n\n    \n\n                    <!-- star 2 -->\n\n                    <div id="rating" *ngIf="review.user_comic_rating == 2 || review.user_comic_rating == 2.0 || review.user_comic_rating == 2.1 || review.user_comic_rating == 2.2 || review.user_comic_rating == 2.3 || review.user_comic_rating == 2.4">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                    </div>\n\n    \n\n                    <div id="rating" *ngIf="review.user_comic_rating == 2.5 || review.user_comic_rating == 2.6 || review.user_comic_rating == 2.7 || review.user_comic_rating == 2.8 || review.user_comic_rating == 2.9">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star-half" class="starColor"></ion-icon>\n\n                    </div>\n\n    \n\n                    <!-- star 3 -->\n\n                    <div id="rating" *ngIf="review.user_comic_rating == 3 || review.user_comic_rating == 3.0 || review.user_comic_rating == 3.1 || review.user_comic_rating == 3.2 || review.user_comic_rating == 3.3 || review.user_comic_rating == 3.4">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                    </div>\n\n    \n\n                    <div id="rating" *ngIf="review.user_comic_rating == 3.5 || review.user_comic_rating == 3.6 || review.user_comic_rating == 3.7 || review.user_comic_rating == 3.8 || review.user_comic_rating == 3.9">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star-half" class="starColor"></ion-icon>\n\n                    </div>\n\n    \n\n                    <!-- 4 star -->\n\n                    <div id="rating" *ngIf="review.user_comic_rating == 4.0 || review.user_comic_rating == 4.1 || review.user_comic_rating == 4.2 || review.user_comic_rating == 4.3 || review.user_comic_rating == 4.4">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                    </div>\n\n                    <div id="rating" *ngIf="review.user_comic_rating == 4.5 || review.user_comic_rating == 4.6 || review.user_comic_rating == 4.7 || review.user_comic_rating == 4.8 || review.user_comic_rating == 4.9">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star-half" class="starColor"></ion-icon>\n\n                    </div>\n\n    \n\n                    <!-- 5 star -->\n\n                    <div id="rating" *ngIf="review.user_comic_rating == 5 || review.user_comic_rating == 5.0">\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                        <ion-icon name="star" class="starColor"></ion-icon>\n\n                    </div>\n\n                </ion-col>\n\n                <ion-col class="pt-7">\n\n                    {{review.user_comic_review}}\n\n                </ion-col>\n\n                <hr id="hr2">\n\n            </ion-row>\n\n        </div>\n\n        <div *ngIf="checkAvailableReview == 0" class="w-100">\n\n            <ion-row>\n\n                <ion-col col-12>\n\n                    <p class="text-bold text-center biruTua">This comic has not had a review</p>\n\n                </ion-col>\n\n            </ion-row>\n\n        </div>\n\n    </ion-card>\n\n\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content \n\n      pullingText="Pull to refresh"\n\n      pullingIcon="arrow-dropdown"\n\n      refreshingSpinner="circles"\n\n      refreshingText="fetching data ...">\n\n    </ion-refresher-content>\n\n  </ion-refresher>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\comic-detail\comic-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__["a" /* BukufiRestProvider */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_plus__["a" /* GooglePlus */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__["a" /* AngularFireDatabase */]])
], ComicDetailPage);

//# sourceMappingURL=comic-detail.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Book */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__book_detail_book_detail__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__comic_detail_comic_detail__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__search_search__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__user_account_user_account__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var Book = (function () {
    function Book() {
    }
    return Book;
}());

var HomePage = (function () {
    function HomePage(navCtrl, navParams, bukufiRest, fb, gPlus) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.bukufiRest = bukufiRest;
        this.fb = fb;
        this.gPlus = gPlus;
        this.loggedin = false;
        this.isGoogleLogin = false;
        this.isFacebookLogin = false;
        this.userProfile = null;
        this.home = 'popular-book';
        this.getPopularBooks();
        this.getPopularComics();
        this.checkGoogleLoginStatus();
        this.checkFacebookLoginStatus();
    }
    HomePage.prototype.ionViewDidLoad = function () {
        console.clear();
        console.log('=======================');
        console.log('%c HomePage success loaded', 'color: green; font-weight: bold;');
        console.log('=======================');
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
    };
    //==================== GET BOOKS AND COMIC DATA =================================//
    HomePage.prototype.getPopularBooks = function () {
        var _this = this;
        this.bukufiRest.getPopBooks()
            .then(function (data) {
            _this.popularBooks = data;
            console.log('==>%c Popular Book Data :', 'color: green; font-weight: bold;', _this.popularBooks);
        });
    };
    HomePage.prototype.getPopularComics = function () {
        var _this = this;
        this.bukufiRest.getPopComic()
            .then(function (data) {
            _this.popularComics = data;
            console.log('==>%c Popular Comic Data :', 'color: green; font-weight: bold;', _this.popularComics);
        });
    };
    //=============================== END ===========================================//
    HomePage.prototype.showDetailBook = function (book) {
        console.log('=> show detail book', book);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__book_detail_book_detail__["a" /* BookDetailPage */], {
            book: book
        });
    };
    HomePage.prototype.showDetailComic = function (comic) {
        console.log('=> show detail comic', comic);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__comic_detail_comic_detail__["a" /* ComicDetailPage */], {
            comic: comic
        });
    };
    HomePage.prototype.doRefresh = function (refresher) {
        var _this = this;
        console.clear();
        console.log('Begin async operation', refresher);
        this.getPopularBooks();
        this.getPopularComics();
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
        setTimeout(function () {
            _this.checkFacebookLoginStatus();
            _this.checkGoogleLoginStatus();
            console.log('Async operation has ended');
            console.clear();
            refresher.complete();
        }, 2000);
    };
    HomePage.prototype.userInformation = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__user_account_user_account__["a" /* UserAccountPage */]);
    };
    HomePage.prototype.loginFirst = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
    };
    HomePage.prototype.search = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__search_search__["a" /* SearchPage */]);
    };
    //===- FACEBOOK CHECK -===//
    HomePage.prototype.checkFacebookLoginStatus = function () {
        var _this = this;
        this.fb.getLoginStatus().then(function (res) {
            if (res.status == 'connect' || res.status == 'connected') {
                __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        console.log("==========================");
                        console.log("   FACEBOOK LOGIN CHECK   ");
                        console.log("--------------------------");
                        _this.userProfile = user;
                        //   console.log('==> User Facebook Login Data', this.userProfile);
                        _this.loggedin = true;
                        _this.isFacebookLogin = true;
                        console.log('==>%c Facebook Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
                        console.log("=>%c isFacebookLogin status", 'color: green; font-weight: bold;', _this.isFacebookLogin);
                        _this.providerIDs = "Facebook";
                        _this.userIDs = _this.userProfile.uid;
                        _this.emailIDs = _this.userProfile.email;
                        console.log("=>%c Facebook User ID", 'color: green; font-weight: bold;', _this.userIDs);
                        console.log("==========================");
                    }
                    else {
                        _this.isFacebookLogin = false;
                        console.log("==========================");
                        console.log("   FACEBOOK LOGIN CHECK   ");
                        console.log("--------------------------");
                        _this.isFacebookLogin = false;
                        _this.userProfile = null;
                        console.log('==>%c Facebook Login Status :: DISCONNECTED ', 'background: red; color: white; font-weight: bold; display: block;');
                        console.log("=>%c isFacebookLogin status", 'color: red; font-weight: bold;', _this.isFacebookLogin);
                        console.log("==========================");
                    }
                });
            }
            else {
                console.log('==>%c Facebook Login Status :: DISCONECTED ', 'background: red; color: white; font-weight: bold; display: block;');
                _this.loggedin = false;
                _this.isFacebookLogin = false;
                console.log('=>%c isFacebookLogin status', 'color: red; font-weight: bold;', _this.isFacebookLogin);
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    //===- END -===//
    //===- GOOGLE CHECK -===//
    HomePage.prototype.checkGoogleLoginStatus = function () {
        var _this = this;
        this.gPlus.trySilentLogin({}).then(function (stats) {
            if (stats) {
                console.log("==========================");
                console.log(" GOOGLE PLUS LOGIN CHECK ");
                console.log("--------------------------");
                _this.userProfile = stats;
                _this.loggedin = true;
                _this.isGoogleLogin = true;
                console.log('==>%c Google Plus Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
                console.log('=>%c isGoogleLogin status', 'color: green; font-weight: bold;', _this.isGoogleLogin);
                _this.providerIDs = "Google Plus";
                _this.userIDs = _this.userProfile.userId;
                _this.emailIDs = _this.userProfile.email;
                console.log("=>%c Google Plus User ID", 'color: green; font-weight: bold;', _this.userIDs);
                console.log("==========================");
            }
            else {
                console.log('==>%c Google Plus Login Not Found, Please Login', 'color: red; font-weight: bold;');
                _this.isGoogleLogin = false;
                _this.loggedin = false;
                console.log('=>%c isGoogleLogin status', 'color: red; font-weight: bold;', _this.isGoogleLogin);
            }
        }).catch(function (error) {
            // this.userProfile = null;
            // this.loggedin    = false;
            console.log("==========================");
            console.log(" GOOGLE PLUS LOGIN CHECK ");
            console.log("--------------------------");
            console.log('==>%c Google Plus Login Status :: DISCONNECTED ', 'background: red; color: white; font-weight: bold; display: block;');
            _this.isGoogleLogin = false;
            console.log('=>%c isGoogleLogin status', 'color: red; font-weight: bold;', _this.isGoogleLogin);
            console.log("==========================");
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\home\home.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu" class="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>Bukufi</ion-title>\n\n        <ion-buttons end>\n\n            <div *ngIf="loggedin == false; else loginTrue">\n\n                <button ion-button class="login-indicator-false">\n\n                <ion-icon name="sunny" end></ion-icon>\n\n                </button>\n\n            </div>\n\n            <ng-template #loginTrue>\n\n                <div *ngIf="isFacebookLogin == true">\n\n                    <button ion-button class="login-indicator-true">\n\n                    <ion-icon name="logo-facebook"></ion-icon>\n\n                    </button>\n\n                </div>\n\n                <div *ngIf="isGoogleLogin == true">\n\n                    <button ion-button class="login-indicator-true">\n\n                    <ion-icon name="logo-googleplus"></ion-icon>\n\n                    </button>\n\n                </div>\n\n            </ng-template>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <ion-grid>\n\n        <ion-row>\n\n            <ion-col col-12>\n\n                <p class="text-center text-color font-18">POPULAR BOOKS</p>\n\n            </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n            <ion-col col-12>\n\n                <ion-slides [slidesPerView]="2" [spaceBetween]="10">\n\n                    <ion-slide *ngFor="let book of popularBooks" (tap)="showDetailBook(book.book_title)">\n\n                        <div *ngIf="book.book_sticker == \'New\'">\n\n                            <div class="cnrflash-new">\n\n                            <div class="cnrflash-inner-new">\n\n                                <span class="cnrflash-label-new">\n\n                                    NEW\n\n                                </span>\n\n                            </div>\n\n                            </div>\n\n                        </div>\n\n                \n\n                        <div *ngIf="book.book_sticker == \'Popular\'">\n\n                            <div class="cnrflash-popular">\n\n                            <div class="cnrflash-inner-popular">\n\n                                <span class="cnrflash-label-popular">\n\n                                    POPULAR\n\n                                </span>\n\n                            </div>\n\n                            </div>\n\n                        </div>\n\n                \n\n                        <div *ngIf="book.book_sticker == \'Recomended\'">\n\n                            <div class="cnrflash-recomended">\n\n                            <div class="cnrflash-inner-recomended">\n\n                                <span class="cnrflash-label-recomended">\n\n                                    RECOMENDED\n\n                                </span>\n\n                            </div>\n\n                            </div>\n\n                        </div>\n\n                \n\n                        <div *ngIf="book.book_sticker == \'Editor Pick\'">\n\n                            <div class="cnrflash-editor-pick">\n\n                            <div class="cnrflash-inner-editor-pick">\n\n                                <span class="cnrflash-label-editor-pick">\n\n                                    EDITOR <br> PICK\n\n                                </span>\n\n                            </div>\n\n                            </div>\n\n                        </div>\n\n                        <img src="http://bukufi.com/storage/book/book_cover/{{book.book_image}}" alt="{{book.book_title}}">\n\n                    </ion-slide>\n\n                </ion-slides>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-grid>\n\n\n\n    <ion-grid class="margin-10px">\n\n        <ion-row>\n\n            <ion-col col-12>\n\n                <p class="text-center text-color font-18">POPULAR COMICS</p>\n\n            </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n            <ion-col col-12>\n\n                <ion-slides [slidesPerView]="2" [spaceBetween]="10">\n\n                    <ion-slide *ngFor="let comic of popularComics" (tap)="showDetailComic(comic.comic_title)">\n\n                            <img src="http://bukufi.com/storage/comic/comic_cover/{{comic.comic_image}}" alt="{{comic.comic_title}}">\n\n                    </ion-slide>\n\n                </ion-slides>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-grid>\n\n  \n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content \n\n        pullingText="Pull to refresh"\n\n        pullingIcon="arrow-dropdown"\n\n        refreshingSpinner="circles"\n\n        refreshingText="fetching data ...">\n\n        </ion-refresher-content>\n\n    </ion-refresher>\n\n\n\n    <!--FAB BOTTOM RIGHT-->\n\n    <ion-fab right bottom #fab2>\n\n        <button ion-fab mini color="primary"><ion-icon name="apps"></ion-icon></button>\n\n        <ion-fab-list side="top">\n\n            <div *ngIf="loggedin; else loginfirst">\n\n            <button ion-fab (click)="userInformation()">\n\n                <ion-icon name="information-circle" class="whiteBlue"></ion-icon>\n\n            </button>\n\n            </div>\n\n            <ng-template #loginfirst>\n\n                <button ion-fab (click)="loginFirst()">\n\n                    <ion-icon name="log-in" class="whiteBlue"></ion-icon>\n\n                </button>\n\n            </ng-template>\n\n            <button ion-fab (click)="search()">\n\n                <ion-icon name="search" class="whiteBlue"></ion-icon>\n\n            </button>\n\n        </ion-fab-list>\n\n    </ion-fab>\n\n  \n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\home\home.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__["a" /* BukufiRestProvider */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__["a" /* GooglePlus */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__book_detail_book_detail__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__user_account_user_account__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_plus__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var BookListPage = (function () {
    function BookListPage(navCtrl, navParams, bukufiRest, fb, gPlus) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.bukufiRest = bukufiRest;
        this.fb = fb;
        this.gPlus = gPlus;
        this.loggedin = false;
        this.userProfile = null;
        this.isGoogleLogin = false;
        this.isFacebookLogin = false;
        this.getAllBooks();
        this.checkLoginStatus();
        this.checkGoogleLoginStatus();
    }
    BookListPage.prototype.ionViewDidLoad = function () {
        console.clear();
        console.log('===> BookListPage Loaded');
    };
    BookListPage.prototype.getAllBooks = function () {
        var _this = this;
        this.bukufiRest.getAllBook().then(function (data) {
            _this.allBooks = data;
            _this.countBook = _this.allBooks.length;
            console.log("==> Count Book :", _this.countBook);
            console.log('==> List all book :', data);
        });
    };
    //===- SEARCH -===//
    BookListPage.prototype.initializeItems = function () {
        this.allBooks = this.allBooks;
        console.log('==> Re-init item', this.allBooks);
    };
    BookListPage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        this.initializeItems();
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.allBooks = this.allBooks.filter(function (item) {
                return (item.book_title_nodash.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    //===- END SEARCH -===//
    BookListPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        //check login status
        this.getAllBooks();
        setTimeout(function () {
            //check login status
            console.log('Async operation has ended');
            refresher.complete();
        }, 1500);
    };
    BookListPage.prototype.showDetailBook = function (book) {
        console.log('==> show detail book', book);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__book_detail_book_detail__["a" /* BookDetailPage */], {
            book: book
        });
    };
    BookListPage.prototype.userInformation = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__user_account_user_account__["a" /* UserAccountPage */]);
    };
    BookListPage.prototype.loginFirst = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
    };
    //===- FACEBOOK -===//
    BookListPage.prototype.checkLoginStatus = function () {
        var _this = this;
        this.fb.getLoginStatus().then(function (res) {
            if (res.status == 'connect' || res.status == 'connected') {
                _this.FBData = res;
                console.log('data', _this.FBData);
                _this.loggedin = true;
                _this.isFacebookLogin = true;
                console.log('==>%c Facebook Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
                console.log('=>%c isFacebookLogin status', 'color: green; font-weight: bold;', _this.isFacebookLogin);
                _this.userIDs = _this.FBData.authResponse.userID;
                console.log("=>%c Facebook User ID", 'color: green; font-weight: bold;', _this.userIDs);
            }
            else {
                console.log('==>%c Facebook Login Status :: DISCONECTED ', 'background: red; color: white; font-weight: bold; display: block;');
                _this.loggedin = false;
                _this.isFacebookLogin = false;
                //this.loggedin  = res.status;
                console.log('=>%c isFacebookLogin status value', 'color: red; font-weight: bold;', _this.isFacebookLogin);
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    //===- END -===//
    //===- GOOGLE CHECK -===//
    BookListPage.prototype.checkGoogleLoginStatus = function () {
        var _this = this;
        this.gPlus.trySilentLogin({}).then(function (stats) {
            if (stats) {
                console.log("==========================");
                // console.log(" GOOGLE PLUS LOGIN CHECK ");
                // console.log("--------------------------");
                _this.userProfile = stats;
                _this.loggedin = true;
                _this.isGoogleLogin = true;
                console.log('==>%c Google Plus Login Status :: CONNECTED ', 'background: green; color: white; font-weight: bold; display: block;');
                console.log('=>%c isGoogleLogin status', 'color: green; font-weight: bold;', _this.isGoogleLogin);
                _this.userIDs = _this.userProfile.userId;
                console.log("=>%c Google Plus User ID", 'color: green; font-weight: bold;', _this.userIDs);
                console.log("==========================");
            }
            else {
                console.log('==>%c Google Plus Login Not Found, Please Login', 'color: red; font-weight: bold;');
                _this.isGoogleLogin = false;
                _this.loggedin = false;
                console.log('=>%c isGoogleLogin status', 'color: red; font-weight: bold;', _this.isGoogleLogin);
            }
        }).catch(function (error) {
            // this.userProfile = null;
            // this.loggedin    = false;
            console.log("==========================");
            console.log(" GOOGLE PLUS LOGIN CHECK ");
            console.log("--------------------------");
            console.log('==>%c Google Plus Login Status :: DISCONNECTED ', 'background: red; color: white; font-weight: bold; display: block;');
            _this.isGoogleLogin = false;
            console.log('=>%c isGoogleLogin status', 'color: red; font-weight: bold;', _this.isGoogleLogin);
            console.log("==========================");
        });
    };
    return BookListPage;
}());
BookListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-book-list',template:/*ion-inline-start:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\book-list\book-list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Search</ion-title>\n\n    <ion-buttons end>\n\n        <div *ngIf="loggedin == false; else loginTrue">\n\n            <button ion-button class="login-indicator-false">\n\n            <ion-icon name="sunny" end></ion-icon>\n\n            </button>\n\n        </div>\n\n        <ng-template #loginTrue>\n\n            <div *ngIf="isFacebookLogin == true">\n\n                <button ion-button class="login-indicator-true">\n\n                <ion-icon name="logo-facebook"></ion-icon>\n\n                </button>\n\n            </div>\n\n            <div *ngIf="isGoogleLogin == true">\n\n                <button ion-button class="login-indicator-true">\n\n                <ion-icon name="logo-googleplus"></ion-icon>\n\n                </button>\n\n            </div>\n\n        </ng-template>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n    <ion-searchbar [(ngModel)]="val" (ionInput)="getItems($event)" [debounce]="500" placeholder="Enter Keyword here ..."></ion-searchbar>\n\n    <ion-card *ngFor="let book of allBooks">\n\n        <ion-card-content>\n\n            <ion-grid (click)="showDetailBook(book.book_title)">\n\n                <ion-row>\n\n                    <ion-col col-4>\n\n                        <img src="http://bukufi.com/storage/book/book_cover/{{book.book_image}}">\n\n                    </ion-col>\n\n                    <ion-col col-8>\n\n                        <p id="title">{{book.book_title_nodash}}</p>\n\n                        <p id="author">{{book.book_author_nodash}}</p>\n\n                        <p id="release">{{book.book_release}}</p>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-grid>\n\n        </ion-card-content>  \n\n    </ion-card>\n\n\n\n    <!--FAB BOTTOM RIGHT-->\n\n    <ion-fab right bottom #fab2>\n\n        <button ion-fab mini color="primary"><ion-icon name="apps"></ion-icon></button>\n\n        <ion-fab-list side="top">\n\n            <div *ngIf="loggedin == true; else loginfirst">\n\n                <button ion-fab (click)="userInformation()">\n\n                    <ion-icon name="information-circle"></ion-icon>\n\n                </button>\n\n            </div>\n\n            <ng-template #loginfirst>\n\n                <button ion-fab (click)="loginFirst()">\n\n                    <ion-icon name="log-in"></ion-icon>\n\n                </button>\n\n            </ng-template>\n\n        </ion-fab-list>\n\n    </ion-fab>\n\n\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content \n\n        pullingText="Pull to refresh"\n\n        pullingIcon="arrow-dropdown"\n\n        refreshingSpinner="circles"\n\n        refreshingText="fetching data ...">\n\n        </ion-refresher-content>\n\n    </ion-refresher>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\book-list\book-list.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__["a" /* BukufiRestProvider */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_plus__["a" /* GooglePlus */]])
], BookListPage);

//# sourceMappingURL=book-list.js.map

/***/ })

},[327]);
//# sourceMappingURL=main.js.map