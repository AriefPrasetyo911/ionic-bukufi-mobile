import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BukufiRestProvider } from '../../providers/bukufi-rest/bukufi-rest';
import { ComicDetailPage } from '../comic-detail/comic-detail';
import { Facebook } from '@ionic-native/facebook';
import { LoginPage } from '../login/login';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public bukufiRest: BukufiRestProvider, public fb: Facebook) {
    this.getComicList();
    this.checkLoginStatus();
  }

  ionViewDidLoad() {
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
        console.log('==> Comic List Check Facebook Login Status :: CONNECTED');
        this.FBData = res;
        this.loggedin  = true;
        console.log('=> Facebook Data', this.FBData);
        console.log('=> res status value', this.loggedin);
      }

      else{
        console.log('==> Comic List Check Facebook Login Status :: DISCONECTED');
        this.loggedin  = false;
        //this.loggedin  = res.status;
        console.log('=> res status value', this.loggedin);
      }
    }).catch(err => {
      console.log(err);
    });
  }
  //===- END -===//

  loginFirst(){
    this.navCtrl.push(LoginPage);
  }
}
