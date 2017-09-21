import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, IonicPage } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { LocationTrackerProvider } from '../../providers/location-tracker';
import { UserServiceProvider } from '../../providers/user-service-provider';
import { Content } from '../content/content';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  objUser: any = {};
  loading: any;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, public formBuilder : FormBuilder, public locationTracker: LocationTrackerProvider,
              public service: UserServiceProvider,private loadingCtrl: LoadingController,private localNotifications: LocalNotifications) { 

      //obtem objeto com dados da view
      //valida todos campos requeridos
      this.objUser = this.formBuilder.group({
           email:['', Validators.required],
           pwd:['', Validators.required],
      });
  }
  
  //ionViewDidLoad() {    
  //  this.locationTracker.startTracking();    
  // }

  public createAccount() {
    this.navCtrl.push('Register');
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Autenticando/Authenticating...'
    });
  }

   // Schedule delayed notification
  addNotification(){
    this.localNotifications.schedule({
         text: 'Learn at this place' ,
        //time atual em miliseg + tempo notificação convertido miliseg
        at: new Date(new Date().getTime() + (Number(localStorage.getItem("timeNotify"))*60000)), 
        sound: null,
    });
    console.log("SCHEDULE NOTIFICATION")
  }
              

  public login() {    
    console.log(this.objUser.value);
    this.showLoader();
   
    this.service.loginUser(this.objUser.value)        
        .subscribe(
           data => {
             console.log(data);
             if(data.mensage=='-1'){                
                let alert = this.alertCtrl.create({
                title: 'Usuário ou senha inválido!',
                subTitle: 'Invalid user or password.',
                buttons: ['OK']
                });
                alert.present();  
             }else{                             
               localStorage.setItem('token', data.token); //AUT TOKEN
               localStorage.setItem('cdUsuario', data.cdUsuario);
               localStorage.setItem('name', data.name); 
               localStorage.setItem('email', data.email); 
               localStorage.setItem('timeNotify', data.timeNotify);
               localStorage.setItem('actArea', data.actArea);
               localStorage.setItem('Place', "{}");   
               //start geolocation background
               this.locationTracker.startTracking();    
               
               //add first notification
               this.addNotification();

               this.navCtrl.setRoot(Content);
               //this.navCtrl.push('Preferences');                
             }
             this.loading.dismiss();
             }, err=>console.log(err)
      );
  }
}
