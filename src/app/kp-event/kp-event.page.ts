import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { DatePicker } from '@capacitor-community/date-picker';
import { ShareService } from '../share.service';
import { HoroscopeService } from '../horoscope.service';
import { PlanetTrans } from '../planet-trans';
import { PlanetPos } from '../planet-pos';
import { HousePos } from '../house-pos';
import * as hinf from '../hinf.json';
import * as sublords from '../sublords.json';
import * as signs from '../signs.json';
import * as signs_pos from '../signs_pos.json';
import * as o_rashis from '../o_rashis.json';
import * as o_signs from '../o_signs.json';
import * as ruler_name from '../ruler_name.json';
import { Group } from '../group';

@Component({
  selector: 'app-kp-event',
  templateUrl: './kp-event.page.html',
  styleUrls: ['./kp-event.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class KpEventPage implements OnInit {
  hinf_v: any = (hinf as any).default;
  sublords_v: any = (sublords as any).default;
  signs_v: any = (signs as any).default;
  signs_pos_v: any = (signs_pos as any).default;
  o_signs_v: any = (o_signs as any).default;
  o_rashis_v: any = (o_rashis as any).default;
  ruler_name_v: any =(ruler_name as any).default;
  tdt: string;
  rupl: string = '';
  dasl: string = '';
   binf: any;
	oPlanet :PlanetPos[] = [];
	oHouse: HousePos[] = [];
    house_groups: Group[] = [];
   ptrns: PlanetTrans[] = [];
   info: string = '';
   showSGF: boolean = false;
    day: number;
  mon: number;
  year: number;
  hou: number;
  min: number;
  sec: number;
dob: string = '';
  tob: string = '';
  constructor(private router: Router, public platform: Platform, private menu: MenuController, public shareService: ShareService, public horoService: HoroscopeService, private translate: TranslateService) { }

  ngOnInit() {
  	this.binf = this.router.getCurrentNavigation().extras.state;
	this.info = 'Fetching..';
	this.horoService.getJson('assets/data/house_groups.json')
		.subscribe(hgps => {
			for(let key of Object.keys(hgps)) {
				let hg : Group = {
					details: hgps[key]
				};
				this.house_groups[key] = hg;
			}
			console.log('house group', this.house_groups);
		let ayanid: number = 4;
		var res = this.shareService.getAYNM();
		if(res) ayanid = Number(res);
		this.shareService.getKPPOS(this.binf.dob_short).then( ppos => {
		this.shareService.getHPOS(this.binf.dob_short).then( hpos => {
		if(ppos) {
			this.loadHoro(ppos, hpos);
		} else {
		  this.horoService.getCuspsEx(this.binf.lat, this.binf.lng, this.binf.dob_short, this.binf.timezone, this.binf.dstofset, ayanid)
		   .subscribe(res => {
			this.loadHoro(res['planetPos'], res['housePos']);
			this.shareService.setKPPOS(this.binf.dob, res['planetPos']);
		    console.log(res['housePos']);
 		    this.shareService.setHPOS(this.binf.dob, res['housePos']);
			this.info = '';
		  }, (err) => {
			this.info = JSON.stringify(err);
		  }) ;
	    }
	    });
	    })
		.catch(e => {
		  this.horoService.getCuspsEx(this.binf.lat, this.binf.lng, this.binf.dob_short, this.binf.timezone, this.binf.dstofset, ayanid)
		   .subscribe(res => {
			this.loadHoro(res['planetPos'], res['housePos']);
			this.shareService.setKPPOS(this.binf.dob, res['planetPos']);
		    console.log(res['housePos']);
 		    this.shareService.setHPOS(this.binf.dob, res['housePos']);
			this.info = '';
		  }, (err) => {
			this.info = JSON.stringify(err);
		  }) ;
		});
	}, (err) => {
	   console.log(JSON.stringify(err));
	});
  }
  loadHoro(ppos, hpos)
  {
	  console.log('hinf', this.hinf_v);
	let pcnt :number = 0; 
	for(let key of Object.keys(this.signs_v)) {
		if(this.signs_v[key] == 'na') continue;
		var sign = this.signs_v[key];
			if (ppos.hasOwnProperty(sign)) {
				var pls = ppos[sign].split('\|');
				for (var k = 0; k < pls.length; k++) {
					if (pls[k].split(' ')[1] == 'MEAN_NODE') {
						var rpos = this.o_rashis_v[sign].split('\|')[0];
						var kpos = parseInt(rpos, 10) + 6;
						if (kpos > 12) kpos = (kpos - 12);
						if (ppos.hasOwnProperty(this.o_signs_v[kpos - 1])) {
							var eP = ppos[this.o_signs_v[kpos - 1]];
							ppos[this.o_signs_v[kpos - 1]] = eP + '|' + pls[k].split(' ')[0] + ' ' + 'Ke';
						} else {
							ppos[this.o_signs_v[kpos - 1]] = pls[k].split(' ')[0] + ' ' + 'Ke';
						}
						ppos[sign] = ppos[sign].replace('MEAN_NODE', 'Ra');
					} else if (pls[k].split(' ')[1] == 'AC') { 
					} else if (pls[k].split(' ')[1] == 'Mo') {
					} else if (pls[k].split(' ')[1] == 'Su') {
					} else if (pls[k].split(' ')[1] == 'TRUE_NODE') {
						ppos[sign] = ppos[sign].replace('TRUE_NODE', 'TR');		
					}
				}
			}
	}
	this.info = 'Calculating planet significators..';
	console.log('publishing planet positions');
	for(let key of Object.keys(this.signs_v)) {
		if(this.signs_v[key] == 'na') continue;
		var sign = this.signs_v[key];
			if (ppos.hasOwnProperty(sign)) {
				var pls = ppos[sign].split('\|');
				console.log(pls);
				for (var k = 0; k < pls.length; k++) {
					var pl = pls[k].split(' ')[1];
					var pos = pls[k].split(' ')[0].trim();
					console.log(pl, pos);
					let dval: number = 0;
					if(pos.indexOf('.') > -1 && pos.split('.')[1] != '')
					  dval = this.shareService.dmsToDec(this.signs_pos_v[sign]+Number(pos.split('.')[0]), Number(pos.split('.')[1]), Number(pos.split('.')[2]));
					else
					  dval = Number(pos);
					if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TR') {  //consider only true planets
						pcnt++;
						var star = this.calcStarEx(dval);
						if(pos.indexOf('.') > -1 && pos.split('.')[1] != '') {
						}
						else {
						}
						let planetPos: PlanetPos = {
							 pos: dval,
							 sign: star.split('|')[0],
							 star: star.split('|')[1],
							 sub: star.split('|')[2],
							 sig: '',
							 lif_e: '',
							 inds: ''
						};
						console.log('pl', this.ruler_name_v[pl.toLowerCase()].toLowerCase());
						this.oPlanet[this.ruler_name_v[pl.toLowerCase()].toLowerCase()] = planetPos;
					} else if (pl == 'Ra') { //consder Rahu
						pcnt++;
						var star = this.calcStarEx(dval);
						if(pos.indexOf('.') > -1 && pos.split('.')[1] != '') {
						}
						else {
						}
							let planetPos: PlanetPos = {
							 pos: dval,
							 sign: star.split('|')[0],
							 star: star.split('|')[1],
							 sub: star.split('|')[2],
							 sig: '',
							 lif_e: '',
							 inds: ''
							};
							this.oPlanet['rahu'] = planetPos;
					} else if (pl == 'Ke') {
						pcnt++;
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
						this.oPlanet['ketu'] = planetPos;
					}
				}
			}
		}
		this.info = 'Calculating house significators..';
		console.log('publishing house positions');
		//var hPos = hpos;
		pcnt = 0;
		//for(var i=0; i < Object.keys(hPos).length; i++)
		for(let key of Object.keys(hpos)) {
		  let v_iter: number = Number(key);
		  let dval: number = 0;
		  pcnt++;
		  var dmslat = hpos[v_iter];
		  dval = this.shareService.dmsToDec(Number(dmslat.split("°")[0]), Number(dmslat.split("°")[1].split("'")[0]), Number(dmslat.split("°")[1].split("'")[1].split('"')[0]));
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
		  this.oHouse[v_iter] = housePos;
		}
		this.info = 'Analyzing..';
		var arr = ["sun","moon","mars","rahu", "jupiter", "saturn", "mercury", "ketu", "venus"];
	    for (var vi=0, len=arr.length; vi<len; vi++) {
		   let psig: number[] = [];
		   let sigs: number = 0;
		   var obj = this.oPlanet[arr[vi]];
		   var sl_hno = this.get_hno_by_pos(this.oPlanet[obj.star].pos);
		   var hno = this.get_hno_by_pos(obj.pos);
		   var sl_own_hnos = this.get_own_houses(obj.star);
		   var pl_own_hnos = this.get_own_houses(arr[vi]);
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
		   this.oPlanet[arr[vi]].sig = p_sigs;
		   console.log(arr[vi], p_sigs);
		   this.oPlanet[arr[vi]].lif_e = this.analyze_life_evts(arr[vi], p_sigs);
		}
		console.log('oPlanet', this.oPlanet);
		this.publishTrans();
		//find house significators
		this.showSGF = true;
		this.info = '';
	}
	publishTrans() {
		let cnt: number = 0;
		let mdl: string = this.binf.mdasl[0].toUpperCase() + this.binf.mdasl[1];
		let adl: string = this.binf.adasl[0].toUpperCase() + this.binf.adasl[1];
		let pdl: string = this.binf.pdasl[0].toUpperCase() + this.binf.pdasl[1];
		let slrds: string = this.binf.mdasl.toLowerCase()+this.binf.pdasl.toLowerCase()+this.binf.adasl.toLowerCase();
		this.dasl = '<p><strong>Dasha Lords: </strong><span class="redText">' + this.binf.mdasl + '</span>,<span class="blueText">' + this.binf.adasl + '</span>,<span class="greenText">' + this.binf.pdasl + '</span></p>';
		console.log('slrds', slrds);
		console.log('trns', this.binf.trns);
		console.log((<any>this.binf.trns).length);
		for(var i = 0; i < (<any>this.binf.trns).length; i++) {
						let ssls: any = this.binf.trns[i].sssl.split(',');
						this.tdt = this.binf.trns[i].date;
						var t = Date.parse(this.tdt);
						var odt = new Date(t);
						this.year = odt.getFullYear();
						this.mon = odt.getMonth()+1;
						this.day = odt.getDate();
						this.hou = odt.getHours();
						this.min = odt.getMinutes();
						this.sec = odt.getSeconds(); 
						this.dob = this.dob = this.year.toString()+'-'+ this.mon.toString()+'-'+this.day.toString();
						this.tob = this.hou.toString()+':'+this.min.toString()+':Z' ;
						console.log('dob', this.dob);
						console.log('tob', this.tob);
						this.rupl = '<p><strong>DL: </strong><span class="redText">' + this.binf.trns[i].rupdl +  '</span> <strong>LL: </strong><span class="blueText">' + this.binf.trns[i].rupll + ' </span><strong>ML: </strong><span class="greenText">' + this.binf.trns[i].rupml +'</span></p>';
						console.log(ssls, ssls.length);
						for(var j = 0; j < ssls.length; j++) {
							if (ssls[j].indexOf('|') == -1) continue;
							let pn = this.ruler_name_v[ssls[j].split('|')[1].split('-')[2].split(' ')[1].toLowerCase()];
							let rs = this.o_rashis_v[ssls[j].split('|')[1].split('-')[1]].split('|')[1];
							let nk = ssls[j].split('|')[1].split('-')[0];
							if (slrds.indexOf(ssls[j].split('-')[1]) > -1) {
								let slrd: string = ssls[j].split('|')[0].split('-')[2]; 
								let dp: string = ssls[j].split('|')[0].split('-')[1];
								console.log(slrd, dp);
								console.log('dp life', this.oPlanet[dp].lif_e);
								if(this.oPlanet[dp].lif_e != '') {
									let levts = this.oPlanet[dp].lif_e.split(',');
									for(var k =0; k < levts.length; k++) {
										let nh = Number(levts[k].split('|')[0].split('-')[0])-1;
										if(nh == 0) nh = 12;
										let bneg: boolean = false;
										let sigs = this.oPlanet[slrd].sig.split(',');
										console.log('slrd sigs', sigs);
										for(var l = 0; l < sigs.length; l++) {
											if(Number(sigs[l]) == nh) bneg = true;
										}
										console.log('levts', levts[k]);
										//if(!bneg) {
											let plTrans: PlanetTrans =  {
											  pl: pn,
											  tdys: '',
											  tmon: '',
											  tyr: '',
											  nak: nk,
											  sign: rs,
											  sub: slrd,
											  mds: dp,
											  desc: (bneg == true) ?  slrd + ' REJECTS ' + levts[k].split('|')[1] : slrd + ' AGREES  ' + levts[k].split('|')[1],
											  sdesc: (bneg == true) ? 'redText' : 'greenText'
											}
										this.ptrns[cnt++] = plTrans;
									//}
								  }
								} else {
									let psigs = this.oPlanet[dp].sig.split(',');
									console.log('psigs', psigs);
									for(var k =0; k < psigs; k++) {
										let nh = Number(psigs[k])-1;
										if(nh == 0) nh = 12;
										let bneg: boolean = false;
										let sigs = this.oPlanet[slrd].sig.split(',');
										for(var l = 0; l < sigs.length; l++) {
											if(Number(sigs[l]) == nh) bneg = true;
										}
										console.log('psigs[k]', psigs[k]);
										//if(!bneg) {
											let plTrans: PlanetTrans =  {
											  pl: pn,
											  tdys: '',
											  tmon: '',
											  tyr: '',
											  nak: nk,
											  sign: rs,
											  sub: slrd,
											  mds: dp,
											  desc: (bneg == true) ? slrd + ' REJECTS ' + this.hinf_v[psigs[k]] : slrd + ' AGREES ' + this.hinf_v[psigs[k]],
											  sdesc: (bneg == true) ? 'redText' : 'greenText'
											}
										this.ptrns[cnt++] = plTrans;
									//}
									break;
								}
							}
							console.log('pn', pn);
							console.log('rs', rs);
							console.log('nk', nk);
							//this.tmsg += '<span>'+pn.toUpperCase() +  '  transiting into ' + rs + ' in the star ' + nk.toUpperCase() + ' and in the SUB of ' + ssls[j].split('|')[0].split('-')[2].toUpperCase() '</span><br>';
						}
					}
		   }
	}

  subscribe() {
	  this.router.navigate(['/subscribe']);
  }
   showInf(tpc) {
	this.horoService.getArticle(tpc)
	.subscribe(res => {
		//this.info = '';
		if(res['title'].indexOf('ERROR') == -1)
			this.router.navigate(['/article'], {state: res});
	}, (err) => {
//		this.info = JSON.stringify(err);
	});
  }
  	calcStarEx(val: number)
	{
		for(var i = 0; i < Object.keys(this.sublords_v).length; i++)
		{
			var nak = this.sublords_v[i];
			var degs = this.sublords_v[i].deg;
			var s_mins = this.shareService.dmsToDec(Number(degs.split('-')[0].split('.')[0]), Number(degs.split('-')[0].split('.')[1]), Number(degs.split('-')[0].split('.')[2]));
			var e_mins = this.shareService.dmsToDec(Number(degs.split('-')[1].split('.')[0]), Number(degs.split('-')[1].split('.')[1]), Number(degs.split('-')[1].split('.')[2]));
			if(val >= s_mins && val < e_mins) {
			   return nak.sign + '|' + nak.star + '|' + nak.sub;
			}
		}
		return '-1';
	}
	get_hno_by_pos(mins: any)
	{
	  for(let key of Object.keys(this.oHouse)) {
		let v_iter: number = Number(key);
		let cur_h: number = (v_iter == 12) ? 1: v_iter + 1;
		let mins1: number = this.oHouse[v_iter].pos;
		let mins2: number = this.oHouse[cur_h].pos;
		if(mins2 < mins1) {
		  if(mins >= 0 && mins > mins1) return v_iter;
		} else {
		   if(mins >= mins1 && mins < mins2) return v_iter;
		}
	  }
	  return (12);
	}
	get_own_houses(lord: string)
	{
	  let hno: string = '';
	  for(var i = 0; i < Object.keys(this.oHouse).length; i++) {
	    if(this.oHouse[i+1].sign == lord) hno += (i+1).toString() + ',';
	  }
	  return hno;
	}
	get_h_from_h(s_h: number, d_h: number)
	{
		let h: number = s_h;
		for(var i = h; i < d_h; i++) {
		    if(i > 12) i = 1;
			if(i == d_h) return i;
		}
		return -1;
	}
	analyze_life_evts(lord: string, lsig: string)
	{
		let lif_e: string = '';
		for(let key of Object.keys(this.house_groups)) {
		  let h_g: string ='';
		  let sigs: string[] = key.split('-');
		  let idx: number = sigs[0].indexOf('(');
		  if(idx != -1) {
			let s_h: number = Number(sigs[0].match(/\(([^)]+)\)/)[1]);
			var hno = (idx == -1) ? sigs[0] : sigs[0].substring(0, idx+1);
			let d_h: number = Number(hno);
			sigs[0] = this.get_h_from_h(s_h, d_h).toString();
		  }
			let sig_c: number = 0;
			    let lsigs: string[] = lsig.split(',');
				for(var i = 0; i < sigs.length; i++) {
					if(sigs[i].indexOf('(') != -1) {
					  let s_h: number = Number(sigs[i].match(/\(([^)]+)\)/)[1]);
					  idx = sigs.indexOf('(');
					  hno = (idx == -1) ? sigs[i] : sigs[i].substring(0, idx+1);
					  let d_h: number = Number(hno);
					  sigs[i] = this.get_h_from_h(s_h, d_h).toString();
					} else if(sigs[i] == 'BADH' || sigs[i] == 'CUSP') {
						continue;
					} else if(sigs[i] == 'MARS' && sigs[i].toLowerCase() != lord) {
						continue;
					}
					for(var j = i; j < lsigs.length; j++) {
						if(lsigs[j] == sigs[i]) {	//supporting house satisfied
						if(h_g.indexOf(sigs[i]) == -1) {
						  h_g += sigs[i] + '-';
						  sig_c++;	
						  }
						}
					}
				}
				if(sigs.length == sig_c) {  //life event statisfied
					lif_e += h_g + '|' + this.house_groups[key].details + ';';
				}
		}
		console.log('analyze_life_evts', lif_e);
		return lif_e;
	}
	rightmenu() {
		this.menu.open('second');
	}
   save(evt)
   {
	 evt.stopPropagation();
	 this.info = '';
	if(this.day == null || this.mon == null || this.year == null) {
		this.info = 'Please enter date of birth';
		return;
	} else {
        this.dob = this.year.toString()+'-'+ this.mon.toString()+'-'+this.day.toString();
	}
	if(this.hou == null || this.min == null) {
		this.info = 'Please enter time of birth';
		return;
	} else  {
		let s = (this.sec == null) ? '00Z':this.sec.toString()+'Z';
        this.tob = this.hou.toString()+':'+this.min.toString()+':'+s ;
	}
	if(!this.isValidDate(this.day, this.mon, this.year, this.hou, this.min, (this.sec == null) ? 0 : this.sec)) {
		this.info = 'Please enter valid date & time';
		return;
	}
	if(this.binf.dob_short == this.dob+'T'+this.tob) return;
    var cdt = new Date(this.year, this.mon-1, this.day, this.hou, this.min, this.sec);	
		let mdl: string = null;
		let adl: string = null;
		let pdl: string = null;
	   for(let key of Object.keys(this.binf.vims)) {
		 var dts = this.binf.vims[key].per.split('To');
		 var fdt = new Date(Number(dts[0].trim().split('/')[2]), Number(dts[0].trim().split('/')[1])-1, Number(dts[0].trim().split('/')[0]));
		 var tdt = new Date(Number(dts[1].trim().split('/')[2]), Number(dts[1].trim().split('/')[1])-1, Number(dts[1].trim().split('/')[0]));
		 if(cdt >= fdt && cdt < tdt ) {
			 if(this.binf.vims[key].type == 'MDAS') mdl = key;
			 else if(this.binf.vims[key].type == 'ADAS') adl = this.ruler_name_v[key.split('-')[1].toLowerCase()];
			 else if(this.binf.vims[key].type == 'PDAS') pdl = this.ruler_name_v[key.split('-')[2].toLowerCase()];
		 }
		 if(mdl && adl && pdl) break;
	   }
	   this.getTrans(mdl, adl, pdl, cdt);
   }
	getTrans(mdasl, adasl, pdasl, cdt) {
			this.binf.mdasl = mdasl;
			this.binf.adasl = adasl;
			this.binf.pdasl = pdasl;
			let ayanid: number = (this.shareService.getAYNM()) ? Number(this.shareService.getAYNM()) : 4;
			this.horoService.getDashTrans4DT(cdt, mdasl, adasl, pdasl, this.shareService.getCLAT(), this.shareService.getCLNG(), Intl.DateTimeFormat().resolvedOptions().timeZone, ayanid)
				.subscribe(trns => {
					this.binf.trns = trns;
					//[{"date":"THU Feb 03,2022 20:00:00","sssl":"saturn-sun-rahu|uttaraashada-cp-0.14.0 Me,saturn-jupiter-saturn|purvabhadra-aq-21.58.45 Mo,jupiter-ketu-mercury|mula-sa-13.10.17 Ma,venus-sun-saturn|krittika-ta-3.35.22 Ra","mdras":"aq","mdnak":"shatabhisha","mdsub":"saturn-rahu-mercury","rupll":null,"rupml":null,"rupdl":null}]
					this.publishTrans();
					this.info = '';
			}, (err) => {
			});
	}
	
 isValidDate(d, m, y, hou, min, sec) {
  var dt = new Date(y,m,d,hou,min,sec);
  if (Object.prototype.toString.call(dt) === "[object Date]") {
  // it is a date
   if (isNaN(dt.getTime())) {  // dt.valueOf() could also work
    // date is not valid
    return false;
   } else {
    return true;
   }
  } else {
   return false;
  }
 }
	
  showDatePicker() {
	var dt = new Date();
	if(this.dob != '') {
		dt.setFullYear(Number(this.dob.split('-')[0]));
		dt.setMonth(Number(this.dob.split('-')[1])-1);
		dt.setDate(Number(this.dob.split('-')[2]));
	}
	DatePicker.present({
		format: 'dd/MM/yyyy',
		mode: 'date',
		date: dt.getDate().toString() + '/' + (dt.getMonth()+1).toString() + '/' + dt.getFullYear().toString(),
		theme: 'dark',
	  }).then(odt => {
		var date = new Date(odt.value);
		this.dob = date.getFullYear().toString()+"-"+ (date.getMonth()+1).toString()+"-"+date.getDate().toString();
		this.year = date.getFullYear();
		this.mon = date.getMonth()+1;
		this.day = date.getDate();
		},
		err => console.log('Error occurred while getting date: ', err));
  }
 showTimePicker() {
	var dt = new Date();
	if(this.tob != '') {
		dt.setHours(Number(this.tob.split(':')[0]));
		dt.setMinutes(Number(this.tob.split(':')[1]));
	}
	DatePicker.present({
		format: 'dd/MM/yyyy',
		mode: 'time',
		date: dt.getDate().toString() + '/' + (dt.getMonth()+1).toString() + '/' + dt.getFullYear().toString(),
		theme: 'dark',
	  }).then(odt => {
		var date = new Date(odt.value);
		this.tob = date.getHours().toString()+":"+date.getMinutes().toString();
		this.hou = date.getHours();
		this.min = date.getMinutes();
		this.sec = 0;
		},
		err => console.log('Error occurred while getting date: ', err));
 }
}
