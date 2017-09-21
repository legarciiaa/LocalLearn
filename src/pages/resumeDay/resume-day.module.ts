import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResumeDay } from './resume-day';

@NgModule({
  declarations: [
    ResumeDay,
  ],
  imports: [
    IonicPageModule.forChild(ResumeDay),
  ],
  exports: [
    ResumeDay
  ]
})
export class ResumeDayModule {}
