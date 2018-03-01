webpackJsonp([13],{

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Book */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__book_detail_book_detail__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__comic_detail_comic_detail__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__search_search__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase__ = __webpack_require__(22);
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
    }
    HomePage.prototype.ionViewDidLoad = function () {
        console.log('===> HomePage success loaded');
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
    };
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
    //--------------------
    HomePage.prototype.doRefresh = function (refresher) {
        var _this = this;
        console.log('Begin async operation', refresher);
        this.getPopularBooks();
        this.getPopularComics();
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
        setTimeout(function () {
            _this.checkFacebookLoginStatus();
            _this.checkGoogleLoginStatus();
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    //--------------------
    //==================== GET BOOKS AND COMIC DATA =================================//
    HomePage.prototype.getPopularBooks = function () {
        var _this = this;
        this.bukufiRest.getPopBooks()
            .then(function (data) {
            _this.popularBooks = data;
            console.log('==> Popular Book Data :', _this.popularBooks);
        });
    };
    HomePage.prototype.getPopularComics = function () {
        var _this = this;
        this.bukufiRest.getPopComic()
            .then(function (data) {
            _this.popularComics = data;
            console.log('==> Popular Comic Data :', _this.popularComics);
        });
    };
    //=============================== END ===========================================//
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
                        console.log('==> User Facebook Login Data', _this.userProfile);
                        _this.loggedin = true;
                        _this.isFacebookLogin = true;
                        console.log('==> Facebook Login Status :: CONNECTED');
                        console.log("=> isFacebookLogin status", _this.isFacebookLogin);
                        _this.providerIDs = "Facebook";
                        _this.userIDs = _this.userProfile.uid;
                        _this.emailIDs = _this.userProfile.email;
                        console.log("=> Facebook User ID", _this.userIDs);
                        console.log("==========================");
                    }
                    else {
                        _this.isFacebookLogin = false;
                        console.log("==========================");
                        console.log("   FACEBOOK LOGIN CHECK   ");
                        console.log("--------------------------");
                        _this.isFacebookLogin = false;
                        _this.userProfile = null;
                        console.log('==> Facebook Login Status :: DISCONNECTED');
                        console.log("=> isFacebookLogin status", _this.isFacebookLogin);
                        console.log("==========================");
                    }
                });
            }
            else {
                console.log('==> Facebook Login Status :: DISCONECTED');
                _this.loggedin = false;
                _this.isFacebookLogin = false;
                console.log('=> isFacebookLogin status', _this.isFacebookLogin);
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
                console.log('==> Hmmm, waiting data for  (Google Plus) Login .....', _this.userProfile);
                _this.loggedin = true;
                _this.isGoogleLogin = true;
                console.log('==> Google Plus Login Status :: CONNECTED');
                console.log('=> isGoogleLogin status', _this.isGoogleLogin);
                _this.providerIDs = "Google Plus";
                _this.userIDs = _this.userProfile.userId;
                _this.emailIDs = _this.userProfile.email;
                console.log("=> Google Plus User ID", _this.userIDs);
                console.log("==========================");
            }
            else {
                console.log('==> Hmmm, data for  (Google Plus) Login Not Found .....');
                _this.isGoogleLogin = false;
                _this.loggedin = false;
                console.log('=> isGoogleLogin status', _this.isGoogleLogin);
            }
        }).catch(function (error) {
            // this.userProfile = null;
            // this.loggedin    = false;
            console.log("==========================");
            console.log(" GOOGLE PLUS LOGIN CHECK ");
            console.log("--------------------------");
            console.log('==> Google Plus Login Status :: DISCONNECTED');
            _this.isGoogleLogin = false;
            console.log('=> isGoogleLogin status', _this.isGoogleLogin);
            console.log("==========================");
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Home</ion-title>\n\n    <ion-buttons end>\n\n      <div *ngIf="loggedin == false; else loginTrue">\n\n        <button ion-button class="login-indicator-false">\n\n          <ion-icon name="sunny" end></ion-icon>\n\n        </button>\n\n      </div>\n\n      <ng-template #loginTrue>\n\n          <div *ngIf="isFacebookLogin == true">\n\n            <button ion-button class="login-indicator-true">\n\n              <ion-icon name="logo-facebook"></ion-icon>\n\n            </button>\n\n          </div>\n\n          <div *ngIf="isGoogleLogin == true">\n\n            <button ion-button class="login-indicator-true">\n\n              <ion-icon name="logo-googleplus"></ion-icon>\n\n            </button>\n\n          </div>\n\n      </ng-template>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-segment [(ngModel)]="home">\n\n    <ion-segment-button value="popular-book">\n\n      <b>Popular Books</b>\n\n    </ion-segment-button>\n\n    <ion-segment-button value="popular-comic">\n\n      <b>Popular Comics</b>\n\n    </ion-segment-button>\n\n  </ion-segment>\n\n\n\n  <div [ngSwitch]="home">\n\n    <ion-list *ngSwitchCase="\'popular-book\'">\n\n      <!-- popular books -->\n\n      <ion-card>\n\n        <ion-card-header>\n\n          Popular Books\n\n        </ion-card-header>\n\n        <ion-card-content>\n\n          <ion-slides pager>\n\n            <ion-slide *ngFor="let book of popularBooks" (tap)="showDetailBook(book.book_title)">\n\n    \n\n              <div *ngIf="book.book_sticker == \'New\'">\n\n                <div class="cnrflash-new">\n\n                  <div class="cnrflash-inner-new">\n\n                      <span class="cnrflash-label-new">\n\n                        NEW\n\n                      </span>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n    \n\n              <div *ngIf="book.book_sticker == \'Popular\'">\n\n                <div class="cnrflash-popular">\n\n                  <div class="cnrflash-inner-popular">\n\n                      <span class="cnrflash-label-popular">\n\n                        POPULAR\n\n                      </span>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n    \n\n              <div *ngIf="book.book_sticker == \'Recomended\'">\n\n                <div class="cnrflash-recomended">\n\n                  <div class="cnrflash-inner-recomended">\n\n                      <span class="cnrflash-label-recomended">\n\n                        RECOMENDED\n\n                      </span>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n    \n\n              <div *ngIf="book.book_sticker == \'Editor Pick\'">\n\n                <div class="cnrflash-editor-pick">\n\n                  <div class="cnrflash-inner-editor-pick">\n\n                      <span class="cnrflash-label-editor-pick">\n\n                        EDITOR <br> PICK\n\n                      </span>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n    \n\n              <img class="book_cover" src="http://bukufi.com/storage/book/book_cover/{{book.book_image}}" alt="{{book.book_title}}">\n\n            </ion-slide>\n\n          </ion-slides>\n\n        </ion-card-content>\n\n      </ion-card>\n\n    </ion-list>\n\n  \n\n    <ion-list *ngSwitchCase="\'popular-comic\'">\n\n      <!-- popular comics -->\n\n      <ion-card>\n\n        <ion-card-header>\n\n          Popular Comics\n\n        </ion-card-header>\n\n        <ion-card-content>\n\n          <ion-slides pager>\n\n            <ion-slide *ngFor="let comic of popularComics" (tap)="showDetailComic(comic.comic_title)">\n\n              <img class="book_cover" src="http://bukufi.com/storage/comic/comic_cover/{{comic.comic_image}}" alt="{{comic.comic_title}}">\n\n            </ion-slide>\n\n          </ion-slides>\n\n        </ion-card-content>\n\n      </ion-card>\n\n    </ion-list>\n\n  </div>\n\n\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content \n\n      pullingText="Pull to refresh"\n\n      pullingIcon="arrow-dropdown"\n\n      refreshingSpinner="circles"\n\n      refreshingText="fetching data ...">\n\n    </ion-refresher-content>\n\n  </ion-refresher>\n\n\n\n  <!--FAB BOTTOM RIGHT-->\n\n  <ion-fab right bottom #fab2>\n\n    <button ion-fab mini color="primary"><ion-icon name="apps"></ion-icon></button>\n\n    <ion-fab-list side="top">\n\n      <div *ngIf="loggedin; else loginfirst">\n\n        <button ion-fab (click)="loginFirst()">\n\n          <ion-icon name="information-circle"></ion-icon>\n\n        </button>\n\n      </div>\n\n      <ng-template #loginfirst>\n\n        <button ion-fab (click)="loginFirst()">\n\n          <ion-icon name="log-in"></ion-icon>\n\n        </button>\n\n      </ng-template>\n\n      <button ion-fab (click)="search()">\n\n        <ion-icon name="search"></ion-icon>\n\n      </button>\n\n    </ion-fab-list>\n\n  </ion-fab>\n\n  \n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\home\home.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__["a" /* BukufiRestProvider */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__["a" /* GooglePlus */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookBookmarkPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__book_detail_book_detail__ = __webpack_require__(55);
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







var BookBookmarkPage = (function () {
    function BookBookmarkPage(navCtrl, navParams, afDatabase, fb, gPlus) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afDatabase = afDatabase;
        this.fb = fb;
        this.gPlus = gPlus;
        this.regex = /\-/gi;
        this.loggedin = false;
        this.userProfile = null;
        this.isGoogleLogin = false;
        this.isFacebookLogin = false;
        this.dataFavourite2 = [];
        this.myBookmark = [];
        this.bookmarkRef = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref("/Bookmark-book");
        this.BookmarkBook = afDatabase.list('/Bookmark-book');
    }
    BookBookmarkPage.prototype.ionViewDidLoad = function () {
        console.log('===> BookBookmarkPage Loaded');
        this.getMyBookmark();
        this.getMyBookmarkGooglePlus();
    };
    BookBookmarkPage.prototype.getMyBookmark = function () {
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
                    _this.bookmarkRef.orderByChild("userID").equalTo(_this.userIDs).on('value', function (dataFavourite) {
                        _this.myBookmark = [];
                        dataFavourite.forEach(function (dataFv) {
                            _this.myBookmark.push(dataFv.val());
                            return false;
                        });
                        if (_this.myBookmark) {
                            console.log('=> Bookmark Found. Count the Data :', _this.myBookmark.length);
                            console.log('=> The Data is :', _this.myBookmark);
                            _this.isHaveBookmark = true;
                        }
                        else {
                            console.log("=> No Bookmark Data for this user", _this.myBookmark.length);
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
    BookBookmarkPage.prototype.getMyBookmarkGooglePlus = function () {
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
                _this.bookmarkRef.orderByChild("userID").equalTo(_this.userIDs).on('value', function (dataFavourite) {
                    _this.myBookmark = [];
                    dataFavourite.forEach(function (dataFv) {
                        _this.myBookmark.push(dataFv.val());
                        return false;
                    });
                    if (_this.myBookmark) {
                        console.log('=> Bookmark Found. Count the Data :', _this.myBookmark.length);
                        console.log('=> The Data is :', _this.myBookmark);
                        _this.isHaveBookmark = true;
                    }
                    else {
                        console.log("=> No Bookmark Data for this user", _this.myBookmark.length);
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
    BookBookmarkPage.prototype.showDetailBook = function (book) {
        console.log('=> show detail book', book);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__book_detail_book_detail__["a" /* BookDetailPage */], {
            book: book
        });
    };
    BookBookmarkPage.prototype.doRefresh = function (refresher) {
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
    return BookBookmarkPage;
}());
BookBookmarkPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-book-bookmark',template:/*ion-inline-start:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\book-bookmark\book-bookmark.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Your Bookmark Book</ion-title>\n    <ion-buttons end>\n      <div *ngIf="loggedin == false; else loginTrue">\n        <button ion-button class="login-indicator-false">\n          <ion-icon name="sunny" end></ion-icon>\n        </button>\n      </div>\n      <ng-template #loginTrue>\n          <div *ngIf="isFacebookLogin == true">\n            <button ion-button class="login-indicator-true">\n              <ion-icon name="logo-facebook"></ion-icon>\n            </button>\n          </div>\n          <div *ngIf="isGoogleLogin == true">\n            <button ion-button class="login-indicator-true">\n              <ion-icon name="logo-googleplus"></ion-icon>\n            </button>\n          </div>\n      </ng-template>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list inset>\n    <div *ngIf="myBookmark.length > 0; else notExist">\n      <button ion-item *ngFor="let bookmark of myBookmark" (tap)="showDetailBook(bookmark.book_title)">\n        <h2>{{bookmark.book_title.replace(regex, \' \')}}</h2>\n        <h3>{{bookmark.book_author.replace(regex, \' \')}}</h3>\n        <h3>{{bookmark.book_release}}</h3>\n      </button> \n    </div>\n    <ng-template #notExist>\n      <button ion-item text-center class="takAda">\n        <h2>You not have bookmark for any book</h2>\n      </button>\n    </ng-template>\n  </ion-list>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n      <ion-refresher-content \n        pullingText="Pull to refresh"\n        pullingIcon="arrow-dropdown"\n        refreshingSpinner="circles"\n        refreshingText="fetching data ...">\n      </ion-refresher-content>\n  </ion-refresher>\n</ion-content>\n'/*ion-inline-end:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\book-bookmark\book-bookmark.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_plus__["a" /* GooglePlus */]])
], BookBookmarkPage);

//# sourceMappingURL=book-bookmark.js.map

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookFavouritePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_plus__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BookFavouritePage = (function () {
    // favBookChecker: any;
    function BookFavouritePage(navCtrl, navParams, fb, afDatabase, gPlus) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.afDatabase = afDatabase;
        this.gPlus = gPlus;
        this.myFav = [];
        this.favoRef = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("/Favourite-book");
        this.loggedin = false;
        this.isGoogleLogin = false;
        this.isFacebookLogin = false;
        this.userProfile = null;
        this.regex = /\-/gi;
        this.FavouriteBook = afDatabase.list('/Favourite-book');
        this.getFavouriteBook();
        this.getMyFavouriteGooglePlus();
        // this.favBookChecker = this.navParams.get('isFacebookLogin')
        // console.log("==> isFacebookLogin Parameter Value", this.favBookChecker);
    }
    BookFavouritePage.prototype.ionViewDidLoad = function () {
        console.log('===> BookFavouritePage Loaded');
    };
    BookFavouritePage.prototype.getFavouriteBook = function () {
        var _this = this;
        this.fb.getLoginStatus().then(function (res) {
            if (res.status == 'connect' || res.status == 'connected') {
                __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().onAuthStateChanged(function (user) {
                    console.log("==========================");
                    console.log(" FACEBOOK FAVOURITE CHECK  ");
                    console.log("--------------------------");
                    _this.FBData = user;
                    console.log("User Detected. Data facebook Login for this user:", _this.FBData);
                    _this.loggedin = true;
                    _this.isFacebookLogin = true;
                    _this.userIDs = _this.FBData.uid;
                    console.log('=> User ID Facebook:', _this.userIDs);
                    _this.favoRef.orderByChild("userID").equalTo(_this.userIDs).on('value', function (dataFavourite) {
                        _this.myFav = [];
                        dataFavourite.forEach(function (dataFv) {
                            _this.myFav.push(dataFv.val());
                            return false;
                        });
                        if (_this.myFav) {
                            console.log('=> Favourite Found. Count the data now :', _this.myFav.length);
                            console.log('=> The Data is :', _this.myFav);
                            _this.isHaveFavourite = true;
                        }
                        else {
                            console.log("=> No Favourite Data for this user", _this.myFav.length);
                            _this.isHaveFavourite = false;
                        }
                    });
                    console.log("==========================");
                });
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    BookFavouritePage.prototype.getMyFavouriteGooglePlus = function () {
        var _this = this;
        this.gPlus.trySilentLogin({}).then(function (stats) {
            if (stats) {
                console.log("=============================");
                console.log(" GOOGLE PLUS FAVOURITE CHECK ");
                console.log("-----------------------------");
                _this.loggedin = true;
                _this.isGoogleLogin = true;
                _this.userProfile = stats;
                console.log('==> Waiting data for (Google Plus) login user .....', _this.userProfile);
                _this.userIDs = _this.userProfile.userId;
                console.log("==> User ID Google Plus", _this.userIDs);
                _this.favoRef.orderByChild("userID").equalTo(_this.userIDs).on('value', function (dataFavourite) {
                    _this.myFav = [];
                    dataFavourite.forEach(function (dataFv) {
                        _this.myFav.push(dataFv.val());
                        return false;
                    });
                    if (_this.myFav) {
                        console.log('=> Bookmark Found. Count the Data :', _this.myFav.length);
                        console.log('=> The Data is :', _this.myFav);
                        _this.isHaveFavourite = true;
                    }
                    else {
                        console.log("=> No Bookmark Data for this user", _this.myFav.length);
                        _this.isHaveFavourite = false;
                    }
                });
                console.log("=============================");
            }
            else {
                console.log("=============================");
                console.log(" GOOGLE PLUS FAVOURITE CHECK ");
                console.log("-----------------------------");
                console.log('==> Hmmm, data for  (Google Plus) Login Not Found .....');
                _this.isGoogleLogin = false;
                _this.loggedin = false;
                console.log('=> isGoogleLogin status', _this.isGoogleLogin);
                console.log("=============================");
            }
        }).catch(function (error) {
            // this.userProfile = null;
            // this.loggedin    = false;
            console.log("=============================");
            console.log(" GOOGLE PLUS FAVOURITE CHECK ");
            console.log("-----------------------------");
            console.log('==> Google Plus Login Status :: DISCONNECTED');
            _this.isGoogleLogin = false;
            console.log('=> isGoogleLogin status', _this.isGoogleLogin);
            console.log("=============================");
        });
    };
    BookFavouritePage.prototype.doRefresh = function (refresher) {
        var _this = this;
        console.log('Begin async operation', refresher);
        this.getFavouriteBook();
        this.getMyFavouriteGooglePlus();
        setTimeout(function () {
            _this.getFavouriteBook();
            _this.getMyFavouriteGooglePlus();
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    return BookFavouritePage;
}());
BookFavouritePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-book-favourite',template:/*ion-inline-start:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\book-favourite\book-favourite.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Your Favourite Book</ion-title>\n    <ion-buttons end>\n      <div *ngIf="loggedin == false; else loginTrue">\n        <button ion-button class="login-indicator-false">\n          <ion-icon name="sunny" end></ion-icon>\n        </button>\n      </div>\n      <ng-template #loginTrue>\n          <div *ngIf="isFacebookLogin == true">\n            <button ion-button class="login-indicator-true">\n              <ion-icon name="logo-facebook"></ion-icon>\n            </button>\n          </div>\n          <div *ngIf="isGoogleLogin == true">\n            <button ion-button class="login-indicator-true">\n              <ion-icon name="logo-googleplus"></ion-icon>\n            </button>\n          </div>\n      </ng-template>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list inset>\n    <div *ngIf="myFav.length > 0; else notExist">\n      <button ion-item *ngFor="let favourite of myFav">\n        <h2>{{favourite.book_title.replace(regex, \' \')}}</h2>\n        <h3>{{favourite.book_author.replace(regex, \' \')}}</h3>\n        <h3>{{favourite.book_release}}</h3>\n      </button> \n    </div>\n    <ng-template #notExist>\n      <button ion-item text-center class="takAda">\n        <h2>You not have bookmark for any book</h2>\n      </button>\n    </ng-template>\n  </ion-list>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n      <ion-refresher-content \n        pullingText="Pull to refresh"\n        pullingIcon="arrow-dropdown"\n        refreshingSpinner="circles"\n        refreshingText="fetching data ...">\n      </ion-refresher-content>\n  </ion-refresher>\n</ion-content>\n'/*ion-inline-end:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\book-favourite\book-favourite.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_plus__["a" /* GooglePlus */]])
], BookFavouritePage);

//# sourceMappingURL=book-favourite.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComicPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(22);
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
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
    }
    ComicPage.prototype.ionViewDidLoad = function () {
        console.log('===> ComicPage Loaded');
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
    };
    ComicPage.prototype.showComic = function () {
        var _this = this;
        this.bukufiRest.readComic(this.comic_title, this.comic_chapter).then(function (data) {
            _this.comics = data;
            console.log('==> Load Full Comic :', _this.comics);
        });
    };
    ComicPage.prototype.ShowComicForNonloginUser = function () {
        var _this = this;
        this.bukufiRest.readComicNonloginUser(this.comic_title, this.comic_chapter).then(function (data) {
            _this.comicsNonLogin = data;
            console.log('==> Load Comic for Non Login User :', _this.comicsNonLogin);
        });
    };
    //===- FACEBOOK -===//
    // checkLoginStatus(){
    //   this.fb.getLoginStatus().then(res => {
    //     if(res.status == 'connect' || res.status == 'connected'){
    //       console.log("==========================");
    //       console.log("   FACEBOOK LOGIN CHECK   ");
    //       console.log("--------------------------");
    //       this.FBData = res;
    //       this.loggedin  = true;
    //       console.log('=> Facebook Data', this.FBData);
    //       console.log('==> Comic Check Facebook Login Status :: CONNECTED');
    //       console.log('=> res status value', this.loggedin);
    //       this.showComic();
    //     }
    //     else{
    //       console.log('==> Comic Check Facebook Login Status :: DISCONECTED');
    //       this.loggedin  = false;
    //       //this.loggedin  = res.status;
    //       console.log('=> res status value', this.loggedin);
    //       this.ShowComicForNonloginUser();
    //     }
    //   }).catch(err => {
    //     console.log(err);
    //   });
    // }
    //===- END -===//
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
                        console.log('==> User Facebook Login Data', _this.userProfile);
                        _this.loggedin = true;
                        _this.isFacebookLogin = true;
                        console.log('==> Facebook Login Status :: CONNECTED');
                        console.log("=> isFacebookLogin status", _this.isFacebookLogin);
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
                        console.log('==> Facebook Login Status :: DISCONNECTED');
                        console.log("=> isFacebookLogin status", _this.isFacebookLogin);
                        console.log("==========================");
                        _this.ShowComicForNonloginUser();
                    }
                });
            }
            else {
                console.log('==> Facebook Login Status :: DISCONECTED');
                _this.loggedin = false;
                _this.isFacebookLogin = false;
                console.log('=> isFacebookLogin status', _this.isFacebookLogin);
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
                console.log('==> Google Plus Login Status :: CONNECTED');
                console.log('==> isGoogleLogin status', _this.isGoogleLogin);
                _this.userProfile = stats;
                console.log('==> Waiting data for  (Google Plus) Login .....', _this.userProfile);
                console.log("==========================");
                _this.showComic();
            }
            else {
                console.log("==========================");
                console.log(" GOOGLE PLUS LOGIN CHECK ");
                console.log("--------------------------");
                console.log('==> Hmmm, data for  (Google Plus) Login Not Found .....');
                _this.isGoogleLogin = false;
                _this.loggedin = false;
                console.log('=> isGoogleLogin status', _this.isGoogleLogin);
                console.log("==========================");
                _this.ShowComicForNonloginUser();
            }
        }).catch(function (error) {
            // this.userProfile = null;
            // this.loggedin    = false;
            console.log("==========================");
            console.log(" GOOGLE PLUS LOGIN CHECK ");
            console.log("--------------------------");
            console.log('==> Google Plus Login Status :: DISCONNECTED');
            _this.isGoogleLogin = false;
            console.log('=> isGoogleLogin status', _this.isGoogleLogin);
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
    return ComicPage;
}());
ComicPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-comic',template:/*ion-inline-start:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\comic\comic.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{comic_title.replace(regex, \' \')}} - Chapter {{comic_chapter}}</ion-title>\n    <ion-buttons end>\n      <div *ngIf="loggedin == false; else loginTrue">\n        <button ion-button class="login-indicator-false">\n          <ion-icon name="sunny" end></ion-icon>\n        </button>\n      </div>\n      <ng-template #loginTrue>\n          <div *ngIf="isFacebookLogin == true">\n            <button ion-button class="login-indicator-true">\n              <ion-icon name="logo-facebook"></ion-icon>\n            </button>\n          </div>\n          <div *ngIf="isGoogleLogin == true">\n            <button ion-button class="login-indicator-true">\n              <ion-icon name="logo-googleplus"></ion-icon>\n            </button>\n          </div>\n      </ng-template>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-slides pager *ngIf="loggedin">\n    <ion-slide *ngFor="let login of comics">\n      <img src="http://bukufi.com/storage/comic/comic_files/{{login.comic_title}}/{{login.comic_image}}" alt="{{login.comic_image}}">\n      }\n    </ion-slide>\n  </ion-slides>\n\n  <ion-slides pager *ngIf="!loggedin">\n    <ion-slide *ngFor="let comics of comicsNonLogin; let i=index">\n      <div *ngIf="i<5">\n        <img src="http://bukufi.com/storage/comic/comic_files/{{comics.comic_title}}/{{comics.comic_image}}" alt="{{comics.comic_image}}">\n      </div>\n      <div *ngIf="i>=5">\n        <div class=\'wrapper\'>\n          <img src="./assets/imgs/sorry-icon.png" class="sorry">\n          <h3 class=\'sorry-message need-margin-top\'>sorry, you must login to continue reading the comic.</h3>\n          <h3 class=\'sorry-message\'>You can login from the floating button.</h3>\n          <h3 class=\'sorry-message\'>Thank you</h3>\n        </div>\n      </div>\n    </ion-slide>\n  </ion-slides>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content \n      pullingText="Pull to refresh"\n      pullingIcon="arrow-dropdown"\n      refreshingSpinner="circles"\n      refreshingText="fetching data ...">\n    </ion-refresher-content>\n  </ion-refresher>\n</ion-content>\n'/*ion-inline-end:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\comic\comic.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__["a" /* BukufiRestProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */]])
], ComicPage);

