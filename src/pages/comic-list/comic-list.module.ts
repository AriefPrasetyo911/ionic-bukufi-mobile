import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComicListPage } from './comic-list';

@NgModule({
  declarations: [
    ComicListPage,
  ],
  imports: [
    IonicPageModule.forChild(ComicListPage),
  ],
})
export class ComicListPageModule {}
