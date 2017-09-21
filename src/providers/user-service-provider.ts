import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserServiceProvider {

  //api: string = 'http://localhost/DAO/';
  api: string = 'http://locallearn.000webhostapp.com/DAO/';                 
  
  constructor(public http: Http) {}
    
    getData(){
      return this.http.get(this.api + "user.php").map(respons=>respons.json())
    }
    
    getResumeDayTypes(params){
        let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
        return this.http.post(this.api + "resumeDayTypes.php", params,{
              headers:headers,
              method:"POST"
        }).map( //RETORNO DADOS FORMATO JSON
              (res:Response) => {return res.json();}
        );
    }

    getResumeDayContent(params){
      let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
      return this.http.post(this.api + "resumeDayContent.php", params,{
            headers:headers,
            method:"POST"
      }).map( //RETORNO DADOS FORMATO JSON
            (res:Response) => {return res.json();}
      );
  }
    
    loginUser(params){
      //https://github.com/jeynever/Ionic-2-authentication-wiht-login-MySQL/blob/master/src/pages/modal-page/modal-page.ts
        let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
        return this.http.post(this.api + "login.php", params,{
               headers:headers,
               method:"POST"
        }).map( //RETORNO DADOS FORMATO JSON
              (res:Response) => {return res.json();}
        );
    }
    
    logout(params){
      let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
      return this.http.post(this.api + "logout.php", params,{
             headers:headers,
             method:"POST"
      }).map( //RETORNO DADOS FORMATO JSON
             (res:Response) => {return res.json();}
      );
    }

    registerUser(params) {
        let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
        return this.http.post(this.api + "register.php", params, {
               headers:headers,
               method:"POST"
        }).map( //RETORNO DADOS FORMATO JSON
              (res:Response) => {return res.json();}
        );
      }
    
    editPreferences(params) {
        let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
        return this.http.post(this.api + "preferences.php", params, {
               headers:headers,
               method:"POST"
        }).map( //RETORNO DADOS FORMATO JSON
              (res:Response) => {return res.json();}
        );
      }  

      getActArea(){
         return this.http.get(this.api + 'actArea.php').map(res=>res.json())
      }

      getTypesPlaces(){
        return this.http.get(this.api + 'tipoLocal.php').map(res=>res.json())
      }
        
      getContentPlace(params){
         let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
         return this.http.post(this.api + "contentPlace.php", params, {
               headers:headers,
               method:"POST"
          }).map( //RETORNO DADOS FORMATO JSON
              (res:Response) => {return res.json();}
          );
         //return this.http.get(this.api + 'contentPlace.php').map(res=>res.json())
      }

      getGooglePlacesNearBy(){        
         return this.http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-29.9487431,-51.1742255&radius=500&type=food&key=AIzaSyCZVoR8gop28DrzN_M4KbRTMouEawyzLUg")       
         .map( //RETORNO DADOS FORMATO JSON
           (res:Response) => {return res.json();}
         );
        //return this.http.get(this.api + 'contentPlace.php').map(res=>res.json())
     }
  }


