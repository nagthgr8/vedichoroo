import { Component, OnInit, NgModule, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { File } from '@ionic-native/file/ngx';
import { HoroscopeService } from '../horoscope.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ShareService } from '../share.service'
import { Astrologer } from '../astrologer';
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
  //oHAst :Astrologer[] = [];
  showCTL: boolean = false;
  //clat: any; clng: any;
  constructor(private router: Router, public platform: Platform,  public horoService: HoroscopeService, private shareService: ShareService, private callNumber: CallNumber, public device: Device, private file: File) { 
     this.info = 'Loading, please wait..';
	   this.horoService.getAllAstrologers()
	   .subscribe(ast => {
		//   this.oAst = ast;
	    this.publishReport(ast);
		 this.info = '';
	   }, (err) => {
	     console.log(err);
		 this.info = JSON.stringify(err);
		 
	   });
	//this.file.readAsText(this.file.dataDirectory, 'vedicperfs.json').then(res => {
		//console.log('vedicperfs', res);
	    //var jsonv = JSON.parse(res);
		//this.clat = this.shareService.getCLAT();
		//this.clng = this.shareService.getCLNG();
	//}, (err) => {
			//this.info = JSON.stringify(err);
	  //});		
  
  }
  ngOnInit() {
  }
  publishReport(oa: any)
  {
	     for(var i = 0; i < oa.length; i++) {
			console.log(i, oa[i]);
			let call: string = oa[i].mob;
			let chat: string = oa[i].mob;
			if(oa[i].mob.indexOf('|') > -1) {
				call = oa[i].mob.split('|')[0];
				chat = oa[i].mob.split('|')[1];
			}
			let walnk = 'https://wa.me/' + chat + '?text=I%20am%20interested%20to%20consult%20you%20for%20astrology';
			let smsg = (oa[i].status == 'A') ? '<span class="av"> Available</span>' : '<span class="na"> Not Available</span>';
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
					status: (oa[i].status == 'A') ? true : false,
					cfee: cfee
					};
			this.oAst[i] = ast;			
		 }
  
  }
  callreq(event, ast) {
     event.stopPropagation();
     console.log(ast);
	//this.horoService.talkToAstro(ast.uid, this.device.uuid + '|' + this.clat.toString() + ',' + this.clng.toString(), 'C')
	 //  .subscribe(res => {
	//   }, (err) => {
	//     console.log(err);
	 //  });	 
	   this.callNumber.callNumber('+' + ast.mob, true)
		.then(res => console.log('Launched dialer!', res))
		.catch(err => console.log('Error launching dialer', err));
  }
  chatreq(event, ast) {
     event.stopPropagation();
     console.log(ast);
	 window.location.href = ast.walnk;
//	this.horoService.talkToAstro(ast.uid, this.device.uuid+ '|' + this.clat.toString() + ',' + this.clng.toString(), 'T')
//	   .subscribe(res => {
//	   }, (err) => {
//	     console.log(err);
//	   });	 
  }
  viewprof(event, ast) {
     event.stopPropagation();
     console.log(ast);
	 let item: any = {};
	//this.horoService.talkToAstro(ast.uid, this.device.uuid+ '|' + this.clat.toString() + ',' + this.clng.toString(), 'P')
	//   .subscribe(res => {
	//   }, (err) => {
	//     console.log(err);
	 //  });
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

}
