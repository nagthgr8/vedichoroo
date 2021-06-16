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
  rdt: any;
  showBT: boolean = false;
  ntks: number = 0;
  constructor(public router: Router, public shareService: ShareService, public horoService: HoroscopeService) { }

 getPPOS(ppos, sf)
 {
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
  ngOnInit() {
	   this.btr = this.router.getCurrentNavigation().extras.state;
		let ges: string = '';
	   if(this.btr.binf2) {
				  let bt3:  BirthTimeRecfy = {
					id: this.btr.id,
					name: '',
					desc: '',
					res: '',
					style: 'blueText',
					fetch: true
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
	  let bt0:  BirthTimeRecfy = {
		id: 'BTR0',
		name: 'Birth Time before rectification',
		desc: '',
		res: this.btr.binf1.dob_short,
		style: 'blueText',
		fetch: true
	 };
	 this.oRecfy[this.btr.id] = bt0;
	  let bt:  BirthTimeRecfy = {
		id: this.btr.id,
		name: 'Lagna Sub-Sub with Moon Star',
		desc: '',
		res: '',
		style: 'blueText',
		fetch: true
	 };
	 this.oRecfy[this.btr.id] = bt;
	  let bt2:  BirthTimeRecfy = {
		id: 'SML',
		name: 'Lagna, Sun & Moon signify 1-7-10',
		desc: '',
		res: '',
		style: 'blueText',
		fetch: true
	 };
	 this.oRecfy['SML'] = bt2;
	  let bt4:  BirthTimeRecfy = {
		id: 'BTR',
		name: 'Rectified Birth Time',
		desc: '',
		res: 'checking...',
		style: 'blueText',
		fetch: true
	 };
	 this.oRecfy['BTR'] = bt4;
	 this.showBT = true; 
	   let ayanid: number = 4;
		var res = this.shareService.getAYNM();
		if(res) ayanid = Number(res);
		this.oRecfy['RAM'].res = 'Getting the birth chart...';
	  this.horoService.getCuspsEx(this.btr.binf1.lat, this.btr.binf1.lng, this.btr.binf1.dob_short, this.btr.binf1.timezone, this.btr.binf1.dstofset, ayanid)
		.subscribe(res2 => {
		   this.getPPOS(res2['planetPos'], true);
		   this.getHPOS(res2['housePos'], true);
			if(this.btr.binf2 == null) {
			 this.processBTR('RAM');
			// this.checkSML();
			this.applySML();
			}
		});
		if(this.btr.binf2 != null) {
		   this.oRecfy[this.btr.id].res = 'Getting ' + ges + ' birth chart...';
		   this.horoService.getCuspsEx(this.btr.binf2.lat, this.btr.binf2.lng, this.btr.binf2.dob_short, this.btr.binf2.timezone, this.btr.binf2.dstofset, ayanid)
			.subscribe(res2 => {
			   this.getPPOS(res2['planetPos'], false);
			   this.getHPOS(res2['housePos'], false);
				if(this.oPlanet1.length > 0) {
					this.processBTR(this.btr.id);
					let mo: string = this.oPlanet1['moon'].sign;
					this.processBTR('RAM');
				  let gcp: number = -1;
				  let gnm: string = '';
				  switch(this.btr.id)
				  {
					  case 'RGY':
						 gcp = 3;
						 gnm = 'Younger coborn';
						 break;
					  case 'RGE':
						 gcp = 11;
						 gnm = 'Elder coborn';
						 break;
					  case 'RGM':
						 gcp = 4;
						 gnm = 'Mother';
						 break;
					  case 'RGF':
						 gcp = 9;
						 gnm = 'Father';
						 break;
					  default:
						 break;
				  }
					
					let gsn: string = this.oHouse1[gcp].sign;
					  if(gsn != mo) 
						  this.oRecfy['RAM'].res += ' ' + this.rashis_v[gsn]  + ' which is house ' + gcp.toString() + ' representing gentic connection is not matched with '  + gnm + '  birth star ' + this.rashis_v[mo] + ' after correction.';
				}
				 this.applySML();
			});
		}
  }
  applySML() {
  	   let ayanid: number = 4;
		var res = this.shareService.getAYNM();
		if(res) ayanid = Number(res);
		console.log('rdt', this.rdt.toString());
		this.oRecfy['SML'].res = 'getting the positions of lagna, sun & moon with corrected birth time ' + this.rdt.toString();
		this.horoService.getCuspsEx(this.btr.binf1.lat, this.btr.binf1.lng, this.rdt.getFullYear() + '-' + (this.rdt.getMonth()+1).toString() + '-' + this.rdt.getDate() + 'T' + this.rdt.getHours() + ':' + this.rdt.getMinutes()+ ':' + this.rdt.getSeconds()+'Z', this.btr.binf1.timezone, this.btr.binf1.dstofset, ayanid)
		.subscribe(res2 => {
		  this.oPlanet1 = [];
		  this.oHouse1 = [];
		  this.getPPOS(res2['planetPos'], true);
		  this.getHPOS(res2['housePos'], true);
		  let su: string = '';
		  let asc: string = '';
		  let mo: string = '';
		  let su_deg: number = 0;
		  let asc_deg: number= 0;
		  let mo_deg: number = 0;
		  asc = this.oHouse1[1].sign;
		  asc_deg = this.oHouse1[1].pos;
		  mo = this.oPlanet1['moon'].sign;
		  mo_deg = this.oPlanet1['moon'].pos;
		  su = this.oPlanet1['sun'].sign;
		  su_deg = this.oPlanet1['sun'].pos;
		  switch(this.btr.id)
		  {
			  case 'RGY':
				 break;
			  case 'RGE':
				 break;
			  case 'RGM':
				 break;
			  case 'RGF':
				 break;
			  default:
			     break;
		  }
		  if(this.checkSML(su, su_deg, mo, mo_deg, asc, asc_deg)) {
			  this.oRecfy['BTR'].res = 'The rectified birth time is ' + this.rdt.toString();
			  this.oRecfy['BTR'].style = 'greenText';
			  this.oRecfy['BTR'].fetch = false;
		  } else {
			  this.oRecfy['BTR'].res = 'Could Not Rectify Birth Time Within 20 mins Radius for given birth time';
			  this.oRecfy['BTR'].style = 'redText';
			  this.oRecfy['BTR'].fetch = false;
		  }
		});
}
  getHSIGS(apos, spos, asgn)
  {
	  console.log('apos', apos);
	  console.log('spos', spos);
	  console.log('asgn', asgn);
		let hsig: string[] = [];
		let sigs: number = 0;
		var pls_in_h = this.get_pls_in_hou_ex(apos, spos);
		console.log('get_pls_in_hou_ex', pls_in_h);
		if(pls_in_h != '') {
		} else {
		}
		var pls_in_str = this.get_pls_in_star_occ(pls_in_h);
		console.log('get_pls_in_star_occ', pls_in_str);
		var pls_in_str_o = this.get_pls_in_star(asgn);
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
  getSIGS(pl, ps, ppos, pspos)
  {
	  console.log('pl', pl);
	  console.log('ps', ps);
	  console.log('ppos', ppos);
	  console.log('pspos', pspos);
	   let psig: number[] = [];
	   let sigs: number = 0;
	   var sl_hno = this.get_hno_by_pos(pspos);
	   console.log('get_hno_by_pos(sl)', sl_hno);
	   var hno = this.get_hno_by_pos(ppos);
	   console.log('get_hno_by_pos', hno);
	   var sl_own_hnos = this.get_own_houses(ps);
	   console.log('get_own_houses(sl)', sl_own_hnos);
	   var pl_own_hnos = this.get_own_houses(pl);
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
  checkSML(su, su_deg, mo, mo_deg, asc, asc_deg)
  {
	  this.oRecfy['SML'].res = 'Checking Sun, Moon, Asc SSSL signify 1-7-10...';
	  let mdeg = mo_deg;//this.dmsToDec(this.signs_pos_v[mo]+Number(mo_deg.split('.')[0]), Number(mo_deg.split('.')[1]), Number(mo_deg.split('.')[2]));
	  this.oRecfy['SML'].res = 'Getting Moon SSSL...';
	  console.log('getting moon ssl', mdeg)
	  let s1: string = this.getSSSL(mdeg);
	  console.log('moon ssl', s1)
	  let mslrd = s1.split('-')[1]; 
	  let mslrd_sgn: string ='';
	  let mslrd_deg: string = ''; 
	  for(let key  of Object.keys(this.oPlanet1)) {
			 if(key == mslrd) {
					mslrd_sgn = this.oPlanet1[key].sign;
					mslrd_deg = this.oPlanet1[key].pos;
				break;
			}
	   }
	  let msdeg = mslrd_deg;//this.dmsToDec(this.signs_pos_v[mslrd_sgn]+Number(mslrd_deg.split('.')[0]), Number(mslrd_deg.split('.')[1]), Number(mslrd_deg.split('.')[2]));

	  let sdeg = su_deg;//this.dmsToDec(this.signs_pos_v[su]+Number(su_deg.split('.')[0]), Number(su_deg.split('.')[1]), Number(su_deg.split('.')[2]));
	  this.oRecfy['SML'].res = 'Getting Sun SSSL...';
	  s1 = this.getSSSL(sdeg);
	  let sslrd = s1.split('-')[1]; 
	  let sslrd_sgn: string ='';
	  let sslrd_deg: string = ''; 
	  for(let key  of Object.keys(this.oPlanet1)) {
			 if(key == sslrd) {
					sslrd_sgn = this.oPlanet1[key].sign;
					sslrd_deg = this.oPlanet1[key].pos;
				break;
			}
	  }
	  let ssdeg = sslrd_deg;//this.dmsToDec(this.signs_pos_v[sslrd_sgn]+Number(sslrd_deg.split('.')[0]), Number(sslrd_deg.split('.')[1]), Number(sslrd_deg.split('.')[2]));

	  let adeg = asc_deg;//this.dmsToDec(this.signs_pos_v[asc]+Number(asc_deg.split('.')[0]), Number(asc_deg.split('.')[1]), Number(asc_deg.split('.')[2]));
	  this.oRecfy['SML'].res = 'Getting Ascendant SSSL...';
	  s1 = this.getSSSL(adeg);
	  let aslrd = s1.split('-')[1]; 
	  
	  let susigs: string = this.getSIGS('sun', sslrd, sdeg, ssdeg);
	  let mosigs: string = this.getSIGS('moon', mslrd, mdeg, msdeg);
	  //let hdeg = this.dmsToDec(Number(this.hpos1[2].split("°")[0]), Number(this.hpos1[2].split("°")[1].split("'")[0]), Number(this.hpos1[2].split("°")[1].split("'")[1].split('"')[0]));

	  let ahsigs: string = this.getHSIGS(this.oHouse1[1].pos, this.oHouse1[2].pos, asc);
	  let asgs = ahsigs.split(',');
	  let acsigs: string = '';
	  for(var i =0; i < asgs.length; i++) {
		  if(asgs[i] == '') continue;
		  acsigs += this.getSIGS(asgs[i], this.oPlanet1[asgs[i]].star, this.oPlanet1[asgs[i]].pos, this.oPlanet1[this.oPlanet1[asgs[i]].star].pos);
	  }
	  let sig1: boolean = false;
	  let sig7: boolean = false;
	  let sig10: boolean = false;
	  for(var i = 0; i < susigs.split(',').length; i++) if(susigs[i] == '1'){ sig1 = true; break;}
	  for(var i = 0; i < mosigs.split(',').length; i++) if(mosigs[i] == '1'){ sig1 = true; break;}
	  for(var i = 0; i < acsigs.split(',').length; i++) if(acsigs[i] == '1'){ sig1 = true; break;}
	  for(var i = 0; i < susigs.split(',').length; i++) if(susigs[i] == '7'){ sig7 = true; break;}
	  for(var i = 0; i < mosigs.split(',').length; i++) if(mosigs[i] == '7'){ sig7 = true; break;}
	  for(var i = 0; i < acsigs.split(',').length; i++) if(acsigs[i] == '7'){ sig7 = true; break;}
	  for(var i = 0; i < susigs.split(',').length; i++) if(susigs[i] == '10'){ sig10 = true; break;}
	  for(var i = 0; i < mosigs.split(',').length; i++) if(mosigs[i] == '10'){ sig10 = true; break;}
	  for(var i = 0; i < acsigs.split(',').length; i++) if(acsigs[i] == '10'){ sig10 = true; break;}
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
  processBTR(id)
  {
	  console.log('processBTR', id);
	  let asc: string = '';
	  let mo: string = '';
	  let asc_deg: number= 0;
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
		  asc = this.oHouse1[1].sign;
		  asc_deg = this.oHouse1[1].pos;
		  mo = this.oPlanet1['moon'].sign;
		  mo_deg = this.oPlanet1['moon'].pos
		  	lag_d  = Number(this.oHouse1[1].dmspos.split("°")[0]);
			lag_m = Number(this.oHouse1[1].dmspos.split("°")[1].split("'")[0]);
			lag_s = Number(this.oHouse1[1].dmspos.split("°")[1].split("'")[1].split('"')[0]);
	  } 
	  else if(id == 'RGY' || id == 'RGE' || id == 'RGM' || id == 'RGF') {
		asc = this.oHouse1[1].sign;
		asc_deg = this.oHouse1[1].pos;
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
	  let mslrd = s1.split('-')[1]; 
	  let mslrdp: string = '';
	  let msl_sign: string = '';
	  let msl_deg: string = '';
	  if(id == 'RAM') {
		  for(let key  of Object.keys(this.oPlanet1)) {
			  if(key == mslrd) {
				  msl_sign = key;
				  msl_deg = this.oPlanet1[key].pos;
				  break;
			  }
		  }
	  } else {
		  for(let key  of Object.keys(this.oPlanet2)) {
			  if(key == mslrd) {
				  msl_sign = key;
				  msl_deg = this.oPlanet2[key].pos;
				  break;
			  }
		  }
	  }
	  let msldeg = msl_deg;//this.dmsToDec(this.signs_pos_v[msl_sign]+Number(msl_deg.split('.')[0]), Number(msl_deg.split('.')[1]), Number(msl_deg.split('.')[2]));
	  let sm: string = this.getSSSL(msldeg);
	  var mssl = s1.split('-');
	  var msssl = sm.split('-');
	  let tks: number = 0;
	  let fwd: boolean = true;
	  let dtks: any = this.recfyBT(lag_d, lag_m, lag_s, mssl[1], msssl, tks, fwd, id);
	  if(!dtks.recfy) dtks = this.recfyBT(lag_d, lag_m, lag_s, mssl[1], msssl, tks, fwd = !fwd, id);
	  if(!dtks.recfy) dtks = this.recfyBT(lag_d, lag_m, lag_s, mssl[1], msssl, tks+=5, fwd = !fwd, id);
	  if(!dtks.recfy) dtks = this.recfyBT(lag_d, lag_m, lag_s, mssl[1], msssl, tks, fwd = !fwd, id);
	  if(!dtks.recfy) dtks = this.recfyBT(lag_d, lag_m, lag_s, mssl[1], msssl, tks+=10, fwd = !fwd, id);
	  if(!dtks.recfy) dtks = this.recfyBT(lag_d, lag_m, lag_s, mssl[1], msssl, tks, fwd = !fwd, id);
	  if(!dtks.recfy) dtks = this.recfyBT(lag_d, lag_m, lag_s, mssl[1], msssl, tks+=15, fwd = !fwd, id);
	  if(!dtks.recfy) dtks = this.recfyBT(lag_d, lag_m, lag_s, mssl[1], msssl, tks, fwd = !fwd, id);
	  else {
		  this.ntks = (tks-5)+dtks.ntk;
		  console.log('BTR', this.btr.binf1.dob_short);
		  let rscs: number = ((tks-5)+dtks.ntk)*60;
		  let dob: string = this.btr.binf1.dob_short.split('T')[0];
		  let tob = this.btr.binf1.dob_short.split('T')[1];
		  let bh: number = Number(tob.split(':')[0]);
		  let bm: number = Number(tob.split(':')[1]);
		  let bs: number = Number(tob.split(':')[2].split('Z')[0]);
		  this.rdt= new Date(Number(dob.split('-')[0]), Number(dob.split('-')[1]), Number(dob.split('-')[2]), bh, bm, bs); 
		  this.rdt.setSeconds(this.rdt.getSeconds() + rscs);
	  }
  }
  recfyBT(lag_d, lag_m, lag_s, ms, msl, tk, fw, id)
  {
	  console.log('recfyBT', id + ',' + lag_d.toString() + ',' + lag_m.toString() + ',' + lag_s.toString() + ',' + ms + ',' + msl + ',' + tk.toString());
	  let sd = this.dmsToDec(lag_d, lag_m, lag_s);
	  let sdeg: number = (fw == true) ? sd + ((tk*60)/15) : sd - ((tk*60)/15); 
	  let rcf: any = {};
	  rcf.recfy = false;
	  let ntk: number = 0;
	  while(ntk < 4500) {
		  this.oRecfy[id].res = 'Getting SSSL for ' + sdeg.toString();
		  let s2: string = this.getSSSL(sdeg);
		  this.oRecfy[id].res = 'SSSL is ' + s2.toString();
		  if(s2.split('-')[3] == ms) {
					this.oRecfy[id].res = 'sub-sub ' + ms + ' matched with moon star';
					this.oRecfy[id].fetch = false;
					rcf.recfy = true;
					rcf.dms = lag_d.toString() + '.' + lag_m.toString() + '.' + lag_s.toString();
					rcf.ntk = ntk;
			  return rcf;
		  } else {
				if(s2.split('-')[3] == msl[1] || s2.split('-')[3] == msl[2] || s2.split('-')[3] == msl[3]) {
					this.oRecfy[id].fetch = false;
					rcf.recfy = true;
					rcf.dms = lag_d.toString() + '.' + lag_m.toString() + '.' + lag_s.toString();
					rcf.ntk = ntk;
					this.oRecfy[id].res = 'sub-sub ' + s2.split('-')[3] + '  matched with moon SSL ' + msl[1]+'-'+msl[2]+'-'+msl[3];
					return rcf;
				}
				if(fw) { ntk++; lag_s++;} else { ntk--;lag_s--;}
				if(lag_s > 59) {
					lag_s = lag_s -59;
					lag_m++;
					if(lag_m > 59) {
						lag_m = 0;
						lag_d++;
					}
				}
				else if(lag_s < 0) {
					lag_s = 60+lag_s;
					lag_m--;
					if(lag_m < 0) {
						lag_m = 60+lag_m;
						lag_d--;
					}
				}
			   if(lag_d >= 360) {
				   lag_d = 0;
				   lag_m = 0;
				   lag_s = 0;
			   } else if(lag_d < 0) {
				   lag_d = 360+lag_d;
				   lag_m = 59;
				   lag_s = 59;
			   }
			   sdeg = this.dmsToDec(lag_d, lag_m, lag_s);
		  }
	  }
	  return rcf;
    }
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
	get_pls_in_star(lord: string)
	{
	  console.log('get_pls_in_star(inside)', lord);
	  let pls: string = '';
	  for(let key of Object.keys(this.oPlanet1)) {
	    if(this.oPlanet1[key].star == lord) pls += key.toString() + ',';
	  }
	  return pls;
	}
	get_pls_in_star_occ(o_pls: string)
	{
	  console.log('get_pls_in_star_occ(inside)', o_pls);
	  let pls: string = '';
	  var o_p = o_pls.split(',');
	  for(var p = 0; p < o_p.length; p++) {
		for(let key of Object.keys(this.oPlanet1)) {
			if(this.oPlanet1[key].star == o_p[p]) pls += key.toString() + ',';
		}
	  }
	  return pls;
	}	
	get_pls_in_hou_ex(mins1: number, mins2: number)
	{
	  let pls: string = '';
	  for(let key of Object.keys(this.oPlanet1)) {
		 console.log(key, this.oPlanet1[key].pos);
		if(this.oPlanet1[key].pos >= mins1 && this.oPlanet1[key].pos < mins2) {  console.log(mins1, mins2); pls += key .toString()+ ',';}
		else if((mins1 > mins2) && ((this.oPlanet1[key].pos >= mins1 && this.oPlanet1[key].pos < 360) || (this.oPlanet1[key].pos >= 0 && this.oPlanet1[key].pos < mins2))) {
			console.log(mins1, mins2); 
			pls += key.toString() + ',';
		 }
	  }
	  return pls;
	}
	get_hno_by_pos(mins: any)
	{
	  for(let key of Object.keys(this.oHouse1)) {
		let v_iter: number = Number(key);
		let cur_h: number = (v_iter == 12) ? 1: v_iter + 1;
		let mins1: number = this.oHouse1[v_iter].pos;
		let mins2: number = this.oHouse1[cur_h].pos;
		if(mins2 < mins1) {
		  if(mins >= 0 && mins < mins2) return v_iter;
		} else {
		   if(mins >= mins1 && mins < mins2) return v_iter;
		}
	  }
	  return (12);
	}
	
	get_own_houses(lord: string)
	{
	  console.log('get_own_houses(inside)', lord)
	  let hno: string = '';
	  for(var i = 0; i < Object.keys(this.oHouse1).length; i++) {
		 console.log(this.oHouse1[i+1].sign);
	    if(this.oHouse1[i+1].sign == lord) hno += (i+1).toString() + ',';
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