//# sourceMappingURL=comic.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComicBookmarkPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__comic_detail_comic_detail__ = __webpack_require__(56);
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
        selector: 'page-comic-bookmark',template:/*ion-inline-start:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\comic-bookmark\comic-bookmark.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Your Bookmark Comic</ion-title>\n    <ion-buttons end>\n      <div *ngIf="loggedin == false; else loginTrue">\n        <button ion-button class="login-indicator-false">\n          <ion-icon name="sunny" end></ion-icon>\n        </button>\n      </div>\n      <ng-template #loginTrue>\n          <div *ngIf="isFacebookLogin == true">\n            <button ion-button class="login-indicator-true">\n              <ion-icon name="logo-facebook"></ion-icon>\n            </button>\n          </div>\n          <div *ngIf="isGoogleLogin == true">\n            <button ion-button class="login-indicator-true">\n              <ion-icon name="logo-googleplus"></ion-icon>\n            </button>\n          </div>\n      </ng-template>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n	<ion-list inset>\n	    <div *ngIf="myBookmarkComic.length > 0; else notExist">\n	      <button ion-item *ngFor="let bookmark of myBookmarkComic" (tap)="showDetailcomic(bookmark.comic_title)">\n	        <h2>{{bookmark.comic_title.replace(regex, \' \')}}</h2>\n	        <h3>{{bookmark.comic_author.replace(regex, \' \')}}</h3>\n	        <h3>{{bookmark.comic_genre}}</h3>\n	        <h3>{{bookmark.comic_release}}</h3>\n	      </button> \n	    </div>\n	    <ng-template #notExist>\n	      <button ion-item text-center class="takAda">\n	        <h2>You not have bookmark for any comic</h2>\n	      </button>\n	    </ng-template>\n	</ion-list>\n\n	<ion-refresher (ionRefresh)="doRefresh($event)">\n	    <ion-refresher-content \n	      pullingText="Pull to refresh"\n	      pullingIcon="arrow-dropdown"\n	      refreshingSpinner="circles"\n	      refreshingText="fetching data ...">\n	    </ion-refresher-content>\n	</ion-refresher>\n</ion-content>\n'/*ion-inline-end:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\comic-bookmark\comic-bookmark.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_plus__["a" /* GooglePlus */]])
], ComicBookmarkPage);

