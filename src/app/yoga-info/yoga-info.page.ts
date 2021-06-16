import { Component, OnInit } from '@angular/core';
import { HoroscopeService } from '../horoscope.service';
import { Yoga } from '../yoga';

@Component({
  selector: 'app-yoga-info',
  templateUrl: './yoga-info.page.html',
  styleUrls: ['./yoga-info.page.scss'],
})
export class YogaInfoPage implements OnInit {
  objectKeys = Object.keys;
  oYog: Yoga[] = [];
  constructor(private horoService: HoroscopeService) { 
		this.horoService.getJson('assets/data/yog-inf.json')
			.subscribe(yogs => {
				//yogas to be analyzed
				for(let key of Object.keys(yogs)) {
				    let yg : Yoga = {
					  name: key,
					  desc: yogs[key]
					};
					this.oYog[key] = yg;
				}
			}, (err) => {
			});
  }

  ngOnInit() {
  }

}
