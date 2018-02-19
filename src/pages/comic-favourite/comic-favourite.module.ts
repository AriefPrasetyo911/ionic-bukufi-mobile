import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComicFavouritePage } from './comic-favourite';

@NgModule({
  declarations: [
    ComicFavouritePage,
  ],
  imports: [
    IonicPageModule.forChild(ComicFavouritePage),
  ],
})
export class ComicFavouritePageModule {}
