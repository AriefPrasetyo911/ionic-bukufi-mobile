import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BukufiRestProvider } from '../../providers/bukufi-rest/bukufi-rest';
import { BookDetailPage } from '../book-detail/book-detail';
import { LoginPage } from '../login/login';
import { Facebook } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage {
  allBooks: any;
  FBData: any;
  loggedin: boolean = false;
  countBook: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public bukufiRest: BukufiRestProvider, public fb: Facebook) {
    this.getAllBooks();
    this.checkLoginStatus();
  }

  ionViewDidLoad() {
    console.log('===> BookListPage Loaded');
  }

  getAllBooks(){
    this.bukufiRest.getAllBook().then(data => {
      this.allBooks = data;
      this.countBook = this.allBooks.length;
      console.log("==> Count Book :", this.countBook);
      console.log('==> List all book :', data);
    });
  }

  //===- SEARCH -===//
  initializeItems() {
    this.allBooks = this.allBooks;
    console.log('==> Re-init item', this.allBooks);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.allBooks = this.allBooks.filter((item) => {
        return (item.book_title_nodash.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  //===- END SEARCH -===//
  
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    //check login status
    this.getAllBooks();
    setTimeout(() => {
      //check login status
      console.log('Async operation has ended');
      refresher.complete();
    }, 1500);
  }

  showDetailBook(book) {
    console.log('==> show detail book', book);
    this.navCtrl.push(BookDetailPage, {
      book: book
    });
  }

  loginFirst(){
    this.navCtrl.push(LoginPage);
  }

  //===- FACEBOOK -===//
  checkLoginStatus(){
    this.fb.getLoginStatus().then(res => {
      if(res.status == 'connect' || res.status == 'connected'){
        console.log('==> Book List Check Facebook Login Status :: CONNECTED');
        this.FBData = res;
        this.loggedin  = true;
        console.log('=> Facebook Data', this.FBData);
        console.log('=> res status value', this.loggedin);
      }

      else{
        console.log('==> Book List Check Facebook Login Status :: DISCONECTED');
        this.loggedin  = false;
        //this.loggedin  = res.status;
        console.log('=> res status value', this.loggedin);
      }
    }).catch(err => {
      console.log(err);
    });
  }
  //===- END -===//
}
