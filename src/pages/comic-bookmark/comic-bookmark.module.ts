import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComicBookmarkPage } from './comic-bookmark';

@NgModule({
  declarations: [
    ComicBookmarkPage,
  ],
  imports: [
    IonicPageModule.forChild(ComicBookmarkPage),
  ],
})
export class ComicBookmarkPageModule {}
