import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComicDetailPage } from './comic-detail';

@NgModule({
  declarations: [
    ComicDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ComicDetailPage),
  ],
})
export class ComicDetailPageModule {}
