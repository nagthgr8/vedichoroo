import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { Location } from '@angular/common';
import { ShareService } from '../share.service'
import { HoroscopeService } from '../horoscope.service';
import { BirthInfo } from '../birth-info';

@Component({
  selector: 'app-chart-settings',
  templateUrl: './chart-settings.page.html',
  styleUrls: ['./chart-settings.page.scss'],
})
export class ChartSettingsPage implements OnInit {
    binf: any;
	chtyp: string = '';
	aynm: string = '';
	info: string = '';
	showCHT: boolean = true;
	showCSET: boolean = true;
	showPRD: boolean = false;
    cmn: boolean = false;
	stngs: string = '';
	lang: string = '';
	pred: string = 'Mo';
  constructor(private router: Router, private location: Location, public shareService: ShareService, public horoService: HoroscopeService, private translate: TranslateService) { 
  
  }

  ngOnInit() {
	this.binf = this.router.getCurrentNavigation().extras.state;
 	 if(this.binf.ref == "2" || this.binf.ref == "3") this.showCHT = false;
	 else if(this.binf.ref == '0') { 
		this.showCHT = false;
		this.showCSET = false;
		this.showPRD = true;
	 }
	let res = this.shareService.getCHTYP();
	if(res) {
		this.chtyp = res;
	} else {
		this.chtyp = 'sind';
	}
	res = this.shareService.getLANG();
	if(res) {
		this.lang = res;
	}
	res = null;
	if(this.binf.ref == "1")
		res = this.shareService.getAYNM();
	else if(this.binf.ref == "2")
		res = this.shareService.getKAYNM();
	else if(this.binf.ref == "3")
	    res = this.shareService.getRAYNM();
	else if(this.binf.ref == "4") {
		res = this.shareService.getAYNM();
		this.cmn = true;
	} 
	if(res) {
		this.aynm = res;
	} else {
		this.aynm = (this.binf.ref == "1") ? "4" : (this.binf.ref == "2") ? "3" : "1";
	}
	  //});
	this.shareService.getPRED().then( pred => {
		if(pred) this.pred = pred;
	});
	}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartSettingsPage');
  }
chartSel() {
	console.log('chtyp', this.chtyp);
 } 
 ayanSel() {
   console.log('aynm',this.aynm);	 
 }
 showInf(tpc) {
	this.horoService.getArticle(tpc)
	.subscribe(res => {
		this.info = '';
		if(res['title'].indexOf('ERROR') == -1)
			this.router.navigate(['/article'], {state: res});
	}, (err) => {
		this.info = JSON.stringify(err);
	});
 }
 settings(s) {
	 this.stngs = s;
 }
 save(event) {
   event.stopPropagation();
   this.info = 'Please wait...';
//   if(this.chtyp != this.shareService.getCHTYP()) {
//		this.shareService.setCHTYP(this.chtyp);
//		this.info = 'Saved';
  // }
   if (this.binf.ref == "4") {
	   console.log('selected lang', this.lang);
		this.shareService.setLANG(this.lang);
		this.shareService.setAYNM(this.aynm);
		this.shareService.setKAYNM(this.aynm);
		this.shareService.setRAYNM(this.aynm);
		if(this.chtyp != this.shareService.getCHTYP()) {
			this.shareService.setCHTYP(this.chtyp);
		}
		this.info = 'Saved';
   } 
   else if(this.aynm != this.shareService.getAYNM() || this.aynm != this.shareService.getKAYNM() || this.aynm != this.shareService.getRAYNM()) {
	   this.info = 'Applying selected Ayanamsa  to birth chart, please wait..';
		var d = new Date();
		var n = d.getTimezoneOffset();
		n = n/60;
		let ofset: number = Number(n.toFixed(1));
		if(this.binf.ref == "1") {
				this.shareService.setAYNM(this.aynm);
				if(this.chtyp != this.shareService.getCHTYP()) {
					this.shareService.setCHTYP(this.chtyp);
				}
		   this.horoService.getBirthchartEx2(this.binf.lat, this.binf.lng, this.binf.dob, this.binf.timezone, this.binf.dstofset, Number(this.aynm))
			   .subscribe(res => {
			this.shareService.setPPOS(this.binf.dob, res['planetPos']);
			this.shareService.setRETRO(this.binf.dob, res['retroPls']);
			    this.location.back();
				this.info = '';
				
		   }, (err) => {
				this.info = JSON.stringify(err);
		   });
	   } 
	   else if (this.binf.ref == "2") {
		this.shareService.setKAYNM(this.aynm);
		this.horoService.getCuspsEx(this.binf.lat, this.binf.lng, this.binf.dob, this.binf.timezone, this.binf.dstofset, Number(this.aynm))
		   .subscribe(res => {
			this.shareService.setKPPOS(this.binf.dob, res['planetPos']);
		    console.log(res['housePos']);
 		    this.shareService.setHPOS(this.binf.dob, res['housePos']);
			this.location.back();
				this.info = '';
		  }, (err) => {
			this.info = JSON.stringify(err);
		  }) ;
	   } 
	   else if(this.binf.ref == "3") {
		  this.shareService.setRAYNM(this.aynm);
		  this.location.back();
		  this.info = '';
	   } else {
		  this.location.back();
		  this.info = '';
	   }
   }
   else  {
		  this.location.back();
   }	   
 }
switchLanguage() {
	 console.log('lang', this.lang);
    this.translate.use(this.lang);
	this.shareService.setLANG(this.lang);
  }
  switchPred() {
	  this.shareService.setPREDS(this.pred);
  }
 }
