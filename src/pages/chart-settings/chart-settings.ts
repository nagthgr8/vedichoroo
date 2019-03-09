import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShareService } from '../../app/share.service'
import { HoroscopeService } from '../../app/horoscope.service';
import { HoroscopePage } from '../horoscope/horoscope';
import { KpAstroPage } from '../kp-astro/kp-astro';
import { PanchangPage } from '../panchang/panchang';
import { ArticlePage } from '../article/article';
import { BirthInfo } from '../../app/birth-info';

/**
 * Generated class for the ChartSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chart-settings',
  templateUrl: 'chart-settings.html',
})
export class ChartSettingsPage {
    binf: any;
	chtyp: string = '';
	aynm: string = '';
	info: string = '';
	showCHT: boolean = true;
	
  constructor(public navCtrl: NavController, public navParams: NavParams, public shareService: ShareService, public horoService: HoroscopeService) {
     this.binf = navParams.get('binf');
	 if(this.binf.ref == "2" || this.binf.ref == "3") this.showCHT = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartSettingsPage');
	let res = this.shareService.getCHTYP();
	if(res) {
		this.chtyp = res;
	} else {
		this.chtyp = 'sind';
	}
	if(this.binf.ref == "1")
		res = this.shareService.getAYNM();
	else if(this.binf.ref == "2")
		res = this.shareService.getKAYNM();
	else if(this.binf.ref == "3")
	    res = this.shareService.getRAYNM();
	if(res) {
		this.aynm = res;
	} else {
		this.aynm = (this.binf.ref == "1") ? "4" : (this.binf.ref == "2") ? "3" : "1";
	}
		
  }
chartSel(cht) {
   this.chtyp = cht;
 } 
 ayanSel(aynm) {
   this.aynm = aynm;
 }
 showInf(tpc) {
	this.horoService.getArticle(tpc)
	.subscribe(res => {
		this.info = '';
		if(res['title'].indexOf('ERROR') == -1)
			this.navCtrl.push(ArticlePage, {item: res});
	}, (err) => {
		this.info = JSON.stringify(err);
	});
 }
 save(event) {
   event.stopPropagation();
   if(this.aynm != this.shareService.getAYNM() || this.aynm != this.shareService.getKAYNM() || this.aynm != this.shareService.getRAYNM()) {
        this.info = 'Please wait...';
		var d = new Date();
		var n = d.getTimezoneOffset();
		n = n/60;
		let ofset: number = Number(n.toFixed(1));
		if(this.binf.ref == "1") {
		   this.horoService.getProHoro(this.binf.lat, this.binf.lng, this.binf.dob, this.binf.timezone, ofset, Number(this.aynm))
			   .subscribe(res => {
				this.shareService.setPLPOS(res);
				this.shareService.setAYNM(this.aynm);
				if(this.chtyp != this.shareService.getCHTYP()) {
					this.shareService.setCHTYP(this.chtyp);
				}
				this.info = '';
			    this.navCtrl.pop();
				
		   }, (err) => {
				this.info = JSON.stringify(err);
		   });
	   } else if (this.binf.ref == "2") {
		this.horoService.getCuspsEx(this.binf.lat, this.binf.lng, this.binf.dob, this.binf.timezone, ofset, Number(this.aynm))
		   .subscribe(res => {
			this.shareService.setPLPOS(res['planetPos']);
		    console.log(res['housePos']);
 		    this.shareService.setHPOS(res['housePos']);
			this.shareService.setKAYNM(this.aynm);
			if(this.chtyp != this.shareService.getCHTYP()) {
				this.shareService.setCHTYP(this.chtyp);
			}
			this.navCtrl.pop();
		  }, (err) => {
			this.info = err;
		  }) ;
	   } else if(this.binf.ref == "3") {
		  this.shareService.setRAYNM(this.aynm);
		  this.navCtrl.pop();
	   }
   }else if(this.chtyp != this.shareService.getCHTYP()) {
        this.shareService.setCHTYP(this.chtyp);
	  this.navCtrl.pop();
   }else {
	  this.navCtrl.pop();
   }
 }
}
