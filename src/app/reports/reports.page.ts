import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { InAppPurchase2, IAPProduct } from '@ionic-native/in-app-purchase-2/ngx';
import { Router } from '@angular/router';
import { Platform, IonContent  } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service';
import { Device } from '@ionic-native/device/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Report } from '../report';
import { Plan } from '../plan';
import { BirthInfo } from '../birth-info';
import * as AWS from 'aws-sdk';
import { DatePicker } from '@ionic-native/date-picker/ngx';
declare var google; 
declare var RazorpayCheckout: any;
@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
@ViewChild(IonContent, {static: false}) content: IonContent;
service = new google.maps.places.AutocompleteService();
 public product: any = {
    name: 'My Product',
    apid: '1234',
    gpid: 'com.mypubz.eportal.dob'
  };
  autocomplete;
  autocompleteItems;
   addr;
  objectKeys = Object.keys;
  oRep :Report[] = [];
 oBirth :BirthInfo[] = [];
  info: string = '';
  info2: string = '';
  showOD: boolean = false;
  ordN: string = '';
  showVR: boolean = false;
  showAR: boolean = false;
  plan: Plan;
  showAD:boolean=false;
  showH: boolean = true;
  showN: boolean = false;
  showSUB: boolean = true;
  showSU: boolean = true;
  showCR:boolean = false;
  showEB: boolean = true;
  repset: string = 'Show Settings';
  public data               : any;
  isLoading: boolean = false;
  cnme: string = '';
  cnum: string = '';
  ceml: string = '';
  rlng: string = 'en';
 rayn: string = '4';
 rchtyp: string = 'nind';
    dob: string = '';
   tob: string = '';
   place: string = '';
   nam: string='';
   gen: string = '';
   lat: number = 0;
   lng: number = 0;
   tz: string = '';
   dstofset: number = 0;
   nset: boolean = false;
   paym: string = 'rpay';
   ncdts: number = 0;
 constructor(public router: Router, private zone: NgZone, public platform: Platform, public device: Device, private datePicker: DatePicker, public horoService: HoroscopeService, private shareService: ShareService, private file: File, private fileOpener: FileOpener, private camera: Camera, private filePath: FilePath, private store: InAppPurchase2,) { 
      this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
	  this.isLoading = true;
      this.info = 'Loading, please wait..';
        this.data = {}; 
		this.data.image = 'https://i.imgur.com/9gRr3ME.jpg';
		this.shareService.getCIMG().then( cimg => {
		this.shareService.getCNME().then( cnme => {
		this.shareService.getCNUM().then( cnum => {
		this.shareService.getCEML().then( ceml => {
		this.shareService.getRLNG().then( rlng => {
		this.shareService.getRAYN().then( rayn => {
		this.shareService.getRCHTYP().then( rchtyp => {
		   this.isLoading = false;
		   this.info = '';
		   if(cimg) {
			 //let image : any        = new Image();
			 //image.src 				= res['avatar'];
			 // Assign the Image object to the ImageCropper component 
			 this.data.image = cimg;
		   }
			if(cnme) this.cnme = cnme;
			if(cnum) this.cnum = cnum;
			if(ceml) this.ceml = ceml;
			if(rlng) this.rlng = rlng;
			if(rayn) this.rayn = rayn;
			if(rchtyp) this.rchtyp = rchtyp;
	});
	});
	});
	});
	});
	});
	});
}
scrollToTop() {
    this.content.scrollToTop(400);
  }
    showDatePicker() {
	var dt = new Date();
	if(this.dob != '') {
		dt.setFullYear(Number(this.dob.split('-')[0]));
		dt.setMonth(Number(this.dob.split('-')[1])-1);
		dt.setDate(Number(this.dob.split('-')[2]));
	}
	this.datePicker.show({
	  date: dt,
	  mode: 'date',
	  androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
	}).then(
	  date => {
        this.dob = date.getFullYear().toString()+"-"+ (date.getMonth()+1).toString()+"-"+date.getDate().toString();
      },
	  err => console.log('Error occurred while getting date: ', err)
	);
  }
 showTimePicker() {
	var dt = new Date();
	if(this.tob != '') {
		dt.setHours(Number(this.tob.split(':')[0]));
		dt.setMinutes(Number(this.tob.split(':')[1]));
	}
	this.datePicker.show({
	  date: dt,
	  mode: 'time',
	  androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
	}).then(
	  date => {
        this.tob = date.getHours().toString()+":"+date.getMinutes().toString() + ':' + date.getSeconds().toString();
      },
	  err => console.log('Error occurred while getting date: ', err)
	);
 }

  ngOnInit() {
    this.shareService.getPLAN().then((pln) => {
		this.plan = pln;
	    console.log('reports fetched plan', pln);
		 if(pln.name == 'com.mypubz.eportal.astrologer' || pln.name == 'com.mypubz.eportal.adfree' || pln.name == 'com.mypubz.eportal.year' || pln.name == 'com.mypubz.eportal.month') {
			this.showSU = true;
			this.showCR = false;
		  }     
		 else if(Number(pln.credits) == 0) {
			this.showSU = false;
			this.showCR = true;
		 }  else {
			this.showSU = true;
			this.showCR = false;
		 }		
		}, (err) => {
			this.showSU = false;
			this.showCR = false;
			this.info = JSON.stringify(err);
	 });
  }
    ionViewDidEnter() {
	this.platform.ready().then(() => {
		if(this.plan.dobs.trim() != '') {
		   let dobs = this.plan.dobs.split('|');
		   let i: number =  dobs.length-1;
		  if(dobs.length > 0) {
			this.showVR = true;
			let j: number = 0;
			this.oBirth = [];
			while(i > -1) {
				let dob: string = dobs[i];
				console.log('dob', dob);
				let db: string = dob.split('@')[0];
				let nam: string = '';
				let gen: string = '';
				let lat: string = '';
				let lng: string = '';
				let tz: string = '';
				let dof: number = 0;
				if(db.indexOf('L') > -1) {
					//db = dob.split('L')[0].trim();
					console.log('db', db);
					lat = db.split('L')[1].split(',')[0].trim();
					lng = db.split('L')[1].split(',')[1].trim();
					tz = (dob.indexOf('$') > -1) ? dob.split('@')[1].split('$')[0] : dob.split('@')[1].split('#')[0];
					dof = (dob.indexOf('$') > -1) ? Number(dob.split('@')[1].split('#')[0].split('$')[1]) : 0;
					console.log('tz', tz);
					if(dob.indexOf('#') > -1) {
						var ng = dob.split('#')[1];
						nam = ng.split('&')[0];
						gen = ng.split('&')[1];
						console.log(nam, gen);
					}
				}
				let oB: BirthInfo = {
					  dob: dob,
					  dob_short: db.split('L')[0],
					  lat: lat,
					  lng: lng,
					  timezone: tz,
					  dstofset: dof,
					  lagna: '',
					  lagna_lord: '',
					  moon_sign: '',
					  sun_sign: '',
					  tithi: '',
					  birth_star: '',
					  star_lord: '',
					  moon_phase: '',
					  name: nam,
					  gender: gen,
					  ref: '',
					  fetch: false,
					  show: true,
					  genrep: false, ppos: null, retro: '', plstr: '', hpos: null, vims: null, sdb: null, akv: null, dohs: null
				};
				this.oBirth[j++] = oB;
				i--;
			}
		  }
		}
   });			
  }

  publishReport(oa: any)
  {
	  if(oa[0].status == 'X') {
			 this.showOD = true;
			 this.info = '';
			 this.ordN = '<span><strong>You have not ordered any reports. </strong></span><span class="more">Order Now</span><br/>';
	  } else {
	     for(var i = 0; i < oa.length; i++) {
			console.log(i, oa[i]);
					let dob: string = oa[i].dob;
					console.log('dob', dob);
					let db: string = dob.split('@')[0];
					let nam: string = '';
					let gen: string = '';
					let lat: string = '';
					let lng: string = '';
					let tz: string = '';
					if(db.indexOf('L') > -1) {
						console.log('db', db);
						lat = db.split('L')[1].split(',')[0].trim();
						lng = db.split('L')[1].split(',')[1].trim();
						tz = dob.split('@')[1].split('#')[0];
						console.log('tz', tz);
						if(dob.indexOf('#') > -1) {
							var ng = dob.split('#')[1];
							nam = ng.split('&')[0];
							gen = ng.split('&')[1];
							console.log(nam, gen);
						}
					}
			let rep: Report = {
					uuid: oa[i].uuid,
					guid: oa[i].guid,
					dob: oa[i].dob,
					dob_short: db.split('L')[0],
					chtyp: '',
					aynm: '',
					lan: '',
					eml: '',
					mob: '',
					lnk: oa[i].lnk,
					reqdt: oa[i].reqdt,
					status: (oa[i].status == 'new') ? '<strong>AVL. IN 24 HRS</strong>' : '',
					avl: (oa[i].lnk != '') ? true : false,
					name: nam
					};
			this.oRep[i] = rep;			
		 }
		 this.info = '';
	  }
  
  }
	more()
	{
		this.router.navigate(['/report']);
	}