//# sourceMappingURL=comic-bookmark.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComicFavouritePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_plus__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ComicFavouritePage = (function () {
    function ComicFavouritePage(navCtrl, navParams, fb, afDatabase, gPlus) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.afDatabase = afDatabase;
        this.gPlus = gPlus;
        this.loggedin = false;
        this.isGoogleLogin = false;
        this.isFacebookLogin = false;
        this.userProfile = null;
        this.regex = /\-/gi;
        this.myFav = [];
        this.favoRef = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("/Favourite-Comic");
        this.FavouriteComic = afDatabase.list('/Favourite-Comic');
    }
    ComicFavouritePage.prototype.ionViewDidLoad = function () {
        console.log('===> ComicFavouritePage Loaded');
        this.getFavouriteBook();
        this.getMyFavouriteGooglePlus();
    };
    ComicFavouritePage.prototype.getFavouriteBook = function () {
        var _this = this;
        this.fb.getLoginStatus().then(function (res) {
            if (res.status == 'connect' || res.status == 'connected') {
                __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().onAuthStateChanged(function (user) {
                    console.log("==========================");
                    console.log(" FACEBOOK FAVOURITE CHECK  ");
                    console.log("--------------------------");
                    _this.FBData = user;
                    console.log("User Detected. Data facebook Login for this user:", _this.FBData);
                    _this.loggedin = true;
                    _this.isFacebookLogin = true;
                    _this.userIDs = _this.FBData.uid;
                    console.log('=> User ID Facebook:', _this.userIDs);
                    _this.favoRef.orderByChild("userID").equalTo(_this.userIDs).on('value', function (dataFavourite) {
                        _this.myFav = [];
                        dataFavourite.forEach(function (dataFv) {
                            _this.myFav.push(dataFv.val());
                            return false;
                        });
                        if (_this.myFav) {
                            console.log('=> Favourite Found. Count the data now :', _this.myFav.length);
                            console.log('=> The Data is :', _this.myFav);
                            _this.isHaveFavourite = true;
                        }
                        else {
                            console.log("=> No Favourite Data for this user", _this.myFav.length);
                            _this.isHaveFavourite = false;
                        }
                    });
                    console.log("==========================");
                });
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    ComicFavouritePage.prototype.getMyFavouriteGooglePlus = function () {
        var _this = this;
        this.gPlus.trySilentLogin({}).then(function (stats) {
            if (stats) {
                console.log("=============================");
                console.log(" GOOGLE PLUS FAVOURITE CHECK ");
                console.log("-----------------------------");
                _this.loggedin = true;
                _this.isGoogleLogin = true;
                _this.userProfile = stats;
                console.log('==> Waiting data for (Google Plus) login user .....', _this.userProfile);
                _this.userIDs = _this.userProfile.userId;
                console.log("==> User ID Google Plus", _this.userIDs);
                _this.favoRef.orderByChild("userID").equalTo(_this.userIDs).on('value', function (dataFavourite) {
                    _this.myFav = [];
                    dataFavourite.forEach(function (dataFv) {
                        _this.myFav.push(dataFv.val());
                        return false;
                    });
                    if (_this.myFav) {
                        console.log('=> Favourite Found. Count the Data :', _this.myFav.length);
                        console.log('=> The Data is :', _this.myFav);
                        _this.isHaveFavourite = true;
                    }
                    else {
                        console.log("=> No Favourite Data for this user", _this.myFav.length);
                        _this.isHaveFavourite = false;
                    }
                });
                console.log("=============================");
            }
            else {
                console.log("=============================");
                console.log(" GOOGLE PLUS FAVOURITE CHECK ");
                console.log("-----------------------------");
                console.log('==> Hmmm, data for  (Google Plus) Login Not Found .....');
                _this.isGoogleLogin = false;
                _this.loggedin = false;
                console.log('=> isGoogleLogin status', _this.isGoogleLogin);
                console.log("=============================");
            }
        }).catch(function (error) {
            // this.userProfile = null;
            // this.loggedin    = false;
            console.log("=============================");
            console.log(" GOOGLE PLUS FAVOURITE CHECK ");
            console.log("-----------------------------");
            console.log('==> Google Plus Login Status :: DISCONNECTED');
            _this.isGoogleLogin = false;
            console.log('=> isGoogleLogin status', _this.isGoogleLogin);
            console.log("=============================");
        });
    };
    ComicFavouritePage.prototype.doRefresh = function (refresher) {
        var _this = this;
        console.log('Begin async operation', refresher);
        this.getFavouriteBook();
        this.getMyFavouriteGooglePlus();
        setTimeout(function () {
            _this.getFavouriteBook();
            _this.getMyFavouriteGooglePlus();
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    return ComicFavouritePage;
}());
ComicFavouritePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-comic-favourite',template:/*ion-inline-start:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\comic-favourite\comic-favourite.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Your Favourite Comic</ion-title>\n    <ion-buttons end>\n      <div *ngIf="loggedin == false; else loginTrue">\n        <button ion-button class="login-indicator-false">\n          <ion-icon name="sunny" end></ion-icon>\n        </button>\n      </div>\n      <ng-template #loginTrue>\n          <div *ngIf="isFacebookLogin == true">\n            <button ion-button class="login-indicator-true">\n              <ion-icon name="logo-facebook"></ion-icon>\n            </button>\n          </div>\n          <div *ngIf="isGoogleLogin == true">\n            <button ion-button class="login-indicator-true">\n              <ion-icon name="logo-googleplus"></ion-icon>\n            </button>\n          </div>\n      </ng-template>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n	<ion-list inset>\n	    <div *ngIf="myFav.length > 0; else notExist">\n	      <button ion-item *ngFor="let favourite of myFav">\n	      	<h2>{{favourite.comic_title.replace(regex, \' \')}}</h2>\n	        <h3>{{favourite.comic_author.replace(regex, \' \')}}</h3>\n	        <h3>{{favourite.comic_Genre}}</h3>\n	        <h3>{{favourite.comic_release}}</h3>\n	      </button> \n	    </div>\n	    <ng-template #notExist>\n	      <button ion-item text-center class="takAda">\n	        <h2>You not have bookmark for any book</h2>\n	      </button>\n	    </ng-template>\n	</ion-list>\n\n	<ion-refresher (ionRefresh)="doRefresh($event)">\n	    <ion-refresher-content \n	      pullingText="Pull to refresh"\n	      pullingIcon="arrow-dropdown"\n	      refreshingSpinner="circles"\n	      refreshingText="fetching data ...">\n	    </ion-refresher-content>\n	</ion-refresher>\n</ion-content>'/*ion-inline-end:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\comic-favourite\comic-favourite.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_plus__["a" /* GooglePlus */]])
], ComicFavouritePage);

