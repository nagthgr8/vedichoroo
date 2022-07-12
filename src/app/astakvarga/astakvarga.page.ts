import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShareService } from '../share.service'
import * as o_rashis from '../o_rashis.json';
declare var admob;

@Component({
  selector: 'app-astakvarga',
  templateUrl: './astakvarga.page.html',
  styleUrls: ['./astakvarga.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AstakvargaPage implements OnInit {
  o_rashis_v: any = (o_rashis as any).default;
  oAkv: any = [];
  akpts: string = '';
  constructor(private router: Router, private route: ActivatedRoute, public shareService: ShareService) {
  }
  ngOnInit() {
	this.oAkv = this.router.getCurrentNavigation().extras.state;
	    let akvPts = this.oAkv['akPts'];
		let ras = this.oAkv['houSgn'];
		console.log(this.oAkv);
		console.log('housesig', ras);
		console.log('rashis', this.o_rashis_v);
			let pt : number = akvPts['Su-1'] +  akvPts['Mo-1'] + akvPts['Ju-1'] + akvPts['Me-1'] + akvPts['Ve-1'] + akvPts['Ma-1'] + akvPts['Sa-1'];
			this.akpts = '<p><span class="desc">1st House, ' + this.o_rashis_v[ras[1]].split('\|')[1] + ' gained ' + pt.toString() + ' points</span><br/>';
			this.akpts += '<span class="pts">SUN: ' + akvPts['Su-1'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MOON: ' + akvPts['Mo-1'] + '</span><br/>'; 
			this.akpts += '<span class="pts">JUPITER: ' + akvPts['Ju-1'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MARS: ' + akvPts['Ma-1'] + '</span> <br/>'; 
			this.akpts += '<span class="pts">MERCURY: ' + akvPts['Me-1'] + '</span><br/>'; 
			this.akpts += '<span class="pts">VENUS: ' + akvPts['Ve-1'] + '</span><br/>'; 
			this.akpts += '<span class="pts">SATURN: ' + akvPts['Sa-1'] + '</span><br/>'; 
			pt = akvPts['Su-2'] +  akvPts['Mo-2'] + akvPts['Ju-2'] + akvPts['Me-2'] + akvPts['Ve-2'] + akvPts['Ma-2'] + akvPts['Sa-2'];
			this.akpts += '<span class="desc">2nd House, ' + this.o_rashis_v[ras[2]].split('\|')[1] +  ' has gained ' + pt.toString() + ' points</span><br/>';
			this.akpts += '<span class="pts">SUN: ' + akvPts['Su-2'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MOON: ' + akvPts['Mo-2'] + '</span><br/>'; 
			this.akpts += '<span class="pts">JUPITER: ' + akvPts['Ju-2'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MARS: ' + akvPts['Ma-2'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MERCURY: ' + akvPts['Me-2'] + '</span><br/>'; 
			this.akpts += '<span class="pts">VENUS: ' + akvPts['Ve-2'] + '</span><br/>'; 
			this.akpts += '<span class="pts">SATURN: ' + akvPts['Sa-2'] + '</span><br/>'; 
			pt = akvPts['Su-3'] +  akvPts['Mo-3'] + akvPts['Ju-3'] + akvPts['Me-3'] + akvPts['Ve-3'] + akvPts['Ma-3'] + akvPts['Sa-3'];
			this.akpts += '<span class="desc">3rd House, ' + this.o_rashis_v[ras[3]].split('\|')[1] +  ' has gained ' + pt.toString() + ' points</span><br/>';
			this.akpts += '<span class="pts">SUN: ' + akvPts['Su-3'] + '<br/>'; 
			this.akpts += '<span class="pts">MOON: ' + akvPts['Mo-3'] + '</span><br/>'; 
			this.akpts += '<span class="pts">JUPITER: ' + akvPts['Ju-3'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MARS: ' + akvPts['Ma-3'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MERCURY: ' + akvPts['Me-3'] + '</span><br/>'; 
			this.akpts += '<span class="pts">VENUS: ' + akvPts['Ve-3'] + '</span><br/>'; 
			this.akpts += '<span class="pts">SATURN: ' + akvPts['Sa-3'] + '</span><br/>'; 
			pt = akvPts['Su-4'] +  akvPts['Mo-4'] + akvPts['Ju-4'] + akvPts['Me-4'] + akvPts['Ve-4'] + akvPts['Ma-4'] + akvPts['Sa-4'];
			this.akpts += '<span class="desc">4th House, ' + this.o_rashis_v[ras[4]].split('\|')[1] +  ' has gained ' + pt.toString() + ' points</span><br/>';
			this.akpts += '<span class="pts">SUN: ' + akvPts['Su-4'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MOON: ' + akvPts['Mo-4'] + '</span><br/>'; 
			this.akpts += '<span class="pts">JUPITER: ' + akvPts['Ju-4'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MARS: ' + akvPts['Ma-4'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MERCURY: ' + akvPts['Me-4'] + '</span><br/>'; 
			this.akpts += '<span class="pts">VENUS: ' + akvPts['Ve-4'] + '</span><br/>'; 
			this.akpts += '<span class="pts">SATURN: ' + akvPts['Sa-4'] + '</span><br/>'; 
			pt = akvPts['Su-5'] +  akvPts['Mo-5'] + akvPts['Ju-5'] + akvPts['Me-5'] + akvPts['Ve-5'] + akvPts['Ma-5'] + akvPts['Sa-5'];
			this.akpts += '<span class="desc">5th House, ' + this.o_rashis_v[ras[5]].split('\|')[1] +  ' has gained ' + pt.toString() + ' points</span><br/>';
			this.akpts += '<span class="pts">SUN: ' + akvPts['Su-5'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MOON: ' + akvPts['Mo-5'] + '</span><br/>'; 
			this.akpts += '<span class="pts">JUPITER: ' + akvPts['Ju-5'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MARS: ' + akvPts['Ma-5'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MERCURY: ' + akvPts['Me-5'] + '</span><br/>'; 
			this.akpts += '<span class="pts">VENUS: ' + akvPts['Ve-5'] + '</span><br/>'; 
			this.akpts += '<span class="pts">SATURN: ' + akvPts['Sa-5'] + '</span><br/>'; 
			pt = akvPts['Su-6'] +  akvPts['Mo-6'] + akvPts['Ju-6'] + akvPts['Me-6'] + akvPts['Ve-6'] + akvPts['Ma-6'] + akvPts['Sa-6'];
			this.akpts += '<span class="desc">6th House, ' + this.o_rashis_v[ras[6]].split('\|')[1] +  ' has gained ' + pt.toString() + ' points</span><br/>';
			this.akpts += '<span class="pts">SUN: ' + akvPts['Su-6'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MOON: ' + akvPts['Mo-6'] + '</span><br/>'; 
			this.akpts += '<span class="pts">JUPITER: ' + akvPts['Ju-6'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MARS: ' + akvPts['Ma-6'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MERCURY: ' + akvPts['Me-6'] + '</span><br/>'; 
			this.akpts += '<span class="pts">VENUS: ' + akvPts['Ve-6'] + '</span><br/>'; 
			this.akpts += '<span class="pts">SATURN: ' + akvPts['Sa-6'] + '</span><br/>'; 
			pt = akvPts['Su-7'] +  akvPts['Mo-7'] + akvPts['Ju-7'] + akvPts['Me-7'] + akvPts['Ve-7'] + akvPts['Ma-7'] + akvPts['Sa-7'];
			this.akpts += '<span class="desc">7th House, ' + this.o_rashis_v[ras[7]].split('\|')[1] +  ' has gained ' + pt.toString() + ' points</span><br/>';
			this.akpts += '<span class="pts">SUN: ' + akvPts['Su-7'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MOON: ' + akvPts['Mo-7'] + '</span><br/>'; 
			this.akpts += '<span class="pts">JUPITER: ' + akvPts['Ju-7'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MARS: ' + akvPts['Ma-7'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MERCURY: ' + akvPts['Me-7'] + '</span><br/>'; 
			this.akpts += '<span class="pts">VENUS: ' + akvPts['Ve-7'] + '</span><br/>'; 
			this.akpts += '<span class="pts">SATURN: ' + akvPts['Sa-7'] + '</span><br/>'; 
			pt = akvPts['Su-8'] +  akvPts['Mo-8'] + akvPts['Ju-8'] + akvPts['Me-8'] + akvPts['Ve-8'] + akvPts['Ma-8'] + akvPts['Sa-8'];
			this.akpts += '<span class="desc">8th House, ' + this.o_rashis_v[ras[8]].split('\|')[1] +  ' has gained ' + pt.toString() + ' points</span><br/>';
			this.akpts += '<span class="pts">SUN: ' + akvPts['Su-8'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MOON: ' + akvPts['Mo-8'] + '</span><br/>'; 
			this.akpts += '<span class="pts">JUPITER: ' + akvPts['Ju-8'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MARS: ' + akvPts['Ma-8'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MERCURY: ' + akvPts['Me-8'] + '</span><br/>'; 
			this.akpts += '<span class="pts">VENUS: ' + akvPts['Ve-8'] + '</span><br/>'; 
			this.akpts += '<span class="pts">SATURN: ' + akvPts['Sa-8'] + '</span><br/>'; 
			pt = akvPts['Su-9'] +  akvPts['Mo-9'] + akvPts['Ju-9'] + akvPts['Me-9'] + akvPts['Ve-9'] + akvPts['Ma-9'] + akvPts['Sa-9'];
			this.akpts += '<span class="desc">9th House, ' + this.o_rashis_v[ras[9]].split('\|')[1] +  ' has gained ' + pt.toString() + ' points</span><br/>';
			this.akpts += '<span class="pts">SUN: ' + akvPts['Su-9'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MOON: ' + akvPts['Mo-9'] + '</span><br/>'; 
			this.akpts += '<span class="pts">JUPITER: ' + akvPts['Ju-9'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MARS: ' + akvPts['Ma-9'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MERCURY: ' + akvPts['Me-9'] + '</span><br/>'; 
			this.akpts += '<span class="pts">VENUS: ' + akvPts['Ve-9'] + '</span><br/>'; 
			this.akpts += '<span class="pts">SATURN: ' + akvPts['Sa-9'] + '</span><br/>'; 
			pt = akvPts['Su-10'] +  akvPts['Mo-10'] + akvPts['Ju-10'] + akvPts['Me-10'] + akvPts['Ve-10'] + akvPts['Ma-10'] + akvPts['Sa-10'];
			this.akpts += '<span class="desc">10th House, ' + this.o_rashis_v[ras[10]].split('\|')[1] +  ' has gained ' + pt.toString() + ' points</span><br/>';
			this.akpts += '<span class="pts">SUN: ' + akvPts['Su-10'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MOON: ' + akvPts['Mo-10'] + '</span><br/>'; 
			this.akpts += '<span class="pts">JUPITER: ' + akvPts['Ju-10'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MARS: ' + akvPts['Ma-10'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MERCURY: ' + akvPts['Me-10'] + '</span><br/>'; 
			this.akpts += '<span class="pts">VENUS: ' + akvPts['Ve-10'] + '</span><br/>'; 
			this.akpts += '<span class="pts">SATURN: ' + akvPts['Sa-10'] + '</span><br/>'; 
			pt = akvPts['Su-11'] +  akvPts['Mo-11'] + akvPts['Ju-11'] + akvPts['Me-11'] + akvPts['Ve-11'] + akvPts['Ma-11'] + akvPts['Sa-11'];
			this.akpts += '<span class="desc">11th House, ' + this.o_rashis_v[ras[11]].split('\|')[1] +  ' has gained ' + pt.toString() + ' points</span><br/>';
			this.akpts += '<span class="pts">SUN: ' + akvPts['Su-11'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MOON: ' + akvPts['Mo-11'] + '</span><br/>'; 
			this.akpts += '<span class="pts">JUPITER: ' + akvPts['Ju-11'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MARS: ' + akvPts['Ma-11'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MERCURY: ' + akvPts['Me-11'] + '</span><br/>'; 
			this.akpts += '<span class="pts">VENUS: ' + akvPts['Ve-11'] + '</span><br/>'; 
			this.akpts += '<span class="pts">SATURN: ' + akvPts['Sa-11'] + '</span><br/>'; 
			pt = akvPts['Su-12'] +  akvPts['Mo-12'] + akvPts['Ju-12'] + akvPts['Me-12'] + akvPts['Ve-12'] + akvPts['Ma-12'] + akvPts['Sa-12'];
			this.akpts += '<span class="desc">12th House, ' + this.o_rashis_v[ras[12]].split('\|')[1] +  ' has gained ' + pt.toString() + ' points</span><br/>';
			this.akpts += '<span class="pts">SUN: ' + akvPts['Su-12'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MOON: ' + akvPts['Mo-12'] + '</span><br/>'; 
			this.akpts += '<span class="pts">JUPITER: ' + akvPts['Ju-12'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MARS: ' + akvPts['Ma-12'] + '</span><br/>'; 
			this.akpts += '<span class="pts">MERCURY: ' + akvPts['Me-12'] + '</span><br/>'; 
			this.akpts += '<span class="pts">VENUS: ' + akvPts['Ve-12'] + '</span><br/>'; 
			this.akpts += '<span class="pts">SATURN: ' + akvPts['Sa-12'] + '</span></p>'; 
  	  this.shareService.getPLAN()
		   .then(res => {
		if(res['name'] != 'com.mypubz.eportal.astrologer' && res['name'] != 'com.mypubz.eportal.adfree' && res['name'] != 'com.mypubz.eportal.month' && res['name'] != 'com.mypubz.eportal.year') {
			//admob.setDevMode(true);
		admob.banner.show({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/5781492562',
			  ios: 'ca-app-pub-8442845715303800/5781492562',
			},
		  }).then(() => {
			setTimeout(() => {
			  admob.banner.hide({
				// replace with your ad unit IDs
				android: 'ca-app-pub-8442845715303800/5781492562',
				ios: 'ca-app-pub-8442845715303800/5781492562',
			  })
			}, 10000)
		  })
		}
	 });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AstakvargaPage');
  }


}
