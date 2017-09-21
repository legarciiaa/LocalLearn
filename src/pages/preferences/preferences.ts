import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController, NavParams, LoadingController } from 'ionic-angular';

import { UserServiceProvider } from '../../providers/user-service-provider';
import { Content } from '../content/content';


/**
 * Generated class for the Preferences page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-preferences',
  templateUrl: 'preferences.html',
})
export class Preferences {

  //objUser: any = {};
  loading: any;
  objUser = {"cdUsuario":"","name":"","email":"","timeNotify":"","percVocabulario":34,"percVerbos":33,"percFrases":33};
  areas : any[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, 
              public service: UserServiceProvider,private alertCtrl: AlertController) {
      /*this.objUser = navParams.data;*/
      if(localStorage.getItem("token")) {
         this.objUser.cdUsuario= localStorage.getItem("cdUsuario");
         this.objUser.name= localStorage.getItem("name");
         this.objUser.email= localStorage.getItem("email");
         this.objUser.timeNotify= localStorage.getItem("timeNotify");
         this.objUser.percVocabulario= Number(localStorage.getItem("percVocabulario"));
         this.objUser.percVerbos= Number(localStorage.getItem("percVerbos"));
         this.objUser.percFrases=  Number(localStorage.getItem("percFrases"));
      }
      //this.getActArea();
  }

  ionViewDidLoad() {
    console.log(this.objUser);
  }

  getActArea() {
      //retorno de Dados
      this.service.getActArea()
            .subscribe(
                  data=> this.areas = data,
                  err=> console.log(err)
            );
  }
  
  recalcVocabulario(){
    this.objUser.percVerbos =      100 - (this.objUser.percVocabulario+this.objUser.percFrases);
    this.objUser.percFrases=       100 - (this.objUser.percVocabulario+this.objUser.percVerbos);
  }


  recalcVerbos(){
    this.objUser.percVocabulario = 100 - (this.objUser.percVerbos+this.objUser.percFrases);
    this.objUser.percFrases=       100 - (this.objUser.percVerbos+this.objUser.percVocabulario);
  }
  
  recalcFrases(){
    this.objUser.percVerbos=       100 - (this.objUser.percFrases+this.objUser.percVocabulario);
    this.objUser.percVocabulario = 100 - (this.objUser.percFrases+this.objUser.percVerbos);    
  }
  
  savePreferences(){
   console.log(this.objUser); 

    this.service.editPreferences(this.objUser)        
        .subscribe(
           data => {
             if(data.result=='-1'){                
                let alert = this.alertCtrl.create({
                title: data.mensage,
                subTitle: data.mensageEN,
                buttons: ['OK']
                });
                alert.present();  
             }else{                             
               console.log(data.mensage);
               localStorage.setItem('timeNotify', this.objUser.timeNotify);
               localStorage.setItem('percVocabulario', String(this.objUser.percVocabulario));
               localStorage.setItem('percVerbos', String(this.objUser.percVerbos));
               localStorage.setItem('percFrases', String(this.objUser.percFrases));
               //this.navCtrl.push('Content');
               this.navCtrl.setRoot(Content);
             }
           }, err=>console.log(err)
        );
  }


}