//# sourceMappingURL=comic-favourite.js.map

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookFrontPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__book_detail_book_detail__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__book_list_book_list__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__search_search__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase__ = __webpack_require__(22);
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
        this.getPopularBooks();
        this.getNewBooks();
        //segment
        this.book = 'popular-book';
    }
    BookFrontPage.prototype.ionViewDidLoad = function () {
        console.log('===> BookFrontPage Loaded');
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
    //--------------------
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
    //--------------------
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
                        console.log('==> User Facebook Login Data', _this.userProfile);
                        _this.loggedin = true;
                        _this.isFacebookLogin = true;
                        console.log('==> Facebook Login Status :: CONNECTED');
                        console.log("=> isFacebookLogin status", _this.isFacebookLogin);
                        _this.providerIDs = "Facebook";
                        _this.userIDs = _this.userProfile.uid;
                        _this.emailIDs = _this.userProfile.email;
                        console.log("=> Facebook User ID", _this.userIDs);
                        console.log("==========================");
                    }
                    else {
                        _this.isFacebookLogin = false;
                        console.log("==========================");
                        console.log("   FACEBOOK LOGIN CHECK   ");
                        console.log("--------------------------");
                        _this.isFacebookLogin = false;
                        _this.userProfile = null;
                        console.log('==> Facebook Login Status :: DISCONNECTED');
                        console.log("=> isFacebookLogin status", _this.isFacebookLogin);
                        console.log("==========================");
                    }
                });
            }
            else {
                console.log('==> Facebook Login Status :: DISCONECTED');
                _this.loggedin = false;
                _this.isFacebookLogin = false;
                console.log('=> isFacebookLogin status', _this.isFacebookLogin);
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
                console.log('==> Hmmm, waiting data for  (Google Plus) Login .....', _this.userProfile);
                _this.loggedin = true;
                _this.isGoogleLogin = true;
                console.log('==> Google Plus Login Status :: CONNECTED');
                console.log('=> isGoogleLogin status', _this.isGoogleLogin);
                _this.providerIDs = "Google Plus";
                _this.userIDs = _this.userProfile.userId;
                _this.emailIDs = _this.userProfile.email;
                console.log("=> Google Plus User ID", _this.userIDs);
                console.log("==========================");
            }
            else {
                console.log('==> Hmmm, data for  (Google Plus) Login Not Found .....');
                _this.isGoogleLogin = false;
                _this.loggedin = false;
                console.log('=> isGoogleLogin status', _this.isGoogleLogin);
            }
        }).catch(function (error) {
            // this.userProfile = null;
            // this.loggedin    = false;
            console.log("==========================");
            console.log(" GOOGLE PLUS LOGIN CHECK ");
            console.log("--------------------------");
            console.log('==> Google Plus Login Status :: DISCONNECTED');
            _this.isGoogleLogin = false;
            console.log('=> isGoogleLogin status', _this.isGoogleLogin);
            console.log("==========================");
        });
    };
    return BookFrontPage;
}());
BookFrontPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-book-front',template:/*ion-inline-start:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\book-front\book-front.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Book</ion-title>\n    <ion-buttons end>\n      <div *ngIf="loggedin == false; else loginTrue">\n        <button ion-button class="login-indicator-false">\n          <ion-icon name="sunny" end></ion-icon>\n        </button>\n      </div>\n      <ng-template #loginTrue>\n          <div *ngIf="isFacebookLogin == true">\n            <button ion-button class="login-indicator-true">\n              <ion-icon name="logo-facebook"></ion-icon>\n            </button>\n          </div>\n          <div *ngIf="isGoogleLogin == true">\n            <button ion-button class="login-indicator-true">\n              <ion-icon name="logo-googleplus"></ion-icon>\n            </button>\n          </div>\n      </ng-template>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-segment [(ngModel)]="book">\n    <ion-segment-button value="popular-book">\n      <b>Popular Books</b>\n    </ion-segment-button>\n    <ion-segment-button value="new-book">\n      <b>New Books</b>\n    </ion-segment-button>\n  </ion-segment>\n  \n  <div [ngSwitch]="book">\n    <ion-list *ngSwitchCase="\'popular-book\'">\n      <!-- popular books -->\n      <ion-card>\n        <ion-card-header>\n          Popular Books\n        </ion-card-header>\n        <ion-card-content>\n          <ion-slides pager>\n            <ion-slide *ngFor="let book of popularBooks" (tap)="showDetailBook(book.book_title)">\n              <div *ngIf="book.book_sticker == \'New\'">\n                <div class="cnrflash-new">\n                  <div class="cnrflash-inner-new">\n                      <span class="cnrflash-label-new">\n                        NEW\n                      </span>\n                  </div>\n                </div>\n              </div>\n    \n              <div *ngIf="book.book_sticker == \'Popular\'">\n                <div class="cnrflash-popular">\n                  <div class="cnrflash-inner-popular">\n                      <span class="cnrflash-label-popular">\n                        POPULAR\n                      </span>\n                  </div>\n                </div>\n              </div>\n    \n              <div *ngIf="book.book_sticker == \'Recomended\'">\n                <div class="cnrflash-recomended">\n                  <div class="cnrflash-inner-recomended">\n                      <span class="cnrflash-label-recomended">\n                        RECOMENDED\n                      </span>\n                  </div>\n                </div>\n              </div>\n    \n              <div *ngIf="book.book_sticker == \'Editor Pick\'">\n                <div class="cnrflash-editor-pick">\n                  <div class="cnrflash-inner-editor-pick">\n                      <span class="cnrflash-label-editor-pick">\n                        EDITOR <br> PICK\n                      </span>\n                  </div>\n                </div>\n              </div>\n              <img class="book_cover" src="http://bukufi.com/storage/book/book_cover/{{book.book_image}}" alt="{{book.book_title}}">\n            </ion-slide>\n          </ion-slides>\n        </ion-card-content>\n      </ion-card>\n    </ion-list>\n\n    <ion-list *ngSwitchCase="\'new-book\'">\n      <!-- New books -->\n      <ion-card>\n        <ion-card-header style="padding: 0 !important;">\n          <ion-grid>\n            <ion-row>\n              <ion-col col-8 text-left>New Books</ion-col>\n              <ion-col col-4 text-center color="primary" (tap)="bookList()" class="more-btn">More Books</ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-card-header>\n        <ion-card-content>\n          <ion-slides pager>\n            <ion-slide *ngFor="let book of newBooks" (click)="showDetailBook(book.book_title)">\n              <div *ngIf="book.book_stikcer == \'New\'">\n                <div class="cnrflash-new">\n                  <div class="cnrflash-inner-new">\n                      <span class="cnrflash-label-new">\n                        NEW\n                      </span>\n                  </div>\n                </div>\n              </div>\n    \n              <div *ngIf="book.book_stikcer == \'Popular\'">\n                <div class="cnrflash-popular">\n                  <div class="cnrflash-inner-popular">\n                      <span class="cnrflash-label-popular">\n                        POPULAR\n                      </span>\n                  </div>\n                </div>\n              </div>\n    \n              <div *ngIf="book.book_stikcer == \'Recomended\'">\n                <div class="cnrflash-recomended">\n                  <div class="cnrflash-inner-recomended">\n                      <span class="cnrflash-label-recomended">\n                        RECOMENDED\n                      </span>\n                  </div>\n                </div>\n              </div>\n    \n              <div *ngIf="book.book_stikcer == \'Editor Pick\'">\n                <div class="cnrflash-editor-pick">\n                  <div class="cnrflash-inner-editor-pick">\n                      <span class="cnrflash-label-editor-pick">\n                        EDITOR <br> PICK\n                      </span>\n                  </div>\n                </div>\n              </div>\n              <img class="book_cover" src="http://bukufi.com/storage/book/book_cover/{{book.book_image}}" alt="{{book.book_title}}">\n            </ion-slide>\n          </ion-slides>\n        </ion-card-content>\n      </ion-card>\n    </ion-list>\n  </div>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content \n      pullingText="Pull to refresh"\n      pullingIcon="arrow-dropdown"\n      refreshingSpinner="circles"\n      refreshingText="fetching data ...">\n    </ion-refresher-content>\n  </ion-refresher>\n\n  <!--FAB BOTTOM RIGHT-->\n  <ion-fab right bottom #fab2>\n    <button ion-fab mini color="primary"><ion-icon name="apps"></ion-icon></button>\n    <ion-fab-list side="top">\n      <div *ngIf="loggedin == true; else loginfirst">\n        <button ion-fab (click)="loginFirst()">\n          <ion-icon name="information-circle"></ion-icon>\n        </button>\n      </div>\n      <ng-template #loginfirst>\n        <button ion-fab (click)="loginFirst()">\n          <ion-icon name="log-in"></ion-icon>\n        </button>\n      </ng-template>\n      <button ion-fab (click)="search()">\n        <ion-icon name="search"></ion-icon>\n      </button>\n    </ion-fab-list>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\book-front\book-front.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__["a" /* BukufiRestProvider */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__["a" /* GooglePlus */]])
], BookFrontPage);

//# sourceMappingURL=book-front.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComicFrontPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__comic_detail_comic_detail__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__comic_list_comic_list__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__search_search__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase__ = __webpack_require__(22);
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
        this.getNewComic();
        this.getPopularComic();
        this.comic = "popular-comic";
    }
    ComicFrontPage.prototype.ionViewDidLoad = function () {
        console.log('===> ComicFrontPage Loaded');
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
                        console.log('==> User Facebook Login Data', _this.userProfile);
                        _this.loggedin = true;
                        _this.isFacebookLogin = true;
                        console.log('==> Facebook Login Status :: CONNECTED');
                        console.log("=> isFacebookLogin status", _this.isFacebookLogin);
                        _this.providerIDs = "Facebook";
                        _this.userIDs = _this.userProfile.uid;
                        _this.emailIDs = _this.userProfile.email;
                        console.log("=> Facebook User ID", _this.userIDs);
                        console.log("==========================");
                    }
                    else {
                        _this.isFacebookLogin = false;
                        console.log("==========================");
                        console.log("   FACEBOOK LOGIN CHECK   ");
                        console.log("--------------------------");
                        _this.isFacebookLogin = false;
                        _this.userProfile = null;
                        console.log('==> Facebook Login Status :: DISCONNECTED');
                        console.log("=> isFacebookLogin status", _this.isFacebookLogin);
                        console.log("==========================");
                    }
                });
            }
            else {
                console.log('==> Facebook Login Status :: DISCONECTED');
                _this.loggedin = false;
                _this.isFacebookLogin = false;
                console.log('=> isFacebookLogin status', _this.isFacebookLogin);
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
                console.log('==> Hmmm, waiting data for  (Google Plus) Login .....', _this.userProfile);
                _this.loggedin = true;
                _this.isGoogleLogin = true;
                console.log('==> Google Plus Login Status :: CONNECTED');
                console.log('=> isGoogleLogin status', _this.isGoogleLogin);
                _this.providerIDs = "Google Plus";
                _this.userIDs = _this.userProfile.userId;
                _this.emailIDs = _this.userProfile.email;
                console.log("=> Google Plus User ID", _this.userIDs);
                console.log("==========================");
            }
            else {
                console.log('==> Hmmm, data for  (Google Plus) Login Not Found .....');
                _this.isGoogleLogin = false;
                _this.loggedin = false;
                console.log('=> isGoogleLogin status', _this.isGoogleLogin);
            }
        }).catch(function (error) {
            // this.userProfile = null;
            // this.loggedin    = false;
            console.log("==========================");
            console.log(" GOOGLE PLUS LOGIN CHECK ");
            console.log("--------------------------");
            console.log('==> Google Plus Login Status :: DISCONNECTED');
            _this.isGoogleLogin = false;
            console.log('=> isGoogleLogin status', _this.isGoogleLogin);
            console.log("==========================");
        });
    };
    return ComicFrontPage;
}());
ComicFrontPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-comic-front',template:/*ion-inline-start:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\comic-front\comic-front.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Comic</ion-title>\n    <ion-buttons end>\n      <div *ngIf="loggedin == false; else loginTrue">\n        <button ion-button class="login-indicator-false">\n          <ion-icon name="sunny" end></ion-icon>\n        </button>\n      </div>\n      <ng-template #loginTrue>\n          <div *ngIf="isFacebookLogin == true">\n            <button ion-button class="login-indicator-true">\n              <ion-icon name="logo-facebook"></ion-icon>\n            </button>\n          </div>\n          <div *ngIf="isGoogleLogin == true">\n            <button ion-button class="login-indicator-true">\n              <ion-icon name="logo-googleplus"></ion-icon>\n            </button>\n          </div>\n      </ng-template>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-segment [(ngModel)]="comic">\n    <ion-segment-button value="popular-comic">\n      <b>Popular Comics</b>\n    </ion-segment-button>\n    <ion-segment-button value="new-comic">\n      <b>New Comics</b>\n    </ion-segment-button>\n  </ion-segment>\n\n  <div [ngSwitch]="comic">\n    <ion-list *ngSwitchCase="\'popular-comic\'">\n      <!-- popular books -->\n      <ion-card>\n        <ion-card-header>\n          Popular Comics\n        </ion-card-header>\n        <ion-card-content>\n          <ion-slides pager>\n            <ion-slide *ngFor="let comic of popularComic" (tap)="showDetailComic(comic.comic_title)">\n              <img class="book_cover" src="http://bukufi.com/storage/comic/comic_cover/{{comic.comic_image}}" alt="{{comic.comic_title}}">\n            </ion-slide>\n          </ion-slides>\n        </ion-card-content>\n      </ion-card>\n    </ion-list>\n\n    <ion-list *ngSwitchCase="\'new-comic\'">\n      <ion-card>\n        <ion-card-header style="padding: 5px !important">\n          <ion-grid>\n            <ion-row>\n              <ion-col col-8 text-left style="padding: 5px !important">New Comic</ion-col>\n              <ion-col col-4 text-center color="primary" (click)="comicList()" class="more-btn" style="padding: 5px !important">More Comic</ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-card-header>\n        <ion-card-content>\n          <ion-slides pager>\n            <ion-slide *ngFor="let comic of newComic" (click)="showDetailComic(comic.comic_title)">\n              <img class="book_cover" src="http://bukufi.com/storage/comic/comic_cover/{{comic.comic_image}}" alt="{{comic.comic_title}}">\n            </ion-slide>\n          </ion-slides>\n        </ion-card-content>\n      </ion-card>\n    </ion-list>\n  </div>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content \n      pullingText="Pull to refresh"\n      pullingIcon="arrow-dropdown"\n      refreshingSpinner="circles"\n      refreshingText="fetching data ...">\n    </ion-refresher-content>\n  </ion-refresher>\n\n  <!--FAB BOTTOM RIGHT-->\n  <ion-fab right bottom #fab2>\n    <button ion-fab mini color="primary"><ion-icon name="apps"></ion-icon></button>\n    <ion-fab-list side="top">\n      <div *ngIf="loggedin; else loginfirst">\n        <button ion-fab (click)="loginFirst()">\n          <ion-icon name="information-circle"></ion-icon>\n        </button>\n      </div>\n      <ng-template #loginfirst>\n        <button ion-fab (click)="loginFirst()">\n          <ion-icon name="log-in"></ion-icon>\n        </button>\n      </ng-template>\n      <button ion-fab (click)="search()">\n        <ion-icon name="search"></ion-icon>\n      </button>\n    </ion-fab-list>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\comic-front\comic-front.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__["a" /* BukufiRestProvider */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__["a" /* GooglePlus */]])
], ComicFrontPage);

//# sourceMappingURL=comic-front.js.map

/***/ }),

/***/ 179:
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
webpackEmptyAsyncContext.id = 179;

