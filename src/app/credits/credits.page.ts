import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import {SubscribePage} from '../subscribe/subscribe.page';
import { InAppPurchase2, IAPProduct } from '@ionic-native/in-app-purchase-2/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Plan } from '../plan';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service';

declare var RazorpayCheckout: any;
@Component({
  selector: 'app-credits',
  templateUrl: './credits.page.html',
  styleUrls: ['./credits.page.scss'],
})
export class CreditsPage implements OnInit {
 public product: any = {
    name: 'My Product',
    apid: '1234',
    gpid: 'com.mypubz.eportal.dob'
  };
   plan: Plan = { uuid: '', name: '', credits: 0, dobs: ''};
   info: string;
   paym: string = 'rpay';
   showCR: boolean = true;

  constructor(private router: Router, public platform: Platform, public device: Device, private store: InAppPurchase2, public horoService: HoroscopeService, public shareService: ShareService) { 
   platform.ready().then(() => {
	  this.shareService.getPLAN()
		   .then((pln) => {
				this.plan = pln;
			}, (err) => {
				//this.info = err;
			});	  
   });
 }

  ngOnInit() {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreditsPage');
  }
    more()
	{
	this.router.navigate(['/subscribe']);
	}

  init_pur_and_complete() {
    let pid: any;
    if (!this.platform.is('cordova')) { return; }
    try {
      if (this.platform.is('ios')) {
        pid = this.product.apid;
      } else if (this.platform.is('android')) {
        pid = this.product.gpid;
      }

      // Register Product
      // Set Debug High
      this.store.verbosity = this.store.DEBUG;
      // Register the product with the store
      this.store.register({
        id: pid,
        alias: pid,
        type: this.store.CONSUMABLE
      });
      this.pur_handl();

      this.store.ready(() => {
		this.complete_pur();
	  });//.then((status) => {
       // console.log(JSON.stringify(this.store.get(this.platform.is('ios') ? this.product.apid : this.product.gpid)));
       // console.log('Store is Ready: ' + JSON.stringify(status));
        //console.log('Products: ' + JSON.stringify(this.store.products));
	//	this.complete_pur();
	//	console.log('Finished Purchase!');
	 // });

      // Errors On The Specific Product
      this.store.when(pid).error( (error) => {
        console.log('An Error Occured' + JSON.stringify(error));
      });
      // Refresh Always
      console.log('Refresh Store');
      this.store.refresh();
    } catch (err) {
      console.log('Error On Store Issues' + JSON.stringify(err));
    }
  }
 pur_handl() {
    // Handlers
    this.store.when(this.product.gpid).approved( (product: IAPProduct) => {
      product.finish();
	  let creds: number = 5;
	  switch(this.product.gpid)
	  {
		case 'com.mypubz.eportal.dob50':
			creds = 50;
			break;
		case 'com.mypubz.eportal.dob25':
			creds = 25;
			break;
		case 'com.mypubz.eportal.dob10':
			creds = 10;
			break;
		case 'com.mypubz.eportal.dob5':
			creds = 5;
			break;
		case 'com.mypubz.eportal.dob':
			creds = 2;
			break;
		default:
			creds = 2;
			break;
	  }
	  this.horoService.addCredits(this.device.uuid, creds)
		   .subscribe(res => {
		    this.plan.credits += creds;
		    this.shareService.setPLAN(this.plan);
			console.log('credits updated to server');
			}, (err) => {
			});	  
		  
    });

    this.store.when(this.product.gpid).registered( (product: IAPProduct) => {
      console.log('Registered: ' + JSON.stringify(product));
    });

    this.store.when(this.product.gpid).updated( (product: IAPProduct) => {
      console.log('Loaded' + JSON.stringify(product));
    });

    this.store.when(this.product.gpid).cancelled( (product) => {
      console.log('Purchase was Cancelled');
    });

    // Overall Store Error
    this.store.error( (err) => {
      console.log('Store Error ' + JSON.stringify(err));
    });
  }
   async complete_pur() {
    let pid;
    if (!this.platform.is('cordova')) {
      return
    }

    if (this.platform.is('ios')) {
      pid = this.product.apid;
    } else if (this.platform.is('android')) {
      pid = this.product.gpid;
    }

    console.log('Products: ' + JSON.stringify(this.store.products));
    console.log('Ordering From Store: ' + pid);
    try {
      let product = this.store.get(pid);
      console.log('Product Info: ' + JSON.stringify(product));
      let order = await this.store.order(pid);
    } catch (err) {
      console.log('Error Ordering ' + JSON.stringify(err));
    }
  }
  
 buy()
  {
    this.product.gpid = 'com.mypubz.eportal.dob';
	if(this.paym == 'rpay') this.razpay(10);
	else this.init_pur_and_complete();
  }
 buy5()
  {
    this.product.gpid = 'com.mypubz.eportal.dob5';
	if(this.paym == 'rpay') this.razpay(40);
	else this.init_pur_and_complete();
  }
 buy10()
  {
    this.product.gpid = 'com.mypubz.eportal.dob10';
	if(this.paym == 'rpay') this.razpay(70);
	else this.init_pur_and_complete();
  }
 buy25()
  {
    this.product.gpid = 'com.mypubz.eportal.dob25';
	if(this.paym == 'rpay') this.razpay(200);
	else this.init_pur_and_complete();
  }
 buy50()
  {
    this.product.gpid = 'com.mypubz.eportal.dob50';
	if(this.paym == 'rpay') this.razpay(350);
	else this.init_pur_and_complete();
  }
 paymSel(paym)
  {
     this.paym = paym;
  }
  razpay(amt) {
    let paise: number = amt*100;
	let ccy: string = 'INR';
	let ccode = this.shareService.getCCODE();
	if(ccode && ccode != '' && ccode != 'IN') {
	  paise = amt*1.4;
	  ccy = 'USD';
	}
    var options = {
      description: '126 Astrology - Credits',
      image: 'https://i.imgur.com/YBQF1iV.png',
      currency: ccy,//'INR',
      key: 'rzp_live_B8Zi7S5GIm9G94',
      amount: paise,
      name: '126 Astrology',
      prefill: {
        email: '',
        contact: '',
        name: ''
      },
      theme: {
        color: '#488aff'
      },
      modal: {
        ondismiss: function() {
          alert('dismissed')
        }
      }
    };

    var successCallback = (payment_id) => {
	  let creds: number = 5;
	  switch(this.product.gpid)
	  {
		case 'com.mypubz.eportal.dob50':
			creds = 50;
			break;
		case 'com.mypubz.eportal.dob25':
			creds = 25;
			break;
		case 'com.mypubz.eportal.dob10':
			creds = 10;
			break;
		case 'com.mypubz.eportal.dob5':
			creds = 5;
			break;
		case 'com.mypubz.eportal.dob':
			creds = 2;
			break;
		default:
			creds = 2;
			break;
	  }
	  this.horoService.addCredits(this.device.uuid, creds)
		   .subscribe(res => {
		    this.plan.credits += creds;
		    this.shareService.setPLAN(this.plan);
			console.log('credits updated to server');
			}, (err) => {
			});	  
    };

    var cancelCallback = (error) => {
      alert(error.description + ' (Error ' + error.code + ')');
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);
  }  
}
