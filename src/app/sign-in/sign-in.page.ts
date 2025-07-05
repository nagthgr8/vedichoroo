import { Component, } from '@angular/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { Router} from '@angular/router';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service';
import { User } from '../user';
//import { Facebook, FacebookLoginResponse } from '@awesome-cordova-plugins/facebook/ngx';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage {
  info: string = '';
  constructor(private router: Router, public shareService: ShareService, public horoService: HoroscopeService) { }

  ngOnInit() {
     
  }
  async googleLogin() {
    this.info = 'Please wait..';
    let profile = await FirebaseAuthentication.signInWithGoogle();
   try {
  //   this.info = 'Logging in..';
  //   const profile = await this.googlePlus.login({
  //     webClientId: '242286730499-tr8dq77hb8k2e0s55cvhh3m57cjabf1i.apps.googleusercontent.com',
  //     offline: true,
  //   });
     this.info = 'Authenticated, fetching user data..';
     this.shareService.setToken(profile.credential.idToken);
    this.horoService.getBalance(profile.user.email).subscribe((res) => {
       this.info = '';
            	let user: User = {
					name: profile.user.displayName,
					email: profile.user.email,
					imageUrl: profile.user.photoUrl,
					balance: res['balance'],
					ccy: (res['currency_code'].length > 3) ? '' : res['currency_code'],
					peerid: '',
					dob: '',
					isprivate: true
				};
              this.shareService.setItem('user', user);
			  this.router.navigate(['/profile'], {replaceUrl : true});
          }, (err) => {
              console.log(err);
              this.info = JSON.stringify(err);
          });
    
  } catch (err) {
    console.error(err);
    this.info = JSON.stringify(err);
  }
}

async facebookLogin() {
   this.info = 'Sorry, Our Facebook API is still not ready, please use Google account'
//  try {
//    const res: FacebookLoginResponse = await this.fb.login(['email']);
//    if (res.authResponse) {
      // You can now use the res.authResponse.accessToken to authenticate with your server.
//      console.log(res);
//    }
//  } catch (err) {
//    console.error(err);
//  }
}
anonymous() {
  this.router.navigate(['/tabs'], {replaceUrl : true});
}
}
