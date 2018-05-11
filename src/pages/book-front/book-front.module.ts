import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookFrontPage } from './book-front';

@NgModule({
  declarations: [
    BookFrontPage,
  ],
  imports: [
    IonicPageModule.forChild(BookFrontPage),
  ],
})
export class BookFrontPageModule {}
