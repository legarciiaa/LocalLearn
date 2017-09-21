import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Preferences } from './preferences';

@NgModule({
  declarations: [
    Preferences,
  ],
  imports: [
    IonicPageModule.forChild(Preferences),
  ],
  exports: [
    Preferences
  ]
})
export class PreferencesModule {}
