import { Component, NgModule, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { File } from '@ionic-native/file';
import { HoroscopeService } from '../../app/horoscope.service';
import { CallNumber } from '@ionic-native/call-number';
import { Toast } from '@ionic-native/toast';
import { Astrologer } from '../../app/astrologer';
import { SankethPage } from '../sanketh/sanketh';
import { MohitSethPage } from '../mohit-seth/mohit-seth';
import { JaidevPage } from '../jaidev/jaidev';
import { PublishBlogPage } from '../publish-blog/publish-blog';

/**
 * Generated class for the AstrologersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@NgModule({
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
@Component({
  selector: 'page-astrologers',
  templateUrl: 'astrologers.html',
  encapsulation: ViewEncapsulation.None
})
export class AstrologersPage {
  objectKeys = Object.keys;
  info: string;
  oAst :Astrologer[] = [];
  showCTL: boolean = false;
  clat: any; clng: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,  public horoService: HoroscopeService, private callNumber: CallNumber, public device: Device, private file: File, private toast: Toast) {
    this.info = 'Loading, please wait..';
	   this.horoService.getAllAstrologers()
	   .subscribe(res => {
	     this.publishReport(res);
		 this.info = '';
	   }, (err) => {
	     console.log(err);
		 this.info = JSON.stringify(err);
		 
	   });
    //this.horoService.getJson('./astrologers.json')
	//.subscribe(res => {
	  // console.log('result', res);
	   //this.info = '';
	  //this.oAst = res;
	//},(err) => {
	  //this.info = err;
    //});
	this.file.readAsText(this.file.dataDirectory, 'vedicperfs.json').then(res => {
		console.log('vedicperfs', res);
	    var jsonv = JSON.parse(res);
		this.clat = jsonv['clat'];
		this.clng = jsonv['clng'];
	}, (err) => {
			//this.info = JSON.stringify(err);
	  });		
 }
  publishReport(oa: any)
  {
	     for(var i = 0; i < oa.length; i++) {
			console.log(i, oa[i]);
			let walnk = 'https://wa.me/' + oa[i].mob + '?text=I%20am%20interested%20to%20consult%20you%20for%20astrology';
			let smsg = (oa[i].status == 'A') ? '<span class="greenText"> Available</span>' : '<span class="redText"> Not Available</span>';
			let cfee: string = '';
			if(oa[i].uid == 'mohitseth') {
			   cfee = '&#8377; 300';
			} else {
			   cfee = '&#8377; 21 per minute';
			}
			let ast: Astrologer = {
					name: oa[i].name,
					tagline: oa[i].tagline,
					avatar: oa[i].avatar,
					uid: oa[i].uid,
					mob: oa[i].mob,
					walnk: walnk,
					smsg: smsg,
					status: (oa[i].status == 'A') ? true : false,
					cfee: cfee
					};
			this.oAst[i] = ast;			
		 }
  
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AstrologersPage');
	this.platform.ready().then((readySource) => {
		//this.toast.show('Please slide the list item, to access Chat Now or Call Now buttons..', '5000', 'center').subscribe(
		 // toast => {
		//	console.log(toast);
		 // }
		//);		
	});
	
  }
  callreq(event, ast) {
     event.stopPropagation();
     console.log(ast);
	this.horoService.talkToAstro(ast.uid, this.device.uuid + '|' + this.clat.toString() + ',' + this.clng.toString(), 'C')
	   .subscribe(res => {
	   }, (err) => {
	     console.log(err);
	   });	 
	   this.callNumber.callNumber('+' + ast.mob, true)
		.then(res => console.log('Launched dialer!', res))
		.catch(err => console.log('Error launching dialer', err));
  }
  chatreq(event, ast) {
     event.stopPropagation();
     console.log(ast);
	this.horoService.talkToAstro(ast.uid, this.device.uuid+ '|' + this.clat.toString() + ',' + this.clng.toString(), 'T')
	   .subscribe(res => {
	   }, (err) => {
	     console.log(err);
	   });	 
  }
  viewprof(event, ast) {
     event.stopPropagation();
     console.log(ast);
	 let item: any = {};
	this.horoService.talkToAstro(ast.uid, this.device.uuid+ '|' + this.clat.toString() + ',' + this.clng.toString(), 'P')
	   .subscribe(res => {
	   }, (err) => {
	     console.log(err);
	   });	 
	item.isavailable = (ast.smsg.indexOf('Not Available') != -1) ? false : true;
	item.mob = ast.mob;
	item.walnk = ast.walnk;
	item.blog = false;
	item.uid = ast.uid;
	 switch(ast.uid)
	 {
		case 'sanketh':
			this.navCtrl.push(SankethPage, {
			  item: item
			  });
			break;
		case 'mohitseth':
			this.navCtrl.push(MohitSethPage, {
			  item: item
			  });
		    break;
		case 'jaidev':
			this.navCtrl.push(JaidevPage, {
			  item: item
			  });
		    break;
		default:
			this.toast.show(`This profile is accessible with the new version, You are using old version of the App, many fetures were introduced in the new release, please download the new version for full access`, '5000', 'center').subscribe(
			  toast => {
				console.log(toast);
			});
		break;
	 }
  }
  viewblog(event, ast) {
     event.stopPropagation();
     console.log(ast);
	 let item: any = {};
	this.horoService.talkToAstro(ast.uid, this.device.uuid+ '|' + this.clat.toString() + ',' + this.clng.toString(), 'B')
	   .subscribe(res => {
	   }, (err) => {
	     console.log(err);
	   });	 
	item.isavailable = (ast.smsg.indexOf('Not Available') != -1) ? false : true;
	item.mob = ast.mob;
	item.walnk = ast.walnk;
	item.blog = true;
	item.uid = ast.uid;
	 switch(ast.uid)
	 {
		case 'sanketh':
			this.navCtrl.push(SankethPage, {
			  item: item
			  });
			break;
		case 'mohitseth':
			this.navCtrl.push(MohitSethPage, {
			  item: item
			  });
		    break;
		case 'jaidev':
			this.navCtrl.push(JaidevPage, {
			  item: item
			  });
		    break;
		default:
			this.toast.show(`This profile is accessible with the new version, You are using old version of the App, many fetures were introduced in the new release, please download the new version for full access`, '5000', 'center').subscribe(
			  toast => {
				console.log(toast);
			});
		break;
	}

  }
  pubblog(event, ast) {
     event.stopPropagation();
     console.log(ast);
	 let item: any = {};
	item.uid = ast.uid;
	this.navCtrl.push(PublishBlogPage, {
		item: item
	});
  }

}
