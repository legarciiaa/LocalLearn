import { Component, ViewChild, ViewChildren, QueryList,  ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { StackConfig, Stack, ThrowEvent, DragEvent, SwingStackComponent, SwingCardComponent} from 'angular2-swing';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { LocationTrackerProvider } from '../../providers/location-tracker';
import { UserServiceProvider } from '../../providers/user-service-provider';
import { Login } from '../login/login';

declare var google;

@IonicPage()

@Component({
  selector: 'page-content',
  templateUrl: 'content.html',
})

export class Content {
  //https://devdactic.com/ionic-2-tinder-cards/
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('container') swingCards: QueryList<SwingCardComponent>;
  @ViewChild('map') mapElement: ElementRef;
  
  map: any;
  
  radius: number= 250;

  cards : any[];
  copyCards : any[];
  index: number = 0;
  stackConfig: StackConfig;
  currentCard: any={};
  
  resultPlaces: any[]=null; 
  currentPlace ={"name":"", "address":"", "radius":this.radius};
  countPlace: number;  

  listTypes: any[];
  placeTypes: any[];

  objUser = {"cdUsuario":"", "filterType":"","timeNotify":""};  
  loading: any;
     
  constructor(public navCtrl: NavController, public navParams: NavParams,private http: Http, private loadingCtrl: LoadingController,
              public service: UserServiceProvider, private localNotifications: LocalNotifications, public locationTracker: LocationTrackerProvider) {      
      /*this.stackConfig = {
          throwOutConfidence: (offsetX, offsetY, element) => {
              return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
          },
          transform: (element, x, y, r) => {
              this.onItemMove(element, x, y, r);
          },
          throwOutDistance: (d) => {
              return 800;
          }          
      };*/

      //this.locationTracker.startTracking();               
      //this.resultPlaces = null;
      
      this.copyCards = new Array();
      if(localStorage.getItem("token") != "") {
        this.objUser.cdUsuario= localStorage.getItem("cdUsuario");
        this.objUser.timeNotify= localStorage.getItem("timeNotify");
      }else{
        this.navCtrl.setRoot(Login);
      }
              
      this.localNotifications.on("click", (notification, state) => {
       //schedule next
        this.addNotification();      
      }); 
      
      //this.cards = JSON.parse(localStorage.getItem("cards"));  
      //console.log(this.cards); 
  }

  ionViewDidLoad() {
    //this.swingStack.throwin.subscribe((event: DragEvent) => {
    //   event.target.style.background = '#ffffff';
    //});  
    //this.getUserPosition();    
    //this.getTypesPlaces(); 
    console.log("ionDidLoaded");
    this.listTypes = ["airport","bakery","bank","bar","bus_station","clothing_store","furniture_store","gym","hospital","night_club","pharmacy","restaurant","school","shopping_mall","university","health", "food"];
    this.locationTracker.startTracking();  
    this.getNearByTypes();        
  }

  ionViewDidEnter() {    
    console.log("ionViewLoaded");
    this.loading = this.loadingCtrl.create({
        content: 'Searching places...',
    });
    
    this.loading.present().then(() => {
       if (localStorage.getItem('Place').length > 0){                    
           this.getContentPlace();
       }  
       this.loading.dismiss();              
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

   // Called whenever we drag an element
  onItemMove(element, x, y, r) {
     var color = '';
     var abs = Math.abs(x);
     let min = Math.trunc(Math.min(16*16 - abs, 16*16));
     let hexCode = this.decimalToHex(min, 2);
  
     if (x < 0) {
        color = '#FF' + hexCode + hexCode;
     } else {
        color = '#' + hexCode + 'FF' + hexCode;
     }
  
     element.style.background = color;
     element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }
 
voteUp() {
  //this.currentCard =  this.cards.pop();
  //console.log(card);
  //localStorage.setItem('cards', JSON.stringify(this.cards));   
  //console.log(this.currentCard);
  if (this.cards.length == 0){
     console.log("VOTE UP CHAMA getContentPlace");
     this.getContentPlace(); 
  }else{
     this.copyCards.push((this.cards.shift()));
  }
}

lastCards(){
   this.cards.push(this.cards.pop());
}

// http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
decimalToHex(d, padding) {
  var hex = Number(d).toString(16);
  padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;
  
  while (hex.length < padding) {
    hex = "0" + hex;
  }  
  return hex;
}

getTypesPlaces(){
   console.log('getTypesPlaces');
   this.service.getTypesPlaces()
       .subscribe(
         data=> {
          this.listTypes= data;
        },
         err=> console.log(err)
    );
}  

getUserPosition(){
  //GEOLOCATION
  //https://www.joshmorony.com/ionic-2-how-to-use-google-maps-geolocation-video-tutorial/  
  console.log('getUserPosition');
  
  if (window.navigator && window.navigator.geolocation) {
      var geolocation = window.navigator.geolocation;
      geolocation.getCurrentPosition(sucesso, erro);
  } else {
     alert('Geolocalização não suportada em seu navegador.')
  }
  function sucesso(posicao){    
    localStorage.setItem('latitude', posicao.coords.latitude);
    localStorage.setItem('longitude', posicao.coords.longitude);
  }
  function erro(error){
    console.log(error)
  } 
}

 // Add new cards to our array
 getContentPlace() {   
  try {      
      console.log("ENTROU content place");
      this.resultPlaces = JSON.parse(localStorage.getItem('Place'));        
      this.countPlace= Number(localStorage.getItem('countPlace')) + 1;  
      
      if (this.resultPlaces == []) {
         console.log("push page");
         this.navCtrl.push('Content');
      }else{
        if (this.countPlace < this.resultPlaces.length){      
            this.currentPlace.name = this.resultPlaces[this.countPlace].name; 
            this.currentPlace.address = this.resultPlaces[this.countPlace].vicinity;  
            this.placeTypes = this.resultPlaces[this.countPlace].types;     
            this.currentPlace.radius= this.radius;  
            if (this.checkType() == true){
                console.log("ACHOU EM:" + this.countPlace);
                console.log(this.objUser);                       
                this.service.getContentPlace(this.objUser)
                    .subscribe(
                    data=> {
                        console.log(data);
                        if (data.length != 0){                 
                          this.cards= data;                             
                          localStorage.setItem('cards', JSON.stringify(data));   
                          console.log(data);
                        }else{
                          localStorage.setItem('countPlace',String(this.countPlace));                 
                          this.getContentPlace(); 
                        }              
                      },
                        err=> console.log(err)
                  );         
            }else{
                console.log("NAO ACHOU EM:" + this.countPlace);
                localStorage.setItem('countPlace',String(this.countPlace));
                this.getContentPlace();   
            }
          }
          else{
              this.radius= this.radius +250;
              this.getNearByTypes();      
              //this.getContentPlace();
          }
        }    
  }catch (e){      
        console.log((<Error>e).message);//conversion to Error type
  }    
}

checkType(): boolean {
  console.log("ENTROU CHECK TYPE");
  for (var i = 0; i < this.placeTypes.length; i++ ){
    for (var j = 0; j < this.listTypes.length; j++ ){
      //console.log("i: " + i + " PLACE TYPES: " + this.placeTypes[i].toUpperCase() + " j: " + j + " LIST TYPES: " + this.listTypes[j].toUpperCase());
      if (this.listTypes[j].toUpperCase() == this.placeTypes[i].toUpperCase()){          
          this.objUser.filterType= this.placeTypes[i];
          return true;
      }      
   }
  }
}  

getNearByTypes() {
  //https://developers.google.com/maps/documentation/javascript/examples/place-search?hl=pt-br    
  //var pyrmont = {lat: Number(localStorage.getItem('latitude')), lng: Number(localStorage.getItem('longitude'))};
  this.locationTracker.startTracking();  
  var pyrmont = {lat: this.locationTracker.lat ,lng: this.locationTracker.lng};
  console.log(pyrmont);

  this.map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15,
    disableDefaultUI: true
  });
  
  let infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(this.map);
  
  service.nearbySearch({
    location: pyrmont,
    radius: this.radius,
    language: 'pt-BR',
  }, callback);
 
  function callback(results, status) {     
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log("RESULT LENGTH " + results.length);
      if (results.length > 0 ){
        //[0] - CIDADE  results.length= BAIRRO               
        localStorage.setItem('Place', JSON.stringify(results));   
        localStorage.setItem('countPlace',"0");   //set counter to current place 
        console.log(JSON.parse(localStorage.getItem('Place')));                  
      }
    }else{
      console.log("function callback STATUS ERROR");
    }
  }
 }
}