/***/ }),

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/book-bookmark/book-bookmark.module": [
		517,
		12
	],
	"../pages/book-detail/book-detail.module": [
		518,
		11
	],
	"../pages/book-favourite/book-favourite.module": [
		520,
		10
	],
	"../pages/book-front/book-front.module": [
		519,
		9
	],
	"../pages/book-list/book-list.module": [
		521,
		8
	],
	"../pages/comic-bookmark/comic-bookmark.module": [
		523,
		7
	],
	"../pages/comic-detail/comic-detail.module": [
		524,
		6
	],
	"../pages/comic-favourite/comic-favourite.module": [
		522,
		5
	],
	"../pages/comic-front/comic-front.module": [
		526,
		4
	],
	"../pages/comic-list/comic-list.module": [
		525,
		3
	],
	"../pages/comic/comic.module": [
		527,
		2
	],
	"../pages/login/login.module": [
		528,
		1
	],
	"../pages/search/search.module": [
		529,
		0
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
webpackAsyncContext.id = 221;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__toc_toc__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_settings__ = __webpack_require__(286);
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
        console.log('Param from detail book :', book);
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
        console.log('ionViewDidLoad BookPage');
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
        selector: 'page-book',template:/*ion-inline-start:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\book\book.html"*/'<ion-header>\n\n\n\n  <ion-navbar transparent [color]="toolbarColor" [hidden]="!showToolbars">\n\n    <ion-buttons start>\n\n      <button ion-button icon-only (tap)="toc($event)">\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>{{pageTitle}}</ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (tap)="settings($event)">\n\n        <ion-icon name="settings"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content [ngStyle]="{\'backgroundColor\': bgColor}" no-bounce>\n\n  <div id="touchlayer" (tap)="toggleToolbars()" (swipe)="changePage($event)"></div>\n\n  <div id="book" text-justify></div>\n\n</ion-content>\n\n\n\n<ion-footer>\n\n  <ion-toolbar transparent [color]="toolbarColor" *ngIf="showToolbars">\n\n    <ion-buttons start>\n\n      <button ion-button icon-only (tap)="prev()">\n\n        <ion-icon name="arrow-dropleft-circle"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>Page {{currentPage}} {{(book && book.pagination && book.pagination.totalPages) ? \' of \' + book.pagination.totalPages : \'\'}}</ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (tap)="next()">\n\n        <ion-icon name="arrow-dropright-circle"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\book\book.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* PopoverController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], BookPage);

//# sourceMappingURL=book.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TocPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
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
        selector: 'page-toc',template:/*ion-inline-start:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\toc\toc.html"*/'<ion-list>\n\n  <ion-item class="toc" *ngFor="let chapter of toc" (tap)="selectToc(chapter)">\n\n    {{chapter.label}}\n\n  </ion-item>\n\n</ion-list>\n\n'/*ion-inline-end:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\toc\toc.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
], TocPage);

//# sourceMappingURL=toc.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
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
        selector: 'page-settings',template:/*ion-inline-start:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\settings\settings.html"*/'<ion-row>\n\n  <ion-col>\n\n    <button (click)="changeFontSize(\'smaller\')" ion-item detail-none class="text-button text-smaller">A</button>\n\n  </ion-col>\n\n  <ion-col>\n\n    <button (click)="changeFontSize(\'larger\')" ion-item detail-none class="text-button text-larger">A</button>\n\n  </ion-col>\n\n</ion-row>\n\n<ion-row class="row-dots">\n\n  <ion-col>\n\n    <button ion-button="dot" (click)="changeBackground(\'white\')" class="dot-white" [class.selected]="background == \'white\'"></button>\n\n  </ion-col>\n\n  <ion-col>\n\n    <button ion-button="dot" (click)="changeBackground(\'tan\')" class="dot-tan" [class.selected]="background == \'tan\'"></button>\n\n  </ion-col>\n\n  <ion-col>\n\n    <button ion-button="dot" (click)="changeBackground(\'grey\')" class="dot-grey" [class.selected]="background == \'grey\'"></button>\n\n  </ion-col>\n\n  <ion-col>\n\n    <button ion-button="dot" (click)="changeBackground(\'black\')" class="dot-black" [class.selected]="background == \'black\'"></button>\n\n  </ion-col>\n\n</ion-row>\n\n\n\n<ion-list radio-group [(ngModel)]="fontFamily" (ionChange)="changeFontFamily()" class="settings-page">\n\n  <ion-item class="text-athelas">\n\n    <ion-label>Athelas</ion-label>\n\n    <ion-radio value="Athelas"></ion-radio>\n\n  </ion-item>\n\n  <ion-item class="text-charter">\n\n    <ion-label>Charter</ion-label>\n\n    <ion-radio value="Charter"></ion-radio>\n\n  </ion-item>\n\n  <ion-item class="text-iowan">\n\n    <ion-label>Iowan</ion-label>\n\n    <ion-radio value="Iowan"></ion-radio>\n\n  </ion-item>\n\n  <ion-item class="text-palatino">\n\n    <ion-label>Palatino</ion-label>\n\n    <ion-radio value="Palatino"></ion-radio>\n\n  </ion-item>\n\n  <ion-item class="text-san-francisco">\n\n    <ion-label>San Francisco</ion-label>\n\n    <ion-radio value="San Francisco"></ion-radio>\n\n  </ion-item>\n\n  <ion-item class="text-seravek">\n\n    <ion-label>Seravek</ion-label>\n\n    <ion-radio value="Seravek"></ion-radio>\n\n  </ion-item>\n\n  <ion-item class="text-times-new-roman">\n\n    <ion-label>Times New Roman</ion-label>\n\n    <ion-radio value="Times New Roman"></ion-radio>\n\n  </ion-item>\n\n</ion-list>\n\n'/*ion-inline-end:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\settings\settings.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(350);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BukufiRestProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
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

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_google_plus__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__book_bookmark_book_bookmark__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__book_favourite_book_favourite__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__home_home__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__comic_bookmark_comic_bookmark__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__comic_favourite_comic_favourite__ = __webpack_require__(164);
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











var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, fb, gPlus, fire, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.gPlus = gPlus;
        this.fire = fire;
        this.platform = platform;
        this.loggedin = false;
        // FBData: any;
        // googleData: any = null;
        this.isGoogleLogin = false;
        this.isFacebookLogin = false;
        this.userProfile = null;
        this.checkGoogleLoginStatus();
        this.checkFacebookLoginStatus();
        this.loginSegment = "Book";
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('===> LoginPage Loaded');
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
                console.log('==> Login Facebook Success', _this.result);
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__home_home__["a" /* HomePage */]);
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
                        console.log('=> User Facebook Login Data', _this.userProfile);
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
                //this.loggedin  = res.status;
                console.log('=> logggedin status', _this.loggedin);
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    LoginPage.prototype.logoutFacebook = function () {
        var _this = this;
        this.fb.logout().then(function (res) {
            console.log("==> Facebook Logout Success", res);
            _this.userProfile = null;
            _this.isFacebookLogin = false;
            _this.loggedin = false;
        });
    };
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
                console.log("==> Login Google Plus Success: " + _this.gResult);
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__home_home__["a" /* HomePage */]);
            });
        }, function (err) {
            console.error("Error: ", err);
        });
    };
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
                        console.log('==> Google Plus Login Data', this.userProfile);
                        // this.userProfile  = user;
                        this.loggedin = true;
                        this.isGoogleLogin = true;
                        console.log('=> Google Plus Login Status :: CONNECTED');
                        console.log('=> logggedin status', this.loggedin);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        // this.userProfile = null;
                        this.loggedin = false;
                        this.isGoogleLogin = false;
                        console.log('==> Google Plus Login Status :: DISCONNECTED');
                        console.log('=> logggedin status', this.loggedin);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.logoutGooglePlus = function () {
        var _this = this;
        this.gPlus.logout().then(function (res) {
            console.log("==> Google Plus Logout Success", res);
            _this.userProfile = null;
            _this.isGoogleLogin = false;
            _this.loggedin = false;
        });
    };
    //== END GOOGLE ==//
    //== for bookmark ==//
    LoginPage.prototype.gotoBookmarkBook = function () {
        console.log('==> go to bookmark book now');
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__book_bookmark_book_bookmark__["a" /* BookBookmarkPage */]);
    };
    LoginPage.prototype.gotoBookmarkComic = function () {
        console.log("==> go to bookmark comic now");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__comic_bookmark_comic_bookmark__["a" /* ComicBookmarkPage */]);
    };
    //== end bookmark ==//
    //== for favourite ==//
    LoginPage.prototype.gotoFavouriteBook = function (isFacebookLogin) {
        console.log('==> go to favourite book now');
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__book_favourite_book_favourite__["a" /* BookFavouritePage */], { isFacebookLogin: isFacebookLogin });
    };
    LoginPage.prototype.gotoFavouriteComic = function () {
        console.log("go to favourite comic now");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__comic_favourite_comic_favourite__["a" /* ComicFavouritePage */]);
    };
    //== end favourite ==//
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
        selector: 'page-login',template:/*ion-inline-start:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\login\login.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="satu" *ngIf="!loggedin">\n  <div>\n    <div class="branding">\n      <h3 class="animated jackInTheBox" id="login-text">Please Login <br> to Use Full Feature App</h3>\n      <img src="./assets/imgs/login.png" />\n    </div>\n\n    <button class="facebook" ion-button icon-left outline block (click)="loginFacebook()">\n      <ion-icon name="logo-facebook"></ion-icon>\n      Login with Facebook\n    </button>\n\n    <div class="login">\n      <button class="google" ion-button icon-left outline block color="danger" (click)="loginGoogle()">\n        <ion-icon name="logo-googleplus"></ion-icon>\n        Login with Google+\n      </button>\n    </div>\n  </div>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content \n      pullingText="Pull to refresh"\n      pullingIcon="arrow-dropdown"\n      refreshingSpinner="circles"\n      refreshingText="fetching data ...">\n    </ion-refresher-content>\n  </ion-refresher>\n</ion-content>\n\n<ion-content *ngIf="loggedin" class="dua">\n\n  <ion-card *ngIf="isFacebookLogin" class="facebook"> \n    <ion-item>\n      <ion-avatar item-left>\n        <img [src]="userProfile.photoURL">\n      </ion-avatar>\n      <h2>{{ userProfile.displayName }}</h2>\n      <h3>{{ userProfile.email }}</h3>      \n    </ion-item>\n\n    <img src="./assets/imgs/thank-you.png" alt="Profile Picture">\n\n    <ion-card-content>\n      <h5 text-center>Thank you already login to our application. <br> Now you can read our books and comics as many as you want. <br> Happy reading :)</h5>\n    </ion-card-content>\n\n    \n    <ion-segment [(ngModel)]="loginSegment">\n      <ion-segment-button value="Book">\n        Book\n      </ion-segment-button>\n      <ion-segment-button value="Comic">\n        Comic\n      </ion-segment-button>\n    </ion-segment>\n\n    <div [ngSwitch]="loginSegment">\n      <ion-list *ngSwitchCase="\'Comic\'">\n        <ion-item>\n          <ion-grid>\n            <ion-row>\n              <ion-col col-6>\n                <button ion-button outline block (tap)="gotoBookmarkComic()">Bookmark Comic</button>\n              </ion-col>\n              <ion-col col-6>\n                <button ion-button color="secondary" outline block (tap)="gotoFavouriteComic()">Favourite Comic</button>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-item>\n      </ion-list>\n\n      <ion-list *ngSwitchCase="\'Book\'">\n        <ion-item>\n          <ion-grid>\n            <ion-row>\n              <ion-col col-6>\n                <button ion-button outline block (tap)="gotoBookmarkBook()">Bookmark Book</button>\n              </ion-col>\n              <ion-col col-6>\n                <button ion-button color="secondary" outline block (tap)="gotoFavouriteBook(isFacebookLogin)">Favourite Book</button>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-item>\n      </ion-list>\n    </div>\n\n    <button ion-button block outline iocn-left color="danger" (click)="logoutFacebook()">\n      <ion-icon name="log-out"></ion-icon> Logout Facebook\n    </button>\n  </ion-card>\n\n  <!-- batas -->\n  \n  <ion-card *ngIf="isGoogleLogin" class="googleplus"> \n    <ion-item>\n      <ion-avatar item-left>\n        <img [src]="userProfile.imageUrl">\n      </ion-avatar>\n      <h2>{{ userProfile.displayName }}</h2>\n      <h3>{{ userProfile.email }}</h3>      \n    </ion-item>\n\n    <img src="../assets/imgs/thank-you.png" alt="">\n\n    <ion-card-content>\n      <h5 text-center>Thank you already login to our application. <br> Now you can read our books and comics as many as you want. <br> Happy reading :)</h5>\n    </ion-card-content>\n\n    <ion-segment [(ngModel)]="loginSegment">\n      <ion-segment-button value="Book">\n        Book\n      </ion-segment-button>\n      <ion-segment-button value="Comic">\n        Comic\n      </ion-segment-button>\n    </ion-segment>\n\n    <div [ngSwitch]="loginSegment">\n      <ion-list *ngSwitchCase="\'Comic\'">\n        <ion-item>\n          <ion-grid>\n            <ion-row>\n              <ion-col col-6>\n                <button ion-button outline block (tap)="gotoBookmarkComic()">Bookmark Comic</button>\n              </ion-col>\n              <ion-col col-6>\n                <button ion-button color="secondary" outline block (tap)="gotoFavouriteComic()">Favourite Comic</button>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-item>\n      </ion-list>\n\n      <ion-list *ngSwitchCase="\'Book\'">\n        <ion-item>\n          <ion-grid>\n            <ion-row>\n              <ion-col col-6>\n                <button ion-button outline block (tap)="gotoBookmarkBook()">Bookmark Book</button>\n              </ion-col>\n              <ion-col col-6>\n                <button ion-button color="secondary" outline block (tap)="gotoFavouriteBook(isFacebookLogin)">Favourite Book</button>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-item>\n      </ion-list>\n    </div>\n\n    <button ion-button block outline iocn-left color="danger" (click)="logoutGooglePlus()">\n      <ion-icon name="log-out"></ion-icon> Logout Google Plus\n    </button>      \n  </ion-card>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content \n      pullingText="Pull to refresh"\n      pullingIcon="arrow-dropdown"\n      refreshingSpinner="circles"\n      refreshingText="fetching data ...">\n    </ion-refresher-content>\n  </ion-refresher>\n</ion-content>'/*ion-inline-end:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\login\login.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__ionic_native_google_plus__["a" /* GooglePlus */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_google_plus__["a" /* GooglePlus */],
        __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_bukufi_rest_bukufi_rest__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_facebook__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_google_plus__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_auth__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_database__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_component__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_home_home__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_book_book__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_toc_toc__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_settings_settings__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_book_detail_book_detail__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_comic_detail_comic_detail__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_comic_comic__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_book_front_book_front__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_book_list_book_list__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_comic_front_comic_front__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_comic_list_comic_list__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_login_login__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_search_search__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_comic_bookmark_comic_bookmark__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_comic_favourite_comic_favourite__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_book_bookmark_book_bookmark__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_book_favourite_book_favourite__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__providers_social_login_social_login__ = __webpack_require__(516);
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
            __WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_14__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_book_book__["a" /* BookPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_toc_toc__["a" /* TocPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_book_detail_book_detail__["a" /* BookDetailPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_comic_detail_comic_detail__["a" /* ComicDetailPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_comic_comic__["a" /* ComicPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_book_front_book_front__["a" /* BookFrontPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_book_list_book_list__["a" /* BookListPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_comic_front_comic_front__["a" /* ComicFrontPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_comic_list_comic_list__["a" /* ComicListPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_search_search__["a" /* SearchPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_book_bookmark_book_bookmark__["a" /* BookBookmarkPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_book_favourite_book_favourite__["a" /* BookFavouritePage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_comic_bookmark_comic_bookmark__["a" /* ComicBookmarkPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_comic_favourite_comic_favourite__["a" /* ComicFavouritePage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_10_angularfire2_auth__["b" /* AngularFireAuthModule */],
            __WEBPACK_IMPORTED_MODULE_11_angularfire2__["a" /* AngularFireModule */].initializeApp(config),
            __WEBPACK_IMPORTED_MODULE_12_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/book-bookmark/book-bookmark.module#BookBookmarkPageModule', name: 'BookBookmarkPage', segment: 'book-bookmark', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/book-detail/book-detail.module#BookDetailPageModule', name: 'BookDetailPage', segment: 'book-detail', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/book-front/book-front.module#BookFrontPageModule', name: 'BookFrontPage', segment: 'book-front', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/book-favourite/book-favourite.module#BookFavouritePageModule', name: 'BookFavouritePage', segment: 'book-favourite', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/book-list/book-list.module#BookListPageModule', name: 'BookListPage', segment: 'book-list', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/comic-favourite/comic-favourite.module#ComicFavouritePageModule', name: 'ComicFavouritePage', segment: 'comic-favourite', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/comic-bookmark/comic-bookmark.module#ComicBookmarkPageModule', name: 'ComicBookmarkPage', segment: 'comic-bookmark', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/comic-detail/comic-detail.module#ComicDetailPageModule', name: 'ComicDetailPage', segment: 'comic-detail', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/comic-list/comic-list.module#ComicListPageModule', name: 'ComicListPage', segment: 'comic-list', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/comic-front/comic-front.module#ComicFrontPageModule', name: 'ComicFrontPage', segment: 'comic-front', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/comic/comic.module#ComicPageModule', name: 'ComicPage', segment: 'comic', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/search/search.module#SearchPageModule', name: 'SearchPage', segment: 'search', priority: 'low', defaultHistory: [] }
                ]
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_14__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_book_book__["a" /* BookPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_toc_toc__["a" /* TocPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_book_detail_book_detail__["a" /* BookDetailPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_comic_detail_comic_detail__["a" /* ComicDetailPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_comic_comic__["a" /* ComicPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_book_front_book_front__["a" /* BookFrontPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_book_list_book_list__["a" /* BookListPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_comic_front_comic_front__["a" /* ComicFrontPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_comic_list_comic_list__["a" /* ComicListPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_search_search__["a" /* SearchPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_book_bookmark_book_bookmark__["a" /* BookBookmarkPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_book_favourite_book_favourite__["a" /* BookFavouritePage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_comic_bookmark_comic_bookmark__["a" /* ComicBookmarkPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_comic_favourite_comic_favourite__["a" /* ComicFavouritePage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_7__providers_bukufi_rest_bukufi_rest__["a" /* BukufiRestProvider */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_google_plus__["a" /* GooglePlus */],
            __WEBPACK_IMPORTED_MODULE_31__providers_social_login_social_login__["a" /* SocialLoginProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__book_list_book_list__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__comic_list_comic_list__ = __webpack_require__(97);
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
    }
    SearchPage.prototype.ionViewDidLoad = function () {
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
        selector: 'page-search',template:/*ion-inline-start:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\search\search.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Search</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <img src="assets/imgs/search.png">\n  <ion-grid>\n    <ion-row>\n      <ion-col col-12 text-center>\n        <h4>Choose what you want to search</h4>\n      </ion-col>\n      <ion-col col-6>\n        <button ion-button outline icon-left block (tap)="bookSearch()">\n          <ion-icon name="book"></ion-icon> Search Book\n        </button>\n      </ion-col>\n      <ion-col col-6>\n        <button ion-button color="secondary" outline icon-left block (tap)="comicSearch()">\n            <ion-icon name="images"></ion-icon> Search Comic\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\search\search.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], SearchPage);

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 515:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_book_front_book_front__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_comic_front_comic_front__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__ = __webpack_require__(15);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\riser\Desktop\ionic-epubjs\src\app\app.html"*/'<ion-menu [content]="content">\n\n    <ion-header>\n\n        <ion-toolbar>\n\n        <ion-title>Menu</ion-title>\n\n        </ion-toolbar>\n\n    </ion-header>\n\n\n\n    <ion-content>\n\n        <ion-list>\n\n        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n            {{p.title}}\n\n        </button>\n\n        </ion-list>\n\n    </ion-content>\n\n</ion-menu>\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\Users\riser\Desktop\ionic-epubjs\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__["a" /* GooglePlus */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 516:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocialLoginProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(273);
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

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__book_book__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__search_search__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase__ = __webpack_require__(22);
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
    function BookDetailPage(navCtrl, navParams, bukufiRest, fb, gPlus, afDatabase, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.bukufiRest = bukufiRest;
        this.fb = fb;
        this.gPlus = gPlus;
        this.afDatabase = afDatabase;
        this.alertCtrl = alertCtrl;
        this.isHaveCounter = false;
        this.loggedin = false;
        this.isFacebookLogin = false;
        this.isGoogleLogin = false;
        this.userProfile = null;
        this.checkAvailableReview = 0;
        this.myFav = [];
        this.favoRef = __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.database().ref("/Favourite-book");
        this.myBookmark = [];
        this.bookmarkRef = __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.database().ref("/Bookmark-book");
        this.book = this.navParams.get('book');
        console.log('==> Parameter from HomePage: ', this.book);
        this.getDetail();
        this.getCounter();
        this.getBookReview();
        this.getBookProsenStatistic();
        this.checkFacebookLoginStatus();
        this.checkGoogleLoginStatus();
        //create database reference
        this.favBook = afDatabase.list('/Favourite-book');
        this.BookmarkBook = afDatabase.list('/Bookmark-book');
    }
    BookDetailPage.prototype.ionViewDidLoad = function () {
        console.log('===> BookDetailPage loaded');
    };
    BookDetailPage.prototype.getDetail = function () {
        var _this = this;
        this.bukufiRest.getDetailBook(this.book)
            .then(function (data) {
            _this.book_detail = data;
            console.log('==> Detail Book :', _this.book_detail);
            //for bookmark and favourite
            for (var _i = 0, _a = _this.book_detail; _i < _a.length; _i++) {
                var favTemp = _a[_i];
                _this.bookAuthor = favTemp.book_author;
                _this.bookPublisher = favTemp.book_publisher;
                _this.bookRelease = favTemp.book_release;
            }
        });
    };
    //===- GET COUNTER -===//
    BookDetailPage.prototype.getCounter = function () {
        var _this = this;
        this.bukufiRest.getCounterBook(this.book).then(function (data) {
            _this.book_counter = data;
            console.log('==> Book Counter :', data);
            if (_this.book_counter) {
                _this.isHaveCounter = true;
                _this.book_counter_exist = _this.book_counter;
                console.log('==> Book counter EXIST');
            }
            else {
                console.log('==> Book counter NOT EXIST');
                _this.isHaveCounter = false;
            }
        });
    };
    //===- END GET COUNTER -===//
    /*===- GET BOOK REVIEW -===*/
    BookDetailPage.prototype.getBookReview = function () {
        var _this = this;
        this.bukufiRest.getReviewBook(this.book).then(function (data) {
            _this.bookReveiew = data;
            if (_this.bookReveiew.length > 0) {
                _this.checkAvailableReview = 1;
                console.log('=-> Ada Review Buku :', _this.checkAvailableReview);
            }
            else {
                _this.checkAvailableReview = 0;
                console.log('=-> Tidak Ada Review Buku :', _this.checkAvailableReview);
            }
        });
    };
    /*===- END GET BOOK REVIEW -===*/
    /*===- GET BOOK STATISTIC -===*/
    BookDetailPage.prototype.getBookProsenStatistic = function () {
        var _this = this;
        this.bukufiRest.getBookStatisticonProsen(this.book).then(function (data) {
            _this.book_statictic = data;
            console.log('==> Book statistic :', data);
            if (_this.book_statictic) {
                _this.isHaveStatistic = true;
                _this.book_statistic_exist = _this.book_statictic;
                console.log('=> Book Statistic EXIST', _this.book_statistic_exist);
            }
            else {
                _this.isHaveStatistic = false;
                console.log("=> Book Statistic DOESN'T EXIST");
            }
        }, function (err) {
            console.log(err);
        });
    };
    /*===- END BOK STATISTIC -===*/
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
                        console.log('==> User Facebook Login Data', _this.userProfile);
                        _this.loggedin = true;
                        _this.isFacebookLogin = true;
                        console.log('==> Facebook Login Status :: CONNECTED');
                        console.log("=> isFacebookLogin status", _this.isFacebookLogin);
                        _this.providerIDs = "Facebook";
                        _this.userIDs = _this.userProfile.uid;
                        _this.emailIDs = _this.userProfile.email;
                        console.log("=> Facebook User ID", _this.userIDs);
                        console.log("==========================");
                    }
                    else {
                        _this.isFacebookLogin = false;
                        console.log("==========================");
                        console.log("   FACEBOOK LOGIN CHECK   ");
                        console.log("--------------------------");
                        _this.isFacebookLogin = false;
                        _this.userProfile = null;
                        console.log('==> Facebook Login Status :: DISCONNECTED');
                        console.log("=> isFacebookLogin status", _this.isFacebookLogin);
                        console.log("==========================");
                    }
                });
            }
            else {
                console.log('==> Facebook Login Status :: DISCONECTED');
                _this.loggedin = false;
                _this.isFacebookLogin = false;
                console.log('=> isFacebookLogin status', _this.isFacebookLogin);
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
                console.log('==> Hmmm, waiting data for  (Google Plus) Login .....', _this.userProfile);
                _this.loggedin = true;
                _this.isGoogleLogin = true;
                console.log('==> Google Plus Login Status :: CONNECTED');
                console.log('=> isGoogleLogin status', _this.isGoogleLogin);
                _this.providerIDs = "Google Plus";
                _this.userIDs = _this.userProfile.userId;
                _this.emailIDs = _this.userProfile.email;
                console.log("=> Google Plus User ID", _this.userIDs);
                console.log("==========================");
            }
            else {
                console.log('==> Hmmm, data for  (Google Plus) Login Not Found .....');
                _this.isGoogleLogin = false;
                _this.loggedin = false;
                console.log('=> isGoogleLogin status', _this.isGoogleLogin);
            }
        }).catch(function (error) {
            // this.userProfile = null;
            // this.loggedin    = false;
            console.log("==========================");
            console.log(" GOOGLE PLUS LOGIN CHECK ");
            console.log("--------------------------");
            console.log('==> Google Plus Login Status :: DISCONNECTED');
            _this.isGoogleLogin = false;
            console.log('=> isGoogleLogin status', _this.isGoogleLogin);
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
                        var newFavBookRef = _this.favBook.push({});
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
        selector: 'page-book-detail',template:/*ion-inline-start:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\book-detail\book-detail.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title *ngFor="let book of book_detail">\n      {{book.book_title_nodash}}\n    </ion-title>\n    <ion-buttons end>\n      <div *ngIf="loggedin == false; else loginTrue">\n        <button ion-button class="login-indicator-false">\n          <ion-icon name="sunny" end></ion-icon>\n        </button>\n      </div>\n      <ng-template #loginTrue>\n          <div *ngIf="isFacebookLogin == true">\n            <button ion-button class="login-indicator-true">\n              <ion-icon name="logo-facebook"></ion-icon>\n            </button>\n          </div>\n          <div *ngIf="isGoogleLogin == true">\n            <button ion-button class="login-indicator-true">\n              <ion-icon name="logo-googleplus"></ion-icon>\n            </button>\n          </div>\n      </ng-template>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-card *ngFor="let book of book_detail">\n    <ion-grid>\n      <ion-row>\n        <ion-col col-6>\n            <div *ngIf="book.book_stikcer == \'New\'">\n              <div class="cnrflash-new">\n                <div class="cnrflash-inner-new">\n                    <span class="cnrflash-label-new">\n                      NEW\n                    </span>\n                </div>\n              </div>\n            </div>\n  \n            <div *ngIf="book.book_stikcer == \'Popular\'">\n              <div class="cnrflash-popular">\n                <div class="cnrflash-inner-popular">\n                    <span class="cnrflash-label-popular">\n                      POPULAR\n                    </span>\n                </div>\n              </div>\n            </div>\n  \n            <div *ngIf="book.book_stikcer == \'Recomended\'">\n              <div class="cnrflash-recomended">\n                <div class="cnrflash-inner-recomended">\n                    <span class="cnrflash-label-recomended">\n                      RECOMENDED\n                    </span>\n                </div>\n              </div>\n            </div>\n  \n            <div *ngIf="book.book_stikcer == \'Editor Pick\'">\n              <div class="cnrflash-editor-pick">\n                <div class="cnrflash-inner-editor-pick">\n                    <span class="cnrflash-label-editor-pick">\n                      EDITOR <br> PICK\n                    </span>\n                </div>\n              </div>\n            </div>\n\n            <img src="http://bukufi.com/storage/book/book_cover/{{book.book_image}}"/>\n        </ion-col>\n        <ion-col col-6>\n          <div>\n            <div class="counterRating" *ngIf="isHaveCounter == true">\n              <div *ngFor="let counter of book_counter_exist">\n                  <ion-icon name="eye"></ion-icon> <b>{{counter.counter}}</b>\n              </div>\n              \n            </div>\n          </div>\n\n          <div class="counterRating" *ngIf="isHaveCounter == false">\n            <ion-icon name="eye"></ion-icon> <b>0</b>\n          </div>\n\n            <!-- batas -->\n            \n          <div class="counterRating2" *ngIf="isHaveStatistic == true">\n            <p text-end class="black">\n              <b>{{book_statistic_exist}} % <ion-icon name="thumbs-up"></ion-icon></b>\n            </p>\n          </div>\n\n          <div *ngIf="isHaveStatistic == false">\n            <div class="counterRating2">\n              <p text-end class="black">\n                <b>No Statistic yet</b>\n              </p>\n            </div>\n          </div>\n\n            <!-- fb: {{isFacebookLogin}} - gp: {{isGoogleLogin}} - LGD {{loggedin}} -->\n\n            <!-- batas -->\n\n          <div *ngIf="loggedin; else loginfirst">\n            <!-- <div *ngIf="isHaveBookmark == true">\n              <button ion-button outline small block color="secondary" icon-left disabled>\n                <ion-icon name="bookmark"></ion-icon>Bookmark\n              </button>\n            </div> -->\n            \n            <!-- <div *ngIf="isHaveBookmark == false"> -->\n              <button ion-button outline small block color="secondary" icon-left (tap)="addBookmarkBook()">\n                <ion-icon name="bookmark"></ion-icon>Bookmark\n              </button>\n            <!-- </div> -->\n          </div>\n          <ng-template #loginfirst>\n            <button ion-button outline small block color="secondary" icon-left disabled>\n              <ion-icon name="bookmark"></ion-icon>Bookmark\n            </button>\n          </ng-template>\n\n            <!-- batas -->\n\n          <div *ngIf="loggedin; else loginzero">\n            <!-- <div *ngIf="isHavefavourite == true; else BookmarkNotFound">\n              <button ion-button outline small block icon-left class="btn-2" disabled>\n                  <ion-icon name="heart"></ion-icon> Favourite\n              </button>\n            </div> -->\n            <!-- <ng-template #BookmarkNotFound> -->\n              <button ion-button outline small block icon-left class="btn-2" (click)="addFavouriteBook()">\n                  <ion-icon name="heart"></ion-icon> Favourite\n              </button>\n            <!-- </ng-template> -->\n          </div>\n\n          <ng-template #loginzero>\n            <button ion-button outline small block icon-left class="btn-2" disabled>\n                <ion-icon name="heart"></ion-icon> Favourite\n            </button>\n          </ng-template>\n\n            <!-- batas -->\n\n          <div *ngIf="loggedin; else nologin">\n            <div *ngIf="isFacebookLogin == true; else googlelogin">\n              <div>\n                <button ion-button block icon-left (tap)="show(book.book_file)" class="read-btn">\n                  <ion-icon ios="ios-book" md="md-book"></ion-icon> Read Book\n                </button>\n              </div>\n            </div>\n\n            <ng-template #googlelogin>\n              <button ion-button block icon-left (tap)="show(book.book_file)" class="read-btn">\n                <ion-icon ios="ios-book" md="md-book"></ion-icon> Read Book\n              </button>\n            </ng-template>\n          </div>\n\n          <ng-template #nologin>\n            <button ion-button block icon-left (tap)="show(book.book_file)" class="read-btn" disabled>\n              <ion-icon ios="ios-book" md="md-book"></ion-icon> Read Book\n            </button>\n          </ng-template>\n          \n        </ion-col>\n        <!-- description area -->\n        <ion-col col-12>\n          <ion-row class="desc">\n            <ion-col col-4 class="no-padding-left-right"><strong>Author</strong></ion-col>\n            <ion-col col-1>:</ion-col>\n            <ion-col col-7 class="no-padding-left-right no-padd-top-btm">\n              <p class="mt-25">{{book.book_author_nodash}}</p>\n            </ion-col>\n            <hr>\n          </ion-row>\n          <ion-row class="desc">\n            <ion-col col-4 class="no-padding-left-right"><strong>Publisher</strong></ion-col>\n            <ion-col col-1>:</ion-col>\n            <ion-col col-7 class="no-padding-left-right no-padd-top-btm">\n              <p class="mt-25">{{book.book_publisher_nodash}}</p>\n            </ion-col>\n            <hr>\n          </ion-row>\n          <ion-row class="desc">\n            <ion-col col-4 class="no-padding-left-right"><strong>Year of Release</strong></ion-col>\n            <ion-col col-1>:</ion-col>\n            <ion-col col-7 class="no-padding-left-right no-padd-top-btm">\n              <p class="mt-25">{{book.book_release}}</p>\n            </ion-col>\n          </ion-row>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-card>\n\n  <!--for review-->\n  <ion-card>\n    <ion-card-header class="user-review-hdr">\n      User Review\n    </ion-card-header>\n    <div *ngIf="checkAvailableReview == 1; else noReview">\n      <ion-list class="no-padding-top" *ngFor="let review of bookReveiew">\n        <button ion-item>\n            {{review.user_book_review}}\n            <p text-right>~ {{review.user_name}}</p>\n        </button>\n      </ion-list>\n    </div>\n\n    <ng-template #noReview>\n      <ion-list class="no-review">\n        <button ion-item>\n          <p text-center>No Review Yet</p>\n        </button>\n      </ion-list>\n    </ng-template>\n  </ion-card>\n\n  <!--FAB BOTTOM RIGHT-->\n  <ion-fab right bottom #fab2>\n    <button ion-fab mini color="primary"><ion-icon name="apps"></ion-icon></button>\n    <ion-fab-list side="top">\n      <div *ngIf="loggedin == true; else loginfirst">\n        <button ion-fab (click)="loginFirst()">\n          <ion-icon name="information-circle"></ion-icon>\n        </button>\n      </div>\n      <ng-template #loginfirst>\n        <button ion-fab (click)="loginFirst()">\n          <ion-icon name="log-in"></ion-icon>\n        </button>\n      </ng-template>\n      <button ion-fab (click)="search()">\n        <ion-icon name="search"></ion-icon>\n      </button>\n    </ion-fab-list>\n  </ion-fab>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content \n      pullingText="Pull to refresh"\n      pullingIcon="arrow-dropdown"\n      refreshingSpinner="circles"\n      refreshingText="fetching data ...">\n    </ion-refresher-content>\n  </ion-refresher>\n</ion-content>\n'/*ion-inline-end:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\book-detail\book-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__["a" /* BukufiRestProvider */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__["a" /* GooglePlus */],
        __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], BookDetailPage);