getREP(evt) {
		this.info2 = 'Generating the report, please wait..';
		evt.stopPropagation();
		this.showSUB = false;
	console.log(this.dob, this.tob);
	this.horoService.downloadPdfEx(this.device.uuid, this.nam, this.gen, this.dob+'T'+this.tob + 'Z', this.addr, this.lat.toString(), this.lng.toString(), this.tz, this.dstofset, Number(this.rayn), this.rlng, this.rchtyp, this.data.image, this.cnme, this.cnum, this.ceml)
	.subscribe(res => {
		//var fpth = '';
		 //if (this.platform.isIOS()) {
         //   fpth = this.file.documentsDirectory;
        //} else {
           let fpth: string = this.file.externalDataDirectory;
        //}
		let fn = this.nam.split(' ').join() + Date.now() + '.pdf';
		//let blob:any = new Blob([res], { type: 'application/pdf; charset=utf-8' });
		this.file.writeFile(fpth,  fn, res, {replace: true, append: false})
		.then(res =>  {
			console.log('success');
                //success
				this.shareService.setREP(this.nam+'$'+this.dob + '$'+ fn);
				console.log('show pdf 2', this.file.externalDataDirectory+fn)
				this.info2 = '';
				this.showPdf(fpth+fn);
				//window.open(encodeURI(fpth+fn), '_system');
           }, function(error) {
            });	
		//const url= window.URL.createObjectURL(res);
    }, (err) => {
		this.info2 = JSON.stringify(err);
		console.log(err);
	});

}
 genPDF(evt, pd) {
    evt.stopPropagation();
	console.log('reps', this.shareService.getREPS());
	let reps = this.shareService.getREPS().split('|');
	let efn: string = '';
	for(let i = 0; i < reps.length; i++) {
		if(reps[i].split('$')[0] == pd.name && reps[i].split('$')[1] == pd.dob_short) { efn = reps[i].split('$')[2]; break;}
	}
	if(efn != '' && this.nset == false) {
		console.log('show pdf 1', this.file.externalDataDirectory+efn)
		this.showPdf(this.file.externalDataDirectory+efn);
	} else {
	pd.genrep = true;
    var latlng = new google.maps.LatLng(pd.lat, pd.lng);
    let geocoder = new google.maps.Geocoder();
	geocoder.geocode({ 'latLng': latlng }, (results, status) => {
	    console.log('geocoder result=', results);
		//var dt = new Date();
		//var n = dt.getTimezoneOffset();
		//n = n/60;
		//let ofset: number = Number(n.toFixed(1));
		//let ayanid: number = 4;
		//var ayn = this.shareService.getAYNM();
		//if(ayn) ayanid = Number(ayn);
//	this.horoService.downloadPdf(this.device.uuid, pd.name, pd.gender, pd.dob, results[0].formatted_address, pd.lat, pd.lng, pd.timezone, ofset, ayanid, this.shareService.getLANG(), (this.shareService.getCHTYP() == null) //? 'si':this.shareService.getCHTYP())
	this.horoService.downloadPdfEx(this.device.uuid, pd.name, pd.gender, pd.dob, results[0].formatted_address, pd.lat, pd.lng, pd.timezone, pd.dstofset, Number(this.rayn), this.rlng, this.rchtyp, this.data.image, this.cnme, this.cnum, this.ceml)
	.subscribe(res => {
		//var fpth = '';
		 //if (this.platform.isIOS()) {
         //   fpth = this.file.documentsDirectory;
        //} else {
           let fpth: string = this.file.externalDataDirectory;
        //}
		pd.genrep = false;
		let fn = pd.name.split(' ').join() + Date.now() + '.pdf';
		//let blob:any = new Blob([res], { type: 'application/pdf; charset=utf-8' });
		this.file.writeFile(fpth,  fn, res, {replace: true, append: false})
		.then(res =>  {
			console.log('success');
                //success
				this.shareService.setREP(pd.name+'$'+pd.dob_short + '$'+ fn);
				console.log('show pdf 2', this.file.externalDataDirectory+fn)
				this.showPdf(fpth+fn);
				//window.open(encodeURI(fpth+fn), '_system');
           }, function(error) {
            });	
		//const url= window.URL.createObjectURL(res);
    }, (err) => {
		this.info = JSON.stringify(err);
		console.log(err);
	});
   },(err) => {
	  console.log(err);
	  this.info = JSON.stringify(err);
	});
	}
 }
 showPdf(fl) {
	 this.platform.ready().then(() => {
			this.fileOpener.open(fl, 'application/pdf');
	 });
 }
 rset() {
	 this.showAD = !this.showAD;
	 if(this.showAD) { 
		this.repset = "Hide Settings";
		this.showN = false;
		this.showH = false;
		this.showEB = false;
	 } else {
		 this.repset = "Show Settings";
		 this.showEB = true;
		 this.showH = true;
	 }
 }
    s3Putimage(file, key, encoding){
    return new Promise((resolve, reject) => {
      AWS.config.accessKeyId = 'AKIATA2OQZZZQI3VYSGZ';
      AWS.config.secretAccessKey = '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';
      AWS.config.region = 'us-east-2';
      AWS.config.signatureVersion = 'v4';
      let s3 = new AWS.S3();
      
      const params = {
        Body: file.body,
        Bucket: '126images',
        Key: key,
        ACL: "public-read",
      };
      
      s3.putObject(params, (err, data) => {
        console.log("S3 Response is", data)
        if(err) {
          reject(err);
        } else { 
          resolve(key); }
      });
    })
  }  public uploadPic() {
    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
  }
  public takePic() {
    this.takePicture(this.camera.PictureSourceType.CAMERA);
  }
  public takePicture(sourceType) {
  // Create options for the Camera Dialog
  var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };
 
  // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
	    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          //this.cpyNupload(correctPath, currentName, this.createFileName());
		  //this.cropImage(filePath);
		  this.processImg(filePath);
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      //this.cpyNupload(correctPath, currentName, this.createFileName());
	  //this.cropImage(imagePath);
	  this.processImg(imagePath);
    }
  }, (err) => {
      this.info =  'Error while selecting image.';
  });
 }  
 processImg(ImagePath) {
	 this.isLoading = true;
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];
     this.file.readAsDataURL(filePath, imageName).then(base64 => {
      this.data.image = base64;
      this.isLoading = false;
	  this.uploadImage(this.data.image);
    }, error => {
      alert('Error in showing image' + error);
      this.isLoading = false;
    });}
 uploadImage(image) {
    return new Promise((resolve, reject) => {

      const body = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
      const ext = image.split(';')[0].split('/')[1] || 'jpg';
      let date =  Date.now();
      let key = 'images/profile-126-' + date + '.jpg';
      this.s3Putimage({ body, mime: `image/${ext}` }, key, 'base64').then((result) => { 
					resolve(result); 
					console.log('aws', result);
					this.data.image = 'https://126images.s3-us-east-2.amazonaws.com/' + result.toString();
					this.shareService.setCIMG(this.data.image);
				}).catch((err) => { 
					reject(err); 
				});
    })
  }
  sset() {
    //if(this.data.image != '') this.shareService.setCIMG(this.data.image);
	if(this.cnme != '') this.shareService.setCNME(this.cnme);
	if(this.cnum != '') this.shareService.setCNUM(this.cnum);
	if(this.ceml != '') this.shareService.setCEML(this.ceml);
	if(this.rlng != '') this.shareService.setRLNG(this.rlng);
	if(this.rayn != '') this.shareService.setRAYN(this.rayn);
	if(this.rchtyp != '') this.shareService.setRCHTYP(this.rchtyp);
	this.showAD = false;
	this.showEB = true;
	this.showH = true;
	this.repset = 'Show Settings';
	this.scrollToTop();
	this.nset =true;
  }
  updateSearch() {
    console.log('updateSearch');
    if (this.autocomplete.query == '' || this.autocomplete.query.length < 3 || this.autocomplete.query == this.place) {
     this.autocompleteItems = [];
     return;
    }

    let me = this;
    this.service.getPlacePredictions({
    input: this.autocomplete.query,
    
   }, (predictions, status) => {
     console.log('getPlacePredictions', predictions);
     me.autocompleteItems = [];

   me.zone.run(() => {
     console.log('zone.run', predictions);
     if (predictions != null) {
        predictions.forEach((prediction) => {
          me.autocompleteItems.push(prediction.description);
        });
       }
     });
   });
  }
  chooseItem(item: any) {
	this.place = item;
	this.autocomplete.query = item;
    this.geoCode(item);
	this.autocompleteItems = [];
  }
    geoCode(address:any) {
    this.info = 'geocoding..';
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {
    this.lat = results[0].geometry.location.lat();
    this.lng = results[0].geometry.location.lng();
	this.addr = results[0].formatted_address;
	//let utc_offset: number = 0;
	//if(results[0].geometry.hasOwnProperty('utc_offset'))
		//utc_offset = results[0].geometry.utc_offset;
    this.horoService.getTimezone(results[0].geometry.location.lat(), results[0].geometry.location.lng(), (Math.round((new Date().getTime())/1000)).toString())
		.subscribe(res2 => {
		   this.tz = res2['timeZoneId'];
		   console.log(res2['timeZoneId']);
		   this.dstofset = res2['dstOffset'];
		   this.info = '';
		}, (err) => {
		  console.log(err);
		  this.info = err;
		}) ;

   });
 }
  enter()
  {
	  this.showH = false;
	  this.showN = true;
	  this.showEB = false;
  }
  subscribe() {
		this.router.navigate(['/subscribe']);
  }
  showInf(tpc) {
	this.horoService.getArticle(tpc)
	.subscribe(res => {
		this.info = '';
		if(res['title'].indexOf('ERROR') == -1)
			this.router.navigate(['/article'], {state: res});
	}, (err) => {
		this.info = JSON.stringify(err);
	});
 }
