import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform  } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { InAppPurchase2, IAPProduct } from '@ionic-native/in-app-purchase-2';
import { Device } from '@ionic-native/device';
import { Plan } from '../../app/plan';
import { HoroscopeService } from '../../app/horoscope.service';
import { ShareService } from '../../app/share.service';
import { HelpDeskPage } from '../help-desk/help-desk';
import { ListPage } from '../list/list';
/**
 * Generated class for the SubscribePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-subscribe',
  templateUrl: 'subscribe.html',
})
export class SubscribePage {
 public product: any = {
    name: 'My Product',
    apid: '1234',
    gpid: 'com.mypubz.eportal.dob'
  };
   personalDetailsForm: FormGroup;
   plan: Plan;
   showSU: boolean = false;
   showCR: boolean = false;
   showWC: boolean = false;
   showCI: boolean = false;
   info: string;
   sinf: string;
   paym: string = 'rpay';
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public device: Device, private store: InAppPurchase2, public horoService: HoroscopeService, public shareService: ShareService, public formBuilder: FormBuilder) {
	 if(navParams.get('ci') == true)
      this.showCI = true;
	// else 
  	  this.shareService.plan
		   .subscribe(res => {
				let pln: Plan = { uuid: res['uuid'], name: res['name'], credits: res['credits'], dobs: res['dobs'] };
				this.plan = pln;
				if(res['name'] != 'com.mypubz.eportal.astrologer') {
					this.showSU = true;
					this.showCR = false;
				} else {
					this.showSU = false;
					this.showCR = true;
				}
			}, (err) => {
				this.info = err;
			});	  
	this.personalDetailsForm = this.formBuilder.group({
		nam: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
		mob: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
		eml: new FormControl('', Validators.compose([
			Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
		]))
	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscribePage');
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
        type: this.store.PAID_SUBSCRIPTION
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
	  this.showCR = false;
	  this.showSU = false;
	  this.showWC = true;
	  this.showCI = true;
	  this.plan.name = this.product.gpid;
	  this.shareService.setPLAN(this.plan);
	  this.horoService.setPlan(this.device.uuid, this.product.gpid)
		   .subscribe(res => {
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
	  this.horoService.setPlan(this.device.uuid, 'com.mypubz.eportal.dob')  //default plan
		   .subscribe(res => {
			}, (err) => {
			});	  
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
    this.product.gpid = 'com.mypubz.eportal.astrologer';
	if(this.paym == 'rpay') {
		this.showCR = false;
		this.showSU = false;
		this.showCI = true;
	}
	else this.init_pur_and_complete();
  }
  help()
  {
	this.navCtrl.push(HelpDeskPage);
  }
  saveSub()
  {
	if(this.personalDetailsForm.controls['nam'].value.length == 0) {
	    this.sinf = 'Please enter your name';
		return;
		}  
	if(this.personalDetailsForm.controls['mob'].value.length == 0) {
	    this.sinf = 'Please enter your Mobile Number';
		return;
		}  
	//if(this.personalDetailsForm.controls['eml'].value.length == 0) {
	   // this.info = 'Please enter your name';
		//return;
		//} 
    if(this.paym == 'rpay' && this.plan.name != 'com.mypubz.eportal.astrologer') this.razpay();	
	else {
		this.sinf = 'Please wait...';
		this.horoService.addSubscriber(this.device.uuid, this.personalDetailsForm.controls['nam'].value, this.personalDetailsForm.controls['mob'].value, this.personalDetailsForm.controls['eml'].value)
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
  razpay() {
    let amt: number = 999;
    let paise: number = amt*100;
	let ccy: string = 'INR';
	let ccode = this.shareService.getCCODE();
	//console.log('ccode', ccode);
	if(ccode && ccode != '' && ccode != 'IN') {
	  paise = amt*1.4;
	  ccy = 'USD';
	}
	console.log('amt', paise);
    var options = {
      description: '126 Astrology Subscription',
      image: 'https://i.imgur.com/YBQF1iV.png',
      currency: ccy,//'INR',
      key: 'rzp_live_B8Zi7S5GIm9G94',
      amount: paise,//'99900',
      name: '126 Astrology',
      prefill: {
        email: this.personalDetailsForm.controls['eml'].value,
        contact: this.personalDetailsForm.controls['mob'].value,
        name: this.personalDetailsForm.controls['nam'].value
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
	  this.plan.name = this.product.gpid;
	  this.shareService.setPLAN(this.plan);
		this.horoService.setPlan(this.device.uuid, this.product.gpid)
		   .subscribe(res => {
			this.sinf = 'Please wait...';
			this.horoService.addSubscriber(this.device.uuid, this.personalDetailsForm.controls['nam'].value, this.personalDetailsForm.controls['mob'].value, this.personalDetailsForm.controls['eml'].value)
			   .subscribe(res => {
				this.sinf = 'Thank you for providing details. We will be in touch with you shortly';
				if(!this.showWC) this.navCtrl.setRoot(ListPage);
			}, (err) => {
				this.sinf = JSON.stringify(err);
			}) ;
			}, (err) => {
		});	  
    };

    var cancelCallback = (error) => {
      alert(error.description + ' (Error ' + error.code + ')');
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);
  }
}
