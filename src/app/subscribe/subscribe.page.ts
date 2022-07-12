import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { Platform  } from '@ionic/angular';
import { InAppPurchase2, IAPProduct } from '@ionic-native/in-app-purchase-2/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Plan } from '../plan';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service';

declare var RazorpayCheckout: any;

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.page.html',
  styleUrls: ['./subscribe.page.scss'],
})
export class SubscribePage implements OnInit {
 public product: any = {
    name: 'My Product',
    apid: '1234',
    gpid: 'com.mypubz.eportal.dob'
  };
   plan: Plan;
   showSU: boolean = false;
   showCR: boolean = false;
   showWC: boolean = false;
   showCI: boolean = false;
   showPAY: boolean = true;
   info: string;
   sinf: string;
   paym: any;
   sopt: any;
  // ofr: any = null;
   price: number = 999;
   noOFR: boolean = true;
   nam: string = '';
   eml: string = '';
   mob: string = '';
   subt: string = 'Subscribe now for just Rs. 999';
   smsg: string = 'Your free limit is exhausted, please subscribe for unlimited usage';
   co: boolean = false;
  items: Array<{title: string, id: number, icon: string, spin: boolean}>;
  title: string[];
  id: number[];
  bmsg: boolean = false;
  constructor(private router: Router, public platform: Platform, public device: Device, private store: InAppPurchase2, public horoService: HoroscopeService, public shareService: ShareService, private translate: TranslateService) { 
	this.items = [];
	this.title = ['Get upcoming 30 day planetary transit report with detailed predictions','Get Personalized Calendar for the current month & upcoming month highlighting auspicious & inauspcious dates based on your star strength & lunar strength(Muhurtha By B V Raman)','Based on KP Method know your auspicious dates for the current month on events such as opening bank, account, signing up a contract, filing a court case and many more','Prashna Jyotish, Ask a question & verify if the question in the context will happen or not using the KP Ruling planet method','Know in detail what all Yogas present in your horoscope.','Career Horoscope','Money Horoscope','Detailed analysis on each of the Divisional/Varga Charts', 'Love Compatibility Report, provides detailed report on the star matching 36 gunas and doshas that exists between the boy & girl'];
	this.id = [1,2,3,4,5,6,7,8,9];
    for(let i = 1; i < 10; i++) {
      this.items.push({
        title: this.title[i-1],
        id: this.id[i-1],
        icon: '',
		spin: false
      });
	}
  }