chartSel() {
	console.log('chtyp', this.rchtyp);
 } 
 ayanSel() {
   console.log('aynm',this.rayn);	 
 }
  switchLanguage() {
	 console.log('lang', this.rlng);
  }
    init_pur_and_complete() {
    let pid: any;
    if (!this.platform.is('cordova')) { return; }
    try {
      if (this.platform.is('ios')) {
        pid = this.product.apid;
      } else if (this.platform.is('android')) {
        pid = this.product.gpid;
      }

      // Register Product
      // Set Debug High
      this.store.verbosity = this.store.DEBUG;
      // Register the product with the store
      this.store.register({
        id: pid,
        alias: pid,
        type: this.store.CONSUMABLE
      });
      this.pur_handl();

      this.store.ready(() => {
		this.complete_pur();
	  });//.then((status) => {
       // console.log(JSON.stringify(this.store.get(this.platform.is('ios') ? this.product.apid : this.product.gpid)));
       // console.log('Store is Ready: ' + JSON.stringify(status));
        //console.log('Products: ' + JSON.stringify(this.store.products));
	//	this.complete_pur();
	//	console.log('Finished Purchase!');
	 // });

      // Errors On The Specific Product
      this.store.when(pid).error( (error) => {
        console.log('An Error Occured' + JSON.stringify(error));
      });
      // Refresh Always
      console.log('Refresh Store');
      this.store.refresh();
    } catch (err) {
      console.log('Error On Store Issues' + JSON.stringify(err));
    }
  }
 pur_handl() {
    // Handlers
    this.store.when(this.product.gpid).approved( (product: IAPProduct) => {
      product.finish();
	  this.showCR = false;
	  this.showSU = true;
 
	    this.horoService.addCredits(this.device.uuid, this.ncdts)
		   .subscribe(res => {
				this.plan.credits += this.ncdts;
				this.shareService.setPLAN(this.plan);
			}, (err) => {
			});	  
	   
    });

    this.store.when(this.product.gpid).registered( (product: IAPProduct) => {
      console.log('Registered: ' + JSON.stringify(product));
    });

    this.store.when(this.product.gpid).updated( (product: IAPProduct) => {
      console.log('Loaded' + JSON.stringify(product));
    });

    this.store.when(this.product.gpid).cancelled( (product) => {
      console.log('Purchase was Cancelled');
    });

    // Overall Store Error
    this.store.error( (err) => {
      console.log('Store Error ' + JSON.stringify(err));
    });
  }
   async complete_pur() {
    let pid;
    if (!this.platform.is('cordova')) {
      return
    }

    if (this.platform.is('ios')) {
      pid = this.product.apid;
    } else if (this.platform.is('android')) {
      pid = this.product.gpid;
    }

    console.log('Products: ' + JSON.stringify(this.store.products));
    console.log('Ordering From Store: ' + pid);
    try {
      let product = this.store.get(pid);
      console.log('Product Info: ' + JSON.stringify(product));
      let order = await this.store.order(pid);
    } catch (err) {
      console.log('Error Ordering ' + JSON.stringify(err));
    }
  }
  buy(cdts)
  {
	  this.ncdts = cdts;
	  this.product.gpid = 'com.mypubz.dob'+cdts.toString();
	  if(this.paym == 'rpay') {
		  switch(cdts)
		  {
			  case 15:
				this.razpay(125);
				break;
			 case 25:
			    this.razpay(200);
				break;
			default:
			   break;
		  }
	  }
	else this.init_pur_and_complete();
  }
 paymSel(paym)
  {
     this.paym = paym;
  }
  razpay(amt) {
    let paise: number = amt*100;
	let ccy: string = 'INR';
	let ccode = this.shareService.getCCODE();
	if(ccode && ccode != '' && ccode != 'IN') {
	  paise = amt*1.4;
	  ccy = 'USD';
	}
	   
    var options = {
      description: '126 Astrology - Credits',
      image: 'https://i.imgur.com/YBQF1iV.png',
      currency: ccy, //'INR',
      key: 'rzp_live_B8Zi7S5GIm9G94',
      amount: paise,
      name: '126 Astrology',
      prefill: {
        email: '',
        contact: '',
        name: ''
      },
      theme: {
        color: '#488aff'
      },
      modal: {
        ondismiss: function() {
          alert('dismissed')
        }
      }
    };

    var successCallback = (payment_id) => {
	  this.showCR = false;
	  this.showSU = true;
	    this.horoService.addCredits(this.device.uuid, this.ncdts)
		   .subscribe(res => {
				this.plan.credits += this.ncdts;
				this.shareService.setPLAN(this.plan);
			}, (err) => {
			});	  
    };

    var cancelCallback = (error) => {
      alert(error.description + ' (Error ' + error.code + ')');
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);
  }
  	morecred()
	{
		this.router.navigate(['/credits']);
	}

 }
