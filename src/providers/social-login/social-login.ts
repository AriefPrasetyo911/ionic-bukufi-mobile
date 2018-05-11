import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import firebase from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus';

@Injectable()
export class SocialLoginProvider {

  constructor(public http: HttpClient, public googlePlus: GooglePlus) {
    console.log('Hello SocialLoginProvider Provider');
  }

  /*==- GOOGLE -==*/
  loginGoogle(){
    // this.googlePlus.login({})
    //   .then(res => {
    //     console.log(res);
        
    //     // this.displayName = res.displayName;
    //     // this.email = res.email;
    //     // this.familyName = res.familyName;
    //     // this.givenName = res.givenName;
    //     // this.userId = res.userId;
    //     // this.imageUrl = res.imageUrl;
        
    //     this.loggedin = true;
    //     console.log("==> Google Login Success", res);

    //     this.checkGoogleLogin();
    //   })
    //   .catch(err => console.error(err));

    return Observable.create(observer => {
      return this.googlePlus.login({
        'webClientId': '285660351645-glnirpugp8kbjtoqrpie5k0q6knpvgeq.apps.googleusercontent.com',
        'offline': true
      })
      .then( res => {
        const firecreds = firebase.auth.GoogleAuthProvider.credential(res.idToken);
        firebase.auth().signInWithCredential(firecreds)
        .then( success => { observer.next(success); })
        .catch(error => {
          observer.error(error);
        });
      });
    })
  }
  
  checkGoogleLogin(){
    this.googlePlus.getSigningCertificateFingerprint().then(res => {
      console.log('==> Google Login Status Now', res.length);

      if(res.length > 0 ){

        firebase.auth().onAuthStateChanged(user => {
          if(user){
            console.log("=> Google Login Status : CONNECTED", user);
          }
          else{
            console.log("=> Google Login Status : DISCONNECTED", user);
          }
        })
      }
      // this.googleData = res;
      // console.log("==> Google Data", this.googleData);
    })
  }
  /*==- END GOOGLE -==*/

}
