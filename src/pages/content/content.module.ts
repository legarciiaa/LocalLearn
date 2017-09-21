import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Content } from './content';

@NgModule({
  declarations: [
    Content,
  ],
  imports: [
    IonicPageModule.forChild(Content),
  ],
  exports: [
    Content
  ]
})
export class ContentModule {}
