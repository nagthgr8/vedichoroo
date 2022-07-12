import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HoroscopeService } from '../horoscope.service';
import { Yoga } from '../yoga';

@Component({
  selector: 'app-varga-info',
  templateUrl: './varga-info.page.html',
  styleUrls: ['./varga-info.page.scss'],
})
export class VargaInfoPage implements OnInit {

  objectKeys = Object.keys;
  oYog: Yoga[] = [];

  constructor(private platform: Platform, private horoService: HoroscopeService) { 
  }
  ngOnInit() {
   this.platform.ready().then((readySource) => {
		this.horoService.getJson('assets/data/varga-info.json')
			.subscribe(yogs => {
				console.log('varga-inf', yogs);
				for(let key of Object.keys(yogs)) {
					console.log('key', key);
				    let yg : Yoga = {
					  name: yogs[key].id,
					  desc: yogs[key].title
					};
					this.oYog[key] = yg;
				}
				console.log('oYogs', this.oYog)
			}, (err) => {
			});
   });
  }

}
