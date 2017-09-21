import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { SwingModule } from 'angular2-swing';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';

import { UserServiceProvider } from '../providers/user-service-provider';

import { MyApp } from './app.component';
import { Login } from '../pages/login/login';
import { Logout } from '../pages/logout/logout';
import { Content } from '../pages/content/content';
import { Preferences } from '../pages/preferences/preferences';
import { ResumeDay } from '../pages/resumeDay/resume-day';
import { LocationTrackerProvider } from '../providers/location-tracker';

@NgModule({
  declarations: [
    MyApp,
    Login,
    Logout,
    Preferences,
    Content,
    ResumeDay
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SwingModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Logout,
    Preferences,
    Content,
    ResumeDay
  ],
  providers: [
    BackgroundGeolocation,
    Geolocation, 
    UserServiceProvider,   
    StatusBar,
    SplashScreen,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationTrackerProvider,
  ]
})
export class AppModule {}
