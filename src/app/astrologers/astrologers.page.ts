import { Component, OnInit, NgModule, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Device } from '@ionic-native/device/ngx';
import { File } from '@ionic-native/file/ngx';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service';
import { astroStatus, CallService } from '../call.service';
import { Astrologer } from '../astrologer';
import { User } from '../user';
import { Location } from '../location';
import { AstrologerPage } from '../astrologer/astrologer.page';

@Component({
  selector: 'app-astrologers',
  templateUrl: './astrologers.page.html',
  styleUrls: ['./astrologers.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AstrologersPage implements OnInit {
  //objectKeys = Object.keys;
  info: string;
  oAst : Astrologer[] = [];
  oAstb : Astrologer[] = [];
  //oHAst :Astrologer[] = [];
  showCTL: boolean = false;
  //clat: any; clng: any;
  constructor( private androidPermissions: AndroidPermissions, public alertController: AlertController, private router: Router, public platform: Platform,  public horoService: HoroscopeService, private shareService: ShareService, private callService: CallService, public device: Device, private file: File) { 
	 this.publishReport(this.shareService.getASTS());
  }
  ngOnInit() {
	  astroStatus.subscribe((ast) => {
		console.log('astroStatus', ast);
		let a = this.oAst.find((o) => o.eml === ast.aid);
		a.smsg = (ast.busy) ? 'Not Available': 'Available';
		a.status = !ast.busy;
	  });
}
  publishReport(oa: any)
  {
	  let a: number = 0;
	  let b: number = 0;
	  if(oa.length == 0) this.info = 'Astrologer data still loading, please try after some time.';
	  for(var i = 0; i < oa.length; i++) {
			console.log(i, oa[i]);
			let call: string = oa[i].mob;
			let chat: string = oa[i].mob;
			if(oa[i].mob.indexOf('|') > -1) {
				call = oa[i].mob.split('|')[0];
				chat = oa[i].mob.split('|')[1];
			}
			let walnk = 'https://wa.me/' + chat + '?text=I%20am%20interested%20to%20consult%20you%20for%20astrology';
			let smsg = (oa[i].status.indexOf('|') != -1 && oa[i].status.split('|')[0] == 'A') ? '<span class="av"> Available</span>' :  (oa[i].status.split('|')[0] == 'C') ?  '<span class="na"> Busy</span>' : '<span class="na"> Not Available</span>';
			let cfee: string = '';
			if(oa[i].uid == 'mohitseth') {
			   cfee = '<span class="cfee">&#8377; 300</span>';
			} else if(oa[i].uid == 'girishtiwari') {
			   cfee = '<span class="cfee">Free Consultation</span>';
			} else if(oa[i].uid == 'risharma') {
			   cfee = '<span class="cfee">&#8377; 20 per min</span>';
			} else if(oa[i].uid == 'kalyan') {
			   cfee = '<span class="cfee">&#8377; 500 for 30 min</span>';
			} else if(oa[i].uid == 'rishavbhatt' || oa[i].uid == 'seshagiri') {
			   cfee = '<span class="cfee">&#8377; 500</span>';
			} else {
			   cfee = '<span class="cfee">&#8377; 21 per min</span>';
			}
			let ast: Astrologer = {
				   uuid: oa[i].uuid,
					name: oa[i].name,
					tagline: oa[i].tagline,
					avatar: oa[i].avatar,
					uid: oa[i].uid,
					mob: call,
					walnk: walnk,
					smsg: smsg,
					status: (oa[i].status.split('|')[0] == 'A') ? true : false,
					peerid: (oa[i].status.split('|')[0] != 'NA') ? oa[i].status.split('|')[1] : '',
					cfee: cfee,
					rating: oa[i].rating,
                    tot_ratings: oa[i].tot_ratings,
                    str1: 'star-outline',					
                    str2: 'star-outline',					
                    str3: 'star-outline',					
                    str4: 'star-outline',					
                    str5: 'star-outline',	
					          ccy: 'INR',
					  lng: oa[i].lng,
					  eml: oa[i].eml
					};
					
			if(oa[i].rating >= 1 && oa[i].rating < 2) {
			    ast.str1 = 'star';
			    ast.str2 = (oa[i].rating > 1) ? 'star-half-outline' : 'star-outline';
				ast.str3 = 'star-outline';
				ast.str4 = 'star-outline';
				ast.str5 = 'star-outline';
			}
			else if (oa[i].rating >= 2 && oa[i].rating < 3) {
			    ast.str1 = 'star';
				ast.str2 = 'star';
			    ast.str3 = (oa[i].rating > 2) ? 'star-half-outline' : 'star-outline';
				ast.str4 = 'star-outline';
				ast.str5 = 'star-outline';
			}
			else if(oa[i].rating >= 3 && oa[i].rating < 4) {
			    ast.str1 = 'star';
				ast.str2 = 'star';
				ast.str3 = 'star';
			    ast.str4 = (oa[i].rating > 3) ? 'star-half-outline' : 'star-outline';
				ast.str5 = 'star-outline';
			}
			else if(oa[i].rating >= 4 && oa[i].rating < 5){
			    ast.str1 = 'star';
				ast.str2 = 'star';
				ast.str3 = 'star';
				ast.str4 = 'star';
				ast.str5 = (oa[i].rating > 4) ? 'star-half-outline' : 'star-outline';
			} else {
			    ast.str1 = 'star';
				ast.str2 = 'star';
				ast.str3 = 'star';
				ast.str4 = 'star';
				ast.str5 = 'star';
			}
			if(oa[i].status.indexOf('|') != -1) {
				if(oa[i].status.split('|')[0] == 'A') this.oAst[a++] = ast;	
				else this.oAstb[b++] = ast;
			} else {
				this.oAstb[b++] = ast;
			}
		 }
  
  }
  	async callreq(evt, ast) {
	  console.log('ast', ast);
	  evt.stopPropagation();
	  //check balance, if is insufficient invoke the recharge dialog 
	  let user: User = await this.shareService.getItem('user') as User;
	  if(!user) { this.shareService.setGEVT('login'); return; }
	  else if(user.dob == ''){
	      this.shareService.setGEVT('dob');
	  } else {
	    console.log('user', user);
		this.horoService.getBalance(user.email).subscribe((res) => {	
		  //if(res['balance'] > 0) {
		  // Parse the astrologer's fee from the string format
		   this.shareService.getItem('vho:loc').then((loc: Location) => {
			this.getMinBal(ast.cfee, ast.ccy, loc.country_code).then(minBal => {
				//const estimatedCallCost = astrologerFeePerMinute*5; //minimum 5 minutes of balance is required;
				//if (user.balance >= minBal) {
			this.callService.callAstro(ast.eml, ast.name, ast.avatar, user.email, user.dob, (user.isprivate) ? 'https://i.imgur.com/LR7e1vw.png' : user.imageUrl).then(() => {
							   
							});
				//} else {
							//display recharge dialog
				//	this.shareService.setGEVT('recharge');
				//}
			});
		   });
		// } else {
			// if(res['balance'] == 0) {
				// this.shareService.setGEVT('recharge');
			// } else {
				// alert('Our server did not respond, please try afer sometime.');
			// }
	    // }
	}, (err) => {
		      console.log(JSON.stringify(err));
	}); 
	
     }
	  
	}


  // chatreq(event, ast) {
     // event.stopPropagation();
     // console.log(ast);
	 //window.location.href = ast.walnk;
	// this.horoService.talkToAstro(ast.uid, this.device.uuid+ '|' + this.shareService.getCLAT().toString() + ',' + this.shareService.getCLNG().toString(), 'T')
	   // .subscribe(res => {
	   // }, (err) => {
	     // console.log(err);
	   // });	 
		// this.shareService.getUPRO().then( upro => {
			// this.callService.establishMediaCall(upro['dob'], ast.peerid, false);
		   // this.cinf.name =  ast.name;
		   // this.cinf.avatar = ast.avatar;
		   // this.cinf.iscaller = true;
		   // this.cinf.secs = 0;
		   // this.cinf.starttime = '';
		   // this.cinf.endtime = '';
		   // this.cinf.msg = 'connected to ' + ast.peerid;
		   // this.router.navigate(['/astro-chat'], {state: this.cinf});
		// });
  // }
  	async getMinBal(fee: string, ccy: string, ccode: string): Promise<number> {
	  const res = await this.horoService.getCurrencyExchangeRate(ccode, ccy);

	  const [price,per,unit] = fee.split(' ');

	  let rate: number;
	  if (per === 'per' && (unit === 'min' || unit === 'minute')) {
		rate = Number(price) * res['ConversionRate'] * 5;
	  } else if (per === 'per' && unit === 'hour') {
		rate = Number(price) * res['ConversionRate'];
	  } else {
		rate = parseFloat(price);
	  }
	  return rate;
	}

  viewprof(event, ast) {
     event.stopPropagation();
     console.log(ast);
	 let item: any = {};
	this.horoService.talkToAstro(ast.uid, this.device.uuid+ '|' + this.shareService.getCLAT().toString() + ',' + this.shareService.getCLNG().toString(), 'P')
	   .subscribe(res => {
	   }, (err) => {
	     console.log(err);
	   });
    console.log('meta1');	   
	item.isavailable = (ast.smsg.indexOf('Not Available') != -1) ? false : true;
    console.log('meta2');	   
	item.mob = ast.mob;
    console.log('meta3');	   
	item.walnk = ast.walnk;
    console.log('meta4');	   
	item.blog = false;
    console.log('meta5');	   
	item.uid = ast.uid;
	item.uuid = ast.uuid;
	console.log('Invoking AstrologerPage');
	this.router.navigate(['/astrologer'], {state: item});
  }
showAlert() {

    this.alertController.create({
      header: 'Astrologer Not Available',
      subHeader: 'Astrologer Not Available',
      message: 'Astrologer maybe busy answering other customer, please try after sometime',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('Astrologer not available');
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
sz
}
