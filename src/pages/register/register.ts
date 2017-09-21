import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';

import { UserServiceProvider } from '../../providers/user-service-provider';
import { Preferences } from '../preferences/preferences';
import { Login } from '../login/login';

/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {
  objUser: any = {};
  areas : any[];
  
  constructor(public navCtrl: NavController,private alertCtrl: AlertController, public formBuilder : FormBuilder, 
              public navParams: NavParams, public service: UserServiceProvider, private loadingCtrl: LoadingController) {
      //obtem objeto com dados da view
      //valida todos campos requeridos
      this.getActArea();
      this.objUser = this.formBuilder.group({
           name:['', Validators.required],
           email: ['', Validators.compose([Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
           pwd:['', Validators.compose([Validators.required, Validators.minLength(6)])],
           confirmPwd:['', Validators.compose([Validators.required, Validators.minLength(6)])],
           dtBirth:['', Validators.required],
           timeNotify:['30', Validators.required],
           actArea:['', Validators.required]
      },
      {
        validator: this.matchingPasswords('pwd', 'confirmPwd')
      }
    );
  }
  
  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
    }
  }
  
  cancelRegister(){
       this.navCtrl.setRoot(Login);  
  }

  //INSERIR USUARIO
  addUser() {
    console.log(this.objUser.value);  
    this.service.registerUser(this.objUser.value)
        .subscribe(
          data => {
             if(data.result !='-1'){
                localStorage.setItem('token', data.token); 
                localStorage.setItem('cdUsuario', data.cdUsuario);
                localStorage.setItem('name', data.name); 
                localStorage.setItem('email', data.email); 
                localStorage.setItem('timeNotify', data.timeNotify);
                localStorage.setItem('actArea', data.actArea);
                localStorage.setItem('percVocabulario', "34");
                localStorage.setItem('percVerbos', "33");
                localStorage.setItem('percFrases', "33");
                localStorage.setItem('Place', "{}");   

                this.navCtrl.setRoot(Preferences);
             }else{                              
              let alert = this.alertCtrl.create({
                title: data.mensage,
                subTitle: data.mensageEN,
                buttons: ['OK']
              });
              alert.present();  
             }},
          err=>console.log(err)
        );
  }

  getActArea() {
      //retorno de Dados
      this.service.getActArea()
            .subscribe(
                  data=> this.areas = data,
                  err=> console.log(err)
            );
      }
}
