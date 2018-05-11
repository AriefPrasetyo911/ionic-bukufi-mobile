import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookListPage } from '../book-list/book-list';
import { ComicListPage } from '../comic-list/comic-list';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        console.clear();
    }

    ionViewDidLoad() {
        console.clear();
        console.log('===> SearchPage Loaded');
    }

    bookSearch(){
        this.navCtrl.push(BookListPage);
    }

    comicSearch(){
        this.navCtrl.push(ComicListPage);
    }

}
