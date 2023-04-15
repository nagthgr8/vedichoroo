import { Component, } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Router} from '@angular/router';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service';
import { User } from '../user';
//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage {
  info: string = '';
  constructor(private router: Router, private googlePlus: GooglePlus, public shareService: ShareService, public horoService: HoroscopeService) { }

  ngOnInit() {
     
  }
  async googleLogin() {
  try {
    this.info = 'Logging in..';
    const profile = await this.googlePlus.login({
      webClientId: '242286730499-tr8dq77hb8k2e0s55cvhh3m57cjabf1i.apps.googleusercontent.com',
      offline: true,
    });
    this.horoService.getBalance(profile.email).subscribe((res) => {
            	let user: User = {
					name: profile.displayName,
					email: profile.email,
					imageUrl: profile.imageUrl,
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
