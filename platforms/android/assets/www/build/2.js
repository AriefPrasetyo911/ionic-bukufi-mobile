webpackJsonp([2],{

/***/ 523:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookFavouritePageModule", function() { return BookFavouritePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__book_favourite__ = __webpack_require__(536);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BookFavouritePageModule = (function () {
    function BookFavouritePageModule() {
    }
    return BookFavouritePageModule;
}());
BookFavouritePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__book_favourite__["a" /* BookFavouritePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__book_favourite__["a" /* BookFavouritePage */]),
        ],
    })
], BookFavouritePageModule);

//# sourceMappingURL=book-favourite.module.js.map

/***/ }),

/***/ 536:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookFavouritePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(74);
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
        selector: 'page-book-favourite',template:/*ion-inline-start:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\book-favourite\book-favourite.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Your Favourite Book</ion-title>\n\n    <ion-buttons end>\n\n      <div *ngIf="loggedin == false; else loginTrue">\n\n        <button ion-button class="login-indicator-false">\n\n          <ion-icon name="sunny" end></ion-icon>\n\n        </button>\n\n      </div>\n\n      <ng-template #loginTrue>\n\n          <div *ngIf="isFacebookLogin == true">\n\n            <button ion-button class="login-indicator-true">\n\n              <ion-icon name="logo-facebook"></ion-icon>\n\n            </button>\n\n          </div>\n\n          <div *ngIf="isGoogleLogin == true">\n\n            <button ion-button class="login-indicator-true">\n\n              <ion-icon name="logo-googleplus"></ion-icon>\n\n            </button>\n\n          </div>\n\n      </ng-template>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list inset>\n\n    <div *ngIf="myFav.length > 0; else notExist">\n\n      <button ion-item *ngFor="let favourite of myFav">\n\n        <h2>{{favourite.book_title.replace(regex, \' \')}}</h2>\n\n        <h3>{{favourite.book_author.replace(regex, \' \')}}</h3>\n\n        <h3>{{favourite.book_release}}</h3>\n\n      </button> \n\n    </div>\n\n    <ng-template #notExist>\n\n      <button ion-item text-center class="takAda">\n\n        <h2>You not have bookmark for any book</h2>\n\n      </button>\n\n    </ng-template>\n\n  </ion-list>\n\n\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n      <ion-refresher-content \n\n        pullingText="Pull to refresh"\n\n        pullingIcon="arrow-dropdown"\n\n        refreshingSpinner="circles"\n\n        refreshingText="fetching data ...">\n\n      </ion-refresher-content>\n\n  </ion-refresher>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\riser\Desktop\ACTIVE\ionic-bukufi-mobile\src\pages\book-favourite\book-favourite.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_plus__["a" /* GooglePlus */]])
], BookFavouritePage);

//# sourceMappingURL=book-favourite.js.map

/***/ })

});
//# sourceMappingURL=2.js.map