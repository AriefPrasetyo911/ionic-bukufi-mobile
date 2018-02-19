import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import firebase from 'firebase';
import { BukufiRestProvider } from '../providers/bukufi-rest/bukufi-rest';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BookPage } from '../pages/book/book';
import { TocPage } from '../pages/toc/toc';
import { SettingsPage } from '../pages/settings/settings';
import { BookDetailPage } from '../pages/book-detail/book-detail';
import { ComicDetailPage } from '../pages/comic-detail/comic-detail';
import { ComicPage } from '../pages/comic/comic';
import { BookFrontPage } from '../pages/book-front/book-front';
import { BookListPage } from '../pages/book-list/book-list';
import { ComicFrontPage } from '../pages/comic-front/comic-front';
import { ComicListPage } from '../pages/comic-list/comic-list';
import { LoginPage } from '../pages/login/login';
import { SearchPage } from '../pages/search/search';
import { ComicBookmarkPage } from '../pages/comic-bookmark/comic-bookmark';
import { ComicFavouritePage } from '../pages/comic-favourite/comic-favourite';
import { BookBookmarkPage } from '../pages/book-bookmark/book-bookmark';
import { BookFavouritePage } from '../pages/book-favourite/book-favourite';
import { SocialLoginProvider } from '../providers/social-login/social-login';


var config = {
  apiKey: "AIzaSyDl2k9vLUopVsu3hOfxxUTQht_Oc-kCAkw",
  authDomain: "bukufi-mobile-02.firebaseapp.com",
  databaseURL: "https://bukufi-mobile-02.firebaseio.com",
  projectId: "bukufi-mobile-02",
  storageBucket: "bukufi-mobile-02.appspot.com",
  messagingSenderId: "447326809905"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BookPage,
    TocPage,
    SettingsPage,
    BookDetailPage,
    ComicDetailPage,
    ComicPage,
    BookFrontPage,
    BookListPage,
    ComicFrontPage,
    ComicListPage,
    LoginPage,
    SearchPage,
    BookBookmarkPage,
    BookFavouritePage,
    ComicBookmarkPage,
    ComicFavouritePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BookPage,
    TocPage,
    SettingsPage,
    BookDetailPage,
    ComicDetailPage,
    ComicPage,
    BookFrontPage,
    BookListPage, 
    ComicFrontPage,
    ComicListPage,
    LoginPage,
    SearchPage,
    BookBookmarkPage,
    BookFavouritePage,
    ComicBookmarkPage,
    ComicFavouritePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BukufiRestProvider,
    Facebook,
    GooglePlus,
    SocialLoginProvider
  ]
})
export class AppModule {}
