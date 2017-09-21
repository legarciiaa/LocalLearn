import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserServiceProvider } from '../../providers/user-service-provider';

/**
 * Generated class for the ResumeDayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-resume-day',
  templateUrl: 'resume-day.html',
})
export class ResumeDay {  
  objUser: any = {};
  resumeDayTypes : any[];
  resumeDayContent: any[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: UserServiceProvider) {
     this.objUser.cdUsuario= localStorage.getItem("cdUsuario");
     this.getResumeDayTypes();
     this.getResumeDayContent();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResumeDayPage');
  }
  
  getContentPlace(){
    this.navCtrl.setRoot('Content');                
  }

  getResumeDayTypes() {
    //retorno de Dados
    this.service.getResumeDayTypes(this.objUser)
          .subscribe(
                data=> {
                  console.log(data);
                  this.resumeDayTypes = data
                },
                err=> console.log(err)
          );
    }

    getResumeDayContent() {
      //retorno de Dados
      this.service.getResumeDayContent(this.objUser)
            .subscribe(
                  data=> {
                    console.log(data);
                    this.resumeDayContent = data
                  },
                  err=> console.log(err)
            );
      }  

}
