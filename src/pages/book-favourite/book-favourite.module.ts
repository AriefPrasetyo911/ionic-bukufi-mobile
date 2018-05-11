import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookFavouritePage } from './book-favourite';

@NgModule({
  declarations: [
    BookFavouritePage,
  ],
  imports: [
    IonicPageModule.forChild(BookFavouritePage),
  ],
})
export class BookFavouritePageModule {}
