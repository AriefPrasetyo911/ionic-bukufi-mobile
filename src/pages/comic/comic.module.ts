import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComicPage } from './comic';

@NgModule({
  declarations: [
    ComicPage,
  ],
  imports: [
    IonicPageModule.forChild(ComicPage),
  ],
})
export class ComicPageModule {}
