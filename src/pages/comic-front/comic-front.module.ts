import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComicFrontPage } from './comic-front';

@NgModule({
  declarations: [
    ComicFrontPage,
  ],
  imports: [
    IonicPageModule.forChild(ComicFrontPage),
  ],
})
export class ComicFrontPageModule {}
