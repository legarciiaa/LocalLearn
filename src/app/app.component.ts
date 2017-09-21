import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { Login } from '../pages/login/login';
import { Logout } from '../pages/logout/logout';
import { Preferences } from '../pages/preferences/preferences';
import { Content } from '../pages/content/content';
import { ResumeDay } from '../pages/resumeDay/resume-day';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = Login;  

  constructor(platform: Platform, statusBar: StatusBar, 
              splashScreen: SplashScreen) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
    if(localStorage.getItem("token") == null) {
      this.rootPage=Login;
    }else{
      this.rootPage=Content;
    }
    
  }
  
  openResume(){
    this.rootPage=ResumeDay;
  }

  openContent(){
    this.rootPage=Content;
  }

  openPreferences(){
    this.rootPage=Preferences;
  }
  
  openLogout(){
    this.rootPage=Logout;
  }
}
