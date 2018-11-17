import { Component } from '@angular/core';
import { NavController, NavParams, Platform, Events } from 'ionic-angular';
import {SubscribePage} from '../subscribe/subscribe';
import { InAppPurchase2, IAPProduct } from '@ionic-native/in-app-purchase-2';
import { Device } from '@ionic-native/device';
import { Plan } from '../../app/plan';
import { HoroscopeService } from '../../app/horoscope.service';

/**
 * Generated class for the CreditsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-credits',
  templateUrl: 'credits.html',
})
export class CreditsPage {
 public product: any = {
    name: 'My Product',
    apid: '1234',
    gpid: 'com.mypubz.eportal.dob'
  };
   plan: Plan;
   info: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public device: Device, private store: InAppPurchase2, public horoService: HoroscopeService, public events: Events) {
  platform.ready().then(() => {
	  this.horoService.getPlan(this.device.uuid)
		   .subscribe(res => {
				let pln: Plan = { uuid: res['uuid'], name: res['name'], credits: res['credits'], dobs: res['dobs'] };
				this.plan = pln;
				
			}, (err) => {
				this.info = err;
			});	  
   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreditsPage');
  }
    more()
	{
		this.navCtrl.push(SubscribePage);
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
			console.log('credits updated to server');
			  this.events.subscribe('available:credits', (page) => {
					page.title = 'Available Credits(' + res['credits'] + ')';
					console.log('Credits updated in App');
				});
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
	this.init_pur_and_complete();
  }
 buy5()
  {
    this.product.gpid = 'com.mypubz.eportal.dob5';
	this.init_pur_and_complete();
  }
 buy10()
  {
    this.product.gpid = 'com.mypubz.eportal.dob10';
	this.init_pur_and_complete();
  }
 buy25()
  {
    this.product.gpid = 'com.mypubz.eportal.dob25';
	this.init_pur_and_complete();
  }
 buy50()
  {
    this.product.gpid = 'com.mypubz.eportal.dob50';
	this.init_pur_and_complete();
  }
}