  ngOnInit() {
	  this.paym = 'rpay';
	  this.sopt = 'year';
 //	this.horoService.getMsg(this.device.uuid, 'subscribe')
//	.subscribe(res => {
//		this.smsg = res['msg'];
//	}, (err) => {
		//this.info = JSON.stringify(err);
//	});	 
  	  this.shareService.getPLAN()
		   .then(res => {
			    if(res['credits'] == 0) this.co = true;
				let pln: Plan = { uuid: res['uuid'], name: res['name'], credits: res['credits'], dobs: res['dobs'], rating: res['rating'] };
				this.plan = pln;
				
				if(res['name'] != 'com.mypubz.eportal.astrologer' && res['name'] != 'com.mypubz.eportal.adfree' && res['name'] != 'com.mypubz.eportal.year') {
						this.showSU = true;
						this.showCR = false;
						this.showPAY = true;
						if(res['credits'] == 0) this.bmsg = true;
				} else {
					this.showSU = false;
					this.showCR = true;
					this.showPAY = false;
				}
			}, (err) => {
				this.info = err;
			});	
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
        type: (pid == 'com.mypubz.eportal.astrologer') ? this.store.PAID_SUBSCRIPTION : this.store.CONSUMABLE
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
	  this.plan.name = this.product.gpid;
	  this.shareService.setPLAN(this.plan);
	  this.horoService.setPlan(this.device.uuid, this.product.gpid)
		   .subscribe(res => {
				this.horoService.addSubscriber(this.device.uuid, this.product.gpid, this.nam, this.mob, this.eml)
				   .subscribe(res => {
				}, (err) => {
				}) ;
			}, (err) => {
			});	  
      this.router.navigate(['/home'], {replaceUrl: true});		
		  
    });

    this.store.when(this.product.gpid).registered( (product: IAPProduct) => {
      console.log('Registered: ' + JSON.stringify(product));
    });

    this.store.when(this.product.gpid).updated( (product: IAPProduct) => {
      console.log('Loaded' + JSON.stringify(product));
    });

    this.store.when(this.product.gpid).cancelled( (product) => {
      console.log('Purchase was Cancelled');
	 // this.horoService.setPlan(this.device.uuid, 'com.mypubz.eportal.dob')  //default plan
	//	   .subscribe(res => {
	//		}, (err) => {
	//		});	  
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
  
 subscribe()
  {
	this.price = 999;
    this.product.gpid = 'com.mypubz.eportal.astrologer';
	  if(this.sopt == 'month') {
		this.price = 99;
		this.product.gpid = 'com.mypubz.eportal.month';
	  }
	if(this.paym == 'rpay') {
		this.showCR = false;
		this.showSU = false;
		this.showPAY = false;
		this.showCI = true;
		this.bmsg = false;
	}
	else this.init_pur_and_complete();
  }
 subscribe2()
  {
	  this.price = 999;
    this.product.gpid = 'com.mypubz.eportal.year';
	if(this.paym == 'rpay') {
		this.showCR = false;
		this.showSU = false;
		this.showPAY = false;
		this.showCI = true;
	}
	else this.init_pur_and_complete();
  }
 month()
  {
	this.price = 99;
    this.product.gpid = 'com.mypubz.eportal.month';
	if(this.paym == 'rpay') {
		this.showCR = false;
		this.showSU = false;
		this.showPAY = false;
		this.showCI = true;
	}
	else this.init_pur_and_complete();
  }
  help()
  {
	this.router.navigate(['/help-desk']);
  }
  saveSub()
  {
    this.product.gpid = 'com.mypubz.eportal.astrologer';
	if(this.nam.length == 0) {
	    this.sinf = 'Please enter your name';
		return;
		}  
	if(this.mob.length == 0) {
	    this.sinf = 'Please enter your Mobile Number';
		return;
		}  
	if(this.eml.length == 0) {
	   this.sinf = 'Please enter your email address';
		return;
		} 
    if(this.paym == 'rpay' && this.plan.name != 'com.mypubz.eportal.astrologer' && this.plan.name != 'com.mypubz.eportal.adfree' && this.plan.name != 'com.mypubz.eportal.year' && this.plan.name != 'com.mypubz.eportal.month') 
		this.razpay();	
	else {
		this.sinf = 'Please wait...';
		this.horoService.addSubscriber(this.device.uuid, this.product.gpid, this.nam, this.mob, this.eml)
		   .subscribe(res => {
			//this.sinf = 'Thank you for providing details. We will be in touch with you shortly';
			this.showWC = true;
            this.showCI = false;
		}, (err) => {
			this.sinf = JSON.stringify(err);
		}) ;
	 }
		
  }
  paymSel(paym)
  {
     this.paym = paym;
  }
  sfor(sopt) {
	  this.sopt = sopt;
  }
  razpay() {
    let amt: number = this.price;
    let paise: number = Math.floor(amt*100);
	let ccy: string = 'INR';
	let ccode = this.shareService.getCCODE();
	//console.log('ccode', ccode);
	if(ccode && ccode != '' && ccode != 'IN') {
	  paise = Math.floor(amt*1.4);
	  ccy = 'USD';
	}
	console.log('amt', paise);
	console.log('ccy', ccy);
    var options = {
      description: '126 Astrology Subscription',
      image: 'https://i.imgur.com/YBQF1iV.png',
      currency: ccy,//'INR',
      key: 'rzp_live_B8Zi7S5GIm9G94',
      amount: paise,//'99900',
      name: '126 Astrology',
      prefill: {
        email: this.eml,
        contact: this.mob,
        name: this.nam
      },
      theme: {
        color: '#d35400'
      },
      modal: {
        ondismiss: function() {
          alert('dismissed')
        }
      }
    };

    var successCallback = (payment_id) => {
	  this.plan.name = this.product.gpid;
	  this.shareService.setPLAN(this.plan);
		this.horoService.setPlan(this.device.uuid, this.product.gpid)
		   .subscribe(res => {
			 this.sinf = 'Please wait...';
				this.horoService.addSubscriber(this.device.uuid, this.product.gpid, this.nam, this.mob, this.eml)
				   .subscribe(res => {
					this.sinf = 'Thank you for providing details. We will be in touch with you shortly';
					if(!this.showWC) this.router.navigate(['/home'],{replaceUrl: true});
				}, (err) => {
					this.sinf = JSON.stringify(err);
				}) ;
			}, (err) => {
		});	
      this.router.navigate(['/home'],{replaceUrl: true});		
    };

    var cancelCallback = (error) => {
      alert(error.description + ' (Error ' + error.code + ')');
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);
  }
  reward() {
	  this.shareService.setREWARD(true);
	  this.router.navigate(['/home'],{replaceUrl: true});
  }
  report() {
	  this.router.navigate(['/report']);
  }
  itemTapped(event, item) {
  }
  back() {
	  this.showCI = false;
	  this.showSU = true;
  }
}
