import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { HoroscopeService } from '../horoscope.service';

@Component({
  selector: 'app-dosha-info',
  templateUrl: './dosha-info.page.html',
  styleUrls: ['./dosha-info.page.scss'],
})
export class DoshaInfoPage implements OnInit {
  doh: any;
  dtl: string = '';
  nam: string = '';
  showDS: boolean = false;
  constructor(private router: Router, private platform: Platform, private horoService: HoroscopeService, private translate: TranslateService) { 
  }

  ngOnInit() {
	   let dos: any = this.router.getCurrentNavigation().extras.state;
  	   this.dtl = dos.dtl;
	   this.nam = dos.nam;
   this.platform.ready().then((readySource) => {
  	   this.horoService.getJson('assets/data/' + this.nam + '.json')
			.subscribe(res => {
				this.doh = res;
				this.showDS = true;
			}, (err) => {
			   console.log(err);
			});
	});
  }
  talk2ast() {
 	    this.router.navigate(['/astrologers'], {queryParams : {title: 'dosha-info'}});
 }
}