//# sourceMappingURL=book-detail.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComicDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__comic_comic__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__search_search__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_plus__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__ = __webpack_require__(44);
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
        this.getComicCounter();
        this.getComicStatistic();
        //create database reference
        this.favouriteComic = afDatabase.list('/Favourite-Comic');
        this.BookmarkComic = afDatabase.list('/Bookmark-Comic');
    }
    ComicDetailPage.prototype.ionViewDidLoad = function () {
        console.log('===> ComicDetailPage Loaded');
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__comic_comic__["a" /* ComicPage */], { comic_title: comic_title, comic_chapter: comic_chapter });
    };
    ComicDetailPage.prototype.loginFirst = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
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
                        console.log('==> User Facebook Login Data', _this.userProfile);
                        _this.loggedin = true;
                        _this.isFacebookLogin = true;
                        console.log('==> Facebook Login Status :: CONNECTED');
                        console.log("=> isFacebookLogin status", _this.isFacebookLogin);
                        _this.providerIDs = "Facebook";
                        _this.userIDs = _this.userProfile.uid;
                        _this.emailIDs = _this.userProfile.email;
                        console.log("=> Facebook User ID", _this.userIDs);
                        console.log("==========================");
                    }
                    else {
                        _this.isFacebookLogin = false;
                        console.log("==========================");
                        console.log("   FACEBOOK LOGIN CHECK   ");
                        console.log("--------------------------");
                        _this.isFacebookLogin = false;
                        _this.userProfile = null;
                        console.log('==> Facebook Login Status :: DISCONNECTED');
                        console.log("=> isFacebookLogin status", _this.isFacebookLogin);
                        console.log("==========================");
                    }
                });
            }
            else {
                console.log('==> Facebook Login Status :: DISCONECTED');
                _this.loggedin = false;
                _this.isFacebookLogin = false;
                console.log('=> isFacebookLogin status', _this.isFacebookLogin);
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
                console.log('==> Hmmm, waiting data for  (Google Plus) Login .....', _this.userProfile);
                _this.loggedin = true;
                _this.isGoogleLogin = true;
                console.log('==> Google Plus Login Status :: CONNECTED');
                console.log('=> isGoogleLogin status', _this.isGoogleLogin);
                _this.providerIDs = "Google Plus";
                _this.userIDs = _this.userProfile.userId;
                _this.emailIDs = _this.userProfile.email;
                console.log("=> Google Plus User ID", _this.userIDs);
                console.log("==========================");
            }
            else {
                console.log('==> Hmmm, data for  (Google Plus) Login Not Found .....');
                _this.isGoogleLogin = false;
                _this.loggedin = false;
                console.log('=> isGoogleLogin status', _this.isGoogleLogin);
            }
        }).catch(function (error) {
            // this.userProfile = null;
            // this.loggedin    = false;
            console.log("==========================");
            console.log(" GOOGLE PLUS LOGIN CHECK ");
            console.log("--------------------------");
            console.log('==> Google Plus Login Status :: DISCONNECTED');
            _this.isGoogleLogin = false;
            console.log('=> isGoogleLogin status', _this.isGoogleLogin);
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
    //===- GET COUNTER -===//
    ComicDetailPage.prototype.getComicCounter = function () {
        var _this = this;
        this.bukufiRest.getCounterComic(this.comic).then(function (data) {
            _this.comicCounter = data;
            console.log('==> Comic Counter :', data);
            if (_this.comicCounter) {
                _this.isHaveCounter = true;
                _this.comicCounterExist = _this.comicCounter;
                console.log('==> Comic counter EXIST');
            }
            else {
                console.log('==> Comic counter NOT EXIST');
                _this.isHaveCounter = false;
            }
        });
    };
    //===- END GET COUNTER -===//
    /*===- GET COMIC STATISTIC -===*/
    ComicDetailPage.prototype.getComicStatistic = function () {
        var _this = this;
        this.bukufiRest.getComicStatisticonProsen(this.comic).then(function (data) {
            _this.comicStatistic = data;
            console.log('==> Comic statistic :', data);
            if (_this.comicStatistic) {
                _this.isHaveStatistic = true;
                _this.comicStatisticExist = _this.comicStatistic;
                console.log('=> Comic Statistic EXIST', _this.comicStatisticExist);
            }
            else {
                _this.isHaveStatistic = false;
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
        selector: 'page-comic-detail',template:/*ion-inline-start:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\comic-detail\comic-detail.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Comic Detail</ion-title>\n    <ion-buttons end>\n      <div *ngIf="loggedin == false; else loginTrue">\n        <button ion-button class="login-indicator-false">\n          <ion-icon name="sunny" end></ion-icon>\n        </button>\n      </div>\n      <ng-template #loginTrue>\n          <div *ngIf="isFacebookLogin == true">\n            <button ion-button class="login-indicator-true">\n              <ion-icon name="logo-facebook"></ion-icon>\n            </button>\n          </div>\n          <div *ngIf="isGoogleLogin == true">\n            <button ion-button class="login-indicator-true">\n              <ion-icon name="logo-googleplus"></ion-icon>\n            </button>\n          </div>\n      </ng-template>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-card *ngFor="let comic of comic_detail?.data1">\n    <ion-grid>\n      <ion-row>\n        <ion-col col-6>\n          <img src="http://bukufi.com/storage/comic/comic_cover/{{comic.comic_image}}"/>\n        </ion-col>\n        <ion-col col-6>\n\n          <div>\n            <div class="counterRating" *ngIf="isHaveCounter == true">\n              <div *ngFor="let counter of comicCounterExist">\n                  <ion-icon name="eye"></ion-icon> <b>{{counter.counter}}</b>\n              </div>\n            </div>\n          </div>\n\n          <div class="counterRating" *ngIf="isHaveCounter == false">\n            <ion-icon name="eye"></ion-icon> <b>0</b>\n          </div>\n\n            <!-- batas -->\n            \n          <div class="counterRating2" *ngIf="isHaveStatistic == true">\n            <p text-end class="black">\n              <b>{{comicStatisticExist}} % <ion-icon name="thumbs-up"></ion-icon></b>\n            </p>\n          </div>\n\n          <div *ngIf="isHaveStatistic == false">\n            <div class="counterRating2">\n              <p text-end class="black">\n                <b>No Statistic yet</b>\n              </p>\n            </div>\n          </div>\n\n            <div *ngIf="loggedin">\n              <button ion-button outline small block color="secondary" icon-left (click)="addBookmarkComic()">\n                <ion-icon name="bookmark"></ion-icon>Bookmark\n                <!-- <input type="hidden" value="{{book.book_title}}" name="bookmark"> -->\n              </button>\n            </div>\n\n            <div *ngIf="!loggedin">\n              <button ion-button outline small block color="secondary" icon-left disabled>\n                <ion-icon name="bookmark"></ion-icon>Bookmark\n                <!-- <input type="hidden" value="{{book.book_title}}" name="bookmark"> -->\n              </button>\n            </div>\n\n            <div *ngIf="loggedin">\n              <button ion-button outline small block icon-left class="btn-2" (click)="addFavouriteComic()">\n                  <ion-icon name="heart"></ion-icon> Favourite\n              </button>\n            </div>\n\n            <div *ngIf="!loggedin">\n              <button ion-button outline small block icon-left class="btn-2" disabled>\n                  <ion-icon name="heart"></ion-icon> Favourite\n              </button>\n            </div>\n        </ion-col>\n        <!-- description area -->\n        <ion-col col-12>\n          <ion-row>\n            <ion-col col-4><strong>Author</strong></ion-col>\n            <ion-col col-1>:</ion-col>\n            <ion-col col-7>{{comic.comic_author_nodash}}</ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-4><strong>Genre</strong></ion-col>\n            <ion-col col-1>:</ion-col>\n            <ion-col col-7>{{comic.comic_genre}}</ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-4><strong>Release</strong></ion-col>\n            <ion-col col-1>:</ion-col>\n            <ion-col col-7>{{comic.comic_release}}</ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-4><strong>Status</strong></ion-col>\n            <ion-col col-1>:</ion-col>\n            <ion-col col-7>{{comic.comic_status}}</ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-4><strong>Description</strong></ion-col>\n            <ion-col col-1>:</ion-col>\n            <ion-col col-7>{{comic.comic_description}}</ion-col>\n          </ion-row>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-card>\n\n  <ion-card>\n    <ion-card-header class="bold">\n      Comic Chapter\n    </ion-card-header>\n    <ion-card-content class="scroll">\n        <ion-list *ngFor="let comic of comic_detail?.data2">\n          <button ion-button outline full (click)="readComic(comic.comic_title, comic.comic_chapter)">\n              <i class="fa fa-caret-right" aria-hidden="true"></i> Chapter {{comic.comic_chapter}} : {{comic.chapter_title}}\n          </button>\n        </ion-list>\n    </ion-card-content>\n  </ion-card>\n\n  <!--for review-->\n  <ion-card class="review">\n    <ion-card-header class="user-review-hdr">\n      User Review\n    </ion-card-header>\n    <div *ngIf="checkAvailableReview == 1; else noReview">\n      <ion-list class="no-padding-top" *ngFor="let review of comicReview">\n        <button ion-item>\n            {{review.user_comic_review}}\n            <p text-right>~ {{review.user_name}}</p>\n        </button>\n      </ion-list>\n    </div>\n\n    <ng-template #noReview>\n      <ion-list class="no-review">\n        <button ion-item>\n          <p text-center>No Review Yet</p>\n        </button>\n      </ion-list>\n    </ng-template>\n  </ion-card>\n\n  <!--FAB BOTTOM RIGHT-->\n  <ion-fab right bottom #fab2>\n    <button ion-fab mini color="primary"><ion-icon name="apps"></ion-icon></button>\n    <ion-fab-list side="top">\n      <div *ngIf="loggedin == true; else loginfirst">\n        <button ion-fab (click)="loginFirst()">\n          <ion-icon name="information-circle"></ion-icon>\n        </button>\n      </div>\n      <ng-template #loginfirst>\n        <button ion-fab (click)="loginFirst()">\n          <ion-icon name="log-in"></ion-icon>\n        </button>\n      </ng-template>\n      <button ion-fab (click)="search()">\n        <ion-icon name="search"></ion-icon>\n      </button>\n    </ion-fab-list>\n  </ion-fab>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content \n      pullingText="Pull to refresh"\n      pullingIcon="arrow-dropdown"\n      refreshingSpinner="circles"\n      refreshingText="fetching data ...">\n    </ion-refresher-content>\n  </ion-refresher>\n</ion-content>\n'/*ion-inline-end:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\comic-detail\comic-detail.html"*/,
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

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__book_detail_book_detail__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__ = __webpack_require__(15);
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
    function BookListPage(navCtrl, navParams, bukufiRest, fb) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.bukufiRest = bukufiRest;
        this.fb = fb;
        this.loggedin = false;
        this.getAllBooks();
        this.checkLoginStatus();
    }
    BookListPage.prototype.ionViewDidLoad = function () {
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
    BookListPage.prototype.loginFirst = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
    };
    //===- FACEBOOK -===//
    BookListPage.prototype.checkLoginStatus = function () {
        var _this = this;
        this.fb.getLoginStatus().then(function (res) {
            if (res.status == 'connect' || res.status == 'connected') {
                console.log('==> Book List Check Facebook Login Status :: CONNECTED');
                _this.FBData = res;
                _this.loggedin = true;
                console.log('=> Facebook Data', _this.FBData);
                console.log('=> res status value', _this.loggedin);
            }
            else {
                console.log('==> Book List Check Facebook Login Status :: DISCONECTED');
                _this.loggedin = false;
                //this.loggedin  = res.status;
                console.log('=> res status value', _this.loggedin);
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    return BookListPage;
}());
BookListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-book-list',template:/*ion-inline-start:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\book-list\book-list.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Book List</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-searchbar [(ngModel)]="val" (ionInput)="getItems($event)" [debounce]="500" placeholder="Enter Keyword here ..."></ion-searchbar>\n  <ion-list>\n    <ion-item *ngFor="let book of allBooks">\n      <ion-thumbnail item-start>\n        <img src="http://bukufi.com/storage/book/book_cover/{{book.book_image}}">\n      </ion-thumbnail>\n      <h2>{{book.book_title_nodash}}</h2>\n      <p>{{book.book_author_nodash}}</p>\n      <p>{{book.book_release}}</p>\n      <p style="padding-top: 3px;"><ion-icon name="pricetags"></ion-icon> {{book.book_stikcer}}</p>\n      <button ion-button outline item-end (click)="showDetailBook(book.book_title)">View</button>\n    </ion-item>\n  </ion-list>\n\n  <!--FAB BOTTOM RIGHT-->\n  <ion-fab right bottom #fab2>\n    <button ion-fab mini color="primary"><ion-icon name="apps"></ion-icon></button>\n    <ion-fab-list side="top">\n      <div *ngIf="loggedin == true; else loginfirst">\n        <button ion-fab (click)="loginFirst()">\n          <ion-icon name="information-circle"></ion-icon>\n        </button>\n      </div>\n      <ng-template #loginfirst>\n        <button ion-fab (click)="loginFirst()">\n          <ion-icon name="log-in"></ion-icon>\n        </button>\n      </ng-template>\n    </ion-fab-list>\n  </ion-fab>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content \n    pullingText="Pull to refresh"\n    pullingIcon="arrow-dropdown"\n    refreshingSpinner="circles"\n    refreshingText="fetching data ..."></ion-refresher-content>\n  </ion-refresher>\n</ion-content>\n'/*ion-inline-end:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\book-list\book-list.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__["a" /* BukufiRestProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__["a" /* Facebook */]])
], BookListPage);

//# sourceMappingURL=book-list.js.map

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComicListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__comic_detail_comic_detail__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_facebook__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(35);
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
    function ComicListPage(navCtrl, navParams, bukufiRest, fb) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.bukufiRest = bukufiRest;
        this.fb = fb;
        this.loggedin = false;
        this.getComicList();
        this.checkLoginStatus();
    }
    ComicListPage.prototype.ionViewDidLoad = function () {
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
                console.log('==> Comic List Check Facebook Login Status :: CONNECTED');
                _this.FBData = res;
                _this.loggedin = true;
                console.log('=> Facebook Data', _this.FBData);
                console.log('=> res status value', _this.loggedin);
            }
            else {
                console.log('==> Comic List Check Facebook Login Status :: DISCONECTED');
                _this.loggedin = false;
                //this.loggedin  = res.status;
                console.log('=> res status value', _this.loggedin);
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    //===- END -===//
    ComicListPage.prototype.loginFirst = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
    };
    return ComicListPage;
}());
ComicListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-comic-list',template:/*ion-inline-start:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\comic-list\comic-list.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Comic List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-searchbar [(ngModel)]="keyword" (ionInput)="getItems($event)" [debounce]="500" placeholder="Enter Keyword here ..."></ion-searchbar>\n  <ion-list>\n    <ion-item *ngFor="let comic of comicList">\n      <ion-thumbnail item-start>\n        <img src="http://bukufi.com/storage/comic/comic_cover/{{comic.comic_image}}">\n      </ion-thumbnail>\n      <h2>{{comic.comic_title_nodash}}</h2>\n      <p>{{comic.comic_author_nodash}}</p>\n      <p>{{comic.comic_release}}</p>\n      <button ion-button outline item-end (tap)="showDetailComic(comic.comic_title)">View</button>\n    </ion-item>\n  </ion-list>\n\n  <!--FAB BOTTOM RIGHT-->\n  <ion-fab right bottom #fab2>\n    <button ion-fab mini color="primary"><ion-icon name="apps"></ion-icon></button>\n    <ion-fab-list side="top">\n      <div *ngIf="loggedin == true; else loginfirst">\n        <button ion-fab (click)="loginFirst()">\n          <ion-icon name="information-circle"></ion-icon>\n        </button>\n      </div>\n      <ng-template #loginfirst>\n        <button ion-fab (click)="loginFirst()">\n          <ion-icon name="log-in"></ion-icon>\n        </button>\n      </ng-template>\n    </ion-fab-list>\n  </ion-fab>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content \n    pullingText="Pull to refresh"\n    pullingIcon="arrow-dropdown"\n    refreshingSpinner="circles"\n    refreshingText="fetching data ..."></ion-refresher-content>\n  </ion-refresher>\n</ion-content>\n'/*ion-inline-end:"C:\Users\riser\Desktop\ionic-epubjs\src\pages\comic-list\comic-list.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_bukufi_rest_bukufi_rest__["a" /* BukufiRestProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_facebook__["a" /* Facebook */]])
], ComicListPage);

//# sourceMappingURL=comic-list.js.map

/***/ })

},[330]);
//# sourceMappingURL=main.js.map