import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import { HoroscopeService } from '../horoscope.service';
import * as nakshatras from '../nakshatras.json';

@Component({
  selector: 'app-nak-info',
  templateUrl: './nak-info.page.html',
  styleUrls: ['./nak-info.page.scss'],
})
export class NakInfoPage implements OnInit {

  nakshatras_v: any = (nakshatras as any).default;
  nak: any;
  nakinfo: string = '';
  nakdir: string = '';
  showBD: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute, private platform: Platform, private horoService: HoroscopeService, private translate: TranslateService) { }

  ngOnInit() {
	this.platform.ready().then(() => {
   	this.route.queryParams
      .filter(params => params.name)
      .subscribe(params => {
        console.log(params); 
		for(var i = 0; i < Object.keys(this.nakshatras_v).length; i++)
		{
			if(this.nakshatras_v[i].name == params.name.toLowerCase()) {
					this.nak = this.nakshatras_v[i];
					break;
			}
		}
  	   this.horoService.getJson('assets/data/' + params.name + '.json')
			.subscribe(res => {
				this.nakdir = res['direction'];
				this.nakinfo = '<h4>Action</h4>';
				this.nakinfo += res['actions'];
				this.nakinfo += '<h4>Nature</h4>';
				this.nakinfo += res['nature'];
				this.nakinfo += '<h4>If Ascendant in ' + params.name + '</h4>';
				this.nakinfo += res['asc'];
				this.nakinfo += '<h4>If Moon in ' + params.name + '</h4>';
				this.nakinfo += res['moon'];
				this.nakinfo += '<h4>1st PADA</h4>';
				this.nakinfo += res['pada-1'] + '<br><strong>Dosha: </strong>' + res['dosha-1'];
				this.nakinfo += '<h4>2nd PADA</h4>';
				this.nakinfo += res['pada-2'] + '<br><strong>Dosha: </strong>' + res['dosha-2'];
				this.nakinfo += '<h4>3rd PADA</h4>';
				this.nakinfo += res['pada-3'] + '<br><strong>Dosha: </strong>' + res['dosha-3'];
				this.nakinfo += '<h4>4th PADA</h4>';
				this.nakinfo += res['pada-4'] + '<br><strong>Dosha: </strong>' + res['dosha-4'];
				this.nakinfo += '<h4>Remedies</h4>';
				this.nakinfo += res['remidies'];
				this.showBD = true;
			}, (err) => {
			   console.log(err);
			});
		
		 }, (err) => {
			   console.log(err);
	  });		
    });
}

}
