import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookBookmarkPage } from './book-bookmark';

@NgModule({
  declarations: [
    BookBookmarkPage,
  ],
  imports: [
    IonicPageModule.forChild(BookBookmarkPage),
  ],
})
export class BookBookmarkPageModule {}
