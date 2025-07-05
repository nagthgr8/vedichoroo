import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import {SubscribePage} from '../subscribe/subscribe.page';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { Plan } from '../plan';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service';
import 'cordova-plugin-purchase';

declare var RazorpayCheckout: any;
declare var CdvPurchase: any
const {store, ProductType} = CdvPurchase;

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
   plan: Plan = { uuid: '', name: '', credits: 0, dobs: '', rating: 0};
   info: string;
   paym: string = 'rpay';
   showCR: boolean = true;

  constructor(private router: Router, public platform: Platform, public device: Device, public horoService: HoroscopeService, public shareService: ShareService) { 
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
    this.platform.ready().then(() => {
      // MUST WAIT for Cordova to initialize before referencing CdvPurchase namespace
      let pid: any;
      try {
        if (this.platform.is('ios')) {
          pid = this.product.apid;
        } else if (this.platform.is('android')) {
          pid = this.product.gpid;
        }
  
        // Register Product
        // Set Debug High
        store.verbosity = store.DEBUG;
        // Register the product with the store
        store.register([{
          type: ProductType.CONSUMABLE,
          id: 'com.mypubz.eportal.dob50',
          platform: CdvPurchase.Platform.GOOGLE_PLAY,
        }]);
  
        store.error(console.warn);
   
        store.initialize([CdvPurchase.Platform.GOOGLE_PLAY]);
        store.update();
        this.pur_handl();
  
        store.ready(() => {
          CdvPurchase.store.when().productUpdated(this.onProductUpdated).approved(this.finishPurchase);
        });
        
             // Errors On The Specific Product
        store.when(pid).error( (error) => {
          console.log('An Error Occured' + JSON.stringify(error));
        });
        // Refresh Always
        console.log('Refresh Store');
        store.refresh();
      } catch (err) {
        console.log('Error On Store Issues' + JSON.stringify(err));
      }
  
    });
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreditsPage');
  }
    more()
	{
	this.router.navigate(['/subscribe']);
	}
  finishPurchase(transaction) {
    
    transaction.finish();
    this.pur_handl();
  }
  onProductUpdated() {
   
  }

 pur_handl() {
    // Handlers
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
  }
  
 buy()
  {
    this.product.gpid = 'com.mypubz.eportal.dob';
	if(this.paym == 'rpay') this.razpay(10);
	else store.get('com.mypubz.eportal.dob').getOffer().order();
  }
 buy5()
  {
    this.product.gpid = 'com.mypubz.eportal.dob5';
	if(this.paym == 'rpay') this.razpay(40);
	else store.get('com.mypubz.eportal.dob5').getOffer().order();
  }
 buy10()
  {
    this.product.gpid = 'com.mypubz.eportal.dob10';
	if(this.paym == 'rpay') this.razpay(70);
	else store.get('com.mypubz.eportal.dob10').getOffer().order();
  }
 buy25()
  {
    this.product.gpid = 'com.mypubz.eportal.dob25';
	if(this.paym == 'rpay') this.razpay(200);
	else store.get('com.mypubz.eportal.dob25').getOffer().order();
  }
 buy50()
  {
    this.product.gpid = 'com.mypubz.eportal.dob50';
	if(this.paym == 'rpay') this.razpay(350);
	else store.get('com.mypubz.eportal.dob50').getOffer().order();
  }
 paymSel(paym)
  {
     this.paym = paym;
  }
  razpay(amt) {
    let paise: number = Math.floor(amt*100);
	let ccy: string = 'INR';
	let ccode = this.shareService.getCCODE();
	if(ccode && ccode != '' && ccode != 'IN') {
	  paise = Math.floor(amt*1.4);
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
