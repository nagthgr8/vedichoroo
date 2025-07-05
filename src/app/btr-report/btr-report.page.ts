import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service'
import { PlanetPos } from '../planet-pos';
import { HousePos } from '../house-pos';
import { BirthTimeRecfy } from '../birth-time-recfy';
import * as sublords from '../subsubz.json';
import * as signs_pos from '../signs_pos.json';
import * as o_signs from '../o_signs.json';
import * as ruler_name from '../ruler_name.json';
import * as rashis from '../rashis.json';

@Component({
  selector: 'app-btr-report',
  templateUrl: './btr-report.page.html',
  styleUrls: ['./btr-report.page.scss'],
})
export class BtrReportPage implements OnInit {
  signs_pos_v: any = (signs_pos as any).default;
  sublords_v: any = (sublords as any).default;
  ruler_name_v: any = (ruler_name as any).default;
  rashis_v: any = (rashis as any).default;
  o_signs_v: any = (o_signs as any).default;
  oPlanet1 :PlanetPos[] = [];
  oHouse1: HousePos[] = [];
  oPlanet2 :PlanetPos[] = [];
  oHouse2: HousePos[] = [];
  btr: any = null;
  objectKeys = Object.keys;
  oRecfy: BirthTimeRecfy[] = [];
  oRdtf: BirthTimeRecfy[] = [];
  oRdtb: BirthTimeRecfy[] = [];
  showBT: boolean = false;
  ntks: number = 0;
  asc_pos: string = '';
  asc_sgn: string = '';
  ayanid = 4;
  bdt: any = null;
  znm: string[] = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Saggittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  zpos: number[] = [0,30,60,90,120,150,180,210,240,270,300,330,360];
  constructor(public router: Router, public shareService: ShareService, public horoService: HoroscopeService) { }

