import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btr',
  templateUrl: './btr.page.html',
  styleUrls: ['./btr.page.scss'],
})
export class BtrPage implements OnInit {

binf: any = null;
  constructor(private router: Router) { }

  ngOnInit() {
     this.binf = this.router.getCurrentNavigation().extras.state;
}
  rfy(id) {
	  if(id == 'RAM' && this.binf ) {
				let btr: any = {};
				btr.binf1 = this.binf;
				btr.binf2 = null;
				btr.id = id;
				this.router.navigate(['/btr-report'], {state: btr});
	  } else {
	   let btd: any = {};
	   btd.id = id;
	   btd.binf = this.binf;
   	    this.router.navigate(['/btr-details'], {state : btd});
	  }
  }
}
