import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { LocationTrackerProvider } from '../../providers/location-tracker';
import { UserServiceProvider } from '../../providers/user-service-provider';
import { Login } from '../login/login';
import { Content } from '../content/content';

/**
 * Generated class for the Logout page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class Logout {
  loading: any;
  objUser = {"token":""};
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: UserServiceProvider, 
              public alertCtrl: AlertController, public app: App, public locationTracker: LocationTrackerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Logout');
    this.objUser.token= localStorage.getItem("token");
    this.showConfirm();
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Deseja sair?',
      subTitle: 'Do you want to quit?', 
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.logout();
          }
        },
        {
          text: 'No',
          handler: () => {
            this.navCtrl.setRoot(Content);
          }
        }
      ]
    });
    confirm.present();
  }

  logout() {
    console.log(this.objUser);
    this.service.logout(this.objUser)
        .subscribe(
           data => {
             console.log(data); 
             if(data.mensage=='-1'){                
                let alert = this.alertCtrl.create({
                title: 'Falha de logout!',
                subTitle: 'Usuário não foi desconectado!',
                buttons: ['OK']
                });                
                alert.present();
                this.navCtrl.setRoot(Content);  
             }else{                             
               localStorage.clear();
               this.locationTracker.stopTracking();    
               this.navCtrl.setRoot(Login);
               //this.navCtrl.push('Login');
             }
             //this.loading.dismiss();
             }, err=>console.log(err)
        );
   }
}