 getPPOS(ppos, sf)
 {
	 console.log('ppos', ppos);
	let nu: number = 0;
	for(let sign of Object.keys(ppos)) {
				var pls = ppos[sign].split('\|');
				for (var k = 0; k < pls.length; k++) {
					if (pls[k].split(' ')[1] == 'MEAN_NODE') {
						var rpos = this.rashis_v[sign].split('\|')[0];
						var kpos = parseInt(rpos, 10) + 6;
						if (kpos > 12) kpos = (kpos - 12);
						if (ppos.hasOwnProperty(this.o_signs_v[kpos - 1])) {
							var eP = ppos[this.o_signs_v[kpos - 1]];
							ppos[this.o_signs_v[kpos - 1]] = eP + '|' + pls[k].split(' ')[0] + ' ' + 'Ke';
						} else {
							ppos[this.o_signs_v[kpos - 1]] = pls[k].split(' ')[0] + ' ' + 'Ke';
						}
						ppos[sign] = ppos[sign].replace('MEAN_NODE', 'Ra');
						nu++;
					}  else if (pls[k].split(' ')[1] == 'TRUE_NODE') {
						ppos[sign] = ppos[sign].replace('TRUE_NODE', 'TR');		
						nu++;
					}
				}
				if(nu == 2) break;
			}
	 
 		for(let sign  of Object.keys(ppos)) {
				var pls = ppos[sign].split('\|');
				console.log(pls);
				for (var k = 0; k < pls.length; k++) {
					var pl = pls[k].split(' ')[1];
					var pos = pls[k].split(' ')[0].trim();
					console.log(pl, pos);
					let dval: number = 0;
					if(pos.indexOf('.') > -1 && pos.split('.')[1] != '')
					  dval = this.dmsToDec(this.signs_pos_v[sign]+Number(pos.split('.')[0]), Number(pos.split('.')[1]), Number(pos.split('.')[2]));
					else
					  dval = Number(pos);
					if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TR') {  //consider only true planets
						var star = this.calcStarEx(dval);
						let planetPos: PlanetPos = {
							 pos: dval,
							 sign: star.split('|')[0],
							 star: star.split('|')[1],
							 sub: star.split('|')[2],
							 sig: '',
							 lif_e: '',
							 inds: ''
						};
						if(sf) 
							this.oPlanet1[this.ruler_name_v[pl.toLowerCase()].toLowerCase()] = planetPos;
						else
							this.oPlanet2[this.ruler_name_v[pl.toLowerCase()].toLowerCase()] = planetPos;
							
					} else if (pl == 'Ra') { //consder Rahu
						var star = this.calcStarEx(dval);
							let planetPos: PlanetPos = {
							 pos: dval,
							 sign: star.split('|')[0],
							 star: star.split('|')[1],
							 sub: star.split('|')[2],
							 sig: '',
							 lif_e: '',
							 inds: ''
							};
							if(sf) this.oPlanet1['rahu'] = planetPos;
							else this.oPlanet2['rahu'] = planetPos;
					} else if (pl == 'Ke') {
						var star = this.calcStarEx(dval);
							let planetPos: PlanetPos = {
							 pos: dval,
							 sign: star.split('|')[0],
							 star: star.split('|')[1],
							 sub: star.split('|')[2],
							 sig: '',
							 lif_e: '',
							 inds: ''
							};
							if(sf) this.oPlanet1['ketu'] = planetPos;
							else this.oPlanet2['ketu'] = planetPos;
					} else if(sf && pl == 'AC') {
						this.asc_pos = pos;
						this.asc_sgn = sign;
					}
				}
		}
  }
  getHPOS(hpos, sf)
  {
		   for(let key of Object.keys(hpos)) {
			  let v_iter: number = Number(key);
			  let dval: number = 0;
			  var dmslat = hpos[v_iter];
			  dval = this.dmsToDec(Number(dmslat.split("°")[0]), Number(dmslat.split("°")[1].split("'")[0]), Number(dmslat.split("°")[1].split("'")[1].split('"')[0]));
			  console.log('calcStarEx', dmslat);
			  console.log('calcStarEx', dval);
			  var star = this.calcStarEx(dval);
			  let housePos: HousePos = {
				 pos: dval,
				 dmspos: dmslat,
				 sign: star.split('|')[0],
				 star: star.split('|')[1],
				 sub: star.split('|')[2],
				 sig: ''
			  };
			  if(sf) this.oHouse1[v_iter] = housePos;
			  else this.oHouse2[v_iter] = housePos;
		   }
  }
  ngAfterViewInit() {
	let ges: string = '';
	let dob: string = this.btr.binf1.dob_short.split('T')[0];
	let tob = this.btr.binf1.dob_short.split('T')[1];
	let bh: number = Number(tob.split(':')[0]);
	let bm: number = Number(tob.split(':')[1]);
	let bs: number = Number(tob.split(':')[2].split('Z')[0]);
	this.bdt = new Date(Number(dob.split('-')[0]), Number(dob.split('-')[1])-1, Number(dob.split('-')[2]), bh, bm, bs); 
	let bt0:  BirthTimeRecfy = {
	id: 'BTR0',
	name: 'Birth Time before rectification',
	desc: '',
	res: this.btr.binf1.dob_short,
	style: 'blueText',
	fetch: false,
	rdt: null
	};
	this.oRecfy['BTR0'] = bt0;
	if(this.btr.binf2) {
			let bt3:  BirthTimeRecfy = {
			id: this.btr.id,
			name: '',
			desc: '',
			res: '',
			style: 'blueText',
			fetch: true,
			rdt: null
		};
		switch(this.btr.id)
		{
			case 'RGY':
				bt3.name = '3rd house sub-sub with younger co-born moon star';
				ges = 'Younger coborn';
				break;
			case 'RGE':
				bt3.name = '11th house sub-sub with elder co-born moon star';
				ges = 'Elder coborn';
				break;
			case 'RGM':
				bt3.name = '4th house sub-sub with Mother moon star';
				ges = 'Mother';
				break;
			case 'RGF':
				bt3.name = '9th house sub-sub with Father moon star';
				ges = 'Father';
				break;
			default:
				break;
		}
		this.oRecfy[this.btr.id] = bt3;
	} 
	let bt:  BirthTimeRecfy = {
	id: 'RAM',
	name: 'Lagna Sub-Sub with Moon Star',
	desc: '',
	res: '',
	style: 'blueText',
	fetch: true,
	rdt: null
	};
	this.oRecfy['RAM'] = bt;
	let bt2:  BirthTimeRecfy = {
	id: 'SML',
	name: 'Lagna, Sun & Moon signify 1-7-10',
	desc: '',
	res: '',
	style: 'blueText',
	fetch: true,
	rdt: null
	};
	this.oRecfy['SML'] = bt2;
	let bt4:  BirthTimeRecfy = {
	id: 'BTR',
	name: 'Rectified Birth Time',
	desc: '',
	res: 'checking...',
	style: 'blueText',
	fetch: true,
	rdt: null
	};
	this.oRecfy['BTR'] = bt4;
	this.showBT = true; 
	var res = this.shareService.getAYNM();
	if(res) this.ayanid = Number(res);
	this.oRecfy['RAM'].res = 'Getting the natives birth chart...';
  this.horoService.getCuspsEx(this.btr.binf1.lat, this.btr.binf1.lng, this.btr.binf1.dob_short, this.btr.binf1.timezone, this.btr.binf1.dstofset, this.ayanid)
	.subscribe(res1 => {
		console.log('res1', res1);
		this.oRecfy['RAM'].res = 'Completed';
		this.getPPOS(res1['planetPos'], true);
		this.getHPOS(res1['housePos'], true);
		this.oRecfy[this.btr.id].res = 'Getting ' + ges + ' birth chart...';
		if(this.btr.binf2 != null) {
			this.oRecfy['RAM'].fetch = false;
			this.horoService.getCuspsEx(this.btr.binf2.lat, this.btr.binf2.lng, this.btr.binf2.dob_short, this.btr.binf2.timezone, this.btr.binf2.dstofset, this.ayanid)
			.subscribe(res2 => {
				console.log('res2', res2);
				this.oRecfy[this.btr.id].res = 'Completed';
				this.getPPOS(res2['planetPos'], false);
				this.getHPOS(res2['housePos'], false);
				console.log('oHouse1', this.oHouse1);
				if(this.oHouse1.length > 0) {
					this.oRdtf = [];
					this.oRdtb = [];
					this.oRecfy[this.btr.id].res = 'Finding SSSLs...';
					this.processBTR(this.btr.id, this.ntks);
					this.ntks += 5;
					this.oRecfy[this.btr.id].res = 'Collected SSSLs matching ' + this.ntks.toString() + ' mins time radius';
					//let mo: string = this.get_sgn(this.oPlanet2['moon'].pos);
					//for(let i = 0; i < oRdtf.length; i++) {
						//this.processBTR('RAM', this.ntks);
						//this.ntks += 5;
						//this.oRecfy['RAM'].res = 'Collected SSSLs matching ' + this.ntks.toString() + ' mins time radius';
						this.processSML();
					//}
				}
			});
		} else {
			this.oRdtf = [];
			this.oRdtb = [];
			this.oRecfy[this.btr.id].res = 'Finding SSSLs...';
			this.oRecfy[this.btr.id].fetch = true;
			 this.processBTR(this.btr.id, this.ntks);
			 this.ntks += 5;
			this.oRecfy[this.btr.id].res = 'Collected SSSLs matching ' + this.ntks.toString() + ' mins time radius';
			 this.oRecfy['SML'].res = 'Verifying the Sun, Moon & Lagna..';
			   this.processSML();
		} 
	});

  }
  ngOnInit() {
	   this.btr = this.router.getCurrentNavigation().extras.state;
  }
  processSML() {
		  this.oRecfy['SML'].res = 'Calculating Lagna, this could take sometime..';
		  let fdob: string = '';
		  let bdob: string = '';
		  for(var i = 0; i < this.oRdtf.length; i++) fdob += this.oRdtf[i].rdt.getFullYear().toString() + '-' + (this.oRdtf[i].rdt.getMonth()+1).toString() + '-' + this.oRdtf[i].rdt.getDate().toString() + 'T' + this.oRdtf[i].rdt.getHours().toString() + ':' + this.oRdtf[i].rdt.getMinutes().toString()+ ':' + this.oRdtf[i].rdt.getSeconds().toString() + '|';
		  for(var i = 0; i < this.oRdtb.length; i++) bdob += this.oRdtb[i].rdt.getFullYear().toString() + '-' + (this.oRdtb[i].rdt.getMonth()+1).toString() + '-' + this.oRdtb[i].rdt.getDate().toString() + 'T' + this.oRdtb[i].rdt.getHours().toString() + ':' + this.oRdtb[i].rdt.getMinutes().toString()+ ':' + this.oRdtb[i].rdt.getSeconds().toString() + '|';
		  console.log('fdob', fdob);
		  console.log('bdob', bdob);
		  this.horoService.recfyBTSML(fdob, bdob, this.btr.binf1.lat, this.btr.binf1.lng, this.btr.binf1.timezone, this.btr.binf1.dstofset, this.ayanid)
					.subscribe(res => {
						let rbt1: string = '';
						let rbt2: string = '';
						let rem1: string = res['rem'].split('|')[0];
						let rem2: string = (res['rem'].indexOf('|') > -1) ? res['rem'].split('|')[1] : 'NOT SIGNIFY';
						this.oRecfy['SML'].res = 'Lagna identified ' + res['recfyDOB'];
						if(rem1 != 'NOT SIGNIFY') {
							rbt1 = res['recfyDOB'].split('|')[0];
						} else {
							
						}
						if(rem2 != 'NOT SIGNIFY') {
							rbt2 = res['recfyDOB'].split('|')[1];
						} else {
							
						}
						if(rbt1 != '' && rbt2 != '') {
							//var dt = new Date(Number(this.btr.binf1.dob_short.split('T')[0].split('-')[0]), Number(this.btr.binf1.dob_short.split('T')[0].split('-')[1]), Number(this.btr.binf1.dob_short.split('T')[0].split('-')[2]), Number(this.btr.binf1.dob_shot.split('T')[1].split(':')[0]),Number(this.btr.binf1.dob_short.split('T')[1].split(':')[1]), Number(this.btr.binf1.dob_short.split('T')[1].split(':')[2]));  
								var dt1 = new Date(Number(rbt1.split('T')[0].split('-')[0]), Number(rbt1.split('T')[0].split('-')[1]), Number(rbt1.split('T')[0].split('-')[2]), Number(rbt1.split('T')[1].split(':')[0]),Number(rbt1.split('T')[1].split(':')[1]), Number(rbt1.split('T')[1].split(':')[2]));  
								var dt2 = new Date(Number(rbt2.split('T')[0].split('-')[0]), Number(rbt2.split('T')[0].split('-')[1]), Number(rbt2.split('T')[0].split('-')[2]), Number(rbt2.split('T')[1].split(':')[0]),Number(rbt2.split('T')[1].split(':')[1]), Number(rbt2.split('T')[1].split(':')[2]));  
								let d1: number =  Math.abs(dt1.valueOf() - this.bdt.valueOf());
								let d2: number = Math.abs(this.bdt.valueOf() - dt2.valueOf());
								this.oRecfy['SML'].res = (dt1 < dt2) ? rem1: rem2;
								this.oRecfy['SML'].style = 'greenText';
								this.oRecfy['BTR'].fetch = false;
									this.oRecfy['BTR'].res = (dt1 < dt2) ? 'The rectified birth time is ' +  rbt1 : 'The rectified birth time is ' +  rbt2 ;
									this.oRecfy['BTR'].style = 'greenText';
								this.oRecfy[this.btr.id].res = 'Completed';
								this.oRecfy[this.btr.id].fetch = false;
							this.oRecfy['SML'].fetch = false;
						} else if(rbt1 != '') {
							//if(this.btr.id == 'RAM') {
								this.oRecfy['BTR'].res = 'The rectified birth time is ' +  rbt1;
								this.oRecfy['BTR'].style = 'greenText';
								this.oRecfy['SML'].res = rem1;
								this.oRecfy['SML'].style = 'greenText';
								this.oRecfy[this.btr.id].res = 'Completed';
								this.oRecfy[this.btr.id].fetch = false;
								this.oRecfy['SML'].fetch = false;
								this.oRecfy['BTR'].fetch = false;
								//this.getBTR(dt1);
							//} else {
							//	this.oRecfy['BTR'].res = 'The rectified birth time is ' +  rbt1;
							//	this.oRecfy['BTR'].style = 'greenText';
							//	this.oRecfy[this.btr.id].res = 'Completed';
							//	this.oRecfy[this.btr.id].fetch = false;
							//	this.oRecfy['SML'].fetch = false;
							//	this.oRecfy['BTR'].fetch = false;
								//this.oRecfy['RAM'].res = 'Finding SSSLs...';
								//this.processBTR('RAM', this.ntks);
								//this.ntks += 5 
								//this.oRecfy['RAM'].res = 'Collected SSSLs matching ' + this.ntks.toString() + ' mins time radius';
							//}
						} else if(rbt2 != '') {
							//if(this.btr.id == 'RAM') {
								this.oRecfy['BTR'].res = 'The rectified birth time is ' +  rbt2 ;
								this.oRecfy['BTR'].style = 'greenText';
								this.oRecfy['SML'].res = rem2;
								this.oRecfy['SML'].style = 'greenText';
								this.oRecfy[this.btr.id].res = 'Completed';
								this.oRecfy[this.btr.id].fetch = false;
								this.oRecfy['SML'].fetch = false;
								this.oRecfy['BTR'].fetch = false;
								//this.getBTR(dt2);
							//} else {
								//this.oRecfy[this.btr.id].res = 'Completed';
								//this.oRecfy[this.btr.id].fetch = false;
								//this.oRecfy['RAM'].res = 'Finding SSSLs...';
								//this.processBTR('RAM', this.ntks);
								//this.ntks += 5 
								//this.oRecfy['RAM'].res = 'Collected SSSLs matching ' + this.ntks.toString() + ' mins time radius';
							//}
						} else {
							if(rem1.indexOf('ERROR') > -1) {
								this.oRecfy['BTR'].res = 'Could not rectify Birth Time '  + rem1;
								this.oRecfy['BTR'].style = 'redText';
								this.oRecfy[this.btr.id].res = 'Failed';
								this.oRecfy[this.btr.id].fetch = false;
								this.oRecfy['SML'].fetch = false;
								this.oRecfy['BTR'].fetch = false;
							} else if(rem2.indexOf('ERROR') > -1){
								this.oRecfy['BTR'].res = 'Could not rectify Birth Time '  + rem2;
								this.oRecfy['BTR'].style = 'redText';
								this.oRecfy[this.btr.id].res = 'Failed';
								this.oRecfy[this.btr.id].fetch = false;
								this.oRecfy['SML'].fetch = false;
								this.oRecfy['BTR'].fetch = false;
							} else {
								this.oRdtf = [];
								this.oRdtb = [];
								//if(this.btr.id == 'RAM') {
									this.oRecfy[this.btr.id].res = 'Finding SSSLs...';
									this.processBTR(this.btr.id, this.ntks);
									this.ntks += 5 
									this.oRecfy[this.btr.id].res = 'Collected SSSLs matching ' + this.ntks.toString() + ' mins time radius';
								//} else {
									//this.oRecfy[this.btr.id].res = 'Finding SSSLs...';
									//this.processBTR(this.btr.id, this.ntks2);
									//this.ntks2 +=5;
									//this.oRecfy[this.btr.id].res = 'Collected SSSLs matching ' + this.ntks2.toString() + ' mins time radius';
								//}
								this.processSML();
							}
					}
		 });
   }
   getBTR(dt)
   {
   }
  getSMLPos(res, fw)
  {
			let sml: any = {};
				  let ppos = res['planetPos'];
				  let hpos = res['housePos'];
				   this.getPPOS(ppos, fw);
				   this.getHPOS(hpos, fw);
				  //let hpos: any = this.getTHPOS(res['housePos']);
				  sml.su = '';
				  sml.asc = '';
				  sml.mo = '';
				  sml.su_deg = 0;
				  sml.asc_deg= 0;
				  sml.mo_deg = 0;
			for(let sign  of Object.keys(ppos)) {
					var pls = ppos[sign].split('\|');
					console.log(pls);
					for (var k = 0; k < pls.length; k++) {
						var pl = pls[k].split(' ')[1];
						var pos = pls[k].split(' ')[0].trim();
						console.log(pl, pos);
						if(pl == 'AC' || pl == 'Su' || pl == 'Mo') {
							let dval: number = 0;
							if(pos.indexOf('.') > -1 && pos.split('.')[1] != '')
							  dval = this.dmsToDec(this.signs_pos_v[sign]+Number(pos.split('.')[0]), Number(pos.split('.')[1]), Number(pos.split('.')[2]));
							else
							  dval = Number(pos);
						  if(pl == 'AC') { sml.asc = sign; sml.asc_deg = dval; }
						  if(pl == 'Su') { sml.su = sign; sml.su_deg = dval; }
						  if(pl == 'Mo') { sml.mo = sign; sml.mo_deg = dval; }
						}
					}
					if(sml.asc != '' && sml.su != '' && sml.mo != '') break;
			}
	  sml.hpos1 = 0;
	  sml.hpos2 = 0;
		   for(let key of Object.keys(hpos)) {
			  let v_iter: number = Number(key);
			  let dval: number = 0;
			  var dmslat = hpos[v_iter];
			  dval = this.dmsToDec(Number(dmslat.split("°")[0]), Number(dmslat.split("°")[1].split("'")[0]), Number(dmslat.split("°")[1].split("'")[1].split('"')[0]));
			  if(v_iter == 1) sml.hpos1 = dval;
			  else if(v_iter == 2) sml.hpos2 = dval;
			  if(sml.hpos1 != 0 && sml.hpos2 != 0) break;
		   }
			
				 let s1: string = this.getSSSL(sml.mo_deg);
	  console.log('moon ssl', s1)
	  sml.mslrd = s1.split('-')[1]; 
				 s1 = this.getSSSL(sml.su_deg);
	  console.log('sun ssl', s1)
	  sml.sslrd = s1.split('-')[1]; 
				 s1 = this.getSSSL(sml.hpos1);
	  console.log('asc ssl', s1)
	  sml.aslrd = s1.split('-')[0]; 
      let ssl_deg: number = 0;
	  let msl_deg: number = 0;
			for(let sign  of Object.keys(ppos)) {
					var pls = ppos[sign].split('\|');
					console.log(pls);
					for (var k = 0; k < pls.length; k++) {
						var pl = pls[k].split(' ')[1];
						var pos = pls[k].split(' ')[0].trim();
						if(pl.toLowerCase() == sml.sslrd.substring(0,2).toLowerCase() || pl.toLowerCase() == sml.mslrd.substring(0,2).toLowerCase()) {
							let dval: number = 0;
							if(pos.indexOf('.') > -1 && pos.split('.')[1] != '')
							  dval = this.dmsToDec(this.signs_pos_v[sign]+Number(pos.split('.')[0]), Number(pos.split('.')[1]), Number(pos.split('.')[2]));
							else
							  dval = Number(pos);
							if(pl.toLowerCase() == sml.sslrd.substring(0,2).toLowerCase()) sml.ssl_deg = dval; 
							if(pl.toLowerCase() == sml.mslrd.substring(0,2).toLowerCase()) sml.msl_deg = dval; 
						}
					}
					if(sml.ssl_deg != 0 && sml.msl_deg != 0) break;
			}
			
		   return sml;
  }
  getHSIGS(apos, spos, asgn, fw)
  {
	  console.log('apos', apos);
	  console.log('spos', spos);
	  console.log('asgn', asgn);
		let hsig: string[] = [];
		let sigs: number = 0;
		var pls_in_h = this.get_pls_in_hou_ex(apos, spos, fw);
		console.log('get_pls_in_hou_ex', pls_in_h);
		if(pls_in_h != '') {
		} else {
		}
		var pls_in_str = this.get_pls_in_star_occ(pls_in_h, fw);
		console.log('get_pls_in_star_occ', pls_in_str);
		var pls_in_str_o = this.get_pls_in_star(asgn, fw);
		console.log('get_pls_in_star', pls_in_str_o);
		var hou_owner = asgn;
		for(var s = 0; s < pls_in_str.split(',').length; s++) {
		   hsig[sigs++] = pls_in_str.split(',')[s];
		}
	   let bf: boolean = false;
		var pnets = pls_in_h.split(',');
		for(var s =0; s < pnets.length; s++) {
			bf = false;
			for(var s1 = 0; s1 < sigs; s1++) {
			 if(hsig[s1] == pnets[s]) {
				bf = true;
			 }
			}
			if(!bf) hsig[sigs++] = pnets[s];
		}
		pnets = pls_in_str_o.split(',');
		for(var s =0; s < pnets.length; s++) {
			bf = false;
			for(var s1 = 0; s1 < sigs; s1++) {
			 if(hsig[s1] == pnets[s]) {
				bf = true;
			 }
			}
			if(!bf) hsig[sigs++] = pnets[s];
		}
		bf = false;
		for(var s = 0; s < sigs; s++) {
		 if(hsig[s] == hou_owner) {
			bf = true;
		 } 
		}
		if(!bf) hsig[sigs++] = hou_owner;
		let h_sigs: string = '';
		for(var h = 0; h < sigs; h++)
			h_sigs += hsig[h] + ',';
		return h_sigs;
   }
  getSIGS(pl, ps, ppos, pspos, fw)
  {
	  console.log('pl', pl);
	  console.log('ps', ps);
	  console.log('ppos', ppos);
	  console.log('pspos', pspos);
	   let psig: number[] = [];
	   let sigs: number = 0;
	   var sl_hno = this.get_hno_by_pos(pspos, fw);
	   console.log('get_hno_by_pos(sl)', sl_hno);
	   var hno = this.get_hno_by_pos(ppos, fw);
	   console.log('get_hno_by_pos', hno);
	   var sl_own_hnos = this.get_own_houses(ps, fw);
	   console.log('get_own_houses(sl)', sl_own_hnos);
	   var pl_own_hnos = this.get_own_houses(pl, fw);
	   console.log('get_own_houses', pl_own_hnos);
	   psig[sigs++] = Number(sl_hno);
	   let bf: boolean = false;
	   for(var s = 0; s < sigs; s++) {
		 if(psig[s] == Number(hno)) {
			bf = true;
		 }
	   }
	   bf = false;
	   if(!bf) psig[sigs++] = Number(hno);
	   var hnums = sl_own_hnos.split(',');
	   for(var s = 0; s < hnums.length; s++) {
		 if(hnums[s] == '') continue;
		bf = false;
		for(var s1 = 0; s1 < sigs; s1++) {
		 if(psig[s1] == Number(hnums[s])) {
			bf = true;
		 }
		}
		if(!bf) psig[sigs++] = Number(hnums[s]);
	   }		   
	   hnums = pl_own_hnos.split(',');
	   for(var s = 0; s < hnums.length; s++) {
		 if(hnums[s] == '') continue;
		bf = false;
		for(var s1 = 0; s1 < sigs; s1++) {
		 if(psig[s1] == Number(hnums[s])) {
			bf = true;
		 }
		}
		if(!bf) psig[sigs++] = Number(hnums[s]);
	   }
		for (var i = 0; i < sigs; ++i) 
		{
			for (var j = i + 1; j < sigs; ++j) 
			{
				if (psig[i] > psig[j]) 
				{
					let a: number = psig[i];
					psig[i] = psig[j];
					psig[j] = a;
				}
			}
		}
	   let p_sigs: string = '';
	   for(var s = 0; s < sigs; s++) {
		p_sigs += psig[s].toString() + ',';
	   }
	   return p_sigs;
 }
  checkSML(su, su_deg, mo, mo_deg, asc, asc_deg, sslrd_deg, mslrd_deg, sslrd, mslrd, aslrd, hpos1, hpos2, fw)
  {
	  //this.oRecfy['SML'].res = 'Checking Sun, Moon, Asc SSSL signify 1-7-10...';
	  //let mdeg = mo_deg;//this.dmsToDec(this.signs_pos_v[mo]+Number(mo_deg.split('.')[0]), Number(mo_deg.split('.')[1]), Number(mo_deg.split('.')[2]));
	  //this.oRecfy['SML'].res = 'Getting Moon SSSL...';
	  //console.log('getting moon ssl', mo_deg)
	 // let s1: string = this.getSSSL(mo_deg);
	  //console.log('moon ssl', s1)
	  //let mslrd = s1.split('-')[1]; 
	//  let mslrd_sgn: string ='';
	  //let mslrd_deg: string = ''; 
	  //for(let key  of Object.keys(this.oPlanet1)) {
	//		 if(key == mslrd) {
	//				//mslrd_sgn = this.oPlanet1[key].sign;
	//				mslrd_deg = this.oPlanet1[key].pos;
	//			break;
	//		}
	//   }
	  //let msdeg = mslrd_deg;//this.dmsToDec(this.signs_pos_v[mslrd_sgn]+Number(mslrd_deg.split('.')[0]), Number(mslrd_deg.split('.')[1]), Number(mslrd_deg.split('.')[2]));

	  //let sdeg = su_deg;//this.dmsToDec(this.signs_pos_v[su]+Number(su_deg.split('.')[0]), Number(su_deg.split('.')[1]), Number(su_deg.split('.')[2]));
	  //this.oRecfy['SML'].res = 'Getting Sun SSSL...';
	  //s1 = this.getSSSL(su_deg);
	  //let sslrd = s1.split('-')[1]; 
	  //let sslrd_sgn: string ='';
	  //let sslrd_deg: string = ''; 
	  //for(let key  of Object.keys(this.oPlanet1)) {
	  //		 if(key == sslrd) {
	  //				//sslrd_sgn = this.oPlanet1[key].sign;
	  //				sslrd_deg = this.oPlanet1[key].pos;
	//			break;
	//		}
	//  }
	  //let ssdeg = sslrd_deg;//this.dmsToDec(this.signs_pos_v[sslrd_sgn]+Number(sslrd_deg.split('.')[0]), Number(sslrd_deg.split('.')[1]), Number(sslrd_deg.split('.')[2]));

	  //let adeg = this.dmsToDec(this.signs_pos_v[asc]+Number(asc_deg.split('.')[0]), Number(asc_deg.split('.')[1]), Number(asc_deg.split('.')[2]));
	  //this.oRecfy['SML'].res = 'Getting Ascendant SSSL...';
	  //s1 = this.getSSSL(asc_deg);
	  //let aslrd = s1.split('-')[1]; 
	  
	  let susigs: string = this.getSIGS('sun', sslrd, su_deg, sslrd_deg, fw);
	  let mosigs: string = this.getSIGS('moon', mslrd, mo_deg, mslrd_deg, fw);
	  //let hdeg = this.dmsToDec(Number(this.hpos1[2].split("°")[0]), Number(this.hpos1[2].split("°")[1].split("'")[0]), Number(this.hpos1[2].split("°")[1].split("'")[1].split('"')[0]));

	  let ahsigs: string = this.getHSIGS(hpos1, hpos2, aslrd, fw);
	  console.log('ahsigs', ahsigs);
	  let asgs = ahsigs.split(',');
	  let acsigs: string = '';
	  for(var i =0; i < asgs.length; i++) {
		  if(asgs[i] == '') continue;
		  else console.log('asgs[i]', asgs[i]);
		  acsigs += this.getSIGS(asgs[i], this.oPlanet1[asgs[i]].star, this.oPlanet1[asgs[i]].pos, this.oPlanet1[this.oPlanet1[asgs[i]].star].pos, fw);
	  }
	  let sig1: boolean = false;
	  let sig7: boolean = false;
	  let sig10: boolean = false;
	  console.log('susigs', susigs);
	  console.log('mosigs', mosigs);
	  console.log('acsigs', acsigs);
	  let ssigs: string[] = susigs.split(',');
	  let msigs: string[] = mosigs.split(',');
	  let asigs: string[] = acsigs.split(',');
	  for(var i = 0; i < ssigs.length; i++) if(ssigs[i] == '1'){ sig1 = true; break;}
	  for(var i = 0; i < msigs.length; i++) if(msigs[i] == '1'){ sig1 = true; break;}
	  for(var i = 0; i < asigs.length; i++) if(asigs[i] == '1'){ sig1 = true; break;}
	  for(var i = 0; i < ssigs.length; i++) if(ssigs[i] == '7'){ sig7 = true; break;}
	  for(var i = 0; i < msigs.length; i++) if(msigs[i] == '7'){ sig7 = true; break;}
	  for(var i = 0; i < asigs.length; i++) if(asigs[i] == '7'){ sig7 = true; break;}
	  for(var i = 0; i < ssigs.length; i++) if(ssigs[i] == '10'){ sig10 = true; break;}
	  for(var i = 0; i < msigs.length; i++) if(msigs[i] == '10'){ sig10 = true; break;}
	  for(var i = 0; i < asigs.length; i++) if(asigs[i] == '10'){ sig10 = true; break;}
	  if(sig1 && sig7 && sig10) {
		  this.oRecfy['SML'].res = 'Sun (' + susigs + ')' +', Moon(' + mosigs + ')' + '& Lagna(' + acsigs + ')' + ' signifies 1-7-10 houses';
		  this.oRecfy['SML'].style = 'greenText';
		  this.oRecfy['SML'].fetch = false;
		  return true;
	  } else {
		  this.oRecfy['SML'].res = 'Sun (' + susigs + ')' +', Moon(' + mosigs + ')' + '& Lagna(' + acsigs + ')' + ' does not signify 1-7-10 houses';
		  this.oRecfy['SML'].style = 'redText';
		  this.oRecfy['SML'].fetch = false;
		  return false;
	  }
  }
  processBTR(id, tks)
  {
	  console.log('processBTR', id);
	 // let asc: string = '';
	  let mo: string = '';
	  //let asc_deg: number= 0;
	  let mo_deg: number= 0;
	  let ssgn: string = '';
	  //let tsgn: string = ''; 
	  let sdeg: number = 0;
	  //let tdeg: number = 0;
	  let recfy: boolean = false;
	  let lag_d: number = 0;// = this.signs_pos_v[ssgn]+Number(sdeg.split('.')[0]);
	  let lag_m: number = 0; //= Number(sdeg.split('.')[1]);
	  let lag_s: number = 0;//Number(sdeg.split('.')[2]);
	  if(id == 'RAM') {
		//  asc = this.oHouse1[1].sign;
		//  asc_deg = this.oHouse1[1].pos;
		  mo = this.oPlanet1['moon'].sign;
		  mo_deg = this.oPlanet1['moon'].pos
		  	lag_d  = this.signs_pos_v[this.asc_sgn]+Number(this.asc_pos.split('.')[0]);//Number(this.oHouse1[1].dmspos.split("°")[0]);
			lag_m = Number(this.asc_pos.split('.')[1]);//Number(this.oHouse1[1].dmspos.split("°")[1].split("'")[0]);
			lag_s = Number(this.asc_pos.split('.')[2]);//Number(this.oHouse1[1].dmspos.split("°")[1].split("'")[1].split('"')[0]);
	  } 
	  else if(id == 'RGY' || id == 'RGE' || id == 'RGM' || id == 'RGF') {
	//	asc = this.oHouse1[1].sign;
	//	asc_deg = this.oHouse1[1].pos;
		  mo = this.oPlanet2['moon'].sign;
		  mo_deg = this.oPlanet2['moon'].pos
		  let gcp: number = -1;
		  switch(this.btr.id)
		  {
			  case 'RGY':
			     gcp = 3;
				 break;
			  case 'RGE':
			     gcp = 11;
				 break;
			  case 'RGM':
			     gcp = 4;
				 break;
			  case 'RGF':
			     gcp = 9;
				 break;
			  default:
			     break;
		  }
		  //sdeg = this.dmsToDec(Number(this.hpos1[gcp].split("°")[0]), Number(this.hpos1[gcp].split("°")[1].split("'")[0]), Number(this.hpos1[gcp].split("°")[1].split("'")[1].split('"')[0]));
		  	lag_d  = Number(this.oHouse1[gcp].dmspos.split("°")[0]);
			lag_m = Number(this.oHouse1[gcp].dmspos.split("°")[1].split("'")[0]);
			lag_s = Number(this.oHouse1[gcp].dmspos.split("°")[1].split("'")[1].split('"')[0]);
	  }
	  let mdeg = mo_deg;//this.dmsToDec(this.signs_pos_v[mo]+Number(mo_deg.split('.')[0]), Number(mo_deg.split('.')[1]), Number(mo_deg.split('.')[2]));
	  let s1: string = this.getSSSL(mdeg);
	  console.log('mo SSSL', s1);
	  let mslrd = s1.split('-')[1]; 
	  let mslrdp: string = '';
	  let msl_sign: string = '';
	  let msl_deg: string = '';
	  if(id == 'RAM') {
		  for(let key  of Object.keys(this.oPlanet1)) {
			  if(key == mslrd) {
				  msl_sign = this.oPlanet1[key].sign;
				  msl_deg = this.oPlanet1[key].pos;
				  break;
			  }
		  }
	  } else {
		  for(let key  of Object.keys(this.oPlanet2)) {
			  if(key == mslrd) {
				  msl_sign = this.oPlanet2[key].sign;
				  msl_deg = this.oPlanet2[key].pos;
				  break;
			  }
		  }
	  }
	  let msldeg = msl_deg;//this.dmsToDec(this.signs_pos_v[msl_sign]+Number(msl_deg.split('.')[0]), Number(msl_deg.split('.')[1]), Number(msl_deg.split('.')[2]));
	  let sm: string = this.getSSSL(msldeg);
	  var mssl = s1.split('-');
	  var msssl = sm.split('-');
	  let fwd: boolean = true;
	  this.oRecfy['BTR'].res = 'Processing..';
	  this.oRecfy['BTR'].style = 'blueText';
	  this.oRecfy['BTR'].fetch = false;
	  
	  //while(1) {
		  this.recfyBT(lag_d, lag_m, lag_s, mssl[1], msssl, tks, true, id);
		  this.recfyBT(lag_d, lag_m, lag_s, mssl[1], msssl, tks, false, id);
		  //if(this.oRdt.length > 0) {
		//	this.oRdt[0].fetch = false;
		//	this.oRecfy[this.oRdt[0].id].res = 'Fetching Sun, Moon, Lagna for ' +  this.oRdt[0].rdt.toString();
		//	this.applySMLF(this.oRdt[0].rdt);
		//  }
		//  if(this.oRdtb.length > 0) {
		//	this.oRdtb[0].fetch = false;
		//	this.oRecfy[this.oRdt[0].id].res = 'Fetching Sun, Moon, Lagna for ' +  this.oRdtb[0].rdt.toString();
		//	this.applySMLB(this.oRdtb[0].rdt);
		//  }
	}
		  //if(!dtks.recfy) dtks = this.recfyBT(lag_d, lag_m, lag_s, mssl[1], msssl, tks+=5, fwd = !fwd, id);
		  //if(!dtks.recfy) dtks = this.recfyBT(lag_d, lag_m, lag_s, mssl[1], msssl, tks, fwd = !fwd, id);
		  //if(!dtks.recfy) dtks = this.recfyBT(lag_d, lag_m, lag_s, mssl[1], msssl, tks+=10, fwd = !fwd, id);
		  //if(!dtks.recfy) dtks = this.recfyBT(lag_d, lag_m, lag_s, mssl[1], msssl, tks, fwd = !fwd, id);
		  //if(!dtks.recfy) dtks = this.recfyBT(lag_d, lag_m, lag_s, mssl[1], msssl, tks+=15, fwd = !fwd, id);
		  //if(!dtks.recfy) dtks = this.recfyBT(lag_d, lag_m, lag_s, mssl[1], msssl, tks, fwd = !fwd, id);
		 // else {
		//	  console.log('tks', tks);
		//	  console.log('ntk', dtks.ntk);
		//	  console.log('fw', dtks.fw);
		//	  this.ntks = (dtks.fw == true) ? (tks+dtks.ntk) : tks -dtks.ntk;;
		//	  console.log('BTR', this.btr.binf1.dob_short);
		//	  let rscs: number = this.ntks*15;
		//	  let dob: string = this.btr.binf1.dob_short.split('T')[0];
		//	  let tob = this.btr.binf1.dob_short.split('T')[1];
		//	  let bh: number = Number(tob.split(':')[0]);
		//	  let bm: number = Number(tob.split(':')[1]);
		//	  let bs: number = Number(tob.split(':')[2].split('Z')[0]);
		//	  this.rdt= new Date(Number(dob.split('-')[0]), Number(dob.split('-')[1])-1, Number(dob.split('-')[2]), bh, bm, bs); 
		//	  this.rdt.setSeconds(this.rdt.getSeconds() + rscs);
		//      let ayanid: number = 4;
		//	  var res = this.shareService.getAYNM();
		//	  if(res) ayanid = Number(res);
		//	  this.ntks = (fw == true) ? (tk+ntk) : tk -ntk;;
		//	  console.log('BTR', this.btr.binf1.dob_short);
			  //let rscs: number = this.ntks*15;
			  //let dob: string = this.btr.binf1.dob_short.split('T')[0];
			  //let tob = this.btr.binf1.dob_short.split('T')[1];
			  //let bh: number = Number(tob.split(':')[0]);
			  //let bm: number = Number(tob.split(':')[1]);
			  //let bs: number = Number(tob.split(':')[2].split('Z')[0]);
			  //this.rdt= new Date(Number(dob.split('-')[0]), Number(dob.split('-')[1])-1, Number(dob.split('-')[2]), bh, bm, bs); 
			  //this.rdt.setSeconds(this.rdt.getSeconds() + rscs);
		      //console.log('rdt', this.rdt.toString());
		      //this.oRecfy['SML'].res = 'getting the positions of lagna, sun & moon with corrected birth time ' + this.rdt.toString();
		//      this.horoService.getCuspsEx(this.btr.binf1.lat, this.btr.binf1.lng, this.rdt.getFullYear() + '-' + (this.rdt.getMonth()+1).toString() + '-' + this.rdt.getDate() + 'T' + this.rdt.getHours() + ':' + this.rdt.getMinutes()+ ':' + this.rdt.getSeconds()+'Z', this.btr.binf1.timezone, this.btr.binf1.dstofset, ayanid)
		//.subscribe(resp => {
		//	console.log('resp', resp);
		//			if(this.applySML(resp)) {
		//			this.oRecfy[id].fetch = false;
		//				return rcf;
		//			} else {
		//				continue;
		//			}
		//	  });
		 //}
		  //if(tks < 16) tks += 5;
		  //else break;
	  //}
  
  async recfyBT(lag_d, lag_m, lag_s, ms, msl, tk, fw, id)
  {
	  let sdeg = this.dmsToDec(lag_d, lag_m, lag_s);
	  console.log('recfyBT', id + ',' + lag_d.toString() + ',' + lag_m.toString() + ',' + lag_s.toString() + ',' + ms + ',' + msl + ',' + tk.toString());
	  let arcsecs: number = tk*60*15;
	  let arcdegs: number = arcsecs/3600;
	 console.log('arcdegs', arcdegs);
	  let deg: number = lag_d;
	  let min: number = lag_m;
	  let sec: number = lag_s;
	 if(arcdegs > 0) {
	  if(fw) sdeg += arcdegs;
	  else sdeg -= arcdegs;
	  let dmslat = this.shareService.getDms(sdeg);
	 console.log('dmslat', dmslat);
	 deg = Number(dmslat.split("º")[0]);
	 min = Number(dmslat.split("º")[1].split("'")[0]);
	 sec = Number(dmslat.split("º")[1].split("'")[1].split('"')[0]);
	  console.log('new dms', deg.toString() + ',' + min.toString() + ',' + sec.toString());
	 }
	  //let sd = this.dmsToDec(lag_d, lag_m, lag_s);
	  //let sdeg: number = (fw == true) ? sd + arcdegs : sd - arcdegs; 
	  let pdeg: number = 0;
	  let rcf: any = {};
	  rcf.recfy = false;
	  let ntk: number = 0;
	  this.oRecfy[id].fetch = false;
	  if(fw)
		this.oRecfy[id].res = 'Finding SSSL links within ' + (tk).toString() + ' to ' + (tk+5).toString();
	else 
		this.oRecfy[id].res = 'Finding SSSL links within ' + (tk).toString() + ' to ' + (tk - 5).toString();
	  while(ntk < 4500) {
		  if(sdeg != pdeg) {
			  sdeg = pdeg;
			  console.log(this.oRecfy[id].res);
			  let s2: string = this.getSSSL(sdeg);
			  this.oRecfy[id].res = 'SSSL is ' + s2.toString();
			  console.log(this.oRecfy[id].res);
			  if(s2.split('-')[3] == ms) {
						//this.oRecfy[id].res = 'collecting...';
						console.log(this.oRecfy[id].res);
						//this.oRecfy[id].fetch = false;
						//rcf.recfy = true;
						//rcf.dms = lag_d.toString() + '.' + lag_m.toString() + '.' + lag_s.toString();
						//rcf.ntk = ntk;
						//rcf.fw = fw;
						//break;
						this.addCBT(id, tk, ntk, fw, 'sub-sub ' + ms + ' matched with moon star');
			//});
			  } else if(s2.split('-')[3] == msl[1] || s2.split('-')[3] == msl[2] || s2.split('-')[3] == msl[3]) {
						//this.oRecfy[id].fetch = false;
						//rcf.recfy = true;
						//rcf.dms = lag_d.toString() + '.' + lag_m.toString() + '.' + lag_s.toString();
						//rcf.ntk = ntk;
						//rcf.fw = fw;
						//this.oRecfy[id].res = 'collecting...';
						console.log(this.oRecfy[id].res);
						this.addCBT(id, tk, ntk, fw, 'sub-sub ' + ms + ' matched with moon SSL');
			}
	      }
				ntk++;
				if(fw) { sec++;} else { sec--;}
				if(sec > 59) {
					sec = sec -59;
					min++;
					if(min > 59) {
						min = 0;
						deg++;
					}
				}
				else if(sec < 0) {
					sec = 60+sec;
					min--;
					if(min < 0) {
						min = 60+min;
						deg--;
					}
				}
			   if(deg >= 360) {
				   deg = 0;
				   min = 0;
				   sec = 0;
			   } else if(lag_d < 0) {
				   deg = 360+deg;
				   min = 59;
				   sec = 59;
			   }
			   console.log('ntk', ntk);
			   console.log('d m s', deg.toString() + ' ' + min.toString() + '  ' + sec.toString());
			   pdeg = this.dmsToDec(deg, min, sec);
			   console.log('pdeg', pdeg);
	  }
	  this.oRecfy[id].fetch = false;
	  return rcf;
    }
	addCBT(id, tk, ntk, fw, res)
	{
	   let tksecs: number = tk*60;	
  	   let ayanid: number = 4;
		var ares = this.shareService.getAYNM();
		if(ares) ayanid = Number(ares);
			  let rscs: number = ntk/15;
			  var rdt = new Date(this.bdt.getTime());
			  if(fw) rdt.setSeconds(rdt.getSeconds() + tksecs + rscs);
			  else rdt.setSeconds(rdt.getSeconds() - tksecs - rscs);
		console.log('rdt', rdt.toString());
				  let cbt:  BirthTimeRecfy = {
					id: id,
					name: '',
					desc: '',
					res: res,
					style: 'blueText',
					fetch: true,
					rdt: rdt 
				};
				if(fw) this.oRdtf.push(cbt);
				else this.oRdtb.push(cbt);
	}
	//verifySML(tks, dtks, res) {
	//		  this.ntks = (dtks.fw == true) ? (tks+dtks.ntk) : tks -dtks.ntk;;
	//		  console.log('BTR', this.btr.binf1.dob_short);
	//		  let rscs: number = this.ntks*15;
	//		  let dob: string = this.btr.binf1.dob_short.split('T')[0];
	//		  let tob = this.btr.binf1.dob_short.split('T')[1];
	//		  let bh: number = Number(tob.split(':')[0]);
	//		  let bm: number = Number(tob.split(':')[1]);
	//		  let bs: number = Number(tob.split(':')[2].split('Z')[0]);
	//		  this.rdt= new Date(Number(dob.split('-')[0]), Number(dob.split('-')[1])-1, Number(dob.split('-')[2]), bh, bm, bs); 
	//		  this.rdt.setSeconds(this.rdt.getSeconds() + rscs);
	//		  if(this.applySML(res)) {
	//			 return true;
	//		  }
	//		  return false;
	//}
    getSSSL(d)
	{
		for(let key of Object.keys(this.sublords_v))
		{
			var degs = this.sublords_v[key].deg;
			let d1 = this.dmsToDec(Number(degs.split('-')[0].split('.')[0]), Number(degs.split('-')[0].split('.')[1]), Number(degs.split('-')[0].split('.')[2])); 
			let d2 = this.dmsToDec(Number(degs.split('-')[1].split('.')[0]), Number(degs.split('-')[1].split('.')[1]), Number(degs.split('-')[1].split('.')[2])); 
			if(d >= d1 && d < d2) {
			   return this.sublords_v[key].sign + '-' + this.sublords_v[key].star + '-' + this.sublords_v[key].sub + '-' + this.sublords_v[key].ssub ;
			}
		}
		return '-1';
	}
	dmsToDec(d, m, s)
    {
       let v: number = d + (m /60) + (s /3600);
       return Number(v.toFixed(2));
    }
	get_pls_in_star(lord: string, fw)
	{
	  let oP = (fw == true ) ? this.oPlanet1 : this.oPlanet2;
	  console.log('get_pls_in_star(inside)', lord);
	  let pls: string = '';
	  for(let key of Object.keys(oP)) {
	    if(oP[key].star == lord) pls += key.toString() + ',';
	  }
	  return pls;
	}
	get_pls_in_star_occ(o_pls: string, fw)
	{
	  let oP = (fw == true ) ? this.oPlanet1 : this.oPlanet2;
	  console.log('get_pls_in_star_occ(inside)', o_pls);
	  let pls: string = '';
	  var o_p = o_pls.split(',');
	  for(var p = 0; p < o_p.length; p++) {
		for(let key of Object.keys(oP)) {
			if(oP[key].star == o_p[p]) pls += key.toString() + ',';
		}
	  }
	  return pls;
	}	
	get_pls_in_hou_ex(mins1: number, mins2: number, fw)
	{
	  let oP = (fw == true ) ? this.oPlanet1 : this.oPlanet2;
	  let pls: string = '';
	  for(let key of Object.keys(oP)) {
		 console.log(key, oP[key].pos);
		if(oP[key].pos >= mins1 && oP[key].pos < mins2) {  console.log(mins1, mins2); pls += key .toString()+ ',';}
		else if((mins1 > mins2) && ((oP[key].pos >= mins1 && oP[key].pos < 360) || (oP[key].pos >= 0 && oP[key].pos < mins2))) {
			console.log(mins1, mins2); 
			pls += key.toString() + ',';
		 }
	  }
	  return pls;
	}
	get_hno_by_pos(mins: any, fw)
	{
	let oH: any = (fw == true) ? this.oHouse1 : this.oHouse2;
	  for(let key of Object.keys(oH)) {
		let v_iter: number = Number(key);
		let cur_h: number = (v_iter == 12) ? 1: v_iter + 1;
		let mins1: number = oH[v_iter].pos;
		let mins2: number = oH[cur_h].pos;
		if(mins2 < mins1) {
		  if(mins >= 0 && mins < mins2) return v_iter;
		} else {
		   if(mins >= mins1 && mins < mins2) return v_iter;
		}
	  }
	  return (12);
	}
	get_sgn(pos) {
		for(let i =0; i < this.zpos.length; i++) if(pos >= this.zpos[i] && pos < this.zpos[i+1]) return this.znm[i]; 
	}
	get_own_houses(lord: string, fw)
	{
	  console.log('get_own_houses(inside)', lord)
	  let hno: string = '';
	  
	  if(fw) {
		  for(var i = 0; i < Object.keys(this.oHouse1).length; i++) {
			 console.log(this.oHouse1[i+1].sign);
			 let hn: number = i + 1;
			if(this.oHouse1[i+1].sign == lord) hno += hn.toString() + ',';
		  }
	  } else {
		  for(var i = 0; i < Object.keys(this.oHouse2).length; i++) {
			 console.log(this.oHouse2[i+1].sign);
			 let hn: number = i + 1;
			if(this.oHouse2[i+1].sign == lord) hno += hn.toString() + ',';
		  }
	  }
	  return hno;
	}
  	calcStarEx(val: number)
	{
		//console.log('calcStar', val);
		for(var i = 0; i < Object.keys(this.sublords_v).length; i++)
		{
			var nak = this.sublords_v[i];
			var degs = this.sublords_v[i].deg;
			var s_mins = this.dmsToDec(Number(degs.split('-')[0].split('.')[0]), Number(degs.split('-')[0].split('.')[1]), Number(degs.split('-')[0].split('.')[2]));
			var e_mins = this.dmsToDec(Number(degs.split('-')[1].split('.')[0]), Number(degs.split('-')[1].split('.')[1]), Number(degs.split('-')[1].split('.')[2]));
			if(val >= s_mins && val < e_mins) {
			   return nak.sign + '|' + nak.star + '|' + nak.sub;
			}
		}
		return '-1';
	}
}
