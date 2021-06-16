import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planet-sig',
  templateUrl: './planet-sig.page.html',
  styleUrls: ['./planet-sig.page.scss'],
})
export class PlanetSigPage implements OnInit {
  oPlanet: any;
  objectKeys = Object.keys;
  constructor(private router: Router) { }

  ngOnInit() {
	this.oPlanet = this.router.getCurrentNavigation().extras.state;
	console.log('ngOnInit-oPlanet', this.oPlanet);
  }

}
